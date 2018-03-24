const pg = require('pg');

// Provide connection string for the postgreSQL client, port generally is default one i.e. 5432:
// var connectionString = "postgres://userName:password@serverName/ip:port/nameOfDatabase";
var connectionString = "postgres://localhost:5432/sagat_sql";

// Instantiate the client for postgres database
var pgClient = new pg.Client(connectionString);
pgClient.connect();

let queryPG = async (identifier, callback) => {
  // Connect to database
  // var result = await pgClient.query('SELECT * FROM restaurants where place_id = ' + identifier + ";");
  try {
    var result = await pgClient.query('SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended WHERE nearby.place_id = ' + identifier + ';');
  } catch(err) {
    console.log(`Error = ${err}`);
  }

  // callback(`identifier = ${identifier} and result = ${result}`);
  result.rows.forEach(row => {
    // console.log(`row = ${JSON.stringify( row )}`);
  });
};

let randomIndexGenerator = (max) => {
  return Math.floor(Math.random() * max);
};

// queryPG(randomIndexGenerator(10000000));


let queryThousandTimes = () => {
  var startTime = new Date().getTime();
  for (var i = 0; i < 1000; i++) {
    let randomIndex = randomIndexGenerator(10000000);
    queryPG(randomIndex, (data) => {
      console.log(data);
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
pgClient.end();

// -- don't use *, be specific with fields- restaurants.longitude
// SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended WHERE nearby.place_id = 1;

// SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended INNER JOIN photos on photos.place_id = nearby.recommended WHERE nearby.place_id = 1;
