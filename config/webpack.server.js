const express = require('express')
const bodyParser = require('body-parser')
const fallback = require('express-history-api-fallback')
const webpack = require('webpack')

const webpackConfig = require('./webpack.config.js')

const compiler = webpack(webpackConfig)
const port = process.env.PORT || 3000
const app = express()

app.locals.pretty = true
app.use(require('webpack-dev-middleware')(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(require('webpack-hot-middleware')(compiler))

app.use(bodyParser.urlencoded({ extended: false }))

const staticRoot = './assets'
app.use(express.static(staticRoot))
app.use(express.static('./build'))

app.use(fallback('index.html', { root: staticRoot }))

// start server
app.listen(port, function (err) {
  if (err) {
    console.error(err)
    return
  }
  console.log(`started frontend on port ${port}`)
})
