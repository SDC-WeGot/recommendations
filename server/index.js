const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dbController = require('../db/pg-queries');


app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/restaurants/:id', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/restaurants/:id/recommendations', function (req, res) {
  // change default to 1?
  var placeId = req.params.id || 0;
  console.log("GET " + req.url);
  // find recommended restaurants based on id
  var results = [];
  dbController.queryPG(placeId, (err, data) => {
    if (err, null) {
      res.status(500);
      console.log(`Error: ${err}`);
    } else if (null, data) {
      res.status(200);
      res.send(data);
    }
  });
});


app.listen(3004, function () { console.log('WeGot app listening on port 3004!') });
