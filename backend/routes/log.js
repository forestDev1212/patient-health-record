const express = require("express");
const router = express.Router();
const LogController = require("../controller/logController");

// Create a new log
router.post("/", LogController.createLog);

// Get logs for a specific user
router.get("/:userId", LogController.getUserLogs);

// Update a log
router.put("/:logId", LogController.updateLog);

// Delete a log
router.delete("/:logId", LogController.deleteLog);

module.exports = router;
