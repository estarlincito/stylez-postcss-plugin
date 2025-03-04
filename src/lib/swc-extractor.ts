import fs from 'node:fs/promises';

import swc from '@swc/core';
import pkg from 'fast-glob';
import postcss from 'postcss';

import type { Node } from '../types/index.js';
import generateID from './generate-id.js';
import sortedRules from './sorted-rules.js';

const { glob } = pkg;

const styles: postcss.Rule[] = [];

const rootRule = postcss.rule({ selector: ':root' });

// Default alias in case the import isn't renamed.
let stylezAlias = 'stylez';

export async function extractStylesFromFiles(patterns: string[]) {
  const files = await glob(patterns);
  const vars = new Set();
  const atomkeys = new Set();

  for (const file of files) {
    const code = await fs.readFile(file, 'utf8');

    const ast = swc.parseSync(code, {
      syntax: 'typescript',
      tsx: true,
    });

    // Recursive visitor to traverse the SWC AST.
    function visit(node: Node): void {
      if (!node || typeof node !== 'object') return;

      // Detect import of '@stylezjs/stylez' to capture the alias.
      if (
        node.type === 'ImportDeclaration' &&
        node.source.value === '@stylezjs/stylez'
      ) {
        if (Array.isArray(node.specifiers)) {
          for (const spec of node.specifiers) {
            if (
              spec.type === 'ImportDefaultSpecifier' ||
              spec.type === 'ImportNamespaceSpecifier'
            ) {
              stylezAlias = spec.local.value;
            }
          }
        }
      }

      // Detect calls to stylezAlias.create(...)
      if (node.type === 'CallExpression') {
        const isCreate =
          node.callee &&
          node.callee.type === 'MemberExpression' &&
          node.callee.object &&
          node.callee.object.type === 'Identifier' &&
          node.callee.object.value === stylezAlias &&
          node.callee.property &&
          node.callee.property.type === 'Identifier' &&
          node.callee.property.value === 'create';

        if (isCreate) {
          const styleArg = node.arguments && node.arguments[0];

          // Process the arguments to stylez.create({...})
          const isObj =
            styleArg && styleArg.expression.type === 'ObjectExpression';

          if (isObj) {
            for (const prop of styleArg.expression.properties) {
              const isProp =
                prop.type === 'KeyValueProperty' &&
                prop.key &&
                prop.key.type === 'Identifier' &&
                prop.value &&
                prop.value.type === 'StringLiteral';

              if (isProp) {
                //generating :root var
                const varkey = generateID(prop.value.value, '--z');

                if (!vars.has(varkey)) {
                  vars.add(varkey);
                  rootRule.append({ prop: varkey, value: prop.value.value });
                }

                //generating atomkey
                const propKey = prop.key.value.replace(
                  /([A-Z])/g,
                  (m: string) => `-${m.toLowerCase()}`,
                );

                const atomkey = generateID(
                  JSON.stringify({ [prop.key.value]: prop.value.value }),
                  'z_',
                );

                if (!atomkeys.has(atomkey)) {
                  atomkeys.add(atomkey);
                  const atom = postcss.rule({ selector: `.${atomkey}` });
                  atom.append({ prop: propKey, value: `var(${varkey})` });
                  styles.push(atom);
                }
              }
            }
          }
        }
      }

      for (const key in node) {
        if (Object.prototype.hasOwnProperty.call(node, key)) {
          const child = node[key as never] as [];
          if (Array.isArray(child)) {
            child.forEach(visit);
          } else if (child && typeof child === 'object') {
            visit(child);
          }
        }
      }
    }

    visit(ast as never);
  }

  const root = postcss.root();

  styles.push(rootRule);

  sortedRules(styles).forEach((rule) => root.append(rule));

  return root;
}
