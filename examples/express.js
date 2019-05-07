const express = require('express');
const path = require('path');
const server = express();

const h5p = require('../src/h5p'); // require('h5p-nodejs-library');

server.use('/h5p', express.static(`${path.resolve('')}/h5p`));

server.get('/:content_id', (req, res) => {
    const h5p_json = require(`${path.resolve('')}/h5p/content/${
        req.params.content_id
    }/h5p.json`);

    const content_json = require(`${path.resolve('')}/h5p/content/${
        req.params.content_id
    }/content/content.json`);

    const library_directory = `${path.resolve('')}/h5p/libraries`;

    h5p(
        req.params.content_id,
        h5p_json,
        content_json,
        library_directory,
        '/h5p',
        {
            integration: {
                url: '/h5p'
            }
        }
    )
        .then(h5p_page => {
            res.end(h5p_page);
        })
        .catch(error => {
            throw new Error(error);
        });
});

server.listen(process.env.PORT || 8080, () => {
    console.log('server running at ', process.env.PORT || 8080);
});
