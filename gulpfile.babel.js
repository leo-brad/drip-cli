import { series, src, dest, } from 'gulp';
import babel from 'gulp-babel';

function build() {
  return src('src/**/*.js')
    .pipe(babel())
    .pipe(dest('dist'));
}

function buildScript() {
  return src('script/**/*.js')
    .pipe(babel())
    .pipe(dest('dist'));
}

exports.build = build;
exports.buildScript = buildScript;
