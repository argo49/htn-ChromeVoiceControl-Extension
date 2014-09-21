bundles_list = [];
url_list = [];

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

function getBundles(){
    dictionray_passed = chrome.storage.sync.get( function() );

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
        query = query.replace(/ /g, "");

        getBundles();//call function to execute here

        //Yes, it's a bundle
        if(bundles_list.indexOf(query) > -1){
            for (value in url_list){
                var site = url_list[value];
                chrome.tabs.create({url:'http://' + site});//create tab
            }
        }

        //No, it's a website instead
        else{
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