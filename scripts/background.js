var groups = {};

loadGroups();

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

function getEntityType(entities) {
    for (var prop in entities) {
        return prop;
    }
}

function loadGroups () {
    chrome.storage.sync.get("groups", function(value) {
        console.log("loaded value: ", value);
        groups = value.groups;
    });
}

function getBundles(){
    dictionray_passed = chrome.storage.sync.get( function() {});

    for (key in dictionray_passed){
        bundles_list.push(key);//list of all user's bundles
        url_list = dictionray_passed[key];//list of all websites for this bundle
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("onMessage:", request);

    var intent   = request.intent;
    var entities = request.entities;

    queryType = getEntityType(entities);
    query = entities[queryType]['body'].toLowerCase();

    console.log(queryType);

    //OPEN
    if(intent == 'open'){

        var aGroup = false;
        for (var prop in groups) {
            console.log(query, prop, query.toLowerCase() == prop.toLowerCase());
            if (query.toLowerCase() == prop.toLowerCase()) {
                aGroup = true;
                for (var i = 0; i < groups[prop].length; i++) {
                    chrome.tabs.create({url:'http://www.' + groups[prop][i]});
                }
            }
        }

        //No, it's a website instead
        if (!aGroup) {
            query = query.replace(/ /g, "");

            //gets all tabs with specified properties or all if no properties specified
            chrome.tabs.query({}, function(array_of_Tabs){

                if (queryType == "search_query") {
                    chrome.tabs.create({url:'http://www.' + query + '.com/'});
                } else {
                    chrome.tabs.create({url:'http://www.' + query});
                }

            });
        }

    //CLOSE
    } else if (intent == "close") {
        query = query.replace(/ /g, "");

        //gets tabs with specified properties or all if no properties specified
        chrome.tabs.query({}, function(array_of_Tabs){

            if (query == "currenttab" || query == "tab" || query == "tabs" || query == "thistab") {
                closeCurrentTab();
            }

            for (i = 0; i < array_of_Tabs.length; i++){
                var tab = array_of_Tabs[i];
                //close this tab
                if ((tab.url).indexOf(query) > -1){
                    console.log(tab.url);
                    chrome.tabs.remove(tab.id);
                }
            }
        });
    //SEARCH
    } else if (intent == "search") {

    //SWITCH

        query = query.replace(/ /g, "%20");
        query = "%27" + query + "%27";
        chrome.tabs.create({url:'https://api.datamarket.azure.com/Bing/Search/v1/Web?Query=' + query});

    } else if (intent == "switch_to") {
        query = query.replace(/ /g, "");

        chrome.tabs.query({}, function(array_of_Tabs){
            for (i = 0; i < array_of_Tabs.length; i++){
                var tab = array_of_Tabs[i];

                //switch to this tab
                if ((tab.url).indexOf(query) > -1){

                    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
                        if (tab.id != arrayOfTabs[0].id) {
                            chrome.tabs.update(tab.id, {selected: true});
                            i = array_of_Tabs.length;
                        }
                    });
                }
            }

        });
    }

});

function closeCurrentTab() {
    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
        chrome.tabs.remove(arrayOfTabs[0].id);
    });
}