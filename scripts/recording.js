
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
    $('<div id="myCustomEventDiv"/>').appendTo($('body')).css('display','none');
    $('<div id="wit-entities"/>').appendTo($('body')).css('display','none');

    mic = new Wit.Microphone(document.getElementById("wit-microphone"));

    mic.onready = function () {
      console.log("Microphone is ready to record");
      if (!hasRecordedOnce) {
        hasRecordedOnce = true;
        $('#wit-microphone').click();
      }
    };
    mic.onaudiostart = function () {
        var body = $('body');
        // I know this is terrible: should fix later with propr css
        body.append($('<div id="wit-recording"/>')
            .text('Listening...')
            .css({
                backgroundColor:"rgba(0,0,0,0.5)",
                color: '#f4f4f4',
                position:'fixed',
                top: 0,
                left: 0,
                padding:'10px',
                zIndex: 10000
            })
            .prepend($('<div id="wit-recording-status"/>')
                .css({
                    backgroundColor:'red',
                    height: '10px',
                    width: '10px',
                    float: 'left',
                    marginRight: '10px',
                    marginTop : '2px'
                })
            )
        );
      console.log("Recording started");
    };
    mic.onaudioend = function () {
        $('#wit-recording').text('Processing...')
        .prepend($('<div id="wit-recording-status"/>')
                .css({
                    backgroundColor:'yellow',
                    height: '10px',
                    width: '10px',
                    float: 'left',
                    marginRight: '10px',
                    marginTop : '2px'
                })
            )
        //$('#wit-recording-status').css({backgroundColor: 'yellow'})
      console.log("Recording stopped, processing started");
    };
    mic.onerror = function (err) {
      console.log("Error: " + err);

      $('#wit-recording').text('There was an error processing your request!')
        .prepend($('<div id="wit-recording-status"/>')
                .css({
                    backgroundColor:'#f4f4f4',
                    height: '10px',
                    width: '10px',
                    float: 'left',
                    marginRight: '10px',
                    marginTop : '2px'
                })
            )
        window.setTimeout(function () {
            $('#wit-recording').fadeOut(function () { $(this).remove() });
        }, 1500);
    };

    mic.onresult = function (intent, entities) {
        $('#wit-recording').fadeOut(function () { $(this).remove() });

        var customEvent = document.createEvent('Event');
        customEvent.initEvent('myCustomEvent', true, true);

        function fireCustomEvent(data) {
            hiddenDiv = document.getElementById('myCustomEventDiv');
            hiddenDiv.innerText = JSON.stringify(data);
            hiddenDiv.dispatchEvent(customEvent);
        }

        fireCustomEvent({"intent": intent, "entities": entities});

        console.log(intent, entities);

    };

    mic.connect("BMW5G6EWIQFC3ZBIUC3ZIJRJ3ZQG766X");
}
