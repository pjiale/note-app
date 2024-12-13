const noteType = require("./enum");

class NoteType {
  returnNoteType() {
    throw new Error("printVehicle method must be implemented.");
  }
}

class PersonalType extends NoteType {
  returnNoteType() {
    return noteType.PERSONAL;
  }
}

class WorkType extends NoteType {
  returnNoteType() {
    return noteType.WORK;
  }
}

class NoteFactory {
  workType;
  constructor(type) {
    if (type == noteType.PERSONAL) {
      this.workType = new PersonalType();
    } else if (type == noteType.WORK) {
      this.workType = new WorkType();
    }
  }

  getNoteType() {
    return this.workType;
  }
}

module.exports = NoteFactory;
