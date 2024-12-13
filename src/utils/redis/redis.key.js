function userIdKey(userId) {
  return `notes:${userId}`;
}
function noteIdKey(noteId, userId) {
  return `note:${noteId}:${userId}`;
}

module.exports = {
  userIdKey,
  noteIdKey,
};
