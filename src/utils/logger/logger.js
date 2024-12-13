class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    Logger.instance = this;
    return this;
  }

  info(message) {
    console.log(`[INFO]: ${message}`);
  }

  warn(message) {
    console.warn(`[WARN]: ${message}`);
  }

  error(message) {
    console.error(`[ERROR]: ${message}`);
  }
}

module.exports = Logger;
