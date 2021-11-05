const request = require("request");

// const fetchMyIP = function(callback) {
//   request(
//     `https://api.ipify.org?format=json`,
//     function(error, response, body) {
//       if (error) {
//         callback(error);
//         return;
//       }
//       const ipData = JSON.parse(body).ip;
//       console.log(ipData);
//       if (response.statusCode !== 200) {
//         const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//         callback(Error(msg), null);
//         return;
//       }
//     }
//   );
// };
   


const fetchCoordsByIP = function(ip, callback) {
  request(
    `https://freegeoip.app/json/${ip}`,
    function(error, response, body) {
      if (error) {
        callback(error,null);
      }
          
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      // if is-200 status, then parse through the body
      if (response.statusCode) {
        const { latitude, longitude } = JSON.parse(body);
        callback(null, {latitude, longitude});
      }
    }
  );
};

module.exports =  fetchCoordsByIP;



   