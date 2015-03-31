var webpack = require('webpack'), ExtractTextPlugin = require('extract-text-webpack-plugin'),
    distPath = __dirname + '/dist/', fontFileLoader = 'file?name=font/[name]-[hash].[ext]';

module.exports = function (vendorJsFilename, appJsFilename, appCssFilename) {
    return {
        context: __dirname,
        resolve: {
            modulesDirectories: ['node_modules', 'bower_components']
        },
        entry: {
            app: './src/index.js',
            vendor: ['./vendor/jquery', './vendor/angular']
        },
        output: {
            path: distPath,
            filename: appJsFilename
        },
        module: {
            loaders: [
                {test: /\.js$/, loader: 'babel', include: /\/src\//},
                {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
                {test: /\.woff$/, loader: fontFileLoader},
                {test: /\.woff2$/, loader: fontFileLoader},
                {test: /\.ttf$/, loader: fontFileLoader},
                {test: /\.eot$/, loader: fontFileLoader},
                {test: /\.svg$/, loader: fontFileLoader}
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('vendor', vendorJsFilename),
            new webpack.ResolverPlugin(
                new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
            ),
            new ExtractTextPlugin(appCssFilename)
        ]
    }
};
