const NoteFactory = require("../models/noteFactory");
const ErrorBuilder = require("../utils/builder/error");
const Note = require("../models/note");
const { setCache, deleteCache, getCache } = require("../utils/redis/redis");
const { userIdKey, noteIdKey } = require("../utils/redis/redis.key");

async function createNote(body, userId) {
  const { title, content, workType } = body;
  // Get note type from factory
  const noteWorkType = new NoteFactory(workType).getNoteType();
  if (!noteWorkType) {
    throw new ErrorBuilder("Given note type is not valid.");
  }
  // Create a new note and associate it with the authenticated user
  const note = await Note.create({
    title,
    content,
    workType: noteWorkType.returnNoteType(),
    userId, // Use the userId from the decoded JWT token
  });
  // Delete cached notes for the user to force fresh data on next request
  await deleteCache(userIdKey(userId));
  return note;
}

async function getNotes(userId) {
  // Check if the notes are cached in Redis
  const cachedNotes = await getCache(userIdKey(userId));
  if (cachedNotes) {
    // If notes are found in Redis, return them as a response
    return cachedNotes;
  }
  // Fetch notes for the authenticated user
  const notes = await Note.findAll({
    where: { userId: userId }, // Only fetch notes that belong to the authenticated user
  });
  // Set into Redis for next retrieve
  await setCache(userIdKey(userId), JSON.stringify(notes));
  return notes;
}

async function getNote(noteId, userId) {
  // Check if the note is cached in Redis
  const cachedNote = await getCache(noteIdKey(noteId, userId));
  if (cachedNote) {
    // If cached, return the note
    return cachedNote;
  }
  // If not cached, fetch it from the database
  const note = await Note.findOne({
    where: { id: noteId, userId },
  });
  if (!note) {
    throw new ErrorBuilder("Note not found or not owned by you.");
  }
  // Cache the note in Redis (expires in 1 hour)
  setCache(noteIdKey(noteId, userId), JSON.stringify(note));
  return note;
}

async function updateNote(noteId, body, userId) {
  const { title, content, workType } = body;
  // Find the note by ID and ensure it belongs to the authenticated user
  const note = await Note.findOne({
    where: { id: noteId, userId: userId },
  });
  // If note not found or doesn't belong to the user
  if (!note) {
    throw new ErrorBuilder("Note not found or not owned by you.");
  }
  const noteWorkType = new NoteFactory(workType).getNoteType();
  if (!noteWorkType) {
    return res.status(400).json({ message: "Given note type is not valid." });
  }
  // Update the note with new data
  note.title = title;
  note.content = content;
  note.workType = noteWorkType.returnNoteType();
  // Save the updated note
  await note.save();
  // Update the Redis cache
  await setCache(noteIdKey(noteId, userId), JSON.stringify(note));
  return note;
}

async function deleteNote(noteId, userId) {
  // Find the note by ID and ensure it belongs to the authenticated user
  const note = await Note.findOne({
    where: { id: noteId, userId: userId },
  });
  // If note not found or doesn't belong to the user
  if (!note) {
    throw new ErrorBuilder("Note not found or not owned by you.");
  }
  // Delete the note
  await note.destroy();
  // Remove cached data for the deleted note and the user's notes
  await deleteCache(noteIdKey(noteId, userId));
  return;
}

module.exports = {
  createNote: createNote,
  getNotes: getNotes,
  getNote: getNote,
  updateNote: updateNote,
  deleteNote: deleteNote,
};
