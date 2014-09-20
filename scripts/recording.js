
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

function record () {

    $('<div id="microphone"/>').appendTo($('body'));
    $('<div id="result"/>').appendTo($('body'));
    $('<div id="info"/>').appendTo($('body'));
/*
    $('<div id="witmic"/>').appendTo($('body'));
    var mic = new Wit.Microphone(document.getElementById('witmic'));

    mic.onready = function () {
        console.log("Microphone is ready to record");
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

    mic.connect('BMW5G6EWIQFC3ZBIUC3ZIJRJ3ZQG766X');

    mic.start();
    // mic.stop();

    window.setTimeout(function () {
        mic.stop();
    }, 1000);
*/

    var mic = new Wit.Microphone(document.getElementById("microphone"));
    var colors = {
        blue:     { hue: 43680, saturation: 255,  brightness: 127},
        cyan:     { hue: 35000, saturation: 255,  brightness: 127 },
        fuchsia:  { hue: 54612, saturation: 255,  brightness: 127 },
        green:    { hue: 26000, saturation: 255,  brightness: 63 },
        lavender: { hue: 50050, saturation: 145,  brightness: 173 },
        orange:   { hue: 6100,  saturation: 255,  brightness: 150 },
        red:      { hue: 0,     saturation: 255,  brightness: 127 },
        violet:   { hue: 50400, saturation: 255,  brightness: 127 },
        white:    { hue: 0,     saturation: 0,    brightness: 255 },
        yellow:   { hue: 14563, saturation: 255,  brightness: 150 }
    };

    var info = function (msg) {
      document.getElementById("info").innerHTML = msg;
    };
    mic.onready = function () {
      info("Microphone is ready to record");
    };
    mic.onaudiostart = function () {
      info("Recording started");
    };
    mic.onaudioend = function () {
      info("Recording stopped, processing started");
    };
    mic.onerror = function (err) {
      info("Error: " + err);
    };

    mic.onresult = function (intent, entities) {
      var result = 'WAT?!';
      console.log(intent, entities);


      document.getElementById("result").innerHTML = result;
    };

    mic.connect("BMW5G6EWIQFC3ZBIUC3ZIJRJ3ZQG766X");
    // mic.start();
    // mic.stop();

    function sendRequest(url, data) {
      $.ajax({
        url: url,
        type: 'PUT',
        data: data,
        dataType: 'json'
      });
    }

    function kv (k, v) {
      if (toString.call(v) !== "[object String]") {
        v = JSON.stringify(v);
      }
      return k + "=" + v + "\n";
    }

}
