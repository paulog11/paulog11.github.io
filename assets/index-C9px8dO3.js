(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function rh(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const be={},pr=[],ai=()=>{},Kp=()=>!1,pl=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),oh=n=>n.startsWith("onUpdate:"),Je=Object.assign,ah=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},Ag=Object.prototype.hasOwnProperty,ue=(n,t)=>Ag.call(n,t),Zt=Array.isArray,mr=n=>Io(n)==="[object Map]",Zp=n=>Io(n)==="[object Set]",pf=n=>Io(n)==="[object Date]",ne=n=>typeof n=="function",Ue=n=>typeof n=="string",ui=n=>typeof n=="symbol",_e=n=>n!==null&&typeof n=="object",Jp=n=>(_e(n)||ne(n))&&ne(n.then)&&ne(n.catch),jp=Object.prototype.toString,Io=n=>jp.call(n),Rg=n=>Io(n).slice(8,-1),Qp=n=>Io(n)==="[object Object]",lh=n=>Ue(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,ro=rh(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ml=n=>{const t=Object.create(null);return(e=>t[e]||(t[e]=n(e)))},Cg=/-\w/g,On=ml(n=>n.replace(Cg,t=>t.slice(1).toUpperCase())),Pg=/\B([A-Z])/g,Ds=ml(n=>n.replace(Pg,"-$1").toLowerCase()),tm=ml(n=>n.charAt(0).toUpperCase()+n.slice(1)),Pl=ml(n=>n?`on${tm(n)}`:""),si=(n,t)=>!Object.is(n,t),Ll=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},em=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},Lg=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let mf;const gl=()=>mf||(mf=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ch(n){if(Zt(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=Ue(i)?Ug(i):ch(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(Ue(n)||_e(n))return n}const Dg=/;(?![^(]*\))/g,Ig=/:([^]+)/,Ng=/\/\*[^]*?\*\//g;function Ug(n){const t={};return n.replace(Ng,"").split(Dg).forEach(e=>{if(e){const i=e.split(Ig);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function uh(n){let t="";if(Ue(n))t=n;else if(Zt(n))for(let e=0;e<n.length;e++){const i=uh(n[e]);i&&(t+=i+" ")}else if(_e(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const Fg="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Og=rh(Fg);function nm(n){return!!n||n===""}function Bg(n,t){if(n.length!==t.length)return!1;let e=!0;for(let i=0;e&&i<n.length;i++)e=hh(n[i],t[i]);return e}function hh(n,t){if(n===t)return!0;let e=pf(n),i=pf(t);if(e||i)return e&&i?n.getTime()===t.getTime():!1;if(e=ui(n),i=ui(t),e||i)return n===t;if(e=Zt(n),i=Zt(t),e||i)return e&&i?Bg(n,t):!1;if(e=_e(n),i=_e(t),e||i){if(!e||!i)return!1;const s=Object.keys(n).length,r=Object.keys(t).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=t.hasOwnProperty(o);if(a&&!l||!a&&l||!hh(n[o],t[o]))return!1}}return String(n)===String(t)}const im=n=>!!(n&&n.__v_isRef===!0),Qe=n=>Ue(n)?n:n==null?"":Zt(n)||_e(n)&&(n.toString===jp||!ne(n.toString))?im(n)?Qe(n.value):JSON.stringify(n,sm,2):String(n),sm=(n,t)=>im(t)?sm(n,t.value):mr(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[Dl(i,r)+" =>"]=s,e),{})}:Zp(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Dl(e))}:ui(t)?Dl(t):_e(t)&&!Zt(t)&&!Qp(t)?String(t):t,Dl=(n,t="")=>{var e;return ui(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let hn;class zg{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=hn,!t&&hn&&(this.index=(hn.scopes||(hn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=hn;try{return hn=this,t()}finally{hn=e}}}on(){++this._on===1&&(this.prevScope=hn,hn=this)}off(){this._on>0&&--this._on===0&&(hn=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,i=this.scopes.length;e<i;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Hg(){return hn}let ye;const Il=new WeakSet;class rm{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,hn&&hn.active&&hn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Il.has(this)&&(Il.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||am(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,gf(this),lm(this);const t=ye,e=Bn;ye=this,Bn=!0;try{return this.fn()}finally{cm(this),ye=t,Bn=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)ph(t);this.deps=this.depsTail=void 0,gf(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Il.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Bc(this)&&this.run()}get dirty(){return Bc(this)}}let om=0,oo,ao;function am(n,t=!1){if(n.flags|=8,t){n.next=ao,ao=n;return}n.next=oo,oo=n}function fh(){om++}function dh(){if(--om>0)return;if(ao){let t=ao;for(ao=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;oo;){let t=oo;for(oo=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function lm(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function cm(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),ph(i),Gg(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function Bc(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(um(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function um(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===xo)||(n.globalVersion=xo,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Bc(n))))return;n.flags|=2;const t=n.dep,e=ye,i=Bn;ye=n,Bn=!0;try{lm(n);const s=n.fn(n._value);(t.version===0||si(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{ye=e,Bn=i,cm(n),n.flags&=-3}}function ph(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)ph(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function Gg(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let Bn=!0;const hm=[];function Ni(){hm.push(Bn),Bn=!1}function Ui(){const n=hm.pop();Bn=n===void 0?!0:n}function gf(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=ye;ye=void 0;try{t()}finally{ye=e}}}let xo=0;class Vg{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class mh{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!ye||!Bn||ye===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==ye)e=this.activeLink=new Vg(ye,this),ye.deps?(e.prevDep=ye.depsTail,ye.depsTail.nextDep=e,ye.depsTail=e):ye.deps=ye.depsTail=e,fm(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=ye.depsTail,e.nextDep=void 0,ye.depsTail.nextDep=e,ye.depsTail=e,ye.deps===e&&(ye.deps=i)}return e}trigger(t){this.version++,xo++,this.notify(t)}notify(t){fh();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{dh()}}}function fm(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)fm(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const zc=new WeakMap,Es=Symbol(""),Hc=Symbol(""),vo=Symbol("");function qe(n,t,e){if(Bn&&ye){let i=zc.get(n);i||zc.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new mh),s.map=i,s.key=e),s.track()}}function Ri(n,t,e,i,s,r){const o=zc.get(n);if(!o){xo++;return}const a=l=>{l&&l.trigger()};if(fh(),t==="clear")o.forEach(a);else{const l=Zt(n),c=l&&lh(e);if(l&&e==="length"){const u=Number(i);o.forEach((h,f)=>{(f==="length"||f===vo||!ui(f)&&f>=u)&&a(h)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(vo)),t){case"add":l?c&&a(o.get("length")):(a(o.get(Es)),mr(n)&&a(o.get(Hc)));break;case"delete":l||(a(o.get(Es)),mr(n)&&a(o.get(Hc)));break;case"set":mr(n)&&a(o.get(Es));break}}dh()}function Bs(n){const t=ce(n);return t===n?t:(qe(t,"iterate",vo),An(n)?t:t.map(Gn))}function _l(n){return qe(n=ce(n),"iterate",vo),n}function ti(n,t){return Fi(n)?Er(Ts(n)?Gn(t):t):Gn(t)}const kg={__proto__:null,[Symbol.iterator](){return Nl(this,Symbol.iterator,n=>ti(this,n))},concat(...n){return Bs(this).concat(...n.map(t=>Zt(t)?Bs(t):t))},entries(){return Nl(this,"entries",n=>(n[1]=ti(this,n[1]),n))},every(n,t){return gi(this,"every",n,t,void 0,arguments)},filter(n,t){return gi(this,"filter",n,t,e=>e.map(i=>ti(this,i)),arguments)},find(n,t){return gi(this,"find",n,t,e=>ti(this,e),arguments)},findIndex(n,t){return gi(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return gi(this,"findLast",n,t,e=>ti(this,e),arguments)},findLastIndex(n,t){return gi(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return gi(this,"forEach",n,t,void 0,arguments)},includes(...n){return Ul(this,"includes",n)},indexOf(...n){return Ul(this,"indexOf",n)},join(n){return Bs(this).join(n)},lastIndexOf(...n){return Ul(this,"lastIndexOf",n)},map(n,t){return gi(this,"map",n,t,void 0,arguments)},pop(){return Or(this,"pop")},push(...n){return Or(this,"push",n)},reduce(n,...t){return _f(this,"reduce",n,t)},reduceRight(n,...t){return _f(this,"reduceRight",n,t)},shift(){return Or(this,"shift")},some(n,t){return gi(this,"some",n,t,void 0,arguments)},splice(...n){return Or(this,"splice",n)},toReversed(){return Bs(this).toReversed()},toSorted(n){return Bs(this).toSorted(n)},toSpliced(...n){return Bs(this).toSpliced(...n)},unshift(...n){return Or(this,"unshift",n)},values(){return Nl(this,"values",n=>ti(this,n))}};function Nl(n,t,e){const i=_l(n),s=i[t]();return i!==n&&!An(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=e(r.value)),r}),s}const Wg=Array.prototype;function gi(n,t,e,i,s,r){const o=_l(n),a=o!==n&&!An(n),l=o[t];if(l!==Wg[t]){const h=l.apply(n,r);return a?Gn(h):h}let c=e;o!==n&&(a?c=function(h,f){return e.call(this,ti(n,h),f,n)}:e.length>2&&(c=function(h,f){return e.call(this,h,f,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function _f(n,t,e,i){const s=_l(n),r=s!==n&&!An(n);let o=e,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,h){return a&&(a=!1,c=ti(n,c)),e.call(this,c,ti(n,u),h,n)}):e.length>3&&(o=function(c,u,h){return e.call(this,c,u,h,n)}));const l=s[t](o,...i);return a?ti(n,l):l}function Ul(n,t,e){const i=ce(n);qe(i,"iterate",vo);const s=i[t](...e);return(s===-1||s===!1)&&vh(e[0])?(e[0]=ce(e[0]),i[t](...e)):s}function Or(n,t,e=[]){Ni(),fh();const i=ce(n)[t].apply(n,e);return dh(),Ui(),i}const Xg=rh("__proto__,__v_isRef,__isVue"),dm=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(ui));function Yg(n){ui(n)||(n=String(n));const t=ce(this);return qe(t,"has",n),t.hasOwnProperty(n)}class pm{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?n_:xm:r?_m:gm).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Zt(t);if(!s){let l;if(o&&(l=kg[e]))return l;if(e==="hasOwnProperty")return Yg}const a=Reflect.get(t,e,Ke(t)?t:i);if((ui(e)?dm.has(e):Xg(e))||(s||qe(t,"get",e),r))return a;if(Ke(a)){const l=o&&lh(e)?a:a.value;return s&&_e(l)?Vc(l):l}return _e(a)?s?Vc(a):_h(a):a}}class mm extends pm{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];const o=Zt(t)&&lh(e);if(!this._isShallow){const c=Fi(r);if(!An(i)&&!Fi(i)&&(r=ce(r),i=ce(i)),!o&&Ke(r)&&!Ke(i))return c||(r.value=i),!0}const a=o?Number(e)<t.length:ue(t,e),l=Reflect.set(t,e,i,Ke(t)?t:s);return t===ce(s)&&(a?si(i,r)&&Ri(t,"set",e,i):Ri(t,"add",e,i)),l}deleteProperty(t,e){const i=ue(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&Ri(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!ui(e)||!dm.has(e))&&qe(t,"has",e),i}ownKeys(t){return qe(t,"iterate",Zt(t)?"length":Es),Reflect.ownKeys(t)}}class qg extends pm{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const $g=new mm,Kg=new qg,Zg=new mm(!0);const Gc=n=>n,Bo=n=>Reflect.getPrototypeOf(n);function Jg(n,t,e){return function(...i){const s=this.__v_raw,r=ce(s),o=mr(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?Gc:t?Er:Gn;return!t&&qe(r,"iterate",l?Hc:Es),Je(Object.create(c),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}}})}}function zo(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function jg(n,t){const e={get(s){const r=this.__v_raw,o=ce(r),a=ce(s);n||(si(s,a)&&qe(o,"get",s),qe(o,"get",a));const{has:l}=Bo(o),c=t?Gc:n?Er:Gn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&qe(ce(s),"iterate",Es),s.size},has(s){const r=this.__v_raw,o=ce(r),a=ce(s);return n||(si(s,a)&&qe(o,"has",s),qe(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=ce(a),c=t?Gc:n?Er:Gn;return!n&&qe(l,"iterate",Es),a.forEach((u,h)=>s.call(r,c(u),c(h),o))}};return Je(e,n?{add:zo("add"),set:zo("set"),delete:zo("delete"),clear:zo("clear")}:{add(s){const r=ce(this),o=Bo(r),a=ce(s),l=!t&&!An(s)&&!Fi(s)?a:s;return o.has.call(r,l)||si(s,l)&&o.has.call(r,s)||si(a,l)&&o.has.call(r,a)||(r.add(l),Ri(r,"add",l,l)),this},set(s,r){!t&&!An(r)&&!Fi(r)&&(r=ce(r));const o=ce(this),{has:a,get:l}=Bo(o);let c=a.call(o,s);c||(s=ce(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?si(r,u)&&Ri(o,"set",s,r):Ri(o,"add",s,r),this},delete(s){const r=ce(this),{has:o,get:a}=Bo(r);let l=o.call(r,s);l||(s=ce(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&Ri(r,"delete",s,void 0),c},clear(){const s=ce(this),r=s.size!==0,o=s.clear();return r&&Ri(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=Jg(s,n,t)}),e}function gh(n,t){const e=jg(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(ue(e,s)&&s in i?e:i,s,r)}const Qg={get:gh(!1,!1)},t_={get:gh(!1,!0)},e_={get:gh(!0,!1)};const gm=new WeakMap,_m=new WeakMap,xm=new WeakMap,n_=new WeakMap;function i_(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function s_(n){return n.__v_skip||!Object.isExtensible(n)?0:i_(Rg(n))}function _h(n){return Fi(n)?n:xh(n,!1,$g,Qg,gm)}function r_(n){return xh(n,!1,Zg,t_,_m)}function Vc(n){return xh(n,!0,Kg,e_,xm)}function xh(n,t,e,i,s){if(!_e(n)||n.__v_raw&&!(t&&n.__v_isReactive))return n;const r=s_(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:e);return s.set(n,a),a}function Ts(n){return Fi(n)?Ts(n.__v_raw):!!(n&&n.__v_isReactive)}function Fi(n){return!!(n&&n.__v_isReadonly)}function An(n){return!!(n&&n.__v_isShallow)}function vh(n){return n?!!n.__v_raw:!1}function ce(n){const t=n&&n.__v_raw;return t?ce(t):n}function o_(n){return!ue(n,"__v_skip")&&Object.isExtensible(n)&&em(n,"__v_skip",!0),n}const Gn=n=>_e(n)?_h(n):n,Er=n=>_e(n)?Vc(n):n;function Ke(n){return n?n.__v_isRef===!0:!1}function La(n){return a_(n,!1)}function a_(n,t){return Ke(n)?n:new l_(n,t)}class l_{constructor(t,e){this.dep=new mh,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:ce(t),this._value=e?t:Gn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||An(t)||Fi(t);t=i?t:ce(t),si(t,e)&&(this._rawValue=t,this._value=i?t:Gn(t),this.dep.trigger())}}function c_(n){return Ke(n)?n.value:n}const u_={get:(n,t,e)=>t==="__v_raw"?n:c_(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return Ke(s)&&!Ke(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function vm(n){return Ts(n)?n:new Proxy(n,u_)}class h_{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new mh(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=xo-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&ye!==this)return am(this,!0),!0}get value(){const t=this.dep.track();return um(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function f_(n,t,e=!1){let i,s;return ne(n)?i=n:(i=n.get,s=n.set),new h_(i,s,e)}const Ho={},Ya=new WeakMap;let xs;function d_(n,t=!1,e=xs){if(e){let i=Ya.get(e);i||Ya.set(e,i=[]),i.push(n)}}function p_(n,t,e=be){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=_=>s?_:An(_)||s===!1||s===0?is(_,1):is(_);let u,h,f,d,g=!1,v=!1;if(Ke(n)?(h=()=>n.value,g=An(n)):Ts(n)?(h=()=>c(n),g=!0):Zt(n)?(v=!0,g=n.some(_=>Ts(_)||An(_)),h=()=>n.map(_=>{if(Ke(_))return _.value;if(Ts(_))return c(_);if(ne(_))return l?l(_,2):_()})):ne(n)?t?h=l?()=>l(n,2):n:h=()=>{if(f){Ni();try{f()}finally{Ui()}}const _=xs;xs=u;try{return l?l(n,3,[d]):n(d)}finally{xs=_}}:h=ai,t&&s){const _=h,T=s===!0?1/0:s;h=()=>is(_(),T)}const m=Hg(),p=()=>{u.stop(),m&&m.active&&ah(m.effects,u)};if(r&&t){const _=t;t=(...T)=>{_(...T),p()}}let M=v?new Array(n.length).fill(Ho):Ho;const y=_=>{if(!(!(u.flags&1)||!u.dirty&&!_))if(t){const T=u.run();if(s||g||(v?T.some((E,R)=>si(E,M[R])):si(T,M))){f&&f();const E=xs;xs=u;try{const R=[T,M===Ho?void 0:v&&M[0]===Ho?[]:M,d];M=T,l?l(t,3,R):t(...R)}finally{xs=E}}}else u.run()};return a&&a(y),u=new rm(h),u.scheduler=o?()=>o(y,!1):y,d=_=>d_(_,!1,u),f=u.onStop=()=>{const _=Ya.get(u);if(_){if(l)l(_,4);else for(const T of _)T();Ya.delete(u)}},t?i?y(!0):M=u.run():o?o(y.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function is(n,t=1/0,e){if(t<=0||!_e(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,Ke(n))is(n.value,t,e);else if(Zt(n))for(let i=0;i<n.length;i++)is(n[i],t,e);else if(Zp(n)||mr(n))n.forEach(i=>{is(i,t,e)});else if(Qp(n)){for(const i in n)is(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&is(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function No(n,t,e,i){try{return i?n(...i):n()}catch(s){xl(s,t,e)}}function hi(n,t,e,i){if(ne(n)){const s=No(n,t,e,i);return s&&Jp(s)&&s.catch(r=>{xl(r,t,e)}),s}if(Zt(n)){const s=[];for(let r=0;r<n.length;r++)s.push(hi(n[r],t,e,i));return s}}function xl(n,t,e,i=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||be;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}a=a.parent}if(r){Ni(),No(r,null,10,[n,l,c]),Ui();return}}m_(n,e,s,i,o)}function m_(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const nn=[];let jn=-1;const gr=[];let es=null,ar=0;const Mm=Promise.resolve();let qa=null;function g_(n){const t=qa||Mm;return n?t.then(this?n.bind(this):n):t}function __(n){let t=jn+1,e=nn.length;for(;t<e;){const i=t+e>>>1,s=nn[i],r=Mo(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function Mh(n){if(!(n.flags&1)){const t=Mo(n),e=nn[nn.length-1];!e||!(n.flags&2)&&t>=Mo(e)?nn.push(n):nn.splice(__(t),0,n),n.flags|=1,Sm()}}function Sm(){qa||(qa=Mm.then(bm))}function x_(n){Zt(n)?gr.push(...n):es&&n.id===-1?es.splice(ar+1,0,n):n.flags&1||(gr.push(n),n.flags|=1),Sm()}function xf(n,t,e=jn+1){for(;e<nn.length;e++){const i=nn[e];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;nn.splice(e,1),e--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function ym(n){if(gr.length){const t=[...new Set(gr)].sort((e,i)=>Mo(e)-Mo(i));if(gr.length=0,es){es.push(...t);return}for(es=t,ar=0;ar<es.length;ar++){const e=es[ar];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}es=null,ar=0}}const Mo=n=>n.id==null?n.flags&2?-1:1/0:n.id;function bm(n){try{for(jn=0;jn<nn.length;jn++){const t=nn[jn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),No(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;jn<nn.length;jn++){const t=nn[jn];t&&(t.flags&=-2)}jn=-1,nn.length=0,ym(),qa=null,(nn.length||gr.length)&&bm()}}let ri=null,Em=null;function $a(n){const t=ri;return ri=n,Em=n&&n.type.__scopeId||null,t}function v_(n,t=ri,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&Cf(-1);const r=$a(t);let o;try{o=n(...s)}finally{$a(r),i._d&&Cf(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function hs(n,t,e,i){const s=n.dirs,r=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(Ni(),hi(l,e,8,[n.el,a,n,t]),Ui())}}function M_(n,t){if(sn){let e=sn.provides;const i=sn.parent&&sn.parent.provides;i===e&&(e=sn.provides=Object.create(i)),e[n]=t}}function Da(n,t,e=!1){const i=Mx();if(i||_r){let s=_r?_r._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&ne(t)?t.call(i&&i.proxy):t}}const S_=Symbol.for("v-scx"),y_=()=>Da(S_);function Fl(n,t,e){return Tm(n,t,e)}function Tm(n,t,e=be){const{immediate:i,deep:s,flush:r,once:o}=e,a=Je({},e),l=t&&i||!t&&r!=="post";let c;if(yo){if(r==="sync"){const d=y_();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=ai,d.resume=ai,d.pause=ai,d}}const u=sn;a.call=(d,g,v)=>hi(d,u,g,v);let h=!1;r==="post"?a.scheduler=d=>{un(d,u&&u.suspense)}:r!=="sync"&&(h=!0,a.scheduler=(d,g)=>{g?d():Mh(d)}),a.augmentJob=d=>{t&&(d.flags|=4),h&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const f=p_(n,t,a);return yo&&(c?c.push(f):l&&f()),f}function b_(n,t,e){const i=this.proxy,s=Ue(n)?n.includes(".")?wm(i,n):()=>i[n]:n.bind(i,i);let r;ne(t)?r=t:(r=t.handler,e=t);const o=Uo(this),a=Tm(s,r.bind(i),e);return o(),a}function wm(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const E_=Symbol("_vte"),T_=n=>n.__isTeleport,w_=Symbol("_leaveCb");function Sh(n,t){n.shapeFlag&6&&n.component?(n.transition=t,Sh(n.component.subTree,t)):n.shapeFlag&128?(n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)):n.transition=t}function Am(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function vf(n,t){let e;return!!((e=Object.getOwnPropertyDescriptor(n,t))&&!e.configurable)}const Ka=new WeakMap;function lo(n,t,e,i,s=!1){if(Zt(n)){n.forEach((v,m)=>lo(v,t&&(Zt(t)?t[m]:t),e,i,s));return}if(co(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&lo(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?Th(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===be?a.refs={}:a.refs,h=a.setupState,f=ce(h),d=h===be?Kp:v=>vf(u,v)?!1:ue(f,v),g=(v,m)=>!(m&&vf(u,m));if(c!=null&&c!==l){if(Mf(t),Ue(c))u[c]=null,d(c)&&(h[c]=null);else if(Ke(c)){const v=t;g(c,v.k)&&(c.value=null),v.k&&(u[v.k]=null)}}if(ne(l))No(l,a,12,[o,u]);else{const v=Ue(l),m=Ke(l);if(v||m){const p=()=>{if(n.f){const M=v?d(l)?h[l]:u[l]:g()||!n.k?l.value:u[n.k];if(s)Zt(M)&&ah(M,r);else if(Zt(M))M.includes(r)||M.push(r);else if(v)u[l]=[r],d(l)&&(h[l]=u[l]);else{const y=[r];g(l,n.k)&&(l.value=y),n.k&&(u[n.k]=y)}}else v?(u[l]=o,d(l)&&(h[l]=o)):m&&(g(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const M=()=>{p(),Ka.delete(n)};M.id=-1,Ka.set(n,M),un(M,e)}else Mf(n),p()}}}function Mf(n){const t=Ka.get(n);t&&(t.flags|=8,Ka.delete(n))}gl().requestIdleCallback;gl().cancelIdleCallback;const co=n=>!!n.type.__asyncLoader,Rm=n=>n.type.__isKeepAlive;function A_(n,t){Cm(n,"a",t)}function R_(n,t){Cm(n,"da",t)}function Cm(n,t,e=sn){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(vl(t,i,e),e){let s=e.parent;for(;s&&s.parent;)Rm(s.parent.vnode)&&C_(i,t,e,s),s=s.parent}}function C_(n,t,e,i){const s=vl(t,n,i,!0);Dm(()=>{ah(i[t],s)},e)}function vl(n,t,e=sn,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{Ni();const a=Uo(e),l=hi(t,e,n,o);return a(),Ui(),l});return i?s.unshift(r):s.push(r),r}}const Gi=n=>(t,e=sn)=>{(!yo||n==="sp")&&vl(n,(...i)=>t(...i),e)},P_=Gi("bm"),Pm=Gi("m"),L_=Gi("bu"),D_=Gi("u"),Lm=Gi("bum"),Dm=Gi("um"),I_=Gi("sp"),N_=Gi("rtg"),U_=Gi("rtc");function F_(n,t=sn){vl("ec",n,t)}const O_=Symbol.for("v-ndc");function B_(n,t,e,i){let s;const r=e,o=Zt(n);if(o||Ue(n)){const a=o&&Ts(n);let l=!1,c=!1;a&&(l=!An(n),c=Fi(n),n=_l(n)),s=new Array(n.length);for(let u=0,h=n.length;u<h;u++)s[u]=t(l?c?Er(Gn(n[u])):Gn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(_e(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(n[u],u,l,r)}}else s=[];return s}const kc=n=>n?e0(n)?Th(n):kc(n.parent):null,uo=Je(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>kc(n.parent),$root:n=>kc(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Nm(n),$forceUpdate:n=>n.f||(n.f=()=>{Mh(n.update)}),$nextTick:n=>n.n||(n.n=g_.bind(n.proxy)),$watch:n=>b_.bind(n)}),Ol=(n,t)=>n!==be&&!n.__isScriptSetup&&ue(n,t),z_={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(t[0]!=="$"){const f=o[t];if(f!==void 0)switch(f){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(Ol(i,t))return o[t]=1,i[t];if(s!==be&&ue(s,t))return o[t]=2,s[t];if(ue(r,t))return o[t]=3,r[t];if(e!==be&&ue(e,t))return o[t]=4,e[t];Wc&&(o[t]=0)}}const c=uo[t];let u,h;if(c)return t==="$attrs"&&qe(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[t]))return u;if(e!==be&&ue(e,t))return o[t]=4,e[t];if(h=l.config.globalProperties,ue(h,t))return h[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return Ol(s,t)?(s[t]=e,!0):i!==be&&ue(i,t)?(i[t]=e,!0):ue(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(e[a]||n!==be&&a[0]!=="$"&&ue(n,a)||Ol(t,a)||ue(r,a)||ue(i,a)||ue(uo,a)||ue(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:ue(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function Sf(n){return Zt(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let Wc=!0;function H_(n){const t=Nm(n),e=n.proxy,i=n.ctx;Wc=!1,t.beforeCreate&&yf(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:d,updated:g,activated:v,deactivated:m,beforeDestroy:p,beforeUnmount:M,destroyed:y,unmounted:_,render:T,renderTracked:E,renderTriggered:R,errorCaptured:S,serverPrefetch:w,expose:L,inheritAttrs:I,components:U,directives:q,filters:J}=t;if(c&&G_(c,i,null),o)for(const z in o){const K=o[z];ne(K)&&(i[z]=K.bind(e))}if(s){const z=s.call(e,e);_e(z)&&(n.data=_h(z))}if(Wc=!0,r)for(const z in r){const K=r[z],rt=ne(K)?K.bind(e,e):ne(K.get)?K.get.bind(e,e):ai,pt=!ne(K)&&ne(K.set)?K.set.bind(e):ai,xt=wx({get:rt,set:pt});Object.defineProperty(i,z,{enumerable:!0,configurable:!0,get:()=>xt.value,set:vt=>xt.value=vt})}if(a)for(const z in a)Im(a[z],i,e,z);if(l){const z=ne(l)?l.call(e):l;Reflect.ownKeys(z).forEach(K=>{M_(K,z[K])})}u&&yf(u,n,"c");function Y(z,K){Zt(K)?K.forEach(rt=>z(rt.bind(e))):K&&z(K.bind(e))}if(Y(P_,h),Y(Pm,f),Y(L_,d),Y(D_,g),Y(A_,v),Y(R_,m),Y(F_,S),Y(U_,E),Y(N_,R),Y(Lm,M),Y(Dm,_),Y(I_,w),Zt(L))if(L.length){const z=n.exposed||(n.exposed={});L.forEach(K=>{Object.defineProperty(z,K,{get:()=>e[K],set:rt=>e[K]=rt,enumerable:!0})})}else n.exposed||(n.exposed={});T&&n.render===ai&&(n.render=T),I!=null&&(n.inheritAttrs=I),U&&(n.components=U),q&&(n.directives=q),w&&Am(n)}function G_(n,t,e=ai){Zt(n)&&(n=Xc(n));for(const i in n){const s=n[i];let r;_e(s)?"default"in s?r=Da(s.from||i,s.default,!0):r=Da(s.from||i):r=Da(s),Ke(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function yf(n,t,e){hi(Zt(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function Im(n,t,e,i){let s=i.includes(".")?wm(e,i):()=>e[i];if(Ue(n)){const r=t[n];ne(r)&&Fl(s,r)}else if(ne(n))Fl(s,n.bind(e));else if(_e(n))if(Zt(n))n.forEach(r=>Im(r,t,e,i));else{const r=ne(n.handler)?n.handler.bind(e):t[n.handler];ne(r)&&Fl(s,r,n)}}function Nm(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>Za(l,c,o,!0)),Za(l,t,o)),_e(t)&&r.set(t,l),l}function Za(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&Za(n,r,e,!0),s&&s.forEach(o=>Za(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=V_[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const V_={data:bf,props:Ef,emits:Ef,methods:to,computed:to,beforeCreate:tn,created:tn,beforeMount:tn,mounted:tn,beforeUpdate:tn,updated:tn,beforeDestroy:tn,beforeUnmount:tn,destroyed:tn,unmounted:tn,activated:tn,deactivated:tn,errorCaptured:tn,serverPrefetch:tn,components:to,directives:to,watch:W_,provide:bf,inject:k_};function bf(n,t){return t?n?function(){return Je(ne(n)?n.call(this,this):n,ne(t)?t.call(this,this):t)}:t:n}function k_(n,t){return to(Xc(n),Xc(t))}function Xc(n){if(Zt(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function tn(n,t){return n?[...new Set([].concat(n,t))]:t}function to(n,t){return n?Je(Object.create(null),n,t):t}function Ef(n,t){return n?Zt(n)&&Zt(t)?[...new Set([...n,...t])]:Je(Object.create(null),Sf(n),Sf(t??{})):t}function W_(n,t){if(!n)return t;if(!t)return n;const e=Je(Object.create(null),n);for(const i in t)e[i]=tn(n[i],t[i]);return e}function Um(){return{app:null,config:{isNativeTag:Kp,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let X_=0;function Y_(n,t){return function(i,s=null){ne(i)||(i=Je({},i)),s!=null&&!_e(s)&&(s=null);const r=Um(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:X_++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:Ax,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&ne(u.install)?(o.add(u),u.install(c,...h)):ne(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!l){const d=c._ceVNode||Rn(i,s);return d.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(d,u,f),l=!0,c._container=u,u.__vue_app__=c,Th(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(hi(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=_r;_r=c;try{return u()}finally{_r=h}}};return c}}let _r=null;const q_=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${On(t)}Modifiers`]||n[`${Ds(t)}Modifiers`];function $_(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||be;let s=e;const r=t.startsWith("update:"),o=r&&q_(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>Ue(u)?u.trim():u)),o.number&&(s=e.map(Lg)));let a,l=i[a=Pl(t)]||i[a=Pl(On(t))];!l&&r&&(l=i[a=Pl(Ds(t))]),l&&hi(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,hi(c,n,6,s)}}const K_=new WeakMap;function Fm(n,t,e=!1){const i=e?K_:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!ne(n)){const l=c=>{const u=Fm(c,t,!0);u&&(a=!0,Je(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(_e(n)&&i.set(n,null),null):(Zt(r)?r.forEach(l=>o[l]=null):Je(o,r),_e(n)&&i.set(n,o),o)}function Ml(n,t){return!n||!pl(t)?!1:(t=t.slice(2).replace(/Once$/,""),ue(n,t[0].toLowerCase()+t.slice(1))||ue(n,Ds(t))||ue(n,t))}function Tf(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:d,ctx:g,inheritAttrs:v}=n,m=$a(n);let p,M;try{if(e.shapeFlag&4){const _=s||i,T=_;p=ni(c.call(T,_,u,h,d,f,g)),M=a}else{const _=t;p=ni(_.length>1?_(h,{attrs:a,slots:o,emit:l}):_(h,null)),M=t.props?a:Z_(a)}}catch(_){ho.length=0,xl(_,n,1),p=Rn(as)}let y=p;if(M&&v!==!1){const _=Object.keys(M),{shapeFlag:T}=y;_.length&&T&7&&(r&&_.some(oh)&&(M=J_(M,r)),y=Tr(y,M,!1,!0))}return e.dirs&&(y=Tr(y,null,!1,!0),y.dirs=y.dirs?y.dirs.concat(e.dirs):e.dirs),e.transition&&Sh(y,e.transition),p=y,$a(m),p}const Z_=n=>{let t;for(const e in n)(e==="class"||e==="style"||pl(e))&&((t||(t={}))[e]=n[e]);return t},J_=(n,t)=>{const e={};for(const i in n)(!oh(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function j_(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?wf(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(Om(o,i,f)&&!Ml(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?wf(i,o,c):!0:!!o;return!1}function wf(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(Om(t,n,r)&&!Ml(e,r))return!0}return!1}function Om(n,t,e){const i=n[e],s=t[e];return e==="style"&&_e(i)&&_e(s)?!hh(i,s):i!==s}function Q_({vnode:n,parent:t},e){for(;t;){const i=t.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=t.vnode).el=e,t=t.parent;else break}}const Bm={},zm=()=>Object.create(Bm),Hm=n=>Object.getPrototypeOf(n)===Bm;function tx(n,t,e,i=!1){const s={},r=zm();n.propsDefaults=Object.create(null),Gm(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:r_(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function ex(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=ce(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Ml(n.emitsOptions,f))continue;const d=t[f];if(l)if(ue(r,f))d!==r[f]&&(r[f]=d,c=!0);else{const g=On(f);s[g]=Yc(l,a,g,d,n,!1)}else d!==r[f]&&(r[f]=d,c=!0)}}}else{Gm(n,t,s,r)&&(c=!0);let u;for(const h in a)(!t||!ue(t,h)&&((u=Ds(h))===h||!ue(t,u)))&&(l?e&&(e[h]!==void 0||e[u]!==void 0)&&(s[h]=Yc(l,a,h,void 0,n,!0)):delete s[h]);if(r!==a)for(const h in r)(!t||!ue(t,h))&&(delete r[h],c=!0)}c&&Ri(n.attrs,"set","")}function Gm(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(ro(l))continue;const c=t[l];let u;s&&ue(s,u=On(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:Ml(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=ce(e),c=a||be;for(let u=0;u<r.length;u++){const h=r[u];e[h]=Yc(s,l,h,c[h],n,!ue(c,h))}}return o}function Yc(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=ue(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&ne(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=Uo(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===Ds(e))&&(i=!0))}return i}const nx=new WeakMap;function Vm(n,t,e=!1){const i=e?nx:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!ne(n)){const u=h=>{l=!0;const[f,d]=Vm(h,t,!0);Je(o,f),d&&a.push(...d)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return _e(n)&&i.set(n,pr),pr;if(Zt(r))for(let u=0;u<r.length;u++){const h=On(r[u]);Af(h)&&(o[h]=be)}else if(r)for(const u in r){const h=On(u);if(Af(h)){const f=r[u],d=o[h]=Zt(f)||ne(f)?{type:f}:Je({},f),g=d.type;let v=!1,m=!0;if(Zt(g))for(let p=0;p<g.length;++p){const M=g[p],y=ne(M)&&M.name;if(y==="Boolean"){v=!0;break}else y==="String"&&(m=!1)}else v=ne(g)&&g.name==="Boolean";d[0]=v,d[1]=m,(v||ue(d,"default"))&&a.push(h)}}const c=[o,a];return _e(n)&&i.set(n,c),c}function Af(n){return n[0]!=="$"&&!ro(n)}const yh=n=>n==="_"||n==="_ctx"||n==="$stable",bh=n=>Zt(n)?n.map(ni):[ni(n)],ix=(n,t,e)=>{if(t._n)return t;const i=v_((...s)=>bh(t(...s)),e);return i._c=!1,i},km=(n,t,e)=>{const i=n._ctx;for(const s in n){if(yh(s))continue;const r=n[s];if(ne(r))t[s]=ix(s,r,i);else if(r!=null){const o=bh(r);t[s]=()=>o}}},Wm=(n,t)=>{const e=bh(t);n.slots.default=()=>e},Xm=(n,t,e)=>{for(const i in t)(e||!yh(i))&&(n[i]=t[i])},sx=(n,t,e)=>{const i=n.slots=zm();if(n.vnode.shapeFlag&32){const s=t._;s?(Xm(i,t,e),e&&em(i,"_",s,!0)):km(t,i)}else t&&Wm(n,t)},rx=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=be;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:Xm(s,t,e):(r=!t.$stable,km(t,s)),o=t}else t&&(Wm(n,t),o={default:1});if(r)for(const a in s)!yh(a)&&o[a]==null&&delete s[a]},un=ux;function ox(n){return ax(n)}function ax(n,t){const e=gl();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:d=ai,insertStaticContent:g}=n,v=(P,N,X,tt=null,j=null,it=null,dt=void 0,ut=null,ct=!!N.dynamicChildren)=>{if(P===N)return;P&&!Br(P,N)&&(tt=at(P),vt(P,j,it,!0),P=null),N.patchFlag===-2&&(ct=!1,N.dynamicChildren=null);const{type:et,ref:Pt,shapeFlag:C}=N;switch(et){case Sl:m(P,N,X,tt);break;case as:p(P,N,X,tt);break;case Ia:P==null&&M(N,X,tt,dt);break;case ei:U(P,N,X,tt,j,it,dt,ut,ct);break;default:C&1?T(P,N,X,tt,j,it,dt,ut,ct):C&6?q(P,N,X,tt,j,it,dt,ut,ct):(C&64||C&128)&&et.process(P,N,X,tt,j,it,dt,ut,ct,$t)}Pt!=null&&j?lo(Pt,P&&P.ref,it,N||P,!N):Pt==null&&P&&P.ref!=null&&lo(P.ref,null,it,P,!0)},m=(P,N,X,tt)=>{if(P==null)i(N.el=a(N.children),X,tt);else{const j=N.el=P.el;N.children!==P.children&&c(j,N.children)}},p=(P,N,X,tt)=>{P==null?i(N.el=l(N.children||""),X,tt):N.el=P.el},M=(P,N,X,tt)=>{[P.el,P.anchor]=g(P.children,N,X,tt,P.el,P.anchor)},y=({el:P,anchor:N},X,tt)=>{let j;for(;P&&P!==N;)j=f(P),i(P,X,tt),P=j;i(N,X,tt)},_=({el:P,anchor:N})=>{let X;for(;P&&P!==N;)X=f(P),s(P),P=X;s(N)},T=(P,N,X,tt,j,it,dt,ut,ct)=>{if(N.type==="svg"?dt="svg":N.type==="math"&&(dt="mathml"),P==null)E(N,X,tt,j,it,dt,ut,ct);else{const et=P.el&&P.el._isVueCE?P.el:null;try{et&&et._beginPatch(),w(P,N,j,it,dt,ut,ct)}finally{et&&et._endPatch()}}},E=(P,N,X,tt,j,it,dt,ut)=>{let ct,et;const{props:Pt,shapeFlag:C,transition:Dt,dirs:Tt}=P;if(ct=P.el=o(P.type,it,Pt&&Pt.is,Pt),C&8?u(ct,P.children):C&16&&S(P.children,ct,null,tt,j,Bl(P,it),dt,ut),Tt&&hs(P,null,tt,"created"),R(ct,P,P.scopeId,dt,tt),Pt){for(const x in Pt)x!=="value"&&!ro(x)&&r(ct,x,null,Pt[x],it,tt);"value"in Pt&&r(ct,"value",null,Pt.value,it),(et=Pt.onVnodeBeforeMount)&&Kn(et,tt,P)}Tt&&hs(P,null,tt,"beforeMount");const A=lx(j,Dt);A&&Dt.beforeEnter(ct),i(ct,N,X),((et=Pt&&Pt.onVnodeMounted)||A||Tt)&&un(()=>{et&&Kn(et,tt,P),A&&Dt.enter(ct),Tt&&hs(P,null,tt,"mounted")},j)},R=(P,N,X,tt,j)=>{if(X&&d(P,X),tt)for(let it=0;it<tt.length;it++)d(P,tt[it]);if(j){let it=j.subTree;if(N===it||Km(it.type)&&(it.ssContent===N||it.ssFallback===N)){const dt=j.vnode;R(P,dt,dt.scopeId,dt.slotScopeIds,j.parent)}}},S=(P,N,X,tt,j,it,dt,ut,ct=0)=>{for(let et=ct;et<P.length;et++){const Pt=P[et]=ut?Ai(P[et]):ni(P[et]);v(null,Pt,N,X,tt,j,it,dt,ut)}},w=(P,N,X,tt,j,it,dt)=>{const ut=N.el=P.el;let{patchFlag:ct,dynamicChildren:et,dirs:Pt}=N;ct|=P.patchFlag&16;const C=P.props||be,Dt=N.props||be;let Tt;if(X&&fs(X,!1),(Tt=Dt.onVnodeBeforeUpdate)&&Kn(Tt,X,N,P),Pt&&hs(N,P,X,"beforeUpdate"),X&&fs(X,!0),(C.innerHTML&&Dt.innerHTML==null||C.textContent&&Dt.textContent==null)&&u(ut,""),et?L(P.dynamicChildren,et,ut,X,tt,Bl(N,j),it):dt||K(P,N,ut,null,X,tt,Bl(N,j),it,!1),ct>0){if(ct&16)I(ut,C,Dt,X,j);else if(ct&2&&C.class!==Dt.class&&r(ut,"class",null,Dt.class,j),ct&4&&r(ut,"style",C.style,Dt.style,j),ct&8){const A=N.dynamicProps;for(let x=0;x<A.length;x++){const F=A[x],G=C[F],Z=Dt[F];(Z!==G||F==="value")&&r(ut,F,G,Z,j,X)}}ct&1&&P.children!==N.children&&u(ut,N.children)}else!dt&&et==null&&I(ut,C,Dt,X,j);((Tt=Dt.onVnodeUpdated)||Pt)&&un(()=>{Tt&&Kn(Tt,X,N,P),Pt&&hs(N,P,X,"updated")},tt)},L=(P,N,X,tt,j,it,dt)=>{for(let ut=0;ut<N.length;ut++){const ct=P[ut],et=N[ut],Pt=ct.el&&(ct.type===ei||!Br(ct,et)||ct.shapeFlag&198)?h(ct.el):X;v(ct,et,Pt,null,tt,j,it,dt,!0)}},I=(P,N,X,tt,j)=>{if(N!==X){if(N!==be)for(const it in N)!ro(it)&&!(it in X)&&r(P,it,N[it],null,j,tt);for(const it in X){if(ro(it))continue;const dt=X[it],ut=N[it];dt!==ut&&it!=="value"&&r(P,it,ut,dt,j,tt)}"value"in X&&r(P,"value",N.value,X.value,j)}},U=(P,N,X,tt,j,it,dt,ut,ct)=>{const et=N.el=P?P.el:a(""),Pt=N.anchor=P?P.anchor:a("");let{patchFlag:C,dynamicChildren:Dt,slotScopeIds:Tt}=N;Tt&&(ut=ut?ut.concat(Tt):Tt),P==null?(i(et,X,tt),i(Pt,X,tt),S(N.children||[],X,Pt,j,it,dt,ut,ct)):C>0&&C&64&&Dt&&P.dynamicChildren&&P.dynamicChildren.length===Dt.length?(L(P.dynamicChildren,Dt,X,j,it,dt,ut),(N.key!=null||j&&N===j.subTree)&&Ym(P,N,!0)):K(P,N,X,Pt,j,it,dt,ut,ct)},q=(P,N,X,tt,j,it,dt,ut,ct)=>{N.slotScopeIds=ut,P==null?N.shapeFlag&512?j.ctx.activate(N,X,tt,dt,ct):J(N,X,tt,j,it,dt,ct):H(P,N,ct)},J=(P,N,X,tt,j,it,dt)=>{const ut=P.component=vx(P,tt,j);if(Rm(P)&&(ut.ctx.renderer=$t),Sx(ut,!1,dt),ut.asyncDep){if(j&&j.registerDep(ut,Y,dt),!P.el){const ct=ut.subTree=Rn(as);p(null,ct,N,X),P.placeholder=ct.el}}else Y(ut,P,N,X,j,it,dt)},H=(P,N,X)=>{const tt=N.component=P.component;if(j_(P,N,X))if(tt.asyncDep&&!tt.asyncResolved){z(tt,N,X);return}else tt.next=N,tt.update();else N.el=P.el,tt.vnode=N},Y=(P,N,X,tt,j,it,dt)=>{const ut=()=>{if(P.isMounted){let{next:C,bu:Dt,u:Tt,parent:A,vnode:x}=P;{const _t=qm(P);if(_t){C&&(C.el=x.el,z(P,C,dt)),_t.asyncDep.then(()=>{un(()=>{P.isUnmounted||et()},j)});return}}let F=C,G;fs(P,!1),C?(C.el=x.el,z(P,C,dt)):C=x,Dt&&Ll(Dt),(G=C.props&&C.props.onVnodeBeforeUpdate)&&Kn(G,A,C,x),fs(P,!0);const Z=Tf(P),ht=P.subTree;P.subTree=Z,v(ht,Z,h(ht.el),at(ht),P,j,it),C.el=Z.el,F===null&&Q_(P,Z.el),Tt&&un(Tt,j),(G=C.props&&C.props.onVnodeUpdated)&&un(()=>Kn(G,A,C,x),j)}else{let C;const{el:Dt,props:Tt}=N,{bm:A,m:x,parent:F,root:G,type:Z}=P,ht=co(N);fs(P,!1),A&&Ll(A),!ht&&(C=Tt&&Tt.onVnodeBeforeMount)&&Kn(C,F,N),fs(P,!0);{G.ce&&G.ce._hasShadowRoot()&&G.ce._injectChildStyle(Z,P.parent?P.parent.type:void 0);const _t=P.subTree=Tf(P);v(null,_t,X,tt,P,j,it),N.el=_t.el}if(x&&un(x,j),!ht&&(C=Tt&&Tt.onVnodeMounted)){const _t=N;un(()=>Kn(C,F,_t),j)}(N.shapeFlag&256||F&&co(F.vnode)&&F.vnode.shapeFlag&256)&&P.a&&un(P.a,j),P.isMounted=!0,N=X=tt=null}};P.scope.on();const ct=P.effect=new rm(ut);P.scope.off();const et=P.update=ct.run.bind(ct),Pt=P.job=ct.runIfDirty.bind(ct);Pt.i=P,Pt.id=P.uid,ct.scheduler=()=>Mh(Pt),fs(P,!0),et()},z=(P,N,X)=>{N.component=P;const tt=P.vnode.props;P.vnode=N,P.next=null,ex(P,N.props,tt,X),rx(P,N.children,X),Ni(),xf(P),Ui()},K=(P,N,X,tt,j,it,dt,ut,ct=!1)=>{const et=P&&P.children,Pt=P?P.shapeFlag:0,C=N.children,{patchFlag:Dt,shapeFlag:Tt}=N;if(Dt>0){if(Dt&128){pt(et,C,X,tt,j,it,dt,ut,ct);return}else if(Dt&256){rt(et,C,X,tt,j,it,dt,ut,ct);return}}Tt&8?(Pt&16&&V(et,j,it),C!==et&&u(X,C)):Pt&16?Tt&16?pt(et,C,X,tt,j,it,dt,ut,ct):V(et,j,it,!0):(Pt&8&&u(X,""),Tt&16&&S(C,X,tt,j,it,dt,ut,ct))},rt=(P,N,X,tt,j,it,dt,ut,ct)=>{P=P||pr,N=N||pr;const et=P.length,Pt=N.length,C=Math.min(et,Pt);let Dt;for(Dt=0;Dt<C;Dt++){const Tt=N[Dt]=ct?Ai(N[Dt]):ni(N[Dt]);v(P[Dt],Tt,X,null,j,it,dt,ut,ct)}et>Pt?V(P,j,it,!0,!1,C):S(N,X,tt,j,it,dt,ut,ct,C)},pt=(P,N,X,tt,j,it,dt,ut,ct)=>{let et=0;const Pt=N.length;let C=P.length-1,Dt=Pt-1;for(;et<=C&&et<=Dt;){const Tt=P[et],A=N[et]=ct?Ai(N[et]):ni(N[et]);if(Br(Tt,A))v(Tt,A,X,null,j,it,dt,ut,ct);else break;et++}for(;et<=C&&et<=Dt;){const Tt=P[C],A=N[Dt]=ct?Ai(N[Dt]):ni(N[Dt]);if(Br(Tt,A))v(Tt,A,X,null,j,it,dt,ut,ct);else break;C--,Dt--}if(et>C){if(et<=Dt){const Tt=Dt+1,A=Tt<Pt?N[Tt].el:tt;for(;et<=Dt;)v(null,N[et]=ct?Ai(N[et]):ni(N[et]),X,A,j,it,dt,ut,ct),et++}}else if(et>Dt)for(;et<=C;)vt(P[et],j,it,!0),et++;else{const Tt=et,A=et,x=new Map;for(et=A;et<=Dt;et++){const mt=N[et]=ct?Ai(N[et]):ni(N[et]);mt.key!=null&&x.set(mt.key,et)}let F,G=0;const Z=Dt-A+1;let ht=!1,_t=0;const Q=new Array(Z);for(et=0;et<Z;et++)Q[et]=0;for(et=Tt;et<=C;et++){const mt=P[et];if(G>=Z){vt(mt,j,it,!0);continue}let It;if(mt.key!=null)It=x.get(mt.key);else for(F=A;F<=Dt;F++)if(Q[F-A]===0&&Br(mt,N[F])){It=F;break}It===void 0?vt(mt,j,it,!0):(Q[It-A]=et+1,It>=_t?_t=It:ht=!0,v(mt,N[It],X,null,j,it,dt,ut,ct),G++)}const nt=ht?cx(Q):pr;for(F=nt.length-1,et=Z-1;et>=0;et--){const mt=A+et,It=N[mt],bt=N[mt+1],Mt=mt+1<Pt?bt.el||$m(bt):tt;Q[et]===0?v(null,It,X,Mt,j,it,dt,ut,ct):ht&&(F<0||et!==nt[F]?xt(It,X,Mt,2):F--)}}},xt=(P,N,X,tt,j=null)=>{const{el:it,type:dt,transition:ut,children:ct,shapeFlag:et}=P;if(et&6){xt(P.component.subTree,N,X,tt);return}if(et&128){P.suspense.move(N,X,tt);return}if(et&64){dt.move(P,N,X,$t);return}if(dt===ei){i(it,N,X);for(let C=0;C<ct.length;C++)xt(ct[C],N,X,tt);i(P.anchor,N,X);return}if(dt===Ia){y(P,N,X);return}if(tt!==2&&et&1&&ut)if(tt===0)ut.beforeEnter(it),i(it,N,X),un(()=>ut.enter(it),j);else{const{leave:C,delayLeave:Dt,afterLeave:Tt}=ut,A=()=>{P.ctx.isUnmounted?s(it):i(it,N,X)},x=()=>{it._isLeaving&&it[w_](!0),C(it,()=>{A(),Tt&&Tt()})};Dt?Dt(it,A,x):x()}else i(it,N,X)},vt=(P,N,X,tt=!1,j=!1)=>{const{type:it,props:dt,ref:ut,children:ct,dynamicChildren:et,shapeFlag:Pt,patchFlag:C,dirs:Dt,cacheIndex:Tt}=P;if(C===-2&&(j=!1),ut!=null&&(Ni(),lo(ut,null,X,P,!0),Ui()),Tt!=null&&(N.renderCache[Tt]=void 0),Pt&256){N.ctx.deactivate(P);return}const A=Pt&1&&Dt,x=!co(P);let F;if(x&&(F=dt&&dt.onVnodeBeforeUnmount)&&Kn(F,N,P),Pt&6)ft(P.component,X,tt);else{if(Pt&128){P.suspense.unmount(X,tt);return}A&&hs(P,null,N,"beforeUnmount"),Pt&64?P.type.remove(P,N,X,$t,tt):et&&!et.hasOnce&&(it!==ei||C>0&&C&64)?V(et,N,X,!1,!0):(it===ei&&C&384||!j&&Pt&16)&&V(ct,N,X),tt&&te(P)}(x&&(F=dt&&dt.onVnodeUnmounted)||A)&&un(()=>{F&&Kn(F,N,P),A&&hs(P,null,N,"unmounted")},X)},te=P=>{const{type:N,el:X,anchor:tt,transition:j}=P;if(N===ei){pe(X,tt);return}if(N===Ia){_(P);return}const it=()=>{s(X),j&&!j.persisted&&j.afterLeave&&j.afterLeave()};if(P.shapeFlag&1&&j&&!j.persisted){const{leave:dt,delayLeave:ut}=j,ct=()=>dt(X,it);ut?ut(P.el,it,ct):ct()}else it()},pe=(P,N)=>{let X;for(;P!==N;)X=f(P),s(P),P=X;s(N)},ft=(P,N,X)=>{const{bum:tt,scope:j,job:it,subTree:dt,um:ut,m:ct,a:et}=P;Rf(ct),Rf(et),tt&&Ll(tt),j.stop(),it&&(it.flags|=8,vt(dt,P,N,X)),ut&&un(ut,N),un(()=>{P.isUnmounted=!0},N)},V=(P,N,X,tt=!1,j=!1,it=0)=>{for(let dt=it;dt<P.length;dt++)vt(P[dt],N,X,tt,j)},at=P=>{if(P.shapeFlag&6)return at(P.component.subTree);if(P.shapeFlag&128)return P.suspense.next();const N=f(P.anchor||P.el),X=N&&N[E_];return X?f(X):N};let ot=!1;const Ft=(P,N,X)=>{let tt;P==null?N._vnode&&(vt(N._vnode,null,null,!0),tt=N._vnode.component):v(N._vnode||null,P,N,null,null,null,X),N._vnode=P,ot||(ot=!0,xf(tt),ym(),ot=!1)},$t={p:v,um:vt,m:xt,r:te,mt:J,mc:S,pc:K,pbc:L,n:at,o:n};return{render:Ft,hydrate:void 0,createApp:Y_(Ft)}}function Bl({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function fs({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function lx(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function Ym(n,t,e=!1){const i=n.children,s=t.children;if(Zt(i)&&Zt(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=Ai(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&Ym(o,a)),a.type===Sl&&(a.patchFlag===-1&&(a=s[r]=Ai(a)),a.el=o.el),a.type===as&&!a.el&&(a.el=o.el)}}function cx(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function qm(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:qm(t)}function Rf(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}function $m(n){if(n.placeholder)return n.placeholder;const t=n.component;return t?$m(t.subTree):null}const Km=n=>n.__isSuspense;function ux(n,t){t&&t.pendingBranch?Zt(n)?t.effects.push(...n):t.effects.push(n):x_(n)}const ei=Symbol.for("v-fgt"),Sl=Symbol.for("v-txt"),as=Symbol.for("v-cmt"),Ia=Symbol.for("v-stc"),ho=[];let yn=null;function In(n=!1){ho.push(yn=n?null:[])}function hx(){ho.pop(),yn=ho[ho.length-1]||null}let So=1;function Cf(n,t=!1){So+=n,n<0&&yn&&t&&(yn.hasOnce=!0)}function Zm(n){return n.dynamicChildren=So>0?yn||pr:null,hx(),So>0&&yn&&yn.push(n),n}function Ci(n,t,e,i,s,r){return Zm(Ye(n,t,e,i,s,r,!0))}function Jm(n,t,e,i,s){return Zm(Rn(n,t,e,i,s,!0))}function jm(n){return n?n.__v_isVNode===!0:!1}function Br(n,t){return n.type===t.type&&n.key===t.key}const Qm=({key:n})=>n??null,Na=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?Ue(n)||Ke(n)||ne(n)?{i:ri,r:n,k:t,f:!!e}:n:null);function Ye(n,t=null,e=null,i=0,s=null,r=n===ei?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&Qm(t),ref:t&&Na(t),scopeId:Em,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:ri};return a?(Eh(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=Ue(e)?8:16),So>0&&!o&&yn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&yn.push(l),l}const Rn=fx;function fx(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===O_)&&(n=as),jm(n)){const a=Tr(n,t,!0);return e&&Eh(a,e),So>0&&!r&&yn&&(a.shapeFlag&6?yn[yn.indexOf(n)]=a:yn.push(a)),a.patchFlag=-2,a}if(Tx(n)&&(n=n.__vccOpts),t){t=dx(t);let{class:a,style:l}=t;a&&!Ue(a)&&(t.class=uh(a)),_e(l)&&(vh(l)&&!Zt(l)&&(l=Je({},l)),t.style=ch(l))}const o=Ue(n)?1:Km(n)?128:T_(n)?64:_e(n)?4:ne(n)?2:0;return Ye(n,t,e,i,s,o,r,!0)}function dx(n){return n?vh(n)||Hm(n)?Je({},n):n:null}function Tr(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?gx(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Qm(c),ref:t&&t.ref?e&&r?Zt(r)?r.concat(Na(t)):[r,Na(t)]:Na(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==ei?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Tr(n.ssContent),ssFallback:n.ssFallback&&Tr(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&Sh(u,l.clone(u)),u}function t0(n=" ",t=0){return Rn(Sl,null,n,t)}function px(n,t){const e=Rn(Ia,null,n);return e.staticCount=t,e}function mx(n="",t=!1){return t?(In(),Jm(as,null,n)):Rn(as,null,n)}function ni(n){return n==null||typeof n=="boolean"?Rn(as):Zt(n)?Rn(ei,null,n.slice()):jm(n)?Ai(n):Rn(Sl,null,String(n))}function Ai(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Tr(n)}function Eh(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Zt(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),Eh(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!Hm(t)?t._ctx=ri:s===3&&ri&&(ri.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else ne(t)?(t={default:t,_ctx:ri},e=32):(t=String(t),i&64?(e=16,t=[t0(t)]):e=8);n.children=t,n.shapeFlag|=e}function gx(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=uh([t.class,i.class]));else if(s==="style")t.style=ch([t.style,i.style]);else if(pl(s)){const r=t[s],o=i[s];o&&r!==o&&!(Zt(r)&&r.includes(o))&&(t[s]=r?[].concat(r,o):o)}else s!==""&&(t[s]=i[s])}return t}function Kn(n,t,e,i=null){hi(n,t,7,[e,i])}const _x=Um();let xx=0;function vx(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||_x,r={uid:xx++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new zg(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Vm(i,s),emitsOptions:Fm(i,s),emit:null,emitted:null,propsDefaults:be,inheritAttrs:i.inheritAttrs,ctx:be,data:be,props:be,attrs:be,slots:be,refs:be,setupState:be,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=$_.bind(null,r),n.ce&&n.ce(r),r}let sn=null;const Mx=()=>sn||ri;let Ja,qc;{const n=gl(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};Ja=t("__VUE_INSTANCE_SETTERS__",e=>sn=e),qc=t("__VUE_SSR_SETTERS__",e=>yo=e)}const Uo=n=>{const t=sn;return Ja(n),n.scope.on(),()=>{n.scope.off(),Ja(t)}},Pf=()=>{sn&&sn.scope.off(),Ja(null)};function e0(n){return n.vnode.shapeFlag&4}let yo=!1;function Sx(n,t=!1,e=!1){t&&qc(t);const{props:i,children:s}=n.vnode,r=e0(n);tx(n,i,r,t),sx(n,s,e||t);const o=r?yx(n,t):void 0;return t&&qc(!1),o}function yx(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,z_);const{setup:i}=e;if(i){Ni();const s=n.setupContext=i.length>1?Ex(n):null,r=Uo(n),o=No(i,n,0,[n.props,s]),a=Jp(o);if(Ui(),r(),(a||n.sp)&&!co(n)&&Am(n),a){if(o.then(Pf,Pf),t)return o.then(l=>{Lf(n,l)}).catch(l=>{xl(l,n,0)});n.asyncDep=o}else Lf(n,o)}else n0(n)}function Lf(n,t,e){ne(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:_e(t)&&(n.setupState=vm(t)),n0(n)}function n0(n,t,e){const i=n.type;n.render||(n.render=i.render||ai);{const s=Uo(n);Ni();try{H_(n)}finally{Ui(),s()}}}const bx={get(n,t){return qe(n,"get",""),n[t]}};function Ex(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,bx),slots:n.slots,emit:n.emit,expose:t}}function Th(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(vm(o_(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in uo)return uo[e](n)},has(t,e){return e in t||e in uo}})):n.proxy}function Tx(n){return ne(n)&&"__vccOpts"in n}const wx=(n,t)=>f_(n,t,yo),Ax="3.5.30";/**
* @vue/runtime-dom v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let $c;const Df=typeof window<"u"&&window.trustedTypes;if(Df)try{$c=Df.createPolicy("vue",{createHTML:n=>n})}catch{}const i0=$c?n=>$c.createHTML(n):n=>n,Rx="http://www.w3.org/2000/svg",Cx="http://www.w3.org/1998/Math/MathML",wi=typeof document<"u"?document:null,If=wi&&wi.createElement("template"),Px={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?wi.createElementNS(Rx,n):t==="mathml"?wi.createElementNS(Cx,n):e?wi.createElement(n,{is:e}):wi.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>wi.createTextNode(n),createComment:n=>wi.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>wi.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{If.innerHTML=i0(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=If.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},Lx=Symbol("_vtc");function Dx(n,t,e){const i=n[Lx];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const Nf=Symbol("_vod"),Ix=Symbol("_vsh"),Nx=Symbol(""),Ux=/(?:^|;)\s*display\s*:/;function Fx(n,t,e){const i=n.style,s=Ue(e);let r=!1;if(e&&!s){if(t)if(Ue(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&Ua(i,a,"")}else for(const o in t)e[o]==null&&Ua(i,o,"");for(const o in e)o==="display"&&(r=!0),Ua(i,o,e[o])}else if(s){if(t!==e){const o=i[Nx];o&&(e+=";"+o),i.cssText=e,r=Ux.test(e)}}else t&&n.removeAttribute("style");Nf in n&&(n[Nf]=r?i.display:"",n[Ix]&&(i.display="none"))}const Uf=/\s*!important$/;function Ua(n,t,e){if(Zt(e))e.forEach(i=>Ua(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))n.setProperty(t,e);else{const i=Ox(n,t);Uf.test(e)?n.setProperty(Ds(i),e.replace(Uf,""),"important"):n[i]=e}}const Ff=["Webkit","Moz","ms"],zl={};function Ox(n,t){const e=zl[t];if(e)return e;let i=On(t);if(i!=="filter"&&i in n)return zl[t]=i;i=tm(i);for(let s=0;s<Ff.length;s++){const r=Ff[s]+i;if(r in n)return zl[t]=r}return t}const Of="http://www.w3.org/1999/xlink";function Bf(n,t,e,i,s,r=Og(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(Of,t.slice(6,t.length)):n.setAttributeNS(Of,t,e):e==null||r&&!nm(e)?n.removeAttribute(t):n.setAttribute(t,r?"":ui(e)?String(e):e)}function zf(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?i0(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=nm(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function Bx(n,t,e,i){n.addEventListener(t,e,i)}function zx(n,t,e,i){n.removeEventListener(t,e,i)}const Hf=Symbol("_vei");function Hx(n,t,e,i,s=null){const r=n[Hf]||(n[Hf]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=Gx(t);if(i){const c=r[t]=Wx(i,s);Bx(n,a,c,l)}else o&&(zx(n,a,o,l),r[t]=void 0)}}const Gf=/(?:Once|Passive|Capture)$/;function Gx(n){let t;if(Gf.test(n)){t={};let i;for(;i=n.match(Gf);)n=n.slice(0,n.length-i[0].length),t[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Ds(n.slice(2)),t]}let Hl=0;const Vx=Promise.resolve(),kx=()=>Hl||(Vx.then(()=>Hl=0),Hl=Date.now());function Wx(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;hi(Xx(i,e.value),t,5,[i])};return e.value=n,e.attached=kx(),e}function Xx(n,t){if(Zt(t)){const e=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{e.call(n),n._stopped=!0},t.map(i=>s=>!s._stopped&&i&&i(s))}else return t}const Vf=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,Yx=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?Dx(n,i,o):t==="style"?Fx(n,e,i):pl(t)?oh(t)||Hx(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):qx(n,t,i,o))?(zf(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Bf(n,t,i,o,r,t!=="value")):n._isVueCE&&($x(n,t)||n._def.__asyncLoader&&(/[A-Z]/.test(t)||!Ue(i)))?zf(n,On(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),Bf(n,t,i,o))};function qx(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&Vf(t)&&ne(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&n.tagName==="IFRAME"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Vf(t)&&Ue(e)?!1:t in n}function $x(n,t){const e=n._def.props;if(!e)return!1;const i=On(t);return Array.isArray(e)?e.some(s=>On(s)===i):Object.keys(e).some(s=>On(s)===i)}const Kx=Je({patchProp:Yx},Px);let kf;function Zx(){return kf||(kf=ox(Kx))}const Jx=((...n)=>{const t=Zx().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=Qx(i);if(!s)return;const r=t._component;!ne(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,jx(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function jx(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Qx(n){return Ue(n)?document.querySelector(n):n}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wh="185",xr={ROTATE:0,DOLLY:1,PAN:2},rs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},tv=0,Wf=1,ev=2,Fa=1,nv=2,eo=3,ls=0,fn=1,Oe=2,Di=0,vr=1,ja=2,Xf=3,Yf=4,iv=5,vs=100,sv=101,rv=102,ov=103,av=104,lv=200,cv=201,uv=202,hv=203,Kc=204,Zc=205,fv=206,dv=207,pv=208,mv=209,gv=210,_v=211,xv=212,vv=213,Mv=214,Jc=0,jc=1,Qc=2,wr=3,tu=4,eu=5,nu=6,iu=7,Ah=0,Sv=1,yv=2,zn=0,s0=1,r0=2,o0=3,a0=4,l0=5,c0=6,u0=7,h0=300,As=301,Ar=302,Oa=303,Gl=304,yl=306,su=1e3,Pi=1001,ru=1002,Ve=1003,bv=1004,Go=1005,$e=1006,Vl=1007,Ss=1008,Mn=1009,f0=1010,d0=1011,bo=1012,Rh=1013,fi=1014,Un=1015,Oi=1016,Ch=1017,Ph=1018,Eo=1020,p0=35902,m0=35899,g0=1021,_0=1022,Fn=1023,Bi=1026,ys=1027,Lh=1028,Dh=1029,Rs=1030,Ih=1031,Nh=1033,Ba=33776,za=33777,Ha=33778,Ga=33779,ou=35840,au=35841,lu=35842,cu=35843,uu=36196,hu=37492,fu=37496,du=37488,pu=37489,Qa=37490,mu=37491,gu=37808,_u=37809,xu=37810,vu=37811,Mu=37812,Su=37813,yu=37814,bu=37815,Eu=37816,Tu=37817,wu=37818,Au=37819,Ru=37820,Cu=37821,Pu=36492,Lu=36494,Du=36495,Iu=36283,Nu=36284,tl=36285,Uu=36286,Ev=3200,Fu=0,Tv=1,ss="",Ee="srgb",el="srgb-linear",nl="linear",fe="srgb",zs=7680,qf=519,wv=512,Av=513,Rv=514,Uh=515,Cv=516,Pv=517,Fh=518,Lv=519,Ou=35044,$f="300 es",oi=2e3,To=2001;function Dv(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function il(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Iv(){const n=il("canvas");return n.style.display="block",n}const Kf={};function sl(...n){const t="THREE."+n.shift();console.log(t,...n)}function x0(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Xt(...n){n=x0(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function re(...n){n=x0(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Mr(...n){const t=n.join(" ");t in Kf||(Kf[t]=!0,Xt(...n))}function Nv(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const Uv={[Jc]:jc,[Qc]:nu,[tu]:iu,[wr]:eu,[jc]:Jc,[nu]:Qc,[iu]:tu,[eu]:wr};class cs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const We=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Zf=1234567;const Sr=Math.PI/180,wo=180/Math.PI;function li(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(We[n&255]+We[n>>8&255]+We[n>>16&255]+We[n>>24&255]+"-"+We[t&255]+We[t>>8&255]+"-"+We[t>>16&15|64]+We[t>>24&255]+"-"+We[e&63|128]+We[e>>8&255]+"-"+We[e>>16&255]+We[e>>24&255]+We[i&255]+We[i>>8&255]+We[i>>16&255]+We[i>>24&255]).toLowerCase()}function Qt(n,t,e){return Math.max(t,Math.min(e,n))}function Oh(n,t){return(n%t+t)%t}function Fv(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Ov(n,t,e){return n!==t?(e-n)/(t-n):0}function fo(n,t,e){return(1-e)*n+e*t}function Bv(n,t,e,i){return fo(n,t,1-Math.exp(-e*i))}function zv(n,t=1){return t-Math.abs(Oh(n,t*2)-t)}function Hv(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Gv(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Vv(n,t){return n+Math.floor(Math.random()*(t-n+1))}function kv(n,t){return n+Math.random()*(t-n)}function Wv(n){return n*(.5-Math.random())}function Xv(n){n!==void 0&&(Zf=n);let t=Zf+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Yv(n){return n*Sr}function qv(n){return n*wo}function $v(n){return(n&n-1)===0&&n!==0}function Kv(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Zv(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Jv(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),u=o((t+i)/2),h=r((t-i)/2),f=o((t-i)/2),d=r((i-t)/2),g=o((i-t)/2);switch(s){case"XYX":n.set(a*u,l*h,l*f,a*c);break;case"YZY":n.set(l*f,a*u,l*h,a*c);break;case"ZXZ":n.set(l*h,l*f,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*d,a*c);break;case"YXY":n.set(l*d,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*d,a*u,a*c);break;default:Xt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Nn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function de(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Va={DEG2RAD:Sr,RAD2DEG:wo,generateUUID:li,clamp:Qt,euclideanModulo:Oh,mapLinear:Fv,inverseLerp:Ov,lerp:fo,damp:Bv,pingpong:zv,smoothstep:Hv,smootherstep:Gv,randInt:Vv,randFloat:kv,randFloatSpread:Wv,seededRandom:Xv,degToRad:Yv,radToDeg:qv,isPowerOfTwo:$v,ceilPowerOfTwo:Kv,floorPowerOfTwo:Zv,setQuaternionFromProperEuler:Jv,normalize:de,denormalize:Nn},Qh=class Qh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Qh.prototype.isVector2=!0;let gt=Qh;class Vn{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3],f=r[o+0],d=r[o+1],g=r[o+2],v=r[o+3];if(h!==v||l!==f||c!==d||u!==g){let m=l*f+c*d+u*g+h*v;m<0&&(f=-f,d=-d,g=-g,v=-v,m=-m);let p=1-a;if(m<.9995){const M=Math.acos(m),y=Math.sin(M);p=Math.sin(p*M)/y,a=Math.sin(a*M)/y,l=l*p+f*a,c=c*p+d*a,u=u*p+g*a,h=h*p+v*a}else{l=l*p+f*a,c=c*p+d*a,u=u*p+g*a,h=h*p+v*a;const M=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=M,c*=M,u*=M,h*=M}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+u*h+l*d-c*f,t[e+1]=l*g+u*f+c*h-a*d,t[e+2]=c*g+u*d+a*f-l*h,t[e+3]=u*g-a*h-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),h=a(r/2),f=l(i/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:Xt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=i+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(i>a&&i>h){const d=2*Math.sqrt(1+i-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-i-h);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-i-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const tf=class tf{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Jf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Jf.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),h=2*(r*i-o*e);return this.x=e+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return kl.copy(this).projectOnVector(t),this.sub(kl)}reflect(t){return this.sub(kl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};tf.prototype.isVector3=!0;let D=tf;const kl=new D,Jf=new Vn,ef=class ef{constructor(t,e,i,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],d=i[5],g=i[8],v=s[0],m=s[3],p=s[6],M=s[1],y=s[4],_=s[7],T=s[2],E=s[5],R=s[8];return r[0]=o*v+a*M+l*T,r[3]=o*m+a*y+l*E,r[6]=o*p+a*_+l*R,r[1]=c*v+u*M+h*T,r[4]=c*m+u*y+h*E,r[7]=c*p+u*_+h*R,r[2]=f*v+d*M+g*T,r[5]=f*m+d*y+g*E,r[8]=f*p+d*_+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*r,d=c*r-o*l,g=e*h+i*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=h*v,t[1]=(s*c-u*i)*v,t[2]=(a*i-s*o)*v,t[3]=f*v,t[4]=(u*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(i*l-c*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return Mr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Wl.makeScale(t,e)),this}rotate(t){return Mr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Wl.makeRotation(-t)),this}translate(t,e){return Mr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Wl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};ef.prototype.isMatrix3=!0;let Kt=ef;const Wl=new Kt,jf=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qf=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jv(){const n={enabled:!0,workingColorSpace:el,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===fe&&(s.r=Ii(s.r),s.g=Ii(s.g),s.b=Ii(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===fe&&(s.r=yr(s.r),s.g=yr(s.g),s.b=yr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ss?nl:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Mr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Mr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[el]:{primaries:t,whitePoint:i,transfer:nl,toXYZ:jf,fromXYZ:Qf,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:t,whitePoint:i,transfer:fe,toXYZ:jf,fromXYZ:Qf,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}}),n}const oe=jv();function Ii(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function yr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Hs;class Qv{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Hs===void 0&&(Hs=il("canvas")),Hs.width=t.width,Hs.height=t.height;const s=Hs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Hs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=il("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ii(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ii(e[i]/255)*255):e[i]=Ii(e[i]);return{data:e,width:t.width,height:t.height}}else return Xt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let tM=0;class Bh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:tM++}),this.uuid=li(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Xl(s[o].image)):r.push(Xl(s[o]))}else r=Xl(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Xl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Qv.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Xt("Texture: Unable to serialize Texture."),{})}let eM=0;const Yl=new D;class Ze extends cs{constructor(t=Ze.DEFAULT_IMAGE,e=Ze.DEFAULT_MAPPING,i=Pi,s=Pi,r=$e,o=Ss,a=Fn,l=Mn,c=Ze.DEFAULT_ANISOTROPY,u=ss){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:eM++}),this.uuid=li(),this.name="",this.source=new Bh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Yl).x}get height(){return this.source.getSize(Yl).y}get depth(){return this.source.getSize(Yl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Xt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Xt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==h0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case su:t.x=t.x-Math.floor(t.x);break;case Pi:t.x=t.x<0?0:1;break;case ru:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case su:t.y=t.y-Math.floor(t.y);break;case Pi:t.y=t.y<0?0:1;break;case ru:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ze.DEFAULT_IMAGE=null;Ze.DEFAULT_MAPPING=h0;Ze.DEFAULT_ANISOTROPY=1;const nf=class nf{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,_=(d+1)/2,T=(p+1)/2,E=(u+f)/4,R=(h+v)/4,S=(g+m)/4;return y>_&&y>T?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=E/i,r=R/i):_>T?_<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),i=E/s,r=S/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=R/r,s=S/r),this.set(i,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(h-v)/M,this.z=(f-u)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};nf.prototype.isVector4=!0;let Ae=nf;class nM extends cs{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$e,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ae(0,0,t,e),this.scissorTest=!1,this.viewport=new Ae(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new Ze(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:$e,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Bh(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ci extends nM{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class v0 extends Ze{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class iM extends Ze{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const dl=class dl{constructor(t,e,i,s,r,o,a,l,c,u,h,f,d,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,h,f,d,g,v,m)}set(t,e,i,s,r,o,a,l,c,u,h,f,d,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new dl().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,i=t.elements,s=1/Gs.setFromMatrixColumn(t,0).length(),r=1/Gs.setFromMatrixColumn(t,1).length(),o=1/Gs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=o*u,d=o*h,g=a*u,v=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=d+g*c,e[5]=f-v*c,e[9]=-a*l,e[2]=v-f*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,d=l*h,g=c*u,v=c*h;e[0]=f+v*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=v+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,d=l*h,g=c*u,v=c*h;e[0]=f-v*a,e[4]=-o*h,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=v-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,d=o*h,g=a*u,v=a*h;e[0]=l*u,e[4]=g*c-d,e[8]=f*c+v,e[1]=l*h,e[5]=v*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,g=a*l,v=a*c;e[0]=l*u,e[4]=v-f*h,e[8]=g*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*h+g,e[10]=f-v*h}else if(t.order==="XZY"){const f=o*l,d=o*c,g=a*l,v=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+v,e[5]=o*u,e[9]=d*h-g,e[2]=g*h-d,e[6]=a*u,e[10]=v*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(sM,t,rM)}lookAt(t,e,i){const s=this.elements;return mn.subVectors(t,e),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),Xi.crossVectors(i,mn),Xi.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),Xi.crossVectors(i,mn)),Xi.normalize(),Vo.crossVectors(mn,Xi),s[0]=Xi.x,s[4]=Vo.x,s[8]=mn.x,s[1]=Xi.y,s[5]=Vo.y,s[9]=mn.y,s[2]=Xi.z,s[6]=Vo.z,s[10]=mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],d=i[13],g=i[2],v=i[6],m=i[10],p=i[14],M=i[3],y=i[7],_=i[11],T=i[15],E=s[0],R=s[4],S=s[8],w=s[12],L=s[1],I=s[5],U=s[9],q=s[13],J=s[2],H=s[6],Y=s[10],z=s[14],K=s[3],rt=s[7],pt=s[11],xt=s[15];return r[0]=o*E+a*L+l*J+c*K,r[4]=o*R+a*I+l*H+c*rt,r[8]=o*S+a*U+l*Y+c*pt,r[12]=o*w+a*q+l*z+c*xt,r[1]=u*E+h*L+f*J+d*K,r[5]=u*R+h*I+f*H+d*rt,r[9]=u*S+h*U+f*Y+d*pt,r[13]=u*w+h*q+f*z+d*xt,r[2]=g*E+v*L+m*J+p*K,r[6]=g*R+v*I+m*H+p*rt,r[10]=g*S+v*U+m*Y+p*pt,r[14]=g*w+v*q+m*z+p*xt,r[3]=M*E+y*L+_*J+T*K,r[7]=M*R+y*I+_*H+T*rt,r[11]=M*S+y*U+_*Y+T*pt,r[15]=M*w+y*q+_*z+T*xt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],d=t[14],g=t[3],v=t[7],m=t[11],p=t[15],M=l*d-c*f,y=a*d-c*h,_=a*f-l*h,T=o*d-c*u,E=o*f-l*u,R=o*h-a*u;return e*(v*M-m*y+p*_)-i*(g*M-m*T+p*E)+s*(g*y-v*T+p*R)-r*(g*_-v*E+m*R)}determinantAffine(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],u=t[10];return e*(o*u-a*c)-i*(r*u-a*l)+s*(r*c-o*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],d=t[11],g=t[12],v=t[13],m=t[14],p=t[15],M=e*a-i*o,y=e*l-s*o,_=e*c-r*o,T=i*l-s*a,E=i*c-r*a,R=s*c-r*l,S=u*v-h*g,w=u*m-f*g,L=u*p-d*g,I=h*m-f*v,U=h*p-d*v,q=f*p-d*m,J=M*q-y*U+_*I+T*L-E*w+R*S;if(J===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/J;return t[0]=(a*q-l*U+c*I)*H,t[1]=(s*U-i*q-r*I)*H,t[2]=(v*R-m*E+p*T)*H,t[3]=(f*E-h*R-d*T)*H,t[4]=(l*L-o*q-c*w)*H,t[5]=(e*q-s*L+r*w)*H,t[6]=(m*_-g*R-p*y)*H,t[7]=(u*R-f*_+d*y)*H,t[8]=(o*U-a*L+c*S)*H,t[9]=(i*L-e*U-r*S)*H,t[10]=(g*E-v*_+p*M)*H,t[11]=(h*_-u*E-d*M)*H,t[12]=(a*w-o*I-l*S)*H,t[13]=(e*I-i*w+s*S)*H,t[14]=(v*y-g*T-m*M)*H,t[15]=(u*T-h*y+f*M)*H,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,h=a+a,f=r*c,d=r*u,g=r*h,v=o*u,m=o*h,p=a*h,M=l*c,y=l*u,_=l*h,T=i.x,E=i.y,R=i.z;return s[0]=(1-(v+p))*T,s[1]=(d+_)*T,s[2]=(g-y)*T,s[3]=0,s[4]=(d-_)*E,s[5]=(1-(f+p))*E,s[6]=(m+M)*E,s[7]=0,s[8]=(g+y)*R,s[9]=(m-M)*R,s[10]=(1-(f+v))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let o=Gs.set(s[0],s[1],s[2]).length();const a=Gs.set(s[4],s[5],s[6]).length(),l=Gs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Cn.copy(this);const c=1/o,u=1/a,h=1/l;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=u,Cn.elements[5]*=u,Cn.elements[6]*=u,Cn.elements[8]*=h,Cn.elements[9]*=h,Cn.elements[10]*=h,e.setFromRotationMatrix(Cn),i.x=o,i.y=a,i.z=l,this}makePerspective(t,e,i,s,r,o,a=oi,l=!1){const c=this.elements,u=2*r/(e-t),h=2*r/(i-s),f=(e+t)/(e-t),d=(i+s)/(i-s);let g,v;if(l)g=r/(o-r),v=o*r/(o-r);else if(a===oi)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===To)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=oi,l=!1){const c=this.elements,u=2/(e-t),h=2/(i-s),f=-(e+t)/(e-t),d=-(i+s)/(i-s);let g,v;if(l)g=1/(o-r),v=o/(o-r);else if(a===oi)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===To)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};dl.prototype.isMatrix4=!0;let se=dl;const Gs=new D,Cn=new se,sM=new D(0,0,0),rM=new D(1,1,1),Xi=new D,Vo=new D,mn=new D,td=new se,ed=new Vn;class kn{constructor(t=0,e=0,i=0,s=kn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Qt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Xt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return td.makeRotationFromQuaternion(t),this.setFromRotationMatrix(td,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ed.setFromEuler(this),this.setFromQuaternion(ed,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kn.DEFAULT_ORDER="XYZ";class zh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let oM=0;const nd=new D,Vs=new Vn,_i=new se,ko=new D,zr=new D,aM=new D,lM=new Vn,id=new D(1,0,0),sd=new D(0,1,0),rd=new D(0,0,1),od={type:"added"},cM={type:"removed"},ks={type:"childadded",child:null},ql={type:"childremoved",child:null};class Ie extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:oM++}),this.uuid=li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ie.DEFAULT_UP.clone();const t=new D,e=new kn,i=new Vn,s=new D(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new Kt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=Ie.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Vs.setFromAxisAngle(t,e),this.quaternion.multiply(Vs),this}rotateOnWorldAxis(t,e){return Vs.setFromAxisAngle(t,e),this.quaternion.premultiply(Vs),this}rotateX(t){return this.rotateOnAxis(id,t)}rotateY(t){return this.rotateOnAxis(sd,t)}rotateZ(t){return this.rotateOnAxis(rd,t)}translateOnAxis(t,e){return nd.copy(t).applyQuaternion(this.quaternion),this.position.add(nd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(id,t)}translateY(t){return this.translateOnAxis(sd,t)}translateZ(t){return this.translateOnAxis(rd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ko.copy(t):ko.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),zr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(zr,ko,this.up):_i.lookAt(ko,zr,this.up),this.quaternion.setFromRotationMatrix(_i),s&&(_i.extractRotation(s.matrixWorld),Vs.setFromRotationMatrix(_i),this.quaternion.premultiply(Vs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(re("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(od),ks.child=t,this.dispatchEvent(ks),ks.child=null):re("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(cM),ql.child=t,this.dispatchEvent(ql),ql.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_i.multiply(t.parent.matrixWorld)),t.applyMatrix4(_i),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(od),ks.child=t,this.dispatchEvent(ks),ks.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zr,t,aM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zr,lM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Ie.DEFAULT_UP=new D(0,1,0);Ie.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class we extends Ie{constructor(){super(),this.isGroup=!0,this.type="Group"}}const uM={type:"move"};class $l{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new we,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new we,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new we,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(uM)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new we;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const M0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yi={h:0,s:0,l:0},Wo={h:0,s:0,l:0};function Kl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Bt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=i,oe.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=oe.workingColorSpace){if(t=Oh(t,1),e=Qt(e,0,1),i=Qt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Kl(o,r,t+1/3),this.g=Kl(o,r,t),this.b=Kl(o,r,t-1/3)}return oe.colorSpaceToWorking(this,s),this}setStyle(t,e=Ee){function i(r){r!==void 0&&parseFloat(r)<1&&Xt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Xt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Xt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){const i=M0[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Xt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ii(t.r),this.g=Ii(t.g),this.b=Ii(t.b),this}copyLinearToSRGB(t){return this.r=yr(t.r),this.g=yr(t.g),this.b=yr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return oe.workingToColorSpace(Xe.copy(this),t),Math.round(Qt(Xe.r*255,0,255))*65536+Math.round(Qt(Xe.g*255,0,255))*256+Math.round(Qt(Xe.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace(Xe.copy(this),e);const i=Xe.r,s=Xe.g,r=Xe.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace(Xe.copy(this),e),t.r=Xe.r,t.g=Xe.g,t.b=Xe.b,t}getStyle(t=Ee){oe.workingToColorSpace(Xe.copy(this),t);const e=Xe.r,i=Xe.g,s=Xe.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Yi),this.setHSL(Yi.h+t,Yi.s+e,Yi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Yi),t.getHSL(Wo);const i=fo(Yi.h,Wo.h,e),s=fo(Yi.s,Wo.s,e),r=fo(Yi.l,Wo.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xe=new Bt;Bt.NAMES=M0;class Hh{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Bt(t),this.near=e,this.far=i}clone(){return new Hh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class hM extends Ie{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Pn=new D,xi=new D,Zl=new D,vi=new D,Ws=new D,Xs=new D,ad=new D,Jl=new D,jl=new D,Ql=new D,tc=new Ae,ec=new Ae,nc=new Ae;class Sn{constructor(t=new D,e=new D,i=new D){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Pn.subVectors(t,e),s.cross(Pn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Pn.subVectors(s,e),xi.subVectors(i,e),Zl.subVectors(t,e);const o=Pn.dot(Pn),a=Pn.dot(xi),l=Pn.dot(Zl),c=xi.dot(xi),u=xi.dot(Zl),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,g=(o*u-a*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,vi)===null?!1:vi.x>=0&&vi.y>=0&&vi.x+vi.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,vi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vi.x),l.addScaledVector(o,vi.y),l.addScaledVector(a,vi.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return tc.setScalar(0),ec.setScalar(0),nc.setScalar(0),tc.fromBufferAttribute(t,e),ec.fromBufferAttribute(t,i),nc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(tc,r.x),o.addScaledVector(ec,r.y),o.addScaledVector(nc,r.z),o}static isFrontFacing(t,e,i,s){return Pn.subVectors(i,e),xi.subVectors(t,e),Pn.cross(xi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pn.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),Pn.cross(xi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Sn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Ws.subVectors(s,i),Xs.subVectors(r,i),Jl.subVectors(t,i);const l=Ws.dot(Jl),c=Xs.dot(Jl);if(l<=0&&c<=0)return e.copy(i);jl.subVectors(t,s);const u=Ws.dot(jl),h=Xs.dot(jl);if(u>=0&&h<=u)return e.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(Ws,o);Ql.subVectors(t,r);const d=Ws.dot(Ql),g=Xs.dot(Ql);if(g>=0&&d<=g)return e.copy(r);const v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Xs,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return ad.subVectors(r,s),a=(h-u)/(h-u+(d-g)),e.copy(s).addScaledVector(ad,a);const p=1/(m+v+f);return o=v*p,a=f*p,e.copy(i).addScaledVector(Ws,o).addScaledVector(Xs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Is{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Ln):Ln.fromBufferAttribute(r,o),Ln.applyMatrix4(t.matrixWorld),this.expandByPoint(Ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Xo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xo.copy(i.boundingBox)),Xo.applyMatrix4(t.matrixWorld),this.union(Xo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ln),Ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Hr),Yo.subVectors(this.max,Hr),Ys.subVectors(t.a,Hr),qs.subVectors(t.b,Hr),$s.subVectors(t.c,Hr),qi.subVectors(qs,Ys),$i.subVectors($s,qs),ds.subVectors(Ys,$s);let e=[0,-qi.z,qi.y,0,-$i.z,$i.y,0,-ds.z,ds.y,qi.z,0,-qi.x,$i.z,0,-$i.x,ds.z,0,-ds.x,-qi.y,qi.x,0,-$i.y,$i.x,0,-ds.y,ds.x,0];return!ic(e,Ys,qs,$s,Yo)||(e=[1,0,0,0,1,0,0,0,1],!ic(e,Ys,qs,$s,Yo))?!1:(qo.crossVectors(qi,$i),e=[qo.x,qo.y,qo.z],ic(e,Ys,qs,$s,Yo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Mi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Mi=[new D,new D,new D,new D,new D,new D,new D,new D],Ln=new D,Xo=new Is,Ys=new D,qs=new D,$s=new D,qi=new D,$i=new D,ds=new D,Hr=new D,Yo=new D,qo=new D,ps=new D;function ic(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){ps.fromArray(n,r);const a=s.x*Math.abs(ps.x)+s.y*Math.abs(ps.y)+s.z*Math.abs(ps.z),l=t.dot(ps),c=e.dot(ps),u=i.dot(ps);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ne=new D,$o=new gt;let fM=0;class dn extends cs{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:fM++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ou,this.updateRanges=[],this.gpuType=Un,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)$o.fromBufferAttribute(this,e),$o.applyMatrix3(t),this.setXY(e,$o.x,$o.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix3(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Nn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=de(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Nn(e,this.array)),e}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Nn(e,this.array)),e}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Nn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Nn(e,this.array)),e}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),i=de(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),i=de(i,this.array),s=de(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),i=de(i,this.array),s=de(s,this.array),r=de(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ou&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class S0 extends dn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class y0 extends dn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class he extends dn{constructor(t,e,i){super(new Float32Array(t),e,i)}}const dM=new Is,Gr=new D,sc=new D;class Nr{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):dM.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gr.subVectors(t,this.center);const e=Gr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Gr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(sc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gr.copy(t.center).add(sc)),this.expandByPoint(Gr.copy(t.center).sub(sc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let pM=0;const Tn=new se,rc=new Ie,Ks=new D,gn=new Is,Vr=new Is,Ge=new D;class He extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pM++}),this.uuid=li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Dv(t)?y0:S0)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Kt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Tn.makeRotationFromQuaternion(t),this.applyMatrix4(Tn),this}rotateX(t){return Tn.makeRotationX(t),this.applyMatrix4(Tn),this}rotateY(t){return Tn.makeRotationY(t),this.applyMatrix4(Tn),this}rotateZ(t){return Tn.makeRotationZ(t),this.applyMatrix4(Tn),this}translate(t,e,i){return Tn.makeTranslation(t,e,i),this.applyMatrix4(Tn),this}scale(t,e,i){return Tn.makeScale(t,e,i),this.applyMatrix4(Tn),this}lookAt(t){return rc.lookAt(t),rc.updateMatrix(),this.applyMatrix4(rc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ks).negate(),this.translate(Ks.x,Ks.y,Ks.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new he(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Xt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Is);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){re("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];gn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ge.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Ge),Ge.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Ge)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&re('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){re("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const i=this.boundingSphere.center;if(gn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Vr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ge.addVectors(gn.min,Vr.min),gn.expandByPoint(Ge),Ge.addVectors(gn.max,Vr.max),gn.expandByPoint(Ge)):(gn.expandByPoint(Vr.min),gn.expandByPoint(Vr.max))}gn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ge.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ge));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ge.fromBufferAttribute(a,c),l&&(Ks.fromBufferAttribute(t,c),Ge.add(Ks)),s=Math.max(s,i.distanceToSquared(Ge))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&re('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){re("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new dn(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let S=0;S<i.count;S++)a[S]=new D,l[S]=new D;const c=new D,u=new D,h=new D,f=new gt,d=new gt,g=new gt,v=new D,m=new D;function p(S,w,L){c.fromBufferAttribute(i,S),u.fromBufferAttribute(i,w),h.fromBufferAttribute(i,L),f.fromBufferAttribute(r,S),d.fromBufferAttribute(r,w),g.fromBufferAttribute(r,L),u.sub(c),h.sub(c),d.sub(f),g.sub(f);const I=1/(d.x*g.y-g.x*d.y);isFinite(I)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(I),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(I),a[S].add(v),a[w].add(v),a[L].add(v),l[S].add(m),l[w].add(m),l[L].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let S=0,w=M.length;S<w;++S){const L=M[S],I=L.start,U=L.count;for(let q=I,J=I+U;q<J;q+=3)p(t.getX(q+0),t.getX(q+1),t.getX(q+2))}const y=new D,_=new D,T=new D,E=new D;function R(S){T.fromBufferAttribute(s,S),E.copy(T);const w=a[S];y.copy(w),y.sub(T.multiplyScalar(T.dot(w))).normalize(),_.crossVectors(E,w);const I=_.dot(l[S])<0?-1:1;o.setXYZW(S,y.x,y.y,y.z,I)}for(let S=0,w=M.length;S<w;++S){const L=M[S],I=L.start,U=L.count;for(let q=I,J=I+U;q<J;q+=3)R(t.getX(q+0)),R(t.getX(q+1)),R(t.getX(q+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new dn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new D,r=new D,o=new D,a=new D,l=new D,c=new D,u=new D,h=new D;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ge.fromBufferAttribute(t,e),Ge.normalize(),t.setXYZ(e,Ge.x,Ge.y,Ge.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?d=l[v]*a.data.stride+a.offset:d=l[v]*u;for(let p=0;p<u;p++)f[g++]=c[d++]}return new dn(f,u,h)}if(this.index===null)return Xt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new He,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=t(f,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mM{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ou,this.updateRanges=[],this.version=0,this.uuid=li()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=li()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=li()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const je=new D;class rl{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Nn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=de(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Nn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Nn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Nn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Nn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),i=de(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),i=de(i,this.array),s=de(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),i=de(i,this.array),s=de(s,this.array),r=de(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){sl("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new dn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new rl(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){sl("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let gM=0;class Ns extends cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gM++}),this.uuid=li(),this.name="",this.type="Material",this.blending=vr,this.side=ls,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Kc,this.blendDst=Zc,this.blendEquation=vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zs,this.stencilZFail=zs,this.stencilZPass=zs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Xt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Xt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==vr&&(i.blending=this.blending),this.side!==ls&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Kc&&(i.blendSrc=this.blendSrc),this.blendDst!==Zc&&(i.blendDst=this.blendDst),this.blendEquation!==vs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==wr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==qf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==zs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==zs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Bt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new gt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new gt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class b0 extends Ns{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Bt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Zs;const kr=new D,Js=new D,js=new D,Qs=new gt,Wr=new gt,E0=new se,Ko=new D,Xr=new D,Zo=new D,ld=new gt,oc=new gt,cd=new gt;class _M extends Ie{constructor(t=new b0){if(super(),this.isSprite=!0,this.type="Sprite",Zs===void 0){Zs=new He;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new mM(e,5);Zs.setIndex([0,1,2,0,2,3]),Zs.setAttribute("position",new rl(i,3,0,!1)),Zs.setAttribute("uv",new rl(i,2,3,!1))}this.geometry=Zs,this.material=t,this.center=new gt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&re('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Js.setFromMatrixScale(this.matrixWorld),E0.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),js.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Js.multiplyScalar(-js.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;Jo(Ko.set(-.5,-.5,0),js,o,Js,s,r),Jo(Xr.set(.5,-.5,0),js,o,Js,s,r),Jo(Zo.set(.5,.5,0),js,o,Js,s,r),ld.set(0,0),oc.set(1,0),cd.set(1,1);let a=t.ray.intersectTriangle(Ko,Xr,Zo,!1,kr);if(a===null&&(Jo(Xr.set(-.5,.5,0),js,o,Js,s,r),oc.set(0,1),a=t.ray.intersectTriangle(Ko,Zo,Xr,!1,kr),a===null))return;const l=t.ray.origin.distanceTo(kr);l<t.near||l>t.far||e.push({distance:l,point:kr.clone(),uv:Sn.getInterpolation(kr,Ko,Xr,Zo,ld,oc,cd,new gt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Jo(n,t,e,i,s,r){Qs.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(Wr.x=r*Qs.x-s*Qs.y,Wr.y=s*Qs.x+r*Qs.y):Wr.copy(Qs),n.copy(t),n.x+=Wr.x,n.y+=Wr.y,n.applyMatrix4(E0)}const Si=new D,ac=new D,jo=new D,Ki=new D,lc=new D,Qo=new D,cc=new D;class bl{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Si)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Si.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Si.copy(this.origin).addScaledVector(this.direction,e),Si.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){ac.copy(t).add(e).multiplyScalar(.5),jo.copy(e).sub(t).normalize(),Ki.copy(this.origin).sub(ac);const r=t.distanceTo(e)*.5,o=-this.direction.dot(jo),a=Ki.dot(this.direction),l=-Ki.dot(jo),c=Ki.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*l-a,f=o*a-l,g=r*u,h>=0)if(f>=-g)if(f<=g){const v=1/u;h*=v,f*=v,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ac).addScaledVector(jo,f),d}intersectSphere(t,e){Si.subVectors(t.center,this.origin);const i=Si.dot(this.direction),s=Si.dot(Si)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Si)!==null}intersectTriangle(t,e,i,s,r){lc.subVectors(e,t),Qo.subVectors(i,t),cc.crossVectors(lc,Qo);let o=this.direction.dot(cc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ki.subVectors(this.origin,t);const l=a*this.direction.dot(Qo.crossVectors(Ki,Qo));if(l<0)return null;const c=a*this.direction.dot(lc.cross(Ki));if(c<0||l+c>o)return null;const u=-a*Ki.dot(cc);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class le extends Ns{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Ah,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ud=new se,ms=new bl,ta=new Nr,hd=new D,ea=new D,na=new D,ia=new D,uc=new D,sa=new D,fd=new D,ra=new D;class St extends Ie{constructor(t=new He,e=new le){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){sa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(uc.fromBufferAttribute(h,t),o?sa.addScaledVector(uc,u):sa.addScaledVector(uc.sub(e),u))}e.add(sa)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ta.copy(i.boundingSphere),ta.applyMatrix4(r),ms.copy(t.ray).recast(t.near),!(ta.containsPoint(ms.origin)===!1&&(ms.intersectSphere(ta,hd)===null||ms.origin.distanceToSquared(hd)>(t.far-t.near)**2))&&(ud.copy(r).invert(),ms.copy(t.ray).applyMatrix4(ud),!(i.boundingBox!==null&&ms.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ms)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let _=M,T=y;_<T;_+=3){const E=a.getX(_),R=a.getX(_+1),S=a.getX(_+2);s=oa(this,p,t,i,c,u,h,E,R,S),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const M=a.getX(m),y=a.getX(m+1),_=a.getX(m+2);s=oa(this,o,t,i,c,u,h,M,y,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let _=M,T=y;_<T;_+=3){const E=_,R=_+1,S=_+2;s=oa(this,p,t,i,c,u,h,E,R,S),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const M=m,y=m+1,_=m+2;s=oa(this,o,t,i,c,u,h,M,y,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function xM(n,t,e,i,s,r,o,a){let l;if(t.side===fn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===ls,a),l===null)return null;ra.copy(a),ra.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(ra);return c<e.near||c>e.far?null:{distance:c,point:ra.clone(),object:n}}function oa(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,ea),n.getVertexPosition(l,na),n.getVertexPosition(c,ia);const u=xM(n,t,e,i,ea,na,ia,fd);if(u){const h=new D;Sn.getBarycoord(fd,ea,na,ia,h),s&&(u.uv=Sn.getInterpolatedAttribute(s,a,l,c,h,new gt)),r&&(u.uv1=Sn.getInterpolatedAttribute(r,a,l,c,h,new gt)),o&&(u.normal=Sn.getInterpolatedAttribute(o,a,l,c,h,new D),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new D,materialIndex:0};Sn.getNormal(ea,na,ia,f.normal),u.face=f,u.barycoord=h}return u}class T0 extends Ze{constructor(t=null,e=1,i=1,s,r,o,a,l,c=Ve,u=Ve,h,f){super(null,o,a,l,c,u,s,r,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bu extends dn{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const tr=new se,dd=new se,aa=[],pd=new Is,vM=new se,Yr=new St,qr=new Nr;class w0 extends St{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Bu(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,vM)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Is),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,tr),pd.copy(t.boundingBox).applyMatrix4(tr),this.boundingBox.union(pd)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Nr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,tr),qr.copy(t.boundingSphere).applyMatrix4(tr),this.boundingSphere.union(qr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(Yr.geometry=this.geometry,Yr.material=this.material,Yr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qr.copy(this.boundingSphere),qr.applyMatrix4(i),t.ray.intersectsSphere(qr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,tr),dd.multiplyMatrices(i,tr),Yr.matrixWorld=dd,Yr.raycast(t,aa);for(let o=0,a=aa.length;o<a;o++){const l=aa[o];l.instanceId=r,l.object=this,e.push(l)}aa.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Bu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new T0(new Float32Array(s*this.count),s,this.count,Lh,Un));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;return r[l]=a,r.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const hc=new D,MM=new D,SM=new Kt;class ns{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=hc.subVectors(i,e).cross(MM.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(hc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||SM.getNormalMatrix(t),s=this.coplanarPoint(hc).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gs=new Nr,yM=new gt(.5,.5),la=new D;class Gh{constructor(t=new ns,e=new ns,i=new ns,s=new ns,r=new ns,o=new ns){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=oi,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],h=r[5],f=r[6],d=r[7],g=r[8],v=r[9],m=r[10],p=r[11],M=r[12],y=r[13],_=r[14],T=r[15];if(s[0].setComponents(c-o,d-u,p-g,T-M).normalize(),s[1].setComponents(c+o,d+u,p+g,T+M).normalize(),s[2].setComponents(c+a,d+h,p+v,T+y).normalize(),s[3].setComponents(c-a,d-h,p-v,T-y).normalize(),i)s[4].setComponents(l,f,m,_).normalize(),s[5].setComponents(c-l,d-f,p-m,T-_).normalize();else if(s[4].setComponents(c-l,d-f,p-m,T-_).normalize(),e===oi)s[5].setComponents(c+l,d+f,p+m,T+_).normalize();else if(e===To)s[5].setComponents(l,f,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),gs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),gs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(gs)}intersectsSprite(t){gs.center.set(0,0,0);const e=yM.distanceTo(t.center);return gs.radius=.7071067811865476+e,gs.applyMatrix4(t.matrixWorld),this.intersectsSphere(gs)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(la.x=s.normal.x>0?t.max.x:t.min.x,la.y=s.normal.y>0?t.max.y:t.min.y,la.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(la)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class A0 extends Ns{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Bt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ol=new D,al=new D,md=new se,$r=new bl,ca=new Nr,fc=new D,gd=new D;class bM extends Ie{constructor(t=new He,e=new A0){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)ol.fromBufferAttribute(e,s-1),al.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=ol.distanceTo(al);t.setAttribute("lineDistance",new he(i,1))}else Xt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ca.copy(i.boundingSphere),ca.applyMatrix4(s),ca.radius+=r,t.ray.intersectsSphere(ca)===!1)return;md.copy(s).invert(),$r.copy(t.ray).applyMatrix4(md);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=d,m=g-1;v<m;v+=c){const p=u.getX(v),M=u.getX(v+1),y=ua(this,t,$r,l,p,M,v);y&&e.push(y)}if(this.isLineLoop){const v=u.getX(g-1),m=u.getX(d),p=ua(this,t,$r,l,v,m,g-1);p&&e.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let v=d,m=g-1;v<m;v+=c){const p=ua(this,t,$r,l,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){const v=ua(this,t,$r,l,g-1,d,g-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ua(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(ol.fromBufferAttribute(a,s),al.fromBufferAttribute(a,r),e.distanceSqToSegment(ol,al,fc,gd)>i)return;fc.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(fc);if(!(c<t.near||c>t.far))return{distance:c,point:gd.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const _d=new D,xd=new D;class EM extends bM{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)_d.fromBufferAttribute(e,s),xd.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+_d.distanceTo(xd);t.setAttribute("lineDistance",new he(i,1))}else Xt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class R0 extends Ze{constructor(t=[],e=As,i,s,r,o,a,l,c,u){super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ln extends Ze{constructor(t,e,i,s,r,o,a,l,c){super(t,e,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Rr extends Ze{constructor(t,e,i=fi,s,r,o,a=Ve,l=Ve,c,u=Bi,h=1){if(u!==Bi&&u!==ys)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:h};super(f,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Bh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class TM extends Rr{constructor(t,e=fi,i=As,s,r,o=Ve,a=Ve,l,c=Bi){const u={width:t,height:t,depth:1},h=[u,u,u,u,u,u];super(t,t,e,i,s,r,o,a,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class C0 extends Ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Lt extends He{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(u,3)),this.setAttribute("uv",new he(h,2));function g(v,m,p,M,y,_,T,E,R,S,w){const L=_/R,I=T/S,U=_/2,q=T/2,J=E/2,H=R+1,Y=S+1;let z=0,K=0;const rt=new D;for(let pt=0;pt<Y;pt++){const xt=pt*I-q;for(let vt=0;vt<H;vt++){const te=vt*L-U;rt[v]=te*M,rt[m]=xt*y,rt[p]=J,c.push(rt.x,rt.y,rt.z),rt[v]=0,rt[m]=0,rt[p]=E>0?1:-1,u.push(rt.x,rt.y,rt.z),h.push(vt/R),h.push(1-pt/S),z+=1}}for(let pt=0;pt<S;pt++)for(let xt=0;xt<R;xt++){const vt=f+xt+H*pt,te=f+xt+H*(pt+1),pe=f+(xt+1)+H*(pt+1),ft=f+(xt+1)+H*pt;l.push(vt,te,ft),l.push(te,pe,ft),K+=6}a.addGroup(d,K,w),d+=K,f+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Vh extends He{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new D,u=new gt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=e;h++,f+=3){const d=i+h/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/t+1)/2,u.y=(o[f+1]/t+1)/2,l.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new he(o,3)),this.setAttribute("normal",new he(a,3)),this.setAttribute("uv",new he(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vh(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Wn extends He{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],f=[],d=[];let g=0;const v=[],m=i/2;let p=0;M(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new he(h,3)),this.setAttribute("normal",new he(f,3)),this.setAttribute("uv",new he(d,2));function M(){const _=new D,T=new D;let E=0;const R=(e-t)/i;for(let S=0;S<=r;S++){const w=[],L=S/r,I=L*(e-t)+t;for(let U=0;U<=s;U++){const q=U/s,J=q*l+a,H=Math.sin(J),Y=Math.cos(J);T.x=I*H,T.y=-L*i+m,T.z=I*Y,h.push(T.x,T.y,T.z),_.set(H,R,Y).normalize(),f.push(_.x,_.y,_.z),d.push(q,1-L),w.push(g++)}v.push(w)}for(let S=0;S<s;S++)for(let w=0;w<r;w++){const L=v[w][S],I=v[w+1][S],U=v[w+1][S+1],q=v[w][S+1];(t>0||w!==0)&&(u.push(L,I,q),E+=3),(e>0||w!==r-1)&&(u.push(I,U,q),E+=3)}c.addGroup(p,E,0),p+=E}function y(_){const T=g,E=new gt,R=new D;let S=0;const w=_===!0?t:e,L=_===!0?1:-1;for(let U=1;U<=s;U++)h.push(0,m*L,0),f.push(0,L,0),d.push(.5,.5),g++;const I=g;for(let U=0;U<=s;U++){const J=U/s*l+a,H=Math.cos(J),Y=Math.sin(J);R.x=w*Y,R.y=m*L,R.z=w*H,h.push(R.x,R.y,R.z),f.push(0,L,0),E.x=H*.5+.5,E.y=Y*.5*L+.5,d.push(E.x,E.y),g++}for(let U=0;U<s;U++){const q=T+U,J=I+U;_===!0?u.push(J,J+1,q):u.push(J+1,J,q),S+=3}c.addGroup(p,S,_===!0?1:2),p+=S}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class kh extends He{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],o=[];a(s),c(i),u(),this.setAttribute("position",new he(r,3)),this.setAttribute("normal",new he(r.slice(),3)),this.setAttribute("uv",new he(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const y=new D,_=new D,T=new D;for(let E=0;E<e.length;E+=3)d(e[E+0],y),d(e[E+1],_),d(e[E+2],T),l(y,_,T,M)}function l(M,y,_,T){const E=T+1,R=[];for(let S=0;S<=E;S++){R[S]=[];const w=M.clone().lerp(_,S/E),L=y.clone().lerp(_,S/E),I=E-S;for(let U=0;U<=I;U++)U===0&&S===E?R[S][U]=w:R[S][U]=w.clone().lerp(L,U/I)}for(let S=0;S<E;S++)for(let w=0;w<2*(E-S)-1;w++){const L=Math.floor(w/2);w%2===0?(f(R[S][L+1]),f(R[S+1][L]),f(R[S][L])):(f(R[S][L+1]),f(R[S+1][L+1]),f(R[S+1][L]))}}function c(M){const y=new D;for(let _=0;_<r.length;_+=3)y.x=r[_+0],y.y=r[_+1],y.z=r[_+2],y.normalize().multiplyScalar(M),r[_+0]=y.x,r[_+1]=y.y,r[_+2]=y.z}function u(){const M=new D;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];const _=m(M)/2/Math.PI+.5,T=p(M)/Math.PI+.5;o.push(_,1-T)}g(),h()}function h(){for(let M=0;M<o.length;M+=6){const y=o[M+0],_=o[M+2],T=o[M+4],E=Math.max(y,_,T),R=Math.min(y,_,T);E>.9&&R<.1&&(y<.2&&(o[M+0]+=1),_<.2&&(o[M+2]+=1),T<.2&&(o[M+4]+=1))}}function f(M){r.push(M.x,M.y,M.z)}function d(M,y){const _=M*3;y.x=t[_+0],y.y=t[_+1],y.z=t[_+2]}function g(){const M=new D,y=new D,_=new D,T=new D,E=new gt,R=new gt,S=new gt;for(let w=0,L=0;w<r.length;w+=9,L+=6){M.set(r[w+0],r[w+1],r[w+2]),y.set(r[w+3],r[w+4],r[w+5]),_.set(r[w+6],r[w+7],r[w+8]),E.set(o[L+0],o[L+1]),R.set(o[L+2],o[L+3]),S.set(o[L+4],o[L+5]),T.copy(M).add(y).add(_).divideScalar(3);const I=m(T);v(E,L+0,M,I),v(R,L+2,y,I),v(S,L+4,_,I)}}function v(M,y,_,T){T<0&&M.x===1&&(o[y]=M.x-1),_.x===0&&_.z===0&&(o[y]=T/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kh(t.vertices,t.indices,t.radius,t.detail)}}const ha=new D,fa=new D,dc=new D,da=new Sn;class P0 extends He{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(Sr*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),f={},d=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:v,b:m,c:p}=da;if(v.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),da.getNormal(dc),h[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,h[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,h[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let M=0;M<3;M++){const y=(M+1)%3,_=h[M],T=h[y],E=da[u[M]],R=da[u[y]],S=`${_}_${T}`,w=`${T}_${_}`;w in f&&f[w]?(dc.dot(f[w].normal)<=r&&(d.push(E.x,E.y,E.z),d.push(R.x,R.y,R.z)),f[w]=null):S in f||(f[S]={index0:c[M],index1:c[y],normal:dc.clone()})}}for(const g in f)if(f[g]){const{index0:v,index1:m}=f[g];ha.fromBufferAttribute(a,v),fa.fromBufferAttribute(a,m),d.push(ha.x,ha.y,ha.z),d.push(fa.x,fa.y,fa.z)}this.setAttribute("position",new he(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class mi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Xt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const u=i[s],f=i[s+1]-u,d=(o-u)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new gt:new D);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new D,s=[],r=[],o=[],a=new D,l=new se;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new D)}r[0]=new D,o[0]=new D;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Qt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Qt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Wh extends mi{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new gt){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class wM extends Wh{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Xh(){let n=0,t=0,e=0,i=0;function s(r,o,a,l){n=r,t=a,e=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let f=(o-r)/c-(a-r)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const vd=new D,Md=new D,pc=new Xh,mc=new Xh,gc=new Xh;class AM extends mi{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new D){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(Md.subVectors(s[0],s[1]).add(s[0]),c=Md);const h=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(vd.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=vd),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),d),v=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),pc.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,g,v,m),mc.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,g,v,m),gc.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,g,v,m)}else this.curveType==="catmullrom"&&(pc.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),mc.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),gc.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return i.set(pc.calc(l),mc.calc(l),gc.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Sd(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+r+o)*l+(-3*e+3*i-2*r-o)*a+r*n+e}function RM(n,t){const e=1-n;return e*e*t}function CM(n,t){return 2*(1-n)*n*t}function PM(n,t){return n*n*t}function po(n,t,e,i){return RM(n,t)+CM(n,e)+PM(n,i)}function LM(n,t){const e=1-n;return e*e*e*t}function DM(n,t){const e=1-n;return 3*e*e*n*t}function IM(n,t){return 3*(1-n)*n*n*t}function NM(n,t){return n*n*n*t}function mo(n,t,e,i,s){return LM(n,t)+DM(n,e)+IM(n,i)+NM(n,s)}class L0 extends mi{constructor(t=new gt,e=new gt,i=new gt,s=new gt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new gt){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(mo(t,s.x,r.x,o.x,a.x),mo(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class UM extends mi{constructor(t=new D,e=new D,i=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new D){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(mo(t,s.x,r.x,o.x,a.x),mo(t,s.y,r.y,o.y,a.y),mo(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class D0 extends mi{constructor(t=new gt,e=new gt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new gt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new gt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class FM extends mi{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class I0 extends mi{constructor(t=new gt,e=new gt,i=new gt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new gt){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(po(t,s.x,r.x,o.x),po(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class OM extends mi{constructor(t=new D,e=new D,i=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new D){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(po(t,s.x,r.x,o.x),po(t,s.y,r.y,o.y),po(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class N0 extends mi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new gt){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return i.set(Sd(a,l.x,c.x,u.x,h.x),Sd(a,l.y,c.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new gt().fromArray(s))}return this}}var yd=Object.freeze({__proto__:null,ArcCurve:wM,CatmullRomCurve3:AM,CubicBezierCurve:L0,CubicBezierCurve3:UM,EllipseCurve:Wh,LineCurve:D0,LineCurve3:FM,QuadraticBezierCurve:I0,QuadraticBezierCurve3:OM,SplineCurve:N0});class BM extends mi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new yd[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new yd[s.type]().fromJSON(s))}return this}}class ll extends BM{constructor(t){super(),this.type="Path",this.currentPoint=new gt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new D0(this.currentPoint.clone(),new gt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new I0(this.currentPoint.clone(),new gt(t,e),new gt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const a=new L0(this.currentPoint.clone(),new gt(t,e),new gt(i,s),new gt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new N0(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,i,s,r,o,a,l),this}absellipse(t,e,i,s,r,o,a,l){const c=new Wh(t,e,i,s,r,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Yh extends ll{constructor(t){super(t),this.uuid=li(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new ll().fromJSON(s))}return this}}function zM(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=U0(n,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(i&&(r=WM(n,t,r,e)),n.length>80*e){a=n[0],l=n[1];let u=a,h=l;for(let f=e;f<s;f+=e){const d=n[f],g=n[f+1];d<a&&(a=d),g<l&&(l=g),d>u&&(u=d),g>h&&(h=g)}c=Math.max(u-a,h-l),c=c!==0?32767/c:0}return Ao(r,o,e,a,l,c,0),o}function U0(n,t,e,i,s){let r;if(s===eS(n,t,e,i)>0)for(let o=t;o<e;o+=i)r=bd(o/i|0,n[o],n[o+1],r);else for(let o=e-i;o>=t;o-=i)r=bd(o/i|0,n[o],n[o+1],r);return r&&Cr(r,r.next)&&(Co(r),r=r.next),r}function Cs(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Cr(e,e.next)||Re(e.prev,e,e.next)===0)){if(Co(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Ao(n,t,e,i,s,r,o){if(!n)return;!o&&r&&KM(n,i,s,r);let a=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(r?GM(n,i,s,r):HM(n)){t.push(l.i,n.i,c.i),Co(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=VM(Cs(n),t),Ao(n,t,e,i,s,r,2)):o===2&&kM(n,t,e,i,s,r):Ao(Cs(n),t,e,i,s,r,1);break}}}function HM(n){const t=n.prev,e=n,i=n.next;if(Re(t,e,i)>=0)return!1;const s=t.x,r=e.x,o=i.x,a=t.y,l=e.y,c=i.y,u=Math.min(s,r,o),h=Math.min(a,l,c),f=Math.max(s,r,o),d=Math.max(a,l,c);let g=i.next;for(;g!==t;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=d&&no(s,a,r,l,o,c,g.x,g.y)&&Re(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function GM(n,t,e,i){const s=n.prev,r=n,o=n.next;if(Re(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,u=s.y,h=r.y,f=o.y,d=Math.min(a,l,c),g=Math.min(u,h,f),v=Math.max(a,l,c),m=Math.max(u,h,f),p=zu(d,g,t,e,i),M=zu(v,m,t,e,i);let y=n.prevZ,_=n.nextZ;for(;y&&y.z>=p&&_&&_.z<=M;){if(y.x>=d&&y.x<=v&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&no(a,u,l,h,c,f,y.x,y.y)&&Re(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=d&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&no(a,u,l,h,c,f,_.x,_.y)&&Re(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=v&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&no(a,u,l,h,c,f,y.x,y.y)&&Re(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=M;){if(_.x>=d&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&no(a,u,l,h,c,f,_.x,_.y)&&Re(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function VM(n,t){let e=n;do{const i=e.prev,s=e.next.next;!Cr(i,s)&&O0(i,e,e.next,s)&&Ro(i,s)&&Ro(s,i)&&(t.push(i.i,e.i,s.i),Co(e),Co(e.next),e=n=s),e=e.next}while(e!==n);return Cs(e)}function kM(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&jM(o,a)){let l=B0(o,a);o=Cs(o,o.next),l=Cs(l,l.next),Ao(o,t,e,i,s,r,0),Ao(l,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function WM(n,t,e,i){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*i,l=r<o-1?t[r+1]*i:n.length,c=U0(n,a,l,i,!1);c===c.next&&(c.steiner=!0),s.push(JM(c))}s.sort(XM);for(let r=0;r<s.length;r++)e=YM(s[r],e);return e}function XM(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function YM(n,t){const e=qM(n,t);if(!e)return t;const i=B0(e,n);return Cs(i,i.next),Cs(e,e.next)}function qM(n,t){let e=t;const i=n.x,s=n.y;let r=-1/0,o;if(Cr(n,e))return e;do{if(Cr(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const h=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=i&&h>r&&(r=h,o=e.x<e.next.x?e:e.next,h===i))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,l=o.x,c=o.y;let u=1/0;e=o;do{if(i>=e.x&&e.x>=l&&i!==e.x&&F0(s<c?i:r,s,l,c,s<c?r:i,s,e.x,e.y)){const h=Math.abs(s-e.y)/(i-e.x);Ro(e,n)&&(h<u||h===u&&(e.x>o.x||e.x===o.x&&$M(o,e)))&&(o=e,u=h)}e=e.next}while(e!==a);return o}function $M(n,t){return Re(n.prev,n,t.prev)<0&&Re(t.next,n,n.next)<0}function KM(n,t,e,i){let s=n;do s.z===0&&(s.z=zu(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,ZM(s)}function ZM(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let o=i,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,e*=2}while(t>1);return n}function zu(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function JM(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function F0(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function no(n,t,e,i,s,r,o,a){return!(n===o&&t===a)&&F0(n,t,e,i,s,r,o,a)}function jM(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!QM(n,t)&&(Ro(n,t)&&Ro(t,n)&&tS(n,t)&&(Re(n.prev,n,t.prev)||Re(n,t.prev,t))||Cr(n,t)&&Re(n.prev,n,n.next)>0&&Re(t.prev,t,t.next)>0)}function Re(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Cr(n,t){return n.x===t.x&&n.y===t.y}function O0(n,t,e,i){const s=ma(Re(n,t,e)),r=ma(Re(n,t,i)),o=ma(Re(e,i,n)),a=ma(Re(e,i,t));return!!(s!==r&&o!==a||s===0&&pa(n,e,t)||r===0&&pa(n,i,t)||o===0&&pa(e,n,i)||a===0&&pa(e,t,i))}function pa(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function ma(n){return n>0?1:n<0?-1:0}function QM(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&O0(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Ro(n,t){return Re(n.prev,n,n.next)<0?Re(n,t,n.next)>=0&&Re(n,n.prev,t)>=0:Re(n,t,n.prev)<0||Re(n,n.next,t)<0}function tS(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function B0(n,t){const e=Hu(n.i,n.x,n.y),i=Hu(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function bd(n,t,e,i){const s=Hu(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Co(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Hu(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function eS(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class nS{static triangulate(t,e,i=2){return zM(t,e,i)}}class go{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return go.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];Ed(t),Td(i,t);let o=t.length;e.forEach(Ed);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,Td(i,e[l]);const a=nS.triangulate(i,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Ed(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Td(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class qh extends kh{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new qh(t.radius,t.detail)}}class $h extends He{constructor(t=[new gt(0,-.5),new gt(.5,0),new gt(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=Qt(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],u=1/e,h=new D,f=new gt,d=new D,g=new D,v=new D;let m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-m,d.z=p*0,v.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),l.push(d.x,d.y,d.z),v.copy(g)}for(let M=0;M<=e;M++){const y=i+M*u*s,_=Math.sin(y),T=Math.cos(y);for(let E=0;E<=t.length-1;E++){h.x=t[E].x*_,h.y=t[E].y,h.z=t[E].x*T,o.push(h.x,h.y,h.z),f.x=M/e,f.y=E/(t.length-1),a.push(f.x,f.y);const R=l[3*E+0]*_,S=l[3*E+1],w=l[3*E+0]*T;c.push(R,S,w)}}for(let M=0;M<e;M++)for(let y=0;y<t.length-1;y++){const _=y+M*t.length,T=_,E=_+t.length,R=_+t.length+1,S=_+1;r.push(T,E,S),r.push(R,S,E)}this.setIndex(r),this.setAttribute("position",new he(o,3)),this.setAttribute("uv",new he(a,2)),this.setAttribute("normal",new he(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $h(t.points,t.segments,t.phiStart,t.phiLength)}}class Te extends He{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,h=t/a,f=e/l,d=[],g=[],v=[],m=[];for(let p=0;p<u;p++){const M=p*f-o;for(let y=0;y<c;y++){const _=y*h-r;g.push(_,-M,0),v.push(0,0,1),m.push(y/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){const y=M+c*p,_=M+c*(p+1),T=M+1+c*(p+1),E=M+1+c*p;d.push(y,_,E),d.push(_,T,E)}this.setIndex(d),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(v,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Te(t.width,t.height,t.widthSegments,t.heightSegments)}}class El extends He{constructor(t=new Yh([new gt(0,.5),new gt(-.5,-.5),new gt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let u=0;u<t.length;u++)c(t[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new he(s,3)),this.setAttribute("normal",new he(r,3)),this.setAttribute("uv",new he(o,2));function c(u){const h=s.length/3,f=u.extractPoints(e);let d=f.shape;const g=f.holes;go.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const M=g[m];go.isClockWise(M)===!0&&(g[m]=M.reverse())}const v=go.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const M=g[m];d=d.concat(M)}for(let m=0,p=d.length;m<p;m++){const M=d[m];s.push(M.x,M.y,0),r.push(0,0,1),o.push(M.x,M.y)}for(let m=0,p=v.length;m<p;m++){const M=v[m],y=M[0]+h,_=M[1]+h,T=M[2]+h;i.push(y,_,T),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return iS(e,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];i.push(o)}return new El(i,t.curveSegments)}}function iS(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class Po extends He{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new D,f=new D,d=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){const M=[],y=p/i,_=o+y*a,T=t*Math.cos(_),E=Math.sqrt(t*t-T*T);let R=0;p===0&&o===0?R=.5/e:p===i&&l===Math.PI&&(R=-.5/e);for(let S=0;S<=e;S++){const w=S/e,L=s+w*r;h.x=-E*Math.cos(L),h.y=T,h.z=E*Math.sin(L),g.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),m.push(w+R,1-y),M.push(c++)}u.push(M)}for(let p=0;p<i;p++)for(let M=0;M<e;M++){const y=u[p][M+1],_=u[p][M],T=u[p+1][M],E=u[p+1][M+1];(p!==0||o>0)&&d.push(y,_,E),(p!==i-1||l<Math.PI)&&d.push(_,T,E)}this.setIndex(d),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(v,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Po(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function Pr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(wd(s))s.isRenderTargetTexture?(Xt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(wd(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function en(n){const t={};for(let e=0;e<n.length;e++){const i=Pr(n[e]);for(const s in i)t[s]=i[s]}return t}function wd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function sS(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function z0(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}const rS={clone:Pr,merge:en};var oS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,aS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class di extends Ns{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=oS,this.fragmentShader=aS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Pr(t.uniforms),this.uniformsGroups=sS(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const i in t.uniforms){const s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new Bt().setHex(s.value);break;case"v2":this.uniforms[i].value=new gt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new D().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Ae().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Kt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new se().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class lS extends di{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class kt extends Ns{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fu,this.normalScale=new gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Ah,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class cS extends Ns{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ev,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class uS extends Ns{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class H0 extends Ie{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const _c=new se,Ad=new D,Rd=new D;class hS{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new gt(512,512),this.mapType=Mn,this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gh,this._frameExtents=new gt(1,1),this._viewportCount=1,this._viewports=[new Ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Ad.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ad),Rd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Rd),e.updateMatrixWorld(),_c.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_c,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===To||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(_c)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ga=new D,_a=new Vn,Zn=new D;class G0 extends Ie{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=oi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ga,_a,Zn),Zn.x===1&&Zn.y===1&&Zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,_a,Zn.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(ga,_a,Zn),Zn.x===1&&Zn.y===1&&Zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,_a,Zn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Zi=new D,Cd=new gt,Pd=new gt;class Dn extends G0{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=wo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Sr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wo*2*Math.atan(Math.tan(Sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Zi.x,Zi.y).multiplyScalar(-t/Zi.z),Zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Zi.x,Zi.y).multiplyScalar(-t/Zi.z)}getViewSize(t,e){return this.getViewBounds(t,Cd,Pd),e.subVectors(Pd,Cd)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Sr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Tl extends G0{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class fS extends hS{constructor(){super(new Tl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class dS extends H0{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.shadow=new fS}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class pS extends H0{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const er=-90,nr=1;class mS extends Ie{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Dn(er,nr,t,e);s.layers=this.layers,this.add(s);const r=new Dn(er,nr,t,e);r.layers=this.layers,this.add(r);const o=new Dn(er,nr,t,e);o.layers=this.layers,this.add(o);const a=new Dn(er,nr,t,e);a.layers=this.layers,this.add(a);const l=new Dn(er,nr,t,e);l.layers=this.layers,this.add(l);const c=new Dn(er,nr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===oi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===To)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class gS extends Dn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Ld=new se;class _S{constructor(t,e,i=0,s=1/0){this.ray=new bl(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new zh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):re("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ld.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ld),this}intersectObject(t,e=!0,i=[]){return Gu(t,this,i,e),i.sort(Dd),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Gu(t[s],this,i,e);return i.sort(Dd),i}}function Dd(n,t){return n.distance-t.distance}function Gu(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Gu(r[o],t,e,!0)}}class xS{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Xt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class Id{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const sf=class sf{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};sf.prototype.isMatrix2=!0;let Nd=sf;class vS extends cs{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Xt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Ud(n,t,e,i){const s=MS(i);switch(e){case g0:return n*t;case Lh:return n*t/s.components*s.byteLength;case Dh:return n*t/s.components*s.byteLength;case Rs:return n*t*2/s.components*s.byteLength;case Ih:return n*t*2/s.components*s.byteLength;case _0:return n*t*3/s.components*s.byteLength;case Fn:return n*t*4/s.components*s.byteLength;case Nh:return n*t*4/s.components*s.byteLength;case Ba:case za:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ha:case Ga:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case au:case cu:return Math.max(n,16)*Math.max(t,8)/4;case ou:case lu:return Math.max(n,8)*Math.max(t,8)/2;case uu:case hu:case du:case pu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case fu:case Qa:case mu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case gu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case _u:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case xu:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case vu:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Mu:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Su:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case yu:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case bu:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Eu:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Tu:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case wu:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Au:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Ru:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Cu:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Pu:case Lu:case Du:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Iu:case Nu:return Math.ceil(n/4)*Math.ceil(t/4)*8;case tl:case Uu:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function MS(n){switch(n){case Mn:case f0:return{byteLength:1,components:1};case bo:case d0:case Oi:return{byteLength:2,components:1};case Ch:case Ph:return{byteLength:2,components:4};case fi:case Rh:case Un:return{byteLength:4,components:1};case p0:case m0:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wh}}));typeof window<"u"&&(window.__THREE__?Xt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function V0(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function SS(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],v=h[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,h[f]=v)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const v=h[d];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var yS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bS=`#ifdef USE_ALPHAHASH
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
#endif`,ES=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,TS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,AS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,RS=`#ifdef USE_AOMAP
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
#endif`,CS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,PS=`#ifdef USE_BATCHING
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
#endif`,LS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,DS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,IS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,NS=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,US=`#ifdef USE_IRIDESCENCE
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
#endif`,FS=`#ifdef USE_BUMPMAP
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
#endif`,OS=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,BS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,HS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,GS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,VS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,kS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,WS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,XS=`#define PI 3.141592653589793
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
} // validated`,YS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,qS=`vec3 transformedNormal = objectNormal;
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
#endif`,$S=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,KS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ZS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,JS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jS="gl_FragColor = linearToOutputTexel( gl_FragColor );",QS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ty=`#ifdef USE_ENVMAP
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
#endif`,ey=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ny=`#ifdef USE_ENVMAP
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
#endif`,iy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sy=`#ifdef USE_ENVMAP
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
#endif`,ry=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,oy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ay=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ly=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cy=`#ifdef USE_GRADIENTMAP
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
}`,uy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dy=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,py=`#ifdef USE_ENVMAP
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
#endif`,my=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_y=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vy=`PhysicalMaterial material;
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
#endif`,My=`uniform sampler2D dfgLUT;
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
}`,Sy=`
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
#endif`,yy=`#if defined( RE_IndirectDiffuse )
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
#endif`,by=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ey=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ty=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ay=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ry=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Py=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ly=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Dy=`#if defined( USE_POINTS_UV )
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
#endif`,Iy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ny=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Uy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Fy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Oy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,By=`#ifdef USE_MORPHTARGETS
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
#endif`,zy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Gy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Vy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ky=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Xy=`#ifdef USE_NORMALMAP
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
#endif`,Yy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$y=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ky=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,jy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,eb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ib=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ob=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ab=`float getShadowMask() {
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
}`,lb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cb=`#ifdef USE_SKINNING
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
#endif`,ub=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hb=`#ifdef USE_SKINNING
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
#endif`,fb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,db=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,gb=`#ifdef USE_TRANSMISSION
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
#endif`,_b=`#ifdef USE_TRANSMISSION
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
#endif`,xb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bb=`uniform sampler2D t2D;
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
}`,Eb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,wb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ab=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rb=`#include <common>
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
}`,Cb=`#if DEPTH_PACKING == 3200
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
}`,Pb=`#define DISTANCE
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
}`,Lb=`#define DISTANCE
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
}`,Db=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ib=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nb=`uniform float scale;
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
}`,Ub=`uniform vec3 diffuse;
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
}`,Fb=`#include <common>
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
}`,Ob=`uniform vec3 diffuse;
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
}`,Bb=`#define LAMBERT
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
}`,zb=`#define LAMBERT
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
}`,Hb=`#define MATCAP
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
}`,Gb=`#define MATCAP
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
}`,Vb=`#define NORMAL
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
}`,kb=`#define NORMAL
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
}`,Wb=`#define PHONG
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
}`,Xb=`#define PHONG
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
}`,Yb=`#define STANDARD
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
}`,qb=`#define STANDARD
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
}`,$b=`#define TOON
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
}`,Kb=`#define TOON
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
}`,Zb=`uniform float size;
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
}`,Jb=`uniform vec3 diffuse;
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
}`,jb=`#include <common>
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
}`,Qb=`uniform vec3 color;
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
}`,tE=`uniform float rotation;
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
}`,eE=`uniform vec3 diffuse;
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
}`,ee={alphahash_fragment:yS,alphahash_pars_fragment:bS,alphamap_fragment:ES,alphamap_pars_fragment:TS,alphatest_fragment:wS,alphatest_pars_fragment:AS,aomap_fragment:RS,aomap_pars_fragment:CS,batching_pars_vertex:PS,batching_vertex:LS,begin_vertex:DS,beginnormal_vertex:IS,bsdfs:NS,iridescence_fragment:US,bumpmap_pars_fragment:FS,clipping_planes_fragment:OS,clipping_planes_pars_fragment:BS,clipping_planes_pars_vertex:zS,clipping_planes_vertex:HS,color_fragment:GS,color_pars_fragment:VS,color_pars_vertex:kS,color_vertex:WS,common:XS,cube_uv_reflection_fragment:YS,defaultnormal_vertex:qS,displacementmap_pars_vertex:$S,displacementmap_vertex:KS,emissivemap_fragment:ZS,emissivemap_pars_fragment:JS,colorspace_fragment:jS,colorspace_pars_fragment:QS,envmap_fragment:ty,envmap_common_pars_fragment:ey,envmap_pars_fragment:ny,envmap_pars_vertex:iy,envmap_physical_pars_fragment:py,envmap_vertex:sy,fog_vertex:ry,fog_pars_vertex:oy,fog_fragment:ay,fog_pars_fragment:ly,gradientmap_pars_fragment:cy,lightmap_pars_fragment:uy,lights_lambert_fragment:hy,lights_lambert_pars_fragment:fy,lights_pars_begin:dy,lights_toon_fragment:my,lights_toon_pars_fragment:gy,lights_phong_fragment:_y,lights_phong_pars_fragment:xy,lights_physical_fragment:vy,lights_physical_pars_fragment:My,lights_fragment_begin:Sy,lights_fragment_maps:yy,lights_fragment_end:by,lightprobes_pars_fragment:Ey,logdepthbuf_fragment:Ty,logdepthbuf_pars_fragment:wy,logdepthbuf_pars_vertex:Ay,logdepthbuf_vertex:Ry,map_fragment:Cy,map_pars_fragment:Py,map_particle_fragment:Ly,map_particle_pars_fragment:Dy,metalnessmap_fragment:Iy,metalnessmap_pars_fragment:Ny,morphinstance_vertex:Uy,morphcolor_vertex:Fy,morphnormal_vertex:Oy,morphtarget_pars_vertex:By,morphtarget_vertex:zy,normal_fragment_begin:Hy,normal_fragment_maps:Gy,normal_pars_fragment:Vy,normal_pars_vertex:ky,normal_vertex:Wy,normalmap_pars_fragment:Xy,clearcoat_normal_fragment_begin:Yy,clearcoat_normal_fragment_maps:qy,clearcoat_pars_fragment:$y,iridescence_pars_fragment:Ky,opaque_fragment:Zy,packing:Jy,premultiplied_alpha_fragment:jy,project_vertex:Qy,dithering_fragment:tb,dithering_pars_fragment:eb,roughnessmap_fragment:nb,roughnessmap_pars_fragment:ib,shadowmap_pars_fragment:sb,shadowmap_pars_vertex:rb,shadowmap_vertex:ob,shadowmask_pars_fragment:ab,skinbase_vertex:lb,skinning_pars_vertex:cb,skinning_vertex:ub,skinnormal_vertex:hb,specularmap_fragment:fb,specularmap_pars_fragment:db,tonemapping_fragment:pb,tonemapping_pars_fragment:mb,transmission_fragment:gb,transmission_pars_fragment:_b,uv_pars_fragment:xb,uv_pars_vertex:vb,uv_vertex:Mb,worldpos_vertex:Sb,background_vert:yb,background_frag:bb,backgroundCube_vert:Eb,backgroundCube_frag:Tb,cube_vert:wb,cube_frag:Ab,depth_vert:Rb,depth_frag:Cb,distance_vert:Pb,distance_frag:Lb,equirect_vert:Db,equirect_frag:Ib,linedashed_vert:Nb,linedashed_frag:Ub,meshbasic_vert:Fb,meshbasic_frag:Ob,meshlambert_vert:Bb,meshlambert_frag:zb,meshmatcap_vert:Hb,meshmatcap_frag:Gb,meshnormal_vert:Vb,meshnormal_frag:kb,meshphong_vert:Wb,meshphong_frag:Xb,meshphysical_vert:Yb,meshphysical_frag:qb,meshtoon_vert:$b,meshtoon_frag:Kb,points_vert:Zb,points_frag:Jb,shadow_vert:jb,shadow_frag:Qb,sprite_vert:tE,sprite_frag:eE},wt={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},ii={basic:{uniforms:en([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:en([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new Bt(0)},envMapIntensity:{value:1}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:en([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:en([wt.common,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.roughnessmap,wt.metalnessmap,wt.fog,wt.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:en([wt.common,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.gradientmap,wt.fog,wt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:en([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:en([wt.points,wt.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:en([wt.common,wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:en([wt.common,wt.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:en([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:en([wt.sprite,wt.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distance:{uniforms:en([wt.common,wt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distance_vert,fragmentShader:ee.distance_frag},shadow:{uniforms:en([wt.lights,wt.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};ii.physical={uniforms:en([ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};const xa={r:0,b:0,g:0},nE=new se,k0=new Kt;k0.set(-1,0,0,0,1,0,0,0,1);function iE(n,t,e,i,s,r){const o=new Bt(0);let a=s===!0?0:1,l,c,u=null,h=0,f=null;function d(M){let y=M.isScene===!0?M.background:null;if(y&&y.isTexture){const _=M.backgroundBlurriness>0;y=t.get(y,_)}return y}function g(M){let y=!1;const _=d(M);_===null?m(o,a):_&&_.isColor&&(m(_,1),y=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||y)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(M,y){const _=d(y);_&&(_.isCubeTexture||_.mapping===yl)?(c===void 0&&(c=new St(new Lt(1,1,1),new di({name:"BackgroundCubeMaterial",uniforms:Pr(ii.backgroundCube.uniforms),vertexShader:ii.backgroundCube.vertexShader,fragmentShader:ii.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(nE.makeRotationFromEuler(y.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(k0),c.material.toneMapped=oe.getTransfer(_.colorSpace)!==fe,(u!==_||h!==_.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=_,h=_.version,f=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new St(new Te(2,2),new di({name:"BackgroundMaterial",uniforms:Pr(ii.background.uniforms),vertexShader:ii.background.vertexShader,fragmentShader:ii.background.fragmentShader,side:ls,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=oe.getTransfer(_.colorSpace)!==fe,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||h!==_.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=_,h=_.version,f=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function m(M,y){M.getRGB(xa,z0(n)),e.buffers.color.setClear(xa.r,xa.g,xa.b,y,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,y=1){o.set(M),a=y,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,m(o,a)},render:g,addToRenderList:v,dispose:p}}function sE(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(I,U,q,J,H){let Y=!1;const z=h(I,J,q,U);r!==z&&(r=z,c(r.object)),Y=d(I,J,q,H),Y&&g(I,J,q,H),H!==null&&t.update(H,n.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,_(I,U,q,J),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return n.createVertexArray()}function c(I){return n.bindVertexArray(I)}function u(I){return n.deleteVertexArray(I)}function h(I,U,q,J){const H=J.wireframe===!0;let Y=i[U.id];Y===void 0&&(Y={},i[U.id]=Y);const z=I.isInstancedMesh===!0?I.id:0;let K=Y[z];K===void 0&&(K={},Y[z]=K);let rt=K[q.id];rt===void 0&&(rt={},K[q.id]=rt);let pt=rt[H];return pt===void 0&&(pt=f(l()),rt[H]=pt),pt}function f(I){const U=[],q=[],J=[];for(let H=0;H<e;H++)U[H]=0,q[H]=0,J[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:q,attributeDivisors:J,object:I,attributes:{},index:null}}function d(I,U,q,J){const H=r.attributes,Y=U.attributes;let z=0;const K=q.getAttributes();for(const rt in K)if(K[rt].location>=0){const xt=H[rt];let vt=Y[rt];if(vt===void 0&&(rt==="instanceMatrix"&&I.instanceMatrix&&(vt=I.instanceMatrix),rt==="instanceColor"&&I.instanceColor&&(vt=I.instanceColor)),xt===void 0||xt.attribute!==vt||vt&&xt.data!==vt.data)return!0;z++}return r.attributesNum!==z||r.index!==J}function g(I,U,q,J){const H={},Y=U.attributes;let z=0;const K=q.getAttributes();for(const rt in K)if(K[rt].location>=0){let xt=Y[rt];xt===void 0&&(rt==="instanceMatrix"&&I.instanceMatrix&&(xt=I.instanceMatrix),rt==="instanceColor"&&I.instanceColor&&(xt=I.instanceColor));const vt={};vt.attribute=xt,xt&&xt.data&&(vt.data=xt.data),H[rt]=vt,z++}r.attributes=H,r.attributesNum=z,r.index=J}function v(){const I=r.newAttributes;for(let U=0,q=I.length;U<q;U++)I[U]=0}function m(I){p(I,0)}function p(I,U){const q=r.newAttributes,J=r.enabledAttributes,H=r.attributeDivisors;q[I]=1,J[I]===0&&(n.enableVertexAttribArray(I),J[I]=1),H[I]!==U&&(n.vertexAttribDivisor(I,U),H[I]=U)}function M(){const I=r.newAttributes,U=r.enabledAttributes;for(let q=0,J=U.length;q<J;q++)U[q]!==I[q]&&(n.disableVertexAttribArray(q),U[q]=0)}function y(I,U,q,J,H,Y,z){z===!0?n.vertexAttribIPointer(I,U,q,H,Y):n.vertexAttribPointer(I,U,q,J,H,Y)}function _(I,U,q,J){v();const H=J.attributes,Y=q.getAttributes(),z=U.defaultAttributeValues;for(const K in Y){const rt=Y[K];if(rt.location>=0){let pt=H[K];if(pt===void 0&&(K==="instanceMatrix"&&I.instanceMatrix&&(pt=I.instanceMatrix),K==="instanceColor"&&I.instanceColor&&(pt=I.instanceColor)),pt!==void 0){const xt=pt.normalized,vt=pt.itemSize,te=t.get(pt);if(te===void 0)continue;const pe=te.buffer,ft=te.type,V=te.bytesPerElement,at=ft===n.INT||ft===n.UNSIGNED_INT||pt.gpuType===Rh;if(pt.isInterleavedBufferAttribute){const ot=pt.data,Ft=ot.stride,$t=pt.offset;if(ot.isInstancedInterleavedBuffer){for(let Yt=0;Yt<rt.locationSize;Yt++)p(rt.location+Yt,ot.meshPerAttribute);I.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Yt=0;Yt<rt.locationSize;Yt++)m(rt.location+Yt);n.bindBuffer(n.ARRAY_BUFFER,pe);for(let Yt=0;Yt<rt.locationSize;Yt++)y(rt.location+Yt,vt/rt.locationSize,ft,xt,Ft*V,($t+vt/rt.locationSize*Yt)*V,at)}else{if(pt.isInstancedBufferAttribute){for(let ot=0;ot<rt.locationSize;ot++)p(rt.location+ot,pt.meshPerAttribute);I.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let ot=0;ot<rt.locationSize;ot++)m(rt.location+ot);n.bindBuffer(n.ARRAY_BUFFER,pe);for(let ot=0;ot<rt.locationSize;ot++)y(rt.location+ot,vt/rt.locationSize,ft,xt,vt*V,vt/rt.locationSize*ot*V,at)}}else if(z!==void 0){const xt=z[K];if(xt!==void 0)switch(xt.length){case 2:n.vertexAttrib2fv(rt.location,xt);break;case 3:n.vertexAttrib3fv(rt.location,xt);break;case 4:n.vertexAttrib4fv(rt.location,xt);break;default:n.vertexAttrib1fv(rt.location,xt)}}}}M()}function T(){w();for(const I in i){const U=i[I];for(const q in U){const J=U[q];for(const H in J){const Y=J[H];for(const z in Y)u(Y[z].object),delete Y[z];delete J[H]}}delete i[I]}}function E(I){if(i[I.id]===void 0)return;const U=i[I.id];for(const q in U){const J=U[q];for(const H in J){const Y=J[H];for(const z in Y)u(Y[z].object),delete Y[z];delete J[H]}}delete i[I.id]}function R(I){for(const U in i){const q=i[U];for(const J in q){const H=q[J];if(H[I.id]===void 0)continue;const Y=H[I.id];for(const z in Y)u(Y[z].object),delete Y[z];delete H[I.id]}}}function S(I){for(const U in i){const q=i[U],J=I.isInstancedMesh===!0?I.id:0,H=q[J];if(H!==void 0){for(const Y in H){const z=H[Y];for(const K in z)u(z[K].object),delete z[K];delete H[Y]}delete q[J],Object.keys(q).length===0&&delete i[U]}}}function w(){L(),o=!0,r!==s&&(r=s,c(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:w,resetDefaultState:L,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:S,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:M}}function rE(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function o(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),e.update(c,i,u))}function a(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let f=0;for(let d=0;d<u;d++)f+=c[d];e.update(f,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function oE(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Fn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const S=R===Oi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Mn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Un&&!S)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(Xt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&f===!1&&Xt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:_,maxSamples:T,samples:E}}function aE(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new ns,a=new Kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||s;return s=f,i=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const M=r?0:i,y=M*4;let _=p.clippingState||null;l.value=_,_=u(g,f,y,d);for(let T=0;T!==y;++T)_[T]=e[T];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,d,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=d+v*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,_=d;y!==v;++y,_+=4)o.copy(h[y]).applyMatrix4(M,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}const os=4,Fd=[.125,.215,.35,.446,.526,.582],Ms=20,lE=256,Kr=new Tl,Od=new Bt;let xc=null,vc=0,Mc=0,Sc=!1;const cE=new D;class Bd{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=cE}=r;xc=this._renderer.getRenderTarget(),vc=this._renderer.getActiveCubeFace(),Mc=this._renderer.getActiveMipmapLevel(),Sc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(xc,vc,Mc),this._renderer.xr.enabled=Sc,t.scissorTest=!1,ir(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===As||t.mapping===Ar?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xc=this._renderer.getRenderTarget(),vc=this._renderer.getActiveCubeFace(),Mc=this._renderer.getActiveMipmapLevel(),Sc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:$e,minFilter:$e,generateMipmaps:!1,type:Oi,format:Fn,colorSpace:el,depthBuffer:!1},s=zd(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zd(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=uE(r)),this._blurMaterial=fE(r,t,e),this._ggxMaterial=hE(r,t,e)}return s}_compileMaterial(t){const e=new St(new He,t);this._renderer.compile(e,Kr)}_sceneToCubeUV(t,e,i,s,r){const l=new Dn(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Od),h.toneMapping=zn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new St(new Lt,new le({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let p=!1;const M=t.background;M?M.isColor&&(m.color.copy(M),t.background=null,p=!0):(m.color.copy(Od),p=!0);for(let y=0;y<6;y++){const _=y%3;_===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[y],r.y,r.z)):_===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[y]));const T=this._cubeSize;ir(s,_*T,y>2?T:0,T,T),h.setRenderTarget(s),p&&h.render(v,l),h.render(t,l)}h.toneMapping=d,h.autoClear=f,t.background=M}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===As||t.mapping===Ar;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hd());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;ir(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Kr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),f=0+c*1.25,d=h*f,{_lodMax:g}=this,v=this._sizeLods[i],m=3*v*(i>g-os?i-g+os:0),p=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-e,ir(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(a,Kr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,ir(t,m,p,3*v,2*v),s.setRenderTarget(t),s.render(a,Kr)}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&re("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[s];h.material=c;const f=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Ms-1),v=r/g,m=isFinite(r)?1+Math.floor(u*v):Ms;m>Ms&&Xt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ms}`);const p=[];let M=0;for(let R=0;R<Ms;++R){const S=R/v,w=Math.exp(-S*S/2);p.push(w),R===0?M+=w:R<m&&(M+=2*w)}for(let R=0;R<p.length;R++)p[R]=p[R]/M;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-i;const _=this._sizeLods[s],T=3*_*(s>y-os?s-y+os:0),E=4*(this._cubeSize-_);ir(e,T,E,3*_,2*_),l.setRenderTarget(e),l.render(h,Kr)}}function uE(n){const t=[],e=[],i=[];let s=n;const r=n-os+1+Fd.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>n-os?l=Fd[o-n+os-1]:o===0&&(l=0),e.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,v=3,m=2,p=1,M=new Float32Array(v*g*d),y=new Float32Array(m*g*d),_=new Float32Array(p*g*d);for(let E=0;E<d;E++){const R=E%3*2/3-1,S=E>2?0:-1,w=[R,S,0,R+2/3,S,0,R+2/3,S+1,0,R,S,0,R+2/3,S+1,0,R,S+1,0];M.set(w,v*g*E),y.set(f,m*g*E);const L=[E,E,E,E,E,E];_.set(L,p*g*E)}const T=new He;T.setAttribute("position",new dn(M,v)),T.setAttribute("uv",new dn(y,m)),T.setAttribute("faceIndex",new dn(_,p)),i.push(new St(T,null)),s>os&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function zd(n,t,e){const i=new ci(n,t,e);return i.texture.mapping=yl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ir(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function hE(n,t,e){return new di({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:lE,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:wl(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})}function fE(n,t,e){const i=new Float32Array(Ms),s=new D(0,1,0);return new di({name:"SphericalGaussianBlur",defines:{n:Ms,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:wl(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})}function Hd(){return new di({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wl(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})}function Gd(){return new di({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Di,depthTest:!1,depthWrite:!1})}function wl(){return`

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
	`}class W0 extends ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new R0(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Lt(5,5,5),r=new di({name:"CubemapFromEquirect",uniforms:Pr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:fn,blending:Di});r.uniforms.tEquirect.value=e;const o=new St(s,r),a=e.minFilter;return e.minFilter===Ss&&(e.minFilter=$e),new mS(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}function dE(n){let t=new WeakMap,e=new WeakMap,i=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===Oa||d===Gl)if(t.has(f)){const g=t.get(f).texture;return a(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const v=new W0(g.height);return v.fromEquirectangularTexture(n,f),t.set(f,v),f.addEventListener("dispose",c),a(v.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const d=f.mapping,g=d===Oa||d===Gl,v=d===As||d===Ar;if(g||v){let m=e.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return i===null&&(i=new Bd(n)),m=g?i.fromEquirectangular(f,m):i.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{const M=f.image;return g&&M&&M.height>0||v&&M&&l(M)?(i===null&&(i=new Bd(n)),m=g?i.fromEquirectangular(f):i.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function a(f,d){return d===Oa?f.mapping=As:d===Gl&&(f.mapping=Ar),f}function l(f){let d=0;const g=6;for(let v=0;v<g;v++)f[v]!==void 0&&d++;return d===g}function c(f){const d=f.target;d.removeEventListener("dispose",c);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function u(f){const d=f.target;d.removeEventListener("dispose",u);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function h(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function pE(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Mr("WebGLRenderer: "+i+" extension not supported."),s}}}function mE(n,t,e,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)t.update(f[d],n.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,g=h.attributes.position;let v=0;if(g===void 0)return;if(d!==null){const M=d.array;v=d.version;for(let y=0,_=M.length;y<_;y+=3){const T=M[y+0],E=M[y+1],R=M[y+2];f.push(T,E,E,R,R,T)}}else{const M=g.array;v=g.version;for(let y=0,_=M.length/3-1;y<_;y+=3){const T=y+0,E=y+1,R=y+2;f.push(T,E,E,R,R,T)}}const m=new(g.count>=65535?y0:S0)(f,1);m.version=v;const p=r.get(h);p&&t.remove(p),r.set(h,m)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function gE(n,t,e){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,f){n.drawElements(i,f,r,h*o),e.update(f,i,1)}function c(h,f,d){d!==0&&(n.drawElementsInstanced(i,f,r,h*o,d),e.update(f,i,d))}function u(h,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,h,0,d);let v=0;for(let m=0;m<d;m++)v+=f[m];e.update(v,i,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function _E(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:re("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function xE(n,t,e){const i=new WeakMap,s=new Ae;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let L=function(){S.dispose(),i.delete(a),a.removeEventListener("dispose",L)};var d=L;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),m===!0&&(_=3);let T=a.attributes.position.count*_,E=1;T>t.maxTextureSize&&(E=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const R=new Float32Array(T*E*4*h),S=new v0(R,T,E,h);S.type=Un,S.needsUpdate=!0;const w=_*4;for(let I=0;I<h;I++){const U=p[I],q=M[I],J=y[I],H=T*E*4*I;for(let Y=0;Y<U.count;Y++){const z=Y*w;g===!0&&(s.fromBufferAttribute(U,Y),R[H+z+0]=s.x,R[H+z+1]=s.y,R[H+z+2]=s.z,R[H+z+3]=0),v===!0&&(s.fromBufferAttribute(q,Y),R[H+z+4]=s.x,R[H+z+5]=s.y,R[H+z+6]=s.z,R[H+z+7]=0),m===!0&&(s.fromBufferAttribute(J,Y),R[H+z+8]=s.x,R[H+z+9]=s.y,R[H+z+10]=s.z,R[H+z+11]=J.itemSize===4?s.w:1)}}f={count:h,texture:S,size:new gt(T,E)},i.set(a,f),a.addEventListener("dispose",L)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function vE(n,t,e,i,s){let r=new WeakMap;function o(c){const u=s.render.frame,h=c.geometry,f=t.get(c,h);if(r.get(f)!==u&&(t.update(f),r.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return f}function a(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}const ME={[s0]:"LINEAR_TONE_MAPPING",[r0]:"REINHARD_TONE_MAPPING",[o0]:"CINEON_TONE_MAPPING",[a0]:"ACES_FILMIC_TONE_MAPPING",[c0]:"AGX_TONE_MAPPING",[u0]:"NEUTRAL_TONE_MAPPING",[l0]:"CUSTOM_TONE_MAPPING"};function SE(n,t,e,i,s,r){const o=new ci(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Rr(t,e):void 0}),a=new ci(t,e,{type:Oi,depthBuffer:!1,stencilBuffer:!1}),l=new He;l.setAttribute("position",new he([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new he([0,2,0,0,2,0],2));const c=new lS({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new St(l,c),h=new Tl(-1,1,1,-1,0,1);let f=null,d=null,g=!1,v,m=null,p=[],M=!1;this.setSize=function(y,_){o.setSize(y,_),a.setSize(y,_);for(let T=0;T<p.length;T++){const E=p[T];E.setSize&&E.setSize(y,_)}},this.setEffects=function(y){p=y,M=p.length>0&&p[0].isRenderPass===!0;const _=o.width,T=o.height;for(let E=0;E<p.length;E++){const R=p[E];R.setSize&&R.setSize(_,T)}},this.begin=function(y,_){if(g||y.toneMapping===zn&&p.length===0)return!1;if(m=_,_!==null){const T=_.width,E=_.height;(o.width!==T||o.height!==E)&&this.setSize(T,E)}return M===!1&&y.setRenderTarget(o),v=y.toneMapping,y.toneMapping=zn,!0},this.hasRenderPass=function(){return M},this.end=function(y,_){y.toneMapping=v,g=!0;let T=o,E=a;for(let R=0;R<p.length;R++){const S=p[R];if(S.enabled!==!1&&(S.render(y,E,T,_),S.needsSwap!==!1)){const w=T;T=E,E=w}}if(f!==y.outputColorSpace||d!==y.toneMapping){f=y.outputColorSpace,d=y.toneMapping,c.defines={},oe.getTransfer(f)===fe&&(c.defines.SRGB_TRANSFER="");const R=ME[d];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,y.setRenderTarget(m),y.render(u,h),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}const X0=new Ze,Vu=new Rr(1,1),Y0=new v0,q0=new iM,$0=new R0,Vd=[],kd=[],Wd=new Float32Array(16),Xd=new Float32Array(9),Yd=new Float32Array(4);function Ur(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Vd[s];if(r===void 0&&(r=new Float32Array(s),Vd[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Be(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ze(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Al(n,t){let e=kd[t];e===void 0&&(e=new Int32Array(t),kd[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function yE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function bE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2fv(this.addr,t),ze(e,t)}}function EE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;n.uniform3fv(this.addr,t),ze(e,t)}}function TE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4fv(this.addr,t),ze(e,t)}}function wE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,i))return;Yd.set(i),n.uniformMatrix2fv(this.addr,!1,Yd),ze(e,i)}}function AE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,i))return;Xd.set(i),n.uniformMatrix3fv(this.addr,!1,Xd),ze(e,i)}}function RE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,i))return;Wd.set(i),n.uniformMatrix4fv(this.addr,!1,Wd),ze(e,i)}}function CE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function PE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2iv(this.addr,t),ze(e,t)}}function LE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;n.uniform3iv(this.addr,t),ze(e,t)}}function DE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4iv(this.addr,t),ze(e,t)}}function IE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function NE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2uiv(this.addr,t),ze(e,t)}}function UE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;n.uniform3uiv(this.addr,t),ze(e,t)}}function FE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4uiv(this.addr,t),ze(e,t)}}function OE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Vu.compareFunction=e.isReversedDepthBuffer()?Fh:Uh,r=Vu):r=X0,e.setTexture2D(t||r,s)}function BE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||q0,s)}function zE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||$0,s)}function HE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Y0,s)}function GE(n){switch(n){case 5126:return yE;case 35664:return bE;case 35665:return EE;case 35666:return TE;case 35674:return wE;case 35675:return AE;case 35676:return RE;case 5124:case 35670:return CE;case 35667:case 35671:return PE;case 35668:case 35672:return LE;case 35669:case 35673:return DE;case 5125:return IE;case 36294:return NE;case 36295:return UE;case 36296:return FE;case 35678:case 36198:case 36298:case 36306:case 35682:return OE;case 35679:case 36299:case 36307:return BE;case 35680:case 36300:case 36308:case 36293:return zE;case 36289:case 36303:case 36311:case 36292:return HE}}function VE(n,t){n.uniform1fv(this.addr,t)}function kE(n,t){const e=Ur(t,this.size,2);n.uniform2fv(this.addr,e)}function WE(n,t){const e=Ur(t,this.size,3);n.uniform3fv(this.addr,e)}function XE(n,t){const e=Ur(t,this.size,4);n.uniform4fv(this.addr,e)}function YE(n,t){const e=Ur(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function qE(n,t){const e=Ur(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function $E(n,t){const e=Ur(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function KE(n,t){n.uniform1iv(this.addr,t)}function ZE(n,t){n.uniform2iv(this.addr,t)}function JE(n,t){n.uniform3iv(this.addr,t)}function jE(n,t){n.uniform4iv(this.addr,t)}function QE(n,t){n.uniform1uiv(this.addr,t)}function tT(n,t){n.uniform2uiv(this.addr,t)}function eT(n,t){n.uniform3uiv(this.addr,t)}function nT(n,t){n.uniform4uiv(this.addr,t)}function iT(n,t,e){const i=this.cache,s=t.length,r=Al(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Vu:o=X0;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function sT(n,t,e){const i=this.cache,s=t.length,r=Al(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||q0,r[o])}function rT(n,t,e){const i=this.cache,s=t.length,r=Al(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||$0,r[o])}function oT(n,t,e){const i=this.cache,s=t.length,r=Al(e,s);Be(i,r)||(n.uniform1iv(this.addr,r),ze(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Y0,r[o])}function aT(n){switch(n){case 5126:return VE;case 35664:return kE;case 35665:return WE;case 35666:return XE;case 35674:return YE;case 35675:return qE;case 35676:return $E;case 5124:case 35670:return KE;case 35667:case 35671:return ZE;case 35668:case 35672:return JE;case 35669:case 35673:return jE;case 5125:return QE;case 36294:return tT;case 36295:return eT;case 36296:return nT;case 35678:case 36198:case 36298:case 36306:case 35682:return iT;case 35679:case 36299:case 36307:return sT;case 35680:case 36300:case 36308:case 36293:return rT;case 36289:case 36303:case 36311:case 36292:return oT}}class lT{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=GE(e.type)}}class cT{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=aT(e.type)}}class uT{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const yc=/(\w+)(\])?(\[|\.)?/g;function qd(n,t){n.seq.push(t),n.map[t.id]=t}function hT(n,t,e){const i=n.name,s=i.length;for(yc.lastIndex=0;;){const r=yc.exec(i),o=yc.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){qd(e,c===void 0?new lT(a,n,t):new cT(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new uT(a),qd(e,h)),e=h}}}class ka{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);hT(a,l,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function $d(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const fT=37297;let dT=0;function pT(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Kd=new Kt;function mT(n){oe._getMatrix(Kd,oe.workingColorSpace,n);const t=`mat3( ${Kd.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(n)){case nl:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return Xt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Zd(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+pT(n.getShaderSource(t),a)}else return r}function gT(n,t){const e=mT(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const _T={[s0]:"Linear",[r0]:"Reinhard",[o0]:"Cineon",[a0]:"ACESFilmic",[c0]:"AgX",[u0]:"Neutral",[l0]:"Custom"};function xT(n,t){const e=_T[t];return e===void 0?(Xt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const va=new D;function vT(){oe.getLuminanceCoefficients(va);const n=va.x.toFixed(4),t=va.y.toFixed(4),e=va.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function MT(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(io).join(`
`)}function ST(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function yT(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function io(n){return n!==""}function Jd(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function jd(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const bT=/^[ \t]*#include +<([\w\d./]+)>/gm;function ku(n){return n.replace(bT,TT)}const ET=new Map;function TT(n,t){let e=ee[t];if(e===void 0){const i=ET.get(t);if(i!==void 0)e=ee[i],Xt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return ku(e)}const wT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qd(n){return n.replace(wT,AT)}function AT(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function tp(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const RT={[Fa]:"SHADOWMAP_TYPE_PCF",[eo]:"SHADOWMAP_TYPE_VSM"};function CT(n){return RT[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const PT={[As]:"ENVMAP_TYPE_CUBE",[Ar]:"ENVMAP_TYPE_CUBE",[yl]:"ENVMAP_TYPE_CUBE_UV"};function LT(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":PT[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const DT={[Ar]:"ENVMAP_MODE_REFRACTION"};function IT(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":DT[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const NT={[Ah]:"ENVMAP_BLENDING_MULTIPLY",[Sv]:"ENVMAP_BLENDING_MIX",[yv]:"ENVMAP_BLENDING_ADD"};function UT(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":NT[n.combine]||"ENVMAP_BLENDING_NONE"}function FT(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function OT(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=CT(e),c=LT(e),u=IT(e),h=UT(e),f=FT(e),d=MT(e),g=ST(r),v=s.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(io).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(io).join(`
`),p.length>0&&(p+=`
`)):(m=[tp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(io).join(`
`),p=[tp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zn?"#define TONE_MAPPING":"",e.toneMapping!==zn?ee.tonemapping_pars_fragment:"",e.toneMapping!==zn?xT("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,gT("linearToOutputTexel",e.outputColorSpace),vT(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(io).join(`
`)),o=ku(o),o=Jd(o,e),o=jd(o,e),a=ku(a),a=Jd(a,e),a=jd(a,e),o=Qd(o),a=Qd(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===$f?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===$f?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=M+m+o,_=M+p+a,T=$d(s,s.VERTEX_SHADER,y),E=$d(s,s.FRAGMENT_SHADER,_);s.attachShader(v,T),s.attachShader(v,E),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(I){if(n.debug.checkShaderErrors){const U=s.getProgramInfoLog(v)||"",q=s.getShaderInfoLog(T)||"",J=s.getShaderInfoLog(E)||"",H=U.trim(),Y=q.trim(),z=J.trim();let K=!0,rt=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,T,E);else{const pt=Zd(s,T,"vertex"),xt=Zd(s,E,"fragment");re("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+H+`
`+pt+`
`+xt)}else H!==""?Xt("WebGLProgram: Program Info Log:",H):(Y===""||z==="")&&(rt=!1);rt&&(I.diagnostics={runnable:K,programLog:H,vertexShader:{log:Y,prefix:m},fragmentShader:{log:z,prefix:p}})}s.deleteShader(T),s.deleteShader(E),S=new ka(s,v),w=yT(s,v)}let S;this.getUniforms=function(){return S===void 0&&R(this),S};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(v,fT)),L},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=dT++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=E,this}let BT=0;class zT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new HT(t),e.set(t,i)),i}}class HT{constructor(t){this.id=BT++,this.code=t,this.usedTimes=0}}function GT(n){return n===Rs||n===Qa||n===tl}function VT(n,t,e,i,s,r){const o=new zh,a=new zT,l=new Set,c=[],u=new Map,h=i.logarithmicDepthBuffer;let f=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return l.add(S),S===0?"uv":`uv${S}`}function v(S,w,L,I,U,q){const J=I.fog,H=U.geometry,Y=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?I.environment:null,z=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,K=t.get(S.envMap||Y,z),rt=K&&K.mapping===yl?K.image.height:null,pt=d[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&Xt("WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const xt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,vt=xt!==void 0?xt.length:0;let te=0;H.morphAttributes.position!==void 0&&(te=1),H.morphAttributes.normal!==void 0&&(te=2),H.morphAttributes.color!==void 0&&(te=3);let pe,ft,V,at;if(pt){const Ot=ii[pt];pe=Ot.vertexShader,ft=Ot.fragmentShader}else{pe=S.vertexShader,ft=S.fragmentShader;const Ot=a.getVertexShaderStage(S),Ce=a.getFragmentShaderStage(S);a.update(S,Ot,Ce),V=Ot.id,at=Ce.id}const ot=n.getRenderTarget(),Ft=n.state.buffers.depth.getReversed(),$t=U.isInstancedMesh===!0,Yt=U.isBatchedMesh===!0,P=!!S.map,N=!!S.matcap,X=!!K,tt=!!S.aoMap,j=!!S.lightMap,it=!!S.bumpMap&&S.wireframe===!1,dt=!!S.normalMap,ut=!!S.displacementMap,ct=!!S.emissiveMap,et=!!S.metalnessMap,Pt=!!S.roughnessMap,C=S.anisotropy>0,Dt=S.clearcoat>0,Tt=S.dispersion>0,A=S.iridescence>0,x=S.sheen>0,F=S.transmission>0,G=C&&!!S.anisotropyMap,Z=Dt&&!!S.clearcoatMap,ht=Dt&&!!S.clearcoatNormalMap,_t=Dt&&!!S.clearcoatRoughnessMap,Q=A&&!!S.iridescenceMap,nt=A&&!!S.iridescenceThicknessMap,mt=x&&!!S.sheenColorMap,It=x&&!!S.sheenRoughnessMap,bt=!!S.specularMap,Mt=!!S.specularColorMap,Wt=!!S.specularIntensityMap,qt=F&&!!S.transmissionMap,Jt=F&&!!S.thicknessMap,O=!!S.gradientMap,yt=!!S.alphaMap,st=S.alphaTest>0,Et=!!S.alphaHash,Ct=!!S.extensions;let lt=zn;S.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(lt=n.toneMapping);const Ht={shaderID:pt,shaderType:S.type,shaderName:S.name,vertexShader:pe,fragmentShader:ft,defines:S.defines,customVertexShaderID:V,customFragmentShaderID:at,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Yt,batchingColor:Yt&&U._colorsTexture!==null,instancing:$t,instancingColor:$t&&U.instanceColor!==null,instancingMorph:$t&&U.morphTexture!==null,outputColorSpace:ot===null?n.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:P,matcap:N,envMap:X,envMapMode:X&&K.mapping,envMapCubeUVHeight:rt,aoMap:tt,lightMap:j,bumpMap:it,normalMap:dt,displacementMap:ut,emissiveMap:ct,normalMapObjectSpace:dt&&S.normalMapType===Tv,normalMapTangentSpace:dt&&S.normalMapType===Fu,packedNormalMap:dt&&S.normalMapType===Fu&&GT(S.normalMap.format),metalnessMap:et,roughnessMap:Pt,anisotropy:C,anisotropyMap:G,clearcoat:Dt,clearcoatMap:Z,clearcoatNormalMap:ht,clearcoatRoughnessMap:_t,dispersion:Tt,iridescence:A,iridescenceMap:Q,iridescenceThicknessMap:nt,sheen:x,sheenColorMap:mt,sheenRoughnessMap:It,specularMap:bt,specularColorMap:Mt,specularIntensityMap:Wt,transmission:F,transmissionMap:qt,thicknessMap:Jt,gradientMap:O,opaque:S.transparent===!1&&S.blending===vr&&S.alphaToCoverage===!1,alphaMap:yt,alphaTest:st,alphaHash:Et,combine:S.combine,mapUv:P&&g(S.map.channel),aoMapUv:tt&&g(S.aoMap.channel),lightMapUv:j&&g(S.lightMap.channel),bumpMapUv:it&&g(S.bumpMap.channel),normalMapUv:dt&&g(S.normalMap.channel),displacementMapUv:ut&&g(S.displacementMap.channel),emissiveMapUv:ct&&g(S.emissiveMap.channel),metalnessMapUv:et&&g(S.metalnessMap.channel),roughnessMapUv:Pt&&g(S.roughnessMap.channel),anisotropyMapUv:G&&g(S.anisotropyMap.channel),clearcoatMapUv:Z&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:ht&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:nt&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:mt&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:It&&g(S.sheenRoughnessMap.channel),specularMapUv:bt&&g(S.specularMap.channel),specularColorMapUv:Mt&&g(S.specularColorMap.channel),specularIntensityMapUv:Wt&&g(S.specularIntensityMap.channel),transmissionMapUv:qt&&g(S.transmissionMap.channel),thicknessMapUv:Jt&&g(S.thicknessMap.channel),alphaMapUv:yt&&g(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(dt||C),vertexNormals:!!H.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!H.attributes.uv&&(P||yt),fog:!!J,useFog:S.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||H.attributes.normal===void 0&&dt===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ft,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:te,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:lt,decodeVideoTexture:P&&S.map.isVideoTexture===!0&&oe.getTransfer(S.map.colorSpace)===fe,decodeVideoTextureEmissive:ct&&S.emissiveMap.isVideoTexture===!0&&oe.getTransfer(S.emissiveMap.colorSpace)===fe,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Oe,flipSided:S.side===fn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ct&&S.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ct&&S.extensions.multiDraw===!0||Yt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ht.vertexUv1s=l.has(1),Ht.vertexUv2s=l.has(2),Ht.vertexUv3s=l.has(3),l.clear(),Ht}function m(S){const w=[];if(S.shaderID?w.push(S.shaderID):(w.push(S.customVertexShaderID),w.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)w.push(L),w.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(p(w,S),M(w,S),w.push(n.outputColorSpace)),w.push(S.customProgramCacheKey),w.join()}function p(S,w){S.push(w.precision),S.push(w.outputColorSpace),S.push(w.envMapMode),S.push(w.envMapCubeUVHeight),S.push(w.mapUv),S.push(w.alphaMapUv),S.push(w.lightMapUv),S.push(w.aoMapUv),S.push(w.bumpMapUv),S.push(w.normalMapUv),S.push(w.displacementMapUv),S.push(w.emissiveMapUv),S.push(w.metalnessMapUv),S.push(w.roughnessMapUv),S.push(w.anisotropyMapUv),S.push(w.clearcoatMapUv),S.push(w.clearcoatNormalMapUv),S.push(w.clearcoatRoughnessMapUv),S.push(w.iridescenceMapUv),S.push(w.iridescenceThicknessMapUv),S.push(w.sheenColorMapUv),S.push(w.sheenRoughnessMapUv),S.push(w.specularMapUv),S.push(w.specularColorMapUv),S.push(w.specularIntensityMapUv),S.push(w.transmissionMapUv),S.push(w.thicknessMapUv),S.push(w.combine),S.push(w.fogExp2),S.push(w.sizeAttenuation),S.push(w.morphTargetsCount),S.push(w.morphAttributeCount),S.push(w.numDirLights),S.push(w.numPointLights),S.push(w.numSpotLights),S.push(w.numSpotLightMaps),S.push(w.numHemiLights),S.push(w.numRectAreaLights),S.push(w.numDirLightShadows),S.push(w.numPointLightShadows),S.push(w.numSpotLightShadows),S.push(w.numSpotLightShadowsWithMaps),S.push(w.numLightProbes),S.push(w.shadowMapType),S.push(w.toneMapping),S.push(w.numClippingPlanes),S.push(w.numClipIntersection),S.push(w.depthPacking)}function M(S,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),w.packedNormalMap&&o.enable(22),w.vertexNormals&&o.enable(23),S.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),w.numLightProbeGrids>0&&o.enable(22),w.hasPositionAttribute&&o.enable(23),S.push(o.mask)}function y(S){const w=d[S.type];let L;if(w){const I=ii[w];L=rS.clone(I.uniforms)}else L=S.uniforms;return L}function _(S,w){let L=u.get(w);return L!==void 0?++L.usedTimes:(L=new OT(n,w,S,s),c.push(L),u.set(w,L)),L}function T(S){if(--S.usedTimes===0){const w=c.indexOf(S);c[w]=c[c.length-1],c.pop(),u.delete(S.cacheKey),S.destroy()}}function E(S){a.remove(S)}function R(){a.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:y,acquireProgram:_,releaseProgram:T,releaseShaderCache:E,programs:c,dispose:R}}function kT(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function WT(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function ep(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function np(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,g,v,m,p){let M=n[t];return M===void 0?(M={id:f.id,object:f,geometry:d,material:g,materialVariant:o(f),groupOrder:v,renderOrder:f.renderOrder,z:m,group:p},n[t]=M):(M.id=f.id,M.object=f,M.geometry=d,M.material=g,M.materialVariant=o(f),M.groupOrder=v,M.renderOrder=f.renderOrder,M.z=m,M.group=p),t++,M}function l(f,d,g,v,m,p){const M=a(f,d,g,v,m,p);g.transmission>0?i.push(M):g.transparent===!0?s.push(M):e.push(M)}function c(f,d,g,v,m,p){const M=a(f,d,g,v,m,p);g.transmission>0?i.unshift(M):g.transparent===!0?s.unshift(M):e.unshift(M)}function u(f,d,g){e.length>1&&e.sort(f||WT),i.length>1&&i.sort(d||ep),s.length>1&&s.sort(d||ep),g&&(e.reverse(),i.reverse(),s.reverse())}function h(){for(let f=t,d=n.length;f<d;f++){const g=n[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:h,sort:u}}function XT(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new np,n.set(i,[o])):s>=r.length?(o=new np,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function YT(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Bt};break;case"SpotLight":e={position:new D,direction:new D,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new D,halfWidth:new D,halfHeight:new D};break}return n[t.id]=e,e}}}function qT(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let $T=0;function KT(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function ZT(n){const t=new YT,e=qT(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new D);const s=new D,r=new se,o=new se;function a(c){let u=0,h=0,f=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,M=0,y=0,_=0,T=0,E=0,R=0;c.sort(KT);for(let w=0,L=c.length;w<L;w++){const I=c[w],U=I.color,q=I.intensity,J=I.distance;let H=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Rs?H=I.shadow.map.texture:H=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=U.r*q,h+=U.g*q,f+=U.b*q;else if(I.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(I.sh.coefficients[Y],q);R++}else if(I.isDirectionalLight){const Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const z=I.shadow,K=e.get(I);K.shadowIntensity=z.intensity,K.shadowBias=z.bias,K.shadowNormalBias=z.normalBias,K.shadowRadius=z.radius,K.shadowMapSize=z.mapSize,i.directionalShadow[d]=K,i.directionalShadowMap[d]=H,i.directionalShadowMatrix[d]=I.shadow.matrix,M++}i.directional[d]=Y,d++}else if(I.isSpotLight){const Y=t.get(I);Y.position.setFromMatrixPosition(I.matrixWorld),Y.color.copy(U).multiplyScalar(q),Y.distance=J,Y.coneCos=Math.cos(I.angle),Y.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Y.decay=I.decay,i.spot[v]=Y;const z=I.shadow;if(I.map&&(i.spotLightMap[T]=I.map,T++,z.updateMatrices(I),I.castShadow&&E++),i.spotLightMatrix[v]=z.matrix,I.castShadow){const K=e.get(I);K.shadowIntensity=z.intensity,K.shadowBias=z.bias,K.shadowNormalBias=z.normalBias,K.shadowRadius=z.radius,K.shadowMapSize=z.mapSize,i.spotShadow[v]=K,i.spotShadowMap[v]=H,_++}v++}else if(I.isRectAreaLight){const Y=t.get(I);Y.color.copy(U).multiplyScalar(q),Y.halfWidth.set(I.width*.5,0,0),Y.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=Y,m++}else if(I.isPointLight){const Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),Y.distance=I.distance,Y.decay=I.decay,I.castShadow){const z=I.shadow,K=e.get(I);K.shadowIntensity=z.intensity,K.shadowBias=z.bias,K.shadowNormalBias=z.normalBias,K.shadowRadius=z.radius,K.shadowMapSize=z.mapSize,K.shadowCameraNear=z.camera.near,K.shadowCameraFar=z.camera.far,i.pointShadow[g]=K,i.pointShadowMap[g]=H,i.pointShadowMatrix[g]=I.shadow.matrix,y++}i.point[g]=Y,g++}else if(I.isHemisphereLight){const Y=t.get(I);Y.skyColor.copy(I.color).multiplyScalar(q),Y.groundColor.copy(I.groundColor).multiplyScalar(q),i.hemi[p]=Y,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=wt.LTC_FLOAT_1,i.rectAreaLTC2=wt.LTC_FLOAT_2):(i.rectAreaLTC1=wt.LTC_HALF_1,i.rectAreaLTC2=wt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const S=i.hash;(S.directionalLength!==d||S.pointLength!==g||S.spotLength!==v||S.rectAreaLength!==m||S.hemiLength!==p||S.numDirectionalShadows!==M||S.numPointShadows!==y||S.numSpotShadows!==_||S.numSpotMaps!==T||S.numLightProbes!==R)&&(i.directional.length=d,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=_+T-E,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=R,S.directionalLength=d,S.pointLength=g,S.spotLength=v,S.rectAreaLength=m,S.hemiLength=p,S.numDirectionalShadows=M,S.numPointShadows=y,S.numSpotShadows=_,S.numSpotMaps=T,S.numLightProbes=R,i.version=$T++)}function l(c,u){let h=0,f=0,d=0,g=0,v=0;const m=u.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const y=c[p];if(y.isDirectionalLight){const _=i.directional[h];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),h++}else if(y.isSpotLight){const _=i.spot[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),d++}else if(y.isRectAreaLight){const _=i.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const _=i.point[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const _=i.hemi[v];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:i}}function ip(n){const t=new ZT(n),e=[],i=[],s=[];function r(f){h.camera=f,e.length=0,i.length=0,s.length=0}function o(f){e.push(f)}function a(f){i.push(f)}function l(f){s.push(f)}function c(){t.setup(e)}function u(f){t.setupView(e,f)}const h={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function JT(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new ip(n),t.set(s,[a])):r>=o.length?(a=new ip(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const jT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,QT=`uniform sampler2D shadow_pass;
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
}`,tw=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],ew=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],sp=new se,Zr=new D,bc=new D;function nw(n,t,e){let i=new Gh;const s=new gt,r=new gt,o=new Ae,a=new cS,l=new uS,c={},u=e.maxTextureSize,h={[ls]:fn,[fn]:ls,[Oe]:Oe},f=new di({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:jT,fragmentShader:QT}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new He;g.setAttribute("position",new dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new St(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fa;let p=this.type;this.render=function(E,R,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===nv&&(Xt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Fa);const w=n.getRenderTarget(),L=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),U=n.state;U.setBlending(Di),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const q=p!==this.type;q&&R.traverse(function(J){J.material&&(Array.isArray(J.material)?J.material.forEach(H=>H.needsUpdate=!0):J.material.needsUpdate=!0)});for(let J=0,H=E.length;J<H;J++){const Y=E[J],z=Y.shadow;if(z===void 0){Xt("WebGLShadowMap:",Y,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const K=z.getFrameExtents();s.multiply(K),r.copy(z.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/K.x),s.x=r.x*K.x,z.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/K.y),s.y=r.y*K.y,z.mapSize.y=r.y));const rt=n.state.buffers.depth.getReversed();if(z.camera._reversedDepth=rt,z.map===null||q===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===eo){if(Y.isPointLight){Xt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new ci(s.x,s.y,{format:Rs,type:Oi,minFilter:$e,magFilter:$e,generateMipmaps:!1}),z.map.texture.name=Y.name+".shadowMap",z.map.depthTexture=new Rr(s.x,s.y,Un),z.map.depthTexture.name=Y.name+".shadowMapDepth",z.map.depthTexture.format=Bi,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ve,z.map.depthTexture.magFilter=Ve}else Y.isPointLight?(z.map=new W0(s.x),z.map.depthTexture=new TM(s.x,fi)):(z.map=new ci(s.x,s.y),z.map.depthTexture=new Rr(s.x,s.y,fi)),z.map.depthTexture.name=Y.name+".shadowMap",z.map.depthTexture.format=Bi,this.type===Fa?(z.map.depthTexture.compareFunction=rt?Fh:Uh,z.map.depthTexture.minFilter=$e,z.map.depthTexture.magFilter=$e):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ve,z.map.depthTexture.magFilter=Ve);z.camera.updateProjectionMatrix()}const pt=z.map.isWebGLCubeRenderTarget?6:1;for(let xt=0;xt<pt;xt++){if(z.map.isWebGLCubeRenderTarget)n.setRenderTarget(z.map,xt),n.clear();else{xt===0&&(n.setRenderTarget(z.map),n.clear());const vt=z.getViewport(xt);o.set(r.x*vt.x,r.y*vt.y,r.x*vt.z,r.y*vt.w),U.viewport(o)}if(Y.isPointLight){const vt=z.camera,te=z.matrix,pe=Y.distance||vt.far;pe!==vt.far&&(vt.far=pe,vt.updateProjectionMatrix()),Zr.setFromMatrixPosition(Y.matrixWorld),vt.position.copy(Zr),bc.copy(vt.position),bc.add(tw[xt]),vt.up.copy(ew[xt]),vt.lookAt(bc),vt.updateMatrixWorld(),te.makeTranslation(-Zr.x,-Zr.y,-Zr.z),sp.multiplyMatrices(vt.projectionMatrix,vt.matrixWorldInverse),z._frustum.setFromProjectionMatrix(sp,vt.coordinateSystem,vt.reversedDepth)}else z.updateMatrices(Y);i=z.getFrustum(),_(R,S,z.camera,Y,this.type)}z.isPointLightShadow!==!0&&this.type===eo&&M(z,S),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(w,L,I)};function M(E,R){const S=t.update(v);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ci(s.x,s.y,{format:Rs,type:Oi})),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(R,null,S,f,v,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(R,null,S,d,v,null)}function y(E,R,S,w){let L=null;const I=S.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)L=I;else if(L=S.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const U=L.uuid,q=R.uuid;let J=c[U];J===void 0&&(J={},c[U]=J);let H=J[q];H===void 0&&(H=L.clone(),J[q]=H,R.addEventListener("dispose",T)),L=H}if(L.visible=R.visible,L.wireframe=R.wireframe,w===eo?L.side=R.shadowSide!==null?R.shadowSide:R.side:L.side=R.shadowSide!==null?R.shadowSide:h[R.side],L.alphaMap=R.alphaMap,L.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,L.map=R.map,L.clipShadows=R.clipShadows,L.clippingPlanes=R.clippingPlanes,L.clipIntersection=R.clipIntersection,L.displacementMap=R.displacementMap,L.displacementScale=R.displacementScale,L.displacementBias=R.displacementBias,L.wireframeLinewidth=R.wireframeLinewidth,L.linewidth=R.linewidth,S.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const U=n.properties.get(L);U.light=S}return L}function _(E,R,S,w,L){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&L===eo)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,E.matrixWorld);const q=t.update(E),J=E.material;if(Array.isArray(J)){const H=q.groups;for(let Y=0,z=H.length;Y<z;Y++){const K=H[Y],rt=J[K.materialIndex];if(rt&&rt.visible){const pt=y(E,rt,w,L);E.onBeforeShadow(n,E,R,S,q,pt,K),n.renderBufferDirect(S,null,q,pt,E,K),E.onAfterShadow(n,E,R,S,q,pt,K)}}}else if(J.visible){const H=y(E,J,w,L);E.onBeforeShadow(n,E,R,S,q,H,null),n.renderBufferDirect(S,null,q,H,E,null),E.onAfterShadow(n,E,R,S,q,H,null)}}const U=E.children;for(let q=0,J=U.length;q<J;q++)_(U[q],R,S,w,L)}function T(E){E.target.removeEventListener("dispose",T);for(const S in c){const w=c[S],L=E.target.uuid;L in w&&(w[L].dispose(),delete w[L])}}}function iw(n,t){function e(){let O=!1;const yt=new Ae;let st=null;const Et=new Ae(0,0,0,0);return{setMask:function(Ct){st!==Ct&&!O&&(n.colorMask(Ct,Ct,Ct,Ct),st=Ct)},setLocked:function(Ct){O=Ct},setClear:function(Ct,lt,Ht,Ot,Ce){Ce===!0&&(Ct*=Ot,lt*=Ot,Ht*=Ot),yt.set(Ct,lt,Ht,Ot),Et.equals(yt)===!1&&(n.clearColor(Ct,lt,Ht,Ot),Et.copy(yt))},reset:function(){O=!1,st=null,Et.set(-1,0,0,0)}}}function i(){let O=!1,yt=!1,st=null,Et=null,Ct=null;return{setReversed:function(lt){if(yt!==lt){const Ht=t.get("EXT_clip_control");lt?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT),yt=lt;const Ot=Ct;Ct=null,this.setClear(Ot)}},getReversed:function(){return yt},setTest:function(lt){lt?ot(n.DEPTH_TEST):Ft(n.DEPTH_TEST)},setMask:function(lt){st!==lt&&!O&&(n.depthMask(lt),st=lt)},setFunc:function(lt){if(yt&&(lt=Uv[lt]),Et!==lt){switch(lt){case Jc:n.depthFunc(n.NEVER);break;case jc:n.depthFunc(n.ALWAYS);break;case Qc:n.depthFunc(n.LESS);break;case wr:n.depthFunc(n.LEQUAL);break;case tu:n.depthFunc(n.EQUAL);break;case eu:n.depthFunc(n.GEQUAL);break;case nu:n.depthFunc(n.GREATER);break;case iu:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Et=lt}},setLocked:function(lt){O=lt},setClear:function(lt){Ct!==lt&&(Ct=lt,yt&&(lt=1-lt),n.clearDepth(lt))},reset:function(){O=!1,st=null,Et=null,Ct=null,yt=!1}}}function s(){let O=!1,yt=null,st=null,Et=null,Ct=null,lt=null,Ht=null,Ot=null,Ce=null;return{setTest:function(Me){O||(Me?ot(n.STENCIL_TEST):Ft(n.STENCIL_TEST))},setMask:function(Me){yt!==Me&&!O&&(n.stencilMask(Me),yt=Me)},setFunc:function(Me,Yn,qn){(st!==Me||Et!==Yn||Ct!==qn)&&(n.stencilFunc(Me,Yn,qn),st=Me,Et=Yn,Ct=qn)},setOp:function(Me,Yn,qn){(lt!==Me||Ht!==Yn||Ot!==qn)&&(n.stencilOp(Me,Yn,qn),lt=Me,Ht=Yn,Ot=qn)},setLocked:function(Me){O=Me},setClear:function(Me){Ce!==Me&&(n.clearStencil(Me),Ce=Me)},reset:function(){O=!1,yt=null,st=null,Et=null,Ct=null,lt=null,Ht=null,Ot=null,Ce=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},h={},f={},d=new WeakMap,g=[],v=null,m=!1,p=null,M=null,y=null,_=null,T=null,E=null,R=null,S=new Bt(0,0,0),w=0,L=!1,I=null,U=null,q=null,J=null,H=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,K=0;const rt=n.getParameter(n.VERSION);rt.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(rt)[1]),z=K>=1):rt.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(rt)[1]),z=K>=2);let pt=null,xt={};const vt=n.getParameter(n.SCISSOR_BOX),te=n.getParameter(n.VIEWPORT),pe=new Ae().fromArray(vt),ft=new Ae().fromArray(te);function V(O,yt,st,Et){const Ct=new Uint8Array(4),lt=n.createTexture();n.bindTexture(O,lt),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ht=0;Ht<st;Ht++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(yt,0,n.RGBA,1,1,Et,0,n.RGBA,n.UNSIGNED_BYTE,Ct):n.texImage2D(yt+Ht,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ct);return lt}const at={};at[n.TEXTURE_2D]=V(n.TEXTURE_2D,n.TEXTURE_2D,1),at[n.TEXTURE_CUBE_MAP]=V(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[n.TEXTURE_2D_ARRAY]=V(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),at[n.TEXTURE_3D]=V(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(n.DEPTH_TEST),o.setFunc(wr),it(!1),dt(Wf),ot(n.CULL_FACE),tt(Di);function ot(O){u[O]!==!0&&(n.enable(O),u[O]=!0)}function Ft(O){u[O]!==!1&&(n.disable(O),u[O]=!1)}function $t(O,yt){return f[O]!==yt?(n.bindFramebuffer(O,yt),f[O]=yt,O===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=yt),O===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=yt),!0):!1}function Yt(O,yt){let st=g,Et=!1;if(O){st=d.get(yt),st===void 0&&(st=[],d.set(yt,st));const Ct=O.textures;if(st.length!==Ct.length||st[0]!==n.COLOR_ATTACHMENT0){for(let lt=0,Ht=Ct.length;lt<Ht;lt++)st[lt]=n.COLOR_ATTACHMENT0+lt;st.length=Ct.length,Et=!0}}else st[0]!==n.BACK&&(st[0]=n.BACK,Et=!0);Et&&n.drawBuffers(st)}function P(O){return v!==O?(n.useProgram(O),v=O,!0):!1}const N={[vs]:n.FUNC_ADD,[sv]:n.FUNC_SUBTRACT,[rv]:n.FUNC_REVERSE_SUBTRACT};N[ov]=n.MIN,N[av]=n.MAX;const X={[lv]:n.ZERO,[cv]:n.ONE,[uv]:n.SRC_COLOR,[Kc]:n.SRC_ALPHA,[gv]:n.SRC_ALPHA_SATURATE,[pv]:n.DST_COLOR,[fv]:n.DST_ALPHA,[hv]:n.ONE_MINUS_SRC_COLOR,[Zc]:n.ONE_MINUS_SRC_ALPHA,[mv]:n.ONE_MINUS_DST_COLOR,[dv]:n.ONE_MINUS_DST_ALPHA,[_v]:n.CONSTANT_COLOR,[xv]:n.ONE_MINUS_CONSTANT_COLOR,[vv]:n.CONSTANT_ALPHA,[Mv]:n.ONE_MINUS_CONSTANT_ALPHA};function tt(O,yt,st,Et,Ct,lt,Ht,Ot,Ce,Me){if(O===Di){m===!0&&(Ft(n.BLEND),m=!1);return}if(m===!1&&(ot(n.BLEND),m=!0),O!==iv){if(O!==p||Me!==L){if((M!==vs||T!==vs)&&(n.blendEquation(n.FUNC_ADD),M=vs,T=vs),Me)switch(O){case vr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ja:n.blendFunc(n.ONE,n.ONE);break;case Xf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Yf:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:re("WebGLState: Invalid blending: ",O);break}else switch(O){case vr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ja:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Xf:re("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yf:re("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:re("WebGLState: Invalid blending: ",O);break}y=null,_=null,E=null,R=null,S.set(0,0,0),w=0,p=O,L=Me}return}Ct=Ct||yt,lt=lt||st,Ht=Ht||Et,(yt!==M||Ct!==T)&&(n.blendEquationSeparate(N[yt],N[Ct]),M=yt,T=Ct),(st!==y||Et!==_||lt!==E||Ht!==R)&&(n.blendFuncSeparate(X[st],X[Et],X[lt],X[Ht]),y=st,_=Et,E=lt,R=Ht),(Ot.equals(S)===!1||Ce!==w)&&(n.blendColor(Ot.r,Ot.g,Ot.b,Ce),S.copy(Ot),w=Ce),p=O,L=!1}function j(O,yt){O.side===Oe?Ft(n.CULL_FACE):ot(n.CULL_FACE);let st=O.side===fn;yt&&(st=!st),it(st),O.blending===vr&&O.transparent===!1?tt(Di):tt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const Et=O.stencilWrite;a.setTest(Et),Et&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),ct(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ot(n.SAMPLE_ALPHA_TO_COVERAGE):Ft(n.SAMPLE_ALPHA_TO_COVERAGE)}function it(O){I!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),I=O)}function dt(O){O!==tv?(ot(n.CULL_FACE),O!==U&&(O===Wf?n.cullFace(n.BACK):O===ev?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ft(n.CULL_FACE),U=O}function ut(O){O!==q&&(z&&n.lineWidth(O),q=O)}function ct(O,yt,st){O?(ot(n.POLYGON_OFFSET_FILL),(J!==yt||H!==st)&&(J=yt,H=st,o.getReversed()&&(yt=-yt),n.polygonOffset(yt,st))):Ft(n.POLYGON_OFFSET_FILL)}function et(O){O?ot(n.SCISSOR_TEST):Ft(n.SCISSOR_TEST)}function Pt(O){O===void 0&&(O=n.TEXTURE0+Y-1),pt!==O&&(n.activeTexture(O),pt=O)}function C(O,yt,st){st===void 0&&(pt===null?st=n.TEXTURE0+Y-1:st=pt);let Et=xt[st];Et===void 0&&(Et={type:void 0,texture:void 0},xt[st]=Et),(Et.type!==O||Et.texture!==yt)&&(pt!==st&&(n.activeTexture(st),pt=st),n.bindTexture(O,yt||at[O]),Et.type=O,Et.texture=yt)}function Dt(){const O=xt[pt];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Tt(){try{n.compressedTexImage2D(...arguments)}catch(O){re("WebGLState:",O)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(O){re("WebGLState:",O)}}function x(){try{n.texSubImage2D(...arguments)}catch(O){re("WebGLState:",O)}}function F(){try{n.texSubImage3D(...arguments)}catch(O){re("WebGLState:",O)}}function G(){try{n.compressedTexSubImage2D(...arguments)}catch(O){re("WebGLState:",O)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(O){re("WebGLState:",O)}}function ht(){try{n.texStorage2D(...arguments)}catch(O){re("WebGLState:",O)}}function _t(){try{n.texStorage3D(...arguments)}catch(O){re("WebGLState:",O)}}function Q(){try{n.texImage2D(...arguments)}catch(O){re("WebGLState:",O)}}function nt(){try{n.texImage3D(...arguments)}catch(O){re("WebGLState:",O)}}function mt(O){return h[O]!==void 0?h[O]:n.getParameter(O)}function It(O,yt){h[O]!==yt&&(n.pixelStorei(O,yt),h[O]=yt)}function bt(O){pe.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),pe.copy(O))}function Mt(O){ft.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),ft.copy(O))}function Wt(O,yt){let st=c.get(yt);st===void 0&&(st=new WeakMap,c.set(yt,st));let Et=st.get(O);Et===void 0&&(Et=n.getUniformBlockIndex(yt,O.name),st.set(O,Et))}function qt(O,yt){const Et=c.get(yt).get(O);l.get(yt)!==Et&&(n.uniformBlockBinding(yt,Et,O.__bindingPointIndex),l.set(yt,Et))}function Jt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},pt=null,xt={},f={},d=new WeakMap,g=[],v=null,m=!1,p=null,M=null,y=null,_=null,T=null,E=null,R=null,S=new Bt(0,0,0),w=0,L=!1,I=null,U=null,q=null,J=null,H=null,pe.set(0,0,n.canvas.width,n.canvas.height),ft.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ot,disable:Ft,bindFramebuffer:$t,drawBuffers:Yt,useProgram:P,setBlending:tt,setMaterial:j,setFlipSided:it,setCullFace:dt,setLineWidth:ut,setPolygonOffset:ct,setScissorTest:et,activeTexture:Pt,bindTexture:C,unbindTexture:Dt,compressedTexImage2D:Tt,compressedTexImage3D:A,texImage2D:Q,texImage3D:nt,pixelStorei:It,getParameter:mt,updateUBOMapping:Wt,uniformBlockBinding:qt,texStorage2D:ht,texStorage3D:_t,texSubImage2D:x,texSubImage3D:F,compressedTexSubImage2D:G,compressedTexSubImage3D:Z,scissor:bt,viewport:Mt,reset:Jt}}function sw(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new gt,u=new WeakMap,h=new Set;let f;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(A,x){return g?new OffscreenCanvas(A,x):il("canvas")}function m(A,x,F){let G=1;const Z=Tt(A);if((Z.width>F||Z.height>F)&&(G=F/Math.max(Z.width,Z.height)),G<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ht=Math.floor(G*Z.width),_t=Math.floor(G*Z.height);f===void 0&&(f=v(ht,_t));const Q=x?v(ht,_t):f;return Q.width=ht,Q.height=_t,Q.getContext("2d").drawImage(A,0,0,ht,_t),Xt("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ht+"x"+_t+")."),Q}else return"data"in A&&Xt("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),A;return A}function p(A){return A.generateMipmaps}function M(A){n.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function _(A,x,F,G,Z,ht=!1){if(A!==null){if(n[A]!==void 0)return n[A];Xt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let _t;G&&(_t=t.get("EXT_texture_norm16"),_t||Xt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=x;if(x===n.RED&&(F===n.FLOAT&&(Q=n.R32F),F===n.HALF_FLOAT&&(Q=n.R16F),F===n.UNSIGNED_BYTE&&(Q=n.R8),F===n.UNSIGNED_SHORT&&_t&&(Q=_t.R16_EXT),F===n.SHORT&&_t&&(Q=_t.R16_SNORM_EXT)),x===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.R8UI),F===n.UNSIGNED_SHORT&&(Q=n.R16UI),F===n.UNSIGNED_INT&&(Q=n.R32UI),F===n.BYTE&&(Q=n.R8I),F===n.SHORT&&(Q=n.R16I),F===n.INT&&(Q=n.R32I)),x===n.RG&&(F===n.FLOAT&&(Q=n.RG32F),F===n.HALF_FLOAT&&(Q=n.RG16F),F===n.UNSIGNED_BYTE&&(Q=n.RG8),F===n.UNSIGNED_SHORT&&_t&&(Q=_t.RG16_EXT),F===n.SHORT&&_t&&(Q=_t.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.RG8UI),F===n.UNSIGNED_SHORT&&(Q=n.RG16UI),F===n.UNSIGNED_INT&&(Q=n.RG32UI),F===n.BYTE&&(Q=n.RG8I),F===n.SHORT&&(Q=n.RG16I),F===n.INT&&(Q=n.RG32I)),x===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),F===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),F===n.UNSIGNED_INT&&(Q=n.RGB32UI),F===n.BYTE&&(Q=n.RGB8I),F===n.SHORT&&(Q=n.RGB16I),F===n.INT&&(Q=n.RGB32I)),x===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),F===n.UNSIGNED_INT&&(Q=n.RGBA32UI),F===n.BYTE&&(Q=n.RGBA8I),F===n.SHORT&&(Q=n.RGBA16I),F===n.INT&&(Q=n.RGBA32I)),x===n.RGB&&(F===n.UNSIGNED_SHORT&&_t&&(Q=_t.RGB16_EXT),F===n.SHORT&&_t&&(Q=_t.RGB16_SNORM_EXT),F===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),x===n.RGBA){const nt=ht?nl:oe.getTransfer(Z);F===n.FLOAT&&(Q=n.RGBA32F),F===n.HALF_FLOAT&&(Q=n.RGBA16F),F===n.UNSIGNED_BYTE&&(Q=nt===fe?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT&&_t&&(Q=_t.RGBA16_EXT),F===n.SHORT&&_t&&(Q=_t.RGBA16_SNORM_EXT),F===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function T(A,x){let F;return A?x===null||x===fi||x===Eo?F=n.DEPTH24_STENCIL8:x===Un?F=n.DEPTH32F_STENCIL8:x===bo&&(F=n.DEPTH24_STENCIL8,Xt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===fi||x===Eo?F=n.DEPTH_COMPONENT24:x===Un?F=n.DEPTH_COMPONENT32F:x===bo&&(F=n.DEPTH_COMPONENT16),F}function E(A,x){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ve&&A.minFilter!==$e?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function R(A){const x=A.target;x.removeEventListener("dispose",R),w(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&h.delete(x)}function S(A){const x=A.target;x.removeEventListener("dispose",S),I(x)}function w(A){const x=i.get(A);if(x.__webglInit===void 0)return;const F=A.source,G=d.get(F);if(G){const Z=G[x.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&L(A),Object.keys(G).length===0&&d.delete(F)}i.remove(A)}function L(A){const x=i.get(A);n.deleteTexture(x.__webglTexture);const F=A.source,G=d.get(F);delete G[x.__cacheKey],o.memory.textures--}function I(A){const x=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(x.__webglFramebuffer[G]))for(let Z=0;Z<x.__webglFramebuffer[G].length;Z++)n.deleteFramebuffer(x.__webglFramebuffer[G][Z]);else n.deleteFramebuffer(x.__webglFramebuffer[G]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[G])}else{if(Array.isArray(x.__webglFramebuffer))for(let G=0;G<x.__webglFramebuffer.length;G++)n.deleteFramebuffer(x.__webglFramebuffer[G]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let G=0;G<x.__webglColorRenderbuffer.length;G++)x.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[G]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const F=A.textures;for(let G=0,Z=F.length;G<Z;G++){const ht=i.get(F[G]);ht.__webglTexture&&(n.deleteTexture(ht.__webglTexture),o.memory.textures--),i.remove(F[G])}i.remove(A)}let U=0;function q(){U=0}function J(){return U}function H(A){U=A}function Y(){const A=U;return A>=s.maxTextures&&Xt("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),U+=1,A}function z(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function K(A,x){const F=i.get(A);if(A.isVideoTexture&&C(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&F.__version!==A.version){const G=A.image;if(G===null)Xt("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)Xt("WebGLRenderer: Texture marked for update but image is incomplete");else{Ft(F,A,x);return}}else A.isExternalTexture&&(F.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+x)}function rt(A,x){const F=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){Ft(F,A,x);return}else A.isExternalTexture&&(F.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+x)}function pt(A,x){const F=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){Ft(F,A,x);return}e.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+x)}function xt(A,x){const F=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&F.__version!==A.version){$t(F,A,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+x)}const vt={[su]:n.REPEAT,[Pi]:n.CLAMP_TO_EDGE,[ru]:n.MIRRORED_REPEAT},te={[Ve]:n.NEAREST,[bv]:n.NEAREST_MIPMAP_NEAREST,[Go]:n.NEAREST_MIPMAP_LINEAR,[$e]:n.LINEAR,[Vl]:n.LINEAR_MIPMAP_NEAREST,[Ss]:n.LINEAR_MIPMAP_LINEAR},pe={[wv]:n.NEVER,[Lv]:n.ALWAYS,[Av]:n.LESS,[Uh]:n.LEQUAL,[Rv]:n.EQUAL,[Fh]:n.GEQUAL,[Cv]:n.GREATER,[Pv]:n.NOTEQUAL};function ft(A,x){if(x.type===Un&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===$e||x.magFilter===Vl||x.magFilter===Go||x.magFilter===Ss||x.minFilter===$e||x.minFilter===Vl||x.minFilter===Go||x.minFilter===Ss)&&Xt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,vt[x.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,vt[x.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,vt[x.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,te[x.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,te[x.minFilter]),x.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,pe[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ve||x.minFilter!==Go&&x.minFilter!==Ss||x.type===Un&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");n.texParameterf(A,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function V(A,x){let F=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",R));const G=x.source;let Z=d.get(G);Z===void 0&&(Z={},d.set(G,Z));const ht=z(x);if(ht!==A.__cacheKey){Z[ht]===void 0&&(Z[ht]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,F=!0),Z[ht].usedTimes++;const _t=Z[A.__cacheKey];_t!==void 0&&(Z[A.__cacheKey].usedTimes--,_t.usedTimes===0&&L(x)),A.__cacheKey=ht,A.__webglTexture=Z[ht].texture}return F}function at(A,x,F){return Math.floor(Math.floor(A/F)/x)}function ot(A,x,F,G){const ht=A.updateRanges;if(ht.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,F,G,x.data);else{ht.sort((It,bt)=>It.start-bt.start);let _t=0;for(let It=1;It<ht.length;It++){const bt=ht[_t],Mt=ht[It],Wt=bt.start+bt.count,qt=at(Mt.start,x.width,4),Jt=at(bt.start,x.width,4);Mt.start<=Wt+1&&qt===Jt&&at(Mt.start+Mt.count-1,x.width,4)===qt?bt.count=Math.max(bt.count,Mt.start+Mt.count-bt.start):(++_t,ht[_t]=Mt)}ht.length=_t+1;const Q=e.getParameter(n.UNPACK_ROW_LENGTH),nt=e.getParameter(n.UNPACK_SKIP_PIXELS),mt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let It=0,bt=ht.length;It<bt;It++){const Mt=ht[It],Wt=Math.floor(Mt.start/4),qt=Math.ceil(Mt.count/4),Jt=Wt%x.width,O=Math.floor(Wt/x.width),yt=qt,st=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Jt),e.pixelStorei(n.UNPACK_SKIP_ROWS,O),e.texSubImage2D(n.TEXTURE_2D,0,Jt,O,yt,st,F,G,x.data)}A.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Q),e.pixelStorei(n.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(n.UNPACK_SKIP_ROWS,mt)}}function Ft(A,x,F){let G=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(G=n.TEXTURE_3D);const Z=V(A,x),ht=x.source;e.bindTexture(G,A.__webglTexture,n.TEXTURE0+F);const _t=i.get(ht);if(ht.version!==_t.__version||Z===!0){if(e.activeTexture(n.TEXTURE0+F),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const st=oe.getPrimaries(oe.workingColorSpace),Et=x.colorSpace===ss?null:oe.getPrimaries(x.colorSpace),Ct=x.colorSpace===ss||st===Et?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct)}e.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let nt=m(x.image,!1,s.maxTextureSize);nt=Dt(x,nt);const mt=r.convert(x.format,x.colorSpace),It=r.convert(x.type);let bt=_(x.internalFormat,mt,It,x.normalized,x.colorSpace,x.isVideoTexture);ft(G,x);let Mt;const Wt=x.mipmaps,qt=x.isVideoTexture!==!0,Jt=_t.__version===void 0||Z===!0,O=ht.dataReady,yt=E(x,nt);if(x.isDepthTexture)bt=T(x.format===ys,x.type),Jt&&(qt?e.texStorage2D(n.TEXTURE_2D,1,bt,nt.width,nt.height):e.texImage2D(n.TEXTURE_2D,0,bt,nt.width,nt.height,0,mt,It,null));else if(x.isDataTexture)if(Wt.length>0){qt&&Jt&&e.texStorage2D(n.TEXTURE_2D,yt,bt,Wt[0].width,Wt[0].height);for(let st=0,Et=Wt.length;st<Et;st++)Mt=Wt[st],qt?O&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,Mt.width,Mt.height,mt,It,Mt.data):e.texImage2D(n.TEXTURE_2D,st,bt,Mt.width,Mt.height,0,mt,It,Mt.data);x.generateMipmaps=!1}else qt?(Jt&&e.texStorage2D(n.TEXTURE_2D,yt,bt,nt.width,nt.height),O&&ot(x,nt,mt,It)):e.texImage2D(n.TEXTURE_2D,0,bt,nt.width,nt.height,0,mt,It,nt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){qt&&Jt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,yt,bt,Wt[0].width,Wt[0].height,nt.depth);for(let st=0,Et=Wt.length;st<Et;st++)if(Mt=Wt[st],x.format!==Fn)if(mt!==null)if(qt){if(O)if(x.layerUpdates.size>0){const Ct=Ud(Mt.width,Mt.height,x.format,x.type);for(const lt of x.layerUpdates){const Ht=Mt.data.subarray(lt*Ct/Mt.data.BYTES_PER_ELEMENT,(lt+1)*Ct/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,lt,Mt.width,Mt.height,1,mt,Ht)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,0,Mt.width,Mt.height,nt.depth,mt,Mt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,st,bt,Mt.width,Mt.height,nt.depth,0,Mt.data,0,0);else Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qt?O&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,0,Mt.width,Mt.height,nt.depth,mt,It,Mt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,st,bt,Mt.width,Mt.height,nt.depth,0,mt,It,Mt.data)}else{qt&&Jt&&e.texStorage2D(n.TEXTURE_2D,yt,bt,Wt[0].width,Wt[0].height);for(let st=0,Et=Wt.length;st<Et;st++)Mt=Wt[st],x.format!==Fn?mt!==null?qt?O&&e.compressedTexSubImage2D(n.TEXTURE_2D,st,0,0,Mt.width,Mt.height,mt,Mt.data):e.compressedTexImage2D(n.TEXTURE_2D,st,bt,Mt.width,Mt.height,0,Mt.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qt?O&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,Mt.width,Mt.height,mt,It,Mt.data):e.texImage2D(n.TEXTURE_2D,st,bt,Mt.width,Mt.height,0,mt,It,Mt.data)}else if(x.isDataArrayTexture)if(qt){if(Jt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,yt,bt,nt.width,nt.height,nt.depth),O)if(x.layerUpdates.size>0){const st=Ud(nt.width,nt.height,x.format,x.type);for(const Et of x.layerUpdates){const Ct=nt.data.subarray(Et*st/nt.data.BYTES_PER_ELEMENT,(Et+1)*st/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Et,nt.width,nt.height,1,mt,It,Ct)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,mt,It,nt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,bt,nt.width,nt.height,nt.depth,0,mt,It,nt.data);else if(x.isData3DTexture)qt?(Jt&&e.texStorage3D(n.TEXTURE_3D,yt,bt,nt.width,nt.height,nt.depth),O&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,mt,It,nt.data)):e.texImage3D(n.TEXTURE_3D,0,bt,nt.width,nt.height,nt.depth,0,mt,It,nt.data);else if(x.isFramebufferTexture){if(Jt)if(qt)e.texStorage2D(n.TEXTURE_2D,yt,bt,nt.width,nt.height);else{let st=nt.width,Et=nt.height;for(let Ct=0;Ct<yt;Ct++)e.texImage2D(n.TEXTURE_2D,Ct,bt,st,Et,0,mt,It,null),st>>=1,Et>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){const st=n.canvas;if(st.hasAttribute("layoutsubtree")||st.setAttribute("layoutsubtree","true"),nt.parentNode!==st){st.appendChild(nt),h.add(x),st.onpaint=Et=>{const Ct=Et.changedElements;for(const lt of h)Ct.includes(lt.image)&&(lt.needsUpdate=!0)},st.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,nt);else{const Ct=n.RGBA,lt=n.RGBA,Ht=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ct,lt,Ht,nt)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Wt.length>0){if(qt&&Jt){const st=Tt(Wt[0]);e.texStorage2D(n.TEXTURE_2D,yt,bt,st.width,st.height)}for(let st=0,Et=Wt.length;st<Et;st++)Mt=Wt[st],qt?O&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,mt,It,Mt):e.texImage2D(n.TEXTURE_2D,st,bt,mt,It,Mt);x.generateMipmaps=!1}else if(qt){if(Jt){const st=Tt(nt);e.texStorage2D(n.TEXTURE_2D,yt,bt,st.width,st.height)}O&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,mt,It,nt)}else e.texImage2D(n.TEXTURE_2D,0,bt,mt,It,nt);p(x)&&M(G),_t.__version=ht.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function $t(A,x,F){if(x.image.length!==6)return;const G=V(A,x),Z=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+F);const ht=i.get(Z);if(Z.version!==ht.__version||G===!0){e.activeTexture(n.TEXTURE0+F);const _t=oe.getPrimaries(oe.workingColorSpace),Q=x.colorSpace===ss?null:oe.getPrimaries(x.colorSpace),nt=x.colorSpace===ss||_t===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);const mt=x.isCompressedTexture||x.image[0].isCompressedTexture,It=x.image[0]&&x.image[0].isDataTexture,bt=[];for(let lt=0;lt<6;lt++)!mt&&!It?bt[lt]=m(x.image[lt],!0,s.maxCubemapSize):bt[lt]=It?x.image[lt].image:x.image[lt],bt[lt]=Dt(x,bt[lt]);const Mt=bt[0],Wt=r.convert(x.format,x.colorSpace),qt=r.convert(x.type),Jt=_(x.internalFormat,Wt,qt,x.normalized,x.colorSpace),O=x.isVideoTexture!==!0,yt=ht.__version===void 0||G===!0,st=Z.dataReady;let Et=E(x,Mt);ft(n.TEXTURE_CUBE_MAP,x);let Ct;if(mt){O&&yt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Et,Jt,Mt.width,Mt.height);for(let lt=0;lt<6;lt++){Ct=bt[lt].mipmaps;for(let Ht=0;Ht<Ct.length;Ht++){const Ot=Ct[Ht];x.format!==Fn?Wt!==null?O?st&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ht,0,0,Ot.width,Ot.height,Wt,Ot.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ht,Jt,Ot.width,Ot.height,0,Ot.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?st&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ht,0,0,Ot.width,Ot.height,Wt,qt,Ot.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ht,Jt,Ot.width,Ot.height,0,Wt,qt,Ot.data)}}}else{if(Ct=x.mipmaps,O&&yt){Ct.length>0&&Et++;const lt=Tt(bt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Et,Jt,lt.width,lt.height)}for(let lt=0;lt<6;lt++)if(It){O?st&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,bt[lt].width,bt[lt].height,Wt,qt,bt[lt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Jt,bt[lt].width,bt[lt].height,0,Wt,qt,bt[lt].data);for(let Ht=0;Ht<Ct.length;Ht++){const Ce=Ct[Ht].image[lt].image;O?st&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ht+1,0,0,Ce.width,Ce.height,Wt,qt,Ce.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ht+1,Jt,Ce.width,Ce.height,0,Wt,qt,Ce.data)}}else{O?st&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,Wt,qt,bt[lt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Jt,Wt,qt,bt[lt]);for(let Ht=0;Ht<Ct.length;Ht++){const Ot=Ct[Ht];O?st&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ht+1,0,0,Wt,qt,Ot.image[lt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Ht+1,Jt,Wt,qt,Ot.image[lt])}}}p(x)&&M(n.TEXTURE_CUBE_MAP),ht.__version=Z.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Yt(A,x,F,G,Z,ht){const _t=r.convert(F.format,F.colorSpace),Q=r.convert(F.type),nt=_(F.internalFormat,_t,Q,F.normalized,F.colorSpace),mt=i.get(x),It=i.get(F);if(It.__renderTarget=x,!mt.__hasExternalTextures){const bt=Math.max(1,x.width>>ht),Mt=Math.max(1,x.height>>ht);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?e.texImage3D(Z,ht,nt,bt,Mt,x.depth,0,_t,Q,null):e.texImage2D(Z,ht,nt,bt,Mt,0,_t,Q,null)}e.bindFramebuffer(n.FRAMEBUFFER,A),Pt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,Z,It.__webglTexture,0,et(x)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,Z,It.__webglTexture,ht),e.bindFramebuffer(n.FRAMEBUFFER,null)}function P(A,x,F){if(n.bindRenderbuffer(n.RENDERBUFFER,A),x.depthBuffer){const G=x.depthTexture,Z=G&&G.isDepthTexture?G.type:null,ht=T(x.stencilBuffer,Z),_t=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Pt(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,et(x),ht,x.width,x.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,et(x),ht,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,ht,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,_t,n.RENDERBUFFER,A)}else{const G=x.textures;for(let Z=0;Z<G.length;Z++){const ht=G[Z],_t=r.convert(ht.format,ht.colorSpace),Q=r.convert(ht.type),nt=_(ht.internalFormat,_t,Q,ht.normalized,ht.colorSpace);Pt(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,et(x),nt,x.width,x.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,et(x),nt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,nt,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function N(A,x,F){const G=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(x.depthTexture);if(Z.__renderTarget=x,(!Z.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),ft(n.TEXTURE_CUBE_MAP,x.depthTexture);const mt=r.convert(x.depthTexture.format),It=r.convert(x.depthTexture.type);let bt;x.depthTexture.format===Bi?bt=n.DEPTH_COMPONENT24:x.depthTexture.format===ys&&(bt=n.DEPTH24_STENCIL8);for(let Mt=0;Mt<6;Mt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,bt,x.width,x.height,0,mt,It,null)}}else K(x.depthTexture,0);const ht=Z.__webglTexture,_t=et(x),Q=G?n.TEXTURE_CUBE_MAP_POSITIVE_X+F:n.TEXTURE_2D,nt=x.depthTexture.format===ys?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===Bi)Pt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,nt,Q,ht,0,_t):n.framebufferTexture2D(n.FRAMEBUFFER,nt,Q,ht,0);else if(x.depthTexture.format===ys)Pt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,nt,Q,ht,0,_t):n.framebufferTexture2D(n.FRAMEBUFFER,nt,Q,ht,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function X(A){const x=i.get(A),F=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const G=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),G){const Z=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,G.removeEventListener("dispose",Z)};G.addEventListener("dispose",Z),x.__depthDisposeCallback=Z}x.__boundDepthTexture=G}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(F)for(let G=0;G<6;G++)N(x.__webglFramebuffer[G],A,G);else{const G=A.texture.mipmaps;G&&G.length>0?N(x.__webglFramebuffer[0],A,0):N(x.__webglFramebuffer,A,0)}else if(F){x.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[G]),x.__webglDepthbuffer[G]===void 0)x.__webglDepthbuffer[G]=n.createRenderbuffer(),P(x.__webglDepthbuffer[G],A,!1);else{const Z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=x.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,ht),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,ht)}}else{const G=A.texture.mipmaps;if(G&&G.length>0?e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),P(x.__webglDepthbuffer,A,!1);else{const Z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ht),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,ht)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function tt(A,x,F){const G=i.get(A);x!==void 0&&Yt(G.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&X(A)}function j(A){const x=A.texture,F=i.get(A),G=i.get(x);A.addEventListener("dispose",S);const Z=A.textures,ht=A.isWebGLCubeRenderTarget===!0,_t=Z.length>1;if(_t||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=x.version,o.memory.textures++),ht){F.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer[Q]=[];for(let nt=0;nt<x.mipmaps.length;nt++)F.__webglFramebuffer[Q][nt]=n.createFramebuffer()}else F.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer=[];for(let Q=0;Q<x.mipmaps.length;Q++)F.__webglFramebuffer[Q]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(_t)for(let Q=0,nt=Z.length;Q<nt;Q++){const mt=i.get(Z[Q]);mt.__webglTexture===void 0&&(mt.__webglTexture=n.createTexture(),o.memory.textures++)}if(A.samples>0&&Pt(A)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let Q=0;Q<Z.length;Q++){const nt=Z[Q];F.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[Q]);const mt=r.convert(nt.format,nt.colorSpace),It=r.convert(nt.type),bt=_(nt.internalFormat,mt,It,nt.normalized,nt.colorSpace,A.isXRRenderTarget===!0),Mt=et(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Mt,bt,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,F.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),P(F.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ht){e.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),ft(n.TEXTURE_CUBE_MAP,x);for(let Q=0;Q<6;Q++)if(x.mipmaps&&x.mipmaps.length>0)for(let nt=0;nt<x.mipmaps.length;nt++)Yt(F.__webglFramebuffer[Q][nt],A,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,nt);else Yt(F.__webglFramebuffer[Q],A,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(x)&&M(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(_t){for(let Q=0,nt=Z.length;Q<nt;Q++){const mt=Z[Q],It=i.get(mt);let bt=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(bt=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(bt,It.__webglTexture),ft(bt,mt),Yt(F.__webglFramebuffer,A,mt,n.COLOR_ATTACHMENT0+Q,bt,0),p(mt)&&M(bt)}e.unbindTexture()}else{let Q=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Q=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Q,G.__webglTexture),ft(Q,x),x.mipmaps&&x.mipmaps.length>0)for(let nt=0;nt<x.mipmaps.length;nt++)Yt(F.__webglFramebuffer[nt],A,x,n.COLOR_ATTACHMENT0,Q,nt);else Yt(F.__webglFramebuffer,A,x,n.COLOR_ATTACHMENT0,Q,0);p(x)&&M(Q),e.unbindTexture()}A.depthBuffer&&X(A)}function it(A){const x=A.textures;for(let F=0,G=x.length;F<G;F++){const Z=x[F];if(p(Z)){const ht=y(A),_t=i.get(Z).__webglTexture;e.bindTexture(ht,_t),M(ht),e.unbindTexture()}}}const dt=[],ut=[];function ct(A){if(A.samples>0){if(Pt(A)===!1){const x=A.textures,F=A.width,G=A.height;let Z=n.COLOR_BUFFER_BIT;const ht=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_t=i.get(A),Q=x.length>1;if(Q)for(let mt=0;mt<x.length;mt++)e.bindFramebuffer(n.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,_t.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,_t.__webglMultisampledFramebuffer);const nt=A.texture.mipmaps;nt&&nt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,_t.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,_t.__webglFramebuffer);for(let mt=0;mt<x.length;mt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,_t.__webglColorRenderbuffer[mt]);const It=i.get(x[mt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,It,0)}n.blitFramebuffer(0,0,F,G,0,0,F,G,Z,n.NEAREST),l===!0&&(dt.length=0,ut.length=0,dt.push(n.COLOR_ATTACHMENT0+mt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(dt.push(ht),ut.push(ht),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ut)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,dt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let mt=0;mt<x.length;mt++){e.bindFramebuffer(n.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.RENDERBUFFER,_t.__webglColorRenderbuffer[mt]);const It=i.get(x[mt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,_t.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.TEXTURE_2D,It,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,_t.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const x=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function et(A){return Math.min(s.maxSamples,A.samples)}function Pt(A){const x=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function C(A){const x=o.render.frame;u.get(A)!==x&&(u.set(A,x),A.update())}function Dt(A,x){const F=A.colorSpace,G=A.format,Z=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||F!==el&&F!==ss&&(oe.getTransfer(F)===fe?(G!==Fn||Z!==Mn)&&Xt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):re("WebGLTextures: Unsupported texture color space:",F)),x}function Tt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=q,this.getTextureUnits=J,this.setTextureUnits=H,this.setTexture2D=K,this.setTexture2DArray=rt,this.setTexture3D=pt,this.setTextureCube=xt,this.rebindTextures=tt,this.setupRenderTarget=j,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=ct,this.setupDepthRenderbuffer=X,this.setupFrameBufferTexture=Yt,this.useMultisampledRTT=Pt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function rw(n,t){function e(i,s=ss){let r;const o=oe.getTransfer(s);if(i===Mn)return n.UNSIGNED_BYTE;if(i===Ch)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ph)return n.UNSIGNED_SHORT_5_5_5_1;if(i===p0)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===m0)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===f0)return n.BYTE;if(i===d0)return n.SHORT;if(i===bo)return n.UNSIGNED_SHORT;if(i===Rh)return n.INT;if(i===fi)return n.UNSIGNED_INT;if(i===Un)return n.FLOAT;if(i===Oi)return n.HALF_FLOAT;if(i===g0)return n.ALPHA;if(i===_0)return n.RGB;if(i===Fn)return n.RGBA;if(i===Bi)return n.DEPTH_COMPONENT;if(i===ys)return n.DEPTH_STENCIL;if(i===Lh)return n.RED;if(i===Dh)return n.RED_INTEGER;if(i===Rs)return n.RG;if(i===Ih)return n.RG_INTEGER;if(i===Nh)return n.RGBA_INTEGER;if(i===Ba||i===za||i===Ha||i===Ga)if(o===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ba)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===za)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ba)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===za)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ha)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ga)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ou||i===au||i===lu||i===cu)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ou)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===au)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===lu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===cu)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===uu||i===hu||i===fu||i===du||i===pu||i===Qa||i===mu)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===uu||i===hu)return o===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===fu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===du)return r.COMPRESSED_R11_EAC;if(i===pu)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Qa)return r.COMPRESSED_RG11_EAC;if(i===mu)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===gu||i===_u||i===xu||i===vu||i===Mu||i===Su||i===yu||i===bu||i===Eu||i===Tu||i===wu||i===Au||i===Ru||i===Cu)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===gu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===_u)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===xu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===vu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Mu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Su)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===yu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===bu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Eu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Tu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===wu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Au)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ru)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Cu)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Pu||i===Lu||i===Du)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Pu)return o===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Lu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Du)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Iu||i===Nu||i===tl||i===Uu)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Iu)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Nu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===tl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Uu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Eo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const ow=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,aw=`
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

}`;class lw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new C0(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new di({vertexShader:ow,fragmentShader:aw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new St(new Te(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cw extends cs{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,g=null;const v=typeof XRWebGLBinding<"u",m=new lw,p={},M=e.getContextAttributes();let y=null,_=null;const T=[],E=[],R=new gt;let S=null;const w=new Dn;w.viewport=new Ae;const L=new Dn;L.viewport=new Ae;const I=[w,L],U=new gS;let q=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let at=T[V];return at===void 0&&(at=new $l,T[V]=at),at.getTargetRaySpace()},this.getControllerGrip=function(V){let at=T[V];return at===void 0&&(at=new $l,T[V]=at),at.getGripSpace()},this.getHand=function(V){let at=T[V];return at===void 0&&(at=new $l,T[V]=at),at.getHandSpace()};function H(V){const at=E.indexOf(V.inputSource);if(at===-1)return;const ot=T[at];ot!==void 0&&(ot.update(V.inputSource,V.frame,c||o),ot.dispatchEvent({type:V.type,data:V.inputSource}))}function Y(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",z);for(let V=0;V<T.length;V++){const at=E[V];at!==null&&(E[V]=null,T[V].disconnect(at))}q=null,J=null,m.reset();for(const V in p)delete p[V];t.setRenderTarget(y),d=null,f=null,h=null,s=null,_=null,ft.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,i.isPresenting===!0&&Xt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,i.isPresenting===!0&&Xt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(s,e)),h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",z),M.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ot=null,Ft=null,$t=null;M.depth&&($t=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=M.stencil?ys:Bi,Ft=M.stencil?Eo:fi);const Yt={colorFormat:e.RGBA8,depthFormat:$t,scaleFactor:r};h=this.getBinding(),f=h.createProjectionLayer(Yt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new ci(f.textureWidth,f.textureHeight,{format:Fn,type:Mn,depthTexture:new Rr(f.textureWidth,f.textureHeight,Ft,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ot={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,ot),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new ci(d.framebufferWidth,d.framebufferHeight,{format:Fn,type:Mn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ft.setContext(s),ft.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function z(V){for(let at=0;at<V.removed.length;at++){const ot=V.removed[at],Ft=E.indexOf(ot);Ft>=0&&(E[Ft]=null,T[Ft].disconnect(ot))}for(let at=0;at<V.added.length;at++){const ot=V.added[at];let Ft=E.indexOf(ot);if(Ft===-1){for(let Yt=0;Yt<T.length;Yt++)if(Yt>=E.length){E.push(ot),Ft=Yt;break}else if(E[Yt]===null){E[Yt]=ot,Ft=Yt;break}if(Ft===-1)break}const $t=T[Ft];$t&&$t.connect(ot)}}const K=new D,rt=new D;function pt(V,at,ot){K.setFromMatrixPosition(at.matrixWorld),rt.setFromMatrixPosition(ot.matrixWorld);const Ft=K.distanceTo(rt),$t=at.projectionMatrix.elements,Yt=ot.projectionMatrix.elements,P=$t[14]/($t[10]-1),N=$t[14]/($t[10]+1),X=($t[9]+1)/$t[5],tt=($t[9]-1)/$t[5],j=($t[8]-1)/$t[0],it=(Yt[8]+1)/Yt[0],dt=P*j,ut=P*it,ct=Ft/(-j+it),et=ct*-j;if(at.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(et),V.translateZ(ct),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),$t[10]===-1)V.projectionMatrix.copy(at.projectionMatrix),V.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{const Pt=P+ct,C=N+ct,Dt=dt-et,Tt=ut+(Ft-et),A=X*N/C*Pt,x=tt*N/C*Pt;V.projectionMatrix.makePerspective(Dt,Tt,A,x,Pt,C),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function xt(V,at){at===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(at.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let at=V.near,ot=V.far;m.texture!==null&&(m.depthNear>0&&(at=m.depthNear),m.depthFar>0&&(ot=m.depthFar)),U.near=L.near=w.near=at,U.far=L.far=w.far=ot,(q!==U.near||J!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),q=U.near,J=U.far),U.layers.mask=V.layers.mask|6,w.layers.mask=U.layers.mask&-5,L.layers.mask=U.layers.mask&-3;const Ft=V.parent,$t=U.cameras;xt(U,Ft);for(let Yt=0;Yt<$t.length;Yt++)xt($t[Yt],Ft);$t.length===2?pt(U,w,L):U.projectionMatrix.copy(w.projectionMatrix),vt(V,U,Ft)};function vt(V,at,ot){ot===null?V.matrix.copy(at.matrixWorld):(V.matrix.copy(ot.matrixWorld),V.matrix.invert(),V.matrix.multiply(at.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(at.projectionMatrix),V.projectionMatrixInverse.copy(at.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=wo*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(V){l=V,f!==null&&(f.fixedFoveation=V),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=V)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(V){return p[V]};let te=null;function pe(V,at){if(u=at.getViewerPose(c||o),g=at,u!==null){const ot=u.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let Ft=!1;ot.length!==U.cameras.length&&(U.cameras.length=0,Ft=!0);for(let N=0;N<ot.length;N++){const X=ot[N];let tt=null;if(d!==null)tt=d.getViewport(X);else{const it=h.getViewSubImage(f,X);tt=it.viewport,N===0&&(t.setRenderTargetTextures(_,it.colorTexture,it.depthStencilTexture),t.setRenderTarget(_))}let j=I[N];j===void 0&&(j=new Dn,j.layers.enable(N),j.viewport=new Ae,I[N]=j),j.matrix.fromArray(X.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(X.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(tt.x,tt.y,tt.width,tt.height),N===0&&(U.matrix.copy(j.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Ft===!0&&U.cameras.push(j)}const $t=s.enabledFeatures;if($t&&$t.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){h=i.getBinding();const N=h.getDepthInformation(ot[0]);N&&N.isValid&&N.texture&&m.init(N,s.renderState)}if($t&&$t.includes("camera-access")&&v){t.state.unbindTexture(),h=i.getBinding();for(let N=0;N<ot.length;N++){const X=ot[N].camera;if(X){let tt=p[X];tt||(tt=new C0,p[X]=tt);const j=h.getCameraImage(X);tt.sourceTexture=j}}}}for(let ot=0;ot<T.length;ot++){const Ft=E[ot],$t=T[ot];Ft!==null&&$t!==void 0&&$t.update(Ft,at,c||o)}te&&te(V,at),at.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:at}),g=null}const ft=new V0;ft.setAnimationLoop(pe),this.setAnimationLoop=function(V){te=V},this.dispose=function(){}}}const uw=new se,K0=new Kt;K0.set(-1,0,0,0,1,0,0,0,1);function hw(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,z0(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,y,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===fn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===fn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),y=M.envMap,_=M.envMapRotation;y&&(m.envMap.value=y,m.envMapRotation.value.setFromMatrix4(uw.makeRotationFromEuler(_)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(K0),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===fn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function fw(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,T){const E=T.program;i.uniformBlockBinding(_,E)}function c(_,T){let E=s[_.id];E===void 0&&(m(_),E=u(_),s[_.id]=E,_.addEventListener("dispose",M));const R=T.program;i.updateUBOMapping(_,R);const S=t.render.frame;r[_.id]!==S&&(f(_),r[_.id]=S)}function u(_){const T=h();_.__bindingPointIndex=T;const E=n.createBuffer(),R=_.__size,S=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,R,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,E),E}function h(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return re("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const T=s[_.id],E=_.uniforms,R=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let S=0,w=E.length;S<w;S++){const L=E[S];if(Array.isArray(L))for(let I=0,U=L.length;I<U;I++)d(L[I],S,I,R);else d(L,S,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(_,T,E,R){if(v(_,T,E,R)===!0){const S=_.__offset,w=_.value;if(Array.isArray(w)){let L=0;for(let I=0;I<w.length;I++){const U=w[I],q=p(U);g(U,_.__data,L),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(L+=q.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,_.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,S,_.__data)}}function g(_,T,E){typeof _=="number"||typeof _=="boolean"?T[0]=_:_.isMatrix3?(T[0]=_.elements[0],T[1]=_.elements[1],T[2]=_.elements[2],T[3]=0,T[4]=_.elements[3],T[5]=_.elements[4],T[6]=_.elements[5],T[7]=0,T[8]=_.elements[6],T[9]=_.elements[7],T[10]=_.elements[8],T[11]=0):ArrayBuffer.isView(_)?T.set(new _.constructor(_.buffer,_.byteOffset,T.length)):_.toArray(T,E)}function v(_,T,E,R){const S=_.value,w=T+"_"+E;if(R[w]===void 0)return typeof S=="number"||typeof S=="boolean"?R[w]=S:ArrayBuffer.isView(S)?R[w]=S.slice():R[w]=S.clone(),!0;{const L=R[w];if(typeof S=="number"||typeof S=="boolean"){if(L!==S)return R[w]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(L.equals(S)===!1)return L.copy(S),!0}}return!1}function m(_){const T=_.uniforms;let E=0;const R=16;for(let w=0,L=T.length;w<L;w++){const I=Array.isArray(T[w])?T[w]:[T[w]];for(let U=0,q=I.length;U<q;U++){const J=I[U],H=Array.isArray(J.value)?J.value:[J.value];for(let Y=0,z=H.length;Y<z;Y++){const K=H[Y],rt=p(K),pt=E%R,xt=pt%rt.boundary,vt=pt+xt;E+=xt,vt!==0&&R-vt<rt.storage&&(E+=R-vt),J.__data=new Float32Array(rt.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=E,E+=rt.storage}}}const S=E%R;return S>0&&(E+=R-S),_.__size=E,_.__cache={},this}function p(_){const T={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(T.boundary=4,T.storage=4):_.isVector2?(T.boundary=8,T.storage=8):_.isVector3||_.isColor?(T.boundary=16,T.storage=12):_.isVector4?(T.boundary=16,T.storage=16):_.isMatrix3?(T.boundary=48,T.storage=48):_.isMatrix4?(T.boundary=64,T.storage=64):_.isTexture?Xt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(T.boundary=16,T.storage=_.byteLength):Xt("WebGLRenderer: Unsupported uniform value type.",_),T}function M(_){const T=_.target;T.removeEventListener("dispose",M);const E=o.indexOf(T.__bindingPointIndex);o.splice(E,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function y(){for(const _ in s)n.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:l,update:c,dispose:y}}const dw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Jn=null;function pw(){return Jn===null&&(Jn=new T0(dw,16,16,Rs,Oi),Jn.name="DFG_LUT",Jn.minFilter=$e,Jn.magFilter=$e,Jn.wrapS=Pi,Jn.wrapT=Pi,Jn.generateMipmaps=!1,Jn.needsUpdate=!0),Jn}class mw{constructor(t={}){const{canvas:e=Iv(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Mn}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;const v=d,m=new Set([Nh,Ih,Dh]),p=new Set([Mn,fi,bo,Eo,Ch,Ph]),M=new Uint32Array(4),y=new Int32Array(4),_=new D;let T=null,E=null;const R=[],S=[];let w=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let I=!1,U=null,q=null,J=null,H=null;this._outputColorSpace=Ee;let Y=0,z=0,K=null,rt=-1,pt=null;const xt=new Ae,vt=new Ae;let te=null;const pe=new Bt(0);let ft=0,V=e.width,at=e.height,ot=1,Ft=null,$t=null;const Yt=new Ae(0,0,V,at),P=new Ae(0,0,V,at);let N=!1;const X=new Gh;let tt=!1,j=!1;const it=new se,dt=new D,ut=new Ae,ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let et=!1;function Pt(){return K===null?ot:1}let C=i;function Dt(b,B){return e.getContext(b,B)}try{const b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${wh}`),e.addEventListener("webglcontextlost",Ce,!1),e.addEventListener("webglcontextrestored",Me,!1),e.addEventListener("webglcontextcreationerror",Yn,!1),C===null){const B="webgl2";if(C=Dt(B,b),C===null)throw Dt(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw re("WebGLRenderer: "+b.message),b}let Tt,A,x,F,G,Z,ht,_t,Q,nt,mt,It,bt,Mt,Wt,qt,Jt,O,yt,st,Et,Ct,lt;function Ht(){Tt=new pE(C),Tt.init(),Et=new rw(C,Tt),A=new oE(C,Tt,t,Et),x=new iw(C,Tt),A.reversedDepthBuffer&&f&&x.buffers.depth.setReversed(!0),q=C.createFramebuffer(),J=C.createFramebuffer(),H=C.createFramebuffer(),F=new _E(C),G=new kT,Z=new sw(C,Tt,x,G,A,Et,F),ht=new dE(L),_t=new SS(C),Ct=new sE(C,_t),Q=new mE(C,_t,F,Ct),nt=new vE(C,Q,_t,Ct,F),O=new xE(C,A,Z),Wt=new aE(G),mt=new VT(L,ht,Tt,A,Ct,Wt),It=new hw(L,G),bt=new XT,Mt=new JT(Tt),Jt=new iE(L,ht,x,nt,g,l),qt=new nw(L,nt,A),lt=new fw(C,F,A,x),yt=new rE(C,Tt,F),st=new gE(C,Tt,F),F.programs=mt.programs,L.capabilities=A,L.extensions=Tt,L.properties=G,L.renderLists=bt,L.shadowMap=qt,L.state=x,L.info=F}Ht(),v!==Mn&&(w=new SE(v,e.width,e.height,a,s,r));const Ot=new cw(L,C);this.xr=Ot,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const b=Tt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Tt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ot},this.setPixelRatio=function(b){b!==void 0&&(ot=b,this.setSize(V,at,!1))},this.getSize=function(b){return b.set(V,at)},this.setSize=function(b,B,$=!0){if(Ot.isPresenting){Xt("WebGLRenderer: Can't change size while VR device is presenting.");return}V=b,at=B,e.width=Math.floor(b*ot),e.height=Math.floor(B*ot),$===!0&&(e.style.width=b+"px",e.style.height=B+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,b,B)},this.getDrawingBufferSize=function(b){return b.set(V*ot,at*ot).floor()},this.setDrawingBufferSize=function(b,B,$){V=b,at=B,ot=$,e.width=Math.floor(b*$),e.height=Math.floor(B*$),this.setViewport(0,0,b,B)},this.setEffects=function(b){if(v===Mn){re("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let B=0;B<b.length;B++)if(b[B].isOutputPass===!0){Xt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(xt)},this.getViewport=function(b){return b.copy(Yt)},this.setViewport=function(b,B,$,k){b.isVector4?Yt.set(b.x,b.y,b.z,b.w):Yt.set(b,B,$,k),x.viewport(xt.copy(Yt).multiplyScalar(ot).round())},this.getScissor=function(b){return b.copy(P)},this.setScissor=function(b,B,$,k){b.isVector4?P.set(b.x,b.y,b.z,b.w):P.set(b,B,$,k),x.scissor(vt.copy(P).multiplyScalar(ot).round())},this.getScissorTest=function(){return N},this.setScissorTest=function(b){x.setScissorTest(N=b)},this.setOpaqueSort=function(b){Ft=b},this.setTransparentSort=function(b){$t=b},this.getClearColor=function(b){return b.copy(Jt.getClearColor())},this.setClearColor=function(){Jt.setClearColor(...arguments)},this.getClearAlpha=function(){return Jt.getClearAlpha()},this.setClearAlpha=function(){Jt.setClearAlpha(...arguments)},this.clear=function(b=!0,B=!0,$=!0){let k=0;if(b){let W=!1;if(K!==null){const Rt=K.texture.format;W=m.has(Rt)}if(W){const Rt=K.texture.type,Ut=p.has(Rt),At=Jt.getClearColor(),zt=Jt.getClearAlpha(),Gt=At.r,jt=At.g,ie=At.b;Ut?(M[0]=Gt,M[1]=jt,M[2]=ie,M[3]=zt,C.clearBufferuiv(C.COLOR,0,M)):(y[0]=Gt,y[1]=jt,y[2]=ie,y[3]=zt,C.clearBufferiv(C.COLOR,0,y))}else k|=C.COLOR_BUFFER_BIT}B&&(k|=C.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(k|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&C.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),U=b},this.dispose=function(){e.removeEventListener("webglcontextlost",Ce,!1),e.removeEventListener("webglcontextrestored",Me,!1),e.removeEventListener("webglcontextcreationerror",Yn,!1),Jt.dispose(),bt.dispose(),Mt.dispose(),G.dispose(),ht.dispose(),nt.dispose(),Ct.dispose(),lt.dispose(),mt.dispose(),Ot.dispose(),Ot.removeEventListener("sessionstart",of),Ot.removeEventListener("sessionend",af),us.stop()};function Ce(b){b.preventDefault(),sl("WebGLRenderer: Context Lost."),I=!0}function Me(){sl("WebGLRenderer: Context Restored."),I=!1;const b=F.autoReset,B=qt.enabled,$=qt.autoUpdate,k=qt.needsUpdate,W=qt.type;Ht(),F.autoReset=b,qt.enabled=B,qt.autoUpdate=$,qt.needsUpdate=k,qt.type=W}function Yn(b){re("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function qn(b){const B=b.target;B.removeEventListener("dispose",qn),Mg(B)}function Mg(b){Sg(b),G.remove(b)}function Sg(b){const B=G.get(b).programs;B!==void 0&&(B.forEach(function($){mt.releaseProgram($)}),b.isShaderMaterial&&mt.releaseShaderCache(b))}this.renderBufferDirect=function(b,B,$,k,W,Rt){B===null&&(B=ct);const Ut=W.isMesh&&W.matrixWorld.determinantAffine()<0,At=Eg(b,B,$,k,W);x.setMaterial(k,Ut);let zt=$.index,Gt=1;if(k.wireframe===!0){if(zt=Q.getWireframeAttribute($),zt===void 0)return;Gt=2}const jt=$.drawRange,ie=$.attributes.position;let Vt=jt.start*Gt,me=(jt.start+jt.count)*Gt;Rt!==null&&(Vt=Math.max(Vt,Rt.start*Gt),me=Math.min(me,(Rt.start+Rt.count)*Gt)),zt!==null?(Vt=Math.max(Vt,0),me=Math.min(me,zt.count)):ie!=null&&(Vt=Math.max(Vt,0),me=Math.min(me,ie.count));const Le=me-Vt;if(Le<0||Le===1/0)return;Ct.setup(W,k,At,$,zt);let Pe,xe=yt;if(zt!==null&&(Pe=_t.get(zt),xe=st,xe.setIndex(Pe)),W.isMesh)k.wireframe===!0?(x.setLineWidth(k.wireframeLinewidth*Pt()),xe.setMode(C.LINES)):xe.setMode(C.TRIANGLES);else if(W.isLine){let ke=k.linewidth;ke===void 0&&(ke=1),x.setLineWidth(ke*Pt()),W.isLineSegments?xe.setMode(C.LINES):W.isLineLoop?xe.setMode(C.LINE_LOOP):xe.setMode(C.LINE_STRIP)}else W.isPoints?xe.setMode(C.POINTS):W.isSprite&&xe.setMode(C.TRIANGLES);if(W.isBatchedMesh)if(Tt.get("WEBGL_multi_draw"))xe.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const ke=W._multiDrawStarts,Nt=W._multiDrawCounts,pn=W._multiDrawCount,ae=zt?_t.get(zt).bytesPerElement:1,En=G.get(k).currentProgram.getUniforms();for(let $n=0;$n<pn;$n++)En.setValue(C,"_gl_DrawID",$n),xe.render(ke[$n]/ae,Nt[$n])}else if(W.isInstancedMesh)xe.renderInstances(Vt,Le,W.count);else if($.isInstancedBufferGeometry){const ke=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Nt=Math.min($.instanceCount,ke);xe.renderInstances(Vt,Le,Nt)}else xe.render(Vt,Le)};function rf(b,B,$){b.transparent===!0&&b.side===Oe&&b.forceSinglePass===!1?(b.side=fn,b.needsUpdate=!0,Oo(b,B,$),b.side=ls,b.needsUpdate=!0,Oo(b,B,$),b.side=Oe):Oo(b,B,$)}this.compile=function(b,B,$=null){$===null&&($=b),E=Mt.get($),E.init(B),S.push(E),$.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),b!==$&&b.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),E.setupLights();const k=new Set;return b.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Rt=W.material;if(Rt)if(Array.isArray(Rt))for(let Ut=0;Ut<Rt.length;Ut++){const At=Rt[Ut];rf(At,$,W),k.add(At)}else rf(Rt,$,W),k.add(Rt)}),E=S.pop(),k},this.compileAsync=function(b,B,$=null){const k=this.compile(b,B,$);return new Promise(W=>{function Rt(){if(k.forEach(function(Ut){G.get(Ut).currentProgram.isReady()&&k.delete(Ut)}),k.size===0){W(b);return}setTimeout(Rt,10)}Tt.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let Rl=null;function yg(b){Rl&&Rl(b)}function of(){us.stop()}function af(){us.start()}const us=new V0;us.setAnimationLoop(yg),typeof self<"u"&&us.setContext(self),this.setAnimationLoop=function(b){Rl=b,Ot.setAnimationLoop(b),b===null?us.stop():us.start()},Ot.addEventListener("sessionstart",of),Ot.addEventListener("sessionend",af),this.render=function(b,B){if(B!==void 0&&B.isCamera!==!0){re("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;U!==null&&U.renderStart(b,B);const $=Ot.enabled===!0&&Ot.isPresenting===!0,k=w!==null&&(K===null||$)&&w.begin(L,K);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Ot.enabled===!0&&Ot.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ot.cameraAutoUpdate===!0&&Ot.updateCamera(B),B=Ot.getCamera()),b.isScene===!0&&b.onBeforeRender(L,b,B,K),E=Mt.get(b,S.length),E.init(B),E.state.textureUnits=Z.getTextureUnits(),S.push(E),it.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),X.setFromProjectionMatrix(it,oi,B.reversedDepth),j=this.localClippingEnabled,tt=Wt.init(this.clippingPlanes,j),T=bt.get(b,R.length),T.init(),R.push(T),Ot.enabled===!0&&Ot.isPresenting===!0){const Ut=L.xr.getDepthSensingMesh();Ut!==null&&Cl(Ut,B,-1/0,L.sortObjects)}Cl(b,B,0,L.sortObjects),T.finish(),L.sortObjects===!0&&T.sort(Ft,$t,B.reversedDepth),et=Ot.enabled===!1||Ot.isPresenting===!1||Ot.hasDepthSensing()===!1,et&&Jt.addToRenderList(T,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),tt===!0&&Wt.beginShadows();const W=E.state.shadowsArray;if(qt.render(W,b,B),tt===!0&&Wt.endShadows(),(k&&w.hasRenderPass())===!1){const Ut=T.opaque,At=T.transmissive;if(E.setupLights(),B.isArrayCamera){const zt=B.cameras;if(At.length>0)for(let Gt=0,jt=zt.length;Gt<jt;Gt++){const ie=zt[Gt];cf(Ut,At,b,ie)}et&&Jt.render(b);for(let Gt=0,jt=zt.length;Gt<jt;Gt++){const ie=zt[Gt];lf(T,b,ie,ie.viewport)}}else At.length>0&&cf(Ut,At,b,B),et&&Jt.render(b),lf(T,b,B)}K!==null&&z===0&&(Z.updateMultisampleRenderTarget(K),Z.updateRenderTargetMipmap(K)),k&&w.end(L),b.isScene===!0&&b.onAfterRender(L,b,B),Ct.resetDefaultState(),rt=-1,pt=null,S.pop(),S.length>0?(E=S[S.length-1],Z.setTextureUnits(E.state.textureUnits),tt===!0&&Wt.setGlobalState(L.clippingPlanes,E.state.camera)):E=null,R.pop(),R.length>0?T=R[R.length-1]:T=null,U!==null&&U.renderEnd()};function Cl(b,B,$,k){if(b.visible===!1)return;if(b.layers.test(B.layers)){if(b.isGroup)$=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(B);else if(b.isLightProbeGrid)E.pushLightProbeGrid(b);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||X.intersectsSprite(b)){k&&ut.setFromMatrixPosition(b.matrixWorld).applyMatrix4(it);const Ut=nt.update(b),At=b.material;At.visible&&T.push(b,Ut,At,$,ut.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||X.intersectsObject(b))){const Ut=nt.update(b),At=b.material;if(k&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),ut.copy(b.boundingSphere.center)):(Ut.boundingSphere===null&&Ut.computeBoundingSphere(),ut.copy(Ut.boundingSphere.center)),ut.applyMatrix4(b.matrixWorld).applyMatrix4(it)),Array.isArray(At)){const zt=Ut.groups;for(let Gt=0,jt=zt.length;Gt<jt;Gt++){const ie=zt[Gt],Vt=At[ie.materialIndex];Vt&&Vt.visible&&T.push(b,Ut,Vt,$,ut.z,ie)}}else At.visible&&T.push(b,Ut,At,$,ut.z,null)}}const Rt=b.children;for(let Ut=0,At=Rt.length;Ut<At;Ut++)Cl(Rt[Ut],B,$,k)}function lf(b,B,$,k){const{opaque:W,transmissive:Rt,transparent:Ut}=b;E.setupLightsView($),tt===!0&&Wt.setGlobalState(L.clippingPlanes,$),k&&x.viewport(xt.copy(k)),W.length>0&&Fo(W,B,$),Rt.length>0&&Fo(Rt,B,$),Ut.length>0&&Fo(Ut,B,$),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function cf(b,B,$,k){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[k.id]===void 0){const Vt=Tt.has("EXT_color_buffer_half_float")||Tt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[k.id]=new ci(1,1,{generateMipmaps:!0,type:Vt?Oi:Mn,minFilter:Ss,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:oe.workingColorSpace})}const Rt=E.state.transmissionRenderTarget[k.id],Ut=k.viewport||xt;Rt.setSize(Ut.z*L.transmissionResolutionScale,Ut.w*L.transmissionResolutionScale);const At=L.getRenderTarget(),zt=L.getActiveCubeFace(),Gt=L.getActiveMipmapLevel();L.setRenderTarget(Rt),L.getClearColor(pe),ft=L.getClearAlpha(),ft<1&&L.setClearColor(16777215,.5),L.clear(),et&&Jt.render($);const jt=L.toneMapping;L.toneMapping=zn;const ie=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),E.setupLightsView(k),tt===!0&&Wt.setGlobalState(L.clippingPlanes,k),Fo(b,$,k),Z.updateMultisampleRenderTarget(Rt),Z.updateRenderTargetMipmap(Rt),Tt.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let me=0,Le=B.length;me<Le;me++){const Pe=B[me],{object:xe,geometry:ke,material:Nt,group:pn}=Pe;if(Nt.side===Oe&&xe.layers.test(k.layers)){const ae=Nt.side;Nt.side=fn,Nt.needsUpdate=!0,uf(xe,$,k,ke,Nt,pn),Nt.side=ae,Nt.needsUpdate=!0,Vt=!0}}Vt===!0&&(Z.updateMultisampleRenderTarget(Rt),Z.updateRenderTargetMipmap(Rt))}L.setRenderTarget(At,zt,Gt),L.setClearColor(pe,ft),ie!==void 0&&(k.viewport=ie),L.toneMapping=jt}function Fo(b,B,$){const k=B.isScene===!0?B.overrideMaterial:null;for(let W=0,Rt=b.length;W<Rt;W++){const Ut=b[W],{object:At,geometry:zt,group:Gt}=Ut;let jt=Ut.material;jt.allowOverride===!0&&k!==null&&(jt=k),At.layers.test($.layers)&&uf(At,B,$,zt,jt,Gt)}}function uf(b,B,$,k,W,Rt){b.onBeforeRender(L,B,$,k,W,Rt),b.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),W.onBeforeRender(L,B,$,k,b,Rt),W.transparent===!0&&W.side===Oe&&W.forceSinglePass===!1?(W.side=fn,W.needsUpdate=!0,L.renderBufferDirect($,B,k,W,b,Rt),W.side=ls,W.needsUpdate=!0,L.renderBufferDirect($,B,k,W,b,Rt),W.side=Oe):L.renderBufferDirect($,B,k,W,b,Rt),b.onAfterRender(L,B,$,k,W,Rt)}function Oo(b,B,$){B.isScene!==!0&&(B=ct);const k=G.get(b),W=E.state.lights,Rt=E.state.shadowsArray,Ut=W.state.version,At=mt.getParameters(b,W.state,Rt,B,$,E.state.lightProbeGridArray),zt=mt.getProgramCacheKey(At);let Gt=k.programs;k.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?B.environment:null,k.fog=B.fog;const jt=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;k.envMap=ht.get(b.envMap||k.environment,jt),k.envMapRotation=k.environment!==null&&b.envMap===null?B.environmentRotation:b.envMapRotation,Gt===void 0&&(b.addEventListener("dispose",qn),Gt=new Map,k.programs=Gt);let ie=Gt.get(zt);if(ie!==void 0){if(k.currentProgram===ie&&k.lightsStateVersion===Ut)return ff(b,At),ie}else At.uniforms=mt.getUniforms(b),U!==null&&b.isNodeMaterial&&U.build(b,$,At),b.onBeforeCompile(At,L),ie=mt.acquireProgram(At,zt),Gt.set(zt,ie),k.uniforms=At.uniforms;const Vt=k.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Vt.clippingPlanes=Wt.uniform),ff(b,At),k.needsLights=wg(b),k.lightsStateVersion=Ut,k.needsLights&&(Vt.ambientLightColor.value=W.state.ambient,Vt.lightProbe.value=W.state.probe,Vt.directionalLights.value=W.state.directional,Vt.directionalLightShadows.value=W.state.directionalShadow,Vt.spotLights.value=W.state.spot,Vt.spotLightShadows.value=W.state.spotShadow,Vt.rectAreaLights.value=W.state.rectArea,Vt.ltc_1.value=W.state.rectAreaLTC1,Vt.ltc_2.value=W.state.rectAreaLTC2,Vt.pointLights.value=W.state.point,Vt.pointLightShadows.value=W.state.pointShadow,Vt.hemisphereLights.value=W.state.hemi,Vt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Vt.spotLightMatrix.value=W.state.spotLightMatrix,Vt.spotLightMap.value=W.state.spotLightMap,Vt.pointShadowMatrix.value=W.state.pointShadowMatrix),k.lightProbeGrid=E.state.lightProbeGridArray.length>0,k.currentProgram=ie,k.uniformsList=null,ie}function hf(b){if(b.uniformsList===null){const B=b.currentProgram.getUniforms();b.uniformsList=ka.seqWithValue(B.seq,b.uniforms)}return b.uniformsList}function ff(b,B){const $=G.get(b);$.outputColorSpace=B.outputColorSpace,$.batching=B.batching,$.batchingColor=B.batchingColor,$.instancing=B.instancing,$.instancingColor=B.instancingColor,$.instancingMorph=B.instancingMorph,$.skinning=B.skinning,$.morphTargets=B.morphTargets,$.morphNormals=B.morphNormals,$.morphColors=B.morphColors,$.morphTargetsCount=B.morphTargetsCount,$.numClippingPlanes=B.numClippingPlanes,$.numIntersection=B.numClipIntersection,$.vertexAlphas=B.vertexAlphas,$.vertexTangents=B.vertexTangents,$.toneMapping=B.toneMapping}function bg(b,B){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;_.setFromMatrixPosition(B.matrixWorld);for(let $=0,k=b.length;$<k;$++){const W=b[$];if(W.texture!==null&&W.boundingBox.containsPoint(_))return W}return null}function Eg(b,B,$,k,W){B.isScene!==!0&&(B=ct),Z.resetTextureUnits();const Rt=B.fog,Ut=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?B.environment:null,At=K===null?L.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:oe.workingColorSpace,zt=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Gt=ht.get(k.envMap||Ut,zt),jt=k.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ie=!!$.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Vt=!!$.morphAttributes.position,me=!!$.morphAttributes.normal,Le=!!$.morphAttributes.color;let Pe=zn;k.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Pe=L.toneMapping);const xe=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ke=xe!==void 0?xe.length:0,Nt=G.get(k),pn=E.state.lights;if(tt===!0&&(j===!0||b!==pt)){const Se=b===pt&&k.id===rt;Wt.setState(k,b,Se)}let ae=!1;k.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==pn.state.version||Nt.outputColorSpace!==At||W.isBatchedMesh&&Nt.batching===!1||!W.isBatchedMesh&&Nt.batching===!0||W.isBatchedMesh&&Nt.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Nt.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Nt.instancing===!1||!W.isInstancedMesh&&Nt.instancing===!0||W.isSkinnedMesh&&Nt.skinning===!1||!W.isSkinnedMesh&&Nt.skinning===!0||W.isInstancedMesh&&Nt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Nt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Nt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Nt.instancingMorph===!1&&W.morphTexture!==null||Nt.envMap!==Gt||k.fog===!0&&Nt.fog!==Rt||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==Wt.numPlanes||Nt.numIntersection!==Wt.numIntersection)||Nt.vertexAlphas!==jt||Nt.vertexTangents!==ie||Nt.morphTargets!==Vt||Nt.morphNormals!==me||Nt.morphColors!==Le||Nt.toneMapping!==Pe||Nt.morphTargetsCount!==ke||!!Nt.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(ae=!0):(ae=!0,Nt.__version=k.version);let En=Nt.currentProgram;ae===!0&&(En=Oo(k,B,W),U&&k.isNodeMaterial&&U.onUpdateProgram(k,En,Nt));let $n=!1,Vi=!1,Fs=!1;const ve=En.getUniforms(),De=Nt.uniforms;if(x.useProgram(En.program)&&($n=!0,Vi=!0,Fs=!0),k.id!==rt&&(rt=k.id,Vi=!0),Nt.needsLights){const Se=bg(E.state.lightProbeGridArray,W);Nt.lightProbeGrid!==Se&&(Nt.lightProbeGrid=Se,Vi=!0)}if($n||pt!==b){x.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ve.setValue(C,"projectionMatrix",b.projectionMatrix),ve.setValue(C,"viewMatrix",b.matrixWorldInverse);const Wi=ve.map.cameraPosition;Wi!==void 0&&Wi.setValue(C,dt.setFromMatrixPosition(b.matrixWorld)),A.logarithmicDepthBuffer&&ve.setValue(C,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ve.setValue(C,"isOrthographic",b.isOrthographicCamera===!0),pt!==b&&(pt=b,Vi=!0,Fs=!0)}if(Nt.needsLights&&(pn.state.directionalShadowMap.length>0&&ve.setValue(C,"directionalShadowMap",pn.state.directionalShadowMap,Z),pn.state.spotShadowMap.length>0&&ve.setValue(C,"spotShadowMap",pn.state.spotShadowMap,Z),pn.state.pointShadowMap.length>0&&ve.setValue(C,"pointShadowMap",pn.state.pointShadowMap,Z)),W.isSkinnedMesh){ve.setOptional(C,W,"bindMatrix"),ve.setOptional(C,W,"bindMatrixInverse");const Se=W.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),ve.setValue(C,"boneTexture",Se.boneTexture,Z))}W.isBatchedMesh&&(ve.setOptional(C,W,"batchingTexture"),ve.setValue(C,"batchingTexture",W._matricesTexture,Z),ve.setOptional(C,W,"batchingIdTexture"),ve.setValue(C,"batchingIdTexture",W._indirectTexture,Z),ve.setOptional(C,W,"batchingColorTexture"),W._colorsTexture!==null&&ve.setValue(C,"batchingColorTexture",W._colorsTexture,Z));const ki=$.morphAttributes;if((ki.position!==void 0||ki.normal!==void 0||ki.color!==void 0)&&O.update(W,$,En),(Vi||Nt.receiveShadow!==W.receiveShadow)&&(Nt.receiveShadow=W.receiveShadow,ve.setValue(C,"receiveShadow",W.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&B.environment!==null&&(De.envMapIntensity.value=B.environmentIntensity),De.dfgLUT!==void 0&&(De.dfgLUT.value=pw()),Vi){if(ve.setValue(C,"toneMappingExposure",L.toneMappingExposure),Nt.needsLights&&Tg(De,Fs),Rt&&k.fog===!0&&It.refreshFogUniforms(De,Rt),It.refreshMaterialUniforms(De,k,ot,at,E.state.transmissionRenderTarget[b.id]),Nt.needsLights&&Nt.lightProbeGrid){const Se=Nt.lightProbeGrid;De.probesSH.value=Se.texture,De.probesMin.value.copy(Se.boundingBox.min),De.probesMax.value.copy(Se.boundingBox.max),De.probesResolution.value.copy(Se.resolution)}ka.upload(C,hf(Nt),De,Z)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(ka.upload(C,hf(Nt),De,Z),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ve.setValue(C,"center",W.center),ve.setValue(C,"modelViewMatrix",W.modelViewMatrix),ve.setValue(C,"normalMatrix",W.normalMatrix),ve.setValue(C,"modelMatrix",W.matrixWorld),k.uniformsGroups!==void 0){const Se=k.uniformsGroups;for(let Wi=0,Os=Se.length;Wi<Os;Wi++){const df=Se[Wi];lt.update(df,En),lt.bind(df,En)}}return En}function Tg(b,B){b.ambientLightColor.needsUpdate=B,b.lightProbe.needsUpdate=B,b.directionalLights.needsUpdate=B,b.directionalLightShadows.needsUpdate=B,b.pointLights.needsUpdate=B,b.pointLightShadows.needsUpdate=B,b.spotLights.needsUpdate=B,b.spotLightShadows.needsUpdate=B,b.rectAreaLights.needsUpdate=B,b.hemisphereLights.needsUpdate=B}function wg(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(b,B,$){const k=G.get(b);k.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),G.get(b.texture).__webglTexture=B,G.get(b.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:$,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,B){const $=G.get(b);$.__webglFramebuffer=B,$.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(b,B=0,$=0){K=b,Y=B,z=$;let k=null,W=!1,Rt=!1;if(b){const At=G.get(b);if(At.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(C.FRAMEBUFFER,At.__webglFramebuffer),xt.copy(b.viewport),vt.copy(b.scissor),te=b.scissorTest,x.viewport(xt),x.scissor(vt),x.setScissorTest(te),rt=-1;return}else if(At.__webglFramebuffer===void 0)Z.setupRenderTarget(b);else if(At.__hasExternalTextures)Z.rebindTextures(b,G.get(b.texture).__webglTexture,G.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const jt=b.depthTexture;if(At.__boundDepthTexture!==jt){if(jt!==null&&G.has(jt)&&(b.width!==jt.image.width||b.height!==jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(b)}}const zt=b.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(Rt=!0);const Gt=G.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Gt[B])?k=Gt[B][$]:k=Gt[B],W=!0):b.samples>0&&Z.useMultisampledRTT(b)===!1?k=G.get(b).__webglMultisampledFramebuffer:Array.isArray(Gt)?k=Gt[$]:k=Gt,xt.copy(b.viewport),vt.copy(b.scissor),te=b.scissorTest}else xt.copy(Yt).multiplyScalar(ot).floor(),vt.copy(P).multiplyScalar(ot).floor(),te=N;if($!==0&&(k=q),x.bindFramebuffer(C.FRAMEBUFFER,k)&&x.drawBuffers(b,k),x.viewport(xt),x.scissor(vt),x.setScissorTest(te),W){const At=G.get(b.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+B,At.__webglTexture,$)}else if(Rt){const At=B;for(let zt=0;zt<b.textures.length;zt++){const Gt=G.get(b.textures[zt]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+zt,Gt.__webglTexture,$,At)}}else if(b!==null&&$!==0){const At=G.get(b.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,At.__webglTexture,$)}rt=-1},this.readRenderTargetPixels=function(b,B,$,k,W,Rt,Ut,At=0){if(!(b&&b.isWebGLRenderTarget)){re("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let zt=G.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ut!==void 0&&(zt=zt[Ut]),zt){x.bindFramebuffer(C.FRAMEBUFFER,zt);try{const Gt=b.textures[At],jt=Gt.format,ie=Gt.type;if(b.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+At),!A.textureFormatReadable(jt)){re("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(ie)){re("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=b.width-k&&$>=0&&$<=b.height-W&&C.readPixels(B,$,k,W,Et.convert(jt),Et.convert(ie),Rt)}finally{const Gt=K!==null?G.get(K).__webglFramebuffer:null;x.bindFramebuffer(C.FRAMEBUFFER,Gt)}}},this.readRenderTargetPixelsAsync=async function(b,B,$,k,W,Rt,Ut,At=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let zt=G.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ut!==void 0&&(zt=zt[Ut]),zt)if(B>=0&&B<=b.width-k&&$>=0&&$<=b.height-W){x.bindFramebuffer(C.FRAMEBUFFER,zt);const Gt=b.textures[At],jt=Gt.format,ie=Gt.type;if(b.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+At),!A.textureFormatReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Vt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Vt),C.bufferData(C.PIXEL_PACK_BUFFER,Rt.byteLength,C.STREAM_READ),C.readPixels(B,$,k,W,Et.convert(jt),Et.convert(ie),0);const me=K!==null?G.get(K).__webglFramebuffer:null;x.bindFramebuffer(C.FRAMEBUFFER,me);const Le=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Nv(C,Le,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Vt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,Rt),C.deleteBuffer(Vt),C.deleteSync(Le),Rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,B=null,$=0){const k=Math.pow(2,-$),W=Math.floor(b.image.width*k),Rt=Math.floor(b.image.height*k),Ut=B!==null?B.x:0,At=B!==null?B.y:0;Z.setTexture2D(b,0),C.copyTexSubImage2D(C.TEXTURE_2D,$,0,0,Ut,At,W,Rt),x.unbindTexture()},this.copyTextureToTexture=function(b,B,$=null,k=null,W=0,Rt=0){let Ut,At,zt,Gt,jt,ie,Vt,me,Le;const Pe=b.isCompressedTexture?b.mipmaps[Rt]:b.image;if($!==null)Ut=$.max.x-$.min.x,At=$.max.y-$.min.y,zt=$.isBox3?$.max.z-$.min.z:1,Gt=$.min.x,jt=$.min.y,ie=$.isBox3?$.min.z:0;else{const De=Math.pow(2,-W);Ut=Math.floor(Pe.width*De),At=Math.floor(Pe.height*De),b.isDataArrayTexture?zt=Pe.depth:b.isData3DTexture?zt=Math.floor(Pe.depth*De):zt=1,Gt=0,jt=0,ie=0}k!==null?(Vt=k.x,me=k.y,Le=k.z):(Vt=0,me=0,Le=0);const xe=Et.convert(B.format),ke=Et.convert(B.type);let Nt;B.isData3DTexture?(Z.setTexture3D(B,0),Nt=C.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Z.setTexture2DArray(B,0),Nt=C.TEXTURE_2D_ARRAY):(Z.setTexture2D(B,0),Nt=C.TEXTURE_2D),x.activeTexture(C.TEXTURE0),x.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,B.flipY),x.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),x.pixelStorei(C.UNPACK_ALIGNMENT,B.unpackAlignment);const pn=x.getParameter(C.UNPACK_ROW_LENGTH),ae=x.getParameter(C.UNPACK_IMAGE_HEIGHT),En=x.getParameter(C.UNPACK_SKIP_PIXELS),$n=x.getParameter(C.UNPACK_SKIP_ROWS),Vi=x.getParameter(C.UNPACK_SKIP_IMAGES);x.pixelStorei(C.UNPACK_ROW_LENGTH,Pe.width),x.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Pe.height),x.pixelStorei(C.UNPACK_SKIP_PIXELS,Gt),x.pixelStorei(C.UNPACK_SKIP_ROWS,jt),x.pixelStorei(C.UNPACK_SKIP_IMAGES,ie);const Fs=b.isDataArrayTexture||b.isData3DTexture,ve=B.isDataArrayTexture||B.isData3DTexture;if(b.isDepthTexture){const De=G.get(b),ki=G.get(B),Se=G.get(De.__renderTarget),Wi=G.get(ki.__renderTarget);x.bindFramebuffer(C.READ_FRAMEBUFFER,Se.__webglFramebuffer),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,Wi.__webglFramebuffer);for(let Os=0;Os<zt;Os++)Fs&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,G.get(b).__webglTexture,W,ie+Os),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,G.get(B).__webglTexture,Rt,Le+Os)),C.blitFramebuffer(Gt,jt,Ut,At,Vt,me,Ut,At,C.DEPTH_BUFFER_BIT,C.NEAREST);x.bindFramebuffer(C.READ_FRAMEBUFFER,null),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(W!==0||b.isRenderTargetTexture||G.has(b)){const De=G.get(b),ki=G.get(B);x.bindFramebuffer(C.READ_FRAMEBUFFER,J),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,H);for(let Se=0;Se<zt;Se++)Fs?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,De.__webglTexture,W,ie+Se):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,De.__webglTexture,W),ve?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ki.__webglTexture,Rt,Le+Se):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ki.__webglTexture,Rt),W!==0?C.blitFramebuffer(Gt,jt,Ut,At,Vt,me,Ut,At,C.COLOR_BUFFER_BIT,C.NEAREST):ve?C.copyTexSubImage3D(Nt,Rt,Vt,me,Le+Se,Gt,jt,Ut,At):C.copyTexSubImage2D(Nt,Rt,Vt,me,Gt,jt,Ut,At);x.bindFramebuffer(C.READ_FRAMEBUFFER,null),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else ve?b.isDataTexture||b.isData3DTexture?C.texSubImage3D(Nt,Rt,Vt,me,Le,Ut,At,zt,xe,ke,Pe.data):B.isCompressedArrayTexture?C.compressedTexSubImage3D(Nt,Rt,Vt,me,Le,Ut,At,zt,xe,Pe.data):C.texSubImage3D(Nt,Rt,Vt,me,Le,Ut,At,zt,xe,ke,Pe):b.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,Rt,Vt,me,Ut,At,xe,ke,Pe.data):b.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,Rt,Vt,me,Pe.width,Pe.height,xe,Pe.data):C.texSubImage2D(C.TEXTURE_2D,Rt,Vt,me,Ut,At,xe,ke,Pe);x.pixelStorei(C.UNPACK_ROW_LENGTH,pn),x.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ae),x.pixelStorei(C.UNPACK_SKIP_PIXELS,En),x.pixelStorei(C.UNPACK_SKIP_ROWS,$n),x.pixelStorei(C.UNPACK_SKIP_IMAGES,Vi),Rt===0&&B.generateMipmaps&&C.generateMipmap(Nt),x.unbindTexture()},this.initRenderTarget=function(b){G.get(b).__webglFramebuffer===void 0&&Z.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Z.setTextureCube(b,0):b.isData3DTexture?Z.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Z.setTexture2DArray(b,0):Z.setTexture2D(b,0),x.unbindTexture()},this.resetState=function(){Y=0,z=0,K=null,x.reset(),Ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}}const rp={type:"change"},Kh={type:"start"},Z0={type:"end"},Ma=new bl,op=new ns,gw=Math.cos(70*Va.DEG2RAD),Fe=new D,cn=2*Math.PI,ge={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ec=1e-6;class _w extends vS{constructor(t,e=null){super(t,e),this.state=ge.NONE,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:xr.ROTATE,MIDDLE:xr.DOLLY,RIGHT:xr.PAN},this.touches={ONE:rs.ROTATE,TWO:rs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new Vn,this._lastTargetPosition=new D,this._quat=new Vn().setFromUnitVectors(t.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Id,this._sphericalDelta=new Id,this._scale=1,this._panOffset=new D,this._rotateStart=new gt,this._rotateEnd=new gt,this._rotateDelta=new gt,this._panStart=new gt,this._panEnd=new gt,this._panDelta=new gt,this._dollyStart=new gt,this._dollyEnd=new gt,this._dollyDelta=new gt,this._dollyDirection=new D,this._mouse=new gt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=vw.bind(this),this._onPointerDown=xw.bind(this),this._onPointerUp=Mw.bind(this),this._onContextMenu=Aw.bind(this),this._onMouseWheel=bw.bind(this),this._onKeyDown=Ew.bind(this),this._onTouchStart=Tw.bind(this),this._onTouchMove=ww.bind(this),this._onMouseDown=Sw.bind(this),this._onMouseMove=yw.bind(this),this._interceptControlDown=Rw.bind(this),this._interceptControlUp=Cw.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(rp),this.update(),this.state=ge.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Fe.copy(e).sub(this.target),Fe.applyQuaternion(this._quat),this._spherical.setFromVector3(Fe),this.autoRotate&&this.state===ge.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=cn:i>Math.PI&&(i-=cn),s<-Math.PI?s+=cn:s>Math.PI&&(s-=cn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Fe.setFromSpherical(this._spherical),Fe.applyQuaternion(this._quatInverse),e.copy(this.target).add(Fe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Fe.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new D(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new D(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Fe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ma.origin.copy(this.object.position),Ma.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ma.direction))<gw?this.object.lookAt(this.target):(op.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ma.intersectPlane(op,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ec||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ec||this._lastTargetPosition.distanceToSquared(this.target)>Ec?(this.dispatchEvent(rp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?cn/60*this.autoRotateSpeed*t:cn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Fe.setFromMatrixColumn(e,0),Fe.multiplyScalar(-t),this._panOffset.add(Fe)}_panUp(t,e){this.screenSpacePanning===!0?Fe.setFromMatrixColumn(e,1):(Fe.setFromMatrixColumn(e,0),Fe.crossVectors(this.object.up,Fe)),Fe.multiplyScalar(t),this._panOffset.add(Fe)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Fe.copy(s).sub(this.target);let r=Fe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/e.clientHeight),this._rotateUp(cn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/e.clientHeight),this._rotateUp(cn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new gt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function xw(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function vw(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Mw(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Z0),this.state=ge.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Sw(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case xr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ge.DOLLY;break;case xr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ge.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ge.ROTATE}break;case xr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ge.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ge.PAN}break;default:this.state=ge.NONE}this.state!==ge.NONE&&this.dispatchEvent(Kh)}function yw(n){switch(this.state){case ge.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ge.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ge.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function bw(n){this.enabled===!1||this.enableZoom===!1||this.state!==ge.NONE||(n.preventDefault(),this.dispatchEvent(Kh),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Z0))}function Ew(n){this.enabled!==!1&&this._handleKeyDown(n)}function Tw(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case rs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ge.TOUCH_ROTATE;break;case rs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ge.TOUCH_PAN;break;default:this.state=ge.NONE}break;case 2:switch(this.touches.TWO){case rs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ge.TOUCH_DOLLY_PAN;break;case rs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ge.TOUCH_DOLLY_ROTATE;break;default:this.state=ge.NONE}break;default:this.state=ge.NONE}this.state!==ge.NONE&&this.dispatchEvent(Kh)}function ww(n){switch(this._trackPointer(n),this.state){case ge.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ge.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ge.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ge.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ge.NONE}}function Aw(n){this.enabled!==!1&&n.preventDefault()}function Rw(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Cw(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const rn=46,Lr=10,Wu=rn+Lr,ap=14,Zh=16,Hn=(3*rn+4*Lr)/2,an=n=>(n-1)*Wu,Lo=[2,0],J0=.5,Tc=rn*Math.SQRT1_2;function lp(n,t){const e=t&&String(t)===String(Lo)?J0:1;return(n-1)*Zh*e}function Ps([n,t],[e,i]){return{x:an(t)+lp(i,[n,t]),z:an(n)+lp(e,[n,t])}}const Xu=[-1,0,1,2].map(n=>n*Wu-Wu/2),cp={trackCount:6},bs=rn-4,wc=-1,Jh=-.8,br=.3,Pw=3.2,j0=[-6.4,0,6.4],Q0=2.4,Yu=[{id:"north",z:[-58,-46],y:[6,9]},{id:"concourse",z:[6,21],y:[6,14]},{id:"southern",z:[36,58],y:[6,12]}],tg=[{id:"algo-lab",cell:[0,0],lot:[1,1],h:30},{id:"flip7",cell:[0,2],lot:[0,0],h:22},{id:"machi-koro",cell:[0,2],lot:[1,2],h:20},{id:"venue-search",cell:[1,0],lot:[1,0],h:34},{id:"reading-buddy",cell:[1,2],lot:[1,2],h:24},{id:"japan-map",cell:[0,0],lot:[1,0],h:26},{id:"right-word-japanese",cell:[1,2],lot:[2,2],h:18},{id:"japanese-dashboard",cell:[0,0],lot:[2,2],h:24},{id:"bible-hymn-kids",cell:[0,0],lot:[0,1],h:20}];function up(n,t){const e=t.map(i=>Ps(n,i));return{x:e.reduce((i,s)=>i+s.x,0)/e.length,z:e.reduce((i,s)=>i+s.z,0)/e.length}}const qu=[{id:"tocho",cell:[1,0],lots:[[0,0],[0,1],[0,2],[1,1],[1,2],[2,2]],h:67},{id:"cocoon",cell:[1,0],lots:[[2,1]],h:34}],eg=[{id:"konbini",cell:[1,2],lot:[2,0],ry:0},{id:"koban",cell:[0,0],lot:[2,1],ry:0},{id:"vending",cell:[0,2],lot:[2,2],ry:0},{id:"vending",cell:[0,0],lot:[0,2],ry:-Math.PI/2}],hp=[{cell:[1,2],lot:[0,0],w:11,d:8,h:20},{cell:[1,2],lot:[1,0],w:11,d:8,h:22}],Lw=[{cell:[0,0],kind:"tower",height:[28,44],fill:.7},{cell:[0,2],kind:"midrise",height:[16,28],fill:.9},{cell:[1,0],kind:"tower",height:[26,42],fill:.7},{cell:[1,2],kind:"midrise",height:[18,30],fill:.8},{cell:[2,0],kind:"midrise",height:[16,26],fill:.6},{cell:[2,2],kind:"goldengai",height:[6,9],fill:1}],cl=[2,2];function Dw(n){let t=n;return()=>(t=(t*1664525+1013904223)%4294967296)/4294967296}function Iw(){const n=Dw(19910714),t=[],e=new Set(tg.map(i=>`${i.cell}|${i.lot}`));for(const i of qu)for(const s of i.lots)e.add(`${i.cell}|${s}`);for(const i of eg)e.add(`${i.cell}|${i.lot}`);for(const i of hp)e.add(`${i.cell}|${i.lot}`);for(const i of hp){const{x:s,z:r}=Ps(i.cell,i.lot);t.push({x:s,z:r,w:i.w,d:i.d,h:i.h,kind:"midrise",ry:0})}for(const i of Lw)if(String(i.cell)!==String(cl))for(let s=0;s<3;s++)for(let r=0;r<3;r++){const o=`${i.cell}|${[s,r]}`;if(e.has(o)||n()>i.fill)continue;const{x:a,z:l}=Ps(i.cell,[s,r]),[c,u]=i.height,h=String(i.cell)===String(Lo)?ap*J0:ap,f=h*(.62+n()*.3),d=h*(.62+n()*.3);t.push({x:a,z:l,w:f,d,h:c+n()*(u-c),kind:i.kind,ry:(n()-.5)*.08})}return t}const Nw={w:267,h:145,cy:21.3},Sa=Math.PI/4,Uw=5,Fw=30,Ac=.9,Ow=(n,t)=>Math.sqrt(n/t),fp={high:.75,low:.55},Bw=30,zw=8;function Hw(){const n=document.createElement("canvas");n.width=64,n.height=256;const t=n.getContext("2d"),e=t.createLinearGradient(0,0,0,256);e.addColorStop(0,"#3d7dd8"),e.addColorStop(.32,"#6fa3e6"),e.addColorStop(.46,"#a9c8ec"),e.addColorStop(.5,"#d8e6ef"),e.addColorStop(.54,"#c7c9bd"),e.addColorStop(1,"#9a9a90"),t.fillStyle=e,t.fillRect(0,0,64,256);const i=new ln(n);return i.mapping=Oa,i.colorSpace=Ee,i}function Gw(){return window.innerWidth<900||matchMedia("(pointer: coarse)").matches?"low":"high"}function Vw(n,t={}){const e=t.quality??Gw(),i=e==="low",s=matchMedia("(prefers-reduced-motion: reduce)").matches,r=t.mapHalf??Hn,{w:o,h:a,cy:l}=t.content??Nw,c=l/.927,u=new mw({canvas:n,antialias:!1});u.setPixelRatio(t.resScale??(i?fp.low:fp.high)),u.toneMapping=zn;const h=new hM,f=22*Math.PI/180,d=Math.cos(f)*Math.SQRT1_2,g=83.3,v=183.3,m=d*2*r+g,p=m+d*2*r;h.fog=new Hh(13095900,220,p+v),h.background=Hw();const M=new Tl(-1,1,1,-1,.1,2e3);M.position.set(m*Math.cos(f)*Math.sin(Sa),m*Math.sin(f)+c,m*Math.cos(f)*Math.cos(Sa));const y=new _w(M,n);y.target.set(0,c,0),y.enablePan=!0,y.screenSpacePanning=!1,y.touches.ONE=rs.PAN,y.touches.TWO=rs.DOLLY_ROTATE,y.enableDamping=!0,y.dampingFactor=.08,y.minPolarAngle=Math.PI*.26,y.maxPolarAngle=Math.PI*.46,y.minAzimuthAngle=Sa-Math.PI/5,y.maxAzimuthAngle=Sa+Math.PI/5,y.minZoom=Ac,y.zoom0=1,y.update();let _=!1;function T(){const{clientWidth:ft,clientHeight:V}=n;if(!ft||!V)return;const at=ft/V,ot=Math.max(a,o/at);if(M.left=-ot*at/2,M.right=ot*at/2,M.top=ot/2,M.bottom=-ot/2,M.updateProjectionMatrix(),y.maxZoom=Math.max(Ac+.1,ot/Fw),!_){_=!0;const Ft=Va.clamp(Ow(ot,a),Ac,y.maxZoom);M.zoom=Ft,y.zoom0=Ft,M.updateProjectionMatrix()}u.setSize(ft,V,!1),vt()}const E=new ResizeObserver(T);E.observe(n);const R=[],S=new _S,w=new gt,L={hover:()=>{},select:()=>{}};let I=null,U=null;function q(ft){const V=S.far;S.far=ft.distance-.01;const at=S.intersectObject(h,!0).some(ot=>ot.object.visible&&!R.includes(ot.object)&&![ot.object.material].flat().some(Ft=>Ft==null?void 0:Ft.transparent));return S.far=V,at}function J(ft){const V=n.getBoundingClientRect();w.x=(ft.clientX-V.left)/V.width*2-1,w.y=-((ft.clientY-V.top)/V.height)*2+1,S.setFromCamera(w,M);const at=S.intersectObjects(R,!1)[0];return at?q(at)?null:at.object:null}function H(ft){const V=J(ft);V!==I&&(I=V,n.style.cursor=V?"pointer":"grab",L.hover((V==null?void 0:V.userData.project)??null),vt())}const Y=ft=>{U={x:ft.clientX,y:ft.clientY}};function z(ft){if(!U)return;const V=Math.hypot(ft.clientX-U.x,ft.clientY-U.y);if(U=null,V>Uw)return;const at=J(ft);at&&L.select(at.userData.project)}n.addEventListener("pointermove",H),n.addEventListener("pointerdown",Y),n.addEventListener("pointerup",z);const K=[],rt=new xS;let pt=!0,xt=0;const vt=()=>{pt=!0};function te(){const ft=y.target,V=Va.clamp(ft.x,-r,r)-ft.x,at=c-ft.y,ot=Va.clamp(ft.z,-r,r)-ft.z;!V&&!at&&!ot||(ft.set(ft.x+V,ft.y+at,ft.z+ot),M.position.set(M.position.x+V,M.position.y+at,M.position.z+ot))}function pe(ft){const V=y.update();if(te(),s){if(!V&&!pt)return;pt=!1,u.render(h,M);return}if(ft-xt<1e3/Bw-zw)return;const at=Math.min((ft-xt)/1e3,.1);xt=ft;for(const ot of K)ot(at,rt.getElapsedTime());pt=!1,u.render(h,M)}return T(),{scene:h,camera:M,controls:y,renderer:u,reduceMotion:s,quality:e,invalidate:vt,onFrame:ft=>K.push(ft),addPickable(ft,V){ft.userData.project=V,R.push(ft)},onHover:ft=>{L.hover=ft},onSelect:ft=>{L.select=ft},start:()=>u.setAnimationLoop(pe),stop:()=>u.setAnimationLoop(null),dispose(){var ft;u.setAnimationLoop(null),E.disconnect(),n.removeEventListener("pointermove",H),n.removeEventListener("pointerdown",Y),n.removeEventListener("pointerup",z),y.dispose(),h.traverse(V=>{var at;(at=V.geometry)==null||at.dispose();for(const ot of[V.material].flat().filter(Boolean)){for(const Ft of Object.values(ot))Ft!=null&&Ft.isTexture&&Ft.dispose();ot.dispose()}}),(ft=h.background)==null||ft.dispose(),u.dispose()}}}function kw(n){n.add(new pS(14411509,1.6));const t=new dS(16774104,2);t.position.set(-60,70,40),n.add(t)}function Xn(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,l=new He;let c=0;for(let u=0;u<n.length;++u){const h=n[u];let f=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(h.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.morphAttributes[d])}if(t){let d;if(e)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,u),c+=d}}if(e){let u=0;const h=[];for(let f=0;f<n.length;++f){const d=n[f].index;for(let g=0;g<d.count;++g)h.push(d.getX(g)+u);u+=n[f].attributes.position.count}l.setIndex(h)}for(const u in r){const h=dp(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let v=0;v<o[u].length;++v)d.push(o[u][v][f]);const g=dp(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}}return l}function dp(n){let t,e,i,s=-1,r=0;for(let c=0;c<n.length;++c){const u=n[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new dn(o,e,i);let l=0;for(let c=0;c<n.length;++c){const u=n[c];if(u.isInterleavedBufferAttribute){const h=l/e;for(let f=0,d=u.count;f<d;f++)for(let g=0;g<e;g++){const v=u.getComponent(f,g);a.setComponent(f+h,g,v)}}else o.set(u.array,l);l+=u.count*e}return s!==void 0&&(a.gpuType=s),a}const Ww=3816772,pi=16723285,Fr=58879,Us=16757575,Dr=12173516,on=15918020,ng=42576,pp=n=>"#"+n.toString(16).padStart(6,"0");let mp=20260731;const Li=()=>(mp=(mp*1664525+1013904223)%4294967296)/4294967296,xn=256,bi=1200,Wa=bi/2,Xw=7,ig=1.4,sg=13357267;function gp(n,t,e,i){const s=e-t,r=Math.max(1,Math.round(i/Xw)),o=s/r,a=xn/2;n.fillStyle="rgba(255,255,255,0.85)";for(let l=0;l<r;l++){const c=t+l*o+(Li()-.5)*o*.2,u=o*(.42+Li()*.2);n.fillRect(a-3,Math.max(t,c),6,Math.min(u,e-c))}}function Yw(n,t){const e=Wa/(2*Hn),i=Lr/2*e,s=t-i;n.fillStyle="rgba(255,255,255,0.05)",n.fillRect(0,s,xn,i*2),n.fillStyle="rgba(255,255,255,0.85)";const r=xn*.08,o=i*.55,a=5,l=i*2/a,c=l*.5;for(let u=0;u<a;u++){const h=s+u*l+(l-c)/2;n.fillRect(0,h,xn,c)}n.fillRect(xn/2-o,s,r,i*2),n.fillRect(xn/2+o-r,s,r,i*2)}function qw(){const n=document.createElement("canvas");n.width=xn,n.height=bi;const t=document.createElement("canvas");t.width=xn,t.height=bi;const e=n.getContext("2d"),i=t.getContext("2d"),s=ig*(xn/Lr);e.fillStyle=pp(sg),e.fillRect(0,0,s,bi),e.fillRect(xn-s,0,s,bi),e.fillStyle=pp(Ww),e.fillRect(s,0,xn-2*s,bi),i.fillStyle="#000",i.fillRect(0,0,xn,bi),e.fillStyle="rgba(0,0,0,0.12)";for(let o=0;o<140;o++){const a=8+Li()*34,l=6+Li()*22;e.fillRect(Li()*xn,Li()*bi,a,l)}gp(e,0,Wa,2*Hn),gp(e,Wa,bi,rn);for(const o of Xu)Yw(e,(o+Hn)/(2*Hn)*Wa);const r=o=>Object.assign(new ln(o),{colorSpace:Ee,anisotropy:8});return{map:r(n),emissiveMap:r(t)}}function $w(n,t,e,i){const s=n.attributes.uv;for(let r=0;r<s.count;r++){let o=s.getX(r),a=s.getY(r);if(t){const l=o;o=a,a=l}e&&(a=1-a),s.setXY(r,o,i==="through"?a*.5:.5+a*.5)}}function _p(n,t,e,i,{swap:s,band:r}){const o=new Te(n,t);return $w(o,s,Li()<.5,r),o.rotateX(-Math.PI/2),o.translate(e,0,i),o}function Kw(){const n=[],t=2*Hn;for(const o of Xu)n.push(_p(Lr,t,o,0,{swap:!1,band:"through"}));for(const o of Xu)for(const a of[0,1,2])n.push(_p(rn,Lr,an(a),o,{swap:!0,band:"segment"}));const e=Xn(n),{map:i,emissiveMap:s}=qw(),r=new kt({map:i,emissiveMap:s,emissive:16777215,emissiveIntensity:.5});return new St(e,r)}const Ji=4*Hn,Zw=7039583;function Jw(){const n=new Yh;n.moveTo(-Ji/2,-Ji/2),n.lineTo(Ji/2,-Ji/2),n.lineTo(Ji/2,Ji/2),n.lineTo(-Ji/2,Ji/2),n.closePath();const t=new ll,e=bs/2,i=Hn;t.moveTo(-e,-i),t.lineTo(e,-i),t.lineTo(e,i),t.lineTo(-e,i),t.closePath(),n.holes.push(t);const s=new El(n);s.rotateX(-Math.PI/2);const r=new St(s,new kt({color:Zw}));return r.position.y=-.04,r}const xp=.16,jw=.4,vp=2763827;function rg(){const n=rn/2,t=[];for(const e of[0,1,2])for(const i of[0,1,2]){const s=an(i),r=an(e);if(e===Lo[0]&&i===Lo[1]){const o=[[s,r-n],[s+n,r],[s,r+n],[s-n,r]];for(let a=0;a<4;a++){const[l,c]=o[a],[u,h]=o[(a+1)%4],f=(l+u)/2,d=(c+h)/2;t.push({x:f,z:d,len:Tc,angle:Math.atan2(h-c,u-l),ox:(f-s)/(Tc/2),oz:(d-r)/(Tc/2)})}continue}t.push({x:s,z:r-n,len:rn,angle:0,ox:0,oz:-1}),t.push({x:s,z:r+n,len:rn,angle:0,ox:0,oz:1}),i!==1&&(t.push({x:s-n,z:r,len:rn,angle:Math.PI/2,ox:-1,oz:0}),t.push({x:s+n,z:r,len:rn,angle:Math.PI/2,ox:1,oz:0}))}return t}function Qw(){const n=[];for(const i of rg()){const s=new Lt(i.len,xp,jw);s.rotateY(-i.angle),s.translate(i.x,xp/2,i.z),n.push(s)}const t=Xn(n),e=new kt({color:vp,emissive:vp,emissiveIntensity:.35});return new St(t,e)}const tA=7031348,eA=7319114,Mp=4,nA=n=>{const t=n/2,e=(n-2*Mp)/2;return[0,1,2].map(i=>-t+Mp+i*e)};function iA(){const n=[],t=[],e=ig/2;for(const s of rg()){const r=Math.cos(s.angle),o=Math.sin(s.angle);for(const a of nA(s.len)){const l=s.x+a*r+e*s.ox,c=s.z+a*o+e*s.oz,u=.85+Li()*.3,h=Li()*Math.PI*2,f=new Wn(.12,.16,2.2,5,1,!0);f.translate(0,1.1,0),f.scale(u,u,u),f.rotateY(h),f.translate(l,0,c),n.push(f);const d=new qh(1.6,0);d.translate(0,2.4,0),d.scale(u,u,u),d.rotateY(h),d.translate(l,0,c),t.push(d)}}const i=new we;return i.add(new St(Xn(n),new kt({color:tA}))),i.add(new St(Xn(t),new kt({color:eA}))),i}function sA(){const[n,t]=Lo,e=an(t),i=an(n),s=rn/2,r=new Yh;r.moveTo(e-s,-(i-s)),r.lineTo(e+s,-(i-s)),r.lineTo(e+s,-(i+s)),r.lineTo(e-s,-(i+s)),r.closePath();const o=new ll;o.moveTo(e,-(i-s)),o.lineTo(e+s,-i),o.lineTo(e,-(i+s)),o.lineTo(e-s,-i),o.closePath(),r.holes.push(o);const a=new El(r);a.rotateX(-Math.PI/2);const l=new St(a,new kt({color:sg}));return l.position.y=-.02,l}function rA(){const n=new we;return n.add(Jw()),n.add(Kw()),n.add(sA()),n.add(Qw()),n.add(iA()),n}let Sp=20260731;const $u=()=>(Sp=(Sp*1664525+1013904223)%4294967296)/4294967296,ul=120,Ku=240,oA="#9aa1ad",yp="#747c88",bp=["#f2e3c4","#d9b878","#a8cfe8","#8a9bb0"],aA=.19,lA=.225,cA=[{cols:4,rows:6,pierAt:0,lit:.44,cap:0},{cols:3,rows:5,pierAt:1,lit:.4,cap:0},{cols:4,rows:7,pierAt:2,lit:.48,cap:0},{cols:3,rows:6,pierAt:0,lit:.42,cap:0}],uA=[{cols:4,rows:10,pierAt:0,lit:.48,cap:1},{cols:4,rows:11,pierAt:3,lit:.45,cap:1},{cols:3,rows:9,pierAt:1,lit:.52,cap:1},{cols:4,rows:12,pierAt:2,lit:.46,cap:1}],Rc=[...cA,...uA],hA=[0,1,2,3],fA=[4,5,6,7];function dA(n,t,e,{cols:i,rows:s,pierAt:r,lit:o,cap:a}){const l=ul/i,c=Ku/s,u=l*aA,h=c*lA,f=l-2*u,d=c-2*h;for(let g=0;g<i;g++){const v=e+g*l;if(g===r){n.fillStyle=yp,n.fillRect(v,0,l,Ku);continue}for(let m=0;m<s;m++){const p=m*c;if(m<a||m>=s-a){n.fillStyle=yp,n.fillRect(v,p,l,c);continue}if($u()>o){n.fillStyle="rgba(0,0,0,0.22)",n.fillRect(v+u,p+h,f,d);continue}const M=bp[Math.floor($u()*bp.length)];n.fillStyle=M,n.fillRect(v+u,p+h,f,d),t.fillStyle=M,t.fillRect(v+u,p+h,f,d)}}n.fillStyle="rgba(0,0,0,0.45)";for(let g=0;g<s;g++)n.fillRect(e,g*c,ul,2)}function pA(){const n=ul*Rc.length,t=Ku,e=()=>{const l=document.createElement("canvas");return l.width=n,l.height=t,[l,l.getContext("2d")]},[i,s]=e(),[r,o]=e();s.fillStyle=oA,s.fillRect(0,0,n,t),o.fillStyle="#000",o.fillRect(0,0,n,t),Rc.forEach((l,c)=>dA(s,o,c*ul,l));const a=l=>Object.assign(new ln(l),{colorSpace:Ee,anisotropy:8});return{map:a(i),emissiveMap:a(r),panelCount:Rc.length}}function mA(n,t){n.customProgramCacheKey=()=>"blocks-atlas-uv",n.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <uv_pars_vertex>",`#include <uv_pars_vertex>
attribute vec2 aUvOffset;`).replace("#include <uv_vertex>",`#include <uv_vertex>
#ifdef USE_MAP
  vMapUv = vMapUv / ${t.toFixed(1)} + aUvOffset;
#endif
#ifdef USE_EMISSIVEMAP
  vEmissiveMapUv = vEmissiveMapUv / ${t.toFixed(1)} + aUvOffset;
#endif`)}}function gA(){const n=new we,t=Iw(),e=new Lt(1,1,1);e.translate(0,.5,0);const{map:i,emissiveMap:s,panelCount:r}=pA(),o=new kt({map:i,emissiveMap:s,emissive:16777215,emissiveIntensity:.12});mA(o,r);const a=new w0(e,o,t.length),l=new Float32Array(t.length*2),c=new Ie;return t.forEach((u,h)=>{c.position.set(u.x,0,u.z),c.rotation.set(0,u.ry,0),c.scale.set(u.w,u.h,u.d),c.updateMatrix(),a.setMatrixAt(h,c.matrix);const f=u.kind==="tower"?fA:hA,d=f[Math.floor($u()*f.length)];l[h*2]=d/r}),a.instanceMatrix.needsUpdate=!0,e.setAttribute("aUvOffset",new Bu(l,2)),n.add(a),n}const Ls="'Shippori Mincho', serif",_A=4,xA=1/3.5,vA=n=>typeof n=="number"?"#"+n.toString(16).padStart(6,"0"):n;function MA(n){let t=0;for(let e=0;e<n.length;e++)t=t*31+n.charCodeAt(e)>>>0;return t||1}function Ep(n,t,e,i){let s=i;for(n.font=`bold ${s}px ${Ls}`;s>6&&n.measureText(t).width>e;)s-=2,n.font=`bold ${s}px ${Ls}`;return s}function Tp(n,t,e,i){let s=i;for(n.font=`bold ${s}px ${Ls}`;s>6&&(s*t.length*1.05>i||t.some(r=>n.measureText(r).width>e));)s-=2,n.font=`bold ${s}px ${Ls}`;return s}function jh(n,t,e,i,s,r){const o=e*.12;if(r==="vertical"){const u=Array.from(i),h=s?Array.from(s):[],f=h.length>0,d=(f?t*.55:t*.7)-o,g=e-o*2,v=Tp(n,u,d,g),m=v*1.05;let p=e/2-m*u.length/2+m/2;const M=f?t*.66:t/2,y=u.map(_=>{const T={text:_,x:M,y:p,size:v};return p+=m,T});if(f){const _=Tp(n,h,d*.6,g*.8),T=_*1.05;let E=e/2-T*h.length/2+T/2;for(const R of h)y.push({text:R,x:t*.28,y:E,size:_}),E+=T}return y}const a=t-o*2,l=Ep(n,i,a,s?e*.55:e*.7),c=[{text:i,x:t/2,y:s?e*.4:e/2,size:l}];if(s){const u=Ep(n,s,a,e*.22);c.push({text:s,x:t/2,y:e*.74,size:u})}return c}function SA(n,{text:t,x:e,y:i,size:s},r){n.font=`bold ${s}px ${Ls}`,n.textAlign="center",n.textBaseline="middle",n.lineJoin="round",n.fillStyle=r,n.shadowColor=r,n.shadowBlur=s*.75,n.fillText(t,e,i),n.fillText(t,e,i),n.shadowBlur=s*.3,n.fillText(t,e,i),n.shadowBlur=s*.1,n.shadowColor="#fff",n.strokeStyle="#fff",n.lineWidth=s*.07,n.strokeText(t,e,i),n.shadowBlur=0,n.shadowColor="transparent"}function og(n,t,e,i,s,r,o){n.fillStyle="#0a0a0d",n.fillRect(0,0,t,e);const a=e*.08;n.strokeStyle=o,n.lineWidth=Math.max(2,e*.015),n.strokeRect(a,a,t-a*2,e-a*2);const l=jh(n,t,e,i,s,r);for(const c of l)SA(n,c,o)}function yA(n,t,e,i,s,r,o){n.fillStyle=o,n.fillRect(0,0,t,e);const a=jh(n,t,e,i,s,r);n.fillStyle="#000",n.textAlign="center",n.textBaseline="middle";for(const l of a)n.font=`bold ${l.size}px ${Ls}`,n.fillText(l.text,l.x,l.y)}function bA(n){const t=parseInt(n.slice(1),16),e=t>>16&255,i=t>>8&255,s=t&255,r=(e+i+s)/3,o=a=>Math.round(a*.3+r*.3+30);return`rgb(${o(e)},${o(i)},${o(s)})`}function EA(n,t,e,i,s,r,o){n.fillStyle=bA(o),n.fillRect(0,0,t,e);let a=MA(i);const l=()=>(a=(a*1664525+1013904223)%4294967296)/4294967296;n.strokeStyle="rgba(0,0,0,0.15)";for(let u=0;u<40;u++){n.lineWidth=l()*1.5;const h=l()*t,f=l()*e;n.beginPath(),n.moveTo(h,f),n.lineTo(h+(l()-.5)*30,f+(l()-.5)*30),n.stroke()}n.fillStyle="rgba(255,255,255,0.06)";for(let u=0;u<300;u++)n.fillRect(l()*t,l()*e,1,1);const c=jh(n,t,e,i,s,r);n.textAlign="center",n.textBaseline="middle",n.fillStyle="#e8ded0",n.strokeStyle="rgba(0,0,0,0.4)";for(const u of c)n.font=`bold ${u.size}px ${Ls}`,n.lineWidth=u.size*.06,n.strokeText(u.text,u.x,u.y),n.fillText(u.text,u.x,u.y)}const TA={neon:og,lightbox:yA,painted:EA};function zi(n){const{text:t,sub:e="",style:i="neon",orientation:s="horizontal",color:r="#FF2D55",px:o=256}=n,a=vA(r),l=s==="vertical"?xA:_A,c=o,u=Math.round(c*l),h=document.createElement("canvas");h.width=u,h.height=c;const f=h.getContext("2d");return(TA[i]??og)(f,u,c,t,e,s,a),{map:Object.assign(new ln(h),{colorSpace:Ee,anisotropy:8}),aspect:u/c}}const hl=n=>"#"+n.toString(16).padStart(6,"0");function ag(n){let t=n;return()=>(t=(t*1664525+1013904223)%4294967296)/4294967296}function bn(n,{x:t=0,y:e=0,z:i=0,ry:s=0}){const r=new se().compose(new D(t,e,i),new Vn().setFromEuler(new kn(0,s,0)),new D(1,1,1));return n.applyMatrix4(r)}function Hi(n,t){return new St(Xn(n),t)}const wA=.18,Zu=.14,Xa=2*Hn,lg=rn/2-2,ts=2,wp=-.06,Ju=3.4,cg=br+.2,AA=8,RA=[{x:-6.4,z:[-19,15]},{x:0,z:[-15,21]},{x:6.4,z:[-21,17]}];function CA(n,t){const i=Math.round(n*8),s=Math.round(t*8),r=()=>{const g=document.createElement("canvas");return g.width=i,g.height=s,[g,g.getContext("2d")]},[o,a]=r(),[l,c]=r();a.fillStyle="#7f8896",a.fillRect(0,0,i,s),c.fillStyle="#000",c.fillRect(0,0,i,s);const u=ag(20260731),h=2.6*8,f=Math.round(i/h);for(let g=0;g<f;g++){const v=g*h;if(g%3===0){a.fillStyle=hl(Dr),a.fillRect(v,0,h*.35,s);continue}const m=s*.18,p=s*.64;if(u()>.55){a.fillStyle="rgba(0,0,0,0.22)",a.fillRect(v+h*.15,m,h*.7,p);continue}const M=u()>.3?hl(on):"#a8cfe8";a.fillStyle=M,a.fillRect(v+h*.15,m,h*.7,p),c.fillStyle=M,c.fillRect(v+h*.15,m,h*.7,p)}const d=g=>Object.assign(new ln(g),{colorSpace:Ee,anisotropy:8});return{map:d(o),emissiveMap:d(l)}}function PA(n){const e=Math.round(n*6),i=document.createElement("canvas");i.width=e,i.height=e;const s=i.getContext("2d");s.fillStyle="#252b36",s.fillRect(0,0,e,e),s.strokeStyle="rgba(255,255,255,0.035)",s.lineWidth=1;for(let o=0;o<e;o+=18)s.beginPath(),s.moveTo(0,o),s.lineTo(e,o),s.stroke();const r=ag(20260801);for(let o=0;o<26;o++){const a=(2+r()*4)*6,l=(2+r()*3)*6,c=r()*(e-a),u=r()*(e-l);s.fillStyle="rgba(0,0,0,0.45)",s.fillRect(c+3,u+3,a,l),s.fillStyle=r()>.7?"#3a4150":"#2e3441",s.fillRect(c,u,a,l),s.strokeStyle="rgba(255,255,255,0.08)",s.strokeRect(c+.5,u+.5,a-1,l-1)}return s.strokeStyle="#2a2f3a",s.lineWidth=6*.8,s.strokeRect(6*.4,6*.4,e-6*.8,e-6*.8),Object.assign(new ln(i),{colorSpace:Ee,anisotropy:8})}function LA(){const n=new kt({color:1316381}),t=new Lt(bs-2*ts,.2,Xa);t.translate(0,wc-.1,0);const e=new St(t,n),i=new kt({color:2764602,emissive:2764602,emissiveIntensity:.25}),s=wp-wc,r=(wc+wp)/2,o=bs/2-ts/2,a=Hn-ts/2,l=[bn(new Lt(ts,s,Xa),{x:-o,y:r}),bn(new Lt(ts,s,Xa),{x:o,y:r}),bn(new Lt(bs,s,ts),{y:r,z:-a}),bn(new Lt(bs,s,ts),{y:r,z:a})],c=Hi(l,i);return{floor:e,walls:c}}function DA(){const n=Array.from({length:cp.trackCount},(i,s)=>(s-(cp.trackCount-1)/2)*Pw),t=new kt({color:Dr,emissive:Dr,emissiveIntensity:.15}),e=n.map(i=>bn(new Lt(wA,Zu,Xa),{x:i,y:Jh+Zu/2}));return{mesh:Hi(e,t),trackXs:n}}function IA(){const n=new kt({color:9542056}),t=lg*2,e=j0.map(i=>bn(new Lt(Q0,.2,t),{x:i,y:br-.1}));return Hi(e,n)}function NA(){const n=lg*2-4,t=j0.map(e=>bn(new Lt(Q0*.6,.06,n),{x:e,y:br+.04}));return Hi(t,new le({color:on}))}function UA(){const n=new kt({color:10135739,emissive:on,emissiveIntensity:.08}),t=RA.map(({x:e,z:i})=>{const s=i[1]-i[0],r=new Wn(Ju,Ju,s,AA,1,!1,Math.PI,Math.PI);return r.rotateX(Math.PI/2),bn(r,{x:e,y:cg,z:(i[0]+i[1])/2})});return Hi(t,n)}function FA(){const n=new kt({color:1842983}),t=cg+Ju+1-br,e=br+t,i=bs/2-ts-1,s=[];for(let r=-20;r<=20;r+=8){for(const o of[-1,1])s.push(bn(new Lt(.5,t,.5),{x:o*i,y:br+t/2,z:r}));s.push(bn(new Lt(i*2,.4,.4),{y:e,z:r}))}return Hi(s,n)}const Cc=1.3,ya=1.6,Pc=16;function OA(n){const t=Jh+Zu+ya/2,e=new kt({color:1708550,emissive:on,emissiveIntensity:.2}),i=new St(new Lt(Cc,ya,Pc),new kt({color:ng}));i.position.set(n[1],t,2);const s=new St(new Lt(Cc,ya,Pc),new kt({color:pi}));s.position.set(n[4],t,-2);const r=[i,s].map(a=>bn(new Te(Pc*.85,ya*.4),{x:a.position.x+Cc/2+.02,y:t,z:a.position.z,ry:Math.PI/2})),o=Hi(r,e);return{jrBody:i,nexBody:s,windows:o}}function BA(){const n=bs-2,e=CA(n,8),i=new kt({map:e.map,emissiveMap:e.emissiveMap,emissive:16777215,emissiveIntensity:.15}),s=Yu.map(({z:c,y:u})=>bn(new Lt(n,u[1]-u[0],c[1]-c[0]),{y:(u[0]+u[1])/2,z:(c[0]+c[1])/2})),r=Hi(s,i),o=new kt({map:PA(n)}),a=Yu.map(({z:c,y:u})=>{const h=new Te(n,c[1]-c[0]);return h.rotateX(-Math.PI/2),bn(h,{y:u[1]+.02,z:(c[0]+c[1])/2})}),l=Hi(a,o);return{bodies:r,roofs:l}}function zA(){const n=new we,{floor:t,walls:e}=LA();n.add(t,e);const{mesh:i,trackXs:s}=DA();n.add(i),n.add(IA()),n.add(NA()),n.add(UA()),n.add(FA());const{jrBody:r,nexBody:o,windows:a}=OA(s);n.add(r,o,a);const{bodies:l,roofs:c}=BA();n.add(l,c);const u=Yu[1].z[1],h=zi({text:"新宿駅",style:"lightbox",orientation:"horizontal",color:hl(ng),px:512}),f=new le({map:h.map}),d=11,g=new St(new Te(d,d/h.aspect),f);g.position.set(0,11,u+.35),n.add(g);const v=zi({text:"1-6",sub:"のりば",style:"neon",orientation:"horizontal",color:hl(Us),px:256}),m=new le({map:v.map}),p=6,M=new St(new Te(p,p/v.aspect),m);M.position.set(-14,8,u+.35),n.add(M);const y=2.6,_=new Ie;return _.position.set(-14,6.5-y,u+.3),n.add(_),{group:n,boardAnchor:_,trackY:Jh}}const Ap=48.6,HA=40,ug=40.8,ju=6.6;let Rp=20260729;const ur=()=>(Rp=(Rp*1664525+1013904223)%4294967296)/4294967296,GA="#6f8fae",VA="#9aa3b0",kA="#82a0ba";function WA(n,t,{lit:e=.6,pxCol:i=24,pxRow:s=14}={}){const r=n*i,o=t*s,a=()=>{const v=document.createElement("canvas");return v.width=r,v.height=o,[v,v.getContext("2d")]},[l,c]=a(),[u,h]=a();c.fillStyle=GA,c.fillRect(0,0,r,o),h.fillStyle="#000",h.fillRect(0,0,r,o),c.fillStyle=kA;for(let v=0;v<t;v++)c.fillRect(0,v*s,r,2);const f=Array.from({length:t},()=>ur()<e);for(let v=0;v<n;v++){const m=v*i;for(let p=0;p<t;p++){const M=p*s;if(!(f[p]?ur()<.8:ur()<.1))continue;const y=ur(),_=y>.92?"#a8cfe8":y>.3?"#e8c88a":"#f2e3c4";c.fillStyle=_,c.fillRect(m+3,M+2,i-6,s-5),h.fillStyle=_,h.fillRect(m+3,M+2,i-6,s-5)}}const d=Math.max(3,Math.round(i*.45));for(let v=0;v<=n;v++){if(v%3!==0&&v!==n)continue;const m=Math.min(Math.max(v*i-d/2,0),r-d);c.fillStyle=VA,c.fillRect(m,0,d,o),c.fillStyle="rgba(0,0,0,0.3)",c.fillRect(m+d-2,0,2,o)}const g=v=>Object.assign(new ln(v),{colorSpace:Ee,anisotropy:8});return{map:g(l),emissiveMap:g(u)}}function XA(n){const i=ug*n,s=Math.PI*(ju+ju*.68)*n,r=Math.round(3*(1024/i)),o=Math.round(3*(512/s)),a=document.createElement("canvas");a.width=512,a.height=1024;const l=a.getContext("2d"),c=document.createElement("canvas");c.width=512,c.height=1024;const u=c.getContext("2d");l.fillStyle="#4a5566",l.fillRect(0,0,512,1024),u.fillStyle="#000",u.fillRect(0,0,512,1024);for(let f=0;f<1024;f+=r)for(let d=0;d<512;d+=r){if(ur()>.34)continue;const g=ur()>.5?"#cfe6f5":"#e8d4a8",v=r*.15;l.fillStyle=g,l.fillRect(d+v,f+v,r-v*2,r-v*2),u.fillStyle=g,u.fillRect(d+v,f+v,r-v*2,r-v*2)}for(const f of[1,-1])for(let d=-1024;d<1536;d+=o)for(const[g,v,m]of[[l,"#dfe6f0",5],[u,"#41505f",5]])g.strokeStyle=v,g.lineWidth=m,g.beginPath(),g.moveTo(d,0),g.lineTo(d+f*1024,1024),g.stroke();const h=f=>Object.assign(new ln(f),{colorSpace:Ee,anisotropy:8});return{map:h(a),emissiveMap:h(c)}}const YA=1.9,qA=4;function ba(n,t,e,i,s={}){const{map:r,emissiveMap:o}=WA(Math.max(3,Math.round(n*e/YA)),Math.max(3,Math.round(t*i/qA)),s);return new kt({map:r,emissiveMap:o,emissive:16777215,emissiveIntensity:.15})}function $A(){const e=document.createElement("canvas");e.width=96,e.height=32;const i=e.getContext("2d");i.fillStyle="#f0d49a",i.fillRect(0,0,96,32),i.fillStyle="#4a4030",i.fillRect(0,0,96,3),i.fillRect(0,28,96,4),i.fillStyle="rgba(74,64,48,0.55)";for(let s=6;s<96;s+=12)i.fillRect(s,3,2,25);return i.fillStyle="#8a6c44",i.beginPath(),i.arc(96/2,32/2,7,0,Math.PI*2),i.fill(),Object.assign(new ln(e),{colorSpace:Ee,anisotropy:8})}function Ei(n,{x:t=0,y:e=0,z:i=0}={}){return n.applyMatrix4(new se().makeTranslation(t,e,i))}function lr(n,t){return new St(Xn(n),t)}function KA(n,t){const e=new we,i=1/5,s=33*i,r=169*i,o=243*i,a=2.592,l=5.184,c=3.5-a,u=4.4-l,h=new St(new Lt(38,s,34),ba(38,s,n,t,{lit:.7}));h.position.set(c,s/2,u),e.add(h);const f=r-s,d=new St(new Lt(15,f,15),ba(15,f,n,t));d.position.set(c,s+f/2,u),e.add(d);const g=new kt({color:4870502}),v=[],m=f+1;for(const[rt,pt]of[[1,1],[1,-1],[-1,1],[-1,-1]])v.push(Ei(new Lt(2.6,m,2.6),{x:c+rt*6.3,y:s+m/2,z:u+pt*6.3}));const p=6.5,M=8,y=4.25,_=o-r,T=ba(p,_,n,t),E=[-1,1].map(rt=>Ei(new Lt(p,_,M),{x:c+rt*y,y:r+_/2,z:u}));e.add(lr(E,T));const R=2.6,S=.8,w=new le({map:$A()}),L=[-1,1].map(rt=>Ei(new Lt(p+S,R,M+S),{x:c+rt*(y+S/2),y:o-R/2,z:u}));e.add(lr(L,w));for(const rt of[-1,1])v.push(Ei(new Lt(p-1.5,1.6,M-1.6),{x:c+rt*y,y:o+.6,z:u}));v.push(Ei(new Lt(15.4,1.6,M+.4),{x:c,y:r+.8,z:u})),e.add(lr(v,g));const I=new kt({color:8029076}),U=[-1,1].map(rt=>Ei(new Wn(.12,.2,6,6),{x:c+rt*y,y:o+1.6+3,z:u}));e.add(lr(U,I));const q=new le({color:16722731}),J=[];for(const rt of[-1,1]){J.push(Ei(new Po(.34,6,4),{x:c+rt*y,y:o+1.6+6.2,z:u}));for(const pt of[-1,1])J.push(Ei(new Po(.3,6,4),{x:c+rt*(y+p/2),y:o,z:u+pt*(M/2)}))}e.add(lr(J,q));const H=163*i,Y=new St(new Lt(12,H,10),ba(12,H,n,t));Y.position.set(-23.33-a,H/2,-7.78-l),e.add(Y);const z=41*i,K=new St(new Wn(7,7,z,16,1,!1,-Math.PI/4,Math.PI),new kt({color:5660528}));return K.position.set(15.55-a,z/2,29.89-l),e.add(K),e}function ZA(n){const t=new we,e=204/5,i=ju,s=[[.52,0],[.74,.08],[.92,.22],[1,.42],[.97,.6],[.86,.78],[.62,.93],[.3,1]].map(([c,u])=>new gt(c*i,u*e)),{map:r,emissiveMap:o}=XA(n),a=new St(new $h(s,28),new kt({map:r,emissiveMap:o,emissive:16777215,emissiveIntensity:.12}));a.scale.z=.68,t.add(a);const l=new St(new Lt(13,2.4,10),new kt({color:2764602}));return l.position.y=1.2,t.add(l),t}const JA=.02,jA=[[.7,.71],[.98,.71],[.68,.83],[.7,.95],[.98,.95],[.84,.99]];function QA(n,t){const i=Math.round(n*11),s=Math.round(t*11),r=document.createElement("canvas");r.width=i,r.height=s;const o=r.getContext("2d"),a=document.createElement("canvas");a.width=i,a.height=s;const l=a.getContext("2d");l.fillStyle="#000",l.fillRect(0,0,i,s),o.fillStyle="#a09a8c",o.fillRect(0,0,i,s),o.fillStyle="#b0aa9a";for(let u=0;u<i;u+=44)o.fillRect(u,0,1,s);for(let u=0;u<s;u+=44)o.fillRect(0,u,i,1);o.fillStyle="#2d4a3a",o.fillRect(.66*i,.94*s,.34*i,.06*s),o.fillRect(.955*i,.66*s,.045*i,.34*s),o.fillStyle="#1b2540",o.strokeStyle="#69749a",o.lineWidth=1;for(const[u,h,f,d]of[[.69,.735,.1,.045],[.69,.885,.1,.045]])o.fillRect(u*i,h*s,f*i,d*s),o.strokeRect(u*i,h*s,f*i,d*s);const c=u=>Object.assign(new ln(u),{colorSpace:Ee,anisotropy:8});return{map:c(r),emissiveMap:c(a)}}function t1(n){const t=an(n.cell[1]),e=an(n.cell[0]),i=rn/2,s=Zh/2,r=n.lots.map(d=>{const g=Ps(n.cell,d);return{x0:Math.max(g.x-s,t-i),x1:Math.min(g.x+s,t+i),z0:Math.max(g.z-s,e-i),z1:Math.min(g.z+s,e+i)}}),o={x0:Math.min(...r.map(d=>d.x0)),x1:Math.max(...r.map(d=>d.x1)),z0:Math.min(...r.map(d=>d.z0)),z1:Math.max(...r.map(d=>d.z1))},a=o.x1-o.x0,l=o.z1-o.z0,c=r.map(d=>{const g=new Te(d.x1-d.x0,d.z1-d.z0);g.rotateX(-Math.PI/2),g.translate((d.x0+d.x1)/2,0,(d.z0+d.z1)/2);const v=g.attributes.uv,m=g.attributes.position;for(let p=0;p<v.count;p++)v.setXY(p,(m.getX(p)-o.x0)/a,(m.getZ(p)-o.z0)/l);return g}),{map:u,emissiveMap:h}=QA(a,l),f=new St(Xn(c),new kt({map:u,emissiveMap:h,emissive:16777215,emissiveIntensity:.5,transparent:!0}));return f.position.y=JA,f}function e1(n){const t=an(n.cell[1]),e=an(n.cell[0]),i=rn/2,s=Zh/2,r=n.lots.map(h=>Ps(n.cell,h)),o=Math.max(Math.min(...r.map(h=>h.x))-s,t-i),a=Math.min(Math.max(...r.map(h=>h.x))+s,t+i),l=Math.max(Math.min(...r.map(h=>h.z))-s,e-i),c=Math.min(Math.max(...r.map(h=>h.z))+s,e+i),u=jA.map(([h,f])=>Ei(new Lt(.5,4.5,.5),{x:o+h*(a-o),y:2.25,z:l+f*(c-l)}));return lr(u,new le({color:on}))}function n1(){const n=new we,t=qu.find(u=>u.id==="tocho"),e=HA/Ap,i=t.h/Ap,s=KA(e,i);s.scale.set(e,i,e),n.add(t1(t)),n.add(e1(t));const r=up(t.cell,t.lots);s.position.set(r.x,0,r.z),n.add(s);const o=qu.find(u=>u.id==="cocoon"),a=o.h/ug,l=ZA(a);l.scale.setScalar(a);const c=up(o.cell,o.lots);return l.position.set(c.x,0,c.z),n.add(l),n}const i1=1577999,s1=7041664,r1=13289402,fl=new kt({color:i1});new kt({color:s1});const hg=new kt({color:r1});new kt({color:Dr});function fg({color:n=pi,width:t=1.2}={}){const i=new we,s=new St(new Wn(.015,.015,t*1.05,6),fl);s.rotation.z=Math.PI/2,s.position.y=.5,i.add(s);const r=3,o=.025,a=(t-o*(r-1))/r,l=new kt({color:n,side:Oe});for(let c=0;c<r;c++){const u=new St(new Lt(a,.5,.02),l);u.position.set(-t/2+a/2+c*(a+o),.5/2,0),i.add(u)}return i}function dg({color:n=Fr}={}){const s=new we,r=new St(new Lt(1.1,1.9,.75),hg);r.position.y=1.9/2,s.add(r);const o=new St(new Lt(1.1*.86,1.9*.68,.02),new le({color:new Bt(n).lerp(new Bt(16777215),.25)}));o.position.set(0,1.9*.56,.75/2+.011),s.add(o);const a=new St(new Lt(1.1*.94,1.9*.09,.02),new le({color:new Bt(pi).lerp(new Bt(16777215),.15)}));a.position.set(0,1.9*.92,.75/2+.011),s.add(a);const l=new St(new Lt(1.1*.86,1.9*.12,.03),fl);return l.position.set(0,1.9*.16,.75/2+.015),s.add(l),s}function pg(){const i=new we,s=new St(new Lt(.8,.6,.3),hg);s.position.y=.6/2,i.add(s);const r=5;for(let a=0;a<r;a++){const l=new St(new Lt(.7040000000000001,.02,.02),fl);l.position.set(0,.6*.18+a*(.6*.5/r),.3/2+.005),i.add(l)}const o=new St(new Wn(.6*.28,.6*.28,.03,8),fl);return o.rotation.x=Math.PI/2,o.position.set(0,.6*.72,.3/2+.01),i.add(o),i}let Jr=null;function mg(){if(Jr)return Jr;const n=128,t=document.createElement("canvas");t.width=n,t.height=n;const e=t.getContext("2d"),i=n/2,s=e.createRadialGradient(i,i,0,i,i,i);return s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.5,"rgba(255,255,255,0.4)"),s.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=s,e.fillRect(0,0,n,n),Jr=new ln(t),Jr.colorSpace=Ee,Jr}function o1({color:n,radius:t=6,intensity:e=1}){const i=new le({map:mg(),color:n,transparent:!0,blending:ja,depthWrite:!1,opacity:e}),s=new St(new Te(2,2),i);return s.rotation.x=-Math.PI/2,s.scale.set(t,t,1),s}const Qu=4,hr=5,a1=4.4,vn=-1.5,Cp=6,l1=9,Pp=4,Lp=6,c1=2,u1=hr+.7,h1=vn-hr/2+.35,f1=u1+c1,gg=.42,th=.65,Lc=3,fr=["#FF2D55","#FFB347","#00E5FF","#FF6FA8","#7CE7C4"],Dp=["居酒屋","焼鳥","ラーメン","バー","喫茶","小料理","酒場","おでん","寿司"],_g=4;let Ip=20260731;const Np=()=>(Ip=(Ip*1664525+1013904223)%4294967296)/4294967296;function wn(n,{x:t=0,y:e=0,z:i=0}={}){return n.applyMatrix4(new se().makeTranslation(t,e,i))}function _s(n,t){return new St(Xn(n),t)}function Ea(n,t){const e=n.attributes.position.count,i=new Float32Array(e*3);for(let s=0;s<e;s++)i.set([t.r,t.g,t.b],s*3);return n.setAttribute("color",new dn(i,3)),n}function Up(n,t,e,i,s,r,o,a){const l=new Te(t,e);l.translate(i,s,vn+.02),n[r].push(wn(l,{x:o,z:a}));const c=new Lt(t+.1,e+.1,.05);c.translate(i,s,vn-.01),n.dark.push(wn(c,{x:o,z:a}));const u=new Lt(.045,e,.03);u.translate(i,s,vn+.035),n.dark.push(wn(u,{x:o,z:a}));const h=new Lt(t,.045,.03);h.translate(i,s,vn+.035),n.dark.push(wn(h,{x:o,z:a}))}function d1(n,t,e,i,s){const r=Cp+Np()*(l1-Cp),o=.09+Np()*.07,a=new Bt(o,o*.95,o*1.15),l=new Lt(Qu-.12,r,hr);l.translate(0,r/2,vn-hr/2),i.body.push(Ea(wn(l,{x:t,z:e}),a));const c=new Lt(Qu,.18,hr+.7);c.translate(0,r+.09,vn-hr/2+.35),i.dark.push(wn(c,{x:t,z:e}));const u=new Lt(1.7,2.1,.5);u.translate(-.55,1.05,vn-.24),i.warm.push(wn(u,{x:t,z:e}));const h=fg({color:fr[n%fr.length],width:1.6});h.position.set(-.55,1.58,vn+.04),h.updateMatrix();for(const p of h.children){p.updateMatrix();const M=p.geometry.clone().applyMatrix4(p.matrix).applyMatrix4(h.matrix);p.material.side===Oe?i.noren.push(Ea(wn(M,{x:t,z:e}),p.material.color)):i.dark.push(wn(M,{x:t,z:e}))}Up(i,1.15,.95,1.05,1.35,"warm",t,e),Up(i,1.3,.9,-.4,r-1.5,n%3===1?"dark":"warm",t,e);const f=new Bt(n%3===0?Us:pi).lerp(new Bt(16777215),.25).multiplyScalar(1.35),d=new Te(gg,th);d.translate(-1.65,1.85+th/2,vn+.42),i.lantern.push(Ea(wn(d,{x:t,z:e}),f));const g=new Bt(fr[n%fr.length]).lerp(new Bt(on),.4).multiplyScalar(.95),v=new Te(Lc*2,Lc*2);v.rotateX(-Math.PI/2),v.translate(-.55,.05,vn+Lc*.45),i.pool.push(Ea(wn(v,{x:t,z:e}),g));const m=pg();m.position.set(1.35,r-2.4,vn+.02),m.updateMatrix();for(const p of m.children){p.updateMatrix();const M=p.geometry.clone().applyMatrix4(p.matrix).applyMatrix4(m.matrix);(p.material===s?i.plastic:i.dark).push(wn(M,{x:t,z:e}))}return r}function p1(){const n=[];for(let t=0;t<_g;t++){const e=zi({text:Dp[t%Dp.length],style:t%2?"neon":"lightbox",orientation:"vertical",color:fr[(t+2)%fr.length],px:256}),i=new le({map:e.map,side:Oe});i.color.setScalar(1),n.push({mat:i,aspect:e.aspect})}return n}function m1(){const t=Math.round(160*(gg/th)),e=document.createElement("canvas");e.width=t,e.height=160;const i=e.getContext("2d"),s=[[.22,0],[.75,.08],[1,.3],[1.05,.55],[.95,.78],[.6,.94],[.22,1]],r=160*.08,o=r,a=160-r*2,l=t/2,c=t/2-1,u=(d,g)=>[l+d*c,o+g*a],h=()=>{i.beginPath(),s.forEach(([d,g],v)=>{const[m,p]=u(d,g);v===0?i.moveTo(m,p):i.lineTo(m,p)});for(let d=s.length-2;d>=0;d--){const[g,v]=u(-s[d][0],s[d][1]);i.lineTo(g,v)}i.closePath()};i.save(),h(),i.clip();const f=i.createLinearGradient(0,o,0,o+a);f.addColorStop(0,"#8a8a8a"),f.addColorStop(.45,"#ffffff"),f.addColorStop(1,"#8a8a8a"),i.fillStyle=f,i.fillRect(0,0,t,160),i.strokeStyle="rgba(15,10,8,0.55)",i.lineWidth=160*.02;for(const[,d]of s.slice(1,-1)){const g=o+d*a;i.beginPath(),i.moveTo(0,g),i.lineTo(t,g),i.stroke()}return i.restore(),i.fillStyle="#14100c",i.fillRect(l-t*.11,0,t*.22,r),i.fillRect(l-t*.14,160-r,t*.28,r),Object.assign(new ln(e),{colorSpace:Ee})}function g1(){const n={dark:[],warm:[],plastic:[],body:[],lantern:[],noren:[],pool:[]},e=pg().children[0].material,i=p1(),s=3.2,r=new Te(s*i[0].aspect,s),o=i.map(()=>[]);let a=0;for(let d=0;d<Pp;d++){const g=(d-(Pp-1)/2)*f1-h1;for(let v=0;v<Lp;v++,a++){const m=(v-(Lp-1)/2)*a1,p=d1(a,m,g,n,e);o[a%_g].push({x:m,z:g,height:p})}}const l=new we;l.add(_s(n.dark,new kt({color:2303794}))),l.add(_s(n.warm,new kt({color:2760460,emissive:on,emissiveIntensity:1.15}))),l.add(_s(n.plastic,new kt({color:13289402}))),l.add(_s(n.body,new kt({vertexColors:!0}))),l.add(_s(n.lantern,new le({map:m1(),vertexColors:!0,side:Oe,alphaTest:.5}))),l.add(_s(n.noren,new kt({vertexColors:!0,side:Oe}))),l.add(_s(n.pool,new le({map:mg(),vertexColors:!0,transparent:!0,blending:ja,depthWrite:!1})));const c=[],u=new Ie;i.forEach(({mat:d},g)=>{const v=o[g],m=new w0(r,d,v.length);v.forEach((p,M)=>{u.position.set(p.x+Qu/2-.3,p.height-1.05,p.z+vn+.6),u.rotation.set(0,-Math.PI/2,0),u.updateMatrix(),m.setMatrixAt(M,u.matrix)}),m.instanceMatrix.needsUpdate=!0,l.add(m),c.push(d)});const[h,f]=cl;return l.position.set(an(f),0,an(h)),{group:l,signMats:c}}const sr=7,rr=5.5,_n=0,Ti=3.9,cr=.9,eh=.2,Fp=Ti+cr+eh,Op=-1.4,Bp=1.5,_1=-2.9,x1=1053465,v1=2369326,M1=9075292,Ta=14676735,S1="#00E5FF",y1=new kt({color:x1}),b1=new kt({color:M1}),E1=new kt({color:pi,side:Oe});function nh(n,t,e){return new St(new Te(n,t),e)}function dr(n,{x:t=0,y:e=0,z:i=0,ry:s=0,rz:r=0}={}){const o=new se().compose(new D(t,e,i),new Vn().setFromEuler(new kn(0,s,r)),new D(1,1,1));return n.applyMatrix4(o)}function Dc(n,t){return new St(Xn(n),t)}function T1(n,t,e,i,s,r){const o=nh(t,e,i);o.position.set(s,r,_n+.02),n.push(dr(new Lt(t+.08,e+.08,.05),{x:s,y:r,z:_n-.02}));for(const a of[-t/6,t/6])n.push(dr(new Lt(.05,e,.03),{x:s+a,y:r,z:_n+.04}));return o}function w1(){const n=new we,t=[],e=[],i=new St(new Lt(sr,Ti,rr),new kt({color:v1}));i.position.set(0,Ti/2,_n-rr/2),n.add(i),e.push(dr(new Lt(sr,cr,.45),{x:0,y:Ti+cr/2,z:_n-.05}));const s=new Bt(Ta).lerp(new Bt(16777215),.35),r=new le({color:s.clone()}),o=new St(new Lt(sr*.92,.06,.05),r);o.position.set(0,Ti+.06,_n+.18),n.add(o),t.push(dr(new Lt(sr+.3,eh,rr+.3),{x:0,y:Ti+cr+eh/2,z:_n-rr/2+.15}));const a=new kt({color:Ta,emissive:Ta,emissiveIntensity:1.05,transparent:!0,opacity:.42,side:Oe}),l=4,c=Ti-.25,u=T1(t,l,c,a,1.4,c/2+.1);n.add(u);const h=.3,f=.015,g=[[-.1,.6,1.6],[.9,.7,1.9],[1.9,.6,1.3],[2.9,.7,1.8]].map(([ft,V,at])=>dr(new Lt(V,at,h),{x:ft,y:at/2,z:f-h/2}));n.add(Dc(g,b1));const v=new kt({color:1317154,emissive:Ta,emissiveIntensity:1}),m=new St(new Lt(Bp,2.3,.5),v);m.position.set(Op,1.15,_n-.25),n.add(m);const p=fg({color:pi,width:Bp*.92});p.position.set(Op,1.8,_n+.05),p.updateMatrix();for(const ft of p.children){ft.updateMatrix();const V=ft.geometry.clone().applyMatrix4(ft.matrix).applyMatrix4(p.matrix);ft.material.side===Oe?e.push(V):t.push(V)}const M=dg({color:Fr}),y=_1,_=0,T=_n+.35,[E,R,S,w]=M.children,L=new St(E.geometry,E.material);L.position.set(y+E.position.x,_+E.position.y,T+E.position.z),n.add(L),t.push(dr(w.geometry.clone(),{x:y+w.position.x,y:_+w.position.y,z:T+w.position.z}));const I=new St(R.geometry,R.material);I.position.set(y+R.position.x,_+R.position.y,T+R.position.z),n.add(I);const U=new St(S.geometry,S.material);U.position.set(y+S.position.x,_+S.position.y,T+S.position.z),n.add(U);const q=[R.material,S.material],J=q.map(ft=>ft.color.clone());n.add(Dc(t,y1)),n.add(Dc(e,E1));const H=zi({text:"Profile",style:"lightbox",orientation:"horizontal",color:S1,px:256}),Y=new le({map:H.map});Y.color.setScalar(.57);const z=cr*.72,K=nh(z*H.aspect,z,Y);K.position.set(0,Ti+cr/2,_n+.2),n.add(K);const rt=zi({text:"コンビニ",style:"neon",orientation:"vertical",color:"#FFB347",px:256}),pt=new le({map:rt.map,side:Oe});pt.color.setScalar(.57);const xt=1.5,vt=nh(xt*rt.aspect,xt,pt);vt.position.set(sr/2-.25,Ti-.95,_n+.6),vt.rotation.y=-Math.PI/2,n.add(vt);const te=new St(new Lt(sr+1.2,Fp+1.2,rr+1.6),new le({transparent:!0,opacity:0,depthWrite:!1}));te.position.set(0,(Fp+1.2)/2,_n-rr/2+.5),n.add(te);function pe(ft){a.emissiveIntensity=ft?1.65:1.05,r.color.copy(s).lerp(new Bt(16777215),ft?.35:0),Y.color.setScalar(ft?1:.57),pt.color.setScalar(ft?1:.57),v.emissiveIntensity=ft?1.5:1,q.forEach((V,at)=>{V.color.copy(J[at]).lerp(new Bt(16777215),ft?.35:0)})}return{group:n,hit:te,setHover:pe}}const ih=n=>"#"+n.toString(16).padStart(6,"0");function ws(n,{x:t=0,y:e=0,z:i=0,ry:s=0,rz:r=0}={}){const o=new se().compose(new D(t,e,i),new Vn().setFromEuler(new kn(0,s,r)),new D(1,1,1));return n.applyMatrix4(o)}function _o(n,t){return new St(Xn(n),t)}const zp=[Fr,pi,Us],Hp=1.1,Ic=1.9,wa=.75,Gp=.08;function A1(){const n=new we,t=new St(new Wn(.24,.27,.6,10),new kt({color:2895670}));t.position.y=.3,n.add(t);const e=new St(new Wn(.26,.26,.05,10),new le({color:new Bt(Fr).lerp(new Bt(16777215),.1)}));return e.position.y=.62,n.add(e),n}function R1(){const n=new St(new Vh(1,16),new le({color:new Bt(1778488).lerp(new Bt(on),.3)}));return n.scale.set(1.4,1,1),n.rotation.x=-Math.PI/2,n.position.y=.015,n}function C1(){const n=new we,t=zp.length,e=t*Hp+(t-1)*Gp,i=.1,s=new St(new Lt(e+.3,i,wa+.3),new kt({color:Dr}));s.position.set(0,i/2,0),n.add(s);const r=[],o=[];let a,l,c;const u=[],h=[];zp.forEach((T,E)=>{const R=dg({color:T}),S=(E-(t-1)/2)*(Hp+Gp),w=i,L=0,[I,U,q,J]=R.children;r.push(ws(I.geometry.clone(),{x:S+I.position.x,y:w+I.position.y,z:L+I.position.z})),a??(a=I.material),o.push(ws(J.geometry.clone(),{x:S+J.position.x,y:w+J.position.y,z:L+J.position.z})),l??(l=J.material),u.push(ws(q.geometry.clone(),{x:S+q.position.x,y:w+q.position.y,z:L+q.position.z})),c??(c=q.material);const H=U.material,Y=new St(U.geometry,H);Y.position.set(S+U.position.x,w+U.position.y,L+U.position.z),n.add(Y),h.push(H)});const f=h.map(T=>T.color.clone());n.add(_o(r,a)),n.add(_o(o,l)),n.add(_o(u,c)),h.push(c),f.push(c.color.clone());const d=zi({text:"Résumé",sub:"PDF",style:"lightbox",orientation:"horizontal",color:ih(on),px:256}),g=new le({map:d.map});g.color.setScalar(.5);const v=1,m=new St(new Te(v,v/d.aspect),g);m.position.set(0,i+Ic+.2,wa/2-.02),n.add(m);const p=A1();p.position.set(e/2+.55,0,.1),n.add(p);const M=R1();M.position.set(0,0,wa/2+.9),n.add(M);const y=new St(new Lt(e+1.6,i+Ic+.7,wa+1.4),new le({transparent:!0,opacity:0,depthWrite:!1}));y.position.set(.3,(i+Ic+.7)/2,.1),n.add(y);function _(T){h.forEach((E,R)=>{E.color.copy(f[R]).lerp(new Bt(16777215),T?.45:0)}),g.color.setScalar(T?1:.5)}return{group:n,hit:y,setHover:_}}const jr=4,so=4,ji=5.5,yi=so/2;function Vp(n,t,e,i,s,r,o){const a=new St(new Te(t,e),i);return a.position.set(s,r,o),n.push(ws(new Lt(t+.08,e+.08,.04),{x:s,y:r,z:o-.025})),a}function P1(){const n=new we,t=new St(new Lt(jr,ji,so),new kt({color:Dr}));t.position.y=ji/2,n.add(t);const e=new kt({color:1316639}),i=[];i.push(ws(new Lt(jr+.3,.2,so+.3),{x:0,y:ji+.1,z:0})),i.push(ws(new Lt(jr+.06,.12,so+.06),{x:0,y:ji/2,z:0}));const s=1.3,r=2.3,o=new kt({color:1708550,emissive:on,emissiveIntensity:.55}),a=new St(new Lt(s,r,.4),o);a.position.set(0,r/2,yi-.18),n.add(a);const l=new kt({color:1840136,emissive:on,emissiveIntensity:.8});n.add(Vp(i,1.1,1,l,1.1,1.1,yi+.02));const c=new St(new Lt(.9,.12,.3),new kt({color:2760725}));c.position.set(1.1,.75,yi-.32),n.add(c),n.add(Vp(i,.9,.8,new kt({color:856087}),-.6,ji-1.3,yi+.02));const u=new kt({color:2829099}),h=new St(new Wn(.03,.03,.32,6),u);h.rotation.z=Math.PI/2,h.position.set(0,r+.55,yi+.1),n.add(h);const f=new Bt(pi).lerp(new Bt(16777215),.4),d=new le({color:f.clone()}),g=new St(new Po(.22,12,10),d);g.position.set(0,r+.55,yi+.28),n.add(g);const v=zi({text:"交番",style:"lightbox",orientation:"vertical",color:ih(pi),px:256}),m=new le({map:v.map,side:Oe});m.color.setScalar(.61);const p=1.4,M=new St(new Te(p*v.aspect,p),m);M.position.set(jr/2-.2,ji-1,yi+.5),M.rotation.y=-Math.PI/2,n.add(M);const y=zi({text:"Contact",style:"lightbox",orientation:"horizontal",color:ih(on),px:256}),_=new le({map:y.map});_.color.setScalar(.62);const T=.7,E=new St(new Te(T,T/y.aspect),_);E.position.set(-1.1,1.75,yi+.02),n.add(E);const R=new St(new Lt(.7,.55,.04),new kt({color:3877404}));R.position.set(-1.1,.85,yi+.04),n.add(R);const S=new kt({color:15920608}),w=[[-.12,.09,.12],[.1,-.03,-.1],[-.02,-.13,.05]].map(([U,q,J])=>ws(new Te(.2,.26),{x:R.position.x+U,y:R.position.y+q,z:R.position.z+.03,rz:J}));n.add(_o(w,S)),n.add(_o(i,e));const L=new St(new Lt(jr+1.2,ji+1.2,so+1.4),new le({transparent:!0,opacity:0,depthWrite:!1}));L.position.set(0,(ji+1.2)/2,.2),n.add(L);function I(U){o.emissiveIntensity=U?1:.55,l.emissiveIntensity=U?1.3:.8,d.color.copy(f).lerp(new Bt(16777215),U?.3:0),m.color.setScalar(U?1:.61),_.color.setScalar(U?1:.62)}return{group:n,hit:L,setHover:I}}const xg=n=>"#"+n.toString(16).padStart(6,"0");function kp(n){let t=0;for(let e=0;e<n.length;e++)t=t*31+n.charCodeAt(e)>>>0;return t||1}const Wp=[16723285,16757575,58879,16740264,8185796],Xp={live:{sign:"neon",bright:1,halo:1},WIP:{sign:"lightbox",bright:.55,halo:.5},"coming-soon":{sign:"painted",bright:.25,halo:.12}},Aa=14,L1=8.5,Nc=8.5;function D1(n){if(n.length<=12)return{text:n,sub:""};const t=n.length/2;let e=-1,i=1/0;for(let s=0;s<n.length;s++){if(n[s]!==" ")continue;const r=Math.abs(s-t);r<i&&(i=r,e=s)}return e<0?{text:n,sub:""}:{text:n.slice(0,e),sub:n.slice(e+1)}}function I1(n,t,e){let i=n;const s=()=>(i=(i*1664525+1013904223)%4294967296)/4294967296,r=4,o=7,a=30,l=34,c=r*a,u=o*l,h=()=>{const M=document.createElement("canvas");return M.width=c,M.height=u,[M,M.getContext("2d")]},[f,d]=h(),[g,v]=h();d.fillStyle="#a9b1bd",d.fillRect(0,0,c,u),v.fillStyle="#000",v.fillRect(0,0,c,u);const m=[on,Us,Fr,t];for(let M=0;M<r;M++){const y=M*a;if(M%4===0){d.fillStyle="#4d5566",d.fillRect(y,0,a,u);continue}for(let _=0;_<o;_++){const T=_*l;if(s()>.6*e){d.fillStyle="rgba(0,0,0,0.22)",d.fillRect(y+3,T+2,a-6,l-5);continue}const E=xg(m[Math.floor(s()*m.length)]);d.fillStyle=E,d.fillRect(y+3,T+2,a-6,l-5),v.fillStyle=E,v.fillRect(y+3,T+2,a-6,l-5)}}d.fillStyle="rgba(0,0,0,0.4)";for(let M=0;M<o;M++)d.fillRect(0,M*l,c,2);const p=M=>Object.assign(new ln(M),{colorSpace:Ee,anisotropy:8});return{map:p(f),emissiveMap:p(g)}}function N1(n,t){const e=new we,{x:i,z:s}=Ps(t.cell,t.lot);e.position.set(i,0,s);const r=t.h,o=Wp[kp(n.id)%Wp.length],a=xg(o),l=Xp[n.status]??Xp.live,{map:c,emissiveMap:u}=I1(kp(n.id),o,l.bright),h=.35*l.bright,f=new kt({map:c,emissiveMap:u,emissive:16777215,emissiveIntensity:h}),d=new St(new Lt(L1,r,Nc),f);d.position.y=r/2,e.add(d);const{text:g,sub:v}=D1(n.title),m=zi({text:g,sub:v,style:l.sign,orientation:"horizontal",color:a,px:320}),p=new le({map:m.map}),M=Aa/m.aspect,y=new St(new Te(Aa,M),p);y.position.set(0,r+.4+M/2,Nc/2+.06),e.add(y);const _=.5*l.halo,T=o1({color:a,radius:Aa*.65,intensity:_});T.position.y=.03,e.add(T);const E=r+M+2,R=new St(new Lt(Aa+1,E,Nc+1),new le({transparent:!0,opacity:0,depthWrite:!1}));R.position.y=E/2,e.add(R);function S(w){p.color.setScalar(w?1.6:1),T.material.opacity=w?_*1.7:_,f.emissiveIntensity=w?h*1.4:h}return{group:e,hit:R,setHover:S,project:n}}function U1(n){let t=n;return()=>(t=(t*1664525+1013904223)%4294967296)/4294967296}const F1=20,Yp=11,sh=Hn+16,O1=-105,B1=-4.8,Ra=3.2,Ca=1.5,Uc=1.3,z1=.15,H1=4,qp=3,G1=8,Fc=9,V1=.15;function k1(){const n=document.createElement("canvas");n.width=64,n.height=64;const t=n.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,0.6)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new ln(n)}function W1(n,t){const e=Math.min(3,n.length);if(e===0)return{update(){},reset(){}};const i=Math.max(1,Math.floor(n.length/e)),s=[];for(let c=0;c<e;c++)s.push(n[c*i%n.length]);const r=s.map(c=>c.color.clone()),o=s.map(()=>t()*100);function a(c){for(let u=0;u<s.length;u++){const d=Math.sin(c*.6+o[u])+Math.sin(c*1.37+o[u]*2.3)*.6<-1.05?Math.sin(c*47+o[u])>0?1:V1:1;s[u].color.copy(r[u]).multiplyScalar(d)}}function l(){for(let c=0;c<s.length;c++)s[c].color.copy(r[c])}return{update:a,reset:l}}function X1(n){const t=new we,e=new kt({color:1777190}),i=new kt({color:1708550,emissive:on,emissiveIntensity:.7}),s=new le({color:new Bt(pi).lerp(new Bt(16777215),.3)});for(let o=0;o<H1;o++){const a=-6.625+Ra/2+o*(Ra+z1),l=new St(new Lt(Ra,Ca,Uc),e);l.position.set(a,0,0),t.add(l);const c=new St(new Te(Ra*.82,Ca*.4),i);c.position.set(a,.1,Uc/2+.01),t.add(c)}const r=new St(new Lt(.12,.12,Uc*.5),s);return r.position.set(-13.25/2-.02,-Ca*.25,0),t.add(r),t.rotation.y=Math.PI/2,t.position.set(B1,n+.14+Ca/2,sh),t}function Y1(n,t){const e=t%F1;if(e>=Yp){n.visible=!1;return}n.visible=!0,n.position.z=sh+(O1-sh)*(e/Yp)}function q1(n){const t=k1(),e=new Bt(Us).lerp(new Bt(9476523),.75),i=an(cl[1]),s=an(cl[0]),r=new we,o=[],a=[],l=[];for(let u=0;u<qp;u++){const h=new b0({map:t,color:e,transparent:!0,opacity:0,depthWrite:!1}),f=new _M(h),d=1.6+n()*.8;f.scale.set(d,d,1),a.push({x:i+(n()-.5)*30,y:9+n()*1.5,z:s+(n()-.5)*30}),l.push(n()*Fc),o.push(f),r.add(f)}function c(u){for(let h=0;h<qp;h++){const f=(u+l[h])%Fc/Fc,d=a[h];o[h].position.set(d.x,d.y+f*G1,d.z);const g=f<.2?f/.2:f>.75?(1-f)/.25:1;o[h].material.opacity=.3*g}}return{group:r,update:c}}function $1({reduceMotion:n=!1,flickerMaterials:t=[],trackY:e}={}){if(typeof e!="number")throw new Error("createAmbient needs trackY (pass station.trackY) — the train rides the station deck");const i=new we,s=U1(31337);function r(u){u.reset(),i.traverse(h=>{var f;(f=h.geometry)==null||f.dispose();for(const d of[h.material].flat().filter(Boolean)){for(const g of Object.values(d))g!=null&&g.isTexture&&g.dispose();d.dispose()}})}if(n){const u={update(){},reset(){}};return{group:i,update(){},dispose:()=>r(u)}}const o=X1(e);i.add(o);const a=q1(s);i.add(a.group);const l=W1(t,s);function c(u,h){Y1(o,h),a.update(h),l.update(h)}return{group:i,update:c,dispose:()=>r(l)}}const Qr=12.5,Qn=7,or=1536,Do=768,Qi=48,Oc=76,vg=130,Ir=68,Pa="'DM Mono', ui-monospace, monospace";function K1(n){const t=document.createElement("canvas");t.width=or,t.height=Do;const e=t.getContext("2d");e.fillStyle="#04050a",e.fillRect(0,0,or,Do),e.textBaseline="middle",((r,o)=>{r.fillStyle="#ffcf8a",r.font=`500 36px ${Pa}`,r.fillText("行先  DESTINATION",Qi,Oc),r.textAlign="right",r.fillText("YEAR   STATUS",or-Qi,Oc),r.textAlign="left",r.fillStyle="#8a6a34",r.fillRect(Qi,Oc+32,or-Qi*2,3)})(e);const s=r=>"#"+r.toString(16).padStart(6,"0");return n.forEach((r,o)=>{const a=vg+o*Ir+Ir/2,l=r.status==="live",c=l?s(Us):"#9a8663",u=l?s(Fr):"#7d7361";e.font=`500 38px ${Pa}`,e.fillStyle=s(on),e.fillText(String(o+1).padStart(2,"0"),Qi,a),e.font=`500 44px ${Pa}`,e.fillStyle=c,e.fillText(r.title,Qi+110,a),e.textAlign="right",e.font=`400 32px ${Pa}`,e.fillStyle="#8e8a7e",e.fillText(r.year??"",or-Qi-230,a),e.fillStyle=u,e.fillText(l?"ON TIME":"DELAYED",or-Qi,a),e.textAlign="left"}),Object.assign(new ln(t),{colorSpace:Ee,anisotropy:8})}function Z1(n){const t=vg+n*Ir+Ir/2;return Qn/2-t/Do*Qn}function J1(n){const t=new we,e=2.6,i=K1(n),s=new le({map:i});s.color.setScalar(.8);const r=new St(new Te(Qr,Qn),s);r.position.set(0,e+Qn/2,.07),t.add(r);const o=new kt({color:1316639}),a=new St(new Lt(Qr+.5,Qn+.5,.3),o);a.position.set(0,e+Qn/2,-.08),t.add(a);const l=new St(new Lt(Qr+.7,.16,.8),o);l.position.set(0,e+Qn+.32,.22),t.add(l);const c=new St(new Te(Qr-.4,Ir/Do*Qn),new le({color:Us,transparent:!0,opacity:.16}));c.visible=!1,c.position.z=.1,t.add(c);const u=new le({transparent:!0,opacity:0,depthWrite:!1}),h=n.map((f,d)=>{const g=e+Qn/2+Z1(d),v=new St(new Lt(Qr-.4,Ir/Do*Qn,.5),u);return v.position.set(0,g,.2),t.add(v),{hit:v,project:f,setHover(m){c.visible=m,m&&(c.position.y=g),s.color.setScalar(m?1:.8)}}});return{group:t,rows:h}}const j1="#141a24",Q1=27;function tR(n){return[n.material].flat().some(t=>t==null?void 0:t.transparent)}function eR(n,t,e){const i=new P0(n.geometry,t),s=new se,r=new se;for(let o=0;o<n.count;o++)n.getMatrixAt(o,s),r.multiplyMatrices(n.matrixWorld,s),e.push(i.clone().applyMatrix4(r))}function nR(n,{skip:t=[],color:e=j1,thresholdAngle:i=Q1}={}){n.updateMatrixWorld(!0);const s=[];function r(c){if(!(t.includes(c)||!c.visible)){c.isInstancedMesh?eR(c,i,s):c.isMesh&&!tR(c)&&s.push(new P0(c.geometry,i).applyMatrix4(c.matrixWorld));for(const u of c.children)r(u)}}r(n);const o=Xn(s),a=new A0({color:e,transparent:!0}),l=new EM(o,a);return l.raycast=()=>{},l}const iR={class:"min-h-screen bg-[#070A12] text-[#E8E3D8] font-body px-5 py-10 sm:px-10 sm:py-16"},sR={class:"max-w-2xl mx-auto"},rR={class:"flex flex-col gap-4"},oR=["href"],aR={class:"font-display text-lg text-[#E8E3D8] group-hover:text-[#FFB347] group-hover:underline underline-offset-4"},lR={class:"mt-1 text-sm text-[#E8E3D8]/70"},cR={class:"mt-1 text-sm text-[#E8E3D8]/45"},uR={class:"mt-2 font-mono text-xs text-[#E8E3D8]/45"},hR={key:1,class:"opacity-70"},fR={class:"font-display text-lg text-[#E8E3D8]"},dR={class:"mt-1 text-sm text-[#E8E3D8]/70"},pR={class:"mt-1 text-sm text-[#E8E3D8]/45"},mR={class:"mt-2 font-mono text-xs text-[#E8E3D8]/45"},$p={__name:"ProjectList",props:{projects:{type:Array,required:!0}},setup(n){function t(e){return e==="live"?"live":e==="WIP"?"in progress":e==="coming-soon"?"planned":e}return(e,i)=>(In(),Ci("div",iR,[Ye("div",sR,[i[2]||(i[2]=px('<header class="mb-10"><h1 class="font-display text-3xl sm:text-4xl text-[#FFB347]">Paulo Gonzales</h1><p class="mt-3 text-[#E8E3D8]/90"> Project catalog — software built by Paulo Gonzales, software engineer. </p><p class="mt-5 flex flex-wrap gap-x-6 gap-y-2"><a href="./projects/profile/" class="text-[#FFB347] underline decoration-[#FFB347]/40 underline-offset-4 hover:decoration-[#FFB347] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]">Profile</a><a href="./assets/Paulo_Gonzales_Resume_SoftwareEngineer.pdf" download="Paulo_Gonzales_Resume_SoftwareEngineer.pdf" class="text-[#FFB347] underline decoration-[#FFB347]/40 underline-offset-4 hover:decoration-[#FFB347] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]">Resume (PDF)</a></p></header>',1)),Ye("section",null,[i[1]||(i[1]=Ye("h2",{class:"font-display text-xl text-[#FFB347] mb-4"},"Projects",-1)),Ye("ul",rR,[(In(!0),Ci(ei,null,B_(n.projects,s=>(In(),Ci("li",{key:s.id,class:"border border-[#E8E3D8]/15 rounded-md p-4"},[s.status!=="coming-soon"?(In(),Ci("a",{key:0,href:s.url,class:"block group rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]"},[Ye("h3",aR,Qe(s.title),1),Ye("p",lR,Qe(s.tagline),1),Ye("p",cR,Qe(s.description),1),Ye("p",uR,Qe(s.category)+" · "+Qe(s.year)+" · "+Qe(s.tools.join(", "))+" · "+Qe(t(s.status)),1)],8,oR)):(In(),Ci("div",hR,[Ye("h3",fR,[t0(Qe(s.title)+" ",1),i[0]||(i[0]=Ye("span",{class:"ml-2 align-middle text-[0.65rem] uppercase tracking-wide text-[#FF2D55]"},"Planned",-1))]),Ye("p",dR,Qe(s.tagline),1),Ye("p",pR,Qe(s.description),1),Ye("p",mR,Qe(s.category)+" · "+Qe(s.year)+" · "+Qe(s.tools.join(", "))+" · "+Qe(t(s.status)),1)]))]))),128))])])])]))}},gR={class:"relative h-full w-full bg-[#a9c8ec]"},_R={key:1,class:"h-full w-full overflow-y-auto"},xR={key:2,class:"pointer-events-none absolute inset-x-0 bottom-7 flex justify-center","aria-hidden":"true","data-hint":""},vR={__name:"ShinjukuScene",props:{projects:{type:Array,required:!0}},emits:["select","hover"],setup(n,{emit:t}){const e=n,i=t,s=La(null),r=La(!1),o=La(!0);let a=null,l=null,c=null;return Pm(()=>{try{l=Vw(s.value)}catch(M){console.error("WebGL unavailable, falling back to the project list.",M),r.value=!0;return}kw(l.scene),l.scene.add(rA()),l.scene.add(gA()),l.scene.add(n1());const u=g1();l.scene.add(u.group);const h={konbini:w1,koban:P1,vending:C1};for(const M of eg){const y=h[M.id];if(!y){console.warn(`cityLayout SCENERY_SITES references unknown scenery id "${M.id}"`);continue}const{x:_,z:T}=Ps(M.cell,M.lot),{group:E}=y();E.position.set(_,0,T),E.rotation.y=M.ry??0,l.scene.add(E)}const f=zA();l.scene.add(f.group);const d=(M,y)=>l.addPickable(M,y),g=new Map(e.projects.map(M=>[M.id,M]));for(const M of tg){const y=g.get(M.id);if(!y){console.warn(`cityLayout PROJECT_SITES references unknown project id "${M.id}"`);continue}const _=N1(y,M);l.scene.add(_.group),d(_.hit,{kind:"project",project:y,hover:_.setHover})}const v=J1(e.projects);f.boardAnchor.add(v.group);for(const M of v.rows)d(M.hit,{kind:"project",project:M.project,hover:M.setHover});c=$1({reduceMotion:l.reduceMotion,trackY:f.trackY}),l.scene.add(c.group),l.onFrame((M,y)=>c.update(M,y)),l.scene.add(nR(l.scene,{skip:[c.group]}));let m=null;l.onHover(M=>{var y,_;M!==m&&((y=m==null?void 0:m.hover)==null||y.call(m,!1),(_=M==null?void 0:M.hover)==null||_.call(M,!0),m=M,i("hover",(M==null?void 0:M.project)??null))}),l.onSelect(M=>i("select",M));const p=()=>{o.value=!1};s.value.addEventListener("pointerdown",p,{once:!0}),a=setTimeout(p,9e3),l.start()}),Lm(()=>{clearTimeout(a),c==null||c.dispose(),l==null||l.dispose()}),(u,h)=>(In(),Ci("div",gR,[r.value?(In(),Ci("div",_R,[Rn($p,{projects:n.projects},null,8,["projects"])])):(In(),Ci("canvas",{key:0,ref_key:"canvasEl",ref:s,"data-scene":"",class:"block h-full w-full cursor-grab touch-none","aria-label":"Interactive 3D map of Shinjuku. Shinjuku Station sits at the centre; each lit building is one project."},[Rn($p,{projects:n.projects},null,8,["projects"])],512)),!r.value&&o.value?(In(),Ci("div",xR,[...h[0]||(h[0]=[Ye("span",{class:"motion-safe:animate-pulse rounded-full border border-[#FFB347]/25 bg-black/45 px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#FFB347]/75"}," drag to pan · scroll to zoom · lit buildings are projects ",-1)])])):mx("",!0)]))}},MR={__name:"App",setup(n){const t=La([{id:"algo-lab",indexNumber:9,title:"Algorithm Lab",tagline:"things in motion, on a canvas",description:"Flocking boids, n-body gravity, the three-body problem, and other simulations rendered with vanilla canvas.",category:"simulations",year:"2026",tools:["canvas","vanilla js"],status:"live",url:"./projects/algo-lab/dist/index.html",github:""},{id:"flip7",indexNumber:8,title:"Flip 7",tagline:"a card game of risky math",description:"A multiplayer port of the press-your-luck card game. Draw cards, dodge duplicates, race to the target score.",category:"games",year:"2026",tools:["vue","vite","tailwind"],status:"live",url:"./projects/ported-games/flip7/dist/index.html",github:""},{id:"machi-koro",indexNumber:7,title:"Machi Koro",tagline:"build a city by rolling dice",description:"A web port of the dice-driven city-building board game. Roll, collect, buy, and outbuild your opponent.",category:"games",year:"2025",tools:["vue","vite","tailwind"],status:"live",url:"./projects/ported-games/machi-koro/dist/index.html",github:""},{id:"venue-search",indexNumber:6,title:"Venue Search",tagline:"rentable rooms in tokyo",description:"A better search for event spaces in Tokyo.",category:"maps",year:"2025",tools:["vue","leaflet"],status:"WIP",url:"./projects/venue-search/dist/index.html",github:""},{id:"reading-buddy",indexNumber:5,title:"Reading Buddy",tagline:"a companion for the long book",description:"Track your reading with progressive character reveals and chapter-by-chapter companion guides.",category:"reading",year:"2025",tools:["vue","vite"],status:"live",url:"./projects/reading-buddy/dist/index.html",github:""},{id:"japan-map",indexNumber:4,title:"Japan History Map",tagline:"centuries on a single canvas",description:"Significant events in Japanese history and the Tokyo train system, laid out on an interactive Leaflet map.",category:"maps",year:"2025",tools:["leaflet","vue"],status:"live",url:"./projects/japan-map/dist/index.html",github:""},{id:"right-word-japanese",indexNumber:3,title:"The Right Word",tagline:"a phrasebook for awkward moments",description:"Quick help when speaking Japanese — find the right word for the situation. Includes keigo for the careful moments.",category:"language",year:"2025",tools:["vue","vite"],status:"WIP",url:"./projects/right-word/dist/index.html",github:""},{id:"japanese-dashboard",indexNumber:2,title:"Japanese Learning",tagline:"a dashboard of small tools",description:"A collection of small, useful utilities for Japanese learning, all in one place.",category:"language",year:"2025",tools:["vue","vite"],status:"live",url:"./projects/japandash/dist/index.html",github:""},{id:"bible-hymn-kids",indexNumber:1,title:"Bible Hymn Learning",tagline:"hymns and scripture for young learners",description:"Interactive hymn and scripture learning experience designed for kids.",category:"reading",year:"2024",tools:["html","css","js"],status:"WIP",url:"./projects/bible-hymn/hymn-app.html",github:""}]);function e(i){if(!i)return;if(i.kind==="link"){if(i.download){const r=document.createElement("a");r.href=i.url,r.download=i.download,document.body.appendChild(r),r.click(),r.remove()}else window.open(i.url,"_blank","noopener");return}const s=i.project;!s||s.status==="coming-soon"||!s.url||window.open(s.url,"_blank","noopener")}return(i,s)=>(In(),Jm(vR,{projects:t.value,onSelect:e},null,8,["projects"]))}};Jx(MR).mount("#app");
