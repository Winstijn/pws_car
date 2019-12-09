
//
//  PWS AI
//  vehicle_controls.js
//
//  Created by Winstijn Smit
//  Copyright © 2019 Kaziaat B.V. All rights reserved.
//

const raspi = require('raspi');
const pwm = require('raspi-pwm');

class VehicleControls {

    constructor(settings){
        this.log('Starting connection with car for vehicle control.')
 
        // Limiter is in full decimals.
        this.powerLimit = settings.powerLimit || 100
        this.currentSteer = 0.5 * Math.PI
        this.currentAccel = 0

        // When the controls are ready for use.
        this.onReady = settings.onReady || (() => {})
        this.ready = false

        // Duty Cycle is 100, 50 had the center at 0.5 volt. 
        // This is the same duty cycle from the receiver
        // Pins are from the PI layout.
        raspi.init( () => {
            this.motorPWM = new pwm.PWM({ pin: 'P1-33', frequency: 100 });
            this.steerPWM = new pwm.PWM({ pin: 'P1-32', frequency: 100 });
            this.log("Started PMW for the DC Motor.");
            this.log("Started PMW for Steer.");

            // Signaling that the controls are ready.
            this.onReady(); this.ready = true;

            // Set all the defaults for the car!
            this.resetCar();
        })

    }

    resetCar(){
        this.steerPWM.write(0.5 / 3.3);
        this.motorPWM.write(0.5 / 3.3);
    }

    // 0.66 volt is volledig gas.
    // 0.5 volt is geen gas.
    // 0.33 volt is volledig achteruit.
    setAccelarator( power ){
        // Maybe use map here?!
        const powerPercentage = this.powerLimit / 100 * power
        const voltage = 0.5 + powerPercentage * 0.16 // 0.66 - 0.5
        if (voltage > 0.66) { this.log('Too much voltage to DC motor!'); return }
        this.currentAccel = power
        this.motorPWM.write(voltage / 3.3);
    }

    // 0.35 volt is maximum rechts (0)
    // 0.5 volt is recht ( 1/2 PI )
    // 0.65 volt is maximum links ( PI )
    setSteer( angle ){
        const steerVoltage = this.map(angle, Math.PI / 12, -Math.PI / 12,  0.35, 0.65)
        if ( steerVoltage > 0.65 || steerVoltage < 0.35 ) { this.log('Wrong voltage to steer motor!'); return }
        this.currentSteer = angle
        this.steerPWM.write( steerVoltage / 3.3 )
    }

    map(value, x1, y1, x2, y2) { 
        return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
    }

    log(...args){
        console.log('[Vehicle Controls]', ...args)
    }

}

module.exports = VehicleControls
