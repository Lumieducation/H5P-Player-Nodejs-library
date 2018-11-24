"use strict";
exports.__esModule = true;
// setup env
process.env.DEBUG = process.env.DEBUG || '*';
process.env.PORT = process.env.PORT || '8080';
process.env.H5P_CONTENT = process.env.H5P_CONTENT || 'h5p/content';
process.env.H5P_LIB = process.env.H5P_LIB || 'h5p/libraries';
process.env.H5P_CORE = process.env.H5P_CORE || 'h5p/core';
var express = require("express");
var bodyParser = require("body-parser");
var compression = require("compression");
var fileUpload = require("express-fileupload");
var router_1 = require("./router");
var interface_1 = require("./interface");
var server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}));
server.use(compression());
server.use('/', router_1["default"](interface_1["default"]));
exports["default"] = server;
//# sourceMappingURL=server.js.map