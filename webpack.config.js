const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * The source path
 */
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  entry: {
    index: './src/index.js',
    main: './src/scss/main.scss',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        include: srcPath,
        exclude: /(node_modules|bower_components|build|coverage)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // This loader is used to transpile the .ts and .tsx files
        // After that to js the output is transpiled
        // using babel-loader.
        test: /\.(tsx?)$/,
        include: srcPath,
        exclude: /(node_modules|bower_components|build|coverage)/,
        use: [
          'babel-loader', {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(srcPath, 'tsconfig.build.json'),
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components|build|coverage)/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx'],
  },
  externals: {
    react: 'commonjs react', // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    moment: 'commonjs moment',
    'react-ocean-forms': 'commonjs react-ocean-forms',
    'react-datetime': 'commonjs react-datetime',
    reactstrap: 'commonjs reactstrap',
    'react-dom': 'commonjs react-dom',
    'react-select': 'commonjs react-select',
    '@fortawesome/fontawesome': 'commonjs @fortawesome/fontawesome',
    '@fortawesome/fontawesome-free-solid': 'commonjs @fortawesome/fontawesome-free-solid',
    '@fortawesome/react-fontawesome': 'commonjs @fortawesome/react-fontawesome',
  },
  plugins: [
    new CleanWebpackPlugin(['build/*']),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
