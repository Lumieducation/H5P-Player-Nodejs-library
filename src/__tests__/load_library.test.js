const load_library = require('../load_library');
const path = require('path');

describe('load_library', () => {
    const library_directory = path.resolve('') + '/test/libraries';
    const library_name = 'H5P.Accordion-1.0';
    it(
        'should load the library from ' +
            library_directory +
            '/' +
            library_name,
        done => {
            const library = load_library(library_name, library_directory);
            expect(library.title).toBe('Accordion');
            expect(library.majorVersion).toBe(1);
            done();
        }
    );
});
