
waitForSocketIO();

function waitForSocketIO  () {
    if (typeof io === 'undefined') {
        console.log('waiting...');
        window.setTimeout(waitForSocketIO, 10);
    } else {
        testSocketIO();
    }
}

function testSocketIO () {
    var socket = io.connect('http://ancient-journey-3463.herokuapp.com/');

    // Emit another event back to the server
    socket.emit('my other event', { clientSide: 'data' });
    socket.on('news', function (data) {


        console.log(data);

        // Emit another event back to the server
        socket.emit('my other event', { clientSide: 'data' });
    });
}