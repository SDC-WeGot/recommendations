const Redis = require('ioredis');
const redis = new Redis({
  port: 6379,
  host: 'localhost',
  db: '0',
});

var startTime = new Date().getTime();
redis.get('101')
.then(result => {
  let endTime = new Date().getTime();
  console.log(endTime - startTime);
});


