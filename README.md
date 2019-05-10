# H5P-Nodejs-library

[![Build Status](https://travis-ci.org/Lumieducation/H5P-Nodejs-library.svg?branch=next)](https://travis-ci.org/Lumieducation/H5P-Nodejs-library)

The H5P-Nodejs-library is a port of the [H5P-PHP-library](https://github.com/h5p/h5p-php-library) for Nodejs.
Please note that this project is in a very early and experimental stage. If you have questions or want to contribute, feel free to open issues or pull requests.

This package provides a framework-agnostic function that returns a promise, which resolves to a string. The string is the equivalent to what the H5P-PHP-library would generate and can be integrated via iframe. You will also have to serve the H5P-Core-files.

## Signature

```ts
h5p(h5p_json: JSON, content_json: JSON, library_directory: string, url_prefix: string, options: Object): Promise<H5PPage>;
```

| Argument          | Type   |                                   Explaination                                   |
| ----------------- | ------ | :------------------------------------------------------------------------------: |
| h5p_json          | JSON   |               The h5p.json found in the root folder of a .h5p file               |
| content_json      | JSON   |           The content.json found in the /content folder of a .h5p file           |
| library_directory | string |      The path where the H5P-Libraries can be found and loaded via require.       |
| url_prefix        | string | A prefix that is added in front of every js or css file that is loaded via http. |
| options           | Object |         options.integration will be used as H5PIntegration on the page.          |

## How to use

### 1. Provide H5P-Core files and libraries

See the [example integration for express](./examples/express.js) how to integrate it with express.

You have to provide the H5P-Core and library-files. To do so

1. download the [H5P](./h5p) folder and place it in your project.
2. Add a route thats serves the H5P-Folder content. (See the [express-example](https://github.com/Lumieducation/H5P-Nodejs-library/blob/next/examples/express.js#L8)) - the route has to be added as the `url_prefix` argument to the h5p-function.

### 2. Use the H5P-Nodejs-library

3. install the H5P-Nodejs-library via `npm install --save h5p-nodejs-library`
4. Require the H5P-Nodejs-Library via `const h5p = require('h5p-nodejs-library')`.
5. Use the h5p-function to build the H5P-Page. You will have to load the H5P.json and content.json from the .h5p file and provide these as arguments. For all arguments see the Signature.
6. Serve the generated string as response.

### Adapters

We will provide adapters for express and meteor in the future. If you would like to see another adapter, please make a issue.

## Development

### Prerequisites

Make sure you have [`git`](https://git-scm.com/), [`node`](https://nodejs.org/), and [`npm`](https://www.npmjs.com/get-npm) installed.

### Installing

```
$ git clone https://github.com/Lumieducation/h5p-nodejs-library
$ cd h5p-nodejs-library
$ npm install
$ npm start
```

Open `http://localhost:8080/course-presentation` in your browser to see the course-presentation example.

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
