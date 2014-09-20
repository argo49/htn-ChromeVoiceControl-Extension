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

    function injectScript(script, id) {
        var scriptContainer = document.createElement('script');
        scriptContainer.src = script;
        scriptContainer.id  = id;
        document.getElementsByTagName('body')[0].appendChild(scriptContainer);
    }

    function injectStyle(style) {
        var scriptContainer  = document.createElement('link');
        scriptContainer.rel  = "stylesheet";
        scriptContainer.type = "text/css";
        scriptContainer.src  = style;
        document.getElementsByTagName('body')[0].appendChild(scriptContainer);
    }

    var hasScript = false;

    chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
        if (msg.action == 'start-listening') {

            hasScript = document.getElementById('wit-microphone-script') ? true : false;

            // Inject listening scripts
            if (!hasScript) {
                injectScript(chrome.extension.getURL('scripts/microphone.js'), 'wit-microphone-script');
                injectScript(chrome.extension.getURL('scripts/jquery.min.js'));
                injectScript(chrome.extension.getURL('scripts/recording.js'));
                injectStyle(chrome.extension.getURL('styles/    styles.css'));
            } else {
                document.getElementById('wit-microphone').click();
            }

        } else if (msg.action == 'stop-listening') {
            document.getElementById('wit-microphone').click();
        }
    });
}