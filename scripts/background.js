chrome.commands.onCommand.addListener(function(command) {
    var isListening = false;
    if (command == "start-listening") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            if (!isListening) {
                isListening = true;
                chrome.tabs.sendMessage(tabs[0].id, {action: "start-listening"}, function(response) {});
            } else {
                isListening = false;
                chrome.tabs.sendMessage(tabs[0].id, {action: "stop-listening"}, function(response) {});
            }

        });
    }
});