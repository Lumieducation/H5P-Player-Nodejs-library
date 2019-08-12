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
                expect(model.styles.slice(2)).toEqual([
                    '/h5p/libraries/Foo-4.2/foo1.css',
                    '/h5p/libraries/Foo-4.2/foo2.css',
                    '/h5p/libraries/Bar-2.1/bar.css'
                ]);
                expect(model.scripts.slice(8)).toEqual([
                    '/h5p/libraries/Foo-4.2/foo1.js',
                    '/h5p/libraries/Foo-4.2/foo2.js',
                    '/h5p/libraries/Bar-2.1/bar.js'
                ]);
            });
    });

    it('loads asynchronous dependencies', () => {
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
            new Promise(resolve => {
                setTimeout(
                    () =>
                        resolve(
                            {
                                Foo42: {
                                    preloadedJs: [
                                        { path: 'foo1.js' },
                                        { path: 'foo2.js' }
                                    ],
                                    preloadedCss: [
                                        { path: 'foo1.css' },
                                        { path: 'foo2.css' }
                                    ]
                                },
                                Bar21: {
                                    preloadedJs: [{ path: 'bar.js' }],
                                    preloadedCss: [{ path: 'bar.css' }]
                                }
                            }[name + maj + min]
                        ),
                    100
                );
            });

        return new H5P(libraryLoader)
            .useRenderer(model => model)
            .render(contentId, contentObject, h5pObject)
            .then(model => {
                expect(model.styles.slice(2)).toEqual([
                    '/h5p/libraries/Foo-4.2/foo1.css',
                    '/h5p/libraries/Foo-4.2/foo2.css',
                    '/h5p/libraries/Bar-2.1/bar.css'
                ]);
                expect(model.scripts.slice(8)).toEqual([
                    '/h5p/libraries/Foo-4.2/foo1.js',
                    '/h5p/libraries/Foo-4.2/foo2.js',
                    '/h5p/libraries/Bar-2.1/bar.js'
                ]);
            });
    });

    it('loads async dependencies in the correct order', () => {
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
            new Promise(resolve => {
                setTimeout(
                    () =>
                        resolve(
                            {
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
                            }[name + maj + min]
                        ),
                    100
                );
            });

        return new H5P(libraryLoader)
            .useRenderer(model => model)
            .render(contentId, contentObject, h5pObject)
            .then(model => {
                expect(model.styles.slice(2)).toEqual([
                    '/h5p/libraries/Baz-3.3/baz.css',
                    '/h5p/libraries/Bar-2.1/bar.css',
                    '/h5p/libraries/Foo-4.2/foo.css'
                ]);
                expect(model.scripts.slice(8)).toEqual([
                    '/h5p/libraries/Baz-3.3/baz.js',
                    '/h5p/libraries/Bar-2.1/bar.js',
                    '/h5p/libraries/Foo-4.2/foo.js'
                ]);
            });
    });

    it('avoid loading the same library twice', () => {
        const contentId = 'foo';
        const contentObject = {};
        const h5pObject = {
            mainLibrary: 'Foo',
            preloadedDependencies: [{ machineName: 'Foo' }]
        };
        const loaded = [];

        const libraryLoader = name => {
            loaded.push(name);

            return Promise.resolve(
                {
                    Foo: {
                        preloadedDependencies: [
                            { machineName: 'Bar' },
                            { machineName: 'Baz' }
                        ]
                    },
                    Bar: {
                        preloadedDependencies: [{ machineName: 'Jaz' }]
                    },
                    Baz: {
                        preloadedDependencies: [{ machineName: 'Jaz' }]
                    },
                    Jaz: {}
                }[name]
            );
        };

        return new H5P(libraryLoader)
            .useRenderer(model => model)
            .render(contentId, contentObject, h5pObject)
            .then(() => {
                expect(loaded).toEqual(['Foo', 'Bar', 'Baz', 'Jaz']);
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
                expect(model.styles.slice(2)).toEqual([
                    '/h5p/libraries/Baz-3.3/baz.css',
                    '/h5p/libraries/Bar-2.1/bar.css',
                    '/h5p/libraries/Foo-4.2/foo.css'
                ]);
                expect(model.scripts.slice(8)).toEqual([
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
                expect(model.styles.slice(2)).toEqual([
                    '/h5p/libraries/Baz-3.3/baz.css',
                    '/h5p/libraries/Bar-2.1/bar.css',
                    '/h5p/libraries/Foo-4.2/foo.css'
                ]);
                expect(model.scripts.slice(8)).toEqual([
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
                expect(model.styles.slice(2)).toEqual([
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
                    '/scriptUrl/h5p-confirmation-dialog.js',
                    '/scriptUrl/h5p-action-bar.js'
                ]);

                expect(h5p._coreStyles()).toEqual([
                    '/stylesUrl/h5p.css',
                    '/stylesUrl/h5p-confirmation-dialog.css'
                ]);

                expect(h5p._integration('contentId', {}, {}).url).toBe(
                    '/baseUrl'
                );
            });
    });
});
