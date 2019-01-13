# h5p-nodejs-library

h5p-nodejs-library is an [expressjs](http://expressjs.com)-Router that serves as a h5p nodejs integration. It is in a very early development state. Please feel free to contribute.

## Install

```
npm install --save h5p-nodejs-library
```

## Prerequisites

Your express server should use the [express-fileupload](https://www.npmjs.com/package/express-fileupload)-middleware.

```ts
import * as fileUpload from 'express-fileupload';
server.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 }
    })
);
```

## Usage

```ts
import h5p from 'h5p-nodejs-library/router';
const h5pinterface = {
    ... see H5P Interface
}
app.use('/h5p', h5p( h5pinterface ));
```

## H5P Interface

See the [example server](./src/sever.ts) and the [interface file](./src/interface.ts) on how the H5P-Interface is implemented.

Your interface-object should include the following:

```ts
interface IH5PInterface {
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
    upload_complete: (req: express.Request) => Promise<{}>;

    library_dir: string;
    core_dir: string;

    max_concurrent: number;
    max_queued: number;

    integration: IIntegration;
}
```

Please see [interfaces](./src/types.ts) for more information.

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

Open `http://localhost:8080` in your browser.

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
