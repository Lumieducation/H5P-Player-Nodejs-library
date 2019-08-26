# H5P-Player

[![Build Status](https://travis-ci.org/Lumieducation/H5P-Nodejs-library.svg?branch=master)](https://travis-ci.org/Lumieducation/H5P-Nodejs-library)

This project is a port of the [H5P-PHP-library](https://github.com/h5p/h5p-php-library) for Nodejs.

Please note that this project is in an experimental stage. If you have questions or want to contribute, feel free to open issues or pull requests.

This project provides a framework-agnostic way of playing the contents of a H5P package by returning HTML code that can be embedded as an iframe or integrated into an HTML page by using a custom renderer.

An example of how to integrate and use this library can be found in the [H5P-Demo](https://github.com/Lumieducation/H5P-Demo) project.

## Quick start

This will show you the very basics on how to use this library. For more detailed information and integration-options see the *interface* section below.

### 1. Provide H5P-Core files and libraries

See the [example integration for express](https://github.com/Lumieducation/H5P-Demo/blob/master/express.js) how to integrate it with express.

You have to provide the H5P core and library files. To do so

1. download the [H5P](https://github.com/h5p/h5p-php-library/archive/1.22.0.zip) folder and place it in your project.
2. Add a route thats serves the H5P-Folder content. (See the [express-example](https://github.com/Lumieducation/H5P-Demo/blob/master/express.js#L62))

### 2. Use the H5P-Player

Install the library with 

```
npm install h5p-player
```

#### 2.1 Require the H5P-Player

```js
const H5PPlayer = require('h5p-player');
```

#### 2.2 Provide a library loader.

For example:

```js
const libraryLoader = (
    machineName,
    majorVersion,
    minorVersion
) => 
    require(`./the_path_to_your_libraries/${machineName}-${majorVersion}.${minorVersion}/library.json`);

const player = new H5PPlayer.Player(libraryLoader);
```

You can also load the library asynchronously by returning a promise. For example:

```js
const libraryLoader = (
    machineName,
    majorVersion,
    minorVersion
) => request(`https://mysite.com/h5p/${machineName}-${majorVersion}.${minorVersion}/library.json`)); // request returns a promise
```

#### 2.3 Provide the H5P- and Content-Object and use the renderer

You have to provide a [H5P-Object](https://h5p.org/documentation/developers/json-file-definitions) and a Content-Object. 

The H5P-Object can be found in the root folder of a `.h5p` file. The Content-Object can be found the the `/content` folder of a `.h5p` file.

Use the `.render`-method of the `Player`, which generates a H5P Page that can be embedded via iframe.

```js
const h5pObject = require(`./test/h5p.json`);
const contentObject = require(`./test/content/content.json`);
player.render('test', contentObject, h5pObject)
    .then(h5pPage => send(h5pPage));
```

### Adapters

We will provide adapters for express and meteor in the future. If you would like to see another adapter, please make a issue.

## Interface

```js
interface H5PPlayer(
    libraryLoader: (machineName: string, majorVersion: number, minorVersion: number) => LibraryJSON,
    urls?: {
        baseUrL: string;
        libraryUrl: string;
        stylesUrl: string;
        scriptUrl: string;
    },
    integration?: object,
    content?: object,
    customScripts?: string
})
```

### libraryLoader

A [H5P Library](https://h5p.org/library-definition) is a folder that contains a `library.json` and the corresponding js/css files. Libraries can usually be found in the root folder of a `.h5p` file.

The library loader is a function that loads the `library.json` of a specific H5P-library. The easiest way would be a function that uses nodejs-require for loading the library.json within a H5P-Library.

The library loader takes three arguments:

1. `machineName: string` - the folder name in which the library can be found
2. `majorVersion: number`
3. `minorVersion: number`

For example:

```js
const libraryLoader = (
    machineName: string,
    majorVersion: number,
    minorVersion: number
) => {
    return require(`/the_path_to_your_libraries/${machineName}-${majorVersion}.${minorVersion}/library.json`);
};
```

### URLs (optional)

The URLs-object can be used to configure the location of your libraries, scripts and styles.

```js
const urls = {
    baseUrl: '/h5p', // your base URL - used in the integration object
    libraryUrl: `/h5p/libraries`, // URL where your libraries can be found
    stylesUrl: `/h5p/core/styles`, // URL where the core styles can be found
    scriptUrl: `/h5p/core/js` // URL where the core scripts can be found
};
```

### Integration (optional)

An object that is used as the `H5PIntegration` object. (See [the documentation on H5P.org](https://h5p.org/creating-your-own-h5p-plugin) for more information.) It is merged with a default integration object and is therefore optional.

### Content (optional)

An object that is used as the `H5PIntegration.contents['cid-contentId']` object (See [the documentation on H5P.org](https://h5p.org/creating-your-own-h5p-plugin) for more information.) It is merged with a default content object and therefore optional.

### customScripts (optional)

customScripts can be inserted as a string and are injected behind the `H5PIntegration` definition script in the [template](https://github.com/Lumieducation/H5P-Nodejs-library/blob/next/src/renderers/default.js#L15). These scripts can be used to further load information.

## Development & Testing

### Prerequisites

Make sure you have [`git`](https://git-scm.com/), [`node`](https://nodejs.org/) >= 10.16, and [`npm`](https://www.npmjs.com/get-npm) installed.

### Installing

To install the project, execute the following commands

```
git clone https://github.com/Lumieducation/h5p-nodejs-library
cd h5p-nodejs-library
npm install
```

### Tests

After installation, your can run the tests with

```
npm test
```

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
