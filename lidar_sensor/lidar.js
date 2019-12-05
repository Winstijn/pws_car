//
//  PWS AI
//  lidar.js
//
//  Created by Winstijn Smit
//  Copyright © 2019 Kaziaat B.V. All rights reserved.
//

const { spawn } = require('child_process');

class LidarSensor {

    constructor(){
        this.log("Initialising Lidar Sensor v1.0!")
        this.lidarProcess = this.spawnProcess();
        this.lidarProcess.stdout.on('data', this.parseData.bind(this))
        this.lidarProcess.on('close', this.processClosed.bind(this))
    }

    // Process containts YDLidar library code C++.
    spawnProcess(){
        return spawn('/opt/ydlidar_node/build/ydlidar_node');        
    }

    processClosed(){
        this.log("Lidar Sensor has been disconected.")
    }

    parseData(data){
        console.log(data.toString())
    }

    

    log(...args){
        console.log("[LidarSensor]", ...args)
    }



}

module.exports = LidarSensor

