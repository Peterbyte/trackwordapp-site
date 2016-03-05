module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      deleteTarget: ['target'],
      deleteTmpGz: ['target/**/*.gz'],
      deleteCssTmp: ['target/styles']
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
      fromSrc: {
        files:{
          'target/styles/<%= pkg.name %>.min.css': ['styles/bootstrap-*/**/*.css', 'styles/*.css']
        }
      },
      fromLib:{
        files:{
          'target/styles/<%= pkg.name %>.vendor.min.css': 'styles/owlcarousel-*/**/*.css'
        }
      }
    },
    concat:{
      dist:{
        src: ['target/styles/<%= pkg.name %>.min.css', 'target/styles/<%= pkg.name %>.vendor.min.css'],
        dest: 'target/styles/<%= pkg.name %>.min.css'
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
    uncss: {
      dist: {
        files: {
          'target/styles/<%= pkg.name %>.min.css': [
            'target/**/*.html',
            '!target/redirect.html',
            '!target/google*.html'
          ]
        }
      }
    },
    inline: {
      dist: {
        options:{
          cssmin: true
        },
        src: ['target/**/*.html']
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-inline');

  // Default task(s).
  grunt.registerTask('compile', [
    'clean:deleteTarget',
    'copy:createTarget',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'compile',
    'cssmin:fromSrc',
    'uncss',
    'cssmin:fromLib',
    'concat',
    'inline'
  ]);

  grunt.registerTask('prod', [
    'compile',
    'cssmin:fromSrc',
    'uncss',
    'cssmin:fromLib',
    'concat',
    'inline',
    'clean:deleteCssTmp',
    'hashres',
    'htmlmin',
    'compress',
    'copy:replaceWithGz',
    'clean:deleteTmpGz'
  ]);
};