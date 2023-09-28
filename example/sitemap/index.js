const SeoTester = require('../../dist/seo-tester.js');
const path = require('path');

// --------- Custom rules ------------ //
function onlySingleH1(dom) {
  return new Promise((resolve) => {
    const h1 = dom.window.document.querySelectorAll('h1');
    if (h1 && h1.length > 1) {
      resolve('Multple <h1> tags found.');
    } else {
      resolve('')
    }
  });
}
// -------------------------------- //

process.env.USER_AGENT = 'Googlebot';
process.env.NODE_TLS_REJECT_UNAUTHORIZED=0;
const reportPath = path.join(__dirname,  'report.csv');


new SeoTester()
  .inputSitemap('https://example.com/sitemap.xml')
  // ------ Default rules -------- //
  .addRule('titleLengthRule', { min: 10, max: 80 })
  .addRule('imgTagWithAltAttributeRule')
  .addRule('aTagWithRelAttributeRule')
  .addRule('metaBaseRule', { list: ['description', 'viewport'] })
  .addRule('metaSocialRule', {
    properties: [
      'og:url',
      'og:type',
      'og:site_name',
      'og:title',
      'og:description',
      'og:image',
      'og:image:width',
      'og:image:height',
      'twitter:card',
      'twitter:text:title',
      'twitter:description',
      'twitter:image:src',
      'twitter:url'
    ]
  })
  .addRule('canonicalLinkRule')
  .addRule(onlySingleH1)

  // ------- Output methods ------- //
  // .outputObject(obj => console.log(obj))
  // .outputJson(json => console.log(json))
  // .outputConsole();
  .outputCsv(report => console.log('Report generated and saved at: ' + report), reportPath);

