window.onload = function () {

    // Inject local index.js script
    var scriptContainer = document.createElement('script');
    scriptContainer.src = chrome.extension.getURL('scripts/index.js');
    document.getElementsByTagName('body')[0].appendChild(scriptContainer);

    scriptContainer = null

    // Inject socket.io
    scriptContainer = document.createElement('script');
    scriptContainer.src = 'https://cdn.socket.io/socket.io-1.0.6.js';
    document.getElementsByTagName('body')[0].appendChild(scriptContainer);

    chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
        if (msg.action == 'start-listening') {
            // Tiem 2 start listening
            alert("I'm all ears!");
        }
    });
}