const pg = require('pg');
const pgp = require('pg-promise')({
  capSQL: true, // generate capitalized SQL
});

const db = pgp('postgres://localhost:5432/sagat_twotables'); // your database object
const dbt = pgp({
  database: 'sagat_twotables',
  port: 5432,
});


function queryPG () {
  return dbt.none('SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended WHERE nearby.place_id = 1;');
}

let queryThousandTimes = () => {
  var startTime = new Date().getTime();
  for (var i = 0; i < 1000; i++) {
    queryPG();
    if (i === 999) {
      var endTime = new Date().getTime();
      console.log(`Time elapsed for postgres, 3 table format = ${endTime - startTime}`);
    }
  }
};

queryThousandTimes();




// -- don't use *, be specific with fields- restaurants.longitude
// SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended WHERE nearby.place_id = 1;