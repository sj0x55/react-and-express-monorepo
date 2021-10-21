import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { merge } from 'webpack-merge';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import babelConfig from '@react-and-express/babel-config';
import { resolvePath, validatePaths } from './utils';

const resolveAppPath = (values: string[], checkIfExists = true) => resolvePath(process.cwd(), values, checkIfExists);
const indexFileName = 'index.html';
const paths: TPaths = {
  publicPath: '/public',
  srcPath: resolveAppPath(['src']),
  outputPath: resolveAppPath(['build']),
  outputIndexFile: resolveAppPath([`build/${indexFileName}`]),
  dotenvFilePath: resolveAppPath(['.env']),
  indexFilePath: resolveAppPath(['src/index.ts', 'src/index.tsx', 'src/index.js']),
  templateFilePath: resolveAppPath([`public/${indexFileName}`]),
  staticPath: resolveAppPath(['static'], false),
};
const getCompiler = (customConfig: webpack.Configuration = {}) => {
  const nodeEnv = (process.env.NODE_ENV || 'development') as 'development' | 'production';
  const notValidKeys = validatePaths(paths);

  if (notValidKeys.length > 0) {
    throw Error(`Paths "${notValidKeys.join(', ')}" has not been found.`);
  }

  if (paths.dotenvFilePath) {
    dotenvExpand(dotenv.config({ path: paths.dotenvFilePath }));
  }

  const webpackConfig = merge(
    {
      mode: nodeEnv,
      target: 'web',
      devtool: 'inline-source-map',
      // devtool: 'cheap-module-eval-source-map',
      entry: ['webpack-hot-middleware/client?reload=true', paths.indexFilePath || ''],
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules', paths.srcPath || ''],
        alias: {
          src: paths.srcPath || '',
        },
      },
      output: {
        publicPath: '/public',
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
              name: `${paths.publicPath}/media/[name].[hash:8].[ext]`,
            },
          },
          // {
          //   test: /\.css$/,
          //   use: ['css-loader', 'css-loader'],
          //   options: {
          //     importLoaders: 1,
          //     sourceMap: true,
          //   },
          //   sideEffects: true,
          // },
          // TODO: CSS/SASS/Styled-Components
        ],
      },
      devServer: {
        static: paths.publicPath || '',
        historyApiFallback: true,
        compress: true,
        port: 1234,
        open: true,
        hot: true,
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          publicPath: paths.publicPath || '',
          inject: true,
          template: paths.templateFilePath || '',
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
      writeToDisk: (filePath) => new RegExp(`${indexFileName}$`).test(filePath),
      publicPath: paths.publicPath || '',
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
    res.sendFile(paths.outputIndexFile || '');
  });

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
  });

  return app;
};
