import { uniq } from 'lodash';

import {
    IH5P,
    IContent,
    Content_id,
    IH5PInterface,
    IResolvedDependencies,
    IDependency,
    EmbedType,
    IJS,
    ICSS
} from '../types';

import Library from './library';

export default class H5P implements IH5P {
    public content: IContent;
    public title: string;
    public language: string;
    public mainLibrary: string;
    public embedTypes: EmbedType[];
    public license: string;
    public preloadedDependencies: IDependency[];
    public machineName: string;
    public majorVersion: number;
    public minorVersion: number;
    public preloadedJs: IJS[];
    public preloadedCss: ICSS[];

    private js_dependencies: string[];
    private css_dependencies: string[];
    private h5pinterface: IH5PInterface;

    constructor(
        content_id: Content_id,
        h5pinterface: IH5PInterface,
        cb: (error: Error, h5p: H5P) => void
    ) {
        this.h5pinterface = h5pinterface;
        h5pinterface.load_h5p_json(content_id, (h5p_json_error, h5p_json) => {
            Object.assign(this, h5p_json);

            h5pinterface.load_content_json(
                content_id,
                (content_json_error, content_json) => {
                    this.content = content_json;

                    this.js_dependencies = [];
                    this.css_dependencies = [];

                    this.load_dependency(this);

                    this.js_dependencies = uniq(this.js_dependencies);
                    this.css_dependencies = uniq(this.css_dependencies);

                    cb(undefined, this);
                }
            );
        });

        return this;
    }

    public get_mainLibrary(): string {
        return (
            this.mainLibrary +
            ' ' +
            this.preloadedDependencies.filter(
                dep => dep.machineName === this.mainLibrary
            )[0].majorVersion +
            '.' +
            this.preloadedDependencies.filter(
                dep => dep.machineName === this.mainLibrary
            )[0].minorVersion
        );
    }

    public dependencies(): IResolvedDependencies {
        return {
            js: this.js_dependencies,
            css: this.css_dependencies
        };
    }

    private load_dependency(dependency: IDependency) {
        if (dependency.preloadedDependencies) {
            dependency.preloadedDependencies.forEach((_dep: IDependency) => {
                const _lib = new Library(
                    _dep,
                    this.h5pinterface,
                    (error, library) => {
                        this.load_dependency(library);
                    }
                );
            });
        }

        if (dependency.preloadedJs) {
            dependency.preloadedJs.forEach(script => {
                this.js_dependencies.push(
                    '/' +
                        dependency.machineName +
                        '-' +
                        dependency.majorVersion +
                        '.' +
                        dependency.minorVersion +
                        '/' +
                        script.path
                );
            });
        }

        if (dependency.preloadedCss) {
            dependency.preloadedCss.forEach(style => {
                this.css_dependencies.push(
                    '/' +
                        dependency.machineName +
                        '-' +
                        dependency.majorVersion +
                        '.' +
                        dependency.minorVersion +
                        '/' +
                        style.path
                );
            });
        }
    }
}
