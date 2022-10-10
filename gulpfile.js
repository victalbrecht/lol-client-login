const gulp = require("gulp");
const hash = require("gulp-hash");
const rename = require("gulp-rename");
const webserver = require("gulp-webserver");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const sass = require("gulp-sass")(require("sass"));
const minify = require("gulp-minify");
const htmlreplace = require("gulp-html-replace");
const del = require("del");

const productionBuild = process.argv[2] === "build";

const assetsSourceDir = "assets/**/*";

let jsFileName = "";
let cssFileName = "";

const transpileAndMinifyTypeScript = () => {
  const file = tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(
      minify({
        ext: {
          min: ".js",
        },
        noSource: true,
      })
    );

  const hashHandler = productionBuild ? file.pipe(hash()) : file;
  const destDir = productionBuild ? "dist" : "src/scripts/js";

  return hashHandler
    .pipe(
      rename((path) => {
        path.basename += ".min";
        jsFileName = `${path.basename}.js`;
      })
    )
    .pipe(gulp.dest(destDir));
};

const transpileAndMinifySASS = () => {
  const file = gulp
    .src("src/styles/scss/main.scss")
    .pipe(sass.sync({ outputStyle: "compressed" }));

  const hashHandler = productionBuild ? file.pipe(hash()) : file;
  const destDir = productionBuild ? "dist" : "src/styles/css";

  return hashHandler
    .pipe(
      rename((path) => {
        path.basename += ".min";
        cssFileName = `${path.basename}.css`;
      })
    )
    .pipe(gulp.dest(destDir));
};

const watchTypeScript = () =>
  gulp.watch("src/scripts/ts/**/*.ts", transpileAndMinifyTypeScript);

const watchSASS = () =>
  gulp.watch("src/styles/scss/*.scss", transpileAndMinifySASS);

const clearBuild = () => del("dist");

const replaceHTMLImports = () =>
  gulp
    .src("src/index.html")
    .pipe(
      htmlreplace({
        css: cssFileName,
        js: {
          src: jsFileName,
          tpl: '<script src="%s" defer></script>',
        },
      })
    )
    .pipe(gulp.dest("dist"));

const handleAssets = () => {
  gulp.src(["src/assets/**/*.ttf"]).pipe(gulp.dest("dist"));
};

const startWebServer = () =>
  gulp.src("src").pipe(
    webserver({
      host: '192.168.1.200',
      port: 80,
      livereload: true,
      open: "http://192.168.1.200/",
    })
  );

exports.serve = gulp.parallel(
  transpileAndMinifyTypeScript,
  transpileAndMinifySASS,
  watchTypeScript,
  watchSASS,
  startWebServer,
);

exports.build = gulp.series(
  clearBuild,
  transpileAndMinifyTypeScript,
  transpileAndMinifySASS,
  replaceHTMLImports,
  handleAssets
);
