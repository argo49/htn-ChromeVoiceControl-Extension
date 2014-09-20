window.onload = function () {
/*
    // Inject local index.js script
    var scriptContainer = document.createElement('script');
    scriptContainer.src = chrome.extension.getURL('scripts/index.js');
    document.getElementsByTagName('body')[0].appendChild(scriptContainer);

    scriptContainer = null

    // Inject socket.io
    scriptContainer = document.createElement('script');
    scriptContainer.src = 'https://cdn.socket.io/socket.io-1.0.6.js';
    document.getElementsByTagName('body')[0].appendChild(scriptContainer);
*/
    injectScript(chrome.extension.getURL('scripts/index.js'));
    injectScript('https://cdn.socket.io/socket.io-1.0.6.js');

    function injectScript(script) {
        var scriptContainer = document.createElement('script');
        scriptContainer.src = script;
        document.getElementsByTagName('body')[0].appendChild(scriptContainer);
    }

    function injectStyle() {
        var scriptContainer = document.createElement('link');
        scriptContainer.src = script;
        document.getElementsByTagName('body')[0].appendChild(scriptContainer);
    }

    function nowRecording () {
        // var div
    }

    chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
        if (msg.action == 'start-listening') {
            // Tiem 2 start listening
            alert('inject script');
            // Inject listening scripts
            injectScript(chrome.extension.getURL('scripts/microphone.js'));
            injectScript(chrome.extension.getURL('scripts/jquery.min.js'));
            injectScript(chrome.extension.getURL('scripts/recording.js'));




        }
    });
}