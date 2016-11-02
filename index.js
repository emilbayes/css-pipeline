'use strict'

var postcss = require('postcss')
var defined = require('defined')

var noop = postcss.plugin('noop', function () {
  return function (css) {}
})

module.exports = postcss.plugin('@emilbayes/css-pipeline', function (options) {
  options = options || {}
  var rtl = defined(options.rtl, process.env.RTL, false)
  var debug = defined(options.debug, process.env.DEBUG, false)

  return postcss([
    require('postcss-import')(),
    require('postcss-cssnext')(),
    rtl ? require('rtlcss')() : noop(),
    !debug ? require('cssnano')({ autoprefixer: false }) : noop(),
    !debug ? require('postcss-browser-reporter')() : noop()
  ])
})
