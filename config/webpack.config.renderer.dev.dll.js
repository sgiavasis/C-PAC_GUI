import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';
import { dependencies } from '../package.json';
import CheckNodeEnv from '../internals/scripts/CheckNodeEnv';

CheckNodeEnv('development');

const dist = path.resolve(process.cwd(), 'app', 'dist', 'dll');

console.log(dist)

export default merge.smart(baseConfig, {
  context: process.cwd(),

  devtool: 'eval',

  target: 'web',

  externals: ['fsevents', 'crypto-browserify', 'argparse', 'express', 'devtron',
  'electron-store', 'electron-args', 'source-map-support', 'electron-debug'],

  entry: {
    renderer: (
      Object
        .keys(dependencies || {})
        .filter(dependency => dependency !== 'font-awesome')
    )
  },

  output: {
    library: 'renderer',
    path: dist,
    filename: '[name].dev.dll.js',
    libraryTarget: 'var'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.global\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
        ]
      },
      {
        test: /\.global\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /^((?!\.global).)*\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          }
        },
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          }
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          }
        }
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader',
      }
    ]
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(dist, '[name].json'),
      name: '[name]',
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: path.resolve(process.cwd(), 'app'),
        output: {
          path: path.resolve(process.cwd(), 'app', 'dist', 'dll'),
        },
      },
    })
  ],
});