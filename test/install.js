const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);
const examples = require('../examples/examples.json');

exec(`${path.resolve('')}/examples/download-example.sh ${examples[16].h5p}`);
