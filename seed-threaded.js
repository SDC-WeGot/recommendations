const MongoClient = require('mongodb').MongoClient;
const _ = require('ramda');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length; // 8

var time = new Date().getTime();

var obj = {
  test1: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus molestias vel, nesciunt, esse, magni optio officiis minima necessitatibus magnam ratione eveniet. Reprehenderit, dolor labore. Omnis excepturi magni, explicabo ad iste?',
  test2: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ipsam mollitia sit animi quam, amet, incidunt magnam, ut asperiores, minima similique expedita quaerat tempore consequatur quo aperiam ducimus ipsum sequi?',
  test3: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem mollitia numquam cupiditate ex, obcaecati. Similique saepe beatae, harum vel repellendus, voluptatem vero neque illo, ut temporibus architecto tempora rem aut.'
};

if (cluster.isMaster){
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} finished`);
  });
} else {
  seedDB();
  console.log(`Worker ${process.pid} started`);
}


function seedDB(){
  MongoClient.connect('mongodb://localhost/').then((client) => {
    const db = client.db('recs');
    const collection = db.collection('testing');

    var count = parseInt(10000000 / numCPUs);
    const size = 20000; 

    async function insertBulk(){
      var ops = _.range(0, size).map((id) => {
        return { insertOne: { "document": {...obj, rid: id*Math.random() } }};
      });

      await collection.bulkWrite(ops, { ordered: false }); 
      count -= size;
      if (count > 0){
        insertBulk();
      } else {
        console.log('done in ', (new Date().getTime() - time) / 1000, 's :3 ^_^ <3 <(^_^<)');
        client.close();
        process.exit();        
      }
    }

    insertBulk();
  });
}