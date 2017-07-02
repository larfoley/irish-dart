var express = require('express');
var irishRailApi = require('irishrail-realtime-node');
var router = express.Router();

function getAllStations(callback) {
  irishRailApi.getAllStations(function(res) {
    var stations = res.response.ArrayOfObjStation.objStation;
    callback(stations.map(function(s) {
      return s.StationDesc.toString()
    }));
  }, true, {
    StationType: "D"
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  getAllStations(function(stations) {
    res.render('index',{ title: 'Express', stations: stations });
  })
});

module.exports = router;
