"use strict";
exports.__esModule = true;
var path = require("path");
var fs = require("fs");
var mkdirp = require("mkdirp");
var h5pinterface = {
    load_content_json: function (content_id, cb) {
        cb(undefined, require(path.resolve('') +
            '/' +
            process.env.H5P_CONTENT +
            '/' +
            content_id +
            '/content/content.json'));
    },
    load_h5p_json: function (content_id, cb) {
        cb(undefined, require(path.resolve('') +
            '/' +
            process.env.H5P_CONTENT +
            '/' +
            content_id +
            '/h5p.json'));
    },
    load_library: function (name, cb) {
        cb(undefined, require(path.resolve('') +
            '/' +
            process.env.H5P_LIB +
            '/' +
            name +
            '/library.json'));
    },
    load_content: function (content_id, file_name, cb) {
        fs.readFile(path.join(path.resolve(''), process.env.H5P_CONTENT, content_id, 'content', file_name), function (error, buffer) {
            cb(error, buffer);
        });
    },
    save_h5p_json: function (content_id, h5p_json, done) {
        mkdirp(path.join(path.resolve(''), process.env.H5P_CONTENT, content_id), function () {
            fs.writeFile(path.join(path.resolve(''), process.env.H5P_CONTENT, content_id, 'h5p.json'), JSON.stringify(h5p_json), 'utf8', function (err) { return done(err); });
        });
    },
    save_content_json: function (content_id, content_json, done) {
        mkdirp(path.join(path.resolve(''), process.env.H5P_CONTENT, content_id, 'content'), function () {
            fs.writeFile(path.join(path.resolve(''), process.env.H5P_CONTENT, content_id, 'content', 'content.json'), JSON.stringify(content_json), 'utf8', function (err) { return done(err); });
        });
    },
    save_content: function (content_id, file_name, content) {
        mkdirp(path.join(path.resolve(''), process.env.H5P_CONTENT, content_id, 'content', 'images'), function () {
            fs.writeFile(path.join(path.resolve(''), process.env.H5P_CONTENT, content_id, 'content', 'images', file_name), content, function () {
                console.log('file written');
            });
        });
    },
    library_dir: path.resolve('') + '/' + process.env.H5P_LIB,
    core_dir: path.resolve('') + '/' + process.env.H5P_CORE,
    integration: {
        postUserStatistics: true,
        ajaxPath: '',
        ajax: {
            setFinished: '/test',
            contentUserData: '/test'
        },
        saveFreq: 30,
        user: {
            name: 'test',
            mail: 'test@Lumi.education'
        }
    }
};
exports["default"] = h5pinterface;
//# sourceMappingURL=interface.js.map