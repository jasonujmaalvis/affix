module.exports = {
    grunt: {
        files: ['Gruntfile.js'],
        options: {
            reload: true
        }
    },
    sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass'],
        options: {
            livereload: true
        }
    },
    scripts: {
        files: ['js/**/*.js'],
        tasks: ['jshint', 'uglify'],
        options: {
            spawn: false,
            livereload: true
        }
    }
};