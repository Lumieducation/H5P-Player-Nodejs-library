import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as unzipper from 'unzipper';
import * as mkdirp from 'mkdirp';
import * as copydir from 'copy-dir';
import * as recursiveReadDir from 'recursive-readdir';
import * as PromiseQueue from 'promise-queue';
import * as rimraf from 'rimraf';

import { IH5PInterface, IUploadRequest } from './types';

import H5P from './models/h5p';

export default function(h5pinterface: IH5PInterface): express.Router {
    mkdirp(path.resolve('tmp'), mkdirp_error => {
        if (mkdirp_error) {
            throw new Error(mkdirp_error);
        }
    });

    mkdirp(h5pinterface.core_dir, mkdirp_error => {
        if (mkdirp_error) {
            throw new Error(mkdirp_error);
        }
    });

    mkdirp(h5pinterface.library_dir, mkdirp_error => {
        if (mkdirp_error) {
            throw new Error(mkdirp_error);
        }
    });

    const router = express.Router();

    router.get(
        '/content/:content_id/*',
        (req: express.Request, res: express.Response) => {
            h5pinterface.load_content(req, req.params[0], (error, buffer) => {
                if (error) {
                    return res.status(404).end();
                }
                res.send(buffer);
            });
        }
    );

    router.get(
        '/libraries/*',
        (req: express.Request, res: express.Response) => {
            fs.readFile(
                path.join(h5pinterface.library_dir, req.params[0]),
                (error, buffer) => {
                    if (error) {
                        return res.status(404).end();
                    }
                    res.status(200).send(buffer);
                }
            );
        }
    );

    router.get('/core/*', (req: express.Request, res: express.Response) => {
        fs.readFile(
            path.join(h5pinterface.core_dir, req.params[0]),
            (error, buffer) => {
                if (error) {
                    return res.status(404).end();
                }
                res.status(200).send(buffer);
            }
        );
    });

    router.get('/', (req, res) => {
        const content_id = req.query.content_id;

        if (!content_id) {
            return res
                .status(200)
                .end(
                    '<html>' +
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
                        '</html>'
                );
        }

        // try {
        const _h = new H5P(req, h5pinterface, (error, h5p: H5P) => {
            if (error) {
                return res.status(400).json(error);
            }
            const dependencies = {
                js: h5p
                    .dependencies()
                    .js.map(dep => req.baseUrl + '/libraries' + dep),
                css: h5p
                    .dependencies()
                    .css.map(dep => req.baseUrl + '/libraries' + dep)
            };

            const response =
                '<html>' +
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
                JSON.stringify(
                    Object.assign(
                        {
                            baseUrl: req.protocol + '://' + req.headers.host, // No trailing slash
                            url: req.baseUrl, // Relative to web root
                            postUserStatistics: true, // Only if user is logged in
                            ajaxPath: '/path/to/h5p-ajax', // Only used by older Content Types
                            ajax: {
                                // Where to post user results
                                setFinished:
                                    '/interactive-contents/123/results/new',
                                // Words beginning with : are placeholders
                                contentUserData:
                                    '/interactive-contents/:contentId/user-data?data_type=:dataType&subContentId=:subContentId'
                            },
                            saveFreq: 30, // How often current content state should be saved. false to disable.
                            user: {
                                // Only if logged in !
                                name: 'User Name',
                                mail: 'user@mysite.com'
                            },
                            siteUrl: req.protocol + '://' + req.headers.host, // Only if NOT logged in!
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
                                    advancedHelp:
                                        'Include this script on your website if you want dynamic sizing of the embedded content:',
                                    copyrightInformation: 'Rights of use',
                                    close: 'Close',
                                    title: 'Title',
                                    author: 'Author',
                                    year: 'Year',
                                    source: 'Source',
                                    license: 'License',
                                    thumbnail: 'Thumbnail',
                                    noCopyrights:
                                        'No copyright information available for this content.',
                                    downloadDescription:
                                        'Download this content as a H5P file.',
                                    copyrightsDescription:
                                        'View copyright information for this content.',
                                    embedDescription:
                                        'View the embed code for this content.',
                                    h5pDescription:
                                        'Visit H5P.org to check out more cool content.',
                                    contentChanged:
                                        'This content has changed since you last used it.',
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
                        },
                        h5pinterface.integration
                    )
                ) +
                '</script>' +
                '<script> H5PIntegration.contents["cid-' +
                content_id +
                '"].contentUserData = parent.__H5P_USERDATA; </script>' +
                '<script>' +
                'window.H5PIntegration.contents = window.H5PIntegration.contents || {}; \n' +
                'window.H5PIntegration.contents["cid-' +
                content_id +
                '"] = ' +
                JSON.stringify({
                    library: h5p.get_mainLibrary(),
                    jsonContent: Object.assign(
                        JSON.stringify(h5p.content).replace(/#tmp/g, ''),
                        {
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
                        }
                    ),
                    fullScreen: false,
                    // "exportUrl": "/path/to/download.h5p",
                    // "embedCode": "<iframe src=\"https://mysite.com/h5p/1234/embed\" width=\":w\" height=\":h\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\"></iframe>",
                    displayOptions: {
                        frame: false, // Show frame and buttons below H5P
                        export: false, // Display download button
                        embed: false, // Display embed button
                        copyright: true, // Display copyright button
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
                    .map(
                        style =>
                            '<link rel="stylesheet" href="' +
                            style +
                            '"></link>'
                    )
                    .reduce((p, c) => p + c) +
                dependencies.js
                    .map(script => '<script src="' + script + '"></script>')
                    .reduce((p, c) => p + c) +
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
        // } catch (error) {
        //     throw new Error(error);
        //     res.status(400).json(error);
        // }
    });

    router.post('/', (req: IUploadRequest, res: express.Response) => {
        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        }

        if (!req.files.file) {
            return res.status(400).send('no file');
        }
        if (path.extname(req.files.file.name) !== '.h5p') {
            return res.status(400).send('only .h5p files are allowed');
        }

        req.query.content_id =
            req.query.content_id ||
            path.basename(
                req.files.file.name,
                path.extname(req.files.file.name)
            );

        const content_id = req.query.content_id;

        move_file_and_extract(req.files.file, content_id)
            .then(() => save_content(content_id, h5pinterface, req))
            .then(() => save_content_json(content_id, h5pinterface, req))
            .then(() => copy_libs(content_id, h5pinterface))
            .then(() => save_h5p_json(content_id, h5pinterface, req))
            .then(() => h5pinterface.upload_complete(req))
            .then(() => clean_tmp(content_id))
            .then(() => {
                res.redirect(req.baseUrl + '?content_id=' + content_id);
            })
            .catch(error => {
                // h5pinterface.handle_error(req, res, error);
                res.status(500).end();
            });
    });

    return router;
}

function move_file_and_extract(file, content_id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        file.mv(path.resolve('tmp') + '/' + content_id, err => {
            if (err) {
                reject(err);
            }

            fs.createReadStream(path.resolve('tmp') + '/' + content_id).pipe(
                unzipper
                    .Extract({
                        path: path.resolve('tmp') + '/unzip-' + content_id
                    })
                    .on('close', error => {
                        if (error) {
                            return reject(error);
                        }
                        resolve();
                    })
            );
        });
    });
}

function save_h5p_json(
    content_id: string,
    h5pinterface: IH5PInterface,
    req
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        fs.readFile(
            path.resolve('tmp') + '/unzip-' + content_id + '/h5p.json',
            'utf8',
            (h5p_json_error, data) => {
                if (h5p_json_error) {
                    reject(h5p_json_error);
                }
                h5pinterface.save_h5p_json(req, JSON.parse(data), () => {
                    resolve();
                });
            }
        );
    });
}

function save_content_json(
    content_id: string,
    h5pinterface: IH5PInterface,
    req
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        fs.readFile(
            path.resolve('tmp') +
                '/unzip-' +
                content_id +
                '/content/content.json',
            'utf8',
            (content_json_error, content_json) => {
                if (content_json_error) {
                    return reject(content_json_error);
                }
                h5pinterface.save_content_json(
                    req,
                    JSON.parse(content_json),
                    error => {
                        if (error) {
                            return reject(error);
                        }
                        resolve();
                    }
                );
            }
        );
    });
}

function copy_libs(
    content_id: string,
    h5pinterface: IH5PInterface
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        copydir(
            path.resolve('tmp') + '/unzip-' + content_id,
            h5pinterface.library_dir,
            mv_error => {
                if (mv_error) {
                    return reject(mv_error);
                }
                resolve();
            }
        );
    });
}

function save_content(
    content_id: string,
    h5pinterface: IH5PInterface,
    req
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const queue = new PromiseQueue(
            h5pinterface.max_concurrent,
            h5pinterface.max_queued
        );

        recursiveReadDir(
            path.resolve('tmp') + '/unzip-' + content_id + '/content',
            (_error: Error, files: string[]) => {
                files
                    .filter(file => file.indexOf('content.json') === -1)
                    .filter(file => file.indexOf('h5p.json') === -1)
                    .forEach(file => {
                        fs.readFile(file, (__error, file_data: Buffer) => {
                            queue.add(() => {
                                return h5pinterface.save_content(
                                    req,
                                    path.basename(file),
                                    file_data
                                );
                            });
                        });
                    });
                const interval = setInterval(() => {
                    if (queue.getPendingLength() === 0) {
                        resolve();
                        clearInterval(interval);
                    }
                }, 100);
            }
        );
    });
}

function clean_tmp(content_id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        rimraf(path.resolve('tmp') + '/unzip-' + content_id, error => {
            if (error) {
                return reject(error);
            }
            rimraf(path.resolve('tmp') + '/' + content_id, _error => {
                if (_error) {
                    return reject(_error);
                }
                resolve();
            });
        });
    });
}
