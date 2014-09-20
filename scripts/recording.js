
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
      console.log(intent, entities);
    };

    mic.connect("BMW5G6EWIQFC3ZBIUC3ZIJRJ3ZQG766X");
}
