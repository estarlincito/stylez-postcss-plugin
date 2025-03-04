import e from "autoprefixer";
import i from "cssnano";
import { writeFileSync as m } from "fs";
import n from "postcss";
const l = (o, s) => {
  n([e, i]).process(o, {
    from: void 0
  }).then((t) => {
    const r = `@stylez;

${t.css}`;
    m(s, r);
  }), process.stdout.write(`✅ Styles saved
`);
};
export {
  l as default
};
