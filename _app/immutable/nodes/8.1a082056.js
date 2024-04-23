import{s as ue,a as y,f as Y,c as C,g as q,r as J,i as p,d as f,l as G,m as Z,u as V}from"../chunks/scheduler.d5c18660.js";import{S as me,i as be,b as O,d as L,m as h,a as x,t as B,e as P}from"../chunks/index.3cf6da0a.js";import{C as X,j as pe}from"../chunks/json.8b9daa76.js";import{B as fe,T as ge}from"../chunks/Title.01f33e54.js";import{M as _e}from"../chunks/Miro.8133335a.js";const z="[A-Za-z$_][0-9A-Za-z$_]*",ee=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],te=["true","false","null","undefined","NaN","Infinity"],ne=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],ae=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],se=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],re=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],ie=[].concat(se,ne,ae);function Ee(a){const t=a.regex,s=(T,{after:M})=>{const k="</"+T[0].slice(1);return T.input.indexOf(k,M)!==-1},n=z,c={begin:"<>",end:"</>"},_=/<[A-Za-z0-9\\._:-]+\s*\/>/,E={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(T,M)=>{const k=T[0].length+T.index,K=T.input[k];if(K==="<"||K===","){M.ignoreMatch();return}K===">"&&(s(T,{after:k})||M.ignoreMatch());let W;const j=T.input.substring(k);if(W=j.match(/^\s*=/)){M.ignoreMatch();return}if((W=j.match(/^\s+extends\s+/))&&W.index===0){M.ignoreMatch();return}}},d={$pattern:z,keyword:ee,literal:te,built_in:ie,"variable.language":re},o="[0-9](_?[0-9])*",u=`\\.(${o})`,m="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",g={className:"number",variants:[{begin:`(\\b(${m})((${u})|\\.)?|(${u}))[eE][+-]?(${o})\\b`},{begin:`\\b(${m})\\b((${u})\\b|\\.)?|(${u})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},i={className:"subst",begin:"\\$\\{",end:"\\}",keywords:d,contains:[]},N={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[a.BACKSLASH_ESCAPE,i],subLanguage:"xml"}},b={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[a.BACKSLASH_ESCAPE,i],subLanguage:"css"}},l={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[a.BACKSLASH_ESCAPE,i],subLanguage:"graphql"}},S={className:"string",begin:"`",end:"`",contains:[a.BACKSLASH_ESCAPE,i]},w={className:"comment",variants:[a.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:n+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),a.C_BLOCK_COMMENT_MODE,a.C_LINE_COMMENT_MODE]},v=[a.APOS_STRING_MODE,a.QUOTE_STRING_MODE,N,b,l,S,{match:/\$\d+/},g];i.contains=v.concat({begin:/\{/,end:/\}/,keywords:d,contains:["self"].concat(v)});const $=[].concat(w,i.contains),R=$.concat([{begin:/\(/,end:/\)/,keywords:d,contains:["self"].concat($)}]),e={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:d,contains:R},r={variants:[{match:[/class/,/\s+/,n,/\s+/,/extends/,/\s+/,t.concat(n,"(",t.concat(/\./,n),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,n],scope:{1:"keyword",3:"title.class"}}]},I={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...ne,...ae]}},D={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},F={variants:[{match:[/function/,/\s+/,n,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[e],illegal:/%/},U={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function H(T){return t.concat("(?!",T.join("|"),")")}const oe={match:t.concat(/\b/,H([...se,"super","import"]),n,t.lookahead(/\(/)),className:"title.function",relevance:0},ce={begin:t.concat(/\./,t.lookahead(t.concat(n,/(?![0-9A-Za-z$_(])/))),end:n,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},le={match:[/get|set/,/\s+/,n,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},e]},Q="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+a.UNDERSCORE_IDENT_RE+")\\s*=>",de={match:[/const|var|let/,/\s+/,n,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(Q)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[e]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:d,exports:{PARAMS_CONTAINS:R,CLASS_REFERENCE:I},illegal:/#(?![$_A-z])/,contains:[a.SHEBANG({label:"shebang",binary:"node",relevance:5}),D,a.APOS_STRING_MODE,a.QUOTE_STRING_MODE,N,b,l,S,w,{match:/\$\d+/},g,I,{className:"attr",begin:n+t.lookahead(":"),relevance:0},de,{begin:"("+a.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[w,a.REGEXP_MODE,{className:"function",begin:Q,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:a.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:d,contains:R}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:c.begin,end:c.end},{match:_},{begin:E.begin,"on:begin":E.isTrulyOpeningTag,end:E.end}],subLanguage:"xml",contains:[{begin:E.begin,end:E.end,skip:!0,contains:["self"]}]}]},F,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+a.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[e,a.inherit(a.TITLE_MODE,{begin:n,className:"title.function"})]},{match:/\.\.\./,relevance:0},ce,{match:"\\$"+n,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[e]},oe,U,r,le,{match:/\$[(.]/}]}}function Se(a){const t=Ee(a),s=z,n=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],c={beginKeywords:"namespace",end:/\{/,excludeEnd:!0,contains:[t.exports.CLASS_REFERENCE]},_={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:n},contains:[t.exports.CLASS_REFERENCE]},E={className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/},d=["type","namespace","interface","public","private","protected","implements","declare","abstract","readonly","enum","override"],o={$pattern:z,keyword:ee.concat(d),literal:te,built_in:ie.concat(n),"variable.language":re},u={className:"meta",begin:"@"+s},m=(i,N,b)=>{const l=i.contains.findIndex(S=>S.label===N);if(l===-1)throw new Error("can not find mode to replace");i.contains.splice(l,1,b)};Object.assign(t.keywords,o),t.exports.PARAMS_CONTAINS.push(u),t.contains=t.contains.concat([u,c,_]),m(t,"shebang",a.SHEBANG()),m(t,"use_strict",E);const g=t.contains.find(i=>i.label==="func.def");return g.relevance=0,Object.assign(t,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),t}const Ae={name:"typescript",register:Se},$e=Ae;function Ne(a){const t=a.regex,s=/[\p{XID_Start}_]\p{XID_Continue}*/u,n=["and","as","assert","async","await","break","case","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","match","nonlocal|10","not","or","pass","raise","return","try","while","with","yield"],d={$pattern:/[A-Za-z]\w+|__\w+__/,keyword:n,built_in:["__import__","abs","all","any","ascii","bin","bool","breakpoint","bytearray","bytes","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","exec","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip"],literal:["__debug__","Ellipsis","False","None","NotImplemented","True"],type:["Any","Callable","Coroutine","Dict","List","Literal","Generic","Optional","Sequence","Set","Tuple","Type","Union"]},o={className:"meta",begin:/^(>>>|\.\.\.) /},u={className:"subst",begin:/\{/,end:/\}/,keywords:d,illegal:/#/},m={begin:/\{\{/,relevance:0},g={className:"string",contains:[a.BACKSLASH_ESCAPE],variants:[{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,end:/'''/,contains:[a.BACKSLASH_ESCAPE,o],relevance:10},{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,end:/"""/,contains:[a.BACKSLASH_ESCAPE,o],relevance:10},{begin:/([fF][rR]|[rR][fF]|[fF])'''/,end:/'''/,contains:[a.BACKSLASH_ESCAPE,o,m,u]},{begin:/([fF][rR]|[rR][fF]|[fF])"""/,end:/"""/,contains:[a.BACKSLASH_ESCAPE,o,m,u]},{begin:/([uU]|[rR])'/,end:/'/,relevance:10},{begin:/([uU]|[rR])"/,end:/"/,relevance:10},{begin:/([bB]|[bB][rR]|[rR][bB])'/,end:/'/},{begin:/([bB]|[bB][rR]|[rR][bB])"/,end:/"/},{begin:/([fF][rR]|[rR][fF]|[fF])'/,end:/'/,contains:[a.BACKSLASH_ESCAPE,m,u]},{begin:/([fF][rR]|[rR][fF]|[fF])"/,end:/"/,contains:[a.BACKSLASH_ESCAPE,m,u]},a.APOS_STRING_MODE,a.QUOTE_STRING_MODE]},i="[0-9](_?[0-9])*",N=`(\\b(${i}))?\\.(${i})|\\b(${i})\\.`,b=`\\b|${n.join("|")}`,l={className:"number",relevance:0,variants:[{begin:`(\\b(${i})|(${N}))[eE][+-]?(${i})[jJ]?(?=${b})`},{begin:`(${N})[jJ]?`},{begin:`\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${b})`},{begin:`\\b0[bB](_?[01])+[lL]?(?=${b})`},{begin:`\\b0[oO](_?[0-7])+[lL]?(?=${b})`},{begin:`\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${b})`},{begin:`\\b(${i})[jJ](?=${b})`}]},S={className:"comment",begin:t.lookahead(/# type:/),end:/$/,keywords:d,contains:[{begin:/# type:/},{begin:/#/,end:/\b\B/,endsWithParent:!0}]},A={className:"params",variants:[{className:"",begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:d,contains:["self",o,l,g,a.HASH_COMMENT_MODE]}]};return u.contains=[g,l,o],{name:"Python",aliases:["py","gyp","ipython"],unicodeRegex:!0,keywords:d,illegal:/(<\/|\?)|=>/,contains:[o,l,{begin:/\bself\b/},{beginKeywords:"if",relevance:0},g,S,a.HASH_COMMENT_MODE,{match:[/\bdef/,/\s+/,s],scope:{1:"keyword",3:"title.function"},contains:[A]},{variants:[{match:[/\bclass/,/\s+/,s,/\s*/,/\(\s*/,s,/\s*\)/]},{match:[/\bclass/,/\s+/,s]}],scope:{1:"keyword",3:"title.class",6:"title.class.inherited"}},{className:"meta",begin:/^[\t ]*@/,end:/(?=#)|$/,contains:[l,A,g]}]}}const Te={name:"python",register:Ne},Re=Te;function ye(a){let t;return{c(){t=G("How to build applications")},l(s){t=Z(s,"How to build applications")},m(s,n){p(s,t,n)},d(s){s&&f(t)}}}function Ce(a){let t=`
import foo from "./foo";

function bar(arg: string): boolean {
  return foo(bar)
}
`,s;return{c(){s=G(t)},l(n){s=Z(n,t)},m(n,c){p(n,s,c)},p:V,d(n){n&&f(s)}}}function ve(a){let t=`
from definition_tooling.converter import CamelCaseModel, DataProductDefinition
from pydantic import Field


class CurrentWeatherMetricRequest(CamelCaseModel):
    lat: float = Field(
        ...,
        title="Latitude",
        description="The latitude coordinate of the desired location",
        ge=-90.0,
        le=90.0,
        example=60.192059,
    )
    lon: float = Field(
        ...,
        title="Longitude",
        description="The longitude coordinate of the desired location",
        ge=-180.0,
        le=180.0,
        example=24.945831,
    )


class CurrentWeatherMetricResponse(CamelCaseModel):
    humidity: float = Field(..., title="Current relative air humidity in %", example=72)
    pressure: float = Field(..., title="Current air pressure in hPa", example=1007)
    # ...


DEFINITION = DataProductDefinition(
    title="Current weather in a given location",
    description="Common data points about the current weather with metric units in a given location. Simplified for example use, and not following industry standards.",
    request=CurrentWeatherMetricRequest,
    response=CurrentWeatherMetricResponse,
)
}
`,s;return{c(){s=G(t)},l(n){s=Z(n,t)},m(n,c){p(n,s,c)},p:V,d(n){n&&f(s)}}}function we(a){let t=`
{
  "jwks_uri": "https://example.com/.well-known/jwks.json",
  "logo_url": "https://example.com/favicon-32x32.png",
  "product_dataspace": "sandbox.ioxio-dataspace.com"
}
`,s;return{c(){s=G(t)},l(n){s=Z(n,t)},m(n,c){p(n,s,c)},p:V,d(n){n&&f(s)}}}function Ie(a){let t,s,n,c,_,E="This wonderful code fetches your data.",d,o,u,m,g,i,N=`You can define data products like this in <em>src/draft/Weather/Current/Metric.py</em> in the definitions
  repository.`,b,l,S,A,w="And then you can host this in <em>.well-known/product-passport/product-passport.json</em>:",v,$,R;return t=new fe({props:{path:a[0].path,route:a[0].route}}),n=new ge({props:{$$slots:{default:[ye]},$$scope:{ctx:a}}}),o=new X({props:{lang:$e,$$slots:{default:[Ce]},$$scope:{ctx:a}}}),m=new _e({props:{url:"https://miro.com/app/board/uXjVMANjO8Y=/"}}),l=new X({props:{lang:Re,lineNumbers:!0,$$slots:{default:[ve]},$$scope:{ctx:a}}}),$=new X({props:{lang:pe,$$slots:{default:[we]},$$scope:{ctx:a}}}),{c(){O(t.$$.fragment),s=y(),O(n.$$.fragment),c=y(),_=Y("p"),_.textContent=E,d=y(),O(o.$$.fragment),u=y(),O(m.$$.fragment),g=y(),i=Y("p"),i.innerHTML=N,b=y(),O(l.$$.fragment),S=y(),A=Y("p"),A.innerHTML=w,v=y(),O($.$$.fragment)},l(e){L(t.$$.fragment,e),s=C(e),L(n.$$.fragment,e),c=C(e),_=q(e,"P",{"data-svelte-h":!0}),J(_)!=="svelte-d7srsc"&&(_.textContent=E),d=C(e),L(o.$$.fragment,e),u=C(e),L(m.$$.fragment,e),g=C(e),i=q(e,"P",{"data-svelte-h":!0}),J(i)!=="svelte-1g4my1q"&&(i.innerHTML=N),b=C(e),L(l.$$.fragment,e),S=C(e),A=q(e,"P",{"data-svelte-h":!0}),J(A)!=="svelte-1eijzgr"&&(A.innerHTML=w),v=C(e),L($.$$.fragment,e)},m(e,r){h(t,e,r),p(e,s,r),h(n,e,r),p(e,c,r),p(e,_,r),p(e,d,r),h(o,e,r),p(e,u,r),h(m,e,r),p(e,g,r),p(e,i,r),p(e,b,r),h(l,e,r),p(e,S,r),p(e,A,r),p(e,v,r),h($,e,r),R=!0},p(e,[r]){const I={};r&1&&(I.path=e[0].path),r&1&&(I.route=e[0].route),t.$set(I);const D={};r&2&&(D.$$scope={dirty:r,ctx:e}),n.$set(D);const F={};r&2&&(F.$$scope={dirty:r,ctx:e}),o.$set(F);const U={};r&2&&(U.$$scope={dirty:r,ctx:e}),l.$set(U);const H={};r&2&&(H.$$scope={dirty:r,ctx:e}),$.$set(H)},i(e){R||(x(t.$$.fragment,e),x(n.$$.fragment,e),x(o.$$.fragment,e),x(m.$$.fragment,e),x(l.$$.fragment,e),x($.$$.fragment,e),R=!0)},o(e){B(t.$$.fragment,e),B(n.$$.fragment,e),B(o.$$.fragment,e),B(m.$$.fragment,e),B(l.$$.fragment,e),B($.$$.fragment,e),R=!1},d(e){e&&(f(s),f(c),f(_),f(d),f(u),f(g),f(i),f(b),f(S),f(A),f(v)),P(t,e),P(n,e),P(o,e),P(m,e),P(l,e),P($,e)}}}function Me(a,t,s){let{data:n}=t;return a.$$set=c=>{"data"in c&&s(0,n=c.data)},[n]}class Pe extends me{constructor(t){super(),be(this,t,Me,Ie,ue,{data:0})}}export{Pe as component};
