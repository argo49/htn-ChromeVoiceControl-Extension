window.onload = function () {

    //injectScript(chrome.extension.getURL('scripts/index.js'));
    //injectScript('https://cdn.socket.io/socket.io-1.0.6.js');

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
    var hasTransferDiv = false;

    chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
        if (msg.action == 'start-listening') {

            loadDataTransferDiv();

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

    function loadDataTransferDiv() {
        if (hasTransferDiv) {
            return;
        } else {
            hasTransferDiv = true;
        }
        var transferDiv = document.createElement('div');
        transferDiv.id  = "myCustomEventDiv";
        document.getElementsByTagName('body')[0].appendChild(transferDiv);

        var port = chrome.extension.connect();
        document.getElementById('myCustomEventDiv').addEventListener('myCustomEvent', function() {
            var eventData = document.getElementById('myCustomEventDiv').innerText;

            eventData = JSON.parse(eventData);
            console.log(eventData);
            chrome.runtime.sendMessage(eventData);


        });
    }

}