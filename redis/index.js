const redis = require('redis');
const { host, port } = require('../config/redis-config.json');

let redisClient = redis.createClient({
    socket: {
        host,
        port,
    },
    legacyMode: true,
});

redisClient.on('connect', () => {
    console.log('Redis connected');
});

redisClient.on('error', (err) => {
    console.log(`Redis error : ${err}`);
});

redisClient.connect().then();
redisClient = redisClient.v4;

module.exports = redisClient;
