import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

import { IH5PInterface, IContent, IH5P } from './types';

const h5pinterface: IH5PInterface = {
    load_content_json: (
        content_id: string,
        cb: (error, content: IContent) => void
    ) => {
        cb(
            undefined,
            require(path.resolve('') +
                '/' +
                process.env.H5P_CONTENT +
                '/' +
                content_id +
                '/content/content.json')
        );
    },
    load_h5p_json: (
        content_id: string,
        cb: (error, h5p_json: IH5P) => void
    ) => {
        cb(
            undefined,
            require(path.resolve('') +
                '/' +
                process.env.H5P_CONTENT +
                '/' +
                content_id +
                '/h5p.json')
        );
    },
    load_library: (name: string, cb: (error, library) => void) => {
        cb(
            undefined,
            require(path.resolve('') +
                '/' +
                process.env.H5P_LIB +
                '/' +
                name +
                '/library.json')
        );
    },
    load_content: (
        content_id: string,
        file_name: string,
        cb: (error: Error, buffer: Buffer) => void
    ) => {
        fs.readFile(
            path.join(
                path.resolve(''),
                process.env.H5P_CONTENT,
                content_id,
                'content',
                file_name
            ),
            (error, buffer) => {
                cb(error, buffer);
            }
        );
    },
    save_h5p_json: (
        content_id: string,
        h5p_json: JSON,
        done: (error) => void
    ) => {
        mkdirp(
            path.join(path.resolve(''), process.env.H5P_CONTENT, content_id),
            () => {
                fs.writeFile(
                    path.join(
                        path.resolve(''),
                        process.env.H5P_CONTENT,
                        content_id,
                        'h5p.json'
                    ),
                    JSON.stringify(h5p_json),
                    'utf8',
                    err => done(err)
                );
            }
        );
    },
    save_content_json: (
        content_id: string,
        content_json: JSON,
        done: (error) => void
    ) => {
        mkdirp(
            path.join(
                path.resolve(''),
                process.env.H5P_CONTENT,
                content_id,
                'content'
            ),
            () => {
                fs.writeFile(
                    path.join(
                        path.resolve(''),
                        process.env.H5P_CONTENT,
                        content_id,
                        'content',
                        'content.json'
                    ),
                    JSON.stringify(content_json),
                    'utf8',
                    err => done(err)
                );
            }
        );
    },
    save_content: (content_id: string, file_name: string, content: Buffer) => {
        mkdirp(
            path.join(
                path.resolve(''),
                process.env.H5P_CONTENT,
                content_id,
                'content',
                'images'
            ),
            () => {
                fs.writeFile(
                    path.join(
                        path.resolve(''),
                        process.env.H5P_CONTENT,
                        content_id,
                        'content',
                        'images',
                        file_name
                    ),
                    content,
                    () => {
                        console.log('file written');
                    }
                );
            }
        );
    },
    upload_complete: (content_id: string) => {
        console.log(content_id);
    },

    library_dir: path.resolve('') + '/' + process.env.H5P_LIB,
    core_dir: path.resolve('') + '/' + process.env.H5P_CORE,
    integration: {
        postUserStatistics: true,
        ajaxPath: '',
        ajax: {
            setFinished: '/test',
            contentUserData: '/test'
        },
        saveFreq: 30,
        user: {
            name: 'test',
            mail: 'test@Lumi.education'
        }
    }
};

export default h5pinterface;
