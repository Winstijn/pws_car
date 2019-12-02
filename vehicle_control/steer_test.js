const raspi = require('raspi');
const pwm = require('raspi-pwm');
var prompt = require('prompt');
 

var steerPWM
raspi.init(() => {
    // Duty Cycle is 100, 50 had the center at 0.25 volt. 
    // This is the same duty cycle from the receiver
    steerPWM = new pwm.PWM({ pin: 'P1-32', frequency: 100 });
    console.log("Started PMW for Steer.");
    console.log("0.35 volt is maximum rechts");
    console.log("0.5 volt is recht");
    console.log("0.65 volt is maximum links");
    askSteer();
})

    function askSteer() {
        // Ask for name until user inputs "done"
        prompt.get(['steeringVoltage'], function (err, result) {
            if (!result || result.steeringVoltage === 'done') { reset(); return }
            if (!isNaN(result.steeringVoltage)) {
                var number = Number(result.steeringVoltage)
                console.log("Setting steering percentage", number / 3.3)
                steerPWM.write(number / 3.3)
            }

            askSteer();
        });
    }

    function reset(){
        steerPWM.write(0.5 / 3.3);
        steerPWM.write(0);
    }
