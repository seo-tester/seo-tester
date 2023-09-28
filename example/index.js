const SeoTester = require('../dist/seo-tester.js');

// --------- Custom rules ------------ //
function customRule(dom) {
  return new Promise((resolve, reject) => {
    const paragraph = dom.window.document.querySelector('p');
    if (paragraph) {
      resolve('');
    } else {
      reject(new Error('Not found <p> tags'));
    }
  });
}
// -------------------------------- //

new SeoTester()
  // ------- Ignore methods ------- //
  // .ignoreFolders(['example/html/contact'])
  // .ignoreFiles(['example/html/team.html'])
  // .ignoreUrls(['/#/product/2'])
  // ------- Input methods -------- //
  .inputFolders(['example'])
  // .inputFiles(['example/html/index.html'])
  // .inputSpaFolder('example/spa', 'sitemap.xml')
  // .inputNextJs()

  // ------ Default rules -------- //
  // .addRule('titleLengthRule', { min: 10, max: 50 })
  // .addRule('noTooManyStrongTagsRule', { threshold: 2 })
  // .addRule('metaBaseRule', { names: ['description', 'viewport'] })
  // .addRule('metaSocialRule', {
  //   properties: [
  //     'og:url',
  //     'og:type',
  //     'og:site_name',
  //     'og:title',
  //     'og:description',
  //     'og:image',
  //     'og:image:width',
  //     'og:image:height',
  //     'twitter:card',
  //     'twitter:text:title',
  //     'twitter:description',
  //     'twitter:image:src',
  //     'twitter:url'
  //   ]
  // })
  // .addRule('hTagsRule')
  // .addRule('noMoreThanOneH1TagRule')
  .addRule('imgTagWithAltAttributeRule')
  // .addRule('aTagWithRelAttributeRule')
  // .addRule('canonicalLinkRule')
  // Custom rules
  // .addRule(customRule)

  // ------- Output methods ------- //
  // .outputObject(obj => console.log(obj))
  // .outputJson(json => console.log(json))
  .outputConsole();
