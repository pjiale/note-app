const noteService = require("../services/note");
const ErrorBuilder = require("../utils/builder/error");
const ResponseBuilder = require("../utils/builder/response");

async function createNote(req, res, next) {
  try {
    const userId = req.user.userId;
    const { title, content, workType } = req.body;
    // Validate input
    if (!title || !content || !workType) {
      throw new ErrorBuilder("Title, content and note type are required.");
    }
    const note = await noteService.createNote(req.body, userId);
    // Return success response
    res.json(new ResponseBuilder({ note }, "Note created successfully.", 201));
  } catch (error) {
    next(error);
  }
}

async function getNotes(req, res, next) {
  try {
    const userId = req.user.userId;
    const note = await noteService.getNotes(userId);
    // Return the notes
    res.json(new ResponseBuilder({ note }, "Notes retrieved successfully."));
  } catch (error) {
    next(error);
  }
}

async function getNote(req, res, next) {
  try {
    const { noteId } = req.params;
    const userId = req.user.userId;
    const note = await noteService.getNote(noteId, userId);
    // Return the note
    res.json(new ResponseBuilder({ note }, "Note retrieved successfully."));
  } catch (error) {
    next(error);
  }
}

async function updateNote(req, res, next) {
  try {
    const { noteId } = req.params;
    const { title, content, workType } = req.body;
    const userId = req.user.userId;
    // Validate input
    if (!title || !content || !workType) {
      throw new ErrorBuilder("Title, content, and note type are required.");
    }
    const note = await noteService.updateNote(noteId, req.body, userId);
    // Return the updated note
    res.json(new ResponseBuilder({ note }, "Note updated successfully."));
  } catch (error) {
    next(error);
  }
}

async function deleteNote(req, res, next) {
  try {
    const userId = req.user.userId;
    const { noteId } = req.params;
    await noteService.deleteNote(noteId, userId);
    // Return success response
    res.json(new ResponseBuilder({}, "Note deleted successfully."));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createNote: createNote,
  getNotes: getNotes,
  getNote: getNote,
  updateNote: updateNote,
  deleteNote: deleteNote,
};
