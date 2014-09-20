var socket = io.connect('http://ancient-journey-3463.herokuapp.com/');

// Emit another event back to the server
socket.emit('my other event', { clientSide: 'data' });