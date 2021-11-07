
const  nextISSTimesForMyLocation  = require('./iss');

// const { fetchMyIP } = require('./iss');
// const  fetchCoordsByIP = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// const coords = {
//   longitude: "-79.7172",
//   latitude: "43.5639"
// };


// fetchCoordsByIP(coords,(error,data)=>{
//   if (error) {
//     console.log('It did not work.',error);
//     return;
//   }
    
//   console.log('It worked sending data.',data);
    
// });

const calculateTime = (riseTime)=>{
    for(let time of riseTime) {
        const date = new Date(0);
        const duration = time.duration;
        console.log(`Next pass at ${date} for ${duration} seconds!`)
        }
}

nextISSTimesForMyLocation((error, riseTime) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  calculateTime(riseTime);
});



