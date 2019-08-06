const puppeteer = require('puppeteer');
const path = require('path');
const PromiseQueue = require('promise-queue');
const express = require('express');
const examples = require('../examples/examples.json');
const H5P = require('../build');

const server = express();
const queue = new PromiseQueue(3, Infinity);

server.use('/h5p/core', express.static(`${path.resolve('')}/examples/core`));
server.get('/examples/:key', (req, res) => {
    const { key } = req.params;
    const name = path.basename(examples[key].h5p);
    const dir = `${path.resolve('')}/examples/contents/${name}`;

    server.use('/h5p/libraries', express.static(dir));
    server.use(`/h5p/content/${name}`, express.static(`${dir}/content`));

    const libraryLoader = (lib, maj, min) =>
        require(`${path.resolve(
            ''
        )}/examples/contents/${name}/${lib}-${maj}.${min}/library.json`);

    const h5pObject = require(`${dir}/h5p.json`);
    const contentObject = require(`${dir}/content/content.json`);
    return new H5P(libraryLoader)
        .render(name, contentObject, h5pObject)
        .then(h5pPage => res.end(h5pPage))
        .catch(error => res.status(500).end(error.message));
});

server.listen(8080, () => {
    console.log(`server running on http://localhost: ${8080}`);
    puppeteer.launch({ devtools: true }).then(browser => {
        examples.forEach((example, index) => {
            queue
                .add(
                    () =>
                        new Promise((resolve, reject) => {
                            browser.newPage().then(page => {
                                page.on('pageerror', msg => {
                                    console.log(
                                        `${example.library} (${
                                            example.page
                                        }): ERROR`,
                                        example,
                                        msg
                                    );
                                    reject(new Error(JSON.stringify(example)));
                                });

                                page.goto(
                                    `http://localhost:8080/examples/${index}`,
                                    {
                                        waitUntil: 'networkidle0'
                                    }
                                ).then(() => {
                                    setTimeout(() => {
                                        page.close();
                                        console.log(
                                            `${example.library}(${
                                                example.page
                                            }): OK`
                                        );
                                        resolve();
                                    }, 1000);
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
                process.exit(0);
            }
        }, 500);
    });
});
