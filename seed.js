const faker = require ('faker');
const MongoClient = require('mongodb').MongoClient;
// const _ = require('ramda');
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length; // 8

var time = new Date().getTime();

// Connection URL
const dbAddress = process.env.DB_ADDRESS || 'localhost:27017';
const url = `mongodb://${dbAddress}`;
// Database Name
const dbName = 'sagat';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to mongo, inserting entries");
  const db = client.db(dbName);
  let insertionCounter = 0;
  let targetDatabaseSize = 1000000;
  let batchSize = 2000;
  let requiredBatches = targetDatabaseSize / batchSize;
  let batchCounter = 0;
  while (batchCounter < requiredBatches) {
    insertIntoDatabase(db, batchCounter, batchSize, targetDatabaseSize, () => {
      batchCounter++;
      console.log(`Inserted batch ${batchCounter} in ${(new Date().getTime() - time) / 1000} seconds, ${requiredBatches - batchCounter} batch[es] to go`);
      if (batchCounter === requiredBatches) {
        console.log(`Inserted ${batchCounter} batches, of batch size ${batchSize}, in ${(new Date().getTime() - time) / 1000 / 60} minutes; now closing client.`);
        client.close();
      }
    });
  }
});

// 4 args- db, roundsCounter, batchSize /*arg2 arg3 to generate place_id*/, totalDatabaseSize/*to generate random nearby*/, callback
// async function insertIntoDatabase (db, insertionCounter, batchSize, totalDatabaseSize, callback) {
//   // Get the documents collection
//   const collection = db.collection('restaurants4');
//   // Create a batch of restaurants in arrRestaurants
//   let counterBase = insertionCounter * batchSize;
//   let arrRestaurants = restaurantCreator(counterBase, batchSize, totalDatabaseSize);
//   console.log('arrRestaurants.length = ', arrRestaurants.length);
//   // Prepare array of function calls
//   let arrInsertOneCalls = arrRestaurants.map(restaurant => {
//     return {insertOne: {'document': restaurant}};
//   });
//   // Insert prepared arrRestaurants
//   await collection.bulkWrite(arrInsertOneCalls, {ordered: false});
//   callback();
// }

let insertIntoDatabase = (db, insertionCounter, batchSize, totalDatabaseSize, callback) => {
  // Get the documents collection
  const collection = db.collection('restaurants4');
  // Create a batch of restaurants in arrRestaurants
  var counterBase = insertionCounter * batchSize;
  var arrRestaurants = restaurantCreator(counterBase, batchSize, totalDatabaseSize);
  // Prepare array of function calls
  var arrInsertOneCalls = arrRestaurants.map(restaurant => {
    return {insertOne: {'document': restaurant}};
  });
  // Insert prepared arrRestaurants
  collection.bulkWrite(arrInsertOneCalls, {ordered: false});
  callback();
};

const restaurantCreator = (counterBase, batchSize, totalDatabaseSize) => {
  var arrRestaurants = [];
  for (var i = 0; i < batchSize; i++) {
    var uniqueNumber = counterBase + i;
    var photoArr = randomPictureArr();
    var randomDescription = faker.lorem.sentence();
    var randomPriceLevel = randomIndexGenerator(4);
    var randomGoogleRating = randomFloatGenerator(5);
    var randomZagatRating = randomFloatGenerator(5);
    var randomReviewCount = randomIndexGenerator(1000);
    var randomNearby = randomNearbyGenerator(totalDatabaseSize);
    var randomLongitude = faker.address.longitude();
    var randomLatitude = faker.address.latitude();
    var randomCounty = faker.address.county();
    var randomCompanyName = faker.company.companyName();
    var newRestaurant = {
      name: randomCompanyName,
      place_id: uniqueNumber,
      google_rating: randomGoogleRating,
      zagat_food_rating: randomZagatRating,
      review_count: randomReviewCount,
      short_description: randomDescription,
      neighborhood: randomCounty,
      price_level: randomPriceLevel,
      nearby: randomNearby,
      types:["Restaurant","Food","Point Of Interest","Establishment"],
      location: {"lat": randomLongitude, "long": randomLatitude},
      photos: photoArr,
    };
    arrRestaurants.push(newRestaurant);
  }
  return arrRestaurants;
};

const randomIndexGenerator = (max) => {
  return Math.floor(Math.random() * max);
};

const randomFloatGenerator = (max) => {
  let randomFloat = (Math.random() * max);
  return Math.round(randomFloat * 10) / 10;
};

const randomNearbyGenerator = (max) => {
  let usedIndices = [];
  while (usedIndices.length < 6) {
    let randomIndex = Math.floor(Math.random() * max);
    if (usedIndices.indexOf(randomIndex) === -1) {
      usedIndices.push(randomIndex);
    }
  }
  return usedIndices;
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



// const indexCollection = function(db, callback) {
//   db.restaurants.createIndex(
//     { "place_id": 1 },
//       {unique: true},
//       function(err, results) {
//         console.log(results);
//         callback();
//     }
//   );
// };

// MongoClient.connect(url)
//   .then( (err, client) => {
//     const db = client.db(dbName);
//     insertionCounter = 0;
//     seedDatabase(db, insertionCounter, () => {
  //       client.close();
  //     });
  //   })
  //   .catch((err) => { console.log('Insertion error: ', err)});