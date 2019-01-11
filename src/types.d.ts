import * as express from 'express';

export type EmbedType = 'dev' | 'iframe';
export type Content_id = string;

export interface IH5PInterface {
    load_content_json: (
        req: express.Request,
        cb: (error: Error, content: IContent) => void
    ) => void;
    load_content: (
        req: express.Request,
        file_name: string,
        cb: (error: Error, buffer: Buffer) => void
    ) => void;
    load_h5p_json: (
        req: express.Request,
        cb: (error: Error, h5p_json: IH5P) => void
    ) => void;
    load_library: (
        name: string,
        cb: (error: Error, library: ILibrary) => void
    ) => void;

    save_content_json: (
        req: express.Request,
        content_json: JSON,
        done: (error: Error) => void
    ) => void;
    save_content: (
        req: express.Request,
        file_name: string,
        content: Buffer
    ) => Promise<boolean>;
    save_h5p_json: (
        req: express.Request,
        h5p_json: JSON,
        done: (error: Error) => void
    ) => void;
    upload_complete?: (req: express.Request) => void;

    library_dir: string;
    core_dir: string;

    integration: IIntegration;
}

export interface IH5P extends IDependency {
    title: string;
    language: string;
    mainLibrary: string;
    embedTypes: EmbedType[];
    license: string;
}

export interface IContent {}

export interface IDependency {
    machineName: string;
    majorVersion: number;
    minorVersion: number;
    preloadedDependencies: IDependency[];
    preloadedJs: IJS[];
    preloadedCss: ICSS[];
}

export interface IResolvedDependencies {
    js: string[];
    css: string[];
}

export interface ICSS {
    path: string;
}

export interface IJS {
    path: string;
}

export interface ILibrary extends IDependency {
    title: string;
    description: string;
    runnable: number;
    license: string;
    author: string;
    embedTypes: EmbedType[];
    coreApi: {
        majorVersion: number;
        minorVersion: number;
    };
    editorDependencies: IDependency[];
}

export interface IIntegration {
    postUserStatistics: boolean;
    ajaxPath: string;
    ajax: {
        setFinished: string;
        contentUserData: string;
    };
    saveFreq: number;
    user: {
        name: string;
        mail: string;
    };
}

export interface IUploadRequest extends express.Request {
    files: any;
}
