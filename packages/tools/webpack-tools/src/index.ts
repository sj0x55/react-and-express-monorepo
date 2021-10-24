import path from 'path';
import express from 'express';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import webpackDevMiddleware from 'webpack-dev-middleware';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackHotMiddleware from 'webpack-hot-middleware';
import dotenv from '@package/dotenv';
import babelConfig from '@package/babel-config';
import { getStandardPackagePaths, getStandardPackageFiles } from '@package/monorepo-tools';

const standardPackagePaths = getStandardPackagePaths(process.cwd());
const standardPackageFiles = getStandardPackageFiles(process.cwd());
const paths = { ...standardPackagePaths, ...standardPackageFiles };
const indexHtmlFileName = 'index.html';
const relativePublicPath = '/public';
const templateFilePath = path.join(paths.publicPath || '', indexHtmlFileName);
const indexFilePath = path.join(paths.outputPath || '', indexHtmlFileName);

const getCompiler = (customConfig: webpack.Configuration = {}) => {
  if (paths.dotenvFilePath) {
    dotenv(paths.dotenvFilePath);
  }

  const webpackConfig = merge(
    {
      mode: (process.env.NODE_ENV || 'development') as 'development' | 'production',
      target: 'web',
      devtool: 'inline-source-map',
      // devtool: 'cheap-module-eval-source-map',
      entry: ['webpack-hot-middleware/client?reload=true', paths.indexFilePath || ''],
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules', paths.srcPath || ''],
      },
      output: {
        publicPath: relativePublicPath,
        path: paths.outputPath || '',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,
            options: babelConfig,
          },
          {
            test: /\.js$/,
            use: ['source-map-loader'],
            exclude: /(node_modules)/,
            enforce: 'pre',
          },
          {
            loader: 'file-loader',
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: `${relativePublicPath}/media/[name].[hash:8].[ext]`,
            },
          },
        ],
      },
      // devServer: {
      //   static: relativePublicPath,
      //   historyApiFallback: true,
      //   compress: true,
      //   port: 1234,
      //   open: true,
      //   hot: true,
      // },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          inject: true,
          publicPath: relativePublicPath,
          template: templateFilePath,
        }),
      ],
      optimization: {
        splitChunks: {
          chunks: 'all',
        },
        runtimeChunk: 'single',
      },
    },
    customConfig,
  );
  return webpack(
    merge(webpackConfig, {
      plugins: [new webpack.EnvironmentPlugin({ NODE_ENV: webpackConfig.mode, ...process.env })],
    }),
  );
};

export const build = (customConfig: webpack.Configuration = {}) => {
  const compiler = getCompiler(customConfig);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      const json = stats?.toJson() || {};
      const info = stats?.toString({
        chunks: false,
        assets: false,
        colors: true,
      });

      if (err) {
        return reject(err.stack || err);
      }

      if (stats?.hasErrors()) {
        return reject(json.errors);
      }

      if (stats?.hasWarnings()) {
        return reject(json.warnings);
      }

      if (info) {
        return resolve(info);
      }
    });
  });
};

export const devServer = (customConfig: webpack.Configuration = {}) => {
  const compiler = getCompiler(customConfig);
  const app = express();

  app.use(
    webpackDevMiddleware(compiler, {
      writeToDisk: (filePath) => new RegExp(`${indexHtmlFileName}$`).test(filePath),
      publicPath: relativePublicPath,
      stats: { colors: true },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
  );

  // TODO: Incompatible types in @types/webpack
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.use(webpackHotMiddleware(compiler));

  app.use(express.static(paths.staticPath || ''));

  app.get('*', (req, res) => {
    res.sendFile(indexFilePath);
  });

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
  });

  return app;
};
