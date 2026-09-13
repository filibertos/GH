
const core = require("@actions/core");
const github = require("@actions/github");

run();

function run() {
  try {
    const argumentA = core.getInput("argument-a");
    const argumentB = core.getInput("argument-b");

    var result = Number(argumentA) + Number(argumentB);

    core.setOutput("result", result);
  } catch (error) {
    core.setFailed(error.message);
  }
}
