/*
 * Copyright (c) 2022-2023 Orange. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 *     1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *     2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *     3. All advertising materials mentioning features or use of this software must display the following acknowledgement:
 *     This product includes software developed by Orange.
 *     4. Neither the name of Orange nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY Orange "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Orange BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = (env, argv) => {
    // Define the manifest file names for each browser
    var manifest
    if (env.firefox) {
        manifest = 'manifest.firefox.json';
    }
    if (env.chrome) {
        manifest = 'manifest.chrome.json';
    }
    // Define the building mode
    var mode = argv.mode

    return {
        mode: mode,
        devtool: mode == 'development' ? 'inline-source-map' : undefined,
        entry: {
            index: './src/index.jsx',
            background: './src/scripts/background.js',
            content: './src/scripts/content.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
        },
        module: {
            rules: [{
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.js', '.jsx']
                },
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', {"runtime": "automatic"}]
                        ]
                    }
                }
            }]
        },
        plugins: [new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: 'index.html',
                inject: false
            }),
            new CopyPlugin ({
                patterns: [
                    { from: './public/assets/', to: 'assets/' },
                    {
                        from: path.resolve('./public/', manifest),
                        to: path.resolve('./dist/', 'manifest.json')
                    }
                ]
            })
        ],
        resolve: {
            extensions: ['.js', '.jsx'],
            fallback: {
                path: require.resolve("path-browserify"),
                stream: require.resolve("stream-browserify")
            }
        }
    }
};
