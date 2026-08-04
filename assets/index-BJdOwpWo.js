(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Wu(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const be={},hr=[],ri=()=>{},Ap=()=>!1,ol=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Xu=n=>n.startsWith("onUpdate:"),tn=Object.assign,Yu=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},Y0=Object.prototype.hasOwnProperty,ue=(n,t)=>Y0.call(n,t),Zt=Array.isArray,dr=n=>Ao(n)==="[object Map]",Rp=n=>Ao(n)==="[object Set]",$f=n=>Ao(n)==="[object Date]",te=n=>typeof n=="function",Ne=n=>typeof n=="string",ai=n=>typeof n=="symbol",me=n=>n!==null&&typeof n=="object",Cp=n=>(me(n)||te(n))&&te(n.then)&&te(n.catch),Pp=Object.prototype.toString,Ao=n=>Pp.call(n),q0=n=>Ao(n).slice(8,-1),Dp=n=>Ao(n)==="[object Object]",qu=n=>Ne(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,io=Wu(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),al=n=>{const t=Object.create(null);return(e=>t[e]||(t[e]=n(e)))},$0=/-\w/g,On=al(n=>n.replace($0,t=>t.slice(1).toUpperCase())),K0=/\B([A-Z])/g,Rs=al(n=>n.replace(K0,"-$1").toLowerCase()),Lp=al(n=>n.charAt(0).toUpperCase()+n.slice(1)),Ml=al(n=>n?`on${Lp(n)}`:""),ni=(n,t)=>!Object.is(n,t),Sl=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},Ip=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},Z0=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let Kf;const ll=()=>Kf||(Kf=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function $u(n){if(Zt(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=Ne(i)?tg(i):$u(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(Ne(n)||me(n))return n}const J0=/;(?![^(]*\))/g,j0=/:([^]+)/,Q0=/\/\*[^]*?\*\//g;function tg(n){const t={};return n.replace(Q0,"").split(J0).forEach(e=>{if(e){const i=e.split(j0);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Ku(n){let t="";if(Ne(n))t=n;else if(Zt(n))for(let e=0;e<n.length;e++){const i=Ku(n[e]);i&&(t+=i+" ")}else if(me(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const eg="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",ng=Wu(eg);function Up(n){return!!n||n===""}function ig(n,t){if(n.length!==t.length)return!1;let e=!0;for(let i=0;e&&i<n.length;i++)e=Zu(n[i],t[i]);return e}function Zu(n,t){if(n===t)return!0;let e=$f(n),i=$f(t);if(e||i)return e&&i?n.getTime()===t.getTime():!1;if(e=ai(n),i=ai(t),e||i)return n===t;if(e=Zt(n),i=Zt(t),e||i)return e&&i?ig(n,t):!1;if(e=me(n),i=me(t),e||i){if(!e||!i)return!1;const s=Object.keys(n).length,r=Object.keys(t).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=t.hasOwnProperty(o);if(a&&!l||!a&&l||!Zu(n[o],t[o]))return!1}}return String(n)===String(t)}const Np=n=>!!(n&&n.__v_isRef===!0),nn=n=>Ne(n)?n:n==null?"":Zt(n)||me(n)&&(n.toString===Pp||!te(n.toString))?Np(n)?nn(n.value):JSON.stringify(n,Fp,2):String(n),Fp=(n,t)=>Np(t)?Fp(n,t.value):dr(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[yl(i,r)+" =>"]=s,e),{})}:Rp(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>yl(e))}:ai(t)?yl(t):me(t)&&!Zt(t)&&!Dp(t)?String(t):t,yl=(n,t="")=>{var e;return ai(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let fn;class sg{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=fn,!t&&fn&&(this.index=(fn.scopes||(fn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=fn;try{return fn=this,t()}finally{fn=e}}}on(){++this._on===1&&(this.prevScope=fn,fn=this)}off(){this._on>0&&--this._on===0&&(fn=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,i=this.scopes.length;e<i;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function rg(){return fn}let ye;const bl=new WeakSet;class Op{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,fn&&fn.active&&fn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,bl.has(this)&&(bl.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||zp(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Zf(this),Hp(this);const t=ye,e=Bn;ye=this,Bn=!0;try{return this.fn()}finally{Gp(this),ye=t,Bn=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Qu(t);this.deps=this.depsTail=void 0,Zf(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?bl.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){wc(this)&&this.run()}get dirty(){return wc(this)}}let Bp=0,so,ro;function zp(n,t=!1){if(n.flags|=8,t){n.next=ro,ro=n;return}n.next=so,so=n}function Ju(){Bp++}function ju(){if(--Bp>0)return;if(ro){let t=ro;for(ro=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;so;){let t=so;for(so=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function Hp(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Gp(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),Qu(i),og(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function wc(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Vp(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function Vp(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===po)||(n.globalVersion=po,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!wc(n))))return;n.flags|=2;const t=n.dep,e=ye,i=Bn;ye=n,Bn=!0;try{Hp(n);const s=n.fn(n._value);(t.version===0||ni(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{ye=e,Bn=i,Gp(n),n.flags&=-3}}function Qu(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)Qu(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function og(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let Bn=!0;const kp=[];function Di(){kp.push(Bn),Bn=!1}function Li(){const n=kp.pop();Bn=n===void 0?!0:n}function Zf(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=ye;ye=void 0;try{t()}finally{ye=e}}}let po=0;class ag{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class tf{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!ye||!Bn||ye===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==ye)e=this.activeLink=new ag(ye,this),ye.deps?(e.prevDep=ye.depsTail,ye.depsTail.nextDep=e,ye.depsTail=e):ye.deps=ye.depsTail=e,Wp(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=ye.depsTail,e.nextDep=void 0,ye.depsTail.nextDep=e,ye.depsTail=e,ye.deps===e&&(ye.deps=i)}return e}trigger(t){this.version++,po++,this.notify(t)}notify(t){Ju();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{ju()}}}function Wp(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)Wp(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const Ac=new WeakMap,Ss=Symbol(""),Rc=Symbol(""),mo=Symbol("");function Ze(n,t,e){if(Bn&&ye){let i=Ac.get(n);i||Ac.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new tf),s.map=i,s.key=e),s.track()}}function Ei(n,t,e,i,s,r){const o=Ac.get(n);if(!o){po++;return}const a=l=>{l&&l.trigger()};if(Ju(),t==="clear")o.forEach(a);else{const l=Zt(n),c=l&&qu(e);if(l&&e==="length"){const u=Number(i);o.forEach((f,h)=>{(h==="length"||h===mo||!ai(h)&&h>=u)&&a(f)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(mo)),t){case"add":l?c&&a(o.get("length")):(a(o.get(Ss)),dr(n)&&a(o.get(Rc)));break;case"delete":l||(a(o.get(Ss)),dr(n)&&a(o.get(Rc)));break;case"set":dr(n)&&a(o.get(Ss));break}}ju()}function Is(n){const t=ce(n);return t===n?t:(Ze(t,"iterate",mo),An(n)?t:t.map(Hn))}function cl(n){return Ze(n=ce(n),"iterate",mo),n}function jn(n,t){return Ii(n)?Sr(ys(n)?Hn(t):t):Hn(t)}const lg={__proto__:null,[Symbol.iterator](){return El(this,Symbol.iterator,n=>jn(this,n))},concat(...n){return Is(this).concat(...n.map(t=>Zt(t)?Is(t):t))},entries(){return El(this,"entries",n=>(n[1]=jn(this,n[1]),n))},every(n,t){return di(this,"every",n,t,void 0,arguments)},filter(n,t){return di(this,"filter",n,t,e=>e.map(i=>jn(this,i)),arguments)},find(n,t){return di(this,"find",n,t,e=>jn(this,e),arguments)},findIndex(n,t){return di(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return di(this,"findLast",n,t,e=>jn(this,e),arguments)},findLastIndex(n,t){return di(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return di(this,"forEach",n,t,void 0,arguments)},includes(...n){return Tl(this,"includes",n)},indexOf(...n){return Tl(this,"indexOf",n)},join(n){return Is(this).join(n)},lastIndexOf(...n){return Tl(this,"lastIndexOf",n)},map(n,t){return di(this,"map",n,t,void 0,arguments)},pop(){return Nr(this,"pop")},push(...n){return Nr(this,"push",n)},reduce(n,...t){return Jf(this,"reduce",n,t)},reduceRight(n,...t){return Jf(this,"reduceRight",n,t)},shift(){return Nr(this,"shift")},some(n,t){return di(this,"some",n,t,void 0,arguments)},splice(...n){return Nr(this,"splice",n)},toReversed(){return Is(this).toReversed()},toSorted(n){return Is(this).toSorted(n)},toSpliced(...n){return Is(this).toSpliced(...n)},unshift(...n){return Nr(this,"unshift",n)},values(){return El(this,"values",n=>jn(this,n))}};function El(n,t,e){const i=cl(n),s=i[t]();return i!==n&&!An(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=e(r.value)),r}),s}const cg=Array.prototype;function di(n,t,e,i,s,r){const o=cl(n),a=o!==n&&!An(n),l=o[t];if(l!==cg[t]){const f=l.apply(n,r);return a?Hn(f):f}let c=e;o!==n&&(a?c=function(f,h){return e.call(this,jn(n,f),h,n)}:e.length>2&&(c=function(f,h){return e.call(this,f,h,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function Jf(n,t,e,i){const s=cl(n),r=s!==n&&!An(n);let o=e,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,f){return a&&(a=!1,c=jn(n,c)),e.call(this,c,jn(n,u),f,n)}):e.length>3&&(o=function(c,u,f){return e.call(this,c,u,f,n)}));const l=s[t](o,...i);return a?jn(n,l):l}function Tl(n,t,e){const i=ce(n);Ze(i,"iterate",mo);const s=i[t](...e);return(s===-1||s===!1)&&rf(e[0])?(e[0]=ce(e[0]),i[t](...e)):s}function Nr(n,t,e=[]){Di(),Ju();const i=ce(n)[t].apply(n,e);return ju(),Li(),i}const ug=Wu("__proto__,__v_isRef,__isVue"),Xp=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(ai));function fg(n){ai(n)||(n=String(n));const t=ce(this);return Ze(t,"has",n),t.hasOwnProperty(n)}class Yp{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?Sg:Zp:r?Kp:$p).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Zt(t);if(!s){let l;if(o&&(l=lg[e]))return l;if(e==="hasOwnProperty")return fg}const a=Reflect.get(t,e,je(t)?t:i);if((ai(e)?Xp.has(e):ug(e))||(s||Ze(t,"get",e),r))return a;if(je(a)){const l=o&&qu(e)?a:a.value;return s&&me(l)?Pc(l):l}return me(a)?s?Pc(a):nf(a):a}}class qp extends Yp{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];const o=Zt(t)&&qu(e);if(!this._isShallow){const c=Ii(r);if(!An(i)&&!Ii(i)&&(r=ce(r),i=ce(i)),!o&&je(r)&&!je(i))return c||(r.value=i),!0}const a=o?Number(e)<t.length:ue(t,e),l=Reflect.set(t,e,i,je(t)?t:s);return t===ce(s)&&(a?ni(i,r)&&Ei(t,"set",e,i):Ei(t,"add",e,i)),l}deleteProperty(t,e){const i=ue(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&Ei(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!ai(e)||!Xp.has(e))&&Ze(t,"has",e),i}ownKeys(t){return Ze(t,"iterate",Zt(t)?"length":Ss),Reflect.ownKeys(t)}}class hg extends Yp{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const dg=new qp,pg=new hg,mg=new qp(!0);const Cc=n=>n,Io=n=>Reflect.getPrototypeOf(n);function gg(n,t,e){return function(...i){const s=this.__v_raw,r=ce(s),o=dr(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?Cc:t?Sr:Hn;return!t&&Ze(r,"iterate",l?Rc:Ss),tn(Object.create(c),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}}})}}function Uo(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function _g(n,t){const e={get(s){const r=this.__v_raw,o=ce(r),a=ce(s);n||(ni(s,a)&&Ze(o,"get",s),Ze(o,"get",a));const{has:l}=Io(o),c=t?Cc:n?Sr:Hn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Ze(ce(s),"iterate",Ss),s.size},has(s){const r=this.__v_raw,o=ce(r),a=ce(s);return n||(ni(s,a)&&Ze(o,"has",s),Ze(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=ce(a),c=t?Cc:n?Sr:Hn;return!n&&Ze(l,"iterate",Ss),a.forEach((u,f)=>s.call(r,c(u),c(f),o))}};return tn(e,n?{add:Uo("add"),set:Uo("set"),delete:Uo("delete"),clear:Uo("clear")}:{add(s){const r=ce(this),o=Io(r),a=ce(s),l=!t&&!An(s)&&!Ii(s)?a:s;return o.has.call(r,l)||ni(s,l)&&o.has.call(r,s)||ni(a,l)&&o.has.call(r,a)||(r.add(l),Ei(r,"add",l,l)),this},set(s,r){!t&&!An(r)&&!Ii(r)&&(r=ce(r));const o=ce(this),{has:a,get:l}=Io(o);let c=a.call(o,s);c||(s=ce(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?ni(r,u)&&Ei(o,"set",s,r):Ei(o,"add",s,r),this},delete(s){const r=ce(this),{has:o,get:a}=Io(r);let l=o.call(r,s);l||(s=ce(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&Ei(r,"delete",s,void 0),c},clear(){const s=ce(this),r=s.size!==0,o=s.clear();return r&&Ei(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=gg(s,n,t)}),e}function ef(n,t){const e=_g(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(ue(e,s)&&s in i?e:i,s,r)}const xg={get:ef(!1,!1)},vg={get:ef(!1,!0)},Mg={get:ef(!0,!1)};const $p=new WeakMap,Kp=new WeakMap,Zp=new WeakMap,Sg=new WeakMap;function yg(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function bg(n){return n.__v_skip||!Object.isExtensible(n)?0:yg(q0(n))}function nf(n){return Ii(n)?n:sf(n,!1,dg,xg,$p)}function Eg(n){return sf(n,!1,mg,vg,Kp)}function Pc(n){return sf(n,!0,pg,Mg,Zp)}function sf(n,t,e,i,s){if(!me(n)||n.__v_raw&&!(t&&n.__v_isReactive))return n;const r=bg(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:e);return s.set(n,a),a}function ys(n){return Ii(n)?ys(n.__v_raw):!!(n&&n.__v_isReactive)}function Ii(n){return!!(n&&n.__v_isReadonly)}function An(n){return!!(n&&n.__v_isShallow)}function rf(n){return n?!!n.__v_raw:!1}function ce(n){const t=n&&n.__v_raw;return t?ce(t):n}function Tg(n){return!ue(n,"__v_skip")&&Object.isExtensible(n)&&Ip(n,"__v_skip",!0),n}const Hn=n=>me(n)?nf(n):n,Sr=n=>me(n)?Pc(n):n;function je(n){return n?n.__v_isRef===!0:!1}function wa(n){return wg(n,!1)}function wg(n,t){return je(n)?n:new Ag(n,t)}class Ag{constructor(t,e){this.dep=new tf,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:ce(t),this._value=e?t:Hn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||An(t)||Ii(t);t=i?t:ce(t),ni(t,e)&&(this._rawValue=t,this._value=i?t:Hn(t),this.dep.trigger())}}function Rg(n){return je(n)?n.value:n}const Cg={get:(n,t,e)=>t==="__v_raw"?n:Rg(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return je(s)&&!je(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function Jp(n){return ys(n)?n:new Proxy(n,Cg)}class Pg{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new tf(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=po-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&ye!==this)return zp(this,!0),!0}get value(){const t=this.dep.track();return Vp(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Dg(n,t,e=!1){let i,s;return te(n)?i=n:(i=n.get,s=n.set),new Pg(i,s,e)}const No={},Ha=new WeakMap;let gs;function Lg(n,t=!1,e=gs){if(e){let i=Ha.get(e);i||Ha.set(e,i=[]),i.push(n)}}function Ig(n,t,e=be){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=M=>s?M:An(M)||s===!1||s===0?ts(M,1):ts(M);let u,f,h,d,g=!1,x=!1;if(je(n)?(f=()=>n.value,g=An(n)):ys(n)?(f=()=>c(n),g=!0):Zt(n)?(x=!0,g=n.some(M=>ys(M)||An(M)),f=()=>n.map(M=>{if(je(M))return M.value;if(ys(M))return c(M);if(te(M))return l?l(M,2):M()})):te(n)?t?f=l?()=>l(n,2):n:f=()=>{if(h){Di();try{h()}finally{Li()}}const M=gs;gs=u;try{return l?l(n,3,[d]):n(d)}finally{gs=M}}:f=ri,t&&s){const M=f,w=s===!0?1/0:s;f=()=>ts(M(),w)}const m=rg(),p=()=>{u.stop(),m&&m.active&&Yu(m.effects,u)};if(r&&t){const M=t;t=(...w)=>{M(...w),p()}}let S=x?new Array(n.length).fill(No):No;const T=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(t){const w=u.run();if(s||g||(x?w.some((b,R)=>ni(b,S[R])):ni(w,S))){h&&h();const b=gs;gs=u;try{const R=[w,S===No?void 0:x&&S[0]===No?[]:S,d];S=w,l?l(t,3,R):t(...R)}finally{gs=b}}}else u.run()};return a&&a(T),u=new Op(f),u.scheduler=o?()=>o(T,!1):T,d=M=>Lg(M,!1,u),h=u.onStop=()=>{const M=Ha.get(u);if(M){if(l)l(M,4);else for(const w of M)w();Ha.delete(u)}},t?i?T(!0):S=u.run():o?o(T.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function ts(n,t=1/0,e){if(t<=0||!me(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,je(n))ts(n.value,t,e);else if(Zt(n))for(let i=0;i<n.length;i++)ts(n[i],t,e);else if(Rp(n)||dr(n))n.forEach(i=>{ts(i,t,e)});else if(Dp(n)){for(const i in n)ts(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&ts(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ro(n,t,e,i){try{return i?n(...i):n()}catch(s){ul(s,t,e)}}function li(n,t,e,i){if(te(n)){const s=Ro(n,t,e,i);return s&&Cp(s)&&s.catch(r=>{ul(r,t,e)}),s}if(Zt(n)){const s=[];for(let r=0;r<n.length;r++)s.push(li(n[r],t,e,i));return s}}function ul(n,t,e,i=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||be;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}a=a.parent}if(r){Di(),Ro(r,null,10,[n,l,c]),Li();return}}Ug(n,e,s,i,o)}function Ug(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const on=[];let Zn=-1;const pr=[];let ji=null,nr=0;const jp=Promise.resolve();let Ga=null;function Ng(n){const t=Ga||jp;return n?t.then(this?n.bind(this):n):t}function Fg(n){let t=Zn+1,e=on.length;for(;t<e;){const i=t+e>>>1,s=on[i],r=go(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function of(n){if(!(n.flags&1)){const t=go(n),e=on[on.length-1];!e||!(n.flags&2)&&t>=go(e)?on.push(n):on.splice(Fg(t),0,n),n.flags|=1,Qp()}}function Qp(){Ga||(Ga=jp.then(em))}function Og(n){Zt(n)?pr.push(...n):ji&&n.id===-1?ji.splice(nr+1,0,n):n.flags&1||(pr.push(n),n.flags|=1),Qp()}function jf(n,t,e=Zn+1){for(;e<on.length;e++){const i=on[e];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;on.splice(e,1),e--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function tm(n){if(pr.length){const t=[...new Set(pr)].sort((e,i)=>go(e)-go(i));if(pr.length=0,ji){ji.push(...t);return}for(ji=t,nr=0;nr<ji.length;nr++){const e=ji[nr];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}ji=null,nr=0}}const go=n=>n.id==null?n.flags&2?-1:1/0:n.id;function em(n){try{for(Zn=0;Zn<on.length;Zn++){const t=on[Zn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Ro(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Zn<on.length;Zn++){const t=on[Zn];t&&(t.flags&=-2)}Zn=-1,on.length=0,tm(),Ga=null,(on.length||pr.length)&&em()}}let ii=null,nm=null;function Va(n){const t=ii;return ii=n,nm=n&&n.type.__scopeId||null,t}function Bg(n,t=ii,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&ch(-1);const r=Va(t);let o;try{o=n(...s)}finally{Va(r),i._d&&ch(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function cs(n,t,e,i){const s=n.dirs,r=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(Di(),li(l,e,8,[n.el,a,n,t]),Li())}}function zg(n,t){if(an){let e=an.provides;const i=an.parent&&an.parent.provides;i===e&&(e=an.provides=Object.create(i)),e[n]=t}}function Aa(n,t,e=!1){const i=z_();if(i||mr){let s=mr?mr._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&te(t)?t.call(i&&i.proxy):t}}const Hg=Symbol.for("v-scx"),Gg=()=>Aa(Hg);function wl(n,t,e){return im(n,t,e)}function im(n,t,e=be){const{immediate:i,deep:s,flush:r,once:o}=e,a=tn({},e),l=t&&i||!t&&r!=="post";let c;if(xo){if(r==="sync"){const d=Gg();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=ri,d.resume=ri,d.pause=ri,d}}const u=an;a.call=(d,g,x)=>li(d,u,g,x);let f=!1;r==="post"?a.scheduler=d=>{un(d,u&&u.suspense)}:r!=="sync"&&(f=!0,a.scheduler=(d,g)=>{g?d():of(d)}),a.augmentJob=d=>{t&&(d.flags|=4),f&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const h=Ig(n,t,a);return xo&&(c?c.push(h):l&&h()),h}function Vg(n,t,e){const i=this.proxy,s=Ne(n)?n.includes(".")?sm(i,n):()=>i[n]:n.bind(i,i);let r;te(t)?r=t:(r=t.handler,e=t);const o=Co(this),a=im(s,r.bind(i),e);return o(),a}function sm(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const kg=Symbol("_vte"),Wg=n=>n.__isTeleport,Xg=Symbol("_leaveCb");function af(n,t){n.shapeFlag&6&&n.component?(n.transition=t,af(n.component.subTree,t)):n.shapeFlag&128?(n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)):n.transition=t}function rm(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Qf(n,t){let e;return!!((e=Object.getOwnPropertyDescriptor(n,t))&&!e.configurable)}const ka=new WeakMap;function oo(n,t,e,i,s=!1){if(Zt(n)){n.forEach((x,m)=>oo(x,t&&(Zt(t)?t[m]:t),e,i,s));return}if(ao(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&oo(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?ff(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===be?a.refs={}:a.refs,f=a.setupState,h=ce(f),d=f===be?Ap:x=>Qf(u,x)?!1:ue(h,x),g=(x,m)=>!(m&&Qf(u,m));if(c!=null&&c!==l){if(th(t),Ne(c))u[c]=null,d(c)&&(f[c]=null);else if(je(c)){const x=t;g(c,x.k)&&(c.value=null),x.k&&(u[x.k]=null)}}if(te(l))Ro(l,a,12,[o,u]);else{const x=Ne(l),m=je(l);if(x||m){const p=()=>{if(n.f){const S=x?d(l)?f[l]:u[l]:g()||!n.k?l.value:u[n.k];if(s)Zt(S)&&Yu(S,r);else if(Zt(S))S.includes(r)||S.push(r);else if(x)u[l]=[r],d(l)&&(f[l]=u[l]);else{const T=[r];g(l,n.k)&&(l.value=T),n.k&&(u[n.k]=T)}}else x?(u[l]=o,d(l)&&(f[l]=o)):m&&(g(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const S=()=>{p(),ka.delete(n)};S.id=-1,ka.set(n,S),un(S,e)}else th(n),p()}}}function th(n){const t=ka.get(n);t&&(t.flags|=8,ka.delete(n))}ll().requestIdleCallback;ll().cancelIdleCallback;const ao=n=>!!n.type.__asyncLoader,om=n=>n.type.__isKeepAlive;function Yg(n,t){am(n,"a",t)}function qg(n,t){am(n,"da",t)}function am(n,t,e=an){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(fl(t,i,e),e){let s=e.parent;for(;s&&s.parent;)om(s.parent.vnode)&&$g(i,t,e,s),s=s.parent}}function $g(n,t,e,i){const s=fl(t,n,i,!0);um(()=>{Yu(i[t],s)},e)}function fl(n,t,e=an,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{Di();const a=Co(e),l=li(t,e,n,o);return a(),Li(),l});return i?s.unshift(r):s.push(r),r}}const Bi=n=>(t,e=an)=>{(!xo||n==="sp")&&fl(n,(...i)=>t(...i),e)},Kg=Bi("bm"),lm=Bi("m"),Zg=Bi("bu"),Jg=Bi("u"),cm=Bi("bum"),um=Bi("um"),jg=Bi("sp"),Qg=Bi("rtg"),t_=Bi("rtc");function e_(n,t=an){fl("ec",n,t)}const n_=Symbol.for("v-ndc");function i_(n,t,e,i){let s;const r=e,o=Zt(n);if(o||Ne(n)){const a=o&&ys(n);let l=!1,c=!1;a&&(l=!An(n),c=Ii(n),n=cl(n)),s=new Array(n.length);for(let u=0,f=n.length;u<f;u++)s[u]=t(l?c?Sr(Hn(n[u])):Hn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(me(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(n[u],u,l,r)}}else s=[];return s}const Dc=n=>n?Im(n)?ff(n):Dc(n.parent):null,lo=tn(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Dc(n.parent),$root:n=>Dc(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>hm(n),$forceUpdate:n=>n.f||(n.f=()=>{of(n.update)}),$nextTick:n=>n.n||(n.n=Ng.bind(n.proxy)),$watch:n=>Vg.bind(n)}),Al=(n,t)=>n!==be&&!n.__isScriptSetup&&ue(n,t),s_={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(t[0]!=="$"){const h=o[t];if(h!==void 0)switch(h){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(Al(i,t))return o[t]=1,i[t];if(s!==be&&ue(s,t))return o[t]=2,s[t];if(ue(r,t))return o[t]=3,r[t];if(e!==be&&ue(e,t))return o[t]=4,e[t];Lc&&(o[t]=0)}}const c=lo[t];let u,f;if(c)return t==="$attrs"&&Ze(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[t]))return u;if(e!==be&&ue(e,t))return o[t]=4,e[t];if(f=l.config.globalProperties,ue(f,t))return f[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return Al(s,t)?(s[t]=e,!0):i!==be&&ue(i,t)?(i[t]=e,!0):ue(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(e[a]||n!==be&&a[0]!=="$"&&ue(n,a)||Al(t,a)||ue(r,a)||ue(i,a)||ue(lo,a)||ue(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:ue(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function eh(n){return Zt(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let Lc=!0;function r_(n){const t=hm(n),e=n.proxy,i=n.ctx;Lc=!1,t.beforeCreate&&nh(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:g,activated:x,deactivated:m,beforeDestroy:p,beforeUnmount:S,destroyed:T,unmounted:M,render:w,renderTracked:b,renderTriggered:R,errorCaptured:v,serverPrefetch:A,expose:I,inheritAttrs:D,components:N,directives:q,filters:Z}=t;if(c&&o_(c,i,null),o)for(const U in o){const k=o[U];te(k)&&(i[U]=k.bind(e))}if(s){const U=s.call(e,e);me(U)&&(n.data=nf(U))}if(Lc=!0,r)for(const U in r){const k=r[U],J=te(k)?k.bind(e,e):te(k.get)?k.get.bind(e,e):ri,at=!te(k)&&te(k.set)?k.set.bind(e):ri,gt=X_({get:J,set:at});Object.defineProperty(i,U,{enumerable:!0,configurable:!0,get:()=>gt.value,set:vt=>gt.value=vt})}if(a)for(const U in a)fm(a[U],i,e,U);if(l){const U=te(l)?l.call(e):l;Reflect.ownKeys(U).forEach(k=>{zg(k,U[k])})}u&&nh(u,n,"c");function B(U,k){Zt(k)?k.forEach(J=>U(J.bind(e))):k&&U(k.bind(e))}if(B(Kg,f),B(lm,h),B(Zg,d),B(Jg,g),B(Yg,x),B(qg,m),B(e_,v),B(t_,b),B(Qg,R),B(cm,S),B(um,M),B(jg,A),Zt(I))if(I.length){const U=n.exposed||(n.exposed={});I.forEach(k=>{Object.defineProperty(U,k,{get:()=>e[k],set:J=>e[k]=J,enumerable:!0})})}else n.exposed||(n.exposed={});w&&n.render===ri&&(n.render=w),D!=null&&(n.inheritAttrs=D),N&&(n.components=N),q&&(n.directives=q),A&&rm(n)}function o_(n,t,e=ri){Zt(n)&&(n=Ic(n));for(const i in n){const s=n[i];let r;me(s)?"default"in s?r=Aa(s.from||i,s.default,!0):r=Aa(s.from||i):r=Aa(s),je(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function nh(n,t,e){li(Zt(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function fm(n,t,e,i){let s=i.includes(".")?sm(e,i):()=>e[i];if(Ne(n)){const r=t[n];te(r)&&wl(s,r)}else if(te(n))wl(s,n.bind(e));else if(me(n))if(Zt(n))n.forEach(r=>fm(r,t,e,i));else{const r=te(n.handler)?n.handler.bind(e):t[n.handler];te(r)&&wl(s,r,n)}}function hm(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>Wa(l,c,o,!0)),Wa(l,t,o)),me(t)&&r.set(t,l),l}function Wa(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&Wa(n,r,e,!0),s&&s.forEach(o=>Wa(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=a_[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const a_={data:ih,props:sh,emits:sh,methods:Qr,computed:Qr,beforeCreate:sn,created:sn,beforeMount:sn,mounted:sn,beforeUpdate:sn,updated:sn,beforeDestroy:sn,beforeUnmount:sn,destroyed:sn,unmounted:sn,activated:sn,deactivated:sn,errorCaptured:sn,serverPrefetch:sn,components:Qr,directives:Qr,watch:c_,provide:ih,inject:l_};function ih(n,t){return t?n?function(){return tn(te(n)?n.call(this,this):n,te(t)?t.call(this,this):t)}:t:n}function l_(n,t){return Qr(Ic(n),Ic(t))}function Ic(n){if(Zt(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function sn(n,t){return n?[...new Set([].concat(n,t))]:t}function Qr(n,t){return n?tn(Object.create(null),n,t):t}function sh(n,t){return n?Zt(n)&&Zt(t)?[...new Set([...n,...t])]:tn(Object.create(null),eh(n),eh(t??{})):t}function c_(n,t){if(!n)return t;if(!t)return n;const e=tn(Object.create(null),n);for(const i in t)e[i]=sn(n[i],t[i]);return e}function dm(){return{app:null,config:{isNativeTag:Ap,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let u_=0;function f_(n,t){return function(i,s=null){te(i)||(i=tn({},i)),s!=null&&!me(s)&&(s=null);const r=dm(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:u_++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:Y_,get config(){return r.config},set config(u){},use(u,...f){return o.has(u)||(u&&te(u.install)?(o.add(u),u.install(c,...f)):te(u)&&(o.add(u),u(c,...f))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,f){return f?(r.components[u]=f,c):r.components[u]},directive(u,f){return f?(r.directives[u]=f,c):r.directives[u]},mount(u,f,h){if(!l){const d=c._ceVNode||Rn(i,s);return d.appContext=r,h===!0?h="svg":h===!1&&(h=void 0),n(d,u,h),l=!0,c._container=u,u.__vue_app__=c,ff(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(li(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return r.provides[u]=f,c},runWithContext(u){const f=mr;mr=c;try{return u()}finally{mr=f}}};return c}}let mr=null;const h_=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${On(t)}Modifiers`]||n[`${Rs(t)}Modifiers`];function d_(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||be;let s=e;const r=t.startsWith("update:"),o=r&&h_(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>Ne(u)?u.trim():u)),o.number&&(s=e.map(Z0)));let a,l=i[a=Ml(t)]||i[a=Ml(On(t))];!l&&r&&(l=i[a=Ml(Rs(t))]),l&&li(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,li(c,n,6,s)}}const p_=new WeakMap;function pm(n,t,e=!1){const i=e?p_:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!te(n)){const l=c=>{const u=pm(c,t,!0);u&&(a=!0,tn(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(me(n)&&i.set(n,null),null):(Zt(r)?r.forEach(l=>o[l]=null):tn(o,r),me(n)&&i.set(n,o),o)}function hl(n,t){return!n||!ol(t)?!1:(t=t.slice(2).replace(/Once$/,""),ue(n,t[0].toLowerCase()+t.slice(1))||ue(n,Rs(t))||ue(n,t))}function rh(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:h,setupState:d,ctx:g,inheritAttrs:x}=n,m=Va(n);let p,S;try{if(e.shapeFlag&4){const M=s||i,w=M;p=ti(c.call(w,M,u,f,d,h,g)),S=a}else{const M=t;p=ti(M.length>1?M(f,{attrs:a,slots:o,emit:l}):M(f,null)),S=t.props?a:m_(a)}}catch(M){co.length=0,ul(M,n,1),p=Rn(ss)}let T=p;if(S&&x!==!1){const M=Object.keys(S),{shapeFlag:w}=T;M.length&&w&7&&(r&&M.some(Xu)&&(S=g_(S,r)),T=yr(T,S,!1,!0))}return e.dirs&&(T=yr(T,null,!1,!0),T.dirs=T.dirs?T.dirs.concat(e.dirs):e.dirs),e.transition&&af(T,e.transition),p=T,Va(m),p}const m_=n=>{let t;for(const e in n)(e==="class"||e==="style"||ol(e))&&((t||(t={}))[e]=n[e]);return t},g_=(n,t)=>{const e={};for(const i in n)(!Xu(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function __(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?oh(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(mm(o,i,h)&&!hl(c,h))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?oh(i,o,c):!0:!!o;return!1}function oh(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(mm(t,n,r)&&!hl(e,r))return!0}return!1}function mm(n,t,e){const i=n[e],s=t[e];return e==="style"&&me(i)&&me(s)?!Zu(i,s):i!==s}function x_({vnode:n,parent:t},e){for(;t;){const i=t.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=t.vnode).el=e,t=t.parent;else break}}const gm={},_m=()=>Object.create(gm),xm=n=>Object.getPrototypeOf(n)===gm;function v_(n,t,e,i=!1){const s={},r=_m();n.propsDefaults=Object.create(null),vm(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:Eg(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function M_(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=ce(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(hl(n.emitsOptions,h))continue;const d=t[h];if(l)if(ue(r,h))d!==r[h]&&(r[h]=d,c=!0);else{const g=On(h);s[g]=Uc(l,a,g,d,n,!1)}else d!==r[h]&&(r[h]=d,c=!0)}}}else{vm(n,t,s,r)&&(c=!0);let u;for(const f in a)(!t||!ue(t,f)&&((u=Rs(f))===f||!ue(t,u)))&&(l?e&&(e[f]!==void 0||e[u]!==void 0)&&(s[f]=Uc(l,a,f,void 0,n,!0)):delete s[f]);if(r!==a)for(const f in r)(!t||!ue(t,f))&&(delete r[f],c=!0)}c&&Ei(n.attrs,"set","")}function vm(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(io(l))continue;const c=t[l];let u;s&&ue(s,u=On(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:hl(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=ce(e),c=a||be;for(let u=0;u<r.length;u++){const f=r[u];e[f]=Uc(s,l,f,c[f],n,!ue(c,f))}}return o}function Uc(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=ue(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&te(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=Co(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===Rs(e))&&(i=!0))}return i}const S_=new WeakMap;function Mm(n,t,e=!1){const i=e?S_:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!te(n)){const u=f=>{l=!0;const[h,d]=Mm(f,t,!0);tn(o,h),d&&a.push(...d)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return me(n)&&i.set(n,hr),hr;if(Zt(r))for(let u=0;u<r.length;u++){const f=On(r[u]);ah(f)&&(o[f]=be)}else if(r)for(const u in r){const f=On(u);if(ah(f)){const h=r[u],d=o[f]=Zt(h)||te(h)?{type:h}:tn({},h),g=d.type;let x=!1,m=!0;if(Zt(g))for(let p=0;p<g.length;++p){const S=g[p],T=te(S)&&S.name;if(T==="Boolean"){x=!0;break}else T==="String"&&(m=!1)}else x=te(g)&&g.name==="Boolean";d[0]=x,d[1]=m,(x||ue(d,"default"))&&a.push(f)}}const c=[o,a];return me(n)&&i.set(n,c),c}function ah(n){return n[0]!=="$"&&!io(n)}const lf=n=>n==="_"||n==="_ctx"||n==="$stable",cf=n=>Zt(n)?n.map(ti):[ti(n)],y_=(n,t,e)=>{if(t._n)return t;const i=Bg((...s)=>cf(t(...s)),e);return i._c=!1,i},Sm=(n,t,e)=>{const i=n._ctx;for(const s in n){if(lf(s))continue;const r=n[s];if(te(r))t[s]=y_(s,r,i);else if(r!=null){const o=cf(r);t[s]=()=>o}}},ym=(n,t)=>{const e=cf(t);n.slots.default=()=>e},bm=(n,t,e)=>{for(const i in t)(e||!lf(i))&&(n[i]=t[i])},b_=(n,t,e)=>{const i=n.slots=_m();if(n.vnode.shapeFlag&32){const s=t._;s?(bm(i,t,e),e&&Ip(i,"_",s,!0)):Sm(t,i)}else t&&ym(n,t)},E_=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=be;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:bm(s,t,e):(r=!t.$stable,Sm(t,s)),o=t}else t&&(ym(n,t),o={default:1});if(r)for(const a in s)!lf(a)&&o[a]==null&&delete s[a]},un=C_;function T_(n){return w_(n)}function w_(n,t){const e=ll();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=ri,insertStaticContent:g}=n,x=(P,L,Y,et=null,j=null,st=null,ht=void 0,ct=null,lt=!!L.dynamicChildren)=>{if(P===L)return;P&&!Fr(P,L)&&(et=mt(P),vt(P,j,st,!0),P=null),L.patchFlag===-2&&(lt=!1,L.dynamicChildren=null);const{type:nt,ref:Rt,shapeFlag:C}=L;switch(nt){case dl:m(P,L,Y,et);break;case ss:p(P,L,Y,et);break;case Ra:P==null&&S(L,Y,et,ht);break;case Qn:N(P,L,Y,et,j,st,ht,ct,lt);break;default:C&1?w(P,L,Y,et,j,st,ht,ct,lt):C&6?q(P,L,Y,et,j,st,ht,ct,lt):(C&64||C&128)&&nt.process(P,L,Y,et,j,st,ht,ct,lt,$t)}Rt!=null&&j?oo(Rt,P&&P.ref,st,L||P,!L):Rt==null&&P&&P.ref!=null&&oo(P.ref,null,st,P,!0)},m=(P,L,Y,et)=>{if(P==null)i(L.el=a(L.children),Y,et);else{const j=L.el=P.el;L.children!==P.children&&c(j,L.children)}},p=(P,L,Y,et)=>{P==null?i(L.el=l(L.children||""),Y,et):L.el=P.el},S=(P,L,Y,et)=>{[P.el,P.anchor]=g(P.children,L,Y,et,P.el,P.anchor)},T=({el:P,anchor:L},Y,et)=>{let j;for(;P&&P!==L;)j=h(P),i(P,Y,et),P=j;i(L,Y,et)},M=({el:P,anchor:L})=>{let Y;for(;P&&P!==L;)Y=h(P),s(P),P=Y;s(L)},w=(P,L,Y,et,j,st,ht,ct,lt)=>{if(L.type==="svg"?ht="svg":L.type==="math"&&(ht="mathml"),P==null)b(L,Y,et,j,st,ht,ct,lt);else{const nt=P.el&&P.el._isVueCE?P.el:null;try{nt&&nt._beginPatch(),A(P,L,j,st,ht,ct,lt)}finally{nt&&nt._endPatch()}}},b=(P,L,Y,et,j,st,ht,ct)=>{let lt,nt;const{props:Rt,shapeFlag:C,transition:Ct,dirs:bt}=P;if(lt=P.el=o(P.type,st,Rt&&Rt.is,Rt),C&8?u(lt,P.children):C&16&&v(P.children,lt,null,et,j,Rl(P,st),ht,ct),bt&&cs(P,null,et,"created"),R(lt,P,P.scopeId,ht,et),Rt){for(const _ in Rt)_!=="value"&&!io(_)&&r(lt,_,null,Rt[_],st,et);"value"in Rt&&r(lt,"value",null,Rt.value,st),(nt=Rt.onVnodeBeforeMount)&&qn(nt,et,P)}bt&&cs(P,null,et,"beforeMount");const E=A_(j,Ct);E&&Ct.beforeEnter(lt),i(lt,L,Y),((nt=Rt&&Rt.onVnodeMounted)||E||bt)&&un(()=>{nt&&qn(nt,et,P),E&&Ct.enter(lt),bt&&cs(P,null,et,"mounted")},j)},R=(P,L,Y,et,j)=>{if(Y&&d(P,Y),et)for(let st=0;st<et.length;st++)d(P,et[st]);if(j){let st=j.subTree;if(L===st||Am(st.type)&&(st.ssContent===L||st.ssFallback===L)){const ht=j.vnode;R(P,ht,ht.scopeId,ht.slotScopeIds,j.parent)}}},v=(P,L,Y,et,j,st,ht,ct,lt=0)=>{for(let nt=lt;nt<P.length;nt++){const Rt=P[nt]=ct?bi(P[nt]):ti(P[nt]);x(null,Rt,L,Y,et,j,st,ht,ct)}},A=(P,L,Y,et,j,st,ht)=>{const ct=L.el=P.el;let{patchFlag:lt,dynamicChildren:nt,dirs:Rt}=L;lt|=P.patchFlag&16;const C=P.props||be,Ct=L.props||be;let bt;if(Y&&us(Y,!1),(bt=Ct.onVnodeBeforeUpdate)&&qn(bt,Y,L,P),Rt&&cs(L,P,Y,"beforeUpdate"),Y&&us(Y,!0),(C.innerHTML&&Ct.innerHTML==null||C.textContent&&Ct.textContent==null)&&u(ct,""),nt?I(P.dynamicChildren,nt,ct,Y,et,Rl(L,j),st):ht||k(P,L,ct,null,Y,et,Rl(L,j),st,!1),lt>0){if(lt&16)D(ct,C,Ct,Y,j);else if(lt&2&&C.class!==Ct.class&&r(ct,"class",null,Ct.class,j),lt&4&&r(ct,"style",C.style,Ct.style,j),lt&8){const E=L.dynamicProps;for(let _=0;_<E.length;_++){const F=E[_],V=C[F],K=Ct[F];(K!==V||F==="value")&&r(ct,F,V,K,j,Y)}}lt&1&&P.children!==L.children&&u(ct,L.children)}else!ht&&nt==null&&D(ct,C,Ct,Y,j);((bt=Ct.onVnodeUpdated)||Rt)&&un(()=>{bt&&qn(bt,Y,L,P),Rt&&cs(L,P,Y,"updated")},et)},I=(P,L,Y,et,j,st,ht)=>{for(let ct=0;ct<L.length;ct++){const lt=P[ct],nt=L[ct],Rt=lt.el&&(lt.type===Qn||!Fr(lt,nt)||lt.shapeFlag&198)?f(lt.el):Y;x(lt,nt,Rt,null,et,j,st,ht,!0)}},D=(P,L,Y,et,j)=>{if(L!==Y){if(L!==be)for(const st in L)!io(st)&&!(st in Y)&&r(P,st,L[st],null,j,et);for(const st in Y){if(io(st))continue;const ht=Y[st],ct=L[st];ht!==ct&&st!=="value"&&r(P,st,ct,ht,j,et)}"value"in Y&&r(P,"value",L.value,Y.value,j)}},N=(P,L,Y,et,j,st,ht,ct,lt)=>{const nt=L.el=P?P.el:a(""),Rt=L.anchor=P?P.anchor:a("");let{patchFlag:C,dynamicChildren:Ct,slotScopeIds:bt}=L;bt&&(ct=ct?ct.concat(bt):bt),P==null?(i(nt,Y,et),i(Rt,Y,et),v(L.children||[],Y,Rt,j,st,ht,ct,lt)):C>0&&C&64&&Ct&&P.dynamicChildren&&P.dynamicChildren.length===Ct.length?(I(P.dynamicChildren,Ct,Y,j,st,ht,ct),(L.key!=null||j&&L===j.subTree)&&Em(P,L,!0)):k(P,L,Y,Rt,j,st,ht,ct,lt)},q=(P,L,Y,et,j,st,ht,ct,lt)=>{L.slotScopeIds=ct,P==null?L.shapeFlag&512?j.ctx.activate(L,Y,et,ht,lt):Z(L,Y,et,j,st,ht,lt):G(P,L,lt)},Z=(P,L,Y,et,j,st,ht)=>{const ct=P.component=B_(P,et,j);if(om(P)&&(ct.ctx.renderer=$t),H_(ct,!1,ht),ct.asyncDep){if(j&&j.registerDep(ct,B,ht),!P.el){const lt=ct.subTree=Rn(ss);p(null,lt,L,Y),P.placeholder=lt.el}}else B(ct,P,L,Y,j,st,ht)},G=(P,L,Y)=>{const et=L.component=P.component;if(__(P,L,Y))if(et.asyncDep&&!et.asyncResolved){U(et,L,Y);return}else et.next=L,et.update();else L.el=P.el,et.vnode=L},B=(P,L,Y,et,j,st,ht)=>{const ct=()=>{if(P.isMounted){let{next:C,bu:Ct,u:bt,parent:E,vnode:_}=P;{const pt=Tm(P);if(pt){C&&(C.el=_.el,U(P,C,ht)),pt.asyncDep.then(()=>{un(()=>{P.isUnmounted||nt()},j)});return}}let F=C,V;us(P,!1),C?(C.el=_.el,U(P,C,ht)):C=_,Ct&&Sl(Ct),(V=C.props&&C.props.onVnodeBeforeUpdate)&&qn(V,E,C,_),us(P,!0);const K=rh(P),ut=P.subTree;P.subTree=K,x(ut,K,f(ut.el),mt(ut),P,j,st),C.el=K.el,F===null&&x_(P,K.el),bt&&un(bt,j),(V=C.props&&C.props.onVnodeUpdated)&&un(()=>qn(V,E,C,_),j)}else{let C;const{el:Ct,props:bt}=L,{bm:E,m:_,parent:F,root:V,type:K}=P,ut=ao(L);us(P,!1),E&&Sl(E),!ut&&(C=bt&&bt.onVnodeBeforeMount)&&qn(C,F,L),us(P,!0);{V.ce&&V.ce._hasShadowRoot()&&V.ce._injectChildStyle(K,P.parent?P.parent.type:void 0);const pt=P.subTree=rh(P);x(null,pt,Y,et,P,j,st),L.el=pt.el}if(_&&un(_,j),!ut&&(C=bt&&bt.onVnodeMounted)){const pt=L;un(()=>qn(C,F,pt),j)}(L.shapeFlag&256||F&&ao(F.vnode)&&F.vnode.shapeFlag&256)&&P.a&&un(P.a,j),P.isMounted=!0,L=Y=et=null}};P.scope.on();const lt=P.effect=new Op(ct);P.scope.off();const nt=P.update=lt.run.bind(lt),Rt=P.job=lt.runIfDirty.bind(lt);Rt.i=P,Rt.id=P.uid,lt.scheduler=()=>of(Rt),us(P,!0),nt()},U=(P,L,Y)=>{L.component=P;const et=P.vnode.props;P.vnode=L,P.next=null,M_(P,L.props,et,Y),E_(P,L.children,Y),Di(),jf(P),Li()},k=(P,L,Y,et,j,st,ht,ct,lt=!1)=>{const nt=P&&P.children,Rt=P?P.shapeFlag:0,C=L.children,{patchFlag:Ct,shapeFlag:bt}=L;if(Ct>0){if(Ct&128){at(nt,C,Y,et,j,st,ht,ct,lt);return}else if(Ct&256){J(nt,C,Y,et,j,st,ht,ct,lt);return}}bt&8?(Rt&16&&tt(nt,j,st),C!==nt&&u(Y,C)):Rt&16?bt&16?at(nt,C,Y,et,j,st,ht,ct,lt):tt(nt,j,st,!0):(Rt&8&&u(Y,""),bt&16&&v(C,Y,et,j,st,ht,ct,lt))},J=(P,L,Y,et,j,st,ht,ct,lt)=>{P=P||hr,L=L||hr;const nt=P.length,Rt=L.length,C=Math.min(nt,Rt);let Ct;for(Ct=0;Ct<C;Ct++){const bt=L[Ct]=lt?bi(L[Ct]):ti(L[Ct]);x(P[Ct],bt,Y,null,j,st,ht,ct,lt)}nt>Rt?tt(P,j,st,!0,!1,C):v(L,Y,et,j,st,ht,ct,lt,C)},at=(P,L,Y,et,j,st,ht,ct,lt)=>{let nt=0;const Rt=L.length;let C=P.length-1,Ct=Rt-1;for(;nt<=C&&nt<=Ct;){const bt=P[nt],E=L[nt]=lt?bi(L[nt]):ti(L[nt]);if(Fr(bt,E))x(bt,E,Y,null,j,st,ht,ct,lt);else break;nt++}for(;nt<=C&&nt<=Ct;){const bt=P[C],E=L[Ct]=lt?bi(L[Ct]):ti(L[Ct]);if(Fr(bt,E))x(bt,E,Y,null,j,st,ht,ct,lt);else break;C--,Ct--}if(nt>C){if(nt<=Ct){const bt=Ct+1,E=bt<Rt?L[bt].el:et;for(;nt<=Ct;)x(null,L[nt]=lt?bi(L[nt]):ti(L[nt]),Y,E,j,st,ht,ct,lt),nt++}}else if(nt>Ct)for(;nt<=C;)vt(P[nt],j,st,!0),nt++;else{const bt=nt,E=nt,_=new Map;for(nt=E;nt<=Ct;nt++){const dt=L[nt]=lt?bi(L[nt]):ti(L[nt]);dt.key!=null&&_.set(dt.key,nt)}let F,V=0;const K=Ct-E+1;let ut=!1,pt=0;const Q=new Array(K);for(nt=0;nt<K;nt++)Q[nt]=0;for(nt=bt;nt<=C;nt++){const dt=P[nt];if(V>=K){vt(dt,j,st,!0);continue}let Pt;if(dt.key!=null)Pt=_.get(dt.key);else for(F=E;F<=Ct;F++)if(Q[F-E]===0&&Fr(dt,L[F])){Pt=F;break}Pt===void 0?vt(dt,j,st,!0):(Q[Pt-E]=nt+1,Pt>=pt?pt=Pt:ut=!0,x(dt,L[Pt],Y,null,j,st,ht,ct,lt),V++)}const it=ut?R_(Q):hr;for(F=it.length-1,nt=K-1;nt>=0;nt--){const dt=E+nt,Pt=L[dt],Mt=L[dt+1],_t=dt+1<Rt?Mt.el||wm(Mt):et;Q[nt]===0?x(null,Pt,Y,_t,j,st,ht,ct,lt):ut&&(F<0||nt!==it[F]?gt(Pt,Y,_t,2):F--)}}},gt=(P,L,Y,et,j=null)=>{const{el:st,type:ht,transition:ct,children:lt,shapeFlag:nt}=P;if(nt&6){gt(P.component.subTree,L,Y,et);return}if(nt&128){P.suspense.move(L,Y,et);return}if(nt&64){ht.move(P,L,Y,$t);return}if(ht===Qn){i(st,L,Y);for(let C=0;C<lt.length;C++)gt(lt[C],L,Y,et);i(P.anchor,L,Y);return}if(ht===Ra){T(P,L,Y);return}if(et!==2&&nt&1&&ct)if(et===0)ct.beforeEnter(st),i(st,L,Y),un(()=>ct.enter(st),j);else{const{leave:C,delayLeave:Ct,afterLeave:bt}=ct,E=()=>{P.ctx.isUnmounted?s(st):i(st,L,Y)},_=()=>{st._isLeaving&&st[Xg](!0),C(st,()=>{E(),bt&&bt()})};Ct?Ct(st,E,_):_()}else i(st,L,Y)},vt=(P,L,Y,et=!1,j=!1)=>{const{type:st,props:ht,ref:ct,children:lt,dynamicChildren:nt,shapeFlag:Rt,patchFlag:C,dirs:Ct,cacheIndex:bt}=P;if(C===-2&&(j=!1),ct!=null&&(Di(),oo(ct,null,Y,P,!0),Li()),bt!=null&&(L.renderCache[bt]=void 0),Rt&256){L.ctx.deactivate(P);return}const E=Rt&1&&Ct,_=!ao(P);let F;if(_&&(F=ht&&ht.onVnodeBeforeUnmount)&&qn(F,L,P),Rt&6)Yt(P.component,Y,et);else{if(Rt&128){P.suspense.unmount(Y,et);return}E&&cs(P,null,L,"beforeUnmount"),Rt&64?P.type.remove(P,L,Y,$t,et):nt&&!nt.hasOnce&&(st!==Qn||C>0&&C&64)?tt(nt,L,Y,!1,!0):(st===Qn&&C&384||!j&&Rt&16)&&tt(lt,L,Y),et&&ie(P)}(_&&(F=ht&&ht.onVnodeUnmounted)||E)&&un(()=>{F&&qn(F,L,P),E&&cs(P,null,L,"unmounted")},Y)},ie=P=>{const{type:L,el:Y,anchor:et,transition:j}=P;if(L===Qn){ve(Y,et);return}if(L===Ra){M(P);return}const st=()=>{s(Y),j&&!j.persisted&&j.afterLeave&&j.afterLeave()};if(P.shapeFlag&1&&j&&!j.persisted){const{leave:ht,delayLeave:ct}=j,lt=()=>ht(Y,st);ct?ct(P.el,st,lt):lt()}else st()},ve=(P,L)=>{let Y;for(;P!==L;)Y=h(P),s(P),P=Y;s(L)},Yt=(P,L,Y)=>{const{bum:et,scope:j,job:st,subTree:ht,um:ct,m:lt,a:nt}=P;lh(lt),lh(nt),et&&Sl(et),j.stop(),st&&(st.flags|=8,vt(ht,P,L,Y)),ct&&un(ct,L),un(()=>{P.isUnmounted=!0},L)},tt=(P,L,Y,et=!1,j=!1,st=0)=>{for(let ht=st;ht<P.length;ht++)vt(P[ht],L,Y,et,j)},mt=P=>{if(P.shapeFlag&6)return mt(P.component.subTree);if(P.shapeFlag&128)return P.suspense.next();const L=h(P.anchor||P.el),Y=L&&L[kg];return Y?h(Y):L};let ft=!1;const qt=(P,L,Y)=>{let et;P==null?L._vnode&&(vt(L._vnode,null,null,!0),et=L._vnode.component):x(L._vnode||null,P,L,null,null,null,Y),L._vnode=P,ft||(ft=!0,jf(et),tm(),ft=!1)},$t={p:x,um:vt,m:gt,r:ie,mt:Z,mc:v,pc:k,pbc:I,n:mt,o:n};return{render:qt,hydrate:void 0,createApp:f_(qt)}}function Rl({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function us({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function A_(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function Em(n,t,e=!1){const i=n.children,s=t.children;if(Zt(i)&&Zt(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=bi(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&Em(o,a)),a.type===dl&&(a.patchFlag===-1&&(a=s[r]=bi(a)),a.el=o.el),a.type===ss&&!a.el&&(a.el=o.el)}}function R_(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function Tm(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Tm(t)}function lh(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}function wm(n){if(n.placeholder)return n.placeholder;const t=n.component;return t?wm(t.subTree):null}const Am=n=>n.__isSuspense;function C_(n,t){t&&t.pendingBranch?Zt(n)?t.effects.push(...n):t.effects.push(n):Og(n)}const Qn=Symbol.for("v-fgt"),dl=Symbol.for("v-txt"),ss=Symbol.for("v-cmt"),Ra=Symbol.for("v-stc"),co=[];let bn=null;function In(n=!1){co.push(bn=n?null:[])}function P_(){co.pop(),bn=co[co.length-1]||null}let _o=1;function ch(n,t=!1){_o+=n,n<0&&bn&&t&&(bn.hasOnce=!0)}function Rm(n){return n.dynamicChildren=_o>0?bn||hr:null,P_(),_o>0&&bn&&bn.push(n),n}function Ti(n,t,e,i,s,r){return Rm(Ke(n,t,e,i,s,r,!0))}function Cm(n,t,e,i,s){return Rm(Rn(n,t,e,i,s,!0))}function Pm(n){return n?n.__v_isVNode===!0:!1}function Fr(n,t){return n.type===t.type&&n.key===t.key}const Dm=({key:n})=>n??null,Ca=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?Ne(n)||je(n)||te(n)?{i:ii,r:n,k:t,f:!!e}:n:null);function Ke(n,t=null,e=null,i=0,s=null,r=n===Qn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&Dm(t),ref:t&&Ca(t),scopeId:nm,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:ii};return a?(uf(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=Ne(e)?8:16),_o>0&&!o&&bn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&bn.push(l),l}const Rn=D_;function D_(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===n_)&&(n=ss),Pm(n)){const a=yr(n,t,!0);return e&&uf(a,e),_o>0&&!r&&bn&&(a.shapeFlag&6?bn[bn.indexOf(n)]=a:bn.push(a)),a.patchFlag=-2,a}if(W_(n)&&(n=n.__vccOpts),t){t=L_(t);let{class:a,style:l}=t;a&&!Ne(a)&&(t.class=Ku(a)),me(l)&&(rf(l)&&!Zt(l)&&(l=tn({},l)),t.style=$u(l))}const o=Ne(n)?1:Am(n)?128:Wg(n)?64:me(n)?4:te(n)?2:0;return Ke(n,t,e,i,s,o,r,!0)}function L_(n){return n?rf(n)||xm(n)?tn({},n):n:null}function yr(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?N_(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Dm(c),ref:t&&t.ref?e&&r?Zt(r)?r.concat(Ca(t)):[r,Ca(t)]:Ca(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==Qn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&yr(n.ssContent),ssFallback:n.ssFallback&&yr(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&af(u,l.clone(u)),u}function Lm(n=" ",t=0){return Rn(dl,null,n,t)}function I_(n,t){const e=Rn(Ra,null,n);return e.staticCount=t,e}function U_(n="",t=!1){return t?(In(),Cm(ss,null,n)):Rn(ss,null,n)}function ti(n){return n==null||typeof n=="boolean"?Rn(ss):Zt(n)?Rn(Qn,null,n.slice()):Pm(n)?bi(n):Rn(dl,null,String(n))}function bi(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:yr(n)}function uf(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Zt(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),uf(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!xm(t)?t._ctx=ii:s===3&&ii&&(ii.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else te(t)?(t={default:t,_ctx:ii},e=32):(t=String(t),i&64?(e=16,t=[Lm(t)]):e=8);n.children=t,n.shapeFlag|=e}function N_(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=Ku([t.class,i.class]));else if(s==="style")t.style=$u([t.style,i.style]);else if(ol(s)){const r=t[s],o=i[s];o&&r!==o&&!(Zt(r)&&r.includes(o))&&(t[s]=r?[].concat(r,o):o)}else s!==""&&(t[s]=i[s])}return t}function qn(n,t,e,i=null){li(n,t,7,[e,i])}const F_=dm();let O_=0;function B_(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||F_,r={uid:O_++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new sg(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Mm(i,s),emitsOptions:pm(i,s),emit:null,emitted:null,propsDefaults:be,inheritAttrs:i.inheritAttrs,ctx:be,data:be,props:be,attrs:be,slots:be,refs:be,setupState:be,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=d_.bind(null,r),n.ce&&n.ce(r),r}let an=null;const z_=()=>an||ii;let Xa,Nc;{const n=ll(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};Xa=t("__VUE_INSTANCE_SETTERS__",e=>an=e),Nc=t("__VUE_SSR_SETTERS__",e=>xo=e)}const Co=n=>{const t=an;return Xa(n),n.scope.on(),()=>{n.scope.off(),Xa(t)}},uh=()=>{an&&an.scope.off(),Xa(null)};function Im(n){return n.vnode.shapeFlag&4}let xo=!1;function H_(n,t=!1,e=!1){t&&Nc(t);const{props:i,children:s}=n.vnode,r=Im(n);v_(n,i,r,t),b_(n,s,e||t);const o=r?G_(n,t):void 0;return t&&Nc(!1),o}function G_(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,s_);const{setup:i}=e;if(i){Di();const s=n.setupContext=i.length>1?k_(n):null,r=Co(n),o=Ro(i,n,0,[n.props,s]),a=Cp(o);if(Li(),r(),(a||n.sp)&&!ao(n)&&rm(n),a){if(o.then(uh,uh),t)return o.then(l=>{fh(n,l)}).catch(l=>{ul(l,n,0)});n.asyncDep=o}else fh(n,o)}else Um(n)}function fh(n,t,e){te(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:me(t)&&(n.setupState=Jp(t)),Um(n)}function Um(n,t,e){const i=n.type;n.render||(n.render=i.render||ri);{const s=Co(n);Di();try{r_(n)}finally{Li(),s()}}}const V_={get(n,t){return Ze(n,"get",""),n[t]}};function k_(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,V_),slots:n.slots,emit:n.emit,expose:t}}function ff(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Jp(Tg(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in lo)return lo[e](n)},has(t,e){return e in t||e in lo}})):n.proxy}function W_(n){return te(n)&&"__vccOpts"in n}const X_=(n,t)=>Dg(n,t,xo),Y_="3.5.30";/**
* @vue/runtime-dom v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Fc;const hh=typeof window<"u"&&window.trustedTypes;if(hh)try{Fc=hh.createPolicy("vue",{createHTML:n=>n})}catch{}const Nm=Fc?n=>Fc.createHTML(n):n=>n,q_="http://www.w3.org/2000/svg",$_="http://www.w3.org/1998/Math/MathML",yi=typeof document<"u"?document:null,dh=yi&&yi.createElement("template"),K_={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?yi.createElementNS(q_,n):t==="mathml"?yi.createElementNS($_,n):e?yi.createElement(n,{is:e}):yi.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>yi.createTextNode(n),createComment:n=>yi.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>yi.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{dh.innerHTML=Nm(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=dh.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},Z_=Symbol("_vtc");function J_(n,t,e){const i=n[Z_];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const ph=Symbol("_vod"),j_=Symbol("_vsh"),Q_=Symbol(""),tx=/(?:^|;)\s*display\s*:/;function ex(n,t,e){const i=n.style,s=Ne(e);let r=!1;if(e&&!s){if(t)if(Ne(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&Pa(i,a,"")}else for(const o in t)e[o]==null&&Pa(i,o,"");for(const o in e)o==="display"&&(r=!0),Pa(i,o,e[o])}else if(s){if(t!==e){const o=i[Q_];o&&(e+=";"+o),i.cssText=e,r=tx.test(e)}}else t&&n.removeAttribute("style");ph in n&&(n[ph]=r?i.display:"",n[j_]&&(i.display="none"))}const mh=/\s*!important$/;function Pa(n,t,e){if(Zt(e))e.forEach(i=>Pa(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))n.setProperty(t,e);else{const i=nx(n,t);mh.test(e)?n.setProperty(Rs(i),e.replace(mh,""),"important"):n[i]=e}}const gh=["Webkit","Moz","ms"],Cl={};function nx(n,t){const e=Cl[t];if(e)return e;let i=On(t);if(i!=="filter"&&i in n)return Cl[t]=i;i=Lp(i);for(let s=0;s<gh.length;s++){const r=gh[s]+i;if(r in n)return Cl[t]=r}return t}const _h="http://www.w3.org/1999/xlink";function xh(n,t,e,i,s,r=ng(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(_h,t.slice(6,t.length)):n.setAttributeNS(_h,t,e):e==null||r&&!Up(e)?n.removeAttribute(t):n.setAttribute(t,r?"":ai(e)?String(e):e)}function vh(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?Nm(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=Up(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function ix(n,t,e,i){n.addEventListener(t,e,i)}function sx(n,t,e,i){n.removeEventListener(t,e,i)}const Mh=Symbol("_vei");function rx(n,t,e,i,s=null){const r=n[Mh]||(n[Mh]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=ox(t);if(i){const c=r[t]=cx(i,s);ix(n,a,c,l)}else o&&(sx(n,a,o,l),r[t]=void 0)}}const Sh=/(?:Once|Passive|Capture)$/;function ox(n){let t;if(Sh.test(n)){t={};let i;for(;i=n.match(Sh);)n=n.slice(0,n.length-i[0].length),t[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Rs(n.slice(2)),t]}let Pl=0;const ax=Promise.resolve(),lx=()=>Pl||(ax.then(()=>Pl=0),Pl=Date.now());function cx(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;li(ux(i,e.value),t,5,[i])};return e.value=n,e.attached=lx(),e}function ux(n,t){if(Zt(t)){const e=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{e.call(n),n._stopped=!0},t.map(i=>s=>!s._stopped&&i&&i(s))}else return t}const yh=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,fx=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?J_(n,i,o):t==="style"?ex(n,e,i):ol(t)?Xu(t)||rx(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):hx(n,t,i,o))?(vh(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&xh(n,t,i,o,r,t!=="value")):n._isVueCE&&(dx(n,t)||n._def.__asyncLoader&&(/[A-Z]/.test(t)||!Ne(i)))?vh(n,On(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),xh(n,t,i,o))};function hx(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&yh(t)&&te(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&n.tagName==="IFRAME"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return yh(t)&&Ne(e)?!1:t in n}function dx(n,t){const e=n._def.props;if(!e)return!1;const i=On(t);return Array.isArray(e)?e.some(s=>On(s)===i):Object.keys(e).some(s=>On(s)===i)}const px=tn({patchProp:fx},K_);let bh;function mx(){return bh||(bh=T_(px))}const gx=((...n)=>{const t=mx().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=xx(i);if(!s)return;const r=t._component;!te(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,_x(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function _x(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function xx(n){return Ne(n)?document.querySelector(n):n}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const hf="185",gr={ROTATE:0,DOLLY:1,PAN:2},ns={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},vx=0,Eh=1,Mx=2,Da=1,Sx=2,to=3,rs=0,hn=1,Oe=2,Ai=0,_r=1,vo=2,Th=3,wh=4,yx=5,_s=100,bx=101,Ex=102,Tx=103,wx=104,Ax=200,Rx=201,Cx=202,Px=203,Oc=204,Bc=205,Dx=206,Lx=207,Ix=208,Ux=209,Nx=210,Fx=211,Ox=212,Bx=213,zx=214,zc=0,Hc=1,Gc=2,br=3,Vc=4,kc=5,Wc=6,Xc=7,df=0,Hx=1,Gx=2,zn=0,Fm=1,Om=2,Bm=3,zm=4,Hm=5,Gm=6,Vm=7,km=300,Es=301,Er=302,La=303,Dl=304,pl=306,Yc=1e3,wi=1001,qc=1002,We=1003,Vx=1004,Fo=1005,Je=1006,Ll=1007,vs=1008,Mn=1009,Wm=1010,Xm=1011,Mo=1012,pf=1013,ci=1014,Nn=1015,Ui=1016,mf=1017,gf=1018,So=1020,Ym=35902,qm=35899,$m=1021,Km=1022,Fn=1023,Ni=1026,Ms=1027,_f=1028,xf=1029,Ts=1030,vf=1031,Mf=1033,Ia=33776,Ua=33777,Na=33778,Fa=33779,$c=35840,Kc=35841,Zc=35842,Jc=35843,jc=36196,Qc=37492,tu=37496,eu=37488,nu=37489,Ya=37490,iu=37491,su=37808,ru=37809,ou=37810,au=37811,lu=37812,cu=37813,uu=37814,fu=37815,hu=37816,du=37817,pu=37818,mu=37819,gu=37820,_u=37821,xu=36492,vu=36494,Mu=36495,Su=36283,yu=36284,qa=36285,bu=36286,kx=3200,Eu=0,Wx=1,es="",xe="srgb",$a="srgb-linear",Ka="linear",fe="srgb",Us=7680,Ah=519,Xx=512,Yx=513,qx=514,Sf=515,$x=516,Kx=517,yf=518,Zx=519,Tu=35044,Rh="300 es",si=2e3,yo=2001;function Jx(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Za(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function jx(){const n=Za("canvas");return n.style.display="block",n}const Ch={};function Ja(...n){const t="THREE."+n.shift();console.log(t,...n)}function Zm(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Vt(...n){n=Zm(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function re(...n){n=Zm(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function xr(...n){const t=n.join(" ");t in Ch||(Ch[t]=!0,Vt(...n))}function Qx(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const tv={[zc]:Hc,[Gc]:Wc,[Vc]:Xc,[br]:kc,[Hc]:zc,[Wc]:Gc,[Xc]:Vc,[kc]:br};class os{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ph=1234567;const vr=Math.PI/180,bo=180/Math.PI;function Ri(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(qe[n&255]+qe[n>>8&255]+qe[n>>16&255]+qe[n>>24&255]+"-"+qe[t&255]+qe[t>>8&255]+"-"+qe[t>>16&15|64]+qe[t>>24&255]+"-"+qe[e&63|128]+qe[e>>8&255]+"-"+qe[e>>16&255]+qe[e>>24&255]+qe[i&255]+qe[i>>8&255]+qe[i>>16&255]+qe[i>>24&255]).toLowerCase()}function ne(n,t,e){return Math.max(t,Math.min(e,n))}function bf(n,t){return(n%t+t)%t}function ev(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function nv(n,t,e){return n!==t?(e-n)/(t-n):0}function uo(n,t,e){return(1-e)*n+e*t}function iv(n,t,e,i){return uo(n,t,1-Math.exp(-e*i))}function sv(n,t=1){return t-Math.abs(bf(n,t*2)-t)}function rv(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function ov(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function av(n,t){return n+Math.floor(Math.random()*(t-n+1))}function lv(n,t){return n+Math.random()*(t-n)}function cv(n){return n*(.5-Math.random())}function uv(n){n!==void 0&&(Ph=n);let t=Ph+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function fv(n){return n*vr}function hv(n){return n*bo}function dv(n){return(n&n-1)===0&&n!==0}function pv(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function mv(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function gv(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),u=o((t+i)/2),f=r((t-i)/2),h=o((t-i)/2),d=r((i-t)/2),g=o((i-t)/2);switch(s){case"XYX":n.set(a*u,l*f,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*f,a*c);break;case"ZXZ":n.set(l*f,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*d,a*c);break;case"YXY":n.set(l*d,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*d,a*u,a*c);break;default:Vt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Un(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function he(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Oa={DEG2RAD:vr,RAD2DEG:bo,generateUUID:Ri,clamp:ne,euclideanModulo:bf,mapLinear:ev,inverseLerp:nv,lerp:uo,damp:iv,pingpong:sv,smoothstep:rv,smootherstep:ov,randInt:av,randFloat:lv,randFloatSpread:cv,seededRandom:uv,degToRad:fv,radToDeg:hv,isPowerOfTwo:dv,ceilPowerOfTwo:pv,floorPowerOfTwo:mv,setQuaternionFromProperEuler:gv,normalize:he,denormalize:Un},Uf=class Uf{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Uf.prototype.isVector2=!0;let Ot=Uf;class Gn{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3],h=r[o+0],d=r[o+1],g=r[o+2],x=r[o+3];if(f!==x||l!==h||c!==d||u!==g){let m=l*h+c*d+u*g+f*x;m<0&&(h=-h,d=-d,g=-g,x=-x,m=-m);let p=1-a;if(m<.9995){const S=Math.acos(m),T=Math.sin(S);p=Math.sin(p*S)/T,a=Math.sin(a*S)/T,l=l*p+h*a,c=c*p+d*a,u=u*p+g*a,f=f*p+x*a}else{l=l*p+h*a,c=c*p+d*a,u=u*p+g*a,f=f*p+x*a;const S=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=S,c*=S,u*=S,f*=S}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[o],h=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+u*f+l*d-c*h,t[e+1]=l*g+u*h+c*f-a*d,t[e+2]=c*g+u*d+a*h-l*f,t[e+3]=u*g-a*f-l*h-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),f=a(r/2),h=l(i/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:Vt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=i+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(i>a&&i>f){const d=2*Math.sqrt(1+i-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-i-f);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ne(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Nf=class Nf{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Dh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Dh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),f=2*(r*i-o*e);return this.x=e+l*c+o*f-a*u,this.y=i+l*u+a*c-r*f,this.z=s+l*f+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Il.copy(this).projectOnVector(t),this.sub(Il)}reflect(t){return this.sub(Il.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Nf.prototype.isVector3=!0;let O=Nf;const Il=new O,Dh=new Gn,Ff=class Ff{constructor(t,e,i,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],g=i[8],x=s[0],m=s[3],p=s[6],S=s[1],T=s[4],M=s[7],w=s[2],b=s[5],R=s[8];return r[0]=o*x+a*S+l*w,r[3]=o*m+a*T+l*b,r[6]=o*p+a*M+l*R,r[1]=c*x+u*S+f*w,r[4]=c*m+u*T+f*b,r[7]=c*p+u*M+f*R,r[2]=h*x+d*S+g*w,r[5]=h*m+d*T+g*b,r[8]=h*p+d*M+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=u*o-a*c,h=a*l-u*r,d=c*r-o*l,g=e*f+i*h+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=f*x,t[1]=(s*c-u*i)*x,t[2]=(a*i-s*o)*x,t[3]=h*x,t[4]=(u*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=d*x,t[7]=(i*l-c*e)*x,t[8]=(o*e-i*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return xr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ul.makeScale(t,e)),this}rotate(t){return xr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ul.makeRotation(-t)),this}translate(t,e){return xr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ul.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Ff.prototype.isMatrix3=!0;let Kt=Ff;const Ul=new Kt,Lh=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ih=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _v(){const n={enabled:!0,workingColorSpace:$a,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===fe&&(s.r=Ci(s.r),s.g=Ci(s.g),s.b=Ci(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===fe&&(s.r=Mr(s.r),s.g=Mr(s.g),s.b=Mr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===es?Ka:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return xr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return xr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[$a]:{primaries:t,whitePoint:i,transfer:Ka,toXYZ:Lh,fromXYZ:Ih,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:xe},outputColorSpaceConfig:{drawingBufferColorSpace:xe}},[xe]:{primaries:t,whitePoint:i,transfer:fe,toXYZ:Lh,fromXYZ:Ih,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:xe}}}),n}const oe=_v();function Ci(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Mr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ns;class xv{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Ns===void 0&&(Ns=Za("canvas")),Ns.width=t.width,Ns.height=t.height;const s=Ns.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Ns}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Za("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ci(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ci(e[i]/255)*255):e[i]=Ci(e[i]);return{data:e,width:t.width,height:t.height}}else return Vt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let vv=0;class Ef{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vv++}),this.uuid=Ri(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Nl(s[o].image)):r.push(Nl(s[o]))}else r=Nl(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Nl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?xv.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Vt("Texture: Unable to serialize Texture."),{})}let Mv=0;const Fl=new O;class Qe extends os{constructor(t=Qe.DEFAULT_IMAGE,e=Qe.DEFAULT_MAPPING,i=wi,s=wi,r=Je,o=vs,a=Fn,l=Mn,c=Qe.DEFAULT_ANISOTROPY,u=es){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mv++}),this.uuid=Ri(),this.name="",this.source=new Ef(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Fl).x}get height(){return this.source.getSize(Fl).y}get depth(){return this.source.getSize(Fl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Vt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Vt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==km)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Yc:t.x=t.x-Math.floor(t.x);break;case wi:t.x=t.x<0?0:1;break;case qc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Yc:t.y=t.y-Math.floor(t.y);break;case wi:t.y=t.y<0?0:1;break;case qc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Qe.DEFAULT_IMAGE=null;Qe.DEFAULT_MAPPING=km;Qe.DEFAULT_ANISOTROPY=1;const Of=class Of{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(c+1)/2,M=(d+1)/2,w=(p+1)/2,b=(u+h)/4,R=(f+x)/4,v=(g+m)/4;return T>M&&T>w?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=b/i,r=R/i):M>w?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=b/s,r=v/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=R/r,s=v/r),this.set(i,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(f-x)*(f-x)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(f-x)/S,this.z=(h-u)/S,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this.w=ne(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this.w=ne(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Of.prototype.isVector4=!0;let we=Of;class Sv extends os{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new we(0,0,t,e),this.scissorTest=!1,this.viewport=new we(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new Qe(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Je,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ef(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oi extends Sv{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Jm extends Qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class yv extends Qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const rl=class rl{constructor(t,e,i,s,r,o,a,l,c,u,f,h,d,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,f,h,d,g,x,m)}set(t,e,i,s,r,o,a,l,c,u,f,h,d,g,x,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rl().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,i=t.elements,s=1/Fs.setFromMatrixColumn(t,0).length(),r=1/Fs.setFromMatrixColumn(t,1).length(),o=1/Fs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=o*u,d=o*f,g=a*u,x=a*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=d+g*c,e[5]=h-x*c,e[9]=-a*l,e[2]=x-h*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const h=l*u,d=l*f,g=c*u,x=c*f;e[0]=h+x*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=x+h*a,e[10]=o*l}else if(t.order==="ZXY"){const h=l*u,d=l*f,g=c*u,x=c*f;e[0]=h-x*a,e[4]=-o*f,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=x-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const h=o*u,d=o*f,g=a*u,x=a*f;e[0]=l*u,e[4]=g*c-d,e[8]=h*c+x,e[1]=l*f,e[5]=x*c+h,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const h=o*l,d=o*c,g=a*l,x=a*c;e[0]=l*u,e[4]=x-h*f,e[8]=g*f+d,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*f+g,e[10]=h-x*f}else if(t.order==="XZY"){const h=o*l,d=o*c,g=a*l,x=a*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+x,e[5]=o*u,e[9]=d*f-g,e[2]=g*f-d,e[6]=a*u,e[10]=x*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bv,t,Ev)}lookAt(t,e,i){const s=this.elements;return mn.subVectors(t,e),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),ki.crossVectors(i,mn),ki.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),ki.crossVectors(i,mn)),ki.normalize(),Oo.crossVectors(mn,ki),s[0]=ki.x,s[4]=Oo.x,s[8]=mn.x,s[1]=ki.y,s[5]=Oo.y,s[9]=mn.y,s[2]=ki.z,s[6]=Oo.z,s[10]=mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],g=i[2],x=i[6],m=i[10],p=i[14],S=i[3],T=i[7],M=i[11],w=i[15],b=s[0],R=s[4],v=s[8],A=s[12],I=s[1],D=s[5],N=s[9],q=s[13],Z=s[2],G=s[6],B=s[10],U=s[14],k=s[3],J=s[7],at=s[11],gt=s[15];return r[0]=o*b+a*I+l*Z+c*k,r[4]=o*R+a*D+l*G+c*J,r[8]=o*v+a*N+l*B+c*at,r[12]=o*A+a*q+l*U+c*gt,r[1]=u*b+f*I+h*Z+d*k,r[5]=u*R+f*D+h*G+d*J,r[9]=u*v+f*N+h*B+d*at,r[13]=u*A+f*q+h*U+d*gt,r[2]=g*b+x*I+m*Z+p*k,r[6]=g*R+x*D+m*G+p*J,r[10]=g*v+x*N+m*B+p*at,r[14]=g*A+x*q+m*U+p*gt,r[3]=S*b+T*I+M*Z+w*k,r[7]=S*R+T*D+M*G+w*J,r[11]=S*v+T*N+M*B+w*at,r[15]=S*A+T*q+M*U+w*gt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],d=t[14],g=t[3],x=t[7],m=t[11],p=t[15],S=l*d-c*h,T=a*d-c*f,M=a*h-l*f,w=o*d-c*u,b=o*h-l*u,R=o*f-a*u;return e*(x*S-m*T+p*M)-i*(g*S-m*w+p*b)+s*(g*T-x*w+p*R)-r*(g*M-x*b+m*R)}determinantAffine(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],u=t[10];return e*(o*u-a*c)-i*(r*u-a*l)+s*(r*c-o*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],d=t[11],g=t[12],x=t[13],m=t[14],p=t[15],S=e*a-i*o,T=e*l-s*o,M=e*c-r*o,w=i*l-s*a,b=i*c-r*a,R=s*c-r*l,v=u*x-f*g,A=u*m-h*g,I=u*p-d*g,D=f*m-h*x,N=f*p-d*x,q=h*p-d*m,Z=S*q-T*N+M*D+w*I-b*A+R*v;if(Z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/Z;return t[0]=(a*q-l*N+c*D)*G,t[1]=(s*N-i*q-r*D)*G,t[2]=(x*R-m*b+p*w)*G,t[3]=(h*b-f*R-d*w)*G,t[4]=(l*I-o*q-c*A)*G,t[5]=(e*q-s*I+r*A)*G,t[6]=(m*M-g*R-p*T)*G,t[7]=(u*R-h*M+d*T)*G,t[8]=(o*N-a*I+c*v)*G,t[9]=(i*I-e*N-r*v)*G,t[10]=(g*b-x*M+p*S)*G,t[11]=(f*M-u*b-d*S)*G,t[12]=(a*A-o*D-l*v)*G,t[13]=(e*D-i*A+s*v)*G,t[14]=(x*T-g*w-m*S)*G,t[15]=(u*w-f*T+h*S)*G,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,f=a+a,h=r*c,d=r*u,g=r*f,x=o*u,m=o*f,p=a*f,S=l*c,T=l*u,M=l*f,w=i.x,b=i.y,R=i.z;return s[0]=(1-(x+p))*w,s[1]=(d+M)*w,s[2]=(g-T)*w,s[3]=0,s[4]=(d-M)*b,s[5]=(1-(h+p))*b,s[6]=(m+S)*b,s[7]=0,s[8]=(g+T)*R,s[9]=(m-S)*R,s[10]=(1-(h+x))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let o=Fs.set(s[0],s[1],s[2]).length();const a=Fs.set(s[4],s[5],s[6]).length(),l=Fs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Cn.copy(this);const c=1/o,u=1/a,f=1/l;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=u,Cn.elements[5]*=u,Cn.elements[6]*=u,Cn.elements[8]*=f,Cn.elements[9]*=f,Cn.elements[10]*=f,e.setFromRotationMatrix(Cn),i.x=o,i.y=a,i.z=l,this}makePerspective(t,e,i,s,r,o,a=si,l=!1){const c=this.elements,u=2*r/(e-t),f=2*r/(i-s),h=(e+t)/(e-t),d=(i+s)/(i-s);let g,x;if(l)g=r/(o-r),x=o*r/(o-r);else if(a===si)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===yo)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=si,l=!1){const c=this.elements,u=2/(e-t),f=2/(i-s),h=-(e+t)/(e-t),d=-(i+s)/(i-s);let g,x;if(l)g=1/(o-r),x=o/(o-r);else if(a===si)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===yo)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};rl.prototype.isMatrix4=!0;let se=rl;const Fs=new O,Cn=new se,bv=new O(0,0,0),Ev=new O(1,1,1),ki=new O,Oo=new O,mn=new O,Uh=new se,Nh=new Gn;class Vn{constructor(t=0,e=0,i=0,s=Vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ne(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ne(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Vt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Uh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Uh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Nh.setFromEuler(this),this.setFromQuaternion(Nh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vn.DEFAULT_ORDER="XYZ";class Tf{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Tv=0;const Fh=new O,Os=new Gn,pi=new se,Bo=new O,Or=new O,wv=new O,Av=new Gn,Oh=new O(1,0,0),Bh=new O(0,1,0),zh=new O(0,0,1),Hh={type:"added"},Rv={type:"removed"},Bs={type:"childadded",child:null},Ol={type:"childremoved",child:null};class Pe extends os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tv++}),this.uuid=Ri(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pe.DEFAULT_UP.clone();const t=new O,e=new Vn,i=new Gn,s=new O(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new Kt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=Pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Os.setFromAxisAngle(t,e),this.quaternion.multiply(Os),this}rotateOnWorldAxis(t,e){return Os.setFromAxisAngle(t,e),this.quaternion.premultiply(Os),this}rotateX(t){return this.rotateOnAxis(Oh,t)}rotateY(t){return this.rotateOnAxis(Bh,t)}rotateZ(t){return this.rotateOnAxis(zh,t)}translateOnAxis(t,e){return Fh.copy(t).applyQuaternion(this.quaternion),this.position.add(Fh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Oh,t)}translateY(t){return this.translateOnAxis(Bh,t)}translateZ(t){return this.translateOnAxis(zh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Bo.copy(t):Bo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Or.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(Or,Bo,this.up):pi.lookAt(Bo,Or,this.up),this.quaternion.setFromRotationMatrix(pi),s&&(pi.extractRotation(s.matrixWorld),Os.setFromRotationMatrix(pi),this.quaternion.premultiply(Os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(re("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Hh),Bs.child=t,this.dispatchEvent(Bs),Bs.child=null):re("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Rv),Ol.child=t,this.dispatchEvent(Ol),Ol.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pi.multiply(t.parent.matrixWorld)),t.applyMatrix4(pi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Hh),Bs.child=t,this.dispatchEvent(Bs),Bs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Or,t,wv),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Or,Av,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Pe.DEFAULT_UP=new O(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ae extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Cv={type:"move"};class Bl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ae,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ae,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ae,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,i),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Cv)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Ae;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const jm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},zo={h:0,s:0,l:0};function zl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Ut{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=xe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=i,oe.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=oe.workingColorSpace){if(t=bf(t,1),e=ne(e,0,1),i=ne(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=zl(o,r,t+1/3),this.g=zl(o,r,t),this.b=zl(o,r,t-1/3)}return oe.colorSpaceToWorking(this,s),this}setStyle(t,e=xe){function i(r){r!==void 0&&parseFloat(r)<1&&Vt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Vt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Vt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=xe){const i=jm[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Vt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ci(t.r),this.g=Ci(t.g),this.b=Ci(t.b),this}copyLinearToSRGB(t){return this.r=Mr(t.r),this.g=Mr(t.g),this.b=Mr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=xe){return oe.workingToColorSpace($e.copy(this),t),Math.round(ne($e.r*255,0,255))*65536+Math.round(ne($e.g*255,0,255))*256+Math.round(ne($e.b*255,0,255))}getHexString(t=xe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace($e.copy(this),e);const i=$e.r,s=$e.g,r=$e.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace($e.copy(this),e),t.r=$e.r,t.g=$e.g,t.b=$e.b,t}getStyle(t=xe){oe.workingToColorSpace($e.copy(this),t);const e=$e.r,i=$e.g,s=$e.b;return t!==xe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Wi),this.setHSL(Wi.h+t,Wi.s+e,Wi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Wi),t.getHSL(zo);const i=uo(Wi.h,zo.h,e),s=uo(Wi.s,zo.s,e),r=uo(Wi.l,zo.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $e=new Ut;Ut.NAMES=jm;class wf{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ut(t),this.near=e,this.far=i}clone(){return new wf(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Pv extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Pn=new O,mi=new O,Hl=new O,gi=new O,zs=new O,Hs=new O,Gh=new O,Gl=new O,Vl=new O,kl=new O,Wl=new we,Xl=new we,Yl=new we;class Sn{constructor(t=new O,e=new O,i=new O){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Pn.subVectors(t,e),s.cross(Pn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Pn.subVectors(s,e),mi.subVectors(i,e),Hl.subVectors(t,e);const o=Pn.dot(Pn),a=Pn.dot(mi),l=Pn.dot(Hl),c=mi.dot(mi),u=mi.dot(Hl),f=o*c-a*a;if(f===0)return r.set(0,0,0),null;const h=1/f,d=(c*l-a*u)*h,g=(o*u-a*l)*h;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,gi)===null?!1:gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,gi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,gi.x),l.addScaledVector(o,gi.y),l.addScaledVector(a,gi.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return Wl.setScalar(0),Xl.setScalar(0),Yl.setScalar(0),Wl.fromBufferAttribute(t,e),Xl.fromBufferAttribute(t,i),Yl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Wl,r.x),o.addScaledVector(Xl,r.y),o.addScaledVector(Yl,r.z),o}static isFrontFacing(t,e,i,s){return Pn.subVectors(i,e),mi.subVectors(t,e),Pn.cross(mi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pn.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),Pn.cross(mi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Sn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;zs.subVectors(s,i),Hs.subVectors(r,i),Gl.subVectors(t,i);const l=zs.dot(Gl),c=Hs.dot(Gl);if(l<=0&&c<=0)return e.copy(i);Vl.subVectors(t,s);const u=zs.dot(Vl),f=Hs.dot(Vl);if(u>=0&&f<=u)return e.copy(s);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(zs,o);kl.subVectors(t,r);const d=zs.dot(kl),g=Hs.dot(kl);if(g>=0&&d<=g)return e.copy(r);const x=d*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Hs,a);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return Gh.subVectors(r,s),a=(f-u)/(f-u+(d-g)),e.copy(s).addScaledVector(Gh,a);const p=1/(m+x+h);return o=x*p,a=h*p,e.copy(i).addScaledVector(zs,o).addScaledVector(Hs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Cs{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Dn):Dn.fromBufferAttribute(r,o),Dn.applyMatrix4(t.matrixWorld),this.expandByPoint(Dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ho.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ho.copy(i.boundingBox)),Ho.applyMatrix4(t.matrixWorld),this.union(Ho)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Dn),Dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Br),Go.subVectors(this.max,Br),Gs.subVectors(t.a,Br),Vs.subVectors(t.b,Br),ks.subVectors(t.c,Br),Xi.subVectors(Vs,Gs),Yi.subVectors(ks,Vs),fs.subVectors(Gs,ks);let e=[0,-Xi.z,Xi.y,0,-Yi.z,Yi.y,0,-fs.z,fs.y,Xi.z,0,-Xi.x,Yi.z,0,-Yi.x,fs.z,0,-fs.x,-Xi.y,Xi.x,0,-Yi.y,Yi.x,0,-fs.y,fs.x,0];return!ql(e,Gs,Vs,ks,Go)||(e=[1,0,0,0,1,0,0,0,1],!ql(e,Gs,Vs,ks,Go))?!1:(Vo.crossVectors(Xi,Yi),e=[Vo.x,Vo.y,Vo.z],ql(e,Gs,Vs,ks,Go))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_i),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const _i=[new O,new O,new O,new O,new O,new O,new O,new O],Dn=new O,Ho=new Cs,Gs=new O,Vs=new O,ks=new O,Xi=new O,Yi=new O,fs=new O,Br=new O,Go=new O,Vo=new O,hs=new O;function ql(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){hs.fromArray(n,r);const a=s.x*Math.abs(hs.x)+s.y*Math.abs(hs.y)+s.z*Math.abs(hs.z),l=t.dot(hs),c=e.dot(hs),u=i.dot(hs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ie=new O,ko=new Ot;let Dv=0;class ln extends os{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Dv++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Tu,this.updateRanges=[],this.gpuType=Nn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ko.fromBufferAttribute(this,e),ko.applyMatrix3(t),this.setXY(e,ko.x,ko.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix3(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Un(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=he(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Un(e,this.array)),e}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Un(e,this.array)),e}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Un(e,this.array)),e}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Un(e,this.array)),e}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),i=he(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),i=he(i,this.array),s=he(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),i=he(i,this.array),s=he(s,this.array),r=he(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Tu&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class Qm extends ln{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class t0 extends ln{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Te extends ln{constructor(t,e,i){super(new Float32Array(t),e,i)}}const Lv=new Cs,zr=new O,$l=new O;class Ps{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Lv.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zr.subVectors(t,this.center);const e=zr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(zr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):($l.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zr.copy(t.center).add($l)),this.expandByPoint(zr.copy(t.center).sub($l))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Iv=0;const Tn=new se,Kl=new Pe,Ws=new O,gn=new Cs,Hr=new Cs,Ge=new O;class He extends os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Iv++}),this.uuid=Ri(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Jx(t)?t0:Qm)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Kt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Tn.makeRotationFromQuaternion(t),this.applyMatrix4(Tn),this}rotateX(t){return Tn.makeRotationX(t),this.applyMatrix4(Tn),this}rotateY(t){return Tn.makeRotationY(t),this.applyMatrix4(Tn),this}rotateZ(t){return Tn.makeRotationZ(t),this.applyMatrix4(Tn),this}translate(t,e,i){return Tn.makeTranslation(t,e,i),this.applyMatrix4(Tn),this}scale(t,e,i){return Tn.makeScale(t,e,i),this.applyMatrix4(Tn),this}lookAt(t){return Kl.lookAt(t),Kl.updateMatrix(),this.applyMatrix4(Kl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ws).negate(),this.translate(Ws.x,Ws.y,Ws.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Te(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Vt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){re("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];gn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ge.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Ge),Ge.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Ge)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&re('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ps);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){re("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const i=this.boundingSphere.center;if(gn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Hr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ge.addVectors(gn.min,Hr.min),gn.expandByPoint(Ge),Ge.addVectors(gn.max,Hr.max),gn.expandByPoint(Ge)):(gn.expandByPoint(Hr.min),gn.expandByPoint(Hr.max))}gn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ge.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ge));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ge.fromBufferAttribute(a,c),l&&(Ws.fromBufferAttribute(t,c),Ge.add(Ws)),s=Math.max(s,i.distanceToSquared(Ge))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&re('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){re("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new ln(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let v=0;v<i.count;v++)a[v]=new O,l[v]=new O;const c=new O,u=new O,f=new O,h=new Ot,d=new Ot,g=new Ot,x=new O,m=new O;function p(v,A,I){c.fromBufferAttribute(i,v),u.fromBufferAttribute(i,A),f.fromBufferAttribute(i,I),h.fromBufferAttribute(r,v),d.fromBufferAttribute(r,A),g.fromBufferAttribute(r,I),u.sub(c),f.sub(c),d.sub(h),g.sub(h);const D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(D),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(D),a[v].add(x),a[A].add(x),a[I].add(x),l[v].add(m),l[A].add(m),l[I].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let v=0,A=S.length;v<A;++v){const I=S[v],D=I.start,N=I.count;for(let q=D,Z=D+N;q<Z;q+=3)p(t.getX(q+0),t.getX(q+1),t.getX(q+2))}const T=new O,M=new O,w=new O,b=new O;function R(v){w.fromBufferAttribute(s,v),b.copy(w);const A=a[v];T.copy(A),T.sub(w.multiplyScalar(w.dot(A))).normalize(),M.crossVectors(b,A);const D=M.dot(l[v])<0?-1:1;o.setXYZW(v,T.x,T.y,T.z,D)}for(let v=0,A=S.length;v<A;++v){const I=S[v],D=I.start,N=I.count;for(let q=D,Z=D+N;q<Z;q+=3)R(t.getX(q+0)),R(t.getX(q+1)),R(t.getX(q+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new ln(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const s=new O,r=new O,o=new O,a=new O,l=new O,c=new O,u=new O,f=new O;if(t)for(let h=0,d=t.count;h<d;h+=3){const g=t.getX(h+0),x=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=e.count;h<d;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ge.fromBufferAttribute(t,e),Ge.normalize(),t.setXYZ(e,Ge.x,Ge.y,Ge.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let d=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?d=l[x]*a.data.stride+a.offset:d=l[x]*u;for(let p=0;p<u;p++)h[g++]=c[d++]}return new ln(h,u,f)}if(this.index===null)return Vt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new He,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=t(h,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],f=r[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Uv{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Tu,this.updateRanges=[],this.version=0,this.uuid=Ri()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ri()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ri()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const en=new O;class ja{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)en.fromBufferAttribute(this,e),en.applyMatrix4(t),this.setXYZ(e,en.x,en.y,en.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)en.fromBufferAttribute(this,e),en.applyNormalMatrix(t),this.setXYZ(e,en.x,en.y,en.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)en.fromBufferAttribute(this,e),en.transformDirection(t),this.setXYZ(e,en.x,en.y,en.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Un(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=he(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Un(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Un(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Un(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Un(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),i=he(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),i=he(i,this.array),s=he(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),i=he(i,this.array),s=he(s,this.array),r=he(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Ja("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new ln(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ja(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Ja("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Nv=0;class as extends os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nv++}),this.uuid=Ri(),this.name="",this.type="Material",this.blending=_r,this.side=rs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oc,this.blendDst=Bc,this.blendEquation=_s,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ut(0,0,0),this.blendAlpha=0,this.depthFunc=br,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ah,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Us,this.stencilZFail=Us,this.stencilZPass=Us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Vt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Vt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==_r&&(i.blending=this.blending),this.side!==rs&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Oc&&(i.blendSrc=this.blendSrc),this.blendDst!==Bc&&(i.blendDst=this.blendDst),this.blendEquation!==_s&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==br&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ah&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Us&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Us&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Us&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ut().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ot().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ot().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class e0 extends as{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ut(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Xs;const Gr=new O,Ys=new O,qs=new O,$s=new Ot,Vr=new Ot,n0=new se,Wo=new O,kr=new O,Xo=new O,Vh=new Ot,Zl=new Ot,kh=new Ot;class Fv extends Pe{constructor(t=new e0){if(super(),this.isSprite=!0,this.type="Sprite",Xs===void 0){Xs=new He;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Uv(e,5);Xs.setIndex([0,1,2,0,2,3]),Xs.setAttribute("position",new ja(i,3,0,!1)),Xs.setAttribute("uv",new ja(i,2,3,!1))}this.geometry=Xs,this.material=t,this.center=new Ot(.5,.5),this.count=1}raycast(t,e){t.camera===null&&re('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ys.setFromMatrixScale(this.matrixWorld),n0.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),qs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ys.multiplyScalar(-qs.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;Yo(Wo.set(-.5,-.5,0),qs,o,Ys,s,r),Yo(kr.set(.5,-.5,0),qs,o,Ys,s,r),Yo(Xo.set(.5,.5,0),qs,o,Ys,s,r),Vh.set(0,0),Zl.set(1,0),kh.set(1,1);let a=t.ray.intersectTriangle(Wo,kr,Xo,!1,Gr);if(a===null&&(Yo(kr.set(-.5,.5,0),qs,o,Ys,s,r),Zl.set(0,1),a=t.ray.intersectTriangle(Wo,Xo,kr,!1,Gr),a===null))return;const l=t.ray.origin.distanceTo(Gr);l<t.near||l>t.far||e.push({distance:l,point:Gr.clone(),uv:Sn.getInterpolation(Gr,Wo,kr,Xo,Vh,Zl,kh,new Ot),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Yo(n,t,e,i,s,r){$s.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(Vr.x=r*$s.x-s*$s.y,Vr.y=s*$s.x+r*$s.y):Vr.copy($s),n.copy(t),n.x+=Vr.x,n.y+=Vr.y,n.applyMatrix4(n0)}const xi=new O,Jl=new O,qo=new O,qi=new O,jl=new O,$o=new O,Ql=new O;class Po{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=xi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(xi.copy(this.origin).addScaledVector(this.direction,e),xi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Jl.copy(t).add(e).multiplyScalar(.5),qo.copy(e).sub(t).normalize(),qi.copy(this.origin).sub(Jl);const r=t.distanceTo(e)*.5,o=-this.direction.dot(qo),a=qi.dot(this.direction),l=-qi.dot(qo),c=qi.lengthSq(),u=Math.abs(1-o*o);let f,h,d,g;if(u>0)if(f=o*l-a,h=o*a-l,g=r*u,f>=0)if(h>=-g)if(h<=g){const x=1/u;f*=x,h*=x,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*r+a)),h=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-r,-l),r),d=h*(h+2*l)+c):(f=Math.max(0,-(o*r+a)),h=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+h*(h+2*l)+c);else h=o>0?-r:r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Jl).addScaledVector(qo,h),d}intersectSphere(t,e){xi.subVectors(t.center,this.origin);const i=xi.dot(this.direction),s=xi.dot(xi)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,xi)!==null}intersectTriangle(t,e,i,s,r){jl.subVectors(e,t),$o.subVectors(i,t),Ql.crossVectors(jl,$o);let o=this.direction.dot(Ql),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;qi.subVectors(this.origin,t);const l=a*this.direction.dot($o.crossVectors(qi,$o));if(l<0)return null;const c=a*this.direction.dot(jl.cross(qi));if(c<0||l+c>o)return null;const u=-a*qi.dot(Ql);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class le extends as{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=df,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Wh=new se,ds=new Po,Ko=new Ps,Xh=new O,Zo=new O,Jo=new O,jo=new O,tc=new O,Qo=new O,Yh=new O,ta=new O;class St extends Pe{constructor(t=new He,e=new le){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Qo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],f=r[l];u!==0&&(tc.fromBufferAttribute(f,t),o?Qo.addScaledVector(tc,u):Qo.addScaledVector(tc.sub(e),u))}e.add(Qo)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ko.copy(i.boundingSphere),Ko.applyMatrix4(r),ds.copy(t.ray).recast(t.near),!(Ko.containsPoint(ds.origin)===!1&&(ds.intersectSphere(Ko,Xh)===null||ds.origin.distanceToSquared(Xh)>(t.far-t.near)**2))&&(Wh.copy(r).invert(),ds.copy(t.ray).applyMatrix4(Wh),!(i.boundingBox!==null&&ds.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ds)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=h.length;g<x;g++){const m=h[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),T=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let M=S,w=T;M<w;M+=3){const b=a.getX(M),R=a.getX(M+1),v=a.getX(M+2);s=ea(this,p,t,i,c,u,f,b,R,v),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const S=a.getX(m),T=a.getX(m+1),M=a.getX(m+2);s=ea(this,o,t,i,c,u,f,S,T,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=h.length;g<x;g++){const m=h[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),T=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let M=S,w=T;M<w;M+=3){const b=M,R=M+1,v=M+2;s=ea(this,p,t,i,c,u,f,b,R,v),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const S=m,T=m+1,M=m+2;s=ea(this,o,t,i,c,u,f,S,T,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Ov(n,t,e,i,s,r,o,a){let l;if(t.side===hn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===rs,a),l===null)return null;ta.copy(a),ta.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(ta);return c<e.near||c>e.far?null:{distance:c,point:ta.clone(),object:n}}function ea(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,Zo),n.getVertexPosition(l,Jo),n.getVertexPosition(c,jo);const u=Ov(n,t,e,i,Zo,Jo,jo,Yh);if(u){const f=new O;Sn.getBarycoord(Yh,Zo,Jo,jo,f),s&&(u.uv=Sn.getInterpolatedAttribute(s,a,l,c,f,new Ot)),r&&(u.uv1=Sn.getInterpolatedAttribute(r,a,l,c,f,new Ot)),o&&(u.normal=Sn.getInterpolatedAttribute(o,a,l,c,f,new O),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new O,materialIndex:0};Sn.getNormal(Zo,Jo,jo,h.normal),u.face=h,u.barycoord=f}return u}class i0 extends Qe{constructor(t=null,e=1,i=1,s,r,o,a,l,c=We,u=We,f,h){super(null,o,a,l,c,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wu extends ln{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ks=new se,qh=new se,na=[],$h=new Cs,Bv=new se,Wr=new St,Xr=new Ps;class s0 extends St{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new wu(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Bv)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Cs),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ks),$h.copy(t.boundingBox).applyMatrix4(Ks),this.boundingBox.union($h)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ps),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ks),Xr.copy(t.boundingSphere).applyMatrix4(Ks),this.boundingSphere.union(Xr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(Wr.geometry=this.geometry,Wr.material=this.material,Wr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xr.copy(this.boundingSphere),Xr.applyMatrix4(i),t.ray.intersectsSphere(Xr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ks),qh.multiplyMatrices(i,Ks),Wr.matrixWorld=qh,Wr.raycast(t,na);for(let o=0,a=na.length;o<a;o++){const l=na[o];l.instanceId=r,l.object=this,e.push(l)}na.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new wu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new i0(new Float32Array(s*this.count),s,this.count,_f,Nn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;return r[l]=a,r.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ec=new O,zv=new O,Hv=new Kt;class Qi{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=ec.subVectors(i,e).cross(zv.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(ec),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Hv.getNormalMatrix(t),s=this.coplanarPoint(ec).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ps=new Ps,Gv=new Ot(.5,.5),ia=new O;class Af{constructor(t=new Qi,e=new Qi,i=new Qi,s=new Qi,r=new Qi,o=new Qi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=si,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],f=r[5],h=r[6],d=r[7],g=r[8],x=r[9],m=r[10],p=r[11],S=r[12],T=r[13],M=r[14],w=r[15];if(s[0].setComponents(c-o,d-u,p-g,w-S).normalize(),s[1].setComponents(c+o,d+u,p+g,w+S).normalize(),s[2].setComponents(c+a,d+f,p+x,w+T).normalize(),s[3].setComponents(c-a,d-f,p-x,w-T).normalize(),i)s[4].setComponents(l,h,m,M).normalize(),s[5].setComponents(c-l,d-h,p-m,w-M).normalize();else if(s[4].setComponents(c-l,d-h,p-m,w-M).normalize(),e===si)s[5].setComponents(c+l,d+h,p+m,w+M).normalize();else if(e===yo)s[5].setComponents(l,h,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ps.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ps.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ps)}intersectsSprite(t){ps.center.set(0,0,0);const e=Gv.distanceTo(t.center);return ps.radius=.7071067811865476+e,ps.applyMatrix4(t.matrixWorld),this.intersectsSphere(ps)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(ia.x=s.normal.x>0?t.max.x:t.min.x,ia.y=s.normal.y>0?t.max.y:t.min.y,ia.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ia)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class r0 extends as{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ut(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Qa=new O,tl=new O,Kh=new se,Yr=new Po,sa=new Ps,nc=new O,Zh=new O;class Vv extends Pe{constructor(t=new He,e=new r0){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Qa.fromBufferAttribute(e,s-1),tl.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Qa.distanceTo(tl);t.setAttribute("lineDistance",new Te(i,1))}else Vt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),sa.copy(i.boundingSphere),sa.applyMatrix4(s),sa.radius+=r,t.ray.intersectsSphere(sa)===!1)return;Kh.copy(s).invert(),Yr.copy(t.ray).applyMatrix4(Kh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=d,m=g-1;x<m;x+=c){const p=u.getX(x),S=u.getX(x+1),T=ra(this,t,Yr,l,p,S,x);T&&e.push(T)}if(this.isLineLoop){const x=u.getX(g-1),m=u.getX(d),p=ra(this,t,Yr,l,x,m,g-1);p&&e.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=d,m=g-1;x<m;x+=c){const p=ra(this,t,Yr,l,x,x+1,x);p&&e.push(p)}if(this.isLineLoop){const x=ra(this,t,Yr,l,g-1,d,g-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ra(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(Qa.fromBufferAttribute(a,s),tl.fromBufferAttribute(a,r),e.distanceSqToSegment(Qa,tl,nc,Zh)>i)return;nc.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(nc);if(!(c<t.near||c>t.far))return{distance:c,point:Zh.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const Jh=new O,jh=new O;class kv extends Vv{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Jh.fromBufferAttribute(e,s),jh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Jh.distanceTo(jh);t.setAttribute("lineDistance",new Te(i,1))}else Vt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class o0 extends as{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ut(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Qh=new se,Au=new Po,oa=new Ps,aa=new O;class Wv extends Pe{constructor(t=new He,e=new o0){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),oa.copy(i.boundingSphere),oa.applyMatrix4(s),oa.radius+=r,t.ray.intersectsSphere(oa)===!1)return;Qh.copy(s).invert(),Au.copy(t.ray).applyMatrix4(Qh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=h,x=d;g<x;g++){const m=c.getX(g);aa.fromBufferAttribute(f,m),td(aa,m,l,s,t,e,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=h,x=d;g<x;g++)aa.fromBufferAttribute(f,g),td(aa,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function td(n,t,e,i,s,r,o){const a=Au.distanceSqToPoint(n);if(a<e){const l=new O;Au.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class a0 extends Qe{constructor(t=[],e=Es,i,s,r,o,a,l,c,u){super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Xe extends Qe{constructor(t,e,i,s,r,o,a,l,c){super(t,e,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Tr extends Qe{constructor(t,e,i=ci,s,r,o,a=We,l=We,c,u=Ni,f=1){if(u!==Ni&&u!==Ms)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:f};super(h,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ef(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Xv extends Tr{constructor(t,e=ci,i=Es,s,r,o=We,a=We,l,c=Ni){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,i,s,r,o,a,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class l0 extends Qe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class It extends He{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Te(c,3)),this.setAttribute("normal",new Te(u,3)),this.setAttribute("uv",new Te(f,2));function g(x,m,p,S,T,M,w,b,R,v,A){const I=M/R,D=w/v,N=M/2,q=w/2,Z=b/2,G=R+1,B=v+1;let U=0,k=0;const J=new O;for(let at=0;at<B;at++){const gt=at*D-q;for(let vt=0;vt<G;vt++){const ie=vt*I-N;J[x]=ie*S,J[m]=gt*T,J[p]=Z,c.push(J.x,J.y,J.z),J[x]=0,J[m]=0,J[p]=b>0?1:-1,u.push(J.x,J.y,J.z),f.push(vt/R),f.push(1-at/v),U+=1}}for(let at=0;at<v;at++)for(let gt=0;gt<R;gt++){const vt=h+gt+G*at,ie=h+gt+G*(at+1),ve=h+(gt+1)+G*(at+1),Yt=h+(gt+1)+G*at;l.push(vt,ie,Yt),l.push(ie,ve,Yt),k+=6}a.addGroup(d,k,A),d+=k,h+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new It(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Rf extends He{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new O,u=new Ot;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=e;f++,h+=3){const d=i+f/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/t+1)/2,u.y=(o[h+1]/t+1)/2,l.push(u.x,u.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Te(o,3)),this.setAttribute("normal",new Te(a,3)),this.setAttribute("uv",new Te(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rf(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Fi extends He{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],h=[],d=[];let g=0;const x=[],m=i/2;let p=0;S(),o===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(u),this.setAttribute("position",new Te(f,3)),this.setAttribute("normal",new Te(h,3)),this.setAttribute("uv",new Te(d,2));function S(){const M=new O,w=new O;let b=0;const R=(e-t)/i;for(let v=0;v<=r;v++){const A=[],I=v/r,D=I*(e-t)+t;for(let N=0;N<=s;N++){const q=N/s,Z=q*l+a,G=Math.sin(Z),B=Math.cos(Z);w.x=D*G,w.y=-I*i+m,w.z=D*B,f.push(w.x,w.y,w.z),M.set(G,R,B).normalize(),h.push(M.x,M.y,M.z),d.push(q,1-I),A.push(g++)}x.push(A)}for(let v=0;v<s;v++)for(let A=0;A<r;A++){const I=x[A][v],D=x[A+1][v],N=x[A+1][v+1],q=x[A][v+1];(t>0||A!==0)&&(u.push(I,D,q),b+=3),(e>0||A!==r-1)&&(u.push(D,N,q),b+=3)}c.addGroup(p,b,0),p+=b}function T(M){const w=g,b=new Ot,R=new O;let v=0;const A=M===!0?t:e,I=M===!0?1:-1;for(let N=1;N<=s;N++)f.push(0,m*I,0),h.push(0,I,0),d.push(.5,.5),g++;const D=g;for(let N=0;N<=s;N++){const Z=N/s*l+a,G=Math.cos(Z),B=Math.sin(Z);R.x=A*B,R.y=m*I,R.z=A*G,f.push(R.x,R.y,R.z),h.push(0,I,0),b.x=G*.5+.5,b.y=B*.5*I+.5,d.push(b.x,b.y),g++}for(let N=0;N<s;N++){const q=w+N,Z=D+N;M===!0?u.push(Z,Z+1,q):u.push(Z+1,Z,q),v+=3}c.addGroup(p,v,M===!0?1:2),p+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const la=new O,ca=new O,ic=new O,ua=new Sn;class c0 extends He{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(vr*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],f=new Array(3),h={},d=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:x,b:m,c:p}=ua;if(x.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),ua.getNormal(ic),f[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,f[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,f[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let S=0;S<3;S++){const T=(S+1)%3,M=f[S],w=f[T],b=ua[u[S]],R=ua[u[T]],v=`${M}_${w}`,A=`${w}_${M}`;A in h&&h[A]?(ic.dot(h[A].normal)<=r&&(d.push(b.x,b.y,b.z),d.push(R.x,R.y,R.z)),h[A]=null):v in h||(h[v]={index0:c[S],index1:c[T],normal:ic.clone()})}}for(const g in h)if(h[g]){const{index0:x,index1:m}=h[g];la.fromBufferAttribute(a,x),ca.fromBufferAttribute(a,m),d.push(la.x,la.y,la.z),d.push(ca.x,ca.y,ca.z)}this.setAttribute("position",new Te(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Cf extends He{constructor(t=[new Ot(0,-.5),new Ot(.5,0),new Ot(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=ne(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],u=1/e,f=new O,h=new Ot,d=new O,g=new O,x=new O;let m=0,p=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:m=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,d.x=p*1,d.y=-m,d.z=p*0,x.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(x.x,x.y,x.z);break;default:m=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),l.push(d.x,d.y,d.z),x.copy(g)}for(let S=0;S<=e;S++){const T=i+S*u*s,M=Math.sin(T),w=Math.cos(T);for(let b=0;b<=t.length-1;b++){f.x=t[b].x*M,f.y=t[b].y,f.z=t[b].x*w,o.push(f.x,f.y,f.z),h.x=S/e,h.y=b/(t.length-1),a.push(h.x,h.y);const R=l[3*b+0]*M,v=l[3*b+1],A=l[3*b+0]*w;c.push(R,v,A)}}for(let S=0;S<e;S++)for(let T=0;T<t.length-1;T++){const M=T+S*t.length,w=M,b=M+t.length,R=M+t.length+1,v=M+1;r.push(w,b,v),r.push(R,v,b)}this.setIndex(r),this.setAttribute("position",new Te(o,3)),this.setAttribute("uv",new Te(a,2)),this.setAttribute("normal",new Te(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cf(t.points,t.segments,t.phiStart,t.phiLength)}}class Ee extends He{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,f=t/a,h=e/l,d=[],g=[],x=[],m=[];for(let p=0;p<u;p++){const S=p*h-o;for(let T=0;T<c;T++){const M=T*f-r;g.push(M,-S,0),x.push(0,0,1),m.push(T/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){const T=S+c*p,M=S+c*(p+1),w=S+1+c*(p+1),b=S+1+c*p;d.push(T,M,b),d.push(M,w,b)}this.setIndex(d),this.setAttribute("position",new Te(g,3)),this.setAttribute("normal",new Te(x,3)),this.setAttribute("uv",new Te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ee(t.width,t.height,t.widthSegments,t.heightSegments)}}class Eo extends He{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new O,h=new O,d=[],g=[],x=[],m=[];for(let p=0;p<=i;p++){const S=[],T=p/i,M=o+T*a,w=t*Math.cos(M),b=Math.sqrt(t*t-w*w);let R=0;p===0&&o===0?R=.5/e:p===i&&l===Math.PI&&(R=-.5/e);for(let v=0;v<=e;v++){const A=v/e,I=s+A*r;f.x=-b*Math.cos(I),f.y=w,f.z=b*Math.sin(I),g.push(f.x,f.y,f.z),h.copy(f).normalize(),x.push(h.x,h.y,h.z),m.push(A+R,1-T),S.push(c++)}u.push(S)}for(let p=0;p<i;p++)for(let S=0;S<e;S++){const T=u[p][S+1],M=u[p][S],w=u[p+1][S],b=u[p+1][S+1];(p!==0||o>0)&&d.push(T,M,b),(p!==i-1||l<Math.PI)&&d.push(M,w,b)}this.setIndex(d),this.setAttribute("position",new Te(g,3)),this.setAttribute("normal",new Te(x,3)),this.setAttribute("uv",new Te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Eo(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function wr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(ed(s))s.isRenderTargetTexture?(Vt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(ed(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function rn(n){const t={};for(let e=0;e<n.length;e++){const i=wr(n[e]);for(const s in i)t[s]=i[s]}return t}function ed(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Yv(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function u0(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}const qv={clone:wr,merge:rn};var $v=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ui extends as{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$v,this.fragmentShader=Kv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=wr(t.uniforms),this.uniformsGroups=Yv(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const i in t.uniforms){const s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new Ut().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ot().fromArray(s.value);break;case"v3":this.uniforms[i].value=new O().fromArray(s.value);break;case"v4":this.uniforms[i].value=new we().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Kt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new se().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Zv extends ui{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Xt extends as{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Eu,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=df,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Jv extends as{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class jv extends as{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class f0 extends Pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ut(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const sc=new se,nd=new O,id=new O;class Qv{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ot(512,512),this.mapType=Mn,this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Af,this._frameExtents=new Ot(1,1),this._viewportCount=1,this._viewports=[new we(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;nd.setFromMatrixPosition(t.matrixWorld),e.position.copy(nd),id.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(id),e.updateMatrixWorld(),sc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sc,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===yo||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(sc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const fa=new O,ha=new Gn,$n=new O;class h0 extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(fa,ha,$n),$n.x===1&&$n.y===1&&$n.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fa,ha,$n.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(fa,ha,$n),$n.x===1&&$n.y===1&&$n.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fa,ha,$n.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const $i=new O,sd=new Ot,rd=new Ot;class Ln extends h0{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=bo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(vr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return bo*2*Math.atan(Math.tan(vr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){$i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($i.x,$i.y).multiplyScalar(-t/$i.z),$i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($i.x,$i.y).multiplyScalar(-t/$i.z)}getViewSize(t,e){return this.getViewBounds(t,sd,rd),e.subVectors(rd,sd)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(vr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class ml extends h0{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class tM extends Qv{constructor(){super(new ml(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class eM extends f0{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.shadow=new tM}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class nM extends f0{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Zs=-90,Js=1;class iM extends Pe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ln(Zs,Js,t,e);s.layers=this.layers,this.add(s);const r=new Ln(Zs,Js,t,e);r.layers=this.layers,this.add(r);const o=new Ln(Zs,Js,t,e);o.layers=this.layers,this.add(o);const a=new Ln(Zs,Js,t,e);a.layers=this.layers,this.add(a);const l=new Ln(Zs,Js,t,e);l.layers=this.layers,this.add(l);const c=new Ln(Zs,Js,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===si)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===yo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class sM extends Ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const od=new se;class rM{constructor(t,e,i=0,s=1/0){this.ray=new Po(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Tf,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):re("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return od.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(od),this}intersectObject(t,e=!0,i=[]){return Ru(t,this,i,e),i.sort(ad),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Ru(t[s],this,i,e);return i.sort(ad),i}}function ad(n,t){return n.distance-t.distance}function Ru(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Ru(r[o],t,e,!0)}}class oM{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Vt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class ld{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ne(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(ne(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Bf=class Bf{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Bf.prototype.isMatrix2=!0;let cd=Bf;class aM extends os{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Vt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function ud(n,t,e,i){const s=lM(i);switch(e){case $m:return n*t;case _f:return n*t/s.components*s.byteLength;case xf:return n*t/s.components*s.byteLength;case Ts:return n*t*2/s.components*s.byteLength;case vf:return n*t*2/s.components*s.byteLength;case Km:return n*t*3/s.components*s.byteLength;case Fn:return n*t*4/s.components*s.byteLength;case Mf:return n*t*4/s.components*s.byteLength;case Ia:case Ua:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Na:case Fa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Kc:case Jc:return Math.max(n,16)*Math.max(t,8)/4;case $c:case Zc:return Math.max(n,8)*Math.max(t,8)/2;case jc:case Qc:case eu:case nu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case tu:case Ya:case iu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case su:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ru:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case ou:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case au:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case lu:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case cu:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case uu:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case fu:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case hu:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case du:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case pu:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case mu:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case gu:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case _u:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case xu:case vu:case Mu:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Su:case yu:return Math.ceil(n/4)*Math.ceil(t/4)*8;case qa:case bu:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function lM(n){switch(n){case Mn:case Wm:return{byteLength:1,components:1};case Mo:case Xm:case Ui:return{byteLength:2,components:1};case mf:case gf:return{byteLength:2,components:4};case ci:case pf:case Nn:return{byteLength:4,components:1};case Ym:case qm:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hf}}));typeof window<"u"&&(window.__THREE__?Vt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hf);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function d0(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function cM(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],x=f[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++h,f[h]=x)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const x=f[d];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var uM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,hM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,_M=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,vM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,MM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,SM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,bM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,EM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,TM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,wM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,AM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,RM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,CM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,PM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,DM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,LM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,IM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,UM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,NM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,FM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,OM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,BM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,HM="gl_FragColor = linearToOutputTexel( gl_FragColor );",GM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,VM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,kM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,WM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,XM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,YM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,qM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$M=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,KM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ZM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,JM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,QM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tS=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,eS=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,nS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,iS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sS=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,oS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,aS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lS=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,cS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,uS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,fS=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hS=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,dS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_S=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,MS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,SS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ES=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,TS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wS=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,AS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,RS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,CS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,PS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,DS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,LS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,IS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,US=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,NS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,FS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,OS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,BS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,HS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,GS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,VS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,WS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,XS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,YS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,qS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,$S=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,KS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ZS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,JS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,QS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ty=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ey=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ny=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,iy=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,sy=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ry=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,oy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ay=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ly=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,cy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const uy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fy=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,py=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,my=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,_y=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,xy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,vy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,My=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,by=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ey=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ty=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ay=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ry=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Cy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Py=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Dy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ly=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Iy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ny=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Oy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,By=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,zy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ky=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qt={alphahash_fragment:uM,alphahash_pars_fragment:fM,alphamap_fragment:hM,alphamap_pars_fragment:dM,alphatest_fragment:pM,alphatest_pars_fragment:mM,aomap_fragment:gM,aomap_pars_fragment:_M,batching_pars_vertex:xM,batching_vertex:vM,begin_vertex:MM,beginnormal_vertex:SM,bsdfs:yM,iridescence_fragment:bM,bumpmap_pars_fragment:EM,clipping_planes_fragment:TM,clipping_planes_pars_fragment:wM,clipping_planes_pars_vertex:AM,clipping_planes_vertex:RM,color_fragment:CM,color_pars_fragment:PM,color_pars_vertex:DM,color_vertex:LM,common:IM,cube_uv_reflection_fragment:UM,defaultnormal_vertex:NM,displacementmap_pars_vertex:FM,displacementmap_vertex:OM,emissivemap_fragment:BM,emissivemap_pars_fragment:zM,colorspace_fragment:HM,colorspace_pars_fragment:GM,envmap_fragment:VM,envmap_common_pars_fragment:kM,envmap_pars_fragment:WM,envmap_pars_vertex:XM,envmap_physical_pars_fragment:nS,envmap_vertex:YM,fog_vertex:qM,fog_pars_vertex:$M,fog_fragment:KM,fog_pars_fragment:ZM,gradientmap_pars_fragment:JM,lightmap_pars_fragment:jM,lights_lambert_fragment:QM,lights_lambert_pars_fragment:tS,lights_pars_begin:eS,lights_toon_fragment:iS,lights_toon_pars_fragment:sS,lights_phong_fragment:rS,lights_phong_pars_fragment:oS,lights_physical_fragment:aS,lights_physical_pars_fragment:lS,lights_fragment_begin:cS,lights_fragment_maps:uS,lights_fragment_end:fS,lightprobes_pars_fragment:hS,logdepthbuf_fragment:dS,logdepthbuf_pars_fragment:pS,logdepthbuf_pars_vertex:mS,logdepthbuf_vertex:gS,map_fragment:_S,map_pars_fragment:xS,map_particle_fragment:vS,map_particle_pars_fragment:MS,metalnessmap_fragment:SS,metalnessmap_pars_fragment:yS,morphinstance_vertex:bS,morphcolor_vertex:ES,morphnormal_vertex:TS,morphtarget_pars_vertex:wS,morphtarget_vertex:AS,normal_fragment_begin:RS,normal_fragment_maps:CS,normal_pars_fragment:PS,normal_pars_vertex:DS,normal_vertex:LS,normalmap_pars_fragment:IS,clearcoat_normal_fragment_begin:US,clearcoat_normal_fragment_maps:NS,clearcoat_pars_fragment:FS,iridescence_pars_fragment:OS,opaque_fragment:BS,packing:zS,premultiplied_alpha_fragment:HS,project_vertex:GS,dithering_fragment:VS,dithering_pars_fragment:kS,roughnessmap_fragment:WS,roughnessmap_pars_fragment:XS,shadowmap_pars_fragment:YS,shadowmap_pars_vertex:qS,shadowmap_vertex:$S,shadowmask_pars_fragment:KS,skinbase_vertex:ZS,skinning_pars_vertex:JS,skinning_vertex:jS,skinnormal_vertex:QS,specularmap_fragment:ty,specularmap_pars_fragment:ey,tonemapping_fragment:ny,tonemapping_pars_fragment:iy,transmission_fragment:sy,transmission_pars_fragment:ry,uv_pars_fragment:oy,uv_pars_vertex:ay,uv_vertex:ly,worldpos_vertex:cy,background_vert:uy,background_frag:fy,backgroundCube_vert:hy,backgroundCube_frag:dy,cube_vert:py,cube_frag:my,depth_vert:gy,depth_frag:_y,distance_vert:xy,distance_frag:vy,equirect_vert:My,equirect_frag:Sy,linedashed_vert:yy,linedashed_frag:by,meshbasic_vert:Ey,meshbasic_frag:Ty,meshlambert_vert:wy,meshlambert_frag:Ay,meshmatcap_vert:Ry,meshmatcap_frag:Cy,meshnormal_vert:Py,meshnormal_frag:Dy,meshphong_vert:Ly,meshphong_frag:Iy,meshphysical_vert:Uy,meshphysical_frag:Ny,meshtoon_vert:Fy,meshtoon_frag:Oy,points_vert:By,points_frag:zy,shadow_vert:Hy,shadow_frag:Gy,sprite_vert:Vy,sprite_frag:ky},Et={common:{diffuse:{value:new Ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new O},probesMax:{value:new O},probesResolution:{value:new O}},points:{diffuse:{value:new Ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new Ut(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},ei={basic:{uniforms:rn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:rn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Ut(0)},envMapIntensity:{value:1}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:rn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Ut(0)},specular:{value:new Ut(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:rn([Et.common,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.roughnessmap,Et.metalnessmap,Et.fog,Et.lights,{emissive:{value:new Ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:rn([Et.common,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.gradientmap,Et.fog,Et.lights,{emissive:{value:new Ut(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:rn([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:rn([Et.points,Et.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:rn([Et.common,Et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:rn([Et.common,Et.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:rn([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:rn([Et.sprite,Et.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distance:{uniforms:rn([Et.common,Et.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distance_vert,fragmentShader:Qt.distance_frag},shadow:{uniforms:rn([Et.lights,Et.fog,{color:{value:new Ut(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};ei.physical={uniforms:rn([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new Ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new Ut(0)},specularColor:{value:new Ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};const da={r:0,b:0,g:0},Wy=new se,p0=new Kt;p0.set(-1,0,0,0,1,0,0,0,1);function Xy(n,t,e,i,s,r){const o=new Ut(0);let a=s===!0?0:1,l,c,u=null,f=0,h=null;function d(S){let T=S.isScene===!0?S.background:null;if(T&&T.isTexture){const M=S.backgroundBlurriness>0;T=t.get(T,M)}return T}function g(S){let T=!1;const M=d(S);M===null?m(o,a):M&&M.isColor&&(m(M,1),T=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(S,T){const M=d(T);M&&(M.isCubeTexture||M.mapping===pl)?(c===void 0&&(c=new St(new It(1,1,1),new ui({name:"BackgroundCubeMaterial",uniforms:wr(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Wy.makeRotationFromEuler(T.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(p0),c.material.toneMapped=oe.getTransfer(M.colorSpace)!==fe,(u!==M||f!==M.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,f=M.version,h=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new St(new Ee(2,2),new ui({name:"BackgroundMaterial",uniforms:wr(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:rs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=oe.getTransfer(M.colorSpace)!==fe,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||f!==M.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=M,f=M.version,h=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,T){S.getRGB(da,u0(n)),e.buffers.color.setClear(da.r,da.g,da.b,T,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,T=1){o.set(S),a=T,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(S){a=S,m(o,a)},render:g,addToRenderList:x,dispose:p}}function Yy(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(D,N,q,Z,G){let B=!1;const U=f(D,Z,q,N);r!==U&&(r=U,c(r.object)),B=d(D,Z,q,G),B&&g(D,Z,q,G),G!==null&&t.update(G,n.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,M(D,N,q,Z),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return n.createVertexArray()}function c(D){return n.bindVertexArray(D)}function u(D){return n.deleteVertexArray(D)}function f(D,N,q,Z){const G=Z.wireframe===!0;let B=i[N.id];B===void 0&&(B={},i[N.id]=B);const U=D.isInstancedMesh===!0?D.id:0;let k=B[U];k===void 0&&(k={},B[U]=k);let J=k[q.id];J===void 0&&(J={},k[q.id]=J);let at=J[G];return at===void 0&&(at=h(l()),J[G]=at),at}function h(D){const N=[],q=[],Z=[];for(let G=0;G<e;G++)N[G]=0,q[G]=0,Z[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:q,attributeDivisors:Z,object:D,attributes:{},index:null}}function d(D,N,q,Z){const G=r.attributes,B=N.attributes;let U=0;const k=q.getAttributes();for(const J in k)if(k[J].location>=0){const gt=G[J];let vt=B[J];if(vt===void 0&&(J==="instanceMatrix"&&D.instanceMatrix&&(vt=D.instanceMatrix),J==="instanceColor"&&D.instanceColor&&(vt=D.instanceColor)),gt===void 0||gt.attribute!==vt||vt&&gt.data!==vt.data)return!0;U++}return r.attributesNum!==U||r.index!==Z}function g(D,N,q,Z){const G={},B=N.attributes;let U=0;const k=q.getAttributes();for(const J in k)if(k[J].location>=0){let gt=B[J];gt===void 0&&(J==="instanceMatrix"&&D.instanceMatrix&&(gt=D.instanceMatrix),J==="instanceColor"&&D.instanceColor&&(gt=D.instanceColor));const vt={};vt.attribute=gt,gt&&gt.data&&(vt.data=gt.data),G[J]=vt,U++}r.attributes=G,r.attributesNum=U,r.index=Z}function x(){const D=r.newAttributes;for(let N=0,q=D.length;N<q;N++)D[N]=0}function m(D){p(D,0)}function p(D,N){const q=r.newAttributes,Z=r.enabledAttributes,G=r.attributeDivisors;q[D]=1,Z[D]===0&&(n.enableVertexAttribArray(D),Z[D]=1),G[D]!==N&&(n.vertexAttribDivisor(D,N),G[D]=N)}function S(){const D=r.newAttributes,N=r.enabledAttributes;for(let q=0,Z=N.length;q<Z;q++)N[q]!==D[q]&&(n.disableVertexAttribArray(q),N[q]=0)}function T(D,N,q,Z,G,B,U){U===!0?n.vertexAttribIPointer(D,N,q,G,B):n.vertexAttribPointer(D,N,q,Z,G,B)}function M(D,N,q,Z){x();const G=Z.attributes,B=q.getAttributes(),U=N.defaultAttributeValues;for(const k in B){const J=B[k];if(J.location>=0){let at=G[k];if(at===void 0&&(k==="instanceMatrix"&&D.instanceMatrix&&(at=D.instanceMatrix),k==="instanceColor"&&D.instanceColor&&(at=D.instanceColor)),at!==void 0){const gt=at.normalized,vt=at.itemSize,ie=t.get(at);if(ie===void 0)continue;const ve=ie.buffer,Yt=ie.type,tt=ie.bytesPerElement,mt=Yt===n.INT||Yt===n.UNSIGNED_INT||at.gpuType===pf;if(at.isInterleavedBufferAttribute){const ft=at.data,qt=ft.stride,$t=at.offset;if(ft.isInstancedInterleavedBuffer){for(let kt=0;kt<J.locationSize;kt++)p(J.location+kt,ft.meshPerAttribute);D.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let kt=0;kt<J.locationSize;kt++)m(J.location+kt);n.bindBuffer(n.ARRAY_BUFFER,ve);for(let kt=0;kt<J.locationSize;kt++)T(J.location+kt,vt/J.locationSize,Yt,gt,qt*tt,($t+vt/J.locationSize*kt)*tt,mt)}else{if(at.isInstancedBufferAttribute){for(let ft=0;ft<J.locationSize;ft++)p(J.location+ft,at.meshPerAttribute);D.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let ft=0;ft<J.locationSize;ft++)m(J.location+ft);n.bindBuffer(n.ARRAY_BUFFER,ve);for(let ft=0;ft<J.locationSize;ft++)T(J.location+ft,vt/J.locationSize,Yt,gt,vt*tt,vt/J.locationSize*ft*tt,mt)}}else if(U!==void 0){const gt=U[k];if(gt!==void 0)switch(gt.length){case 2:n.vertexAttrib2fv(J.location,gt);break;case 3:n.vertexAttrib3fv(J.location,gt);break;case 4:n.vertexAttrib4fv(J.location,gt);break;default:n.vertexAttrib1fv(J.location,gt)}}}}S()}function w(){A();for(const D in i){const N=i[D];for(const q in N){const Z=N[q];for(const G in Z){const B=Z[G];for(const U in B)u(B[U].object),delete B[U];delete Z[G]}}delete i[D]}}function b(D){if(i[D.id]===void 0)return;const N=i[D.id];for(const q in N){const Z=N[q];for(const G in Z){const B=Z[G];for(const U in B)u(B[U].object),delete B[U];delete Z[G]}}delete i[D.id]}function R(D){for(const N in i){const q=i[N];for(const Z in q){const G=q[Z];if(G[D.id]===void 0)continue;const B=G[D.id];for(const U in B)u(B[U].object),delete B[U];delete G[D.id]}}}function v(D){for(const N in i){const q=i[N],Z=D.isInstancedMesh===!0?D.id:0,G=q[Z];if(G!==void 0){for(const B in G){const U=G[B];for(const k in U)u(U[k].object),delete U[k];delete G[B]}delete q[Z],Object.keys(q).length===0&&delete i[N]}}}function A(){I(),o=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:I,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:S}}function qy(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function o(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),e.update(c,i,u))}function a(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let d=0;d<u;d++)h+=c[d];e.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function $y(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Fn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const v=R===Ui&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Mn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Nn&&!v)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(Vt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Vt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:T,maxFragmentUniforms:M,maxSamples:w,samples:b}}function Ky(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Qi,a=new Kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||s;return s=h,i=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const S=r?0:i,T=S*4;let M=p.clippingState||null;l.value=M,M=u(g,h,T,d);for(let w=0;w!==T;++w)M[w]=e[w];p.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,d,g){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const p=d+x*4,S=h.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let T=0,M=d;T!==x;++T,M+=4)o.copy(f[T]).applyMatrix4(S,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}const is=4,fd=[.125,.215,.35,.446,.526,.582],xs=20,Zy=256,qr=new ml,hd=new Ut;let rc=null,oc=0,ac=0,lc=!1;const Jy=new O;class dd{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=Jy}=r;rc=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),ac=this._renderer.getActiveMipmapLevel(),lc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=md(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(rc,oc,ac),this._renderer.xr.enabled=lc,t.scissorTest=!1,js(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Es||t.mapping===Er?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),rc=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),ac=this._renderer.getActiveMipmapLevel(),lc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Je,minFilter:Je,generateMipmaps:!1,type:Ui,format:Fn,colorSpace:$a,depthBuffer:!1},s=pd(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pd(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=jy(r)),this._blurMaterial=tb(r,t,e),this._ggxMaterial=Qy(r,t,e)}return s}_compileMaterial(t){const e=new St(new He,t);this._renderer.compile(e,qr)}_sceneToCubeUV(t,e,i,s,r){const l=new Ln(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(hd),f.toneMapping=zn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new St(new It,new le({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let p=!1;const S=t.background;S?S.isColor&&(m.color.copy(S),t.background=null,p=!0):(m.color.copy(hd),p=!0);for(let T=0;T<6;T++){const M=T%3;M===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[T],r.y,r.z)):M===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[T]));const w=this._cubeSize;js(s,M*w,T>2?w:0,w,w),f.setRenderTarget(s),p&&f.render(x,l),f.render(t,l)}f.toneMapping=d,f.autoClear=h,t.background=S}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Es||t.mapping===Er;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=gd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=md());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;js(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,qr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=0+c*1.25,d=f*h,{_lodMax:g}=this,x=this._sizeLods[i],m=3*x*(i>g-is?i-g+is:0),p=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-e,js(r,m,p,3*x,2*x),s.setRenderTarget(r),s.render(a,qr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,js(t,m,p,3*x,2*x),s.setRenderTarget(t),s.render(a,qr)}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&re("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=c;const h=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*xs-1),x=r/g,m=isFinite(r)?1+Math.floor(u*x):xs;m>xs&&Vt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${xs}`);const p=[];let S=0;for(let R=0;R<xs;++R){const v=R/x,A=Math.exp(-v*v/2);p.push(A),R===0?S+=A:R<m&&(S+=2*A)}for(let R=0;R<p.length;R++)p[R]=p[R]/S;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:T}=this;h.dTheta.value=g,h.mipInt.value=T-i;const M=this._sizeLods[s],w=3*M*(s>T-is?s-T+is:0),b=4*(this._cubeSize-M);js(e,w,b,3*M,2*M),l.setRenderTarget(e),l.render(f,qr)}}function jy(n){const t=[],e=[],i=[];let s=n;const r=n-is+1+fd.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>n-is?l=fd[o-n+is-1]:o===0&&(l=0),e.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,x=3,m=2,p=1,S=new Float32Array(x*g*d),T=new Float32Array(m*g*d),M=new Float32Array(p*g*d);for(let b=0;b<d;b++){const R=b%3*2/3-1,v=b>2?0:-1,A=[R,v,0,R+2/3,v,0,R+2/3,v+1,0,R,v,0,R+2/3,v+1,0,R,v+1,0];S.set(A,x*g*b),T.set(h,m*g*b);const I=[b,b,b,b,b,b];M.set(I,p*g*b)}const w=new He;w.setAttribute("position",new ln(S,x)),w.setAttribute("uv",new ln(T,m)),w.setAttribute("faceIndex",new ln(M,p)),i.push(new St(w,null)),s>is&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function pd(n,t,e){const i=new oi(n,t,e);return i.texture.mapping=pl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function js(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Qy(n,t,e){return new ui({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Zy,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:gl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function tb(n,t,e){const i=new Float32Array(xs),s=new O(0,1,0);return new ui({name:"SphericalGaussianBlur",defines:{n:xs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:gl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function md(){return new ui({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function gd(){return new ui({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function gl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class m0 extends oi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new a0(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new It(5,5,5),r=new ui({name:"CubemapFromEquirect",uniforms:wr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:hn,blending:Ai});r.uniforms.tEquirect.value=e;const o=new St(s,r),a=e.minFilter;return e.minFilter===vs&&(e.minFilter=Je),new iM(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}function eb(n){let t=new WeakMap,e=new WeakMap,i=null;function s(h,d=!1){return h==null?null:d?o(h):r(h)}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===La||d===Dl)if(t.has(h)){const g=t.get(h).texture;return a(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const x=new m0(g.height);return x.fromEquirectangularTexture(n,h),t.set(h,x),h.addEventListener("dispose",c),a(x.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){const d=h.mapping,g=d===La||d===Dl,x=d===Es||d===Er;if(g||x){let m=e.get(h);const p=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return i===null&&(i=new dd(n)),m=g?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),m.texture;if(m!==void 0)return m.texture;{const S=h.image;return g&&S&&S.height>0||x&&S&&l(S)?(i===null&&(i=new dd(n)),m=g?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function a(h,d){return d===La?h.mapping=Es:d===Dl&&(h.mapping=Er),h}function l(h){let d=0;const g=6;for(let x=0;x<g;x++)h[x]!==void 0&&d++;return d===g}function c(h){const d=h.target;d.removeEventListener("dispose",c);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function nb(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&xr("WebGLRenderer: "+i+" extension not supported."),s}}}function ib(n,t,e,i){const s={},r=new WeakMap;function o(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete s[h.id];const d=r.get(h);d&&(t.remove(d),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function l(f){const h=f.attributes;for(const d in h)t.update(h[d],n.ARRAY_BUFFER)}function c(f){const h=[],d=f.index,g=f.attributes.position;let x=0;if(g===void 0)return;if(d!==null){const S=d.array;x=d.version;for(let T=0,M=S.length;T<M;T+=3){const w=S[T+0],b=S[T+1],R=S[T+2];h.push(w,b,b,R,R,w)}}else{const S=g.array;x=g.version;for(let T=0,M=S.length/3-1;T<M;T+=3){const w=T+0,b=T+1,R=T+2;h.push(w,b,b,R,R,w)}}const m=new(g.count>=65535?t0:Qm)(h,1);m.version=x;const p=r.get(f);p&&t.remove(p),r.set(f,m)}function u(f){const h=r.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function sb(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,h){n.drawElements(i,h,r,f*o),e.update(h,i,1)}function c(f,h,d){d!==0&&(n.drawElementsInstanced(i,h,r,f*o,d),e.update(h,i,d))}function u(f,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,d);let x=0;for(let m=0;m<d;m++)x+=h[m];e.update(x,i,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function rb(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:re("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function ob(n,t,e){const i=new WeakMap,s=new we;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let I=function(){v.dispose(),i.delete(a),a.removeEventListener("dispose",I)};var d=I;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),x===!0&&(M=2),m===!0&&(M=3);let w=a.attributes.position.count*M,b=1;w>t.maxTextureSize&&(b=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const R=new Float32Array(w*b*4*f),v=new Jm(R,w,b,f);v.type=Nn,v.needsUpdate=!0;const A=M*4;for(let D=0;D<f;D++){const N=p[D],q=S[D],Z=T[D],G=w*b*4*D;for(let B=0;B<N.count;B++){const U=B*A;g===!0&&(s.fromBufferAttribute(N,B),R[G+U+0]=s.x,R[G+U+1]=s.y,R[G+U+2]=s.z,R[G+U+3]=0),x===!0&&(s.fromBufferAttribute(q,B),R[G+U+4]=s.x,R[G+U+5]=s.y,R[G+U+6]=s.z,R[G+U+7]=0),m===!0&&(s.fromBufferAttribute(Z,B),R[G+U+8]=s.x,R[G+U+9]=s.y,R[G+U+10]=s.z,R[G+U+11]=Z.itemSize===4?s.w:1)}}h={count:f,texture:v,size:new Ot(w,b)},i.set(a,h),a.addEventListener("dispose",I)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function ab(n,t,e,i,s){let r=new WeakMap;function o(c){const u=s.render.frame,f=c.geometry,h=t.get(c,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function a(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}const lb={[Fm]:"LINEAR_TONE_MAPPING",[Om]:"REINHARD_TONE_MAPPING",[Bm]:"CINEON_TONE_MAPPING",[zm]:"ACES_FILMIC_TONE_MAPPING",[Gm]:"AGX_TONE_MAPPING",[Vm]:"NEUTRAL_TONE_MAPPING",[Hm]:"CUSTOM_TONE_MAPPING"};function cb(n,t,e,i,s,r){const o=new oi(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Tr(t,e):void 0}),a=new oi(t,e,{type:Ui,depthBuffer:!1,stencilBuffer:!1}),l=new He;l.setAttribute("position",new Te([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Te([0,2,0,0,2,0],2));const c=new Zv({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new St(l,c),f=new ml(-1,1,1,-1,0,1);let h=null,d=null,g=!1,x,m=null,p=[],S=!1;this.setSize=function(T,M){o.setSize(T,M),a.setSize(T,M);for(let w=0;w<p.length;w++){const b=p[w];b.setSize&&b.setSize(T,M)}},this.setEffects=function(T){p=T,S=p.length>0&&p[0].isRenderPass===!0;const M=o.width,w=o.height;for(let b=0;b<p.length;b++){const R=p[b];R.setSize&&R.setSize(M,w)}},this.begin=function(T,M){if(g||T.toneMapping===zn&&p.length===0)return!1;if(m=M,M!==null){const w=M.width,b=M.height;(o.width!==w||o.height!==b)&&this.setSize(w,b)}return S===!1&&T.setRenderTarget(o),x=T.toneMapping,T.toneMapping=zn,!0},this.hasRenderPass=function(){return S},this.end=function(T,M){T.toneMapping=x,g=!0;let w=o,b=a;for(let R=0;R<p.length;R++){const v=p[R];if(v.enabled!==!1&&(v.render(T,b,w,M),v.needsSwap!==!1)){const A=w;w=b,b=A}}if(h!==T.outputColorSpace||d!==T.toneMapping){h=T.outputColorSpace,d=T.toneMapping,c.defines={},oe.getTransfer(h)===fe&&(c.defines.SRGB_TRANSFER="");const R=lb[d];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,T.setRenderTarget(m),T.render(u,f),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}const g0=new Qe,Cu=new Tr(1,1),_0=new Jm,x0=new yv,v0=new a0,_d=[],xd=[],vd=new Float32Array(16),Md=new Float32Array(9),Sd=new Float32Array(4);function Ir(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=_d[s];if(r===void 0&&(r=new Float32Array(s),_d[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Be(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ze(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function _l(n,t){let e=xd[t];e===void 0&&(e=new Int32Array(t),xd[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function ub(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function fb(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2fv(this.addr,t),ze(e,t)}}function hb(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;n.uniform3fv(this.addr,t),ze(e,t)}}function db(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4fv(this.addr,t),ze(e,t)}}function pb(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,i))return;Sd.set(i),n.uniformMatrix2fv(this.addr,!1,Sd),ze(e,i)}}function mb(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,i))return;Md.set(i),n.uniformMatrix3fv(this.addr,!1,Md),ze(e,i)}}function gb(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,i))return;vd.set(i),n.uniformMatrix4fv(this.addr,!1,vd),ze(e,i)}}function _b(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function xb(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2iv(this.addr,t),ze(e,t)}}function vb(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;n.uniform3iv(this.addr,t),ze(e,t)}}function Mb(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4iv(this.addr,t),ze(e,t)}}function Sb(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function yb(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2uiv(this.addr,t),ze(e,t)}}function bb(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;n.uniform3uiv(this.addr,t),ze(e,t)}}function Eb(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4uiv(this.addr,t),ze(e,t)}}function Tb(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Cu.compareFunction=e.isReversedDepthBuffer()?yf:Sf,r=Cu):r=g0,e.setTexture2D(t||r,s)}function wb(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||x0,s)}function Ab(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||v0,s)}function Rb(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||_0,s)}function Cb(n){switch(n){case 5126:return ub;case 35664:return fb;case 35665:return hb;case 35666:return db;case 35674:return pb;case 35675:return mb;case 35676:return gb;case 5124:case 35670:return _b;case 35667:case 35671:return xb;case 35668:case 35672:return vb;case 35669:case 35673:return Mb;case 5125:return Sb;case 36294:return yb;case 36295:return bb;case 36296:return Eb;case 35678:case 36198:case 36298:case 36306:case 35682:return Tb;case 35679:case 36299:case 36307:return wb;case 35680:case 36300:case 36308:case 36293:return Ab;case 36289:case 36303:case 36311:case 36292:return Rb}}function Pb(n,t){n.uniform1fv(this.addr,t)}function Db(n,t){const e=Ir(t,this.size,2);n.uniform2fv(this.addr,e)}function Lb(n,t){const e=Ir(t,this.size,3);n.uniform3fv(this.addr,e)}function Ib(n,t){const e=Ir(t,this.size,4);n.uniform4fv(this.addr,e)}function Ub(n,t){const e=Ir(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Nb(n,t){const e=Ir(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Fb(n,t){const e=Ir(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Ob(n,t){n.uniform1iv(this.addr,t)}function Bb(n,t){n.uniform2iv(this.addr,t)}function zb(n,t){n.uniform3iv(this.addr,t)}function Hb(n,t){n.uniform4iv(this.addr,t)}function Gb(n,t){n.uniform1uiv(this.addr,t)}function Vb(n,t){n.uniform2uiv(this.addr,t)}function kb(n,t){n.uniform3uiv(this.addr,t)}function Wb(n,t){n.uniform4uiv(this.addr,t)}function Xb(n,t,e){const i=this.cache,s=t.length,r=_l(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Cu:o=g0;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function Yb(n,t,e){const i=this.cache,s=t.length,r=_l(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||x0,r[o])}function qb(n,t,e){const i=this.cache,s=t.length,r=_l(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||v0,r[o])}function $b(n,t,e){const i=this.cache,s=t.length,r=_l(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||_0,r[o])}function Kb(n){switch(n){case 5126:return Pb;case 35664:return Db;case 35665:return Lb;case 35666:return Ib;case 35674:return Ub;case 35675:return Nb;case 35676:return Fb;case 5124:case 35670:return Ob;case 35667:case 35671:return Bb;case 35668:case 35672:return zb;case 35669:case 35673:return Hb;case 5125:return Gb;case 36294:return Vb;case 36295:return kb;case 36296:return Wb;case 35678:case 36198:case 36298:case 36306:case 35682:return Xb;case 35679:case 36299:case 36307:return Yb;case 35680:case 36300:case 36308:case 36293:return qb;case 36289:case 36303:case 36311:case 36292:return $b}}class Zb{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Cb(e.type)}}class Jb{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Kb(e.type)}}class jb{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const cc=/(\w+)(\])?(\[|\.)?/g;function yd(n,t){n.seq.push(t),n.map[t.id]=t}function Qb(n,t,e){const i=n.name,s=i.length;for(cc.lastIndex=0;;){const r=cc.exec(i),o=cc.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){yd(e,c===void 0?new Zb(a,n,t):new Jb(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new jb(a),yd(e,f)),e=f}}}class Ba{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);Qb(a,l,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function bd(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const tE=37297;let eE=0;function nE(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Ed=new Kt;function iE(n){oe._getMatrix(Ed,oe.workingColorSpace,n);const t=`mat3( ${Ed.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(n)){case Ka:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return Vt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Td(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+nE(n.getShaderSource(t),a)}else return r}function sE(n,t){const e=iE(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const rE={[Fm]:"Linear",[Om]:"Reinhard",[Bm]:"Cineon",[zm]:"ACESFilmic",[Gm]:"AgX",[Vm]:"Neutral",[Hm]:"Custom"};function oE(n,t){const e=rE[t];return e===void 0?(Vt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const pa=new O;function aE(){oe.getLuminanceCoefficients(pa);const n=pa.x.toFixed(4),t=pa.y.toFixed(4),e=pa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(eo).join(`
`)}function cE(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function uE(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function eo(n){return n!==""}function wd(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ad(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const fE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pu(n){return n.replace(fE,dE)}const hE=new Map;function dE(n,t){let e=Qt[t];if(e===void 0){const i=hE.get(t);if(i!==void 0)e=Qt[i],Vt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Pu(e)}const pE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rd(n){return n.replace(pE,mE)}function mE(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Cd(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const gE={[Da]:"SHADOWMAP_TYPE_PCF",[to]:"SHADOWMAP_TYPE_VSM"};function _E(n){return gE[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const xE={[Es]:"ENVMAP_TYPE_CUBE",[Er]:"ENVMAP_TYPE_CUBE",[pl]:"ENVMAP_TYPE_CUBE_UV"};function vE(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":xE[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const ME={[Er]:"ENVMAP_MODE_REFRACTION"};function SE(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":ME[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const yE={[df]:"ENVMAP_BLENDING_MULTIPLY",[Hx]:"ENVMAP_BLENDING_MIX",[Gx]:"ENVMAP_BLENDING_ADD"};function bE(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":yE[n.combine]||"ENVMAP_BLENDING_NONE"}function EE(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function TE(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=_E(e),c=vE(e),u=SE(e),f=bE(e),h=EE(e),d=lE(e),g=cE(r),x=s.createProgram();let m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(eo).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(eo).join(`
`),p.length>0&&(p+=`
`)):(m=[Cd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(eo).join(`
`),p=[Cd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zn?"#define TONE_MAPPING":"",e.toneMapping!==zn?Qt.tonemapping_pars_fragment:"",e.toneMapping!==zn?oE("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,sE("linearToOutputTexel",e.outputColorSpace),aE(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(eo).join(`
`)),o=Pu(o),o=wd(o,e),o=Ad(o,e),a=Pu(a),a=wd(a,e),a=Ad(a,e),o=Rd(o),a=Rd(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Rh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Rh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=S+m+o,M=S+p+a,w=bd(s,s.VERTEX_SHADER,T),b=bd(s,s.FRAGMENT_SHADER,M);s.attachShader(x,w),s.attachShader(x,b),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(D){if(n.debug.checkShaderErrors){const N=s.getProgramInfoLog(x)||"",q=s.getShaderInfoLog(w)||"",Z=s.getShaderInfoLog(b)||"",G=N.trim(),B=q.trim(),U=Z.trim();let k=!0,J=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(k=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,w,b);else{const at=Td(s,w,"vertex"),gt=Td(s,b,"fragment");re("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+G+`
`+at+`
`+gt)}else G!==""?Vt("WebGLProgram: Program Info Log:",G):(B===""||U==="")&&(J=!1);J&&(D.diagnostics={runnable:k,programLog:G,vertexShader:{log:B,prefix:m},fragmentShader:{log:U,prefix:p}})}s.deleteShader(w),s.deleteShader(b),v=new Ba(s,x),A=uE(s,x)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let A;this.getAttributes=function(){return A===void 0&&R(this),A};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(x,tE)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=eE++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=b,this}let wE=0;class AE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new RE(t),e.set(t,i)),i}}class RE{constructor(t){this.id=wE++,this.code=t,this.usedTimes=0}}function CE(n){return n===Ts||n===Ya||n===qa}function PE(n,t,e,i,s,r){const o=new Tf,a=new AE,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,A,I,D,N,q){const Z=D.fog,G=N.geometry,B=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?D.environment:null,U=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,k=t.get(v.envMap||B,U),J=k&&k.mapping===pl?k.image.height:null,at=d[v.type];v.precision!==null&&(h=i.getMaxPrecision(v.precision),h!==v.precision&&Vt("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const gt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,vt=gt!==void 0?gt.length:0;let ie=0;G.morphAttributes.position!==void 0&&(ie=1),G.morphAttributes.normal!==void 0&&(ie=2),G.morphAttributes.color!==void 0&&(ie=3);let ve,Yt,tt,mt;if(at){const Nt=ei[at];ve=Nt.vertexShader,Yt=Nt.fragmentShader}else{ve=v.vertexShader,Yt=v.fragmentShader;const Nt=a.getVertexShaderStage(v),Re=a.getFragmentShaderStage(v);a.update(v,Nt,Re),tt=Nt.id,mt=Re.id}const ft=n.getRenderTarget(),qt=n.state.buffers.depth.getReversed(),$t=N.isInstancedMesh===!0,kt=N.isBatchedMesh===!0,P=!!v.map,L=!!v.matcap,Y=!!k,et=!!v.aoMap,j=!!v.lightMap,st=!!v.bumpMap&&v.wireframe===!1,ht=!!v.normalMap,ct=!!v.displacementMap,lt=!!v.emissiveMap,nt=!!v.metalnessMap,Rt=!!v.roughnessMap,C=v.anisotropy>0,Ct=v.clearcoat>0,bt=v.dispersion>0,E=v.iridescence>0,_=v.sheen>0,F=v.transmission>0,V=C&&!!v.anisotropyMap,K=Ct&&!!v.clearcoatMap,ut=Ct&&!!v.clearcoatNormalMap,pt=Ct&&!!v.clearcoatRoughnessMap,Q=E&&!!v.iridescenceMap,it=E&&!!v.iridescenceThicknessMap,dt=_&&!!v.sheenColorMap,Pt=_&&!!v.sheenRoughnessMap,Mt=!!v.specularMap,_t=!!v.specularColorMap,Gt=!!v.specularIntensityMap,Wt=F&&!!v.transmissionMap,Jt=F&&!!v.thicknessMap,z=!!v.gradientMap,xt=!!v.alphaMap,rt=v.alphaTest>0,yt=!!v.alphaHash,At=!!v.extensions;let ot=zn;v.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(ot=n.toneMapping);const Bt={shaderID:at,shaderType:v.type,shaderName:v.name,vertexShader:ve,fragmentShader:Yt,defines:v.defines,customVertexShaderID:tt,customFragmentShaderID:mt,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:kt,batchingColor:kt&&N._colorsTexture!==null,instancing:$t,instancingColor:$t&&N.instanceColor!==null,instancingMorph:$t&&N.morphTexture!==null,outputColorSpace:ft===null?n.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:P,matcap:L,envMap:Y,envMapMode:Y&&k.mapping,envMapCubeUVHeight:J,aoMap:et,lightMap:j,bumpMap:st,normalMap:ht,displacementMap:ct,emissiveMap:lt,normalMapObjectSpace:ht&&v.normalMapType===Wx,normalMapTangentSpace:ht&&v.normalMapType===Eu,packedNormalMap:ht&&v.normalMapType===Eu&&CE(v.normalMap.format),metalnessMap:nt,roughnessMap:Rt,anisotropy:C,anisotropyMap:V,clearcoat:Ct,clearcoatMap:K,clearcoatNormalMap:ut,clearcoatRoughnessMap:pt,dispersion:bt,iridescence:E,iridescenceMap:Q,iridescenceThicknessMap:it,sheen:_,sheenColorMap:dt,sheenRoughnessMap:Pt,specularMap:Mt,specularColorMap:_t,specularIntensityMap:Gt,transmission:F,transmissionMap:Wt,thicknessMap:Jt,gradientMap:z,opaque:v.transparent===!1&&v.blending===_r&&v.alphaToCoverage===!1,alphaMap:xt,alphaTest:rt,alphaHash:yt,combine:v.combine,mapUv:P&&g(v.map.channel),aoMapUv:et&&g(v.aoMap.channel),lightMapUv:j&&g(v.lightMap.channel),bumpMapUv:st&&g(v.bumpMap.channel),normalMapUv:ht&&g(v.normalMap.channel),displacementMapUv:ct&&g(v.displacementMap.channel),emissiveMapUv:lt&&g(v.emissiveMap.channel),metalnessMapUv:nt&&g(v.metalnessMap.channel),roughnessMapUv:Rt&&g(v.roughnessMap.channel),anisotropyMapUv:V&&g(v.anisotropyMap.channel),clearcoatMapUv:K&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ut&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:it&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&g(v.sheenRoughnessMap.channel),specularMapUv:Mt&&g(v.specularMap.channel),specularColorMapUv:_t&&g(v.specularColorMap.channel),specularIntensityMapUv:Gt&&g(v.specularIntensityMap.channel),transmissionMapUv:Wt&&g(v.transmissionMap.channel),thicknessMapUv:Jt&&g(v.thicknessMap.channel),alphaMapUv:xt&&g(v.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(ht||C),vertexNormals:!!G.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!G.attributes.uv&&(P||xt),fog:!!Z,useFog:v.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||G.attributes.normal===void 0&&ht===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:qt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:ie,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:ot,decodeVideoTexture:P&&v.map.isVideoTexture===!0&&oe.getTransfer(v.map.colorSpace)===fe,decodeVideoTextureEmissive:lt&&v.emissiveMap.isVideoTexture===!0&&oe.getTransfer(v.emissiveMap.colorSpace)===fe,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Oe,flipSided:v.side===hn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:At&&v.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(At&&v.extensions.multiDraw===!0||kt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Bt.vertexUv1s=l.has(1),Bt.vertexUv2s=l.has(2),Bt.vertexUv3s=l.has(3),l.clear(),Bt}function m(v){const A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(const I in v.defines)A.push(I),A.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(p(A,v),S(A,v),A.push(n.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function p(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function S(v,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),A.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function T(v){const A=d[v.type];let I;if(A){const D=ei[A];I=qv.clone(D.uniforms)}else I=v.uniforms;return I}function M(v,A){let I=u.get(A);return I!==void 0?++I.usedTimes:(I=new TE(n,A,v,s),c.push(I),u.set(A,I)),I}function w(v){if(--v.usedTimes===0){const A=c.indexOf(v);c[A]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function b(v){a.remove(v)}function R(){a.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:T,acquireProgram:M,releaseProgram:w,releaseShaderCache:b,programs:c,dispose:R}}function DE(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function LE(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Pd(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Dd(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function a(h,d,g,x,m,p){let S=n[t];return S===void 0?(S={id:h.id,object:h,geometry:d,material:g,materialVariant:o(h),groupOrder:x,renderOrder:h.renderOrder,z:m,group:p},n[t]=S):(S.id=h.id,S.object=h,S.geometry=d,S.material=g,S.materialVariant=o(h),S.groupOrder=x,S.renderOrder=h.renderOrder,S.z=m,S.group=p),t++,S}function l(h,d,g,x,m,p){const S=a(h,d,g,x,m,p);g.transmission>0?i.push(S):g.transparent===!0?s.push(S):e.push(S)}function c(h,d,g,x,m,p){const S=a(h,d,g,x,m,p);g.transmission>0?i.unshift(S):g.transparent===!0?s.unshift(S):e.unshift(S)}function u(h,d,g){e.length>1&&e.sort(h||LE),i.length>1&&i.sort(d||Pd),s.length>1&&s.sort(d||Pd),g&&(e.reverse(),i.reverse(),s.reverse())}function f(){for(let h=t,d=n.length;h<d;h++){const g=n[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:f,sort:u}}function IE(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Dd,n.set(i,[o])):s>=r.length?(o=new Dd,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function UE(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new Ut};break;case"SpotLight":e={position:new O,direction:new O,color:new Ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new Ut,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new Ut,groundColor:new Ut};break;case"RectAreaLight":e={color:new Ut,position:new O,halfWidth:new O,halfHeight:new O};break}return n[t.id]=e,e}}}function NE(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let FE=0;function OE(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function BE(n){const t=new UE,e=NE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const s=new O,r=new se,o=new se;function a(c){let u=0,f=0,h=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let d=0,g=0,x=0,m=0,p=0,S=0,T=0,M=0,w=0,b=0,R=0;c.sort(OE);for(let A=0,I=c.length;A<I;A++){const D=c[A],N=D.color,q=D.intensity,Z=D.distance;let G=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Ts?G=D.shadow.map.texture:G=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=N.r*q,f+=N.g*q,h+=N.b*q;else if(D.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(D.sh.coefficients[B],q);R++}else if(D.isDirectionalLight){const B=t.get(D);if(B.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const U=D.shadow,k=e.get(D);k.shadowIntensity=U.intensity,k.shadowBias=U.bias,k.shadowNormalBias=U.normalBias,k.shadowRadius=U.radius,k.shadowMapSize=U.mapSize,i.directionalShadow[d]=k,i.directionalShadowMap[d]=G,i.directionalShadowMatrix[d]=D.shadow.matrix,S++}i.directional[d]=B,d++}else if(D.isSpotLight){const B=t.get(D);B.position.setFromMatrixPosition(D.matrixWorld),B.color.copy(N).multiplyScalar(q),B.distance=Z,B.coneCos=Math.cos(D.angle),B.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),B.decay=D.decay,i.spot[x]=B;const U=D.shadow;if(D.map&&(i.spotLightMap[w]=D.map,w++,U.updateMatrices(D),D.castShadow&&b++),i.spotLightMatrix[x]=U.matrix,D.castShadow){const k=e.get(D);k.shadowIntensity=U.intensity,k.shadowBias=U.bias,k.shadowNormalBias=U.normalBias,k.shadowRadius=U.radius,k.shadowMapSize=U.mapSize,i.spotShadow[x]=k,i.spotShadowMap[x]=G,M++}x++}else if(D.isRectAreaLight){const B=t.get(D);B.color.copy(N).multiplyScalar(q),B.halfWidth.set(D.width*.5,0,0),B.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=B,m++}else if(D.isPointLight){const B=t.get(D);if(B.color.copy(D.color).multiplyScalar(D.intensity),B.distance=D.distance,B.decay=D.decay,D.castShadow){const U=D.shadow,k=e.get(D);k.shadowIntensity=U.intensity,k.shadowBias=U.bias,k.shadowNormalBias=U.normalBias,k.shadowRadius=U.radius,k.shadowMapSize=U.mapSize,k.shadowCameraNear=U.camera.near,k.shadowCameraFar=U.camera.far,i.pointShadow[g]=k,i.pointShadowMap[g]=G,i.pointShadowMatrix[g]=D.shadow.matrix,T++}i.point[g]=B,g++}else if(D.isHemisphereLight){const B=t.get(D);B.skyColor.copy(D.color).multiplyScalar(q),B.groundColor.copy(D.groundColor).multiplyScalar(q),i.hemi[p]=B,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Et.LTC_FLOAT_1,i.rectAreaLTC2=Et.LTC_FLOAT_2):(i.rectAreaLTC1=Et.LTC_HALF_1,i.rectAreaLTC2=Et.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const v=i.hash;(v.directionalLength!==d||v.pointLength!==g||v.spotLength!==x||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==S||v.numPointShadows!==T||v.numSpotShadows!==M||v.numSpotMaps!==w||v.numLightProbes!==R)&&(i.directional.length=d,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=M+w-b,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=R,v.directionalLength=d,v.pointLength=g,v.spotLength=x,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=S,v.numPointShadows=T,v.numSpotShadows=M,v.numSpotMaps=w,v.numLightProbes=R,i.version=FE++)}function l(c,u){let f=0,h=0,d=0,g=0,x=0;const m=u.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const T=c[p];if(T.isDirectionalLight){const M=i.directional[f];M.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(T.isSpotLight){const M=i.spot[d];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(T.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(T.width*.5,0,0),M.halfHeight.set(0,T.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){const M=i.point[h];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),h++}else if(T.isHemisphereLight){const M=i.hemi[x];M.direction.setFromMatrixPosition(T.matrixWorld),M.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function Ld(n){const t=new BE(n),e=[],i=[],s=[];function r(h){f.camera=h,e.length=0,i.length=0,s.length=0}function o(h){e.push(h)}function a(h){i.push(h)}function l(h){s.push(h)}function c(){t.setup(e)}function u(h){t.setupView(e,h)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function zE(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Ld(n),t.set(s,[a])):r>=o.length?(a=new Ld(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const HE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,GE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,VE=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],kE=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],Id=new se,$r=new O,uc=new O;function WE(n,t,e){let i=new Af;const s=new Ot,r=new Ot,o=new we,a=new Jv,l=new jv,c={},u=e.maxTextureSize,f={[rs]:hn,[hn]:rs,[Oe]:Oe},h=new ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:HE,fragmentShader:GE}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new He;g.setAttribute("position",new ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new St(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Da;let p=this.type;this.render=function(b,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===Sx&&(Vt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Da);const A=n.getRenderTarget(),I=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Ai),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const q=p!==this.type;q&&R.traverse(function(Z){Z.material&&(Array.isArray(Z.material)?Z.material.forEach(G=>G.needsUpdate=!0):Z.material.needsUpdate=!0)});for(let Z=0,G=b.length;Z<G;Z++){const B=b[Z],U=B.shadow;if(U===void 0){Vt("WebGLShadowMap:",B,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);const k=U.getFrameExtents();s.multiply(k),r.copy(U.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/k.x),s.x=r.x*k.x,U.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/k.y),s.y=r.y*k.y,U.mapSize.y=r.y));const J=n.state.buffers.depth.getReversed();if(U.camera._reversedDepth=J,U.map===null||q===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===to){if(B.isPointLight){Vt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new oi(s.x,s.y,{format:Ts,type:Ui,minFilter:Je,magFilter:Je,generateMipmaps:!1}),U.map.texture.name=B.name+".shadowMap",U.map.depthTexture=new Tr(s.x,s.y,Nn),U.map.depthTexture.name=B.name+".shadowMapDepth",U.map.depthTexture.format=Ni,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=We,U.map.depthTexture.magFilter=We}else B.isPointLight?(U.map=new m0(s.x),U.map.depthTexture=new Xv(s.x,ci)):(U.map=new oi(s.x,s.y),U.map.depthTexture=new Tr(s.x,s.y,ci)),U.map.depthTexture.name=B.name+".shadowMap",U.map.depthTexture.format=Ni,this.type===Da?(U.map.depthTexture.compareFunction=J?yf:Sf,U.map.depthTexture.minFilter=Je,U.map.depthTexture.magFilter=Je):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=We,U.map.depthTexture.magFilter=We);U.camera.updateProjectionMatrix()}const at=U.map.isWebGLCubeRenderTarget?6:1;for(let gt=0;gt<at;gt++){if(U.map.isWebGLCubeRenderTarget)n.setRenderTarget(U.map,gt),n.clear();else{gt===0&&(n.setRenderTarget(U.map),n.clear());const vt=U.getViewport(gt);o.set(r.x*vt.x,r.y*vt.y,r.x*vt.z,r.y*vt.w),N.viewport(o)}if(B.isPointLight){const vt=U.camera,ie=U.matrix,ve=B.distance||vt.far;ve!==vt.far&&(vt.far=ve,vt.updateProjectionMatrix()),$r.setFromMatrixPosition(B.matrixWorld),vt.position.copy($r),uc.copy(vt.position),uc.add(VE[gt]),vt.up.copy(kE[gt]),vt.lookAt(uc),vt.updateMatrixWorld(),ie.makeTranslation(-$r.x,-$r.y,-$r.z),Id.multiplyMatrices(vt.projectionMatrix,vt.matrixWorldInverse),U._frustum.setFromProjectionMatrix(Id,vt.coordinateSystem,vt.reversedDepth)}else U.updateMatrices(B);i=U.getFrustum(),M(R,v,U.camera,B,this.type)}U.isPointLightShadow!==!0&&this.type===to&&S(U,v),U.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(A,I,D)};function S(b,R){const v=t.update(x);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new oi(s.x,s.y,{format:Ts,type:Ui})),h.uniforms.shadow_pass.value=b.map.depthTexture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(R,null,v,h,x,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(R,null,v,d,x,null)}function T(b,R,v,A){let I=null;const D=v.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(D!==void 0)I=D;else if(I=v.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const N=I.uuid,q=R.uuid;let Z=c[N];Z===void 0&&(Z={},c[N]=Z);let G=Z[q];G===void 0&&(G=I.clone(),Z[q]=G,R.addEventListener("dispose",w)),I=G}if(I.visible=R.visible,I.wireframe=R.wireframe,A===to?I.side=R.shadowSide!==null?R.shadowSide:R.side:I.side=R.shadowSide!==null?R.shadowSide:f[R.side],I.alphaMap=R.alphaMap,I.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,I.map=R.map,I.clipShadows=R.clipShadows,I.clippingPlanes=R.clippingPlanes,I.clipIntersection=R.clipIntersection,I.displacementMap=R.displacementMap,I.displacementScale=R.displacementScale,I.displacementBias=R.displacementBias,I.wireframeLinewidth=R.wireframeLinewidth,I.linewidth=R.linewidth,v.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const N=n.properties.get(I);N.light=v}return I}function M(b,R,v,A,I){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&I===to)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,b.matrixWorld);const q=t.update(b),Z=b.material;if(Array.isArray(Z)){const G=q.groups;for(let B=0,U=G.length;B<U;B++){const k=G[B],J=Z[k.materialIndex];if(J&&J.visible){const at=T(b,J,A,I);b.onBeforeShadow(n,b,R,v,q,at,k),n.renderBufferDirect(v,null,q,at,b,k),b.onAfterShadow(n,b,R,v,q,at,k)}}}else if(Z.visible){const G=T(b,Z,A,I);b.onBeforeShadow(n,b,R,v,q,G,null),n.renderBufferDirect(v,null,q,G,b,null),b.onAfterShadow(n,b,R,v,q,G,null)}}const N=b.children;for(let q=0,Z=N.length;q<Z;q++)M(N[q],R,v,A,I)}function w(b){b.target.removeEventListener("dispose",w);for(const v in c){const A=c[v],I=b.target.uuid;I in A&&(A[I].dispose(),delete A[I])}}}function XE(n,t){function e(){let z=!1;const xt=new we;let rt=null;const yt=new we(0,0,0,0);return{setMask:function(At){rt!==At&&!z&&(n.colorMask(At,At,At,At),rt=At)},setLocked:function(At){z=At},setClear:function(At,ot,Bt,Nt,Re){Re===!0&&(At*=Nt,ot*=Nt,Bt*=Nt),xt.set(At,ot,Bt,Nt),yt.equals(xt)===!1&&(n.clearColor(At,ot,Bt,Nt),yt.copy(xt))},reset:function(){z=!1,rt=null,yt.set(-1,0,0,0)}}}function i(){let z=!1,xt=!1,rt=null,yt=null,At=null;return{setReversed:function(ot){if(xt!==ot){const Bt=t.get("EXT_clip_control");ot?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT),xt=ot;const Nt=At;At=null,this.setClear(Nt)}},getReversed:function(){return xt},setTest:function(ot){ot?ft(n.DEPTH_TEST):qt(n.DEPTH_TEST)},setMask:function(ot){rt!==ot&&!z&&(n.depthMask(ot),rt=ot)},setFunc:function(ot){if(xt&&(ot=tv[ot]),yt!==ot){switch(ot){case zc:n.depthFunc(n.NEVER);break;case Hc:n.depthFunc(n.ALWAYS);break;case Gc:n.depthFunc(n.LESS);break;case br:n.depthFunc(n.LEQUAL);break;case Vc:n.depthFunc(n.EQUAL);break;case kc:n.depthFunc(n.GEQUAL);break;case Wc:n.depthFunc(n.GREATER);break;case Xc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}yt=ot}},setLocked:function(ot){z=ot},setClear:function(ot){At!==ot&&(At=ot,xt&&(ot=1-ot),n.clearDepth(ot))},reset:function(){z=!1,rt=null,yt=null,At=null,xt=!1}}}function s(){let z=!1,xt=null,rt=null,yt=null,At=null,ot=null,Bt=null,Nt=null,Re=null;return{setTest:function(Me){z||(Me?ft(n.STENCIL_TEST):qt(n.STENCIL_TEST))},setMask:function(Me){xt!==Me&&!z&&(n.stencilMask(Me),xt=Me)},setFunc:function(Me,Wn,Xn){(rt!==Me||yt!==Wn||At!==Xn)&&(n.stencilFunc(Me,Wn,Xn),rt=Me,yt=Wn,At=Xn)},setOp:function(Me,Wn,Xn){(ot!==Me||Bt!==Wn||Nt!==Xn)&&(n.stencilOp(Me,Wn,Xn),ot=Me,Bt=Wn,Nt=Xn)},setLocked:function(Me){z=Me},setClear:function(Me){Re!==Me&&(n.clearStencil(Me),Re=Me)},reset:function(){z=!1,xt=null,rt=null,yt=null,At=null,ot=null,Bt=null,Nt=null,Re=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},f={},h={},d=new WeakMap,g=[],x=null,m=!1,p=null,S=null,T=null,M=null,w=null,b=null,R=null,v=new Ut(0,0,0),A=0,I=!1,D=null,N=null,q=null,Z=null,G=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,k=0;const J=n.getParameter(n.VERSION);J.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(J)[1]),U=k>=1):J.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),U=k>=2);let at=null,gt={};const vt=n.getParameter(n.SCISSOR_BOX),ie=n.getParameter(n.VIEWPORT),ve=new we().fromArray(vt),Yt=new we().fromArray(ie);function tt(z,xt,rt,yt){const At=new Uint8Array(4),ot=n.createTexture();n.bindTexture(z,ot),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Bt=0;Bt<rt;Bt++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(xt,0,n.RGBA,1,1,yt,0,n.RGBA,n.UNSIGNED_BYTE,At):n.texImage2D(xt+Bt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,At);return ot}const mt={};mt[n.TEXTURE_2D]=tt(n.TEXTURE_2D,n.TEXTURE_2D,1),mt[n.TEXTURE_CUBE_MAP]=tt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[n.TEXTURE_2D_ARRAY]=tt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),mt[n.TEXTURE_3D]=tt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ft(n.DEPTH_TEST),o.setFunc(br),st(!1),ht(Eh),ft(n.CULL_FACE),et(Ai);function ft(z){u[z]!==!0&&(n.enable(z),u[z]=!0)}function qt(z){u[z]!==!1&&(n.disable(z),u[z]=!1)}function $t(z,xt){return h[z]!==xt?(n.bindFramebuffer(z,xt),h[z]=xt,z===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=xt),z===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=xt),!0):!1}function kt(z,xt){let rt=g,yt=!1;if(z){rt=d.get(xt),rt===void 0&&(rt=[],d.set(xt,rt));const At=z.textures;if(rt.length!==At.length||rt[0]!==n.COLOR_ATTACHMENT0){for(let ot=0,Bt=At.length;ot<Bt;ot++)rt[ot]=n.COLOR_ATTACHMENT0+ot;rt.length=At.length,yt=!0}}else rt[0]!==n.BACK&&(rt[0]=n.BACK,yt=!0);yt&&n.drawBuffers(rt)}function P(z){return x!==z?(n.useProgram(z),x=z,!0):!1}const L={[_s]:n.FUNC_ADD,[bx]:n.FUNC_SUBTRACT,[Ex]:n.FUNC_REVERSE_SUBTRACT};L[Tx]=n.MIN,L[wx]=n.MAX;const Y={[Ax]:n.ZERO,[Rx]:n.ONE,[Cx]:n.SRC_COLOR,[Oc]:n.SRC_ALPHA,[Nx]:n.SRC_ALPHA_SATURATE,[Ix]:n.DST_COLOR,[Dx]:n.DST_ALPHA,[Px]:n.ONE_MINUS_SRC_COLOR,[Bc]:n.ONE_MINUS_SRC_ALPHA,[Ux]:n.ONE_MINUS_DST_COLOR,[Lx]:n.ONE_MINUS_DST_ALPHA,[Fx]:n.CONSTANT_COLOR,[Ox]:n.ONE_MINUS_CONSTANT_COLOR,[Bx]:n.CONSTANT_ALPHA,[zx]:n.ONE_MINUS_CONSTANT_ALPHA};function et(z,xt,rt,yt,At,ot,Bt,Nt,Re,Me){if(z===Ai){m===!0&&(qt(n.BLEND),m=!1);return}if(m===!1&&(ft(n.BLEND),m=!0),z!==yx){if(z!==p||Me!==I){if((S!==_s||w!==_s)&&(n.blendEquation(n.FUNC_ADD),S=_s,w=_s),Me)switch(z){case _r:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vo:n.blendFunc(n.ONE,n.ONE);break;case Th:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case wh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:re("WebGLState: Invalid blending: ",z);break}else switch(z){case _r:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Th:re("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wh:re("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:re("WebGLState: Invalid blending: ",z);break}T=null,M=null,b=null,R=null,v.set(0,0,0),A=0,p=z,I=Me}return}At=At||xt,ot=ot||rt,Bt=Bt||yt,(xt!==S||At!==w)&&(n.blendEquationSeparate(L[xt],L[At]),S=xt,w=At),(rt!==T||yt!==M||ot!==b||Bt!==R)&&(n.blendFuncSeparate(Y[rt],Y[yt],Y[ot],Y[Bt]),T=rt,M=yt,b=ot,R=Bt),(Nt.equals(v)===!1||Re!==A)&&(n.blendColor(Nt.r,Nt.g,Nt.b,Re),v.copy(Nt),A=Re),p=z,I=!1}function j(z,xt){z.side===Oe?qt(n.CULL_FACE):ft(n.CULL_FACE);let rt=z.side===hn;xt&&(rt=!rt),st(rt),z.blending===_r&&z.transparent===!1?et(Ai):et(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);const yt=z.stencilWrite;a.setTest(yt),yt&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),lt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?ft(n.SAMPLE_ALPHA_TO_COVERAGE):qt(n.SAMPLE_ALPHA_TO_COVERAGE)}function st(z){D!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),D=z)}function ht(z){z!==vx?(ft(n.CULL_FACE),z!==N&&(z===Eh?n.cullFace(n.BACK):z===Mx?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):qt(n.CULL_FACE),N=z}function ct(z){z!==q&&(U&&n.lineWidth(z),q=z)}function lt(z,xt,rt){z?(ft(n.POLYGON_OFFSET_FILL),(Z!==xt||G!==rt)&&(Z=xt,G=rt,o.getReversed()&&(xt=-xt),n.polygonOffset(xt,rt))):qt(n.POLYGON_OFFSET_FILL)}function nt(z){z?ft(n.SCISSOR_TEST):qt(n.SCISSOR_TEST)}function Rt(z){z===void 0&&(z=n.TEXTURE0+B-1),at!==z&&(n.activeTexture(z),at=z)}function C(z,xt,rt){rt===void 0&&(at===null?rt=n.TEXTURE0+B-1:rt=at);let yt=gt[rt];yt===void 0&&(yt={type:void 0,texture:void 0},gt[rt]=yt),(yt.type!==z||yt.texture!==xt)&&(at!==rt&&(n.activeTexture(rt),at=rt),n.bindTexture(z,xt||mt[z]),yt.type=z,yt.texture=xt)}function Ct(){const z=gt[at];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function bt(){try{n.compressedTexImage2D(...arguments)}catch(z){re("WebGLState:",z)}}function E(){try{n.compressedTexImage3D(...arguments)}catch(z){re("WebGLState:",z)}}function _(){try{n.texSubImage2D(...arguments)}catch(z){re("WebGLState:",z)}}function F(){try{n.texSubImage3D(...arguments)}catch(z){re("WebGLState:",z)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(z){re("WebGLState:",z)}}function K(){try{n.compressedTexSubImage3D(...arguments)}catch(z){re("WebGLState:",z)}}function ut(){try{n.texStorage2D(...arguments)}catch(z){re("WebGLState:",z)}}function pt(){try{n.texStorage3D(...arguments)}catch(z){re("WebGLState:",z)}}function Q(){try{n.texImage2D(...arguments)}catch(z){re("WebGLState:",z)}}function it(){try{n.texImage3D(...arguments)}catch(z){re("WebGLState:",z)}}function dt(z){return f[z]!==void 0?f[z]:n.getParameter(z)}function Pt(z,xt){f[z]!==xt&&(n.pixelStorei(z,xt),f[z]=xt)}function Mt(z){ve.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),ve.copy(z))}function _t(z){Yt.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),Yt.copy(z))}function Gt(z,xt){let rt=c.get(xt);rt===void 0&&(rt=new WeakMap,c.set(xt,rt));let yt=rt.get(z);yt===void 0&&(yt=n.getUniformBlockIndex(xt,z.name),rt.set(z,yt))}function Wt(z,xt){const yt=c.get(xt).get(z);l.get(xt)!==yt&&(n.uniformBlockBinding(xt,yt,z.__bindingPointIndex),l.set(xt,yt))}function Jt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},at=null,gt={},h={},d=new WeakMap,g=[],x=null,m=!1,p=null,S=null,T=null,M=null,w=null,b=null,R=null,v=new Ut(0,0,0),A=0,I=!1,D=null,N=null,q=null,Z=null,G=null,ve.set(0,0,n.canvas.width,n.canvas.height),Yt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ft,disable:qt,bindFramebuffer:$t,drawBuffers:kt,useProgram:P,setBlending:et,setMaterial:j,setFlipSided:st,setCullFace:ht,setLineWidth:ct,setPolygonOffset:lt,setScissorTest:nt,activeTexture:Rt,bindTexture:C,unbindTexture:Ct,compressedTexImage2D:bt,compressedTexImage3D:E,texImage2D:Q,texImage3D:it,pixelStorei:Pt,getParameter:dt,updateUBOMapping:Gt,uniformBlockBinding:Wt,texStorage2D:ut,texStorage3D:pt,texSubImage2D:_,texSubImage3D:F,compressedTexSubImage2D:V,compressedTexSubImage3D:K,scissor:Mt,viewport:_t,reset:Jt}}function YE(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ot,u=new WeakMap,f=new Set;let h;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(E,_){return g?new OffscreenCanvas(E,_):Za("canvas")}function m(E,_,F){let V=1;const K=bt(E);if((K.width>F||K.height>F)&&(V=F/Math.max(K.width,K.height)),V<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const ut=Math.floor(V*K.width),pt=Math.floor(V*K.height);h===void 0&&(h=x(ut,pt));const Q=_?x(ut,pt):h;return Q.width=ut,Q.height=pt,Q.getContext("2d").drawImage(E,0,0,ut,pt),Vt("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ut+"x"+pt+")."),Q}else return"data"in E&&Vt("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),E;return E}function p(E){return E.generateMipmaps}function S(E){n.generateMipmap(E)}function T(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(E,_,F,V,K,ut=!1){if(E!==null){if(n[E]!==void 0)return n[E];Vt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let pt;V&&(pt=t.get("EXT_texture_norm16"),pt||Vt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=_;if(_===n.RED&&(F===n.FLOAT&&(Q=n.R32F),F===n.HALF_FLOAT&&(Q=n.R16F),F===n.UNSIGNED_BYTE&&(Q=n.R8),F===n.UNSIGNED_SHORT&&pt&&(Q=pt.R16_EXT),F===n.SHORT&&pt&&(Q=pt.R16_SNORM_EXT)),_===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.R8UI),F===n.UNSIGNED_SHORT&&(Q=n.R16UI),F===n.UNSIGNED_INT&&(Q=n.R32UI),F===n.BYTE&&(Q=n.R8I),F===n.SHORT&&(Q=n.R16I),F===n.INT&&(Q=n.R32I)),_===n.RG&&(F===n.FLOAT&&(Q=n.RG32F),F===n.HALF_FLOAT&&(Q=n.RG16F),F===n.UNSIGNED_BYTE&&(Q=n.RG8),F===n.UNSIGNED_SHORT&&pt&&(Q=pt.RG16_EXT),F===n.SHORT&&pt&&(Q=pt.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.RG8UI),F===n.UNSIGNED_SHORT&&(Q=n.RG16UI),F===n.UNSIGNED_INT&&(Q=n.RG32UI),F===n.BYTE&&(Q=n.RG8I),F===n.SHORT&&(Q=n.RG16I),F===n.INT&&(Q=n.RG32I)),_===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),F===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),F===n.UNSIGNED_INT&&(Q=n.RGB32UI),F===n.BYTE&&(Q=n.RGB8I),F===n.SHORT&&(Q=n.RGB16I),F===n.INT&&(Q=n.RGB32I)),_===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),F===n.UNSIGNED_INT&&(Q=n.RGBA32UI),F===n.BYTE&&(Q=n.RGBA8I),F===n.SHORT&&(Q=n.RGBA16I),F===n.INT&&(Q=n.RGBA32I)),_===n.RGB&&(F===n.UNSIGNED_SHORT&&pt&&(Q=pt.RGB16_EXT),F===n.SHORT&&pt&&(Q=pt.RGB16_SNORM_EXT),F===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),_===n.RGBA){const it=ut?Ka:oe.getTransfer(K);F===n.FLOAT&&(Q=n.RGBA32F),F===n.HALF_FLOAT&&(Q=n.RGBA16F),F===n.UNSIGNED_BYTE&&(Q=it===fe?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT&&pt&&(Q=pt.RGBA16_EXT),F===n.SHORT&&pt&&(Q=pt.RGBA16_SNORM_EXT),F===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function w(E,_){let F;return E?_===null||_===ci||_===So?F=n.DEPTH24_STENCIL8:_===Nn?F=n.DEPTH32F_STENCIL8:_===Mo&&(F=n.DEPTH24_STENCIL8,Vt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ci||_===So?F=n.DEPTH_COMPONENT24:_===Nn?F=n.DEPTH_COMPONENT32F:_===Mo&&(F=n.DEPTH_COMPONENT16),F}function b(E,_){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==We&&E.minFilter!==Je?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function R(E){const _=E.target;_.removeEventListener("dispose",R),A(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&f.delete(_)}function v(E){const _=E.target;_.removeEventListener("dispose",v),D(_)}function A(E){const _=i.get(E);if(_.__webglInit===void 0)return;const F=E.source,V=d.get(F);if(V){const K=V[_.__cacheKey];K.usedTimes--,K.usedTimes===0&&I(E),Object.keys(V).length===0&&d.delete(F)}i.remove(E)}function I(E){const _=i.get(E);n.deleteTexture(_.__webglTexture);const F=E.source,V=d.get(F);delete V[_.__cacheKey],o.memory.textures--}function D(E){const _=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let K=0;K<_.__webglFramebuffer[V].length;K++)n.deleteFramebuffer(_.__webglFramebuffer[V][K]);else n.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)n.deleteFramebuffer(_.__webglFramebuffer[V]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=E.textures;for(let V=0,K=F.length;V<K;V++){const ut=i.get(F[V]);ut.__webglTexture&&(n.deleteTexture(ut.__webglTexture),o.memory.textures--),i.remove(F[V])}i.remove(E)}let N=0;function q(){N=0}function Z(){return N}function G(E){N=E}function B(){const E=N;return E>=s.maxTextures&&Vt("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),N+=1,E}function U(E){const _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function k(E,_){const F=i.get(E);if(E.isVideoTexture&&C(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&F.__version!==E.version){const V=E.image;if(V===null)Vt("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Vt("WebGLRenderer: Texture marked for update but image is incomplete");else{qt(F,E,_);return}}else E.isExternalTexture&&(F.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+_)}function J(E,_){const F=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){qt(F,E,_);return}else E.isExternalTexture&&(F.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+_)}function at(E,_){const F=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){qt(F,E,_);return}e.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+_)}function gt(E,_){const F=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&F.__version!==E.version){$t(F,E,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+_)}const vt={[Yc]:n.REPEAT,[wi]:n.CLAMP_TO_EDGE,[qc]:n.MIRRORED_REPEAT},ie={[We]:n.NEAREST,[Vx]:n.NEAREST_MIPMAP_NEAREST,[Fo]:n.NEAREST_MIPMAP_LINEAR,[Je]:n.LINEAR,[Ll]:n.LINEAR_MIPMAP_NEAREST,[vs]:n.LINEAR_MIPMAP_LINEAR},ve={[Xx]:n.NEVER,[Zx]:n.ALWAYS,[Yx]:n.LESS,[Sf]:n.LEQUAL,[qx]:n.EQUAL,[yf]:n.GEQUAL,[$x]:n.GREATER,[Kx]:n.NOTEQUAL};function Yt(E,_){if(_.type===Nn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Je||_.magFilter===Ll||_.magFilter===Fo||_.magFilter===vs||_.minFilter===Je||_.minFilter===Ll||_.minFilter===Fo||_.minFilter===vs)&&Vt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,vt[_.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,vt[_.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,vt[_.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,ie[_.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,ie[_.minFilter]),_.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,ve[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===We||_.minFilter!==Fo&&_.minFilter!==vs||_.type===Nn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");n.texParameterf(E,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function tt(E,_){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",R));const V=_.source;let K=d.get(V);K===void 0&&(K={},d.set(V,K));const ut=U(_);if(ut!==E.__cacheKey){K[ut]===void 0&&(K[ut]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,F=!0),K[ut].usedTimes++;const pt=K[E.__cacheKey];pt!==void 0&&(K[E.__cacheKey].usedTimes--,pt.usedTimes===0&&I(_)),E.__cacheKey=ut,E.__webglTexture=K[ut].texture}return F}function mt(E,_,F){return Math.floor(Math.floor(E/F)/_)}function ft(E,_,F,V){const ut=E.updateRanges;if(ut.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,F,V,_.data);else{ut.sort((Pt,Mt)=>Pt.start-Mt.start);let pt=0;for(let Pt=1;Pt<ut.length;Pt++){const Mt=ut[pt],_t=ut[Pt],Gt=Mt.start+Mt.count,Wt=mt(_t.start,_.width,4),Jt=mt(Mt.start,_.width,4);_t.start<=Gt+1&&Wt===Jt&&mt(_t.start+_t.count-1,_.width,4)===Wt?Mt.count=Math.max(Mt.count,_t.start+_t.count-Mt.start):(++pt,ut[pt]=_t)}ut.length=pt+1;const Q=e.getParameter(n.UNPACK_ROW_LENGTH),it=e.getParameter(n.UNPACK_SKIP_PIXELS),dt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Pt=0,Mt=ut.length;Pt<Mt;Pt++){const _t=ut[Pt],Gt=Math.floor(_t.start/4),Wt=Math.ceil(_t.count/4),Jt=Gt%_.width,z=Math.floor(Gt/_.width),xt=Wt,rt=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Jt),e.pixelStorei(n.UNPACK_SKIP_ROWS,z),e.texSubImage2D(n.TEXTURE_2D,0,Jt,z,xt,rt,F,V,_.data)}E.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Q),e.pixelStorei(n.UNPACK_SKIP_PIXELS,it),e.pixelStorei(n.UNPACK_SKIP_ROWS,dt)}}function qt(E,_,F){let V=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=n.TEXTURE_3D);const K=tt(E,_),ut=_.source;e.bindTexture(V,E.__webglTexture,n.TEXTURE0+F);const pt=i.get(ut);if(ut.version!==pt.__version||K===!0){if(e.activeTexture(n.TEXTURE0+F),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const rt=oe.getPrimaries(oe.workingColorSpace),yt=_.colorSpace===es?null:oe.getPrimaries(_.colorSpace),At=_.colorSpace===es||rt===yt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,At)}e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let it=m(_.image,!1,s.maxTextureSize);it=Ct(_,it);const dt=r.convert(_.format,_.colorSpace),Pt=r.convert(_.type);let Mt=M(_.internalFormat,dt,Pt,_.normalized,_.colorSpace,_.isVideoTexture);Yt(V,_);let _t;const Gt=_.mipmaps,Wt=_.isVideoTexture!==!0,Jt=pt.__version===void 0||K===!0,z=ut.dataReady,xt=b(_,it);if(_.isDepthTexture)Mt=w(_.format===Ms,_.type),Jt&&(Wt?e.texStorage2D(n.TEXTURE_2D,1,Mt,it.width,it.height):e.texImage2D(n.TEXTURE_2D,0,Mt,it.width,it.height,0,dt,Pt,null));else if(_.isDataTexture)if(Gt.length>0){Wt&&Jt&&e.texStorage2D(n.TEXTURE_2D,xt,Mt,Gt[0].width,Gt[0].height);for(let rt=0,yt=Gt.length;rt<yt;rt++)_t=Gt[rt],Wt?z&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,_t.width,_t.height,dt,Pt,_t.data):e.texImage2D(n.TEXTURE_2D,rt,Mt,_t.width,_t.height,0,dt,Pt,_t.data);_.generateMipmaps=!1}else Wt?(Jt&&e.texStorage2D(n.TEXTURE_2D,xt,Mt,it.width,it.height),z&&ft(_,it,dt,Pt)):e.texImage2D(n.TEXTURE_2D,0,Mt,it.width,it.height,0,dt,Pt,it.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Wt&&Jt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,xt,Mt,Gt[0].width,Gt[0].height,it.depth);for(let rt=0,yt=Gt.length;rt<yt;rt++)if(_t=Gt[rt],_.format!==Fn)if(dt!==null)if(Wt){if(z)if(_.layerUpdates.size>0){const At=ud(_t.width,_t.height,_.format,_.type);for(const ot of _.layerUpdates){const Bt=_t.data.subarray(ot*At/_t.data.BYTES_PER_ELEMENT,(ot+1)*At/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,ot,_t.width,_t.height,1,dt,Bt)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,_t.width,_t.height,it.depth,dt,_t.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,rt,Mt,_t.width,_t.height,it.depth,0,_t.data,0,0);else Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?z&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,_t.width,_t.height,it.depth,dt,Pt,_t.data):e.texImage3D(n.TEXTURE_2D_ARRAY,rt,Mt,_t.width,_t.height,it.depth,0,dt,Pt,_t.data)}else{Wt&&Jt&&e.texStorage2D(n.TEXTURE_2D,xt,Mt,Gt[0].width,Gt[0].height);for(let rt=0,yt=Gt.length;rt<yt;rt++)_t=Gt[rt],_.format!==Fn?dt!==null?Wt?z&&e.compressedTexSubImage2D(n.TEXTURE_2D,rt,0,0,_t.width,_t.height,dt,_t.data):e.compressedTexImage2D(n.TEXTURE_2D,rt,Mt,_t.width,_t.height,0,_t.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?z&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,_t.width,_t.height,dt,Pt,_t.data):e.texImage2D(n.TEXTURE_2D,rt,Mt,_t.width,_t.height,0,dt,Pt,_t.data)}else if(_.isDataArrayTexture)if(Wt){if(Jt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,xt,Mt,it.width,it.height,it.depth),z)if(_.layerUpdates.size>0){const rt=ud(it.width,it.height,_.format,_.type);for(const yt of _.layerUpdates){const At=it.data.subarray(yt*rt/it.data.BYTES_PER_ELEMENT,(yt+1)*rt/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,yt,it.width,it.height,1,dt,Pt,At)}_.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,dt,Pt,it.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Mt,it.width,it.height,it.depth,0,dt,Pt,it.data);else if(_.isData3DTexture)Wt?(Jt&&e.texStorage3D(n.TEXTURE_3D,xt,Mt,it.width,it.height,it.depth),z&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,dt,Pt,it.data)):e.texImage3D(n.TEXTURE_3D,0,Mt,it.width,it.height,it.depth,0,dt,Pt,it.data);else if(_.isFramebufferTexture){if(Jt)if(Wt)e.texStorage2D(n.TEXTURE_2D,xt,Mt,it.width,it.height);else{let rt=it.width,yt=it.height;for(let At=0;At<xt;At++)e.texImage2D(n.TEXTURE_2D,At,Mt,rt,yt,0,dt,Pt,null),rt>>=1,yt>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const rt=n.canvas;if(rt.hasAttribute("layoutsubtree")||rt.setAttribute("layoutsubtree","true"),it.parentNode!==rt){rt.appendChild(it),f.add(_),rt.onpaint=yt=>{const At=yt.changedElements;for(const ot of f)At.includes(ot.image)&&(ot.needsUpdate=!0)},rt.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,it);else{const At=n.RGBA,ot=n.RGBA,Bt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,At,ot,Bt,it)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Gt.length>0){if(Wt&&Jt){const rt=bt(Gt[0]);e.texStorage2D(n.TEXTURE_2D,xt,Mt,rt.width,rt.height)}for(let rt=0,yt=Gt.length;rt<yt;rt++)_t=Gt[rt],Wt?z&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,dt,Pt,_t):e.texImage2D(n.TEXTURE_2D,rt,Mt,dt,Pt,_t);_.generateMipmaps=!1}else if(Wt){if(Jt){const rt=bt(it);e.texStorage2D(n.TEXTURE_2D,xt,Mt,rt.width,rt.height)}z&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,dt,Pt,it)}else e.texImage2D(n.TEXTURE_2D,0,Mt,dt,Pt,it);p(_)&&S(V),pt.__version=ut.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function $t(E,_,F){if(_.image.length!==6)return;const V=tt(E,_),K=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+F);const ut=i.get(K);if(K.version!==ut.__version||V===!0){e.activeTexture(n.TEXTURE0+F);const pt=oe.getPrimaries(oe.workingColorSpace),Q=_.colorSpace===es?null:oe.getPrimaries(_.colorSpace),it=_.colorSpace===es||pt===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);const dt=_.isCompressedTexture||_.image[0].isCompressedTexture,Pt=_.image[0]&&_.image[0].isDataTexture,Mt=[];for(let ot=0;ot<6;ot++)!dt&&!Pt?Mt[ot]=m(_.image[ot],!0,s.maxCubemapSize):Mt[ot]=Pt?_.image[ot].image:_.image[ot],Mt[ot]=Ct(_,Mt[ot]);const _t=Mt[0],Gt=r.convert(_.format,_.colorSpace),Wt=r.convert(_.type),Jt=M(_.internalFormat,Gt,Wt,_.normalized,_.colorSpace),z=_.isVideoTexture!==!0,xt=ut.__version===void 0||V===!0,rt=K.dataReady;let yt=b(_,_t);Yt(n.TEXTURE_CUBE_MAP,_);let At;if(dt){z&&xt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,yt,Jt,_t.width,_t.height);for(let ot=0;ot<6;ot++){At=Mt[ot].mipmaps;for(let Bt=0;Bt<At.length;Bt++){const Nt=At[Bt];_.format!==Fn?Gt!==null?z?rt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt,0,0,Nt.width,Nt.height,Gt,Nt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt,Jt,Nt.width,Nt.height,0,Nt.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt,0,0,Nt.width,Nt.height,Gt,Wt,Nt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt,Jt,Nt.width,Nt.height,0,Gt,Wt,Nt.data)}}}else{if(At=_.mipmaps,z&&xt){At.length>0&&yt++;const ot=bt(Mt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,yt,Jt,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(Pt){z?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Mt[ot].width,Mt[ot].height,Gt,Wt,Mt[ot].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,Jt,Mt[ot].width,Mt[ot].height,0,Gt,Wt,Mt[ot].data);for(let Bt=0;Bt<At.length;Bt++){const Re=At[Bt].image[ot].image;z?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt+1,0,0,Re.width,Re.height,Gt,Wt,Re.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt+1,Jt,Re.width,Re.height,0,Gt,Wt,Re.data)}}else{z?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Gt,Wt,Mt[ot]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,Jt,Gt,Wt,Mt[ot]);for(let Bt=0;Bt<At.length;Bt++){const Nt=At[Bt];z?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt+1,0,0,Gt,Wt,Nt.image[ot]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt+1,Jt,Gt,Wt,Nt.image[ot])}}}p(_)&&S(n.TEXTURE_CUBE_MAP),ut.__version=K.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function kt(E,_,F,V,K,ut){const pt=r.convert(F.format,F.colorSpace),Q=r.convert(F.type),it=M(F.internalFormat,pt,Q,F.normalized,F.colorSpace),dt=i.get(_),Pt=i.get(F);if(Pt.__renderTarget=_,!dt.__hasExternalTextures){const Mt=Math.max(1,_.width>>ut),_t=Math.max(1,_.height>>ut);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?e.texImage3D(K,ut,it,Mt,_t,_.depth,0,pt,Q,null):e.texImage2D(K,ut,it,Mt,_t,0,pt,Q,null)}e.bindFramebuffer(n.FRAMEBUFFER,E),Rt(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,K,Pt.__webglTexture,0,nt(_)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,K,Pt.__webglTexture,ut),e.bindFramebuffer(n.FRAMEBUFFER,null)}function P(E,_,F){if(n.bindRenderbuffer(n.RENDERBUFFER,E),_.depthBuffer){const V=_.depthTexture,K=V&&V.isDepthTexture?V.type:null,ut=w(_.stencilBuffer,K),pt=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Rt(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,nt(_),ut,_.width,_.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,nt(_),ut,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ut,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,pt,n.RENDERBUFFER,E)}else{const V=_.textures;for(let K=0;K<V.length;K++){const ut=V[K],pt=r.convert(ut.format,ut.colorSpace),Q=r.convert(ut.type),it=M(ut.internalFormat,pt,Q,ut.normalized,ut.colorSpace);Rt(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,nt(_),it,_.width,_.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,nt(_),it,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,it,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function L(E,_,F){const V=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=i.get(_.depthTexture);if(K.__renderTarget=_,(!K.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V){if(K.__webglInit===void 0&&(K.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),K.__webglTexture===void 0){K.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Yt(n.TEXTURE_CUBE_MAP,_.depthTexture);const dt=r.convert(_.depthTexture.format),Pt=r.convert(_.depthTexture.type);let Mt;_.depthTexture.format===Ni?Mt=n.DEPTH_COMPONENT24:_.depthTexture.format===Ms&&(Mt=n.DEPTH24_STENCIL8);for(let _t=0;_t<6;_t++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,Mt,_.width,_.height,0,dt,Pt,null)}}else k(_.depthTexture,0);const ut=K.__webglTexture,pt=nt(_),Q=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+F:n.TEXTURE_2D,it=_.depthTexture.format===Ms?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Ni)Rt(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,it,Q,ut,0,pt):n.framebufferTexture2D(n.FRAMEBUFFER,it,Q,ut,0);else if(_.depthTexture.format===Ms)Rt(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,it,Q,ut,0,pt):n.framebufferTexture2D(n.FRAMEBUFFER,it,Q,ut,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Y(E){const _=i.get(E),F=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){const V=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),V){const K=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,V.removeEventListener("dispose",K)};V.addEventListener("dispose",K),_.__depthDisposeCallback=K}_.__boundDepthTexture=V}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(F)for(let V=0;V<6;V++)L(_.__webglFramebuffer[V],E,V);else{const V=E.texture.mipmaps;V&&V.length>0?L(_.__webglFramebuffer[0],E,0):L(_.__webglFramebuffer,E,0)}else if(F){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]===void 0)_.__webglDepthbuffer[V]=n.createRenderbuffer(),P(_.__webglDepthbuffer[V],E,!1);else{const K=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ut=_.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,ut),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,ut)}}else{const V=E.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),P(_.__webglDepthbuffer,E,!1);else{const K=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ut=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ut),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,ut)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function et(E,_,F){const V=i.get(E);_!==void 0&&kt(V.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&Y(E)}function j(E){const _=E.texture,F=i.get(E),V=i.get(_);E.addEventListener("dispose",v);const K=E.textures,ut=E.isWebGLCubeRenderTarget===!0,pt=K.length>1;if(pt||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=_.version,o.memory.textures++),ut){F.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[Q]=[];for(let it=0;it<_.mipmaps.length;it++)F.__webglFramebuffer[Q][it]=n.createFramebuffer()}else F.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let Q=0;Q<_.mipmaps.length;Q++)F.__webglFramebuffer[Q]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(pt)for(let Q=0,it=K.length;Q<it;Q++){const dt=i.get(K[Q]);dt.__webglTexture===void 0&&(dt.__webglTexture=n.createTexture(),o.memory.textures++)}if(E.samples>0&&Rt(E)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let Q=0;Q<K.length;Q++){const it=K[Q];F.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[Q]);const dt=r.convert(it.format,it.colorSpace),Pt=r.convert(it.type),Mt=M(it.internalFormat,dt,Pt,it.normalized,it.colorSpace,E.isXRRenderTarget===!0),_t=nt(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,_t,Mt,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,F.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),P(F.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ut){e.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),Yt(n.TEXTURE_CUBE_MAP,_);for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0)for(let it=0;it<_.mipmaps.length;it++)kt(F.__webglFramebuffer[Q][it],E,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,it);else kt(F.__webglFramebuffer[Q],E,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(_)&&S(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){for(let Q=0,it=K.length;Q<it;Q++){const dt=K[Q],Pt=i.get(dt);let Mt=n.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Mt=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Mt,Pt.__webglTexture),Yt(Mt,dt),kt(F.__webglFramebuffer,E,dt,n.COLOR_ATTACHMENT0+Q,Mt,0),p(dt)&&S(Mt)}e.unbindTexture()}else{let Q=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Q=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Q,V.__webglTexture),Yt(Q,_),_.mipmaps&&_.mipmaps.length>0)for(let it=0;it<_.mipmaps.length;it++)kt(F.__webglFramebuffer[it],E,_,n.COLOR_ATTACHMENT0,Q,it);else kt(F.__webglFramebuffer,E,_,n.COLOR_ATTACHMENT0,Q,0);p(_)&&S(Q),e.unbindTexture()}E.depthBuffer&&Y(E)}function st(E){const _=E.textures;for(let F=0,V=_.length;F<V;F++){const K=_[F];if(p(K)){const ut=T(E),pt=i.get(K).__webglTexture;e.bindTexture(ut,pt),S(ut),e.unbindTexture()}}}const ht=[],ct=[];function lt(E){if(E.samples>0){if(Rt(E)===!1){const _=E.textures,F=E.width,V=E.height;let K=n.COLOR_BUFFER_BIT;const ut=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=i.get(E),Q=_.length>1;if(Q)for(let dt=0;dt<_.length;dt++)e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer);const it=E.texture.mipmaps;it&&it.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let dt=0;dt<_.length;dt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pt.__webglColorRenderbuffer[dt]);const Pt=i.get(_[dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Pt,0)}n.blitFramebuffer(0,0,F,V,0,0,F,V,K,n.NEAREST),l===!0&&(ht.length=0,ct.length=0,ht.push(n.COLOR_ATTACHMENT0+dt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(ht.push(ut),ct.push(ut),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ct)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ht))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let dt=0;dt<_.length;dt++){e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,pt.__webglColorRenderbuffer[dt]);const Pt=i.get(_[dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,Pt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const _=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function nt(E){return Math.min(s.maxSamples,E.samples)}function Rt(E){const _=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function C(E){const _=o.render.frame;u.get(E)!==_&&(u.set(E,_),E.update())}function Ct(E,_){const F=E.colorSpace,V=E.format,K=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||F!==$a&&F!==es&&(oe.getTransfer(F)===fe?(V!==Fn||K!==Mn)&&Vt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):re("WebGLTextures: Unsupported texture color space:",F)),_}function bt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=q,this.getTextureUnits=Z,this.setTextureUnits=G,this.setTexture2D=k,this.setTexture2DArray=J,this.setTexture3D=at,this.setTextureCube=gt,this.rebindTextures=et,this.setupRenderTarget=j,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=lt,this.setupDepthRenderbuffer=Y,this.setupFrameBufferTexture=kt,this.useMultisampledRTT=Rt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function qE(n,t){function e(i,s=es){let r;const o=oe.getTransfer(s);if(i===Mn)return n.UNSIGNED_BYTE;if(i===mf)return n.UNSIGNED_SHORT_4_4_4_4;if(i===gf)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ym)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===qm)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Wm)return n.BYTE;if(i===Xm)return n.SHORT;if(i===Mo)return n.UNSIGNED_SHORT;if(i===pf)return n.INT;if(i===ci)return n.UNSIGNED_INT;if(i===Nn)return n.FLOAT;if(i===Ui)return n.HALF_FLOAT;if(i===$m)return n.ALPHA;if(i===Km)return n.RGB;if(i===Fn)return n.RGBA;if(i===Ni)return n.DEPTH_COMPONENT;if(i===Ms)return n.DEPTH_STENCIL;if(i===_f)return n.RED;if(i===xf)return n.RED_INTEGER;if(i===Ts)return n.RG;if(i===vf)return n.RG_INTEGER;if(i===Mf)return n.RGBA_INTEGER;if(i===Ia||i===Ua||i===Na||i===Fa)if(o===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ia)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ia)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ua)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Na)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Fa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===$c||i===Kc||i===Zc||i===Jc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===$c)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Kc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Zc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Jc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===jc||i===Qc||i===tu||i===eu||i===nu||i===Ya||i===iu)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===jc||i===Qc)return o===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===tu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===eu)return r.COMPRESSED_R11_EAC;if(i===nu)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ya)return r.COMPRESSED_RG11_EAC;if(i===iu)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===su||i===ru||i===ou||i===au||i===lu||i===cu||i===uu||i===fu||i===hu||i===du||i===pu||i===mu||i===gu||i===_u)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===su)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ru)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ou)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===au)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===lu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===cu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===uu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===fu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===hu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===du)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===pu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===mu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===gu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===_u)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===xu||i===vu||i===Mu)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===xu)return o===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===vu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Mu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Su||i===yu||i===qa||i===bu)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Su)return r.COMPRESSED_RED_RGTC1_EXT;if(i===yu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===qa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===bu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===So?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const $E=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,KE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ZE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new l0(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new ui({vertexShader:$E,fragmentShader:KE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new St(new Ee(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class JE extends os{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null;const x=typeof XRWebGLBinding<"u",m=new ZE,p={},S=e.getContextAttributes();let T=null,M=null;const w=[],b=[],R=new Ot;let v=null;const A=new Ln;A.viewport=new we;const I=new Ln;I.viewport=new we;const D=[A,I],N=new sM;let q=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(tt){let mt=w[tt];return mt===void 0&&(mt=new Bl,w[tt]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(tt){let mt=w[tt];return mt===void 0&&(mt=new Bl,w[tt]=mt),mt.getGripSpace()},this.getHand=function(tt){let mt=w[tt];return mt===void 0&&(mt=new Bl,w[tt]=mt),mt.getHandSpace()};function G(tt){const mt=b.indexOf(tt.inputSource);if(mt===-1)return;const ft=w[mt];ft!==void 0&&(ft.update(tt.inputSource,tt.frame,c||o),ft.dispatchEvent({type:tt.type,data:tt.inputSource}))}function B(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",U);for(let tt=0;tt<w.length;tt++){const mt=b[tt];mt!==null&&(b[tt]=null,w[tt].disconnect(mt))}q=null,Z=null,m.reset();for(const tt in p)delete p[tt];t.setRenderTarget(T),d=null,h=null,f=null,s=null,M=null,Yt.stop(),i.isPresenting=!1,t.setPixelRatio(v),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(tt){r=tt,i.isPresenting===!0&&Vt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(tt){a=tt,i.isPresenting===!0&&Vt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(tt){c=tt},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(tt){if(s=tt,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",B),s.addEventListener("inputsourceschange",U),S.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ft=null,qt=null,$t=null;S.depth&&($t=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ft=S.stencil?Ms:Ni,qt=S.stencil?So:ci);const kt={colorFormat:e.RGBA8,depthFormat:$t,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(kt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),M=new oi(h.textureWidth,h.textureHeight,{format:Fn,type:Mn,depthTexture:new Tr(h.textureWidth,h.textureHeight,qt,void 0,void 0,void 0,void 0,void 0,void 0,ft),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ft={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,ft),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new oi(d.framebufferWidth,d.framebufferHeight,{format:Fn,type:Mn,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Yt.setContext(s),Yt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function U(tt){for(let mt=0;mt<tt.removed.length;mt++){const ft=tt.removed[mt],qt=b.indexOf(ft);qt>=0&&(b[qt]=null,w[qt].disconnect(ft))}for(let mt=0;mt<tt.added.length;mt++){const ft=tt.added[mt];let qt=b.indexOf(ft);if(qt===-1){for(let kt=0;kt<w.length;kt++)if(kt>=b.length){b.push(ft),qt=kt;break}else if(b[kt]===null){b[kt]=ft,qt=kt;break}if(qt===-1)break}const $t=w[qt];$t&&$t.connect(ft)}}const k=new O,J=new O;function at(tt,mt,ft){k.setFromMatrixPosition(mt.matrixWorld),J.setFromMatrixPosition(ft.matrixWorld);const qt=k.distanceTo(J),$t=mt.projectionMatrix.elements,kt=ft.projectionMatrix.elements,P=$t[14]/($t[10]-1),L=$t[14]/($t[10]+1),Y=($t[9]+1)/$t[5],et=($t[9]-1)/$t[5],j=($t[8]-1)/$t[0],st=(kt[8]+1)/kt[0],ht=P*j,ct=P*st,lt=qt/(-j+st),nt=lt*-j;if(mt.matrixWorld.decompose(tt.position,tt.quaternion,tt.scale),tt.translateX(nt),tt.translateZ(lt),tt.matrixWorld.compose(tt.position,tt.quaternion,tt.scale),tt.matrixWorldInverse.copy(tt.matrixWorld).invert(),$t[10]===-1)tt.projectionMatrix.copy(mt.projectionMatrix),tt.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{const Rt=P+lt,C=L+lt,Ct=ht-nt,bt=ct+(qt-nt),E=Y*L/C*Rt,_=et*L/C*Rt;tt.projectionMatrix.makePerspective(Ct,bt,E,_,Rt,C),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert()}}function gt(tt,mt){mt===null?tt.matrixWorld.copy(tt.matrix):tt.matrixWorld.multiplyMatrices(mt.matrixWorld,tt.matrix),tt.matrixWorldInverse.copy(tt.matrixWorld).invert()}this.updateCamera=function(tt){if(s===null)return;let mt=tt.near,ft=tt.far;m.texture!==null&&(m.depthNear>0&&(mt=m.depthNear),m.depthFar>0&&(ft=m.depthFar)),N.near=I.near=A.near=mt,N.far=I.far=A.far=ft,(q!==N.near||Z!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),q=N.near,Z=N.far),N.layers.mask=tt.layers.mask|6,A.layers.mask=N.layers.mask&-5,I.layers.mask=N.layers.mask&-3;const qt=tt.parent,$t=N.cameras;gt(N,qt);for(let kt=0;kt<$t.length;kt++)gt($t[kt],qt);$t.length===2?at(N,A,I):N.projectionMatrix.copy(A.projectionMatrix),vt(tt,N,qt)};function vt(tt,mt,ft){ft===null?tt.matrix.copy(mt.matrixWorld):(tt.matrix.copy(ft.matrixWorld),tt.matrix.invert(),tt.matrix.multiply(mt.matrixWorld)),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.updateMatrixWorld(!0),tt.projectionMatrix.copy(mt.projectionMatrix),tt.projectionMatrixInverse.copy(mt.projectionMatrixInverse),tt.isPerspectiveCamera&&(tt.fov=bo*2*Math.atan(1/tt.projectionMatrix.elements[5]),tt.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(tt){l=tt,h!==null&&(h.fixedFoveation=tt),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=tt)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(tt){return p[tt]};let ie=null;function ve(tt,mt){if(u=mt.getViewerPose(c||o),g=mt,u!==null){const ft=u.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let qt=!1;ft.length!==N.cameras.length&&(N.cameras.length=0,qt=!0);for(let L=0;L<ft.length;L++){const Y=ft[L];let et=null;if(d!==null)et=d.getViewport(Y);else{const st=f.getViewSubImage(h,Y);et=st.viewport,L===0&&(t.setRenderTargetTextures(M,st.colorTexture,st.depthStencilTexture),t.setRenderTarget(M))}let j=D[L];j===void 0&&(j=new Ln,j.layers.enable(L),j.viewport=new we,D[L]=j),j.matrix.fromArray(Y.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(Y.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(et.x,et.y,et.width,et.height),L===0&&(N.matrix.copy(j.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),qt===!0&&N.cameras.push(j)}const $t=s.enabledFeatures;if($t&&$t.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const L=f.getDepthInformation(ft[0]);L&&L.isValid&&L.texture&&m.init(L,s.renderState)}if($t&&$t.includes("camera-access")&&x){t.state.unbindTexture(),f=i.getBinding();for(let L=0;L<ft.length;L++){const Y=ft[L].camera;if(Y){let et=p[Y];et||(et=new l0,p[Y]=et);const j=f.getCameraImage(Y);et.sourceTexture=j}}}}for(let ft=0;ft<w.length;ft++){const qt=b[ft],$t=w[ft];qt!==null&&$t!==void 0&&$t.update(qt,mt,c||o)}ie&&ie(tt,mt),mt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:mt}),g=null}const Yt=new d0;Yt.setAnimationLoop(ve),this.setAnimationLoop=function(tt){ie=tt},this.dispose=function(){}}}const jE=new se,M0=new Kt;M0.set(-1,0,0,0,1,0,0,0,1);function QE(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,u0(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,T,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,T):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===hn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===hn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=t.get(p),T=S.envMap,M=S.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(jE.makeRotationFromEuler(M)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(M0),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,T){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=T*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===hn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function tT(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,w){const b=w.program;i.uniformBlockBinding(M,b)}function c(M,w){let b=s[M.id];b===void 0&&(m(M),b=u(M),s[M.id]=b,M.addEventListener("dispose",S));const R=w.program;i.updateUBOMapping(M,R);const v=t.render.frame;r[M.id]!==v&&(h(M),r[M.id]=v)}function u(M){const w=f();M.__bindingPointIndex=w;const b=n.createBuffer(),R=M.__size,v=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,R,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,b),b}function f(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return re("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const w=s[M.id],b=M.uniforms,R=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let v=0,A=b.length;v<A;v++){const I=b[v];if(Array.isArray(I))for(let D=0,N=I.length;D<N;D++)d(I[D],v,D,R);else d(I,v,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(M,w,b,R){if(x(M,w,b,R)===!0){const v=M.__offset,A=M.value;if(Array.isArray(A)){let I=0;for(let D=0;D<A.length;D++){const N=A[D],q=p(N);g(N,M.__data,I),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(I+=q.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,M.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,M.__data)}}function g(M,w,b){typeof M=="number"||typeof M=="boolean"?w[0]=M:M.isMatrix3?(w[0]=M.elements[0],w[1]=M.elements[1],w[2]=M.elements[2],w[3]=0,w[4]=M.elements[3],w[5]=M.elements[4],w[6]=M.elements[5],w[7]=0,w[8]=M.elements[6],w[9]=M.elements[7],w[10]=M.elements[8],w[11]=0):ArrayBuffer.isView(M)?w.set(new M.constructor(M.buffer,M.byteOffset,w.length)):M.toArray(w,b)}function x(M,w,b,R){const v=M.value,A=w+"_"+b;if(R[A]===void 0)return typeof v=="number"||typeof v=="boolean"?R[A]=v:ArrayBuffer.isView(v)?R[A]=v.slice():R[A]=v.clone(),!0;{const I=R[A];if(typeof v=="number"||typeof v=="boolean"){if(I!==v)return R[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(I.equals(v)===!1)return I.copy(v),!0}}return!1}function m(M){const w=M.uniforms;let b=0;const R=16;for(let A=0,I=w.length;A<I;A++){const D=Array.isArray(w[A])?w[A]:[w[A]];for(let N=0,q=D.length;N<q;N++){const Z=D[N],G=Array.isArray(Z.value)?Z.value:[Z.value];for(let B=0,U=G.length;B<U;B++){const k=G[B],J=p(k),at=b%R,gt=at%J.boundary,vt=at+gt;b+=gt,vt!==0&&R-vt<J.storage&&(b+=R-vt),Z.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=b,b+=J.storage}}}const v=b%R;return v>0&&(b+=R-v),M.__size=b,M.__cache={},this}function p(M){const w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?Vt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(w.boundary=16,w.storage=M.byteLength):Vt("WebGLRenderer: Unsupported uniform value type.",M),w}function S(M){const w=M.target;w.removeEventListener("dispose",S);const b=o.indexOf(w.__bindingPointIndex);o.splice(b,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function T(){for(const M in s)n.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:T}}const eT=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Kn=null;function nT(){return Kn===null&&(Kn=new i0(eT,16,16,Ts,Ui),Kn.name="DFG_LUT",Kn.minFilter=Je,Kn.magFilter=Je,Kn.wrapS=wi,Kn.wrapT=wi,Kn.generateMipmaps=!1,Kn.needsUpdate=!0),Kn}class iT{constructor(t={}){const{canvas:e=jx(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=Mn}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;const x=d,m=new Set([Mf,vf,xf]),p=new Set([Mn,ci,Mo,So,mf,gf]),S=new Uint32Array(4),T=new Int32Array(4),M=new O;let w=null,b=null;const R=[],v=[];let A=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let D=!1,N=null,q=null,Z=null,G=null;this._outputColorSpace=xe;let B=0,U=0,k=null,J=-1,at=null;const gt=new we,vt=new we;let ie=null;const ve=new Ut(0);let Yt=0,tt=e.width,mt=e.height,ft=1,qt=null,$t=null;const kt=new we(0,0,tt,mt),P=new we(0,0,tt,mt);let L=!1;const Y=new Af;let et=!1,j=!1;const st=new se,ht=new O,ct=new we,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let nt=!1;function Rt(){return k===null?ft:1}let C=i;function Ct(y,H){return e.getContext(y,H)}try{const y={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${hf}`),e.addEventListener("webglcontextlost",Re,!1),e.addEventListener("webglcontextrestored",Me,!1),e.addEventListener("webglcontextcreationerror",Wn,!1),C===null){const H="webgl2";if(C=Ct(H,y),C===null)throw Ct(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(y){throw re("WebGLRenderer: "+y.message),y}let bt,E,_,F,V,K,ut,pt,Q,it,dt,Pt,Mt,_t,Gt,Wt,Jt,z,xt,rt,yt,At,ot;function Bt(){bt=new nb(C),bt.init(),yt=new qE(C,bt),E=new $y(C,bt,t,yt),_=new XE(C,bt),E.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),q=C.createFramebuffer(),Z=C.createFramebuffer(),G=C.createFramebuffer(),F=new rb(C),V=new DE,K=new YE(C,bt,_,V,E,yt,F),ut=new eb(I),pt=new cM(C),At=new Yy(C,pt),Q=new ib(C,pt,F,At),it=new ab(C,Q,pt,At,F),z=new ob(C,E,K),Gt=new Ky(V),dt=new PE(I,ut,bt,E,At,Gt),Pt=new QE(I,V),Mt=new IE,_t=new zE(bt),Jt=new Xy(I,ut,_,it,g,l),Wt=new WE(I,it,E),ot=new tT(C,F,E,_),xt=new qy(C,bt,F),rt=new sb(C,bt,F),F.programs=dt.programs,I.capabilities=E,I.extensions=bt,I.properties=V,I.renderLists=Mt,I.shadowMap=Wt,I.state=_,I.info=F}Bt(),x!==Mn&&(A=new cb(x,e.width,e.height,a,s,r));const Nt=new JE(I,C);this.xr=Nt,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const y=bt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=bt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ft},this.setPixelRatio=function(y){y!==void 0&&(ft=y,this.setSize(tt,mt,!1))},this.getSize=function(y){return y.set(tt,mt)},this.setSize=function(y,H,$=!0){if(Nt.isPresenting){Vt("WebGLRenderer: Can't change size while VR device is presenting.");return}tt=y,mt=H,e.width=Math.floor(y*ft),e.height=Math.floor(H*ft),$===!0&&(e.style.width=y+"px",e.style.height=H+"px"),A!==null&&A.setSize(e.width,e.height),this.setViewport(0,0,y,H)},this.getDrawingBufferSize=function(y){return y.set(tt*ft,mt*ft).floor()},this.setDrawingBufferSize=function(y,H,$){tt=y,mt=H,ft=$,e.width=Math.floor(y*$),e.height=Math.floor(H*$),this.setViewport(0,0,y,H)},this.setEffects=function(y){if(x===Mn){re("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let H=0;H<y.length;H++)if(y[H].isOutputPass===!0){Vt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(gt)},this.getViewport=function(y){return y.copy(kt)},this.setViewport=function(y,H,$,W){y.isVector4?kt.set(y.x,y.y,y.z,y.w):kt.set(y,H,$,W),_.viewport(gt.copy(kt).multiplyScalar(ft).round())},this.getScissor=function(y){return y.copy(P)},this.setScissor=function(y,H,$,W){y.isVector4?P.set(y.x,y.y,y.z,y.w):P.set(y,H,$,W),_.scissor(vt.copy(P).multiplyScalar(ft).round())},this.getScissorTest=function(){return L},this.setScissorTest=function(y){_.setScissorTest(L=y)},this.setOpaqueSort=function(y){qt=y},this.setTransparentSort=function(y){$t=y},this.getClearColor=function(y){return y.copy(Jt.getClearColor())},this.setClearColor=function(){Jt.setClearColor(...arguments)},this.getClearAlpha=function(){return Jt.getClearAlpha()},this.setClearAlpha=function(){Jt.setClearAlpha(...arguments)},this.clear=function(y=!0,H=!0,$=!0){let W=0;if(y){let X=!1;if(k!==null){const wt=k.texture.format;X=m.has(wt)}if(X){const wt=k.texture.type,Lt=p.has(wt),Tt=Jt.getClearColor(),Ft=Jt.getClearAlpha(),zt=Tt.r,jt=Tt.g,ee=Tt.b;Lt?(S[0]=zt,S[1]=jt,S[2]=ee,S[3]=Ft,C.clearBufferuiv(C.COLOR,0,S)):(T[0]=zt,T[1]=jt,T[2]=ee,T[3]=Ft,C.clearBufferiv(C.COLOR,0,T))}else W|=C.COLOR_BUFFER_BIT}H&&(W|=C.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(W|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&C.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),N=y},this.dispose=function(){e.removeEventListener("webglcontextlost",Re,!1),e.removeEventListener("webglcontextrestored",Me,!1),e.removeEventListener("webglcontextcreationerror",Wn,!1),Jt.dispose(),Mt.dispose(),_t.dispose(),V.dispose(),ut.dispose(),it.dispose(),At.dispose(),ot.dispose(),dt.dispose(),Nt.dispose(),Nt.removeEventListener("sessionstart",Hf),Nt.removeEventListener("sessionend",Gf),ls.stop()};function Re(y){y.preventDefault(),Ja("WebGLRenderer: Context Lost."),D=!0}function Me(){Ja("WebGLRenderer: Context Restored."),D=!1;const y=F.autoReset,H=Wt.enabled,$=Wt.autoUpdate,W=Wt.needsUpdate,X=Wt.type;Bt(),F.autoReset=y,Wt.enabled=H,Wt.autoUpdate=$,Wt.needsUpdate=W,Wt.type=X}function Wn(y){re("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Xn(y){const H=y.target;H.removeEventListener("dispose",Xn),z0(H)}function z0(y){H0(y),V.remove(y)}function H0(y){const H=V.get(y).programs;H!==void 0&&(H.forEach(function($){dt.releaseProgram($)}),y.isShaderMaterial&&dt.releaseShaderCache(y))}this.renderBufferDirect=function(y,H,$,W,X,wt){H===null&&(H=lt);const Lt=X.isMesh&&X.matrixWorld.determinantAffine()<0,Tt=k0(y,H,$,W,X);_.setMaterial(W,Lt);let Ft=$.index,zt=1;if(W.wireframe===!0){if(Ft=Q.getWireframeAttribute($),Ft===void 0)return;zt=2}const jt=$.drawRange,ee=$.attributes.position;let Ht=jt.start*zt,de=(jt.start+jt.count)*zt;wt!==null&&(Ht=Math.max(Ht,wt.start*zt),de=Math.min(de,(wt.start+wt.count)*zt)),Ft!==null?(Ht=Math.max(Ht,0),de=Math.min(de,Ft.count)):ee!=null&&(Ht=Math.max(Ht,0),de=Math.min(de,ee.count));const De=de-Ht;if(De<0||De===1/0)return;At.setup(X,W,Tt,$,Ft);let Ce,ge=xt;if(Ft!==null&&(Ce=pt.get(Ft),ge=rt,ge.setIndex(Ce)),X.isMesh)W.wireframe===!0?(_.setLineWidth(W.wireframeLinewidth*Rt()),ge.setMode(C.LINES)):ge.setMode(C.TRIANGLES);else if(X.isLine){let Ye=W.linewidth;Ye===void 0&&(Ye=1),_.setLineWidth(Ye*Rt()),X.isLineSegments?ge.setMode(C.LINES):X.isLineLoop?ge.setMode(C.LINE_LOOP):ge.setMode(C.LINE_STRIP)}else X.isPoints?ge.setMode(C.POINTS):X.isSprite&&ge.setMode(C.TRIANGLES);if(X.isBatchedMesh)if(bt.get("WEBGL_multi_draw"))ge.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Ye=X._multiDrawStarts,Dt=X._multiDrawCounts,pn=X._multiDrawCount,ae=Ft?pt.get(Ft).bytesPerElement:1,En=V.get(W).currentProgram.getUniforms();for(let Yn=0;Yn<pn;Yn++)En.setValue(C,"_gl_DrawID",Yn),ge.render(Ye[Yn]/ae,Dt[Yn])}else if(X.isInstancedMesh)ge.renderInstances(Ht,De,X.count);else if($.isInstancedBufferGeometry){const Ye=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Dt=Math.min($.instanceCount,Ye);ge.renderInstances(Ht,De,Dt)}else ge.render(Ht,De)};function zf(y,H,$){y.transparent===!0&&y.side===Oe&&y.forceSinglePass===!1?(y.side=hn,y.needsUpdate=!0,Lo(y,H,$),y.side=rs,y.needsUpdate=!0,Lo(y,H,$),y.side=Oe):Lo(y,H,$)}this.compile=function(y,H,$=null){$===null&&($=y),b=_t.get($),b.init(H),v.push(b),$.traverseVisible(function(X){X.isLight&&X.layers.test(H.layers)&&(b.pushLight(X),X.castShadow&&b.pushShadow(X))}),y!==$&&y.traverseVisible(function(X){X.isLight&&X.layers.test(H.layers)&&(b.pushLight(X),X.castShadow&&b.pushShadow(X))}),b.setupLights();const W=new Set;return y.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const wt=X.material;if(wt)if(Array.isArray(wt))for(let Lt=0;Lt<wt.length;Lt++){const Tt=wt[Lt];zf(Tt,$,X),W.add(Tt)}else zf(wt,$,X),W.add(wt)}),b=v.pop(),W},this.compileAsync=function(y,H,$=null){const W=this.compile(y,H,$);return new Promise(X=>{function wt(){if(W.forEach(function(Lt){V.get(Lt).currentProgram.isReady()&&W.delete(Lt)}),W.size===0){X(y);return}setTimeout(wt,10)}bt.get("KHR_parallel_shader_compile")!==null?wt():setTimeout(wt,10)})};let xl=null;function G0(y){xl&&xl(y)}function Hf(){ls.stop()}function Gf(){ls.start()}const ls=new d0;ls.setAnimationLoop(G0),typeof self<"u"&&ls.setContext(self),this.setAnimationLoop=function(y){xl=y,Nt.setAnimationLoop(y),y===null?ls.stop():ls.start()},Nt.addEventListener("sessionstart",Hf),Nt.addEventListener("sessionend",Gf),this.render=function(y,H){if(H!==void 0&&H.isCamera!==!0){re("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;N!==null&&N.renderStart(y,H);const $=Nt.enabled===!0&&Nt.isPresenting===!0,W=A!==null&&(k===null||$)&&A.begin(I,k);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Nt.enabled===!0&&Nt.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Nt.cameraAutoUpdate===!0&&Nt.updateCamera(H),H=Nt.getCamera()),y.isScene===!0&&y.onBeforeRender(I,y,H,k),b=_t.get(y,v.length),b.init(H),b.state.textureUnits=K.getTextureUnits(),v.push(b),st.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Y.setFromProjectionMatrix(st,si,H.reversedDepth),j=this.localClippingEnabled,et=Gt.init(this.clippingPlanes,j),w=Mt.get(y,R.length),w.init(),R.push(w),Nt.enabled===!0&&Nt.isPresenting===!0){const Lt=I.xr.getDepthSensingMesh();Lt!==null&&vl(Lt,H,-1/0,I.sortObjects)}vl(y,H,0,I.sortObjects),w.finish(),I.sortObjects===!0&&w.sort(qt,$t,H.reversedDepth),nt=Nt.enabled===!1||Nt.isPresenting===!1||Nt.hasDepthSensing()===!1,nt&&Jt.addToRenderList(w,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),et===!0&&Gt.beginShadows();const X=b.state.shadowsArray;if(Wt.render(X,y,H),et===!0&&Gt.endShadows(),(W&&A.hasRenderPass())===!1){const Lt=w.opaque,Tt=w.transmissive;if(b.setupLights(),H.isArrayCamera){const Ft=H.cameras;if(Tt.length>0)for(let zt=0,jt=Ft.length;zt<jt;zt++){const ee=Ft[zt];kf(Lt,Tt,y,ee)}nt&&Jt.render(y);for(let zt=0,jt=Ft.length;zt<jt;zt++){const ee=Ft[zt];Vf(w,y,ee,ee.viewport)}}else Tt.length>0&&kf(Lt,Tt,y,H),nt&&Jt.render(y),Vf(w,y,H)}k!==null&&U===0&&(K.updateMultisampleRenderTarget(k),K.updateRenderTargetMipmap(k)),W&&A.end(I),y.isScene===!0&&y.onAfterRender(I,y,H),At.resetDefaultState(),J=-1,at=null,v.pop(),v.length>0?(b=v[v.length-1],K.setTextureUnits(b.state.textureUnits),et===!0&&Gt.setGlobalState(I.clippingPlanes,b.state.camera)):b=null,R.pop(),R.length>0?w=R[R.length-1]:w=null,N!==null&&N.renderEnd()};function vl(y,H,$,W){if(y.visible===!1)return;if(y.layers.test(H.layers)){if(y.isGroup)$=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(H);else if(y.isLightProbeGrid)b.pushLightProbeGrid(y);else if(y.isLight)b.pushLight(y),y.castShadow&&b.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Y.intersectsSprite(y)){W&&ct.setFromMatrixPosition(y.matrixWorld).applyMatrix4(st);const Lt=it.update(y),Tt=y.material;Tt.visible&&w.push(y,Lt,Tt,$,ct.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Y.intersectsObject(y))){const Lt=it.update(y),Tt=y.material;if(W&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),ct.copy(y.boundingSphere.center)):(Lt.boundingSphere===null&&Lt.computeBoundingSphere(),ct.copy(Lt.boundingSphere.center)),ct.applyMatrix4(y.matrixWorld).applyMatrix4(st)),Array.isArray(Tt)){const Ft=Lt.groups;for(let zt=0,jt=Ft.length;zt<jt;zt++){const ee=Ft[zt],Ht=Tt[ee.materialIndex];Ht&&Ht.visible&&w.push(y,Lt,Ht,$,ct.z,ee)}}else Tt.visible&&w.push(y,Lt,Tt,$,ct.z,null)}}const wt=y.children;for(let Lt=0,Tt=wt.length;Lt<Tt;Lt++)vl(wt[Lt],H,$,W)}function Vf(y,H,$,W){const{opaque:X,transmissive:wt,transparent:Lt}=y;b.setupLightsView($),et===!0&&Gt.setGlobalState(I.clippingPlanes,$),W&&_.viewport(gt.copy(W)),X.length>0&&Do(X,H,$),wt.length>0&&Do(wt,H,$),Lt.length>0&&Do(Lt,H,$),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function kf(y,H,$,W){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[W.id]===void 0){const Ht=bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[W.id]=new oi(1,1,{generateMipmaps:!0,type:Ht?Ui:Mn,minFilter:vs,samples:Math.max(4,E.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:oe.workingColorSpace})}const wt=b.state.transmissionRenderTarget[W.id],Lt=W.viewport||gt;wt.setSize(Lt.z*I.transmissionResolutionScale,Lt.w*I.transmissionResolutionScale);const Tt=I.getRenderTarget(),Ft=I.getActiveCubeFace(),zt=I.getActiveMipmapLevel();I.setRenderTarget(wt),I.getClearColor(ve),Yt=I.getClearAlpha(),Yt<1&&I.setClearColor(16777215,.5),I.clear(),nt&&Jt.render($);const jt=I.toneMapping;I.toneMapping=zn;const ee=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),b.setupLightsView(W),et===!0&&Gt.setGlobalState(I.clippingPlanes,W),Do(y,$,W),K.updateMultisampleRenderTarget(wt),K.updateRenderTargetMipmap(wt),bt.has("WEBGL_multisampled_render_to_texture")===!1){let Ht=!1;for(let de=0,De=H.length;de<De;de++){const Ce=H[de],{object:ge,geometry:Ye,material:Dt,group:pn}=Ce;if(Dt.side===Oe&&ge.layers.test(W.layers)){const ae=Dt.side;Dt.side=hn,Dt.needsUpdate=!0,Wf(ge,$,W,Ye,Dt,pn),Dt.side=ae,Dt.needsUpdate=!0,Ht=!0}}Ht===!0&&(K.updateMultisampleRenderTarget(wt),K.updateRenderTargetMipmap(wt))}I.setRenderTarget(Tt,Ft,zt),I.setClearColor(ve,Yt),ee!==void 0&&(W.viewport=ee),I.toneMapping=jt}function Do(y,H,$){const W=H.isScene===!0?H.overrideMaterial:null;for(let X=0,wt=y.length;X<wt;X++){const Lt=y[X],{object:Tt,geometry:Ft,group:zt}=Lt;let jt=Lt.material;jt.allowOverride===!0&&W!==null&&(jt=W),Tt.layers.test($.layers)&&Wf(Tt,H,$,Ft,jt,zt)}}function Wf(y,H,$,W,X,wt){y.onBeforeRender(I,H,$,W,X,wt),y.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),X.onBeforeRender(I,H,$,W,y,wt),X.transparent===!0&&X.side===Oe&&X.forceSinglePass===!1?(X.side=hn,X.needsUpdate=!0,I.renderBufferDirect($,H,W,X,y,wt),X.side=rs,X.needsUpdate=!0,I.renderBufferDirect($,H,W,X,y,wt),X.side=Oe):I.renderBufferDirect($,H,W,X,y,wt),y.onAfterRender(I,H,$,W,X,wt)}function Lo(y,H,$){H.isScene!==!0&&(H=lt);const W=V.get(y),X=b.state.lights,wt=b.state.shadowsArray,Lt=X.state.version,Tt=dt.getParameters(y,X.state,wt,H,$,b.state.lightProbeGridArray),Ft=dt.getProgramCacheKey(Tt);let zt=W.programs;W.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?H.environment:null,W.fog=H.fog;const jt=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;W.envMap=ut.get(y.envMap||W.environment,jt),W.envMapRotation=W.environment!==null&&y.envMap===null?H.environmentRotation:y.envMapRotation,zt===void 0&&(y.addEventListener("dispose",Xn),zt=new Map,W.programs=zt);let ee=zt.get(Ft);if(ee!==void 0){if(W.currentProgram===ee&&W.lightsStateVersion===Lt)return Yf(y,Tt),ee}else Tt.uniforms=dt.getUniforms(y),N!==null&&y.isNodeMaterial&&N.build(y,$,Tt),y.onBeforeCompile(Tt,I),ee=dt.acquireProgram(Tt,Ft),zt.set(Ft,ee),W.uniforms=Tt.uniforms;const Ht=W.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ht.clippingPlanes=Gt.uniform),Yf(y,Tt),W.needsLights=X0(y),W.lightsStateVersion=Lt,W.needsLights&&(Ht.ambientLightColor.value=X.state.ambient,Ht.lightProbe.value=X.state.probe,Ht.directionalLights.value=X.state.directional,Ht.directionalLightShadows.value=X.state.directionalShadow,Ht.spotLights.value=X.state.spot,Ht.spotLightShadows.value=X.state.spotShadow,Ht.rectAreaLights.value=X.state.rectArea,Ht.ltc_1.value=X.state.rectAreaLTC1,Ht.ltc_2.value=X.state.rectAreaLTC2,Ht.pointLights.value=X.state.point,Ht.pointLightShadows.value=X.state.pointShadow,Ht.hemisphereLights.value=X.state.hemi,Ht.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ht.spotLightMatrix.value=X.state.spotLightMatrix,Ht.spotLightMap.value=X.state.spotLightMap,Ht.pointShadowMatrix.value=X.state.pointShadowMatrix),W.lightProbeGrid=b.state.lightProbeGridArray.length>0,W.currentProgram=ee,W.uniformsList=null,ee}function Xf(y){if(y.uniformsList===null){const H=y.currentProgram.getUniforms();y.uniformsList=Ba.seqWithValue(H.seq,y.uniforms)}return y.uniformsList}function Yf(y,H){const $=V.get(y);$.outputColorSpace=H.outputColorSpace,$.batching=H.batching,$.batchingColor=H.batchingColor,$.instancing=H.instancing,$.instancingColor=H.instancingColor,$.instancingMorph=H.instancingMorph,$.skinning=H.skinning,$.morphTargets=H.morphTargets,$.morphNormals=H.morphNormals,$.morphColors=H.morphColors,$.morphTargetsCount=H.morphTargetsCount,$.numClippingPlanes=H.numClippingPlanes,$.numIntersection=H.numClipIntersection,$.vertexAlphas=H.vertexAlphas,$.vertexTangents=H.vertexTangents,$.toneMapping=H.toneMapping}function V0(y,H){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;M.setFromMatrixPosition(H.matrixWorld);for(let $=0,W=y.length;$<W;$++){const X=y[$];if(X.texture!==null&&X.boundingBox.containsPoint(M))return X}return null}function k0(y,H,$,W,X){H.isScene!==!0&&(H=lt),K.resetTextureUnits();const wt=H.fog,Lt=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?H.environment:null,Tt=k===null?I.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:oe.workingColorSpace,Ft=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,zt=ut.get(W.envMap||Lt,Ft),jt=W.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ee=!!$.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ht=!!$.morphAttributes.position,de=!!$.morphAttributes.normal,De=!!$.morphAttributes.color;let Ce=zn;W.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Ce=I.toneMapping);const ge=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Ye=ge!==void 0?ge.length:0,Dt=V.get(W),pn=b.state.lights;if(et===!0&&(j===!0||y!==at)){const Se=y===at&&W.id===J;Gt.setState(W,y,Se)}let ae=!1;W.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==pn.state.version||Dt.outputColorSpace!==Tt||X.isBatchedMesh&&Dt.batching===!1||!X.isBatchedMesh&&Dt.batching===!0||X.isBatchedMesh&&Dt.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Dt.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Dt.instancing===!1||!X.isInstancedMesh&&Dt.instancing===!0||X.isSkinnedMesh&&Dt.skinning===!1||!X.isSkinnedMesh&&Dt.skinning===!0||X.isInstancedMesh&&Dt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Dt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Dt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Dt.instancingMorph===!1&&X.morphTexture!==null||Dt.envMap!==zt||W.fog===!0&&Dt.fog!==wt||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==Gt.numPlanes||Dt.numIntersection!==Gt.numIntersection)||Dt.vertexAlphas!==jt||Dt.vertexTangents!==ee||Dt.morphTargets!==Ht||Dt.morphNormals!==de||Dt.morphColors!==De||Dt.toneMapping!==Ce||Dt.morphTargetsCount!==Ye||!!Dt.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(ae=!0):(ae=!0,Dt.__version=W.version);let En=Dt.currentProgram;ae===!0&&(En=Lo(W,H,X),N&&W.isNodeMaterial&&N.onUpdateProgram(W,En,Dt));let Yn=!1,Hi=!1,Ds=!1;const _e=En.getUniforms(),Le=Dt.uniforms;if(_.useProgram(En.program)&&(Yn=!0,Hi=!0,Ds=!0),W.id!==J&&(J=W.id,Hi=!0),Dt.needsLights){const Se=V0(b.state.lightProbeGridArray,X);Dt.lightProbeGrid!==Se&&(Dt.lightProbeGrid=Se,Hi=!0)}if(Yn||at!==y){_.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),_e.setValue(C,"projectionMatrix",y.projectionMatrix),_e.setValue(C,"viewMatrix",y.matrixWorldInverse);const Vi=_e.map.cameraPosition;Vi!==void 0&&Vi.setValue(C,ht.setFromMatrixPosition(y.matrixWorld)),E.logarithmicDepthBuffer&&_e.setValue(C,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&_e.setValue(C,"isOrthographic",y.isOrthographicCamera===!0),at!==y&&(at=y,Hi=!0,Ds=!0)}if(Dt.needsLights&&(pn.state.directionalShadowMap.length>0&&_e.setValue(C,"directionalShadowMap",pn.state.directionalShadowMap,K),pn.state.spotShadowMap.length>0&&_e.setValue(C,"spotShadowMap",pn.state.spotShadowMap,K),pn.state.pointShadowMap.length>0&&_e.setValue(C,"pointShadowMap",pn.state.pointShadowMap,K)),X.isSkinnedMesh){_e.setOptional(C,X,"bindMatrix"),_e.setOptional(C,X,"bindMatrixInverse");const Se=X.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),_e.setValue(C,"boneTexture",Se.boneTexture,K))}X.isBatchedMesh&&(_e.setOptional(C,X,"batchingTexture"),_e.setValue(C,"batchingTexture",X._matricesTexture,K),_e.setOptional(C,X,"batchingIdTexture"),_e.setValue(C,"batchingIdTexture",X._indirectTexture,K),_e.setOptional(C,X,"batchingColorTexture"),X._colorsTexture!==null&&_e.setValue(C,"batchingColorTexture",X._colorsTexture,K));const Gi=$.morphAttributes;if((Gi.position!==void 0||Gi.normal!==void 0||Gi.color!==void 0)&&z.update(X,$,En),(Hi||Dt.receiveShadow!==X.receiveShadow)&&(Dt.receiveShadow=X.receiveShadow,_e.setValue(C,"receiveShadow",X.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&H.environment!==null&&(Le.envMapIntensity.value=H.environmentIntensity),Le.dfgLUT!==void 0&&(Le.dfgLUT.value=nT()),Hi){if(_e.setValue(C,"toneMappingExposure",I.toneMappingExposure),Dt.needsLights&&W0(Le,Ds),wt&&W.fog===!0&&Pt.refreshFogUniforms(Le,wt),Pt.refreshMaterialUniforms(Le,W,ft,mt,b.state.transmissionRenderTarget[y.id]),Dt.needsLights&&Dt.lightProbeGrid){const Se=Dt.lightProbeGrid;Le.probesSH.value=Se.texture,Le.probesMin.value.copy(Se.boundingBox.min),Le.probesMax.value.copy(Se.boundingBox.max),Le.probesResolution.value.copy(Se.resolution)}Ba.upload(C,Xf(Dt),Le,K)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ba.upload(C,Xf(Dt),Le,K),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&_e.setValue(C,"center",X.center),_e.setValue(C,"modelViewMatrix",X.modelViewMatrix),_e.setValue(C,"normalMatrix",X.normalMatrix),_e.setValue(C,"modelMatrix",X.matrixWorld),W.uniformsGroups!==void 0){const Se=W.uniformsGroups;for(let Vi=0,Ls=Se.length;Vi<Ls;Vi++){const qf=Se[Vi];ot.update(qf,En),ot.bind(qf,En)}}return En}function W0(y,H){y.ambientLightColor.needsUpdate=H,y.lightProbe.needsUpdate=H,y.directionalLights.needsUpdate=H,y.directionalLightShadows.needsUpdate=H,y.pointLights.needsUpdate=H,y.pointLightShadows.needsUpdate=H,y.spotLights.needsUpdate=H,y.spotLightShadows.needsUpdate=H,y.rectAreaLights.needsUpdate=H,y.hemisphereLights.needsUpdate=H}function X0(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(y,H,$){const W=V.get(y);W.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),V.get(y.texture).__webglTexture=H,V.get(y.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:$,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,H){const $=V.get(y);$.__webglFramebuffer=H,$.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(y,H=0,$=0){k=y,B=H,U=$;let W=null,X=!1,wt=!1;if(y){const Tt=V.get(y);if(Tt.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(C.FRAMEBUFFER,Tt.__webglFramebuffer),gt.copy(y.viewport),vt.copy(y.scissor),ie=y.scissorTest,_.viewport(gt),_.scissor(vt),_.setScissorTest(ie),J=-1;return}else if(Tt.__webglFramebuffer===void 0)K.setupRenderTarget(y);else if(Tt.__hasExternalTextures)K.rebindTextures(y,V.get(y.texture).__webglTexture,V.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const jt=y.depthTexture;if(Tt.__boundDepthTexture!==jt){if(jt!==null&&V.has(jt)&&(y.width!==jt.image.width||y.height!==jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(y)}}const Ft=y.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(wt=!0);const zt=V.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(zt[H])?W=zt[H][$]:W=zt[H],X=!0):y.samples>0&&K.useMultisampledRTT(y)===!1?W=V.get(y).__webglMultisampledFramebuffer:Array.isArray(zt)?W=zt[$]:W=zt,gt.copy(y.viewport),vt.copy(y.scissor),ie=y.scissorTest}else gt.copy(kt).multiplyScalar(ft).floor(),vt.copy(P).multiplyScalar(ft).floor(),ie=L;if($!==0&&(W=q),_.bindFramebuffer(C.FRAMEBUFFER,W)&&_.drawBuffers(y,W),_.viewport(gt),_.scissor(vt),_.setScissorTest(ie),X){const Tt=V.get(y.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+H,Tt.__webglTexture,$)}else if(wt){const Tt=H;for(let Ft=0;Ft<y.textures.length;Ft++){const zt=V.get(y.textures[Ft]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Ft,zt.__webglTexture,$,Tt)}}else if(y!==null&&$!==0){const Tt=V.get(y.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Tt.__webglTexture,$)}J=-1},this.readRenderTargetPixels=function(y,H,$,W,X,wt,Lt,Tt=0){if(!(y&&y.isWebGLRenderTarget)){re("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ft=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Lt!==void 0&&(Ft=Ft[Lt]),Ft){_.bindFramebuffer(C.FRAMEBUFFER,Ft);try{const zt=y.textures[Tt],jt=zt.format,ee=zt.type;if(y.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Tt),!E.textureFormatReadable(jt)){re("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!E.textureTypeReadable(ee)){re("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=y.width-W&&$>=0&&$<=y.height-X&&C.readPixels(H,$,W,X,yt.convert(jt),yt.convert(ee),wt)}finally{const zt=k!==null?V.get(k).__webglFramebuffer:null;_.bindFramebuffer(C.FRAMEBUFFER,zt)}}},this.readRenderTargetPixelsAsync=async function(y,H,$,W,X,wt,Lt,Tt=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ft=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Lt!==void 0&&(Ft=Ft[Lt]),Ft)if(H>=0&&H<=y.width-W&&$>=0&&$<=y.height-X){_.bindFramebuffer(C.FRAMEBUFFER,Ft);const zt=y.textures[Tt],jt=zt.format,ee=zt.type;if(y.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Tt),!E.textureFormatReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!E.textureTypeReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ht=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Ht),C.bufferData(C.PIXEL_PACK_BUFFER,wt.byteLength,C.STREAM_READ),C.readPixels(H,$,W,X,yt.convert(jt),yt.convert(ee),0);const de=k!==null?V.get(k).__webglFramebuffer:null;_.bindFramebuffer(C.FRAMEBUFFER,de);const De=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Qx(C,De,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Ht),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,wt),C.deleteBuffer(Ht),C.deleteSync(De),wt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,H=null,$=0){const W=Math.pow(2,-$),X=Math.floor(y.image.width*W),wt=Math.floor(y.image.height*W),Lt=H!==null?H.x:0,Tt=H!==null?H.y:0;K.setTexture2D(y,0),C.copyTexSubImage2D(C.TEXTURE_2D,$,0,0,Lt,Tt,X,wt),_.unbindTexture()},this.copyTextureToTexture=function(y,H,$=null,W=null,X=0,wt=0){let Lt,Tt,Ft,zt,jt,ee,Ht,de,De;const Ce=y.isCompressedTexture?y.mipmaps[wt]:y.image;if($!==null)Lt=$.max.x-$.min.x,Tt=$.max.y-$.min.y,Ft=$.isBox3?$.max.z-$.min.z:1,zt=$.min.x,jt=$.min.y,ee=$.isBox3?$.min.z:0;else{const Le=Math.pow(2,-X);Lt=Math.floor(Ce.width*Le),Tt=Math.floor(Ce.height*Le),y.isDataArrayTexture?Ft=Ce.depth:y.isData3DTexture?Ft=Math.floor(Ce.depth*Le):Ft=1,zt=0,jt=0,ee=0}W!==null?(Ht=W.x,de=W.y,De=W.z):(Ht=0,de=0,De=0);const ge=yt.convert(H.format),Ye=yt.convert(H.type);let Dt;H.isData3DTexture?(K.setTexture3D(H,0),Dt=C.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(K.setTexture2DArray(H,0),Dt=C.TEXTURE_2D_ARRAY):(K.setTexture2D(H,0),Dt=C.TEXTURE_2D),_.activeTexture(C.TEXTURE0),_.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,H.flipY),_.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),_.pixelStorei(C.UNPACK_ALIGNMENT,H.unpackAlignment);const pn=_.getParameter(C.UNPACK_ROW_LENGTH),ae=_.getParameter(C.UNPACK_IMAGE_HEIGHT),En=_.getParameter(C.UNPACK_SKIP_PIXELS),Yn=_.getParameter(C.UNPACK_SKIP_ROWS),Hi=_.getParameter(C.UNPACK_SKIP_IMAGES);_.pixelStorei(C.UNPACK_ROW_LENGTH,Ce.width),_.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Ce.height),_.pixelStorei(C.UNPACK_SKIP_PIXELS,zt),_.pixelStorei(C.UNPACK_SKIP_ROWS,jt),_.pixelStorei(C.UNPACK_SKIP_IMAGES,ee);const Ds=y.isDataArrayTexture||y.isData3DTexture,_e=H.isDataArrayTexture||H.isData3DTexture;if(y.isDepthTexture){const Le=V.get(y),Gi=V.get(H),Se=V.get(Le.__renderTarget),Vi=V.get(Gi.__renderTarget);_.bindFramebuffer(C.READ_FRAMEBUFFER,Se.__webglFramebuffer),_.bindFramebuffer(C.DRAW_FRAMEBUFFER,Vi.__webglFramebuffer);for(let Ls=0;Ls<Ft;Ls++)Ds&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,V.get(y).__webglTexture,X,ee+Ls),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,V.get(H).__webglTexture,wt,De+Ls)),C.blitFramebuffer(zt,jt,Lt,Tt,Ht,de,Lt,Tt,C.DEPTH_BUFFER_BIT,C.NEAREST);_.bindFramebuffer(C.READ_FRAMEBUFFER,null),_.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(X!==0||y.isRenderTargetTexture||V.has(y)){const Le=V.get(y),Gi=V.get(H);_.bindFramebuffer(C.READ_FRAMEBUFFER,Z),_.bindFramebuffer(C.DRAW_FRAMEBUFFER,G);for(let Se=0;Se<Ft;Se++)Ds?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Le.__webglTexture,X,ee+Se):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Le.__webglTexture,X),_e?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Gi.__webglTexture,wt,De+Se):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Gi.__webglTexture,wt),X!==0?C.blitFramebuffer(zt,jt,Lt,Tt,Ht,de,Lt,Tt,C.COLOR_BUFFER_BIT,C.NEAREST):_e?C.copyTexSubImage3D(Dt,wt,Ht,de,De+Se,zt,jt,Lt,Tt):C.copyTexSubImage2D(Dt,wt,Ht,de,zt,jt,Lt,Tt);_.bindFramebuffer(C.READ_FRAMEBUFFER,null),_.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else _e?y.isDataTexture||y.isData3DTexture?C.texSubImage3D(Dt,wt,Ht,de,De,Lt,Tt,Ft,ge,Ye,Ce.data):H.isCompressedArrayTexture?C.compressedTexSubImage3D(Dt,wt,Ht,de,De,Lt,Tt,Ft,ge,Ce.data):C.texSubImage3D(Dt,wt,Ht,de,De,Lt,Tt,Ft,ge,Ye,Ce):y.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,wt,Ht,de,Lt,Tt,ge,Ye,Ce.data):y.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,wt,Ht,de,Ce.width,Ce.height,ge,Ce.data):C.texSubImage2D(C.TEXTURE_2D,wt,Ht,de,Lt,Tt,ge,Ye,Ce);_.pixelStorei(C.UNPACK_ROW_LENGTH,pn),_.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ae),_.pixelStorei(C.UNPACK_SKIP_PIXELS,En),_.pixelStorei(C.UNPACK_SKIP_ROWS,Yn),_.pixelStorei(C.UNPACK_SKIP_IMAGES,Hi),wt===0&&H.generateMipmaps&&C.generateMipmap(Dt),_.unbindTexture()},this.initRenderTarget=function(y){V.get(y).__webglFramebuffer===void 0&&K.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?K.setTextureCube(y,0):y.isData3DTexture?K.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?K.setTexture2DArray(y,0):K.setTexture2D(y,0),_.unbindTexture()},this.resetState=function(){B=0,U=0,k=null,_.reset(),At.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}}const Ud={type:"change"},Pf={type:"start"},S0={type:"end"},ma=new Po,Nd=new Qi,sT=Math.cos(70*Oa.DEG2RAD),Fe=new O,cn=2*Math.PI,pe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},fc=1e-6;class rT extends aM{constructor(t,e=null){super(t,e),this.state=pe.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:gr.ROTATE,MIDDLE:gr.DOLLY,RIGHT:gr.PAN},this.touches={ONE:ns.ROTATE,TWO:ns.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new Gn,this._lastTargetPosition=new O,this._quat=new Gn().setFromUnitVectors(t.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ld,this._sphericalDelta=new ld,this._scale=1,this._panOffset=new O,this._rotateStart=new Ot,this._rotateEnd=new Ot,this._rotateDelta=new Ot,this._panStart=new Ot,this._panEnd=new Ot,this._panDelta=new Ot,this._dollyStart=new Ot,this._dollyEnd=new Ot,this._dollyDelta=new Ot,this._dollyDirection=new O,this._mouse=new Ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=aT.bind(this),this._onPointerDown=oT.bind(this),this._onPointerUp=lT.bind(this),this._onContextMenu=mT.bind(this),this._onMouseWheel=fT.bind(this),this._onKeyDown=hT.bind(this),this._onTouchStart=dT.bind(this),this._onTouchMove=pT.bind(this),this._onMouseDown=cT.bind(this),this._onMouseMove=uT.bind(this),this._interceptControlDown=gT.bind(this),this._interceptControlUp=_T.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ud),this.update(),this.state=pe.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Fe.copy(e).sub(this.target),Fe.applyQuaternion(this._quat),this._spherical.setFromVector3(Fe),this.autoRotate&&this.state===pe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=cn:i>Math.PI&&(i-=cn),s<-Math.PI?s+=cn:s>Math.PI&&(s-=cn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Fe.setFromSpherical(this._spherical),Fe.applyQuaternion(this._quatInverse),e.copy(this.target).add(Fe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Fe.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new O(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new O(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Fe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ma.origin.copy(this.object.position),ma.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ma.direction))<sT?this.object.lookAt(this.target):(Nd.setFromNormalAndCoplanarPoint(this.object.up,this.target),ma.intersectPlane(Nd,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>fc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>fc||this._lastTargetPosition.distanceToSquared(this.target)>fc?(this.dispatchEvent(Ud),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?cn/60*this.autoRotateSpeed*t:cn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Fe.setFromMatrixColumn(e,0),Fe.multiplyScalar(-t),this._panOffset.add(Fe)}_panUp(t,e){this.screenSpacePanning===!0?Fe.setFromMatrixColumn(e,1):(Fe.setFromMatrixColumn(e,0),Fe.crossVectors(this.object.up,Fe)),Fe.multiplyScalar(t),this._panOffset.add(Fe)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Fe.copy(s).sub(this.target);let r=Fe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/e.clientHeight),this._rotateUp(cn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/e.clientHeight),this._rotateUp(cn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function oT(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function aT(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function lT(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(S0),this.state=pe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function cT(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case gr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=pe.DOLLY;break;case gr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=pe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=pe.ROTATE}break;case gr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=pe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=pe.PAN}break;default:this.state=pe.NONE}this.state!==pe.NONE&&this.dispatchEvent(Pf)}function uT(n){switch(this.state){case pe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case pe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case pe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function fT(n){this.enabled===!1||this.enableZoom===!1||this.state!==pe.NONE||(n.preventDefault(),this.dispatchEvent(Pf),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(S0))}function hT(n){this.enabled!==!1&&this._handleKeyDown(n)}function dT(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ns.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=pe.TOUCH_ROTATE;break;case ns.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=pe.TOUCH_PAN;break;default:this.state=pe.NONE}break;case 2:switch(this.touches.TWO){case ns.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=pe.TOUCH_DOLLY_PAN;break;case ns.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=pe.TOUCH_DOLLY_ROTATE;break;default:this.state=pe.NONE}break;default:this.state=pe.NONE}this.state!==pe.NONE&&this.dispatchEvent(Pf)}function pT(n){switch(this._trackPointer(n),this.state){case pe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case pe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case pe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case pe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=pe.NONE}}function mT(n){this.enabled!==!1&&n.preventDefault()}function gT(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function _T(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const yn=46,Ar=10,Du=yn+Ar,Fd=14,Df=16,Ve=(3*yn+4*Ar)/2,dn=n=>(n-1)*Du,Od=n=>(n-1)*Df;function Ur([n,t],[e,i]){return{x:dn(t)+Od(i),z:dn(n)+Od(e)}}const To=[-1,0,1,2].map(n=>n*Du-Du/2),Rr={w:yn-2,d:yn-2,h:13,trackCount:6,viaductY:8.5},y0=[{id:"algo-lab",cell:[0,0],lot:[1,1],h:30},{id:"flip7",cell:[0,1],lot:[0,1],h:22},{id:"machi-koro",cell:[0,2],lot:[1,2],h:20},{id:"venue-search",cell:[1,0],lot:[1,0],h:34},{id:"reading-buddy",cell:[1,2],lot:[1,2],h:24},{id:"japan-map",cell:[2,0],lot:[1,1],h:26},{id:"right-word-japanese",cell:[2,1],lot:[2,1],h:18},{id:"japanese-dashboard",cell:[0,0],lot:[2,2],h:24},{id:"bible-hymn-kids",cell:[2,0],lot:[0,0],h:20}];function Bd(n,t){const e=t.map(i=>Ur(n,i));return{x:e.reduce((i,s)=>i+s.x,0)/e.length,z:e.reduce((i,s)=>i+s.z,0)/e.length}}const Lu=[{id:"tocho",cell:[1,0],lots:[[0,0],[0,1],[0,2],[1,1],[1,2],[2,2]],h:67},{id:"cocoon",cell:[1,0],lots:[[2,1]],h:34}],b0=[{id:"konbini",cell:[1,2],lot:[2,0],ry:0},{id:"koban",cell:[2,1],lot:[0,0],ry:0},{id:"vending",cell:[0,1],lot:[2,2],ry:0},{id:"vending",cell:[2,0],lot:[0,2],ry:-Math.PI/2}],xT=[{cell:[0,0],kind:"tower",height:[28,44],fill:.7},{cell:[0,1],kind:"midrise",height:[14,24],fill:.6},{cell:[0,2],kind:"midrise",height:[16,28],fill:.9},{cell:[1,0],kind:"tower",height:[26,42],fill:.7},{cell:[1,2],kind:"midrise",height:[18,30],fill:.8},{cell:[2,0],kind:"midrise",height:[16,26],fill:.6},{cell:[2,1],kind:"midrise",height:[14,22],fill:.6},{cell:[2,2],kind:"goldengai",height:[6,9],fill:1}],el=[2,2];function vT(n){let t=n;return()=>(t=(t*1664525+1013904223)%4294967296)/4294967296}function MT(){const n=vT(19910714),t=[],e=new Set(y0.map(i=>`${i.cell}|${i.lot}`));for(const i of Lu)for(const s of i.lots)e.add(`${i.cell}|${s}`);for(const i of b0)e.add(`${i.cell}|${i.lot}`);for(const i of xT)if(String(i.cell)!==String(el))for(let s=0;s<3;s++)for(let r=0;r<3;r++){const o=`${i.cell}|${[s,r]}`;if(e.has(o)||n()>i.fill)continue;const{x:a,z:l}=Ur(i.cell,[s,r]),[c,u]=i.height,f=Fd*(.62+n()*.3),h=Fd*(.62+n()*.3);t.push({x:a,z:l,w:f,d:h,h:c+n()*(u-c),kind:i.kind,ry:(n()-.5)*.08})}return t}const ST=267,E0=145,yT=21.3,hc=yT/.927,ga=Math.PI/4,bT=5,ET=30,dc=.9,TT=n=>Math.sqrt(n/E0),zd={high:.75,low:.55},wT=30,AT=8;function RT(){const n=document.createElement("canvas");n.width=64,n.height=256;const t=n.getContext("2d"),e=t.createLinearGradient(0,0,0,256);e.addColorStop(0,"#03050b"),e.addColorStop(.32,"#070b16"),e.addColorStop(.46,"#141a2e"),e.addColorStop(.5,"#3a2740"),e.addColorStop(.54,"#2a1a22"),e.addColorStop(1,"#05070d"),t.fillStyle=e,t.fillRect(0,0,64,256);const i=new Xe(n);return i.mapping=La,i.colorSpace=xe,i}function CT(){return window.innerWidth<900||matchMedia("(pointer: coarse)").matches?"low":"high"}function PT(n,t={}){const e=t.quality??CT(),i=e==="low",s=matchMedia("(prefers-reduced-motion: reduce)").matches,r=new iT({canvas:n,antialias:!1});r.setPixelRatio(t.resScale??(i?zd.low:zd.high)),r.toneMapping=zn;const o=new Pv;o.fog=new wf(461330,220,500),o.background=RT();const a=new ml(-1,1,1,-1,.1,2e3),l=22*Math.PI/180,c=200;a.position.set(c*Math.cos(l)*Math.sin(ga),c*Math.sin(l)+hc,c*Math.cos(l)*Math.cos(ga));const u=new rT(a,n);u.target.set(0,hc,0),u.enablePan=!0,u.screenSpacePanning=!1,u.touches.ONE=ns.PAN,u.touches.TWO=ns.DOLLY_ROTATE,u.enableDamping=!0,u.dampingFactor=.08,u.minPolarAngle=Math.PI*.26,u.maxPolarAngle=Math.PI*.46,u.minAzimuthAngle=ga-Math.PI/5,u.maxAzimuthAngle=ga+Math.PI/5,u.minZoom=dc,u.zoom0=1,u.update();let f=!1;function h(){const{clientWidth:B,clientHeight:U}=n;if(!B||!U)return;const k=B/U,J=Math.max(E0,ST/k);if(a.left=-J*k/2,a.right=J*k/2,a.top=J/2,a.bottom=-J/2,a.updateProjectionMatrix(),u.maxZoom=Math.max(dc+.1,J/ET),!f){f=!0;const at=Oa.clamp(TT(J),dc,u.maxZoom);a.zoom=at,u.zoom0=at,a.updateProjectionMatrix()}r.setSize(B,U,!1),q()}const d=new ResizeObserver(h);d.observe(n);const g=[],x=new rM,m=new Ot,p={hover:()=>{},select:()=>{}};let S=null,T=null;function M(B){const U=x.far;x.far=B.distance-.01;const k=x.intersectObject(o,!0).some(J=>J.object.visible&&!g.includes(J.object)&&![J.object.material].flat().some(at=>at==null?void 0:at.transparent));return x.far=U,k}function w(B){const U=n.getBoundingClientRect();m.x=(B.clientX-U.left)/U.width*2-1,m.y=-((B.clientY-U.top)/U.height)*2+1,x.setFromCamera(m,a);const k=x.intersectObjects(g,!1)[0];return k?M(k)?null:k.object:null}function b(B){const U=w(B);U!==S&&(S=U,n.style.cursor=U?"pointer":"grab",p.hover((U==null?void 0:U.userData.project)??null),q())}const R=B=>{T={x:B.clientX,y:B.clientY}};function v(B){if(!T)return;const U=Math.hypot(B.clientX-T.x,B.clientY-T.y);if(T=null,U>bT)return;const k=w(B);k&&p.select(k.userData.project)}n.addEventListener("pointermove",b),n.addEventListener("pointerdown",R),n.addEventListener("pointerup",v);const A=[],I=new oM;let D=!0,N=0;const q=()=>{D=!0};function Z(){const B=u.target,U=Oa.clamp(B.x,-Ve,Ve)-B.x,k=hc-B.y,J=Oa.clamp(B.z,-Ve,Ve)-B.z;!U&&!k&&!J||(B.set(B.x+U,B.y+k,B.z+J),a.position.set(a.position.x+U,a.position.y+k,a.position.z+J))}function G(B){const U=u.update();if(Z(),s){if(!U&&!D)return;D=!1,r.render(o,a);return}if(B-N<1e3/wT-AT)return;const k=Math.min((B-N)/1e3,.1);N=B;for(const J of A)J(k,I.getElapsedTime());D=!1,r.render(o,a)}return h(),{scene:o,camera:a,controls:u,renderer:r,reduceMotion:s,quality:e,invalidate:q,onFrame:B=>A.push(B),addPickable(B,U){B.userData.project=U,g.push(B)},onHover:B=>{p.hover=B},onSelect:B=>{p.select=B},start:()=>r.setAnimationLoop(G),stop:()=>r.setAnimationLoop(null),dispose(){var B;r.setAnimationLoop(null),d.disconnect(),n.removeEventListener("pointermove",b),n.removeEventListener("pointerdown",R),n.removeEventListener("pointerup",v),u.dispose(),o.traverse(U=>{var k;(k=U.geometry)==null||k.dispose();for(const J of[U.material].flat().filter(Boolean)){for(const at of Object.values(J))at!=null&&at.isTexture&&at.dispose();J.dispose()}}),(B=o.background)==null||B.dispose(),r.dispose()}}}function DT(n){n.add(new nM(4871544,2.2));const t=new eM(12767984,1.8);t.position.set(-60,70,40),n.add(t)}function zi(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,l=new He;let c=0;for(let u=0;u<n.length;++u){const f=n[u];let h=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in f.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),h++}if(h!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in f.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,u),c+=d}}if(e){let u=0;const f=[];for(let h=0;h<n.length;++h){const d=n[h].index;for(let g=0;g<d.count;++g)f.push(d.getX(g)+u);u+=n[h].attributes.position.count}l.setIndex(f)}for(const u in r){const f=Hd(r[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,f)}for(const u in o){const f=o[u][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let h=0;h<f;++h){const d=[];for(let x=0;x<o[u].length;++x)d.push(o[u][x][h]);const g=Hd(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}}return l}function Hd(n){let t,e,i,s=-1,r=0;for(let c=0;c<n.length;++c){const u=n[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new ln(o,e,i);let l=0;for(let c=0;c<n.length;++c){const u=n[c];if(u.isInterleavedBufferAttribute){const f=l/e;for(let h=0,d=u.count;h<d;h++)for(let g=0;g<e;g++){const x=u.getComponent(h,g);a.setComponent(h+f,g,x)}}else o.set(u.array,l);l+=u.count*e}return s!==void 0&&(a.gpuType=s),a}const LT=658709,kn=16723285,fi=58879,hi=16757575,Cr=12173516,ke=15918020;let Kr=null;function T0(){if(Kr)return Kr;const n=128,t=document.createElement("canvas");t.width=n,t.height=n;const e=t.getContext("2d"),i=n/2,s=e.createRadialGradient(i,i,0,i,i,i);return s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.5,"rgba(255,255,255,0.4)"),s.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=s,e.fillRect(0,0,n,n),Kr=new Xe(t),Kr.colorSpace=xe,Kr}function Lf({color:n,radius:t=6,intensity:e=1}){const i=new le({map:T0(),color:n,transparent:!0,blending:vo,depthWrite:!1,opacity:e}),s=new St(new Ee(2,2),i);return s.rotation.x=-Math.PI/2,s.scale.set(t,t,1),s}const Gd=n=>"#"+n.toString(16).padStart(6,"0");let Vd=20260731;const Ue=()=>(Vd=(Vd*1664525+1013904223)%4294967296)/4294967296,vn=256,Ji=1200,za=Ji/2,IT=7;function kd(n,t,e,i){const s=e-t,r=Math.max(1,Math.round(i/IT)),o=s/r,a=vn/2;n.fillStyle="rgba(224,218,200,0.55)";for(let l=0;l<r;l++){const c=t+l*o+(Ue()-.5)*o*.2,u=o*(.42+Ue()*.2);n.fillRect(a-3,Math.max(t,c),6,Math.min(u,e-c))}}function UT(n,t){const e=za/(2*Ve),i=Ar/2*e,s=t-i;n.fillStyle="rgba(255,255,255,0.05)",n.fillRect(0,s,vn,i*2),n.fillStyle="rgba(230,225,210,0.65)";const r=i*.5,o=vn*.08,a=i*.55;n.fillRect(0,s+i-a,vn,r),n.fillRect(0,s+i+a-r,vn,r),n.fillRect(vn/2-a,s,o,i*2),n.fillRect(vn/2+a-o,s,o,i*2)}function NT(){const n=document.createElement("canvas");n.width=vn,n.height=Ji;const t=document.createElement("canvas");t.width=vn,t.height=Ji;const e=n.getContext("2d"),i=t.getContext("2d");e.fillStyle=Gd(LT),e.fillRect(0,0,vn,Ji),i.fillStyle="#000",i.fillRect(0,0,vn,Ji),e.fillStyle="rgba(0,0,0,0.12)";for(let o=0;o<140;o++){const a=8+Ue()*34,l=6+Ue()*22;e.fillRect(Ue()*vn,Ue()*Ji,a,l)}kd(e,0,za,2*Ve),kd(e,za,Ji,yn);for(const o of To)UT(e,(o+Ve)/(2*Ve)*za);const s=[kn,fi,hi,ke];for(let o=0;o<26;o++){const a=Ue()*vn,l=Ue()*Ji,c=10+Ue()*26,u=30+Ue()*90,f=i.createLinearGradient(a,l,a,l+u);f.addColorStop(0,Gd(s[Math.floor(Ue()*s.length)])),f.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=f,i.globalAlpha=.3+Ue()*.3,i.filter=`blur(${c*.3}px)`,i.fillRect(a-c/2,l,c,u)}i.filter="none",i.globalAlpha=1;const r=o=>Object.assign(new Xe(o),{colorSpace:xe,anisotropy:8});return{map:r(n),emissiveMap:r(t)}}function FT(n,t,e,i){const s=n.attributes.uv;for(let r=0;r<s.count;r++){let o=s.getX(r),a=s.getY(r);if(t){const l=o;o=a,a=l}e&&(a=1-a),s.setXY(r,o,i==="through"?a*.5:.5+a*.5)}}function Wd(n,t,e,i,{swap:s,band:r}){const o=new Ee(n,t);return FT(o,s,Ue()<.5,r),o.rotateX(-Math.PI/2),o.translate(e,0,i),o}function OT(){const n=[],t=2*Ve;for(const o of To)n.push(Wd(Ar,t,o,0,{swap:!1,band:"through"}));for(const o of To)for(const a of[0,1,2])n.push(Wd(yn,Ar,dn(a),o,{swap:!0,band:"segment"}));const e=zi(n),{map:i,emissiveMap:s}=NT(),r=new Xt({map:i,emissiveMap:s,emissive:16777215,emissiveIntensity:.5});return new St(e,r)}const Xd=4*Ve,BT=527123;function zT(){const n=new Ee(Xd,Xd);n.rotateX(-Math.PI/2);const t=new St(n,new Xt({color:BT}));return t.position.y=-.04,t}const Yd=.16,_a=.4,qd=2763827;function HT(){const n=[];for(const i of[0,1,2])for(const s of[0,1,2]){const r=dn(s),o=dn(i),a=yn/2,l=[[yn,_a,r,o-a],[yn,_a,r,o+a],[_a,yn,r-a,o],[_a,yn,r+a,o]];for(const[c,u,f,h]of l){const d=new It(c,Yd,u);d.translate(f,Yd/2,h),n.push(d)}}const t=zi(n),e=new Xt({color:qd,emissive:qd,emissiveIntensity:.35});return new St(t,e)}const $d=[kn,fi,hi,ke],pc=18,Kd=6;function Zd(n,t,e){const i=$d[Math.floor(Ue()*$d.length)],s=4+Ue()*5,r=.5+Ue()*.4,o=Lf({color:i,radius:s,intensity:r});o.position.set(t,.03,e),n.add(o)}function GT(n){const t=[];for(let e=-Ve+Kd;e<=Ve-Kd;e+=pc)t.push(e);for(const e of To)for(const i of t)Zd(n,e+(Ue()-.5)*3,i+(Ue()-.5)*(pc*.4)),Zd(n,i+(Ue()-.5)*(pc*.4),e+(Ue()-.5)*3)}function VT(){const n=new Ae;return n.add(zT()),n.add(OT()),n.add(HT()),GT(n),n}let Jd=20260731;const Iu=()=>(Jd=(Jd*1664525+1013904223)%4294967296)/4294967296,nl=120,Uu=240,kT="#3d4553",jd="#464e5d",Qd=["#f2e3c4","#d9b878","#a8cfe8","#8a9bb0"],WT=.19,XT=.225,YT=[{cols:4,rows:6,pierAt:0,lit:.44,cap:0},{cols:3,rows:5,pierAt:1,lit:.4,cap:0},{cols:4,rows:7,pierAt:2,lit:.48,cap:0},{cols:3,rows:6,pierAt:0,lit:.42,cap:0}],qT=[{cols:4,rows:10,pierAt:0,lit:.48,cap:1},{cols:4,rows:11,pierAt:3,lit:.45,cap:1},{cols:3,rows:9,pierAt:1,lit:.52,cap:1},{cols:4,rows:12,pierAt:2,lit:.46,cap:1}],mc=[...YT,...qT],$T=[0,1,2,3],KT=[4,5,6,7];function ZT(n,t,e,{cols:i,rows:s,pierAt:r,lit:o,cap:a}){const l=nl/i,c=Uu/s,u=l*WT,f=c*XT,h=l-2*u,d=c-2*f;for(let g=0;g<i;g++){const x=e+g*l;if(g===r){n.fillStyle=jd,n.fillRect(x,0,l,Uu);continue}for(let m=0;m<s;m++){const p=m*c;if(m<a||m>=s-a){n.fillStyle=jd,n.fillRect(x,p,l,c);continue}if(Iu()>o){n.fillStyle="rgba(0,0,0,0.22)",n.fillRect(x+u,p+f,h,d);continue}const S=Qd[Math.floor(Iu()*Qd.length)];n.fillStyle=S,n.fillRect(x+u,p+f,h,d),t.fillStyle=S,t.fillRect(x+u,p+f,h,d)}}n.fillStyle="rgba(0,0,0,0.45)";for(let g=0;g<s;g++)n.fillRect(e,g*c,nl,2)}function JT(){const n=nl*mc.length,t=Uu,e=()=>{const l=document.createElement("canvas");return l.width=n,l.height=t,[l,l.getContext("2d")]},[i,s]=e(),[r,o]=e();s.fillStyle=kT,s.fillRect(0,0,n,t),o.fillStyle="#000",o.fillRect(0,0,n,t),mc.forEach((l,c)=>ZT(s,o,c*nl,l));const a=l=>Object.assign(new Xe(l),{colorSpace:xe,anisotropy:8});return{map:a(i),emissiveMap:a(r),panelCount:mc.length}}function jT(n,t){n.customProgramCacheKey=()=>"blocks-atlas-uv",n.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <uv_pars_vertex>",`#include <uv_pars_vertex>
attribute vec2 aUvOffset;`).replace("#include <uv_vertex>",`#include <uv_vertex>
#ifdef USE_MAP
  vMapUv = vMapUv / ${t.toFixed(1)} + aUvOffset;
#endif
#ifdef USE_EMISSIVEMAP
  vEmissiveMapUv = vEmissiveMapUv / ${t.toFixed(1)} + aUvOffset;
#endif`)}}function QT(){const n=new Ae,t=MT(),e=new It(1,1,1);e.translate(0,.5,0);const{map:i,emissiveMap:s,panelCount:r}=JT(),o=new Xt({map:i,emissiveMap:s,emissive:16777215,emissiveIntensity:.4});jT(o,r);const a=new s0(e,o,t.length),l=new Float32Array(t.length*2),c=new Pe;return t.forEach((u,f)=>{c.position.set(u.x,0,u.z),c.rotation.set(0,u.ry,0),c.scale.set(u.w,u.h,u.d),c.updateMatrix(),a.setMatrixAt(f,c.matrix);const h=u.kind==="tower"?KT:$T,d=h[Math.floor(Iu()*h.length)];l[f*2]=d/r}),a.instanceMatrix.needsUpdate=!0,e.setAttribute("aUvOffset",new wu(l,2)),n.add(a),n}const ws="'Shippori Mincho', serif",tw=4,ew=1/3.5,nw=n=>typeof n=="number"?"#"+n.toString(16).padStart(6,"0"):n;function iw(n){let t=0;for(let e=0;e<n.length;e++)t=t*31+n.charCodeAt(e)>>>0;return t||1}function tp(n,t,e,i){let s=i;for(n.font=`bold ${s}px ${ws}`;s>6&&n.measureText(t).width>e;)s-=2,n.font=`bold ${s}px ${ws}`;return s}function ep(n,t,e,i){let s=i;for(n.font=`bold ${s}px ${ws}`;s>6&&(s*t.length*1.05>i||t.some(r=>n.measureText(r).width>e));)s-=2,n.font=`bold ${s}px ${ws}`;return s}function If(n,t,e,i,s,r){const o=e*.12;if(r==="vertical"){const u=Array.from(i),f=s?Array.from(s):[],h=f.length>0,d=(h?t*.55:t*.7)-o,g=e-o*2,x=ep(n,u,d,g),m=x*1.05;let p=e/2-m*u.length/2+m/2;const S=h?t*.66:t/2,T=u.map(M=>{const w={text:M,x:S,y:p,size:x};return p+=m,w});if(h){const M=ep(n,f,d*.6,g*.8),w=M*1.05;let b=e/2-w*f.length/2+w/2;for(const R of f)T.push({text:R,x:t*.28,y:b,size:M}),b+=w}return T}const a=t-o*2,l=tp(n,i,a,s?e*.55:e*.7),c=[{text:i,x:t/2,y:s?e*.4:e/2,size:l}];if(s){const u=tp(n,s,a,e*.22);c.push({text:s,x:t/2,y:e*.74,size:u})}return c}function sw(n,{text:t,x:e,y:i,size:s},r){n.font=`bold ${s}px ${ws}`,n.textAlign="center",n.textBaseline="middle",n.lineJoin="round",n.fillStyle=r,n.shadowColor=r,n.shadowBlur=s*.75,n.fillText(t,e,i),n.fillText(t,e,i),n.shadowBlur=s*.3,n.fillText(t,e,i),n.shadowBlur=s*.1,n.shadowColor="#fff",n.strokeStyle="#fff",n.lineWidth=s*.07,n.strokeText(t,e,i),n.shadowBlur=0,n.shadowColor="transparent"}function w0(n,t,e,i,s,r,o){n.fillStyle="#0a0a0d",n.fillRect(0,0,t,e);const a=e*.08;n.strokeStyle=o,n.lineWidth=Math.max(2,e*.015),n.strokeRect(a,a,t-a*2,e-a*2);const l=If(n,t,e,i,s,r);for(const c of l)sw(n,c,o)}function rw(n,t,e,i,s,r,o){n.fillStyle=o,n.fillRect(0,0,t,e);const a=If(n,t,e,i,s,r);n.fillStyle="#000",n.textAlign="center",n.textBaseline="middle";for(const l of a)n.font=`bold ${l.size}px ${ws}`,n.fillText(l.text,l.x,l.y)}function ow(n){const t=parseInt(n.slice(1),16),e=t>>16&255,i=t>>8&255,s=t&255,r=(e+i+s)/3,o=a=>Math.round(a*.3+r*.3+30);return`rgb(${o(e)},${o(i)},${o(s)})`}function aw(n,t,e,i,s,r,o){n.fillStyle=ow(o),n.fillRect(0,0,t,e);let a=iw(i);const l=()=>(a=(a*1664525+1013904223)%4294967296)/4294967296;n.strokeStyle="rgba(0,0,0,0.15)";for(let u=0;u<40;u++){n.lineWidth=l()*1.5;const f=l()*t,h=l()*e;n.beginPath(),n.moveTo(f,h),n.lineTo(f+(l()-.5)*30,h+(l()-.5)*30),n.stroke()}n.fillStyle="rgba(255,255,255,0.06)";for(let u=0;u<300;u++)n.fillRect(l()*t,l()*e,1,1);const c=If(n,t,e,i,s,r);n.textAlign="center",n.textBaseline="middle",n.fillStyle="#e8ded0",n.strokeStyle="rgba(0,0,0,0.4)";for(const u of c)n.font=`bold ${u.size}px ${ws}`,n.lineWidth=u.size*.06,n.strokeText(u.text,u.x,u.y),n.fillText(u.text,u.x,u.y)}const lw={neon:w0,lightbox:rw,painted:aw};function Oi(n){const{text:t,sub:e="",style:i="neon",orientation:s="horizontal",color:r="#FF2D55",px:o=256}=n,a=nw(r),l=s==="vertical"?ew:tw,c=o,u=Math.round(c*l),f=document.createElement("canvas");f.width=u,f.height=c;const h=f.getContext("2d");return(lw[i]??w0)(h,u,c,t,e,s,a),{map:Object.assign(new Xe(f),{colorSpace:xe,anisotropy:8}),aspect:u/c}}const rr=Rr.w,or=Rr.d,cw=Rr.h,Pi=Rr.viaductY,Nu=.8,ar=Pi-Nu,fo=22,uw=3.2,fw=.18,np=.14,il=42,Fu=1.5,A0=cw,gc=A0-Fu,hw=fo/2-.8,dw=12,ip=2*(Ve+dw),Pr=n=>"#"+n.toString(16).padStart(6,"0");function R0(n){let t=n;return()=>(t=(t*1664525+1013904223)%4294967296)/4294967296}function As(n,{x:t=0,y:e=0,z:i=0,ry:s=0}){const r=new se().compose(new O(t,e,i),new Gn().setFromEuler(new Vn(0,s,0)),new O(1,1,1));return n.applyMatrix4(r)}function Dr(n,t){return new St(zi(n),t)}function pw(n,t){const i=Math.round(n*8),s=Math.round(t*8),r=()=>{const g=document.createElement("canvas");return g.width=i,g.height=s,[g,g.getContext("2d")]},[o,a]=r(),[l,c]=r();a.fillStyle="#404857",a.fillRect(0,0,i,s),c.fillStyle="#000",c.fillRect(0,0,i,s);const u=R0(20260731),f=2.6*8,h=Math.round(i/f);for(let g=0;g<h;g++){const x=g*f;if(g%3===0){a.fillStyle=Pr(Cr),a.fillRect(x,0,f*.35,s);continue}const m=s*.18,p=s*.64;if(u()>.55){a.fillStyle="rgba(0,0,0,0.22)",a.fillRect(x+f*.15,m,f*.7,p);continue}const S=u()>.3?Pr(ke):"#a8cfe8";a.fillStyle=S,a.fillRect(x+f*.15,m,f*.7,p),c.fillStyle=S,c.fillRect(x+f*.15,m,f*.7,p)}const d=g=>Object.assign(new Xe(g),{colorSpace:xe,anisotropy:8});return{map:d(o),emissiveMap:d(l)}}function mw(n,t){const i=Math.round(n*12),s=Math.round(t*12),r=()=>{const d=document.createElement("canvas");return d.width=i,d.height=s,[d,d.getContext("2d")]},[o,a]=r(),[l,c]=r();a.fillStyle="#1a2230",a.fillRect(0,0,i,s),c.fillStyle="#000",c.fillRect(0,0,i,s);const u=d=>(d+n/2)/n*i;a.strokeStyle="rgba(0,0,0,0.55)",a.lineWidth=1.5;for(let d=-n/2;d<=n/2;d+=1.2)a.beginPath(),a.moveTo(u(d),0),a.lineTo(u(d),s),a.stroke();a.strokeStyle="rgba(255,255,255,0.05)";for(let d=-n/2+.6;d<=n/2;d+=1.2)a.beginPath(),a.moveTo(u(d),0),a.lineTo(u(d),s),a.stroke();const f=2;for(const d of[-6.4,0,6.4]){const g=u(d-f/2),x=u(d+f/2);for(const[m,p]of[[a,Pr(ke)],[c,Pr(ke)]]){m.fillStyle=p;for(let S=0;S<s;S+=36)m.fillRect(g,S+12*.35,x-g,36-12*.7)}}a.fillStyle="rgba(0,0,0,0.4)";for(let d=0;d<=t;d+=8)a.fillRect(0,d/t*s,i,2);const h=d=>Object.assign(new Xe(d),{colorSpace:xe,anisotropy:8});return{map:h(o),emissiveMap:h(l)}}function gw(n){const e=Math.round(n*6),i=document.createElement("canvas");i.width=e,i.height=e;const s=i.getContext("2d");s.fillStyle="#252b36",s.fillRect(0,0,e,e),s.strokeStyle="rgba(255,255,255,0.035)",s.lineWidth=1;for(let o=0;o<e;o+=18)s.beginPath(),s.moveTo(0,o),s.lineTo(e,o),s.stroke();const r=R0(20260801);for(let o=0;o<26;o++){const a=(2+r()*4)*6,l=(2+r()*3)*6,c=r()*(e-a),u=r()*(e-l);s.fillStyle="rgba(0,0,0,0.45)",s.fillRect(c+3,u+3,a,l),s.fillStyle=r()>.7?"#3a4150":"#2e3441",s.fillRect(c,u,a,l),s.strokeStyle="rgba(255,255,255,0.08)",s.strokeRect(c+.5,u+.5,a-1,l-1)}return s.strokeStyle="#2a2f3a",s.lineWidth=6*.8,s.strokeRect(6*.4,6*.4,e-6*.8,e-6*.8),Object.assign(new Xe(i),{colorSpace:xe,anisotropy:8})}function _w(){const n=[];for(const t of[-6.4,0,6.4])n.push(As(new It(2,.12,il-4),{x:t,y:Pi+.9,z:0}));return Dr(n,new le({color:ke}))}function sp(n,t,e,i,s){const r=rr/2,o=or/2,a=(n==="z"?o:r)-s;return n==="z"?{w:e,h:i,x:0,y:i/2,z:t*a,ry:0}:{w:e,h:i,x:t*a,y:i/2,z:0,ry:Math.PI/2}}const xw=[["z",1,12,5.5],["z",-1,7,4.5],["x",1,7,4.5],["x",-1,7,4.5]],_c=1,vw=.2;function Mw(){const n=[],t=[];for(const[s,r,o,a]of xw){const l=sp(s,r,o,a,_c/2);n.push(As(new It(l.w,l.h,_c),l));const c=sp(s,r,o*.7,a*.7,_c+.3);t.push(As(new It(c.w,c.h,vw),c))}const e=new Xt({color:1316381}),i=new le({color:ke});return[Dr(n,e),Dr(t,i)]}function Sw(){return[[0,or/2+3,4],[0,-24.5,3],[rr/2+2.5,0,3],[-24.5,0,3]].map(([n,t,e])=>{const i=Lf({color:hi,radius:e,intensity:.5});return i.position.set(n,.03,t),i})}function yw(){const n=new Ut(1842983),t=new Xt({color:n,emissive:n,emissiveIntensity:.35}),e=new St(new It(fo,Nu,ip),t);e.position.set(0,Pi-Nu/2,0);const i=new Xt({color:Cr,emissive:Cr,emissiveIntensity:.15}),r=Array.from({length:Rr.trackCount},(a,l)=>(l-(Rr.trackCount-1)/2)*uw).map(a=>As(new It(fw,np,ip),{x:a,y:Pi+np/2})),o=Dr(r,i);return{deck:e,rails:o}}function bw(){const n=[-19,-8,8,19],t=[0,2].flatMap(r=>n.map(o=>dn(r)+o)),e=r=>To.every(o=>Math.abs(r-o)>Ar/2);for(const r of t)if(!e(r))throw new Error(`station pier at z=${r} lands inside a street`);const i=new Xt({color:1842983}),s=t.map(r=>As(new It(1.2,ar,1.2),{x:0,y:ar/2,z:r}));return Dr(s,i)}function Ew(){const n=mw(fo+2,il),t=new Xt({map:n.map,emissiveMap:n.emissiveMap,emissive:16777215,emissiveIntensity:.55}),e=new St(new It(fo+2,Fu,il),t);e.position.set(0,A0-Fu/2,0);const i=new Xt({color:2237741}),s=[-16,-8,0,8,16],r=[];for(const o of s){for(const a of[-1,1])r.push(As(new It(.5,gc-Pi,.5),{x:a*hw,y:(Pi+gc)/2,z:o}));r.push(As(new It(fo+2,.4,.6),{x:0,y:gc,z:o}))}return{roof:e,structure:Dr(r,i)}}function Tw(){const n=new Ae,t=pw(rr,ar),e=new Xt({map:t.map,emissiveMap:t.emissiveMap,emissive:16777215,emissiveIntensity:.6}),i=new St(new It(rr,ar,or),e);i.position.set(0,ar/2,0),n.add(i);const s=new St(new Ee(rr,or),new Xt({map:gw(rr)}));s.rotation.x=-Math.PI/2,s.position.y=ar+.02,n.add(s);const[r,o]=Mw();n.add(r,o),n.add(...Sw());const{deck:a,rails:l}=yw();n.add(a,l),n.add(bw());const{roof:c,structure:u}=Ew();n.add(c,u),n.add(_w());const f=Oi({text:"新宿駅",style:"lightbox",orientation:"horizontal",color:Pr(fi),px:512}),h=new le({map:f.map}),d=10,g=new St(new Ee(d,d/f.aspect),h);g.position.set(0,7,or/2+.35),n.add(g);const x=Oi({text:"1-6",sub:"のりば",style:"neon",orientation:"horizontal",color:Pr(hi),px:256}),m=new le({map:x.map}),p=6,S=new St(new Ee(p,p/x.aspect),m);S.position.set(0,Pi+2.2,il/2+.1),n.add(S);const T=2.6,M=new Pe;return M.position.set(-14,Pi+.3-T,or/2+.3),n.add(M),{group:n,boardAnchor:M,trackY:Pi}}const rp=48.6,ww=40,C0=40.8,Ou=6.6;let op=20260729;const lr=()=>(op=(op*1664525+1013904223)%4294967296)/4294967296,Aw="#232a3d",Rw="#4a5166",Cw="#333b50";function Pw(n,t,{lit:e=.6,pxCol:i=24,pxRow:s=14}={}){const r=n*i,o=t*s,a=()=>{const x=document.createElement("canvas");return x.width=r,x.height=o,[x,x.getContext("2d")]},[l,c]=a(),[u,f]=a();c.fillStyle=Aw,c.fillRect(0,0,r,o),f.fillStyle="#000",f.fillRect(0,0,r,o),c.fillStyle=Cw;for(let x=0;x<t;x++)c.fillRect(0,x*s,r,2);const h=Array.from({length:t},()=>lr()<e);for(let x=0;x<n;x++){const m=x*i;for(let p=0;p<t;p++){const S=p*s;if(!(h[p]?lr()<.8:lr()<.1))continue;const T=lr(),M=T>.92?"#a8cfe8":T>.3?"#e8c88a":"#f2e3c4";c.fillStyle=M,c.fillRect(m+3,S+2,i-6,s-5),f.fillStyle=M,f.fillRect(m+3,S+2,i-6,s-5)}}const d=Math.max(3,Math.round(i*.45));for(let x=0;x<=n;x++){if(x%3!==0&&x!==n)continue;const m=Math.min(Math.max(x*i-d/2,0),r-d);c.fillStyle=Rw,c.fillRect(m,0,d,o),c.fillStyle="rgba(0,0,0,0.3)",c.fillRect(m+d-2,0,2,o)}const g=x=>Object.assign(new Xe(x),{colorSpace:xe,anisotropy:8});return{map:g(l),emissiveMap:g(u)}}function Dw(n){const i=C0*n,s=Math.PI*(Ou+Ou*.68)*n,r=Math.round(3*(1024/i)),o=Math.round(3*(512/s)),a=document.createElement("canvas");a.width=512,a.height=1024;const l=a.getContext("2d"),c=document.createElement("canvas");c.width=512,c.height=1024;const u=c.getContext("2d");l.fillStyle="#161c28",l.fillRect(0,0,512,1024),u.fillStyle="#000",u.fillRect(0,0,512,1024);for(let h=0;h<1024;h+=r)for(let d=0;d<512;d+=r){if(lr()>.34)continue;const g=lr()>.5?"#cfe6f5":"#e8d4a8",x=r*.15;l.fillStyle=g,l.fillRect(d+x,h+x,r-x*2,r-x*2),u.fillStyle=g,u.fillRect(d+x,h+x,r-x*2,r-x*2)}for(const h of[1,-1])for(let d=-1024;d<1536;d+=o)for(const[g,x,m]of[[l,"#dfe6f0",5],[u,"#41505f",5]])g.strokeStyle=x,g.lineWidth=m,g.beginPath(),g.moveTo(d,0),g.lineTo(d+h*1024,1024),g.stroke();const f=h=>Object.assign(new Xe(h),{colorSpace:xe,anisotropy:8});return{map:f(a),emissiveMap:f(c)}}const Lw=1.9,Iw=4;function xa(n,t,e,i,s={}){const{map:r,emissiveMap:o}=Pw(Math.max(3,Math.round(n*e/Lw)),Math.max(3,Math.round(t*i/Iw)),s);return new Xt({map:r,emissiveMap:o,emissive:16777215,emissiveIntensity:.5})}function Uw(){const e=document.createElement("canvas");e.width=96,e.height=32;const i=e.getContext("2d");i.fillStyle="#f0d49a",i.fillRect(0,0,96,32),i.fillStyle="#4a4030",i.fillRect(0,0,96,3),i.fillRect(0,28,96,4),i.fillStyle="rgba(74,64,48,0.55)";for(let s=6;s<96;s+=12)i.fillRect(s,3,2,25);return i.fillStyle="#8a6c44",i.beginPath(),i.arc(96/2,32/2,7,0,Math.PI*2),i.fill(),Object.assign(new Xe(e),{colorSpace:xe,anisotropy:8})}function Mi(n,{x:t=0,y:e=0,z:i=0}={}){return n.applyMatrix4(new se().makeTranslation(t,e,i))}function ir(n,t){return new St(zi(n),t)}function Nw(n,t){const e=new Ae,i=1/5,s=33*i,r=169*i,o=243*i,a=2.592,l=5.184,c=3.5-a,u=4.4-l,f=new St(new It(38,s,34),xa(38,s,n,t,{lit:.7}));f.position.set(c,s/2,u),e.add(f);const h=r-s,d=new St(new It(15,h,15),xa(15,h,n,t));d.position.set(c,s+h/2,u),e.add(d);const g=new Xt({color:4870502}),x=[],m=h+1;for(const[J,at]of[[1,1],[1,-1],[-1,1],[-1,-1]])x.push(Mi(new It(2.6,m,2.6),{x:c+J*6.3,y:s+m/2,z:u+at*6.3}));const p=6.5,S=8,T=4.25,M=o-r,w=xa(p,M,n,t),b=[-1,1].map(J=>Mi(new It(p,M,S),{x:c+J*T,y:r+M/2,z:u}));e.add(ir(b,w));const R=2.6,v=.8,A=new le({map:Uw()}),I=[-1,1].map(J=>Mi(new It(p+v,R,S+v),{x:c+J*(T+v/2),y:o-R/2,z:u}));e.add(ir(I,A));for(const J of[-1,1])x.push(Mi(new It(p-1.5,1.6,S-1.6),{x:c+J*T,y:o+.6,z:u}));x.push(Mi(new It(15.4,1.6,S+.4),{x:c,y:r+.8,z:u})),e.add(ir(x,g));const D=new Xt({color:8029076}),N=[-1,1].map(J=>Mi(new Fi(.12,.2,6,6),{x:c+J*T,y:o+1.6+3,z:u}));e.add(ir(N,D));const q=new le({color:16722731}),Z=[];for(const J of[-1,1]){Z.push(Mi(new Eo(.34,6,4),{x:c+J*T,y:o+1.6+6.2,z:u}));for(const at of[-1,1])Z.push(Mi(new Eo(.3,6,4),{x:c+J*(T+p/2),y:o,z:u+at*(S/2)}))}e.add(ir(Z,q));const G=163*i,B=new St(new It(12,G,10),xa(12,G,n,t));B.position.set(-23.33-a,G/2,-7.78-l),e.add(B);const U=41*i,k=new St(new Fi(7,7,U,16,1,!1,-Math.PI/4,Math.PI),new Xt({color:5660528}));return k.position.set(15.55-a,U/2,29.89-l),e.add(k),e}function Fw(n){const t=new Ae,e=204/5,i=Ou,s=[[.52,0],[.74,.08],[.92,.22],[1,.42],[.97,.6],[.86,.78],[.62,.93],[.3,1]].map(([c,u])=>new Ot(c*i,u*e)),{map:r,emissiveMap:o}=Dw(n),a=new St(new Cf(s,28),new Xt({map:r,emissiveMap:o,emissive:16777215,emissiveIntensity:.42}));a.scale.z=.68,t.add(a);const l=new St(new It(13,2.4,10),new Xt({color:2764602}));return l.position.y=1.2,t.add(l),t}const Ow=.02,P0=[[.7,.71],[.98,.71],[.68,.83],[.7,.95],[.98,.95],[.84,.99]];function Bw(n,t){const i=Math.round(n*11),s=Math.round(t*11),r=document.createElement("canvas");r.width=i,r.height=s;const o=r.getContext("2d"),a=document.createElement("canvas");a.width=i,a.height=s;const l=a.getContext("2d");l.fillStyle="#000",l.fillRect(0,0,i,s),o.fillStyle="#3a4152",o.fillRect(0,0,i,s),o.fillStyle="#4a5266";for(let u=0;u<i;u+=44)o.fillRect(u,0,1,s);for(let u=0;u<s;u+=44)o.fillRect(0,u,i,1);o.fillStyle="#2d4a3a",o.fillRect(.66*i,.94*s,.34*i,.06*s),o.fillRect(.955*i,.66*s,.045*i,.34*s),o.fillStyle="#1b2540",o.strokeStyle="#69749a",o.lineWidth=1;for(const[u,f,h,d]of[[.69,.735,.1,.045],[.69,.885,.1,.045]])o.fillRect(u*i,f*s,h*i,d*s),o.strokeRect(u*i,f*s,h*i,d*s);for(const[u,f]of P0){const h=u*i,d=f*s,g=3.2*11;for(const[x,m]of[[o,.34],[l,.5]]){const p=x.createRadialGradient(h,d,0,h,d,g);p.addColorStop(0,`rgba(242,227,196,${m})`),p.addColorStop(1,"rgba(242,227,196,0)"),x.fillStyle=p,x.fillRect(h-g,d-g,g*2,g*2)}}const c=u=>Object.assign(new Xe(u),{colorSpace:xe,anisotropy:8});return{map:c(r),emissiveMap:c(a)}}function zw(n){const t=dn(n.cell[1]),e=dn(n.cell[0]),i=yn/2,s=Df/2,r=n.lots.map(d=>{const g=Ur(n.cell,d);return{x0:Math.max(g.x-s,t-i),x1:Math.min(g.x+s,t+i),z0:Math.max(g.z-s,e-i),z1:Math.min(g.z+s,e+i)}}),o={x0:Math.min(...r.map(d=>d.x0)),x1:Math.max(...r.map(d=>d.x1)),z0:Math.min(...r.map(d=>d.z0)),z1:Math.max(...r.map(d=>d.z1))},a=o.x1-o.x0,l=o.z1-o.z0,c=r.map(d=>{const g=new Ee(d.x1-d.x0,d.z1-d.z0);g.rotateX(-Math.PI/2),g.translate((d.x0+d.x1)/2,0,(d.z0+d.z1)/2);const x=g.attributes.uv,m=g.attributes.position;for(let p=0;p<x.count;p++)x.setXY(p,(m.getX(p)-o.x0)/a,(m.getZ(p)-o.z0)/l);return g}),{map:u,emissiveMap:f}=Bw(a,l),h=new St(zi(c),new Xt({map:u,emissiveMap:f,emissive:16777215,emissiveIntensity:.5,transparent:!0}));return h.position.y=Ow,h}function Hw(n){const t=dn(n.cell[1]),e=dn(n.cell[0]),i=yn/2,s=Df/2,r=n.lots.map(f=>Ur(n.cell,f)),o=Math.max(Math.min(...r.map(f=>f.x))-s,t-i),a=Math.min(Math.max(...r.map(f=>f.x))+s,t+i),l=Math.max(Math.min(...r.map(f=>f.z))-s,e-i),c=Math.min(Math.max(...r.map(f=>f.z))+s,e+i),u=P0.map(([f,h])=>Mi(new It(.5,4.5,.5),{x:o+f*(a-o),y:2.25,z:l+h*(c-l)}));return ir(u,new le({color:ke}))}function Gw(){const n=new Ae,t=Lu.find(u=>u.id==="tocho"),e=ww/rp,i=t.h/rp,s=Nw(e,i);s.scale.set(e,i,e),n.add(zw(t)),n.add(Hw(t));const r=Bd(t.cell,t.lots);s.position.set(r.x,0,r.z),n.add(s);const o=Lu.find(u=>u.id==="cocoon"),a=o.h/C0,l=Fw(a);l.scale.setScalar(a);const c=Bd(o.cell,o.lots);return l.position.set(c.x,0,c.z),n.add(l),n}const Vw=1577999,kw=7041664,Ww=13289402,sl=new Xt({color:Vw});new Xt({color:kw});const D0=new Xt({color:Ww});new Xt({color:Cr});function L0({color:n=kn,width:t=1.2}={}){const i=new Ae,s=new St(new Fi(.015,.015,t*1.05,6),sl);s.rotation.z=Math.PI/2,s.position.y=.5,i.add(s);const r=3,o=.025,a=(t-o*(r-1))/r,l=new Xt({color:n,side:Oe});for(let c=0;c<r;c++){const u=new St(new It(a,.5,.02),l);u.position.set(-t/2+a/2+c*(a+o),.5/2,0),i.add(u)}return i}function I0({color:n=fi}={}){const s=new Ae,r=new St(new It(1.1,1.9,.75),D0);r.position.y=1.9/2,s.add(r);const o=new St(new It(1.1*.86,1.9*.68,.02),new le({color:new Ut(n).lerp(new Ut(16777215),.25)}));o.position.set(0,1.9*.56,.75/2+.011),s.add(o);const a=new St(new It(1.1*.94,1.9*.09,.02),new le({color:new Ut(kn).lerp(new Ut(16777215),.15)}));a.position.set(0,1.9*.92,.75/2+.011),s.add(a);const l=new St(new It(1.1*.86,1.9*.12,.03),sl);return l.position.set(0,1.9*.16,.75/2+.015),s.add(l),s}function U0(){const i=new Ae,s=new St(new It(.8,.6,.3),D0);s.position.y=.6/2,i.add(s);const r=5;for(let a=0;a<r;a++){const l=new St(new It(.7040000000000001,.02,.02),sl);l.position.set(0,.6*.18+a*(.6*.5/r),.3/2+.005),i.add(l)}const o=new St(new Fi(.6*.28,.6*.28,.03,8),sl);return o.rotation.x=Math.PI/2,o.position.set(0,.6*.72,.3/2+.01),i.add(o),i}const Bu=4,cr=5,Xw=4.4,xn=-1.5,ap=6,Yw=9,lp=4,cp=6,qw=2,$w=cr+.7,Kw=xn-cr/2+.35,Zw=$w+qw,N0=.42,zu=.65,xc=3,ur=["#FF2D55","#FFB347","#00E5FF","#FF6FA8","#7CE7C4"],up=["居酒屋","焼鳥","ラーメン","バー","喫茶","小料理","酒場","おでん","寿司"],F0=4;let fp=20260731;const hp=()=>(fp=(fp*1664525+1013904223)%4294967296)/4294967296;function wn(n,{x:t=0,y:e=0,z:i=0}={}){return n.applyMatrix4(new se().makeTranslation(t,e,i))}function ms(n,t){return new St(zi(n),t)}function va(n,t){const e=n.attributes.position.count,i=new Float32Array(e*3);for(let s=0;s<e;s++)i.set([t.r,t.g,t.b],s*3);return n.setAttribute("color",new ln(i,3)),n}function dp(n,t,e,i,s,r,o,a){const l=new Ee(t,e);l.translate(i,s,xn+.02),n[r].push(wn(l,{x:o,z:a}));const c=new It(t+.1,e+.1,.05);c.translate(i,s,xn-.01),n.dark.push(wn(c,{x:o,z:a}));const u=new It(.045,e,.03);u.translate(i,s,xn+.035),n.dark.push(wn(u,{x:o,z:a}));const f=new It(t,.045,.03);f.translate(i,s,xn+.035),n.dark.push(wn(f,{x:o,z:a}))}function Jw(n,t,e,i,s){const r=ap+hp()*(Yw-ap),o=.09+hp()*.07,a=new Ut(o,o*.95,o*1.15),l=new It(Bu-.12,r,cr);l.translate(0,r/2,xn-cr/2),i.body.push(va(wn(l,{x:t,z:e}),a));const c=new It(Bu,.18,cr+.7);c.translate(0,r+.09,xn-cr/2+.35),i.dark.push(wn(c,{x:t,z:e}));const u=new It(1.7,2.1,.5);u.translate(-.55,1.05,xn-.24),i.warm.push(wn(u,{x:t,z:e}));const f=L0({color:ur[n%ur.length],width:1.6});f.position.set(-.55,1.58,xn+.04),f.updateMatrix();for(const p of f.children){p.updateMatrix();const S=p.geometry.clone().applyMatrix4(p.matrix).applyMatrix4(f.matrix);p.material.side===Oe?i.noren.push(va(wn(S,{x:t,z:e}),p.material.color)):i.dark.push(wn(S,{x:t,z:e}))}dp(i,1.15,.95,1.05,1.35,"warm",t,e),dp(i,1.3,.9,-.4,r-1.5,n%3===1?"dark":"warm",t,e);const h=new Ut(n%3===0?hi:kn).lerp(new Ut(16777215),.25).multiplyScalar(1.35),d=new Ee(N0,zu);d.translate(-1.65,1.85+zu/2,xn+.42),i.lantern.push(va(wn(d,{x:t,z:e}),h));const g=new Ut(ur[n%ur.length]).lerp(new Ut(ke),.4).multiplyScalar(.95),x=new Ee(xc*2,xc*2);x.rotateX(-Math.PI/2),x.translate(-.55,.05,xn+xc*.45),i.pool.push(va(wn(x,{x:t,z:e}),g));const m=U0();m.position.set(1.35,r-2.4,xn+.02),m.updateMatrix();for(const p of m.children){p.updateMatrix();const S=p.geometry.clone().applyMatrix4(p.matrix).applyMatrix4(m.matrix);(p.material===s?i.plastic:i.dark).push(wn(S,{x:t,z:e}))}return r}function jw(){const n=[];for(let t=0;t<F0;t++){const e=Oi({text:up[t%up.length],style:t%2?"neon":"lightbox",orientation:"vertical",color:ur[(t+2)%ur.length],px:256}),i=new le({map:e.map,side:Oe});i.color.setScalar(1),n.push({mat:i,aspect:e.aspect})}return n}function Qw(){const t=Math.round(160*(N0/zu)),e=document.createElement("canvas");e.width=t,e.height=160;const i=e.getContext("2d"),s=[[.22,0],[.75,.08],[1,.3],[1.05,.55],[.95,.78],[.6,.94],[.22,1]],r=160*.08,o=r,a=160-r*2,l=t/2,c=t/2-1,u=(d,g)=>[l+d*c,o+g*a],f=()=>{i.beginPath(),s.forEach(([d,g],x)=>{const[m,p]=u(d,g);x===0?i.moveTo(m,p):i.lineTo(m,p)});for(let d=s.length-2;d>=0;d--){const[g,x]=u(-s[d][0],s[d][1]);i.lineTo(g,x)}i.closePath()};i.save(),f(),i.clip();const h=i.createLinearGradient(0,o,0,o+a);h.addColorStop(0,"#8a8a8a"),h.addColorStop(.45,"#ffffff"),h.addColorStop(1,"#8a8a8a"),i.fillStyle=h,i.fillRect(0,0,t,160),i.strokeStyle="rgba(15,10,8,0.55)",i.lineWidth=160*.02;for(const[,d]of s.slice(1,-1)){const g=o+d*a;i.beginPath(),i.moveTo(0,g),i.lineTo(t,g),i.stroke()}return i.restore(),i.fillStyle="#14100c",i.fillRect(l-t*.11,0,t*.22,r),i.fillRect(l-t*.14,160-r,t*.28,r),Object.assign(new Xe(e),{colorSpace:xe})}function tA(){const n={dark:[],warm:[],plastic:[],body:[],lantern:[],noren:[],pool:[]},e=U0().children[0].material,i=jw(),s=3.2,r=new Ee(s*i[0].aspect,s),o=i.map(()=>[]);let a=0;for(let d=0;d<lp;d++){const g=(d-(lp-1)/2)*Zw-Kw;for(let x=0;x<cp;x++,a++){const m=(x-(cp-1)/2)*Xw,p=Jw(a,m,g,n,e);o[a%F0].push({x:m,z:g,height:p})}}const l=new Ae;l.add(ms(n.dark,new Xt({color:2303794}))),l.add(ms(n.warm,new Xt({color:2760460,emissive:ke,emissiveIntensity:1.15}))),l.add(ms(n.plastic,new Xt({color:13289402}))),l.add(ms(n.body,new Xt({vertexColors:!0}))),l.add(ms(n.lantern,new le({map:Qw(),vertexColors:!0,side:Oe,alphaTest:.5}))),l.add(ms(n.noren,new Xt({vertexColors:!0,side:Oe}))),l.add(ms(n.pool,new le({map:T0(),vertexColors:!0,transparent:!0,blending:vo,depthWrite:!1})));const c=[],u=new Pe;i.forEach(({mat:d},g)=>{const x=o[g],m=new s0(r,d,x.length);x.forEach((p,S)=>{u.position.set(p.x+Bu/2-.3,p.height-1.05,p.z+xn+.6),u.rotation.set(0,-Math.PI/2,0),u.updateMatrix(),m.setMatrixAt(S,u.matrix)}),m.instanceMatrix.needsUpdate=!0,l.add(m),c.push(d)});const[f,h]=el;return l.position.set(dn(h),0,dn(f)),{group:l,signMats:c}}const Qs=7,tr=5.5,_n=0,Si=3.9,sr=.9,Hu=.2,pp=Si+sr+Hu,mp=-1.4,gp=1.5,eA=-2.9,nA=1053465,iA=2369326,sA=9075292,Ma=14676735,rA="#00E5FF",oA=new Xt({color:nA}),aA=new Xt({color:sA}),lA=new Xt({color:kn,side:Oe});function Gu(n,t,e){return new St(new Ee(n,t),e)}function fr(n,{x:t=0,y:e=0,z:i=0,ry:s=0,rz:r=0}={}){const o=new se().compose(new O(t,e,i),new Gn().setFromEuler(new Vn(0,s,r)),new O(1,1,1));return n.applyMatrix4(o)}function vc(n,t){return new St(zi(n),t)}function cA(n,t,e,i,s,r){const o=Gu(t,e,i);o.position.set(s,r,_n+.02),n.push(fr(new It(t+.08,e+.08,.05),{x:s,y:r,z:_n-.02}));for(const a of[-t/6,t/6])n.push(fr(new It(.05,e,.03),{x:s+a,y:r,z:_n+.04}));return o}function uA(){const n=new Ae,t=[],e=[],i=new St(new It(Qs,Si,tr),new Xt({color:iA}));i.position.set(0,Si/2,_n-tr/2),n.add(i),e.push(fr(new It(Qs,sr,.45),{x:0,y:Si+sr/2,z:_n-.05}));const s=new Ut(Ma).lerp(new Ut(16777215),.35),r=new le({color:s.clone()}),o=new St(new It(Qs*.92,.06,.05),r);o.position.set(0,Si+.06,_n+.18),n.add(o),t.push(fr(new It(Qs+.3,Hu,tr+.3),{x:0,y:Si+sr+Hu/2,z:_n-tr/2+.15}));const a=new Xt({color:Ma,emissive:Ma,emissiveIntensity:1.05,transparent:!0,opacity:.42,side:Oe}),l=4,c=Si-.25,u=cA(t,l,c,a,1.4,c/2+.1);n.add(u);const f=.3,h=.015,g=[[-.1,.6,1.6],[.9,.7,1.9],[1.9,.6,1.3],[2.9,.7,1.8]].map(([Yt,tt,mt])=>fr(new It(tt,mt,f),{x:Yt,y:mt/2,z:h-f/2}));n.add(vc(g,aA));const x=new Xt({color:1317154,emissive:Ma,emissiveIntensity:1}),m=new St(new It(gp,2.3,.5),x);m.position.set(mp,1.15,_n-.25),n.add(m);const p=L0({color:kn,width:gp*.92});p.position.set(mp,1.8,_n+.05),p.updateMatrix();for(const Yt of p.children){Yt.updateMatrix();const tt=Yt.geometry.clone().applyMatrix4(Yt.matrix).applyMatrix4(p.matrix);Yt.material.side===Oe?e.push(tt):t.push(tt)}const S=I0({color:fi}),T=eA,M=0,w=_n+.35,[b,R,v,A]=S.children,I=new St(b.geometry,b.material);I.position.set(T+b.position.x,M+b.position.y,w+b.position.z),n.add(I),t.push(fr(A.geometry.clone(),{x:T+A.position.x,y:M+A.position.y,z:w+A.position.z}));const D=new St(R.geometry,R.material);D.position.set(T+R.position.x,M+R.position.y,w+R.position.z),n.add(D);const N=new St(v.geometry,v.material);N.position.set(T+v.position.x,M+v.position.y,w+v.position.z),n.add(N);const q=[R.material,v.material],Z=q.map(Yt=>Yt.color.clone());n.add(vc(t,oA)),n.add(vc(e,lA));const G=Oi({text:"Profile",style:"lightbox",orientation:"horizontal",color:rA,px:256}),B=new le({map:G.map});B.color.setScalar(.57);const U=sr*.72,k=Gu(U*G.aspect,U,B);k.position.set(0,Si+sr/2,_n+.2),n.add(k);const J=Oi({text:"コンビニ",style:"neon",orientation:"vertical",color:"#FFB347",px:256}),at=new le({map:J.map,side:Oe});at.color.setScalar(.57);const gt=1.5,vt=Gu(gt*J.aspect,gt,at);vt.position.set(Qs/2-.25,Si-.95,_n+.6),vt.rotation.y=-Math.PI/2,n.add(vt);const ie=new St(new It(Qs+1.2,pp+1.2,tr+1.6),new le({transparent:!0,opacity:0,depthWrite:!1}));ie.position.set(0,(pp+1.2)/2,_n-tr/2+.5),n.add(ie);function ve(Yt){a.emissiveIntensity=Yt?1.65:1.05,r.color.copy(s).lerp(new Ut(16777215),Yt?.35:0),B.color.setScalar(Yt?1:.57),at.color.setScalar(Yt?1:.57),x.emissiveIntensity=Yt?1.5:1,q.forEach((tt,mt)=>{tt.color.copy(Z[mt]).lerp(new Ut(16777215),Yt?.35:0)})}return{group:n,hit:ie,setHover:ve}}const Vu=n=>"#"+n.toString(16).padStart(6,"0");function bs(n,{x:t=0,y:e=0,z:i=0,ry:s=0,rz:r=0}={}){const o=new se().compose(new O(t,e,i),new Gn().setFromEuler(new Vn(0,s,r)),new O(1,1,1));return n.applyMatrix4(o)}function ho(n,t){return new St(zi(n),t)}const _p=[fi,kn,hi],xp=1.1,Mc=1.9,Sa=.75,vp=.08;function fA(){const n=new Ae,t=new St(new Fi(.24,.27,.6,10),new Xt({color:2895670}));t.position.y=.3,n.add(t);const e=new St(new Fi(.26,.26,.05,10),new le({color:new Ut(fi).lerp(new Ut(16777215),.1)}));return e.position.y=.62,n.add(e),n}function hA(){const n=new St(new Rf(1,16),new le({color:new Ut(1778488).lerp(new Ut(ke),.3)}));return n.scale.set(1.4,1,1),n.rotation.x=-Math.PI/2,n.position.y=.015,n}function dA(){const n=new Ae,t=_p.length,e=t*xp+(t-1)*vp,i=.1,s=new St(new It(e+.3,i,Sa+.3),new Xt({color:Cr}));s.position.set(0,i/2,0),n.add(s);const r=[],o=[];let a,l,c;const u=[],f=[];_p.forEach((w,b)=>{const R=I0({color:w}),v=(b-(t-1)/2)*(xp+vp),A=i,I=0,[D,N,q,Z]=R.children;r.push(bs(D.geometry.clone(),{x:v+D.position.x,y:A+D.position.y,z:I+D.position.z})),a??(a=D.material),o.push(bs(Z.geometry.clone(),{x:v+Z.position.x,y:A+Z.position.y,z:I+Z.position.z})),l??(l=Z.material),u.push(bs(q.geometry.clone(),{x:v+q.position.x,y:A+q.position.y,z:I+q.position.z})),c??(c=q.material);const G=N.material,B=new St(N.geometry,G);B.position.set(v+N.position.x,A+N.position.y,I+N.position.z),n.add(B),f.push(G)});const h=f.map(w=>w.color.clone());n.add(ho(r,a)),n.add(ho(o,l)),n.add(ho(u,c)),f.push(c),h.push(c.color.clone());const d=Oi({text:"Résumé",sub:"PDF",style:"lightbox",orientation:"horizontal",color:Vu(ke),px:256}),g=new le({map:d.map});g.color.setScalar(.5);const x=1,m=new St(new Ee(x,x/d.aspect),g);m.position.set(0,i+Mc+.2,Sa/2-.02),n.add(m);const p=fA();p.position.set(e/2+.55,0,.1),n.add(p);const S=hA();S.position.set(0,0,Sa/2+.9),n.add(S);const T=new St(new It(e+1.6,i+Mc+.7,Sa+1.4),new le({transparent:!0,opacity:0,depthWrite:!1}));T.position.set(.3,(i+Mc+.7)/2,.1),n.add(T);function M(w){f.forEach((b,R)=>{b.color.copy(h[R]).lerp(new Ut(16777215),w?.45:0)}),g.color.setScalar(w?1:.5)}return{group:n,hit:T,setHover:M}}const Zr=4,no=4,Ki=5.5,vi=no/2;function Mp(n,t,e,i,s,r,o){const a=new St(new Ee(t,e),i);return a.position.set(s,r,o),n.push(bs(new It(t+.08,e+.08,.04),{x:s,y:r,z:o-.025})),a}function pA(){const n=new Ae,t=new St(new It(Zr,Ki,no),new Xt({color:Cr}));t.position.y=Ki/2,n.add(t);const e=new Xt({color:1316639}),i=[];i.push(bs(new It(Zr+.3,.2,no+.3),{x:0,y:Ki+.1,z:0})),i.push(bs(new It(Zr+.06,.12,no+.06),{x:0,y:Ki/2,z:0}));const s=1.3,r=2.3,o=new Xt({color:1708550,emissive:ke,emissiveIntensity:.55}),a=new St(new It(s,r,.4),o);a.position.set(0,r/2,vi-.18),n.add(a);const l=new Xt({color:1840136,emissive:ke,emissiveIntensity:.8});n.add(Mp(i,1.1,1,l,1.1,1.1,vi+.02));const c=new St(new It(.9,.12,.3),new Xt({color:2760725}));c.position.set(1.1,.75,vi-.32),n.add(c),n.add(Mp(i,.9,.8,new Xt({color:856087}),-.6,Ki-1.3,vi+.02));const u=new Xt({color:2829099}),f=new St(new Fi(.03,.03,.32,6),u);f.rotation.z=Math.PI/2,f.position.set(0,r+.55,vi+.1),n.add(f);const h=new Ut(kn).lerp(new Ut(16777215),.4),d=new le({color:h.clone()}),g=new St(new Eo(.22,12,10),d);g.position.set(0,r+.55,vi+.28),n.add(g);const x=Oi({text:"交番",style:"lightbox",orientation:"vertical",color:Vu(kn),px:256}),m=new le({map:x.map,side:Oe});m.color.setScalar(.61);const p=1.4,S=new St(new Ee(p*x.aspect,p),m);S.position.set(Zr/2-.2,Ki-1,vi+.5),S.rotation.y=-Math.PI/2,n.add(S);const T=Oi({text:"Contact",style:"lightbox",orientation:"horizontal",color:Vu(ke),px:256}),M=new le({map:T.map});M.color.setScalar(.62);const w=.7,b=new St(new Ee(w,w/T.aspect),M);b.position.set(-1.1,1.75,vi+.02),n.add(b);const R=new St(new It(.7,.55,.04),new Xt({color:3877404}));R.position.set(-1.1,.85,vi+.04),n.add(R);const v=new Xt({color:15920608}),A=[[-.12,.09,.12],[.1,-.03,-.1],[-.02,-.13,.05]].map(([N,q,Z])=>bs(new Ee(.2,.26),{x:R.position.x+N,y:R.position.y+q,z:R.position.z+.03,rz:Z}));n.add(ho(A,v)),n.add(ho(i,e));const I=new St(new It(Zr+1.2,Ki+1.2,no+1.4),new le({transparent:!0,opacity:0,depthWrite:!1}));I.position.set(0,(Ki+1.2)/2,.2),n.add(I);function D(N){o.emissiveIntensity=N?1:.55,l.emissiveIntensity=N?1.3:.8,d.color.copy(h).lerp(new Ut(16777215),N?.3:0),m.color.setScalar(N?1:.61),M.color.setScalar(N?1:.62)}return{group:n,hit:I,setHover:D}}const O0=n=>"#"+n.toString(16).padStart(6,"0");function Sp(n){let t=0;for(let e=0;e<n.length;e++)t=t*31+n.charCodeAt(e)>>>0;return t||1}const yp=[16723285,16757575,58879,16740264,8185796],bp={live:{sign:"neon",bright:1,halo:1},WIP:{sign:"lightbox",bright:.55,halo:.5},"coming-soon":{sign:"painted",bright:.25,halo:.12}},ya=14,mA=8.5,Sc=8.5;function gA(n){if(n.length<=12)return{text:n,sub:""};const t=n.length/2;let e=-1,i=1/0;for(let s=0;s<n.length;s++){if(n[s]!==" ")continue;const r=Math.abs(s-t);r<i&&(i=r,e=s)}return e<0?{text:n,sub:""}:{text:n.slice(0,e),sub:n.slice(e+1)}}function _A(n,t,e){let i=n;const s=()=>(i=(i*1664525+1013904223)%4294967296)/4294967296,r=4,o=7,a=30,l=34,c=r*a,u=o*l,f=()=>{const S=document.createElement("canvas");return S.width=c,S.height=u,[S,S.getContext("2d")]},[h,d]=f(),[g,x]=f();d.fillStyle="#454e5e",d.fillRect(0,0,c,u),x.fillStyle="#000",x.fillRect(0,0,c,u);const m=[ke,hi,fi,t];for(let S=0;S<r;S++){const T=S*a;if(S%4===0){d.fillStyle="#4d5566",d.fillRect(T,0,a,u);continue}for(let M=0;M<o;M++){const w=M*l;if(s()>.6*e){d.fillStyle="rgba(0,0,0,0.22)",d.fillRect(T+3,w+2,a-6,l-5);continue}const b=O0(m[Math.floor(s()*m.length)]);d.fillStyle=b,d.fillRect(T+3,w+2,a-6,l-5),x.fillStyle=b,x.fillRect(T+3,w+2,a-6,l-5)}}d.fillStyle="rgba(0,0,0,0.4)";for(let S=0;S<o;S++)d.fillRect(0,S*l,c,2);const p=S=>Object.assign(new Xe(S),{colorSpace:xe,anisotropy:8});return{map:p(h),emissiveMap:p(g)}}function xA(n,t){const e=new Ae,{x:i,z:s}=Ur(t.cell,t.lot);e.position.set(i,0,s);const r=t.h,o=yp[Sp(n.id)%yp.length],a=O0(o),l=bp[n.status]??bp.live,{map:c,emissiveMap:u}=_A(Sp(n.id),o,l.bright),f=1.1*l.bright,h=new Xt({map:c,emissiveMap:u,emissive:16777215,emissiveIntensity:f}),d=new St(new It(mA,r,Sc),h);d.position.y=r/2,e.add(d);const{text:g,sub:x}=gA(n.title),m=Oi({text:g,sub:x,style:l.sign,orientation:"horizontal",color:a,px:320}),p=new le({map:m.map}),S=ya/m.aspect,T=new St(new Ee(ya,S),p);T.position.set(0,r+.4+S/2,Sc/2+.06),e.add(T);const M=.5*l.halo,w=Lf({color:a,radius:ya*.65,intensity:M});w.position.y=.03,e.add(w);const b=r+S+2,R=new St(new It(ya+1,b,Sc+1),new le({transparent:!0,opacity:0,depthWrite:!1}));R.position.y=b/2,e.add(R);function v(A){p.color.setScalar(A?1.6:1),w.material.opacity=A?M*1.7:M,h.emissiveIntensity=A?f*1.4:f}return{group:e,hit:R,setHover:v,project:n}}function vA(n){let t=n;return()=>(t=(t*1664525+1013904223)%4294967296)/4294967296}const Jr=1400,yc=52,MA=20,Ep=11,ku=Ve+16,SA=-105,yA=-4.8,ba=3.2,Ea=1.5,bc=1.3,bA=.15,EA=4,Tp=3,TA=8,Ec=9,wA=.15;function AA(){const n=document.createElement("canvas");n.width=16,n.height=16;const t=n.getContext("2d"),e=t.createLinearGradient(0,0,0,16);return e.addColorStop(0,"rgba(255,255,255,0)"),e.addColorStop(.5,"rgba(255,255,255,0.9)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(6,0,4,16),new Xe(n)}function RA(){const n=document.createElement("canvas");n.width=64,n.height=64;const t=n.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,0.6)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new Xe(n)}function CA(n){const t=new Float32Array(Jr*3),e=new Float32Array(Jr),i=new Float32Array(Jr);for(let u=0;u<Jr;u++)t[u*3]=-Ve+n()*Ve*2,t[u*3+2]=-Ve+n()*Ve*2,e[u]=7+n()*5,i[u]=n()*yc;const s=new He;s.setAttribute("position",new ln(t,3));const r=AA(),o=new Ut(fi).lerp(new Ut(16777215),.7),a=new o0({map:r,color:o,size:8,sizeAttenuation:!1,transparent:!0,opacity:.28,depthWrite:!1,blending:vo}),l=new Wv(s,a);function c(u){const f=s.attributes.position.array;for(let h=0;h<Jr;h++)f[h*3+1]=yc-(u*e[h]+i[h])%yc;s.attributes.position.needsUpdate=!0}return{points:l,update:c}}function PA(n,t){const e=Math.min(3,n.length);if(e===0)return{update(){},reset(){}};const i=Math.max(1,Math.floor(n.length/e)),s=[];for(let c=0;c<e;c++)s.push(n[c*i%n.length]);const r=s.map(c=>c.color.clone()),o=s.map(()=>t()*100);function a(c){for(let u=0;u<s.length;u++){const d=Math.sin(c*.6+o[u])+Math.sin(c*1.37+o[u]*2.3)*.6<-1.05?Math.sin(c*47+o[u])>0?1:wA:1;s[u].color.copy(r[u]).multiplyScalar(d)}}function l(){for(let c=0;c<s.length;c++)s[c].color.copy(r[c])}return{update:a,reset:l}}function DA(n){const t=new Ae,e=new Xt({color:1777190}),i=new Xt({color:1708550,emissive:ke,emissiveIntensity:.7}),s=new le({color:new Ut(kn).lerp(new Ut(16777215),.3)});for(let o=0;o<EA;o++){const a=-6.625+ba/2+o*(ba+bA),l=new St(new It(ba,Ea,bc),e);l.position.set(a,0,0),t.add(l);const c=new St(new Ee(ba*.82,Ea*.4),i);c.position.set(a,.1,bc/2+.01),t.add(c)}const r=new St(new It(.12,.12,bc*.5),s);return r.position.set(-13.25/2-.02,-Ea*.25,0),t.add(r),t.rotation.y=Math.PI/2,t.position.set(yA,n+.14+Ea/2,ku),t}function LA(n,t){const e=t%MA;if(e>=Ep){n.visible=!1;return}n.visible=!0,n.position.z=ku+(SA-ku)*(e/Ep)}function IA(n){const t=RA(),e=new Ut(hi).lerp(new Ut(9476523),.75),i=dn(el[1]),s=dn(el[0]),r=new Ae,o=[],a=[],l=[];for(let u=0;u<Tp;u++){const f=new e0({map:t,color:e,transparent:!0,opacity:0,depthWrite:!1}),h=new Fv(f),d=1.6+n()*.8;h.scale.set(d,d,1),a.push({x:i+(n()-.5)*30,y:9+n()*1.5,z:s+(n()-.5)*30}),l.push(n()*Ec),o.push(h),r.add(h)}function c(u){for(let f=0;f<Tp;f++){const h=(u+l[f])%Ec/Ec,d=a[f];o[f].position.set(d.x,d.y+h*TA,d.z);const g=h<.2?h/.2:h>.75?(1-h)/.25:1;o[f].material.opacity=.3*g}}return{group:r,update:c}}function UA({reduceMotion:n=!1,flickerMaterials:t=[],trackY:e}={}){if(typeof e!="number")throw new Error("createAmbient needs trackY (pass station.trackY) — the train rides the station deck");const i=new Ae,s=vA(31337);function r(f){f.reset(),i.traverse(h=>{var d;(d=h.geometry)==null||d.dispose();for(const g of[h.material].flat().filter(Boolean)){for(const x of Object.values(g))x!=null&&x.isTexture&&x.dispose();g.dispose()}})}if(n){const f={update(){},reset(){}};return{group:i,update(){},dispose:()=>r(f)}}const o=CA(s);i.add(o.points);const a=DA(e);i.add(a);const l=IA(s);i.add(l.group);const c=PA(t,s);function u(f,h){o.update(h),LA(a,h),l.update(h),c.update(h)}return{group:i,update:u,dispose:()=>r(c)}}const jr=12.5,Jn=7,er=1536,wo=768,Zi=48,Tc=76,B0=130,Lr=68,Ta="'DM Mono', ui-monospace, monospace";function NA(n){const t=document.createElement("canvas");t.width=er,t.height=wo;const e=t.getContext("2d");e.fillStyle="#04050a",e.fillRect(0,0,er,wo),e.textBaseline="middle",((r,o)=>{r.fillStyle="#ffcf8a",r.font=`500 36px ${Ta}`,r.fillText("行先  DESTINATION",Zi,Tc),r.textAlign="right",r.fillText("YEAR   STATUS",er-Zi,Tc),r.textAlign="left",r.fillStyle="#8a6a34",r.fillRect(Zi,Tc+32,er-Zi*2,3)})(e);const s=r=>"#"+r.toString(16).padStart(6,"0");return n.forEach((r,o)=>{const a=B0+o*Lr+Lr/2,l=r.status==="live",c=l?s(hi):"#9a8663",u=l?s(fi):"#7d7361";e.font=`500 38px ${Ta}`,e.fillStyle=s(ke),e.fillText(String(o+1).padStart(2,"0"),Zi,a),e.font=`500 44px ${Ta}`,e.fillStyle=c,e.fillText(r.title,Zi+110,a),e.textAlign="right",e.font=`400 32px ${Ta}`,e.fillStyle="#8e8a7e",e.fillText(r.year??"",er-Zi-230,a),e.fillStyle=u,e.fillText(l?"ON TIME":"DELAYED",er-Zi,a),e.textAlign="left"}),Object.assign(new Xe(t),{colorSpace:xe,anisotropy:8})}function FA(n){const t=B0+n*Lr+Lr/2;return Jn/2-t/wo*Jn}function OA(n){const t=new Ae,e=2.6,i=NA(n),s=new le({map:i});s.color.setScalar(.8);const r=new St(new Ee(jr,Jn),s);r.position.set(0,e+Jn/2,.07),t.add(r);const o=new Xt({color:1316639}),a=new St(new It(jr+.5,Jn+.5,.3),o);a.position.set(0,e+Jn/2,-.08),t.add(a);const l=new St(new It(jr+.7,.16,.8),o);l.position.set(0,e+Jn+.32,.22),t.add(l);const c=new St(new Ee(jr-.4,Lr/wo*Jn),new le({color:hi,transparent:!0,opacity:.16}));c.visible=!1,c.position.z=.1,t.add(c);const u=new le({transparent:!0,opacity:0,depthWrite:!1}),f=n.map((h,d)=>{const g=e+Jn/2+FA(d),x=new St(new It(jr-.4,Lr/wo*Jn,.5),u);return x.position.set(0,g,.2),t.add(x),{hit:x,project:h,setHover(m){c.visible=m,m&&(c.position.y=g),s.color.setScalar(m?1:.8)}}});return{group:t,rows:f}}const BA="#141a24",zA=27;function HA(n){return[n.material].flat().some(t=>t==null?void 0:t.transparent)}function GA(n,t,e){const i=new c0(n.geometry,t),s=new se,r=new se;for(let o=0;o<n.count;o++)n.getMatrixAt(o,s),r.multiplyMatrices(n.matrixWorld,s),e.push(i.clone().applyMatrix4(r))}function VA(n,{skip:t=[],color:e=BA,thresholdAngle:i=zA}={}){n.updateMatrixWorld(!0);const s=[];function r(c){if(!(t.includes(c)||!c.visible)){c.isInstancedMesh?GA(c,i,s):c.isMesh&&!HA(c)&&s.push(new c0(c.geometry,i).applyMatrix4(c.matrixWorld));for(const u of c.children)r(u)}}r(n);const o=zi(s),a=new r0({color:e,transparent:!0}),l=new kv(o,a);return l.raycast=()=>{},l}const kA={class:"min-h-screen bg-[#070A12] text-[#E8E3D8] font-body px-5 py-10 sm:px-10 sm:py-16"},WA={class:"max-w-2xl mx-auto"},XA={class:"flex flex-col gap-4"},YA=["href"],qA={class:"font-display text-lg text-[#E8E3D8] group-hover:text-[#FFB347] group-hover:underline underline-offset-4"},$A={class:"mt-1 text-sm text-[#E8E3D8]/70"},KA={class:"mt-1 text-sm text-[#E8E3D8]/45"},ZA={class:"mt-2 font-mono text-xs text-[#E8E3D8]/45"},JA={key:1,class:"opacity-70"},jA={class:"font-display text-lg text-[#E8E3D8]"},QA={class:"mt-1 text-sm text-[#E8E3D8]/70"},t1={class:"mt-1 text-sm text-[#E8E3D8]/45"},e1={class:"mt-2 font-mono text-xs text-[#E8E3D8]/45"},wp={__name:"ProjectList",props:{projects:{type:Array,required:!0}},setup(n){function t(e){return e==="live"?"live":e==="WIP"?"in progress":e==="coming-soon"?"planned":e}return(e,i)=>(In(),Ti("div",kA,[Ke("div",WA,[i[2]||(i[2]=I_('<header class="mb-10"><h1 class="font-display text-3xl sm:text-4xl text-[#FFB347]">Paulo Gonzales</h1><p class="mt-3 text-[#E8E3D8]/90"> Project catalog — software built by Paulo Gonzales, software engineer. </p><p class="mt-5 flex flex-wrap gap-x-6 gap-y-2"><a href="./projects/profile/" class="text-[#FFB347] underline decoration-[#FFB347]/40 underline-offset-4 hover:decoration-[#FFB347] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]">Profile</a><a href="./assets/Paulo_Gonzales_Resume_SoftwareEngineer.pdf" download="Paulo_Gonzales_Resume_SoftwareEngineer.pdf" class="text-[#FFB347] underline decoration-[#FFB347]/40 underline-offset-4 hover:decoration-[#FFB347] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]">Resume (PDF)</a></p></header>',1)),Ke("section",null,[i[1]||(i[1]=Ke("h2",{class:"font-display text-xl text-[#FFB347] mb-4"},"Projects",-1)),Ke("ul",XA,[(In(!0),Ti(Qn,null,i_(n.projects,s=>(In(),Ti("li",{key:s.id,class:"border border-[#E8E3D8]/15 rounded-md p-4"},[s.status!=="coming-soon"?(In(),Ti("a",{key:0,href:s.url,class:"block group rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]"},[Ke("h3",qA,nn(s.title),1),Ke("p",$A,nn(s.tagline),1),Ke("p",KA,nn(s.description),1),Ke("p",ZA,nn(s.category)+" · "+nn(s.year)+" · "+nn(s.tools.join(", "))+" · "+nn(t(s.status)),1)],8,YA)):(In(),Ti("div",JA,[Ke("h3",jA,[Lm(nn(s.title)+" ",1),i[0]||(i[0]=Ke("span",{class:"ml-2 align-middle text-[0.65rem] uppercase tracking-wide text-[#FF2D55]"},"Planned",-1))]),Ke("p",QA,nn(s.tagline),1),Ke("p",t1,nn(s.description),1),Ke("p",e1,nn(s.category)+" · "+nn(s.year)+" · "+nn(s.tools.join(", "))+" · "+nn(t(s.status)),1)]))]))),128))])])])]))}},n1={class:"relative h-full w-full bg-[#070a12]"},i1={key:1,class:"h-full w-full overflow-y-auto"},s1={key:2,class:"pointer-events-none absolute inset-x-0 bottom-7 flex justify-center","aria-hidden":"true","data-hint":""},r1={__name:"ShinjukuScene",props:{projects:{type:Array,required:!0}},emits:["select","hover"],setup(n,{emit:t}){const e=n,i=t,s=wa(null),r=wa(!1),o=wa(!0);let a=null,l=null,c=null;return lm(()=>{try{l=PT(s.value)}catch(S){console.error("WebGL unavailable, falling back to the project list.",S),r.value=!0;return}DT(l.scene),l.scene.add(VT()),l.scene.add(QT()),l.scene.add(Gw());const u=tA();l.scene.add(u.group);const f={konbini:uA,koban:pA,vending:dA};for(const S of b0){const T=f[S.id];if(!T){console.warn(`cityLayout SCENERY_SITES references unknown scenery id "${S.id}"`);continue}const{x:M,z:w}=Ur(S.cell,S.lot),{group:b}=T();b.position.set(M,0,w),b.rotation.y=S.ry??0,l.scene.add(b)}const h=Tw();l.scene.add(h.group);const d=(S,T)=>l.addPickable(S,T),g=new Map(e.projects.map(S=>[S.id,S]));for(const S of y0){const T=g.get(S.id);if(!T){console.warn(`cityLayout PROJECT_SITES references unknown project id "${S.id}"`);continue}const M=xA(T,S);l.scene.add(M.group),d(M.hit,{kind:"project",project:T,hover:M.setHover})}const x=OA(e.projects);h.boardAnchor.add(x.group);for(const S of x.rows)d(S.hit,{kind:"project",project:S.project,hover:S.setHover});c=UA({reduceMotion:l.reduceMotion,flickerMaterials:u.signMats,trackY:h.trackY}),l.scene.add(c.group),l.onFrame((S,T)=>c.update(S,T)),l.scene.add(VA(l.scene,{skip:[c.group]}));let m=null;l.onHover(S=>{var T,M;S!==m&&((T=m==null?void 0:m.hover)==null||T.call(m,!1),(M=S==null?void 0:S.hover)==null||M.call(S,!0),m=S,i("hover",(S==null?void 0:S.project)??null))}),l.onSelect(S=>i("select",S));const p=()=>{o.value=!1};s.value.addEventListener("pointerdown",p,{once:!0}),a=setTimeout(p,9e3),l.start()}),cm(()=>{clearTimeout(a),c==null||c.dispose(),l==null||l.dispose()}),(u,f)=>(In(),Ti("div",n1,[r.value?(In(),Ti("div",i1,[Rn(wp,{projects:n.projects},null,8,["projects"])])):(In(),Ti("canvas",{key:0,ref_key:"canvasEl",ref:s,"data-scene":"",class:"block h-full w-full cursor-grab touch-none","aria-label":"Interactive 3D map of Shinjuku. Shinjuku Station sits at the centre; each lit building is one project."},[Rn(wp,{projects:n.projects},null,8,["projects"])],512)),!r.value&&o.value?(In(),Ti("div",s1,[...f[0]||(f[0]=[Ke("span",{class:"motion-safe:animate-pulse rounded-full border border-[#FFB347]/25 bg-black/45 px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#FFB347]/75"}," drag to pan · scroll to zoom · lit buildings are projects ",-1)])])):U_("",!0)]))}},o1={__name:"App",setup(n){const t=wa([{id:"algo-lab",indexNumber:9,title:"Algorithm Lab",tagline:"things in motion, on a canvas",description:"Flocking boids, n-body gravity, the three-body problem, and other simulations rendered with vanilla canvas.",category:"simulations",year:"2026",tools:["canvas","vanilla js"],status:"live",url:"./projects/algo-lab/dist/index.html",github:""},{id:"flip7",indexNumber:8,title:"Flip 7",tagline:"a card game of risky math",description:"A multiplayer port of the press-your-luck card game. Draw cards, dodge duplicates, race to the target score.",category:"games",year:"2026",tools:["vue","vite","tailwind"],status:"live",url:"./projects/ported-games/flip7/dist/index.html",github:""},{id:"machi-koro",indexNumber:7,title:"Machi Koro",tagline:"build a city by rolling dice",description:"A web port of the dice-driven city-building board game. Roll, collect, buy, and outbuild your opponent.",category:"games",year:"2025",tools:["vue","vite","tailwind"],status:"live",url:"./projects/ported-games/machi-koro/dist/index.html",github:""},{id:"venue-search",indexNumber:6,title:"Venue Search",tagline:"rentable rooms in tokyo",description:"A better search for event spaces in Tokyo.",category:"maps",year:"2025",tools:["vue","leaflet"],status:"WIP",url:"./projects/venue-search/dist/index.html",github:""},{id:"reading-buddy",indexNumber:5,title:"Reading Buddy",tagline:"a companion for the long book",description:"Track your reading with progressive character reveals and chapter-by-chapter companion guides.",category:"reading",year:"2025",tools:["vue","vite"],status:"live",url:"./projects/reading-buddy/dist/index.html",github:""},{id:"japan-map",indexNumber:4,title:"Japan History Map",tagline:"centuries on a single canvas",description:"Significant events in Japanese history and the Tokyo train system, laid out on an interactive Leaflet map.",category:"maps",year:"2025",tools:["leaflet","vue"],status:"live",url:"./projects/japan-map/dist/index.html",github:""},{id:"right-word-japanese",indexNumber:3,title:"The Right Word",tagline:"a phrasebook for awkward moments",description:"Quick help when speaking Japanese — find the right word for the situation. Includes keigo for the careful moments.",category:"language",year:"2025",tools:["vue","vite"],status:"WIP",url:"./projects/right-word/dist/index.html",github:""},{id:"japanese-dashboard",indexNumber:2,title:"Japanese Learning",tagline:"a dashboard of small tools",description:"A collection of small, useful utilities for Japanese learning, all in one place.",category:"language",year:"2025",tools:["vue","vite"],status:"live",url:"./projects/japandash/dist/index.html",github:""},{id:"bible-hymn-kids",indexNumber:1,title:"Bible Hymn Learning",tagline:"hymns and scripture for young learners",description:"Interactive hymn and scripture learning experience designed for kids.",category:"reading",year:"2024",tools:["html","css","js"],status:"WIP",url:"./projects/bible-hymn/hymn-app.html",github:""}]);function e(i){if(!i)return;if(i.kind==="link"){if(i.download){const r=document.createElement("a");r.href=i.url,r.download=i.download,document.body.appendChild(r),r.click(),r.remove()}else window.open(i.url,"_blank","noopener");return}const s=i.project;!s||s.status==="coming-soon"||!s.url||window.open(s.url,"_blank","noopener")}return(i,s)=>(In(),Cm(r1,{projects:t.value,onSelect:e},null,8,["projects"]))}};gx(o1).mount("#app");
