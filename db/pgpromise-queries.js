// const newRelic = require('newrelic');
const pg = require('pg');
const pgp = require('pg-promise')({
  capSQL: true, // generate capitalized SQL
});
const db = pgp('postgres://localhost:5432/sagat_sql'); // your database object

// db.any('SELECT * FROM product WHERE price BETWEEN $1 AND $2', [1, 10])


let queryPG = async (identifier, callback) => {
  try {
    var result = await db.any('SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended INNER JOIN photos on photos.place_id = nearby.recommended WHERE nearby.place_id = ${id}', {id: identifier});
    callback(null, JSON.stringify(result));
  } catch(err) {
    console.log('in catch block')
    callback(err, null);
  }
};

let randomIndexGenerator = (max) => {
  return Math.floor(Math.random() * max);
};

queryPG(randomIndexGenerator(10000000), (err, data) => {
  if (null, data) {
    console.log('data = ', data);
  } else if (err, data) {
    console.log('Error = ', err);
  }
});


let queryThousandTimes = () => {
  var startTime = new Date().getTime();
  for (var i = 0; i < 1000; i++) {
    let randomIndex = randomIndexGenerator(10000000);
    queryPG(randomIndex, (data) => {
      console.log(data);
    });
    if (i === 999) {
      var endTime = new Date().getTime();
      // console.log(
      //   `${i + 1} random queries, time elapsed for postgres, 3 table format = ${endTime - startTime}`,
      // );
    }
  }
};

// queryThousandTimes(); // 11, 11, 11, 12, 13, 11
// -- don't use *, be specific with fields- restaurants.longitude
// SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended WHERE nearby.place_id = 1;

// SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended INNER JOIN photos on photos.place_id = nearby.recommended WHERE nearby.place_id = 1;

module.exports.queryPG = queryPG;