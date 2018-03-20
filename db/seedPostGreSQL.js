const pgp = require('pg-promise')({
  capSQL: true, // generate capitalized SQL
});
const faker = require('faker');
const pg = require('pg');

// // Table creation script. We'll create a table by running the schema file instead.
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sagat-sql';
// const client = new pg.Client(connectionString);
// client.connect();
// const query = client.query(
//   'CREATE TABLE restaurants (id SERIAL PRIMARY KEY,name TEXT NOT NULL,place_id UNIQUE NOT NULL,google_rating REAL NOT NULL,zagat_food_rating REAL NOT NULL,review_count INT NOT NULL,short_description TEXT NOT NULL,neighborhood TEXT NOT NULL,price_level SMALLINT NOT NULL,nearby PLACEHOLDER NOT NULL,type TEXT NOT NULL,location JSONB NOT NULL,photos JSONB NOT NULL)');
//   query.on('end', () => { client.end(); });
  
  
const targetDatabaseSize = 10000;
const batchSize = 1000;
const batchesNeeded = targetDatabaseSize / batchSize;


const db = pgp('postgres://localhost:5432/sagat-sql'); // your database object
// Creating a reusable/static ColumnSet for generating INSERT queries:
const csRestaurant = new pgp.helpers.ColumnSet(
  [
    'name',
    'place_id',
    'google_rating',
    'zagat_food_rating',
    'review_count',
    'short_description',
    'neighborhood',
    'price_level',
    'type',
    'location',
    'photos',
  ],
  {table: 'restaurants'}
);

const csNearby = new pgp.helpers.ColumnSet(
  [
    'place_id',
    'recommended',
  ], 
  {table: 'nearby'}
);

// helper functions to create an array of objects
let randomIndexGenerator = (max) => {
  return Math.floor(Math.random() * max);
};

let randomFloatGenerator = (max) => {
  let randomFloat = (Math.random() * max);
  return Math.round(randomFloat * 10) / 10;
};

const randomPictureArr = () => {
  let dummyPhotos = [
    'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/5317/food-salad-restaurant-person.jpg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/92090/pexels-photo-92090.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/370984/pexels-photo-370984.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/262918/pexels-photo-262918.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/34650/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/460537/pexels-photo-460537.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/239975/pexels-photo-239975.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/64208/pexels-photo-64208.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/9315/menu-restaurant-france-eating-9315.jpg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/724216/pexels-photo-724216.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/858508/pexels-photo-858508.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/225448/pexels-photo-225448.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/704982/pexels-photo-704982.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/265903/pexels-photo-265903.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/791810/pexels-photo-791810.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/169391/pexels-photo-169391.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/240223/pexels-photo-240223.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/842546/pexels-photo-842546.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/5249/bread-food-restaurant-people.jpg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/404974/pexels-photo-404974.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/681847/pexels-photo-681847.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/5928/salad-healthy-diet-spinach.jpg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/159291/beer-machine-alcohol-brewery-159291.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/407293/pexels-photo-407293.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/567633/pexels-photo-567633.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/324030/pexels-photo-324030.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/225228/pexels-photo-225228.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/3498/italian-pizza-restaurant-italy.jpg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/221143/pexels-photo-221143.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/551997/pexels-photo-551997.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/687824/pexels-photo-687824.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/296888/pexels-photo-296888.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/321588/pexels-photo-321588.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/769153/pexels-photo-769153.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/529923/pexels-photo-529923.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/9708/food-pizza-restaurant-eating.jpg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/744780/pexels-photo-744780.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/6216/water-drink-glass-drinking.jpg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/62097/pexels-photo-62097.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/305832/pexels-photo-305832.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/331107/pexels-photo-331107.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg?h=350&auto=compress&cs=tinysrgb',
  ];
  var photosURLArray = [];
  let usedPictureIndices = [];
  while (photosURLArray.length < 10) {
    let randomIndex = randomIndexGenerator(dummyPhotos.length - 1);
    if (usedPictureIndices.indexOf(randomIndex) === -1) {
      photosURLArray.push(dummyPhotos[randomIndex]);
      usedPictureIndices.push(randomIndex);
    }
  }
  return photosURLArray;
};

const typeGenerator = () => {
  let types = ['Restaurant', 'Bar', 'Night Club', 'Brasserie', 'Cafe', 'Bakery'];
  return types[randomIndexGenerator(types.length)];
};

const restaurantCreator = (uniqueNumber) => {
  let photoArr = randomPictureArr();
  let randomDescription = faker.lorem.sentence();
  let randomPriceLevel = randomIndexGenerator(3) + 1;
  let randomGoogleRating = randomFloatGenerator(5);
  let randomZagatRating = randomFloatGenerator(5);
  let randomReviewCount = randomIndexGenerator(1000);
  let randomLongitude = faker.address.longitude();
  let randomLatitude = faker.address.latitude();
  let randomCounty = faker.address.county();
  let randomCompanyName = faker.company.companyName();
  let randomType = typeGenerator();
  let rest = {
    name: randomCompanyName,
    place_id: uniqueNumber,
    google_rating: randomGoogleRating,
    zagat_food_rating: randomZagatRating,
    review_count: randomReviewCount,
    short_description: randomDescription,
    neighborhood: randomCounty,
    price_level: randomPriceLevel,
    type: randomType,
    location: {"lat": randomLongitude, "long": randomLatitude},
    photos: photoArr,
  };
  return rest;
};

const randomRecommendedGenerator = (lowerLimit, upperLimit) => {
  let usedIndices = [];
  while (usedIndices.length < 6) {
    let randomIndex = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
    if (usedIndices.indexOf(randomIndex) === -1) {
      usedIndices.push(randomIndex);
    }
  }
  return usedIndices;
};


function getNextDataRestaurant(t, pageIndex) {
  let data = null;
  if (pageIndex < batchesNeeded) {
    data = [];
    for (let i = 1; i <= batchSize; i++) {
      const idx = pageIndex * batchSize + i; // to insert unique place_id
      data.push(restaurantCreator(idx));
    }
  }
  return Promise.resolve(data);
}

function getNextDataNearby(t, pageIndex) {
  let data = null;
  if (pageIndex < batchesNeeded) {
    data = [];
    for (let i = 0; i < batchSize; i++) {
      data.push(randomRecommendedGenerator(pageIndex * batchSize + 1, (pageIndex + 1) * batchSize));
    }
  }
  return Promise.resolve(data);
}

db
  .tx('massive-insert', t => {
    return t.sequence(batchCounter => {
      return getNextDataRestaurant(t, batchCounter).then(data => {
          if (data) {
            const insert = pgp.helpers.insert(data, csRestaurant);
            return t.none(insert);
          }
        });
      });
    })
  .then(data => {
    // COMMIT has been executed
    console.log('Total batches:', data.total, ', Duration:', data.duration);
  })
  .catch(error => {
    // ROLLBACK has been executed
    console.log(error);
  });



/* // Basic structure for single batch
const insert = pgp.helpers.insert(data, cs);
// => INSERT INTO "products"("title","price","units")
  VALUES('red apples',2.35,1000),('large oranges',4.5,1)


db
  .none(insert)
  .then(() => {
    // success, all records inserted
  })
  .catch(error => {
    // error
  }); */