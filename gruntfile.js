module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    var jslint = {
        client: {
            src: [
                'src/*.js'
            ],
            directives: {
                browser: true,
                devel: true,
                todo: true,
                plusplus: true,
                predef: [
                    // for nodejs
                    'exports',

                    // for browser
                    'HTMLIFrameElement',
                    'Text',
                    'Comment',
                    'Window',

                    // specific globals
                    'mashtots',

                    // skip indirect recursion
                    'replaceInDom'
                ]
            }
        }
    };

    var uglify = {
        dest: {
            files: {
                'dest/mashtots.min.js': ['src/mashtots.js', 'src/mashtots-dom.js']
            }
        }
    };

    grunt.initConfig({
        jslint: jslint,
        uglify: uglify
    });

    grunt.registerTask('default', 'jslint');
    grunt.registerTask('build', 'uglify');
};