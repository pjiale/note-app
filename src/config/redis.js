const Redis = require("ioredis");

// Initialize the Redis client
const redis = new Redis(
  `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
);

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

module.exports = redis;
