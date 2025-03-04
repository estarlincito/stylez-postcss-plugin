import r from "crypto";
const s = (e, t) => `${t}${r.createHash("md5").update(`stylez${e}`).digest("hex").slice(0, 8)}`;
export {
  s as default
};
