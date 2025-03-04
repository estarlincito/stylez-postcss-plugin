import postcss from 'postcss';

import saving from './lib/saving.js';
import { extractStylesFromFiles } from './lib/swc-extractor.js';

const plugin = ({ patterns }: { patterns: string[] }) => {
  let extractedRoot = '' as unknown as postcss.Root;
  let runtime = 0;
  let stylezCounter = 0;

  return {
    async Once(root: postcss.Root) {
      runtime++;

      const atRule = root.first as postcss.AtRule | undefined;

      if (atRule?.name === 'stylez') {
        stylezCounter++;
        if (stylezCounter > 1) {
          process.stdout.write(
            '⛔️ You have multiple css files with @stylez; please use only one.\n',
          );
          return;
        }
        if (!extractedRoot) {
          extractedRoot = await extractStylesFromFiles(patterns);
          process.stdout.write('✅ Styles extracted\n');
        }

        extractedRoot.walkRules((extractedRule) => {
          let selectorFound = false;

          root.walkRules((existingRule) => {
            const isSelector = existingRule.selector === extractedRule.selector;

            if (isSelector) {
              selectorFound = true;
            }

            const isRoot =
              existingRule.selector === ':root' &&
              extractedRule.nodes.length > existingRule.nodes.length;

            if (isRoot) {
              root.prepend(extractedRule);
              if (selectorFound) return;
              saving(root, atRule.source!.input.file!);
            }
          });

          if (!selectorFound) {
            root.append(extractedRule);
            saving(root, atRule.source!.input.file!);
          }
        });
      }

      if (runtime === 1 && atRule?.name === undefined) {
        process.stdout.write('⛔️ No CSS file found with at-rule: @stylez;\n');
        return;
      }
    },

    postcssPlugin: '@stylezjs/postcss-plugin',
  };
};

plugin.postcss = true;
export default plugin;
