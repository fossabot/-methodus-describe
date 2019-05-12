// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'httpProxy': 'http://one.proxy.att.com:8080',
    'httpsProxy': 'http://one.proxy.att.com:8080',
    chromeOptions: {
      args: [ "--headless", "--disable-gpu", "--window-size=1024x768"] //"--headless",
    }
  },
  directConnect: false,
  baseUrl: 'https://webtest.stage.att.com/mss-zscaler/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 2500000,
    print: function () { }
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
