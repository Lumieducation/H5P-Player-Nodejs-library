# h5p-nodejs-library

h5p-nodejs-library will be a nodejs-implementation of the [h5p-php-library](https://github.com/h5p/h5p-php-library). It is in a very early development state. Please feel free to contribute.

## How to use

This package provides a framework-agnostic function that returns a promise, which resolves to a string. The string is the equivalent to what the H5P-php-library would generate and can be integrated via iframe.

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

See the [example integration for express](./examples/express.js) how to integrate it with exress.

We will provide more examples in the future.

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
