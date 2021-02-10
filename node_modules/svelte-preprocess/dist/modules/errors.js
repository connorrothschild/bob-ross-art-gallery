"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwTypescriptError = exports.throwError = void 0;
exports.throwError = (msg) => {
    throw new Error(`[svelte-preprocess] ${msg}`);
};
exports.throwTypescriptError = () => {
    exports.throwError(`Encountered type error`);
};
