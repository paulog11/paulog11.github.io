(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function sh(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const be={},pr=[],ri=()=>{},Wp=()=>!1,dl=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),rh=n=>n.startsWith("onUpdate:"),Je=Object.assign,oh=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},Mg=Object.prototype.hasOwnProperty,ue=(n,t)=>Mg.call(n,t),Zt=Array.isArray,mr=n=>Do(n)==="[object Map]",Xp=n=>Do(n)==="[object Set]",hf=n=>Do(n)==="[object Date]",ee=n=>typeof n=="function",Ue=n=>typeof n=="string",li=n=>typeof n=="symbol",me=n=>n!==null&&typeof n=="object",Yp=n=>(me(n)||ee(n))&&ee(n.then)&&ee(n.catch),qp=Object.prototype.toString,Do=n=>qp.call(n),Sg=n=>Do(n).slice(8,-1),$p=n=>Do(n)==="[object Object]",ah=n=>Ue(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,so=sh(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),pl=n=>{const t=Object.create(null);return(e=>t[e]||(t[e]=n(e)))},yg=/-\w/g,Bn=pl(n=>n.replace(yg,t=>t.slice(1).toUpperCase())),bg=/\B([A-Z])/g,Ds=pl(n=>n.replace(bg,"-$1").toLowerCase()),Kp=pl(n=>n.charAt(0).toUpperCase()+n.slice(1)),Rl=pl(n=>n?`on${Kp(n)}`:""),ni=(n,t)=>!Object.is(n,t),Cl=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},Zp=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},Eg=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let ff;const ml=()=>ff||(ff=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function lh(n){if(Zt(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=Ue(i)?Rg(i):lh(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(Ue(n)||me(n))return n}const Tg=/;(?![^(]*\))/g,wg=/:([^]+)/,Ag=/\/\*[^]*?\*\//g;function Rg(n){const t={};return n.replace(Ag,"").split(Tg).forEach(e=>{if(e){const i=e.split(wg);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function ch(n){let t="";if(Ue(n))t=n;else if(Zt(n))for(let e=0;e<n.length;e++){const i=ch(n[e]);i&&(t+=i+" ")}else if(me(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const Cg="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Pg=sh(Cg);function Jp(n){return!!n||n===""}function Lg(n,t){if(n.length!==t.length)return!1;let e=!0;for(let i=0;e&&i<n.length;i++)e=uh(n[i],t[i]);return e}function uh(n,t){if(n===t)return!0;let e=hf(n),i=hf(t);if(e||i)return e&&i?n.getTime()===t.getTime():!1;if(e=li(n),i=li(t),e||i)return n===t;if(e=Zt(n),i=Zt(t),e||i)return e&&i?Lg(n,t):!1;if(e=me(n),i=me(t),e||i){if(!e||!i)return!1;const s=Object.keys(n).length,r=Object.keys(t).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=t.hasOwnProperty(o);if(a&&!l||!a&&l||!uh(n[o],t[o]))return!1}}return String(n)===String(t)}const jp=n=>!!(n&&n.__v_isRef===!0),Qe=n=>Ue(n)?n:n==null?"":Zt(n)||me(n)&&(n.toString===qp||!ee(n.toString))?jp(n)?Qe(n.value):JSON.stringify(n,Qp,2):String(n),Qp=(n,t)=>jp(t)?Qp(n,t.value):mr(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[Pl(i,r)+" =>"]=s,e),{})}:Xp(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Pl(e))}:li(t)?Pl(t):me(t)&&!Zt(t)&&!$p(t)?String(t):t,Pl=(n,t="")=>{var e;return li(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let cn;class Dg{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=cn,!t&&cn&&(this.index=(cn.scopes||(cn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=cn;try{return cn=this,t()}finally{cn=e}}}on(){++this._on===1&&(this.prevScope=cn,cn=this)}off(){this._on>0&&--this._on===0&&(cn=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,i=this.scopes.length;e<i;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Ig(){return cn}let ye;const Ll=new WeakSet;class tm{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,cn&&cn.active&&cn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ll.has(this)&&(Ll.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||nm(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,df(this),im(this);const t=ye,e=zn;ye=this,zn=!0;try{return this.fn()}finally{sm(this),ye=t,zn=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)dh(t);this.deps=this.depsTail=void 0,df(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ll.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Fc(this)&&this.run()}get dirty(){return Fc(this)}}let em=0,ro,oo;function nm(n,t=!1){if(n.flags|=8,t){n.next=oo,oo=n;return}n.next=ro,ro=n}function hh(){em++}function fh(){if(--em>0)return;if(oo){let t=oo;for(oo=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;ro;){let t=ro;for(ro=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function im(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function sm(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),dh(i),Ng(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function Fc(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(rm(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function rm(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===_o)||(n.globalVersion=_o,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Fc(n))))return;n.flags|=2;const t=n.dep,e=ye,i=zn;ye=n,zn=!0;try{im(n);const s=n.fn(n._value);(t.version===0||ni(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{ye=e,zn=i,sm(n),n.flags&=-3}}function dh(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)dh(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function Ng(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let zn=!0;const om=[];function Li(){om.push(zn),zn=!1}function Di(){const n=om.pop();zn=n===void 0?!0:n}function df(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=ye;ye=void 0;try{t()}finally{ye=e}}}let _o=0;class Ug{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class ph{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!ye||!zn||ye===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==ye)e=this.activeLink=new Ug(ye,this),ye.deps?(e.prevDep=ye.depsTail,ye.depsTail.nextDep=e,ye.depsTail=e):ye.deps=ye.depsTail=e,am(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=ye.depsTail,e.nextDep=void 0,ye.depsTail.nextDep=e,ye.depsTail=e,ye.deps===e&&(ye.deps=i)}return e}trigger(t){this.version++,_o++,this.notify(t)}notify(t){hh();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{fh()}}}function am(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)am(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const Oc=new WeakMap,Es=Symbol(""),Bc=Symbol(""),xo=Symbol("");function qe(n,t,e){if(zn&&ye){let i=Oc.get(n);i||Oc.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new ph),s.map=i,s.key=e),s.track()}}function wi(n,t,e,i,s,r){const o=Oc.get(n);if(!o){_o++;return}const a=l=>{l&&l.trigger()};if(hh(),t==="clear")o.forEach(a);else{const l=Zt(n),c=l&&ah(e);if(l&&e==="length"){const u=Number(i);o.forEach((h,f)=>{(f==="length"||f===xo||!li(f)&&f>=u)&&a(h)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(xo)),t){case"add":l?c&&a(o.get("length")):(a(o.get(Es)),mr(n)&&a(o.get(Bc)));break;case"delete":l||(a(o.get(Es)),mr(n)&&a(o.get(Bc)));break;case"set":mr(n)&&a(o.get(Es));break}}fh()}function Bs(n){const t=ce(n);return t===n?t:(qe(t,"iterate",xo),Rn(n)?t:t.map(Gn))}function gl(n){return qe(n=ce(n),"iterate",xo),n}function jn(n,t){return Ii(n)?Er(Ts(n)?Gn(t):t):Gn(t)}const Fg={__proto__:null,[Symbol.iterator](){return Dl(this,Symbol.iterator,n=>jn(this,n))},concat(...n){return Bs(this).concat(...n.map(t=>Zt(t)?Bs(t):t))},entries(){return Dl(this,"entries",n=>(n[1]=jn(this,n[1]),n))},every(n,t){return mi(this,"every",n,t,void 0,arguments)},filter(n,t){return mi(this,"filter",n,t,e=>e.map(i=>jn(this,i)),arguments)},find(n,t){return mi(this,"find",n,t,e=>jn(this,e),arguments)},findIndex(n,t){return mi(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return mi(this,"findLast",n,t,e=>jn(this,e),arguments)},findLastIndex(n,t){return mi(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return mi(this,"forEach",n,t,void 0,arguments)},includes(...n){return Il(this,"includes",n)},indexOf(...n){return Il(this,"indexOf",n)},join(n){return Bs(this).join(n)},lastIndexOf(...n){return Il(this,"lastIndexOf",n)},map(n,t){return mi(this,"map",n,t,void 0,arguments)},pop(){return Fr(this,"pop")},push(...n){return Fr(this,"push",n)},reduce(n,...t){return pf(this,"reduce",n,t)},reduceRight(n,...t){return pf(this,"reduceRight",n,t)},shift(){return Fr(this,"shift")},some(n,t){return mi(this,"some",n,t,void 0,arguments)},splice(...n){return Fr(this,"splice",n)},toReversed(){return Bs(this).toReversed()},toSorted(n){return Bs(this).toSorted(n)},toSpliced(...n){return Bs(this).toSpliced(...n)},unshift(...n){return Fr(this,"unshift",n)},values(){return Dl(this,"values",n=>jn(this,n))}};function Dl(n,t,e){const i=gl(n),s=i[t]();return i!==n&&!Rn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=e(r.value)),r}),s}const Og=Array.prototype;function mi(n,t,e,i,s,r){const o=gl(n),a=o!==n&&!Rn(n),l=o[t];if(l!==Og[t]){const h=l.apply(n,r);return a?Gn(h):h}let c=e;o!==n&&(a?c=function(h,f){return e.call(this,jn(n,h),f,n)}:e.length>2&&(c=function(h,f){return e.call(this,h,f,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function pf(n,t,e,i){const s=gl(n),r=s!==n&&!Rn(n);let o=e,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,h){return a&&(a=!1,c=jn(n,c)),e.call(this,c,jn(n,u),h,n)}):e.length>3&&(o=function(c,u,h){return e.call(this,c,u,h,n)}));const l=s[t](o,...i);return a?jn(n,l):l}function Il(n,t,e){const i=ce(n);qe(i,"iterate",xo);const s=i[t](...e);return(s===-1||s===!1)&&xh(e[0])?(e[0]=ce(e[0]),i[t](...e)):s}function Fr(n,t,e=[]){Li(),hh();const i=ce(n)[t].apply(n,e);return fh(),Di(),i}const Bg=sh("__proto__,__v_isRef,__isVue"),lm=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(li));function zg(n){li(n)||(n=String(n));const t=ce(this);return qe(t,"has",n),t.hasOwnProperty(n)}class cm{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?Kg:dm:r?fm:hm).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Zt(t);if(!s){let l;if(o&&(l=Fg[e]))return l;if(e==="hasOwnProperty")return zg}const a=Reflect.get(t,e,Ke(t)?t:i);if((li(e)?lm.has(e):Bg(e))||(s||qe(t,"get",e),r))return a;if(Ke(a)){const l=o&&ah(e)?a:a.value;return s&&me(l)?Hc(l):l}return me(a)?s?Hc(a):gh(a):a}}class um extends cm{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];const o=Zt(t)&&ah(e);if(!this._isShallow){const c=Ii(r);if(!Rn(i)&&!Ii(i)&&(r=ce(r),i=ce(i)),!o&&Ke(r)&&!Ke(i))return c||(r.value=i),!0}const a=o?Number(e)<t.length:ue(t,e),l=Reflect.set(t,e,i,Ke(t)?t:s);return t===ce(s)&&(a?ni(i,r)&&wi(t,"set",e,i):wi(t,"add",e,i)),l}deleteProperty(t,e){const i=ue(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&wi(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!li(e)||!lm.has(e))&&qe(t,"has",e),i}ownKeys(t){return qe(t,"iterate",Zt(t)?"length":Es),Reflect.ownKeys(t)}}class Hg extends cm{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const Gg=new um,Vg=new Hg,kg=new um(!0);const zc=n=>n,Oo=n=>Reflect.getPrototypeOf(n);function Wg(n,t,e){return function(...i){const s=this.__v_raw,r=ce(s),o=mr(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?zc:t?Er:Gn;return!t&&qe(r,"iterate",l?Bc:Es),Je(Object.create(c),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}}})}}function Bo(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function Xg(n,t){const e={get(s){const r=this.__v_raw,o=ce(r),a=ce(s);n||(ni(s,a)&&qe(o,"get",s),qe(o,"get",a));const{has:l}=Oo(o),c=t?zc:n?Er:Gn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&qe(ce(s),"iterate",Es),s.size},has(s){const r=this.__v_raw,o=ce(r),a=ce(s);return n||(ni(s,a)&&qe(o,"has",s),qe(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=ce(a),c=t?zc:n?Er:Gn;return!n&&qe(l,"iterate",Es),a.forEach((u,h)=>s.call(r,c(u),c(h),o))}};return Je(e,n?{add:Bo("add"),set:Bo("set"),delete:Bo("delete"),clear:Bo("clear")}:{add(s){const r=ce(this),o=Oo(r),a=ce(s),l=!t&&!Rn(s)&&!Ii(s)?a:s;return o.has.call(r,l)||ni(s,l)&&o.has.call(r,s)||ni(a,l)&&o.has.call(r,a)||(r.add(l),wi(r,"add",l,l)),this},set(s,r){!t&&!Rn(r)&&!Ii(r)&&(r=ce(r));const o=ce(this),{has:a,get:l}=Oo(o);let c=a.call(o,s);c||(s=ce(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?ni(r,u)&&wi(o,"set",s,r):wi(o,"add",s,r),this},delete(s){const r=ce(this),{has:o,get:a}=Oo(r);let l=o.call(r,s);l||(s=ce(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&wi(r,"delete",s,void 0),c},clear(){const s=ce(this),r=s.size!==0,o=s.clear();return r&&wi(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=Wg(s,n,t)}),e}function mh(n,t){const e=Xg(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(ue(e,s)&&s in i?e:i,s,r)}const Yg={get:mh(!1,!1)},qg={get:mh(!1,!0)},$g={get:mh(!0,!1)};const hm=new WeakMap,fm=new WeakMap,dm=new WeakMap,Kg=new WeakMap;function Zg(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Jg(n){return n.__v_skip||!Object.isExtensible(n)?0:Zg(Sg(n))}function gh(n){return Ii(n)?n:_h(n,!1,Gg,Yg,hm)}function jg(n){return _h(n,!1,kg,qg,fm)}function Hc(n){return _h(n,!0,Vg,$g,dm)}function _h(n,t,e,i,s){if(!me(n)||n.__v_raw&&!(t&&n.__v_isReactive))return n;const r=Jg(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:e);return s.set(n,a),a}function Ts(n){return Ii(n)?Ts(n.__v_raw):!!(n&&n.__v_isReactive)}function Ii(n){return!!(n&&n.__v_isReadonly)}function Rn(n){return!!(n&&n.__v_isShallow)}function xh(n){return n?!!n.__v_raw:!1}function ce(n){const t=n&&n.__v_raw;return t?ce(t):n}function Qg(n){return!ue(n,"__v_skip")&&Object.isExtensible(n)&&Zp(n,"__v_skip",!0),n}const Gn=n=>me(n)?gh(n):n,Er=n=>me(n)?Hc(n):n;function Ke(n){return n?n.__v_isRef===!0:!1}function La(n){return t_(n,!1)}function t_(n,t){return Ke(n)?n:new e_(n,t)}class e_{constructor(t,e){this.dep=new ph,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:ce(t),this._value=e?t:Gn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||Rn(t)||Ii(t);t=i?t:ce(t),ni(t,e)&&(this._rawValue=t,this._value=i?t:Gn(t),this.dep.trigger())}}function n_(n){return Ke(n)?n.value:n}const i_={get:(n,t,e)=>t==="__v_raw"?n:n_(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return Ke(s)&&!Ke(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function pm(n){return Ts(n)?n:new Proxy(n,i_)}class s_{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new ph(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=_o-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&ye!==this)return nm(this,!0),!0}get value(){const t=this.dep.track();return rm(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function r_(n,t,e=!1){let i,s;return ee(n)?i=n:(i=n.get,s=n.set),new s_(i,s,e)}const zo={},Ya=new WeakMap;let gs;function o_(n,t=!1,e=gs){if(e){let i=Ya.get(e);i||Ya.set(e,i=[]),i.push(n)}}function a_(n,t,e=be){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=v=>s?v:Rn(v)||s===!1||s===0?es(v,1):es(v);let u,h,f,d,g=!1,_=!1;if(Ke(n)?(h=()=>n.value,g=Rn(n)):Ts(n)?(h=()=>c(n),g=!0):Zt(n)?(_=!0,g=n.some(v=>Ts(v)||Rn(v)),h=()=>n.map(v=>{if(Ke(v))return v.value;if(Ts(v))return c(v);if(ee(v))return l?l(v,2):v()})):ee(n)?t?h=l?()=>l(n,2):n:h=()=>{if(f){Li();try{f()}finally{Di()}}const v=gs;gs=u;try{return l?l(n,3,[d]):n(d)}finally{gs=v}}:h=ri,t&&s){const v=h,w=s===!0?1/0:s;h=()=>es(v(),w)}const m=Ig(),p=()=>{u.stop(),m&&m.active&&oh(m.effects,u)};if(r&&t){const v=t;t=(...w)=>{v(...w),p()}}let S=_?new Array(n.length).fill(zo):zo;const b=v=>{if(!(!(u.flags&1)||!u.dirty&&!v))if(t){const w=u.run();if(s||g||(_?w.some((E,R)=>ni(E,S[R])):ni(w,S))){f&&f();const E=gs;gs=u;try{const R=[w,S===zo?void 0:_&&S[0]===zo?[]:S,d];S=w,l?l(t,3,R):t(...R)}finally{gs=E}}}else u.run()};return a&&a(b),u=new tm(h),u.scheduler=o?()=>o(b,!1):b,d=v=>o_(v,!1,u),f=u.onStop=()=>{const v=Ya.get(u);if(v){if(l)l(v,4);else for(const w of v)w();Ya.delete(u)}},t?i?b(!0):S=u.run():o?o(b.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function es(n,t=1/0,e){if(t<=0||!me(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,Ke(n))es(n.value,t,e);else if(Zt(n))for(let i=0;i<n.length;i++)es(n[i],t,e);else if(Xp(n)||mr(n))n.forEach(i=>{es(i,t,e)});else if($p(n)){for(const i in n)es(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&es(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Io(n,t,e,i){try{return i?n(...i):n()}catch(s){_l(s,t,e)}}function ci(n,t,e,i){if(ee(n)){const s=Io(n,t,e,i);return s&&Yp(s)&&s.catch(r=>{_l(r,t,e)}),s}if(Zt(n)){const s=[];for(let r=0;r<n.length;r++)s.push(ci(n[r],t,e,i));return s}}function _l(n,t,e,i=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||be;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}a=a.parent}if(r){Li(),Io(r,null,10,[n,l,c]),Di();return}}l_(n,e,s,i,o)}function l_(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const nn=[];let Zn=-1;const gr=[];let Qi=null,ar=0;const mm=Promise.resolve();let qa=null;function c_(n){const t=qa||mm;return n?t.then(this?n.bind(this):n):t}function u_(n){let t=Zn+1,e=nn.length;for(;t<e;){const i=t+e>>>1,s=nn[i],r=vo(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function vh(n){if(!(n.flags&1)){const t=vo(n),e=nn[nn.length-1];!e||!(n.flags&2)&&t>=vo(e)?nn.push(n):nn.splice(u_(t),0,n),n.flags|=1,gm()}}function gm(){qa||(qa=mm.then(xm))}function h_(n){Zt(n)?gr.push(...n):Qi&&n.id===-1?Qi.splice(ar+1,0,n):n.flags&1||(gr.push(n),n.flags|=1),gm()}function mf(n,t,e=Zn+1){for(;e<nn.length;e++){const i=nn[e];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;nn.splice(e,1),e--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function _m(n){if(gr.length){const t=[...new Set(gr)].sort((e,i)=>vo(e)-vo(i));if(gr.length=0,Qi){Qi.push(...t);return}for(Qi=t,ar=0;ar<Qi.length;ar++){const e=Qi[ar];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}Qi=null,ar=0}}const vo=n=>n.id==null?n.flags&2?-1:1/0:n.id;function xm(n){try{for(Zn=0;Zn<nn.length;Zn++){const t=nn[Zn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Io(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Zn<nn.length;Zn++){const t=nn[Zn];t&&(t.flags&=-2)}Zn=-1,nn.length=0,_m(),qa=null,(nn.length||gr.length)&&xm()}}let ii=null,vm=null;function $a(n){const t=ii;return ii=n,vm=n&&n.type.__scopeId||null,t}function f_(n,t=ii,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&wf(-1);const r=$a(t);let o;try{o=n(...s)}finally{$a(r),i._d&&wf(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function cs(n,t,e,i){const s=n.dirs,r=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(Li(),ci(l,e,8,[n.el,a,n,t]),Di())}}function d_(n,t){if(sn){let e=sn.provides;const i=sn.parent&&sn.parent.provides;i===e&&(e=sn.provides=Object.create(i)),e[n]=t}}function Da(n,t,e=!1){const i=dx();if(i||_r){let s=_r?_r._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&ee(t)?t.call(i&&i.proxy):t}}const p_=Symbol.for("v-scx"),m_=()=>Da(p_);function Nl(n,t,e){return Mm(n,t,e)}function Mm(n,t,e=be){const{immediate:i,deep:s,flush:r,once:o}=e,a=Je({},e),l=t&&i||!t&&r!=="post";let c;if(So){if(r==="sync"){const d=m_();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=ri,d.resume=ri,d.pause=ri,d}}const u=sn;a.call=(d,g,_)=>ci(d,u,g,_);let h=!1;r==="post"?a.scheduler=d=>{ln(d,u&&u.suspense)}:r!=="sync"&&(h=!0,a.scheduler=(d,g)=>{g?d():vh(d)}),a.augmentJob=d=>{t&&(d.flags|=4),h&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const f=a_(n,t,a);return So&&(c?c.push(f):l&&f()),f}function g_(n,t,e){const i=this.proxy,s=Ue(n)?n.includes(".")?Sm(i,n):()=>i[n]:n.bind(i,i);let r;ee(t)?r=t:(r=t.handler,e=t);const o=No(this),a=Mm(s,r.bind(i),e);return o(),a}function Sm(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const __=Symbol("_vte"),x_=n=>n.__isTeleport,v_=Symbol("_leaveCb");function Mh(n,t){n.shapeFlag&6&&n.component?(n.transition=t,Mh(n.component.subTree,t)):n.shapeFlag&128?(n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)):n.transition=t}function ym(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function gf(n,t){let e;return!!((e=Object.getOwnPropertyDescriptor(n,t))&&!e.configurable)}const Ka=new WeakMap;function ao(n,t,e,i,s=!1){if(Zt(n)){n.forEach((_,m)=>ao(_,t&&(Zt(t)?t[m]:t),e,i,s));return}if(lo(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&ao(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?Eh(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===be?a.refs={}:a.refs,h=a.setupState,f=ce(h),d=h===be?Wp:_=>gf(u,_)?!1:ue(f,_),g=(_,m)=>!(m&&gf(u,m));if(c!=null&&c!==l){if(_f(t),Ue(c))u[c]=null,d(c)&&(h[c]=null);else if(Ke(c)){const _=t;g(c,_.k)&&(c.value=null),_.k&&(u[_.k]=null)}}if(ee(l))Io(l,a,12,[o,u]);else{const _=Ue(l),m=Ke(l);if(_||m){const p=()=>{if(n.f){const S=_?d(l)?h[l]:u[l]:g()||!n.k?l.value:u[n.k];if(s)Zt(S)&&oh(S,r);else if(Zt(S))S.includes(r)||S.push(r);else if(_)u[l]=[r],d(l)&&(h[l]=u[l]);else{const b=[r];g(l,n.k)&&(l.value=b),n.k&&(u[n.k]=b)}}else _?(u[l]=o,d(l)&&(h[l]=o)):m&&(g(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const S=()=>{p(),Ka.delete(n)};S.id=-1,Ka.set(n,S),ln(S,e)}else _f(n),p()}}}function _f(n){const t=Ka.get(n);t&&(t.flags|=8,Ka.delete(n))}ml().requestIdleCallback;ml().cancelIdleCallback;const lo=n=>!!n.type.__asyncLoader,bm=n=>n.type.__isKeepAlive;function M_(n,t){Em(n,"a",t)}function S_(n,t){Em(n,"da",t)}function Em(n,t,e=sn){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(xl(t,i,e),e){let s=e.parent;for(;s&&s.parent;)bm(s.parent.vnode)&&y_(i,t,e,s),s=s.parent}}function y_(n,t,e,i){const s=xl(t,n,i,!0);Am(()=>{oh(i[t],s)},e)}function xl(n,t,e=sn,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{Li();const a=No(e),l=ci(t,e,n,o);return a(),Di(),l});return i?s.unshift(r):s.push(r),r}}const Bi=n=>(t,e=sn)=>{(!So||n==="sp")&&xl(n,(...i)=>t(...i),e)},b_=Bi("bm"),Tm=Bi("m"),E_=Bi("bu"),T_=Bi("u"),wm=Bi("bum"),Am=Bi("um"),w_=Bi("sp"),A_=Bi("rtg"),R_=Bi("rtc");function C_(n,t=sn){xl("ec",n,t)}const P_=Symbol.for("v-ndc");function L_(n,t,e,i){let s;const r=e,o=Zt(n);if(o||Ue(n)){const a=o&&Ts(n);let l=!1,c=!1;a&&(l=!Rn(n),c=Ii(n),n=gl(n)),s=new Array(n.length);for(let u=0,h=n.length;u<h;u++)s[u]=t(l?c?Er(Gn(n[u])):Gn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(me(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(n[u],u,l,r)}}else s=[];return s}const Gc=n=>n?Zm(n)?Eh(n):Gc(n.parent):null,co=Je(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Gc(n.parent),$root:n=>Gc(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Cm(n),$forceUpdate:n=>n.f||(n.f=()=>{vh(n.update)}),$nextTick:n=>n.n||(n.n=c_.bind(n.proxy)),$watch:n=>g_.bind(n)}),Ul=(n,t)=>n!==be&&!n.__isScriptSetup&&ue(n,t),D_={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(t[0]!=="$"){const f=o[t];if(f!==void 0)switch(f){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(Ul(i,t))return o[t]=1,i[t];if(s!==be&&ue(s,t))return o[t]=2,s[t];if(ue(r,t))return o[t]=3,r[t];if(e!==be&&ue(e,t))return o[t]=4,e[t];Vc&&(o[t]=0)}}const c=co[t];let u,h;if(c)return t==="$attrs"&&qe(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[t]))return u;if(e!==be&&ue(e,t))return o[t]=4,e[t];if(h=l.config.globalProperties,ue(h,t))return h[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return Ul(s,t)?(s[t]=e,!0):i!==be&&ue(i,t)?(i[t]=e,!0):ue(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(e[a]||n!==be&&a[0]!=="$"&&ue(n,a)||Ul(t,a)||ue(r,a)||ue(i,a)||ue(co,a)||ue(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:ue(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function xf(n){return Zt(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let Vc=!0;function I_(n){const t=Cm(n),e=n.proxy,i=n.ctx;Vc=!1,t.beforeCreate&&vf(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:d,updated:g,activated:_,deactivated:m,beforeDestroy:p,beforeUnmount:S,destroyed:b,unmounted:v,render:w,renderTracked:E,renderTriggered:R,errorCaptured:M,serverPrefetch:A,expose:N,inheritAttrs:L,components:F,directives:q,filters:Z}=t;if(c&&N_(c,i,null),o)for(const U in o){const k=o[U];ee(k)&&(i[U]=k.bind(e))}if(s){const U=s.call(e,e);me(U)&&(n.data=gh(U))}if(Vc=!0,r)for(const U in r){const k=r[U],J=ee(k)?k.bind(e,e):ee(k.get)?k.get.bind(e,e):ri,at=!ee(k)&&ee(k.set)?k.set.bind(e):ri,_t=vx({get:J,set:at});Object.defineProperty(i,U,{enumerable:!0,configurable:!0,get:()=>_t.value,set:Mt=>_t.value=Mt})}if(a)for(const U in a)Rm(a[U],i,e,U);if(l){const U=ee(l)?l.call(e):l;Reflect.ownKeys(U).forEach(k=>{d_(k,U[k])})}u&&vf(u,n,"c");function B(U,k){Zt(k)?k.forEach(J=>U(J.bind(e))):k&&U(k.bind(e))}if(B(b_,h),B(Tm,f),B(E_,d),B(T_,g),B(M_,_),B(S_,m),B(C_,M),B(R_,E),B(A_,R),B(wm,S),B(Am,v),B(w_,A),Zt(N))if(N.length){const U=n.exposed||(n.exposed={});N.forEach(k=>{Object.defineProperty(U,k,{get:()=>e[k],set:J=>e[k]=J,enumerable:!0})})}else n.exposed||(n.exposed={});w&&n.render===ri&&(n.render=w),L!=null&&(n.inheritAttrs=L),F&&(n.components=F),q&&(n.directives=q),A&&ym(n)}function N_(n,t,e=ri){Zt(n)&&(n=kc(n));for(const i in n){const s=n[i];let r;me(s)?"default"in s?r=Da(s.from||i,s.default,!0):r=Da(s.from||i):r=Da(s),Ke(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function vf(n,t,e){ci(Zt(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function Rm(n,t,e,i){let s=i.includes(".")?Sm(e,i):()=>e[i];if(Ue(n)){const r=t[n];ee(r)&&Nl(s,r)}else if(ee(n))Nl(s,n.bind(e));else if(me(n))if(Zt(n))n.forEach(r=>Rm(r,t,e,i));else{const r=ee(n.handler)?n.handler.bind(e):t[n.handler];ee(r)&&Nl(s,r,n)}}function Cm(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>Za(l,c,o,!0)),Za(l,t,o)),me(t)&&r.set(t,l),l}function Za(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&Za(n,r,e,!0),s&&s.forEach(o=>Za(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=U_[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const U_={data:Mf,props:Sf,emits:Sf,methods:Qr,computed:Qr,beforeCreate:tn,created:tn,beforeMount:tn,mounted:tn,beforeUpdate:tn,updated:tn,beforeDestroy:tn,beforeUnmount:tn,destroyed:tn,unmounted:tn,activated:tn,deactivated:tn,errorCaptured:tn,serverPrefetch:tn,components:Qr,directives:Qr,watch:O_,provide:Mf,inject:F_};function Mf(n,t){return t?n?function(){return Je(ee(n)?n.call(this,this):n,ee(t)?t.call(this,this):t)}:t:n}function F_(n,t){return Qr(kc(n),kc(t))}function kc(n){if(Zt(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function tn(n,t){return n?[...new Set([].concat(n,t))]:t}function Qr(n,t){return n?Je(Object.create(null),n,t):t}function Sf(n,t){return n?Zt(n)&&Zt(t)?[...new Set([...n,...t])]:Je(Object.create(null),xf(n),xf(t??{})):t}function O_(n,t){if(!n)return t;if(!t)return n;const e=Je(Object.create(null),n);for(const i in t)e[i]=tn(n[i],t[i]);return e}function Pm(){return{app:null,config:{isNativeTag:Wp,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let B_=0;function z_(n,t){return function(i,s=null){ee(i)||(i=Je({},i)),s!=null&&!me(s)&&(s=null);const r=Pm(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:B_++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:Mx,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&ee(u.install)?(o.add(u),u.install(c,...h)):ee(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!l){const d=c._ceVNode||Cn(i,s);return d.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(d,u,f),l=!0,c._container=u,u.__vue_app__=c,Eh(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(ci(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=_r;_r=c;try{return u()}finally{_r=h}}};return c}}let _r=null;const H_=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${Bn(t)}Modifiers`]||n[`${Ds(t)}Modifiers`];function G_(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||be;let s=e;const r=t.startsWith("update:"),o=r&&H_(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>Ue(u)?u.trim():u)),o.number&&(s=e.map(Eg)));let a,l=i[a=Rl(t)]||i[a=Rl(Bn(t))];!l&&r&&(l=i[a=Rl(Ds(t))]),l&&ci(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,ci(c,n,6,s)}}const V_=new WeakMap;function Lm(n,t,e=!1){const i=e?V_:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!ee(n)){const l=c=>{const u=Lm(c,t,!0);u&&(a=!0,Je(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(me(n)&&i.set(n,null),null):(Zt(r)?r.forEach(l=>o[l]=null):Je(o,r),me(n)&&i.set(n,o),o)}function vl(n,t){return!n||!dl(t)?!1:(t=t.slice(2).replace(/Once$/,""),ue(n,t[0].toLowerCase()+t.slice(1))||ue(n,Ds(t))||ue(n,t))}function yf(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:d,ctx:g,inheritAttrs:_}=n,m=$a(n);let p,S;try{if(e.shapeFlag&4){const v=s||i,w=v;p=ti(c.call(w,v,u,h,d,f,g)),S=a}else{const v=t;p=ti(v.length>1?v(h,{attrs:a,slots:o,emit:l}):v(h,null)),S=t.props?a:k_(a)}}catch(v){uo.length=0,_l(v,n,1),p=Cn(rs)}let b=p;if(S&&_!==!1){const v=Object.keys(S),{shapeFlag:w}=b;v.length&&w&7&&(r&&v.some(rh)&&(S=W_(S,r)),b=Tr(b,S,!1,!0))}return e.dirs&&(b=Tr(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(e.dirs):e.dirs),e.transition&&Mh(b,e.transition),p=b,$a(m),p}const k_=n=>{let t;for(const e in n)(e==="class"||e==="style"||dl(e))&&((t||(t={}))[e]=n[e]);return t},W_=(n,t)=>{const e={};for(const i in n)(!rh(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function X_(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?bf(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(Dm(o,i,f)&&!vl(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?bf(i,o,c):!0:!!o;return!1}function bf(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(Dm(t,n,r)&&!vl(e,r))return!0}return!1}function Dm(n,t,e){const i=n[e],s=t[e];return e==="style"&&me(i)&&me(s)?!uh(i,s):i!==s}function Y_({vnode:n,parent:t},e){for(;t;){const i=t.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=t.vnode).el=e,t=t.parent;else break}}const Im={},Nm=()=>Object.create(Im),Um=n=>Object.getPrototypeOf(n)===Im;function q_(n,t,e,i=!1){const s={},r=Nm();n.propsDefaults=Object.create(null),Fm(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:jg(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function $_(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=ce(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(vl(n.emitsOptions,f))continue;const d=t[f];if(l)if(ue(r,f))d!==r[f]&&(r[f]=d,c=!0);else{const g=Bn(f);s[g]=Wc(l,a,g,d,n,!1)}else d!==r[f]&&(r[f]=d,c=!0)}}}else{Fm(n,t,s,r)&&(c=!0);let u;for(const h in a)(!t||!ue(t,h)&&((u=Ds(h))===h||!ue(t,u)))&&(l?e&&(e[h]!==void 0||e[u]!==void 0)&&(s[h]=Wc(l,a,h,void 0,n,!0)):delete s[h]);if(r!==a)for(const h in r)(!t||!ue(t,h))&&(delete r[h],c=!0)}c&&wi(n.attrs,"set","")}function Fm(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(so(l))continue;const c=t[l];let u;s&&ue(s,u=Bn(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:vl(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=ce(e),c=a||be;for(let u=0;u<r.length;u++){const h=r[u];e[h]=Wc(s,l,h,c[h],n,!ue(c,h))}}return o}function Wc(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=ue(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&ee(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=No(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===Ds(e))&&(i=!0))}return i}const K_=new WeakMap;function Om(n,t,e=!1){const i=e?K_:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!ee(n)){const u=h=>{l=!0;const[f,d]=Om(h,t,!0);Je(o,f),d&&a.push(...d)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return me(n)&&i.set(n,pr),pr;if(Zt(r))for(let u=0;u<r.length;u++){const h=Bn(r[u]);Ef(h)&&(o[h]=be)}else if(r)for(const u in r){const h=Bn(u);if(Ef(h)){const f=r[u],d=o[h]=Zt(f)||ee(f)?{type:f}:Je({},f),g=d.type;let _=!1,m=!0;if(Zt(g))for(let p=0;p<g.length;++p){const S=g[p],b=ee(S)&&S.name;if(b==="Boolean"){_=!0;break}else b==="String"&&(m=!1)}else _=ee(g)&&g.name==="Boolean";d[0]=_,d[1]=m,(_||ue(d,"default"))&&a.push(h)}}const c=[o,a];return me(n)&&i.set(n,c),c}function Ef(n){return n[0]!=="$"&&!so(n)}const Sh=n=>n==="_"||n==="_ctx"||n==="$stable",yh=n=>Zt(n)?n.map(ti):[ti(n)],Z_=(n,t,e)=>{if(t._n)return t;const i=f_((...s)=>yh(t(...s)),e);return i._c=!1,i},Bm=(n,t,e)=>{const i=n._ctx;for(const s in n){if(Sh(s))continue;const r=n[s];if(ee(r))t[s]=Z_(s,r,i);else if(r!=null){const o=yh(r);t[s]=()=>o}}},zm=(n,t)=>{const e=yh(t);n.slots.default=()=>e},Hm=(n,t,e)=>{for(const i in t)(e||!Sh(i))&&(n[i]=t[i])},J_=(n,t,e)=>{const i=n.slots=Nm();if(n.vnode.shapeFlag&32){const s=t._;s?(Hm(i,t,e),e&&Zp(i,"_",s,!0)):Bm(t,i)}else t&&zm(n,t)},j_=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=be;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:Hm(s,t,e):(r=!t.$stable,Bm(t,s)),o=t}else t&&(zm(n,t),o={default:1});if(r)for(const a in s)!Sh(a)&&o[a]==null&&delete s[a]},ln=ix;function Q_(n){return tx(n)}function tx(n,t){const e=ml();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:d=ri,insertStaticContent:g}=n,_=(P,D,Y,et=null,j=null,st=null,ft=void 0,ct=null,lt=!!D.dynamicChildren)=>{if(P===D)return;P&&!Or(P,D)&&(et=mt(P),Mt(P,j,st,!0),P=null),D.patchFlag===-2&&(lt=!1,D.dynamicChildren=null);const{type:nt,ref:Ct,shapeFlag:C}=D;switch(nt){case Ml:m(P,D,Y,et);break;case rs:p(P,D,Y,et);break;case Ia:P==null&&S(D,Y,et,ft);break;case Qn:F(P,D,Y,et,j,st,ft,ct,lt);break;default:C&1?w(P,D,Y,et,j,st,ft,ct,lt):C&6?q(P,D,Y,et,j,st,ft,ct,lt):(C&64||C&128)&&nt.process(P,D,Y,et,j,st,ft,ct,lt,$t)}Ct!=null&&j?ao(Ct,P&&P.ref,st,D||P,!D):Ct==null&&P&&P.ref!=null&&ao(P.ref,null,st,P,!0)},m=(P,D,Y,et)=>{if(P==null)i(D.el=a(D.children),Y,et);else{const j=D.el=P.el;D.children!==P.children&&c(j,D.children)}},p=(P,D,Y,et)=>{P==null?i(D.el=l(D.children||""),Y,et):D.el=P.el},S=(P,D,Y,et)=>{[P.el,P.anchor]=g(P.children,D,Y,et,P.el,P.anchor)},b=({el:P,anchor:D},Y,et)=>{let j;for(;P&&P!==D;)j=f(P),i(P,Y,et),P=j;i(D,Y,et)},v=({el:P,anchor:D})=>{let Y;for(;P&&P!==D;)Y=f(P),s(P),P=Y;s(D)},w=(P,D,Y,et,j,st,ft,ct,lt)=>{if(D.type==="svg"?ft="svg":D.type==="math"&&(ft="mathml"),P==null)E(D,Y,et,j,st,ft,ct,lt);else{const nt=P.el&&P.el._isVueCE?P.el:null;try{nt&&nt._beginPatch(),A(P,D,j,st,ft,ct,lt)}finally{nt&&nt._endPatch()}}},E=(P,D,Y,et,j,st,ft,ct)=>{let lt,nt;const{props:Ct,shapeFlag:C,transition:Lt,dirs:Et}=P;if(lt=P.el=o(P.type,st,Ct&&Ct.is,Ct),C&8?u(lt,P.children):C&16&&M(P.children,lt,null,et,j,Fl(P,st),ft,ct),Et&&cs(P,null,et,"created"),R(lt,P,P.scopeId,ft,et),Ct){for(const x in Ct)x!=="value"&&!so(x)&&r(lt,x,null,Ct[x],st,et);"value"in Ct&&r(lt,"value",null,Ct.value,st),(nt=Ct.onVnodeBeforeMount)&&qn(nt,et,P)}Et&&cs(P,null,et,"beforeMount");const T=ex(j,Lt);T&&Lt.beforeEnter(lt),i(lt,D,Y),((nt=Ct&&Ct.onVnodeMounted)||T||Et)&&ln(()=>{nt&&qn(nt,et,P),T&&Lt.enter(lt),Et&&cs(P,null,et,"mounted")},j)},R=(P,D,Y,et,j)=>{if(Y&&d(P,Y),et)for(let st=0;st<et.length;st++)d(P,et[st]);if(j){let st=j.subTree;if(D===st||Wm(st.type)&&(st.ssContent===D||st.ssFallback===D)){const ft=j.vnode;R(P,ft,ft.scopeId,ft.slotScopeIds,j.parent)}}},M=(P,D,Y,et,j,st,ft,ct,lt=0)=>{for(let nt=lt;nt<P.length;nt++){const Ct=P[nt]=ct?Ti(P[nt]):ti(P[nt]);_(null,Ct,D,Y,et,j,st,ft,ct)}},A=(P,D,Y,et,j,st,ft)=>{const ct=D.el=P.el;let{patchFlag:lt,dynamicChildren:nt,dirs:Ct}=D;lt|=P.patchFlag&16;const C=P.props||be,Lt=D.props||be;let Et;if(Y&&us(Y,!1),(Et=Lt.onVnodeBeforeUpdate)&&qn(Et,Y,D,P),Ct&&cs(D,P,Y,"beforeUpdate"),Y&&us(Y,!0),(C.innerHTML&&Lt.innerHTML==null||C.textContent&&Lt.textContent==null)&&u(ct,""),nt?N(P.dynamicChildren,nt,ct,Y,et,Fl(D,j),st):ft||k(P,D,ct,null,Y,et,Fl(D,j),st,!1),lt>0){if(lt&16)L(ct,C,Lt,Y,j);else if(lt&2&&C.class!==Lt.class&&r(ct,"class",null,Lt.class,j),lt&4&&r(ct,"style",C.style,Lt.style,j),lt&8){const T=D.dynamicProps;for(let x=0;x<T.length;x++){const O=T[x],V=C[O],K=Lt[O];(K!==V||O==="value")&&r(ct,O,V,K,j,Y)}}lt&1&&P.children!==D.children&&u(ct,D.children)}else!ft&&nt==null&&L(ct,C,Lt,Y,j);((Et=Lt.onVnodeUpdated)||Ct)&&ln(()=>{Et&&qn(Et,Y,D,P),Ct&&cs(D,P,Y,"updated")},et)},N=(P,D,Y,et,j,st,ft)=>{for(let ct=0;ct<D.length;ct++){const lt=P[ct],nt=D[ct],Ct=lt.el&&(lt.type===Qn||!Or(lt,nt)||lt.shapeFlag&198)?h(lt.el):Y;_(lt,nt,Ct,null,et,j,st,ft,!0)}},L=(P,D,Y,et,j)=>{if(D!==Y){if(D!==be)for(const st in D)!so(st)&&!(st in Y)&&r(P,st,D[st],null,j,et);for(const st in Y){if(so(st))continue;const ft=Y[st],ct=D[st];ft!==ct&&st!=="value"&&r(P,st,ct,ft,j,et)}"value"in Y&&r(P,"value",D.value,Y.value,j)}},F=(P,D,Y,et,j,st,ft,ct,lt)=>{const nt=D.el=P?P.el:a(""),Ct=D.anchor=P?P.anchor:a("");let{patchFlag:C,dynamicChildren:Lt,slotScopeIds:Et}=D;Et&&(ct=ct?ct.concat(Et):Et),P==null?(i(nt,Y,et),i(Ct,Y,et),M(D.children||[],Y,Ct,j,st,ft,ct,lt)):C>0&&C&64&&Lt&&P.dynamicChildren&&P.dynamicChildren.length===Lt.length?(N(P.dynamicChildren,Lt,Y,j,st,ft,ct),(D.key!=null||j&&D===j.subTree)&&Gm(P,D,!0)):k(P,D,Y,Ct,j,st,ft,ct,lt)},q=(P,D,Y,et,j,st,ft,ct,lt)=>{D.slotScopeIds=ct,P==null?D.shapeFlag&512?j.ctx.activate(D,Y,et,ft,lt):Z(D,Y,et,j,st,ft,lt):G(P,D,lt)},Z=(P,D,Y,et,j,st,ft)=>{const ct=P.component=fx(P,et,j);if(bm(P)&&(ct.ctx.renderer=$t),px(ct,!1,ft),ct.asyncDep){if(j&&j.registerDep(ct,B,ft),!P.el){const lt=ct.subTree=Cn(rs);p(null,lt,D,Y),P.placeholder=lt.el}}else B(ct,P,D,Y,j,st,ft)},G=(P,D,Y)=>{const et=D.component=P.component;if(X_(P,D,Y))if(et.asyncDep&&!et.asyncResolved){U(et,D,Y);return}else et.next=D,et.update();else D.el=P.el,et.vnode=D},B=(P,D,Y,et,j,st,ft)=>{const ct=()=>{if(P.isMounted){let{next:C,bu:Lt,u:Et,parent:T,vnode:x}=P;{const pt=Vm(P);if(pt){C&&(C.el=x.el,U(P,C,ft)),pt.asyncDep.then(()=>{ln(()=>{P.isUnmounted||nt()},j)});return}}let O=C,V;us(P,!1),C?(C.el=x.el,U(P,C,ft)):C=x,Lt&&Cl(Lt),(V=C.props&&C.props.onVnodeBeforeUpdate)&&qn(V,T,C,x),us(P,!0);const K=yf(P),ut=P.subTree;P.subTree=K,_(ut,K,h(ut.el),mt(ut),P,j,st),C.el=K.el,O===null&&Y_(P,K.el),Et&&ln(Et,j),(V=C.props&&C.props.onVnodeUpdated)&&ln(()=>qn(V,T,C,x),j)}else{let C;const{el:Lt,props:Et}=D,{bm:T,m:x,parent:O,root:V,type:K}=P,ut=lo(D);us(P,!1),T&&Cl(T),!ut&&(C=Et&&Et.onVnodeBeforeMount)&&qn(C,O,D),us(P,!0);{V.ce&&V.ce._hasShadowRoot()&&V.ce._injectChildStyle(K,P.parent?P.parent.type:void 0);const pt=P.subTree=yf(P);_(null,pt,Y,et,P,j,st),D.el=pt.el}if(x&&ln(x,j),!ut&&(C=Et&&Et.onVnodeMounted)){const pt=D;ln(()=>qn(C,O,pt),j)}(D.shapeFlag&256||O&&lo(O.vnode)&&O.vnode.shapeFlag&256)&&P.a&&ln(P.a,j),P.isMounted=!0,D=Y=et=null}};P.scope.on();const lt=P.effect=new tm(ct);P.scope.off();const nt=P.update=lt.run.bind(lt),Ct=P.job=lt.runIfDirty.bind(lt);Ct.i=P,Ct.id=P.uid,lt.scheduler=()=>vh(Ct),us(P,!0),nt()},U=(P,D,Y)=>{D.component=P;const et=P.vnode.props;P.vnode=D,P.next=null,$_(P,D.props,et,Y),j_(P,D.children,Y),Li(),mf(P),Di()},k=(P,D,Y,et,j,st,ft,ct,lt=!1)=>{const nt=P&&P.children,Ct=P?P.shapeFlag:0,C=D.children,{patchFlag:Lt,shapeFlag:Et}=D;if(Lt>0){if(Lt&128){at(nt,C,Y,et,j,st,ft,ct,lt);return}else if(Lt&256){J(nt,C,Y,et,j,st,ft,ct,lt);return}}Et&8?(Ct&16&&tt(nt,j,st),C!==nt&&u(Y,C)):Ct&16?Et&16?at(nt,C,Y,et,j,st,ft,ct,lt):tt(nt,j,st,!0):(Ct&8&&u(Y,""),Et&16&&M(C,Y,et,j,st,ft,ct,lt))},J=(P,D,Y,et,j,st,ft,ct,lt)=>{P=P||pr,D=D||pr;const nt=P.length,Ct=D.length,C=Math.min(nt,Ct);let Lt;for(Lt=0;Lt<C;Lt++){const Et=D[Lt]=lt?Ti(D[Lt]):ti(D[Lt]);_(P[Lt],Et,Y,null,j,st,ft,ct,lt)}nt>Ct?tt(P,j,st,!0,!1,C):M(D,Y,et,j,st,ft,ct,lt,C)},at=(P,D,Y,et,j,st,ft,ct,lt)=>{let nt=0;const Ct=D.length;let C=P.length-1,Lt=Ct-1;for(;nt<=C&&nt<=Lt;){const Et=P[nt],T=D[nt]=lt?Ti(D[nt]):ti(D[nt]);if(Or(Et,T))_(Et,T,Y,null,j,st,ft,ct,lt);else break;nt++}for(;nt<=C&&nt<=Lt;){const Et=P[C],T=D[Lt]=lt?Ti(D[Lt]):ti(D[Lt]);if(Or(Et,T))_(Et,T,Y,null,j,st,ft,ct,lt);else break;C--,Lt--}if(nt>C){if(nt<=Lt){const Et=Lt+1,T=Et<Ct?D[Et].el:et;for(;nt<=Lt;)_(null,D[nt]=lt?Ti(D[nt]):ti(D[nt]),Y,T,j,st,ft,ct,lt),nt++}}else if(nt>Lt)for(;nt<=C;)Mt(P[nt],j,st,!0),nt++;else{const Et=nt,T=nt,x=new Map;for(nt=T;nt<=Lt;nt++){const dt=D[nt]=lt?Ti(D[nt]):ti(D[nt]);dt.key!=null&&x.set(dt.key,nt)}let O,V=0;const K=Lt-T+1;let ut=!1,pt=0;const Q=new Array(K);for(nt=0;nt<K;nt++)Q[nt]=0;for(nt=Et;nt<=C;nt++){const dt=P[nt];if(V>=K){Mt(dt,j,st,!0);continue}let Dt;if(dt.key!=null)Dt=x.get(dt.key);else for(O=T;O<=Lt;O++)if(Q[O-T]===0&&Or(dt,D[O])){Dt=O;break}Dt===void 0?Mt(dt,j,st,!0):(Q[Dt-T]=nt+1,Dt>=pt?pt=Dt:ut=!0,_(dt,D[Dt],Y,null,j,st,ft,ct,lt),V++)}const it=ut?nx(Q):pr;for(O=it.length-1,nt=K-1;nt>=0;nt--){const dt=T+nt,Dt=D[dt],St=D[dt+1],xt=dt+1<Ct?St.el||km(St):et;Q[nt]===0?_(null,Dt,Y,xt,j,st,ft,ct,lt):ut&&(O<0||nt!==it[O]?_t(Dt,Y,xt,2):O--)}}},_t=(P,D,Y,et,j=null)=>{const{el:st,type:ft,transition:ct,children:lt,shapeFlag:nt}=P;if(nt&6){_t(P.component.subTree,D,Y,et);return}if(nt&128){P.suspense.move(D,Y,et);return}if(nt&64){ft.move(P,D,Y,$t);return}if(ft===Qn){i(st,D,Y);for(let C=0;C<lt.length;C++)_t(lt[C],D,Y,et);i(P.anchor,D,Y);return}if(ft===Ia){b(P,D,Y);return}if(et!==2&&nt&1&&ct)if(et===0)ct.beforeEnter(st),i(st,D,Y),ln(()=>ct.enter(st),j);else{const{leave:C,delayLeave:Lt,afterLeave:Et}=ct,T=()=>{P.ctx.isUnmounted?s(st):i(st,D,Y)},x=()=>{st._isLeaving&&st[v_](!0),C(st,()=>{T(),Et&&Et()})};Lt?Lt(st,T,x):x()}else i(st,D,Y)},Mt=(P,D,Y,et=!1,j=!1)=>{const{type:st,props:ft,ref:ct,children:lt,dynamicChildren:nt,shapeFlag:Ct,patchFlag:C,dirs:Lt,cacheIndex:Et}=P;if(C===-2&&(j=!1),ct!=null&&(Li(),ao(ct,null,Y,P,!0),Di()),Et!=null&&(D.renderCache[Et]=void 0),Ct&256){D.ctx.deactivate(P);return}const T=Ct&1&&Lt,x=!lo(P);let O;if(x&&(O=ft&&ft.onVnodeBeforeUnmount)&&qn(O,D,P),Ct&6)Yt(P.component,Y,et);else{if(Ct&128){P.suspense.unmount(Y,et);return}T&&cs(P,null,D,"beforeUnmount"),Ct&64?P.type.remove(P,D,Y,$t,et):nt&&!nt.hasOnce&&(st!==Qn||C>0&&C&64)?tt(nt,D,Y,!1,!0):(st===Qn&&C&384||!j&&Ct&16)&&tt(lt,D,Y),et&&ie(P)}(x&&(O=ft&&ft.onVnodeUnmounted)||T)&&ln(()=>{O&&qn(O,D,P),T&&cs(P,null,D,"unmounted")},Y)},ie=P=>{const{type:D,el:Y,anchor:et,transition:j}=P;if(D===Qn){ve(Y,et);return}if(D===Ia){v(P);return}const st=()=>{s(Y),j&&!j.persisted&&j.afterLeave&&j.afterLeave()};if(P.shapeFlag&1&&j&&!j.persisted){const{leave:ft,delayLeave:ct}=j,lt=()=>ft(Y,st);ct?ct(P.el,st,lt):lt()}else st()},ve=(P,D)=>{let Y;for(;P!==D;)Y=f(P),s(P),P=Y;s(D)},Yt=(P,D,Y)=>{const{bum:et,scope:j,job:st,subTree:ft,um:ct,m:lt,a:nt}=P;Tf(lt),Tf(nt),et&&Cl(et),j.stop(),st&&(st.flags|=8,Mt(ft,P,D,Y)),ct&&ln(ct,D),ln(()=>{P.isUnmounted=!0},D)},tt=(P,D,Y,et=!1,j=!1,st=0)=>{for(let ft=st;ft<P.length;ft++)Mt(P[ft],D,Y,et,j)},mt=P=>{if(P.shapeFlag&6)return mt(P.component.subTree);if(P.shapeFlag&128)return P.suspense.next();const D=f(P.anchor||P.el),Y=D&&D[__];return Y?f(Y):D};let ht=!1;const qt=(P,D,Y)=>{let et;P==null?D._vnode&&(Mt(D._vnode,null,null,!0),et=D._vnode.component):_(D._vnode||null,P,D,null,null,null,Y),D._vnode=P,ht||(ht=!0,mf(et),_m(),ht=!1)},$t={p:_,um:Mt,m:_t,r:ie,mt:Z,mc:M,pc:k,pbc:N,n:mt,o:n};return{render:qt,hydrate:void 0,createApp:z_(qt)}}function Fl({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function us({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function ex(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function Gm(n,t,e=!1){const i=n.children,s=t.children;if(Zt(i)&&Zt(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=Ti(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&Gm(o,a)),a.type===Ml&&(a.patchFlag===-1&&(a=s[r]=Ti(a)),a.el=o.el),a.type===rs&&!a.el&&(a.el=o.el)}}function nx(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function Vm(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Vm(t)}function Tf(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}function km(n){if(n.placeholder)return n.placeholder;const t=n.component;return t?km(t.subTree):null}const Wm=n=>n.__isSuspense;function ix(n,t){t&&t.pendingBranch?Zt(n)?t.effects.push(...n):t.effects.push(n):h_(n)}const Qn=Symbol.for("v-fgt"),Ml=Symbol.for("v-txt"),rs=Symbol.for("v-cmt"),Ia=Symbol.for("v-stc"),uo=[];let Sn=null;function Nn(n=!1){uo.push(Sn=n?null:[])}function sx(){uo.pop(),Sn=uo[uo.length-1]||null}let Mo=1;function wf(n,t=!1){Mo+=n,n<0&&Sn&&t&&(Sn.hasOnce=!0)}function Xm(n){return n.dynamicChildren=Mo>0?Sn||pr:null,sx(),Mo>0&&Sn&&Sn.push(n),n}function Ai(n,t,e,i,s,r){return Xm(Ye(n,t,e,i,s,r,!0))}function Ym(n,t,e,i,s){return Xm(Cn(n,t,e,i,s,!0))}function qm(n){return n?n.__v_isVNode===!0:!1}function Or(n,t){return n.type===t.type&&n.key===t.key}const $m=({key:n})=>n??null,Na=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?Ue(n)||Ke(n)||ee(n)?{i:ii,r:n,k:t,f:!!e}:n:null);function Ye(n,t=null,e=null,i=0,s=null,r=n===Qn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&$m(t),ref:t&&Na(t),scopeId:vm,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:ii};return a?(bh(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=Ue(e)?8:16),Mo>0&&!o&&Sn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&Sn.push(l),l}const Cn=rx;function rx(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===P_)&&(n=rs),qm(n)){const a=Tr(n,t,!0);return e&&bh(a,e),Mo>0&&!r&&Sn&&(a.shapeFlag&6?Sn[Sn.indexOf(n)]=a:Sn.push(a)),a.patchFlag=-2,a}if(xx(n)&&(n=n.__vccOpts),t){t=ox(t);let{class:a,style:l}=t;a&&!Ue(a)&&(t.class=ch(a)),me(l)&&(xh(l)&&!Zt(l)&&(l=Je({},l)),t.style=lh(l))}const o=Ue(n)?1:Wm(n)?128:x_(n)?64:me(n)?4:ee(n)?2:0;return Ye(n,t,e,i,s,o,r,!0)}function ox(n){return n?xh(n)||Um(n)?Je({},n):n:null}function Tr(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?cx(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&$m(c),ref:t&&t.ref?e&&r?Zt(r)?r.concat(Na(t)):[r,Na(t)]:Na(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==Qn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Tr(n.ssContent),ssFallback:n.ssFallback&&Tr(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&Mh(u,l.clone(u)),u}function Km(n=" ",t=0){return Cn(Ml,null,n,t)}function ax(n,t){const e=Cn(Ia,null,n);return e.staticCount=t,e}function lx(n="",t=!1){return t?(Nn(),Ym(rs,null,n)):Cn(rs,null,n)}function ti(n){return n==null||typeof n=="boolean"?Cn(rs):Zt(n)?Cn(Qn,null,n.slice()):qm(n)?Ti(n):Cn(Ml,null,String(n))}function Ti(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Tr(n)}function bh(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Zt(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),bh(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!Um(t)?t._ctx=ii:s===3&&ii&&(ii.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else ee(t)?(t={default:t,_ctx:ii},e=32):(t=String(t),i&64?(e=16,t=[Km(t)]):e=8);n.children=t,n.shapeFlag|=e}function cx(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=ch([t.class,i.class]));else if(s==="style")t.style=lh([t.style,i.style]);else if(dl(s)){const r=t[s],o=i[s];o&&r!==o&&!(Zt(r)&&r.includes(o))&&(t[s]=r?[].concat(r,o):o)}else s!==""&&(t[s]=i[s])}return t}function qn(n,t,e,i=null){ci(n,t,7,[e,i])}const ux=Pm();let hx=0;function fx(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||ux,r={uid:hx++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Dg(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Om(i,s),emitsOptions:Lm(i,s),emit:null,emitted:null,propsDefaults:be,inheritAttrs:i.inheritAttrs,ctx:be,data:be,props:be,attrs:be,slots:be,refs:be,setupState:be,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=G_.bind(null,r),n.ce&&n.ce(r),r}let sn=null;const dx=()=>sn||ii;let Ja,Xc;{const n=ml(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};Ja=t("__VUE_INSTANCE_SETTERS__",e=>sn=e),Xc=t("__VUE_SSR_SETTERS__",e=>So=e)}const No=n=>{const t=sn;return Ja(n),n.scope.on(),()=>{n.scope.off(),Ja(t)}},Af=()=>{sn&&sn.scope.off(),Ja(null)};function Zm(n){return n.vnode.shapeFlag&4}let So=!1;function px(n,t=!1,e=!1){t&&Xc(t);const{props:i,children:s}=n.vnode,r=Zm(n);q_(n,i,r,t),J_(n,s,e||t);const o=r?mx(n,t):void 0;return t&&Xc(!1),o}function mx(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,D_);const{setup:i}=e;if(i){Li();const s=n.setupContext=i.length>1?_x(n):null,r=No(n),o=Io(i,n,0,[n.props,s]),a=Yp(o);if(Di(),r(),(a||n.sp)&&!lo(n)&&ym(n),a){if(o.then(Af,Af),t)return o.then(l=>{Rf(n,l)}).catch(l=>{_l(l,n,0)});n.asyncDep=o}else Rf(n,o)}else Jm(n)}function Rf(n,t,e){ee(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:me(t)&&(n.setupState=pm(t)),Jm(n)}function Jm(n,t,e){const i=n.type;n.render||(n.render=i.render||ri);{const s=No(n);Li();try{I_(n)}finally{Di(),s()}}}const gx={get(n,t){return qe(n,"get",""),n[t]}};function _x(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,gx),slots:n.slots,emit:n.emit,expose:t}}function Eh(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(pm(Qg(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in co)return co[e](n)},has(t,e){return e in t||e in co}})):n.proxy}function xx(n){return ee(n)&&"__vccOpts"in n}const vx=(n,t)=>r_(n,t,So),Mx="3.5.30";/**
* @vue/runtime-dom v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Yc;const Cf=typeof window<"u"&&window.trustedTypes;if(Cf)try{Yc=Cf.createPolicy("vue",{createHTML:n=>n})}catch{}const jm=Yc?n=>Yc.createHTML(n):n=>n,Sx="http://www.w3.org/2000/svg",yx="http://www.w3.org/1998/Math/MathML",Ei=typeof document<"u"?document:null,Pf=Ei&&Ei.createElement("template"),bx={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?Ei.createElementNS(Sx,n):t==="mathml"?Ei.createElementNS(yx,n):e?Ei.createElement(n,{is:e}):Ei.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>Ei.createTextNode(n),createComment:n=>Ei.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Ei.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{Pf.innerHTML=jm(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=Pf.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},Ex=Symbol("_vtc");function Tx(n,t,e){const i=n[Ex];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const Lf=Symbol("_vod"),wx=Symbol("_vsh"),Ax=Symbol(""),Rx=/(?:^|;)\s*display\s*:/;function Cx(n,t,e){const i=n.style,s=Ue(e);let r=!1;if(e&&!s){if(t)if(Ue(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&Ua(i,a,"")}else for(const o in t)e[o]==null&&Ua(i,o,"");for(const o in e)o==="display"&&(r=!0),Ua(i,o,e[o])}else if(s){if(t!==e){const o=i[Ax];o&&(e+=";"+o),i.cssText=e,r=Rx.test(e)}}else t&&n.removeAttribute("style");Lf in n&&(n[Lf]=r?i.display:"",n[wx]&&(i.display="none"))}const Df=/\s*!important$/;function Ua(n,t,e){if(Zt(e))e.forEach(i=>Ua(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))n.setProperty(t,e);else{const i=Px(n,t);Df.test(e)?n.setProperty(Ds(i),e.replace(Df,""),"important"):n[i]=e}}const If=["Webkit","Moz","ms"],Ol={};function Px(n,t){const e=Ol[t];if(e)return e;let i=Bn(t);if(i!=="filter"&&i in n)return Ol[t]=i;i=Kp(i);for(let s=0;s<If.length;s++){const r=If[s]+i;if(r in n)return Ol[t]=r}return t}const Nf="http://www.w3.org/1999/xlink";function Uf(n,t,e,i,s,r=Pg(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(Nf,t.slice(6,t.length)):n.setAttributeNS(Nf,t,e):e==null||r&&!Jp(e)?n.removeAttribute(t):n.setAttribute(t,r?"":li(e)?String(e):e)}function Ff(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?jm(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=Jp(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function Lx(n,t,e,i){n.addEventListener(t,e,i)}function Dx(n,t,e,i){n.removeEventListener(t,e,i)}const Of=Symbol("_vei");function Ix(n,t,e,i,s=null){const r=n[Of]||(n[Of]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=Nx(t);if(i){const c=r[t]=Ox(i,s);Lx(n,a,c,l)}else o&&(Dx(n,a,o,l),r[t]=void 0)}}const Bf=/(?:Once|Passive|Capture)$/;function Nx(n){let t;if(Bf.test(n)){t={};let i;for(;i=n.match(Bf);)n=n.slice(0,n.length-i[0].length),t[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Ds(n.slice(2)),t]}let Bl=0;const Ux=Promise.resolve(),Fx=()=>Bl||(Ux.then(()=>Bl=0),Bl=Date.now());function Ox(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;ci(Bx(i,e.value),t,5,[i])};return e.value=n,e.attached=Fx(),e}function Bx(n,t){if(Zt(t)){const e=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{e.call(n),n._stopped=!0},t.map(i=>s=>!s._stopped&&i&&i(s))}else return t}const zf=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,zx=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?Tx(n,i,o):t==="style"?Cx(n,e,i):dl(t)?rh(t)||Ix(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Hx(n,t,i,o))?(Ff(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Uf(n,t,i,o,r,t!=="value")):n._isVueCE&&(Gx(n,t)||n._def.__asyncLoader&&(/[A-Z]/.test(t)||!Ue(i)))?Ff(n,Bn(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),Uf(n,t,i,o))};function Hx(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&zf(t)&&ee(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&n.tagName==="IFRAME"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return zf(t)&&Ue(e)?!1:t in n}function Gx(n,t){const e=n._def.props;if(!e)return!1;const i=Bn(t);return Array.isArray(e)?e.some(s=>Bn(s)===i):Object.keys(e).some(s=>Bn(s)===i)}const Vx=Je({patchProp:zx},bx);let Hf;function kx(){return Hf||(Hf=Q_(Vx))}const Wx=((...n)=>{const t=kx().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=Yx(i);if(!s)return;const r=t._component;!ee(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,Xx(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function Xx(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Yx(n){return Ue(n)?document.querySelector(n):n}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Th="185",xr={ROTATE:0,DOLLY:1,PAN:2},is={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},qx=0,Gf=1,$x=2,Fa=1,Kx=2,to=3,os=0,hn=1,Oe=2,Ci=0,vr=1,ja=2,Vf=3,kf=4,Zx=5,xs=100,Jx=101,jx=102,Qx=103,tv=104,ev=200,nv=201,iv=202,sv=203,qc=204,$c=205,rv=206,ov=207,av=208,lv=209,cv=210,uv=211,hv=212,fv=213,dv=214,Kc=0,Zc=1,Jc=2,wr=3,jc=4,Qc=5,tu=6,eu=7,wh=0,pv=1,mv=2,Hn=0,Qm=1,t0=2,e0=3,n0=4,i0=5,s0=6,r0=7,o0=300,As=301,Ar=302,Oa=303,zl=304,Sl=306,nu=1e3,Ri=1001,iu=1002,Ve=1003,gv=1004,Ho=1005,$e=1006,Hl=1007,Ms=1008,xn=1009,a0=1010,l0=1011,yo=1012,Ah=1013,ui=1014,Fn=1015,Ni=1016,Rh=1017,Ch=1018,bo=1020,c0=35902,u0=35899,h0=1021,f0=1022,On=1023,Ui=1026,Ss=1027,Ph=1028,Lh=1029,Rs=1030,Dh=1031,Ih=1033,Ba=33776,za=33777,Ha=33778,Ga=33779,su=35840,ru=35841,ou=35842,au=35843,lu=36196,cu=37492,uu=37496,hu=37488,fu=37489,Qa=37490,du=37491,pu=37808,mu=37809,gu=37810,_u=37811,xu=37812,vu=37813,Mu=37814,Su=37815,yu=37816,bu=37817,Eu=37818,Tu=37819,wu=37820,Au=37821,Ru=36492,Cu=36494,Pu=36495,Lu=36283,Du=36284,tl=36285,Iu=36286,_v=3200,Nu=0,xv=1,ns="",Ee="srgb",el="srgb-linear",nl="linear",he="srgb",zs=7680,Wf=519,vv=512,Mv=513,Sv=514,Nh=515,yv=516,bv=517,Uh=518,Ev=519,Uu=35044,Xf="300 es",si=2e3,Eo=2001;function Tv(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function il(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function wv(){const n=il("canvas");return n.style.display="block",n}const Yf={};function sl(...n){const t="THREE."+n.shift();console.log(t,...n)}function d0(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Vt(...n){n=d0(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function re(...n){n=d0(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Mr(...n){const t=n.join(" ");t in Yf||(Yf[t]=!0,Vt(...n))}function Av(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const Rv={[Kc]:Zc,[Jc]:tu,[jc]:eu,[wr]:Qc,[Zc]:Kc,[tu]:Jc,[eu]:jc,[Qc]:wr};class as{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const We=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let qf=1234567;const Sr=Math.PI/180,To=180/Math.PI;function oi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(We[n&255]+We[n>>8&255]+We[n>>16&255]+We[n>>24&255]+"-"+We[t&255]+We[t>>8&255]+"-"+We[t>>16&15|64]+We[t>>24&255]+"-"+We[e&63|128]+We[e>>8&255]+"-"+We[e>>16&255]+We[e>>24&255]+We[i&255]+We[i>>8&255]+We[i>>16&255]+We[i>>24&255]).toLowerCase()}function Qt(n,t,e){return Math.max(t,Math.min(e,n))}function Fh(n,t){return(n%t+t)%t}function Cv(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Pv(n,t,e){return n!==t?(e-n)/(t-n):0}function ho(n,t,e){return(1-e)*n+e*t}function Lv(n,t,e,i){return ho(n,t,1-Math.exp(-e*i))}function Dv(n,t=1){return t-Math.abs(Fh(n,t*2)-t)}function Iv(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Nv(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Uv(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Fv(n,t){return n+Math.random()*(t-n)}function Ov(n){return n*(.5-Math.random())}function Bv(n){n!==void 0&&(qf=n);let t=qf+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function zv(n){return n*Sr}function Hv(n){return n*To}function Gv(n){return(n&n-1)===0&&n!==0}function Vv(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function kv(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Wv(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),u=o((t+i)/2),h=r((t-i)/2),f=o((t-i)/2),d=r((i-t)/2),g=o((i-t)/2);switch(s){case"XYX":n.set(a*u,l*h,l*f,a*c);break;case"YZY":n.set(l*f,a*u,l*h,a*c);break;case"ZXZ":n.set(l*h,l*f,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*d,a*c);break;case"YXY":n.set(l*d,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*d,a*u,a*c);break;default:Vt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Un(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function fe(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Va={DEG2RAD:Sr,RAD2DEG:To,generateUUID:oi,clamp:Qt,euclideanModulo:Fh,mapLinear:Cv,inverseLerp:Pv,lerp:ho,damp:Lv,pingpong:Dv,smoothstep:Iv,smootherstep:Nv,randInt:Uv,randFloat:Fv,randFloatSpread:Ov,seededRandom:Bv,degToRad:zv,radToDeg:Hv,isPowerOfTwo:Gv,ceilPowerOfTwo:Vv,floorPowerOfTwo:kv,setQuaternionFromProperEuler:Wv,normalize:fe,denormalize:Un},Zh=class Zh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Zh.prototype.isVector2=!0;let gt=Zh;class Vn{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3],f=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(h!==_||l!==f||c!==d||u!==g){let m=l*f+c*d+u*g+h*_;m<0&&(f=-f,d=-d,g=-g,_=-_,m=-m);let p=1-a;if(m<.9995){const S=Math.acos(m),b=Math.sin(S);p=Math.sin(p*S)/b,a=Math.sin(a*S)/b,l=l*p+f*a,c=c*p+d*a,u=u*p+g*a,h=h*p+_*a}else{l=l*p+f*a,c=c*p+d*a,u=u*p+g*a,h=h*p+_*a;const S=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=S,c*=S,u*=S,h*=S}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+u*h+l*d-c*f,t[e+1]=l*g+u*f+c*h-a*d,t[e+2]=c*g+u*d+a*f-l*h,t[e+3]=u*g-a*h-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),h=a(r/2),f=l(i/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:Vt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=i+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(i>a&&i>h){const d=2*Math.sqrt(1+i-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-i-h);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-i-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Jh=class Jh{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion($f.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion($f.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),h=2*(r*i-o*e);return this.x=e+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Gl.copy(this).projectOnVector(t),this.sub(Gl)}reflect(t){return this.sub(Gl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Jh.prototype.isVector3=!0;let I=Jh;const Gl=new I,$f=new Vn,jh=class jh{constructor(t,e,i,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],d=i[5],g=i[8],_=s[0],m=s[3],p=s[6],S=s[1],b=s[4],v=s[7],w=s[2],E=s[5],R=s[8];return r[0]=o*_+a*S+l*w,r[3]=o*m+a*b+l*E,r[6]=o*p+a*v+l*R,r[1]=c*_+u*S+h*w,r[4]=c*m+u*b+h*E,r[7]=c*p+u*v+h*R,r[2]=f*_+d*S+g*w,r[5]=f*m+d*b+g*E,r[8]=f*p+d*v+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*r,d=c*r-o*l,g=e*h+i*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(s*c-u*i)*_,t[2]=(a*i-s*o)*_,t[3]=f*_,t[4]=(u*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return Mr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Vl.makeScale(t,e)),this}rotate(t){return Mr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Vl.makeRotation(-t)),this}translate(t,e){return Mr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Vl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};jh.prototype.isMatrix3=!0;let Kt=jh;const Vl=new Kt,Kf=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zf=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Xv(){const n={enabled:!0,workingColorSpace:el,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===he&&(s.r=Pi(s.r),s.g=Pi(s.g),s.b=Pi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===he&&(s.r=yr(s.r),s.g=yr(s.g),s.b=yr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ns?nl:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Mr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Mr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[el]:{primaries:t,whitePoint:i,transfer:nl,toXYZ:Kf,fromXYZ:Zf,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:t,whitePoint:i,transfer:he,toXYZ:Kf,fromXYZ:Zf,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}}),n}const oe=Xv();function Pi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function yr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Hs;class Yv{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Hs===void 0&&(Hs=il("canvas")),Hs.width=t.width,Hs.height=t.height;const s=Hs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Hs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=il("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Pi(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Pi(e[i]/255)*255):e[i]=Pi(e[i]);return{data:e,width:t.width,height:t.height}}else return Vt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let qv=0;class Oh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qv++}),this.uuid=oi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(kl(s[o].image)):r.push(kl(s[o]))}else r=kl(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function kl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Yv.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Vt("Texture: Unable to serialize Texture."),{})}let $v=0;const Wl=new I;class Ze extends as{constructor(t=Ze.DEFAULT_IMAGE,e=Ze.DEFAULT_MAPPING,i=Ri,s=Ri,r=$e,o=Ms,a=On,l=xn,c=Ze.DEFAULT_ANISOTROPY,u=ns){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$v++}),this.uuid=oi(),this.name="",this.source=new Oh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Wl).x}get height(){return this.source.getSize(Wl).y}get depth(){return this.source.getSize(Wl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Vt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Vt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==o0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case nu:t.x=t.x-Math.floor(t.x);break;case Ri:t.x=t.x<0?0:1;break;case iu:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case nu:t.y=t.y-Math.floor(t.y);break;case Ri:t.y=t.y<0?0:1;break;case iu:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ze.DEFAULT_IMAGE=null;Ze.DEFAULT_MAPPING=o0;Ze.DEFAULT_ANISOTROPY=1;const Qh=class Qh{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,v=(d+1)/2,w=(p+1)/2,E=(u+f)/4,R=(h+_)/4,M=(g+m)/4;return b>v&&b>w?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=E/i,r=R/i):v>w?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=E/s,r=M/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=R/r,s=M/r),this.set(i,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(h-_)/S,this.z=(f-u)/S,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Qh.prototype.isVector4=!0;let we=Qh;class Kv extends as{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$e,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new we(0,0,t,e),this.scissorTest=!1,this.viewport=new we(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new Ze(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:$e,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Oh(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ai extends Kv{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class p0 extends Ze{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zv extends Ze{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const fl=class fl{constructor(t,e,i,s,r,o,a,l,c,u,h,f,d,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,h,f,d,g,_,m)}set(t,e,i,s,r,o,a,l,c,u,h,f,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fl().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,i=t.elements,s=1/Gs.setFromMatrixColumn(t,0).length(),r=1/Gs.setFromMatrixColumn(t,1).length(),o=1/Gs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=o*u,d=o*h,g=a*u,_=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=d+g*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,d=l*h,g=c*u,_=c*h;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,d=l*h,g=c*u,_=c*h;e[0]=f-_*a,e[4]=-o*h,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,d=o*h,g=a*u,_=a*h;e[0]=l*u,e[4]=g*c-d,e[8]=f*c+_,e[1]=l*h,e[5]=_*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-f*h,e[8]=g*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*h+g,e[10]=f-_*h}else if(t.order==="XZY"){const f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+_,e[5]=o*u,e[9]=d*h-g,e[2]=g*h-d,e[6]=a*u,e[10]=_*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Jv,t,jv)}lookAt(t,e,i){const s=this.elements;return pn.subVectors(t,e),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),ki.crossVectors(i,pn),ki.lengthSq()===0&&(Math.abs(i.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),ki.crossVectors(i,pn)),ki.normalize(),Go.crossVectors(pn,ki),s[0]=ki.x,s[4]=Go.x,s[8]=pn.x,s[1]=ki.y,s[5]=Go.y,s[9]=pn.y,s[2]=ki.z,s[6]=Go.z,s[10]=pn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],S=i[3],b=i[7],v=i[11],w=i[15],E=s[0],R=s[4],M=s[8],A=s[12],N=s[1],L=s[5],F=s[9],q=s[13],Z=s[2],G=s[6],B=s[10],U=s[14],k=s[3],J=s[7],at=s[11],_t=s[15];return r[0]=o*E+a*N+l*Z+c*k,r[4]=o*R+a*L+l*G+c*J,r[8]=o*M+a*F+l*B+c*at,r[12]=o*A+a*q+l*U+c*_t,r[1]=u*E+h*N+f*Z+d*k,r[5]=u*R+h*L+f*G+d*J,r[9]=u*M+h*F+f*B+d*at,r[13]=u*A+h*q+f*U+d*_t,r[2]=g*E+_*N+m*Z+p*k,r[6]=g*R+_*L+m*G+p*J,r[10]=g*M+_*F+m*B+p*at,r[14]=g*A+_*q+m*U+p*_t,r[3]=S*E+b*N+v*Z+w*k,r[7]=S*R+b*L+v*G+w*J,r[11]=S*M+b*F+v*B+w*at,r[15]=S*A+b*q+v*U+w*_t,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15],S=l*d-c*f,b=a*d-c*h,v=a*f-l*h,w=o*d-c*u,E=o*f-l*u,R=o*h-a*u;return e*(_*S-m*b+p*v)-i*(g*S-m*w+p*E)+s*(g*b-_*w+p*R)-r*(g*v-_*E+m*R)}determinantAffine(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],u=t[10];return e*(o*u-a*c)-i*(r*u-a*l)+s*(r*c-o*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],S=e*a-i*o,b=e*l-s*o,v=e*c-r*o,w=i*l-s*a,E=i*c-r*a,R=s*c-r*l,M=u*_-h*g,A=u*m-f*g,N=u*p-d*g,L=h*m-f*_,F=h*p-d*_,q=f*p-d*m,Z=S*q-b*F+v*L+w*N-E*A+R*M;if(Z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/Z;return t[0]=(a*q-l*F+c*L)*G,t[1]=(s*F-i*q-r*L)*G,t[2]=(_*R-m*E+p*w)*G,t[3]=(f*E-h*R-d*w)*G,t[4]=(l*N-o*q-c*A)*G,t[5]=(e*q-s*N+r*A)*G,t[6]=(m*v-g*R-p*b)*G,t[7]=(u*R-f*v+d*b)*G,t[8]=(o*F-a*N+c*M)*G,t[9]=(i*N-e*F-r*M)*G,t[10]=(g*E-_*v+p*S)*G,t[11]=(h*v-u*E-d*S)*G,t[12]=(a*A-o*L-l*M)*G,t[13]=(e*L-i*A+s*M)*G,t[14]=(_*b-g*w-m*S)*G,t[15]=(u*w-h*b+f*S)*G,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,h=a+a,f=r*c,d=r*u,g=r*h,_=o*u,m=o*h,p=a*h,S=l*c,b=l*u,v=l*h,w=i.x,E=i.y,R=i.z;return s[0]=(1-(_+p))*w,s[1]=(d+v)*w,s[2]=(g-b)*w,s[3]=0,s[4]=(d-v)*E,s[5]=(1-(f+p))*E,s[6]=(m+S)*E,s[7]=0,s[8]=(g+b)*R,s[9]=(m-S)*R,s[10]=(1-(f+_))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let o=Gs.set(s[0],s[1],s[2]).length();const a=Gs.set(s[4],s[5],s[6]).length(),l=Gs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Pn.copy(this);const c=1/o,u=1/a,h=1/l;return Pn.elements[0]*=c,Pn.elements[1]*=c,Pn.elements[2]*=c,Pn.elements[4]*=u,Pn.elements[5]*=u,Pn.elements[6]*=u,Pn.elements[8]*=h,Pn.elements[9]*=h,Pn.elements[10]*=h,e.setFromRotationMatrix(Pn),i.x=o,i.y=a,i.z=l,this}makePerspective(t,e,i,s,r,o,a=si,l=!1){const c=this.elements,u=2*r/(e-t),h=2*r/(i-s),f=(e+t)/(e-t),d=(i+s)/(i-s);let g,_;if(l)g=r/(o-r),_=o*r/(o-r);else if(a===si)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Eo)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=si,l=!1){const c=this.elements,u=2/(e-t),h=2/(i-s),f=-(e+t)/(e-t),d=-(i+s)/(i-s);let g,_;if(l)g=1/(o-r),_=o/(o-r);else if(a===si)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===Eo)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};fl.prototype.isMatrix4=!0;let se=fl;const Gs=new I,Pn=new se,Jv=new I(0,0,0),jv=new I(1,1,1),ki=new I,Go=new I,pn=new I,Jf=new se,jf=new Vn;class kn{constructor(t=0,e=0,i=0,s=kn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Qt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Vt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Jf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Jf,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return jf.setFromEuler(this),this.setFromQuaternion(jf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kn.DEFAULT_ORDER="XYZ";class Bh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Qv=0;const Qf=new I,Vs=new Vn,gi=new se,Vo=new I,Br=new I,tM=new I,eM=new Vn,td=new I(1,0,0),ed=new I(0,1,0),nd=new I(0,0,1),id={type:"added"},nM={type:"removed"},ks={type:"childadded",child:null},Xl={type:"childremoved",child:null};class Ie extends as{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qv++}),this.uuid=oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ie.DEFAULT_UP.clone();const t=new I,e=new kn,i=new Vn,s=new I(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new Kt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=Ie.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Vs.setFromAxisAngle(t,e),this.quaternion.multiply(Vs),this}rotateOnWorldAxis(t,e){return Vs.setFromAxisAngle(t,e),this.quaternion.premultiply(Vs),this}rotateX(t){return this.rotateOnAxis(td,t)}rotateY(t){return this.rotateOnAxis(ed,t)}rotateZ(t){return this.rotateOnAxis(nd,t)}translateOnAxis(t,e){return Qf.copy(t).applyQuaternion(this.quaternion),this.position.add(Qf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(td,t)}translateY(t){return this.translateOnAxis(ed,t)}translateZ(t){return this.translateOnAxis(nd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Vo.copy(t):Vo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(Br,Vo,this.up):gi.lookAt(Vo,Br,this.up),this.quaternion.setFromRotationMatrix(gi),s&&(gi.extractRotation(s.matrixWorld),Vs.setFromRotationMatrix(gi),this.quaternion.premultiply(Vs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(re("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(id),ks.child=t,this.dispatchEvent(ks),ks.child=null):re("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(nM),Xl.child=t,this.dispatchEvent(Xl),Xl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),gi.multiply(t.parent.matrixWorld)),t.applyMatrix4(gi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(id),ks.child=t,this.dispatchEvent(ks),ks.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Br,t,tM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Br,eM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Ie.DEFAULT_UP=new I(0,1,0);Ie.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Re extends Ie{constructor(){super(),this.isGroup=!0,this.type="Group"}}const iM={type:"move"};class Yl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(iM)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Re;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const m0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},ko={h:0,s:0,l:0};function ql(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Ft{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=i,oe.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=oe.workingColorSpace){if(t=Fh(t,1),e=Qt(e,0,1),i=Qt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=ql(o,r,t+1/3),this.g=ql(o,r,t),this.b=ql(o,r,t-1/3)}return oe.colorSpaceToWorking(this,s),this}setStyle(t,e=Ee){function i(r){r!==void 0&&parseFloat(r)<1&&Vt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Vt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Vt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){const i=m0[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Vt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pi(t.r),this.g=Pi(t.g),this.b=Pi(t.b),this}copyLinearToSRGB(t){return this.r=yr(t.r),this.g=yr(t.g),this.b=yr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return oe.workingToColorSpace(Xe.copy(this),t),Math.round(Qt(Xe.r*255,0,255))*65536+Math.round(Qt(Xe.g*255,0,255))*256+Math.round(Qt(Xe.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace(Xe.copy(this),e);const i=Xe.r,s=Xe.g,r=Xe.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace(Xe.copy(this),e),t.r=Xe.r,t.g=Xe.g,t.b=Xe.b,t}getStyle(t=Ee){oe.workingToColorSpace(Xe.copy(this),t);const e=Xe.r,i=Xe.g,s=Xe.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Wi),this.setHSL(Wi.h+t,Wi.s+e,Wi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Wi),t.getHSL(ko);const i=ho(Wi.h,ko.h,e),s=ho(Wi.s,ko.s,e),r=ho(Wi.l,ko.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xe=new Ft;Ft.NAMES=m0;class zh{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ft(t),this.near=e,this.far=i}clone(){return new zh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class sM extends Ie{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Ln=new I,_i=new I,$l=new I,xi=new I,Ws=new I,Xs=new I,sd=new I,Kl=new I,Zl=new I,Jl=new I,jl=new we,Ql=new we,tc=new we;class vn{constructor(t=new I,e=new I,i=new I){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Ln.subVectors(t,e),s.cross(Ln);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Ln.subVectors(s,e),_i.subVectors(i,e),$l.subVectors(t,e);const o=Ln.dot(Ln),a=Ln.dot(_i),l=Ln.dot($l),c=_i.dot(_i),u=_i.dot($l),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,g=(o*u-a*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,xi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,xi.x),l.addScaledVector(o,xi.y),l.addScaledVector(a,xi.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return jl.setScalar(0),Ql.setScalar(0),tc.setScalar(0),jl.fromBufferAttribute(t,e),Ql.fromBufferAttribute(t,i),tc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(jl,r.x),o.addScaledVector(Ql,r.y),o.addScaledVector(tc,r.z),o}static isFrontFacing(t,e,i,s){return Ln.subVectors(i,e),_i.subVectors(t,e),Ln.cross(_i).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ln.subVectors(this.c,this.b),_i.subVectors(this.a,this.b),Ln.cross(_i).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return vn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return vn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return vn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return vn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return vn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Ws.subVectors(s,i),Xs.subVectors(r,i),Kl.subVectors(t,i);const l=Ws.dot(Kl),c=Xs.dot(Kl);if(l<=0&&c<=0)return e.copy(i);Zl.subVectors(t,s);const u=Ws.dot(Zl),h=Xs.dot(Zl);if(u>=0&&h<=u)return e.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(Ws,o);Jl.subVectors(t,r);const d=Ws.dot(Jl),g=Xs.dot(Jl);if(g>=0&&d<=g)return e.copy(r);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Xs,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return sd.subVectors(r,s),a=(h-u)/(h-u+(d-g)),e.copy(s).addScaledVector(sd,a);const p=1/(m+_+f);return o=_*p,a=f*p,e.copy(i).addScaledVector(Ws,o).addScaledVector(Xs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Is{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Dn):Dn.fromBufferAttribute(r,o),Dn.applyMatrix4(t.matrixWorld),this.expandByPoint(Dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Wo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Wo.copy(i.boundingBox)),Wo.applyMatrix4(t.matrixWorld),this.union(Wo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Dn),Dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(zr),Xo.subVectors(this.max,zr),Ys.subVectors(t.a,zr),qs.subVectors(t.b,zr),$s.subVectors(t.c,zr),Xi.subVectors(qs,Ys),Yi.subVectors($s,qs),hs.subVectors(Ys,$s);let e=[0,-Xi.z,Xi.y,0,-Yi.z,Yi.y,0,-hs.z,hs.y,Xi.z,0,-Xi.x,Yi.z,0,-Yi.x,hs.z,0,-hs.x,-Xi.y,Xi.x,0,-Yi.y,Yi.x,0,-hs.y,hs.x,0];return!ec(e,Ys,qs,$s,Xo)||(e=[1,0,0,0,1,0,0,0,1],!ec(e,Ys,qs,$s,Xo))?!1:(Yo.crossVectors(Xi,Yi),e=[Yo.x,Yo.y,Yo.z],ec(e,Ys,qs,$s,Xo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(vi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const vi=[new I,new I,new I,new I,new I,new I,new I,new I],Dn=new I,Wo=new Is,Ys=new I,qs=new I,$s=new I,Xi=new I,Yi=new I,hs=new I,zr=new I,Xo=new I,Yo=new I,fs=new I;function ec(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){fs.fromArray(n,r);const a=s.x*Math.abs(fs.x)+s.y*Math.abs(fs.y)+s.z*Math.abs(fs.z),l=t.dot(fs),c=e.dot(fs),u=i.dot(fs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ne=new I,qo=new gt;let rM=0;class fn extends as{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rM++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Uu,this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)qo.fromBufferAttribute(this,e),qo.applyMatrix3(t),this.setXY(e,qo.x,qo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix3(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Un(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=fe(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Un(e,this.array)),e}setX(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Un(e,this.array)),e}setY(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Un(e,this.array)),e}setZ(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Un(e,this.array)),e}setW(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),i=fe(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),i=fe(i,this.array),s=fe(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),i=fe(i,this.array),s=fe(s,this.array),r=fe(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Uu&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class g0 extends fn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class _0 extends fn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class xe extends fn{constructor(t,e,i){super(new Float32Array(t),e,i)}}const oM=new Is,Hr=new I,nc=new I;class Ir{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):oM.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Hr.subVectors(t,this.center);const e=Hr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Hr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(nc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Hr.copy(t.center).add(nc)),this.expandByPoint(Hr.copy(t.center).sub(nc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let aM=0;const Tn=new se,ic=new Ie,Ks=new I,mn=new Is,Gr=new Is,He=new I;class Ge extends as{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:aM++}),this.uuid=oi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Tv(t)?_0:g0)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Kt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Tn.makeRotationFromQuaternion(t),this.applyMatrix4(Tn),this}rotateX(t){return Tn.makeRotationX(t),this.applyMatrix4(Tn),this}rotateY(t){return Tn.makeRotationY(t),this.applyMatrix4(Tn),this}rotateZ(t){return Tn.makeRotationZ(t),this.applyMatrix4(Tn),this}translate(t,e,i){return Tn.makeTranslation(t,e,i),this.applyMatrix4(Tn),this}scale(t,e,i){return Tn.makeScale(t,e,i),this.applyMatrix4(Tn),this}lookAt(t){return ic.lookAt(t),ic.updateMatrix(),this.applyMatrix4(ic.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ks).negate(),this.translate(Ks.x,Ks.y,Ks.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new xe(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Vt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Is);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){re("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];mn.setFromBufferAttribute(r),this.morphTargetsRelative?(He.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(He),He.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(He)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&re('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ir);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){re("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const i=this.boundingSphere.center;if(mn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Gr.setFromBufferAttribute(a),this.morphTargetsRelative?(He.addVectors(mn.min,Gr.min),mn.expandByPoint(He),He.addVectors(mn.max,Gr.max),mn.expandByPoint(He)):(mn.expandByPoint(Gr.min),mn.expandByPoint(Gr.max))}mn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)He.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(He));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)He.fromBufferAttribute(a,c),l&&(Ks.fromBufferAttribute(t,c),He.add(Ks)),s=Math.max(s,i.distanceToSquared(He))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&re('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){re("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new fn(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let M=0;M<i.count;M++)a[M]=new I,l[M]=new I;const c=new I,u=new I,h=new I,f=new gt,d=new gt,g=new gt,_=new I,m=new I;function p(M,A,N){c.fromBufferAttribute(i,M),u.fromBufferAttribute(i,A),h.fromBufferAttribute(i,N),f.fromBufferAttribute(r,M),d.fromBufferAttribute(r,A),g.fromBufferAttribute(r,N),u.sub(c),h.sub(c),d.sub(f),g.sub(f);const L=1/(d.x*g.y-g.x*d.y);isFinite(L)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(L),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(L),a[M].add(_),a[A].add(_),a[N].add(_),l[M].add(m),l[A].add(m),l[N].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let M=0,A=S.length;M<A;++M){const N=S[M],L=N.start,F=N.count;for(let q=L,Z=L+F;q<Z;q+=3)p(t.getX(q+0),t.getX(q+1),t.getX(q+2))}const b=new I,v=new I,w=new I,E=new I;function R(M){w.fromBufferAttribute(s,M),E.copy(w);const A=a[M];b.copy(A),b.sub(w.multiplyScalar(w.dot(A))).normalize(),v.crossVectors(E,A);const L=v.dot(l[M])<0?-1:1;o.setXYZW(M,b.x,b.y,b.z,L)}for(let M=0,A=S.length;M<A;++M){const N=S[M],L=N.start,F=N.count;for(let q=L,Z=L+F;q<Z;q+=3)R(t.getX(q+0)),R(t.getX(q+1)),R(t.getX(q+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new fn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new I,r=new I,o=new I,a=new I,l=new I,c=new I,u=new I,h=new I;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)He.fromBufferAttribute(t,e),He.normalize(),t.setXYZ(e,He.x,He.y,He.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)f[g++]=c[d++]}return new fn(f,u,h)}if(this.index===null)return Vt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ge,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=t(f,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class lM{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Uu,this.updateRanges=[],this.version=0,this.uuid=oi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=oi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=oi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const je=new I;class rl{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Un(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=fe(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Un(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Un(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Un(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Un(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),i=fe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),i=fe(i,this.array),s=fe(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),i=fe(i,this.array),s=fe(s,this.array),r=fe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){sl("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new fn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new rl(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){sl("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let cM=0;class Ns extends as{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cM++}),this.uuid=oi(),this.name="",this.type="Material",this.blending=vr,this.side=os,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qc,this.blendDst=$c,this.blendEquation=xs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zs,this.stencilZFail=zs,this.stencilZPass=zs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Vt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Vt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==vr&&(i.blending=this.blending),this.side!==os&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==qc&&(i.blendSrc=this.blendSrc),this.blendDst!==$c&&(i.blendDst=this.blendDst),this.blendEquation!==xs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==wr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==zs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==zs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ft().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new gt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new gt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class x0 extends Ns{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ft(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Zs;const Vr=new I,Js=new I,js=new I,Qs=new gt,kr=new gt,v0=new se,$o=new I,Wr=new I,Ko=new I,rd=new gt,sc=new gt,od=new gt;class uM extends Ie{constructor(t=new x0){if(super(),this.isSprite=!0,this.type="Sprite",Zs===void 0){Zs=new Ge;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new lM(e,5);Zs.setIndex([0,1,2,0,2,3]),Zs.setAttribute("position",new rl(i,3,0,!1)),Zs.setAttribute("uv",new rl(i,2,3,!1))}this.geometry=Zs,this.material=t,this.center=new gt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&re('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Js.setFromMatrixScale(this.matrixWorld),v0.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),js.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Js.multiplyScalar(-js.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;Zo($o.set(-.5,-.5,0),js,o,Js,s,r),Zo(Wr.set(.5,-.5,0),js,o,Js,s,r),Zo(Ko.set(.5,.5,0),js,o,Js,s,r),rd.set(0,0),sc.set(1,0),od.set(1,1);let a=t.ray.intersectTriangle($o,Wr,Ko,!1,Vr);if(a===null&&(Zo(Wr.set(-.5,.5,0),js,o,Js,s,r),sc.set(0,1),a=t.ray.intersectTriangle($o,Ko,Wr,!1,Vr),a===null))return;const l=t.ray.origin.distanceTo(Vr);l<t.near||l>t.far||e.push({distance:l,point:Vr.clone(),uv:vn.getInterpolation(Vr,$o,Wr,Ko,rd,sc,od,new gt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Zo(n,t,e,i,s,r){Qs.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(kr.x=r*Qs.x-s*Qs.y,kr.y=s*Qs.x+r*Qs.y):kr.copy(Qs),n.copy(t),n.x+=kr.x,n.y+=kr.y,n.applyMatrix4(v0)}const Mi=new I,rc=new I,Jo=new I,qi=new I,oc=new I,jo=new I,ac=new I;class yl{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Mi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Mi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Mi.copy(this.origin).addScaledVector(this.direction,e),Mi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){rc.copy(t).add(e).multiplyScalar(.5),Jo.copy(e).sub(t).normalize(),qi.copy(this.origin).sub(rc);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Jo),a=qi.dot(this.direction),l=-qi.dot(Jo),c=qi.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*l-a,f=o*a-l,g=r*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(rc).addScaledVector(Jo,f),d}intersectSphere(t,e){Mi.subVectors(t.center,this.origin);const i=Mi.dot(this.direction),s=Mi.dot(Mi)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Mi)!==null}intersectTriangle(t,e,i,s,r){oc.subVectors(e,t),jo.subVectors(i,t),ac.crossVectors(oc,jo);let o=this.direction.dot(ac),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;qi.subVectors(this.origin,t);const l=a*this.direction.dot(jo.crossVectors(qi,jo));if(l<0)return null;const c=a*this.direction.dot(oc.cross(qi));if(c<0||l+c>o)return null;const u=-a*qi.dot(ac);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class le extends Ns{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=wh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ad=new se,ds=new yl,Qo=new Ir,ld=new I,ta=new I,ea=new I,na=new I,lc=new I,ia=new I,cd=new I,sa=new I;class bt extends Ie{constructor(t=new Ge,e=new le){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){ia.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(lc.fromBufferAttribute(h,t),o?ia.addScaledVector(lc,u):ia.addScaledVector(lc.sub(e),u))}e.add(ia)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Qo.copy(i.boundingSphere),Qo.applyMatrix4(r),ds.copy(t.ray).recast(t.near),!(Qo.containsPoint(ds.origin)===!1&&(ds.intersectSphere(Qo,ld)===null||ds.origin.distanceToSquared(ld)>(t.far-t.near)**2))&&(ad.copy(r).invert(),ds.copy(t.ray).applyMatrix4(ad),!(i.boundingBox!==null&&ds.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ds)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),b=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=S,w=b;v<w;v+=3){const E=a.getX(v),R=a.getX(v+1),M=a.getX(v+2);s=ra(this,p,t,i,c,u,h,E,R,M),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const S=a.getX(m),b=a.getX(m+1),v=a.getX(m+2);s=ra(this,o,t,i,c,u,h,S,b,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),b=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=S,w=b;v<w;v+=3){const E=v,R=v+1,M=v+2;s=ra(this,p,t,i,c,u,h,E,R,M),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const S=m,b=m+1,v=m+2;s=ra(this,o,t,i,c,u,h,S,b,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function hM(n,t,e,i,s,r,o,a){let l;if(t.side===hn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===os,a),l===null)return null;sa.copy(a),sa.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(sa);return c<e.near||c>e.far?null:{distance:c,point:sa.clone(),object:n}}function ra(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,ta),n.getVertexPosition(l,ea),n.getVertexPosition(c,na);const u=hM(n,t,e,i,ta,ea,na,cd);if(u){const h=new I;vn.getBarycoord(cd,ta,ea,na,h),s&&(u.uv=vn.getInterpolatedAttribute(s,a,l,c,h,new gt)),r&&(u.uv1=vn.getInterpolatedAttribute(r,a,l,c,h,new gt)),o&&(u.normal=vn.getInterpolatedAttribute(o,a,l,c,h,new I),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new I,materialIndex:0};vn.getNormal(ta,ea,na,f.normal),u.face=f,u.barycoord=h}return u}class M0 extends Ze{constructor(t=null,e=1,i=1,s,r,o,a,l,c=Ve,u=Ve,h,f){super(null,o,a,l,c,u,s,r,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fu extends fn{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const tr=new se,ud=new se,oa=[],hd=new Is,fM=new se,Xr=new bt,Yr=new Ir;class S0 extends bt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Fu(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,fM)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Is),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,tr),hd.copy(t.boundingBox).applyMatrix4(tr),this.boundingBox.union(hd)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ir),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,tr),Yr.copy(t.boundingSphere).applyMatrix4(tr),this.boundingSphere.union(Yr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(Xr.geometry=this.geometry,Xr.material=this.material,Xr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Yr.copy(this.boundingSphere),Yr.applyMatrix4(i),t.ray.intersectsSphere(Yr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,tr),ud.multiplyMatrices(i,tr),Xr.matrixWorld=ud,Xr.raycast(t,oa);for(let o=0,a=oa.length;o<a;o++){const l=oa[o];l.instanceId=r,l.object=this,e.push(l)}oa.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Fu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new M0(new Float32Array(s*this.count),s,this.count,Ph,Fn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;return r[l]=a,r.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const cc=new I,dM=new I,pM=new Kt;class ts{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=cc.subVectors(i,e).cross(dM.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(cc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||pM.getNormalMatrix(t),s=this.coplanarPoint(cc).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ps=new Ir,mM=new gt(.5,.5),aa=new I;class Hh{constructor(t=new ts,e=new ts,i=new ts,s=new ts,r=new ts,o=new ts){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=si,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],h=r[5],f=r[6],d=r[7],g=r[8],_=r[9],m=r[10],p=r[11],S=r[12],b=r[13],v=r[14],w=r[15];if(s[0].setComponents(c-o,d-u,p-g,w-S).normalize(),s[1].setComponents(c+o,d+u,p+g,w+S).normalize(),s[2].setComponents(c+a,d+h,p+_,w+b).normalize(),s[3].setComponents(c-a,d-h,p-_,w-b).normalize(),i)s[4].setComponents(l,f,m,v).normalize(),s[5].setComponents(c-l,d-f,p-m,w-v).normalize();else if(s[4].setComponents(c-l,d-f,p-m,w-v).normalize(),e===si)s[5].setComponents(c+l,d+f,p+m,w+v).normalize();else if(e===Eo)s[5].setComponents(l,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ps.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ps.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ps)}intersectsSprite(t){ps.center.set(0,0,0);const e=mM.distanceTo(t.center);return ps.radius=.7071067811865476+e,ps.applyMatrix4(t.matrixWorld),this.intersectsSphere(ps)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(aa.x=s.normal.x>0?t.max.x:t.min.x,aa.y=s.normal.y>0?t.max.y:t.min.y,aa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(aa)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class y0 extends Ns{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ol=new I,al=new I,fd=new se,qr=new yl,la=new Ir,uc=new I,dd=new I;class gM extends Ie{constructor(t=new Ge,e=new y0){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)ol.fromBufferAttribute(e,s-1),al.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=ol.distanceTo(al);t.setAttribute("lineDistance",new xe(i,1))}else Vt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),la.copy(i.boundingSphere),la.applyMatrix4(s),la.radius+=r,t.ray.intersectsSphere(la)===!1)return;fd.copy(s).invert(),qr.copy(t.ray).applyMatrix4(fd);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){const p=u.getX(_),S=u.getX(_+1),b=ca(this,t,qr,l,p,S,_);b&&e.push(b)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=ca(this,t,qr,l,_,m,g-1);p&&e.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){const p=ca(this,t,qr,l,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=ca(this,t,qr,l,g-1,d,g-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ca(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(ol.fromBufferAttribute(a,s),al.fromBufferAttribute(a,r),e.distanceSqToSegment(ol,al,uc,dd)>i)return;uc.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(uc);if(!(c<t.near||c>t.far))return{distance:c,point:dd.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const pd=new I,md=new I;class _M extends gM{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)pd.fromBufferAttribute(e,s),md.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+pd.distanceTo(md);t.setAttribute("lineDistance",new xe(i,1))}else Vt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class b0 extends Ze{constructor(t=[],e=As,i,s,r,o,a,l,c,u){super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class on extends Ze{constructor(t,e,i,s,r,o,a,l,c){super(t,e,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Rr extends Ze{constructor(t,e,i=ui,s,r,o,a=Ve,l=Ve,c,u=Ui,h=1){if(u!==Ui&&u!==Ss)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:h};super(f,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Oh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class xM extends Rr{constructor(t,e=ui,i=As,s,r,o=Ve,a=Ve,l,c=Ui){const u={width:t,height:t,depth:1},h=[u,u,u,u,u,u];super(t,t,e,i,s,r,o,a,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class E0 extends Ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Pt extends Ge{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new xe(c,3)),this.setAttribute("normal",new xe(u,3)),this.setAttribute("uv",new xe(h,2));function g(_,m,p,S,b,v,w,E,R,M,A){const N=v/R,L=w/M,F=v/2,q=w/2,Z=E/2,G=R+1,B=M+1;let U=0,k=0;const J=new I;for(let at=0;at<B;at++){const _t=at*L-q;for(let Mt=0;Mt<G;Mt++){const ie=Mt*N-F;J[_]=ie*S,J[m]=_t*b,J[p]=Z,c.push(J.x,J.y,J.z),J[_]=0,J[m]=0,J[p]=E>0?1:-1,u.push(J.x,J.y,J.z),h.push(Mt/R),h.push(1-at/M),U+=1}}for(let at=0;at<M;at++)for(let _t=0;_t<R;_t++){const Mt=f+_t+G*at,ie=f+_t+G*(at+1),ve=f+(_t+1)+G*(at+1),Yt=f+(_t+1)+G*at;l.push(Mt,ie,Yt),l.push(ie,ve,Yt),k+=6}a.addGroup(d,k,A),d+=k,f+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Gh extends Ge{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new I,u=new gt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=e;h++,f+=3){const d=i+h/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/t+1)/2,u.y=(o[f+1]/t+1)/2,l.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new xe(o,3)),this.setAttribute("normal",new xe(a,3)),this.setAttribute("uv",new xe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gh(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class hi extends Ge{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],f=[],d=[];let g=0;const _=[],m=i/2;let p=0;S(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new xe(h,3)),this.setAttribute("normal",new xe(f,3)),this.setAttribute("uv",new xe(d,2));function S(){const v=new I,w=new I;let E=0;const R=(e-t)/i;for(let M=0;M<=r;M++){const A=[],N=M/r,L=N*(e-t)+t;for(let F=0;F<=s;F++){const q=F/s,Z=q*l+a,G=Math.sin(Z),B=Math.cos(Z);w.x=L*G,w.y=-N*i+m,w.z=L*B,h.push(w.x,w.y,w.z),v.set(G,R,B).normalize(),f.push(v.x,v.y,v.z),d.push(q,1-N),A.push(g++)}_.push(A)}for(let M=0;M<s;M++)for(let A=0;A<r;A++){const N=_[A][M],L=_[A+1][M],F=_[A+1][M+1],q=_[A][M+1];(t>0||A!==0)&&(u.push(N,L,q),E+=3),(e>0||A!==r-1)&&(u.push(L,F,q),E+=3)}c.addGroup(p,E,0),p+=E}function b(v){const w=g,E=new gt,R=new I;let M=0;const A=v===!0?t:e,N=v===!0?1:-1;for(let F=1;F<=s;F++)h.push(0,m*N,0),f.push(0,N,0),d.push(.5,.5),g++;const L=g;for(let F=0;F<=s;F++){const Z=F/s*l+a,G=Math.cos(Z),B=Math.sin(Z);R.x=A*B,R.y=m*N,R.z=A*G,h.push(R.x,R.y,R.z),f.push(0,N,0),E.x=G*.5+.5,E.y=B*.5*N+.5,d.push(E.x,E.y),g++}for(let F=0;F<s;F++){const q=w+F,Z=L+F;v===!0?u.push(Z,Z+1,q):u.push(Z+1,Z,q),M+=3}c.addGroup(p,M,v===!0?1:2),p+=M}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const ua=new I,ha=new I,hc=new I,fa=new vn;class T0 extends Ge{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(Sr*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),f={},d=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:_,b:m,c:p}=fa;if(_.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),fa.getNormal(hc),h[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,h[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,h[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let S=0;S<3;S++){const b=(S+1)%3,v=h[S],w=h[b],E=fa[u[S]],R=fa[u[b]],M=`${v}_${w}`,A=`${w}_${v}`;A in f&&f[A]?(hc.dot(f[A].normal)<=r&&(d.push(E.x,E.y,E.z),d.push(R.x,R.y,R.z)),f[A]=null):M in f||(f[M]={index0:c[S],index1:c[b],normal:hc.clone()})}}for(const g in f)if(f[g]){const{index0:_,index1:m}=f[g];ua.fromBufferAttribute(a,_),ha.fromBufferAttribute(a,m),d.push(ua.x,ua.y,ua.z),d.push(ha.x,ha.y,ha.z)}this.setAttribute("position",new xe(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class pi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Vt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const u=i[s],f=i[s+1]-u,d=(o-u)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new gt:new I);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new I,s=[],r=[],o=[],a=new I,l=new se;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Qt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Qt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Vh extends pi{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new gt){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class vM extends Vh{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function kh(){let n=0,t=0,e=0,i=0;function s(r,o,a,l){n=r,t=a,e=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let f=(o-r)/c-(a-r)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const gd=new I,_d=new I,fc=new kh,dc=new kh,pc=new kh;class MM extends pi{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new I){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(_d.subVectors(s[0],s[1]).add(s[0]),c=_d);const h=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(gd.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=gd),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),fc.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,g,_,m),dc.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,g,_,m),pc.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(fc.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),dc.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),pc.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return i.set(fc.calc(l),dc.calc(l),pc.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function xd(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+r+o)*l+(-3*e+3*i-2*r-o)*a+r*n+e}function SM(n,t){const e=1-n;return e*e*t}function yM(n,t){return 2*(1-n)*n*t}function bM(n,t){return n*n*t}function fo(n,t,e,i){return SM(n,t)+yM(n,e)+bM(n,i)}function EM(n,t){const e=1-n;return e*e*e*t}function TM(n,t){const e=1-n;return 3*e*e*n*t}function wM(n,t){return 3*(1-n)*n*n*t}function AM(n,t){return n*n*n*t}function po(n,t,e,i,s){return EM(n,t)+TM(n,e)+wM(n,i)+AM(n,s)}class w0 extends pi{constructor(t=new gt,e=new gt,i=new gt,s=new gt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new gt){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(po(t,s.x,r.x,o.x,a.x),po(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class RM extends pi{constructor(t=new I,e=new I,i=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new I){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(po(t,s.x,r.x,o.x,a.x),po(t,s.y,r.y,o.y,a.y),po(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class A0 extends pi{constructor(t=new gt,e=new gt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new gt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new gt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class CM extends pi{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class R0 extends pi{constructor(t=new gt,e=new gt,i=new gt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new gt){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(fo(t,s.x,r.x,o.x),fo(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class PM extends pi{constructor(t=new I,e=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new I){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(fo(t,s.x,r.x,o.x),fo(t,s.y,r.y,o.y),fo(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class C0 extends pi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new gt){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return i.set(xd(a,l.x,c.x,u.x,h.x),xd(a,l.y,c.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new gt().fromArray(s))}return this}}var vd=Object.freeze({__proto__:null,ArcCurve:vM,CatmullRomCurve3:MM,CubicBezierCurve:w0,CubicBezierCurve3:RM,EllipseCurve:Vh,LineCurve:A0,LineCurve3:CM,QuadraticBezierCurve:R0,QuadraticBezierCurve3:PM,SplineCurve:C0});class LM extends pi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new vd[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new vd[s.type]().fromJSON(s))}return this}}class Ou extends LM{constructor(t){super(),this.type="Path",this.currentPoint=new gt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new A0(this.currentPoint.clone(),new gt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new R0(this.currentPoint.clone(),new gt(t,e),new gt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const a=new w0(this.currentPoint.clone(),new gt(t,e),new gt(i,s),new gt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new C0(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,i,s,r,o,a,l),this}absellipse(t,e,i,s,r,o,a,l){const c=new Vh(t,e,i,s,r,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class P0 extends Ou{constructor(t){super(t),this.uuid=oi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new Ou().fromJSON(s))}return this}}function DM(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=L0(n,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(i&&(r=OM(n,t,r,e)),n.length>80*e){a=n[0],l=n[1];let u=a,h=l;for(let f=e;f<s;f+=e){const d=n[f],g=n[f+1];d<a&&(a=d),g<l&&(l=g),d>u&&(u=d),g>h&&(h=g)}c=Math.max(u-a,h-l),c=c!==0?32767/c:0}return wo(r,o,e,a,l,c,0),o}function L0(n,t,e,i,s){let r;if(s===$M(n,t,e,i)>0)for(let o=t;o<e;o+=i)r=Md(o/i|0,n[o],n[o+1],r);else for(let o=e-i;o>=t;o-=i)r=Md(o/i|0,n[o],n[o+1],r);return r&&Cr(r,r.next)&&(Ro(r),r=r.next),r}function Cs(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Cr(e,e.next)||Ae(e.prev,e,e.next)===0)){if(Ro(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function wo(n,t,e,i,s,r,o){if(!n)return;!o&&r&&VM(n,i,s,r);let a=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(r?NM(n,i,s,r):IM(n)){t.push(l.i,n.i,c.i),Ro(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=UM(Cs(n),t),wo(n,t,e,i,s,r,2)):o===2&&FM(n,t,e,i,s,r):wo(Cs(n),t,e,i,s,r,1);break}}}function IM(n){const t=n.prev,e=n,i=n.next;if(Ae(t,e,i)>=0)return!1;const s=t.x,r=e.x,o=i.x,a=t.y,l=e.y,c=i.y,u=Math.min(s,r,o),h=Math.min(a,l,c),f=Math.max(s,r,o),d=Math.max(a,l,c);let g=i.next;for(;g!==t;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=d&&eo(s,a,r,l,o,c,g.x,g.y)&&Ae(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function NM(n,t,e,i){const s=n.prev,r=n,o=n.next;if(Ae(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,u=s.y,h=r.y,f=o.y,d=Math.min(a,l,c),g=Math.min(u,h,f),_=Math.max(a,l,c),m=Math.max(u,h,f),p=Bu(d,g,t,e,i),S=Bu(_,m,t,e,i);let b=n.prevZ,v=n.nextZ;for(;b&&b.z>=p&&v&&v.z<=S;){if(b.x>=d&&b.x<=_&&b.y>=g&&b.y<=m&&b!==s&&b!==o&&eo(a,u,l,h,c,f,b.x,b.y)&&Ae(b.prev,b,b.next)>=0||(b=b.prevZ,v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&eo(a,u,l,h,c,f,v.x,v.y)&&Ae(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;b&&b.z>=p;){if(b.x>=d&&b.x<=_&&b.y>=g&&b.y<=m&&b!==s&&b!==o&&eo(a,u,l,h,c,f,b.x,b.y)&&Ae(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;v&&v.z<=S;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&eo(a,u,l,h,c,f,v.x,v.y)&&Ae(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function UM(n,t){let e=n;do{const i=e.prev,s=e.next.next;!Cr(i,s)&&I0(i,e,e.next,s)&&Ao(i,s)&&Ao(s,i)&&(t.push(i.i,e.i,s.i),Ro(e),Ro(e.next),e=n=s),e=e.next}while(e!==n);return Cs(e)}function FM(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&XM(o,a)){let l=N0(o,a);o=Cs(o,o.next),l=Cs(l,l.next),wo(o,t,e,i,s,r,0),wo(l,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function OM(n,t,e,i){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*i,l=r<o-1?t[r+1]*i:n.length,c=L0(n,a,l,i,!1);c===c.next&&(c.steiner=!0),s.push(WM(c))}s.sort(BM);for(let r=0;r<s.length;r++)e=zM(s[r],e);return e}function BM(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function zM(n,t){const e=HM(n,t);if(!e)return t;const i=N0(e,n);return Cs(i,i.next),Cs(e,e.next)}function HM(n,t){let e=t;const i=n.x,s=n.y;let r=-1/0,o;if(Cr(n,e))return e;do{if(Cr(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const h=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=i&&h>r&&(r=h,o=e.x<e.next.x?e:e.next,h===i))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,l=o.x,c=o.y;let u=1/0;e=o;do{if(i>=e.x&&e.x>=l&&i!==e.x&&D0(s<c?i:r,s,l,c,s<c?r:i,s,e.x,e.y)){const h=Math.abs(s-e.y)/(i-e.x);Ao(e,n)&&(h<u||h===u&&(e.x>o.x||e.x===o.x&&GM(o,e)))&&(o=e,u=h)}e=e.next}while(e!==a);return o}function GM(n,t){return Ae(n.prev,n,t.prev)<0&&Ae(t.next,n,n.next)<0}function VM(n,t,e,i){let s=n;do s.z===0&&(s.z=Bu(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,kM(s)}function kM(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let o=i,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,e*=2}while(t>1);return n}function Bu(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function WM(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function D0(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function eo(n,t,e,i,s,r,o,a){return!(n===o&&t===a)&&D0(n,t,e,i,s,r,o,a)}function XM(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!YM(n,t)&&(Ao(n,t)&&Ao(t,n)&&qM(n,t)&&(Ae(n.prev,n,t.prev)||Ae(n,t.prev,t))||Cr(n,t)&&Ae(n.prev,n,n.next)>0&&Ae(t.prev,t,t.next)>0)}function Ae(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Cr(n,t){return n.x===t.x&&n.y===t.y}function I0(n,t,e,i){const s=pa(Ae(n,t,e)),r=pa(Ae(n,t,i)),o=pa(Ae(e,i,n)),a=pa(Ae(e,i,t));return!!(s!==r&&o!==a||s===0&&da(n,e,t)||r===0&&da(n,i,t)||o===0&&da(e,n,i)||a===0&&da(e,t,i))}function da(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function pa(n){return n>0?1:n<0?-1:0}function YM(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&I0(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Ao(n,t){return Ae(n.prev,n,n.next)<0?Ae(n,t,n.next)>=0&&Ae(n,n.prev,t)>=0:Ae(n,t,n.prev)<0||Ae(n,n.next,t)<0}function qM(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function N0(n,t){const e=zu(n.i,n.x,n.y),i=zu(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Md(n,t,e,i){const s=zu(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Ro(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function zu(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function $M(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class KM{static triangulate(t,e,i=2){return DM(t,e,i)}}class mo{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return mo.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];Sd(t),yd(i,t);let o=t.length;e.forEach(Sd);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,yd(i,e[l]);const a=KM.triangulate(i,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Sd(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function yd(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class Wh extends Ge{constructor(t=[new gt(0,-.5),new gt(.5,0),new gt(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=Qt(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],u=1/e,h=new I,f=new gt,d=new I,g=new I,_=new I;let m=0,p=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:m=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:m=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),l.push(d.x,d.y,d.z),_.copy(g)}for(let S=0;S<=e;S++){const b=i+S*u*s,v=Math.sin(b),w=Math.cos(b);for(let E=0;E<=t.length-1;E++){h.x=t[E].x*v,h.y=t[E].y,h.z=t[E].x*w,o.push(h.x,h.y,h.z),f.x=S/e,f.y=E/(t.length-1),a.push(f.x,f.y);const R=l[3*E+0]*v,M=l[3*E+1],A=l[3*E+0]*w;c.push(R,M,A)}}for(let S=0;S<e;S++)for(let b=0;b<t.length-1;b++){const v=b+S*t.length,w=v,E=v+t.length,R=v+t.length+1,M=v+1;r.push(w,E,M),r.push(R,M,E)}this.setIndex(r),this.setAttribute("position",new xe(o,3)),this.setAttribute("uv",new xe(a,2)),this.setAttribute("normal",new xe(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wh(t.points,t.segments,t.phiStart,t.phiLength)}}class Te extends Ge{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,h=t/a,f=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const S=p*f-o;for(let b=0;b<c;b++){const v=b*h-r;g.push(v,-S,0),_.push(0,0,1),m.push(b/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){const b=S+c*p,v=S+c*(p+1),w=S+1+c*(p+1),E=S+1+c*p;d.push(b,v,E),d.push(v,w,E)}this.setIndex(d),this.setAttribute("position",new xe(g,3)),this.setAttribute("normal",new xe(_,3)),this.setAttribute("uv",new xe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Te(t.width,t.height,t.widthSegments,t.heightSegments)}}class Xh extends Ge{constructor(t=new P0([new gt(0,.5),new gt(-.5,-.5),new gt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let u=0;u<t.length;u++)c(t[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new xe(s,3)),this.setAttribute("normal",new xe(r,3)),this.setAttribute("uv",new xe(o,2));function c(u){const h=s.length/3,f=u.extractPoints(e);let d=f.shape;const g=f.holes;mo.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const S=g[m];mo.isClockWise(S)===!0&&(g[m]=S.reverse())}const _=mo.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const S=g[m];d=d.concat(S)}for(let m=0,p=d.length;m<p;m++){const S=d[m];s.push(S.x,S.y,0),r.push(0,0,1),o.push(S.x,S.y)}for(let m=0,p=_.length;m<p;m++){const S=_[m],b=S[0]+h,v=S[1]+h,w=S[2]+h;i.push(b,v,w),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return ZM(e,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];i.push(o)}return new Xh(i,t.curveSegments)}}function ZM(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class Co extends Ge{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new I,f=new I,d=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const S=[],b=p/i,v=o+b*a,w=t*Math.cos(v),E=Math.sqrt(t*t-w*w);let R=0;p===0&&o===0?R=.5/e:p===i&&l===Math.PI&&(R=-.5/e);for(let M=0;M<=e;M++){const A=M/e,N=s+A*r;h.x=-E*Math.cos(N),h.y=w,h.z=E*Math.sin(N),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(A+R,1-b),S.push(c++)}u.push(S)}for(let p=0;p<i;p++)for(let S=0;S<e;S++){const b=u[p][S+1],v=u[p][S],w=u[p+1][S],E=u[p+1][S+1];(p!==0||o>0)&&d.push(b,v,E),(p!==i-1||l<Math.PI)&&d.push(v,w,E)}this.setIndex(d),this.setAttribute("position",new xe(g,3)),this.setAttribute("normal",new xe(_,3)),this.setAttribute("uv",new xe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Co(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function Pr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(bd(s))s.isRenderTargetTexture?(Vt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(bd(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function en(n){const t={};for(let e=0;e<n.length;e++){const i=Pr(n[e]);for(const s in i)t[s]=i[s]}return t}function bd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function JM(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function U0(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}const jM={clone:Pr,merge:en};var QM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fi extends Ns{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=QM,this.fragmentShader=tS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Pr(t.uniforms),this.uniformsGroups=JM(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const i in t.uniforms){const s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new Ft().setHex(s.value);break;case"v2":this.uniforms[i].value=new gt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new I().fromArray(s.value);break;case"v4":this.uniforms[i].value=new we().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Kt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new se().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class eS extends fi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class kt extends Ns{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nu,this.normalScale=new gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=wh,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class nS extends Ns{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_v,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class iS extends Ns{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class F0 extends Ie{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const mc=new se,Ed=new I,Td=new I;class sS{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new gt(512,512),this.mapType=xn,this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hh,this._frameExtents=new gt(1,1),this._viewportCount=1,this._viewports=[new we(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Ed.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ed),Td.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Td),e.updateMatrixWorld(),mc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mc,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Eo||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(mc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ma=new I,ga=new Vn,$n=new I;class O0 extends Ie{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ma,ga,$n),$n.x===1&&$n.y===1&&$n.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ma,ga,$n.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(ma,ga,$n),$n.x===1&&$n.y===1&&$n.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ma,ga,$n.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const $i=new I,wd=new gt,Ad=new gt;class In extends O0{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=To*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Sr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return To*2*Math.atan(Math.tan(Sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){$i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($i.x,$i.y).multiplyScalar(-t/$i.z),$i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($i.x,$i.y).multiplyScalar(-t/$i.z)}getViewSize(t,e){return this.getViewBounds(t,wd,Ad),e.subVectors(Ad,wd)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Sr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class bl extends O0{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class rS extends sS{constructor(){super(new bl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class oS extends F0{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.shadow=new rS}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class aS extends F0{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const er=-90,nr=1;class lS extends Ie{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new In(er,nr,t,e);s.layers=this.layers,this.add(s);const r=new In(er,nr,t,e);r.layers=this.layers,this.add(r);const o=new In(er,nr,t,e);o.layers=this.layers,this.add(o);const a=new In(er,nr,t,e);a.layers=this.layers,this.add(a);const l=new In(er,nr,t,e);l.layers=this.layers,this.add(l);const c=new In(er,nr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===si)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Eo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class cS extends In{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Rd=new se;class uS{constructor(t,e,i=0,s=1/0){this.ray=new yl(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Bh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):re("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Rd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Rd),this}intersectObject(t,e=!0,i=[]){return Hu(t,this,i,e),i.sort(Cd),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Hu(t[s],this,i,e);return i.sort(Cd),i}}function Cd(n,t){return n.distance-t.distance}function Hu(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Hu(r[o],t,e,!0)}}class hS{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Vt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class Pd{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const tf=class tf{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};tf.prototype.isMatrix2=!0;let Ld=tf;class fS extends as{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Vt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Dd(n,t,e,i){const s=dS(i);switch(e){case h0:return n*t;case Ph:return n*t/s.components*s.byteLength;case Lh:return n*t/s.components*s.byteLength;case Rs:return n*t*2/s.components*s.byteLength;case Dh:return n*t*2/s.components*s.byteLength;case f0:return n*t*3/s.components*s.byteLength;case On:return n*t*4/s.components*s.byteLength;case Ih:return n*t*4/s.components*s.byteLength;case Ba:case za:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ha:case Ga:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ru:case au:return Math.max(n,16)*Math.max(t,8)/4;case su:case ou:return Math.max(n,8)*Math.max(t,8)/2;case lu:case cu:case hu:case fu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case uu:case Qa:case du:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case pu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case mu:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case gu:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case _u:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case xu:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case vu:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Mu:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Su:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case yu:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case bu:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Eu:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Tu:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case wu:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Au:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ru:case Cu:case Pu:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Lu:case Du:return Math.ceil(n/4)*Math.ceil(t/4)*8;case tl:case Iu:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function dS(n){switch(n){case xn:case a0:return{byteLength:1,components:1};case yo:case l0:case Ni:return{byteLength:2,components:1};case Rh:case Ch:return{byteLength:2,components:4};case ui:case Ah:case Fn:return{byteLength:4,components:1};case c0:case u0:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Th}}));typeof window<"u"&&(window.__THREE__?Vt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Th);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function B0(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function pS(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],_=h[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const _=h[d];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var mS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gS=`#ifdef USE_ALPHAHASH
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
#endif`,_S=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,MS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,SS=`#ifdef USE_AOMAP
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
#endif`,yS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bS=`#ifdef USE_BATCHING
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
#endif`,ES=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,TS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,AS=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,RS=`#ifdef USE_IRIDESCENCE
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
#endif`,CS=`#ifdef USE_BUMPMAP
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
#endif`,PS=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,LS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,DS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,IS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,NS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,US=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,FS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,OS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,BS=`#define PI 3.141592653589793
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
} // validated`,zS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,HS=`vec3 transformedNormal = objectNormal;
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
#endif`,GS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,VS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,WS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,XS="gl_FragColor = linearToOutputTexel( gl_FragColor );",YS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qS=`#ifdef USE_ENVMAP
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
#endif`,$S=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,KS=`#ifdef USE_ENVMAP
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
#endif`,ZS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,JS=`#ifdef USE_ENVMAP
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
#endif`,jS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,QS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ty=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ey=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ny=`#ifdef USE_GRADIENTMAP
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
}`,iy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ry=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,oy=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ay=`#ifdef USE_ENVMAP
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
#endif`,ly=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fy=`PhysicalMaterial material;
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
#endif`,dy=`uniform sampler2D dfgLUT;
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
}`,py=`
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
#endif`,my=`#if defined( RE_IndirectDiffuse )
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
#endif`,gy=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_y=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,xy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,My=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,by=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ey=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ty=`#if defined( USE_POINTS_UV )
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
#endif`,wy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ay=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ry=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Py=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ly=`#ifdef USE_MORPHTARGETS
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
#endif`,Dy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Iy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ny=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Uy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Oy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,By=`#ifdef USE_NORMALMAP
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
#endif`,zy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ky=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Xy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$y=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ky=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,tb=`float getShadowMask() {
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
}`,eb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nb=`#ifdef USE_SKINNING
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
#endif`,ib=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sb=`#ifdef USE_SKINNING
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
#endif`,rb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ob=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ab=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cb=`#ifdef USE_TRANSMISSION
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
#endif`,ub=`#ifdef USE_TRANSMISSION
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
#endif`,hb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,db=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gb=`uniform sampler2D t2D;
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
}`,_b=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sb=`#include <common>
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
}`,yb=`#if DEPTH_PACKING == 3200
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
}`,bb=`#define DISTANCE
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
}`,Eb=`#define DISTANCE
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
}`,Tb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ab=`uniform float scale;
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
}`,Rb=`uniform vec3 diffuse;
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
}`,Cb=`#include <common>
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
}`,Pb=`uniform vec3 diffuse;
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
}`,Lb=`#define LAMBERT
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
}`,Db=`#define LAMBERT
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
}`,Ib=`#define MATCAP
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
}`,Nb=`#define MATCAP
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
}`,Ub=`#define NORMAL
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
}`,Fb=`#define NORMAL
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
}`,Ob=`#define PHONG
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
}`,Bb=`#define PHONG
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
}`,zb=`#define STANDARD
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
}`,Hb=`#define STANDARD
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
}`,Gb=`#define TOON
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
}`,Vb=`#define TOON
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
}`,kb=`uniform float size;
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
}`,Wb=`uniform vec3 diffuse;
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
}`,Xb=`#include <common>
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
}`,Yb=`uniform vec3 color;
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
}`,qb=`uniform float rotation;
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
}`,$b=`uniform vec3 diffuse;
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
}`,te={alphahash_fragment:mS,alphahash_pars_fragment:gS,alphamap_fragment:_S,alphamap_pars_fragment:xS,alphatest_fragment:vS,alphatest_pars_fragment:MS,aomap_fragment:SS,aomap_pars_fragment:yS,batching_pars_vertex:bS,batching_vertex:ES,begin_vertex:TS,beginnormal_vertex:wS,bsdfs:AS,iridescence_fragment:RS,bumpmap_pars_fragment:CS,clipping_planes_fragment:PS,clipping_planes_pars_fragment:LS,clipping_planes_pars_vertex:DS,clipping_planes_vertex:IS,color_fragment:NS,color_pars_fragment:US,color_pars_vertex:FS,color_vertex:OS,common:BS,cube_uv_reflection_fragment:zS,defaultnormal_vertex:HS,displacementmap_pars_vertex:GS,displacementmap_vertex:VS,emissivemap_fragment:kS,emissivemap_pars_fragment:WS,colorspace_fragment:XS,colorspace_pars_fragment:YS,envmap_fragment:qS,envmap_common_pars_fragment:$S,envmap_pars_fragment:KS,envmap_pars_vertex:ZS,envmap_physical_pars_fragment:ay,envmap_vertex:JS,fog_vertex:jS,fog_pars_vertex:QS,fog_fragment:ty,fog_pars_fragment:ey,gradientmap_pars_fragment:ny,lightmap_pars_fragment:iy,lights_lambert_fragment:sy,lights_lambert_pars_fragment:ry,lights_pars_begin:oy,lights_toon_fragment:ly,lights_toon_pars_fragment:cy,lights_phong_fragment:uy,lights_phong_pars_fragment:hy,lights_physical_fragment:fy,lights_physical_pars_fragment:dy,lights_fragment_begin:py,lights_fragment_maps:my,lights_fragment_end:gy,lightprobes_pars_fragment:_y,logdepthbuf_fragment:xy,logdepthbuf_pars_fragment:vy,logdepthbuf_pars_vertex:My,logdepthbuf_vertex:Sy,map_fragment:yy,map_pars_fragment:by,map_particle_fragment:Ey,map_particle_pars_fragment:Ty,metalnessmap_fragment:wy,metalnessmap_pars_fragment:Ay,morphinstance_vertex:Ry,morphcolor_vertex:Cy,morphnormal_vertex:Py,morphtarget_pars_vertex:Ly,morphtarget_vertex:Dy,normal_fragment_begin:Iy,normal_fragment_maps:Ny,normal_pars_fragment:Uy,normal_pars_vertex:Fy,normal_vertex:Oy,normalmap_pars_fragment:By,clearcoat_normal_fragment_begin:zy,clearcoat_normal_fragment_maps:Hy,clearcoat_pars_fragment:Gy,iridescence_pars_fragment:Vy,opaque_fragment:ky,packing:Wy,premultiplied_alpha_fragment:Xy,project_vertex:Yy,dithering_fragment:qy,dithering_pars_fragment:$y,roughnessmap_fragment:Ky,roughnessmap_pars_fragment:Zy,shadowmap_pars_fragment:Jy,shadowmap_pars_vertex:jy,shadowmap_vertex:Qy,shadowmask_pars_fragment:tb,skinbase_vertex:eb,skinning_pars_vertex:nb,skinning_vertex:ib,skinnormal_vertex:sb,specularmap_fragment:rb,specularmap_pars_fragment:ob,tonemapping_fragment:ab,tonemapping_pars_fragment:lb,transmission_fragment:cb,transmission_pars_fragment:ub,uv_pars_fragment:hb,uv_pars_vertex:fb,uv_vertex:db,worldpos_vertex:pb,background_vert:mb,background_frag:gb,backgroundCube_vert:_b,backgroundCube_frag:xb,cube_vert:vb,cube_frag:Mb,depth_vert:Sb,depth_frag:yb,distance_vert:bb,distance_frag:Eb,equirect_vert:Tb,equirect_frag:wb,linedashed_vert:Ab,linedashed_frag:Rb,meshbasic_vert:Cb,meshbasic_frag:Pb,meshlambert_vert:Lb,meshlambert_frag:Db,meshmatcap_vert:Ib,meshmatcap_frag:Nb,meshnormal_vert:Ub,meshnormal_frag:Fb,meshphong_vert:Ob,meshphong_frag:Bb,meshphysical_vert:zb,meshphysical_frag:Hb,meshtoon_vert:Gb,meshtoon_frag:Vb,points_vert:kb,points_frag:Wb,shadow_vert:Xb,shadow_frag:Yb,sprite_vert:qb,sprite_frag:$b},Tt={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},ei={basic:{uniforms:en([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:en([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new Ft(0)},envMapIntensity:{value:1}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:en([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:en([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:en([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new Ft(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:en([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:en([Tt.points,Tt.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:en([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:en([Tt.common,Tt.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:en([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:en([Tt.sprite,Tt.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distance:{uniforms:en([Tt.common,Tt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distance_vert,fragmentShader:te.distance_frag},shadow:{uniforms:en([Tt.lights,Tt.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};ei.physical={uniforms:en([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};const _a={r:0,b:0,g:0},Kb=new se,z0=new Kt;z0.set(-1,0,0,0,1,0,0,0,1);function Zb(n,t,e,i,s,r){const o=new Ft(0);let a=s===!0?0:1,l,c,u=null,h=0,f=null;function d(S){let b=S.isScene===!0?S.background:null;if(b&&b.isTexture){const v=S.backgroundBlurriness>0;b=t.get(b,v)}return b}function g(S){let b=!1;const v=d(S);v===null?m(o,a):v&&v.isColor&&(m(v,1),b=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(S,b){const v=d(b);v&&(v.isCubeTexture||v.mapping===Sl)?(c===void 0&&(c=new bt(new Pt(1,1,1),new fi({name:"BackgroundCubeMaterial",uniforms:Pr(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Kb.makeRotationFromEuler(b.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(z0),c.material.toneMapped=oe.getTransfer(v.colorSpace)!==he,(u!==v||h!==v.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=v,h=v.version,f=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new bt(new Te(2,2),new fi({name:"BackgroundMaterial",uniforms:Pr(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:os,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=oe.getTransfer(v.colorSpace)!==he,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||h!==v.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=v,h=v.version,f=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,b){S.getRGB(_a,U0(n)),e.buffers.color.setClear(_a.r,_a.g,_a.b,b,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,b=1){o.set(S),a=b,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(S){a=S,m(o,a)},render:g,addToRenderList:_,dispose:p}}function Jb(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(L,F,q,Z,G){let B=!1;const U=h(L,Z,q,F);r!==U&&(r=U,c(r.object)),B=d(L,Z,q,G),B&&g(L,Z,q,G),G!==null&&t.update(G,n.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,v(L,F,q,Z),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return n.createVertexArray()}function c(L){return n.bindVertexArray(L)}function u(L){return n.deleteVertexArray(L)}function h(L,F,q,Z){const G=Z.wireframe===!0;let B=i[F.id];B===void 0&&(B={},i[F.id]=B);const U=L.isInstancedMesh===!0?L.id:0;let k=B[U];k===void 0&&(k={},B[U]=k);let J=k[q.id];J===void 0&&(J={},k[q.id]=J);let at=J[G];return at===void 0&&(at=f(l()),J[G]=at),at}function f(L){const F=[],q=[],Z=[];for(let G=0;G<e;G++)F[G]=0,q[G]=0,Z[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:q,attributeDivisors:Z,object:L,attributes:{},index:null}}function d(L,F,q,Z){const G=r.attributes,B=F.attributes;let U=0;const k=q.getAttributes();for(const J in k)if(k[J].location>=0){const _t=G[J];let Mt=B[J];if(Mt===void 0&&(J==="instanceMatrix"&&L.instanceMatrix&&(Mt=L.instanceMatrix),J==="instanceColor"&&L.instanceColor&&(Mt=L.instanceColor)),_t===void 0||_t.attribute!==Mt||Mt&&_t.data!==Mt.data)return!0;U++}return r.attributesNum!==U||r.index!==Z}function g(L,F,q,Z){const G={},B=F.attributes;let U=0;const k=q.getAttributes();for(const J in k)if(k[J].location>=0){let _t=B[J];_t===void 0&&(J==="instanceMatrix"&&L.instanceMatrix&&(_t=L.instanceMatrix),J==="instanceColor"&&L.instanceColor&&(_t=L.instanceColor));const Mt={};Mt.attribute=_t,_t&&_t.data&&(Mt.data=_t.data),G[J]=Mt,U++}r.attributes=G,r.attributesNum=U,r.index=Z}function _(){const L=r.newAttributes;for(let F=0,q=L.length;F<q;F++)L[F]=0}function m(L){p(L,0)}function p(L,F){const q=r.newAttributes,Z=r.enabledAttributes,G=r.attributeDivisors;q[L]=1,Z[L]===0&&(n.enableVertexAttribArray(L),Z[L]=1),G[L]!==F&&(n.vertexAttribDivisor(L,F),G[L]=F)}function S(){const L=r.newAttributes,F=r.enabledAttributes;for(let q=0,Z=F.length;q<Z;q++)F[q]!==L[q]&&(n.disableVertexAttribArray(q),F[q]=0)}function b(L,F,q,Z,G,B,U){U===!0?n.vertexAttribIPointer(L,F,q,G,B):n.vertexAttribPointer(L,F,q,Z,G,B)}function v(L,F,q,Z){_();const G=Z.attributes,B=q.getAttributes(),U=F.defaultAttributeValues;for(const k in B){const J=B[k];if(J.location>=0){let at=G[k];if(at===void 0&&(k==="instanceMatrix"&&L.instanceMatrix&&(at=L.instanceMatrix),k==="instanceColor"&&L.instanceColor&&(at=L.instanceColor)),at!==void 0){const _t=at.normalized,Mt=at.itemSize,ie=t.get(at);if(ie===void 0)continue;const ve=ie.buffer,Yt=ie.type,tt=ie.bytesPerElement,mt=Yt===n.INT||Yt===n.UNSIGNED_INT||at.gpuType===Ah;if(at.isInterleavedBufferAttribute){const ht=at.data,qt=ht.stride,$t=at.offset;if(ht.isInstancedInterleavedBuffer){for(let Wt=0;Wt<J.locationSize;Wt++)p(J.location+Wt,ht.meshPerAttribute);L.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let Wt=0;Wt<J.locationSize;Wt++)m(J.location+Wt);n.bindBuffer(n.ARRAY_BUFFER,ve);for(let Wt=0;Wt<J.locationSize;Wt++)b(J.location+Wt,Mt/J.locationSize,Yt,_t,qt*tt,($t+Mt/J.locationSize*Wt)*tt,mt)}else{if(at.isInstancedBufferAttribute){for(let ht=0;ht<J.locationSize;ht++)p(J.location+ht,at.meshPerAttribute);L.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let ht=0;ht<J.locationSize;ht++)m(J.location+ht);n.bindBuffer(n.ARRAY_BUFFER,ve);for(let ht=0;ht<J.locationSize;ht++)b(J.location+ht,Mt/J.locationSize,Yt,_t,Mt*tt,Mt/J.locationSize*ht*tt,mt)}}else if(U!==void 0){const _t=U[k];if(_t!==void 0)switch(_t.length){case 2:n.vertexAttrib2fv(J.location,_t);break;case 3:n.vertexAttrib3fv(J.location,_t);break;case 4:n.vertexAttrib4fv(J.location,_t);break;default:n.vertexAttrib1fv(J.location,_t)}}}}S()}function w(){A();for(const L in i){const F=i[L];for(const q in F){const Z=F[q];for(const G in Z){const B=Z[G];for(const U in B)u(B[U].object),delete B[U];delete Z[G]}}delete i[L]}}function E(L){if(i[L.id]===void 0)return;const F=i[L.id];for(const q in F){const Z=F[q];for(const G in Z){const B=Z[G];for(const U in B)u(B[U].object),delete B[U];delete Z[G]}}delete i[L.id]}function R(L){for(const F in i){const q=i[F];for(const Z in q){const G=q[Z];if(G[L.id]===void 0)continue;const B=G[L.id];for(const U in B)u(B[U].object),delete B[U];delete G[L.id]}}}function M(L){for(const F in i){const q=i[F],Z=L.isInstancedMesh===!0?L.id:0,G=q[Z];if(G!==void 0){for(const B in G){const U=G[B];for(const k in U)u(U[k].object),delete U[k];delete G[B]}delete q[Z],Object.keys(q).length===0&&delete i[F]}}}function A(){N(),o=!0,r!==s&&(r=s,c(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:N,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:M,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function jb(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function o(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),e.update(c,i,u))}function a(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let f=0;for(let d=0;d<u;d++)f+=c[d];e.update(f,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Qb(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==On&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const M=R===Ni&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==xn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Fn&&!M)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(Vt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&f===!1&&Vt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:b,maxFragmentUniforms:v,maxSamples:w,samples:E}}function tE(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new ts,a=new Kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||s;return s=f,i=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const S=r?0:i,b=S*4;let v=p.clippingState||null;l.value=v,v=u(g,f,b,d);for(let w=0;w!==b;++w)v[w]=e[w];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,d,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,v=d;b!==_;++b,v+=4)o.copy(h[b]).applyMatrix4(S,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}const ss=4,Id=[.125,.215,.35,.446,.526,.582],vs=20,eE=256,$r=new bl,Nd=new Ft;let gc=null,_c=0,xc=0,vc=!1;const nE=new I;class Ud{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=nE}=r;gc=this._renderer.getRenderTarget(),_c=this._renderer.getActiveCubeFace(),xc=this._renderer.getActiveMipmapLevel(),vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Od(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(gc,_c,xc),this._renderer.xr.enabled=vc,t.scissorTest=!1,ir(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===As||t.mapping===Ar?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),gc=this._renderer.getRenderTarget(),_c=this._renderer.getActiveCubeFace(),xc=this._renderer.getActiveMipmapLevel(),vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:$e,minFilter:$e,generateMipmaps:!1,type:Ni,format:On,colorSpace:el,depthBuffer:!1},s=Fd(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fd(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=iE(r)),this._blurMaterial=rE(r,t,e),this._ggxMaterial=sE(r,t,e)}return s}_compileMaterial(t){const e=new bt(new Ge,t);this._renderer.compile(e,$r)}_sceneToCubeUV(t,e,i,s,r){const l=new In(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Nd),h.toneMapping=Hn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new bt(new Pt,new le({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let p=!1;const S=t.background;S?S.isColor&&(m.color.copy(S),t.background=null,p=!0):(m.color.copy(Nd),p=!0);for(let b=0;b<6;b++){const v=b%3;v===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[b],r.y,r.z)):v===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[b]));const w=this._cubeSize;ir(s,v*w,b>2?w:0,w,w),h.setRenderTarget(s),p&&h.render(_,l),h.render(t,l)}h.toneMapping=d,h.autoClear=f,t.background=S}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===As||t.mapping===Ar;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Od());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;ir(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,$r)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),f=0+c*1.25,d=h*f,{_lodMax:g}=this,_=this._sizeLods[i],m=3*_*(i>g-ss?i-g+ss:0),p=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-e,ir(r,m,p,3*_,2*_),s.setRenderTarget(r),s.render(a,$r),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,ir(t,m,p,3*_,2*_),s.setRenderTarget(t),s.render(a,$r)}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&re("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[s];h.material=c;const f=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*vs-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):vs;m>vs&&Vt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${vs}`);const p=[];let S=0;for(let R=0;R<vs;++R){const M=R/_,A=Math.exp(-M*M/2);p.push(A),R===0?S+=A:R<m&&(S+=2*A)}for(let R=0;R<p.length;R++)p[R]=p[R]/S;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:b}=this;f.dTheta.value=g,f.mipInt.value=b-i;const v=this._sizeLods[s],w=3*v*(s>b-ss?s-b+ss:0),E=4*(this._cubeSize-v);ir(e,w,E,3*v,2*v),l.setRenderTarget(e),l.render(h,$r)}}function iE(n){const t=[],e=[],i=[];let s=n;const r=n-ss+1+Id.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>n-ss?l=Id[o-n+ss-1]:o===0&&(l=0),e.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,m=2,p=1,S=new Float32Array(_*g*d),b=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let E=0;E<d;E++){const R=E%3*2/3-1,M=E>2?0:-1,A=[R,M,0,R+2/3,M,0,R+2/3,M+1,0,R,M,0,R+2/3,M+1,0,R,M+1,0];S.set(A,_*g*E),b.set(f,m*g*E);const N=[E,E,E,E,E,E];v.set(N,p*g*E)}const w=new Ge;w.setAttribute("position",new fn(S,_)),w.setAttribute("uv",new fn(b,m)),w.setAttribute("faceIndex",new fn(v,p)),i.push(new bt(w,null)),s>ss&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function Fd(n,t,e){const i=new ai(n,t,e);return i.texture.mapping=Sl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ir(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function sE(n,t,e){return new fi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:eE,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:El(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function rE(n,t,e){const i=new Float32Array(vs),s=new I(0,1,0);return new fi({name:"SphericalGaussianBlur",defines:{n:vs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:El(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Od(){return new fi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:El(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Bd(){return new fi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:El(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function El(){return`

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
	`}class H0 extends ai{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new b0(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Pt(5,5,5),r=new fi({name:"CubemapFromEquirect",uniforms:Pr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:hn,blending:Ci});r.uniforms.tEquirect.value=e;const o=new bt(s,r),a=e.minFilter;return e.minFilter===Ms&&(e.minFilter=$e),new lS(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}function oE(n){let t=new WeakMap,e=new WeakMap,i=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===Oa||d===zl)if(t.has(f)){const g=t.get(f).texture;return a(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const _=new H0(g.height);return _.fromEquirectangularTexture(n,f),t.set(f,_),f.addEventListener("dispose",c),a(_.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const d=f.mapping,g=d===Oa||d===zl,_=d===As||d===Ar;if(g||_){let m=e.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return i===null&&(i=new Ud(n)),m=g?i.fromEquirectangular(f,m):i.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{const S=f.image;return g&&S&&S.height>0||_&&S&&l(S)?(i===null&&(i=new Ud(n)),m=g?i.fromEquirectangular(f):i.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function a(f,d){return d===Oa?f.mapping=As:d===zl&&(f.mapping=Ar),f}function l(f){let d=0;const g=6;for(let _=0;_<g;_++)f[_]!==void 0&&d++;return d===g}function c(f){const d=f.target;d.removeEventListener("dispose",c);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function u(f){const d=f.target;d.removeEventListener("dispose",u);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function h(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function aE(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Mr("WebGLRenderer: "+i+" extension not supported."),s}}}function lE(n,t,e,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)t.update(f[d],n.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,g=h.attributes.position;let _=0;if(g===void 0)return;if(d!==null){const S=d.array;_=d.version;for(let b=0,v=S.length;b<v;b+=3){const w=S[b+0],E=S[b+1],R=S[b+2];f.push(w,E,E,R,R,w)}}else{const S=g.array;_=g.version;for(let b=0,v=S.length/3-1;b<v;b+=3){const w=b+0,E=b+1,R=b+2;f.push(w,E,E,R,R,w)}}const m=new(g.count>=65535?_0:g0)(f,1);m.version=_;const p=r.get(h);p&&t.remove(p),r.set(h,m)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function cE(n,t,e){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,f){n.drawElements(i,f,r,h*o),e.update(f,i,1)}function c(h,f,d){d!==0&&(n.drawElementsInstanced(i,f,r,h*o,d),e.update(f,i,d))}function u(h,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,h,0,d);let _=0;for(let m=0;m<d;m++)_+=f[m];e.update(_,i,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function uE(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:re("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function hE(n,t,e){const i=new WeakMap,s=new we;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let N=function(){M.dispose(),i.delete(a),a.removeEventListener("dispose",N)};var d=N;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let w=a.attributes.position.count*v,E=1;w>t.maxTextureSize&&(E=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const R=new Float32Array(w*E*4*h),M=new p0(R,w,E,h);M.type=Fn,M.needsUpdate=!0;const A=v*4;for(let L=0;L<h;L++){const F=p[L],q=S[L],Z=b[L],G=w*E*4*L;for(let B=0;B<F.count;B++){const U=B*A;g===!0&&(s.fromBufferAttribute(F,B),R[G+U+0]=s.x,R[G+U+1]=s.y,R[G+U+2]=s.z,R[G+U+3]=0),_===!0&&(s.fromBufferAttribute(q,B),R[G+U+4]=s.x,R[G+U+5]=s.y,R[G+U+6]=s.z,R[G+U+7]=0),m===!0&&(s.fromBufferAttribute(Z,B),R[G+U+8]=s.x,R[G+U+9]=s.y,R[G+U+10]=s.z,R[G+U+11]=Z.itemSize===4?s.w:1)}}f={count:h,texture:M,size:new gt(w,E)},i.set(a,f),a.addEventListener("dispose",N)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function fE(n,t,e,i,s){let r=new WeakMap;function o(c){const u=s.render.frame,h=c.geometry,f=t.get(c,h);if(r.get(f)!==u&&(t.update(f),r.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return f}function a(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}const dE={[Qm]:"LINEAR_TONE_MAPPING",[t0]:"REINHARD_TONE_MAPPING",[e0]:"CINEON_TONE_MAPPING",[n0]:"ACES_FILMIC_TONE_MAPPING",[s0]:"AGX_TONE_MAPPING",[r0]:"NEUTRAL_TONE_MAPPING",[i0]:"CUSTOM_TONE_MAPPING"};function pE(n,t,e,i,s,r){const o=new ai(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Rr(t,e):void 0}),a=new ai(t,e,{type:Ni,depthBuffer:!1,stencilBuffer:!1}),l=new Ge;l.setAttribute("position",new xe([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new xe([0,2,0,0,2,0],2));const c=new eS({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new bt(l,c),h=new bl(-1,1,1,-1,0,1);let f=null,d=null,g=!1,_,m=null,p=[],S=!1;this.setSize=function(b,v){o.setSize(b,v),a.setSize(b,v);for(let w=0;w<p.length;w++){const E=p[w];E.setSize&&E.setSize(b,v)}},this.setEffects=function(b){p=b,S=p.length>0&&p[0].isRenderPass===!0;const v=o.width,w=o.height;for(let E=0;E<p.length;E++){const R=p[E];R.setSize&&R.setSize(v,w)}},this.begin=function(b,v){if(g||b.toneMapping===Hn&&p.length===0)return!1;if(m=v,v!==null){const w=v.width,E=v.height;(o.width!==w||o.height!==E)&&this.setSize(w,E)}return S===!1&&b.setRenderTarget(o),_=b.toneMapping,b.toneMapping=Hn,!0},this.hasRenderPass=function(){return S},this.end=function(b,v){b.toneMapping=_,g=!0;let w=o,E=a;for(let R=0;R<p.length;R++){const M=p[R];if(M.enabled!==!1&&(M.render(b,E,w,v),M.needsSwap!==!1)){const A=w;w=E,E=A}}if(f!==b.outputColorSpace||d!==b.toneMapping){f=b.outputColorSpace,d=b.toneMapping,c.defines={},oe.getTransfer(f)===he&&(c.defines.SRGB_TRANSFER="");const R=dE[d];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,b.setRenderTarget(m),b.render(u,h),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}const G0=new Ze,Gu=new Rr(1,1),V0=new p0,k0=new Zv,W0=new b0,zd=[],Hd=[],Gd=new Float32Array(16),Vd=new Float32Array(9),kd=new Float32Array(4);function Nr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=zd[s];if(r===void 0&&(r=new Float32Array(s),zd[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Be(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ze(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Tl(n,t){let e=Hd[t];e===void 0&&(e=new Int32Array(t),Hd[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function mE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function gE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2fv(this.addr,t),ze(e,t)}}function _E(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;n.uniform3fv(this.addr,t),ze(e,t)}}function xE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4fv(this.addr,t),ze(e,t)}}function vE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,i))return;kd.set(i),n.uniformMatrix2fv(this.addr,!1,kd),ze(e,i)}}function ME(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,i))return;Vd.set(i),n.uniformMatrix3fv(this.addr,!1,Vd),ze(e,i)}}function SE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,i))return;Gd.set(i),n.uniformMatrix4fv(this.addr,!1,Gd),ze(e,i)}}function yE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function bE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2iv(this.addr,t),ze(e,t)}}function EE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;n.uniform3iv(this.addr,t),ze(e,t)}}function TE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4iv(this.addr,t),ze(e,t)}}function wE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function AE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2uiv(this.addr,t),ze(e,t)}}function RE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;n.uniform3uiv(this.addr,t),ze(e,t)}}function CE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4uiv(this.addr,t),ze(e,t)}}function PE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Gu.compareFunction=e.isReversedDepthBuffer()?Uh:Nh,r=Gu):r=G0,e.setTexture2D(t||r,s)}function LE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||k0,s)}function DE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||W0,s)}function IE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||V0,s)}function NE(n){switch(n){case 5126:return mE;case 35664:return gE;case 35665:return _E;case 35666:return xE;case 35674:return vE;case 35675:return ME;case 35676:return SE;case 5124:case 35670:return yE;case 35667:case 35671:return bE;case 35668:case 35672:return EE;case 35669:case 35673:return TE;case 5125:return wE;case 36294:return AE;case 36295:return RE;case 36296:return CE;case 35678:case 36198:case 36298:case 36306:case 35682:return PE;case 35679:case 36299:case 36307:return LE;case 35680:case 36300:case 36308:case 36293:return DE;case 36289:case 36303:case 36311:case 36292:return IE}}function UE(n,t){n.uniform1fv(this.addr,t)}function FE(n,t){const e=Nr(t,this.size,2);n.uniform2fv(this.addr,e)}function OE(n,t){const e=Nr(t,this.size,3);n.uniform3fv(this.addr,e)}function BE(n,t){const e=Nr(t,this.size,4);n.uniform4fv(this.addr,e)}function zE(n,t){const e=Nr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function HE(n,t){const e=Nr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function GE(n,t){const e=Nr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function VE(n,t){n.uniform1iv(this.addr,t)}function kE(n,t){n.uniform2iv(this.addr,t)}function WE(n,t){n.uniform3iv(this.addr,t)}function XE(n,t){n.uniform4iv(this.addr,t)}function YE(n,t){n.uniform1uiv(this.addr,t)}function qE(n,t){n.uniform2uiv(this.addr,t)}function $E(n,t){n.uniform3uiv(this.addr,t)}function KE(n,t){n.uniform4uiv(this.addr,t)}function ZE(n,t,e){const i=this.cache,s=t.length,r=Tl(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Gu:o=G0;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function JE(n,t,e){const i=this.cache,s=t.length,r=Tl(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||k0,r[o])}function jE(n,t,e){const i=this.cache,s=t.length,r=Tl(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||W0,r[o])}function QE(n,t,e){const i=this.cache,s=t.length,r=Tl(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||V0,r[o])}function tT(n){switch(n){case 5126:return UE;case 35664:return FE;case 35665:return OE;case 35666:return BE;case 35674:return zE;case 35675:return HE;case 35676:return GE;case 5124:case 35670:return VE;case 35667:case 35671:return kE;case 35668:case 35672:return WE;case 35669:case 35673:return XE;case 5125:return YE;case 36294:return qE;case 36295:return $E;case 36296:return KE;case 35678:case 36198:case 36298:case 36306:case 35682:return ZE;case 35679:case 36299:case 36307:return JE;case 35680:case 36300:case 36308:case 36293:return jE;case 36289:case 36303:case 36311:case 36292:return QE}}class eT{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=NE(e.type)}}class nT{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=tT(e.type)}}class iT{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const Mc=/(\w+)(\])?(\[|\.)?/g;function Wd(n,t){n.seq.push(t),n.map[t.id]=t}function sT(n,t,e){const i=n.name,s=i.length;for(Mc.lastIndex=0;;){const r=Mc.exec(i),o=Mc.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Wd(e,c===void 0?new eT(a,n,t):new nT(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new iT(a),Wd(e,h)),e=h}}}class ka{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);sT(a,l,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Xd(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const rT=37297;let oT=0;function aT(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Yd=new Kt;function lT(n){oe._getMatrix(Yd,oe.workingColorSpace,n);const t=`mat3( ${Yd.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(n)){case nl:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return Vt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function qd(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+aT(n.getShaderSource(t),a)}else return r}function cT(n,t){const e=lT(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const uT={[Qm]:"Linear",[t0]:"Reinhard",[e0]:"Cineon",[n0]:"ACESFilmic",[s0]:"AgX",[r0]:"Neutral",[i0]:"Custom"};function hT(n,t){const e=uT[t];return e===void 0?(Vt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const xa=new I;function fT(){oe.getLuminanceCoefficients(xa);const n=xa.x.toFixed(4),t=xa.y.toFixed(4),e=xa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dT(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(no).join(`
`)}function pT(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function mT(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function no(n){return n!==""}function $d(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Kd(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const gT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vu(n){return n.replace(gT,xT)}const _T=new Map;function xT(n,t){let e=te[t];if(e===void 0){const i=_T.get(t);if(i!==void 0)e=te[i],Vt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Vu(e)}const vT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zd(n){return n.replace(vT,MT)}function MT(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Jd(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const ST={[Fa]:"SHADOWMAP_TYPE_PCF",[to]:"SHADOWMAP_TYPE_VSM"};function yT(n){return ST[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const bT={[As]:"ENVMAP_TYPE_CUBE",[Ar]:"ENVMAP_TYPE_CUBE",[Sl]:"ENVMAP_TYPE_CUBE_UV"};function ET(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":bT[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const TT={[Ar]:"ENVMAP_MODE_REFRACTION"};function wT(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":TT[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const AT={[wh]:"ENVMAP_BLENDING_MULTIPLY",[pv]:"ENVMAP_BLENDING_MIX",[mv]:"ENVMAP_BLENDING_ADD"};function RT(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":AT[n.combine]||"ENVMAP_BLENDING_NONE"}function CT(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function PT(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=yT(e),c=ET(e),u=wT(e),h=RT(e),f=CT(e),d=dT(e),g=pT(r),_=s.createProgram();let m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(no).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(no).join(`
`),p.length>0&&(p+=`
`)):(m=[Jd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(no).join(`
`),p=[Jd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Hn?"#define TONE_MAPPING":"",e.toneMapping!==Hn?te.tonemapping_pars_fragment:"",e.toneMapping!==Hn?hT("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,cT("linearToOutputTexel",e.outputColorSpace),fT(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(no).join(`
`)),o=Vu(o),o=$d(o,e),o=Kd(o,e),a=Vu(a),a=$d(a,e),a=Kd(a,e),o=Zd(o),a=Zd(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Xf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Xf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=S+m+o,v=S+p+a,w=Xd(s,s.VERTEX_SHADER,b),E=Xd(s,s.FRAGMENT_SHADER,v);s.attachShader(_,w),s.attachShader(_,E),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(L){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(_)||"",q=s.getShaderInfoLog(w)||"",Z=s.getShaderInfoLog(E)||"",G=F.trim(),B=q.trim(),U=Z.trim();let k=!0,J=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(k=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,w,E);else{const at=qd(s,w,"vertex"),_t=qd(s,E,"fragment");re("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+G+`
`+at+`
`+_t)}else G!==""?Vt("WebGLProgram: Program Info Log:",G):(B===""||U==="")&&(J=!1);J&&(L.diagnostics={runnable:k,programLog:G,vertexShader:{log:B,prefix:m},fragmentShader:{log:U,prefix:p}})}s.deleteShader(w),s.deleteShader(E),M=new ka(s,_),A=mT(s,_)}let M;this.getUniforms=function(){return M===void 0&&R(this),M};let A;this.getAttributes=function(){return A===void 0&&R(this),A};let N=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(_,rT)),N},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=oT++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=E,this}let LT=0;class DT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new IT(t),e.set(t,i)),i}}class IT{constructor(t){this.id=LT++,this.code=t,this.usedTimes=0}}function NT(n){return n===Rs||n===Qa||n===tl}function UT(n,t,e,i,s,r){const o=new Bh,a=new DT,l=new Set,c=[],u=new Map,h=i.logarithmicDepthBuffer;let f=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return l.add(M),M===0?"uv":`uv${M}`}function _(M,A,N,L,F,q){const Z=L.fog,G=F.geometry,B=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?L.environment:null,U=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,k=t.get(M.envMap||B,U),J=k&&k.mapping===Sl?k.image.height:null,at=d[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&Vt("WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const _t=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Mt=_t!==void 0?_t.length:0;let ie=0;G.morphAttributes.position!==void 0&&(ie=1),G.morphAttributes.normal!==void 0&&(ie=2),G.morphAttributes.color!==void 0&&(ie=3);let ve,Yt,tt,mt;if(at){const Ut=ei[at];ve=Ut.vertexShader,Yt=Ut.fragmentShader}else{ve=M.vertexShader,Yt=M.fragmentShader;const Ut=a.getVertexShaderStage(M),Ce=a.getFragmentShaderStage(M);a.update(M,Ut,Ce),tt=Ut.id,mt=Ce.id}const ht=n.getRenderTarget(),qt=n.state.buffers.depth.getReversed(),$t=F.isInstancedMesh===!0,Wt=F.isBatchedMesh===!0,P=!!M.map,D=!!M.matcap,Y=!!k,et=!!M.aoMap,j=!!M.lightMap,st=!!M.bumpMap&&M.wireframe===!1,ft=!!M.normalMap,ct=!!M.displacementMap,lt=!!M.emissiveMap,nt=!!M.metalnessMap,Ct=!!M.roughnessMap,C=M.anisotropy>0,Lt=M.clearcoat>0,Et=M.dispersion>0,T=M.iridescence>0,x=M.sheen>0,O=M.transmission>0,V=C&&!!M.anisotropyMap,K=Lt&&!!M.clearcoatMap,ut=Lt&&!!M.clearcoatNormalMap,pt=Lt&&!!M.clearcoatRoughnessMap,Q=T&&!!M.iridescenceMap,it=T&&!!M.iridescenceThicknessMap,dt=x&&!!M.sheenColorMap,Dt=x&&!!M.sheenRoughnessMap,St=!!M.specularMap,xt=!!M.specularColorMap,Gt=!!M.specularIntensityMap,Xt=O&&!!M.transmissionMap,Jt=O&&!!M.thicknessMap,z=!!M.gradientMap,vt=!!M.alphaMap,rt=M.alphaTest>0,yt=!!M.alphaHash,Rt=!!M.extensions;let ot=Hn;M.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(ot=n.toneMapping);const Bt={shaderID:at,shaderType:M.type,shaderName:M.name,vertexShader:ve,fragmentShader:Yt,defines:M.defines,customVertexShaderID:tt,customFragmentShaderID:mt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Wt,batchingColor:Wt&&F._colorsTexture!==null,instancing:$t,instancingColor:$t&&F.instanceColor!==null,instancingMorph:$t&&F.morphTexture!==null,outputColorSpace:ht===null?n.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:P,matcap:D,envMap:Y,envMapMode:Y&&k.mapping,envMapCubeUVHeight:J,aoMap:et,lightMap:j,bumpMap:st,normalMap:ft,displacementMap:ct,emissiveMap:lt,normalMapObjectSpace:ft&&M.normalMapType===xv,normalMapTangentSpace:ft&&M.normalMapType===Nu,packedNormalMap:ft&&M.normalMapType===Nu&&NT(M.normalMap.format),metalnessMap:nt,roughnessMap:Ct,anisotropy:C,anisotropyMap:V,clearcoat:Lt,clearcoatMap:K,clearcoatNormalMap:ut,clearcoatRoughnessMap:pt,dispersion:Et,iridescence:T,iridescenceMap:Q,iridescenceThicknessMap:it,sheen:x,sheenColorMap:dt,sheenRoughnessMap:Dt,specularMap:St,specularColorMap:xt,specularIntensityMap:Gt,transmission:O,transmissionMap:Xt,thicknessMap:Jt,gradientMap:z,opaque:M.transparent===!1&&M.blending===vr&&M.alphaToCoverage===!1,alphaMap:vt,alphaTest:rt,alphaHash:yt,combine:M.combine,mapUv:P&&g(M.map.channel),aoMapUv:et&&g(M.aoMap.channel),lightMapUv:j&&g(M.lightMap.channel),bumpMapUv:st&&g(M.bumpMap.channel),normalMapUv:ft&&g(M.normalMap.channel),displacementMapUv:ct&&g(M.displacementMap.channel),emissiveMapUv:lt&&g(M.emissiveMap.channel),metalnessMapUv:nt&&g(M.metalnessMap.channel),roughnessMapUv:Ct&&g(M.roughnessMap.channel),anisotropyMapUv:V&&g(M.anisotropyMap.channel),clearcoatMapUv:K&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:ut&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:it&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&g(M.sheenRoughnessMap.channel),specularMapUv:St&&g(M.specularMap.channel),specularColorMapUv:xt&&g(M.specularColorMap.channel),specularIntensityMapUv:Gt&&g(M.specularIntensityMap.channel),transmissionMapUv:Xt&&g(M.transmissionMap.channel),thicknessMapUv:Jt&&g(M.thicknessMap.channel),alphaMapUv:vt&&g(M.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(ft||C),vertexNormals:!!G.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!G.attributes.uv&&(P||vt),fog:!!Z,useFog:M.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||G.attributes.normal===void 0&&ft===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:qt,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Mt,morphTextureStride:ie,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:ot,decodeVideoTexture:P&&M.map.isVideoTexture===!0&&oe.getTransfer(M.map.colorSpace)===he,decodeVideoTextureEmissive:lt&&M.emissiveMap.isVideoTexture===!0&&oe.getTransfer(M.emissiveMap.colorSpace)===he,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Oe,flipSided:M.side===hn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Rt&&M.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Rt&&M.extensions.multiDraw===!0||Wt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Bt.vertexUv1s=l.has(1),Bt.vertexUv2s=l.has(2),Bt.vertexUv3s=l.has(3),l.clear(),Bt}function m(M){const A=[];if(M.shaderID?A.push(M.shaderID):(A.push(M.customVertexShaderID),A.push(M.customFragmentShaderID)),M.defines!==void 0)for(const N in M.defines)A.push(N),A.push(M.defines[N]);return M.isRawShaderMaterial===!1&&(p(A,M),S(A,M),A.push(n.outputColorSpace)),A.push(M.customProgramCacheKey),A.join()}function p(M,A){M.push(A.precision),M.push(A.outputColorSpace),M.push(A.envMapMode),M.push(A.envMapCubeUVHeight),M.push(A.mapUv),M.push(A.alphaMapUv),M.push(A.lightMapUv),M.push(A.aoMapUv),M.push(A.bumpMapUv),M.push(A.normalMapUv),M.push(A.displacementMapUv),M.push(A.emissiveMapUv),M.push(A.metalnessMapUv),M.push(A.roughnessMapUv),M.push(A.anisotropyMapUv),M.push(A.clearcoatMapUv),M.push(A.clearcoatNormalMapUv),M.push(A.clearcoatRoughnessMapUv),M.push(A.iridescenceMapUv),M.push(A.iridescenceThicknessMapUv),M.push(A.sheenColorMapUv),M.push(A.sheenRoughnessMapUv),M.push(A.specularMapUv),M.push(A.specularColorMapUv),M.push(A.specularIntensityMapUv),M.push(A.transmissionMapUv),M.push(A.thicknessMapUv),M.push(A.combine),M.push(A.fogExp2),M.push(A.sizeAttenuation),M.push(A.morphTargetsCount),M.push(A.morphAttributeCount),M.push(A.numDirLights),M.push(A.numPointLights),M.push(A.numSpotLights),M.push(A.numSpotLightMaps),M.push(A.numHemiLights),M.push(A.numRectAreaLights),M.push(A.numDirLightShadows),M.push(A.numPointLightShadows),M.push(A.numSpotLightShadows),M.push(A.numSpotLightShadowsWithMaps),M.push(A.numLightProbes),M.push(A.shadowMapType),M.push(A.toneMapping),M.push(A.numClippingPlanes),M.push(A.numClipIntersection),M.push(A.depthPacking)}function S(M,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),M.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),A.hasPositionAttribute&&o.enable(23),M.push(o.mask)}function b(M){const A=d[M.type];let N;if(A){const L=ei[A];N=jM.clone(L.uniforms)}else N=M.uniforms;return N}function v(M,A){let N=u.get(A);return N!==void 0?++N.usedTimes:(N=new PT(n,A,M,s),c.push(N),u.set(A,N)),N}function w(M){if(--M.usedTimes===0){const A=c.indexOf(M);c[A]=c[c.length-1],c.pop(),u.delete(M.cacheKey),M.destroy()}}function E(M){a.remove(M)}function R(){a.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:b,acquireProgram:v,releaseProgram:w,releaseShaderCache:E,programs:c,dispose:R}}function FT(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function OT(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function jd(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Qd(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,g,_,m,p){let S=n[t];return S===void 0?(S={id:f.id,object:f,geometry:d,material:g,materialVariant:o(f),groupOrder:_,renderOrder:f.renderOrder,z:m,group:p},n[t]=S):(S.id=f.id,S.object=f,S.geometry=d,S.material=g,S.materialVariant=o(f),S.groupOrder=_,S.renderOrder=f.renderOrder,S.z=m,S.group=p),t++,S}function l(f,d,g,_,m,p){const S=a(f,d,g,_,m,p);g.transmission>0?i.push(S):g.transparent===!0?s.push(S):e.push(S)}function c(f,d,g,_,m,p){const S=a(f,d,g,_,m,p);g.transmission>0?i.unshift(S):g.transparent===!0?s.unshift(S):e.unshift(S)}function u(f,d,g){e.length>1&&e.sort(f||OT),i.length>1&&i.sort(d||jd),s.length>1&&s.sort(d||jd),g&&(e.reverse(),i.reverse(),s.reverse())}function h(){for(let f=t,d=n.length;f<d;f++){const g=n[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:h,sort:u}}function BT(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Qd,n.set(i,[o])):s>=r.length?(o=new Qd,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function zT(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Ft};break;case"SpotLight":e={position:new I,direction:new I,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new I,halfWidth:new I,halfHeight:new I};break}return n[t.id]=e,e}}}function HT(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let GT=0;function VT(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function kT(n){const t=new zT,e=HT(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new I);const s=new I,r=new se,o=new se;function a(c){let u=0,h=0,f=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,S=0,b=0,v=0,w=0,E=0,R=0;c.sort(VT);for(let A=0,N=c.length;A<N;A++){const L=c[A],F=L.color,q=L.intensity,Z=L.distance;let G=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Rs?G=L.shadow.map.texture:G=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)u+=F.r*q,h+=F.g*q,f+=F.b*q;else if(L.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(L.sh.coefficients[B],q);R++}else if(L.isDirectionalLight){const B=t.get(L);if(B.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const U=L.shadow,k=e.get(L);k.shadowIntensity=U.intensity,k.shadowBias=U.bias,k.shadowNormalBias=U.normalBias,k.shadowRadius=U.radius,k.shadowMapSize=U.mapSize,i.directionalShadow[d]=k,i.directionalShadowMap[d]=G,i.directionalShadowMatrix[d]=L.shadow.matrix,S++}i.directional[d]=B,d++}else if(L.isSpotLight){const B=t.get(L);B.position.setFromMatrixPosition(L.matrixWorld),B.color.copy(F).multiplyScalar(q),B.distance=Z,B.coneCos=Math.cos(L.angle),B.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),B.decay=L.decay,i.spot[_]=B;const U=L.shadow;if(L.map&&(i.spotLightMap[w]=L.map,w++,U.updateMatrices(L),L.castShadow&&E++),i.spotLightMatrix[_]=U.matrix,L.castShadow){const k=e.get(L);k.shadowIntensity=U.intensity,k.shadowBias=U.bias,k.shadowNormalBias=U.normalBias,k.shadowRadius=U.radius,k.shadowMapSize=U.mapSize,i.spotShadow[_]=k,i.spotShadowMap[_]=G,v++}_++}else if(L.isRectAreaLight){const B=t.get(L);B.color.copy(F).multiplyScalar(q),B.halfWidth.set(L.width*.5,0,0),B.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=B,m++}else if(L.isPointLight){const B=t.get(L);if(B.color.copy(L.color).multiplyScalar(L.intensity),B.distance=L.distance,B.decay=L.decay,L.castShadow){const U=L.shadow,k=e.get(L);k.shadowIntensity=U.intensity,k.shadowBias=U.bias,k.shadowNormalBias=U.normalBias,k.shadowRadius=U.radius,k.shadowMapSize=U.mapSize,k.shadowCameraNear=U.camera.near,k.shadowCameraFar=U.camera.far,i.pointShadow[g]=k,i.pointShadowMap[g]=G,i.pointShadowMatrix[g]=L.shadow.matrix,b++}i.point[g]=B,g++}else if(L.isHemisphereLight){const B=t.get(L);B.skyColor.copy(L.color).multiplyScalar(q),B.groundColor.copy(L.groundColor).multiplyScalar(q),i.hemi[p]=B,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Tt.LTC_FLOAT_1,i.rectAreaLTC2=Tt.LTC_FLOAT_2):(i.rectAreaLTC1=Tt.LTC_HALF_1,i.rectAreaLTC2=Tt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const M=i.hash;(M.directionalLength!==d||M.pointLength!==g||M.spotLength!==_||M.rectAreaLength!==m||M.hemiLength!==p||M.numDirectionalShadows!==S||M.numPointShadows!==b||M.numSpotShadows!==v||M.numSpotMaps!==w||M.numLightProbes!==R)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=v+w-E,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=R,M.directionalLength=d,M.pointLength=g,M.spotLength=_,M.rectAreaLength=m,M.hemiLength=p,M.numDirectionalShadows=S,M.numPointShadows=b,M.numSpotShadows=v,M.numSpotMaps=w,M.numLightProbes=R,i.version=GT++)}function l(c,u){let h=0,f=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const b=c[p];if(b.isDirectionalLight){const v=i.directional[h];v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),h++}else if(b.isSpotLight){const v=i.spot[d];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(b.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const v=i.point[f];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),f++}else if(b.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function tp(n){const t=new kT(n),e=[],i=[],s=[];function r(f){h.camera=f,e.length=0,i.length=0,s.length=0}function o(f){e.push(f)}function a(f){i.push(f)}function l(f){s.push(f)}function c(){t.setup(e)}function u(f){t.setupView(e,f)}const h={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function WT(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new tp(n),t.set(s,[a])):r>=o.length?(a=new tp(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const XT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,YT=`uniform sampler2D shadow_pass;
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
}`,qT=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],$T=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],ep=new se,Kr=new I,Sc=new I;function KT(n,t,e){let i=new Hh;const s=new gt,r=new gt,o=new we,a=new nS,l=new iS,c={},u=e.maxTextureSize,h={[os]:hn,[hn]:os,[Oe]:Oe},f=new fi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:XT,fragmentShader:YT}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Ge;g.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new bt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fa;let p=this.type;this.render=function(E,R,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Kx&&(Vt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Fa);const A=n.getRenderTarget(),N=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Ci),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const q=p!==this.type;q&&R.traverse(function(Z){Z.material&&(Array.isArray(Z.material)?Z.material.forEach(G=>G.needsUpdate=!0):Z.material.needsUpdate=!0)});for(let Z=0,G=E.length;Z<G;Z++){const B=E[Z],U=B.shadow;if(U===void 0){Vt("WebGLShadowMap:",B,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);const k=U.getFrameExtents();s.multiply(k),r.copy(U.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/k.x),s.x=r.x*k.x,U.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/k.y),s.y=r.y*k.y,U.mapSize.y=r.y));const J=n.state.buffers.depth.getReversed();if(U.camera._reversedDepth=J,U.map===null||q===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===to){if(B.isPointLight){Vt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new ai(s.x,s.y,{format:Rs,type:Ni,minFilter:$e,magFilter:$e,generateMipmaps:!1}),U.map.texture.name=B.name+".shadowMap",U.map.depthTexture=new Rr(s.x,s.y,Fn),U.map.depthTexture.name=B.name+".shadowMapDepth",U.map.depthTexture.format=Ui,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Ve,U.map.depthTexture.magFilter=Ve}else B.isPointLight?(U.map=new H0(s.x),U.map.depthTexture=new xM(s.x,ui)):(U.map=new ai(s.x,s.y),U.map.depthTexture=new Rr(s.x,s.y,ui)),U.map.depthTexture.name=B.name+".shadowMap",U.map.depthTexture.format=Ui,this.type===Fa?(U.map.depthTexture.compareFunction=J?Uh:Nh,U.map.depthTexture.minFilter=$e,U.map.depthTexture.magFilter=$e):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Ve,U.map.depthTexture.magFilter=Ve);U.camera.updateProjectionMatrix()}const at=U.map.isWebGLCubeRenderTarget?6:1;for(let _t=0;_t<at;_t++){if(U.map.isWebGLCubeRenderTarget)n.setRenderTarget(U.map,_t),n.clear();else{_t===0&&(n.setRenderTarget(U.map),n.clear());const Mt=U.getViewport(_t);o.set(r.x*Mt.x,r.y*Mt.y,r.x*Mt.z,r.y*Mt.w),F.viewport(o)}if(B.isPointLight){const Mt=U.camera,ie=U.matrix,ve=B.distance||Mt.far;ve!==Mt.far&&(Mt.far=ve,Mt.updateProjectionMatrix()),Kr.setFromMatrixPosition(B.matrixWorld),Mt.position.copy(Kr),Sc.copy(Mt.position),Sc.add(qT[_t]),Mt.up.copy($T[_t]),Mt.lookAt(Sc),Mt.updateMatrixWorld(),ie.makeTranslation(-Kr.x,-Kr.y,-Kr.z),ep.multiplyMatrices(Mt.projectionMatrix,Mt.matrixWorldInverse),U._frustum.setFromProjectionMatrix(ep,Mt.coordinateSystem,Mt.reversedDepth)}else U.updateMatrices(B);i=U.getFrustum(),v(R,M,U.camera,B,this.type)}U.isPointLightShadow!==!0&&this.type===to&&S(U,M),U.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(A,N,L)};function S(E,R){const M=t.update(_);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ai(s.x,s.y,{format:Rs,type:Ni})),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(R,null,M,f,_,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(R,null,M,d,_,null)}function b(E,R,M,A){let N=null;const L=M.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)N=L;else if(N=M.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=N.uuid,q=R.uuid;let Z=c[F];Z===void 0&&(Z={},c[F]=Z);let G=Z[q];G===void 0&&(G=N.clone(),Z[q]=G,R.addEventListener("dispose",w)),N=G}if(N.visible=R.visible,N.wireframe=R.wireframe,A===to?N.side=R.shadowSide!==null?R.shadowSide:R.side:N.side=R.shadowSide!==null?R.shadowSide:h[R.side],N.alphaMap=R.alphaMap,N.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,N.map=R.map,N.clipShadows=R.clipShadows,N.clippingPlanes=R.clippingPlanes,N.clipIntersection=R.clipIntersection,N.displacementMap=R.displacementMap,N.displacementScale=R.displacementScale,N.displacementBias=R.displacementBias,N.wireframeLinewidth=R.wireframeLinewidth,N.linewidth=R.linewidth,M.isPointLight===!0&&N.isMeshDistanceMaterial===!0){const F=n.properties.get(N);F.light=M}return N}function v(E,R,M,A,N){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&N===to)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,E.matrixWorld);const q=t.update(E),Z=E.material;if(Array.isArray(Z)){const G=q.groups;for(let B=0,U=G.length;B<U;B++){const k=G[B],J=Z[k.materialIndex];if(J&&J.visible){const at=b(E,J,A,N);E.onBeforeShadow(n,E,R,M,q,at,k),n.renderBufferDirect(M,null,q,at,E,k),E.onAfterShadow(n,E,R,M,q,at,k)}}}else if(Z.visible){const G=b(E,Z,A,N);E.onBeforeShadow(n,E,R,M,q,G,null),n.renderBufferDirect(M,null,q,G,E,null),E.onAfterShadow(n,E,R,M,q,G,null)}}const F=E.children;for(let q=0,Z=F.length;q<Z;q++)v(F[q],R,M,A,N)}function w(E){E.target.removeEventListener("dispose",w);for(const M in c){const A=c[M],N=E.target.uuid;N in A&&(A[N].dispose(),delete A[N])}}}function ZT(n,t){function e(){let z=!1;const vt=new we;let rt=null;const yt=new we(0,0,0,0);return{setMask:function(Rt){rt!==Rt&&!z&&(n.colorMask(Rt,Rt,Rt,Rt),rt=Rt)},setLocked:function(Rt){z=Rt},setClear:function(Rt,ot,Bt,Ut,Ce){Ce===!0&&(Rt*=Ut,ot*=Ut,Bt*=Ut),vt.set(Rt,ot,Bt,Ut),yt.equals(vt)===!1&&(n.clearColor(Rt,ot,Bt,Ut),yt.copy(vt))},reset:function(){z=!1,rt=null,yt.set(-1,0,0,0)}}}function i(){let z=!1,vt=!1,rt=null,yt=null,Rt=null;return{setReversed:function(ot){if(vt!==ot){const Bt=t.get("EXT_clip_control");ot?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT),vt=ot;const Ut=Rt;Rt=null,this.setClear(Ut)}},getReversed:function(){return vt},setTest:function(ot){ot?ht(n.DEPTH_TEST):qt(n.DEPTH_TEST)},setMask:function(ot){rt!==ot&&!z&&(n.depthMask(ot),rt=ot)},setFunc:function(ot){if(vt&&(ot=Rv[ot]),yt!==ot){switch(ot){case Kc:n.depthFunc(n.NEVER);break;case Zc:n.depthFunc(n.ALWAYS);break;case Jc:n.depthFunc(n.LESS);break;case wr:n.depthFunc(n.LEQUAL);break;case jc:n.depthFunc(n.EQUAL);break;case Qc:n.depthFunc(n.GEQUAL);break;case tu:n.depthFunc(n.GREATER);break;case eu:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}yt=ot}},setLocked:function(ot){z=ot},setClear:function(ot){Rt!==ot&&(Rt=ot,vt&&(ot=1-ot),n.clearDepth(ot))},reset:function(){z=!1,rt=null,yt=null,Rt=null,vt=!1}}}function s(){let z=!1,vt=null,rt=null,yt=null,Rt=null,ot=null,Bt=null,Ut=null,Ce=null;return{setTest:function(Me){z||(Me?ht(n.STENCIL_TEST):qt(n.STENCIL_TEST))},setMask:function(Me){vt!==Me&&!z&&(n.stencilMask(Me),vt=Me)},setFunc:function(Me,Wn,Xn){(rt!==Me||yt!==Wn||Rt!==Xn)&&(n.stencilFunc(Me,Wn,Xn),rt=Me,yt=Wn,Rt=Xn)},setOp:function(Me,Wn,Xn){(ot!==Me||Bt!==Wn||Ut!==Xn)&&(n.stencilOp(Me,Wn,Xn),ot=Me,Bt=Wn,Ut=Xn)},setLocked:function(Me){z=Me},setClear:function(Me){Ce!==Me&&(n.clearStencil(Me),Ce=Me)},reset:function(){z=!1,vt=null,rt=null,yt=null,Rt=null,ot=null,Bt=null,Ut=null,Ce=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},h={},f={},d=new WeakMap,g=[],_=null,m=!1,p=null,S=null,b=null,v=null,w=null,E=null,R=null,M=new Ft(0,0,0),A=0,N=!1,L=null,F=null,q=null,Z=null,G=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,k=0;const J=n.getParameter(n.VERSION);J.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(J)[1]),U=k>=1):J.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),U=k>=2);let at=null,_t={};const Mt=n.getParameter(n.SCISSOR_BOX),ie=n.getParameter(n.VIEWPORT),ve=new we().fromArray(Mt),Yt=new we().fromArray(ie);function tt(z,vt,rt,yt){const Rt=new Uint8Array(4),ot=n.createTexture();n.bindTexture(z,ot),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Bt=0;Bt<rt;Bt++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(vt,0,n.RGBA,1,1,yt,0,n.RGBA,n.UNSIGNED_BYTE,Rt):n.texImage2D(vt+Bt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Rt);return ot}const mt={};mt[n.TEXTURE_2D]=tt(n.TEXTURE_2D,n.TEXTURE_2D,1),mt[n.TEXTURE_CUBE_MAP]=tt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[n.TEXTURE_2D_ARRAY]=tt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),mt[n.TEXTURE_3D]=tt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ht(n.DEPTH_TEST),o.setFunc(wr),st(!1),ft(Gf),ht(n.CULL_FACE),et(Ci);function ht(z){u[z]!==!0&&(n.enable(z),u[z]=!0)}function qt(z){u[z]!==!1&&(n.disable(z),u[z]=!1)}function $t(z,vt){return f[z]!==vt?(n.bindFramebuffer(z,vt),f[z]=vt,z===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=vt),z===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=vt),!0):!1}function Wt(z,vt){let rt=g,yt=!1;if(z){rt=d.get(vt),rt===void 0&&(rt=[],d.set(vt,rt));const Rt=z.textures;if(rt.length!==Rt.length||rt[0]!==n.COLOR_ATTACHMENT0){for(let ot=0,Bt=Rt.length;ot<Bt;ot++)rt[ot]=n.COLOR_ATTACHMENT0+ot;rt.length=Rt.length,yt=!0}}else rt[0]!==n.BACK&&(rt[0]=n.BACK,yt=!0);yt&&n.drawBuffers(rt)}function P(z){return _!==z?(n.useProgram(z),_=z,!0):!1}const D={[xs]:n.FUNC_ADD,[Jx]:n.FUNC_SUBTRACT,[jx]:n.FUNC_REVERSE_SUBTRACT};D[Qx]=n.MIN,D[tv]=n.MAX;const Y={[ev]:n.ZERO,[nv]:n.ONE,[iv]:n.SRC_COLOR,[qc]:n.SRC_ALPHA,[cv]:n.SRC_ALPHA_SATURATE,[av]:n.DST_COLOR,[rv]:n.DST_ALPHA,[sv]:n.ONE_MINUS_SRC_COLOR,[$c]:n.ONE_MINUS_SRC_ALPHA,[lv]:n.ONE_MINUS_DST_COLOR,[ov]:n.ONE_MINUS_DST_ALPHA,[uv]:n.CONSTANT_COLOR,[hv]:n.ONE_MINUS_CONSTANT_COLOR,[fv]:n.CONSTANT_ALPHA,[dv]:n.ONE_MINUS_CONSTANT_ALPHA};function et(z,vt,rt,yt,Rt,ot,Bt,Ut,Ce,Me){if(z===Ci){m===!0&&(qt(n.BLEND),m=!1);return}if(m===!1&&(ht(n.BLEND),m=!0),z!==Zx){if(z!==p||Me!==N){if((S!==xs||w!==xs)&&(n.blendEquation(n.FUNC_ADD),S=xs,w=xs),Me)switch(z){case vr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ja:n.blendFunc(n.ONE,n.ONE);break;case Vf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case kf:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:re("WebGLState: Invalid blending: ",z);break}else switch(z){case vr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ja:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Vf:re("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case kf:re("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:re("WebGLState: Invalid blending: ",z);break}b=null,v=null,E=null,R=null,M.set(0,0,0),A=0,p=z,N=Me}return}Rt=Rt||vt,ot=ot||rt,Bt=Bt||yt,(vt!==S||Rt!==w)&&(n.blendEquationSeparate(D[vt],D[Rt]),S=vt,w=Rt),(rt!==b||yt!==v||ot!==E||Bt!==R)&&(n.blendFuncSeparate(Y[rt],Y[yt],Y[ot],Y[Bt]),b=rt,v=yt,E=ot,R=Bt),(Ut.equals(M)===!1||Ce!==A)&&(n.blendColor(Ut.r,Ut.g,Ut.b,Ce),M.copy(Ut),A=Ce),p=z,N=!1}function j(z,vt){z.side===Oe?qt(n.CULL_FACE):ht(n.CULL_FACE);let rt=z.side===hn;vt&&(rt=!rt),st(rt),z.blending===vr&&z.transparent===!1?et(Ci):et(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);const yt=z.stencilWrite;a.setTest(yt),yt&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),lt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?ht(n.SAMPLE_ALPHA_TO_COVERAGE):qt(n.SAMPLE_ALPHA_TO_COVERAGE)}function st(z){L!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),L=z)}function ft(z){z!==qx?(ht(n.CULL_FACE),z!==F&&(z===Gf?n.cullFace(n.BACK):z===$x?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):qt(n.CULL_FACE),F=z}function ct(z){z!==q&&(U&&n.lineWidth(z),q=z)}function lt(z,vt,rt){z?(ht(n.POLYGON_OFFSET_FILL),(Z!==vt||G!==rt)&&(Z=vt,G=rt,o.getReversed()&&(vt=-vt),n.polygonOffset(vt,rt))):qt(n.POLYGON_OFFSET_FILL)}function nt(z){z?ht(n.SCISSOR_TEST):qt(n.SCISSOR_TEST)}function Ct(z){z===void 0&&(z=n.TEXTURE0+B-1),at!==z&&(n.activeTexture(z),at=z)}function C(z,vt,rt){rt===void 0&&(at===null?rt=n.TEXTURE0+B-1:rt=at);let yt=_t[rt];yt===void 0&&(yt={type:void 0,texture:void 0},_t[rt]=yt),(yt.type!==z||yt.texture!==vt)&&(at!==rt&&(n.activeTexture(rt),at=rt),n.bindTexture(z,vt||mt[z]),yt.type=z,yt.texture=vt)}function Lt(){const z=_t[at];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function Et(){try{n.compressedTexImage2D(...arguments)}catch(z){re("WebGLState:",z)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(z){re("WebGLState:",z)}}function x(){try{n.texSubImage2D(...arguments)}catch(z){re("WebGLState:",z)}}function O(){try{n.texSubImage3D(...arguments)}catch(z){re("WebGLState:",z)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(z){re("WebGLState:",z)}}function K(){try{n.compressedTexSubImage3D(...arguments)}catch(z){re("WebGLState:",z)}}function ut(){try{n.texStorage2D(...arguments)}catch(z){re("WebGLState:",z)}}function pt(){try{n.texStorage3D(...arguments)}catch(z){re("WebGLState:",z)}}function Q(){try{n.texImage2D(...arguments)}catch(z){re("WebGLState:",z)}}function it(){try{n.texImage3D(...arguments)}catch(z){re("WebGLState:",z)}}function dt(z){return h[z]!==void 0?h[z]:n.getParameter(z)}function Dt(z,vt){h[z]!==vt&&(n.pixelStorei(z,vt),h[z]=vt)}function St(z){ve.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),ve.copy(z))}function xt(z){Yt.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),Yt.copy(z))}function Gt(z,vt){let rt=c.get(vt);rt===void 0&&(rt=new WeakMap,c.set(vt,rt));let yt=rt.get(z);yt===void 0&&(yt=n.getUniformBlockIndex(vt,z.name),rt.set(z,yt))}function Xt(z,vt){const yt=c.get(vt).get(z);l.get(vt)!==yt&&(n.uniformBlockBinding(vt,yt,z.__bindingPointIndex),l.set(vt,yt))}function Jt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},at=null,_t={},f={},d=new WeakMap,g=[],_=null,m=!1,p=null,S=null,b=null,v=null,w=null,E=null,R=null,M=new Ft(0,0,0),A=0,N=!1,L=null,F=null,q=null,Z=null,G=null,ve.set(0,0,n.canvas.width,n.canvas.height),Yt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ht,disable:qt,bindFramebuffer:$t,drawBuffers:Wt,useProgram:P,setBlending:et,setMaterial:j,setFlipSided:st,setCullFace:ft,setLineWidth:ct,setPolygonOffset:lt,setScissorTest:nt,activeTexture:Ct,bindTexture:C,unbindTexture:Lt,compressedTexImage2D:Et,compressedTexImage3D:T,texImage2D:Q,texImage3D:it,pixelStorei:Dt,getParameter:dt,updateUBOMapping:Gt,uniformBlockBinding:Xt,texStorage2D:ut,texStorage3D:pt,texSubImage2D:x,texSubImage3D:O,compressedTexSubImage2D:V,compressedTexSubImage3D:K,scissor:St,viewport:xt,reset:Jt}}function JT(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new gt,u=new WeakMap,h=new Set;let f;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,x){return g?new OffscreenCanvas(T,x):il("canvas")}function m(T,x,O){let V=1;const K=Et(T);if((K.width>O||K.height>O)&&(V=O/Math.max(K.width,K.height)),V<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const ut=Math.floor(V*K.width),pt=Math.floor(V*K.height);f===void 0&&(f=_(ut,pt));const Q=x?_(ut,pt):f;return Q.width=ut,Q.height=pt,Q.getContext("2d").drawImage(T,0,0,ut,pt),Vt("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ut+"x"+pt+")."),Q}else return"data"in T&&Vt("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),T;return T}function p(T){return T.generateMipmaps}function S(T){n.generateMipmap(T)}function b(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(T,x,O,V,K,ut=!1){if(T!==null){if(n[T]!==void 0)return n[T];Vt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let pt;V&&(pt=t.get("EXT_texture_norm16"),pt||Vt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=x;if(x===n.RED&&(O===n.FLOAT&&(Q=n.R32F),O===n.HALF_FLOAT&&(Q=n.R16F),O===n.UNSIGNED_BYTE&&(Q=n.R8),O===n.UNSIGNED_SHORT&&pt&&(Q=pt.R16_EXT),O===n.SHORT&&pt&&(Q=pt.R16_SNORM_EXT)),x===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(Q=n.R8UI),O===n.UNSIGNED_SHORT&&(Q=n.R16UI),O===n.UNSIGNED_INT&&(Q=n.R32UI),O===n.BYTE&&(Q=n.R8I),O===n.SHORT&&(Q=n.R16I),O===n.INT&&(Q=n.R32I)),x===n.RG&&(O===n.FLOAT&&(Q=n.RG32F),O===n.HALF_FLOAT&&(Q=n.RG16F),O===n.UNSIGNED_BYTE&&(Q=n.RG8),O===n.UNSIGNED_SHORT&&pt&&(Q=pt.RG16_EXT),O===n.SHORT&&pt&&(Q=pt.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(Q=n.RG8UI),O===n.UNSIGNED_SHORT&&(Q=n.RG16UI),O===n.UNSIGNED_INT&&(Q=n.RG32UI),O===n.BYTE&&(Q=n.RG8I),O===n.SHORT&&(Q=n.RG16I),O===n.INT&&(Q=n.RG32I)),x===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),O===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),O===n.UNSIGNED_INT&&(Q=n.RGB32UI),O===n.BYTE&&(Q=n.RGB8I),O===n.SHORT&&(Q=n.RGB16I),O===n.INT&&(Q=n.RGB32I)),x===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),O===n.UNSIGNED_INT&&(Q=n.RGBA32UI),O===n.BYTE&&(Q=n.RGBA8I),O===n.SHORT&&(Q=n.RGBA16I),O===n.INT&&(Q=n.RGBA32I)),x===n.RGB&&(O===n.UNSIGNED_SHORT&&pt&&(Q=pt.RGB16_EXT),O===n.SHORT&&pt&&(Q=pt.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),x===n.RGBA){const it=ut?nl:oe.getTransfer(K);O===n.FLOAT&&(Q=n.RGBA32F),O===n.HALF_FLOAT&&(Q=n.RGBA16F),O===n.UNSIGNED_BYTE&&(Q=it===he?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&pt&&(Q=pt.RGBA16_EXT),O===n.SHORT&&pt&&(Q=pt.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function w(T,x){let O;return T?x===null||x===ui||x===bo?O=n.DEPTH24_STENCIL8:x===Fn?O=n.DEPTH32F_STENCIL8:x===yo&&(O=n.DEPTH24_STENCIL8,Vt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ui||x===bo?O=n.DEPTH_COMPONENT24:x===Fn?O=n.DEPTH_COMPONENT32F:x===yo&&(O=n.DEPTH_COMPONENT16),O}function E(T,x){return p(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ve&&T.minFilter!==$e?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function R(T){const x=T.target;x.removeEventListener("dispose",R),A(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&h.delete(x)}function M(T){const x=T.target;x.removeEventListener("dispose",M),L(x)}function A(T){const x=i.get(T);if(x.__webglInit===void 0)return;const O=T.source,V=d.get(O);if(V){const K=V[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&N(T),Object.keys(V).length===0&&d.delete(O)}i.remove(T)}function N(T){const x=i.get(T);n.deleteTexture(x.__webglTexture);const O=T.source,V=d.get(O);delete V[x.__cacheKey],o.memory.textures--}function L(T){const x=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(x.__webglFramebuffer[V]))for(let K=0;K<x.__webglFramebuffer[V].length;K++)n.deleteFramebuffer(x.__webglFramebuffer[V][K]);else n.deleteFramebuffer(x.__webglFramebuffer[V]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[V])}else{if(Array.isArray(x.__webglFramebuffer))for(let V=0;V<x.__webglFramebuffer.length;V++)n.deleteFramebuffer(x.__webglFramebuffer[V]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let V=0;V<x.__webglColorRenderbuffer.length;V++)x.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[V]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const O=T.textures;for(let V=0,K=O.length;V<K;V++){const ut=i.get(O[V]);ut.__webglTexture&&(n.deleteTexture(ut.__webglTexture),o.memory.textures--),i.remove(O[V])}i.remove(T)}let F=0;function q(){F=0}function Z(){return F}function G(T){F=T}function B(){const T=F;return T>=s.maxTextures&&Vt("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),F+=1,T}function U(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function k(T,x){const O=i.get(T);if(T.isVideoTexture&&C(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&O.__version!==T.version){const V=T.image;if(V===null)Vt("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Vt("WebGLRenderer: Texture marked for update but image is incomplete");else{qt(O,T,x);return}}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+x)}function J(T,x){const O=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){qt(O,T,x);return}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+x)}function at(T,x){const O=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){qt(O,T,x);return}e.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+x)}function _t(T,x){const O=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&O.__version!==T.version){$t(O,T,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+x)}const Mt={[nu]:n.REPEAT,[Ri]:n.CLAMP_TO_EDGE,[iu]:n.MIRRORED_REPEAT},ie={[Ve]:n.NEAREST,[gv]:n.NEAREST_MIPMAP_NEAREST,[Ho]:n.NEAREST_MIPMAP_LINEAR,[$e]:n.LINEAR,[Hl]:n.LINEAR_MIPMAP_NEAREST,[Ms]:n.LINEAR_MIPMAP_LINEAR},ve={[vv]:n.NEVER,[Ev]:n.ALWAYS,[Mv]:n.LESS,[Nh]:n.LEQUAL,[Sv]:n.EQUAL,[Uh]:n.GEQUAL,[yv]:n.GREATER,[bv]:n.NOTEQUAL};function Yt(T,x){if(x.type===Fn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===$e||x.magFilter===Hl||x.magFilter===Ho||x.magFilter===Ms||x.minFilter===$e||x.minFilter===Hl||x.minFilter===Ho||x.minFilter===Ms)&&Vt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,Mt[x.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,Mt[x.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,Mt[x.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,ie[x.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,ie[x.minFilter]),x.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,ve[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ve||x.minFilter!==Ho&&x.minFilter!==Ms||x.type===Fn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function tt(T,x){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",R));const V=x.source;let K=d.get(V);K===void 0&&(K={},d.set(V,K));const ut=U(x);if(ut!==T.__cacheKey){K[ut]===void 0&&(K[ut]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,O=!0),K[ut].usedTimes++;const pt=K[T.__cacheKey];pt!==void 0&&(K[T.__cacheKey].usedTimes--,pt.usedTimes===0&&N(x)),T.__cacheKey=ut,T.__webglTexture=K[ut].texture}return O}function mt(T,x,O){return Math.floor(Math.floor(T/O)/x)}function ht(T,x,O,V){const ut=T.updateRanges;if(ut.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,O,V,x.data);else{ut.sort((Dt,St)=>Dt.start-St.start);let pt=0;for(let Dt=1;Dt<ut.length;Dt++){const St=ut[pt],xt=ut[Dt],Gt=St.start+St.count,Xt=mt(xt.start,x.width,4),Jt=mt(St.start,x.width,4);xt.start<=Gt+1&&Xt===Jt&&mt(xt.start+xt.count-1,x.width,4)===Xt?St.count=Math.max(St.count,xt.start+xt.count-St.start):(++pt,ut[pt]=xt)}ut.length=pt+1;const Q=e.getParameter(n.UNPACK_ROW_LENGTH),it=e.getParameter(n.UNPACK_SKIP_PIXELS),dt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let Dt=0,St=ut.length;Dt<St;Dt++){const xt=ut[Dt],Gt=Math.floor(xt.start/4),Xt=Math.ceil(xt.count/4),Jt=Gt%x.width,z=Math.floor(Gt/x.width),vt=Xt,rt=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Jt),e.pixelStorei(n.UNPACK_SKIP_ROWS,z),e.texSubImage2D(n.TEXTURE_2D,0,Jt,z,vt,rt,O,V,x.data)}T.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Q),e.pixelStorei(n.UNPACK_SKIP_PIXELS,it),e.pixelStorei(n.UNPACK_SKIP_ROWS,dt)}}function qt(T,x,O){let V=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(V=n.TEXTURE_3D);const K=tt(T,x),ut=x.source;e.bindTexture(V,T.__webglTexture,n.TEXTURE0+O);const pt=i.get(ut);if(ut.version!==pt.__version||K===!0){if(e.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const rt=oe.getPrimaries(oe.workingColorSpace),yt=x.colorSpace===ns?null:oe.getPrimaries(x.colorSpace),Rt=x.colorSpace===ns||rt===yt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt)}e.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let it=m(x.image,!1,s.maxTextureSize);it=Lt(x,it);const dt=r.convert(x.format,x.colorSpace),Dt=r.convert(x.type);let St=v(x.internalFormat,dt,Dt,x.normalized,x.colorSpace,x.isVideoTexture);Yt(V,x);let xt;const Gt=x.mipmaps,Xt=x.isVideoTexture!==!0,Jt=pt.__version===void 0||K===!0,z=ut.dataReady,vt=E(x,it);if(x.isDepthTexture)St=w(x.format===Ss,x.type),Jt&&(Xt?e.texStorage2D(n.TEXTURE_2D,1,St,it.width,it.height):e.texImage2D(n.TEXTURE_2D,0,St,it.width,it.height,0,dt,Dt,null));else if(x.isDataTexture)if(Gt.length>0){Xt&&Jt&&e.texStorage2D(n.TEXTURE_2D,vt,St,Gt[0].width,Gt[0].height);for(let rt=0,yt=Gt.length;rt<yt;rt++)xt=Gt[rt],Xt?z&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,xt.width,xt.height,dt,Dt,xt.data):e.texImage2D(n.TEXTURE_2D,rt,St,xt.width,xt.height,0,dt,Dt,xt.data);x.generateMipmaps=!1}else Xt?(Jt&&e.texStorage2D(n.TEXTURE_2D,vt,St,it.width,it.height),z&&ht(x,it,dt,Dt)):e.texImage2D(n.TEXTURE_2D,0,St,it.width,it.height,0,dt,Dt,it.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Xt&&Jt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,vt,St,Gt[0].width,Gt[0].height,it.depth);for(let rt=0,yt=Gt.length;rt<yt;rt++)if(xt=Gt[rt],x.format!==On)if(dt!==null)if(Xt){if(z)if(x.layerUpdates.size>0){const Rt=Dd(xt.width,xt.height,x.format,x.type);for(const ot of x.layerUpdates){const Bt=xt.data.subarray(ot*Rt/xt.data.BYTES_PER_ELEMENT,(ot+1)*Rt/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,ot,xt.width,xt.height,1,dt,Bt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,xt.width,xt.height,it.depth,dt,xt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,rt,St,xt.width,xt.height,it.depth,0,xt.data,0,0);else Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?z&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,xt.width,xt.height,it.depth,dt,Dt,xt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,rt,St,xt.width,xt.height,it.depth,0,dt,Dt,xt.data)}else{Xt&&Jt&&e.texStorage2D(n.TEXTURE_2D,vt,St,Gt[0].width,Gt[0].height);for(let rt=0,yt=Gt.length;rt<yt;rt++)xt=Gt[rt],x.format!==On?dt!==null?Xt?z&&e.compressedTexSubImage2D(n.TEXTURE_2D,rt,0,0,xt.width,xt.height,dt,xt.data):e.compressedTexImage2D(n.TEXTURE_2D,rt,St,xt.width,xt.height,0,xt.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?z&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,xt.width,xt.height,dt,Dt,xt.data):e.texImage2D(n.TEXTURE_2D,rt,St,xt.width,xt.height,0,dt,Dt,xt.data)}else if(x.isDataArrayTexture)if(Xt){if(Jt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,vt,St,it.width,it.height,it.depth),z)if(x.layerUpdates.size>0){const rt=Dd(it.width,it.height,x.format,x.type);for(const yt of x.layerUpdates){const Rt=it.data.subarray(yt*rt/it.data.BYTES_PER_ELEMENT,(yt+1)*rt/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,yt,it.width,it.height,1,dt,Dt,Rt)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,dt,Dt,it.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,St,it.width,it.height,it.depth,0,dt,Dt,it.data);else if(x.isData3DTexture)Xt?(Jt&&e.texStorage3D(n.TEXTURE_3D,vt,St,it.width,it.height,it.depth),z&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,dt,Dt,it.data)):e.texImage3D(n.TEXTURE_3D,0,St,it.width,it.height,it.depth,0,dt,Dt,it.data);else if(x.isFramebufferTexture){if(Jt)if(Xt)e.texStorage2D(n.TEXTURE_2D,vt,St,it.width,it.height);else{let rt=it.width,yt=it.height;for(let Rt=0;Rt<vt;Rt++)e.texImage2D(n.TEXTURE_2D,Rt,St,rt,yt,0,dt,Dt,null),rt>>=1,yt>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){const rt=n.canvas;if(rt.hasAttribute("layoutsubtree")||rt.setAttribute("layoutsubtree","true"),it.parentNode!==rt){rt.appendChild(it),h.add(x),rt.onpaint=yt=>{const Rt=yt.changedElements;for(const ot of h)Rt.includes(ot.image)&&(ot.needsUpdate=!0)},rt.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,it);else{const Rt=n.RGBA,ot=n.RGBA,Bt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Rt,ot,Bt,it)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Gt.length>0){if(Xt&&Jt){const rt=Et(Gt[0]);e.texStorage2D(n.TEXTURE_2D,vt,St,rt.width,rt.height)}for(let rt=0,yt=Gt.length;rt<yt;rt++)xt=Gt[rt],Xt?z&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,dt,Dt,xt):e.texImage2D(n.TEXTURE_2D,rt,St,dt,Dt,xt);x.generateMipmaps=!1}else if(Xt){if(Jt){const rt=Et(it);e.texStorage2D(n.TEXTURE_2D,vt,St,rt.width,rt.height)}z&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,dt,Dt,it)}else e.texImage2D(n.TEXTURE_2D,0,St,dt,Dt,it);p(x)&&S(V),pt.__version=ut.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function $t(T,x,O){if(x.image.length!==6)return;const V=tt(T,x),K=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+O);const ut=i.get(K);if(K.version!==ut.__version||V===!0){e.activeTexture(n.TEXTURE0+O);const pt=oe.getPrimaries(oe.workingColorSpace),Q=x.colorSpace===ns?null:oe.getPrimaries(x.colorSpace),it=x.colorSpace===ns||pt===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);const dt=x.isCompressedTexture||x.image[0].isCompressedTexture,Dt=x.image[0]&&x.image[0].isDataTexture,St=[];for(let ot=0;ot<6;ot++)!dt&&!Dt?St[ot]=m(x.image[ot],!0,s.maxCubemapSize):St[ot]=Dt?x.image[ot].image:x.image[ot],St[ot]=Lt(x,St[ot]);const xt=St[0],Gt=r.convert(x.format,x.colorSpace),Xt=r.convert(x.type),Jt=v(x.internalFormat,Gt,Xt,x.normalized,x.colorSpace),z=x.isVideoTexture!==!0,vt=ut.__version===void 0||V===!0,rt=K.dataReady;let yt=E(x,xt);Yt(n.TEXTURE_CUBE_MAP,x);let Rt;if(dt){z&&vt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,yt,Jt,xt.width,xt.height);for(let ot=0;ot<6;ot++){Rt=St[ot].mipmaps;for(let Bt=0;Bt<Rt.length;Bt++){const Ut=Rt[Bt];x.format!==On?Gt!==null?z?rt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt,0,0,Ut.width,Ut.height,Gt,Ut.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt,Jt,Ut.width,Ut.height,0,Ut.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt,0,0,Ut.width,Ut.height,Gt,Xt,Ut.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt,Jt,Ut.width,Ut.height,0,Gt,Xt,Ut.data)}}}else{if(Rt=x.mipmaps,z&&vt){Rt.length>0&&yt++;const ot=Et(St[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,yt,Jt,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(Dt){z?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,St[ot].width,St[ot].height,Gt,Xt,St[ot].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,Jt,St[ot].width,St[ot].height,0,Gt,Xt,St[ot].data);for(let Bt=0;Bt<Rt.length;Bt++){const Ce=Rt[Bt].image[ot].image;z?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt+1,0,0,Ce.width,Ce.height,Gt,Xt,Ce.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt+1,Jt,Ce.width,Ce.height,0,Gt,Xt,Ce.data)}}else{z?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Gt,Xt,St[ot]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,Jt,Gt,Xt,St[ot]);for(let Bt=0;Bt<Rt.length;Bt++){const Ut=Rt[Bt];z?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt+1,0,0,Gt,Xt,Ut.image[ot]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Bt+1,Jt,Gt,Xt,Ut.image[ot])}}}p(x)&&S(n.TEXTURE_CUBE_MAP),ut.__version=K.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function Wt(T,x,O,V,K,ut){const pt=r.convert(O.format,O.colorSpace),Q=r.convert(O.type),it=v(O.internalFormat,pt,Q,O.normalized,O.colorSpace),dt=i.get(x),Dt=i.get(O);if(Dt.__renderTarget=x,!dt.__hasExternalTextures){const St=Math.max(1,x.width>>ut),xt=Math.max(1,x.height>>ut);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?e.texImage3D(K,ut,it,St,xt,x.depth,0,pt,Q,null):e.texImage2D(K,ut,it,St,xt,0,pt,Q,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),Ct(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,K,Dt.__webglTexture,0,nt(x)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,K,Dt.__webglTexture,ut),e.bindFramebuffer(n.FRAMEBUFFER,null)}function P(T,x,O){if(n.bindRenderbuffer(n.RENDERBUFFER,T),x.depthBuffer){const V=x.depthTexture,K=V&&V.isDepthTexture?V.type:null,ut=w(x.stencilBuffer,K),pt=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ct(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,nt(x),ut,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,nt(x),ut,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,ut,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,pt,n.RENDERBUFFER,T)}else{const V=x.textures;for(let K=0;K<V.length;K++){const ut=V[K],pt=r.convert(ut.format,ut.colorSpace),Q=r.convert(ut.type),it=v(ut.internalFormat,pt,Q,ut.normalized,ut.colorSpace);Ct(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,nt(x),it,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,nt(x),it,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,it,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function D(T,x,O){const V=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=i.get(x.depthTexture);if(K.__renderTarget=x,(!K.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),V){if(K.__webglInit===void 0&&(K.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),K.__webglTexture===void 0){K.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Yt(n.TEXTURE_CUBE_MAP,x.depthTexture);const dt=r.convert(x.depthTexture.format),Dt=r.convert(x.depthTexture.type);let St;x.depthTexture.format===Ui?St=n.DEPTH_COMPONENT24:x.depthTexture.format===Ss&&(St=n.DEPTH24_STENCIL8);for(let xt=0;xt<6;xt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,St,x.width,x.height,0,dt,Dt,null)}}else k(x.depthTexture,0);const ut=K.__webglTexture,pt=nt(x),Q=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,it=x.depthTexture.format===Ss?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===Ui)Ct(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,it,Q,ut,0,pt):n.framebufferTexture2D(n.FRAMEBUFFER,it,Q,ut,0);else if(x.depthTexture.format===Ss)Ct(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,it,Q,ut,0,pt):n.framebufferTexture2D(n.FRAMEBUFFER,it,Q,ut,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Y(T){const x=i.get(T),O=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const V=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),V){const K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,V.removeEventListener("dispose",K)};V.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=V}if(T.depthTexture&&!x.__autoAllocateDepthBuffer)if(O)for(let V=0;V<6;V++)D(x.__webglFramebuffer[V],T,V);else{const V=T.texture.mipmaps;V&&V.length>0?D(x.__webglFramebuffer[0],T,0):D(x.__webglFramebuffer,T,0)}else if(O){x.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[V]),x.__webglDepthbuffer[V]===void 0)x.__webglDepthbuffer[V]=n.createRenderbuffer(),P(x.__webglDepthbuffer[V],T,!1);else{const K=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ut=x.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,ut),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,ut)}}else{const V=T.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),P(x.__webglDepthbuffer,T,!1);else{const K=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ut=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ut),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,ut)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function et(T,x,O){const V=i.get(T);x!==void 0&&Wt(V.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&Y(T)}function j(T){const x=T.texture,O=i.get(T),V=i.get(x);T.addEventListener("dispose",M);const K=T.textures,ut=T.isWebGLCubeRenderTarget===!0,pt=K.length>1;if(pt||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=x.version,o.memory.textures++),ut){O.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[Q]=[];for(let it=0;it<x.mipmaps.length;it++)O.__webglFramebuffer[Q][it]=n.createFramebuffer()}else O.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let Q=0;Q<x.mipmaps.length;Q++)O.__webglFramebuffer[Q]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(pt)for(let Q=0,it=K.length;Q<it;Q++){const dt=i.get(K[Q]);dt.__webglTexture===void 0&&(dt.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&Ct(T)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Q=0;Q<K.length;Q++){const it=K[Q];O.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[Q]);const dt=r.convert(it.format,it.colorSpace),Dt=r.convert(it.type),St=v(it.internalFormat,dt,Dt,it.normalized,it.colorSpace,T.isXRRenderTarget===!0),xt=nt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,xt,St,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,O.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),P(O.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ut){e.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),Yt(n.TEXTURE_CUBE_MAP,x);for(let Q=0;Q<6;Q++)if(x.mipmaps&&x.mipmaps.length>0)for(let it=0;it<x.mipmaps.length;it++)Wt(O.__webglFramebuffer[Q][it],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,it);else Wt(O.__webglFramebuffer[Q],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(x)&&S(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){for(let Q=0,it=K.length;Q<it;Q++){const dt=K[Q],Dt=i.get(dt);let St=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(St=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(St,Dt.__webglTexture),Yt(St,dt),Wt(O.__webglFramebuffer,T,dt,n.COLOR_ATTACHMENT0+Q,St,0),p(dt)&&S(St)}e.unbindTexture()}else{let Q=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(Q=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Q,V.__webglTexture),Yt(Q,x),x.mipmaps&&x.mipmaps.length>0)for(let it=0;it<x.mipmaps.length;it++)Wt(O.__webglFramebuffer[it],T,x,n.COLOR_ATTACHMENT0,Q,it);else Wt(O.__webglFramebuffer,T,x,n.COLOR_ATTACHMENT0,Q,0);p(x)&&S(Q),e.unbindTexture()}T.depthBuffer&&Y(T)}function st(T){const x=T.textures;for(let O=0,V=x.length;O<V;O++){const K=x[O];if(p(K)){const ut=b(T),pt=i.get(K).__webglTexture;e.bindTexture(ut,pt),S(ut),e.unbindTexture()}}}const ft=[],ct=[];function lt(T){if(T.samples>0){if(Ct(T)===!1){const x=T.textures,O=T.width,V=T.height;let K=n.COLOR_BUFFER_BIT;const ut=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=i.get(T),Q=x.length>1;if(Q)for(let dt=0;dt<x.length;dt++)e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer);const it=T.texture.mipmaps;it&&it.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let dt=0;dt<x.length;dt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pt.__webglColorRenderbuffer[dt]);const Dt=i.get(x[dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Dt,0)}n.blitFramebuffer(0,0,O,V,0,0,O,V,K,n.NEAREST),l===!0&&(ft.length=0,ct.length=0,ft.push(n.COLOR_ATTACHMENT0+dt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(ft.push(ut),ct.push(ut),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ct)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ft))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let dt=0;dt<x.length;dt++){e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,pt.__webglColorRenderbuffer[dt]);const Dt=i.get(x[dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,Dt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const x=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function nt(T){return Math.min(s.maxSamples,T.samples)}function Ct(T){const x=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function C(T){const x=o.render.frame;u.get(T)!==x&&(u.set(T,x),T.update())}function Lt(T,x){const O=T.colorSpace,V=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==el&&O!==ns&&(oe.getTransfer(O)===he?(V!==On||K!==xn)&&Vt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):re("WebGLTextures: Unsupported texture color space:",O)),x}function Et(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=q,this.getTextureUnits=Z,this.setTextureUnits=G,this.setTexture2D=k,this.setTexture2DArray=J,this.setTexture3D=at,this.setTextureCube=_t,this.rebindTextures=et,this.setupRenderTarget=j,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=lt,this.setupDepthRenderbuffer=Y,this.setupFrameBufferTexture=Wt,this.useMultisampledRTT=Ct,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function jT(n,t){function e(i,s=ns){let r;const o=oe.getTransfer(s);if(i===xn)return n.UNSIGNED_BYTE;if(i===Rh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ch)return n.UNSIGNED_SHORT_5_5_5_1;if(i===c0)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===u0)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===a0)return n.BYTE;if(i===l0)return n.SHORT;if(i===yo)return n.UNSIGNED_SHORT;if(i===Ah)return n.INT;if(i===ui)return n.UNSIGNED_INT;if(i===Fn)return n.FLOAT;if(i===Ni)return n.HALF_FLOAT;if(i===h0)return n.ALPHA;if(i===f0)return n.RGB;if(i===On)return n.RGBA;if(i===Ui)return n.DEPTH_COMPONENT;if(i===Ss)return n.DEPTH_STENCIL;if(i===Ph)return n.RED;if(i===Lh)return n.RED_INTEGER;if(i===Rs)return n.RG;if(i===Dh)return n.RG_INTEGER;if(i===Ih)return n.RGBA_INTEGER;if(i===Ba||i===za||i===Ha||i===Ga)if(o===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ba)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===za)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ba)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===za)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ha)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ga)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===su||i===ru||i===ou||i===au)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===su)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ru)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ou)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===au)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===lu||i===cu||i===uu||i===hu||i===fu||i===Qa||i===du)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===lu||i===cu)return o===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===uu)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===hu)return r.COMPRESSED_R11_EAC;if(i===fu)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Qa)return r.COMPRESSED_RG11_EAC;if(i===du)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===pu||i===mu||i===gu||i===_u||i===xu||i===vu||i===Mu||i===Su||i===yu||i===bu||i===Eu||i===Tu||i===wu||i===Au)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===pu)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===mu)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===gu)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===_u)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===xu)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===vu)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Mu)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Su)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===yu)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bu)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Eu)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Tu)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===wu)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Au)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ru||i===Cu||i===Pu)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Ru)return o===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Cu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Pu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Lu||i===Du||i===tl||i===Iu)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Lu)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Du)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===tl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Iu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===bo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const QT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tw=`
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

}`;class ew{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new E0(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new fi({vertexShader:QT,fragmentShader:tw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new bt(new Te(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class nw extends as{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",m=new ew,p={},S=e.getContextAttributes();let b=null,v=null;const w=[],E=[],R=new gt;let M=null;const A=new In;A.viewport=new we;const N=new In;N.viewport=new we;const L=[A,N],F=new cS;let q=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(tt){let mt=w[tt];return mt===void 0&&(mt=new Yl,w[tt]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(tt){let mt=w[tt];return mt===void 0&&(mt=new Yl,w[tt]=mt),mt.getGripSpace()},this.getHand=function(tt){let mt=w[tt];return mt===void 0&&(mt=new Yl,w[tt]=mt),mt.getHandSpace()};function G(tt){const mt=E.indexOf(tt.inputSource);if(mt===-1)return;const ht=w[mt];ht!==void 0&&(ht.update(tt.inputSource,tt.frame,c||o),ht.dispatchEvent({type:tt.type,data:tt.inputSource}))}function B(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",U);for(let tt=0;tt<w.length;tt++){const mt=E[tt];mt!==null&&(E[tt]=null,w[tt].disconnect(mt))}q=null,Z=null,m.reset();for(const tt in p)delete p[tt];t.setRenderTarget(b),d=null,f=null,h=null,s=null,v=null,Yt.stop(),i.isPresenting=!1,t.setPixelRatio(M),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(tt){r=tt,i.isPresenting===!0&&Vt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(tt){a=tt,i.isPresenting===!0&&Vt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(tt){c=tt},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(s,e)),h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(tt){if(s=tt,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",B),s.addEventListener("inputsourceschange",U),S.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ht=null,qt=null,$t=null;S.depth&&($t=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=S.stencil?Ss:Ui,qt=S.stencil?bo:ui);const Wt={colorFormat:e.RGBA8,depthFormat:$t,scaleFactor:r};h=this.getBinding(),f=h.createProjectionLayer(Wt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),v=new ai(f.textureWidth,f.textureHeight,{format:On,type:xn,depthTexture:new Rr(f.textureWidth,f.textureHeight,qt,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ht={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,ht),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new ai(d.framebufferWidth,d.framebufferHeight,{format:On,type:xn,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Yt.setContext(s),Yt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function U(tt){for(let mt=0;mt<tt.removed.length;mt++){const ht=tt.removed[mt],qt=E.indexOf(ht);qt>=0&&(E[qt]=null,w[qt].disconnect(ht))}for(let mt=0;mt<tt.added.length;mt++){const ht=tt.added[mt];let qt=E.indexOf(ht);if(qt===-1){for(let Wt=0;Wt<w.length;Wt++)if(Wt>=E.length){E.push(ht),qt=Wt;break}else if(E[Wt]===null){E[Wt]=ht,qt=Wt;break}if(qt===-1)break}const $t=w[qt];$t&&$t.connect(ht)}}const k=new I,J=new I;function at(tt,mt,ht){k.setFromMatrixPosition(mt.matrixWorld),J.setFromMatrixPosition(ht.matrixWorld);const qt=k.distanceTo(J),$t=mt.projectionMatrix.elements,Wt=ht.projectionMatrix.elements,P=$t[14]/($t[10]-1),D=$t[14]/($t[10]+1),Y=($t[9]+1)/$t[5],et=($t[9]-1)/$t[5],j=($t[8]-1)/$t[0],st=(Wt[8]+1)/Wt[0],ft=P*j,ct=P*st,lt=qt/(-j+st),nt=lt*-j;if(mt.matrixWorld.decompose(tt.position,tt.quaternion,tt.scale),tt.translateX(nt),tt.translateZ(lt),tt.matrixWorld.compose(tt.position,tt.quaternion,tt.scale),tt.matrixWorldInverse.copy(tt.matrixWorld).invert(),$t[10]===-1)tt.projectionMatrix.copy(mt.projectionMatrix),tt.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{const Ct=P+lt,C=D+lt,Lt=ft-nt,Et=ct+(qt-nt),T=Y*D/C*Ct,x=et*D/C*Ct;tt.projectionMatrix.makePerspective(Lt,Et,T,x,Ct,C),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert()}}function _t(tt,mt){mt===null?tt.matrixWorld.copy(tt.matrix):tt.matrixWorld.multiplyMatrices(mt.matrixWorld,tt.matrix),tt.matrixWorldInverse.copy(tt.matrixWorld).invert()}this.updateCamera=function(tt){if(s===null)return;let mt=tt.near,ht=tt.far;m.texture!==null&&(m.depthNear>0&&(mt=m.depthNear),m.depthFar>0&&(ht=m.depthFar)),F.near=N.near=A.near=mt,F.far=N.far=A.far=ht,(q!==F.near||Z!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),q=F.near,Z=F.far),F.layers.mask=tt.layers.mask|6,A.layers.mask=F.layers.mask&-5,N.layers.mask=F.layers.mask&-3;const qt=tt.parent,$t=F.cameras;_t(F,qt);for(let Wt=0;Wt<$t.length;Wt++)_t($t[Wt],qt);$t.length===2?at(F,A,N):F.projectionMatrix.copy(A.projectionMatrix),Mt(tt,F,qt)};function Mt(tt,mt,ht){ht===null?tt.matrix.copy(mt.matrixWorld):(tt.matrix.copy(ht.matrixWorld),tt.matrix.invert(),tt.matrix.multiply(mt.matrixWorld)),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.updateMatrixWorld(!0),tt.projectionMatrix.copy(mt.projectionMatrix),tt.projectionMatrixInverse.copy(mt.projectionMatrixInverse),tt.isPerspectiveCamera&&(tt.fov=To*2*Math.atan(1/tt.projectionMatrix.elements[5]),tt.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(tt){l=tt,f!==null&&(f.fixedFoveation=tt),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=tt)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(tt){return p[tt]};let ie=null;function ve(tt,mt){if(u=mt.getViewerPose(c||o),g=mt,u!==null){const ht=u.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let qt=!1;ht.length!==F.cameras.length&&(F.cameras.length=0,qt=!0);for(let D=0;D<ht.length;D++){const Y=ht[D];let et=null;if(d!==null)et=d.getViewport(Y);else{const st=h.getViewSubImage(f,Y);et=st.viewport,D===0&&(t.setRenderTargetTextures(v,st.colorTexture,st.depthStencilTexture),t.setRenderTarget(v))}let j=L[D];j===void 0&&(j=new In,j.layers.enable(D),j.viewport=new we,L[D]=j),j.matrix.fromArray(Y.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(Y.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(et.x,et.y,et.width,et.height),D===0&&(F.matrix.copy(j.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),qt===!0&&F.cameras.push(j)}const $t=s.enabledFeatures;if($t&&$t.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){h=i.getBinding();const D=h.getDepthInformation(ht[0]);D&&D.isValid&&D.texture&&m.init(D,s.renderState)}if($t&&$t.includes("camera-access")&&_){t.state.unbindTexture(),h=i.getBinding();for(let D=0;D<ht.length;D++){const Y=ht[D].camera;if(Y){let et=p[Y];et||(et=new E0,p[Y]=et);const j=h.getCameraImage(Y);et.sourceTexture=j}}}}for(let ht=0;ht<w.length;ht++){const qt=E[ht],$t=w[ht];qt!==null&&$t!==void 0&&$t.update(qt,mt,c||o)}ie&&ie(tt,mt),mt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:mt}),g=null}const Yt=new B0;Yt.setAnimationLoop(ve),this.setAnimationLoop=function(tt){ie=tt},this.dispose=function(){}}}const iw=new se,X0=new Kt;X0.set(-1,0,0,0,1,0,0,0,1);function sw(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,U0(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,b,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===hn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===hn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=t.get(p),b=S.envMap,v=S.envMapRotation;b&&(m.envMap.value=b,m.envMapRotation.value.setFromMatrix4(iw.makeRotationFromEuler(v)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(X0),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=b*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===hn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function rw(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,w){const E=w.program;i.uniformBlockBinding(v,E)}function c(v,w){let E=s[v.id];E===void 0&&(m(v),E=u(v),s[v.id]=E,v.addEventListener("dispose",S));const R=w.program;i.updateUBOMapping(v,R);const M=t.render.frame;r[v.id]!==M&&(f(v),r[v.id]=M)}function u(v){const w=h();v.__bindingPointIndex=w;const E=n.createBuffer(),R=v.__size,M=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,R,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,E),E}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return re("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const w=s[v.id],E=v.uniforms,R=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let M=0,A=E.length;M<A;M++){const N=E[M];if(Array.isArray(N))for(let L=0,F=N.length;L<F;L++)d(N[L],M,L,R);else d(N,M,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(v,w,E,R){if(_(v,w,E,R)===!0){const M=v.__offset,A=v.value;if(Array.isArray(A)){let N=0;for(let L=0;L<A.length;L++){const F=A[L],q=p(F);g(F,v.__data,N),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(N+=q.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,M,v.__data)}}function g(v,w,E){typeof v=="number"||typeof v=="boolean"?w[0]=v:v.isMatrix3?(w[0]=v.elements[0],w[1]=v.elements[1],w[2]=v.elements[2],w[3]=0,w[4]=v.elements[3],w[5]=v.elements[4],w[6]=v.elements[5],w[7]=0,w[8]=v.elements[6],w[9]=v.elements[7],w[10]=v.elements[8],w[11]=0):ArrayBuffer.isView(v)?w.set(new v.constructor(v.buffer,v.byteOffset,w.length)):v.toArray(w,E)}function _(v,w,E,R){const M=v.value,A=w+"_"+E;if(R[A]===void 0)return typeof M=="number"||typeof M=="boolean"?R[A]=M:ArrayBuffer.isView(M)?R[A]=M.slice():R[A]=M.clone(),!0;{const N=R[A];if(typeof M=="number"||typeof M=="boolean"){if(N!==M)return R[A]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(N.equals(M)===!1)return N.copy(M),!0}}return!1}function m(v){const w=v.uniforms;let E=0;const R=16;for(let A=0,N=w.length;A<N;A++){const L=Array.isArray(w[A])?w[A]:[w[A]];for(let F=0,q=L.length;F<q;F++){const Z=L[F],G=Array.isArray(Z.value)?Z.value:[Z.value];for(let B=0,U=G.length;B<U;B++){const k=G[B],J=p(k),at=E%R,_t=at%J.boundary,Mt=at+_t;E+=_t,Mt!==0&&R-Mt<J.storage&&(E+=R-Mt),Z.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=E,E+=J.storage}}}const M=E%R;return M>0&&(E+=R-M),v.__size=E,v.__cache={},this}function p(v){const w={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(w.boundary=4,w.storage=4):v.isVector2?(w.boundary=8,w.storage=8):v.isVector3||v.isColor?(w.boundary=16,w.storage=12):v.isVector4?(w.boundary=16,w.storage=16):v.isMatrix3?(w.boundary=48,w.storage=48):v.isMatrix4?(w.boundary=64,w.storage=64):v.isTexture?Vt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(w.boundary=16,w.storage=v.byteLength):Vt("WebGLRenderer: Unsupported uniform value type.",v),w}function S(v){const w=v.target;w.removeEventListener("dispose",S);const E=o.indexOf(w.__bindingPointIndex);o.splice(E,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function b(){for(const v in s)n.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:b}}const ow=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Kn=null;function aw(){return Kn===null&&(Kn=new M0(ow,16,16,Rs,Ni),Kn.name="DFG_LUT",Kn.minFilter=$e,Kn.magFilter=$e,Kn.wrapS=Ri,Kn.wrapT=Ri,Kn.generateMipmaps=!1,Kn.needsUpdate=!0),Kn}class lw{constructor(t={}){const{canvas:e=wv(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:d=xn}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;const _=d,m=new Set([Ih,Dh,Lh]),p=new Set([xn,ui,yo,bo,Rh,Ch]),S=new Uint32Array(4),b=new Int32Array(4),v=new I;let w=null,E=null;const R=[],M=[];let A=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const N=this;let L=!1,F=null,q=null,Z=null,G=null;this._outputColorSpace=Ee;let B=0,U=0,k=null,J=-1,at=null;const _t=new we,Mt=new we;let ie=null;const ve=new Ft(0);let Yt=0,tt=e.width,mt=e.height,ht=1,qt=null,$t=null;const Wt=new we(0,0,tt,mt),P=new we(0,0,tt,mt);let D=!1;const Y=new Hh;let et=!1,j=!1;const st=new se,ft=new I,ct=new we,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let nt=!1;function Ct(){return k===null?ht:1}let C=i;function Lt(y,H){return e.getContext(y,H)}try{const y={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Th}`),e.addEventListener("webglcontextlost",Ce,!1),e.addEventListener("webglcontextrestored",Me,!1),e.addEventListener("webglcontextcreationerror",Wn,!1),C===null){const H="webgl2";if(C=Lt(H,y),C===null)throw Lt(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(y){throw re("WebGLRenderer: "+y.message),y}let Et,T,x,O,V,K,ut,pt,Q,it,dt,Dt,St,xt,Gt,Xt,Jt,z,vt,rt,yt,Rt,ot;function Bt(){Et=new aE(C),Et.init(),yt=new jT(C,Et),T=new Qb(C,Et,t,yt),x=new ZT(C,Et),T.reversedDepthBuffer&&f&&x.buffers.depth.setReversed(!0),q=C.createFramebuffer(),Z=C.createFramebuffer(),G=C.createFramebuffer(),O=new uE(C),V=new FT,K=new JT(C,Et,x,V,T,yt,O),ut=new oE(N),pt=new pS(C),Rt=new Jb(C,pt),Q=new lE(C,pt,O,Rt),it=new fE(C,Q,pt,Rt,O),z=new hE(C,T,K),Gt=new tE(V),dt=new UT(N,ut,Et,T,Rt,Gt),Dt=new sw(N,V),St=new BT,xt=new WT(Et),Jt=new Zb(N,ut,x,it,g,l),Xt=new KT(N,it,T),ot=new rw(C,O,T,x),vt=new jb(C,Et,O),rt=new cE(C,Et,O),O.programs=dt.programs,N.capabilities=T,N.extensions=Et,N.properties=V,N.renderLists=St,N.shadowMap=Xt,N.state=x,N.info=O}Bt(),_!==xn&&(A=new pE(_,e.width,e.height,a,s,r));const Ut=new nw(N,C);this.xr=Ut,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const y=Et.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Et.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ht},this.setPixelRatio=function(y){y!==void 0&&(ht=y,this.setSize(tt,mt,!1))},this.getSize=function(y){return y.set(tt,mt)},this.setSize=function(y,H,$=!0){if(Ut.isPresenting){Vt("WebGLRenderer: Can't change size while VR device is presenting.");return}tt=y,mt=H,e.width=Math.floor(y*ht),e.height=Math.floor(H*ht),$===!0&&(e.style.width=y+"px",e.style.height=H+"px"),A!==null&&A.setSize(e.width,e.height),this.setViewport(0,0,y,H)},this.getDrawingBufferSize=function(y){return y.set(tt*ht,mt*ht).floor()},this.setDrawingBufferSize=function(y,H,$){tt=y,mt=H,ht=$,e.width=Math.floor(y*$),e.height=Math.floor(H*$),this.setViewport(0,0,y,H)},this.setEffects=function(y){if(_===xn){re("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let H=0;H<y.length;H++)if(y[H].isOutputPass===!0){Vt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(_t)},this.getViewport=function(y){return y.copy(Wt)},this.setViewport=function(y,H,$,W){y.isVector4?Wt.set(y.x,y.y,y.z,y.w):Wt.set(y,H,$,W),x.viewport(_t.copy(Wt).multiplyScalar(ht).round())},this.getScissor=function(y){return y.copy(P)},this.setScissor=function(y,H,$,W){y.isVector4?P.set(y.x,y.y,y.z,y.w):P.set(y,H,$,W),x.scissor(Mt.copy(P).multiplyScalar(ht).round())},this.getScissorTest=function(){return D},this.setScissorTest=function(y){x.setScissorTest(D=y)},this.setOpaqueSort=function(y){qt=y},this.setTransparentSort=function(y){$t=y},this.getClearColor=function(y){return y.copy(Jt.getClearColor())},this.setClearColor=function(){Jt.setClearColor(...arguments)},this.getClearAlpha=function(){return Jt.getClearAlpha()},this.setClearAlpha=function(){Jt.setClearAlpha(...arguments)},this.clear=function(y=!0,H=!0,$=!0){let W=0;if(y){let X=!1;if(k!==null){const At=k.texture.format;X=m.has(At)}if(X){const At=k.texture.type,Nt=p.has(At),wt=Jt.getClearColor(),Ot=Jt.getClearAlpha(),zt=wt.r,jt=wt.g,ne=wt.b;Nt?(S[0]=zt,S[1]=jt,S[2]=ne,S[3]=Ot,C.clearBufferuiv(C.COLOR,0,S)):(b[0]=zt,b[1]=jt,b[2]=ne,b[3]=Ot,C.clearBufferiv(C.COLOR,0,b))}else W|=C.COLOR_BUFFER_BIT}H&&(W|=C.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(W|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&C.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),F=y},this.dispose=function(){e.removeEventListener("webglcontextlost",Ce,!1),e.removeEventListener("webglcontextrestored",Me,!1),e.removeEventListener("webglcontextcreationerror",Wn,!1),Jt.dispose(),St.dispose(),xt.dispose(),V.dispose(),ut.dispose(),it.dispose(),Rt.dispose(),ot.dispose(),dt.dispose(),Ut.dispose(),Ut.removeEventListener("sessionstart",nf),Ut.removeEventListener("sessionend",sf),ls.stop()};function Ce(y){y.preventDefault(),sl("WebGLRenderer: Context Lost."),L=!0}function Me(){sl("WebGLRenderer: Context Restored."),L=!1;const y=O.autoReset,H=Xt.enabled,$=Xt.autoUpdate,W=Xt.needsUpdate,X=Xt.type;Bt(),O.autoReset=y,Xt.enabled=H,Xt.autoUpdate=$,Xt.needsUpdate=W,Xt.type=X}function Wn(y){re("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Xn(y){const H=y.target;H.removeEventListener("dispose",Xn),dg(H)}function dg(y){pg(y),V.remove(y)}function pg(y){const H=V.get(y).programs;H!==void 0&&(H.forEach(function($){dt.releaseProgram($)}),y.isShaderMaterial&&dt.releaseShaderCache(y))}this.renderBufferDirect=function(y,H,$,W,X,At){H===null&&(H=lt);const Nt=X.isMesh&&X.matrixWorld.determinantAffine()<0,wt=_g(y,H,$,W,X);x.setMaterial(W,Nt);let Ot=$.index,zt=1;if(W.wireframe===!0){if(Ot=Q.getWireframeAttribute($),Ot===void 0)return;zt=2}const jt=$.drawRange,ne=$.attributes.position;let Ht=jt.start*zt,de=(jt.start+jt.count)*zt;At!==null&&(Ht=Math.max(Ht,At.start*zt),de=Math.min(de,(At.start+At.count)*zt)),Ot!==null?(Ht=Math.max(Ht,0),de=Math.min(de,Ot.count)):ne!=null&&(Ht=Math.max(Ht,0),de=Math.min(de,ne.count));const Le=de-Ht;if(Le<0||Le===1/0)return;Rt.setup(X,W,wt,$,Ot);let Pe,ge=vt;if(Ot!==null&&(Pe=pt.get(Ot),ge=rt,ge.setIndex(Pe)),X.isMesh)W.wireframe===!0?(x.setLineWidth(W.wireframeLinewidth*Ct()),ge.setMode(C.LINES)):ge.setMode(C.TRIANGLES);else if(X.isLine){let ke=W.linewidth;ke===void 0&&(ke=1),x.setLineWidth(ke*Ct()),X.isLineSegments?ge.setMode(C.LINES):X.isLineLoop?ge.setMode(C.LINE_LOOP):ge.setMode(C.LINE_STRIP)}else X.isPoints?ge.setMode(C.POINTS):X.isSprite&&ge.setMode(C.TRIANGLES);if(X.isBatchedMesh)if(Et.get("WEBGL_multi_draw"))ge.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const ke=X._multiDrawStarts,It=X._multiDrawCounts,dn=X._multiDrawCount,ae=Ot?pt.get(Ot).bytesPerElement:1,En=V.get(W).currentProgram.getUniforms();for(let Yn=0;Yn<dn;Yn++)En.setValue(C,"_gl_DrawID",Yn),ge.render(ke[Yn]/ae,It[Yn])}else if(X.isInstancedMesh)ge.renderInstances(Ht,Le,X.count);else if($.isInstancedBufferGeometry){const ke=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,It=Math.min($.instanceCount,ke);ge.renderInstances(Ht,Le,It)}else ge.render(Ht,Le)};function ef(y,H,$){y.transparent===!0&&y.side===Oe&&y.forceSinglePass===!1?(y.side=hn,y.needsUpdate=!0,Fo(y,H,$),y.side=os,y.needsUpdate=!0,Fo(y,H,$),y.side=Oe):Fo(y,H,$)}this.compile=function(y,H,$=null){$===null&&($=y),E=xt.get($),E.init(H),M.push(E),$.traverseVisible(function(X){X.isLight&&X.layers.test(H.layers)&&(E.pushLight(X),X.castShadow&&E.pushShadow(X))}),y!==$&&y.traverseVisible(function(X){X.isLight&&X.layers.test(H.layers)&&(E.pushLight(X),X.castShadow&&E.pushShadow(X))}),E.setupLights();const W=new Set;return y.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const At=X.material;if(At)if(Array.isArray(At))for(let Nt=0;Nt<At.length;Nt++){const wt=At[Nt];ef(wt,$,X),W.add(wt)}else ef(At,$,X),W.add(At)}),E=M.pop(),W},this.compileAsync=function(y,H,$=null){const W=this.compile(y,H,$);return new Promise(X=>{function At(){if(W.forEach(function(Nt){V.get(Nt).currentProgram.isReady()&&W.delete(Nt)}),W.size===0){X(y);return}setTimeout(At,10)}Et.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let wl=null;function mg(y){wl&&wl(y)}function nf(){ls.stop()}function sf(){ls.start()}const ls=new B0;ls.setAnimationLoop(mg),typeof self<"u"&&ls.setContext(self),this.setAnimationLoop=function(y){wl=y,Ut.setAnimationLoop(y),y===null?ls.stop():ls.start()},Ut.addEventListener("sessionstart",nf),Ut.addEventListener("sessionend",sf),this.render=function(y,H){if(H!==void 0&&H.isCamera!==!0){re("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;F!==null&&F.renderStart(y,H);const $=Ut.enabled===!0&&Ut.isPresenting===!0,W=A!==null&&(k===null||$)&&A.begin(N,k);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Ut.enabled===!0&&Ut.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Ut.cameraAutoUpdate===!0&&Ut.updateCamera(H),H=Ut.getCamera()),y.isScene===!0&&y.onBeforeRender(N,y,H,k),E=xt.get(y,M.length),E.init(H),E.state.textureUnits=K.getTextureUnits(),M.push(E),st.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Y.setFromProjectionMatrix(st,si,H.reversedDepth),j=this.localClippingEnabled,et=Gt.init(this.clippingPlanes,j),w=St.get(y,R.length),w.init(),R.push(w),Ut.enabled===!0&&Ut.isPresenting===!0){const Nt=N.xr.getDepthSensingMesh();Nt!==null&&Al(Nt,H,-1/0,N.sortObjects)}Al(y,H,0,N.sortObjects),w.finish(),N.sortObjects===!0&&w.sort(qt,$t,H.reversedDepth),nt=Ut.enabled===!1||Ut.isPresenting===!1||Ut.hasDepthSensing()===!1,nt&&Jt.addToRenderList(w,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),et===!0&&Gt.beginShadows();const X=E.state.shadowsArray;if(Xt.render(X,y,H),et===!0&&Gt.endShadows(),(W&&A.hasRenderPass())===!1){const Nt=w.opaque,wt=w.transmissive;if(E.setupLights(),H.isArrayCamera){const Ot=H.cameras;if(wt.length>0)for(let zt=0,jt=Ot.length;zt<jt;zt++){const ne=Ot[zt];of(Nt,wt,y,ne)}nt&&Jt.render(y);for(let zt=0,jt=Ot.length;zt<jt;zt++){const ne=Ot[zt];rf(w,y,ne,ne.viewport)}}else wt.length>0&&of(Nt,wt,y,H),nt&&Jt.render(y),rf(w,y,H)}k!==null&&U===0&&(K.updateMultisampleRenderTarget(k),K.updateRenderTargetMipmap(k)),W&&A.end(N),y.isScene===!0&&y.onAfterRender(N,y,H),Rt.resetDefaultState(),J=-1,at=null,M.pop(),M.length>0?(E=M[M.length-1],K.setTextureUnits(E.state.textureUnits),et===!0&&Gt.setGlobalState(N.clippingPlanes,E.state.camera)):E=null,R.pop(),R.length>0?w=R[R.length-1]:w=null,F!==null&&F.renderEnd()};function Al(y,H,$,W){if(y.visible===!1)return;if(y.layers.test(H.layers)){if(y.isGroup)$=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(H);else if(y.isLightProbeGrid)E.pushLightProbeGrid(y);else if(y.isLight)E.pushLight(y),y.castShadow&&E.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Y.intersectsSprite(y)){W&&ct.setFromMatrixPosition(y.matrixWorld).applyMatrix4(st);const Nt=it.update(y),wt=y.material;wt.visible&&w.push(y,Nt,wt,$,ct.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Y.intersectsObject(y))){const Nt=it.update(y),wt=y.material;if(W&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),ct.copy(y.boundingSphere.center)):(Nt.boundingSphere===null&&Nt.computeBoundingSphere(),ct.copy(Nt.boundingSphere.center)),ct.applyMatrix4(y.matrixWorld).applyMatrix4(st)),Array.isArray(wt)){const Ot=Nt.groups;for(let zt=0,jt=Ot.length;zt<jt;zt++){const ne=Ot[zt],Ht=wt[ne.materialIndex];Ht&&Ht.visible&&w.push(y,Nt,Ht,$,ct.z,ne)}}else wt.visible&&w.push(y,Nt,wt,$,ct.z,null)}}const At=y.children;for(let Nt=0,wt=At.length;Nt<wt;Nt++)Al(At[Nt],H,$,W)}function rf(y,H,$,W){const{opaque:X,transmissive:At,transparent:Nt}=y;E.setupLightsView($),et===!0&&Gt.setGlobalState(N.clippingPlanes,$),W&&x.viewport(_t.copy(W)),X.length>0&&Uo(X,H,$),At.length>0&&Uo(At,H,$),Nt.length>0&&Uo(Nt,H,$),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function of(y,H,$,W){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[W.id]===void 0){const Ht=Et.has("EXT_color_buffer_half_float")||Et.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[W.id]=new ai(1,1,{generateMipmaps:!0,type:Ht?Ni:xn,minFilter:Ms,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:oe.workingColorSpace})}const At=E.state.transmissionRenderTarget[W.id],Nt=W.viewport||_t;At.setSize(Nt.z*N.transmissionResolutionScale,Nt.w*N.transmissionResolutionScale);const wt=N.getRenderTarget(),Ot=N.getActiveCubeFace(),zt=N.getActiveMipmapLevel();N.setRenderTarget(At),N.getClearColor(ve),Yt=N.getClearAlpha(),Yt<1&&N.setClearColor(16777215,.5),N.clear(),nt&&Jt.render($);const jt=N.toneMapping;N.toneMapping=Hn;const ne=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),E.setupLightsView(W),et===!0&&Gt.setGlobalState(N.clippingPlanes,W),Uo(y,$,W),K.updateMultisampleRenderTarget(At),K.updateRenderTargetMipmap(At),Et.has("WEBGL_multisampled_render_to_texture")===!1){let Ht=!1;for(let de=0,Le=H.length;de<Le;de++){const Pe=H[de],{object:ge,geometry:ke,material:It,group:dn}=Pe;if(It.side===Oe&&ge.layers.test(W.layers)){const ae=It.side;It.side=hn,It.needsUpdate=!0,af(ge,$,W,ke,It,dn),It.side=ae,It.needsUpdate=!0,Ht=!0}}Ht===!0&&(K.updateMultisampleRenderTarget(At),K.updateRenderTargetMipmap(At))}N.setRenderTarget(wt,Ot,zt),N.setClearColor(ve,Yt),ne!==void 0&&(W.viewport=ne),N.toneMapping=jt}function Uo(y,H,$){const W=H.isScene===!0?H.overrideMaterial:null;for(let X=0,At=y.length;X<At;X++){const Nt=y[X],{object:wt,geometry:Ot,group:zt}=Nt;let jt=Nt.material;jt.allowOverride===!0&&W!==null&&(jt=W),wt.layers.test($.layers)&&af(wt,H,$,Ot,jt,zt)}}function af(y,H,$,W,X,At){y.onBeforeRender(N,H,$,W,X,At),y.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),X.onBeforeRender(N,H,$,W,y,At),X.transparent===!0&&X.side===Oe&&X.forceSinglePass===!1?(X.side=hn,X.needsUpdate=!0,N.renderBufferDirect($,H,W,X,y,At),X.side=os,X.needsUpdate=!0,N.renderBufferDirect($,H,W,X,y,At),X.side=Oe):N.renderBufferDirect($,H,W,X,y,At),y.onAfterRender(N,H,$,W,X,At)}function Fo(y,H,$){H.isScene!==!0&&(H=lt);const W=V.get(y),X=E.state.lights,At=E.state.shadowsArray,Nt=X.state.version,wt=dt.getParameters(y,X.state,At,H,$,E.state.lightProbeGridArray),Ot=dt.getProgramCacheKey(wt);let zt=W.programs;W.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?H.environment:null,W.fog=H.fog;const jt=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;W.envMap=ut.get(y.envMap||W.environment,jt),W.envMapRotation=W.environment!==null&&y.envMap===null?H.environmentRotation:y.envMapRotation,zt===void 0&&(y.addEventListener("dispose",Xn),zt=new Map,W.programs=zt);let ne=zt.get(Ot);if(ne!==void 0){if(W.currentProgram===ne&&W.lightsStateVersion===Nt)return cf(y,wt),ne}else wt.uniforms=dt.getUniforms(y),F!==null&&y.isNodeMaterial&&F.build(y,$,wt),y.onBeforeCompile(wt,N),ne=dt.acquireProgram(wt,Ot),zt.set(Ot,ne),W.uniforms=wt.uniforms;const Ht=W.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ht.clippingPlanes=Gt.uniform),cf(y,wt),W.needsLights=vg(y),W.lightsStateVersion=Nt,W.needsLights&&(Ht.ambientLightColor.value=X.state.ambient,Ht.lightProbe.value=X.state.probe,Ht.directionalLights.value=X.state.directional,Ht.directionalLightShadows.value=X.state.directionalShadow,Ht.spotLights.value=X.state.spot,Ht.spotLightShadows.value=X.state.spotShadow,Ht.rectAreaLights.value=X.state.rectArea,Ht.ltc_1.value=X.state.rectAreaLTC1,Ht.ltc_2.value=X.state.rectAreaLTC2,Ht.pointLights.value=X.state.point,Ht.pointLightShadows.value=X.state.pointShadow,Ht.hemisphereLights.value=X.state.hemi,Ht.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ht.spotLightMatrix.value=X.state.spotLightMatrix,Ht.spotLightMap.value=X.state.spotLightMap,Ht.pointShadowMatrix.value=X.state.pointShadowMatrix),W.lightProbeGrid=E.state.lightProbeGridArray.length>0,W.currentProgram=ne,W.uniformsList=null,ne}function lf(y){if(y.uniformsList===null){const H=y.currentProgram.getUniforms();y.uniformsList=ka.seqWithValue(H.seq,y.uniforms)}return y.uniformsList}function cf(y,H){const $=V.get(y);$.outputColorSpace=H.outputColorSpace,$.batching=H.batching,$.batchingColor=H.batchingColor,$.instancing=H.instancing,$.instancingColor=H.instancingColor,$.instancingMorph=H.instancingMorph,$.skinning=H.skinning,$.morphTargets=H.morphTargets,$.morphNormals=H.morphNormals,$.morphColors=H.morphColors,$.morphTargetsCount=H.morphTargetsCount,$.numClippingPlanes=H.numClippingPlanes,$.numIntersection=H.numClipIntersection,$.vertexAlphas=H.vertexAlphas,$.vertexTangents=H.vertexTangents,$.toneMapping=H.toneMapping}function gg(y,H){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;v.setFromMatrixPosition(H.matrixWorld);for(let $=0,W=y.length;$<W;$++){const X=y[$];if(X.texture!==null&&X.boundingBox.containsPoint(v))return X}return null}function _g(y,H,$,W,X){H.isScene!==!0&&(H=lt),K.resetTextureUnits();const At=H.fog,Nt=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?H.environment:null,wt=k===null?N.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:oe.workingColorSpace,Ot=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,zt=ut.get(W.envMap||Nt,Ot),jt=W.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ne=!!$.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ht=!!$.morphAttributes.position,de=!!$.morphAttributes.normal,Le=!!$.morphAttributes.color;let Pe=Hn;W.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Pe=N.toneMapping);const ge=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ke=ge!==void 0?ge.length:0,It=V.get(W),dn=E.state.lights;if(et===!0&&(j===!0||y!==at)){const Se=y===at&&W.id===J;Gt.setState(W,y,Se)}let ae=!1;W.version===It.__version?(It.needsLights&&It.lightsStateVersion!==dn.state.version||It.outputColorSpace!==wt||X.isBatchedMesh&&It.batching===!1||!X.isBatchedMesh&&It.batching===!0||X.isBatchedMesh&&It.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&It.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&It.instancing===!1||!X.isInstancedMesh&&It.instancing===!0||X.isSkinnedMesh&&It.skinning===!1||!X.isSkinnedMesh&&It.skinning===!0||X.isInstancedMesh&&It.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&It.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&It.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&It.instancingMorph===!1&&X.morphTexture!==null||It.envMap!==zt||W.fog===!0&&It.fog!==At||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==Gt.numPlanes||It.numIntersection!==Gt.numIntersection)||It.vertexAlphas!==jt||It.vertexTangents!==ne||It.morphTargets!==Ht||It.morphNormals!==de||It.morphColors!==Le||It.toneMapping!==Pe||It.morphTargetsCount!==ke||!!It.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(ae=!0):(ae=!0,It.__version=W.version);let En=It.currentProgram;ae===!0&&(En=Fo(W,H,X),F&&W.isNodeMaterial&&F.onUpdateProgram(W,En,It));let Yn=!1,Hi=!1,Fs=!1;const _e=En.getUniforms(),De=It.uniforms;if(x.useProgram(En.program)&&(Yn=!0,Hi=!0,Fs=!0),W.id!==J&&(J=W.id,Hi=!0),It.needsLights){const Se=gg(E.state.lightProbeGridArray,X);It.lightProbeGrid!==Se&&(It.lightProbeGrid=Se,Hi=!0)}if(Yn||at!==y){x.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),_e.setValue(C,"projectionMatrix",y.projectionMatrix),_e.setValue(C,"viewMatrix",y.matrixWorldInverse);const Vi=_e.map.cameraPosition;Vi!==void 0&&Vi.setValue(C,ft.setFromMatrixPosition(y.matrixWorld)),T.logarithmicDepthBuffer&&_e.setValue(C,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&_e.setValue(C,"isOrthographic",y.isOrthographicCamera===!0),at!==y&&(at=y,Hi=!0,Fs=!0)}if(It.needsLights&&(dn.state.directionalShadowMap.length>0&&_e.setValue(C,"directionalShadowMap",dn.state.directionalShadowMap,K),dn.state.spotShadowMap.length>0&&_e.setValue(C,"spotShadowMap",dn.state.spotShadowMap,K),dn.state.pointShadowMap.length>0&&_e.setValue(C,"pointShadowMap",dn.state.pointShadowMap,K)),X.isSkinnedMesh){_e.setOptional(C,X,"bindMatrix"),_e.setOptional(C,X,"bindMatrixInverse");const Se=X.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),_e.setValue(C,"boneTexture",Se.boneTexture,K))}X.isBatchedMesh&&(_e.setOptional(C,X,"batchingTexture"),_e.setValue(C,"batchingTexture",X._matricesTexture,K),_e.setOptional(C,X,"batchingIdTexture"),_e.setValue(C,"batchingIdTexture",X._indirectTexture,K),_e.setOptional(C,X,"batchingColorTexture"),X._colorsTexture!==null&&_e.setValue(C,"batchingColorTexture",X._colorsTexture,K));const Gi=$.morphAttributes;if((Gi.position!==void 0||Gi.normal!==void 0||Gi.color!==void 0)&&z.update(X,$,En),(Hi||It.receiveShadow!==X.receiveShadow)&&(It.receiveShadow=X.receiveShadow,_e.setValue(C,"receiveShadow",X.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&H.environment!==null&&(De.envMapIntensity.value=H.environmentIntensity),De.dfgLUT!==void 0&&(De.dfgLUT.value=aw()),Hi){if(_e.setValue(C,"toneMappingExposure",N.toneMappingExposure),It.needsLights&&xg(De,Fs),At&&W.fog===!0&&Dt.refreshFogUniforms(De,At),Dt.refreshMaterialUniforms(De,W,ht,mt,E.state.transmissionRenderTarget[y.id]),It.needsLights&&It.lightProbeGrid){const Se=It.lightProbeGrid;De.probesSH.value=Se.texture,De.probesMin.value.copy(Se.boundingBox.min),De.probesMax.value.copy(Se.boundingBox.max),De.probesResolution.value.copy(Se.resolution)}ka.upload(C,lf(It),De,K)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(ka.upload(C,lf(It),De,K),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&_e.setValue(C,"center",X.center),_e.setValue(C,"modelViewMatrix",X.modelViewMatrix),_e.setValue(C,"normalMatrix",X.normalMatrix),_e.setValue(C,"modelMatrix",X.matrixWorld),W.uniformsGroups!==void 0){const Se=W.uniformsGroups;for(let Vi=0,Os=Se.length;Vi<Os;Vi++){const uf=Se[Vi];ot.update(uf,En),ot.bind(uf,En)}}return En}function xg(y,H){y.ambientLightColor.needsUpdate=H,y.lightProbe.needsUpdate=H,y.directionalLights.needsUpdate=H,y.directionalLightShadows.needsUpdate=H,y.pointLights.needsUpdate=H,y.pointLightShadows.needsUpdate=H,y.spotLights.needsUpdate=H,y.spotLightShadows.needsUpdate=H,y.rectAreaLights.needsUpdate=H,y.hemisphereLights.needsUpdate=H}function vg(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(y,H,$){const W=V.get(y);W.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),V.get(y.texture).__webglTexture=H,V.get(y.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:$,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,H){const $=V.get(y);$.__webglFramebuffer=H,$.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(y,H=0,$=0){k=y,B=H,U=$;let W=null,X=!1,At=!1;if(y){const wt=V.get(y);if(wt.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(C.FRAMEBUFFER,wt.__webglFramebuffer),_t.copy(y.viewport),Mt.copy(y.scissor),ie=y.scissorTest,x.viewport(_t),x.scissor(Mt),x.setScissorTest(ie),J=-1;return}else if(wt.__webglFramebuffer===void 0)K.setupRenderTarget(y);else if(wt.__hasExternalTextures)K.rebindTextures(y,V.get(y.texture).__webglTexture,V.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const jt=y.depthTexture;if(wt.__boundDepthTexture!==jt){if(jt!==null&&V.has(jt)&&(y.width!==jt.image.width||y.height!==jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(y)}}const Ot=y.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(At=!0);const zt=V.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(zt[H])?W=zt[H][$]:W=zt[H],X=!0):y.samples>0&&K.useMultisampledRTT(y)===!1?W=V.get(y).__webglMultisampledFramebuffer:Array.isArray(zt)?W=zt[$]:W=zt,_t.copy(y.viewport),Mt.copy(y.scissor),ie=y.scissorTest}else _t.copy(Wt).multiplyScalar(ht).floor(),Mt.copy(P).multiplyScalar(ht).floor(),ie=D;if($!==0&&(W=q),x.bindFramebuffer(C.FRAMEBUFFER,W)&&x.drawBuffers(y,W),x.viewport(_t),x.scissor(Mt),x.setScissorTest(ie),X){const wt=V.get(y.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+H,wt.__webglTexture,$)}else if(At){const wt=H;for(let Ot=0;Ot<y.textures.length;Ot++){const zt=V.get(y.textures[Ot]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Ot,zt.__webglTexture,$,wt)}}else if(y!==null&&$!==0){const wt=V.get(y.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,wt.__webglTexture,$)}J=-1},this.readRenderTargetPixels=function(y,H,$,W,X,At,Nt,wt=0){if(!(y&&y.isWebGLRenderTarget)){re("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ot=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Nt!==void 0&&(Ot=Ot[Nt]),Ot){x.bindFramebuffer(C.FRAMEBUFFER,Ot);try{const zt=y.textures[wt],jt=zt.format,ne=zt.type;if(y.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+wt),!T.textureFormatReadable(jt)){re("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!T.textureTypeReadable(ne)){re("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=y.width-W&&$>=0&&$<=y.height-X&&C.readPixels(H,$,W,X,yt.convert(jt),yt.convert(ne),At)}finally{const zt=k!==null?V.get(k).__webglFramebuffer:null;x.bindFramebuffer(C.FRAMEBUFFER,zt)}}},this.readRenderTargetPixelsAsync=async function(y,H,$,W,X,At,Nt,wt=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ot=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Nt!==void 0&&(Ot=Ot[Nt]),Ot)if(H>=0&&H<=y.width-W&&$>=0&&$<=y.height-X){x.bindFramebuffer(C.FRAMEBUFFER,Ot);const zt=y.textures[wt],jt=zt.format,ne=zt.type;if(y.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+wt),!T.textureFormatReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!T.textureTypeReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ht=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Ht),C.bufferData(C.PIXEL_PACK_BUFFER,At.byteLength,C.STREAM_READ),C.readPixels(H,$,W,X,yt.convert(jt),yt.convert(ne),0);const de=k!==null?V.get(k).__webglFramebuffer:null;x.bindFramebuffer(C.FRAMEBUFFER,de);const Le=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Av(C,Le,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Ht),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,At),C.deleteBuffer(Ht),C.deleteSync(Le),At}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,H=null,$=0){const W=Math.pow(2,-$),X=Math.floor(y.image.width*W),At=Math.floor(y.image.height*W),Nt=H!==null?H.x:0,wt=H!==null?H.y:0;K.setTexture2D(y,0),C.copyTexSubImage2D(C.TEXTURE_2D,$,0,0,Nt,wt,X,At),x.unbindTexture()},this.copyTextureToTexture=function(y,H,$=null,W=null,X=0,At=0){let Nt,wt,Ot,zt,jt,ne,Ht,de,Le;const Pe=y.isCompressedTexture?y.mipmaps[At]:y.image;if($!==null)Nt=$.max.x-$.min.x,wt=$.max.y-$.min.y,Ot=$.isBox3?$.max.z-$.min.z:1,zt=$.min.x,jt=$.min.y,ne=$.isBox3?$.min.z:0;else{const De=Math.pow(2,-X);Nt=Math.floor(Pe.width*De),wt=Math.floor(Pe.height*De),y.isDataArrayTexture?Ot=Pe.depth:y.isData3DTexture?Ot=Math.floor(Pe.depth*De):Ot=1,zt=0,jt=0,ne=0}W!==null?(Ht=W.x,de=W.y,Le=W.z):(Ht=0,de=0,Le=0);const ge=yt.convert(H.format),ke=yt.convert(H.type);let It;H.isData3DTexture?(K.setTexture3D(H,0),It=C.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(K.setTexture2DArray(H,0),It=C.TEXTURE_2D_ARRAY):(K.setTexture2D(H,0),It=C.TEXTURE_2D),x.activeTexture(C.TEXTURE0),x.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,H.flipY),x.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),x.pixelStorei(C.UNPACK_ALIGNMENT,H.unpackAlignment);const dn=x.getParameter(C.UNPACK_ROW_LENGTH),ae=x.getParameter(C.UNPACK_IMAGE_HEIGHT),En=x.getParameter(C.UNPACK_SKIP_PIXELS),Yn=x.getParameter(C.UNPACK_SKIP_ROWS),Hi=x.getParameter(C.UNPACK_SKIP_IMAGES);x.pixelStorei(C.UNPACK_ROW_LENGTH,Pe.width),x.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Pe.height),x.pixelStorei(C.UNPACK_SKIP_PIXELS,zt),x.pixelStorei(C.UNPACK_SKIP_ROWS,jt),x.pixelStorei(C.UNPACK_SKIP_IMAGES,ne);const Fs=y.isDataArrayTexture||y.isData3DTexture,_e=H.isDataArrayTexture||H.isData3DTexture;if(y.isDepthTexture){const De=V.get(y),Gi=V.get(H),Se=V.get(De.__renderTarget),Vi=V.get(Gi.__renderTarget);x.bindFramebuffer(C.READ_FRAMEBUFFER,Se.__webglFramebuffer),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,Vi.__webglFramebuffer);for(let Os=0;Os<Ot;Os++)Fs&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,V.get(y).__webglTexture,X,ne+Os),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,V.get(H).__webglTexture,At,Le+Os)),C.blitFramebuffer(zt,jt,Nt,wt,Ht,de,Nt,wt,C.DEPTH_BUFFER_BIT,C.NEAREST);x.bindFramebuffer(C.READ_FRAMEBUFFER,null),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(X!==0||y.isRenderTargetTexture||V.has(y)){const De=V.get(y),Gi=V.get(H);x.bindFramebuffer(C.READ_FRAMEBUFFER,Z),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,G);for(let Se=0;Se<Ot;Se++)Fs?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,De.__webglTexture,X,ne+Se):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,De.__webglTexture,X),_e?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Gi.__webglTexture,At,Le+Se):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Gi.__webglTexture,At),X!==0?C.blitFramebuffer(zt,jt,Nt,wt,Ht,de,Nt,wt,C.COLOR_BUFFER_BIT,C.NEAREST):_e?C.copyTexSubImage3D(It,At,Ht,de,Le+Se,zt,jt,Nt,wt):C.copyTexSubImage2D(It,At,Ht,de,zt,jt,Nt,wt);x.bindFramebuffer(C.READ_FRAMEBUFFER,null),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else _e?y.isDataTexture||y.isData3DTexture?C.texSubImage3D(It,At,Ht,de,Le,Nt,wt,Ot,ge,ke,Pe.data):H.isCompressedArrayTexture?C.compressedTexSubImage3D(It,At,Ht,de,Le,Nt,wt,Ot,ge,Pe.data):C.texSubImage3D(It,At,Ht,de,Le,Nt,wt,Ot,ge,ke,Pe):y.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,At,Ht,de,Nt,wt,ge,ke,Pe.data):y.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,At,Ht,de,Pe.width,Pe.height,ge,Pe.data):C.texSubImage2D(C.TEXTURE_2D,At,Ht,de,Nt,wt,ge,ke,Pe);x.pixelStorei(C.UNPACK_ROW_LENGTH,dn),x.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ae),x.pixelStorei(C.UNPACK_SKIP_PIXELS,En),x.pixelStorei(C.UNPACK_SKIP_ROWS,Yn),x.pixelStorei(C.UNPACK_SKIP_IMAGES,Hi),At===0&&H.generateMipmaps&&C.generateMipmap(It),x.unbindTexture()},this.initRenderTarget=function(y){V.get(y).__webglFramebuffer===void 0&&K.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?K.setTextureCube(y,0):y.isData3DTexture?K.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?K.setTexture2DArray(y,0):K.setTexture2D(y,0),x.unbindTexture()},this.resetState=function(){B=0,U=0,k=null,x.reset(),Rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}}const np={type:"change"},Yh={type:"start"},Y0={type:"end"},va=new yl,ip=new ts,cw=Math.cos(70*Va.DEG2RAD),Fe=new I,an=2*Math.PI,pe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},yc=1e-6;class uw extends fS{constructor(t,e=null){super(t,e),this.state=pe.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:xr.ROTATE,MIDDLE:xr.DOLLY,RIGHT:xr.PAN},this.touches={ONE:is.ROTATE,TWO:is.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new Vn,this._lastTargetPosition=new I,this._quat=new Vn().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Pd,this._sphericalDelta=new Pd,this._scale=1,this._panOffset=new I,this._rotateStart=new gt,this._rotateEnd=new gt,this._rotateDelta=new gt,this._panStart=new gt,this._panEnd=new gt,this._panDelta=new gt,this._dollyStart=new gt,this._dollyEnd=new gt,this._dollyDelta=new gt,this._dollyDirection=new I,this._mouse=new gt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=fw.bind(this),this._onPointerDown=hw.bind(this),this._onPointerUp=dw.bind(this),this._onContextMenu=Mw.bind(this),this._onMouseWheel=gw.bind(this),this._onKeyDown=_w.bind(this),this._onTouchStart=xw.bind(this),this._onTouchMove=vw.bind(this),this._onMouseDown=pw.bind(this),this._onMouseMove=mw.bind(this),this._interceptControlDown=Sw.bind(this),this._interceptControlUp=yw.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(np),this.update(),this.state=pe.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Fe.copy(e).sub(this.target),Fe.applyQuaternion(this._quat),this._spherical.setFromVector3(Fe),this.autoRotate&&this.state===pe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=an:i>Math.PI&&(i-=an),s<-Math.PI?s+=an:s>Math.PI&&(s-=an),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Fe.setFromSpherical(this._spherical),Fe.applyQuaternion(this._quatInverse),e.copy(this.target).add(Fe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Fe.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new I(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new I(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Fe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(va.origin.copy(this.object.position),va.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(va.direction))<cw?this.object.lookAt(this.target):(ip.setFromNormalAndCoplanarPoint(this.object.up,this.target),va.intersectPlane(ip,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>yc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>yc||this._lastTargetPosition.distanceToSquared(this.target)>yc?(this.dispatchEvent(np),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?an/60*this.autoRotateSpeed*t:an/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Fe.setFromMatrixColumn(e,0),Fe.multiplyScalar(-t),this._panOffset.add(Fe)}_panUp(t,e){this.screenSpacePanning===!0?Fe.setFromMatrixColumn(e,1):(Fe.setFromMatrixColumn(e,0),Fe.crossVectors(this.object.up,Fe)),Fe.multiplyScalar(t),this._panOffset.add(Fe)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Fe.copy(s).sub(this.target);let r=Fe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(an*this._rotateDelta.x/e.clientHeight),this._rotateUp(an*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(an*this._rotateDelta.x/e.clientHeight),this._rotateUp(an*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new gt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function hw(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function fw(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function dw(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Y0),this.state=pe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function pw(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case xr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=pe.DOLLY;break;case xr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=pe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=pe.ROTATE}break;case xr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=pe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=pe.PAN}break;default:this.state=pe.NONE}this.state!==pe.NONE&&this.dispatchEvent(Yh)}function mw(n){switch(this.state){case pe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case pe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case pe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function gw(n){this.enabled===!1||this.enableZoom===!1||this.state!==pe.NONE||(n.preventDefault(),this.dispatchEvent(Yh),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Y0))}function _w(n){this.enabled!==!1&&this._handleKeyDown(n)}function xw(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case is.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=pe.TOUCH_ROTATE;break;case is.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=pe.TOUCH_PAN;break;default:this.state=pe.NONE}break;case 2:switch(this.touches.TWO){case is.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=pe.TOUCH_DOLLY_PAN;break;case is.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=pe.TOUCH_DOLLY_ROTATE;break;default:this.state=pe.NONE}break;default:this.state=pe.NONE}this.state!==pe.NONE&&this.dispatchEvent(Yh)}function vw(n){switch(this._trackPointer(n),this.state){case pe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case pe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case pe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case pe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=pe.NONE}}function Mw(n){this.enabled!==!1&&n.preventDefault()}function Sw(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yw(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Mn=46,Po=10,ku=Mn+Po,sp=14,qh=16,un=(3*Mn+4*Po)/2,bn=n=>(n-1)*ku,rp=n=>(n-1)*qh;function Ps([n,t],[e,i]){return{x:bn(t)+rp(i),z:bn(n)+rp(e)}}const Wu=[-1,0,1,2].map(n=>n*ku-ku/2),op={trackCount:6},ys=Mn-4,bc=-1,$h=-.8,br=.3,bw=3.2,q0=[-6.4,0,6.4],$0=2.4,Xu=[{id:"north",z:[-58,-46],y:[6,9]},{id:"concourse",z:[6,21],y:[6,14]},{id:"southern",z:[36,58],y:[6,12]}],K0=[{id:"algo-lab",cell:[0,0],lot:[1,1],h:30},{id:"flip7",cell:[0,2],lot:[0,0],h:22},{id:"machi-koro",cell:[0,2],lot:[1,2],h:20},{id:"venue-search",cell:[1,0],lot:[1,0],h:34},{id:"reading-buddy",cell:[1,2],lot:[1,2],h:24},{id:"japan-map",cell:[2,0],lot:[1,1],h:26},{id:"right-word-japanese",cell:[1,2],lot:[2,2],h:18},{id:"japanese-dashboard",cell:[0,0],lot:[2,2],h:24},{id:"bible-hymn-kids",cell:[2,0],lot:[0,0],h:20}];function ap(n,t){const e=t.map(i=>Ps(n,i));return{x:e.reduce((i,s)=>i+s.x,0)/e.length,z:e.reduce((i,s)=>i+s.z,0)/e.length}}const Yu=[{id:"tocho",cell:[1,0],lots:[[0,0],[0,1],[0,2],[1,1],[1,2],[2,2]],h:67},{id:"cocoon",cell:[1,0],lots:[[2,1]],h:34}],Z0=[{id:"konbini",cell:[1,2],lot:[2,0],ry:0},{id:"koban",cell:[2,0],lot:[2,1],ry:0},{id:"vending",cell:[0,2],lot:[2,2],ry:0},{id:"vending",cell:[2,0],lot:[0,2],ry:-Math.PI/2}],lp=[{cell:[1,2],lot:[0,0],w:11,d:8,h:20},{cell:[1,2],lot:[1,0],w:11,d:8,h:22}],Ew=[{cell:[0,0],kind:"tower",height:[28,44],fill:.7},{cell:[0,2],kind:"midrise",height:[16,28],fill:.9},{cell:[1,0],kind:"tower",height:[26,42],fill:.7},{cell:[1,2],kind:"midrise",height:[18,30],fill:.8},{cell:[2,0],kind:"midrise",height:[16,26],fill:.6},{cell:[2,2],kind:"goldengai",height:[6,9],fill:1}],ll=[2,2];function Tw(n){let t=n;return()=>(t=(t*1664525+1013904223)%4294967296)/4294967296}function ww(){const n=Tw(19910714),t=[],e=new Set(K0.map(i=>`${i.cell}|${i.lot}`));for(const i of Yu)for(const s of i.lots)e.add(`${i.cell}|${s}`);for(const i of Z0)e.add(`${i.cell}|${i.lot}`);for(const i of lp)e.add(`${i.cell}|${i.lot}`);for(const i of lp){const{x:s,z:r}=Ps(i.cell,i.lot);t.push({x:s,z:r,w:i.w,d:i.d,h:i.h,kind:"midrise",ry:0})}for(const i of Ew)if(String(i.cell)!==String(ll))for(let s=0;s<3;s++)for(let r=0;r<3;r++){const o=`${i.cell}|${[s,r]}`;if(e.has(o)||n()>i.fill)continue;const{x:a,z:l}=Ps(i.cell,[s,r]),[c,u]=i.height,h=sp*(.62+n()*.3),f=sp*(.62+n()*.3);t.push({x:a,z:l,w:h,d:f,h:c+n()*(u-c),kind:i.kind,ry:(n()-.5)*.08})}return t}const Aw=267,J0=145,Rw=21.3,Ec=Rw/.927,Ma=Math.PI/4,Cw=5,Pw=30,Tc=.9,Lw=n=>Math.sqrt(n/J0),cp={high:.75,low:.55},Dw=30,Iw=8;function Nw(){const n=document.createElement("canvas");n.width=64,n.height=256;const t=n.getContext("2d"),e=t.createLinearGradient(0,0,0,256);e.addColorStop(0,"#3d7dd8"),e.addColorStop(.32,"#6fa3e6"),e.addColorStop(.46,"#a9c8ec"),e.addColorStop(.5,"#d8e6ef"),e.addColorStop(.54,"#c7c9bd"),e.addColorStop(1,"#9a9a90"),t.fillStyle=e,t.fillRect(0,0,64,256);const i=new on(n);return i.mapping=Oa,i.colorSpace=Ee,i}function Uw(){return window.innerWidth<900||matchMedia("(pointer: coarse)").matches?"low":"high"}function Fw(n,t={}){const e=t.quality??Uw(),i=e==="low",s=matchMedia("(prefers-reduced-motion: reduce)").matches,r=new lw({canvas:n,antialias:!1});r.setPixelRatio(t.resScale??(i?cp.low:cp.high)),r.toneMapping=Hn;const o=new sM;o.fog=new zh(13095900,220,500),o.background=Nw();const a=new bl(-1,1,1,-1,.1,2e3),l=22*Math.PI/180,c=200;a.position.set(c*Math.cos(l)*Math.sin(Ma),c*Math.sin(l)+Ec,c*Math.cos(l)*Math.cos(Ma));const u=new uw(a,n);u.target.set(0,Ec,0),u.enablePan=!0,u.screenSpacePanning=!1,u.touches.ONE=is.PAN,u.touches.TWO=is.DOLLY_ROTATE,u.enableDamping=!0,u.dampingFactor=.08,u.minPolarAngle=Math.PI*.26,u.maxPolarAngle=Math.PI*.46,u.minAzimuthAngle=Ma-Math.PI/5,u.maxAzimuthAngle=Ma+Math.PI/5,u.minZoom=Tc,u.zoom0=1,u.update();let h=!1;function f(){const{clientWidth:B,clientHeight:U}=n;if(!B||!U)return;const k=B/U,J=Math.max(J0,Aw/k);if(a.left=-J*k/2,a.right=J*k/2,a.top=J/2,a.bottom=-J/2,a.updateProjectionMatrix(),u.maxZoom=Math.max(Tc+.1,J/Pw),!h){h=!0;const at=Va.clamp(Lw(J),Tc,u.maxZoom);a.zoom=at,u.zoom0=at,a.updateProjectionMatrix()}r.setSize(B,U,!1),q()}const d=new ResizeObserver(f);d.observe(n);const g=[],_=new uS,m=new gt,p={hover:()=>{},select:()=>{}};let S=null,b=null;function v(B){const U=_.far;_.far=B.distance-.01;const k=_.intersectObject(o,!0).some(J=>J.object.visible&&!g.includes(J.object)&&![J.object.material].flat().some(at=>at==null?void 0:at.transparent));return _.far=U,k}function w(B){const U=n.getBoundingClientRect();m.x=(B.clientX-U.left)/U.width*2-1,m.y=-((B.clientY-U.top)/U.height)*2+1,_.setFromCamera(m,a);const k=_.intersectObjects(g,!1)[0];return k?v(k)?null:k.object:null}function E(B){const U=w(B);U!==S&&(S=U,n.style.cursor=U?"pointer":"grab",p.hover((U==null?void 0:U.userData.project)??null),q())}const R=B=>{b={x:B.clientX,y:B.clientY}};function M(B){if(!b)return;const U=Math.hypot(B.clientX-b.x,B.clientY-b.y);if(b=null,U>Cw)return;const k=w(B);k&&p.select(k.userData.project)}n.addEventListener("pointermove",E),n.addEventListener("pointerdown",R),n.addEventListener("pointerup",M);const A=[],N=new hS;let L=!0,F=0;const q=()=>{L=!0};function Z(){const B=u.target,U=Va.clamp(B.x,-un,un)-B.x,k=Ec-B.y,J=Va.clamp(B.z,-un,un)-B.z;!U&&!k&&!J||(B.set(B.x+U,B.y+k,B.z+J),a.position.set(a.position.x+U,a.position.y+k,a.position.z+J))}function G(B){const U=u.update();if(Z(),s){if(!U&&!L)return;L=!1,r.render(o,a);return}if(B-F<1e3/Dw-Iw)return;const k=Math.min((B-F)/1e3,.1);F=B;for(const J of A)J(k,N.getElapsedTime());L=!1,r.render(o,a)}return f(),{scene:o,camera:a,controls:u,renderer:r,reduceMotion:s,quality:e,invalidate:q,onFrame:B=>A.push(B),addPickable(B,U){B.userData.project=U,g.push(B)},onHover:B=>{p.hover=B},onSelect:B=>{p.select=B},start:()=>r.setAnimationLoop(G),stop:()=>r.setAnimationLoop(null),dispose(){var B;r.setAnimationLoop(null),d.disconnect(),n.removeEventListener("pointermove",E),n.removeEventListener("pointerdown",R),n.removeEventListener("pointerup",M),u.dispose(),o.traverse(U=>{var k;(k=U.geometry)==null||k.dispose();for(const J of[U.material].flat().filter(Boolean)){for(const at of Object.values(J))at!=null&&at.isTexture&&at.dispose();J.dispose()}}),(B=o.background)==null||B.dispose(),r.dispose()}}}function Ow(n){n.add(new aS(14411509,1.6));const t=new oS(16774104,2);t.position.set(-60,70,40),n.add(t)}function zi(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,l=new Ge;let c=0;for(let u=0;u<n.length;++u){const h=n[u];let f=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(h.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.morphAttributes[d])}if(t){let d;if(e)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,u),c+=d}}if(e){let u=0;const h=[];for(let f=0;f<n.length;++f){const d=n[f].index;for(let g=0;g<d.count;++g)h.push(d.getX(g)+u);u+=n[f].attributes.position.count}l.setIndex(h)}for(const u in r){const h=up(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let _=0;_<o[u].length;++_)d.push(o[u][_][f]);const g=up(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}}return l}function up(n){let t,e,i,s=-1,r=0;for(let c=0;c<n.length;++c){const u=n[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new fn(o,e,i);let l=0;for(let c=0;c<n.length;++c){const u=n[c];if(u.isInterleavedBufferAttribute){const h=l/e;for(let f=0,d=u.count;f<d;f++)for(let g=0;g<e;g++){const _=u.getComponent(f,g);a.setComponent(f+h,g,_)}}else o.set(u.array,l);l+=u.count*e}return s!==void 0&&(a.gpuType=s),a}const Bw=5527132,di=16723285,Ur=58879,Us=16757575,Lr=12173516,rn=15918020,j0=42576,zw=n=>"#"+n.toString(16).padStart(6,"0");let hp=20260731;const bs=()=>(hp=(hp*1664525+1013904223)%4294967296)/4294967296,An=256,_s=1200,Wa=_s/2,Hw=7;function fp(n,t,e,i){const s=e-t,r=Math.max(1,Math.round(i/Hw)),o=s/r,a=An/2;n.fillStyle="rgba(224,218,200,0.55)";for(let l=0;l<r;l++){const c=t+l*o+(bs()-.5)*o*.2,u=o*(.42+bs()*.2);n.fillRect(a-3,Math.max(t,c),6,Math.min(u,e-c))}}function Gw(n,t){const e=Wa/(2*un),i=Po/2*e,s=t-i;n.fillStyle="rgba(255,255,255,0.05)",n.fillRect(0,s,An,i*2),n.fillStyle="rgba(230,225,210,0.65)";const r=i*.5,o=An*.08,a=i*.55;n.fillRect(0,s+i-a,An,r),n.fillRect(0,s+i+a-r,An,r),n.fillRect(An/2-a,s,o,i*2),n.fillRect(An/2+a-o,s,o,i*2)}function Vw(){const n=document.createElement("canvas");n.width=An,n.height=_s;const t=document.createElement("canvas");t.width=An,t.height=_s;const e=n.getContext("2d"),i=t.getContext("2d");e.fillStyle=zw(Bw),e.fillRect(0,0,An,_s),i.fillStyle="#000",i.fillRect(0,0,An,_s),e.fillStyle="rgba(0,0,0,0.12)";for(let r=0;r<140;r++){const o=8+bs()*34,a=6+bs()*22;e.fillRect(bs()*An,bs()*_s,o,a)}fp(e,0,Wa,2*un),fp(e,Wa,_s,Mn);for(const r of Wu)Gw(e,(r+un)/(2*un)*Wa);const s=r=>Object.assign(new on(r),{colorSpace:Ee,anisotropy:8});return{map:s(n),emissiveMap:s(t)}}function kw(n,t,e,i){const s=n.attributes.uv;for(let r=0;r<s.count;r++){let o=s.getX(r),a=s.getY(r);if(t){const l=o;o=a,a=l}e&&(a=1-a),s.setXY(r,o,i==="through"?a*.5:.5+a*.5)}}function dp(n,t,e,i,{swap:s,band:r}){const o=new Te(n,t);return kw(o,s,bs()<.5,r),o.rotateX(-Math.PI/2),o.translate(e,0,i),o}function Ww(){const n=[],t=2*un;for(const o of Wu)n.push(dp(Po,t,o,0,{swap:!1,band:"through"}));for(const o of Wu)for(const a of[0,1,2])n.push(dp(Mn,Po,bn(a),o,{swap:!0,band:"segment"}));const e=zi(n),{map:i,emissiveMap:s}=Vw(),r=new kt({map:i,emissiveMap:s,emissive:16777215,emissiveIntensity:.5});return new bt(e,r)}const Ki=4*un,Xw=7039583;function Yw(){const n=new P0;n.moveTo(-Ki/2,-Ki/2),n.lineTo(Ki/2,-Ki/2),n.lineTo(Ki/2,Ki/2),n.lineTo(-Ki/2,Ki/2),n.closePath();const t=new Ou,e=ys/2,i=un;t.moveTo(-e,-i),t.lineTo(e,-i),t.lineTo(e,i),t.lineTo(-e,i),t.closePath(),n.holes.push(t);const s=new Xh(n);s.rotateX(-Math.PI/2);const r=new bt(s,new kt({color:Xw}));return r.position.y=-.04,r}const pp=.16,Sa=.4,mp=2763827;function qw(){const n=[];for(const i of[0,1,2])for(const s of[0,1,2]){const r=bn(s),o=bn(i),a=Mn/2,l=[[Mn,Sa,r,o-a],[Mn,Sa,r,o+a],...s===1?[]:[[Sa,Mn,r-a,o],[Sa,Mn,r+a,o]]];for(const[c,u,h,f]of l){const d=new Pt(c,pp,u);d.translate(h,pp/2,f),n.push(d)}}const t=zi(n),e=new kt({color:mp,emissive:mp,emissiveIntensity:.35});return new bt(t,e)}function $w(){const n=new Re;return n.add(Yw()),n.add(Ww()),n.add(qw()),n}let gp=20260731;const qu=()=>(gp=(gp*1664525+1013904223)%4294967296)/4294967296,cl=120,$u=240,Kw="#9aa1ad",_p="#747c88",xp=["#f2e3c4","#d9b878","#a8cfe8","#8a9bb0"],Zw=.19,Jw=.225,jw=[{cols:4,rows:6,pierAt:0,lit:.44,cap:0},{cols:3,rows:5,pierAt:1,lit:.4,cap:0},{cols:4,rows:7,pierAt:2,lit:.48,cap:0},{cols:3,rows:6,pierAt:0,lit:.42,cap:0}],Qw=[{cols:4,rows:10,pierAt:0,lit:.48,cap:1},{cols:4,rows:11,pierAt:3,lit:.45,cap:1},{cols:3,rows:9,pierAt:1,lit:.52,cap:1},{cols:4,rows:12,pierAt:2,lit:.46,cap:1}],wc=[...jw,...Qw],tA=[0,1,2,3],eA=[4,5,6,7];function nA(n,t,e,{cols:i,rows:s,pierAt:r,lit:o,cap:a}){const l=cl/i,c=$u/s,u=l*Zw,h=c*Jw,f=l-2*u,d=c-2*h;for(let g=0;g<i;g++){const _=e+g*l;if(g===r){n.fillStyle=_p,n.fillRect(_,0,l,$u);continue}for(let m=0;m<s;m++){const p=m*c;if(m<a||m>=s-a){n.fillStyle=_p,n.fillRect(_,p,l,c);continue}if(qu()>o){n.fillStyle="rgba(0,0,0,0.22)",n.fillRect(_+u,p+h,f,d);continue}const S=xp[Math.floor(qu()*xp.length)];n.fillStyle=S,n.fillRect(_+u,p+h,f,d),t.fillStyle=S,t.fillRect(_+u,p+h,f,d)}}n.fillStyle="rgba(0,0,0,0.45)";for(let g=0;g<s;g++)n.fillRect(e,g*c,cl,2)}function iA(){const n=cl*wc.length,t=$u,e=()=>{const l=document.createElement("canvas");return l.width=n,l.height=t,[l,l.getContext("2d")]},[i,s]=e(),[r,o]=e();s.fillStyle=Kw,s.fillRect(0,0,n,t),o.fillStyle="#000",o.fillRect(0,0,n,t),wc.forEach((l,c)=>nA(s,o,c*cl,l));const a=l=>Object.assign(new on(l),{colorSpace:Ee,anisotropy:8});return{map:a(i),emissiveMap:a(r),panelCount:wc.length}}function sA(n,t){n.customProgramCacheKey=()=>"blocks-atlas-uv",n.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <uv_pars_vertex>",`#include <uv_pars_vertex>
attribute vec2 aUvOffset;`).replace("#include <uv_vertex>",`#include <uv_vertex>
#ifdef USE_MAP
  vMapUv = vMapUv / ${t.toFixed(1)} + aUvOffset;
#endif
#ifdef USE_EMISSIVEMAP
  vEmissiveMapUv = vEmissiveMapUv / ${t.toFixed(1)} + aUvOffset;
#endif`)}}function rA(){const n=new Re,t=ww(),e=new Pt(1,1,1);e.translate(0,.5,0);const{map:i,emissiveMap:s,panelCount:r}=iA(),o=new kt({map:i,emissiveMap:s,emissive:16777215,emissiveIntensity:.12});sA(o,r);const a=new S0(e,o,t.length),l=new Float32Array(t.length*2),c=new Ie;return t.forEach((u,h)=>{c.position.set(u.x,0,u.z),c.rotation.set(0,u.ry,0),c.scale.set(u.w,u.h,u.d),c.updateMatrix(),a.setMatrixAt(h,c.matrix);const f=u.kind==="tower"?eA:tA,d=f[Math.floor(qu()*f.length)];l[h*2]=d/r}),a.instanceMatrix.needsUpdate=!0,e.setAttribute("aUvOffset",new Fu(l,2)),n.add(a),n}const Ls="'Shippori Mincho', serif",oA=4,aA=1/3.5,lA=n=>typeof n=="number"?"#"+n.toString(16).padStart(6,"0"):n;function cA(n){let t=0;for(let e=0;e<n.length;e++)t=t*31+n.charCodeAt(e)>>>0;return t||1}function vp(n,t,e,i){let s=i;for(n.font=`bold ${s}px ${Ls}`;s>6&&n.measureText(t).width>e;)s-=2,n.font=`bold ${s}px ${Ls}`;return s}function Mp(n,t,e,i){let s=i;for(n.font=`bold ${s}px ${Ls}`;s>6&&(s*t.length*1.05>i||t.some(r=>n.measureText(r).width>e));)s-=2,n.font=`bold ${s}px ${Ls}`;return s}function Kh(n,t,e,i,s,r){const o=e*.12;if(r==="vertical"){const u=Array.from(i),h=s?Array.from(s):[],f=h.length>0,d=(f?t*.55:t*.7)-o,g=e-o*2,_=Mp(n,u,d,g),m=_*1.05;let p=e/2-m*u.length/2+m/2;const S=f?t*.66:t/2,b=u.map(v=>{const w={text:v,x:S,y:p,size:_};return p+=m,w});if(f){const v=Mp(n,h,d*.6,g*.8),w=v*1.05;let E=e/2-w*h.length/2+w/2;for(const R of h)b.push({text:R,x:t*.28,y:E,size:v}),E+=w}return b}const a=t-o*2,l=vp(n,i,a,s?e*.55:e*.7),c=[{text:i,x:t/2,y:s?e*.4:e/2,size:l}];if(s){const u=vp(n,s,a,e*.22);c.push({text:s,x:t/2,y:e*.74,size:u})}return c}function uA(n,{text:t,x:e,y:i,size:s},r){n.font=`bold ${s}px ${Ls}`,n.textAlign="center",n.textBaseline="middle",n.lineJoin="round",n.fillStyle=r,n.shadowColor=r,n.shadowBlur=s*.75,n.fillText(t,e,i),n.fillText(t,e,i),n.shadowBlur=s*.3,n.fillText(t,e,i),n.shadowBlur=s*.1,n.shadowColor="#fff",n.strokeStyle="#fff",n.lineWidth=s*.07,n.strokeText(t,e,i),n.shadowBlur=0,n.shadowColor="transparent"}function Q0(n,t,e,i,s,r,o){n.fillStyle="#0a0a0d",n.fillRect(0,0,t,e);const a=e*.08;n.strokeStyle=o,n.lineWidth=Math.max(2,e*.015),n.strokeRect(a,a,t-a*2,e-a*2);const l=Kh(n,t,e,i,s,r);for(const c of l)uA(n,c,o)}function hA(n,t,e,i,s,r,o){n.fillStyle=o,n.fillRect(0,0,t,e);const a=Kh(n,t,e,i,s,r);n.fillStyle="#000",n.textAlign="center",n.textBaseline="middle";for(const l of a)n.font=`bold ${l.size}px ${Ls}`,n.fillText(l.text,l.x,l.y)}function fA(n){const t=parseInt(n.slice(1),16),e=t>>16&255,i=t>>8&255,s=t&255,r=(e+i+s)/3,o=a=>Math.round(a*.3+r*.3+30);return`rgb(${o(e)},${o(i)},${o(s)})`}function dA(n,t,e,i,s,r,o){n.fillStyle=fA(o),n.fillRect(0,0,t,e);let a=cA(i);const l=()=>(a=(a*1664525+1013904223)%4294967296)/4294967296;n.strokeStyle="rgba(0,0,0,0.15)";for(let u=0;u<40;u++){n.lineWidth=l()*1.5;const h=l()*t,f=l()*e;n.beginPath(),n.moveTo(h,f),n.lineTo(h+(l()-.5)*30,f+(l()-.5)*30),n.stroke()}n.fillStyle="rgba(255,255,255,0.06)";for(let u=0;u<300;u++)n.fillRect(l()*t,l()*e,1,1);const c=Kh(n,t,e,i,s,r);n.textAlign="center",n.textBaseline="middle",n.fillStyle="#e8ded0",n.strokeStyle="rgba(0,0,0,0.4)";for(const u of c)n.font=`bold ${u.size}px ${Ls}`,n.lineWidth=u.size*.06,n.strokeText(u.text,u.x,u.y),n.fillText(u.text,u.x,u.y)}const pA={neon:Q0,lightbox:hA,painted:dA};function Fi(n){const{text:t,sub:e="",style:i="neon",orientation:s="horizontal",color:r="#FF2D55",px:o=256}=n,a=lA(r),l=s==="vertical"?aA:oA,c=o,u=Math.round(c*l),h=document.createElement("canvas");h.width=u,h.height=c;const f=h.getContext("2d");return(pA[i]??Q0)(f,u,c,t,e,s,a),{map:Object.assign(new on(h),{colorSpace:Ee,anisotropy:8}),aspect:u/c}}const ul=n=>"#"+n.toString(16).padStart(6,"0");function tg(n){let t=n;return()=>(t=(t*1664525+1013904223)%4294967296)/4294967296}function yn(n,{x:t=0,y:e=0,z:i=0,ry:s=0}){const r=new se().compose(new I(t,e,i),new Vn().setFromEuler(new kn(0,s,0)),new I(1,1,1));return n.applyMatrix4(r)}function Oi(n,t){return new bt(zi(n),t)}const mA=.18,Ku=.14,Xa=2*un,eg=Mn/2-2,ji=2,Sp=-.06,Zu=3.4,ng=br+.2,gA=8,_A=[{x:-6.4,z:[-19,15]},{x:0,z:[-15,21]},{x:6.4,z:[-21,17]}];function xA(n,t){const i=Math.round(n*8),s=Math.round(t*8),r=()=>{const g=document.createElement("canvas");return g.width=i,g.height=s,[g,g.getContext("2d")]},[o,a]=r(),[l,c]=r();a.fillStyle="#7f8896",a.fillRect(0,0,i,s),c.fillStyle="#000",c.fillRect(0,0,i,s);const u=tg(20260731),h=2.6*8,f=Math.round(i/h);for(let g=0;g<f;g++){const _=g*h;if(g%3===0){a.fillStyle=ul(Lr),a.fillRect(_,0,h*.35,s);continue}const m=s*.18,p=s*.64;if(u()>.55){a.fillStyle="rgba(0,0,0,0.22)",a.fillRect(_+h*.15,m,h*.7,p);continue}const S=u()>.3?ul(rn):"#a8cfe8";a.fillStyle=S,a.fillRect(_+h*.15,m,h*.7,p),c.fillStyle=S,c.fillRect(_+h*.15,m,h*.7,p)}const d=g=>Object.assign(new on(g),{colorSpace:Ee,anisotropy:8});return{map:d(o),emissiveMap:d(l)}}function vA(n){const e=Math.round(n*6),i=document.createElement("canvas");i.width=e,i.height=e;const s=i.getContext("2d");s.fillStyle="#252b36",s.fillRect(0,0,e,e),s.strokeStyle="rgba(255,255,255,0.035)",s.lineWidth=1;for(let o=0;o<e;o+=18)s.beginPath(),s.moveTo(0,o),s.lineTo(e,o),s.stroke();const r=tg(20260801);for(let o=0;o<26;o++){const a=(2+r()*4)*6,l=(2+r()*3)*6,c=r()*(e-a),u=r()*(e-l);s.fillStyle="rgba(0,0,0,0.45)",s.fillRect(c+3,u+3,a,l),s.fillStyle=r()>.7?"#3a4150":"#2e3441",s.fillRect(c,u,a,l),s.strokeStyle="rgba(255,255,255,0.08)",s.strokeRect(c+.5,u+.5,a-1,l-1)}return s.strokeStyle="#2a2f3a",s.lineWidth=6*.8,s.strokeRect(6*.4,6*.4,e-6*.8,e-6*.8),Object.assign(new on(i),{colorSpace:Ee,anisotropy:8})}function MA(){const n=new kt({color:1316381}),t=new Pt(ys-2*ji,.2,Xa);t.translate(0,bc-.1,0);const e=new bt(t,n),i=new kt({color:2764602,emissive:2764602,emissiveIntensity:.25}),s=Sp-bc,r=(bc+Sp)/2,o=ys/2-ji/2,a=un-ji/2,l=[yn(new Pt(ji,s,Xa),{x:-o,y:r}),yn(new Pt(ji,s,Xa),{x:o,y:r}),yn(new Pt(ys,s,ji),{y:r,z:-a}),yn(new Pt(ys,s,ji),{y:r,z:a})],c=Oi(l,i);return{floor:e,walls:c}}function SA(){const n=Array.from({length:op.trackCount},(i,s)=>(s-(op.trackCount-1)/2)*bw),t=new kt({color:Lr,emissive:Lr,emissiveIntensity:.15}),e=n.map(i=>yn(new Pt(mA,Ku,Xa),{x:i,y:$h+Ku/2}));return{mesh:Oi(e,t),trackXs:n}}function yA(){const n=new kt({color:9542056}),t=eg*2,e=q0.map(i=>yn(new Pt($0,.2,t),{x:i,y:br-.1}));return Oi(e,n)}function bA(){const n=eg*2-4,t=q0.map(e=>yn(new Pt($0*.6,.06,n),{x:e,y:br+.04}));return Oi(t,new le({color:rn}))}function EA(){const n=new kt({color:10135739,emissive:rn,emissiveIntensity:.08}),t=_A.map(({x:e,z:i})=>{const s=i[1]-i[0],r=new hi(Zu,Zu,s,gA,1,!1,Math.PI,Math.PI);return r.rotateX(Math.PI/2),yn(r,{x:e,y:ng,z:(i[0]+i[1])/2})});return Oi(t,n)}function TA(){const n=new kt({color:1842983}),t=ng+Zu+1-br,e=br+t,i=ys/2-ji-1,s=[];for(let r=-20;r<=20;r+=8){for(const o of[-1,1])s.push(yn(new Pt(.5,t,.5),{x:o*i,y:br+t/2,z:r}));s.push(yn(new Pt(i*2,.4,.4),{y:e,z:r}))}return Oi(s,n)}const Ac=1.3,ya=1.6,Rc=16;function wA(n){const t=$h+Ku+ya/2,e=new kt({color:1708550,emissive:rn,emissiveIntensity:.2}),i=new bt(new Pt(Ac,ya,Rc),new kt({color:j0}));i.position.set(n[1],t,2);const s=new bt(new Pt(Ac,ya,Rc),new kt({color:di}));s.position.set(n[4],t,-2);const r=[i,s].map(a=>yn(new Te(Rc*.85,ya*.4),{x:a.position.x+Ac/2+.02,y:t,z:a.position.z,ry:Math.PI/2})),o=Oi(r,e);return{jrBody:i,nexBody:s,windows:o}}function AA(){const n=ys-2,e=xA(n,8),i=new kt({map:e.map,emissiveMap:e.emissiveMap,emissive:16777215,emissiveIntensity:.15}),s=Xu.map(({z:c,y:u})=>yn(new Pt(n,u[1]-u[0],c[1]-c[0]),{y:(u[0]+u[1])/2,z:(c[0]+c[1])/2})),r=Oi(s,i),o=new kt({map:vA(n)}),a=Xu.map(({z:c,y:u})=>{const h=new Te(n,c[1]-c[0]);return h.rotateX(-Math.PI/2),yn(h,{y:u[1]+.02,z:(c[0]+c[1])/2})}),l=Oi(a,o);return{bodies:r,roofs:l}}function RA(){const n=new Re,{floor:t,walls:e}=MA();n.add(t,e);const{mesh:i,trackXs:s}=SA();n.add(i),n.add(yA()),n.add(bA()),n.add(EA()),n.add(TA());const{jrBody:r,nexBody:o,windows:a}=wA(s);n.add(r,o,a);const{bodies:l,roofs:c}=AA();n.add(l,c);const u=Xu[1].z[1],h=Fi({text:"新宿駅",style:"lightbox",orientation:"horizontal",color:ul(j0),px:512}),f=new le({map:h.map}),d=11,g=new bt(new Te(d,d/h.aspect),f);g.position.set(0,11,u+.35),n.add(g);const _=Fi({text:"1-6",sub:"のりば",style:"neon",orientation:"horizontal",color:ul(Us),px:256}),m=new le({map:_.map}),p=6,S=new bt(new Te(p,p/_.aspect),m);S.position.set(-14,8,u+.35),n.add(S);const b=2.6,v=new Ie;return v.position.set(-14,6.5-b,u+.3),n.add(v),{group:n,boardAnchor:v,trackY:$h}}const yp=48.6,CA=40,ig=40.8,Ju=6.6;let bp=20260729;const ur=()=>(bp=(bp*1664525+1013904223)%4294967296)/4294967296,PA="#6f8fae",LA="#9aa3b0",DA="#82a0ba";function IA(n,t,{lit:e=.6,pxCol:i=24,pxRow:s=14}={}){const r=n*i,o=t*s,a=()=>{const _=document.createElement("canvas");return _.width=r,_.height=o,[_,_.getContext("2d")]},[l,c]=a(),[u,h]=a();c.fillStyle=PA,c.fillRect(0,0,r,o),h.fillStyle="#000",h.fillRect(0,0,r,o),c.fillStyle=DA;for(let _=0;_<t;_++)c.fillRect(0,_*s,r,2);const f=Array.from({length:t},()=>ur()<e);for(let _=0;_<n;_++){const m=_*i;for(let p=0;p<t;p++){const S=p*s;if(!(f[p]?ur()<.8:ur()<.1))continue;const b=ur(),v=b>.92?"#a8cfe8":b>.3?"#e8c88a":"#f2e3c4";c.fillStyle=v,c.fillRect(m+3,S+2,i-6,s-5),h.fillStyle=v,h.fillRect(m+3,S+2,i-6,s-5)}}const d=Math.max(3,Math.round(i*.45));for(let _=0;_<=n;_++){if(_%3!==0&&_!==n)continue;const m=Math.min(Math.max(_*i-d/2,0),r-d);c.fillStyle=LA,c.fillRect(m,0,d,o),c.fillStyle="rgba(0,0,0,0.3)",c.fillRect(m+d-2,0,2,o)}const g=_=>Object.assign(new on(_),{colorSpace:Ee,anisotropy:8});return{map:g(l),emissiveMap:g(u)}}function NA(n){const i=ig*n,s=Math.PI*(Ju+Ju*.68)*n,r=Math.round(3*(1024/i)),o=Math.round(3*(512/s)),a=document.createElement("canvas");a.width=512,a.height=1024;const l=a.getContext("2d"),c=document.createElement("canvas");c.width=512,c.height=1024;const u=c.getContext("2d");l.fillStyle="#4a5566",l.fillRect(0,0,512,1024),u.fillStyle="#000",u.fillRect(0,0,512,1024);for(let f=0;f<1024;f+=r)for(let d=0;d<512;d+=r){if(ur()>.34)continue;const g=ur()>.5?"#cfe6f5":"#e8d4a8",_=r*.15;l.fillStyle=g,l.fillRect(d+_,f+_,r-_*2,r-_*2),u.fillStyle=g,u.fillRect(d+_,f+_,r-_*2,r-_*2)}for(const f of[1,-1])for(let d=-1024;d<1536;d+=o)for(const[g,_,m]of[[l,"#dfe6f0",5],[u,"#41505f",5]])g.strokeStyle=_,g.lineWidth=m,g.beginPath(),g.moveTo(d,0),g.lineTo(d+f*1024,1024),g.stroke();const h=f=>Object.assign(new on(f),{colorSpace:Ee,anisotropy:8});return{map:h(a),emissiveMap:h(c)}}const UA=1.9,FA=4;function ba(n,t,e,i,s={}){const{map:r,emissiveMap:o}=IA(Math.max(3,Math.round(n*e/UA)),Math.max(3,Math.round(t*i/FA)),s);return new kt({map:r,emissiveMap:o,emissive:16777215,emissiveIntensity:.15})}function OA(){const e=document.createElement("canvas");e.width=96,e.height=32;const i=e.getContext("2d");i.fillStyle="#f0d49a",i.fillRect(0,0,96,32),i.fillStyle="#4a4030",i.fillRect(0,0,96,3),i.fillRect(0,28,96,4),i.fillStyle="rgba(74,64,48,0.55)";for(let s=6;s<96;s+=12)i.fillRect(s,3,2,25);return i.fillStyle="#8a6c44",i.beginPath(),i.arc(96/2,32/2,7,0,Math.PI*2),i.fill(),Object.assign(new on(e),{colorSpace:Ee,anisotropy:8})}function yi(n,{x:t=0,y:e=0,z:i=0}={}){return n.applyMatrix4(new se().makeTranslation(t,e,i))}function lr(n,t){return new bt(zi(n),t)}function BA(n,t){const e=new Re,i=1/5,s=33*i,r=169*i,o=243*i,a=2.592,l=5.184,c=3.5-a,u=4.4-l,h=new bt(new Pt(38,s,34),ba(38,s,n,t,{lit:.7}));h.position.set(c,s/2,u),e.add(h);const f=r-s,d=new bt(new Pt(15,f,15),ba(15,f,n,t));d.position.set(c,s+f/2,u),e.add(d);const g=new kt({color:4870502}),_=[],m=f+1;for(const[J,at]of[[1,1],[1,-1],[-1,1],[-1,-1]])_.push(yi(new Pt(2.6,m,2.6),{x:c+J*6.3,y:s+m/2,z:u+at*6.3}));const p=6.5,S=8,b=4.25,v=o-r,w=ba(p,v,n,t),E=[-1,1].map(J=>yi(new Pt(p,v,S),{x:c+J*b,y:r+v/2,z:u}));e.add(lr(E,w));const R=2.6,M=.8,A=new le({map:OA()}),N=[-1,1].map(J=>yi(new Pt(p+M,R,S+M),{x:c+J*(b+M/2),y:o-R/2,z:u}));e.add(lr(N,A));for(const J of[-1,1])_.push(yi(new Pt(p-1.5,1.6,S-1.6),{x:c+J*b,y:o+.6,z:u}));_.push(yi(new Pt(15.4,1.6,S+.4),{x:c,y:r+.8,z:u})),e.add(lr(_,g));const L=new kt({color:8029076}),F=[-1,1].map(J=>yi(new hi(.12,.2,6,6),{x:c+J*b,y:o+1.6+3,z:u}));e.add(lr(F,L));const q=new le({color:16722731}),Z=[];for(const J of[-1,1]){Z.push(yi(new Co(.34,6,4),{x:c+J*b,y:o+1.6+6.2,z:u}));for(const at of[-1,1])Z.push(yi(new Co(.3,6,4),{x:c+J*(b+p/2),y:o,z:u+at*(S/2)}))}e.add(lr(Z,q));const G=163*i,B=new bt(new Pt(12,G,10),ba(12,G,n,t));B.position.set(-23.33-a,G/2,-7.78-l),e.add(B);const U=41*i,k=new bt(new hi(7,7,U,16,1,!1,-Math.PI/4,Math.PI),new kt({color:5660528}));return k.position.set(15.55-a,U/2,29.89-l),e.add(k),e}function zA(n){const t=new Re,e=204/5,i=Ju,s=[[.52,0],[.74,.08],[.92,.22],[1,.42],[.97,.6],[.86,.78],[.62,.93],[.3,1]].map(([c,u])=>new gt(c*i,u*e)),{map:r,emissiveMap:o}=NA(n),a=new bt(new Wh(s,28),new kt({map:r,emissiveMap:o,emissive:16777215,emissiveIntensity:.12}));a.scale.z=.68,t.add(a);const l=new bt(new Pt(13,2.4,10),new kt({color:2764602}));return l.position.y=1.2,t.add(l),t}const HA=.02,GA=[[.7,.71],[.98,.71],[.68,.83],[.7,.95],[.98,.95],[.84,.99]];function VA(n,t){const i=Math.round(n*11),s=Math.round(t*11),r=document.createElement("canvas");r.width=i,r.height=s;const o=r.getContext("2d"),a=document.createElement("canvas");a.width=i,a.height=s;const l=a.getContext("2d");l.fillStyle="#000",l.fillRect(0,0,i,s),o.fillStyle="#a09a8c",o.fillRect(0,0,i,s),o.fillStyle="#b0aa9a";for(let u=0;u<i;u+=44)o.fillRect(u,0,1,s);for(let u=0;u<s;u+=44)o.fillRect(0,u,i,1);o.fillStyle="#2d4a3a",o.fillRect(.66*i,.94*s,.34*i,.06*s),o.fillRect(.955*i,.66*s,.045*i,.34*s),o.fillStyle="#1b2540",o.strokeStyle="#69749a",o.lineWidth=1;for(const[u,h,f,d]of[[.69,.735,.1,.045],[.69,.885,.1,.045]])o.fillRect(u*i,h*s,f*i,d*s),o.strokeRect(u*i,h*s,f*i,d*s);const c=u=>Object.assign(new on(u),{colorSpace:Ee,anisotropy:8});return{map:c(r),emissiveMap:c(a)}}function kA(n){const t=bn(n.cell[1]),e=bn(n.cell[0]),i=Mn/2,s=qh/2,r=n.lots.map(d=>{const g=Ps(n.cell,d);return{x0:Math.max(g.x-s,t-i),x1:Math.min(g.x+s,t+i),z0:Math.max(g.z-s,e-i),z1:Math.min(g.z+s,e+i)}}),o={x0:Math.min(...r.map(d=>d.x0)),x1:Math.max(...r.map(d=>d.x1)),z0:Math.min(...r.map(d=>d.z0)),z1:Math.max(...r.map(d=>d.z1))},a=o.x1-o.x0,l=o.z1-o.z0,c=r.map(d=>{const g=new Te(d.x1-d.x0,d.z1-d.z0);g.rotateX(-Math.PI/2),g.translate((d.x0+d.x1)/2,0,(d.z0+d.z1)/2);const _=g.attributes.uv,m=g.attributes.position;for(let p=0;p<_.count;p++)_.setXY(p,(m.getX(p)-o.x0)/a,(m.getZ(p)-o.z0)/l);return g}),{map:u,emissiveMap:h}=VA(a,l),f=new bt(zi(c),new kt({map:u,emissiveMap:h,emissive:16777215,emissiveIntensity:.5,transparent:!0}));return f.position.y=HA,f}function WA(n){const t=bn(n.cell[1]),e=bn(n.cell[0]),i=Mn/2,s=qh/2,r=n.lots.map(h=>Ps(n.cell,h)),o=Math.max(Math.min(...r.map(h=>h.x))-s,t-i),a=Math.min(Math.max(...r.map(h=>h.x))+s,t+i),l=Math.max(Math.min(...r.map(h=>h.z))-s,e-i),c=Math.min(Math.max(...r.map(h=>h.z))+s,e+i),u=GA.map(([h,f])=>yi(new Pt(.5,4.5,.5),{x:o+h*(a-o),y:2.25,z:l+f*(c-l)}));return lr(u,new le({color:rn}))}function XA(){const n=new Re,t=Yu.find(u=>u.id==="tocho"),e=CA/yp,i=t.h/yp,s=BA(e,i);s.scale.set(e,i,e),n.add(kA(t)),n.add(WA(t));const r=ap(t.cell,t.lots);s.position.set(r.x,0,r.z),n.add(s);const o=Yu.find(u=>u.id==="cocoon"),a=o.h/ig,l=zA(a);l.scale.setScalar(a);const c=ap(o.cell,o.lots);return l.position.set(c.x,0,c.z),n.add(l),n}const YA=1577999,qA=7041664,$A=13289402,hl=new kt({color:YA});new kt({color:qA});const sg=new kt({color:$A});new kt({color:Lr});function rg({color:n=di,width:t=1.2}={}){const i=new Re,s=new bt(new hi(.015,.015,t*1.05,6),hl);s.rotation.z=Math.PI/2,s.position.y=.5,i.add(s);const r=3,o=.025,a=(t-o*(r-1))/r,l=new kt({color:n,side:Oe});for(let c=0;c<r;c++){const u=new bt(new Pt(a,.5,.02),l);u.position.set(-t/2+a/2+c*(a+o),.5/2,0),i.add(u)}return i}function og({color:n=Ur}={}){const s=new Re,r=new bt(new Pt(1.1,1.9,.75),sg);r.position.y=1.9/2,s.add(r);const o=new bt(new Pt(1.1*.86,1.9*.68,.02),new le({color:new Ft(n).lerp(new Ft(16777215),.25)}));o.position.set(0,1.9*.56,.75/2+.011),s.add(o);const a=new bt(new Pt(1.1*.94,1.9*.09,.02),new le({color:new Ft(di).lerp(new Ft(16777215),.15)}));a.position.set(0,1.9*.92,.75/2+.011),s.add(a);const l=new bt(new Pt(1.1*.86,1.9*.12,.03),hl);return l.position.set(0,1.9*.16,.75/2+.015),s.add(l),s}function ag(){const i=new Re,s=new bt(new Pt(.8,.6,.3),sg);s.position.y=.6/2,i.add(s);const r=5;for(let a=0;a<r;a++){const l=new bt(new Pt(.7040000000000001,.02,.02),hl);l.position.set(0,.6*.18+a*(.6*.5/r),.3/2+.005),i.add(l)}const o=new bt(new hi(.6*.28,.6*.28,.03,8),hl);return o.rotation.x=Math.PI/2,o.position.set(0,.6*.72,.3/2+.01),i.add(o),i}let Zr=null;function lg(){if(Zr)return Zr;const n=128,t=document.createElement("canvas");t.width=n,t.height=n;const e=t.getContext("2d"),i=n/2,s=e.createRadialGradient(i,i,0,i,i,i);return s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.5,"rgba(255,255,255,0.4)"),s.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=s,e.fillRect(0,0,n,n),Zr=new on(t),Zr.colorSpace=Ee,Zr}function KA({color:n,radius:t=6,intensity:e=1}){const i=new le({map:lg(),color:n,transparent:!0,blending:ja,depthWrite:!1,opacity:e}),s=new bt(new Te(2,2),i);return s.rotation.x=-Math.PI/2,s.scale.set(t,t,1),s}const ju=4,hr=5,ZA=4.4,_n=-1.5,Ep=6,JA=9,Tp=4,wp=6,jA=2,QA=hr+.7,t1=_n-hr/2+.35,e1=QA+jA,cg=.42,Qu=.65,Cc=3,fr=["#FF2D55","#FFB347","#00E5FF","#FF6FA8","#7CE7C4"],Ap=["居酒屋","焼鳥","ラーメン","バー","喫茶","小料理","酒場","おでん","寿司"],ug=4;let Rp=20260731;const Cp=()=>(Rp=(Rp*1664525+1013904223)%4294967296)/4294967296;function wn(n,{x:t=0,y:e=0,z:i=0}={}){return n.applyMatrix4(new se().makeTranslation(t,e,i))}function ms(n,t){return new bt(zi(n),t)}function Ea(n,t){const e=n.attributes.position.count,i=new Float32Array(e*3);for(let s=0;s<e;s++)i.set([t.r,t.g,t.b],s*3);return n.setAttribute("color",new fn(i,3)),n}function Pp(n,t,e,i,s,r,o,a){const l=new Te(t,e);l.translate(i,s,_n+.02),n[r].push(wn(l,{x:o,z:a}));const c=new Pt(t+.1,e+.1,.05);c.translate(i,s,_n-.01),n.dark.push(wn(c,{x:o,z:a}));const u=new Pt(.045,e,.03);u.translate(i,s,_n+.035),n.dark.push(wn(u,{x:o,z:a}));const h=new Pt(t,.045,.03);h.translate(i,s,_n+.035),n.dark.push(wn(h,{x:o,z:a}))}function n1(n,t,e,i,s){const r=Ep+Cp()*(JA-Ep),o=.09+Cp()*.07,a=new Ft(o,o*.95,o*1.15),l=new Pt(ju-.12,r,hr);l.translate(0,r/2,_n-hr/2),i.body.push(Ea(wn(l,{x:t,z:e}),a));const c=new Pt(ju,.18,hr+.7);c.translate(0,r+.09,_n-hr/2+.35),i.dark.push(wn(c,{x:t,z:e}));const u=new Pt(1.7,2.1,.5);u.translate(-.55,1.05,_n-.24),i.warm.push(wn(u,{x:t,z:e}));const h=rg({color:fr[n%fr.length],width:1.6});h.position.set(-.55,1.58,_n+.04),h.updateMatrix();for(const p of h.children){p.updateMatrix();const S=p.geometry.clone().applyMatrix4(p.matrix).applyMatrix4(h.matrix);p.material.side===Oe?i.noren.push(Ea(wn(S,{x:t,z:e}),p.material.color)):i.dark.push(wn(S,{x:t,z:e}))}Pp(i,1.15,.95,1.05,1.35,"warm",t,e),Pp(i,1.3,.9,-.4,r-1.5,n%3===1?"dark":"warm",t,e);const f=new Ft(n%3===0?Us:di).lerp(new Ft(16777215),.25).multiplyScalar(1.35),d=new Te(cg,Qu);d.translate(-1.65,1.85+Qu/2,_n+.42),i.lantern.push(Ea(wn(d,{x:t,z:e}),f));const g=new Ft(fr[n%fr.length]).lerp(new Ft(rn),.4).multiplyScalar(.95),_=new Te(Cc*2,Cc*2);_.rotateX(-Math.PI/2),_.translate(-.55,.05,_n+Cc*.45),i.pool.push(Ea(wn(_,{x:t,z:e}),g));const m=ag();m.position.set(1.35,r-2.4,_n+.02),m.updateMatrix();for(const p of m.children){p.updateMatrix();const S=p.geometry.clone().applyMatrix4(p.matrix).applyMatrix4(m.matrix);(p.material===s?i.plastic:i.dark).push(wn(S,{x:t,z:e}))}return r}function i1(){const n=[];for(let t=0;t<ug;t++){const e=Fi({text:Ap[t%Ap.length],style:t%2?"neon":"lightbox",orientation:"vertical",color:fr[(t+2)%fr.length],px:256}),i=new le({map:e.map,side:Oe});i.color.setScalar(1),n.push({mat:i,aspect:e.aspect})}return n}function s1(){const t=Math.round(160*(cg/Qu)),e=document.createElement("canvas");e.width=t,e.height=160;const i=e.getContext("2d"),s=[[.22,0],[.75,.08],[1,.3],[1.05,.55],[.95,.78],[.6,.94],[.22,1]],r=160*.08,o=r,a=160-r*2,l=t/2,c=t/2-1,u=(d,g)=>[l+d*c,o+g*a],h=()=>{i.beginPath(),s.forEach(([d,g],_)=>{const[m,p]=u(d,g);_===0?i.moveTo(m,p):i.lineTo(m,p)});for(let d=s.length-2;d>=0;d--){const[g,_]=u(-s[d][0],s[d][1]);i.lineTo(g,_)}i.closePath()};i.save(),h(),i.clip();const f=i.createLinearGradient(0,o,0,o+a);f.addColorStop(0,"#8a8a8a"),f.addColorStop(.45,"#ffffff"),f.addColorStop(1,"#8a8a8a"),i.fillStyle=f,i.fillRect(0,0,t,160),i.strokeStyle="rgba(15,10,8,0.55)",i.lineWidth=160*.02;for(const[,d]of s.slice(1,-1)){const g=o+d*a;i.beginPath(),i.moveTo(0,g),i.lineTo(t,g),i.stroke()}return i.restore(),i.fillStyle="#14100c",i.fillRect(l-t*.11,0,t*.22,r),i.fillRect(l-t*.14,160-r,t*.28,r),Object.assign(new on(e),{colorSpace:Ee})}function r1(){const n={dark:[],warm:[],plastic:[],body:[],lantern:[],noren:[],pool:[]},e=ag().children[0].material,i=i1(),s=3.2,r=new Te(s*i[0].aspect,s),o=i.map(()=>[]);let a=0;for(let d=0;d<Tp;d++){const g=(d-(Tp-1)/2)*e1-t1;for(let _=0;_<wp;_++,a++){const m=(_-(wp-1)/2)*ZA,p=n1(a,m,g,n,e);o[a%ug].push({x:m,z:g,height:p})}}const l=new Re;l.add(ms(n.dark,new kt({color:2303794}))),l.add(ms(n.warm,new kt({color:2760460,emissive:rn,emissiveIntensity:1.15}))),l.add(ms(n.plastic,new kt({color:13289402}))),l.add(ms(n.body,new kt({vertexColors:!0}))),l.add(ms(n.lantern,new le({map:s1(),vertexColors:!0,side:Oe,alphaTest:.5}))),l.add(ms(n.noren,new kt({vertexColors:!0,side:Oe}))),l.add(ms(n.pool,new le({map:lg(),vertexColors:!0,transparent:!0,blending:ja,depthWrite:!1})));const c=[],u=new Ie;i.forEach(({mat:d},g)=>{const _=o[g],m=new S0(r,d,_.length);_.forEach((p,S)=>{u.position.set(p.x+ju/2-.3,p.height-1.05,p.z+_n+.6),u.rotation.set(0,-Math.PI/2,0),u.updateMatrix(),m.setMatrixAt(S,u.matrix)}),m.instanceMatrix.needsUpdate=!0,l.add(m),c.push(d)});const[h,f]=ll;return l.position.set(bn(f),0,bn(h)),{group:l,signMats:c}}const sr=7,rr=5.5,gn=0,bi=3.9,cr=.9,th=.2,Lp=bi+cr+th,Dp=-1.4,Ip=1.5,o1=-2.9,a1=1053465,l1=2369326,c1=9075292,Ta=14676735,u1="#00E5FF",h1=new kt({color:a1}),f1=new kt({color:c1}),d1=new kt({color:di,side:Oe});function eh(n,t,e){return new bt(new Te(n,t),e)}function dr(n,{x:t=0,y:e=0,z:i=0,ry:s=0,rz:r=0}={}){const o=new se().compose(new I(t,e,i),new Vn().setFromEuler(new kn(0,s,r)),new I(1,1,1));return n.applyMatrix4(o)}function Pc(n,t){return new bt(zi(n),t)}function p1(n,t,e,i,s,r){const o=eh(t,e,i);o.position.set(s,r,gn+.02),n.push(dr(new Pt(t+.08,e+.08,.05),{x:s,y:r,z:gn-.02}));for(const a of[-t/6,t/6])n.push(dr(new Pt(.05,e,.03),{x:s+a,y:r,z:gn+.04}));return o}function m1(){const n=new Re,t=[],e=[],i=new bt(new Pt(sr,bi,rr),new kt({color:l1}));i.position.set(0,bi/2,gn-rr/2),n.add(i),e.push(dr(new Pt(sr,cr,.45),{x:0,y:bi+cr/2,z:gn-.05}));const s=new Ft(Ta).lerp(new Ft(16777215),.35),r=new le({color:s.clone()}),o=new bt(new Pt(sr*.92,.06,.05),r);o.position.set(0,bi+.06,gn+.18),n.add(o),t.push(dr(new Pt(sr+.3,th,rr+.3),{x:0,y:bi+cr+th/2,z:gn-rr/2+.15}));const a=new kt({color:Ta,emissive:Ta,emissiveIntensity:1.05,transparent:!0,opacity:.42,side:Oe}),l=4,c=bi-.25,u=p1(t,l,c,a,1.4,c/2+.1);n.add(u);const h=.3,f=.015,g=[[-.1,.6,1.6],[.9,.7,1.9],[1.9,.6,1.3],[2.9,.7,1.8]].map(([Yt,tt,mt])=>dr(new Pt(tt,mt,h),{x:Yt,y:mt/2,z:f-h/2}));n.add(Pc(g,f1));const _=new kt({color:1317154,emissive:Ta,emissiveIntensity:1}),m=new bt(new Pt(Ip,2.3,.5),_);m.position.set(Dp,1.15,gn-.25),n.add(m);const p=rg({color:di,width:Ip*.92});p.position.set(Dp,1.8,gn+.05),p.updateMatrix();for(const Yt of p.children){Yt.updateMatrix();const tt=Yt.geometry.clone().applyMatrix4(Yt.matrix).applyMatrix4(p.matrix);Yt.material.side===Oe?e.push(tt):t.push(tt)}const S=og({color:Ur}),b=o1,v=0,w=gn+.35,[E,R,M,A]=S.children,N=new bt(E.geometry,E.material);N.position.set(b+E.position.x,v+E.position.y,w+E.position.z),n.add(N),t.push(dr(A.geometry.clone(),{x:b+A.position.x,y:v+A.position.y,z:w+A.position.z}));const L=new bt(R.geometry,R.material);L.position.set(b+R.position.x,v+R.position.y,w+R.position.z),n.add(L);const F=new bt(M.geometry,M.material);F.position.set(b+M.position.x,v+M.position.y,w+M.position.z),n.add(F);const q=[R.material,M.material],Z=q.map(Yt=>Yt.color.clone());n.add(Pc(t,h1)),n.add(Pc(e,d1));const G=Fi({text:"Profile",style:"lightbox",orientation:"horizontal",color:u1,px:256}),B=new le({map:G.map});B.color.setScalar(.57);const U=cr*.72,k=eh(U*G.aspect,U,B);k.position.set(0,bi+cr/2,gn+.2),n.add(k);const J=Fi({text:"コンビニ",style:"neon",orientation:"vertical",color:"#FFB347",px:256}),at=new le({map:J.map,side:Oe});at.color.setScalar(.57);const _t=1.5,Mt=eh(_t*J.aspect,_t,at);Mt.position.set(sr/2-.25,bi-.95,gn+.6),Mt.rotation.y=-Math.PI/2,n.add(Mt);const ie=new bt(new Pt(sr+1.2,Lp+1.2,rr+1.6),new le({transparent:!0,opacity:0,depthWrite:!1}));ie.position.set(0,(Lp+1.2)/2,gn-rr/2+.5),n.add(ie);function ve(Yt){a.emissiveIntensity=Yt?1.65:1.05,r.color.copy(s).lerp(new Ft(16777215),Yt?.35:0),B.color.setScalar(Yt?1:.57),at.color.setScalar(Yt?1:.57),_.emissiveIntensity=Yt?1.5:1,q.forEach((tt,mt)=>{tt.color.copy(Z[mt]).lerp(new Ft(16777215),Yt?.35:0)})}return{group:n,hit:ie,setHover:ve}}const nh=n=>"#"+n.toString(16).padStart(6,"0");function ws(n,{x:t=0,y:e=0,z:i=0,ry:s=0,rz:r=0}={}){const o=new se().compose(new I(t,e,i),new Vn().setFromEuler(new kn(0,s,r)),new I(1,1,1));return n.applyMatrix4(o)}function go(n,t){return new bt(zi(n),t)}const Np=[Ur,di,Us],Up=1.1,Lc=1.9,wa=.75,Fp=.08;function g1(){const n=new Re,t=new bt(new hi(.24,.27,.6,10),new kt({color:2895670}));t.position.y=.3,n.add(t);const e=new bt(new hi(.26,.26,.05,10),new le({color:new Ft(Ur).lerp(new Ft(16777215),.1)}));return e.position.y=.62,n.add(e),n}function _1(){const n=new bt(new Gh(1,16),new le({color:new Ft(1778488).lerp(new Ft(rn),.3)}));return n.scale.set(1.4,1,1),n.rotation.x=-Math.PI/2,n.position.y=.015,n}function x1(){const n=new Re,t=Np.length,e=t*Up+(t-1)*Fp,i=.1,s=new bt(new Pt(e+.3,i,wa+.3),new kt({color:Lr}));s.position.set(0,i/2,0),n.add(s);const r=[],o=[];let a,l,c;const u=[],h=[];Np.forEach((w,E)=>{const R=og({color:w}),M=(E-(t-1)/2)*(Up+Fp),A=i,N=0,[L,F,q,Z]=R.children;r.push(ws(L.geometry.clone(),{x:M+L.position.x,y:A+L.position.y,z:N+L.position.z})),a??(a=L.material),o.push(ws(Z.geometry.clone(),{x:M+Z.position.x,y:A+Z.position.y,z:N+Z.position.z})),l??(l=Z.material),u.push(ws(q.geometry.clone(),{x:M+q.position.x,y:A+q.position.y,z:N+q.position.z})),c??(c=q.material);const G=F.material,B=new bt(F.geometry,G);B.position.set(M+F.position.x,A+F.position.y,N+F.position.z),n.add(B),h.push(G)});const f=h.map(w=>w.color.clone());n.add(go(r,a)),n.add(go(o,l)),n.add(go(u,c)),h.push(c),f.push(c.color.clone());const d=Fi({text:"Résumé",sub:"PDF",style:"lightbox",orientation:"horizontal",color:nh(rn),px:256}),g=new le({map:d.map});g.color.setScalar(.5);const _=1,m=new bt(new Te(_,_/d.aspect),g);m.position.set(0,i+Lc+.2,wa/2-.02),n.add(m);const p=g1();p.position.set(e/2+.55,0,.1),n.add(p);const S=_1();S.position.set(0,0,wa/2+.9),n.add(S);const b=new bt(new Pt(e+1.6,i+Lc+.7,wa+1.4),new le({transparent:!0,opacity:0,depthWrite:!1}));b.position.set(.3,(i+Lc+.7)/2,.1),n.add(b);function v(w){h.forEach((E,R)=>{E.color.copy(f[R]).lerp(new Ft(16777215),w?.45:0)}),g.color.setScalar(w?1:.5)}return{group:n,hit:b,setHover:v}}const Jr=4,io=4,Zi=5.5,Si=io/2;function Op(n,t,e,i,s,r,o){const a=new bt(new Te(t,e),i);return a.position.set(s,r,o),n.push(ws(new Pt(t+.08,e+.08,.04),{x:s,y:r,z:o-.025})),a}function v1(){const n=new Re,t=new bt(new Pt(Jr,Zi,io),new kt({color:Lr}));t.position.y=Zi/2,n.add(t);const e=new kt({color:1316639}),i=[];i.push(ws(new Pt(Jr+.3,.2,io+.3),{x:0,y:Zi+.1,z:0})),i.push(ws(new Pt(Jr+.06,.12,io+.06),{x:0,y:Zi/2,z:0}));const s=1.3,r=2.3,o=new kt({color:1708550,emissive:rn,emissiveIntensity:.55}),a=new bt(new Pt(s,r,.4),o);a.position.set(0,r/2,Si-.18),n.add(a);const l=new kt({color:1840136,emissive:rn,emissiveIntensity:.8});n.add(Op(i,1.1,1,l,1.1,1.1,Si+.02));const c=new bt(new Pt(.9,.12,.3),new kt({color:2760725}));c.position.set(1.1,.75,Si-.32),n.add(c),n.add(Op(i,.9,.8,new kt({color:856087}),-.6,Zi-1.3,Si+.02));const u=new kt({color:2829099}),h=new bt(new hi(.03,.03,.32,6),u);h.rotation.z=Math.PI/2,h.position.set(0,r+.55,Si+.1),n.add(h);const f=new Ft(di).lerp(new Ft(16777215),.4),d=new le({color:f.clone()}),g=new bt(new Co(.22,12,10),d);g.position.set(0,r+.55,Si+.28),n.add(g);const _=Fi({text:"交番",style:"lightbox",orientation:"vertical",color:nh(di),px:256}),m=new le({map:_.map,side:Oe});m.color.setScalar(.61);const p=1.4,S=new bt(new Te(p*_.aspect,p),m);S.position.set(Jr/2-.2,Zi-1,Si+.5),S.rotation.y=-Math.PI/2,n.add(S);const b=Fi({text:"Contact",style:"lightbox",orientation:"horizontal",color:nh(rn),px:256}),v=new le({map:b.map});v.color.setScalar(.62);const w=.7,E=new bt(new Te(w,w/b.aspect),v);E.position.set(-1.1,1.75,Si+.02),n.add(E);const R=new bt(new Pt(.7,.55,.04),new kt({color:3877404}));R.position.set(-1.1,.85,Si+.04),n.add(R);const M=new kt({color:15920608}),A=[[-.12,.09,.12],[.1,-.03,-.1],[-.02,-.13,.05]].map(([F,q,Z])=>ws(new Te(.2,.26),{x:R.position.x+F,y:R.position.y+q,z:R.position.z+.03,rz:Z}));n.add(go(A,M)),n.add(go(i,e));const N=new bt(new Pt(Jr+1.2,Zi+1.2,io+1.4),new le({transparent:!0,opacity:0,depthWrite:!1}));N.position.set(0,(Zi+1.2)/2,.2),n.add(N);function L(F){o.emissiveIntensity=F?1:.55,l.emissiveIntensity=F?1.3:.8,d.color.copy(f).lerp(new Ft(16777215),F?.3:0),m.color.setScalar(F?1:.61),v.color.setScalar(F?1:.62)}return{group:n,hit:N,setHover:L}}const hg=n=>"#"+n.toString(16).padStart(6,"0");function Bp(n){let t=0;for(let e=0;e<n.length;e++)t=t*31+n.charCodeAt(e)>>>0;return t||1}const zp=[16723285,16757575,58879,16740264,8185796],Hp={live:{sign:"neon",bright:1,halo:1},WIP:{sign:"lightbox",bright:.55,halo:.5},"coming-soon":{sign:"painted",bright:.25,halo:.12}},Aa=14,M1=8.5,Dc=8.5;function S1(n){if(n.length<=12)return{text:n,sub:""};const t=n.length/2;let e=-1,i=1/0;for(let s=0;s<n.length;s++){if(n[s]!==" ")continue;const r=Math.abs(s-t);r<i&&(i=r,e=s)}return e<0?{text:n,sub:""}:{text:n.slice(0,e),sub:n.slice(e+1)}}function y1(n,t,e){let i=n;const s=()=>(i=(i*1664525+1013904223)%4294967296)/4294967296,r=4,o=7,a=30,l=34,c=r*a,u=o*l,h=()=>{const S=document.createElement("canvas");return S.width=c,S.height=u,[S,S.getContext("2d")]},[f,d]=h(),[g,_]=h();d.fillStyle="#a9b1bd",d.fillRect(0,0,c,u),_.fillStyle="#000",_.fillRect(0,0,c,u);const m=[rn,Us,Ur,t];for(let S=0;S<r;S++){const b=S*a;if(S%4===0){d.fillStyle="#4d5566",d.fillRect(b,0,a,u);continue}for(let v=0;v<o;v++){const w=v*l;if(s()>.6*e){d.fillStyle="rgba(0,0,0,0.22)",d.fillRect(b+3,w+2,a-6,l-5);continue}const E=hg(m[Math.floor(s()*m.length)]);d.fillStyle=E,d.fillRect(b+3,w+2,a-6,l-5),_.fillStyle=E,_.fillRect(b+3,w+2,a-6,l-5)}}d.fillStyle="rgba(0,0,0,0.4)";for(let S=0;S<o;S++)d.fillRect(0,S*l,c,2);const p=S=>Object.assign(new on(S),{colorSpace:Ee,anisotropy:8});return{map:p(f),emissiveMap:p(g)}}function b1(n,t){const e=new Re,{x:i,z:s}=Ps(t.cell,t.lot);e.position.set(i,0,s);const r=t.h,o=zp[Bp(n.id)%zp.length],a=hg(o),l=Hp[n.status]??Hp.live,{map:c,emissiveMap:u}=y1(Bp(n.id),o,l.bright),h=.35*l.bright,f=new kt({map:c,emissiveMap:u,emissive:16777215,emissiveIntensity:h}),d=new bt(new Pt(M1,r,Dc),f);d.position.y=r/2,e.add(d);const{text:g,sub:_}=S1(n.title),m=Fi({text:g,sub:_,style:l.sign,orientation:"horizontal",color:a,px:320}),p=new le({map:m.map}),S=Aa/m.aspect,b=new bt(new Te(Aa,S),p);b.position.set(0,r+.4+S/2,Dc/2+.06),e.add(b);const v=.5*l.halo,w=KA({color:a,radius:Aa*.65,intensity:v});w.position.y=.03,e.add(w);const E=r+S+2,R=new bt(new Pt(Aa+1,E,Dc+1),new le({transparent:!0,opacity:0,depthWrite:!1}));R.position.y=E/2,e.add(R);function M(A){p.color.setScalar(A?1.6:1),w.material.opacity=A?v*1.7:v,f.emissiveIntensity=A?h*1.4:h}return{group:e,hit:R,setHover:M,project:n}}function E1(n){let t=n;return()=>(t=(t*1664525+1013904223)%4294967296)/4294967296}const T1=20,Gp=11,ih=un+16,w1=-105,A1=-4.8,Ra=3.2,Ca=1.5,Ic=1.3,R1=.15,C1=4,Vp=3,P1=8,Nc=9,L1=.15;function D1(){const n=document.createElement("canvas");n.width=64,n.height=64;const t=n.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,0.6)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new on(n)}function I1(n,t){const e=Math.min(3,n.length);if(e===0)return{update(){},reset(){}};const i=Math.max(1,Math.floor(n.length/e)),s=[];for(let c=0;c<e;c++)s.push(n[c*i%n.length]);const r=s.map(c=>c.color.clone()),o=s.map(()=>t()*100);function a(c){for(let u=0;u<s.length;u++){const d=Math.sin(c*.6+o[u])+Math.sin(c*1.37+o[u]*2.3)*.6<-1.05?Math.sin(c*47+o[u])>0?1:L1:1;s[u].color.copy(r[u]).multiplyScalar(d)}}function l(){for(let c=0;c<s.length;c++)s[c].color.copy(r[c])}return{update:a,reset:l}}function N1(n){const t=new Re,e=new kt({color:1777190}),i=new kt({color:1708550,emissive:rn,emissiveIntensity:.7}),s=new le({color:new Ft(di).lerp(new Ft(16777215),.3)});for(let o=0;o<C1;o++){const a=-6.625+Ra/2+o*(Ra+R1),l=new bt(new Pt(Ra,Ca,Ic),e);l.position.set(a,0,0),t.add(l);const c=new bt(new Te(Ra*.82,Ca*.4),i);c.position.set(a,.1,Ic/2+.01),t.add(c)}const r=new bt(new Pt(.12,.12,Ic*.5),s);return r.position.set(-13.25/2-.02,-Ca*.25,0),t.add(r),t.rotation.y=Math.PI/2,t.position.set(A1,n+.14+Ca/2,ih),t}function U1(n,t){const e=t%T1;if(e>=Gp){n.visible=!1;return}n.visible=!0,n.position.z=ih+(w1-ih)*(e/Gp)}function F1(n){const t=D1(),e=new Ft(Us).lerp(new Ft(9476523),.75),i=bn(ll[1]),s=bn(ll[0]),r=new Re,o=[],a=[],l=[];for(let u=0;u<Vp;u++){const h=new x0({map:t,color:e,transparent:!0,opacity:0,depthWrite:!1}),f=new uM(h),d=1.6+n()*.8;f.scale.set(d,d,1),a.push({x:i+(n()-.5)*30,y:9+n()*1.5,z:s+(n()-.5)*30}),l.push(n()*Nc),o.push(f),r.add(f)}function c(u){for(let h=0;h<Vp;h++){const f=(u+l[h])%Nc/Nc,d=a[h];o[h].position.set(d.x,d.y+f*P1,d.z);const g=f<.2?f/.2:f>.75?(1-f)/.25:1;o[h].material.opacity=.3*g}}return{group:r,update:c}}function O1({reduceMotion:n=!1,flickerMaterials:t=[],trackY:e}={}){if(typeof e!="number")throw new Error("createAmbient needs trackY (pass station.trackY) — the train rides the station deck");const i=new Re,s=E1(31337);function r(u){u.reset(),i.traverse(h=>{var f;(f=h.geometry)==null||f.dispose();for(const d of[h.material].flat().filter(Boolean)){for(const g of Object.values(d))g!=null&&g.isTexture&&g.dispose();d.dispose()}})}if(n){const u={update(){},reset(){}};return{group:i,update(){},dispose:()=>r(u)}}const o=N1(e);i.add(o);const a=F1(s);i.add(a.group);const l=I1(t,s);function c(u,h){U1(o,h),a.update(h),l.update(h)}return{group:i,update:c,dispose:()=>r(l)}}const jr=12.5,Jn=7,or=1536,Lo=768,Ji=48,Uc=76,fg=130,Dr=68,Pa="'DM Mono', ui-monospace, monospace";function B1(n){const t=document.createElement("canvas");t.width=or,t.height=Lo;const e=t.getContext("2d");e.fillStyle="#04050a",e.fillRect(0,0,or,Lo),e.textBaseline="middle",((r,o)=>{r.fillStyle="#ffcf8a",r.font=`500 36px ${Pa}`,r.fillText("行先  DESTINATION",Ji,Uc),r.textAlign="right",r.fillText("YEAR   STATUS",or-Ji,Uc),r.textAlign="left",r.fillStyle="#8a6a34",r.fillRect(Ji,Uc+32,or-Ji*2,3)})(e);const s=r=>"#"+r.toString(16).padStart(6,"0");return n.forEach((r,o)=>{const a=fg+o*Dr+Dr/2,l=r.status==="live",c=l?s(Us):"#9a8663",u=l?s(Ur):"#7d7361";e.font=`500 38px ${Pa}`,e.fillStyle=s(rn),e.fillText(String(o+1).padStart(2,"0"),Ji,a),e.font=`500 44px ${Pa}`,e.fillStyle=c,e.fillText(r.title,Ji+110,a),e.textAlign="right",e.font=`400 32px ${Pa}`,e.fillStyle="#8e8a7e",e.fillText(r.year??"",or-Ji-230,a),e.fillStyle=u,e.fillText(l?"ON TIME":"DELAYED",or-Ji,a),e.textAlign="left"}),Object.assign(new on(t),{colorSpace:Ee,anisotropy:8})}function z1(n){const t=fg+n*Dr+Dr/2;return Jn/2-t/Lo*Jn}function H1(n){const t=new Re,e=2.6,i=B1(n),s=new le({map:i});s.color.setScalar(.8);const r=new bt(new Te(jr,Jn),s);r.position.set(0,e+Jn/2,.07),t.add(r);const o=new kt({color:1316639}),a=new bt(new Pt(jr+.5,Jn+.5,.3),o);a.position.set(0,e+Jn/2,-.08),t.add(a);const l=new bt(new Pt(jr+.7,.16,.8),o);l.position.set(0,e+Jn+.32,.22),t.add(l);const c=new bt(new Te(jr-.4,Dr/Lo*Jn),new le({color:Us,transparent:!0,opacity:.16}));c.visible=!1,c.position.z=.1,t.add(c);const u=new le({transparent:!0,opacity:0,depthWrite:!1}),h=n.map((f,d)=>{const g=e+Jn/2+z1(d),_=new bt(new Pt(jr-.4,Dr/Lo*Jn,.5),u);return _.position.set(0,g,.2),t.add(_),{hit:_,project:f,setHover(m){c.visible=m,m&&(c.position.y=g),s.color.setScalar(m?1:.8)}}});return{group:t,rows:h}}const G1="#141a24",V1=27;function k1(n){return[n.material].flat().some(t=>t==null?void 0:t.transparent)}function W1(n,t,e){const i=new T0(n.geometry,t),s=new se,r=new se;for(let o=0;o<n.count;o++)n.getMatrixAt(o,s),r.multiplyMatrices(n.matrixWorld,s),e.push(i.clone().applyMatrix4(r))}function X1(n,{skip:t=[],color:e=G1,thresholdAngle:i=V1}={}){n.updateMatrixWorld(!0);const s=[];function r(c){if(!(t.includes(c)||!c.visible)){c.isInstancedMesh?W1(c,i,s):c.isMesh&&!k1(c)&&s.push(new T0(c.geometry,i).applyMatrix4(c.matrixWorld));for(const u of c.children)r(u)}}r(n);const o=zi(s),a=new y0({color:e,transparent:!0}),l=new _M(o,a);return l.raycast=()=>{},l}const Y1={class:"min-h-screen bg-[#070A12] text-[#E8E3D8] font-body px-5 py-10 sm:px-10 sm:py-16"},q1={class:"max-w-2xl mx-auto"},$1={class:"flex flex-col gap-4"},K1=["href"],Z1={class:"font-display text-lg text-[#E8E3D8] group-hover:text-[#FFB347] group-hover:underline underline-offset-4"},J1={class:"mt-1 text-sm text-[#E8E3D8]/70"},j1={class:"mt-1 text-sm text-[#E8E3D8]/45"},Q1={class:"mt-2 font-mono text-xs text-[#E8E3D8]/45"},tR={key:1,class:"opacity-70"},eR={class:"font-display text-lg text-[#E8E3D8]"},nR={class:"mt-1 text-sm text-[#E8E3D8]/70"},iR={class:"mt-1 text-sm text-[#E8E3D8]/45"},sR={class:"mt-2 font-mono text-xs text-[#E8E3D8]/45"},kp={__name:"ProjectList",props:{projects:{type:Array,required:!0}},setup(n){function t(e){return e==="live"?"live":e==="WIP"?"in progress":e==="coming-soon"?"planned":e}return(e,i)=>(Nn(),Ai("div",Y1,[Ye("div",q1,[i[2]||(i[2]=ax('<header class="mb-10"><h1 class="font-display text-3xl sm:text-4xl text-[#FFB347]">Paulo Gonzales</h1><p class="mt-3 text-[#E8E3D8]/90"> Project catalog — software built by Paulo Gonzales, software engineer. </p><p class="mt-5 flex flex-wrap gap-x-6 gap-y-2"><a href="./projects/profile/" class="text-[#FFB347] underline decoration-[#FFB347]/40 underline-offset-4 hover:decoration-[#FFB347] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]">Profile</a><a href="./assets/Paulo_Gonzales_Resume_SoftwareEngineer.pdf" download="Paulo_Gonzales_Resume_SoftwareEngineer.pdf" class="text-[#FFB347] underline decoration-[#FFB347]/40 underline-offset-4 hover:decoration-[#FFB347] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]">Resume (PDF)</a></p></header>',1)),Ye("section",null,[i[1]||(i[1]=Ye("h2",{class:"font-display text-xl text-[#FFB347] mb-4"},"Projects",-1)),Ye("ul",$1,[(Nn(!0),Ai(Qn,null,L_(n.projects,s=>(Nn(),Ai("li",{key:s.id,class:"border border-[#E8E3D8]/15 rounded-md p-4"},[s.status!=="coming-soon"?(Nn(),Ai("a",{key:0,href:s.url,class:"block group rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]"},[Ye("h3",Z1,Qe(s.title),1),Ye("p",J1,Qe(s.tagline),1),Ye("p",j1,Qe(s.description),1),Ye("p",Q1,Qe(s.category)+" · "+Qe(s.year)+" · "+Qe(s.tools.join(", "))+" · "+Qe(t(s.status)),1)],8,K1)):(Nn(),Ai("div",tR,[Ye("h3",eR,[Km(Qe(s.title)+" ",1),i[0]||(i[0]=Ye("span",{class:"ml-2 align-middle text-[0.65rem] uppercase tracking-wide text-[#FF2D55]"},"Planned",-1))]),Ye("p",nR,Qe(s.tagline),1),Ye("p",iR,Qe(s.description),1),Ye("p",sR,Qe(s.category)+" · "+Qe(s.year)+" · "+Qe(s.tools.join(", "))+" · "+Qe(t(s.status)),1)]))]))),128))])])])]))}},rR={class:"relative h-full w-full bg-[#a9c8ec]"},oR={key:1,class:"h-full w-full overflow-y-auto"},aR={key:2,class:"pointer-events-none absolute inset-x-0 bottom-7 flex justify-center","aria-hidden":"true","data-hint":""},lR={__name:"ShinjukuScene",props:{projects:{type:Array,required:!0}},emits:["select","hover"],setup(n,{emit:t}){const e=n,i=t,s=La(null),r=La(!1),o=La(!0);let a=null,l=null,c=null;return Tm(()=>{try{l=Fw(s.value)}catch(S){console.error("WebGL unavailable, falling back to the project list.",S),r.value=!0;return}Ow(l.scene),l.scene.add($w()),l.scene.add(rA()),l.scene.add(XA());const u=r1();l.scene.add(u.group);const h={konbini:m1,koban:v1,vending:x1};for(const S of Z0){const b=h[S.id];if(!b){console.warn(`cityLayout SCENERY_SITES references unknown scenery id "${S.id}"`);continue}const{x:v,z:w}=Ps(S.cell,S.lot),{group:E}=b();E.position.set(v,0,w),E.rotation.y=S.ry??0,l.scene.add(E)}const f=RA();l.scene.add(f.group);const d=(S,b)=>l.addPickable(S,b),g=new Map(e.projects.map(S=>[S.id,S]));for(const S of K0){const b=g.get(S.id);if(!b){console.warn(`cityLayout PROJECT_SITES references unknown project id "${S.id}"`);continue}const v=b1(b,S);l.scene.add(v.group),d(v.hit,{kind:"project",project:b,hover:v.setHover})}const _=H1(e.projects);f.boardAnchor.add(_.group);for(const S of _.rows)d(S.hit,{kind:"project",project:S.project,hover:S.setHover});c=O1({reduceMotion:l.reduceMotion,trackY:f.trackY}),l.scene.add(c.group),l.onFrame((S,b)=>c.update(S,b)),l.scene.add(X1(l.scene,{skip:[c.group]}));let m=null;l.onHover(S=>{var b,v;S!==m&&((b=m==null?void 0:m.hover)==null||b.call(m,!1),(v=S==null?void 0:S.hover)==null||v.call(S,!0),m=S,i("hover",(S==null?void 0:S.project)??null))}),l.onSelect(S=>i("select",S));const p=()=>{o.value=!1};s.value.addEventListener("pointerdown",p,{once:!0}),a=setTimeout(p,9e3),l.start()}),wm(()=>{clearTimeout(a),c==null||c.dispose(),l==null||l.dispose()}),(u,h)=>(Nn(),Ai("div",rR,[r.value?(Nn(),Ai("div",oR,[Cn(kp,{projects:n.projects},null,8,["projects"])])):(Nn(),Ai("canvas",{key:0,ref_key:"canvasEl",ref:s,"data-scene":"",class:"block h-full w-full cursor-grab touch-none","aria-label":"Interactive 3D map of Shinjuku. Shinjuku Station sits at the centre; each lit building is one project."},[Cn(kp,{projects:n.projects},null,8,["projects"])],512)),!r.value&&o.value?(Nn(),Ai("div",aR,[...h[0]||(h[0]=[Ye("span",{class:"motion-safe:animate-pulse rounded-full border border-[#FFB347]/25 bg-black/45 px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#FFB347]/75"}," drag to pan · scroll to zoom · lit buildings are projects ",-1)])])):lx("",!0)]))}},cR={__name:"App",setup(n){const t=La([{id:"algo-lab",indexNumber:9,title:"Algorithm Lab",tagline:"things in motion, on a canvas",description:"Flocking boids, n-body gravity, the three-body problem, and other simulations rendered with vanilla canvas.",category:"simulations",year:"2026",tools:["canvas","vanilla js"],status:"live",url:"./projects/algo-lab/dist/index.html",github:""},{id:"flip7",indexNumber:8,title:"Flip 7",tagline:"a card game of risky math",description:"A multiplayer port of the press-your-luck card game. Draw cards, dodge duplicates, race to the target score.",category:"games",year:"2026",tools:["vue","vite","tailwind"],status:"live",url:"./projects/ported-games/flip7/dist/index.html",github:""},{id:"machi-koro",indexNumber:7,title:"Machi Koro",tagline:"build a city by rolling dice",description:"A web port of the dice-driven city-building board game. Roll, collect, buy, and outbuild your opponent.",category:"games",year:"2025",tools:["vue","vite","tailwind"],status:"live",url:"./projects/ported-games/machi-koro/dist/index.html",github:""},{id:"venue-search",indexNumber:6,title:"Venue Search",tagline:"rentable rooms in tokyo",description:"A better search for event spaces in Tokyo.",category:"maps",year:"2025",tools:["vue","leaflet"],status:"WIP",url:"./projects/venue-search/dist/index.html",github:""},{id:"reading-buddy",indexNumber:5,title:"Reading Buddy",tagline:"a companion for the long book",description:"Track your reading with progressive character reveals and chapter-by-chapter companion guides.",category:"reading",year:"2025",tools:["vue","vite"],status:"live",url:"./projects/reading-buddy/dist/index.html",github:""},{id:"japan-map",indexNumber:4,title:"Japan History Map",tagline:"centuries on a single canvas",description:"Significant events in Japanese history and the Tokyo train system, laid out on an interactive Leaflet map.",category:"maps",year:"2025",tools:["leaflet","vue"],status:"live",url:"./projects/japan-map/dist/index.html",github:""},{id:"right-word-japanese",indexNumber:3,title:"The Right Word",tagline:"a phrasebook for awkward moments",description:"Quick help when speaking Japanese — find the right word for the situation. Includes keigo for the careful moments.",category:"language",year:"2025",tools:["vue","vite"],status:"WIP",url:"./projects/right-word/dist/index.html",github:""},{id:"japanese-dashboard",indexNumber:2,title:"Japanese Learning",tagline:"a dashboard of small tools",description:"A collection of small, useful utilities for Japanese learning, all in one place.",category:"language",year:"2025",tools:["vue","vite"],status:"live",url:"./projects/japandash/dist/index.html",github:""},{id:"bible-hymn-kids",indexNumber:1,title:"Bible Hymn Learning",tagline:"hymns and scripture for young learners",description:"Interactive hymn and scripture learning experience designed for kids.",category:"reading",year:"2024",tools:["html","css","js"],status:"WIP",url:"./projects/bible-hymn/hymn-app.html",github:""}]);function e(i){if(!i)return;if(i.kind==="link"){if(i.download){const r=document.createElement("a");r.href=i.url,r.download=i.download,document.body.appendChild(r),r.click(),r.remove()}else window.open(i.url,"_blank","noopener");return}const s=i.project;!s||s.status==="coming-soon"||!s.url||window.open(s.url,"_blank","noopener")}return(i,s)=>(Nn(),Ym(lR,{projects:t.value,onSelect:e},null,8,["projects"]))}};Wx(cR).mount("#app");
