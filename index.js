'use strict'

var postcss = require('postcss')
var defined = require('defined')

var noop = postcss.plugin('noop', function () {
  return function (css) {}
})

module.exports = postcss.plugin('@emilbayes/css-pipeline', function (options) {
  options = options || {}
  var rtl = defined(options.rtl, process.env.RTL == true, false)
  var debug = defined(options.debug, process.env.DEBUG == true, false)

  return Object.assign(postcss([
    require('postcss-import')({
      plugins: [
        debug === true ? require('stylelint')(require('stylelint-config-standard')) : noop()
      ]
    }),
    require('postcss-url')({url: 'rebase'}),
    rtl === true ? require('rtlcss')() : noop(),
    require('postcss-cssnext')(),
    debug === false ? require('cssnano')({ autoprefixer: false }) : noop(),
    debug === true ? require('postcss-browser-reporter')() : noop()
  ]), {debug: debug, rtl: rtl})
})
