/*
 * blueimp Gallery Gruntfile
 * https://github.com/blueimp/grunt-locales
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global module */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'js/blueimp-helper.js',
                'js/blueimp-gallery.js',
                'js/blueimp-gallery-fullscreen.js',
                'js/blueimp-gallery-indicator.js',
                'js/blueimp-gallery-video.js',
                'js/blueimp-gallery-vimeo.js',
                'js/blueimp-gallery-youtube.js',
                'js/jquery.blueimp-gallery.js',
                'js/demo.js'
            ]
        },
        uglify: {
            standalone: {
                src: [
                    'js/blueimp-helper.js',
                    'js/blueimp-gallery.js',
                    'js/blueimp-gallery-fullscreen.js',
                    'js/blueimp-gallery-indicator.js',
                    'js/blueimp-gallery-video.js',
                    'js/blueimp-gallery-vimeo.js',
                    'js/blueimp-gallery-youtube.js'
                ],
                dest: 'js/blueimp-gallery.min.js'
            },
            jqueryPlugin: {
                src: [
                    'js/blueimp-gallery.js',
                    'js/blueimp-gallery-fullscreen.js',
                    'js/blueimp-gallery-indicator.js',
                    'js/blueimp-gallery-video.js',
                    'js/blueimp-gallery-vimeo.js',
                    'js/blueimp-gallery-youtube.js',
                    'js/jquery.blueimp-gallery.js'
                ],
                dest: 'js/jquery.blueimp-gallery.min.js'
            }
        },
        less: {
            production: {
                options: {
                    cleancss: true
                },
                src: [
                    'css/blueimp-gallery.css',
                    'css/blueimp-gallery-indicator.css',
                    'css/blueimp-gallery-video.css'
                ],
                dest: 'css/blueimp-gallery.min.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bump-build-git');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['test', 'less', 'uglify']);

};
