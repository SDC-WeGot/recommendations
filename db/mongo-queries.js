const MongoClient = require('mongodb').MongoClient;
const dbAddress = process.env.DB_ADDRESS || 'localhost:27017';
let url = `mongodb://${dbAddress}`;
const dbName = 'sagat';

// let findOne = (id, callback) => {
//   MongoClient.connect(url, function(err, client) {
//     console.log("Connected successfully to mongo, finding entry");
//     const db = client.db(dbName);
//     const collection = db.collection('restaurants');

//     // Query :id
//     collection.findOne({place_id: 1}, (err, document) => {
//       if (err) {
//         console.log("error = ", err);
//       }
//       else {
//         // Query ids of the nearby restaurants
//         console.log(`document.nearby = ${document.nearby}`);
//         collection.find({place_id: {$in: document.nearby} }).toArray((err, docs) => {
//           if (err) {
//              console.log('Find many error ', err);
//           } else {
//             callback(docs);
//             client.close();
//           }  
//         });
//       }
//     });
//   });
// };

let findNearby = (id, callback) => {
  MongoClient.connect(url, function(err, client) {
    // console.log("Connected successfully to mongo, finding entry");
    const db = client.db(dbName);
    const collection = db.collection('restaurants');

    // Query :id
    collection.findOne({place_id: 1}, (err, document) => {
      if (err) {
        console.log("error = ", err);
      }
      else {
        // Query ids of the nearby restaurants
        // console.log(`document.nearby = ${document.nearby}`);
        collection.find({place_id: {$in: document.nearby} }).explain((err, data) => {
          callback(data.executionStats);
          client.close();
        });
      }
    });
  });
};



// let findOne = (id, callback) => {
//   MongoClient.connect(url, function(err, client) {
//     console.log("Connected successfully to mongo, finding entry");
//     const db = client.db(dbName);
//     const collection = db.collection('restaurants');

//     // Query :id
//     collection.findOne({place_id: 1})
//       .then((document => {
//         collection.find({place_id: {$in: document.nearby} })
//           .toArray((docs) => {
//             callback(docs);
//             client.close();
//           }  
//         ) // promises not working
//         .catch(err, () => {console.log(err);});
//       }))
//       .catch(err, () => {console.log(err);});
//   });
// };

let randomIndexGenerator = (max) => {
  return Math.floor(Math.random() * max);
};


var startTime = new Date().getTime();

let queryThousandTimes = (callback) => {
  for (var i = 0; i < 1000; i++) {
    let randomIndex = randomIndexGenerator(10000000);
    findNearby(randomIndex, (data) => {
      // console.log(`data = ${JSON.stringify(data)}`);
    });
    if (i === 999) {
      let endTime = new Date().getTime();
      console.log(`time elapsed = ${endTime - startTime}`);
    }
  }
}

queryThousandTimes();
// 563, 467, 464, 511, 458, 448, 464
