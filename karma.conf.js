var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['qunit'],
        files: [
            'tests/*.ts'
        ],
        exclude: [
        ],
        mime: {
            'text/x-typescript': ['ts','tsx']
        },
        junitReporter: {
            outputDir: 'tmp/testresults/',
            outputFile: 'test-results.xml'
        },
        preprocessors: {
            '**/*.ts': ['webpack', 'sourcemap']
        },
        webpack: {
            module: webpackConfig[0].module,
            resolve: webpackConfig[0].resolve,
            plugins: [
                new webpack.SourceMapDevToolPlugin({
                    filename: null, // if no value is provided the sourcemap is inlined
                    test: /\.(ts|js)($|\?)/i // process .js and .ts files only
                })
            ]
        },
        reporters: ['progress', 'dots', 'junit'],
        browsers: ['PhantomJS'],
        colors: true,
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,
        autoWatch: true,
        singleRun: false,
        concurrency: Infinity
    })
}