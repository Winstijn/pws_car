//
//  PWS AI
//  Driving with an artificial intelligence.  
//
//  Created by Winstijn Smit
//  Copyright © 2019 Kaziaat B.V. All rights reserved.
//

console.log('\n')
console.log(`8888888b.  888       888  .d8888b.         .d8888b.         d8888 8888888b.        
888   Y88b 888   o   888 d88P  Y88b       d88P  Y88b       d88888 888   Y88b       
888    888 888  d8b  888 Y88b.            888    888      d88P888 888    888       
888   d88P 888 d888b 888  "Y888b.         888            d88P 888 888   d88P       
8888888P"  888d88888b888     "Y88b.       888           d88P  888 8888888P"        
888        88888P Y88888       "888       888    888   d88P   888 888 T88b         
888        8888P   Y8888 Y88b  d88P       Y88b  d88P  d8888888888 888  T88b        
888        888P     Y888  "Y8888P"         "Y8888P"  d88P     888 888   T88b    `);
console.log('By Winstijn Smit and Fyor Klein Gunnewiek - Version 0.9.2 ');

const VehicleControls = require('./vehicle_control/vehicle_controls.js');
const LidarSensor = require('./lidar_sensor/lidar.js');
const predictDrive = require('./neural_network/selfDriving.js')
console.log('\n')

var lidarSensors;

// When vehicleControls are ready, activate LidarSensor.
// LidarSensor gives a 'onScan' callback when finished.
var vehicleControls = new VehicleControls( { powerLimit: 30, 
    onReady: () => {
        lidarSensors = new LidarSensor({ onScan: sensorData => {
             
            const sensors = Object.keys(sensorData).map( sensorName => sensorData[sensorName].distance )
            const outputs = predictDrive(sensors, [vehicleControls.currentSteer, vehicleControls.currentAccel] )
            console.log('Predicted outputs:', outputs);

            vehicleControls.setAccelarator(outputs[0])
            vehicleControls.setSteer((outputs[1] - 0.5) * Math.PI / 6)
        }})
    }
} )

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function exitHandler() {
    vehicleControls.resetCar();
    console.log("[PWS CAR] Stopping driving and resetting car!")
}

//do something when app is closing
process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);
// process.on('uncaughtException', exitHandler);
