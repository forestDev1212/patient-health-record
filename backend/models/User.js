const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate Google IDs
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "", // Default to an empty string if no image is provided
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate email addresses
    match: [/\S+@\S+\.\S+/, "Invalid email format"], // Optional email format validation
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
