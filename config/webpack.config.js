const path = require('path')
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: getEntries(),
  output: getOutput(),
  devtool: getDevTool(),
  plugins: getPlugins(),
  module: {
    loaders: getLoaders(),
  },
  postcss: function () {
    return [
      require('postcss-import')({
        addDependencyTo: webpack,
      }),
      require('postcss-sassy-mixins')(),
      require('postcss-cssnext')(),
    ]
  },
  resolve: {
    alias: {
      modernizr$: path.join(__dirname, '.modernizrrc'),
    },
    extensions: ['', '.js', '.jsx', '.json'],
  },
}

function getLoaders() {
  return [
    {
      test: /\.(js|jsx)?$/,
      loader: 'babel-loader',
      exclude: ['node_modules'],
      include: path.join(__dirname, '../app/scripts'),
      query: {
        presets: ['es2015', 'stage-0', 'react'],
      },
    },
    {
      test: /\.css$/,
      loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        'postcss',
      ],
    },
    {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!postcss-loader!sass-loader?sourceMap',
    },
    {
      test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loaders: ['url-loader?limit=10000&minetype=application/font-woff&name=/fonts/[name].[ext]'],
      include: /fonts/,
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loaders: ['url-loader?name=/fonts/[name].[ext]'],
      include: /fonts/,
    },
    {
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      loaders: [
        isProd ? 'file-loader?hash=sha512&digest=hex' : 'file-loader?hash=sha512&digest=hex&name=/media/[name].[ext]',
        'image-webpack?bypassOnDebug=false&optimizationLevel=7&interlaced=false',
      ],
      include: /media/,
    },
    {
      test: /\.json$/,
      loaders: ['json-loader'],
    },
  ]
}

function getOutput() {
  if (isProd) {
    return {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
    }
  }
  return {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/',
  }
}

function getEntries() {
  const entries = {
    bundle: path.resolve(__dirname, '../app/scripts', 'main.js'),
  }
  if (isProd) {
    return entries
  }
  const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
  return {
    bundle: [entries.bundle, hotMiddlewareScript],
  }
}

function getPlugins() {
  return [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
}

function getDevTool() {
  return (isProd) ? '' : 'eval'
}
