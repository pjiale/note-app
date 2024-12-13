class ResponseBuilder {
  constructor(data, message, statusCode) {
    this.data = data || {};
    this.statusCode = statusCode || 200;
    this.message = message || "";
  }
}

module.exports = ResponseBuilder;
