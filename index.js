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
    require('postcss-import')({
      plugins: [
        debug ? require('stylelint')(require('stylelint-config-standard')) : noop()
      ]
    }),
    require('postcss-url')({url: 'rebase'}),
    rtl ? require('rtlcss')() : noop(),
    require('postcss-cssnext')(),
    !debug ? require('cssnano')({ autoprefixer: false }) : noop(),
    debug ? require('postcss-browser-reporter')() : noop()
  ])
})
