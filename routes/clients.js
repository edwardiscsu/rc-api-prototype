var express = require('express');
var router = express.Router();

/* GET client page. */
router.get('/', function(req, res, next) {
    var port = normalizePort(process.env.PORT || '3000');
    res.render('clients', { title: 'RC Client', port: port });
});

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

module.exports = router;
