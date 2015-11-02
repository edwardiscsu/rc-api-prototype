window.onload = function() {

    var clients = [];
    var messages = [];
    var socket = io.connect('http://localhost:3000');

    var carPosition = document.getElementById("car-position");
    var client  = document.getElementById("client");
    var content = document.getElementById("content");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            triggerCommands(messages.length - 1, data.message);
            var html = '';
            for(var i=messages.length - 1; i>=0; i--) {
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

    function triggerCommands(currentIndex, message) {
        var index = message.indexOf("[")
        if (index > - 1) {
            var endIndex = message.indexOf("]");
            var time = message.substring(index+1, endIndex);
            var oldCommand = message.substring(0, index);
            if (currentIndex == 0 || carPosition.innerHTML == "stopping...") {
                carPosition.innerHTML = "going " + getCommand(message) + "...";
            }

            setTimeout(function() {
                var command = moment().format("hh:mm:ssA: ") + "completed - {" + oldCommand + "}";
                socket.emit('send', { message: command });
                runNext(currentIndex);
            }, parseInt(time)*1000);
        }
    }

    function runNext(currentIndex) {
        if (currentIndex + 1 < messages.length) {
            var complete = false;
            for (var i = currentIndex + 1; i < messages.length && !complete; i++) {
                if (messages[i].indexOf("[") > -1) {
                    carPosition.innerHTML = "going " + getCommand(messages[i]) + "...";
                    complete = true;
                }
            }
            if (!complete)
                carPosition.innerHTML = "stopping...";
        } else carPosition.innerHTML = "stopping...";
    }

    function getCommand(message) {
        return message.substring(message.indexOf(')') + 1, message.indexOf('['));
    }
}



