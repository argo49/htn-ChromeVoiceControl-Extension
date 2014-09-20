window.onload = function () {

    var scripts = [
        'scripts/index.js',
        'https://cdn.socket.io/socket.io-1.0.6.js'];

    for (script in scripts) {
        injectScript(script);
    }

}

function injectScript(scriptPath) {
    var scriptContainer = document.createElement('script');
    <scriptContainer.src = chrome.extension.getURL(scriptPath);
    document.getElementsByTagName('body')[0].appendChild(scriptContainer);
}