let mix = require('laravel-mix');

mix.js('js/script.js', 'dist/js')
    .browserSync({
        proxy: 'threejs.test',
        files: [
            'dist/js/script.js',
            'index.html',
        ]
    });