const express = require('express');
const path = require('path');
const server = express();

const H5P = require('../src'); // require('h5p-nodejs-library');
const library_loader = (name, maj, min) => require(`../h5p/libraries/${name}-${maj}.${min}/library.json`);

server.use('/h5p', express.static(`${__dirname}/../h5p`));

server.get('/:content_id', (req, res) => {
    const content_id = req.params.content_id;
    const h5p_json = require(`../h5p/content/${content_id}/h5p.json`);
    const content_json = require(`../h5p/content/${content_id}/content/content.json`);

    new H5P(library_loader)
        .render(content_id, content_json, h5p_json)
        .then(h5p_page => {
            res.end(h5p_page);
        });
});

server.listen(process.env.PORT || 8080, () => {
    console.log('server running at http://localhost:' + (process.env.PORT || 8080));
});
