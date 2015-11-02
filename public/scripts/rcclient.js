window.onload = function() {

    var clients = [];
    var messages = [];
    var socket = io.connect('http://localhost:3000');

    var client  = document.getElementById("client");
    var content = document.getElementById("content");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            triggerCommands(data.message);
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

    function triggerCommands(message) {
        var index = message.indexOf("[")
        if (index > - 1) {
            var endIndex = message.indexOf("]");
            var time = message.substring(index+1, endIndex);
            var oldCommand = message.substring(0, index);
            setTimeout(function() {
                var command = moment().format("hh:mm:ssA: ") + "completed - {" + oldCommand + "}";
                socket.emit('send', { message: command });
            }, parseInt(time)*1000);
        }
    }
}



