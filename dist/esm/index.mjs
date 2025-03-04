import u from "./lib/saving.mjs";
import { extractStylesFromFiles as p } from "./lib/swc-extractor.mjs";
const f = ({ patterns: c }) => {
  let o = "", n = 0, r = 0;
  return {
    async Once(e) {
      n++;
      const s = e.first;
      if (s?.name === "stylez") {
        if (r++, r > 1) {
          process.stdout.write(
            `⛔️ You have multiple css files with @stylez; please use only one.
`
          );
          return;
        }
        o || (o = await p(c), process.stdout.write(`✅ Styles extracted
`)), o.walkRules((t) => {
          let l = !1;
          e.walkRules((i) => {
            if (i.selector === t.selector && (l = !0), i.selector === ":root" && t.nodes.length > i.nodes.length) {
              if (e.prepend(t), l) return;
              u(e, s.source.input.file);
            }
          }), l || (e.append(t), u(e, s.source.input.file));
        });
      }
      if (n === 1 && s?.name === void 0) {
        process.stdout.write(`⛔️ No CSS file found with at-rule: @stylez;
`);
        return;
      }
    },
    postcssPlugin: "@stylezjs/postcss-plugin"
  };
};
f.postcss = !0;
export {
  f as default
};
