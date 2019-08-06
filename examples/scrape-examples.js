const request = require('request-promise');
const { JSDOM } = require('jsdom');

const examples = [];

JSDOM.fromURL('https://h5p.org/content-types-and-applications')
    .then(dom => {
        const promises = [];

        const lis = dom.window.document.querySelectorAll('li.views-row');
        for (let i = 0; i < lis.length; i++) {
            const li = lis[i];
            const link = li.getElementsByTagName('a')[1];
            const url = link.getAttribute('href');
            const name = link.innerHTML;
            const page = `https://h5p.org${url}`;

            const example = {
                library: name,
                name: 'Example',
                page: page
            };

            if (name !== 'Impressive Presentation (ALPHA)') {
                examples.push(example);

                promises.push(
                    request(page).then(content => {
                        const exportUrlMatch = content.match(
                            new RegExp(/"exportUrl":("[^"]+")/)
                        );
                        const exportUrl = JSON.parse(exportUrlMatch[1]);
                        example.h5p = exportUrl;
                    })
                );
            }
        }

        return Promise.all(promises);
    })
    .then(() => console.log(JSON.stringify(examples, null, 2)));
