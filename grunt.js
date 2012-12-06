/*global module*/
module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({

    // Read package.json into an object for later
    // reference (for example, in meta, below).
    pkg: '<json:package.json>',

    meta: {

      // A template to add to the top of the bundled
      // output.
      banner: '\n/*! <%= pkg.title || pkg.name %> ' +
        '- v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n ' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n' +
        ' *\n " : "" %>' +
        '* Copyright (c) ' +
        '<%= grunt.template.today("yyyy") %> ' +
        '<%= pkg.author.name %>;\n' +
        ' * Licensed under the <%= ' +
        '_.pluck(pkg.licenses, "type").join(", ") %>' +
        ' license */'
    },

    // Specify which files to send through JSHint.
    lint: {
      all: ['./grunt.js', './src/**/*.js',
        './test-src/test.js']
    },

    // JSHint configuration options.
    jshint: {
      browser: false,
      node: true,
      strict: false,
      curly: true,
      eqeqeq: true,
      immed: true,
      latedef: true,
      newcap: true,
      nonew: true,
      noarg: true,
      sub: true,
      undef: true,
      unused: true,
      eqnull: true,
      boss: false
    },

    // Specify test locations for QUnit.
    qunit: {
      browser: ['test/index.html']
    },

    // Configuration for browserify.
    browserify: {
      "public/app.js": {
        requires: ['traverse'],
        entries: ['src/**/*.js'],
        prepend: ['<banner:meta.banner>'],
        append: [],
        hook: function () {
          // bundle is passed in as first param
        }
      }
    }

  });

  // Load browserify tasks. Needed for bundling.
  grunt.loadNpmTasks('grunt-browserify');

  // Setup command line argument tasks. For e.g.:
  // $ grunt # executes lint, browserify, qunit
  // $ grunt test # runs qunit task, only.
  grunt.registerTask('default', 'lint browserify qunit');
  grunt.registerTask('install', 'browserify');
  grunt.registerTask('test', 'qunit');
};