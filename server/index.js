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
  // TODO - your code here!
  // This route should return all restaurants
  console.log('GET restaurants');
  //make call to database
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
  // placeId="ChIJFUBxSY6AhYARwOaLV7TsLjw"
  console.log("GET " + req.url);
  // find ChIJFUBxSY6AhYARwOaLV7TsLjw in database
  restaurants.findOne(placeId, (err, data)=> {
    if(err){
      res.status(500);
      console.log(err);
    } else{
      console.log("restaurant info:",data);
      res.status(200);
      // res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
      res.send(data);
    }
  });


  //api call to nearby places to get the top 6 id's returned

  //retrieve data from db

  //send data of 6 restaurants back to client state
  // res.send('hello');
  
});


app.listen(3000, function () { console.log('WeGot app listening on port 3000!') });
