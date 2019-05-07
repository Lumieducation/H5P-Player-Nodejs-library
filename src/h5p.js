const resolve_dependencies = require('./resolve_dependencies');

function h5p(
    content_id,
    h5p_json,
    content_json,
    library_directory,
    url_prefix,
    options
) {
    return new Promise(resolve => {
        const dependencies = resolve_dependencies(
            h5p_json.preloadedDependencies,
            library_directory
        );

        const core_files = {
            js: [
                '/js/jquery.js',
                '/js/h5p.js',
                '/js/h5p-event-dispatcher.js',
                '/js/h5p-x-api-event.js',
                '/js/h5p-x-api.js',
                '/js/h5p-content-type.js',
                '/js/h5p-action-bar.js'
            ],
            css: ['/styles/h5p.css']
        };

        const h5p_page = `<!doctype html>
        <html class="h5p-iframe">
        <head>
          <meta charset="utf-8">
          <title>${h5p_json.title}</title>
          ${core_files.css
              .map(
                  style =>
                      `<link rel="stylesheet" href="${url_prefix}/core${style}"></link>`
              )
              .reduce((p, c) => p + c, '')}

            ${core_files.js
                .map(
                    script =>
                        `<script src="${url_prefix}/core${script}"></script>`
                )
                .reduce((p, c) => p + c, '')}
          <script>
          H5PIntegration = ${JSON.stringify(
              Object.assign(
                  {
                      baseUrl: '/', // No trailing slash
                      url: '/', // Relative to web root
                      postUserStatistics: true, // Only if user is logged in
                      ajaxPath: '/path/to/h5p-ajax', // Only used by older Content Types
                      ajax: {
                          // Where to post user results
                          setFinished: '/interactive-contents/123/results/new',
                          // Words beginning with : are placeholders
                          contentUserData:
                              '/interactive-contents/:contentId/user-data?data_type=:dataType&subContentId=:subContentId'
                      },
                      saveFreq: 30, // How often current content state should be saved. false to disable.
                      user: {
                          // Only if logged in !
                          name: 'User Name',
                          mail: 'user@mysite.com'
                      },
                      //   siteUrl: req.protocol + '://' + req.headers.host, // Only if NOT logged in!
                      l10n: {
                          // Text string translations
                          H5P: {
                              fullscreen: 'Fullscreen',
                              disableFullscreen: 'Disable fullscreen',
                              download: 'Download',
                              copyrights: 'Rights of use',
                              embed: 'Embed',
                              size: 'Size',
                              showAdvanced: 'Show advanced',
                              hideAdvanced: 'Hide advanced',
                              advancedHelp:
                                  'Include this script on your website if you want dynamic sizing of the embedded content:',
                              copyrightInformation: 'Rights of use',
                              close: 'Close',
                              title: 'Title',
                              author: 'Author',
                              year: 'Year',
                              source: 'Source',
                              license: 'License',
                              thumbnail: 'Thumbnail',
                              noCopyrights:
                                  'No copyright information available for this content.',
                              downloadDescription:
                                  'Download this content as a H5P file.',
                              copyrightsDescription:
                                  'View copyright information for this content.',
                              embedDescription:
                                  'View the embed code for this content.',
                              h5pDescription:
                                  'Visit H5P.org to check out more cool content.',
                              contentChanged:
                                  'This content has changed since you last used it.',
                              startingOver: "You'll be starting over.",
                              by: 'by',
                              showMore: 'Show more',
                              showLess: 'Show less',
                              subLevel: 'Sublevel'
                          }
                      },
                      loadedJs: dependencies.js,
                      loadedCss: dependencies.css,
                      core: {
                          scripts: dependencies.js,
                          styles: dependencies.css
                      }
                  },
                  options.integration
              )
          )};
        </script>

        <script>window.H5PIntegration.contents = window.H5PIntegration.contents || {}; </script>
        <script>window.H5PIntegration.contents["cid-${content_id}"] = ${JSON.stringify(
            {
                // library: h5p.get_mainLibrary(),
                library: `${h5p_json.mainLibrary} ${
                    h5p_json.preloadedDependencies.filter(
                        dep => dep.machineName === h5p_json.mainLibrary
                    )[0].majorVersion
                }.${
                    h5p_json.preloadedDependencies.filter(
                        dep => dep.machineName === h5p_json.mainLibrary
                    )[0].minorVersion
                }`,
                jsonContent: JSON.stringify(content_json),
                fullScreen: false,
                // "exportUrl": "/path/to/download.h5p",
                // "embedCode": "<iframe src=\"https://mysite.com${url_prefix}/1234/embed\" width=\":w\" height=\":h\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\"></iframe>",
                displayOptions: {
                    frame: false, // Show frame and buttons below H5P
                    export: false, // Display download button
                    embed: false, // Display embed button
                    copyright: true, // Display copyright button
                    icon: false // Display H5P icon
                },
                styles: dependencies.css,
                scripts: dependencies.js
            }
        )}
        </script>

        

          ${dependencies.js
              .map(
                  script =>
                      `<script src="${url_prefix}/libraries${script}"></script>`
              )
              .reduce((p, c) => p + c, '')}

          ${dependencies.css
              .map(
                  style =>
                      `<link rel="stylesheet" href="${url_prefix}/libraries${style}"></link>`
              )
              .reduce((p, c) => p + c, '')}

        </head>
        <body>
          <div class="h5p-content" data-content-id="${content_id}"></div>
         
        </body>
        </html>`;

        resolve(h5p_page);
    });
}

module.exports = h5p;
