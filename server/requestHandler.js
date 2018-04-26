const dbController = require('../db/pgpromise-queries');

const Redis = require('ioredis');
const redis = new Redis();

let handleRequest = async (id) => {
  let redisResult = await redis.get(id, (err, result) => {
    if (err) {
      console.error(err);
    } else if (result !== null) {
      // console.log('Found cached');
    }
  });
  // console.log('redisResult = ', redisResult);
  // If not in redis cache, redisResult = null
  if (!redisResult) {
    // console.log('Data not cached, looking in postgres');
    return dbController.queryPG(id);
  }
  // Only returns here if redisResult !== null
  return redisResult;
};

module.exports = handleRequest;
