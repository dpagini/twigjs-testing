'use strict';

import browserSync from 'browser-sync';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import twigMarkdown from 'twig-markdown';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// ##################################################
// Options
// ##################################################
var options = {};

options.paths = {
  build: '.build/',
  templates: 'twig/'
};

options.glob = {
  all: '*',
  html: '*.html',
  recursive: '**/',
  twig: '*.twig'
}

options.server = {
  notify: false,
  server: {
    index: 'index.html',
    baseDir: options.paths.build
  },
  port: 8692,
};

options.twig = {
  base: options.paths.templates,
  errorLogToConsole: true,
  extend: twigMarkdown
};


// ##################################################
// TODO?
// ##################################################
gulp.task('default', ['twig','server','watch']);

gulp.task('twig', () => {
  var data = require('./twig/test/config.json');
  return html('./twig/test/**/*.html', options.paths.build, data);
});

function html(src, dest, data) {
  return gulp.src(src)
    .pipe($.twig(Object.assign(options.twig, { data: data })))
    .pipe(gulp.dest(dest));
}

gulp.task('server', () => { server(); }); // serve whatever is in temp directory
function server (config = options.server) {
  browserSync(config);
};

// ##################################################
// Watch
// ##################################################
gulp.task('watch', () => { watch(); });
function watch() {
  gulp.watch('./twig/**.*', ['twig']);
};
