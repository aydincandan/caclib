export interface GetArgsOptions {
    defaults?: string[];
    helpText?: string;
}
export interface ParsedArgs {
    positional: string[];
    named: Record<string, string | boolean>;
}
/**
 * Hem eski stil (array), hem yeni stil (options object) argüman desteği.
 */
export declare function getArgsWithNoDefaults(optionsOrArray?: GetArgsOptions | string[]): ParsedArgs;
