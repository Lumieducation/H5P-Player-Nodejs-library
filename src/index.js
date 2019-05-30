const defaultRenderer = require('./renderers/default');
const defaultTranslation = require('./translations/en.json');

class H5P {
    constructor(libraryLoader, baseUrl = '/h5p') {
        this.libraryLoader = libraryLoader;
        this.renderer = defaultRenderer;
        this.translation = defaultTranslation;

        this.baseUrl = baseUrl;
        this.coreUrl = `${baseUrl}/core`;
    }

    render(contentId, contentObject, h5pObject) {
        const model = {
            contentId,
            styles: this._coreStyles(),
            scripts: this._coreScripts(),
            integration: this._integration(contentId, contentObject, h5pObject)
        };

        this._loadAssets(h5pObject.preloadedDependencies || [], model);

        return Promise.resolve(this.renderer(model));
    }

    useRenderer(renderer) {
        this.renderer = renderer;
        return this;
    }

    setCoreUrl(coreUrl) {
        this.coreUrl = coreUrl;
        return this;
    }

    _integration(contentId, contentObject, h5pObject) {
        // see https://h5p.org/creating-your-own-h5p-plugin
        return {
            url: this.baseUrl,
            postUserStatistics: false,
            saveFreq: false,
            l10n: {
                H5P: this.translation
            },
            contents: {
                [`cid-${contentId}`]: {
                    library: this._mainLibraryString(h5pObject),
                    jsonContent: JSON.stringify(contentObject),
                    fullScreen: false,
                    displayOptions: {
                        frame: false,
                        export: false,
                        embed: false,
                        copyright: false,
                        icon: false,
                        copy: false
                    }
                }
            }
        };
    }

    _coreStyles() {
        return ['h5p.css'].map(file => `${this.coreUrl}/styles/${file}`);
    }

    _coreScripts() {
        return [
            'jquery.js',
            'h5p.js',
            'h5p-event-dispatcher.js',
            'h5p-x-api-event.js',
            'h5p-x-api.js',
            'h5p-content-type.js',
            'h5p-action-bar.js'
        ].map(file => `${this.coreUrl}/js/${file}`);
    }

    _loadAssets(dependencies, assets, loaded = {}) {
        dependencies.forEach(dependency => {
            const name = dependency.machineName;
            const majVer = dependency.majorVersion;
            const minVer = dependency.minorVersion;

            const key = `${name}-${majVer}.${minVer}`;

            if (key in loaded) return;
            loaded[key] = true;

            const lib = this.libraryLoader(
                dependency.machineName,
                dependency.majorVersion,
                dependency.minorVersion
            );

            this._loadAssets(lib.preloadedDependencies || [], assets, loaded);

            const path = `${this.baseUrl}/libraries/${key}`;
            (lib.preloadedCss || []).forEach(asset =>
                assets.styles.push(`${path}/${asset.path}`)
            );
            (lib.preloadedJs || []).forEach(script =>
                assets.scripts.push(`${path}/${script.path}`)
            );
        });
    }

    _mainLibraryString(h5pObject) {
        const library = (h5pObject.preloadedDependencies || []).find(
            lib => lib.machineName === h5pObject.mainLibrary
        );

        if (!library) return undefined;

        const name = library.machineName;
        const majVer = library.majorVersion;
        const minVer = library.minorVersion;

        return `${name} ${majVer}.${minVer}`;
    }
}

module.exports = H5P;
