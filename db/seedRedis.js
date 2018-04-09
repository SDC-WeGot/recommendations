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
  while (counter <= 1000) {
    let data = await dbController.queryPG(counter);
    // console.log(`data = ${data}`)
    counterAsString = counter.toString();
    dataToString = JSON.stringify(data);
    redis.set(counterAsString, dataToString);
    counter++;
    if (counter % 100 === 0) {
      console.log(counter);
    }
  }
  // redis.get('1')
  // .then(result => {
  //   console.log(`result = ${result}`);
  //   // console.log(`JSON.parse(result) = ${JSON.parse(result)}`);
  // })
  // .catch(err => {
  //   console.log('Error retrieving redis: ', err);
  // })
  console.log('Finished seeding Redis');
};

seedRedis();

// redis.set('1', 'new');
// redis.get('1')
//   .then(result => {
//     console.log(`result = ${result}`);
//   })

// 85% = 50
// 10% = 1000
// 5% = anything