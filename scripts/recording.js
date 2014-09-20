$(document).ready(function () {
    var mic = new Wit.Microphone(document.getElementById("microphone"));
    mic.onresult = function (intent, entities) {

    }

    mic.connect('BMW5G6EWIQFC3ZBIUC3ZIJRJ3ZQG766X');

    mic.onready = function () {
        console.log("Microphone is ready to record");
        //mic.start();
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
    };
    mic.connect("CLIENT_T");
    // mic.start();
    // mic.stop();

});