const path = require( 'path' );
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    // bundling mode
    mode: 'production',

    // entry files
    entry: path.resolve( __dirname, 'src' ),

    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist' )
    },

    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ],
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },

    devtool: 'source-map',

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './public',
                }
            ]
        }),
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080
    }
};