"use strict";const o=require("autoprefixer"),c=require("cssnano"),n=require("fs"),i=require("postcss"),u=(s,e)=>{i([o,c]).process(s,{from:void 0}).then(t=>{const r=`@stylez;

${t.css}`;n.writeFileSync(e,r)}),process.stdout.write(`✅ Styles saved
`)};module.exports=u;
