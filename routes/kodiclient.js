var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const addTimestamp = require('../helpers/addTimestamp');

/* Play song after delay. */
router.post('/play', function(req, res, next) {
  //debugger;
  //console.log(req.body.timestamp - new Date().getTime())
  setTimeout(() => {
    fetch('http://127.0.0.1:8080/jsonrpc', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(req.body.payload)
    })
    .then((response) => {
      //debugger;
      res.send({message: "success"});
    })
  }, req.body.timestamp - new Date().getTime())
});

/* Seek currently playing song after delay. */
router.post('/seek', function(req, res, next) {
  var seekOffset = new Date().getTime() - req.body.timestamp;
  var seekTime = addTimestamp(seekOffset, req.body.seekTime);
    fetch('http://127.0.0.1:8080/jsonrpc', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"jsonrpc":"2.0","method":"player.seek", "params": {"playerid": 0, "value": {"time":seekTime}}, "id": 0})
    })
    .then((response) => {
      //debugger;
      res.send({message: "success"});
    })
});

/* Get current seek position. */
router.get('/position', function(req, res, next) {
  var currentTimeStamp = new Date().getTime();
  fetch('http://127.0.0.1:8080/jsonrpc', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"jsonrpc":"2.0","method":"Player.GetProperties","params":{"playerid":0,"properties":["time"]},"id":0})
  })
  .then((response) => {
    var seekTime = response.result.time;
    res.send({timestamp: currentTimeStamp, seekTime: seekTime})
  })
})

/* Play/Pause player */
router.post('/playpause', function(req, res, next) {
  
  var timeOffset = req.body.timestamp - new Date().getTime();

  setTimeout( () => {
    fetch('http://127.0.0.1:8080/jsonrpc', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"jsonrpc":"2.0","method":"Player.PlayPause","params":{"playerid":0},"id":0})
    })
    .then((response) => {
      res.send({"message": "success"})
    })}, timeOffset
  );
})

module.exports = router;
