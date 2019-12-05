const worker = require("streaming-worker");
const path = require("path");

const addon_path = path.join(__dirname, "./lidar_sensor/build/Release/lidar_sensor");
const wobbly_sensor = worker(addon_path, {name: "Head Mounted Display"});

// Option 1 - Just use the emitter interface
wobbly_sensor.from.on('lidar_data', function(sample){
    console.log("----------- Event -----------");
    console.log(JSON.parse(sample)[0].distance);
    console.log("-----------------------------");
});

