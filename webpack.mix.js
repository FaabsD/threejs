let mix = require('laravel-mix');

mix.js('js/script.js', 'dist/js')
    .browserSync('threejs.test');