import moment from 'moment';
import crypto from 'crypto';
import phone from 'phone';
import geocoder from 'geocoder';

const helpers = {
  createGameTime: (reqTime) => {
    // works for TODAY
    let gameTime = new Date(
      moment().get('year'),
      moment().get('month'),
      moment().get('date'),
      parseInt(reqTime)
    );
    return gameTime;
  },
  // using === instead of >= to avoid multiple texts 
  // put texted flag on each player
  hasEnoughPlayers: game => game.playRequests === game.minPlayers,

  includesPlayer: (game, smsNum) => game.smsNums.reduce((included, smsObj) => {
    return smsObj.smsNum === smsNum || included;
  }, false),

  forEachPlayer: (game, cb) => {
    game.smsNums.forEach(smsObj => {
      cb(smsObj.smsNum);
    });
  },

  phone: num => phone(num)[0],

  reverseGeocode: (avgLoc, cb) =>{
    let geoLng = +avgLoc.split(',')[0];
    let geoLat = +avgLoc.split(',')[1];
    console.log("REVERSE AVG:", avgLoc, "TYPE", typeof(avgLoc));

    geocoder.reverseGeocode(geoLat, geoLng, function (err, data) {
          if (err){
            console.log("Sorry you had a location error:", err);
          } else {
          console.log("DEGEOCODE-TEST", data.results[0].formatted_address);
           cb(data.results[0].formatted_address);
        } // do something with data 
        });
  }, 

  findCentralLocation: (game, cb) => {
    game.smsNums.forEach(users => {
      cb(users.address); 
    });
  }
  // address: (address, cb) => {
  //   geocoder.geocode({'address': address}, (results, status) => {
  //     console.log("RES", results, "STATUS", status);
  //     if(status){
  //       console.log(results[0].geomety.location);
  //       cb(results[0].geometry.location);
  //     }else{
  //       console.log("Geocode was not successful because:" + status);
  //     }
  //   })
  // }
  
  // var geocodeAddress = function(address, callback) {
  //       var geocoder = new google.maps.Geocoder();
  //       geocoder.geocode( { 'address': address}, function(results, status) {
  //           if (status == google.maps.GeocoderStatus.OK) {
  //               callback(results[0].geometry.location);
  //           } else {
  //               console.log("Geocode was not successful for the following reason: " + status);
  //           }
  //       });
  //   };

  // address: address =>{
  //   geocoder.geocode(address, function(err, data){
  //     if(err){
  //       console.log("Geocode did not respond well", err);
  //     }
  //     console.log("GEOCODE Data", data.results[0].geometry.location);
  //     return data.results[0].geometry.location;
  //   })
  // }
};

export default helpers;