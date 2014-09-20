chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);

    if (command == "start-listening") {
        console.log('Listening!');

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "start-listening"}, function(response) {});
        });
    }
});