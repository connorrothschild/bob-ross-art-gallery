'use strict';

var path = require('path');
var rollupPluginutils = require('rollup-pluginutils');

function toDataUrl (code) {
  var mime = 'image/svg+xml'
  var buffer = Buffer.from(code, 'utf-8')
  var encoded = buffer.toString('base64')
  return ("'data:" + mime + ";base64," + encoded + "'")
}

function svg (options) {
  if ( options === void 0 ) options = {};

  var filter = rollupPluginutils.createFilter(options.include, options.exclude)

  return {
    name: 'svg',

    transform: function transform (code, id) {
      if (!filter(id) || path.extname(id) !== '.svg') {
        return null
      }

      var content = code.trim()
      var encoded = options.base64 ? toDataUrl(content) : JSON.stringify(content)

      return { code: ("export default " + encoded), map: { mappings: '' } }
    }
  }
}

module.exports = svg;