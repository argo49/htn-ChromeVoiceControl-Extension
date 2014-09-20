
waitForSocketIO();

function waitForSocketIO  () {
    if (typeof io === 'undefined') {
        console.log('waiting for socket.io ...');
        window.setTimeout(waitForSocketIO, 10);
    } else {
        runSocketIO();
    }
}

function runSocketIO () {
    var socket = io.connect('https://ancient-journey-3463.herokuapp.com/');

    // Emit another event back to the server
    socket.emit('my other event', { clientSide: 'data' });
    socket.on('news', function (data) {


        console.log(data);

        // Emit another event back to the server
        socket.emit('my other event', { clientSide: 'data' });
    });

}