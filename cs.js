window.onload = function () {


    var scriptContainer = document.createElement('script');
    scriptContainer.src = chrome.extension.getURL('scripts/index.js');
    document.getElementsByTagName('body')[0].appendChild(scriptContainer);

    scriptContainer = null

    scriptContainer = document.createElement('script');
    scriptContainer.src = 'https://cdn.socket.io/socket.io-1.0.6.js';
    document.getElementsByTagName('body')[0].appendChild(scriptContainer);
}