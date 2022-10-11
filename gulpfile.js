const gulp = require("gulp");
const rename = require("gulp-rename");
const webserver = require("gulp-webserver");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const sass = require("gulp-sass")(require("sass"));
const minify = require("gulp-minify");
const del = require("del");
const replace = require("gulp-replace");

const sourceDir = 'src';
const distDir = 'dist';

const productionBuild = process.argv[2] === "build";

const transpileAndMinifyTypeScript = () =>
  tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(
      minify({
        ext: {
          min: ".js",
        },
        noSource: true,
      })
    )
    .pipe(
      rename((path) => {
        path.basename += ".min";
      })
    )
    .pipe(gulp.dest(productionBuild ? distDir : `${sourceDir}/scripts/js`));

const transpileAndMinifySASS = () =>
  gulp
    .src("src/styles/scss/main.scss")
    .pipe(sass.sync({ outputStyle: "compressed" }))
    .pipe(
      rename((path) => {
        path.basename += ".min";
      })
    .pipe(replace('../', ''))
    )
    .pipe(gulp.dest(productionBuild ? distDir : `${sourceDir}/styles/css`));

const watchTypeScript = () =>
  gulp.watch(`${sourceDir}/scripts/ts/**/*.ts`, transpileAndMinifyTypeScript);

const watchSASS = () =>
  gulp.watch(`${sourceDir}/styles/scss/*.scss`, transpileAndMinifySASS);

const clearDist = () => del(distDir);

const handleAssets = () =>
  gulp.src(`${sourceDir}/assets/**/*`).pipe(gulp.dest(`${distDir}/assets`));

const replaceAndHashHTMLResources = () => {
  const hash = (Math.random() + 1).toString(18).substring(2);

  return gulp
    .src(`${sourceDir}/index.html`)
    .pipe(replace(/(href=")(.+\/)(.*.css)(")/gi, `$1$3?v=${hash}$4`))
    .pipe(replace(/(src=")(.+\/)(.*.js)(")/gi, `$1$3?v=${hash}$4`))
    .pipe(replace(/(src|href)(=".+\.)(mp4|png|ico)(")/gi, `$1$2$3?v=${hash}$4`))
    .pipe(gulp.dest(distDir));
};

const startWebServer = () =>
  gulp.src(sourceDir).pipe(
    webserver({
      host: "localhost",
      port: 80,
      livereload: true,
      open: "http://localhost/",
    })
  );

exports.serve = gulp.parallel(
  transpileAndMinifyTypeScript,
  transpileAndMinifySASS,
  watchTypeScript,
  watchSASS,
  startWebServer
);

exports.build = gulp.series(
  clearDist,
  transpileAndMinifyTypeScript,
  transpileAndMinifySASS,
  handleAssets,
  replaceAndHashHTMLResources
);
