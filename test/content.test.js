const fs = require('fs');
const path = require('path');
const h5p = require('../src/h5p');

describe('content', () => {
    it('test', done => {
        const dir = `${path.resolve('')}/h5p/content`;
        const library_directory = `${path.resolve('')}/h5p/libraries`;

        fs.readdir(dir, (err, files) => {
            const filtered_files = files.filter(
                file => file.charAt(0) !== '.' && file.charAt(0) !== '_'
            );

            const promises = filtered_files.map(file => {
                const h5p_json = require(`${path.resolve(
                    ''
                )}/h5p/content/${file}/h5p.json`);
                const content_json = require(`${path.resolve(
                    ''
                )}/h5p/content/${file}/content/content.json`);

                return new Promise(resolve => {
                    h5p(
                        file,
                        h5p_json,
                        content_json,
                        library_directory,
                        '/h5p',
                        {
                            integration: {}
                        }
                    ).then(h5p_page => {
                        expect(typeof h5p_page).toBe('string');
                        // expect(h5p_page).toEqual(); // TODO: Check against h5p-php-library rendered string.
                        resolve();
                    });
                });
            });

            Promise.all(promises).then(() => {
                done();
            });
        });
    });
});
