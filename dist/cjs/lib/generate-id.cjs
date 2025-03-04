"use strict";const r=require("crypto"),s=(e,t)=>`${t}${r.createHash("md5").update(`stylez${e}`).digest("hex").slice(0,8)}`;module.exports=s;
