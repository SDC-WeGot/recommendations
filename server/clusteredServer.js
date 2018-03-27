// const newRelic = require('newrelic');
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const path = require('path');
// const cors = require('cors');
const dbController = require('../db/pgpromise-queries');
const pg = require('pg');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length; // 4

const dbAddress = process.env.DB_ADDRESS || 'localhost';
var connectionString = `postgres://${dbAddress}:5432/sagat_sql`;
var pgClient = new pg.Client(connectionString);


// app.use(cors());
// app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/restaurants/:id', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/restaurants/:id/recommendations', function (req, res) {
  var placeId = req.params.id || 0;
  // console.log("GET " + req.url);
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

const masterProcess = () => {
  console.log(`Master ${process.pid} started`);
  for (var i = 0; i < numCPUs; i++) {
    console.log(`Forking worker ${i}`);
    cluster.fork();
  }
  cluster.on('exit',(worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.id} crashed. ` + 'Starting a new worker.');
      cluster.fork();
    }
  });
};

const workerProcess = () => {
  console.log(`Worker ${process.pid} started`);
  pgClient.connect()
    .then(() => {
      app.listen(3004, () => {
        console.log('Sagat app listening on port 3004!');
      });
    })
    .catch((err) => {
      console.log(`Error connecting to server, ${err}`);
    });
};

if (cluster.isMaster) {
  masterProcess();
} else {
  workerProcess();
}

