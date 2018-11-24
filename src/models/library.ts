import {
    ILibrary,
    IDependency,
    IJS,
    ICSS,
    IH5PInterface,
    EmbedType
} from '../types';

export default class Library implements ILibrary {
    public title: string;
    public description: string;
    public machineName: string;
    public majorVersion: number;
    public minorVersion: number;
    public patchVersion: number;
    public runnable: number;
    public license: string;
    public author: string;
    public embedTypes: EmbedType[];
    public coreApi: {
        majorVersion: number;
        minorVersion: number;
    };
    public preloadedCss: ICSS[];
    public preloadedJs: IJS[];
    public preloadedDependencies: IDependency[];
    public editorDependencies: IDependency[];

    constructor(
        dependency: IDependency,
        h5pinterface: IH5PInterface,
        cb: (error: Error, library: Library) => void
    ) {
        h5pinterface.load_library(
            dependency.machineName +
                '-' +
                dependency.majorVersion +
                '.' +
                dependency.minorVersion,
            (error, library) => {
                Object.assign(this, library);

                cb(error, this);
            }
        );
    }
}
