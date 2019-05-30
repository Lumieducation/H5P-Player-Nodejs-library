# H5P-Nodejs-library

[![Build Status](https://travis-ci.org/Lumieducation/H5P-Nodejs-library.svg?branch=next)](https://travis-ci.org/Lumieducation/H5P-Nodejs-library)

The H5P-Nodejs-library is a port of the [H5P-PHP-library](https://github.com/h5p/h5p-php-library) for Nodejs.
Please note that this project is in a very early and experimental stage. If you have questions or want to contribute, feel free to open issues or pull requests.

This package provides a framework-agnostic function that returns a promise, which resolves to a string. The string is the equivalent to what the H5P-PHP-library would generate and can be integrated via iframe. You will also have to serve the H5P-Core-files.

## How to use

### 1. Provide H5P-Core files and libraries

See the [example integration for express](./examples/server.js) how to integrate it with express.

You have to provide the H5P-Core and library-files. To do so

1. download the [H5P](https://github.com/h5p/h5p-php-library/archive/1.22.0.zip) folder and place it in your project.
2. Add a route thats serves the H5P-Folder content. (See the [express-example](https://github.com/Lumieducation/H5P-Nodejs-library/blob/next/examples/server.js#L12))

### 2. Use the H5P-Nodejs-library

#### 2.1 Require the H5P-Nodejs-Library

```ts
const h5p = require('h5p-nodejs-library');
```

#### 2.1 Provide a library loader.

A [H5P-Library](https://h5p.org/library-definition) is a folder that contains a `library.json` and the corresponding js/css files. H5P-Libraries can usualy be found in the root folder of a .h5p-file.
The library loader is a function that loads the `library.json` of a specific H5P-library. The easiest way would be a function that uses nodejs-require for loading the library.json within a H5P-Library.
The library-loader takes three arguments:

1. machine_name: string - the folder name in which the library can be found
2. major_version: number
3. minor_version: number

For example:

```ts
const libraryLoader = (machine_name: string, major_version: number, minor_version: number) => {
    return require(`/the_path_to_your_libraries/${machine_name}-${major_version}.${minor_version}/library.json`
};

const H5P = new h5p(libraryLoader);

```

or see the [express-example](https://github.com/Lumieducation/H5P-Nodejs-library/blob/next/examples/server.js#L37)

#### 2.2 Provide the H5P- and Content-Object and use the renderer

You have to provide a [H5P-Object](https://h5p.org/documentation/developers/json-file-definitions) and a Content-Object.
The H5P-Object can be found in the root folder of a .h5p-file.
The Content-Object can be found the the /content folder of a .h5p-file.

Use the `.render`-method of the H5P-Nodejs-Library, which generates a H5P Page that can be embedded via iframe.

```ts
const h5pObject = require(`test/h5p.json`);
const contentObject = require(`test/content/content.json`);
H5P.render('test', contentObject, h5pObject).then(h5p_page =>
    send(h5p_page);
);
```

### Adapters

We will provide adapters for express and meteor in the future. If you would like to see another adapter, please make a issue.

## Development & Testing

### Prerequisites

Make sure you have [`git`](https://git-scm.com/), [`node`](https://nodejs.org/), and [`npm`](https://www.npmjs.com/get-npm) installed.

### Installing

```
$ git clone https://github.com/Lumieducation/h5p-nodejs-library
$ cd h5p-nodejs-library
$ npm install
$ npm start
```

### Usage

Open `http://localhost:8080` in your browser. You will see a list of examples. By clicking on an example you download the corresponding .h5p-file and render it in the browser. See [express-example](https://github.com/Lumieducation/H5P-Nodejs-library/blob/next/examples/server.js) for the implementation.

## Contributing

Lumi tries to improve education wherever it is possible by providing a software that connects teachers with their students. Every help is appreciated and welcome.
Feel free to create pull requests.
h5p-nodejs-library has adopted the code of conduct defined by the Contributor Covenant. It can be read in full [here](./CODE-OF-CONDUCT.md).

### Get in touch

[Slack](https://join.slack.com/t/lumi-education/shared_invite/enQtMjY0MTM2NjIwNDU0LWU3YzVhZjdkNGFjZGE1YThjNzBiMmJjY2I2ODk2MzAzNDE3YzI0MmFkOTdmZWZhOTBmY2RjOTc3ZmZmOWMxY2U) or [c@Lumi.education](mailto:c@Lumi.education).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Lumieducation/Lumi/tags).

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE v3 License - see the [LICENSE](LICENSE) file for details
