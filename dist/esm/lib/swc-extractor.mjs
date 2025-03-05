import S from "node:fs/promises";
import w from "@swc/core";
import A from "fast-glob";
import y from "postcss";
import m from "./generate-id.mjs";
import I from "./sorted-rules.mjs";
const { glob: z } = A, c = [], v = y.rule({ selector: ":root" });
let b = "stylez";
async function $(j) {
  const g = await z(j), f = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set();
  for (const p of g) {
    let i = function(e) {
      if (!(!e || typeof e != "object")) {
        if (e.type === "ImportDeclaration" && e.source.value === "@stylezjs/stylez" && Array.isArray(e.specifiers))
          for (const s of e.specifiers)
            (s.type === "ImportDefaultSpecifier" || s.type === "ImportNamespaceSpecifier") && (b = s.local.value);
        if (e.type === "CallExpression" && e.callee && e.callee.type === "MemberExpression" && e.callee.object && e.callee.object.type === "Identifier" && e.callee.object.value === b && e.callee.property && e.callee.property.type === "Identifier" && e.callee.property.value === "create") {
          const r = e.arguments && e.arguments[0];
          if (r && r.expression.type === "ObjectExpression") {
            for (const t of r.expression.properties)
              if (t.type === "KeyValueProperty" && t.key && t.key.type === "Identifier" && t.value && t.value.type === "StringLiteral" || t.value.type === "NumericLiteral") {
                const o = m(t.value.value, "--z");
                f.has(o) || (f.add(o), v.append({ prop: o, value: t.value.value }));
                const h = t.key.value.replace(
                  /([A-Z])/g,
                  (a) => `-${a.toLowerCase()}`
                ), l = m(
                  JSON.stringify({ [t.key.value]: t.value.value }),
                  "z_"
                );
                if (!u.has(l)) {
                  u.add(l);
                  const a = y.rule({ selector: `.${l}` });
                  a.append({ prop: h, value: `var(${o})` }), c.push(a);
                }
              }
          }
        }
        for (const s in e)
          if (Object.prototype.hasOwnProperty.call(e, s)) {
            const r = e[s];
            Array.isArray(r) ? r.forEach(i) : r && typeof r == "object" && i(r);
          }
      }
    };
    const k = await S.readFile(p, "utf8"), x = w.parseSync(k, {
      syntax: "typescript",
      tsx: !0
    });
    i(x);
  }
  const n = y.root();
  return c.push(v), I(c).forEach((p) => n.append(p)), n;
}
export {
  $ as extractStylesFromFiles
};
