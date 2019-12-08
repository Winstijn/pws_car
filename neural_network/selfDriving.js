// Import Classes
const NeuralNetwork = require('./lib/nn.js')
const Matrix = require('./lib/matrix.js')

// NeuralNetwork matrices
ai = {"input_nodes":7,"hidden_nodes":8,"output_nodes":2,"weights_ho":{"rows":2,"cols":8,"data":[[-1.5240764608065438,1.101365590633835,4.296437605757745,0.9852045535511783,1.5597724607548975,2.2306321643583016,1.386434841156279,-0.32212928648221617],[-0.9938701466249009,-4.092743597399693,2.0457848597472768,4.972685368132018,-2.701678301480708,1.1279507258201162,-3.741431015352351,-2.6347480649079125]]},"weights_ih":{"rows":8,"cols":7,"data":[[0.13697245759526577,1.7830046432785727,-2.192597738059459,0.34631261697869514,-1.7822026711949766,-1.151826747617426,-1.9506348929802866],[0.35794163354447395,0.12755565623274945,-1.1656575343902809,0.1810291597267462,0.8782862491833361,0.6251013207004743,-1.8919942900049143],[0.7545396424529383,1.204024834539549,0.33404515544611624,0.10120477189300542,0.5111151179503404,0.1357600083122757,0.09031090671233355],[-0.7200397963096596,-2.535810329741222,1.8826272148257035,-1.1497489344110496,-0.4002785303275329,0.7236968160058839,-0.009844640955918443],[-0.187757024702653,0.15963980377231107,0.09796551360199715,-0.6052827813578925,-1.8092251816232938,-0.14426844689507606,-0.23126642910622391],[0.3642810295492983,-1.531754058652776,1.1236514409810279,-0.11671141007499793,-1.3420234941740825,-0.70200238959001,0.9852675612110551],[-0.38710474641382464,0.488143625597684,-0.06208030022662117,-1.3240409736204182,0.47481386669197406,-0.8526853454949936,-0.6250818311093655],[0.1793361351542434,-1.5874165659115813,-0.9266051814054813,-0.6925927279888049,0.8134673215202217,1.4776067059617333,-0.7221141910010572]]},"bias_o":{"rows":2,"cols":1,"data":[[1.8211322508307974],[1.1614325568335593]]},"bias_h":{"rows":8,"cols":1,"data":[[0.21137192656918646],[-0.5733612348670357],[-0.35291827143446086],[-1.7050960254674417],[-0.9649161191189133],[0.1339457606782056],[0.8884192713030552],[-1.2988473771514522]]}}

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
