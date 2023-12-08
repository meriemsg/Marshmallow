var myTimerApp = angular.module('TimerApp', []);

myTimerApp.controller('alarmAppController', function($scope, $interval) {

    // set the intial hours and minutes to 0:
    // the actual numbers:
    $scope.hours = 0;
    $scope.minutes = 0;
    // the variables for the string display:
    $scope.displayHours = $scope.hours + "0";
    $scope.displayMinutes = $scope.minutes + "0";

    // var alarmSound = new Audio('audio/Time Will Tell.mp3');
    // for toggling the wake up message on and off, this reference is here so that the
    // interval it points to can be cancelled by pressing "stop"
    var toggleMessage;

    var alarmMessages = ['Have an Awesome day! ' + '\n' + 'Unless its Monday .. Mondays are baaad',
      
    ];
    //

    // the interval that will constantly check if the current time is equal to the set time:
    var timeChecker;
    // a flag to determine if the alarm is playing or not. Use to prevent the stop function from doing stuff, unless the alarm is playing:
    var alarmIsActive = false;

    var snoozeActive = false;
    // how many minutes do we allow before the alarm goes off again?
    $scope.snoozeTime = 10;

    var alarmIsSet = false;

    // use interval to check the time every second and determine if the Alarm needs to go off:
    $scope.setAlarm = function() {

        $('#alarmSet').text("Alarm has been set for " + $scope.displayHours + " : " +
            $scope.displayMinutes);

        if (snoozeActive || alarmIsSet)
            return;

        timeChecker = $interval(
            function() {
                var date = new Date();
                if (date.getMinutes() == $scope.minutes && date.getHours() == $scope.hours) {
                    snoozeActive = false;
                    alarmIsActive = true;
                    alarmSound.play();
                    displayAlarmMessage();
                    $interval.cancel(timeChecker);
                }

                // var hoursFromNow =  Math.abs(date.getHours() - $scope.hours);
                // var minutesFromNow = Math.abs(date.getMinutes() - $scope.minutes);

                // $('#alarmSet').text("Alarm has been set for " + $scope.displayHours + " : " +
                // $scope.displayMinutes + "\n\n" + hoursFromNow + " hours and " +
                // minutesFromNow + " minutes from now");

            }, 1000);

        alarmIsSet = true;

    }

    $scope.cancelAlarm = function() {
        // cancel the interval and stop checking for an alarm:
        $interval.cancel(timeChecker);
        $('#alarmSet').text("Alarm is not set");
        snoozeActive = false;
        alarmIsSet = false;
    }

    // show the alarm message and toggle it on and off:
    var displayAlarmMessage = function() {
        var index = Math.floor(Math.random() * alarmMessages.length);
        var randomMessage = alarmMessages[index];
        $('#alarmMessage').html(randomMessage);
        // get rid of the alarm set status message first:
        $('#alarmSet').hide();

        var hidden = true;
        toggleMessage = $interval(function() {

            if (hidden) {
                $('#alarmMessage').show();
                hidden = false;
            } else {
                $('#alarmMessage').hide();
                hidden = true;
            }

        }, 1000);
    }

    $scope.stopAlarm = function() {
        // don't allow this button to do anything unless the alarm is playing:
        if (!alarmIsActive)
            return;

        alarmIsSet = false;
        // stop playing audio
        alarmSound.pause();
        // so that the next alarm will play the alarm sound from the start
        alarmSound.currentTime = 0;
        // stop displaying the alarm message:
        $interval.cancel(toggleMessage);
        // make sure the message is gone:
        $('#alarmMessage').hide();
        // go back to the default alarm is not set text once ana alarm has been stopped:
        $('#alarmSet').show();
        $('#alarmSet').text("Alarm is not set");
        alarmIsActive = false;
    }

    // makes the alarm snooze:
    $scope.setSnooze = function() {
        // snooze should only work if the alarm is going off:
        if (!alarmIsActive)
            return;

        // stop the alarm and activate it after '$scope.snoozeTime' minutes:
        $scope.stopAlarm();

        // set the alarm to go off later:
        for (var i = 0; i < $scope.snoozeTime; i++)
            $scope.incrMinutes();

        $scope.setAlarm();
        snoozeActive = true;
    }

    /** 
    modify the snooze time: 
    **/

    $('#modifySnooze').on('click', function() {
        // can't modify snooze time once a snooze time is already set:
        if (snoozeActive)
            return;
        $('#snoozeForm').show();
        $('#modifySnooze').hide();
    });

    // the new snooze time has been set, now this function is invoked:
    $('#snoozeModified').on('click', function() {
        var newSnooze = $('#newSnooze').val();
        // boundary check:
        if (!(newSnooze >= 1 && newSnooze <= 20))
            return;
        $scope.snoozeTime = $('#newSnooze').val();
        $('#snoozeForm').hide();
        $('#modifySnooze').show();
    });

    /**
     **/

    $scope.incrHours = function() {
        // don't allow the alarm time to be modified if the alarm has been set:
        if (alarmIsSet)
            return;

        if ($scope.hours == 23)
            $scope.hours = 0;

        else
            $scope.hours++;

        // now set the display string for hours:
        updateTimeDisplay();
    }

    $scope.decrHours = function() {
        // don't allow the alarm time to be modified if the alarm has been set:
        if (alarmIsSet)
            return;

        if ($scope.hours == 0) {
            $scope.hours = 23;
            $scope.minutes = 59;
        } else
            $scope.hours--;

        // now set the display string for hours:
        updateTimeDisplay();
    }

    $scope.incrMinutes = function() {
        // don't allow the alarm time to be modified if the alarm has been set:
        if (alarmIsSet)
            return;

        if ($scope.minutes == 59) {
            // increment the hours and reset the minutes to 0 again:
            $scope.incrHours();
            $scope.minutes = 0;
        } else
            $scope.minutes++;

        updateTimeDisplay();
    }

    $scope.decrMinutes = function() {

        // don't allow the alarm time to be modified if the alarm has been set:
        if (alarmIsSet)
            return;

        if ($scope.minutes == 0) {
            // decrement hours and reset minutes back to 0:
            $scope.decrHours();
            $scope.minutes = 59;
        } else
            $scope.minutes--;

        updateTimeDisplay();
    }

    /**
    Update the hour and minute strings on the main hud:
    **/
    var updateTimeDisplay = function() {
        // update the hour display:
        if ($scope.hours < 10)
            $scope.displayHours = "0" + $scope.hours;
        else
            $scope.displayHours = $scope.hours;

        // update the minute display:
        if ($scope.minutes < 10)
            $scope.displayMinutes = "0" + $scope.minutes;
        else
            $scope.displayMinutes = $scope.minutes;

        // update the background image and colors based on the time of day:
        let clock = document.querySelector('main');
        // day time: 
        if ($scope.hours >= 6 && $scope.hours < 20) {
            $('#modifySnooze').css('color', 'white');
            $('#timeDisplay').css('color', 'white');
            $('#title').css('color', 'white');
            document.body.style.backgroundImage = "url('./img/day.png')";
            document.querySelector('section').className = "section2";
            clock.style.display = 'block';
            document.documentElement.style.setProperty('--white', 'white');

        }
        //  night time image:
        else {
            $('#modifySnooze').css('color', 'white');
            $('#timeDisplay').css('color', 'black');
            $('#title').css('color', 'black');
            // document.body.style.background = '#081C2A'
            document.body.style.backgroundImage = "url('./img/night.png')";
            document.querySelector('section').className = "section";
            clock.style.display = 'block';
            document.documentElement.style.setProperty('--white', 'black');

        }

    }

});

let clockdisplay = document.getElementById('clockDisplay')
let popup = document.querySelector('section')
let closeBtn = document.getElementById('closeBtn')

function OpenWindow() {
    popup.style.display = 'flex';
    clockdisplay.style.filter = "blur(6px)";

}
closeBtn.addEventListener('click', function() {
    popup.style.display = 'none'
    clockdisplay.style.filter = "blur(0)";
})