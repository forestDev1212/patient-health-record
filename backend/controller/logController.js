const Log = require("../models/Log"); // Import the Log model

class LogController {
  // Create a new log
  async createLog(req, res) {
    const {
      userId,
      date,
      moodRating,
      anxietyLevel,
      sleepHours,
      sleepQuality,
      physicalActivity,
      socialInteractions,
      stressLevel,
      symptoms,
    } = req.body;

    if (
      !userId ||
      !date ||
      !moodRating ||
      !anxietyLevel ||
      !sleepHours ||
      !sleepQuality ||
      !physicalActivity ||
      !socialInteractions ||
      !stressLevel
    ) {
      return res.status(400).json({
        isSuccess: false,
        message: "All required fields must be provided",
      });
    }

    try {
      const log = await Log.create({
        userId,
        date,
        moodRating,
        anxietyLevel,
        sleepHours,
        sleepQuality,
        physicalActivity,
        socialInteractions,
        stressLevel,
        symptoms,
      });

      res.status(201).json({
        payload: log,
        isSuccess: true,
        message: "Log created successfully",
      });
    } catch (error) {
      console.error("Error creating log:", error);
      res.status(500).json({
        payload: {},
        isSuccess: false,
        message: "Error creating log",
      });
    }
  }

  // Get logs for a specific user
  async getUserLogs(req, res) {
    const { userId } = req.params;

    try {
      const logs = await Log.find({ userId }).sort({ date: -1 });

      if (!logs.length) {
        return res.status(404).json({
          payload: [],
          isSuccess: true,
          message: "No logs found for this user",
        });
      }

      res.status(200).json({
        payload: logs,
        isSuccess: true,
      });
    } catch (error) {
      console.error("Error retrieving logs:", error);
      res.status(500).json({
        payload: [],
        isSuccess: false,
        message: "Error retrieving logs",
      });
    }
  }

  // Update a log
  async updateLog(req, res) {
    const { logId } = req.params;
    const updateData = req.body;

    try {
      const updatedLog = await Log.findByIdAndUpdate(logId, updateData, {
        new: true,
      });

      if (!updatedLog) {
        return res.status(404).json({
          payload: {},
          isSuccess: false,
          message: "Log not found",
        });
      }

      res.status(200).json({
        payload: updatedLog,
        isSuccess: true,
        message: "Log updated successfully",
      });
    } catch (error) {
      console.error("Error updating log:", error);
      res.status(500).json({
        payload: {},
        isSuccess: false,
        message: "Error updating log",
      });
    }
  }

  // Delete a log
  async deleteLog(req, res) {
    const { logId } = req.params;

    try {
      const deletedLog = await Log.findByIdAndDelete(logId);

      if (!deletedLog) {
        return res.status(404).json({
          payload: {},
          isSuccess: false,
          message: "Log not found",
        });
      }

      res.status(200).json({
        payload: deletedLog,
        isSuccess: true,
        message: "Log deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting log:", error);
      res.status(500).json({
        payload: {},
        isSuccess: false,
        message: "Error deleting log",
      });
    }
  }
}

module.exports = new LogController();
