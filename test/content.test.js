const H5P = require('../src');

describe('fill-in-the-blanks', () => {
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
