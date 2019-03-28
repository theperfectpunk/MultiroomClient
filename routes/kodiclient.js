var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* Play song after delay. */
router.post('/play', function(req, res, next) {
  //debugger;
  console.log(req.body.timestamp - new Date().getTime())
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

module.exports = router;
