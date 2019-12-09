//
//  PWS AI
//  Testing VehicleControls in this file!
//
//  Created by Winstijn Smit
//  Copyright © 2019 Kaziaat B.V. All rights reserved.
//

const VehicleControls = require('./vehicle_controls.js')

let controls = new VehicleControls( { powerLimit: 10, onReady: () => {console.log('controls ready!')} } )
