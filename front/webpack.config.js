var webpack = require('webpack');
var path = require('path');


// Naming and path settings
var appName = 'app';
var entryPoint = './src/app.js';
var exportPath = path.resolve(__dirname, 'build');

// Enviroment flag
var plugins = [];
var env = process.env.WEBPACK_ENV;

// Differ settings based on production flag
if (env === 'production') {
    var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

    plugins.push(new UglifyJsPlugin({ minimize: true }));
    plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }
    ));

    appName = appName + '.js';
} else {
    appName = appName + '.js';
}

// Main Settings config
module.exports = {
    entry: entryPoint,
    output: {
        path: exportPath,
        filename: appName
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: [require('babel-plugin-transform-object-rest-spread')]
                },
            }
        ]
    },
    plugins
};