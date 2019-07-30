const H5P = require('../src');

describe('Rendering the HTML page', () => {
    it('uses default renderer and integration values', () => {
        const contentId = 'foo';
        const contentObject = {
            my: 'content'
        };
        const h5pObject = {};

        return new H5P()
            .render(contentId, contentObject, h5pObject)
            .then(html => {
                expect(html).toBe(
                    `<!doctype html>
<html class="h5p-iframe">
<head>
    <meta charset="utf-8">
    
    <link rel="stylesheet" href="/h5p/core/styles/h5p.css"/>
    <link rel="stylesheet" href="/h5p/core/styles/h5p-confirmation-dialog.css"/>
    <script src="/h5p/core/js/jquery.js"></script>
    <script src="/h5p/core/js/h5p.js"></script>
    <script src="/h5p/core/js/h5p-event-dispatcher.js"></script>
    <script src="/h5p/core/js/h5p-x-api-event.js"></script>
    <script src="/h5p/core/js/h5p-x-api.js"></script>
    <script src="/h5p/core/js/h5p-content-type.js"></script>
    <script src="/h5p/core/js/h5p-confirmation-dialog.js"></script>
    <script src="/h5p/core/js/h5p-action-bar.js"></script>

    <script>
        H5PIntegration = {
  "url": "/h5p",
  "postUserStatistics": false,
  "saveFreq": false,
  "l10n": {
    "H5P": {
      "fullscreen": "Fullscreen",
      "disableFullscreen": "Disable fullscreen",
      "download": "Download",
      "copyrights": "Rights of use",
      "embed": "Embed",
      "size": "Size",
      "showAdvanced": "Show advanced",
      "hideAdvanced": "Hide advanced",
      "advancedHelp": "Include this script on your website if you want dynamic sizing of the embedded content:",
      "copyrightInformation": "Rights of use",
      "close": "Close",
      "title": "Title",
      "author": "Author",
      "year": "Year",
      "source": "Source",
      "license": "License",
      "thumbnail": "Thumbnail",
      "noCopyrights": "No copyright information available for this content.",
      "downloadDescription": "Download this content as a H5P file.",
      "copyrightsDescription": "View copyright information for this content.",
      "embedDescription": "View the embed code for this content.",
      "h5pDescription": "Visit H5P.org to check out more cool content.",
      "contentChanged": "This content has changed since you last used it.",
      "startingOver": "You'll be starting over.",
      "by": "by",
      "showMore": "Show more",
      "showLess": "Show less",
      "subLevel": "Sublevel"
    }
  },
  "contents": {
    "cid-foo": {
      "jsonContent": "{\\"my\\":\\"content\\"}",
      "fullScreen": false,
      "displayOptions": {
        "frame": false,
        "export": false,
        "embed": false,
        "copyright": false,
        "icon": false,
        "copy": false
      }
    }
  }
};
    </script>
</head>
<body>
    <div class="h5p-content" data-content-id="foo"></div>
</body>
</html>`
                );
            });
    });

    it('resolves the main library', () => {
        const contentId = 'foo';
        const contentObject = {};
        const h5pObject = {
            mainLibrary: 'Foo',
            preloadedDependencies: [
                {
                    machineName: 'Bar'
                },
                {
                    machineName: 'Foo',
                    majorVersion: 4,
                    minorVersion: 2
                }
            ]
        };

        return new H5P(() => Promise.resolve({}))
            .useRenderer(model => model)
            .render(contentId, contentObject, h5pObject)
            .then(model => {
                expect(model.integration.contents['cid-foo'].library).toBe(
                    'Foo 4.2'
                );
            });
    });

    it('includes custom scripts', () => {
        const contentId = 'foo';
        const contentObject = {};
        const h5pObject = {};

        return new H5P(
            () => {
                return {};
            },
            {},
            {},
            {},
            '<script src="/test" />'
        )
            .useRenderer(model => model)
            .render(contentId, contentObject, h5pObject)
            .then(model => {
                expect(model.customScripts).toBe('<script src="/test" />');
            });
    });

    it('includes custom integration', () => {
        const contentId = 'foo';
        const contentObject = {};
        const h5pObject = {};

        return new H5P(
            () => {
                return {};
            },
            {},
            { integration: 'test' }
        )
            .useRenderer(model => model)
            .render(contentId, contentObject, h5pObject)
            .then(model => {
                expect(model.integration.integration).toBe('test');
            });
    });

    it('includes custom content', () => {
        const contentId = 'foo';
        const contentObject = {};
        const h5pObject = {};

        return new H5P(
            () => {
                return {};
            },
            {},
            {},
            { test: 'test' }
        )
            .useRenderer(model => model)
            .render(contentId, contentObject, h5pObject)
            .then(model => {
                expect(model.integration.contents['cid-foo'].test).toBe('test');
            });
    });

    it('includes custom scripts in the generated html', () => {
        const contentId = 'foo';
        const contentObject = {
            my: 'content'
        };
        const h5pObject = {};

        return new H5P(
            () => {
                return {};
            },
            {},
            {},
            {},
            '<script src="/test" />'
        )
            .render(contentId, contentObject, h5pObject)
            .then(html => {
                expect(html).toBe(
                    `<!doctype html>
<html class="h5p-iframe">
<head>
    <meta charset="utf-8">
    
    <link rel="stylesheet" href="/h5p/core/styles/h5p.css"/>
    <link rel="stylesheet" href="/h5p/core/styles/h5p-confirmation-dialog.css"/>
    <script src="/h5p/core/js/jquery.js"></script>
    <script src="/h5p/core/js/h5p.js"></script>
    <script src="/h5p/core/js/h5p-event-dispatcher.js"></script>
    <script src="/h5p/core/js/h5p-x-api-event.js"></script>
    <script src="/h5p/core/js/h5p-x-api.js"></script>
    <script src="/h5p/core/js/h5p-content-type.js"></script>
    <script src="/h5p/core/js/h5p-confirmation-dialog.js"></script>
    <script src="/h5p/core/js/h5p-action-bar.js"></script>

    <script>
        H5PIntegration = {
  "url": "/h5p",
  "postUserStatistics": false,
  "saveFreq": false,
  "l10n": {
    "H5P": {
      "fullscreen": "Fullscreen",
      "disableFullscreen": "Disable fullscreen",
      "download": "Download",
      "copyrights": "Rights of use",
      "embed": "Embed",
      "size": "Size",
      "showAdvanced": "Show advanced",
      "hideAdvanced": "Hide advanced",
      "advancedHelp": "Include this script on your website if you want dynamic sizing of the embedded content:",
      "copyrightInformation": "Rights of use",
      "close": "Close",
      "title": "Title",
      "author": "Author",
      "year": "Year",
      "source": "Source",
      "license": "License",
      "thumbnail": "Thumbnail",
      "noCopyrights": "No copyright information available for this content.",
      "downloadDescription": "Download this content as a H5P file.",
      "copyrightsDescription": "View copyright information for this content.",
      "embedDescription": "View the embed code for this content.",
      "h5pDescription": "Visit H5P.org to check out more cool content.",
      "contentChanged": "This content has changed since you last used it.",
      "startingOver": "You'll be starting over.",
      "by": "by",
      "showMore": "Show more",
      "showLess": "Show less",
      "subLevel": "Sublevel"
    }
  },
  "contents": {
    "cid-foo": {
      "jsonContent": "{\\"my\\":\\"content\\"}",
      "fullScreen": false,
      "displayOptions": {
        "frame": false,
        "export": false,
        "embed": false,
        "copyright": false,
        "icon": false,
        "copy": false
      }
    }
  }
};
    </script><script src="/test" />
</head>
<body>
    <div class="h5p-content" data-content-id="foo"></div>
</body>
</html>`
                );
            });
    });
});
