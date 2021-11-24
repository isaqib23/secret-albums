const Redis = require('ioredis');


const redisConfig = {
    maxRetriesPerRequest: 3,
    retryStrategy: function (times) {
        let delay = Math.min(times * 500, 5000);
        return delay;
    },
    reconnectOnError: function (err) {
        if (err.message.includes('READONLY')) {
            // Only reconnect when the error contains "READONLY"
            // helps if ElastiCache master failed and reader was promoted (takes few seconds to be writable)
            return 2;
        }
    },
}

// on production connect to the AWS ElastiCache OTP cluster
// on development connect to local redis (remote can't be accessed outside of the VPC)
const redisClient = process.env.NODE_ENV === 'production' ? new Redis({
    ...redisConfig,
    host: process.env.OTP_REDIS_HOST,
    port: '6379', // default
}) : new Redis({ ...redisConfig }); // defaults to localhost

let reportedBug = false;

redisClient.on('connect', () => {
    console.log('🚀 Redis server connection established');
    reportedBug = false;
    // todo send a green success alert to slack
});
redisClient.on('error', err => {
    console.log("Redis Error:  " + err);
});
redisClient.on('reconnecting', () => console.log('❗️ Redis reconnecting...'));

export const redisSet = (key, value, expiry) => {
    redisClient.set(key, value, 'EX', expiry, err => {
        if (err){
            console.log(err);
        }
    });
}

export const redisGet = (key) => {
    return new Promise ((resolve)=>{
        redisClient.get(key, (err, result) => {
            if (err){
                console.log(err);
            }
            resolve(result);
        });
    });
}

export const redisDel = (key) => {
    redisClient.del(key, (err, result) => {
        if (err){
            if (err){
                console.log(err);
            }
        }
    });
}