const logger = require("../utils/logger/logger");

const logRequests = (req, res, next) => {
  const { method, url, body } = req;
  const timestamp = new Date().toISOString();
  new logger().info(`Request Received: 
      Method: ${method} 
      URL: ${url} 
      Body: ${JSON.stringify(body)} 
      Timestamp: ${timestamp}`);
  next();
};

module.exports = logRequests;
