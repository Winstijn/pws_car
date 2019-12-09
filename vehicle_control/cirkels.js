//
//  PWS AI
//  Testing VehicleControls in this file!
//
//  Created by Winstijn Smit
//  Copyright © 2019 Kaziaat B.V. All rights reserved.
//

const VehicleControls = require('./vehicle_controls.js')

let controls = new VehicleControls( { powerLimit: 25, onReady: circles } )

async function circles(){
    console.log('Driving circles!')
    controls.resetCar();
    await wait(500);

    controls.setSteer(Math.PI);
    await wait(500);

    controls.setAccelarator(1)
    await wait(10000);

    controls.resetCar();
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

