"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autoProcess_1 = require("./autoProcess");
// default auto processor
// crazy es6/cjs export mix for backward compatibility
// eslint-disable-next-line no-multi-assign
exports.default = exports = module.exports = autoProcess_1.sveltePreprocess;
// stand-alone processors to be included manually */
var pug_1 = require("./processors/pug");
Object.defineProperty(exports, "pug", { enumerable: true, get: function () { return pug_1.default; } });
var coffeescript_1 = require("./processors/coffeescript");
Object.defineProperty(exports, "coffeescript", { enumerable: true, get: function () { return coffeescript_1.default; } });
var typescript_1 = require("./processors/typescript");
Object.defineProperty(exports, "typescript", { enumerable: true, get: function () { return typescript_1.default; } });
var less_1 = require("./processors/less");
Object.defineProperty(exports, "less", { enumerable: true, get: function () { return less_1.default; } });
var scss_1 = require("./processors/scss");
Object.defineProperty(exports, "scss", { enumerable: true, get: function () { return scss_1.default; } });
Object.defineProperty(exports, "sass", { enumerable: true, get: function () { return scss_1.default; } });
var stylus_1 = require("./processors/stylus");
Object.defineProperty(exports, "stylus", { enumerable: true, get: function () { return stylus_1.default; } });
var postcss_1 = require("./processors/postcss");
Object.defineProperty(exports, "postcss", { enumerable: true, get: function () { return postcss_1.default; } });
var globalStyle_1 = require("./processors/globalStyle");
Object.defineProperty(exports, "globalStyle", { enumerable: true, get: function () { return globalStyle_1.default; } });
var babel_1 = require("./processors/babel");
Object.defineProperty(exports, "babel", { enumerable: true, get: function () { return babel_1.default; } });
var replace_1 = require("./processors/replace");
Object.defineProperty(exports, "replace", { enumerable: true, get: function () { return replace_1.default; } });
