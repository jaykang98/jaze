/*! For license information please see 220.901f73fe.chunk.js.LICENSE.txt */
(self.webpackChunkjaze=self.webpackChunkjaze||[]).push([[220],{8220:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var n=r(5043),i=r(3274),s=r(697),c=r(2301),o=r(579);const l=()=>{const{setTitle:e}=(0,i.B)();(0,c.J)("album","DAMN.");return(0,n.useEffect)((()=>{e("Test Bench")}),[e]),(0,o.jsx)(s.A,{title:"Settings",viewFrames:[{content:(0,o.jsx)(o.Fragment,{}),viewWidth:100}]})}},697:(e,t,r)=>{"use strict";r.d(t,{A:()=>f});var n=r(5043),i=r(8139),s=r.n(i);const c="ViewFrame_viewFrame__ZU2oo",o="ViewFrame_empty__6Vyig",l={viewSection:"ViewSection_viewSection__lYpQo"};var a=r(579);const u=e=>{let{children:t,style:r}=e;const i=0===n.Children.count(t)?l.viewSectionEmpty:l.viewSection;return(0,a.jsx)("div",{className:i,style:r,children:t})},d=e=>{let{children:t,splitPercentage:r=100}=e;const i=(0,n.useRef)(null),[l,d]=(0,n.useState)(r),[f,h]=n.Children.toArray(t).slice(0,2),v=(e=>{const t=n.Children.toArray(e);return 0===t.length||t.every((e=>n.isValidElement(e)&&e.type===n.Fragment&&0===n.Children.count(e.props.children)))})([f,h]),p=()=>{if(i.current){const e=i.current.offsetWidth,t=0,n=1800;let s=Math.max(t,Math.min(n,e*(r/100)))/e*100;d(s)}};return(0,n.useEffect)((()=>(p(),window.addEventListener("resize",p),()=>window.removeEventListener("resize",p))),[r]),(0,a.jsxs)("div",{ref:i,className:s()(c,{[o]:v}),children:[(0,a.jsx)(u,{style:{width:"".concat(l,"%")},children:f}),(0,a.jsx)(u,{style:{width:"".concat(100-l,"%")},children:h})]})},f=e=>{let{viewFrames:t}=e;const r=(100-t.reduce(((e,t)=>{let{viewWidth:r}=t;return e+(r||0)}),0))/t.filter((e=>{let{viewWidth:t}=e;return void 0===t})).length;return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("section",{style:{display:"flex",flexDirection:"row"},children:t.map(((e,t)=>(0,a.jsx)(d,{splitPercentage:e.viewWidth||r,children:e.content},t)))})})}},2301:(e,t,r)=>{"use strict";r.d(t,{J:()=>i});var n=r(3819);const i=async(e,t)=>{const{fetchSpotifyData:r}=(0,n.v)();return await r(e,t)}},8139:(e,t)=>{var r;!function(){"use strict";var n={}.hasOwnProperty;function i(){for(var e="",t=0;t<arguments.length;t++){var r=arguments[t];r&&(e=c(e,s(r)))}return e}function s(e){if("string"===typeof e||"number"===typeof e)return e;if("object"!==typeof e)return"";if(Array.isArray(e))return i.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var t="";for(var r in e)n.call(e,r)&&e[r]&&(t=c(t,r));return t}function c(e,t){return t?e?e+" "+t:e+t:e}e.exports?(i.default=i,e.exports=i):void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r)}()}}]);
//# sourceMappingURL=220.901f73fe.chunk.js.map