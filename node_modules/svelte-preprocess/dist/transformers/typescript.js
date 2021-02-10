"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformer = void 0;
const path_1 = require("path");
const typescript_1 = __importDefault(require("typescript"));
const errors_1 = require("../modules/errors");
function createFormatDiagnosticsHost(cwd) {
    return {
        getCanonicalFileName: (fileName) => fileName,
        getCurrentDirectory: () => cwd,
        getNewLine: () => typescript_1.default.sys.newLine,
    };
}
function formatDiagnostics(diagnostics, basePath) {
    if (Array.isArray(diagnostics)) {
        return typescript_1.default.formatDiagnosticsWithColorAndContext(diagnostics, createFormatDiagnosticsHost(basePath));
    }
    return typescript_1.default.formatDiagnostic(diagnostics, createFormatDiagnosticsHost(basePath));
}
const importTransformer = (context) => {
    const visit = (node) => {
        var _a;
        if (typescript_1.default.isImportDeclaration(node)) {
            if ((_a = node.importClause) === null || _a === void 0 ? void 0 : _a.isTypeOnly) {
                return typescript_1.default.createEmptyStatement();
            }
            return typescript_1.default.createImportDeclaration(node.decorators, node.modifiers, node.importClause, node.moduleSpecifier);
        }
        return typescript_1.default.visitEachChild(node, (child) => visit(child), context);
    };
    return (node) => typescript_1.default.visitNode(node, visit);
};
const transformer = ({ content, filename, options = {}, }) => {
    // default options
    const compilerOptionsJSON = {
        moduleResolution: 'node',
        target: 'es6',
    };
    let basePath = process.cwd();
    if (options.tsconfigFile !== false || options.tsconfigDirectory) {
        const fileDirectory = (options.tsconfigDirectory ||
            path_1.dirname(filename));
        const tsconfigFile = options.tsconfigFile ||
            typescript_1.default.findConfigFile(fileDirectory, typescript_1.default.sys.fileExists);
        if (typeof tsconfigFile === 'string') {
            basePath = path_1.dirname(tsconfigFile);
            const { error, config } = typescript_1.default.readConfigFile(tsconfigFile, typescript_1.default.sys.readFile);
            if (error) {
                throw new Error(formatDiagnostics(error, basePath));
            }
            Object.assign(compilerOptionsJSON, config.compilerOptions);
        }
    }
    Object.assign(compilerOptionsJSON, options.compilerOptions);
    const { errors, options: convertedCompilerOptions, } = typescript_1.default.convertCompilerOptionsFromJson(compilerOptionsJSON, basePath);
    if (errors.length) {
        throw new Error(formatDiagnostics(errors, basePath));
    }
    const compilerOptions = {
        ...convertedCompilerOptions,
        importsNotUsedAsValues: typescript_1.default.ImportsNotUsedAsValues.Error,
        allowNonTsExtensions: true,
    };
    if (compilerOptions.target === typescript_1.default.ScriptTarget.ES3 ||
        compilerOptions.target === typescript_1.default.ScriptTarget.ES5) {
        throw new Error(`Svelte only supports es6+ syntax. Set your 'compilerOptions.target' to 'es6' or higher.`);
    }
    const { outputText: code, sourceMapText: map, diagnostics, } = typescript_1.default.transpileModule(content, {
        fileName: filename,
        compilerOptions,
        reportDiagnostics: options.reportDiagnostics !== false,
        transformers: {
            before: [importTransformer],
        },
    });
    if (diagnostics.length > 0) {
        // could this be handled elsewhere?
        const hasError = diagnostics.some((d) => d.category === typescript_1.default.DiagnosticCategory.Error);
        const formattedDiagnostics = formatDiagnostics(diagnostics, basePath);
        console.log(formattedDiagnostics);
        if (hasError) {
            errors_1.throwTypescriptError();
        }
    }
    return {
        code,
        map,
        diagnostics,
    };
};
exports.transformer = transformer;
