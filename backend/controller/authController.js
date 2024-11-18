const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User"); // Import the updated User model

const client = new OAuth2Client(
  "751176710085-3n86dp3anofhmpufip4t8bal3l6iee1g.apps.googleusercontent.com"
);

class AuthController {
  async googleAuth(req, res) {
    console.log(req.body);
    const { token } = req.body;

    if (!token) {
      // Handle missing token
      return res.status(400).json({ error: "Token is required" });
    }

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience:
          "751176710085-3n86dp3anofhmpufip4t8bal3l6iee1g.apps.googleusercontent.com",
      });
      console.log(ticket);
      const payload = ticket.getPayload();
      const {
        sub: googleId,
        email,
        given_name: firstName,
        family_name: lastName,
        name: displayName,
        picture: image,
      } = payload;

      // Find or create the user in the database
      let user = await User.findOne({ googleId });

      if (!user) {
        user = await User.create({
          googleId,
          displayName,
          firstName,
          lastName,
          email,
          image,
        });
      }

      res.status(200).json({
        payload: {
          id: user._id,
          email: user.email,
          name: user.displayName,
          picture: user.image,
        },
        isSuccess: true,
      });
    } catch (error) {
      console.error("Error verifying Google token:", error);

      res.status(400).json({
        payload: {},
        isSuccess: false,
        message: "Authentication failed",
      });
    }
  }
}

module.exports = new AuthController();
