import resolve_dependencies from './resolve_dependencies';

function h5p(content_id, h5p_json, content_json, library_directory, options) {
    return new Promise(resolve => {
        const dependencies = resolve_dependencies(
            h5p_json.preloadedDependencies,
            library_directory
        );

        const h5p_page = `<!doctype html>
        <html class="h5p-iframe">
        <head>
          <meta charset="utf-8">
          <title>${h5p_json.title}</title>
          ${dependencies.js
              .map(script => `<script src="${script}"></script>`)
              .reduce((p, c) => p + c, '')}
          ${dependencies.css
              .map(style => `<link rel="stylesheet" href="${style}"></link>)`)
              .reduce((p, c) => p + c, '')}
        </head>
        <body>
          <div class="h5p-content" data-content-id="${content_id}"></div>
          <script>
            H5PIntegration = ${JSON.stringify(options.integration)};
          </script>
        </body>
        </html>`;

        resolve(h5p_page);
    });
}

module.exports = h5p;
