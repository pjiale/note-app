const express = require("express");
const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/note");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

// Create a note
router.post("/", authenticateToken, createNote);
// Get all notes
router.post("/all", authenticateToken, getNotes);
// Get a single note by ID
router.get("/:noteId", authenticateToken, getNote);
// Update a note
router.put("/:noteId", authenticateToken, updateNote);
// Delete a note
router.delete("/:noteId", authenticateToken, deleteNote);

module.exports = router;
