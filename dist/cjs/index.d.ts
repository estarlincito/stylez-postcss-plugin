import { default as postcss } from 'postcss';
declare const plugin: {
    ({ patterns }: {
        patterns: string[];
    }): {
        Once(root: postcss.Root): Promise<void>;
        postcssPlugin: string;
    };
    postcss: boolean;
};
export default plugin;
