const pg = require('pg');

// Provide connection string for the postgreSQL client, port generally is default one i.e. 5432:
// var connectionString = "postgres://userName:password@serverName/ip:port/nameOfDatabase";
var connectionString = "postgres://localhost:5432/sagat_twotables";

// Instantiate the client for postgres database
var pgClient = new pg.Client(connectionString);
pgClient.connect();

let queryPG = async (identifier, callback) => {
  // Connect to database
  // var result = await pgClient.query('SELECT * FROM restaurants where place_id = ' + identifier + ";");
  try {
    var result = await pgClient.query('SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended WHERE nearby.place_id = ' + identifier + ';');
    callback(result.rows);
  } catch(err) {
    console.log(`Error = ${err}`);
  }
};

let randomIndexGenerator = (max) => {
  return Math.floor(Math.random() * max);
};

var startTime = new Date().getTime();
// queryPG(randomIndexGenerator(10000000), (data) => {
//   // console.log('data = ', data);
//   let endTime = new Date().getTime();
//   console.log(`Time = ${endTime - startTime}`)
// });

let queryThousandTimes = () => {
  for (var i = 0; i < 1000; i++) {
    let randomIndex = randomIndexGenerator(10000000);
    queryPG(randomIndex, (data) => {
      console.log(data.length);
    });
    if (i === 999) {
      var endTime = new Date().getTime();
      console.log(
        `${i + 1} random queries, time elapsed for postgres, 3 table format = ${endTime - startTime}`,
      );
    }
  }
};
queryThousandTimes(); // 
// pgClient.end();

// -- don't use *, be specific with fields- restaurants.longitude
// SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended WHERE nearby.place_id = 1;

// SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended INNER JOIN photos on photos.place_id = nearby.recommended WHERE nearby.place_id = 1;
