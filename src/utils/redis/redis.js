const redis = require("../../config/redis");
const logger = require("../logger/logger");

// Utility function to set data in Redis
async function setCache(key, data, expiryInSecond = 3600) {
  try {
    await redis.setex(key, expiryInSecond, data);
  } catch (error) {
    new logger().error("Error setting cache in Redis: " + error);
  }
}

// Utility function to get data from Redis
async function getCache(key) {
  try {
    const cachedData = await redis.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null; // If no data is found in cache
  } catch (error) {
    new logger().error("Error setting cache in Redis: " + error);
    return null;
  }
}

// Utility function to delete cached data from Redis (for removing notes from cache)
async function deleteCache(key) {
  try {
    await redis.del(key);
  } catch (error) {
    new logger().error("Error setting cache in Redis: " + error);
  }
}

module.exports = {
  setCache,
  getCache,
  deleteCache,
};
