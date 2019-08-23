const defaultRenderer = require('./renderers/default');
const defaultTranslation = require('../assets/translations/en.json');

class H5PPlayer {
    constructor(libraryLoader, urls, integration, content, customScripts = '') {
        this.libraryLoader = libraryLoader;
        this.renderer = defaultRenderer;
        this.translation = defaultTranslation;

        this.integration = integration;
        this.content = content;
        this.customScripts = customScripts;

        this.urls = Object.assign(
            {
                baseUrl: '/h5p',
                libraryUrl: `/h5p/libraries`,
                stylesUrl: `/h5p/core/styles`,
                scriptUrl: `/h5p/core/js`
            },
            urls
        );

        this.baseUrl = this.urls.baseUrl;
        this.libraryUrl = this.urls.libraryUrl;
        this.stylesUrl = this.urls.stylesUrl;
        this.scriptUrl = this.urls.scriptUrl;
    }

    render(contentId, contentObject, h5pObject, callback) {
        const model = {
            contentId,
            styles: this._coreStyles(),
            scripts: this._coreScripts(),
            integration: this._integration(contentId, contentObject, h5pObject),
            customScripts: this.customScripts
        };

        const libraries = {};
        return this._loadLibraries(
            h5pObject.preloadedDependencies || [],
            libraries
        ).then(() => {
            this._loadAssets(
                h5pObject.preloadedDependencies || [],
                model,
                libraries
            );

            if (callback && typeof callback === 'function') {
                return callback(this.renderer(model));
            }
            return this.renderer(model);
        });
    }

    useRenderer(renderer) {
        this.renderer = renderer;
        return this;
    }

    _integration(contentId, contentObject, h5pObject) {
        // see https://h5p.org/creating-your-own-h5p-plugin
        return Object.assign(
            {
                url: this.baseUrl,
                postUserStatistics: false,
                saveFreq: false,
                l10n: {
                    H5P: this.translation
                },
                contents: {
                    [`cid-${contentId}`]: Object.assign(
                        {
                            library: this._mainLibraryString(h5pObject),
                            jsonContent: JSON.stringify(contentObject),
                            contentUrl: `${
                                this.baseUrl
                            }/content/${contentId}/content`,
                            fullScreen: false,
                            displayOptions: {
                                frame: false,
                                export: false,
                                embed: false,
                                copyright: false,
                                icon: false,
                                copy: false
                            }
                        },
                        this.content
                    )
                }
            },
            this.integration
        );
    }

    _coreStyles() {
        return ['h5p.css', 'h5p-confirmation-dialog.css'].map(
            file => `${this.stylesUrl}/${file}`
        );
    }

    _coreScripts() {
        return [
            'jquery.js',
            'h5p.js',
            'h5p-event-dispatcher.js',
            'h5p-x-api-event.js',
            'h5p-x-api.js',
            'h5p-content-type.js',
            'h5p-confirmation-dialog.js',
            'h5p-action-bar.js'
        ].map(file => `${this.scriptUrl}/${file}`);
    }

    _loadLibraries(dependencies, loaded) {
        return new Promise(resolve => {
            Promise.all(
                dependencies.map(
                    dependency =>
                        new Promise(rslv => {
                            const name = dependency.machineName;
                            const majVer = dependency.majorVersion;
                            const minVer = dependency.minorVersion;

                            const key = `${name}-${majVer}.${minVer}`;

                            if (key in loaded) return rslv();

                            return this._loadLibrary(name, majVer, minVer).then(
                                lib => {
                                    loaded[key] = lib;
                                    this._loadLibraries(
                                        lib.preloadedDependencies || [],
                                        loaded
                                    ).then(() => rslv());
                                }
                            );
                        })
                )
            ).then(() => resolve());
        });
    }

    _loadAssets(dependencies, assets, libraries = {}, loaded = {}) {
        dependencies.forEach(dependency => {
            const name = dependency.machineName;
            const majVer = dependency.majorVersion;
            const minVer = dependency.minorVersion;

            const key = `${name}-${majVer}.${minVer}`;
            if (key in loaded) return;

            loaded[key] = true;
            const lib = libraries[key];
            this._loadAssets(
                lib.preloadedDependencies || [],
                assets,
                libraries,
                loaded
            );
            const path = `${this.libraryUrl}/${key}`;
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

    _loadLibrary(machineName, majorVersion, minorVersion) {
        return Promise.resolve(
            this.libraryLoader(machineName, majorVersion, minorVersion)
        );
    }
}

module.exports = H5PPlayer;
