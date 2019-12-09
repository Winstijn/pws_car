const VehicleControls = require('./vehicle_control/vehicle_controls.js');

var vehicleControls = new VehicleControls( { powerLimit: 0,  onReady: () => {
	vehicleControls.resetCar();
}})
