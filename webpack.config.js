const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getScopedName = require('./src/helpers/getScopedName');

module.exports = (env, options) => {
  const isDev = options.mode === 'development';
  process.env.NODE_ENV = options.mode;

  return ({
    devtool: 'eval-source-map',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
    },
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      alias: {
        react: path.join(__dirname, 'node_modules', 'react'),
      },
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    devServer: {
      proxy: {
        '/api': 'http://localhost:3001',
        '/export': 'http://localhost:3001',
      },
      port: 8080,
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [
            (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: /^((?!node_modules).)*$/i,
                  ...(isDev ? {
                    localIdentName: '[folder]__[local]',
                  } : {
                    getLocalIdent: (context, localIdentName, localName) => getScopedName(localName, context.resourcePath),
                  }),
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
      }),
      ...(isDev ? [] : [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
          chunkFilename: '[name].[contenthash].css',
        }),
      ]),
    ],
  });
};
