"use strict";const c=require("./lib/saving.cjs"),a=require("./lib/swc-extractor.cjs"),u=({patterns:p})=>{let l="",r=0,n=0;return{async Once(e){r++;const s=e.first;if(s?.name==="stylez"){if(n++,n>1){process.stdout.write(`⛔️ You have multiple css files with @stylez; please use only one.
`);return}l||(l=await a.extractStylesFromFiles(p),process.stdout.write(`✅ Styles extracted
`)),l.walkRules(t=>{let i=!1;e.walkRules(o=>{if(o.selector===t.selector&&(i=!0),o.selector===":root"&&t.nodes.length>o.nodes.length){if(e.prepend(t),i)return;c(e,s.source.input.file)}}),i||(e.append(t),c(e,s.source.input.file))})}if(r===1&&s?.name===void 0){process.stdout.write(`⛔️ No CSS file found with at-rule: @stylez;
`);return}},postcssPlugin:"@stylezjs/postcss-plugin"}};u.postcss=!0;module.exports=u;
