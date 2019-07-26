const puppeteer = require('puppeteer');
const examples = require('../examples/examples.json');
const PromiseQueue = require('promise-queue');

const queue = new PromiseQueue(3, Infinity);

puppeteer.launch({ devtools: true }).then(browser => {
    examples.forEach((example, index) => {
        queue
            .add(
                () =>
                    new Promise((resolve, reject) => {
                        browser.newPage().then(page => {
                            page.on('pageerror', msg => {
                                console.log('ERROR', example, msg);
                                reject(new Error(JSON.stringify(example)));
                            });

                            page.goto(
                                `http://localhost:8080/examples/${index}`
                            ).then(() => {
                                page.close();
                                resolve();
                            });
                        });
                    })
            )
            .catch(error => {
                console.log(error);
                process.exit(1);
            });
    });

    const interval = setInterval(() => {
        if (queue.getPendingLength() === 0) {
            browser.close();
            clearInterval(interval);
        }
    }, 500);
});
