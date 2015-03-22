module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      deleteTarget: ["target"],
      deleteGz: ["target/**/*.gz"]
    },
    copy: {
      createTarget: {
        files: [
          {
            expand: true, 
            src:[
              '**', 
              
              '!scripts/**',
              '!styles/**',

              '!bootstrap-3.3.2/**',
              '!node_modules/**',
              '!Gruntfile.js',
              '!*.json',
              '!*.md'
              ], 
            dest:'target/'
          }
        ]
      },
      replaceWithGz: {
        files: [
          {
            expand: true,
            src:[
              'target/**/*.gz'
            ],
            rename: function(dest, src){
              return src.replace(/\.gz$/, '');
            }
          }
        ]
      }
    },
    uglify: {
      options:{
        mangle: false
      },
      build: {
        src: ['scripts/jquery-1.11.2/jquery.min.js', 'scripts/**/*.js'],
        dest: 'target/scripts/<%= pkg.name %>.min.js'
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      target: {
        files:{
          'target/styles/<%= pkg.name %>.min.css': ['styles/**/*.css']
        }
      }
    },
    hashres: {
      options:{
        fileNameFormat: '${name}.${hash}.${ext}',
        renameFiles: true
      },
      prod:{
        src:[
        'target/scripts/**/*.js', 
        'target/styles/**/*.css',
        'target/fonts/**/*.*', 
        'target/img/**/*.*'
        ],
        dest: ['target/**/*.html', 'target/**/*.css']
      }
    },
    htmlmin: {
      dist:{
        options:{
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          src: ['target/**/*.html'],
          dest: '.'
        }]
      }
    },
    compress: {
      main:{
        options: {
          mode: 'gzip'
        },
        expand: true,
        src: ['target/**/*.html', 'target/**/*.css', 'target/**/*.js'],
        rename: function (dest, src) {
          return src + '.gz';
        }
      }
    }//,
    // inline: {
    //   dist: {
    //     src: ['target/**/*.html']
    //   }
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  // grunt.loadNpmTasks('grunt-inline');

  // Default task(s).
  grunt.registerTask('default', ['clean:deleteTarget', 'copy:createTarget', 'uglify', 'cssmin', 'hashres', 'htmlmin']);
  grunt.registerTask('prod', ['default', 'compress', 'copy:replaceWithGz', 'clean:deleteGz']);

};