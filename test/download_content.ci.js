// const puppeteer = require('puppeteer');
const examples = require('../examples/examples.json');
const { execSync } = require('child_process');

examples.forEach((example, index) => {
    execSync(`examples/download-example.sh ${examples[index].h5p}`);
});
