// const path = require('path');
const autoprefixer = require('autoprefixer');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: ['./src/app.scss', './src/app.js', './index.html',
          './src/contact.html',
          './src/features.html',
          './src/portfolio.html',
          './src/spam.html',
          './src/team.html',
          './src/thanks.html',
         ],
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
               plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules']
            }
          },
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: ['file-loader?name=[name].[ext]', 'extract-loader', 'html-loader'],
      },
    ],
  },
  plugins: [
    new CompressionPlugin({
      // brotli isnt working on this comoression path
      /* filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false, */
    })
  ],
};
