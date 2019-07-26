const { execSync } = require('child_process');
const examples = require('../examples/examples.json');

examples.forEach((example, index) => {
    execSync(`examples/download-example.sh ${examples[index].h5p}`);
});
