module.exports = function (timestamp, timeObject) {
    //debugger;
    //get seconds in floating point
    var seconds = timestamp/1000;
    
    //get milliseconds by rounding of difference to 3 decimal places
    //and multiplying by 1000
    var milliseconds = (timestamp-seconds*1000);

    //seperate whole seconds
    seconds = Math.floor(seconds)
    
    timeObject.seconds = timeObject.seconds+seconds;
    timeObject.milliseconds = timeObject.milliseconds+milliseconds;
    
    if(timeObject.milliseconds>999) {
        timeObject.seconds = timeObject.seconds+1;
        timeObject.milliseconds = timeObject.milliseconds - 1000;
    }

    if(timeObject.seconds>59) {
        timeObject.minutes = timeObject.minutes+1;
        timeObject.seconds = timeObject.seconds - 60;
    }

    return timeObject;

}