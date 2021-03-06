'use strict';
// node.js Packages / Dependencies
const gulp = require('gulp');
const sass = require('gulp-dart-sass');
// const uglify = require('gulp-uglify');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const pngQuint = require('imagemin-pngquant');
const browserSync = require('browser-sync').create();
const gulpautoprefixer = require('gulp-autoprefixer');
const jpgRecompress = require('imagemin-jpeg-recompress');

const inject = require('gulp-inject');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const purgecss = require("@fullhuman/postcss-purgecss");
const tailwindcss = require("tailwindcss");
const atimport = require("postcss-import");
const del = require("del");
const replace = require('gulp-replace');
var handlebars = require('gulp-compile-handlebars');
var gulpif = require('gulp-if');
var run = require('gulp-run');

//Mode
// const mode = require('gulp-mode')(); //last '()' means a function must be needed or get err
const mode = require('gulp-mode')({
  modes: ["production", "development", "purge"],
  default: "development",
  verbose: false
});

const uk = true, fa = true, tw = true, vendorscss = false, vendorsjs = false, bs = false, bs3 = false, jq = false, onlyscript = true, othercolors = false, color1 = false, color2 = false

// Paths
var paths = {
  root: {
    www: './src'
  },
  vendors: {
    ukjs: ['node_modules/uikit/dist/js/uikit.min.js', 'node_modules/uikit/dist/js/uikit-icons.min.js'],
    ukcss: ['node_modules/uikit/dist/css/uikit.min.css'],
    facss: ['node_modules/@fortawesome/fontawesome-free/css/all.min.css'],
    fafonts: ['node_modules/@fortawesome/fontawesome-free/webfonts/*'],
    bsjs: ['node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'],
    bsscss: ['node_modules/bootstrap/scss/_variables.scss'],
    bs3js: ['node_modules/bootstrap/dist/js/bootstrap.min.js'],
    bs3css: ['node_modules/bootstrap/dist/css/bootstrap.min.css'],
    bs3fonts: ['node_modules/bootstrap/dist/fonts/*'],
    jq: ['node_modules/jquery/dist/jquery.min.js'],
    vendorscss: ['src/vendors/*.css'],
    vendorsjs: ['src/vendors/*.js'],
    // bodyjs: ['src/js/*.js'],
    // fittext: ['node_modules/FitText-UMD/fittext.js'], //FitText
  },
  // template: '',
  src: {
    root: './src/',
    templates: 'src/templates/*.hbs',
    html: 'src/*.html',
    css: 'src/css/*.css',
    js: 'src/js/*.js',
    vendors: 'src/libs/**/*.*',
    img: 'src/img/**/*.+(png|jpg|gif|svg)',
    scss: 'src/scss/*.scss',
    minjs: ['src/js/*.js', '!src/js/uikit*.js', '!src/js/*.min.js', '!src/js/*-i.js', '!src/js/*-bak.js', '!src/js/*-old.js',],
    // excludeminjs: "'!src/js/*.min.js', '!src/js/*-i.js', '!src/js/*-bak.js', '!src/js/*-old.js'",
    // // [...] will get errors. The variable array cannot be included in a array of [paths.src.js, paths.src.excludeminjs]
    excludescript: ['src/js/*.js', '!src/js/script.js'],
    color1html: 'src/ncu-*.html',
    color2html: 'src/nthu-*.html',
    color1css: 'src/css/colors-ncu*.css',
    color2css: 'src/css/colors-nthu*.css',
  },
  dist: {
    root: './dist/',
    templates: 'templates',
    html: 'dist/*.html',
    scss: 'scss',
    css: 'css',
    js: 'js',
    img: 'img',
    fafonts: 'webfonts',
    bs3fonts: 'fonts',
    vendors: 'libs',
    color1html: 'dist/ncu-*.html',
    color2html: 'dist/nthu-*.html',
    color1css: 'dist/css/colors-ncu*.css',
    color2css: 'dist/css/colors-nthu*.css',
  }
}

// Output tailwind css
gulp.task('tailwind', function() {
  return gulp.src('tailwind.css')
    .pipe(gulpif(tw, postcss([
      atimport(),
      tailwindcss("tailwind.config.js"),
      autoprefixer()
      ])
    ))
    .pipe(gulpif(tw, gulp.dest(paths.src.root + paths.dist.css)))
})

gulp.task('tailwind-build', function() {
  return gulp.src('tailwind.css')
    .pipe(gulpif(tw, postcss([
      atimport(),
      tailwindcss("tailwind.config.js"),
      autoprefixer()
      ])
    ))
    .pipe(gulpif(tw, gulp.dest(paths.src.root + paths.dist.css)))

    //Minify css
    .pipe(gulpif(tw, cleanCSS({
        compatibility: 'ie8'
      })
    ))
    .pipe(gulpif(tw, rename({
        suffix: '.min'
      })
    ))
    .pipe(gulpif(tw, gulp.dest(paths.dist.root + paths.dist.css)))
})

gulp.task('tailwind-purge', function() {
  return gulp.src('tailwind.css')
    .pipe(gulpif(tw, postcss([
        atimport(),
        tailwindcss("tailwind.config.js"),
        purgecss({ // Using '@fullhuman/postcss-purgecss'
          content: [paths.src.html, paths.src.js], // Must be necessary with 'tailwind.config.js'
          // defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          defaultExtractor: content => content.match(/[\w-/:!@]+(?<!:)/g) || []
        }),
        autoprefixer()
      ])
    ))

    //Minify css
    .pipe(gulpif(tw, cleanCSS({
        compatibility: 'ie8'
      })
    ))
    .pipe(gulpif(tw, rename({
        suffix: '.min'
      })
    ))
    .pipe(gulpif(tw, gulp.dest(paths.dist.root + paths.dist.css)))
});

gulp.task('ukjs', function() {
  return gulp.src(paths.vendors.ukjs, {allowEmpty: true})
    .pipe(gulpif(uk, gulp.dest(paths.src.root + paths.dist.js)))
    .pipe(gulpif(uk, gulp.dest(paths.dist.root + paths.dist.js)))

    // .pipe(gulp.dest(paths.src.root + paths.dist.js))
    // .pipe(gulp.dest(paths.dist.root + paths.dist.js))
    // .pipe(mode.production(gulp.dest(paths.dist.vendors)))
})
gulp.task('ukcss', function() {
  return gulp.src(paths.vendors.ukcss, {allowEmpty: true})
    // Find digits between "font-size:" and "px" in Visual Studio Code using: "font-size:(\d+)px" or "font-size:\s+(\d+)px"
    //\d+ means one or more digits
    // .pipe(replace('font-size:12px', 'font-size:calc(12rem/16)'))
    .pipe(gulpif(uk, replace(/font-size:(\d+)px/g, function(match) {
      return "font-size:calc(" + match.slice(10, -2) + "rem/16)"
    })))
    .pipe(gulpif(uk, gulp.dest(paths.src.root + paths.dist.css)))
    .pipe(gulpif(uk, gulp.dest(paths.dist.root + paths.dist.css)))
})
gulp.task('vendorsjs', function() {
  return gulp.src(paths.vendors.vendorsjs, {allowEmpty: true})
    .pipe(gulpif(vendorsjs, gulp.dest(paths.src.root + paths.dist.js)))
    .pipe(gulpif(vendorsjs, gulp.dest(paths.dist.root + paths.dist.js)))
})
gulp.task('vendorscss', function() {
  // return gulp.src([paths.vendors.vendorscss]) // [paths.vendors.vendorscss] will get errors. The variable array cannot be included in a array
  return gulp.src(paths.vendors.vendorscss, {allowEmpty: true})
    .pipe(gulpif(vendorscss, gulp.dest(paths.src.root + paths.dist.css)))
    .pipe(gulpif(vendorscss, gulp.dest(paths.dist.root + paths.dist.css)))
})
gulp.task('facss', function() {
  return gulp.src(paths.vendors.facss, {allowEmpty: true})
    .pipe(gulpif(fa, rename("fontawesome.min.css")))
    .pipe(gulpif(fa, gulp.dest(paths.src.root + paths.dist.css)))
    .pipe(gulpif(fa, gulp.dest(paths.dist.root + paths.dist.css)))
})
gulp.task('fafonts', function() {
  return gulp.src(paths.vendors.fafonts, {allowEmpty: true})
    .pipe(gulpif(fa, gulp.dest(paths.src.root + paths.dist.fafonts)))
    .pipe(gulpif(fa, gulp.dest(paths.dist.root + paths.dist.fafonts)))
})
gulp.task('bsjs', function() {
  return gulp.src(paths.vendors.bsjs, {allowEmpty: true})
    .pipe(gulpif(bs, gulp.dest(paths.src.root + paths.dist.js)))
    .pipe(gulpif(bs, gulp.dest(paths.dist.root + paths.dist.js)))
})
gulp.task('bsscss', function() {
  // return gulp.src('bootstrap.scss')
  return gulp.src(paths.vendors.bsscss)
    // Or just run find 'enable-rounded:(\s+)true' & replace in VScode
    // \s+ means one or more whitespaces, match.slice(15, -4): all spaces between words
    .pipe(gulpif(bs, replace(/enable-rounded:(\s+)true/g, function(match) {
      return "enable-rounded:" + match.slice(15, -4) + "false"
    })))
    .pipe(gulpif(bs, gulp.dest('node_modules/bootstrap/scss/')))
})
gulp.task('bscss', function() {
  return gulp.src('bootstrap.scss', {allowEmpty: true})
    .pipe(gulpif(bs, sass().on('error', sass.logError)))
    .pipe(gulpif(bs, gulpautoprefixer())) //Cannot use autoprefixer or get err
    .pipe(gulpif(bs, replace('@charset "UTF-8";', '')))
    .pipe(gulpif(bs, replace(/font-size:(\d+)px/g, function(match) {
      return "font-size:calc(" + match.slice(10, -2) + "rem/16)"
    })))
    .pipe(gulpif(bs, gulp.dest(paths.src.root + paths.dist.css)))
    .pipe(gulpif(bs, gulp.dest(paths.dist.root + paths.dist.css)))

})
gulp.task('bs3js', function() {
  return gulp.src(paths.vendors.bs3js, {allowEmpty: true})
    .pipe(gulpif(bs3, gulp.dest(paths.src.root + paths.dist.js)))
    .pipe(gulpif(bs3, gulp.dest(paths.dist.root + paths.dist.js)))
})
gulp.task('bs3css', function() {
  return gulp.src(paths.vendors.bs3css, {allowEmpty: true})
    .pipe(gulpif(bs3, replace(/font-size:(\d+)px/g, function(match) {
      return "font-size:calc(" + match.slice(10, -2) + "rem/16)"
    })))
    .pipe(gulpif(bs3, gulp.dest(paths.src.root + paths.dist.css)))
    .pipe(gulpif(bs3, gulp.dest(paths.dist.root + paths.dist.css)))
})
gulp.task('bs3fonts', function() {
  return gulp.src(paths.vendors.bs3fonts, {allowEmpty: true})
    .pipe(gulpif(bs3, gulp.dest(paths.src.root + paths.dist.bs3fonts)))
    .pipe(gulpif(bs3, gulp.dest(paths.dist.root + paths.dist.bs3fonts)))
})
gulp.task('jqjs', function() {
  return gulp.src(paths.vendors.jq, {allowEmpty: true})
    .pipe(gulpif(jq, gulp.dest(paths.src.root + paths.dist.js)))
    .pipe(gulpif(jq, gulp.dest(paths.dist.root + paths.dist.js)))
    // .pipe(gulp.dest(paths.src.root + paths.dist.js))
    // .pipe(gulp.dest(paths.dist.root + paths.dist.js))
    // .pipe(mode.production(gulp.dest(paths.dist.vendors)))
})

// gulp.task('copyfonts', function() {
//   var bootstrap = gulp.src(paths.vendors.bs3fonts)
//   .pipe(gulp.dest(paths.src.root + paths.dist.bs3fonts))
//   .pipe(gulp.dest(paths.dist.root + paths.dist.bs3fonts))

//   var fontawesome = gulp.src(paths.vendors.fonts)
//   .pipe(gulp.dest(paths.src.root + paths.dist.font))
//   .pipe(gulp.dest(paths.dist.root + paths.dist.font))
//   return merge(fontawesome, bootstrap);
// });

//Handlebars templates
//gulp.task('templates', async function(){}): It must need the 'async' or get error 'Did you forget to signal async completion?'
gulp.task('templates', async function() {
  var templateData = {
      title: '新光醫院圖書館',
      bodyClass: 'true',
      jqueryBody: 'false',
      bootstrapBody: 'false',
      bodyFocus: 'false',
    },
    options = {
      batch: [paths.src.root + paths.dist.templates + '/partials'],
    }
  gulp.src([paths.src.templates, '!' + paths.src.root + paths.dist.templates + '/*-i.hbs'])
    .pipe(handlebars(templateData, options))
    // .pipe(rename('hello.html'))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(paths.src.root))
    .pipe(gulp.dest(paths.dist.root))
});

// clean dist and keep the directory
gulp.task('delhtml', function() {
  return del([paths.src.root + '*.html']);
});

// inject css & js to html - https://www.npmjs.com/package/gulp-inject#method-2-use-gulp-inject-s-name-option
gulp.task('inject', function() {
  return gulp.src(paths.src.html)
    .pipe(gulpif(bs, inject(gulp.src([paths.src.root + paths.dist.css + '/bootstrap*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'bs',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(uk, inject(gulp.src([paths.src.root + paths.dist.css + '/uikit*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'uk',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(tw, inject(gulp.src([paths.src.root + paths.dist.css + '/tailwind*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'tw',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(fa, inject(gulp.src([paths.src.root + paths.dist.css + '/font*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'fa',
      relative: true,
      removeTags: true
    })))
    .pipe(inject(gulp.src([paths.src.root + paths.dist.css + '/main.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'main',
      relative: true,
      removeTags: true
    }))
    .pipe(inject(gulp.src([paths.src.root + paths.dist.css + '/colors.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'colors',
      relative: true,
      removeTags: true
    }))
    .pipe(gulpif(othercolors, inject(gulp.src([paths.src.root + paths.dist.css + '/colors-*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'othercolors',
      relative: true,
      removeTags: true
    })))
    .pipe(inject(gulp.src([paths.src.root + paths.dist.css + '/style.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'style',
      relative: true,
      removeTags: true
    }))
    .pipe(inject(gulp.src([paths.src.root + paths.dist.css + '/style-*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'style2',
      relative: true,
      removeTags: true
    }))
    .pipe(inject(gulp.src([paths.src.root + paths.dist.css + '/*.css', '!' + paths.src.root + paths.dist.css + '/bootstrap*.css', '!' + paths.src.root + paths.dist.css + '/ui*.css', '!' + paths.src.root + paths.dist.css + '/ta*.css', '!' + paths.src.root + paths.dist.css + '/font*.css', '!' + paths.src.root + paths.dist.css + '/main*.css', '!' + paths.src.root + paths.dist.css + '/colors*.css', '!' + paths.src.root + paths.dist.css + '/style*.css'], {allowEmpty: true}, {
      read: false
    }), {
      relative: true,
      removeTags: true
    }))
    .pipe(gulpif(uk, inject(gulp.src([paths.src.root + paths.dist.js + '/uikit.min.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'uk',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(uk, inject(gulp.src([paths.src.root + paths.dist.js + '/uikit-icons.min.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'uk2',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(jq, inject(gulp.src([paths.src.root + paths.dist.js + '/jquery.min.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'jq',
      relative: true,
      removeTags: true
    })))
    // .pipe(inject(gulp.src(paths.src.root + paths.dist.js + '/jquery.min.js', {
    //   read: false
    // }), {
    //   name: 'jq-defer',
    //   relative: true,
    //   removeTags: true,
    //   transform: function(filepath) {
    //     return '<script src="' + filepath + '" defer>' + '</script>';
    //   }
    // }))
    .pipe(gulpif(bs, inject(gulp.src([paths.src.root + paths.dist.js + '/bootstrap*.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'bs',
      relative: true,
      removeTags: true
    })))
    // .pipe(inject(gulp.src(paths.src.root + paths.dist.js + '/bootstrap*.js', {
    //   read: false
    // }), {
    //   name: 'bs',
    //   relative: true,
    //   removeTags: true,
    //   transform: function(filepath) {
    //     return '<script src="' + filepath + '" defer>' + '</script>';
    //   }
    // }))
    .pipe(inject(gulp.src([paths.src.root + paths.dist.js + '/script.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'head',
      relative: true,
      removeTags: true,
      transform: function(filepath) {
        return '<script src="' + filepath + '" defer>' + '</script>';
      }
    }))
    .pipe(inject(gulp.src([paths.src.root + paths.dist.js + '/*.js', '!' + paths.src.root + paths.dist.js + '/script*.js', '!' + paths.src.root + paths.dist.js + '/jquery*.js', '!' + paths.src.root + paths.dist.js + '/bootstrap*.js', '!' + paths.src.root + paths.dist.js + '/ui*.js', '!' + paths.src.root + paths.dist.js + '/*-i.js'], {allowEmpty: true}, {
      read: false
    }), {
      relative: true,
      removeTags: true,
      transform: function(filepath) {
        return '<script src="' + filepath + '" defer>' + '</script>';
      }
    }))
    .pipe(gulp.dest(paths.src.root))
  // .pipe(gulp.dest(paths.dist.root))
});
gulp.task('inject-color1', function() {
  return gulp.src(paths.src.color1html)
    .pipe(gulpif(color1, inject(gulp.src([paths.src.color1css], {allowEmpty: true}, {
      read: false
    }), {
      name: 'othercolors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulp.dest(paths.src.root))
});
gulp.task('inject-color2', function() {
  return gulp.src(paths.src.color2html)
    .pipe(gulpif(color2, inject(gulp.src([paths.src.color2css], {allowEmpty: true}, {
      read: false
    }), {
      name: 'othercolors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulp.dest(paths.src.root))
});

gulp.task('build-inject', function() {
  return gulp.src(paths.dist.html)
    .pipe(gulpif(bs, inject(gulp.src([paths.dist.root + paths.dist.css + '/bootstrap*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'bs',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(uk, inject(gulp.src([paths.dist.root + paths.dist.css + '/uikit*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'uk',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(tw, inject(gulp.src([paths.dist.root + paths.dist.css + '/tailwind*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'tw',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(fa, inject(gulp.src([paths.dist.root + paths.dist.css + '/font*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'fa',
      relative: true,
      removeTags: true
    })))
    .pipe(inject(gulp.src([paths.dist.root + paths.dist.css + '/main*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'main',
      relative: true,
      removeTags: true
    }))
    .pipe(inject(gulp.src([paths.dist.root + paths.dist.css + '/colors.min.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'colors',
      relative: true,
      removeTags: true
    }))
    .pipe(gulpif(othercolors, inject(gulp.src([paths.dist.root + paths.dist.css + '/colors-*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'othercolors',
      relative: true,
      removeTags: true
    })))
    .pipe(inject(gulp.src([paths.dist.root + paths.dist.css + '/style.min.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'style',
      relative: true,
      removeTags: true
    }))
    .pipe(inject(gulp.src([paths.dist.root + paths.dist.css + '/style-*.css'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'style2',
      relative: true,
      removeTags: true
    }))
    .pipe(inject(gulp.src([paths.dist.root + paths.dist.css + '/*.css', '!' + paths.dist.root + paths.dist.css + '/bootstrap*.css', '!' + paths.dist.root + paths.dist.css + '/ui*.css', '!' + paths.dist.root + paths.dist.css + '/ta*.css', '!' + paths.dist.root + paths.dist.css + '/font*.css', '!' + paths.dist.root + paths.dist.css + '/main*.css', '!' + paths.dist.root + paths.dist.css + '/colors*.css', '!' + paths.dist.root + paths.dist.css + '/style*.css'], {allowEmpty: true}, {
      read: false
    }), {
      relative: true,
      removeTags: true
    }))
    .pipe(gulpif(uk, inject(gulp.src([paths.dist.root + paths.dist.js + '/uikit.min.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'uk',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(uk, inject(gulp.src([paths.dist.root + paths.dist.js + '/uikit-icons.min.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'uk2',
      relative: true,
      removeTags: true
    })))
    .pipe(gulpif(jq, inject(gulp.src([paths.dist.root + paths.dist.js + '/jquery.min.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'jq',
      relative: true,
      removeTags: true
    })))
    // .pipe(inject(gulp.src(paths.dist.root + paths.dist.js + '/jquery.min.js', {
    //   read: false
    // }), {
    //   name: 'jq-defer',
    //   relative: true,
    //   removeTags: true,
    //   transform: function(filepath) {
    //     return '<script src="' + filepath + '" defer>' + '</script>';
    //   }
    // }))
    .pipe(gulpif(bs, inject(gulp.src([paths.dist.root + paths.dist.js + '/bootstrap*.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'bs',
      relative: true,
      removeTags: true
    })))
    // .pipe(inject(gulp.src(paths.dist.root + paths.dist.js + '/bootstrap*.js', {
    //   read: false
    // }), {
    //   name: 'bs',
    //   relative: true,
    //   removeTags: true,
    //   transform: function(filepath) {
    //     return '<script src="' + filepath + '" defer>' + '</script>';
    //   }
    // }))
    .pipe(inject(gulp.src([paths.dist.root + paths.dist.js + '/script*.js'], {allowEmpty: true}, {
      read: false
    }), {
      name: 'head',
      relative: true,
      removeTags: true,
      transform: function(filepath) {
        return '<script src="' + filepath + '" defer>' + '</script>';
      }
    }))
    .pipe(inject(gulp.src([paths.dist.root + paths.dist.js + '/*.js', '!' + paths.dist.root + paths.dist.js + '/script*.js', '!' + paths.dist.root + paths.dist.js + '/jquery*.js', '!' + paths.dist.root + paths.dist.js + '/bootstrap*.js', '!' + paths.dist.root + paths.dist.js + '/ui*.js', '!' + paths.dist.root + paths.dist.js + '/*-i.js'], {allowEmpty: true}, {
      read: false
    }), {
      relative: true,
      removeTags: true,
      transform: function(filepath) {
        return '<script src="' + filepath + '" defer>' + '</script>';
      }
    }))
    .pipe(gulp.dest(paths.dist.root))
});
gulp.task('build-inject-color1', function() {
  return gulp.src(paths.dist.color1html)
    .pipe(gulpif(color1, inject(gulp.src([paths.dist.color1css], {allowEmpty: true}, {
      read: false
    }), {
      name: 'othercolors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulp.dest(paths.dist.root))
});
gulp.task('build-inject-color2', function() {
  return gulp.src(paths.dist.color2html)
    .pipe(gulpif(color2, inject(gulp.src([paths.dist.color2css], {allowEmpty: true}, {
      read: false
    }), {
      name: 'othercolors',
      relative: true,
      removeTags: true
    })))
    .pipe(gulp.dest(paths.dist.root))
});


// Compile SCSS
gulp.task('sass', function() {
  return gulp.src([paths.src.scss, '!' + paths.src.root + paths.dist.scss + '/*-i.scss', '!' + paths.src.root + paths.dist.scss + '/*-bak.scss', '!' + paths.src.root + paths.dist.scss + '/*-full.scss'])
    // .pipe(sass({
    //   outputStyle: 'expanded'  //For old "gulp-sass"
    // }).on('error', sass.logError))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpautoprefixer()) //Cannot use autoprefixer or get err
    .pipe(replace('@charset "UTF-8";', ''))
    .pipe(gulp.dest(paths.src.root + paths.dist.css))
    .pipe(browserSync.stream())
});

// Minify + Combine CSS
gulp.task('css', function() {
  return gulp.src([paths.src.css, '!' + paths.src.root + paths.dist.css + '/font*.css', '!' + paths.src.root + paths.dist.css + '/tail*.css', '!' + paths.src.root + paths.dist.css + '/ui*.css', bs3 ? '' : '!' + paths.src.root + paths.dist.css + '/bootstrap*.css'])
    .pipe(mode.development(
      postcss([
        atimport(),
        autoprefixer()
      ])
    ))
    .pipe(mode.production(
      postcss([
        atimport(),
        autoprefixer()
      ])
    ))
    .pipe(mode.production(
      cleanCSS({
        compatibility: 'ie8'
      })
    ))
    .pipe(mode.production(
      rename({
        suffix: '.min'
      })
    ))
    .pipe(mode.purge(
      postcss([
        atimport(),
        purgecss({ // Using '@fullhuman/postcss-purgecss'
          content: [paths.src.html, paths.src.js],
          // 'defaultExtractor' Must be necessary here
          defaultExtractor: content => content.match(/[\w-/:!@]+(?<!:)/g) || []
        }),
        autoprefixer()
      ])
    ))
    .pipe(mode.purge(
      cleanCSS({
        compatibility: 'ie8'
      })
    ))
    .pipe(mode.purge(
      rename({
        suffix: '.min'
      })
    ))
    // .pipe(
    //   postcss([
    //     atimport(),
    //     // purgecss({
    //     //   content: [paths.src.html, paths.src.js],
    //     //   // whitelist: ['opacity-100'],
    //     //   defaultExtractor: content =>
    //     //     content.match(/[\w-/:!@]+(?<!:)/g) || []
    //     // }),
    //     autoprefixer()
    //   ])
    // )
    // .pipe(cleanCSS({
    //   compatibility: 'ie8'
    // }))
    // // .pipe(concat('app.css'))
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    .pipe(gulp.dest(paths.dist.root + paths.dist.css))
});
gulp.task('mincss', function() {
  return gulp.src([paths.src.root + paths.dist.css + '/*.min.css'])
    .pipe(mode.production(
      postcss([
        atimport(),
        autoprefixer()
      ])
    ))
    .pipe(mode.production(
      cleanCSS({
        compatibility: 'ie8'
      })
    ))
    .pipe(mode.purge(
      postcss([
        atimport(),
        purgecss({
          content: [paths.src.html, paths.src.js],
          // whitelist: ['opacity-100'],
          defaultExtractor: content =>
            content.match(/[\w-/:!@]+(?<!:)/g) || []
        }),
        autoprefixer()
      ])
    ))
    .pipe(mode.purge(
      cleanCSS({
        compatibility: 'ie8'
      })
    ))
    .pipe(gulp.dest(paths.dist.root + paths.dist.css))
});

// Minify + Combine JS
gulp.task('js', function() {
  return gulp.src(paths.src.minjs)
    // .pipe(mode.production(
    //   autopolyfiller('script_polyfill.js', {
    //     browsers: require('autoprefixer').default
    //   })
    // ))
    // .pipe(autopolyfiller('script-polyfill.js'))
    .pipe(mode.production(
      uglify()
    ))
    .pipe(mode.production(
      rename({
        suffix: '.min'
      })
    ))
    .pipe(mode.purge(
      uglify()
    ))
    .pipe(mode.purge(
      rename({
        suffix: '.min'
      })
    ))
    // .pipe(uglify())
    // // .pipe(concat('app.js'))
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    // .pipe(gulp.dest(paths.dist.root + paths.dist.js))
    .pipe(mode.production(gulp.dest(paths.dist.root + paths.dist.js)))
    .pipe(mode.purge(gulp.dest(paths.dist.root + paths.dist.js)))

    .pipe(browserSync.stream());
});

//It seems not working
// gulp.task('minjs', function() {
//   return gulp.src([paths.src.root + paths.dist.js + '/*.min.js'])
//     .pipe(mode.production(
//       uglify()
//     ))
//     .pipe(mode.purge(
//       uglify()
//     ))
//     .pipe(mode.production(gulp.dest(paths.dist.root + paths.dist.js)))
//     .pipe(mode.purge(gulp.dest(paths.dist.root + paths.dist.js)))

//     .pipe(browserSync.stream());
// });

// Compress (JPEG, PNG, GIF, SVG, JPG)
gulp.task('img', function() {
  return gulp.src(paths.src.img)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      // imagemin.svgo got removing ',' prolblem in svg
      // imagemin.svgo({
      //     plugins: [
      //         {removeViewBox: true},
      //         {cleanupIDs: false}
      //     ]
      // })
    ]))
    .pipe(gulp.dest(paths.dist.root + paths.dist.img));
});

// ceate dist dir
gulp.task('dist', function() {
  return gulp.src('*.*', {
      read: false
    })
    .pipe(gulp.dest(paths.dist.root))
});

// clean dist and keep the directory
gulp.task('clean', function() {
  return del(['dist/**', '!dist']);
});

// clean css
gulp.task('deletecss', function() {
  return del([paths.src.root + paths.dist.css + '/*']);
});

// clean js
gulp.task('deletejs', function() {
  return gulpif(onlyscript, del(paths.src.excludescript));
  // return del([paths.src.root + paths.dist.js + '/*.js', paths.src.excludescript]);
  // if (onlyscript) {
  //   return del([paths.src.root + paths.dist.js + '/*.js', '!src/js/script.js']);
  // } else {
  //   return del([paths.src.root + paths.dist.js + '/*.js', '!src/js/script.js', '!src/js/-bak*.js', '!src/js/-old*.js', '!src/js/-i*.js']);
  // }
});

// Watch (SASS, CSS, JS, and HTML) reload browser on change
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: paths.root.www
    }
  })
  gulp.watch(paths.src.scss, gulp.series('sass')).on('change', browserSync.reload);
  gulp.watch(paths.src.css, gulp.series('css')).on('change', browserSync.reload);
  gulp.watch(paths.src.js).on('change', browserSync.reload);
  // gulp.watch(paths.src.js, gulp.series('js')).on('change', browserSync.reload);
  // gulp.watch(paths.src.templates, gulp.series('templates')).on('change', browserSync.reload);
  gulp.watch(paths.src.root + paths.dist.templates + '/**/*.hbs', gulp.series('delhtml', 'templates')).on('change', browserSync.reload);
  gulp.watch(paths.src.html).on('change', browserSync.reload);
});

//------------------- First run 'gulp start' ---------------------------------------------------------
//First Preset all files
// gulp.task('vendors', gulp.series('tailwind', 'copyjs', 'copycss', 'facss', 'copyfonts'));
// gulp.task('vendors', gulp.series('copyjs', 'copycss', 'facss', 'copyfonts'));
gulp.task('vendors', gulp.series('ukjs', 'ukcss', 'bsscss', 'bscss', 'bsjs', 'bs3js', 'bs3css', 'bs3fonts', 'facss', 'fafonts', 'jqjs', 'vendorsjs', 'vendorscss'));

//Compile Tailwind to CSS and minify css, using 'gulp tailwind' & 'gulp tailwind --production' to purge css on production
gulp.task('tocss', gulp.series('sass', 'css', 'mincss'));
// gulp.task('tocss', gulp.series('tailwind', 'sass', 'css'));

//Compile SCSS to CSS and purge & minify css, needed when modify scss
gulp.task('scss', gulp.series('sass', 'css'));

//------------------- Remember edit 'title' in gulp.task('templates') ---------------------------------------------------------
//********** First Edit title: ' ' **************
//Inject path manually in 'meta.hbs' files, no 'inject' task
gulp.task('temp', gulp.series('templates'));
//Inject path to all html files relative to /src and /dist [NO for different injection in html]
gulp.task('html', gulp.series('delhtml', 'templates', 'deletecss', 'sass', 'js', 'inject'));

//0. Preset
gulp.task('start', gulp.series('deletecss', 'deletejs', 'vendors', 'delhtml', 'templates', 'sass', 'js', 'inject'));

//1. Preset then watch
gulp.task('server', gulp.series('deletecss', 'deletejs', 'vendors', 'tailwind', 'delhtml', 'templates', 'sass', 'inject', 'inject-color1', 'inject-color2', 'watch'));

//2. Prepare all assets for production, run: 'yarn build-nohtml' or 'yarn build'
gulp.task('build-nohtml', gulp.series('deletecss', 'deletejs', 'vendors', 'scss', 'js', 'img'));
gulp.task('build-purge', gulp.series('dist', 'clean', 'deletecss', 'deletejs', 'delhtml', 'vendors', 'tailwind', 'templates', 'img', 'tailwind-purge', 'js', 'scss', 'inject', 'inject-color1', 'inject-color2', 'build-inject', 'build-inject-color1', 'build-inject-color2'));
gulp.task('build', gulp.series('dist', 'clean', 'deletecss', 'deletejs', 'delhtml', 'vendors', 'tailwind', 'templates', 'img', 'tailwind-build', 'js', 'scss', 'inject', 'inject-color1', 'inject-color2', 'build-inject', 'build-inject-color1', 'build-inject-color2'));


//--- 0.First run: 'gulp start'
//--- 1.For development run: 'gulp server' or 'yarn server'
//--- 2.For production only run: 'yarn build'