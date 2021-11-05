const request = require("request");

const fetchMyIP = function(callback) {
  request(
    `https://api.ipify.org?format=json`,
    function(error, response, body) {
      if (error) {
        callback(error);
        return;
      }
      const ipData = JSON.parse(body).ip;
      console.log(ipData);
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
    }
  );
};
  
module.exports = { fetchMyIP };



   