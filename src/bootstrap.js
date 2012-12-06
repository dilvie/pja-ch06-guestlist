var
  // Polyfill old browsers
  shim = require('./es5-shim'),

  // Load the app framework.
  app = require('tinyapp'),

  // Environment / app configuration settings. You can
  // change the name of these globals to suit the needs
  // of your app.
  environment = window.environment || {},

  // A data payload bootstrapped into the global namespace
  // by the server.
  pageData = window.pageData || {};

app.init({
  environment: environment,
  pageData: pageData
});

module.exports = app;
