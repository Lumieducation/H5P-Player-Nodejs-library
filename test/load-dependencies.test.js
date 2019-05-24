const H5P = require('../src');

describe('Loading dependencies', () => {

    it('resolves main dependencies', () => {
        const content_id = 'foo';
        const content_object = {};
        const h5p_object = {
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
        const library_loader = (name, maj, min) => ({
            Foo42: {
                "preloadedJs": [
                    { "path": "foo1.js" },
                    { "path": "foo2.js" }
                ],
                "preloadedCss": [
                    { "path": "foo1.css" },
                    { "path": "foo2.css" }
                ]
            },
            Bar21: {
                "preloadedJs": [
                    { "path": "bar.js" },
                ],
                "preloadedCss": [
                    { "path": "bar.css" }
                ]
            }
        }[name + maj + min]);

        return new H5P(library_loader)
            .useRenderer(model => model)
            .render(content_id, content_object, h5p_object)
            .then(model => {
                expect(model.styles.slice(1)).toEqual([
                    "/h5p/libraries/Foo-4.2/foo1.css",
                    "/h5p/libraries/Foo-4.2/foo2.css",
                    "/h5p/libraries/Bar-2.1/bar.css"
                ])
                expect(model.scripts.slice(7)).toEqual([
                    "/h5p/libraries/Foo-4.2/foo1.js",
                    "/h5p/libraries/Foo-4.2/foo2.js",
                    "/h5p/libraries/Bar-2.1/bar.js"
                ])
            })
    })

    it('resolves deep dependencies', () => {
        const content_id = 'foo';
        const content_object = {};
        const h5p_object = {
            mainLibrary: 'Foo',
            preloadedDependencies: [
                {
                    machineName: 'Foo',
                    majorVersion: 4,
                    minorVersion: 2
                }
            ]
        };
        const library_loader = (name, maj, min) => ({
            Foo42: {
                "preloadedJs": [
                    { "path": "foo.js" }
                ],
                "preloadedCss": [
                    { "path": "foo.css" }
                ],
                "preloadedDependencies": [
                  {
                    "machineName": "Bar",
                    "majorVersion": 2,
                    "minorVersion": 1
                  }
                ]
            },
            Bar21: {
                "preloadedJs": [
                    { "path": "bar.js" },
                ],
                "preloadedCss": [
                    { "path": "bar.css" }
                ],
                "preloadedDependencies": [
                  {
                    "machineName": "Baz",
                    "majorVersion": 3,
                    "minorVersion": 3
                  }
                ]
            },
            Baz33: {
                "preloadedJs": [
                    { "path": "baz.js" },
                ],
                "preloadedCss": [
                    { "path": "baz.css" }
                ]
            }
        }[name + maj + min]);

        return new H5P(library_loader)
            .useRenderer(model => model)
            .render(content_id, content_object, h5p_object)
            .then(model => {
                expect(model.styles.slice(1)).toEqual([
                    "/h5p/libraries/Baz-3.3/baz.css",
                    "/h5p/libraries/Bar-2.1/bar.css",
                    "/h5p/libraries/Foo-4.2/foo.css"
                ])
                expect(model.scripts.slice(7)).toEqual([
                    "/h5p/libraries/Baz-3.3/baz.js",
                    "/h5p/libraries/Bar-2.1/bar.js",
                    "/h5p/libraries/Foo-4.2/foo.js"
                ])
            })
    })

    it('de-duplicates dependencies', () => {
        const content_id = 'foo';
        const content_object = {};
        const h5p_object = {
            mainLibrary: 'Foo',
            preloadedDependencies: [
                {
                    machineName: 'Foo',
                    majorVersion: 4,
                    minorVersion: 2
                }
            ]
        };
        const library_loader = (name, maj, min) => ({
            Foo42: {
                "preloadedJs": [
                    { "path": "foo.js" }
                ],
                "preloadedCss": [
                    { "path": "foo.css" }
                ],
                "preloadedDependencies": [
                  {
                    "machineName": "Bar",
                    "majorVersion": 2,
                    "minorVersion": 1
                  },
                  {
                    "machineName": "Baz",
                    "majorVersion": 3,
                    "minorVersion": 3
                  }
                ]
            },
            Bar21: {
                "preloadedJs": [
                    { "path": "bar.js" },
                ],
                "preloadedCss": [
                    { "path": "bar.css" }
                ],
                "preloadedDependencies": [
                  {
                    "machineName": "Baz",
                    "majorVersion": 3,
                    "minorVersion": 3
                  }
                ]
            },
            Baz33: {
                "preloadedJs": [
                    { "path": "baz.js" },
                ],
                "preloadedCss": [
                    { "path": "baz.css" }
                ]
            }
        }[name + maj + min]);

        return new H5P(library_loader)
            .useRenderer(model => model)
            .render(content_id, content_object, h5p_object)
            .then(model => {
                expect(model.styles.slice(1)).toEqual([
                    "/h5p/libraries/Baz-3.3/baz.css",
                    "/h5p/libraries/Bar-2.1/bar.css",
                    "/h5p/libraries/Foo-4.2/foo.css"
                ])
                expect(model.scripts.slice(7)).toEqual([
                    "/h5p/libraries/Baz-3.3/baz.js",
                    "/h5p/libraries/Bar-2.1/bar.js",
                    "/h5p/libraries/Foo-4.2/foo.js"
                ])
            })
    })
})