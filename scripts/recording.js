
waitForjQuery();

function waitForjQuery () {
    if (typeof $ === 'undefined') {
        console.log('waiting for jQuery...');
        window.setTimeout(waitForjQuery, 10);
    } else {
        console.log('jQuery loaded');
        record();
    }
}

var hasRecordedOnce = false;
var mic;

function record () {

    $('<div id="wit-microphone"/>').appendTo($('body')).css('display','none');

    mic = new Wit.Microphone(document.getElementById("wit-microphone"));

    mic.onready = function () {
      console.log("Microphone is ready to record");
      if (!hasRecordedOnce) {
        hasRecordedOnce = true;
        $('#wit-microphone').click();
      }
    };
    mic.onaudiostart = function () {
      console.log("Recording started");
    };
    mic.onaudioend = function () {
      console.log("Recording stopped, processing started");
    };
    mic.onerror = function (err) {
      console.log("Error: " + err);
    };

    mic.onresult = function (intent, entities) {

        // buruc mojo

        //OPEN intention
        if(intent == 'open'){
            //gets all tabs with specified properties or all if no properties specified
            chrome.tabs.query( { }, function(array_of_Tabs){

                for (1 = 0; i < array_of_Tabs.length; i++){
                    var tab = array_of_Tabs[i];
                    //switch to this tab  
                    if ((tab.url).contains(entities)){
                        chrome.tabs.update(tab.tabId, {active: true});  
                    }
                    //create the new tab
                    else{
                        chrome.tabs.create('http://www.' + entities + '.com');
                    }                  
                }
            }
        }

        //CLOSE intention
        else{
            //gets tabs with specified properties or all if no properties specified
            chrome.tabs.query( { }, function(array_of_Tabs){

                for (1 = 0; i < array_of_Tabs.length; i++){
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
            }
        }




      console.log(intent, entities);

    };

    mic.connect("BMW5G6EWIQFC3ZBIUC3ZIJRJ3ZQG766X");
}
