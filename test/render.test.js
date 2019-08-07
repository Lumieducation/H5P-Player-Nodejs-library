const H5P = require('../src');

describe('H5P.render()', () => {
    it('should work with a callback', () => {
        const contentId = 'foo';
        const contentObject = {};
        const h5pObject = {};

        new H5P()
            .useRenderer(model => model)
            .render(contentId, contentObject, h5pObject, model => {
                expect(model).toBeDefined();
                expect(model.contentId).toBe('foo');
            });
    });
});
