const defaultRenderer = require('./renderers/default');
const defaultTranslation = require('./translations/en.json');

class H5P {
    constructor(library_loader, baseUrl = '/h5p') {
        this.library_loader = library_loader;
        this.renderer = defaultRenderer;
        this.translation = defaultTranslation;

        this.baseUrl = baseUrl;
        this.coreUrl = `${baseUrl}/core`;
    }

    render(content_id, content_object, h5p_object) {
        const model = {
            content_id,
            styles: this._coreStyles(),
            scripts: this._coreScripts(),
            integration: this._integration(content_id, content_object, h5p_object),
        };

        this._loadAssets(h5p_object.preloadedDependencies || [], model);

        return Promise.resolve(this.renderer(model))
    }

    useRenderer(renderer) {
        this.renderer = renderer;
        return this
    }

    setCoreUrl(coreUrl) {
        this.coreUrl = coreUrl;
        return this
    }

    _integration(content_id, content_object, h5p_object) {
        // see https://h5p.org/creating-your-own-h5p-plugin
        return {
            "url": this.baseUrl,
            "postUserStatistics": false,
            "saveFreq": false,
            "l10n": {
                "H5P": this.translation
            },
            "contents": {
                [`cid-${content_id}`]: {
                    "library": this._mainLibraryString(h5p_object),
                    "jsonContent": JSON.stringify(content_object),
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
        }
    }

    _coreStyles() {
        return [
            'h5p.css'
        ]
            .map(file => `${this.coreUrl}/styles/${file}`)
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
        ]
            .map(file => `${this.coreUrl}/js/${file}`)
    }

    _loadAssets(dependencies, assets, loaded = {}) {
        dependencies.forEach(dependency => {
            const key = `${dependency.machineName}-${dependency.majorVersion}.${dependency.minorVersion}`;

            if (key in loaded) return;
            loaded[key] = true;

            const lib = this.library_loader(dependency.machineName, dependency.majorVersion, dependency.minorVersion);

            this._loadAssets(lib.preloadedDependencies || [], assets, loaded);

            const path = `${this.baseUrl}/libraries/${key}`;
            (lib.preloadedCss || []).forEach(asset => assets.styles.push(`${path}/${asset.path}`));
            (lib.preloadedJs || []).forEach(script => assets.scripts.push(`${path}/${script.path}`));
        });
    }

    _mainLibraryString(h5p_object) {
        let lib = (h5p_object.preloadedDependencies || [])
            .find(lib => lib.machineName == h5p_object.mainLibrary);

        if (!lib) return undefined;

        return `${lib.machineName} ${lib.majorVersion}.${lib.minorVersion}`
    }
}

module.exports = H5P;