import{s as A,f,g as d,h as C,d as u,j as m,i as p,u as v,B as M,l as P,a as w,m as x,c as B,r as X,w as I,M as y,n as H}from"./scheduler.d5c18660.js";import{S as D,i as N}from"./index.3cf6da0a.js";/* empty css                                                  */function E(o){return(o==null?void 0:o.length)!==void 0?o:Array.from(o)}const L=[{route:"consent-configuration",name:"consent-configuration.json"},{route:"consent-request-token",name:"Consent request token"},{route:"consent-token",name:"Consent token"},{route:"dataspace-configuration",name:"dataspace-configuration.json"},{route:"party-configuration",name:"party-configuration.json"}];function O(o,s,a){const t=o.slice();return t[7]=s[a],t[9]=a,t}function S(o){let s,a,t=o[7].name+"",n,c,e,l="/";return{c(){s=f("span"),a=f("a"),n=P(t),c=w(),e=f("span"),e.textContent=l,this.h()},l(r){s=d(r,"SPAN",{class:!0});var h=C(s);a=d(h,"A",{href:!0});var i=C(a);n=x(i,t),i.forEach(u),h.forEach(u),c=B(r),e=d(r,"SPAN",{class:!0,"data-svelte-h":!0}),X(e)!=="svelte-1ofwb3u"&&(e.textContent=l),this.h()},h(){m(a,"href",o[7].link),m(s,"class","breadcrumb"),m(e,"class","sep svelte-16gl9f1")},m(r,h){p(r,s,h),I(s,a),I(a,n),p(r,c,h),p(r,e,h)},p:v,d(r){r&&(u(s),u(c),u(e))}}}function U(o){let s,a=E(o[0]),t=[];for(let n=0;n<a.length;n+=1)t[n]=S(O(o,a,n));return{c(){s=f("div");for(let n=0;n<t.length;n+=1)t[n].c();this.h()},l(n){s=d(n,"DIV",{class:!0});var c=C(s);for(let e=0;e<t.length;e+=1)t[e].l(c);c.forEach(u),this.h()},h(){m(s,"class","breadcrumbs")},m(n,c){p(n,s,c);for(let e=0;e<t.length;e+=1)t[e]&&t[e].m(s,null)},p(n,[c]){if(c&1){a=E(n[0]);let e;for(e=0;e<a.length;e+=1){const l=O(n,a,e);t[e]?t[e].p(l,c):(t[e]=S(l),t[e].c(),t[e].m(s,null))}for(;e<t.length;e+=1)t[e].d(1);t.length=a.length}},i:v,o:v,d(n){n&&u(s),M(t,n)}}}function V(o){return o.length===1&&o[0]===""?"/":`${o.join("/")}/`}function F(o,s,a){let{path:t="/"}=s,{route:n="/"}=s;const c=t.replace(/\/$/,""),e=n.replace(/\/$/,""),l={"":{name:"Docs",children:{test:{name:"Test..."},tags:{name:"IOXIO Tags™",children:{metadata:{name:"Metadata"},signatures:{name:"Signatures"}}},schemas:{name:"Schemas",children:{"[schema]":{name(){const i=c.split("/").pop();return L.find(j=>j.route===i).name}}}}}}};function r(){const i=[],_=c.split("/"),j=e.split("/");let T=l;for(let g=0;g<_.length;g++){let b=_[g];if(T[b]===void 0&&(b=j[g],T[b]===void 0))return console.log(`Couldn't find ${b} in tree`),[{name:"Unknown",link:"/"}];const k=T[b],q=typeof k.name=="function"?k.name():k.name,z=_.slice(0,g+1);i.push({name:q,link:V(z)}),T=k.children}return i}const h=r();return o.$$set=i=>{"path"in i&&a(1,t=i.path),"route"in i&&a(2,n=i.route)},[h,t,n]}class W extends D{constructor(s){super(),N(this,s,F,U,A,{path:1,route:2})}}function G(o){let s,a,t,n,c;return document.title=s=o[0]+" - IOXIO Docs",{c(){a=f("meta"),t=w(),n=f("h1"),c=P(o[0]),this.h()},l(e){const l=y("svelte-1bze8jb",document.head);a=d(l,"META",{property:!0,content:!0}),l.forEach(u),t=B(e),n=d(e,"H1",{});var r=C(n);c=x(r,o[0]),r.forEach(u),this.h()},h(){m(a,"property","og:title"),m(a,"content",o[0])},m(e,l){I(document.head,a),p(e,t,l),p(e,n,l),I(n,c)},p(e,[l]){l&1&&s!==(s=e[0]+" - IOXIO Docs")&&(document.title=s),l&1&&m(a,"content",e[0]),l&1&&H(c,e[0])},i:v,o:v,d(e){e&&(u(t),u(n)),u(a)}}}function J(o,s,a){let{title:t=""}=s;return o.$$set=n=>{"title"in n&&a(0,t=n.title)},[t]}class Y extends D{constructor(s){super(),N(this,s,J,G,A,{title:0})}}export{W as B,Y as T,E as e,L as s};
