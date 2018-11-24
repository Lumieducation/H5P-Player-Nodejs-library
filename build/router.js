"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var fs = require("fs");
var unzip = require("unzip");
var mkdirp = require("mkdirp");
var copydir = require("copy-dir");
var recursiveReadDir = require("recursive-readdir");
var h5p_1 = require("./models/h5p");
function default_1(h5pinterface) {
    mkdirp(path.resolve('tmp'), function (mkdirp_error) {
        if (mkdirp_error) {
            throw new Error(mkdirp_error);
        }
    });
    mkdirp(h5pinterface.core_dir, function (mkdirp_error) {
        if (mkdirp_error) {
            throw new Error(mkdirp_error);
        }
    });
    mkdirp(h5pinterface.library_dir, function (mkdirp_error) {
        if (mkdirp_error) {
            throw new Error(mkdirp_error);
        }
    });
    var router = express.Router();
    router.get('/content/:content_id/*', function (req, res) {
        h5pinterface.load_content(req.params.content_id, req.params[0], function (error, buffer) {
            res.send(buffer);
        });
    });
    router.get('/libraries/*', function (req, res) {
        fs.readFile(path.join(h5pinterface.library_dir, req.params[0]), function (error, buffer) {
            if (error) {
                return res.status(404).end();
            }
            res.status(200).send(buffer);
        });
    });
    router.get('/core/*', function (req, res) {
        fs.readFile(path.join(h5pinterface.core_dir, req.params[0]), function (error, buffer) {
            if (error) {
                return res.status(404).end();
            }
            res.status(200).send(buffer);
        });
    });
    router.get('/', function (req, res) {
        var content_id = req.query.content_id;
        if (!content_id) {
            return res
                .status(200)
                .end('<html>' +
                '<head />' +
                '<body>' +
                '<form method="post" enctype="multipart/form-data">' +
                '<label>' +
                'Upload .h5p file' +
                '<input name="file" type="file" />' +
                '</label>' +
                '<button>upload</button>' +
                '</form>' +
                '</body>' +
                '</html>');
        }
        var _h = new h5p_1["default"](content_id, h5pinterface, function (error, h5p) {
            var dependencies = {
                js: h5p
                    .dependencies()
                    .js.map(function (dep) { return req.baseUrl + '/libraries' + dep; }),
                css: h5p
                    .dependencies()
                    .css.map(function (dep) { return req.baseUrl + '/libraries' + dep; })
            };
            var response = '<html>' +
                '<head>' +
                '<link rel="stylesheet" href="' +
                req.baseUrl +
                '/core' +
                '/styles/h5p.css">' +
                '<script src="' +
                req.baseUrl +
                '/core' +
                '/js/jquery.js"></script>' +
                '<script src="' +
                req.baseUrl +
                '/core' +
                '/js/h5p.js"></script>' +
                '<script> window.H5PIntegration = parent.H5PIntegration || ' +
                JSON.stringify(Object.assign({
                    baseUrl: req.protocol + '://' + req.headers.host,
                    url: req.baseUrl,
                    postUserStatistics: true,
                    ajaxPath: '/path/to/h5p-ajax',
                    ajax: {
                        // Where to post user results
                        setFinished: '/interactive-contents/123/results/new',
                        // Words beginning with : are placeholders
                        contentUserData: '/interactive-contents/:contentId/user-data?data_type=:dataType&subContentId=:subContentId'
                    },
                    saveFreq: 30,
                    user: {
                        // Only if logged in !
                        name: 'User Name',
                        mail: 'user@mysite.com'
                    },
                    siteUrl: req.protocol + '://' + req.headers.host,
                    l10n: {
                        // Text string translations
                        H5P: {
                            fullscreen: 'Fullscreen',
                            disableFullscreen: 'Disable fullscreen',
                            download: 'Download',
                            copyrights: 'Rights of use',
                            embed: 'Embed',
                            size: 'Size',
                            showAdvanced: 'Show advanced',
                            hideAdvanced: 'Hide advanced',
                            advancedHelp: 'Include this script on your website if you want dynamic sizing of the embedded content:',
                            copyrightInformation: 'Rights of use',
                            close: 'Close',
                            title: 'Title',
                            author: 'Author',
                            year: 'Year',
                            source: 'Source',
                            license: 'License',
                            thumbnail: 'Thumbnail',
                            noCopyrights: 'No copyright information available for this content.',
                            downloadDescription: 'Download this content as a H5P file.',
                            copyrightsDescription: 'View copyright information for this content.',
                            embedDescription: 'View the embed code for this content.',
                            h5pDescription: 'Visit H5P.org to check out more cool content.',
                            contentChanged: 'This content has changed since you last used it.',
                            startingOver: "You'll be starting over.",
                            by: 'by',
                            showMore: 'Show more',
                            showLess: 'Show less',
                            subLevel: 'Sublevel'
                        }
                    },
                    loadedJs: dependencies.js,
                    loadedCss: dependencies.css,
                    core: {
                        scripts: dependencies.js,
                        styles: dependencies.css
                    }
                }, h5pinterface.integration)) +
                '</script>' +
                '<script>' +
                'window.H5PIntegration.contents = window.H5PIntegration.contents || {}; \n' +
                'window.H5PIntegration.contents["cid-' +
                content_id +
                '"] = ' +
                JSON.stringify({
                    library: h5p.get_mainLibrary(),
                    jsonContent: Object.assign(JSON.stringify(h5p.content).replace(/#tmp/g, ''), {
                        behaviour: {
                            enableRetry: false,
                            enableCheckButton: true,
                            showSolutionsRequiresInput: true,
                            singlePoint: false,
                            applyPenalties: true,
                            enableScoreExplanation: true,
                            autoAlignSpacing: 2,
                            enableFullScreen: true,
                            showScorePoints: true
                        }
                    }),
                    fullScreen: false,
                    // "exportUrl": "/path/to/download.h5p",
                    // "embedCode": "<iframe src=\"https://mysite.com/h5p/1234/embed\" width=\":w\" height=\":h\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\"></iframe>",
                    displayOptions: {
                        frame: false,
                        "export": false,
                        embed: false,
                        copyright: true,
                        icon: false // Display H5P icon
                    },
                    styles: dependencies.css,
                    scripts: dependencies.js
                }) +
                '</script>' +
                '<script src="' +
                req.baseUrl +
                '/core' +
                '/js/h5p-event-dispatcher.js"></script>' +
                '<script src="' +
                req.baseUrl +
                '/core' +
                '/js/h5p-x-api-event.js"></script>' +
                '<script src="' +
                req.baseUrl +
                '/core' +
                '/js/h5p-x-api.js"></script>' +
                '<script src="' +
                req.baseUrl +
                '/core' +
                '/js/h5p-content-type.js"></script>' +
                '<script src="' +
                req.baseUrl +
                '/core' +
                '/js/h5p-action-bar.js"></script>' +
                dependencies.css
                    .map(function (style) {
                    return '<link rel="stylesheet" href="' +
                        style +
                        '"></link>';
                })
                    .reduce(function (p, c) { return p + c; }) +
                dependencies.js
                    .map(function (script) { return '<script src="' + script + '"></script>'; })
                    .reduce(function (p, c) { return p + c; }) +
                '</head>' +
                '<body>' +
                '<div class="h5p-content" data-content-id=' +
                content_id +
                '></div>' +
                '</body>' +
                '<script src="' +
                req.baseUrl +
                '/core' +
                '/js/h5p-resizer.js"></script>' +
                '</html>';
            res.status(200).end(response);
        });
    });
    router.post('/', function (req, res) {
        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        }
        if (!req.files.file) {
            return res.status(400).send('no file');
        }
        if (path.extname(req.files.file.name) !== '.h5p') {
            return res.status(400).send('only .h5p files are allowed');
        }
        var uploaded_file = req.files.file;
        uploaded_file.mv(path.resolve('tmp') + '/' + uploaded_file.name, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            var name = path.basename(uploaded_file.name, path.extname(uploaded_file.name));
            fs.createReadStream(path.resolve('tmp') + '/' + uploaded_file.name).pipe(unzip
                .Extract({
                path: path.resolve('tmp') + '/unzip-' + name
            })
                .on('finish', function (error) {
                setTimeout(function () {
                    fs.readFile(path.resolve('tmp') +
                        '/unzip-' +
                        name +
                        '/h5p.json', 'utf8', function (h5p_json_error, data) {
                        h5pinterface.save_h5p_json(name, JSON.parse(data), function () {
                            fs.readFile(path.resolve('tmp') +
                                '/unzip-' +
                                name +
                                '/content/content.json', 'utf8', function (content_json_error, content_json) {
                                h5pinterface.save_content_json(name, JSON.parse(content_json), function () {
                                    copydir(path.resolve('tmp') +
                                        '/unzip-' +
                                        name, h5pinterface.library_dir, function (mv_error) {
                                        recursiveReadDir(path.resolve('tmp') +
                                            '/unzip-' +
                                            name +
                                            '/content', function (_error, files) {
                                            files
                                                .filter(function (file) {
                                                return file.indexOf('content.json') ===
                                                    -1;
                                            })
                                                .forEach(function (file) {
                                                fs.readFile(file, function (__error, file_data) {
                                                    h5pinterface.save_content(name, path.basename(file), file_data);
                                                });
                                            });
                                        });
                                        res.redirect(req.baseUrl +
                                            '?content_id=' +
                                            name);
                                    });
                                });
                            });
                        });
                    });
                }, 500);
            }));
        });
    });
    return router;
}
exports["default"] = default_1;
//# sourceMappingURL=router.js.map