// Import Classes
const NeuralNetwork = require('./lib/nn.js')
const Matrix = require('./lib/matrix.js')

var fs = require('fs');

function readModuleFile(path, callback) {
    try {
        var filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

readModuleFile('./ai.txt', function (err, words) {
    ai = JSON.parse(words);
});

//ai = JSON.parse(aiString);

//console.log(ai);

// NeuralNetwork matrices
// Convert to NeuralNetwork from object
function deserialize(data) {
  let nn = new NeuralNetwork(data.input_nodes, data.hidden_nodes, data.output_nodes);
  nn.input_nodes = data.input_nodes;
  nn.hidden_nodes = data.hidden_nodes;
  nn.output_nodes = data.output_nodes;
  nn.weights_ih = Matrix.deserialize(data.weights_ih);
  nn.weights_ho = Matrix.deserialize(data.weights_ho);
  nn.bias_h = Matrix.deserialize(data.bias_h);
  nn.bias_o = Matrix.deserialize(data.bias_o);
  return nn;
}

// Get outputs from NeuralNetwork
function predictDrive(...args){
  let inputs;
  if (Array.isArray(args) && Array.isArray(args[0])) {
    let sensors = args[0];
    let current = args[1];
    inputs = sensors.concat(current);
  } else {
    inputs = args[0];
  }

  nn = deserialize(ai);

  const output = nn.predict(inputs);
  return output;

}

module.exports = predictDrive;

// Example
//console.log(predictDrive([1.6, 0.9, 0.4, 0.1, 0.75], [0.5, 0.2]));
