const request = require("request");

const fetchMyIP = function (callback) {
  request(
    `https://api.ipify.org?format=json`,
    function (error, response, body) {
      if (error) {
        callback(error);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
       const ip = JSON.parse(body).ip;
      if (ip) {
          callback(error, ip);
      }
    }
  );
};

const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, function (error, response, body) {
    if (error) {
      callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // if is-200 status, then parse through the body
    if (response.statusCode) {
      const { latitude, longitude } = JSON.parse(body);
      callback(null, { latitude, longitude });
    }
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    function (error, response, body) {
      if (error) {
        callback(error, null);
      }

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      // if is-200 status, then parse through the body

      const times = JSON.parse(body).response;
      callback(null, times);
    }
  );
};

const nextISSTimesForMyLocation = function(callback) {
    // empty for now
    fetchMyIP((error,ip)=> {
      if (error) {
        return callback(error,null)
      }
      fetchCoordsByIP(ip, (error, location) => {
        if (error) {
          return callback(error,null)
        }
        fetchISSFlyOverTimes(location,(error,nextPasses)=> {
          if (error) {
            return callback(error,null)
          }
          callback(error, nextPasses)
        })
      })
    })
    
    }
  
  
  module.exports = nextISSTimesForMyLocation;
  


// const nextISSTimesForMyLocation = function (callback) {
//   fetchMyIP((error,ip) => {
//     if (error) {
//       return callback(error,null);
//     }
//     fetchCoordsByIP(ip, (error, location) => {
//       if (error) {
//         return callback(error, null);
//       }
//       fetchISSFlyOverTimes(location, (error,lastcall) => {
//         if (error) {
//           callback(error, null);
//         }
//         callback(error, lastcall)
//       });
//     });
//   });
// };

// module.exports = nextISSTimesForMyLocation;
