const o = (r) => [
  r.sort((t, e) => t.selector === ":root" ? -1 : e.selector === ":root" ? 1 : 0)
];
export {
  o as default
};
