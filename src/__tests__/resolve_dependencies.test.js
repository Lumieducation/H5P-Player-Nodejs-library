const resolve_depedencies = require('../resolve_dependencies');
const path = require('path');

describe('resolve_dependencies', () => {
    const library_directory = path.resolve('') + '/test/libraries';

    it('test', done => {
        const dependencies = resolve_depedencies(
            [
                {
                    machineName: 'H5P.Accordion',
                    majorVersion: 1,
                    minorVersion: 0
                }
            ],
            library_directory
        );
        expect(dependencies).toBeDefined();
        expect(dependencies.js).toEqual([
            '/H5P.Accordion-1.0/h5p-accordion.js'
        ]);
        expect(dependencies.css).toEqual([
            '/FontAwesome-4.5/h5p-font-awesome.min.css',
            '/H5P.Accordion-1.0/h5p-accordion.css'
        ]);
        done();
    });
});
