const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
var restaurants = require('../db/models/restaurant.js');
var mongoose = require('mongoose');
var uri = 'mongodb://127.0.0.1/wegot'
mongoose.connect(uri);

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/restaurants/:id', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});

app.get('/api/restaurants', function (req, res) {
  // This route should return all restaurants
  console.log('GET restaurants');
  // retrieve from database
  restaurants.findAll((err, data)=>{
    if(err){
      res.status(500);
      console.log(err);
    } else{
      console.log("restaurant info:",data);
      res.status(200);
      res.json(data);
    }
  });

});

app.get('/api/restaurants/:id', function (req, res) {
  var placeId = req.params.id || 0;
  console.log("GET " + req.url);
  // find one restaurant based on id
  // restaurants.findOne(placeId, (err, data)=> {
  //   if(err){
  //     res.status(500);
  //     console.log(err);
  //   } else{
  //     console.log("restaurant info:",data);
  //     res.status(200);
  //     res.send(data);
  //   }
  // });

  //api call to retrieve nearby places. get top 6 id's returned

  //retrieve data from db

  //find 6 restaurants
  restaurants.findTop6Restaurants((err, data)=> {
    if(err){
      res.status(500);
      console.log(err);
    } else{
      console.log("restaurant info:",data);
      res.status(200);
      res.send(data);
    }
  });
  //send data of 6 restaurants back to client state

});


app.listen(3000, function () { console.log('WeGot app listening on port 3000!') });
