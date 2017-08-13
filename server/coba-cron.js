var cron = require('node-cron');
var firebase = require('firebase')

var config = {
  apiKey: "AIzaSyCcfYVFV31_UnKJfBL24uawHGKz_Z26sFE",
  authDomain: "awesome-presentation.firebaseapp.com",
  databaseURL: "https://awesome-presentation.firebaseio.com",
  projectId: "awesome-presentation",
  storageBucket: "awesome-presentation.appspot.com",
  messagingSenderId: "1021392727967"
};

firebase.initializeApp(config);

var database = firebase.database()

var currentUmur = 0
var currentHeight = 0
var currentFruits = 0
var harvested = 0

var grow = () => {
  database.ref('manggo-tree').set({
    age: currentUmur + 1,
    height: currentHeight + Math.round((Math.random() * 4) * 100) / 100,
    fruits: currentFruits + Math.floor(Math.random() * 12),
    harvested: harvested
  })
}

var harvest = () => {
  database.ref('manggo-tree').child('harvested').set(currentFruits)
  database.ref('manggo-tree').child('fruits').set(0)
}

database.ref('manggo-tree').on('value', function(snapshot) {
  currentAge = snapshot.val().age
  currentHeight = snapshot.val().height
  currentFruits = snapshot.val().fruits
  harvested = harvested + snapshot.val().harvested
  console.log(`
    age: ${currentAge}
    height: ${currentHeight}
    fruits: ${currentFruits}
    harvested: ${harvested}`)
})

cron.schedule('0 */2 * * *', function(){
  console.log(`running a task every two hours ${new Date().toString()}`);
  grow()
});

cron.schedule('0 */5 * * *', function(){
  console.log(`running a task every five hours ${new Date().toString()}`);
  harvest()
});
