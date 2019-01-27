import Library from './models/Library';

import { IDependency, IResolvedDependencies, IH5PInterface } from './types';

export function resolve_dependencies(
    dependenies: IDependency[],
    h5pinterface: IH5PInterface
): IResolvedDependencies {
    const js_dependencies = [];
    const css_dependencies = [];

    function load(dependency: IDependency) {
        if (dependency.preloadedDependencies) {
            dependency.preloadedDependencies.forEach((_dep: IDependency) => {
                const _lib = new Library(
                    _dep.machineName,
                    _dep.majorVersion,
                    _dep.minorVersion,
                    h5pinterface,
                    (error, library) => {
                        load(library);
                    }
                );
            });
        }
        if (dependency.preloadedJs) {
            dependency.preloadedJs.forEach(script => {
                js_dependencies.push(
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
                css_dependencies.push(
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

    if (dependenies) {
        dependenies.forEach(dependency => {
            const lib = new Library(
                dependency.machineName,
                dependency.majorVersion,
                dependency.minorVersion,
                h5pinterface,
                (error, library) => {
                    load(library);
                }
            );
        });
    }

    return {
        js: js_dependencies,
        css: css_dependencies
    };
}
