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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("onMessage:", request);

    var intent   = request.intent;
    var entities = request.entities;

    if(intent == 'open'){
        //gets all tabs with specified properties or all if no properties specified
        chrome.tabs.query({}, function(array_of_Tabs){
            var foundExistingTab = false;
            for (i = 0; i < array_of_Tabs.length; i++){
                console.log('1');
                var tab = array_of_Tabs[i];

                // I have to do it this way
                var j = 0;
                var query = {};
                for (var prop in entities) {
                    query[j] = entities[prop];
                    j++;
                }
                query = query[0];
                query = query.body.replace(/ /g, "");

                //switch to this tab
                if ((tab.url).indexOf(query) > -1){
                    chrome.tabs.update(tab.tabId, {selected: true});
                    i = array_of_Tabs.length;
                    foundExistingTab = true;
                    console.log('Found foundExistingTab');
                }
            }

            if (!foundExistingTab) {
                chrome.tabs.create({url:'http://www.' + query + '.com/'});
            }
        });

    }

    //CLOSE intention
    else{
        //gets tabs with specified properties or all if no properties specified
        chrome.tabs.query( { }, function(array_of_Tabs){

            for (i = 0; i < array_of_Tabs.length; i++){
                var tab = array_of_Tabs[i];
                //close this tab
                if ((tab.url).contains(entities)){
                    chrome.tabs.remove(tab.tabId);
                }
                //create the new tab
                else{
                    break;//tab to be closed in fact does not exist, do nothing.
                }
            }
        });
    }
});