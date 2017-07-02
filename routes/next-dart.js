var express = require('express');
var irishRailApi = require('irishrail-realtime-node');
var router = express.Router();

function getNextDart(options, callback) {
  var params = {
    StationType: "D",
    StationDesc: options.From
  }

  irishRailApi.getStationData(function(res) {
    var trains = res.response.ArrayOfObjStationData.objStationData;

    if (trains) {
      for (var i = 0; i < trains.length; i++) {
        if (trains[i].Direction.toString() === options.Direction) {
          var duein = parseInt(trains[i].Duein.toString());
          var late = parseInt(trains[i].Late.toString());
          var arrivalTime = duein + late;
          callback({
            Duein: duein,
            From: options.From,
            Direction: options.Direction,
            Late: late,
            arrivalTime: arrivalTime
          });
          break;
        }
      }
    }
    else {
      callback({
        trainsRunning: false
      })
    }
  }, true, params)
}

router.get('/', function(req, res, next) {
  var station = req.query.station;
  var direction = req.query.direction;

  getNextDart({
    From: station,
    Direction: direction
  }, function(time) {
    res.json(time)
  })
});

module.exports = router;
