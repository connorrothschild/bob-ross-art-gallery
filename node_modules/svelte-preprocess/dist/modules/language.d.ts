import type { PreprocessorArgs } from '../types';
export declare function getLanguageDefaults(lang: string): null | Record<string, any>;
export declare const SOURCE_MAP_PROP_MAP: Record<string, [string[], any]>;
export declare const ALIAS_MAP: Map<string, string>;
export declare const addLanguageAlias: (entries: Array<[string, string]>) => void;
export declare const getLanguageFromAlias: (alias: string | null) => string;
export declare const getLanguage: (attributes: PreprocessorArgs['attributes']) => {
    lang: string;
    alias: any;
};
