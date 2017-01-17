# `@emilbayes/css-pipeline`

[![Build Status](https://travis-ci.org/emilbayes/css-pipeline.svg?branch=master)](https://travis-ci.org/emilbayes/css-pipeline)

> My personal PostCSS based CSS pipeline

## Usage

```js
var postcss = require('postcss')
var pipeline = require('@emilbayes/css-pipeline')

postcss(pipeline()).process(cssString).then(oncomplete, onerror)

function oncomplete (result) {
  console.log(result.css)
  process.exit(0)
}
function onerror (err) {
  console.error(err)
  process.exit(1)
}

```

Or with [`postcss-cli`](https://github.com/postcss/postcss-cli):

```sh
cat index.css | postcss --use @emilbayes/css-pipeline > bundle.css
```

## API

### `pipeline(opts)`

Returns a PostCSS plugin.

* `opts.debug`, also available through the `DEBUG` env var. Defaults to `false`
* `opts.rtl`, also available through the `RTL` env var. Defaults to `false`

## Install

```sh
npm install @emilbayes/css-pipeline
```

## License

[ISC](LICENSE.md)
