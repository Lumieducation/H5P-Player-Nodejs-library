// setup env
process.env.DEBUG = process.env.DEBUG || '*';
process.env.PORT = process.env.PORT || '8080';
process.env.H5P_CONTENT = process.env.H5P_CONTENT || 'h5p/content';
process.env.H5P_LIB = process.env.H5P_LIB || 'h5p/libraries';
process.env.H5P_CORE = process.env.H5P_CORE || 'h5p/core';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as fileUpload from 'express-fileupload';

import h5p from './router';

import h5pinterface from './interface';

const server: express.Application = express();

server.use(bodyParser.json());
server.use(
    bodyParser.urlencoded({
        extended: true
    })
);
server.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 }
    })
);

server.use(compression());

server.use('/', h5p(h5pinterface));

export default server;
