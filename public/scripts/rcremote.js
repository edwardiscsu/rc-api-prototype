window.onload = function() {

    var clients = [];
    var messages = [];
    var socket = io.connect('http://localhost:3000');

    var upButton    = document.getElementById("input-up");
    var leftButton  = document.getElementById("input-left");
    var downButton  = document.getElementById("input-down");
    var rightButton = document.getElementById("input-right");

    var userName      = document.getElementById("user-name");
    var executionTime = document.getElementById("execution-time");

    var client        = document.getElementById("client");
    var content       = document.getElementById("content");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=messages.length-1; i>=0; i--) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else if(data.client) {
            clients.push(data.client);
            client.innerHTML = clients[clients.length - 1];
        } else {
            console.log("There is a problem:", data);
        }
    });

    upButton.onclick = function() {
        var text = moment().format("hh:mm:ssA") + ": (" + userName.value.toString() + ") "
            + "up" + "[" + executionTime.value.toString() + "]";
        socket.emit('send', { message: text });
    }

    leftButton.onclick = function() {
        var text = moment().format("hh:mm:ssA") + ": (" + userName.value + ") "
            + "left" + "[" + executionTime.value.toString() + "]";
        socket.emit('send', { message: text });
    }

    downButton.onclick = function() {
        var text = moment().format("hh:mm:ssA") + ": (" + userName.value + ") "
            + "down" + "[" + executionTime.value.toString() + "]";
        socket.emit('send', { message: text });
    }

    rightButton.onclick = function() {
        var text = moment().format("hh:mm:ssA") + ": (" + userName.value + ") "
            + "right" + "[" + executionTime.value.toString() + "]";
        socket.emit('send', { message: text });
    }
}