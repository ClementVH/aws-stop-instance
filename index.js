const core = require('@actions/core');
const AWS = require('aws-sdk');

const startInstance = () => {
  const client = new AWS.EC2({
    region: core.getInput('aws-region')
  });
  return new Promise((resolve, reject) => {
    client.stopInstances(
      {
        InstanceIds: [
          core.getInput('aws-instance-id')
        ]
      },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
};

async function run() {
  try {
    const res = await startInstance();
    console.log('Instance stoped successfully', JSON.stringify(res));
  } catch (error) {
    console.error(JSON.stringify(error));
    core.setFailed(error.message);
  }
}

run();
