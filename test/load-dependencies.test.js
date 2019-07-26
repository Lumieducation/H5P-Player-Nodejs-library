const H5P = require('../src');

describe('Loading dependencies', () => {
    it('resolves main dependencies', () => {
        const contentId = 'foo';
        const contentObject = {};
        const h5pObject = {
            mainLibrary: 'Foo',
            preloadedDependencies: [
                {
                    machineName: 'Foo',
                    majorVersion: 4,
                    minorVersion: 2
                },
                {
                    machineName: 'Bar',
                    majorVersion: 2,
                    minorVersion: 1
                }
            ]
        };
        const libraryLoader = (name, maj, min) =>
            ({
                Foo42: {
                    preloadedJs: [{ path: 'foo1.js' }, { path: 'foo2.js' }],
                    preloadedCss: [{ path: 'foo1.css' }, { path: 'foo2.css' }]
                },
                Bar21: {
                    preloadedJs: [{ path: 'bar.js' }],
                    preloadedCss: [{ path: 'bar.css' }]
                }
            }[name + maj + min]);

        return new H5P(libraryLoader)
            .useRenderer(model => model)
            .render(contentId, contentObject, h5pObject)
            .then(model => {
                expect(model.styles.slice(1)).toEqual([
                    '/h5p/libraries/Foo-4.2/foo1.css',
                    '/h5p/libraries/Foo-4.2/foo2.css',
                    '/h5p/libraries/Bar-2.1/bar.css'
                ]);
                expect(model.scripts.slice(7)).toEqual([
                    '/h5p/libraries/Foo-4.2/foo1.js',
                    '/h5p/libraries/Foo-4.2/foo2.js',
                    '/h5p/libraries/Bar-2.1/bar.js'
                ]);
            });
    });

    it('resolves deep dependencies', () => {
        const contentId = 'foo';
        const contentObject = {};
        const h5pObject = {
            mainLibrary: 'Foo',
            preloadedDependencies: [
                {
                    machineName: 'Foo',
                    majorVersion: 4,
                    minorVersion: 2
                }
            ]
        };
        const libraryLoader = (name, maj, min) =>
            ({
                Foo42: {
                    preloadedJs: [{ path: 'foo.js' }],
                    preloadedCss: [{ path: 'foo.css' }],
                    preloadedDependencies: [
                        {
                            machineName: 'Bar',
                            majorVersion: 2,
                            minorVersion: 1
                        }
                    ]
                },
                Bar21: {
                    preloadedJs: [{ path: 'bar.js' }],
                    preloadedCss: [{ path: 'bar.css' }],
                    preloadedDependencies: [
                        {
                            machineName: 'Baz',
                            majorVersion: 3,
                            minorVersion: 3
                        }
                    ]
                },
                Baz33: {
                    preloadedJs: [{ path: 'baz.js' }],
                    preloadedCss: [{ path: 'baz.css' }]
                }
            }[name + maj + min]);

        return new H5P(libraryLoader)
            .useRenderer(model => model)
            .render(contentId, contentObject, h5pObject)
            .then(model => {
                expect(model.styles.slice(1)).toEqual([
                    '/h5p/libraries/Baz-3.3/baz.css',
                    '/h5p/libraries/Bar-2.1/bar.css',
                    '/h5p/libraries/Foo-4.2/foo.css'
                ]);
                expect(model.scripts.slice(7)).toEqual([
                    '/h5p/libraries/Baz-3.3/baz.js',
                    '/h5p/libraries/Bar-2.1/bar.js',
                    '/h5p/libraries/Foo-4.2/foo.js'
                ]);
            });
    });

    it('de-duplicates dependencies', () => {
        const contentId = 'foo';
        const contentObject = {};
        const h5pObject = {
            mainLibrary: 'Foo',
            preloadedDependencies: [
                {
                    machineName: 'Foo',
                    majorVersion: 4,
                    minorVersion: 2
                }
            ]
        };
        const libraryLoader = (name, maj, min) =>
            ({
                Foo42: {
                    preloadedJs: [{ path: 'foo.js' }],
                    preloadedCss: [{ path: 'foo.css' }],
                    preloadedDependencies: [
                        {
                            machineName: 'Bar',
                            majorVersion: 2,
                            minorVersion: 1
                        },
                        {
                            machineName: 'Baz',
                            majorVersion: 3,
                            minorVersion: 3
                        }
                    ]
                },
                Bar21: {
                    preloadedJs: [{ path: 'bar.js' }],
                    preloadedCss: [{ path: 'bar.css' }],
                    preloadedDependencies: [
                        {
                            machineName: 'Baz',
                            majorVersion: 3,
                            minorVersion: 3
                        }
                    ]
                },
                Baz33: {
                    preloadedJs: [{ path: 'baz.js' }],
                    preloadedCss: [{ path: 'baz.css' }]
                }
            }[name + maj + min]);

        return new H5P(libraryLoader)
            .useRenderer(model => model)
            .render(contentId, contentObject, h5pObject)
            .then(model => {
                expect(model.styles.slice(1)).toEqual([
                    '/h5p/libraries/Baz-3.3/baz.css',
                    '/h5p/libraries/Bar-2.1/bar.css',
                    '/h5p/libraries/Foo-4.2/foo.css'
                ]);
                expect(model.scripts.slice(7)).toEqual([
                    '/h5p/libraries/Baz-3.3/baz.js',
                    '/h5p/libraries/Bar-2.1/bar.js',
                    '/h5p/libraries/Foo-4.2/foo.js'
                ]);
            });
    });

    it('configures urls', () => {
        const contentId = 'foo';
        const contentObject = {};
        const h5pObject = {
            mainLibrary: 'Foo',
            preloadedDependencies: [
                {
                    machineName: 'Foo',
                    majorVersion: 4,
                    minorVersion: 2
                }
            ]
        };
        const libraryLoader = (name, maj, min) => {
            return {
                Foo42: {
                    preloadedJs: [{ path: 'foo.js' }],
                    preloadedCss: [{ path: 'foo.css' }],
                    preloadedDependencies: [
                        {
                            machineName: 'Bar',
                            majorVersion: 2,
                            minorVersion: 1
                        },
                        {
                            machineName: 'Baz',
                            majorVersion: 3,
                            minorVersion: 3
                        }
                    ]
                },
                Bar21: {
                    preloadedJs: [{ path: 'bar.js' }],
                    preloadedCss: [{ path: 'bar.css' }],
                    preloadedDependencies: [
                        {
                            machineName: 'Baz',
                            majorVersion: 3,
                            minorVersion: 3
                        }
                    ]
                },
                Baz33: {
                    preloadedJs: [{ path: 'baz.js' }],
                    preloadedCss: [{ path: 'baz.css' }]
                }
            }[name + maj + min];
        };

        const h5p = new H5P(libraryLoader, {
            baseUrl: '/baseUrl',
            libraryUrl: `/libraryUrl`,
            stylesUrl: `/stylesUrl`,
            scriptUrl: `/scriptUrl`
        });

        return h5p
            .useRenderer(model => model)
            .render(contentId, contentObject, h5pObject)
            .then(model => {
                expect(model.styles.slice(1)).toEqual([
                    '/libraryUrl/Baz-3.3/baz.css',
                    '/libraryUrl/Bar-2.1/bar.css',
                    '/libraryUrl/Foo-4.2/foo.css'
                ]);

                expect(h5p._coreScripts()).toEqual([
                    '/scriptUrl/jquery.js',
                    '/scriptUrl/h5p.js',
                    '/scriptUrl/h5p-event-dispatcher.js',
                    '/scriptUrl/h5p-x-api-event.js',
                    '/scriptUrl/h5p-x-api.js',
                    '/scriptUrl/h5p-content-type.js',
                    '/scriptUrl/h5p-action-bar.js'
                ]);

                expect(h5p._coreStyles()).toEqual(['/stylesUrl/h5p.css']);

                expect(h5p._integration('contentId', {}, {}).url).toBe(
                    '/baseUrl'
                );
            });
    });

    it('determines the correct script-, styles- and library-order (for fill-in-the-blanks)', () => {
        const libraryLoader = (machineName, majorVersion, minorVersion) => {
            return require(`../examples/contents/fill-in-the-blanks-837.h5p/${machineName}-${majorVersion}.${minorVersion}/library.json`);
        };

        const contentObject = require('../examples/contents/fill-in-the-blanks-837.h5p/content/content.json');
        const h5pObject = require('../examples/contents/fill-in-the-blanks-837.h5p/h5p.json');
        return new H5P(libraryLoader)
            .useRenderer(model => model)
            .render('fill-in-the-blanks', contentObject, h5pObject)
            .then(model => {
                expect(model.styles).toEqual([
                    '/h5p/core/styles/h5p.css',
                    '/h5p/libraries/H5P.Image-1.1/image.css',
                    '/h5p/libraries/FontAwesome-4.5/h5p-font-awesome.min.css',
                    '/h5p/libraries/Tether-1.0/styles/tether.min.css',
                    '/h5p/libraries/Drop-1.0/css/drop-theme-arrows-bounce.min.css',
                    '/h5p/libraries/H5P.FontIcons-1.0/styles/h5p-font-icons.css',
                    '/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-help-dialog.css',
                    '/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-message-dialog.css',
                    '/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-progress-circle.css',
                    '/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-simple-rounded-button.css',
                    '/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-speech-bubble.css',
                    '/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-tip.css',
                    '/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-slider.css',
                    '/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-score-bar.css',
                    '/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-progressbar.css',
                    '/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-ui.css',
                    '/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-icon.css',
                    '/h5p/libraries/H5P.Question-1.4/styles/question.css',
                    '/h5p/libraries/H5P.Question-1.4/styles/explainer.css',
                    '/h5p/libraries/H5P.Blanks-1.11/css/blanks.css'
                ]);
                expect(model.scripts).toEqual([
                    '/h5p/core/js/jquery.js',
                    '/h5p/core/js/h5p.js',
                    '/h5p/core/js/h5p-event-dispatcher.js',
                    '/h5p/core/js/h5p-x-api-event.js',
                    '/h5p/core/js/h5p-x-api.js',
                    '/h5p/core/js/h5p-content-type.js',
                    '/h5p/core/js/h5p-action-bar.js',
                    '/h5p/libraries/H5P.Image-1.1/image.js',
                    '/h5p/libraries/H5P.Transition-1.0/transition.js',
                    '/h5p/libraries/Tether-1.0/scripts/tether.min.js',
                    '/h5p/libraries/Drop-1.0/js/drop.min.js',
                    '/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-help-dialog.js',
                    '/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-message-dialog.js',
                    '/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-progress-circle.js',
                    '/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-simple-rounded-button.js',
                    '/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-speech-bubble.js',
                    '/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-throbber.js',
                    '/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-tip.js',
                    '/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-slider.js',
                    '/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-score-bar.js',
                    '/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-progressbar.js',
                    '/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-ui.js',
                    '/h5p/libraries/H5P.Question-1.4/scripts/question.js',
                    '/h5p/libraries/H5P.Question-1.4/scripts/explainer.js',
                    '/h5p/libraries/H5P.Question-1.4/scripts/score-points.js',
                    '/h5p/libraries/H5P.TextUtilities-1.3/scripts/text-utilities.js',
                    '/h5p/libraries/H5P.Blanks-1.11/js/blanks.js',
                    '/h5p/libraries/H5P.Blanks-1.11/js/cloze.js'
                ]);
            });
    });
});
