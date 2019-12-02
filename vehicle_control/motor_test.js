const raspi = require('raspi');
const pwm = require('raspi-pwm');
var prompt = require('prompt');
 

var steerPWM
raspi.init(() => {
    // Duty Cycle is 100, 50 had the center at 0.5 volt. 
    // This is the same duty cycle from the receiver
    steerPWM = new pwm.PWM({ pin: 'P1-33', frequency: 100 });
    console.log("Started PMW for the DC Motor.");
    console.log("0.66 volt is volledig gas");
    console.log("0.5 volt is geen gas.");
    console.log("0.33 volt is volledig achteruit.");
    askSpeed();
})

    function askSpeed() {
        // Ask for name until user inputs "done"
        prompt.get(['motorVoltage'], function (err, result) {
            if (!result || result.motorVoltage === 'done') { reset(); return }
            if (!isNaN(result.motorVoltage)) {
                var number = Number(result.motorVoltage)
                console.log("Motor power percentage", number / 3.3)
                steerPWM.write(number / 3.3)
            }

            askSpeed();
        });
    }

    function reset(){
        steerPWM.write(0.5 / 3.3);
    }
