'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      dist: ['dist'],
    },

    bosonic: {
      components: {
        src: ['src/*.html'],
        css: 'dist/<%= elementName %>.css',
        js:  'dist/<%= elementName %>.js'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    watch: {
      source: {
        files: ['src/*.html'],
        tasks: ['clean', 'bosonic']
      }
    },

    copy: {
      demo: {
        files: [
          { src: ['node_modules/bosonic/dist/*.js'], dest: 'demo/js/', filter: 'isFile', expand: true, flatten: true },
          { src: ['dist/*.js'], dest: 'demo/js/', filter: 'isFile', expand: true, flatten: true },
          { src: ['dist/*.css'], dest: 'demo/css/', filter: 'isFile', expand: true, flatten: true }
        ]
      }
    },

    connect: {
      demo: {
        options: {
          port: 8020,
          base: './demo',
          hostname: '*',
          keepalive: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bosonic');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['dist', 'watch']);
  grunt.registerTask('test', ['dist', 'karma']);
  grunt.registerTask('demo', ['dist', 'copy', 'connect']);
  grunt.registerTask('dist', ['clean', 'bosonic']);

};
