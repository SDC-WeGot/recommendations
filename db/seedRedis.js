const Redis = require('ioredis');
const redis = new Redis({
  port: 6379,
  host: 'localhost',
  db: '0',
});
// const pipeline = redis.pipeline();
const dbController = require('./pgpromise-queries');

const pgp = require('pg-promise')({
  capSQL: true, // generate capitalized SQL
});
const db = pgp('postgres://localhost:5432/sagat_sql'); // your database object

redis.on('error', err => {
  console.log('Redis error: ', err);
});

const seedRedis = async () => {
  let counter = 1;
  while (counter <= 2) {
    let data = await dbController.queryPG(counter)
    counter++;
    console.log('data.length = ', data.length);
    redis.sadd(counter.toString(), data.toString());
  }
  redis.smembers('1').then(result => {
    console.log(`result = ${result}`);
  })
  console.log('Finished seeding Redis');
};

seedRedis();
// dbController.queryPG(1, (data) => {console.log(data)});
// redis.get('1');


// 85% = 50
// 10% = 1000
// 5% = anything