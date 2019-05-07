const h5p = require('../h5p');
const path = require('path');

const h5p_json = require(path.resolve('') + '/test/content/accordion/h5p.json');
const content_json = require(path.resolve('') +
    '/test/content/accordion/content/content.json');

describe('h5p', () => {
    const library_directory = path.resolve('') + '/test/libraries';

    it('should return a string', done => {
        h5p('test', h5p_json, content_json, library_directory, {
            integration: {}
        }).then(h5p_page => {
            expect(h5p_page).toBeDefined();
            expect(typeof h5p_page).toBe('string');
            done();
        });
    });

    it('should include the integration', done => {
        const integration = {
            test: 'test'
        };
        h5p('test', h5p_json, content_json, library_directory, {
            integration
        }).then(h5p_page => {
            expect(/H5PIntegration = {"test":"test"};/.test(h5p_page)).toBe(
                true
            );
            done();
        });
    });
});
