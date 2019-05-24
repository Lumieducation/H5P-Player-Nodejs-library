const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const express = require('express');
const server = express();

const h5p = require('../src/h5p');
const examples = require('./examples')

server.use('/favicon.ico', express.static(`${__dirname}/favicon.ico`));
server.use('/h5p/core', express.static(`${__dirname}/core`));

server.get('/', (req, res) => {
    res.append('Content-Type', 'text/html')
    res.end(examples
        .map((example, i) => `
            <a href="examples/${i}">${example.library}: ${example.name}</a> 
            | <a href="${example.page}">original</a>`)
        .join('<br>'))
})

server.get('/examples/:key', (req, res) => {
    let key = req.params.key;
    let name = path.basename(examples[key].h5p);

    let dir = `${__dirname}/contents/${name}`;

    server.use('/h5p/libraries', express.static(dir));
    server.use(`/h5p/content/${name}`, express.static(`${dir}/content`));

    let first = Promise.resolve();
    if (!fs.existsSync(dir)) {
        first = exec(`examples/download-example.sh ${examples[key].h5p}`)
    }

    first
        .then(() =>
            h5p(
                name,
                require(`${dir}/h5p.json`),
                require(`${dir}/content/content.json`),
                dir,
                '/h5p',
                {
                    integration: {
                        url: '/h5p'
                    }
                }
            )
        )
        .then(h5p_page =>
            res.end(h5p_page))
        .catch(error =>
            res.status(500).end(error.message));
});

let port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log('server running on http://localhost:' + port);
});
