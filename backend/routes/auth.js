const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controller/authController");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/log");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/google", authController.googleAuth);

module.exports = router;
