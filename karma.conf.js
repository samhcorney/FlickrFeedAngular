module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'build/js/vendor/angular.min.js',
      'build/js/vendor/angular-mocks.js',
      'build/js/vendor/angular-sanitize.min.js',
      'build/js/app.min.js',
      'test/unit/**/*.spec.js'
    ]
  });
};
