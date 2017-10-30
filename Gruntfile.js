module.exports = function(grunt) {
    var frontendDir = './web';
    var bowerDir = frontendDir + '/bower_components';
    var staticDir = './output';

    // получение кастомных js-файлов
    var customJsFiles = [];
    grunt.file.recurse(frontendDir + '/js/app/', function(abspath, rootdir, subdir, filename) {
        customJsFiles.push(abspath);
    });

    var jsBaseFiles = [

        //bowerDir + '/bootstrap/js/transition.js',
        //bowerDir + '/bootstrap/js/alert.js',
        //bowerDir + '/bootstrap/js/button.js',
        //bowerDir + '/bootstrap/js/carousel.js',
        //bowerDir + '/bootstrap/js/collapse.js',
        bowerDir + '/bootstrap/js/dropdown.js',
        //bowerDir + '/bootstrap/js/modal.js',
        //bowerDir + '/bootstrap/js/tooltip.js',
        //bowerDir + '/bootstrap/js/popover.js',
        //bowerDir + '/bootstrap/js/scrollspy.js',
        bowerDir + '/bootstrap/js/tab.js',
        //bowerDir + '/bootstrap/js/affix.js',

        bowerDir + '/slick-carousel/slick/slick.min.js',

        bowerDir + '/lightcase/src/js/lightcase.js',

        frontendDir + '/js/logger.js',
        frontendDir + '/js/bootstrap-helper.js'
    ];

    // добавление кастомных js-файлов в конец базовых js-файлов
    for (var i = 0; i < customJsFiles.length; i++) {
        jsBaseFiles.push(customJsFiles[i]);
    }

    var jsFiles = function(){
        var result = [bowerDir + '/jquery/dist/jquery.js'];
        for (var i = 0; i < jsBaseFiles.length; i++) {
            result.push(jsBaseFiles[i]);
        }
        return result;
    }();

    var jsLtIE9Files = function(){
        var result = [bowerDir + '/jquery1.10/jquery.js'];
        for (var i = 0; i < jsBaseFiles.length; i++) {
            result.push(jsBaseFiles[i]);
        }
        return result;
    }();

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            all: [staticDir + '/*'],
            test: [staticDir + '/tmpl_*.html',
                   staticDir + '/sandbox_*.html'],  // в выгрузке не нужны базовые файлы и файлы песочницы
        },

        uglify: {
            options: {
                mangle: true
            },
            prod: {
                files: [{
                    src: jsFiles,
                    dest: staticDir + '/js/app.min.js'
                }, {
                    src: jsLtIE9Files,
                    dest: staticDir + '/js/app-lt-ie9.min.js'
                }, {
                    src: [bowerDir + '/respond/dest/respond.src.js'],
                    dest: staticDir + '/js/respond.min.js'
                }, {
                    src: [bowerDir + '/html5shiv/dist/html5shiv.js'],
                    dest: staticDir + '/js/html5shiv.min.js'
                }]
            },
            dev: {
                options: {
                    mangle: false,
                    beautify: true,
                    compress: false
                },
                files: [{
                    src: jsFiles,
                    dest: staticDir + '/js/app.js'
                }]
            }
        },

        less: {
            prod: {
                options: {
                    compress: true,
                    cleancss: true
                },
                files: [{
                    src: frontendDir + '/less/styles.less',
                    dest: staticDir + '/css/styles.min.css'
                }, {
                    src: frontendDir + '/css/ie8.css',
                    dest: staticDir + '/css/ie8.min.css'
                }, {
                    src: frontendDir + '/css/sys.css',
                    dest: staticDir + '/css/sys.min.css'
                }]
            },
            dev: {
                options: {
                    compress: false,
                    cleancss: true
                },
                files: [{
                    src: frontendDir + '/less/styles.less',
                    dest: staticDir + '/css/styles.css'
                }, {
                    src: frontendDir + '/css/ie8.css',
                    dest: staticDir + '/css/ie8.css'
                }, {
                    src: frontendDir + '/css/sys.css',
                    dest: staticDir + '/css/sys.css'
                }]
            }
        },

        replace: {
            prod: {
                src: [staticDir + '/css/styles.min.css'],
                overwrite: true,
                replacements: [/*{
                    from: '../bower_components/bootstrap/fonts/',
                    to: '../fonts/glyphicons-halflings-regular/'
                },*/{
                    from: '../../web/bower_components/font-awesome/fonts',
                    to: '../fonts/font-awesome'
                }]
            }
        },

        copy: {
            prod: {
                files: [
                /*{
                    expand: true,
                    cwd: bowerDir + '/bootstrap/fonts/',
                    src: ['**'],
                    dest: staticDir + '/fonts/glyphicons-halflings-regular/'
                },*/
                {
                    expand: true,
                    cwd: bowerDir + '/font-awesome/fonts/',
                    src: ['**'],
                    dest: staticDir + '/fonts/font-awesome/'
                },/* {
                    expand: true,
                    cwd: frontendDir + '/fonts/',
                    src: ['**'],
                    dest: staticDir + '/fonts/'
                },*/ {
                    expand: true,
                    cwd: frontendDir + '/img/',
                    src: ['**'],
                    dest: staticDir + '/img/'
                }]
            }
        },

        preprocess: {
            prod: {
                options: {
                    context : {
                        NODE_ENV: 'production',
                        DEBUG: false
                    }
                },
                files: [{
                    expand: true,
                    cwd: frontendDir + '/',
                    src: ['*.html'],
                    dest: staticDir + '/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-preprocess');

    grunt.registerTask('dev', [
        'clean:all',
        'uglify:prod',
        'uglify:dev',
        'less:prod',
        'less:dev',
        'replace',
        'copy',
        'preprocess',
        'clean:test'
    ]);

    grunt.registerTask('prod', [
        'clean:all',
        'uglify:prod',
        'less:prod',
        'replace',
        'copy',
        'preprocess',
        'clean:test'
    ]);
    grunt.registerTask('default', ['dev']);
};
