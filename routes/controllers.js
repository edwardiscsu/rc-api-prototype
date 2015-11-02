var express = require('express');
var router = express.Router();

/* CORS handler. */
router.all('/login', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST commands. */
router.post('/', function(req, res, next) {
  var user = req.body.user;
  var command = req.body.command;
  var time = req.body.time;

  var message = command.toString() + ', ' + time.toString();

  //var socket = io.connect('http://localhost:3000');
  //io.sockets.emit('send', { message: message });
  var io = require('socket.io').listen(router);
  io.sockets.emit('message', message);

  res.setHeader('Content-Type', 'application/json');
  res.format({
    'application-json' : function() {
      res.status(200).send({
        connected: true,
        command: message
      });
    },
    'default' : function() {
      res.status(406).send('Content-Type Required');
    }
  });
});

module.exports = router;
