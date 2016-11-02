const postcss = require('postcss')
const pipeline = require('.')

var css = require('fs').readFileSync('index.css')

postcss(pipeline()).process(css).then(function (result) {
  console.log(result.css)
  process.exit(0)
}, function (err) {
  console.error(err)
  process.exit(1)
})
