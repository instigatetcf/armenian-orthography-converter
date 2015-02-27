module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-jslint');

    var jslint = {
        client: {
            src: [
                'src/*.js'
            ],
            directives: {
                browser: true,
                todo: true
            }
        }
    };

    grunt.initConfig({
        jslint: jslint
    });

    grunt.registerTask('default', 'jslint');
};