import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as unzipper from 'unzipper';
import * as mkdirp from 'mkdirp';
import * as copydir from 'copy-dir';
import * as recursiveReadDir from 'recursive-readdir';
import * as PromiseQueue from 'promise-queue';
import * as rimraf from 'rimraf';
import { assign } from 'lodash';
import { IH5PInterface, IUploadRequest } from './types';

import { resolve_dependencies, parse_library } from './utils';

import content_type_cache from './content_type_cache';

import H5P from './models/h5p';
import Library from './models/Library';

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

    router.post('/ajax', (req: express.Request, res: express.Response) => {
        const query = req.query;

        const action = query.action;

        switch (action) {
            // case 'content-type-cache':
            //     res.status(200).json(content_type_cache);
            //     break;

            case 'libraries':
                const libs = req.body.libraries;

                const response = libs.map(lib => {
                    const _lib = require(path.join(
                        h5pinterface.library_dir,
                        lib.replace(/\s/g, '-'),
                        'library.json'
                    ));

                    return {
                        uberName: lib,
                        name: _lib.machineName,
                        majorVersion: _lib.majorVersion,
                        minorVersion: _lib.minorVersion,
                        tutorialUrl: '',
                        title: _lib.title,
                        runnable: _lib.runnable,
                        restricted: false,
                        metadataSettings: null
                    };
                });
                res.status(200).json(response);
                // res.status(200)
                break;

            case 'files':
                const file = (req as any).files.file;
                h5pinterface
                    .save_content(req, file.name, file.data)
                    .then(save => {
                        res.status(200).json({
                            mine: file.mimetype,
                            path: 'images/' + file.name
                        });
                    });
                break;

            default:
                res.status(400).end();
        }
    });

    router.get('/ajax', (req: express.Request, res: express.Response) => {
        const query = req.query;

        const action = query.action;

        switch (action) {
            case 'content-type-cache':
                res.status(200).json(content_type_cache);
                break;

            case 'libraries':
                const semantics = require(path.join(
                    h5pinterface.library_dir,
                    query.machineName +
                        '-' +
                        query.majorVersion +
                        '.' +
                        query.minorVersion,
                    'semantics.json'
                ));

                const lib = new Library(
                    query.machineName,
                    query.majorVersion,
                    query.minorVersion,
                    h5pinterface,
                    (error, library) => {
                        const dependencies = resolve_dependencies(
                            library.editorDependencies,
                            h5pinterface
                        );

                        const language = require(path.join(
                            h5pinterface.library_dir,
                            query.machineName +
                                '-' +
                                query.majorVersion +
                                '.' +
                                query.minorVersion,
                            'language',
                            'de.json'
                        ));

                        res.status(200).json({
                            semantics,
                            language: JSON.stringify(language),
                            javascript: dependencies.js.map(
                                dep => req.baseUrl + '/libraries' + dep
                            ),
                            css: dependencies.css.map(
                                dep => req.baseUrl + '/libraries' + dep
                            ),
                            translations: {
                                // 'H5PEditor.RangeList': {
                                //     libraryStrings: {
                                //         distributeButtonLabel:
                                //             'Distribute Evenly',
                                //         distributeButtonWarning:
                                //             'Values will be changed for all of the ranges. Do you wish to proceed?',
                                //         rangeOutOfSequenceWarning:
                                //             'The score ranges are out of sequence'
                                //     }
                                // }
                            }
                        });
                    }
                );

                // res.status(200)
                break;

            default:
                res.status(400).end();
        }
    });

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
                if (req.params[0].indexOf('.css') > -1) {
                    res.setHeader('Content-Type', 'text/css');
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
                '<script>window.H5PIntegration.contents = window.H5PIntegration.contents || {}; </script>' +
                '<script>window.H5PIntegration.contents["cid-' +
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
                '<script>window.H5PIntegration.contents["cid-' +
                content_id +
                '"].contentUserData = parent.__H5P_USERDATA; </script>' +
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

    router.get('/editor', (req: IUploadRequest, res: express.Response) => {
        if (!req.query.content_id) {
            return h5pinterface.generate_id(req).then(id => {
                return res.redirect(req.baseUrl + '/editor?content_id=' + id);
            });
        }
        const editor_assets = [
            '/editor/scripts/h5p-hub-client.js',
            '/editor/scripts/h5peditor-editor.js',
            '/editor/wp/h5p-editor.js',
            '/editor/scripts/h5peditor.js',
            '/editor/language/en.js',
            '/js/h5p-display-options.js',
            '/editor/scripts/h5peditor-semantic-structure.js',
            '/editor/scripts/h5peditor-library-selector.js',
            '/editor/scripts/h5peditor-form.js',
            '/editor/scripts/h5peditor-text.js',
            '/editor/scripts/h5peditor-html.js',
            '/editor/scripts/h5peditor-number.js',
            '/editor/scripts/h5peditor-textarea.js',
            '/editor/scripts/h5peditor-file-uploader.js',
            '/editor/scripts/h5peditor-file.js',
            '/editor/scripts/h5peditor-image.js',
            '/editor/scripts/h5peditor-image-popup.js',
            '/editor/scripts/h5peditor-av.js',
            '/editor/scripts/h5peditor-group.js',
            '/editor/scripts/h5peditor-boolean.js',
            '/editor/scripts/h5peditor-list.js',
            '/editor/scripts/h5peditor-list-editor.js',
            '/editor/scripts/h5peditor-library.js',
            '/editor/scripts/h5peditor-library-list-cache.js',
            '/editor/scripts/h5peditor-select.js',
            '/editor/scripts/h5peditor-selector-hub.js',
            '/editor/scripts/h5peditor-selector-legacy.js',
            '/editor/scripts/h5peditor-dimensions.js',
            '/editor/scripts/h5peditor-coordinates.js',
            '/editor/scripts/h5peditor-none.js',
            '/editor/scripts/h5peditor-metadata.js',
            '/editor/scripts/h5peditor-metadata-author-widget.js',
            '/editor/scripts/h5peditor-metadata-changelog-widget.js',
            '/editor/scripts/h5peditor-pre-save.js',
            '/editor/ckeditor/ckeditor.js'
        ]
            .map(asset => '<script src="/core' + asset + '"></script>')
            .reduce((p, c) => p + c, '');

        const response =
            '<html>' +
            '<head>' +
            '<link rel="stylesheet" href="' +
            req.baseUrl +
            '/core' +
            '/styles/h5p.css">' +
            '<link rel="stylesheet" href="' +
            req.baseUrl +
            '/core/editor/wp/admin.css">' +
            '<link rel="stylesheet" href="' +
            req.baseUrl +
            '/core/editor/styles/css/h5p-hub-client.css" type="text/css">' +
            '<script src="' +
            req.baseUrl +
            '/core' +
            '/js/jquery.js"></script>' +
            '<script src="' +
            req.baseUrl +
            '/core' +
            '/js/h5p.js"></script>' +
            '<script> window.H5P.getClipboard = function() { return false; }; window.H5PIntegration = parent.H5PIntegration || ' +
            JSON.stringify(
                Object.assign(
                    {
                        baseUrl: req.protocol + '://' + req.headers.host,
                        url: req.baseUrl,
                        postUserStatistics: true,
                        ajax: {
                            setFinished:
                                'http://lumi.education/wp-admin/admin-ajax.php?token=d78f225415&action=h5p_setFinished',
                            contentUserData:
                                'http://lumi.education/wp-admin/admin-ajax.php?token=44e52cdc8b&action=h5p_contents_user_data&content_id=:contentId&data_type=:dataType&sub_content_id=:subContentId'
                        },
                        saveFreq: false,
                        siteUrl: req.protocol + '://' + req.headers.host,
                        l10n: {
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
                                subLevel: 'Sublevel',
                                confirmDialogHeader: 'Confirm action',
                                confirmDialogBody:
                                    'Please confirm that you wish to proceed. This action is not reversible.',
                                cancelLabel: 'Cancel',
                                confirmLabel: 'Confirm',
                                licenseU: 'Undisclosed',
                                licenseCCBY: 'Attribution',
                                licenseCCBYSA: 'Attribution-ShareAlike',
                                licenseCCBYND: 'Attribution-NoDerivs',
                                licenseCCBYNC: 'Attribution-NonCommercial',
                                licenseCCBYNCSA:
                                    'Attribution-NonCommercial-ShareAlike',
                                licenseCCBYNCND:
                                    'Attribution-NonCommercial-NoDerivs',
                                licenseCC40: '4.0 International',
                                licenseCC30: '3.0 Unported',
                                licenseCC25: '2.5 Generic',
                                licenseCC20: '2.0 Generic',
                                licenseCC10: '1.0 Generic',
                                licenseGPL: 'General Public License',
                                licenseV3: 'Version 3',
                                licenseV2: 'Version 2',
                                licenseV1: 'Version 1',
                                licensePD: 'Public Domain',
                                licenseCC010:
                                    'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
                                licensePDM: 'Public Domain Mark',
                                licenseC: 'Copyright',
                                contentType: 'Content Type',
                                licenseExtras: 'License Extras',
                                changes: 'Changelog'
                            }
                        },
                        hubIsEnabled: true,
                        reportingIsEnabled: false,
                        libraryConfig: null,
                        crossorigin: null,
                        user: {
                            name: 'jpschellenberg',
                            mail: 'jps@Lumi.education'
                        },
                        core: {
                            styles: [
                                '/core/styles/h5p.css?ver=1.11.3',
                                '/core/styles/h5p-confirmation-dialog.css?ver=1.11.3',
                                '/core/styles/h5p-core-button.css?ver=1.11.3'
                            ],
                            scripts: [
                                '/core/js/jquery.js?ver=1.11.3',
                                '/core/js/h5p.js?ver=1.11.3',
                                '/core/js/h5p-event-dispatcher.js?ver=1.11.3',
                                '/core/js/h5p-x-api-event.js?ver=1.11.3',
                                '/core/js/h5p-x-api.js?ver=1.11.3',
                                '/core/js/h5p-content-type.js?ver=1.11.3',
                                '/core/js/h5p-confirmation-dialog.js?ver=1.11.3',
                                '/core/js/h5p-action-bar.js?ver=1.11.3'
                            ]
                        },
                        loadedJs: [],
                        loadedCss: [],
                        editor: {
                            filesPath: req.baseUrl + '/content',
                            fileIcon: {
                                path:
                                    'http://lumi.education/core/editor/images/binary-file.png',
                                width: 50,
                                height: 50
                            },
                            ajaxPath: 'http://localhost:8085/ajax/?action=',
                            libraryUrl:
                                req.protocol +
                                '://' +
                                req.headers.host +
                                '/core/editor/',
                            copyrightSemantics: {
                                name: 'copyright',
                                type: 'group',
                                label: 'Copyright information',
                                fields: [
                                    {
                                        name: 'title',
                                        type: 'text',
                                        label: 'Title',
                                        placeholder: 'La Gioconda',
                                        optional: true
                                    },
                                    {
                                        name: 'author',
                                        type: 'text',
                                        label: 'Author',
                                        placeholder: 'Leonardo da Vinci',
                                        optional: true
                                    },
                                    {
                                        name: 'year',
                                        type: 'text',
                                        label: 'Year(s)',
                                        placeholder: '1503 - 1517',
                                        optional: true
                                    },
                                    {
                                        name: 'source',
                                        type: 'text',
                                        label: 'Source',
                                        placeholder:
                                            'http://en.wikipedia.org/wiki/Mona_Lisa',
                                        optional: true,
                                        regexp: {
                                            pattern: '^http[s]?://.+',
                                            modifiers: 'i'
                                        }
                                    },
                                    {
                                        name: 'license',
                                        type: 'select',
                                        label: 'License',
                                        default: 'U',
                                        options: [
                                            {
                                                value: 'U',
                                                label: 'Undisclosed'
                                            },
                                            {
                                                value: 'CC BY',
                                                label: 'Attribution',
                                                versions: [
                                                    {
                                                        value: '4.0',
                                                        label:
                                                            '4.0 International'
                                                    },
                                                    {
                                                        value: '3.0',
                                                        label: '3.0 Unported'
                                                    },
                                                    {
                                                        value: '2.5',
                                                        label: '2.5 Generic'
                                                    },
                                                    {
                                                        value: '2.0',
                                                        label: '2.0 Generic'
                                                    },
                                                    {
                                                        value: '1.0',
                                                        label: '1.0 Generic'
                                                    }
                                                ]
                                            },
                                            {
                                                value: 'CC BY-SA',
                                                label: 'Attribution-ShareAlike',
                                                versions: [
                                                    {
                                                        value: '4.0',
                                                        label:
                                                            '4.0 International'
                                                    },
                                                    {
                                                        value: '3.0',
                                                        label: '3.0 Unported'
                                                    },
                                                    {
                                                        value: '2.5',
                                                        label: '2.5 Generic'
                                                    },
                                                    {
                                                        value: '2.0',
                                                        label: '2.0 Generic'
                                                    },
                                                    {
                                                        value: '1.0',
                                                        label: '1.0 Generic'
                                                    }
                                                ]
                                            },
                                            {
                                                value: 'CC BY-ND',
                                                label: 'Attribution-NoDerivs',
                                                versions: [
                                                    {
                                                        value: '4.0',
                                                        label:
                                                            '4.0 International'
                                                    },
                                                    {
                                                        value: '3.0',
                                                        label: '3.0 Unported'
                                                    },
                                                    {
                                                        value: '2.5',
                                                        label: '2.5 Generic'
                                                    },
                                                    {
                                                        value: '2.0',
                                                        label: '2.0 Generic'
                                                    },
                                                    {
                                                        value: '1.0',
                                                        label: '1.0 Generic'
                                                    }
                                                ]
                                            },
                                            {
                                                value: 'CC BY-NC',
                                                label:
                                                    'Attribution-NonCommercial',
                                                versions: [
                                                    {
                                                        value: '4.0',
                                                        label:
                                                            '4.0 International'
                                                    },
                                                    {
                                                        value: '3.0',
                                                        label: '3.0 Unported'
                                                    },
                                                    {
                                                        value: '2.5',
                                                        label: '2.5 Generic'
                                                    },
                                                    {
                                                        value: '2.0',
                                                        label: '2.0 Generic'
                                                    },
                                                    {
                                                        value: '1.0',
                                                        label: '1.0 Generic'
                                                    }
                                                ]
                                            },
                                            {
                                                value: 'CC BY-NC-SA',
                                                label:
                                                    'Attribution-NonCommercial-ShareAlike',
                                                versions: [
                                                    {
                                                        value: '4.0',
                                                        label:
                                                            '4.0 International'
                                                    },
                                                    {
                                                        value: '3.0',
                                                        label: '3.0 Unported'
                                                    },
                                                    {
                                                        value: '2.5',
                                                        label: '2.5 Generic'
                                                    },
                                                    {
                                                        value: '2.0',
                                                        label: '2.0 Generic'
                                                    },
                                                    {
                                                        value: '1.0',
                                                        label: '1.0 Generic'
                                                    }
                                                ]
                                            },
                                            {
                                                value: 'CC BY-NC-ND',
                                                label:
                                                    'Attribution-NonCommercial-NoDerivs',
                                                versions: [
                                                    {
                                                        value: '4.0',
                                                        label:
                                                            '4.0 International'
                                                    },
                                                    {
                                                        value: '3.0',
                                                        label: '3.0 Unported'
                                                    },
                                                    {
                                                        value: '2.5',
                                                        label: '2.5 Generic'
                                                    },
                                                    {
                                                        value: '2.0',
                                                        label: '2.0 Generic'
                                                    },
                                                    {
                                                        value: '1.0',
                                                        label: '1.0 Generic'
                                                    }
                                                ]
                                            },
                                            {
                                                value: 'GNU GPL',
                                                label: 'General Public License',
                                                versions: [
                                                    {
                                                        value: 'v3',
                                                        label: 'Version 3'
                                                    },
                                                    {
                                                        value: 'v2',
                                                        label: 'Version 2'
                                                    },
                                                    {
                                                        value: 'v1',
                                                        label: 'Version 1'
                                                    }
                                                ]
                                            },
                                            {
                                                value: 'PD',
                                                label: 'Public Domain',
                                                versions: [
                                                    { value: '-', label: '-' },
                                                    {
                                                        value: 'CC0 1.0',
                                                        label:
                                                            'CC0 1.0 Universal'
                                                    },
                                                    {
                                                        value: 'CC PDM',
                                                        label:
                                                            'Public Domain Mark'
                                                    }
                                                ]
                                            },
                                            { value: 'C', label: 'Copyright' }
                                        ]
                                    },
                                    {
                                        name: 'version',
                                        type: 'select',
                                        label: 'License Version',
                                        options: []
                                    }
                                ]
                            },
                            metadataSemantics: [
                                {
                                    name: 'title',
                                    type: 'text',
                                    label: 'Title',
                                    placeholder: 'La Gioconda'
                                },
                                {
                                    name: 'license',
                                    type: 'select',
                                    label: 'License',
                                    default: 'U',
                                    options: [
                                        { value: 'U', label: 'Undisclosed' },
                                        {
                                            type: 'optgroup',
                                            label: 'Creative Commons',
                                            options: [
                                                {
                                                    value: 'CC BY',
                                                    label:
                                                        'Attribution (CC BY)',
                                                    versions: [
                                                        {
                                                            value: '4.0',
                                                            label:
                                                                '4.0 International'
                                                        },
                                                        {
                                                            value: '3.0',
                                                            label:
                                                                '3.0 Unported'
                                                        },
                                                        {
                                                            value: '2.5',
                                                            label: '2.5 Generic'
                                                        },
                                                        {
                                                            value: '2.0',
                                                            label: '2.0 Generic'
                                                        },
                                                        {
                                                            value: '1.0',
                                                            label: '1.0 Generic'
                                                        }
                                                    ]
                                                },
                                                {
                                                    value: 'CC BY-SA',
                                                    label:
                                                        'Attribution-ShareAlike (CC BY-SA)',
                                                    versions: [
                                                        {
                                                            value: '4.0',
                                                            label:
                                                                '4.0 International'
                                                        },
                                                        {
                                                            value: '3.0',
                                                            label:
                                                                '3.0 Unported'
                                                        },
                                                        {
                                                            value: '2.5',
                                                            label: '2.5 Generic'
                                                        },
                                                        {
                                                            value: '2.0',
                                                            label: '2.0 Generic'
                                                        },
                                                        {
                                                            value: '1.0',
                                                            label: '1.0 Generic'
                                                        }
                                                    ]
                                                },
                                                {
                                                    value: 'CC BY-ND',
                                                    label:
                                                        'Attribution-NoDerivs (CC BY-ND)',
                                                    versions: [
                                                        {
                                                            value: '4.0',
                                                            label:
                                                                '4.0 International'
                                                        },
                                                        {
                                                            value: '3.0',
                                                            label:
                                                                '3.0 Unported'
                                                        },
                                                        {
                                                            value: '2.5',
                                                            label: '2.5 Generic'
                                                        },
                                                        {
                                                            value: '2.0',
                                                            label: '2.0 Generic'
                                                        },
                                                        {
                                                            value: '1.0',
                                                            label: '1.0 Generic'
                                                        }
                                                    ]
                                                },
                                                {
                                                    value: 'CC BY-NC',
                                                    label:
                                                        'Attribution-NonCommercial (CC BY-NC)',
                                                    versions: [
                                                        {
                                                            value: '4.0',
                                                            label:
                                                                '4.0 International'
                                                        },
                                                        {
                                                            value: '3.0',
                                                            label:
                                                                '3.0 Unported'
                                                        },
                                                        {
                                                            value: '2.5',
                                                            label: '2.5 Generic'
                                                        },
                                                        {
                                                            value: '2.0',
                                                            label: '2.0 Generic'
                                                        },
                                                        {
                                                            value: '1.0',
                                                            label: '1.0 Generic'
                                                        }
                                                    ]
                                                },
                                                {
                                                    value: 'CC BY-NC-SA',
                                                    label:
                                                        'Attribution-NonCommercial-ShareAlike (CC BY-NC-SA)',
                                                    versions: [
                                                        {
                                                            value: '4.0',
                                                            label:
                                                                '4.0 International'
                                                        },
                                                        {
                                                            value: '3.0',
                                                            label:
                                                                '3.0 Unported'
                                                        },
                                                        {
                                                            value: '2.5',
                                                            label: '2.5 Generic'
                                                        },
                                                        {
                                                            value: '2.0',
                                                            label: '2.0 Generic'
                                                        },
                                                        {
                                                            value: '1.0',
                                                            label: '1.0 Generic'
                                                        }
                                                    ]
                                                },
                                                {
                                                    value: 'CC BY-NC-ND',
                                                    label:
                                                        'Attribution-NonCommercial-NoDerivs (CC BY-NC-ND)',
                                                    versions: [
                                                        {
                                                            value: '4.0',
                                                            label:
                                                                '4.0 International'
                                                        },
                                                        {
                                                            value: '3.0',
                                                            label:
                                                                '3.0 Unported'
                                                        },
                                                        {
                                                            value: '2.5',
                                                            label: '2.5 Generic'
                                                        },
                                                        {
                                                            value: '2.0',
                                                            label: '2.0 Generic'
                                                        },
                                                        {
                                                            value: '1.0',
                                                            label: '1.0 Generic'
                                                        }
                                                    ]
                                                },
                                                {
                                                    value: 'CC0 1.0',
                                                    label:
                                                        'Public Domain Dedication (CC0)'
                                                },
                                                {
                                                    value: 'CC PDM',
                                                    label:
                                                        'Public Domain Mark (PDM)'
                                                }
                                            ]
                                        },
                                        {
                                            value: 'GNU GPL',
                                            label: 'General Public License v3'
                                        },
                                        { value: 'PD', label: 'Public Domain' },
                                        {
                                            value: 'ODC PDDL',
                                            label:
                                                'Public Domain Dedication and Licence'
                                        },
                                        { value: 'C', label: 'Copyright' }
                                    ]
                                },
                                {
                                    name: 'licenseVersion',
                                    type: 'select',
                                    label: 'License Version',
                                    options: [
                                        {
                                            value: '4.0',
                                            label: '4.0 International'
                                        },
                                        { value: '3.0', label: '3.0 Unported' },
                                        { value: '2.5', label: '2.5 Generic' },
                                        { value: '2.0', label: '2.0 Generic' },
                                        { value: '1.0', label: '1.0 Generic' }
                                    ],
                                    optional: true
                                },
                                {
                                    name: 'yearFrom',
                                    type: 'number',
                                    label: 'Years (from)',
                                    placeholder: '1991',
                                    min: '-9999',
                                    max: '9999',
                                    optional: true
                                },
                                {
                                    name: 'yearTo',
                                    type: 'number',
                                    label: 'Years (to)',
                                    placeholder: '1992',
                                    min: '-9999',
                                    max: '9999',
                                    optional: true
                                },
                                {
                                    name: 'source',
                                    type: 'text',
                                    label: 'Source',
                                    placeholder: 'https://',
                                    optional: true
                                },
                                {
                                    name: 'authors',
                                    type: 'list',
                                    field: {
                                        name: 'author',
                                        type: 'group',
                                        fields: [
                                            {
                                                label: "Author's name",
                                                name: 'name',
                                                optional: true,
                                                type: 'text'
                                            },
                                            {
                                                name: 'role',
                                                type: 'select',
                                                label: "Author's role",
                                                default: 'Author',
                                                options: [
                                                    {
                                                        value: 'Author',
                                                        label: 'Author'
                                                    },
                                                    {
                                                        value: 'Editor',
                                                        label: 'Editor'
                                                    },
                                                    {
                                                        value: 'Licensee',
                                                        label: 'Licensee'
                                                    },
                                                    {
                                                        value: 'Originator',
                                                        label: 'Originator'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    name: 'licenseExtras',
                                    type: 'text',
                                    widget: 'textarea',
                                    label: 'License Extras',
                                    optional: true,
                                    description:
                                        'Any additional information about the license'
                                },
                                {
                                    name: 'changes',
                                    type: 'list',
                                    field: {
                                        name: 'change',
                                        type: 'group',
                                        label: 'Changelog',
                                        fields: [
                                            {
                                                name: 'date',
                                                type: 'text',
                                                label: 'Date',
                                                optional: true
                                            },
                                            {
                                                name: 'author',
                                                type: 'text',
                                                label: 'Changed by',
                                                optional: true
                                            },
                                            {
                                                name: 'log',
                                                type: 'text',
                                                widget: 'textarea',
                                                label: 'Description of change',
                                                placeholder:
                                                    'Photo cropped, text changed, etc.',
                                                optional: true
                                            }
                                        ]
                                    }
                                },
                                {
                                    name: 'authorComments',
                                    type: 'text',
                                    widget: 'textarea',
                                    label: 'Author comments',
                                    description:
                                        'Comments for the editor of the content (This text will not be published as a part of copyright info)',
                                    optional: true
                                },
                                {
                                    name: 'contentType',
                                    type: 'text',
                                    widget: 'none'
                                }
                            ],
                            assets: {
                                css: [
                                    '/core/styles/h5p.css?ver=1.11.3',
                                    '/core/styles/h5p-confirmation-dialog.css?ver=1.11.3',
                                    '/core/styles/h5p-core-button.css?ver=1.11.3',
                                    '/core/editor/libs/darkroom.css?ver=1.11.3',
                                    '/core/editor/styles/css/h5p-hub-client.css?ver=1.11.3',
                                    '/core/editor/styles/css/fonts.css?ver=1.11.3',
                                    '/core/editor/styles/css/application.css?ver=1.11.3',
                                    '/core/editor/styles/css/libs/zebra_datepicker.min.css?ver=1.11.3'
                                ],
                                js: [
                                    '/core/js/jquery.js?ver=1.11.3',
                                    '/core/js/h5p.js?ver=1.11.3',
                                    '/core/js/h5p-event-dispatcher.js?ver=1.11.3',
                                    '/core/js/h5p-x-api-event.js?ver=1.11.3',
                                    '/core/js/h5p-x-api.js?ver=1.11.3',
                                    '/core/js/h5p-content-type.js?ver=1.11.3',
                                    '/core/js/h5p-confirmation-dialog.js?ver=1.11.3',
                                    '/core/js/h5p-action-bar.js?ver=1.11.3',
                                    '/core/editor/scripts/h5p-hub-client.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-semantic-structure.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-library-selector.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-form.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-text.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-html.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-number.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-textarea.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-file-uploader.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-file.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-image.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-image-popup.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-av.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-group.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-boolean.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-list.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-list-editor.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-library.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-library-list-cache.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-select.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-selector-hub.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-selector-legacy.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-dimensions.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-coordinates.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-none.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-metadata.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-metadata-author-widget.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-metadata-changelog-widget.js?ver=1.11.3',
                                    '/core/editor/scripts/h5peditor-pre-save.js?ver=1.11.3',
                                    '/core/editor/ckeditor/ckeditor.js?ver=1.11.3'
                                ]
                            },
                            deleteMessage:
                                'Are you sure you wish to delete this content?',
                            apiVersion: { majorVersion: 1, minorVersion: 19 }
                        }
                    },
                    h5pinterface.integration
                )
            ) +
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
            editor_assets +
            '</head>' +
            '<body>' +
            '<form method="post" enctype="multipart/form-data" id="h5p-content-form"><div id="post-body-content"><div class="h5p-create"><div class="h5p-editor"></div></div></div><input type="submit" name="submit" value="Create" class="button button-primary button-large"></form>' +
            '</body>' +
            '<script src="' +
            req.baseUrl +
            '/core' +
            '/js/h5p-resizer.js"></script>' +
            '</html>';

        res.status(200).end(response);
    });

    router.post('/editor', (req: IUploadRequest, res: express.Response) => {
        const lib = parse_library(req.body.library);

        const _lib = new Library(
            lib.machineName,
            lib.majorVersion,
            lib.minorVersion,
            h5pinterface,
            (error, library) => {
                const h5p_json = assign({}, req.body.params.metadata, {
                    mainLibrary: lib.machineName,
                    preloadedDependencies: [
                        lib,
                        ...library.preloadedDependencies
                    ]
                });

                const content_json = req.body.params.params;

                h5pinterface.save_h5p_json(req, h5p_json, _error => {
                    if (_error) {
                        return res.status(500).json(error);
                    }

                    h5pinterface.save_content_json(
                        req,
                        content_json,
                        save_content_json_error => {
                            res.redirect(
                                '/?content_id=' + req.query.content_id
                            );
                        }
                    );
                });
            }
        );
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

        h5pinterface.generate_id(req).then((id: string) => {
            req.query.content_id = id;

            const content_id = id;

            move_file_and_extract(req.files.file, content_id)
                .then(() => save_content(content_id, h5pinterface, req))
                .then(() => save_content_json(content_id, h5pinterface, req))
                .then(() => copy_libs(content_id, h5pinterface))
                .then(() => save_h5p_json(content_id, h5pinterface, req))
                .then(() => h5pinterface.upload_complete(req))
                .then(() => clean_tmp(content_id))
                .then(() => h5pinterface.handle_response(req, res))
                .catch(error => {
                    res.status(500).end();
                });
        });
    });

    // router.get(
    //     '/content-type-cache',
    //     (req: IUploadRequest, res: express.Response) => {
    //         res.status(200).json(
    // );

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
