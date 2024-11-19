const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true, // Logs must be associated with a user
  },
  date: {
    type: String,
    required: true,
    default: new Date().toISOString().split("T")[0], // Default to today's date
  },
  moodRating: {
    type: Number,
    required: true,
    min: 1, // Minimum value for mood rating
    max: 10, // Maximum value for mood rating
  },
  anxietyLevel: {
    type: Number,
    required: true,
    min: 0, // Minimum anxiety level
    max: 10, // Maximum anxiety level
  },
  sleepHours: {
    type: Number,
    required: true,
    min: 0, // Minimum sleep hours
    max: 24, // Maximum sleep hours
  },
  sleepQuality: {
    type: String,
    required: true,
    enum: ["Poor", "Average", "Good"], // Restrict to specific values
  },
  physicalActivity: {
    type: Number,
    required: true,
    min: 0, // Minimum physical activity hours
    max: 24, // Maximum physical activity hours
  },
  socialInteractions: {
    type: Number,
    required: true,
    min: 0, // Minimum frequency of interactions
  },
  stressLevel: {
    type: Number,
    required: true,
    min: 1, // Minimum value for stress level
    max: 10, // Maximum value for stress level
  },
  symptoms: {
    type: String,
    required: false, // Optional field
    default: "", // Default to an empty string if not provided
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the log creation date
  },
});

module.exports = mongoose.model("Log", LogSchema);
