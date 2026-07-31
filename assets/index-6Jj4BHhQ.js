(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function tu(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const St={},Zs=[],ei=()=>{},gd=()=>!1,wa=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),nu=n=>n.startsWith("onUpdate:"),$t=Object.assign,iu=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},xm=Object.prototype.hasOwnProperty,ct=(n,e)=>xm.call(n,e),$e=Array.isArray,Js=n=>no(n)==="[object Map]",_d=n=>no(n)==="[object Set]",lh=n=>no(n)==="[object Date]",et=n=>typeof n=="function",Pt=n=>typeof n=="string",ii=n=>typeof n=="symbol",pt=n=>n!==null&&typeof n=="object",xd=n=>(pt(n)||et(n))&&et(n.then)&&et(n.catch),vd=Object.prototype.toString,no=n=>vd.call(n),vm=n=>no(n).slice(8,-1),Md=n=>no(n)==="[object Object]",su=n=>Pt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Nr=tu(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Aa=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},Mm=/-\w/g,Un=Aa(n=>n.replace(Mm,e=>e.slice(1).toUpperCase())),Sm=/\B([A-Z])/g,_s=Aa(n=>n.replace(Sm,"-$1").toLowerCase()),Sd=Aa(n=>n.charAt(0).toUpperCase()+n.slice(1)),Xa=Aa(n=>n?`on${Sd(n)}`:""),Jn=(n,e)=>!Object.is(n,e),Ya=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},yd=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},ym=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let ch;const Ra=()=>ch||(ch=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ru(n){if($e(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=Pt(i)?wm(i):ru(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(Pt(n)||pt(n))return n}const bm=/;(?![^(]*\))/g,Em=/:([^]+)/,Tm=/\/\*[^]*?\*\//g;function wm(n){const e={};return n.replace(Tm,"").split(bm).forEach(t=>{if(t){const i=t.split(Em);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function ou(n){let e="";if(Pt(n))e=n;else if($e(n))for(let t=0;t<n.length;t++){const i=ou(n[t]);i&&(e+=i+" ")}else if(pt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Am="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Rm=tu(Am);function bd(n){return!!n||n===""}function Cm(n,e){if(n.length!==e.length)return!1;let t=!0;for(let i=0;t&&i<n.length;i++)t=au(n[i],e[i]);return t}function au(n,e){if(n===e)return!0;let t=lh(n),i=lh(e);if(t||i)return t&&i?n.getTime()===e.getTime():!1;if(t=ii(n),i=ii(e),t||i)return n===e;if(t=$e(n),i=$e(e),t||i)return t&&i?Cm(n,e):!1;if(t=pt(n),i=pt(e),t||i){if(!t||!i)return!1;const s=Object.keys(n).length,r=Object.keys(e).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=e.hasOwnProperty(o);if(a&&!l||!a&&l||!au(n[o],e[o]))return!1}}return String(n)===String(e)}const Ed=n=>!!(n&&n.__v_isRef===!0),Jt=n=>Pt(n)?n:n==null?"":$e(n)||pt(n)&&(n.toString===vd||!et(n.toString))?Ed(n)?Jt(n.value):JSON.stringify(n,Td,2):String(n),Td=(n,e)=>Ed(e)?Td(n,e.value):Js(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[qa(i,r)+" =>"]=s,t),{})}:_d(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>qa(t))}:ii(e)?qa(e):pt(e)&&!$e(e)&&!Md(e)?String(e):e,qa=(n,e="")=>{var t;return ii(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let on;class Pm{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=on,!e&&on&&(this.index=(on.scopes||(on.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=on;try{return on=this,e()}finally{on=t}}}on(){++this._on===1&&(this.prevScope=on,on=this)}off(){this._on>0&&--this._on===0&&(on=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Dm(){return on}let Mt;const Ka=new WeakSet;class wd{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,on&&on.active&&on.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ka.has(this)&&(Ka.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Rd(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,uh(this),Cd(this);const e=Mt,t=Nn;Mt=this,Nn=!0;try{return this.fn()}finally{Pd(this),Mt=e,Nn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)uu(e);this.deps=this.depsTail=void 0,uh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ka.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){kl(this)&&this.run()}get dirty(){return kl(this)}}let Ad=0,Fr,Or;function Rd(n,e=!1){if(n.flags|=8,e){n.next=Or,Or=n;return}n.next=Fr,Fr=n}function lu(){Ad++}function cu(){if(--Ad>0)return;if(Or){let e=Or;for(Or=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Fr;){let e=Fr;for(Fr=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function Cd(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Pd(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),uu(i),Im(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function kl(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Dd(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Dd(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Wr)||(n.globalVersion=Wr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!kl(n))))return;n.flags|=2;const e=n.dep,t=Mt,i=Nn;Mt=n,Nn=!0;try{Cd(n);const s=n.fn(n._value);(e.version===0||Jn(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{Mt=t,Nn=i,Pd(n),n.flags&=-3}}function uu(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)uu(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Im(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Nn=!0;const Id=[];function bi(){Id.push(Nn),Nn=!1}function Ei(){const n=Id.pop();Nn=n===void 0?!0:n}function uh(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Mt;Mt=void 0;try{e()}finally{Mt=t}}}let Wr=0;class Lm{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class hu{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Mt||!Nn||Mt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Mt)t=this.activeLink=new Lm(Mt,this),Mt.deps?(t.prevDep=Mt.depsTail,Mt.depsTail.nextDep=t,Mt.depsTail=t):Mt.deps=Mt.depsTail=t,Ld(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=Mt.depsTail,t.nextDep=void 0,Mt.depsTail.nextDep=t,Mt.depsTail=t,Mt.deps===t&&(Mt.deps=i)}return t}trigger(e){this.version++,Wr++,this.notify(e)}notify(e){lu();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{cu()}}}function Ld(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Ld(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Wl=new WeakMap,us=Symbol(""),Xl=Symbol(""),Xr=Symbol("");function Wt(n,e,t){if(Nn&&Mt){let i=Wl.get(n);i||Wl.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new hu),s.map=i,s.key=t),s.track()}}function xi(n,e,t,i,s,r){const o=Wl.get(n);if(!o){Wr++;return}const a=l=>{l&&l.trigger()};if(lu(),e==="clear")o.forEach(a);else{const l=$e(n),c=l&&su(t);if(l&&t==="length"){const u=Number(i);o.forEach((h,f)=>{(f==="length"||f===Xr||!ii(f)&&f>=u)&&a(h)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),c&&a(o.get(Xr)),e){case"add":l?c&&a(o.get("length")):(a(o.get(us)),Js(n)&&a(o.get(Xl)));break;case"delete":l||(a(o.get(us)),Js(n)&&a(o.get(Xl)));break;case"set":Js(n)&&a(o.get(us));break}}cu()}function ys(n){const e=lt(n);return e===n?e:(Wt(e,"iterate",Xr),En(n)?e:e.map(On))}function Ca(n){return Wt(n=lt(n),"iterate",Xr),n}function qn(n,e){return Ti(n)?sr(hs(n)?On(e):e):On(e)}const Um={__proto__:null,[Symbol.iterator](){return $a(this,Symbol.iterator,n=>qn(this,n))},concat(...n){return ys(this).concat(...n.map(e=>$e(e)?ys(e):e))},entries(){return $a(this,"entries",n=>(n[1]=qn(this,n[1]),n))},every(n,e){return li(this,"every",n,e,void 0,arguments)},filter(n,e){return li(this,"filter",n,e,t=>t.map(i=>qn(this,i)),arguments)},find(n,e){return li(this,"find",n,e,t=>qn(this,t),arguments)},findIndex(n,e){return li(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return li(this,"findLast",n,e,t=>qn(this,t),arguments)},findLastIndex(n,e){return li(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return li(this,"forEach",n,e,void 0,arguments)},includes(...n){return Za(this,"includes",n)},indexOf(...n){return Za(this,"indexOf",n)},join(n){return ys(this).join(n)},lastIndexOf(...n){return Za(this,"lastIndexOf",n)},map(n,e){return li(this,"map",n,e,void 0,arguments)},pop(){return mr(this,"pop")},push(...n){return mr(this,"push",n)},reduce(n,...e){return hh(this,"reduce",n,e)},reduceRight(n,...e){return hh(this,"reduceRight",n,e)},shift(){return mr(this,"shift")},some(n,e){return li(this,"some",n,e,void 0,arguments)},splice(...n){return mr(this,"splice",n)},toReversed(){return ys(this).toReversed()},toSorted(n){return ys(this).toSorted(n)},toSpliced(...n){return ys(this).toSpliced(...n)},unshift(...n){return mr(this,"unshift",n)},values(){return $a(this,"values",n=>qn(this,n))}};function $a(n,e,t){const i=Ca(n),s=i[e]();return i!==n&&!En(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=t(r.value)),r}),s}const Nm=Array.prototype;function li(n,e,t,i,s,r){const o=Ca(n),a=o!==n&&!En(n),l=o[e];if(l!==Nm[e]){const h=l.apply(n,r);return a?On(h):h}let c=t;o!==n&&(a?c=function(h,f){return t.call(this,qn(n,h),f,n)}:t.length>2&&(c=function(h,f){return t.call(this,h,f,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function hh(n,e,t,i){const s=Ca(n),r=s!==n&&!En(n);let o=t,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,h){return a&&(a=!1,c=qn(n,c)),t.call(this,c,qn(n,u),h,n)}):t.length>3&&(o=function(c,u,h){return t.call(this,c,u,h,n)}));const l=s[e](o,...i);return a?qn(n,l):l}function Za(n,e,t){const i=lt(n);Wt(i,"iterate",Xr);const s=i[e](...t);return(s===-1||s===!1)&&mu(t[0])?(t[0]=lt(t[0]),i[e](...t)):s}function mr(n,e,t=[]){bi(),lu();const i=lt(n)[e].apply(n,t);return cu(),Ei(),i}const Fm=tu("__proto__,__v_isRef,__isVue"),Ud=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(ii));function Om(n){ii(n)||(n=String(n));const e=lt(this);return Wt(e,"has",n),e.hasOwnProperty(n)}class Nd{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?qm:zd:r?Bd:Od).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=$e(e);if(!s){let l;if(o&&(l=Um[t]))return l;if(t==="hasOwnProperty")return Om}const a=Reflect.get(e,t,qt(e)?e:i);if((ii(t)?Ud.has(t):Fm(t))||(s||Wt(e,"get",t),r))return a;if(qt(a)){const l=o&&su(t)?a:a.value;return s&&pt(l)?ql(l):l}return pt(a)?s?ql(a):du(a):a}}class Fd extends Nd{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];const o=$e(e)&&su(t);if(!this._isShallow){const c=Ti(r);if(!En(i)&&!Ti(i)&&(r=lt(r),i=lt(i)),!o&&qt(r)&&!qt(i))return c||(r.value=i),!0}const a=o?Number(t)<e.length:ct(e,t),l=Reflect.set(e,t,i,qt(e)?e:s);return e===lt(s)&&(a?Jn(i,r)&&xi(e,"set",t,i):xi(e,"add",t,i)),l}deleteProperty(e,t){const i=ct(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&xi(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!ii(t)||!Ud.has(t))&&Wt(e,"has",t),i}ownKeys(e){return Wt(e,"iterate",$e(e)?"length":us),Reflect.ownKeys(e)}}class Bm extends Nd{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const zm=new Fd,Hm=new Bm,Vm=new Fd(!0);const Yl=n=>n,lo=n=>Reflect.getPrototypeOf(n);function Gm(n,e,t){return function(...i){const s=this.__v_raw,r=lt(s),o=Js(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=t?Yl:e?sr:On;return!e&&Wt(r,"iterate",l?Xl:us),$t(Object.create(c),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}}})}}function co(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function km(n,e){const t={get(s){const r=this.__v_raw,o=lt(r),a=lt(s);n||(Jn(s,a)&&Wt(o,"get",s),Wt(o,"get",a));const{has:l}=lo(o),c=e?Yl:n?sr:On;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Wt(lt(s),"iterate",us),s.size},has(s){const r=this.__v_raw,o=lt(r),a=lt(s);return n||(Jn(s,a)&&Wt(o,"has",s),Wt(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=lt(a),c=e?Yl:n?sr:On;return!n&&Wt(l,"iterate",us),a.forEach((u,h)=>s.call(r,c(u),c(h),o))}};return $t(t,n?{add:co("add"),set:co("set"),delete:co("delete"),clear:co("clear")}:{add(s){const r=lt(this),o=lo(r),a=lt(s),l=!e&&!En(s)&&!Ti(s)?a:s;return o.has.call(r,l)||Jn(s,l)&&o.has.call(r,s)||Jn(a,l)&&o.has.call(r,a)||(r.add(l),xi(r,"add",l,l)),this},set(s,r){!e&&!En(r)&&!Ti(r)&&(r=lt(r));const o=lt(this),{has:a,get:l}=lo(o);let c=a.call(o,s);c||(s=lt(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?Jn(r,u)&&xi(o,"set",s,r):xi(o,"add",s,r),this},delete(s){const r=lt(this),{has:o,get:a}=lo(r);let l=o.call(r,s);l||(s=lt(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&xi(r,"delete",s,void 0),c},clear(){const s=lt(this),r=s.size!==0,o=s.clear();return r&&xi(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=Gm(s,n,e)}),t}function fu(n,e){const t=km(n,e);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(ct(t,s)&&s in i?t:i,s,r)}const Wm={get:fu(!1,!1)},Xm={get:fu(!1,!0)},Ym={get:fu(!0,!1)};const Od=new WeakMap,Bd=new WeakMap,zd=new WeakMap,qm=new WeakMap;function Km(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function $m(n){return n.__v_skip||!Object.isExtensible(n)?0:Km(vm(n))}function du(n){return Ti(n)?n:pu(n,!1,zm,Wm,Od)}function Zm(n){return pu(n,!1,Vm,Xm,Bd)}function ql(n){return pu(n,!0,Hm,Ym,zd)}function pu(n,e,t,i,s){if(!pt(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const r=$m(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:t);return s.set(n,a),a}function hs(n){return Ti(n)?hs(n.__v_raw):!!(n&&n.__v_isReactive)}function Ti(n){return!!(n&&n.__v_isReadonly)}function En(n){return!!(n&&n.__v_isShallow)}function mu(n){return n?!!n.__v_raw:!1}function lt(n){const e=n&&n.__v_raw;return e?lt(e):n}function Jm(n){return!ct(n,"__v_skip")&&Object.isExtensible(n)&&yd(n,"__v_skip",!0),n}const On=n=>pt(n)?du(n):n,sr=n=>pt(n)?ql(n):n;function qt(n){return n?n.__v_isRef===!0:!1}function Jo(n){return jm(n,!1)}function jm(n,e){return qt(n)?n:new Qm(n,e)}class Qm{constructor(e,t){this.dep=new hu,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:lt(e),this._value=t?e:On(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||En(e)||Ti(e);e=i?e:lt(e),Jn(e,t)&&(this._rawValue=e,this._value=i?e:On(e),this.dep.trigger())}}function eg(n){return qt(n)?n.value:n}const tg={get:(n,e,t)=>e==="__v_raw"?n:eg(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return qt(s)&&!qt(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function Hd(n){return hs(n)?n:new Proxy(n,tg)}class ng{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new hu(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Wr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Mt!==this)return Rd(this,!0),!0}get value(){const e=this.dep.track();return Dd(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function ig(n,e,t=!1){let i,s;return et(n)?i=n:(i=n.get,s=n.set),new ng(i,s,t)}const uo={},ua=new WeakMap;let rs;function sg(n,e=!1,t=rs){if(t){let i=ua.get(t);i||ua.set(t,i=[]),i.push(n)}}function rg(n,e,t=St){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=t,c=M=>s?M:En(M)||s===!1||s===0?ki(M,1):ki(M);let u,h,f,d,_=!1,x=!1;if(qt(n)?(h=()=>n.value,_=En(n)):hs(n)?(h=()=>c(n),_=!0):$e(n)?(x=!0,_=n.some(M=>hs(M)||En(M)),h=()=>n.map(M=>{if(qt(M))return M.value;if(hs(M))return c(M);if(et(M))return l?l(M,2):M()})):et(n)?e?h=l?()=>l(n,2):n:h=()=>{if(f){bi();try{f()}finally{Ei()}}const M=rs;rs=u;try{return l?l(n,3,[d]):n(d)}finally{rs=M}}:h=ei,e&&s){const M=h,T=s===!0?1/0:s;h=()=>ki(M(),T)}const m=Dm(),p=()=>{u.stop(),m&&m.active&&iu(m.effects,u)};if(r&&e){const M=e;e=(...T)=>{M(...T),p()}}let y=x?new Array(n.length).fill(uo):uo;const A=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(e){const T=u.run();if(s||_||(x?T.some((E,C)=>Jn(E,y[C])):Jn(T,y))){f&&f();const E=rs;rs=u;try{const C=[T,y===uo?void 0:x&&y[0]===uo?[]:y,d];y=T,l?l(e,3,C):e(...C)}finally{rs=E}}}else u.run()};return a&&a(A),u=new wd(h),u.scheduler=o?()=>o(A,!1):A,d=M=>sg(M,!1,u),f=u.onStop=()=>{const M=ua.get(u);if(M){if(l)l(M,4);else for(const T of M)T();ua.delete(u)}},e?i?A(!0):y=u.run():o?o(A.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function ki(n,e=1/0,t){if(e<=0||!pt(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,qt(n))ki(n.value,e,t);else if($e(n))for(let i=0;i<n.length;i++)ki(n[i],e,t);else if(_d(n)||Js(n))n.forEach(i=>{ki(i,e,t)});else if(Md(n)){for(const i in n)ki(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&ki(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function io(n,e,t,i){try{return i?n(...i):n()}catch(s){Pa(s,e,t)}}function si(n,e,t,i){if(et(n)){const s=io(n,e,t,i);return s&&xd(s)&&s.catch(r=>{Pa(r,e,t)}),s}if($e(n)){const s=[];for(let r=0;r<n.length;r++)s.push(si(n[r],e,t,i));return s}}function Pa(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||St;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}a=a.parent}if(r){bi(),io(r,null,10,[n,l,c]),Ei();return}}og(n,t,s,i,o)}function og(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const en=[];let Xn=-1;const js=[];let Vi=null,Ks=0;const Vd=Promise.resolve();let ha=null;function ag(n){const e=ha||Vd;return n?e.then(this?n.bind(this):n):e}function lg(n){let e=Xn+1,t=en.length;for(;e<t;){const i=e+t>>>1,s=en[i],r=Yr(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function gu(n){if(!(n.flags&1)){const e=Yr(n),t=en[en.length-1];!t||!(n.flags&2)&&e>=Yr(t)?en.push(n):en.splice(lg(e),0,n),n.flags|=1,Gd()}}function Gd(){ha||(ha=Vd.then(Wd))}function cg(n){$e(n)?js.push(...n):Vi&&n.id===-1?Vi.splice(Ks+1,0,n):n.flags&1||(js.push(n),n.flags|=1),Gd()}function fh(n,e,t=Xn+1){for(;t<en.length;t++){const i=en[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;en.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function kd(n){if(js.length){const e=[...new Set(js)].sort((t,i)=>Yr(t)-Yr(i));if(js.length=0,Vi){Vi.push(...e);return}for(Vi=e,Ks=0;Ks<Vi.length;Ks++){const t=Vi[Ks];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Vi=null,Ks=0}}const Yr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Wd(n){try{for(Xn=0;Xn<en.length;Xn++){const e=en[Xn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),io(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Xn<en.length;Xn++){const e=en[Xn];e&&(e.flags&=-2)}Xn=-1,en.length=0,kd(),ha=null,(en.length||js.length)&&Wd()}}let jn=null,Xd=null;function fa(n){const e=jn;return jn=n,Xd=n&&n.type.__scopeId||null,e}function ug(n,e=jn,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&bh(-1);const r=fa(e);let o;try{o=n(...s)}finally{fa(r),i._d&&bh(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Qi(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(bi(),si(l,t,8,[n.el,a,n,e]),Ei())}}function hg(n,e){if(tn){let t=tn.provides;const i=tn.parent&&tn.parent.provides;i===t&&(t=tn.provides=Object.create(i)),t[n]=e}}function jo(n,e,t=!1){const i=h0();if(i||Qs){let s=Qs?Qs._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&et(e)?e.call(i&&i.proxy):e}}const fg=Symbol.for("v-scx"),dg=()=>jo(fg);function Ja(n,e,t){return Yd(n,e,t)}function Yd(n,e,t=St){const{immediate:i,deep:s,flush:r,once:o}=t,a=$t({},t),l=e&&i||!e&&r!=="post";let c;if(Kr){if(r==="sync"){const d=dg();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=ei,d.resume=ei,d.pause=ei,d}}const u=tn;a.call=(d,_,x)=>si(d,u,_,x);let h=!1;r==="post"?a.scheduler=d=>{rn(d,u&&u.suspense)}:r!=="sync"&&(h=!0,a.scheduler=(d,_)=>{_?d():gu(d)}),a.augmentJob=d=>{e&&(d.flags|=4),h&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const f=rg(n,e,a);return Kr&&(c?c.push(f):l&&f()),f}function pg(n,e,t){const i=this.proxy,s=Pt(n)?n.includes(".")?qd(i,n):()=>i[n]:n.bind(i,i);let r;et(e)?r=e:(r=e.handler,t=e);const o=so(this),a=Yd(s,r.bind(i),t);return o(),a}function qd(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const mg=Symbol("_vte"),gg=n=>n.__isTeleport,_g=Symbol("_leaveCb");function _u(n,e){n.shapeFlag&6&&n.component?(n.transition=e,_u(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Kd(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function dh(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const da=new WeakMap;function Br(n,e,t,i,s=!1){if($e(n)){n.forEach((x,m)=>Br(x,e&&($e(e)?e[m]:e),t,i,s));return}if(zr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Br(n,e,t,i.component.subTree);return}const r=i.shapeFlag&4?Su(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=e&&e.r,u=a.refs===St?a.refs={}:a.refs,h=a.setupState,f=lt(h),d=h===St?gd:x=>dh(u,x)?!1:ct(f,x),_=(x,m)=>!(m&&dh(u,m));if(c!=null&&c!==l){if(ph(e),Pt(c))u[c]=null,d(c)&&(h[c]=null);else if(qt(c)){const x=e;_(c,x.k)&&(c.value=null),x.k&&(u[x.k]=null)}}if(et(l))io(l,a,12,[o,u]);else{const x=Pt(l),m=qt(l);if(x||m){const p=()=>{if(n.f){const y=x?d(l)?h[l]:u[l]:_()||!n.k?l.value:u[n.k];if(s)$e(y)&&iu(y,r);else if($e(y))y.includes(r)||y.push(r);else if(x)u[l]=[r],d(l)&&(h[l]=u[l]);else{const A=[r];_(l,n.k)&&(l.value=A),n.k&&(u[n.k]=A)}}else x?(u[l]=o,d(l)&&(h[l]=o)):m&&(_(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const y=()=>{p(),da.delete(n)};y.id=-1,da.set(n,y),rn(y,t)}else ph(n),p()}}}function ph(n){const e=da.get(n);e&&(e.flags|=8,da.delete(n))}Ra().requestIdleCallback;Ra().cancelIdleCallback;const zr=n=>!!n.type.__asyncLoader,$d=n=>n.type.__isKeepAlive;function xg(n,e){Zd(n,"a",e)}function vg(n,e){Zd(n,"da",e)}function Zd(n,e,t=tn){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Da(e,i,t),t){let s=t.parent;for(;s&&s.parent;)$d(s.parent.vnode)&&Mg(i,e,t,s),s=s.parent}}function Mg(n,e,t,i){const s=Da(e,n,i,!0);Qd(()=>{iu(i[e],s)},t)}function Da(n,e,t=tn,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...o)=>{bi();const a=so(t),l=si(e,t,n,o);return a(),Ei(),l});return i?s.unshift(r):s.push(r),r}}const Ai=n=>(e,t=tn)=>{(!Kr||n==="sp")&&Da(n,(...i)=>e(...i),t)},Sg=Ai("bm"),Jd=Ai("m"),yg=Ai("bu"),bg=Ai("u"),jd=Ai("bum"),Qd=Ai("um"),Eg=Ai("sp"),Tg=Ai("rtg"),wg=Ai("rtc");function Ag(n,e=tn){Da("ec",n,e)}const Rg=Symbol.for("v-ndc");function Cg(n,e,t,i){let s;const r=t,o=$e(n);if(o||Pt(n)){const a=o&&hs(n);let l=!1,c=!1;a&&(l=!En(n),c=Ti(n),n=Ca(n)),s=new Array(n.length);for(let u=0,h=n.length;u<h;u++)s[u]=e(l?c?sr(On(n[u])):On(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=e(a+1,a,void 0,r)}else if(pt(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>e(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=e(n[u],u,l,r)}}else s=[];return s}const Kl=n=>n?yp(n)?Su(n):Kl(n.parent):null,Hr=$t(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Kl(n.parent),$root:n=>Kl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>tp(n),$forceUpdate:n=>n.f||(n.f=()=>{gu(n.update)}),$nextTick:n=>n.n||(n.n=ag.bind(n.proxy)),$watch:n=>pg.bind(n)}),ja=(n,e)=>n!==St&&!n.__isScriptSetup&&ct(n,e),Pg={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(e[0]!=="$"){const f=o[e];if(f!==void 0)switch(f){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(ja(i,e))return o[e]=1,i[e];if(s!==St&&ct(s,e))return o[e]=2,s[e];if(ct(r,e))return o[e]=3,r[e];if(t!==St&&ct(t,e))return o[e]=4,t[e];$l&&(o[e]=0)}}const c=Hr[e];let u,h;if(c)return e==="$attrs"&&Wt(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[e]))return u;if(t!==St&&ct(t,e))return o[e]=4,t[e];if(h=l.config.globalProperties,ct(h,e))return h[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return ja(s,e)?(s[e]=t,!0):i!==St&&ct(i,e)?(i[e]=t,!0):ct(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(t[a]||n!==St&&a[0]!=="$"&&ct(n,a)||ja(e,a)||ct(r,a)||ct(i,a)||ct(Hr,a)||ct(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:ct(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function mh(n){return $e(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let $l=!0;function Dg(n){const e=tp(n),t=n.proxy,i=n.ctx;$l=!1,e.beforeCreate&&gh(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:d,updated:_,activated:x,deactivated:m,beforeDestroy:p,beforeUnmount:y,destroyed:A,unmounted:M,render:T,renderTracked:E,renderTriggered:C,errorCaptured:v,serverPrefetch:w,expose:L,inheritAttrs:D,components:U,directives:G,filters:$}=e;if(c&&Ig(c,i,null),o)for(const H in o){const Z=o[H];et(Z)&&(i[H]=Z.bind(t))}if(s){const H=s.call(t,t);pt(H)&&(n.data=du(H))}if($l=!0,r)for(const H in r){const Z=r[H],le=et(Z)?Z.bind(t,t):et(Z.get)?Z.get.bind(t,t):ei,ne=!et(Z)&&et(Z.set)?Z.set.bind(t):ei,oe=_0({get:le,set:ne});Object.defineProperty(i,H,{enumerable:!0,configurable:!0,get:()=>oe.value,set:pe=>oe.value=pe})}if(a)for(const H in a)ep(a[H],i,t,H);if(l){const H=et(l)?l.call(t):l;Reflect.ownKeys(H).forEach(Z=>{hg(Z,H[Z])})}u&&gh(u,n,"c");function Y(H,Z){$e(Z)?Z.forEach(le=>H(le.bind(t))):Z&&H(Z.bind(t))}if(Y(Sg,h),Y(Jd,f),Y(yg,d),Y(bg,_),Y(xg,x),Y(vg,m),Y(Ag,v),Y(wg,E),Y(Tg,C),Y(jd,y),Y(Qd,M),Y(Eg,w),$e(L))if(L.length){const H=n.exposed||(n.exposed={});L.forEach(Z=>{Object.defineProperty(H,Z,{get:()=>t[Z],set:le=>t[Z]=le,enumerable:!0})})}else n.exposed||(n.exposed={});T&&n.render===ei&&(n.render=T),D!=null&&(n.inheritAttrs=D),U&&(n.components=U),G&&(n.directives=G),w&&Kd(n)}function Ig(n,e,t=ei){$e(n)&&(n=Zl(n));for(const i in n){const s=n[i];let r;pt(s)?"default"in s?r=jo(s.from||i,s.default,!0):r=jo(s.from||i):r=jo(s),qt(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[i]=r}}function gh(n,e,t){si($e(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function ep(n,e,t,i){let s=i.includes(".")?qd(t,i):()=>t[i];if(Pt(n)){const r=e[n];et(r)&&Ja(s,r)}else if(et(n))Ja(s,n.bind(t));else if(pt(n))if($e(n))n.forEach(r=>ep(r,e,t,i));else{const r=et(n.handler)?n.handler.bind(t):e[n.handler];et(r)&&Ja(s,r,n)}}function tp(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(e);let l;return a?l=a:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>pa(l,c,o,!0)),pa(l,e,o)),pt(e)&&r.set(e,l),l}function pa(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&pa(n,r,t,!0),s&&s.forEach(o=>pa(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=Lg[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const Lg={data:_h,props:xh,emits:xh,methods:Dr,computed:Dr,beforeCreate:jt,created:jt,beforeMount:jt,mounted:jt,beforeUpdate:jt,updated:jt,beforeDestroy:jt,beforeUnmount:jt,destroyed:jt,unmounted:jt,activated:jt,deactivated:jt,errorCaptured:jt,serverPrefetch:jt,components:Dr,directives:Dr,watch:Ng,provide:_h,inject:Ug};function _h(n,e){return e?n?function(){return $t(et(n)?n.call(this,this):n,et(e)?e.call(this,this):e)}:e:n}function Ug(n,e){return Dr(Zl(n),Zl(e))}function Zl(n){if($e(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function jt(n,e){return n?[...new Set([].concat(n,e))]:e}function Dr(n,e){return n?$t(Object.create(null),n,e):e}function xh(n,e){return n?$e(n)&&$e(e)?[...new Set([...n,...e])]:$t(Object.create(null),mh(n),mh(e??{})):e}function Ng(n,e){if(!n)return e;if(!e)return n;const t=$t(Object.create(null),n);for(const i in e)t[i]=jt(n[i],e[i]);return t}function np(){return{app:null,config:{isNativeTag:gd,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Fg=0;function Og(n,e){return function(i,s=null){et(i)||(i=$t({},i)),s!=null&&!pt(s)&&(s=null);const r=np(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:Fg++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:x0,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&et(u.install)?(o.add(u),u.install(c,...h)):et(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!l){const d=c._ceVNode||Tn(i,s);return d.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(d,u,f),l=!0,c._container=u,u.__vue_app__=c,Su(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(si(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=Qs;Qs=c;try{return u()}finally{Qs=h}}};return c}}let Qs=null;const Bg=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Un(e)}Modifiers`]||n[`${_s(e)}Modifiers`];function zg(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||St;let s=t;const r=e.startsWith("update:"),o=r&&Bg(i,e.slice(7));o&&(o.trim&&(s=t.map(u=>Pt(u)?u.trim():u)),o.number&&(s=t.map(ym)));let a,l=i[a=Xa(e)]||i[a=Xa(Un(e))];!l&&r&&(l=i[a=Xa(_s(e))]),l&&si(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,si(c,n,6,s)}}const Hg=new WeakMap;function ip(n,e,t=!1){const i=t?Hg:e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!et(n)){const l=c=>{const u=ip(c,e,!0);u&&(a=!0,$t(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(pt(n)&&i.set(n,null),null):($e(r)?r.forEach(l=>o[l]=null):$t(o,r),pt(n)&&i.set(n,o),o)}function Ia(n,e){return!n||!wa(e)?!1:(e=e.slice(2).replace(/Once$/,""),ct(n,e[0].toLowerCase()+e.slice(1))||ct(n,_s(e))||ct(n,e))}function vh(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:d,ctx:_,inheritAttrs:x}=n,m=fa(n);let p,y;try{if(t.shapeFlag&4){const M=s||i,T=M;p=$n(c.call(T,M,u,h,d,f,_)),y=a}else{const M=e;p=$n(M.length>1?M(h,{attrs:a,slots:o,emit:l}):M(h,null)),y=e.props?a:Vg(a)}}catch(M){Vr.length=0,Pa(M,n,1),p=Tn(qi)}let A=p;if(y&&x!==!1){const M=Object.keys(y),{shapeFlag:T}=A;M.length&&T&7&&(r&&M.some(nu)&&(y=Gg(y,r)),A=rr(A,y,!1,!0))}return t.dirs&&(A=rr(A,null,!1,!0),A.dirs=A.dirs?A.dirs.concat(t.dirs):t.dirs),t.transition&&_u(A,t.transition),p=A,fa(m),p}const Vg=n=>{let e;for(const t in n)(t==="class"||t==="style"||wa(t))&&((e||(e={}))[t]=n[t]);return e},Gg=(n,e)=>{const t={};for(const i in n)(!nu(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function kg(n,e,t){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?Mh(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(sp(o,i,f)&&!Ia(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?Mh(i,o,c):!0:!!o;return!1}function Mh(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(sp(e,n,r)&&!Ia(t,r))return!0}return!1}function sp(n,e,t){const i=n[t],s=e[t];return t==="style"&&pt(i)&&pt(s)?!au(i,s):i!==s}function Wg({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const rp={},op=()=>Object.create(rp),ap=n=>Object.getPrototypeOf(n)===rp;function Xg(n,e,t,i=!1){const s={},r=op();n.propsDefaults=Object.create(null),lp(n,e,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);t?n.props=i?s:Zm(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function Yg(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=lt(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Ia(n.emitsOptions,f))continue;const d=e[f];if(l)if(ct(r,f))d!==r[f]&&(r[f]=d,c=!0);else{const _=Un(f);s[_]=Jl(l,a,_,d,n,!1)}else d!==r[f]&&(r[f]=d,c=!0)}}}else{lp(n,e,s,r)&&(c=!0);let u;for(const h in a)(!e||!ct(e,h)&&((u=_s(h))===h||!ct(e,u)))&&(l?t&&(t[h]!==void 0||t[u]!==void 0)&&(s[h]=Jl(l,a,h,void 0,n,!0)):delete s[h]);if(r!==a)for(const h in r)(!e||!ct(e,h))&&(delete r[h],c=!0)}c&&xi(n.attrs,"set","")}function lp(n,e,t,i){const[s,r]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(Nr(l))continue;const c=e[l];let u;s&&ct(s,u=Un(l))?!r||!r.includes(u)?t[u]=c:(a||(a={}))[u]=c:Ia(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=lt(t),c=a||St;for(let u=0;u<r.length;u++){const h=r[u];t[h]=Jl(s,l,h,c[h],n,!ct(c,h))}}return o}function Jl(n,e,t,i,s,r){const o=n[t];if(o!=null){const a=ct(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&et(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const u=so(s);i=c[t]=l.call(null,e),u()}}else i=l;s.ce&&s.ce._setProp(t,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===_s(t))&&(i=!0))}return i}const qg=new WeakMap;function cp(n,e,t=!1){const i=t?qg:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!et(n)){const u=h=>{l=!0;const[f,d]=cp(h,e,!0);$t(o,f),d&&a.push(...d)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return pt(n)&&i.set(n,Zs),Zs;if($e(r))for(let u=0;u<r.length;u++){const h=Un(r[u]);Sh(h)&&(o[h]=St)}else if(r)for(const u in r){const h=Un(u);if(Sh(h)){const f=r[u],d=o[h]=$e(f)||et(f)?{type:f}:$t({},f),_=d.type;let x=!1,m=!0;if($e(_))for(let p=0;p<_.length;++p){const y=_[p],A=et(y)&&y.name;if(A==="Boolean"){x=!0;break}else A==="String"&&(m=!1)}else x=et(_)&&_.name==="Boolean";d[0]=x,d[1]=m,(x||ct(d,"default"))&&a.push(h)}}const c=[o,a];return pt(n)&&i.set(n,c),c}function Sh(n){return n[0]!=="$"&&!Nr(n)}const xu=n=>n==="_"||n==="_ctx"||n==="$stable",vu=n=>$e(n)?n.map($n):[$n(n)],Kg=(n,e,t)=>{if(e._n)return e;const i=ug((...s)=>vu(e(...s)),t);return i._c=!1,i},up=(n,e,t)=>{const i=n._ctx;for(const s in n){if(xu(s))continue;const r=n[s];if(et(r))e[s]=Kg(s,r,i);else if(r!=null){const o=vu(r);e[s]=()=>o}}},hp=(n,e)=>{const t=vu(e);n.slots.default=()=>t},fp=(n,e,t)=>{for(const i in e)(t||!xu(i))&&(n[i]=e[i])},$g=(n,e,t)=>{const i=n.slots=op();if(n.vnode.shapeFlag&32){const s=e._;s?(fp(i,e,t),t&&yd(i,"_",s,!0)):up(e,i)}else e&&hp(n,e)},Zg=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,o=St;if(i.shapeFlag&32){const a=e._;a?t&&a===1?r=!1:fp(s,e,t):(r=!e.$stable,up(e,s)),o=e}else e&&(hp(n,e),o={default:1});if(r)for(const a in s)!xu(a)&&o[a]==null&&delete s[a]},rn=t0;function Jg(n){return jg(n)}function jg(n,e){const t=Ra();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:d=ei,insertStaticContent:_}=n,x=(P,I,X,Q=null,J=null,se=null,de=void 0,ue=null,ce=!!I.dynamicChildren)=>{if(P===I)return;P&&!gr(P,I)&&(Q=xe(P),pe(P,J,se,!0),P=null),I.patchFlag===-2&&(ce=!1,I.dynamicChildren=null);const{type:te,ref:Ce,shapeFlag:R}=I;switch(te){case La:m(P,I,X,Q);break;case qi:p(P,I,X,Q);break;case Qo:P==null&&y(I,X,Q,de);break;case Kn:U(P,I,X,Q,J,se,de,ue,ce);break;default:R&1?T(P,I,X,Q,J,se,de,ue,ce):R&6?G(P,I,X,Q,J,se,de,ue,ce):(R&64||R&128)&&te.process(P,I,X,Q,J,se,de,ue,ce,qe)}Ce!=null&&J?Br(Ce,P&&P.ref,se,I||P,!I):Ce==null&&P&&P.ref!=null&&Br(P.ref,null,se,P,!0)},m=(P,I,X,Q)=>{if(P==null)i(I.el=a(I.children),X,Q);else{const J=I.el=P.el;I.children!==P.children&&c(J,I.children)}},p=(P,I,X,Q)=>{P==null?i(I.el=l(I.children||""),X,Q):I.el=P.el},y=(P,I,X,Q)=>{[P.el,P.anchor]=_(P.children,I,X,Q,P.el,P.anchor)},A=({el:P,anchor:I},X,Q)=>{let J;for(;P&&P!==I;)J=f(P),i(P,X,Q),P=J;i(I,X,Q)},M=({el:P,anchor:I})=>{let X;for(;P&&P!==I;)X=f(P),s(P),P=X;s(I)},T=(P,I,X,Q,J,se,de,ue,ce)=>{if(I.type==="svg"?de="svg":I.type==="math"&&(de="mathml"),P==null)E(I,X,Q,J,se,de,ue,ce);else{const te=P.el&&P.el._isVueCE?P.el:null;try{te&&te._beginPatch(),w(P,I,J,se,de,ue,ce)}finally{te&&te._endPatch()}}},E=(P,I,X,Q,J,se,de,ue)=>{let ce,te;const{props:Ce,shapeFlag:R,transition:Pe,dirs:be}=P;if(ce=P.el=o(P.type,se,Ce&&Ce.is,Ce),R&8?u(ce,P.children):R&16&&v(P.children,ce,null,Q,J,Qa(P,se),de,ue),be&&Qi(P,null,Q,"created"),C(ce,P,P.scopeId,de,Q),Ce){for(const g in Ce)g!=="value"&&!Nr(g)&&r(ce,g,null,Ce[g],se,Q);"value"in Ce&&r(ce,"value",null,Ce.value,se),(te=Ce.onVnodeBeforeMount)&&Gn(te,Q,P)}be&&Qi(P,null,Q,"beforeMount");const b=Qg(J,Pe);b&&Pe.beforeEnter(ce),i(ce,I,X),((te=Ce&&Ce.onVnodeMounted)||b||be)&&rn(()=>{te&&Gn(te,Q,P),b&&Pe.enter(ce),be&&Qi(P,null,Q,"mounted")},J)},C=(P,I,X,Q,J)=>{if(X&&d(P,X),Q)for(let se=0;se<Q.length;se++)d(P,Q[se]);if(J){let se=J.subTree;if(I===se||gp(se.type)&&(se.ssContent===I||se.ssFallback===I)){const de=J.vnode;C(P,de,de.scopeId,de.slotScopeIds,J.parent)}}},v=(P,I,X,Q,J,se,de,ue,ce=0)=>{for(let te=ce;te<P.length;te++){const Ce=P[te]=ue?_i(P[te]):$n(P[te]);x(null,Ce,I,X,Q,J,se,de,ue)}},w=(P,I,X,Q,J,se,de)=>{const ue=I.el=P.el;let{patchFlag:ce,dynamicChildren:te,dirs:Ce}=I;ce|=P.patchFlag&16;const R=P.props||St,Pe=I.props||St;let be;if(X&&es(X,!1),(be=Pe.onVnodeBeforeUpdate)&&Gn(be,X,I,P),Ce&&Qi(I,P,X,"beforeUpdate"),X&&es(X,!0),(R.innerHTML&&Pe.innerHTML==null||R.textContent&&Pe.textContent==null)&&u(ue,""),te?L(P.dynamicChildren,te,ue,X,Q,Qa(I,J),se):de||Z(P,I,ue,null,X,Q,Qa(I,J),se,!1),ce>0){if(ce&16)D(ue,R,Pe,X,J);else if(ce&2&&R.class!==Pe.class&&r(ue,"class",null,Pe.class,J),ce&4&&r(ue,"style",R.style,Pe.style,J),ce&8){const b=I.dynamicProps;for(let g=0;g<b.length;g++){const N=b[g],V=R[N],K=Pe[N];(K!==V||N==="value")&&r(ue,N,V,K,J,X)}}ce&1&&P.children!==I.children&&u(ue,I.children)}else!de&&te==null&&D(ue,R,Pe,X,J);((be=Pe.onVnodeUpdated)||Ce)&&rn(()=>{be&&Gn(be,X,I,P),Ce&&Qi(I,P,X,"updated")},Q)},L=(P,I,X,Q,J,se,de)=>{for(let ue=0;ue<I.length;ue++){const ce=P[ue],te=I[ue],Ce=ce.el&&(ce.type===Kn||!gr(ce,te)||ce.shapeFlag&198)?h(ce.el):X;x(ce,te,Ce,null,Q,J,se,de,!0)}},D=(P,I,X,Q,J)=>{if(I!==X){if(I!==St)for(const se in I)!Nr(se)&&!(se in X)&&r(P,se,I[se],null,J,Q);for(const se in X){if(Nr(se))continue;const de=X[se],ue=I[se];de!==ue&&se!=="value"&&r(P,se,ue,de,J,Q)}"value"in X&&r(P,"value",I.value,X.value,J)}},U=(P,I,X,Q,J,se,de,ue,ce)=>{const te=I.el=P?P.el:a(""),Ce=I.anchor=P?P.anchor:a("");let{patchFlag:R,dynamicChildren:Pe,slotScopeIds:be}=I;be&&(ue=ue?ue.concat(be):be),P==null?(i(te,X,Q),i(Ce,X,Q),v(I.children||[],X,Ce,J,se,de,ue,ce)):R>0&&R&64&&Pe&&P.dynamicChildren&&P.dynamicChildren.length===Pe.length?(L(P.dynamicChildren,Pe,X,J,se,de,ue),(I.key!=null||J&&I===J.subTree)&&dp(P,I,!0)):Z(P,I,X,Ce,J,se,de,ue,ce)},G=(P,I,X,Q,J,se,de,ue,ce)=>{I.slotScopeIds=ue,P==null?I.shapeFlag&512?J.ctx.activate(I,X,Q,de,ce):$(I,X,Q,J,se,de,ce):z(P,I,ce)},$=(P,I,X,Q,J,se,de)=>{const ue=P.component=u0(P,Q,J);if($d(P)&&(ue.ctx.renderer=qe),f0(ue,!1,de),ue.asyncDep){if(J&&J.registerDep(ue,Y,de),!P.el){const ce=ue.subTree=Tn(qi);p(null,ce,I,X),P.placeholder=ce.el}}else Y(ue,P,I,X,J,se,de)},z=(P,I,X)=>{const Q=I.component=P.component;if(kg(P,I,X))if(Q.asyncDep&&!Q.asyncResolved){H(Q,I,X);return}else Q.next=I,Q.update();else I.el=P.el,Q.vnode=I},Y=(P,I,X,Q,J,se,de)=>{const ue=()=>{if(P.isMounted){let{next:R,bu:Pe,u:be,parent:b,vnode:g}=P;{const ge=pp(P);if(ge){R&&(R.el=g.el,H(P,R,de)),ge.asyncDep.then(()=>{rn(()=>{P.isUnmounted||te()},J)});return}}let N=R,V;es(P,!1),R?(R.el=g.el,H(P,R,de)):R=g,Pe&&Ya(Pe),(V=R.props&&R.props.onVnodeBeforeUpdate)&&Gn(V,b,R,g),es(P,!0);const K=vh(P),he=P.subTree;P.subTree=K,x(he,K,h(he.el),xe(he),P,J,se),R.el=K.el,N===null&&Wg(P,K.el),be&&rn(be,J),(V=R.props&&R.props.onVnodeUpdated)&&rn(()=>Gn(V,b,R,g),J)}else{let R;const{el:Pe,props:be}=I,{bm:b,m:g,parent:N,root:V,type:K}=P,he=zr(I);es(P,!1),b&&Ya(b),!he&&(R=be&&be.onVnodeBeforeMount)&&Gn(R,N,I),es(P,!0);{V.ce&&V.ce._hasShadowRoot()&&V.ce._injectChildStyle(K,P.parent?P.parent.type:void 0);const ge=P.subTree=vh(P);x(null,ge,X,Q,P,J,se),I.el=ge.el}if(g&&rn(g,J),!he&&(R=be&&be.onVnodeMounted)){const ge=I;rn(()=>Gn(R,N,ge),J)}(I.shapeFlag&256||N&&zr(N.vnode)&&N.vnode.shapeFlag&256)&&P.a&&rn(P.a,J),P.isMounted=!0,I=X=Q=null}};P.scope.on();const ce=P.effect=new wd(ue);P.scope.off();const te=P.update=ce.run.bind(ce),Ce=P.job=ce.runIfDirty.bind(ce);Ce.i=P,Ce.id=P.uid,ce.scheduler=()=>gu(Ce),es(P,!0),te()},H=(P,I,X)=>{I.component=P;const Q=P.vnode.props;P.vnode=I,P.next=null,Yg(P,I.props,Q,X),Zg(P,I.children,X),bi(),fh(P),Ei()},Z=(P,I,X,Q,J,se,de,ue,ce=!1)=>{const te=P&&P.children,Ce=P?P.shapeFlag:0,R=I.children,{patchFlag:Pe,shapeFlag:be}=I;if(Pe>0){if(Pe&128){ne(te,R,X,Q,J,se,de,ue,ce);return}else if(Pe&256){le(te,R,X,Q,J,se,de,ue,ce);return}}be&8?(Ce&16&&ee(te,J,se),R!==te&&u(X,R)):Ce&16?be&16?ne(te,R,X,Q,J,se,de,ue,ce):ee(te,J,se,!0):(Ce&8&&u(X,""),be&16&&v(R,X,Q,J,se,de,ue,ce))},le=(P,I,X,Q,J,se,de,ue,ce)=>{P=P||Zs,I=I||Zs;const te=P.length,Ce=I.length,R=Math.min(te,Ce);let Pe;for(Pe=0;Pe<R;Pe++){const be=I[Pe]=ce?_i(I[Pe]):$n(I[Pe]);x(P[Pe],be,X,null,J,se,de,ue,ce)}te>Ce?ee(P,J,se,!0,!1,R):v(I,X,Q,J,se,de,ue,ce,R)},ne=(P,I,X,Q,J,se,de,ue,ce)=>{let te=0;const Ce=I.length;let R=P.length-1,Pe=Ce-1;for(;te<=R&&te<=Pe;){const be=P[te],b=I[te]=ce?_i(I[te]):$n(I[te]);if(gr(be,b))x(be,b,X,null,J,se,de,ue,ce);else break;te++}for(;te<=R&&te<=Pe;){const be=P[R],b=I[Pe]=ce?_i(I[Pe]):$n(I[Pe]);if(gr(be,b))x(be,b,X,null,J,se,de,ue,ce);else break;R--,Pe--}if(te>R){if(te<=Pe){const be=Pe+1,b=be<Ce?I[be].el:Q;for(;te<=Pe;)x(null,I[te]=ce?_i(I[te]):$n(I[te]),X,b,J,se,de,ue,ce),te++}}else if(te>Pe)for(;te<=R;)pe(P[te],J,se,!0),te++;else{const be=te,b=te,g=new Map;for(te=b;te<=Pe;te++){const me=I[te]=ce?_i(I[te]):$n(I[te]);me.key!=null&&g.set(me.key,te)}let N,V=0;const K=Pe-b+1;let he=!1,ge=0;const j=new Array(K);for(te=0;te<K;te++)j[te]=0;for(te=be;te<=R;te++){const me=P[te];if(V>=K){pe(me,J,se,!0);continue}let De;if(me.key!=null)De=g.get(me.key);else for(N=b;N<=Pe;N++)if(j[N-b]===0&&gr(me,I[N])){De=N;break}De===void 0?pe(me,J,se,!0):(j[De-b]=te+1,De>=ge?ge=De:he=!0,x(me,I[De],X,null,J,se,de,ue,ce),V++)}const ie=he?e0(j):Zs;for(N=ie.length-1,te=K-1;te>=0;te--){const me=b+te,De=I[me],Se=I[me+1],ve=me+1<Ce?Se.el||mp(Se):Q;j[te]===0?x(null,De,X,ve,J,se,de,ue,ce):he&&(N<0||te!==ie[N]?oe(De,X,ve,2):N--)}}},oe=(P,I,X,Q,J=null)=>{const{el:se,type:de,transition:ue,children:ce,shapeFlag:te}=P;if(te&6){oe(P.component.subTree,I,X,Q);return}if(te&128){P.suspense.move(I,X,Q);return}if(te&64){de.move(P,I,X,qe);return}if(de===Kn){i(se,I,X);for(let R=0;R<ce.length;R++)oe(ce[R],I,X,Q);i(P.anchor,I,X);return}if(de===Qo){A(P,I,X);return}if(Q!==2&&te&1&&ue)if(Q===0)ue.beforeEnter(se),i(se,I,X),rn(()=>ue.enter(se),J);else{const{leave:R,delayLeave:Pe,afterLeave:be}=ue,b=()=>{P.ctx.isUnmounted?s(se):i(se,I,X)},g=()=>{se._isLeaving&&se[_g](!0),R(se,()=>{b(),be&&be()})};Pe?Pe(se,b,g):g()}else i(se,I,X)},pe=(P,I,X,Q=!1,J=!1)=>{const{type:se,props:de,ref:ue,children:ce,dynamicChildren:te,shapeFlag:Ce,patchFlag:R,dirs:Pe,cacheIndex:be}=P;if(R===-2&&(J=!1),ue!=null&&(bi(),Br(ue,null,X,P,!0),Ei()),be!=null&&(I.renderCache[be]=void 0),Ce&256){I.ctx.deactivate(P);return}const b=Ce&1&&Pe,g=!zr(P);let N;if(g&&(N=de&&de.onVnodeBeforeUnmount)&&Gn(N,I,P),Ce&6)rt(P.component,X,Q);else{if(Ce&128){P.suspense.unmount(X,Q);return}b&&Qi(P,null,I,"beforeUnmount"),Ce&64?P.type.remove(P,I,X,qe,Q):te&&!te.hasOnce&&(se!==Kn||R>0&&R&64)?ee(te,I,X,!1,!0):(se===Kn&&R&384||!J&&Ce&16)&&ee(ce,I,X),Q&&Ze(P)}(g&&(N=de&&de.onVnodeUnmounted)||b)&&rn(()=>{N&&Gn(N,I,P),b&&Qi(P,null,I,"unmounted")},X)},Ze=P=>{const{type:I,el:X,anchor:Q,transition:J}=P;if(I===Kn){bt(X,Q);return}if(I===Qo){M(P);return}const se=()=>{s(X),J&&!J.persisted&&J.afterLeave&&J.afterLeave()};if(P.shapeFlag&1&&J&&!J.persisted){const{leave:de,delayLeave:ue}=J,ce=()=>de(X,se);ue?ue(P.el,se,ce):ce()}else se()},bt=(P,I)=>{let X;for(;P!==I;)X=f(P),s(P),P=X;s(I)},rt=(P,I,X)=>{const{bum:Q,scope:J,job:se,subTree:de,um:ue,m:ce,a:te}=P;yh(ce),yh(te),Q&&Ya(Q),J.stop(),se&&(se.flags|=8,pe(de,P,I,X)),ue&&rn(ue,I),rn(()=>{P.isUnmounted=!0},I)},ee=(P,I,X,Q=!1,J=!1,se=0)=>{for(let de=se;de<P.length;de++)pe(P[de],I,X,Q,J)},xe=P=>{if(P.shapeFlag&6)return xe(P.component.subTree);if(P.shapeFlag&128)return P.suspense.next();const I=f(P.anchor||P.el),X=I&&I[mg];return X?f(X):I};let fe=!1;const Xe=(P,I,X)=>{let Q;P==null?I._vnode&&(pe(I._vnode,null,null,!0),Q=I._vnode.component):x(I._vnode||null,P,I,null,null,null,X),I._vnode=P,fe||(fe=!0,fh(Q),kd(),fe=!1)},qe={p:x,um:pe,m:oe,r:Ze,mt:$,mc:v,pc:Z,pbc:L,n:xe,o:n};return{render:Xe,hydrate:void 0,createApp:Og(Xe)}}function Qa({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function es({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function Qg(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function dp(n,e,t=!1){const i=n.children,s=e.children;if($e(i)&&$e(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=_i(s[r]),a.el=o.el),!t&&a.patchFlag!==-2&&dp(o,a)),a.type===La&&(a.patchFlag===-1&&(a=s[r]=_i(a)),a.el=o.el),a.type===qi&&!a.el&&(a.el=o.el)}}function e0(n){const e=n.slice(),t=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,o=t.length-1;r<o;)a=r+o>>1,n[t[a]]<c?r=a+1:o=a;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,o=t[r-1];r-- >0;)t[r]=o,o=e[o];return t}function pp(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:pp(e)}function yh(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function mp(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?mp(e.subTree):null}const gp=n=>n.__isSuspense;function t0(n,e){e&&e.pendingBranch?$e(n)?e.effects.push(...n):e.effects.push(n):cg(n)}const Kn=Symbol.for("v-fgt"),La=Symbol.for("v-txt"),qi=Symbol.for("v-cmt"),Qo=Symbol.for("v-stc"),Vr=[];let mn=null;function Pn(n=!1){Vr.push(mn=n?null:[])}function n0(){Vr.pop(),mn=Vr[Vr.length-1]||null}let qr=1;function bh(n,e=!1){qr+=n,n<0&&mn&&e&&(mn.hasOnce=!0)}function _p(n){return n.dynamicChildren=qr>0?mn||Zs:null,n0(),qr>0&&mn&&mn.push(n),n}function vi(n,e,t,i,s,r){return _p(kt(n,e,t,i,s,r,!0))}function xp(n,e,t,i,s){return _p(Tn(n,e,t,i,s,!0))}function vp(n){return n?n.__v_isVNode===!0:!1}function gr(n,e){return n.type===e.type&&n.key===e.key}const Mp=({key:n})=>n??null,ea=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Pt(n)||qt(n)||et(n)?{i:jn,r:n,k:e,f:!!t}:n:null);function kt(n,e=null,t=null,i=0,s=null,r=n===Kn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&Mp(e),ref:e&&ea(e),scopeId:Xd,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:jn};return a?(Mu(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=Pt(t)?8:16),qr>0&&!o&&mn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&mn.push(l),l}const Tn=i0;function i0(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===Rg)&&(n=qi),vp(n)){const a=rr(n,e,!0);return t&&Mu(a,t),qr>0&&!r&&mn&&(a.shapeFlag&6?mn[mn.indexOf(n)]=a:mn.push(a)),a.patchFlag=-2,a}if(g0(n)&&(n=n.__vccOpts),e){e=s0(e);let{class:a,style:l}=e;a&&!Pt(a)&&(e.class=ou(a)),pt(l)&&(mu(l)&&!$e(l)&&(l=$t({},l)),e.style=ru(l))}const o=Pt(n)?1:gp(n)?128:gg(n)?64:pt(n)?4:et(n)?2:0;return kt(n,e,t,i,s,o,r,!0)}function s0(n){return n?mu(n)||ap(n)?$t({},n):n:null}function rr(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=e?a0(s||{},e):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Mp(c),ref:e&&e.ref?t&&r?$e(r)?r.concat(ea(e)):[r,ea(e)]:ea(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Kn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&rr(n.ssContent),ssFallback:n.ssFallback&&rr(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&_u(u,l.clone(u)),u}function Sp(n=" ",e=0){return Tn(La,null,n,e)}function r0(n,e){const t=Tn(Qo,null,n);return t.staticCount=e,t}function o0(n="",e=!1){return e?(Pn(),xp(qi,null,n)):Tn(qi,null,n)}function $n(n){return n==null||typeof n=="boolean"?Tn(qi):$e(n)?Tn(Kn,null,n.slice()):vp(n)?_i(n):Tn(La,null,String(n))}function _i(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:rr(n)}function Mu(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if($e(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),Mu(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!ap(e)?e._ctx=jn:s===3&&jn&&(jn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else et(e)?(e={default:e,_ctx:jn},t=32):(e=String(e),i&64?(t=16,e=[Sp(e)]):t=8);n.children=e,n.shapeFlag|=t}function a0(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=ou([e.class,i.class]));else if(s==="style")e.style=ru([e.style,i.style]);else if(wa(s)){const r=e[s],o=i[s];o&&r!==o&&!($e(r)&&r.includes(o))&&(e[s]=r?[].concat(r,o):o)}else s!==""&&(e[s]=i[s])}return e}function Gn(n,e,t,i=null){si(n,e,7,[t,i])}const l0=np();let c0=0;function u0(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||l0,r={uid:c0++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Pm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:cp(i,s),emitsOptions:ip(i,s),emit:null,emitted:null,propsDefaults:St,inheritAttrs:i.inheritAttrs,ctx:St,data:St,props:St,attrs:St,slots:St,refs:St,setupState:St,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=zg.bind(null,r),n.ce&&n.ce(r),r}let tn=null;const h0=()=>tn||jn;let ma,jl;{const n=Ra(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};ma=e("__VUE_INSTANCE_SETTERS__",t=>tn=t),jl=e("__VUE_SSR_SETTERS__",t=>Kr=t)}const so=n=>{const e=tn;return ma(n),n.scope.on(),()=>{n.scope.off(),ma(e)}},Eh=()=>{tn&&tn.scope.off(),ma(null)};function yp(n){return n.vnode.shapeFlag&4}let Kr=!1;function f0(n,e=!1,t=!1){e&&jl(e);const{props:i,children:s}=n.vnode,r=yp(n);Xg(n,i,r,e),$g(n,s,t||e);const o=r?d0(n,e):void 0;return e&&jl(!1),o}function d0(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Pg);const{setup:i}=t;if(i){bi();const s=n.setupContext=i.length>1?m0(n):null,r=so(n),o=io(i,n,0,[n.props,s]),a=xd(o);if(Ei(),r(),(a||n.sp)&&!zr(n)&&Kd(n),a){if(o.then(Eh,Eh),e)return o.then(l=>{Th(n,l)}).catch(l=>{Pa(l,n,0)});n.asyncDep=o}else Th(n,o)}else bp(n)}function Th(n,e,t){et(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:pt(e)&&(n.setupState=Hd(e)),bp(n)}function bp(n,e,t){const i=n.type;n.render||(n.render=i.render||ei);{const s=so(n);bi();try{Dg(n)}finally{Ei(),s()}}}const p0={get(n,e){return Wt(n,"get",""),n[e]}};function m0(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,p0),slots:n.slots,emit:n.emit,expose:e}}function Su(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Hd(Jm(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Hr)return Hr[t](n)},has(e,t){return t in e||t in Hr}})):n.proxy}function g0(n){return et(n)&&"__vccOpts"in n}const _0=(n,e)=>ig(n,e,Kr),x0="3.5.30";/**
* @vue/runtime-dom v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ql;const wh=typeof window<"u"&&window.trustedTypes;if(wh)try{Ql=wh.createPolicy("vue",{createHTML:n=>n})}catch{}const Ep=Ql?n=>Ql.createHTML(n):n=>n,v0="http://www.w3.org/2000/svg",M0="http://www.w3.org/1998/Math/MathML",gi=typeof document<"u"?document:null,Ah=gi&&gi.createElement("template"),S0={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?gi.createElementNS(v0,n):e==="mathml"?gi.createElementNS(M0,n):t?gi.createElement(n,{is:t}):gi.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>gi.createTextNode(n),createComment:n=>gi.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>gi.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const o=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{Ah.innerHTML=Ep(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=Ah.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},y0=Symbol("_vtc");function b0(n,e,t){const i=n[y0];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Rh=Symbol("_vod"),E0=Symbol("_vsh"),T0=Symbol(""),w0=/(?:^|;)\s*display\s*:/;function A0(n,e,t){const i=n.style,s=Pt(t);let r=!1;if(t&&!s){if(e)if(Pt(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&ta(i,a,"")}else for(const o in e)t[o]==null&&ta(i,o,"");for(const o in t)o==="display"&&(r=!0),ta(i,o,t[o])}else if(s){if(e!==t){const o=i[T0];o&&(t+=";"+o),i.cssText=t,r=w0.test(t)}}else e&&n.removeAttribute("style");Rh in n&&(n[Rh]=r?i.display:"",n[E0]&&(i.display="none"))}const Ch=/\s*!important$/;function ta(n,e,t){if($e(t))t.forEach(i=>ta(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=R0(n,e);Ch.test(t)?n.setProperty(_s(i),t.replace(Ch,""),"important"):n[i]=t}}const Ph=["Webkit","Moz","ms"],el={};function R0(n,e){const t=el[e];if(t)return t;let i=Un(e);if(i!=="filter"&&i in n)return el[e]=i;i=Sd(i);for(let s=0;s<Ph.length;s++){const r=Ph[s]+i;if(r in n)return el[e]=r}return e}const Dh="http://www.w3.org/1999/xlink";function Ih(n,e,t,i,s,r=Rm(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Dh,e.slice(6,e.length)):n.setAttributeNS(Dh,e,t):t==null||r&&!bd(t)?n.removeAttribute(e):n.setAttribute(e,r?"":ii(t)?String(t):t)}function Lh(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Ep(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(a!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=bd(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(s||e)}function C0(n,e,t,i){n.addEventListener(e,t,i)}function P0(n,e,t,i){n.removeEventListener(e,t,i)}const Uh=Symbol("_vei");function D0(n,e,t,i,s=null){const r=n[Uh]||(n[Uh]={}),o=r[e];if(i&&o)o.value=i;else{const[a,l]=I0(e);if(i){const c=r[e]=N0(i,s);C0(n,a,c,l)}else o&&(P0(n,a,o,l),r[e]=void 0)}}const Nh=/(?:Once|Passive|Capture)$/;function I0(n){let e;if(Nh.test(n)){e={};let i;for(;i=n.match(Nh);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):_s(n.slice(2)),e]}let tl=0;const L0=Promise.resolve(),U0=()=>tl||(L0.then(()=>tl=0),tl=Date.now());function N0(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;si(F0(i,t.value),e,5,[i])};return t.value=n,t.attached=U0(),t}function F0(n,e){if($e(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>s=>!s._stopped&&i&&i(s))}else return e}const Fh=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,O0=(n,e,t,i,s,r)=>{const o=s==="svg";e==="class"?b0(n,i,o):e==="style"?A0(n,t,i):wa(e)?nu(e)||D0(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):B0(n,e,i,o))?(Lh(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Ih(n,e,i,o,r,e!=="value")):n._isVueCE&&(z0(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!Pt(i)))?Lh(n,Un(e),i,r,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Ih(n,e,i,o))};function B0(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&Fh(e)&&et(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Fh(e)&&Pt(t)?!1:e in n}function z0(n,e){const t=n._def.props;if(!t)return!1;const i=Un(e);return Array.isArray(t)?t.some(s=>Un(s)===i):Object.keys(t).some(s=>Un(s)===i)}const H0=$t({patchProp:O0},S0);let Oh;function V0(){return Oh||(Oh=Jg(H0))}const G0=((...n)=>{const e=V0().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=W0(i);if(!s)return;const r=e._component;!et(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=t(s,!1,k0(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e});function k0(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function W0(n){return Pt(n)?document.querySelector(n):n}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const yu="185",er={ROTATE:0,DOLLY:1,PAN:2},Xi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},X0=0,Bh=1,Y0=2,na=1,q0=2,Ir=3,Ki=0,an=1,nn=2,ti=0,tr=1,ga=2,zh=3,Hh=4,K0=5,os=100,$0=101,Z0=102,J0=103,j0=104,Q0=200,e_=201,t_=202,n_=203,ec=204,tc=205,i_=206,s_=207,r_=208,o_=209,a_=210,l_=211,c_=212,u_=213,h_=214,nc=0,ic=1,sc=2,or=3,rc=4,oc=5,ac=6,lc=7,Tp=0,f_=1,d_=2,ni=0,bu=1,Eu=2,Tu=3,Ua=4,wu=5,Au=6,Ru=7,wp=300,ds=301,ar=302,ia=303,nl=304,Na=306,cc=1e3,Mi=1001,uc=1002,zt=1003,p_=1004,ho=1005,Xt=1006,il=1007,ls=1008,pn=1009,Ap=1010,Rp=1011,$r=1012,Cu=1013,ri=1014,In=1015,gn=1016,Pu=1017,Du=1018,Zr=1020,Cp=35902,Pp=35899,Dp=1021,Ip=1022,Ln=1023,wi=1026,cs=1027,Iu=1028,Lu=1029,ps=1030,Uu=1031,Nu=1033,sa=33776,ra=33777,oa=33778,aa=33779,hc=35840,fc=35841,dc=35842,pc=35843,mc=36196,gc=37492,_c=37496,xc=37488,vc=37489,_a=37490,Mc=37491,Sc=37808,yc=37809,bc=37810,Ec=37811,Tc=37812,wc=37813,Ac=37814,Rc=37815,Cc=37816,Pc=37817,Dc=37818,Ic=37819,Lc=37820,Uc=37821,Nc=36492,Fc=36494,Oc=36495,Bc=36283,zc=36284,xa=36285,Hc=36286,m_=3200,Vc=0,g_=1,Wi="",It="srgb",va="srgb-linear",Ma="linear",at="srgb",bs=7680,Vh=519,__=512,x_=513,v_=514,Fu=515,M_=516,S_=517,Ou=518,y_=519,Gc=35044,Gh="300 es",Qn=2e3,Jr=2001;function b_(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Sa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function E_(){const n=Sa("canvas");return n.style.display="block",n}const kh={};function ya(...n){const e="THREE."+n.shift();console.log(e,...n)}function Lp(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function We(...n){n=Lp(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function st(...n){n=Lp(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function nr(...n){const e=n.join(" ");e in kh||(kh[e]=!0,We(...n))}function T_(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const w_={[nc]:ic,[sc]:ac,[rc]:lc,[or]:oc,[ic]:nc,[ac]:sc,[lc]:rc,[oc]:or};class Ji{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wh=1234567;const Gr=Math.PI/180,jr=180/Math.PI;function Si(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]).toLowerCase()}function nt(n,e,t){return Math.max(e,Math.min(t,n))}function Bu(n,e){return(n%e+e)%e}function A_(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function R_(n,e,t){return n!==e?(t-n)/(e-n):0}function kr(n,e,t){return(1-t)*n+t*e}function C_(n,e,t,i){return kr(n,e,1-Math.exp(-t*i))}function P_(n,e=1){return e-Math.abs(Bu(n,e*2)-e)}function D_(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function I_(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function L_(n,e){return n+Math.floor(Math.random()*(e-n+1))}function U_(n,e){return n+Math.random()*(e-n)}function N_(n){return n*(.5-Math.random())}function F_(n){n!==void 0&&(Wh=n);let e=Wh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function O_(n){return n*Gr}function B_(n){return n*jr}function z_(n){return(n&n-1)===0&&n!==0}function H_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function V_(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function G_(n,e,t,i,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+i)/2),u=o((e+i)/2),h=r((e-i)/2),f=o((e-i)/2),d=r((i-e)/2),_=o((i-e)/2);switch(s){case"XYX":n.set(a*u,l*h,l*f,a*c);break;case"YZY":n.set(l*f,a*u,l*h,a*c);break;case"ZXZ":n.set(l*h,l*f,a*u,a*c);break;case"XZX":n.set(a*u,l*_,l*d,a*c);break;case"YXY":n.set(l*d,a*u,l*_,a*c);break;case"ZYZ":n.set(l*_,l*d,a*u,a*c);break;default:We("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Dn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ut(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Up={DEG2RAD:Gr,RAD2DEG:jr,generateUUID:Si,clamp:nt,euclideanModulo:Bu,mapLinear:A_,inverseLerp:R_,lerp:kr,damp:C_,pingpong:P_,smoothstep:D_,smootherstep:I_,randInt:L_,randFloat:U_,randFloatSpread:N_,seededRandom:F_,degToRad:O_,radToDeg:B_,isPowerOfTwo:z_,ceilPowerOfTwo:H_,floorPowerOfTwo:V_,setQuaternionFromProperEuler:G_,normalize:ut,denormalize:Dn},Ku=class Ku{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ku.prototype.isVector2=!0;let Re=Ku;class $i{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3],f=r[o+0],d=r[o+1],_=r[o+2],x=r[o+3];if(h!==x||l!==f||c!==d||u!==_){let m=l*f+c*d+u*_+h*x;m<0&&(f=-f,d=-d,_=-_,x=-x,m=-m);let p=1-a;if(m<.9995){const y=Math.acos(m),A=Math.sin(y);p=Math.sin(p*y)/A,a=Math.sin(a*y)/A,l=l*p+f*a,c=c*p+d*a,u=u*p+_*a,h=h*p+x*a}else{l=l*p+f*a,c=c*p+d*a,u=u*p+_*a,h=h*p+x*a;const y=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=y,c*=y,u*=y,h*=y}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[o],f=r[o+1],d=r[o+2],_=r[o+3];return e[t]=a*_+u*h+l*d-c*f,e[t+1]=l*_+u*f+c*h-a*d,e[t+2]=c*_+u*d+a*f-l*h,e[t+3]=u*_-a*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),h=a(r/2),f=l(i/2),d=l(s/2),_=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h-f*d*_;break;case"YXZ":this._x=f*u*h+c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h+f*d*_;break;case"ZXY":this._x=f*u*h-c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h-f*d*_;break;case"ZYX":this._x=f*u*h-c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h+f*d*_;break;case"YZX":this._x=f*u*h+c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h-f*d*_;break;case"XZY":this._x=f*u*h-c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h+f*d*_;break;default:We("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(i>a&&i>h){const d=2*Math.sqrt(1+i-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-i-h);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-i-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const $u=class $u{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),u=2*(a*t-r*s),h=2*(r*i-o*t);return this.x=t+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return sl.copy(this).projectOnVector(e),this.sub(sl)}reflect(e){return this.sub(sl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};$u.prototype.isVector3=!0;let O=$u;const sl=new O,Xh=new $i,Zu=class Zu{constructor(e,t,i,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],d=i[5],_=i[8],x=s[0],m=s[3],p=s[6],y=s[1],A=s[4],M=s[7],T=s[2],E=s[5],C=s[8];return r[0]=o*x+a*y+l*T,r[3]=o*m+a*A+l*E,r[6]=o*p+a*M+l*C,r[1]=c*x+u*y+h*T,r[4]=c*m+u*A+h*E,r[7]=c*p+u*M+h*C,r[2]=f*x+d*y+_*T,r[5]=f*m+d*A+_*E,r[8]=f*p+d*M+_*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*r,d=c*r-o*l,_=t*h+i*f+s*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return e[0]=h*x,e[1]=(s*c-u*i)*x,e[2]=(a*i-s*o)*x,e[3]=f*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-a*t)*x,e[6]=d*x,e[7]=(i*l-c*t)*x,e[8]=(o*t-i*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return nr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(rl.makeScale(e,t)),this}rotate(e){return nr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(rl.makeRotation(-e)),this}translate(e,t){return nr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(rl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Zu.prototype.isMatrix3=!0;let Ke=Zu;const rl=new Ke,Yh=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qh=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function k_(){const n={enabled:!0,workingColorSpace:va,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===at&&(s.r=yi(s.r),s.g=yi(s.g),s.b=yi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===at&&(s.r=ir(s.r),s.g=ir(s.g),s.b=ir(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Wi?Ma:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return nr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return nr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[va]:{primaries:e,whitePoint:i,transfer:Ma,toXYZ:Yh,fromXYZ:qh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:It},outputColorSpaceConfig:{drawingBufferColorSpace:It}},[It]:{primaries:e,whitePoint:i,transfer:at,toXYZ:Yh,fromXYZ:qh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:It}}}),n}const it=k_();function yi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ir(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Es;class W_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Es===void 0&&(Es=Sa("canvas")),Es.width=e.width,Es.height=e.height;const s=Es.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Es}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Sa("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=yi(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(yi(t[i]/255)*255):t[i]=yi(t[i]);return{data:t,width:e.width,height:e.height}}else return We("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let X_=0;class zu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:X_++}),this.uuid=Si(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ol(s[o].image)):r.push(ol(s[o]))}else r=ol(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function ol(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?W_.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(We("Texture: Unable to serialize Texture."),{})}let Y_=0;const al=new O;class Kt extends Ji{constructor(e=Kt.DEFAULT_IMAGE,t=Kt.DEFAULT_MAPPING,i=Mi,s=Mi,r=Xt,o=ls,a=Ln,l=pn,c=Kt.DEFAULT_ANISOTROPY,u=Wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Y_++}),this.uuid=Si(),this.name="",this.source=new zu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Re(0,0),this.repeat=new Re(1,1),this.center=new Re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(al).x}get height(){return this.source.getSize(al).y}get depth(){return this.source.getSize(al).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){We(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){We(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==wp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case cc:e.x=e.x-Math.floor(e.x);break;case Mi:e.x=e.x<0?0:1;break;case uc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case cc:e.y=e.y-Math.floor(e.y);break;case Mi:e.y=e.y<0?0:1;break;case uc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Kt.DEFAULT_IMAGE=null;Kt.DEFAULT_MAPPING=wp;Kt.DEFAULT_ANISOTROPY=1;const Ju=class Ju{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],_=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+x)<.1&&Math.abs(_+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(c+1)/2,M=(d+1)/2,T=(p+1)/2,E=(u+f)/4,C=(h+x)/4,v=(_+m)/4;return A>M&&A>T?A<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(A),s=E/i,r=C/i):M>T?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=E/s,r=v/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=C/r,s=v/r),this.set(i,s,r,t),this}let y=Math.sqrt((m-_)*(m-_)+(h-x)*(h-x)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(h-x)/y,this.z=(f-u)/y,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ju.prototype.isVector4=!0;let Et=Ju;class q_ extends Ji{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Et(0,0,e,t),this.scissorTest=!1,this.viewport=new Et(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Kt(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Xt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new zu(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ln extends q_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Np extends Kt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=zt,this.minFilter=zt,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class K_ extends Kt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=zt,this.minFilter=zt,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ta=class Ta{constructor(e,t,i,s,r,o,a,l,c,u,h,f,d,_,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,u,h,f,d,_,x,m)}set(e,t,i,s,r,o,a,l,c,u,h,f,d,_,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=_,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ta().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/Ts.setFromMatrixColumn(e,0).length(),r=1/Ts.setFromMatrixColumn(e,1).length(),o=1/Ts.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=o*u,d=o*h,_=a*u,x=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+_*c,t[5]=f-x*c,t[9]=-a*l,t[2]=x-f*c,t[6]=_+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,_=c*u,x=c*h;t[0]=f+x*a,t[4]=_*a-d,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-_,t[6]=x+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,_=c*u,x=c*h;t[0]=f-x*a,t[4]=-o*h,t[8]=_+d*a,t[1]=d+_*a,t[5]=o*u,t[9]=x-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,d=o*h,_=a*u,x=a*h;t[0]=l*u,t[4]=_*c-d,t[8]=f*c+x,t[1]=l*h,t[5]=x*c+f,t[9]=d*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,_=a*l,x=a*c;t[0]=l*u,t[4]=x-f*h,t[8]=_*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*h+_,t[10]=f-x*h}else if(e.order==="XZY"){const f=o*l,d=o*c,_=a*l,x=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+x,t[5]=o*u,t[9]=d*h-_,t[2]=_*h-d,t[6]=a*u,t[10]=x*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($_,e,Z_)}lookAt(e,t,i){const s=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),Li.crossVectors(i,un),Li.lengthSq()===0&&(Math.abs(i.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),Li.crossVectors(i,un)),Li.normalize(),fo.crossVectors(un,Li),s[0]=Li.x,s[4]=fo.x,s[8]=un.x,s[1]=Li.y,s[5]=fo.y,s[9]=un.y,s[2]=Li.z,s[6]=fo.z,s[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],d=i[13],_=i[2],x=i[6],m=i[10],p=i[14],y=i[3],A=i[7],M=i[11],T=i[15],E=s[0],C=s[4],v=s[8],w=s[12],L=s[1],D=s[5],U=s[9],G=s[13],$=s[2],z=s[6],Y=s[10],H=s[14],Z=s[3],le=s[7],ne=s[11],oe=s[15];return r[0]=o*E+a*L+l*$+c*Z,r[4]=o*C+a*D+l*z+c*le,r[8]=o*v+a*U+l*Y+c*ne,r[12]=o*w+a*G+l*H+c*oe,r[1]=u*E+h*L+f*$+d*Z,r[5]=u*C+h*D+f*z+d*le,r[9]=u*v+h*U+f*Y+d*ne,r[13]=u*w+h*G+f*H+d*oe,r[2]=_*E+x*L+m*$+p*Z,r[6]=_*C+x*D+m*z+p*le,r[10]=_*v+x*U+m*Y+p*ne,r[14]=_*w+x*G+m*H+p*oe,r[3]=y*E+A*L+M*$+T*Z,r[7]=y*C+A*D+M*z+T*le,r[11]=y*v+A*U+M*Y+T*ne,r[15]=y*w+A*G+M*H+T*oe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],_=e[3],x=e[7],m=e[11],p=e[15],y=l*d-c*f,A=a*d-c*h,M=a*f-l*h,T=o*d-c*u,E=o*f-l*u,C=o*h-a*u;return t*(x*y-m*A+p*M)-i*(_*y-m*T+p*E)+s*(_*A-x*T+p*C)-r*(_*M-x*E+m*C)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],u=e[10];return t*(o*u-a*c)-i*(r*u-a*l)+s*(r*c-o*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],_=e[12],x=e[13],m=e[14],p=e[15],y=t*a-i*o,A=t*l-s*o,M=t*c-r*o,T=i*l-s*a,E=i*c-r*a,C=s*c-r*l,v=u*x-h*_,w=u*m-f*_,L=u*p-d*_,D=h*m-f*x,U=h*p-d*x,G=f*p-d*m,$=y*G-A*U+M*D+T*L-E*w+C*v;if($===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/$;return e[0]=(a*G-l*U+c*D)*z,e[1]=(s*U-i*G-r*D)*z,e[2]=(x*C-m*E+p*T)*z,e[3]=(f*E-h*C-d*T)*z,e[4]=(l*L-o*G-c*w)*z,e[5]=(t*G-s*L+r*w)*z,e[6]=(m*M-_*C-p*A)*z,e[7]=(u*C-f*M+d*A)*z,e[8]=(o*U-a*L+c*v)*z,e[9]=(i*L-t*U-r*v)*z,e[10]=(_*E-x*M+p*y)*z,e[11]=(h*M-u*E-d*y)*z,e[12]=(a*w-o*D-l*v)*z,e[13]=(t*D-i*w+s*v)*z,e[14]=(x*A-_*T-m*y)*z,e[15]=(u*T-h*A+f*y)*z,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,f=r*c,d=r*u,_=r*h,x=o*u,m=o*h,p=a*h,y=l*c,A=l*u,M=l*h,T=i.x,E=i.y,C=i.z;return s[0]=(1-(x+p))*T,s[1]=(d+M)*T,s[2]=(_-A)*T,s[3]=0,s[4]=(d-M)*E,s[5]=(1-(f+p))*E,s[6]=(m+y)*E,s[7]=0,s[8]=(_+A)*C,s[9]=(m-y)*C,s[10]=(1-(f+x))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let o=Ts.set(s[0],s[1],s[2]).length();const a=Ts.set(s[4],s[5],s[6]).length(),l=Ts.set(s[8],s[9],s[10]).length();r<0&&(o=-o),wn.copy(this);const c=1/o,u=1/a,h=1/l;return wn.elements[0]*=c,wn.elements[1]*=c,wn.elements[2]*=c,wn.elements[4]*=u,wn.elements[5]*=u,wn.elements[6]*=u,wn.elements[8]*=h,wn.elements[9]*=h,wn.elements[10]*=h,t.setFromRotationMatrix(wn),i.x=o,i.y=a,i.z=l,this}makePerspective(e,t,i,s,r,o,a=Qn,l=!1){const c=this.elements,u=2*r/(t-e),h=2*r/(i-s),f=(t+e)/(t-e),d=(i+s)/(i-s);let _,x;if(l)_=r/(o-r),x=o*r/(o-r);else if(a===Qn)_=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===Jr)_=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Qn,l=!1){const c=this.elements,u=2/(t-e),h=2/(i-s),f=-(t+e)/(t-e),d=-(i+s)/(i-s);let _,x;if(l)_=1/(o-r),x=o/(o-r);else if(a===Qn)_=-2/(o-r),x=-(o+r)/(o-r);else if(a===Jr)_=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Ta.prototype.isMatrix4=!0;let dt=Ta;const Ts=new O,wn=new dt,$_=new O(0,0,0),Z_=new O(1,1,1),Li=new O,fo=new O,un=new O,Kh=new dt,$h=new $i;class Zi{constructor(e=0,t=0,i=0,s=Zi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(nt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-nt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:We("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Kh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Kh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $h.setFromEuler(this),this.setFromQuaternion($h,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Zi.DEFAULT_ORDER="XYZ";class Hu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let J_=0;const Zh=new O,ws=new $i,ci=new dt,po=new O,_r=new O,j_=new O,Q_=new $i,Jh=new O(1,0,0),jh=new O(0,1,0),Qh=new O(0,0,1),ef={type:"added"},ex={type:"removed"},As={type:"childadded",child:null},ll={type:"childremoved",child:null};class Lt extends Ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:J_++}),this.uuid=Si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Lt.DEFAULT_UP.clone();const e=new O,t=new Zi,i=new $i,s=new O(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new dt},normalMatrix:{value:new Ke}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=Lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ws.setFromAxisAngle(e,t),this.quaternion.multiply(ws),this}rotateOnWorldAxis(e,t){return ws.setFromAxisAngle(e,t),this.quaternion.premultiply(ws),this}rotateX(e){return this.rotateOnAxis(Jh,e)}rotateY(e){return this.rotateOnAxis(jh,e)}rotateZ(e){return this.rotateOnAxis(Qh,e)}translateOnAxis(e,t){return Zh.copy(e).applyQuaternion(this.quaternion),this.position.add(Zh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jh,e)}translateY(e){return this.translateOnAxis(jh,e)}translateZ(e){return this.translateOnAxis(Qh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?po.copy(e):po.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),_r.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(_r,po,this.up):ci.lookAt(po,_r,this.up),this.quaternion.setFromRotationMatrix(ci),s&&(ci.extractRotation(s.matrixWorld),ws.setFromRotationMatrix(ci),this.quaternion.premultiply(ws.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(st("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ef),As.child=e,this.dispatchEvent(As),As.child=null):st("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ex),ll.child=e,this.dispatchEvent(ll),ll.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(ci),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ef),As.child=e,this.dispatchEvent(As),As.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_r,e,j_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_r,Q_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),_.length>0&&(i.nodes=_)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Lt.DEFAULT_UP=new O(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class _t extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tx={type:"move"};class cl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,_=.005;c.inputState.pinching&&f>d+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(tx)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new _t;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Fp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ui={h:0,s:0,l:0},mo={h:0,s:0,l:0};function ul(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ye{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=It){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=i,it.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=it.workingColorSpace){if(e=Bu(e,1),t=nt(t,0,1),i=nt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=ul(o,r,e+1/3),this.g=ul(o,r,e),this.b=ul(o,r,e-1/3)}return it.colorSpaceToWorking(this,s),this}setStyle(e,t=It){function i(r){r!==void 0&&parseFloat(r)<1&&We("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:We("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);We("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=It){const i=Fp[e.toLowerCase()];return i!==void 0?this.setHex(i,t):We("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yi(e.r),this.g=yi(e.g),this.b=yi(e.b),this}copyLinearToSRGB(e){return this.r=ir(e.r),this.g=ir(e.g),this.b=ir(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=It){return it.workingToColorSpace(Gt.copy(this),e),Math.round(nt(Gt.r*255,0,255))*65536+Math.round(nt(Gt.g*255,0,255))*256+Math.round(nt(Gt.b*255,0,255))}getHexString(e=It){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(Gt.copy(this),t);const i=Gt.r,s=Gt.g,r=Gt.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=It){it.workingToColorSpace(Gt.copy(this),e);const t=Gt.r,i=Gt.g,s=Gt.b;return e!==It?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Ui),this.setHSL(Ui.h+e,Ui.s+t,Ui.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ui),e.getHSL(mo);const i=kr(Ui.h,mo.h,t),s=kr(Ui.s,mo.s,t),r=kr(Ui.l,mo.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new Ye;Ye.NAMES=Fp;class Vu{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ye(e),this.near=t,this.far=i}clone(){return new Vu(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class nx extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zi,this.environmentIntensity=1,this.environmentRotation=new Zi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const An=new O,ui=new O,hl=new O,hi=new O,Rs=new O,Cs=new O,tf=new O,fl=new O,dl=new O,pl=new O,ml=new Et,gl=new Et,_l=new Et;class bn{constructor(e=new O,t=new O,i=new O){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),An.subVectors(e,t),s.cross(An);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){An.subVectors(s,t),ui.subVectors(i,t),hl.subVectors(e,t);const o=An.dot(An),a=An.dot(ui),l=An.dot(hl),c=ui.dot(ui),u=ui.dot(hl),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,_=(o*u-a*l)*f;return r.set(1-d-_,_,d)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,hi)===null?!1:hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,hi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,hi.x),l.addScaledVector(o,hi.y),l.addScaledVector(a,hi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return ml.setScalar(0),gl.setScalar(0),_l.setScalar(0),ml.fromBufferAttribute(e,t),gl.fromBufferAttribute(e,i),_l.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ml,r.x),o.addScaledVector(gl,r.y),o.addScaledVector(_l,r.z),o}static isFrontFacing(e,t,i,s){return An.subVectors(i,t),ui.subVectors(e,t),An.cross(ui).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return An.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),An.cross(ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return bn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return bn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;Rs.subVectors(s,i),Cs.subVectors(r,i),fl.subVectors(e,i);const l=Rs.dot(fl),c=Cs.dot(fl);if(l<=0&&c<=0)return t.copy(i);dl.subVectors(e,s);const u=Rs.dot(dl),h=Cs.dot(dl);if(u>=0&&h<=u)return t.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Rs,o);pl.subVectors(e,r);const d=Rs.dot(pl),_=Cs.dot(pl);if(_>=0&&d<=_)return t.copy(r);const x=d*c-l*_;if(x<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(i).addScaledVector(Cs,a);const m=u*_-d*h;if(m<=0&&h-u>=0&&d-_>=0)return tf.subVectors(r,s),a=(h-u)/(h-u+(d-_)),t.copy(s).addScaledVector(tf,a);const p=1/(m+x+f);return o=x*p,a=f*p,t.copy(i).addScaledVector(Rs,o).addScaledVector(Cs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class xs{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Rn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Rn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Rn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Rn):Rn.fromBufferAttribute(r,o),Rn.applyMatrix4(e.matrixWorld),this.expandByPoint(Rn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),go.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),go.copy(i.boundingBox)),go.applyMatrix4(e.matrixWorld),this.union(go)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Rn),Rn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xr),_o.subVectors(this.max,xr),Ps.subVectors(e.a,xr),Ds.subVectors(e.b,xr),Is.subVectors(e.c,xr),Ni.subVectors(Ds,Ps),Fi.subVectors(Is,Ds),ts.subVectors(Ps,Is);let t=[0,-Ni.z,Ni.y,0,-Fi.z,Fi.y,0,-ts.z,ts.y,Ni.z,0,-Ni.x,Fi.z,0,-Fi.x,ts.z,0,-ts.x,-Ni.y,Ni.x,0,-Fi.y,Fi.x,0,-ts.y,ts.x,0];return!xl(t,Ps,Ds,Is,_o)||(t=[1,0,0,0,1,0,0,0,1],!xl(t,Ps,Ds,Is,_o))?!1:(xo.crossVectors(Ni,Fi),t=[xo.x,xo.y,xo.z],xl(t,Ps,Ds,Is,_o))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Rn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Rn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const fi=[new O,new O,new O,new O,new O,new O,new O,new O],Rn=new O,go=new xs,Ps=new O,Ds=new O,Is=new O,Ni=new O,Fi=new O,ts=new O,xr=new O,_o=new O,xo=new O,ns=new O;function xl(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){ns.fromArray(n,r);const a=s.x*Math.abs(ns.x)+s.y*Math.abs(ns.y)+s.z*Math.abs(ns.z),l=e.dot(ns),c=t.dot(ns),u=i.dot(ns);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ct=new O,vo=new Re;let ix=0;class _n extends Ji{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ix++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Gc,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)vo.fromBufferAttribute(this,t),vo.applyMatrix3(e),this.setXY(t,vo.x,vo.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix3(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Dn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ut(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Dn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Dn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Dn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Dn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array),s=ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Gc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Op extends _n{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Bp extends _n{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class yt extends _n{constructor(e,t,i){super(new Float32Array(e),t,i)}}const sx=new xs,vr=new O,vl=new O;class fr{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):sx.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vr.subVectors(e,this.center);const t=vr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(vr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vr.copy(e.center).add(vl)),this.expandByPoint(vr.copy(e.center).sub(vl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let rx=0;const Mn=new dt,Ml=new Lt,Ls=new O,hn=new xs,Mr=new xs,Ft=new O;class Bt extends Ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rx++}),this.uuid=Si(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(b_(e)?Bp:Op)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ke().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Mn.makeRotationFromQuaternion(e),this.applyMatrix4(Mn),this}rotateX(e){return Mn.makeRotationX(e),this.applyMatrix4(Mn),this}rotateY(e){return Mn.makeRotationY(e),this.applyMatrix4(Mn),this}rotateZ(e){return Mn.makeRotationZ(e),this.applyMatrix4(Mn),this}translate(e,t,i){return Mn.makeTranslation(e,t,i),this.applyMatrix4(Mn),this}scale(e,t,i){return Mn.makeScale(e,t,i),this.applyMatrix4(Mn),this}lookAt(e){return Ml.lookAt(e),Ml.updateMatrix(),this.applyMatrix4(Ml.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ls).negate(),this.translate(Ls.x,Ls.y,Ls.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new yt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&We("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){st("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];hn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&st('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){st("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(hn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Mr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(hn.min,Mr.min),hn.expandByPoint(Ft),Ft.addVectors(hn.max,Mr.max),hn.expandByPoint(Ft)):(hn.expandByPoint(Mr.min),hn.expandByPoint(Mr.max))}hn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Ft.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ft));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ft.fromBufferAttribute(a,c),l&&(Ls.fromBufferAttribute(e,c),Ft.add(Ls)),s=Math.max(s,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&st('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){st("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new _n(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let v=0;v<i.count;v++)a[v]=new O,l[v]=new O;const c=new O,u=new O,h=new O,f=new Re,d=new Re,_=new Re,x=new O,m=new O;function p(v,w,L){c.fromBufferAttribute(i,v),u.fromBufferAttribute(i,w),h.fromBufferAttribute(i,L),f.fromBufferAttribute(r,v),d.fromBufferAttribute(r,w),_.fromBufferAttribute(r,L),u.sub(c),h.sub(c),d.sub(f),_.sub(f);const D=1/(d.x*_.y-_.x*d.y);isFinite(D)&&(x.copy(u).multiplyScalar(_.y).addScaledVector(h,-d.y).multiplyScalar(D),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-_.x).multiplyScalar(D),a[v].add(x),a[w].add(x),a[L].add(x),l[v].add(m),l[w].add(m),l[L].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let v=0,w=y.length;v<w;++v){const L=y[v],D=L.start,U=L.count;for(let G=D,$=D+U;G<$;G+=3)p(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const A=new O,M=new O,T=new O,E=new O;function C(v){T.fromBufferAttribute(s,v),E.copy(T);const w=a[v];A.copy(w),A.sub(T.multiplyScalar(T.dot(w))).normalize(),M.crossVectors(E,w);const D=M.dot(l[v])<0?-1:1;o.setXYZW(v,A.x,A.y,A.z,D)}for(let v=0,w=y.length;v<w;++v){const L=y[v],D=L.start,U=L.count;for(let G=D,$=D+U;G<$;G+=3)C(e.getX(G+0)),C(e.getX(G+1)),C(e.getX(G+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new _n(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new O,r=new O,o=new O,a=new O,l=new O,c=new O,u=new O,h=new O;if(e)for(let f=0,d=e.count;f<d;f+=3){const _=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,_=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?d=l[x]*a.data.stride+a.offset:d=l[x]*u;for(let p=0;p<u;p++)f[_++]=c[d++]}return new _n(f,u,h)}if(this.index===null)return We("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Bt,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,i);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ox{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Gc,this.updateRanges=[],this.version=0,this.uuid=Si()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Si()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Si()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Zt=new O;class ba{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Dn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ut(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Dn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Dn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Dn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Dn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array),s=ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ya("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new _n(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ba(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ya("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let ax=0;class vs extends Ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ax++}),this.uuid=Si(),this.name="",this.type="Material",this.blending=tr,this.side=Ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ec,this.blendDst=tc,this.blendEquation=os,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=or,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bs,this.stencilZFail=bs,this.stencilZPass=bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){We(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){We(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==tr&&(i.blending=this.blending),this.side!==Ki&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ec&&(i.blendSrc=this.blendSrc),this.blendDst!==tc&&(i.blendDst=this.blendDst),this.blendEquation!==os&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==or&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==bs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==bs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ye().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Re().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Re().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class zp extends vs{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Us;const Sr=new O,Ns=new O,Fs=new O,Os=new Re,yr=new Re,Hp=new dt,Mo=new O,br=new O,So=new O,nf=new Re,Sl=new Re,sf=new Re;class lx extends Lt{constructor(e=new zp){if(super(),this.isSprite=!0,this.type="Sprite",Us===void 0){Us=new Bt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new ox(t,5);Us.setIndex([0,1,2,0,2,3]),Us.setAttribute("position",new ba(i,3,0,!1)),Us.setAttribute("uv",new ba(i,2,3,!1))}this.geometry=Us,this.material=e,this.center=new Re(.5,.5),this.count=1}raycast(e,t){e.camera===null&&st('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ns.setFromMatrixScale(this.matrixWorld),Hp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Fs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ns.multiplyScalar(-Fs.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;yo(Mo.set(-.5,-.5,0),Fs,o,Ns,s,r),yo(br.set(.5,-.5,0),Fs,o,Ns,s,r),yo(So.set(.5,.5,0),Fs,o,Ns,s,r),nf.set(0,0),Sl.set(1,0),sf.set(1,1);let a=e.ray.intersectTriangle(Mo,br,So,!1,Sr);if(a===null&&(yo(br.set(-.5,.5,0),Fs,o,Ns,s,r),Sl.set(0,1),a=e.ray.intersectTriangle(Mo,So,br,!1,Sr),a===null))return;const l=e.ray.origin.distanceTo(Sr);l<e.near||l>e.far||t.push({distance:l,point:Sr.clone(),uv:bn.getInterpolation(Sr,Mo,br,So,nf,Sl,sf,new Re),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function yo(n,e,t,i,s,r){Os.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(yr.x=r*Os.x-s*Os.y,yr.y=s*Os.x+r*Os.y):yr.copy(Os),n.copy(e),n.x+=yr.x,n.y+=yr.y,n.applyMatrix4(Hp)}const di=new O,yl=new O,bo=new O,Oi=new O,bl=new O,Eo=new O,El=new O;class Fa{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(di.copy(this.origin).addScaledVector(this.direction,t),di.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){yl.copy(e).add(t).multiplyScalar(.5),bo.copy(t).sub(e).normalize(),Oi.copy(this.origin).sub(yl);const r=e.distanceTo(t)*.5,o=-this.direction.dot(bo),a=Oi.dot(this.direction),l=-Oi.dot(bo),c=Oi.lengthSq(),u=Math.abs(1-o*o);let h,f,d,_;if(u>0)if(h=o*l-a,f=o*a-l,_=r*u,h>=0)if(f>=-_)if(f<=_){const x=1/u;h*=x,f*=x,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-_?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c):f<=_?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(yl).addScaledVector(bo,f),d}intersectSphere(e,t){di.subVectors(e.center,this.origin);const i=di.dot(this.direction),s=di.dot(di)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,di)!==null}intersectTriangle(e,t,i,s,r){bl.subVectors(t,e),Eo.subVectors(i,e),El.crossVectors(bl,Eo);let o=this.direction.dot(El),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Oi.subVectors(this.origin,e);const l=a*this.direction.dot(Eo.crossVectors(Oi,Eo));if(l<0)return null;const c=a*this.direction.dot(bl.cross(Oi));if(c<0||l+c>o)return null;const u=-a*Oi.dot(El);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class oi extends vs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zi,this.combine=Tp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const rf=new dt,is=new Fa,To=new fr,of=new O,wo=new O,Ao=new O,Ro=new O,Tl=new O,Co=new O,af=new O,Po=new O;class _e extends Lt{constructor(e=new Bt,t=new oi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Co.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(Tl.fromBufferAttribute(h,e),o?Co.addScaledVector(Tl,u):Co.addScaledVector(Tl.sub(t),u))}t.add(Co)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),To.copy(i.boundingSphere),To.applyMatrix4(r),is.copy(e.ray).recast(e.near),!(To.containsPoint(is.origin)===!1&&(is.intersectSphere(To,of)===null||is.origin.distanceToSquared(of)>(e.far-e.near)**2))&&(rf.copy(r).invert(),is.copy(e.ray).applyMatrix4(rf),!(i.boundingBox!==null&&is.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,is)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,x=f.length;_<x;_++){const m=f[_],p=o[m.materialIndex],y=Math.max(m.start,d.start),A=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let M=y,T=A;M<T;M+=3){const E=a.getX(M),C=a.getX(M+1),v=a.getX(M+2);s=Do(this,p,e,i,c,u,h,E,C,v),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let m=_,p=x;m<p;m+=3){const y=a.getX(m),A=a.getX(m+1),M=a.getX(m+2);s=Do(this,o,e,i,c,u,h,y,A,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,x=f.length;_<x;_++){const m=f[_],p=o[m.materialIndex],y=Math.max(m.start,d.start),A=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let M=y,T=A;M<T;M+=3){const E=M,C=M+1,v=M+2;s=Do(this,p,e,i,c,u,h,E,C,v),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let m=_,p=x;m<p;m+=3){const y=m,A=m+1,M=m+2;s=Do(this,o,e,i,c,u,h,y,A,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function cx(n,e,t,i,s,r,o,a){let l;if(e.side===an?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===Ki,a),l===null)return null;Po.copy(a),Po.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Po);return c<t.near||c>t.far?null:{distance:c,point:Po.clone(),object:n}}function Do(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,wo),n.getVertexPosition(l,Ao),n.getVertexPosition(c,Ro);const u=cx(n,e,t,i,wo,Ao,Ro,af);if(u){const h=new O;bn.getBarycoord(af,wo,Ao,Ro,h),s&&(u.uv=bn.getInterpolatedAttribute(s,a,l,c,h,new Re)),r&&(u.uv1=bn.getInterpolatedAttribute(r,a,l,c,h,new Re)),o&&(u.normal=bn.getInterpolatedAttribute(o,a,l,c,h,new O),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new O,materialIndex:0};bn.getNormal(wo,Ao,Ro,f.normal),u.face=f,u.barycoord=h}return u}class Vp extends Kt{constructor(e=null,t=1,i=1,s,r,o,a,l,c=zt,u=zt,h,f){super(null,o,a,l,c,u,s,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class lf extends _n{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Bs=new dt,cf=new dt,Io=[],uf=new xs,ux=new dt,Er=new _e,Tr=new fr;class hx extends _e{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new lf(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,ux)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new xs),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Bs),uf.copy(e.boundingBox).applyMatrix4(Bs),this.boundingBox.union(uf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Bs),Tr.copy(e.boundingSphere).applyMatrix4(Bs),this.boundingSphere.union(Tr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Er.geometry=this.geometry,Er.material=this.material,Er.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Tr.copy(this.boundingSphere),Tr.applyMatrix4(i),e.ray.intersectsSphere(Tr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Bs),cf.multiplyMatrices(i,Bs),Er.matrixWorld=cf,Er.raycast(e,Io);for(let o=0,a=Io.length;o<a;o++){const l=Io[o];l.instanceId=r,l.object=this,t.push(l)}Io.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new lf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Vp(new Float32Array(s*this.count),s,this.count,Iu,In));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;return r[l]=a,r.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const wl=new O,fx=new O,dx=new Ke;class Gi{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=wl.subVectors(i,t).cross(fx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(wl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||dx.getNormalMatrix(e),s=this.coplanarPoint(wl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ss=new fr,px=new Re(.5,.5),Lo=new O;class Gu{constructor(e=new Gi,t=new Gi,i=new Gi,s=new Gi,r=new Gi,o=new Gi){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Qn,i=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],h=r[5],f=r[6],d=r[7],_=r[8],x=r[9],m=r[10],p=r[11],y=r[12],A=r[13],M=r[14],T=r[15];if(s[0].setComponents(c-o,d-u,p-_,T-y).normalize(),s[1].setComponents(c+o,d+u,p+_,T+y).normalize(),s[2].setComponents(c+a,d+h,p+x,T+A).normalize(),s[3].setComponents(c-a,d-h,p-x,T-A).normalize(),i)s[4].setComponents(l,f,m,M).normalize(),s[5].setComponents(c-l,d-f,p-m,T-M).normalize();else if(s[4].setComponents(c-l,d-f,p-m,T-M).normalize(),t===Qn)s[5].setComponents(c+l,d+f,p+m,T+M).normalize();else if(t===Jr)s[5].setComponents(l,f,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ss.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ss.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ss)}intersectsSprite(e){ss.center.set(0,0,0);const t=px.distanceTo(e.center);return ss.radius=.7071067811865476+t,ss.applyMatrix4(e.matrixWorld),this.intersectsSphere(ss)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Lo.x=s.normal.x>0?e.max.x:e.min.x,Lo.y=s.normal.y>0?e.max.y:e.min.y,Lo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Lo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Gp extends vs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const hf=new dt,kc=new Fa,Uo=new fr,No=new O;class mx extends Lt{constructor(e=new Bt,t=new Gp){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Uo.copy(i.boundingSphere),Uo.applyMatrix4(s),Uo.radius+=r,e.ray.intersectsSphere(Uo)===!1)return;hf.copy(s).invert(),kc.copy(e.ray).applyMatrix4(hf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,h=i.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let _=f,x=d;_<x;_++){const m=c.getX(_);No.fromBufferAttribute(h,m),ff(No,m,l,s,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let _=f,x=d;_<x;_++)No.fromBufferAttribute(h,_),ff(No,_,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ff(n,e,t,i,s,r,o){const a=kc.distanceSqToPoint(n);if(a<t){const l=new O;kc.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class kp extends Kt{constructor(e=[],t=ds,i,s,r,o,a,l,c,u){super(e,t,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ri extends Kt{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class lr extends Kt{constructor(e,t,i=ri,s,r,o,a=zt,l=zt,c,u=wi,h=1){if(u!==wi&&u!==cs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:h};super(f,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new zu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class gx extends lr{constructor(e,t=ri,i=ds,s,r,o=zt,a=zt,l,c=wi){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,i,s,r,o,a,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Wp extends Kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ge extends Bt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;_("z","y","x",-1,-1,i,t,e,o,r,0),_("z","y","x",1,-1,i,t,-e,o,r,1),_("x","z","y",1,1,e,i,t,s,o,2),_("x","z","y",1,-1,e,i,-t,s,o,3),_("x","y","z",1,-1,e,t,i,s,r,4),_("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new yt(c,3)),this.setAttribute("normal",new yt(u,3)),this.setAttribute("uv",new yt(h,2));function _(x,m,p,y,A,M,T,E,C,v,w){const L=M/C,D=T/v,U=M/2,G=T/2,$=E/2,z=C+1,Y=v+1;let H=0,Z=0;const le=new O;for(let ne=0;ne<Y;ne++){const oe=ne*D-G;for(let pe=0;pe<z;pe++){const Ze=pe*L-U;le[x]=Ze*y,le[m]=oe*A,le[p]=$,c.push(le.x,le.y,le.z),le[x]=0,le[m]=0,le[p]=E>0?1:-1,u.push(le.x,le.y,le.z),h.push(pe/C),h.push(1-ne/v),H+=1}}for(let ne=0;ne<v;ne++)for(let oe=0;oe<C;oe++){const pe=f+oe+z*ne,Ze=f+oe+z*(ne+1),bt=f+(oe+1)+z*(ne+1),rt=f+(oe+1)+z*ne;l.push(pe,Ze,rt),l.push(Ze,bt,rt),Z+=6}a.addGroup(d,Z,w),d+=Z,f+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ge(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Oa extends Bt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new O,u=new Re;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const d=i+h/t*s;c.x=e*Math.cos(d),c.y=e*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new yt(o,3)),this.setAttribute("normal",new yt(a,3)),this.setAttribute("uv",new yt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oa(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Bn extends Bt{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],f=[],d=[];let _=0;const x=[],m=i/2;let p=0;y(),o===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(u),this.setAttribute("position",new yt(h,3)),this.setAttribute("normal",new yt(f,3)),this.setAttribute("uv",new yt(d,2));function y(){const M=new O,T=new O;let E=0;const C=(t-e)/i;for(let v=0;v<=r;v++){const w=[],L=v/r,D=L*(t-e)+e;for(let U=0;U<=s;U++){const G=U/s,$=G*l+a,z=Math.sin($),Y=Math.cos($);T.x=D*z,T.y=-L*i+m,T.z=D*Y,h.push(T.x,T.y,T.z),M.set(z,C,Y).normalize(),f.push(M.x,M.y,M.z),d.push(G,1-L),w.push(_++)}x.push(w)}for(let v=0;v<s;v++)for(let w=0;w<r;w++){const L=x[w][v],D=x[w+1][v],U=x[w+1][v+1],G=x[w][v+1];(e>0||w!==0)&&(u.push(L,D,G),E+=3),(t>0||w!==r-1)&&(u.push(D,U,G),E+=3)}c.addGroup(p,E,0),p+=E}function A(M){const T=_,E=new Re,C=new O;let v=0;const w=M===!0?e:t,L=M===!0?1:-1;for(let U=1;U<=s;U++)h.push(0,m*L,0),f.push(0,L,0),d.push(.5,.5),_++;const D=_;for(let U=0;U<=s;U++){const $=U/s*l+a,z=Math.cos($),Y=Math.sin($);C.x=w*Y,C.y=m*L,C.z=w*z,h.push(C.x,C.y,C.z),f.push(0,L,0),E.x=z*.5+.5,E.y=Y*.5*L+.5,d.push(E.x,E.y),_++}for(let U=0;U<s;U++){const G=T+U,$=D+U;M===!0?u.push($,$+1,G):u.push($+1,$,G),v+=3}c.addGroup(p,v,M===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ba extends Bt{constructor(e=[new Re(0,-.5),new Re(.5,0),new Re(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=nt(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],u=1/t,h=new O,f=new Re,d=new O,_=new O,x=new O;let m=0,p=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:m=e[y+1].x-e[y].x,p=e[y+1].y-e[y].y,d.x=p*1,d.y=-m,d.z=p*0,x.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:m=e[y+1].x-e[y].x,p=e[y+1].y-e[y].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),l.push(d.x,d.y,d.z),x.copy(_)}for(let y=0;y<=t;y++){const A=i+y*u*s,M=Math.sin(A),T=Math.cos(A);for(let E=0;E<=e.length-1;E++){h.x=e[E].x*M,h.y=e[E].y,h.z=e[E].x*T,o.push(h.x,h.y,h.z),f.x=y/t,f.y=E/(e.length-1),a.push(f.x,f.y);const C=l[3*E+0]*M,v=l[3*E+1],w=l[3*E+0]*T;c.push(C,v,w)}}for(let y=0;y<t;y++)for(let A=0;A<e.length-1;A++){const M=A+y*e.length,T=M,E=M+e.length,C=M+e.length+1,v=M+1;r.push(T,E,v),r.push(C,v,E)}this.setIndex(r),this.setAttribute("position",new yt(o,3)),this.setAttribute("uv",new yt(a,2)),this.setAttribute("normal",new yt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ba(e.points,e.segments,e.phiStart,e.phiLength)}}class Ot extends Bt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,h=e/a,f=t/l,d=[],_=[],x=[],m=[];for(let p=0;p<u;p++){const y=p*f-o;for(let A=0;A<c;A++){const M=A*h-r;_.push(M,-y,0),x.push(0,0,1),m.push(A/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const A=y+c*p,M=y+c*(p+1),T=y+1+c*(p+1),E=y+1+c*p;d.push(A,M,E),d.push(M,T,E)}this.setIndex(d),this.setAttribute("position",new yt(_,3)),this.setAttribute("normal",new yt(x,3)),this.setAttribute("uv",new yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ot(e.width,e.height,e.widthSegments,e.heightSegments)}}class za extends Bt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new O,f=new O,d=[],_=[],x=[],m=[];for(let p=0;p<=i;p++){const y=[],A=p/i,M=o+A*a,T=e*Math.cos(M),E=Math.sqrt(e*e-T*T);let C=0;p===0&&o===0?C=.5/t:p===i&&l===Math.PI&&(C=-.5/t);for(let v=0;v<=t;v++){const w=v/t,L=s+w*r;h.x=-E*Math.cos(L),h.y=T,h.z=E*Math.sin(L),_.push(h.x,h.y,h.z),f.copy(h).normalize(),x.push(f.x,f.y,f.z),m.push(w+C,1-A),y.push(c++)}u.push(y)}for(let p=0;p<i;p++)for(let y=0;y<t;y++){const A=u[p][y+1],M=u[p][y],T=u[p+1][y],E=u[p+1][y+1];(p!==0||o>0)&&d.push(A,M,E),(p!==i-1||l<Math.PI)&&d.push(M,T,E)}this.setIndex(d),this.setAttribute("position",new yt(_,3)),this.setAttribute("normal",new yt(x,3)),this.setAttribute("uv",new yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new za(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ku extends Bt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},i=Math.floor(i),s=Math.floor(s);const l=[],c=[],u=[],h=[],f=new O,d=new O,_=new O;for(let x=0;x<=i;x++){const m=o+x/i*a;for(let p=0;p<=s;p++){const y=p/s*r;d.x=(e+t*Math.cos(m))*Math.cos(y),d.y=(e+t*Math.cos(m))*Math.sin(y),d.z=t*Math.sin(m),c.push(d.x,d.y,d.z),f.x=e*Math.cos(y),f.y=e*Math.sin(y),_.subVectors(d,f).normalize(),u.push(_.x,_.y,_.z),h.push(p/s),h.push(x/i)}}for(let x=1;x<=i;x++)for(let m=1;m<=s;m++){const p=(s+1)*x+m-1,y=(s+1)*(x-1)+m-1,A=(s+1)*(x-1)+m,M=(s+1)*x+m;l.push(p,y,M),l.push(y,A,M)}this.setIndex(l),this.setAttribute("position",new yt(c,3)),this.setAttribute("normal",new yt(u,3)),this.setAttribute("uv",new yt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ku(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function cr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(df(s))s.isRenderTargetTexture?(We("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(df(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Qt(n){const e={};for(let t=0;t<n.length;t++){const i=cr(n[t]);for(const s in i)e[s]=i[s]}return e}function df(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function _x(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Xp(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}const Qr={clone:cr,merge:Qt};var xx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yt extends vs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xx,this.fragmentShader=vx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cr(e.uniforms),this.uniformsGroups=_x(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Ye().setHex(s.value);break;case"v2":this.uniforms[i].value=new Re().fromArray(s.value);break;case"v3":this.uniforms[i].value=new O().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Et().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ke().fromArray(s.value);break;case"m4":this.uniforms[i].value=new dt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Yp extends Yt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ue extends vs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vc,this.normalScale=new Re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Mx extends vs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=m_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Sx extends vs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Wu extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Al=new dt,pf=new O,mf=new O;class qp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Re(512,512),this.mapType=pn,this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gu,this._frameExtents=new Re(1,1),this._viewportCount=1,this._viewports=[new Et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;pf.setFromMatrixPosition(e.matrixWorld),t.position.copy(pf),mf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(mf),t.updateMatrixWorld(),Al.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Al,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Jr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Al)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Fo=new O,Oo=new $i,kn=new O;class Kp extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=Qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Fo,Oo,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fo,Oo,kn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Fo,Oo,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fo,Oo,kn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Bi=new O,gf=new Re,_f=new Re;class yn extends Kp{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=jr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Gr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return jr*2*Math.atan(Math.tan(Gr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z),Bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z)}getViewSize(e,t){return this.getViewBounds(e,gf,_f),t.subVectors(_f,gf)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Gr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class yx extends qp{constructor(){super(new yn(90,1,.5,500)),this.isPointLightShadow=!0}}class $p extends Wu{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new yx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class ro extends Kp{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class bx extends qp{constructor(){super(new ro(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Rl extends Wu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new bx}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Ex extends Wu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const zs=-90,Hs=1;class Tx extends Lt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new yn(zs,Hs,e,t);s.layers=this.layers,this.add(s);const r=new yn(zs,Hs,e,t);r.layers=this.layers,this.add(r);const o=new yn(zs,Hs,e,t);o.layers=this.layers,this.add(o);const a=new yn(zs,Hs,e,t);a.layers=this.layers,this.add(a);const l=new yn(zs,Hs,e,t);l.layers=this.layers,this.add(l);const c=new yn(zs,Hs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Qn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Jr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class wx extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Ax{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Rx.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Rx(){this._document.hidden===!1&&this.reset()}const xf=new dt;class Cx{constructor(e,t,i=0,s=1/0){this.ray=new Fa(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Hu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):st("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return xf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(xf),this}intersectObject(e,t=!0,i=[]){return Wc(e,this,i,t),i.sort(vf),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Wc(e[s],this,i,t);return i.sort(vf),i}}function vf(n,e){return n.distance-e.distance}function Wc(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Wc(r[o],e,t,!0)}}class Px{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,We("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class Mf{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=nt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(nt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const ju=class ju{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};ju.prototype.isMatrix2=!0;let Sf=ju;class Dx extends Ji{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){We("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function yf(n,e,t,i){const s=Ix(i);switch(t){case Dp:return n*e;case Iu:return n*e/s.components*s.byteLength;case Lu:return n*e/s.components*s.byteLength;case ps:return n*e*2/s.components*s.byteLength;case Uu:return n*e*2/s.components*s.byteLength;case Ip:return n*e*3/s.components*s.byteLength;case Ln:return n*e*4/s.components*s.byteLength;case Nu:return n*e*4/s.components*s.byteLength;case sa:case ra:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case oa:case aa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fc:case pc:return Math.max(n,16)*Math.max(e,8)/4;case hc:case dc:return Math.max(n,8)*Math.max(e,8)/2;case mc:case gc:case xc:case vc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case _c:case _a:case Mc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Sc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case yc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case bc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ec:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Tc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case wc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ac:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Rc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Cc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Pc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Dc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ic:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Lc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Uc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Nc:case Fc:case Oc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Bc:case zc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case xa:case Hc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ix(n){switch(n){case pn:case Ap:return{byteLength:1,components:1};case $r:case Rp:case gn:return{byteLength:2,components:1};case Pu:case Du:return{byteLength:2,components:4};case ri:case Cu:case In:return{byteLength:4,components:1};case Cp:case Pp:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yu}}));typeof window<"u"&&(window.__THREE__?We("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yu);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Zp(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Lx(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((d,_)=>d.start-_.start);let f=0;for(let d=1;d<h.length;d++){const _=h[f],x=h[d];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++f,h[f]=x)}h.length=f+1;for(let d=0,_=h.length;d<_;d++){const x=h[d];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Ux=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nx=`#ifdef USE_ALPHAHASH
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
#endif`,Fx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ox=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hx=`#ifdef USE_AOMAP
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
#endif`,Vx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gx=`#ifdef USE_BATCHING
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
#endif`,kx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,qx=`#ifdef USE_IRIDESCENCE
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
#endif`,Kx=`#ifdef USE_BUMPMAP
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
#endif`,$x=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Zx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ev=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,tv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,nv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,iv=`#define PI 3.141592653589793
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
} // validated`,sv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rv=`vec3 transformedNormal = objectNormal;
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
#endif`,ov=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,av=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uv="gl_FragColor = linearToOutputTexel( gl_FragColor );",hv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fv=`#ifdef USE_ENVMAP
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
#endif`,dv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,pv=`#ifdef USE_ENVMAP
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
#endif`,mv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gv=`#ifdef USE_ENVMAP
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
#endif`,_v=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sv=`#ifdef USE_GRADIENTMAP
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
}`,yv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ev=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tv=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,wv=`#ifdef USE_ENVMAP
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
#endif`,Av=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dv=`PhysicalMaterial material;
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
#endif`,Iv=`uniform sampler2D dfgLUT;
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
}`,Lv=`
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
#endif`,Uv=`#if defined( RE_IndirectDiffuse )
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
#endif`,Nv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fv=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ov=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Wv=`#if defined( USE_POINTS_UV )
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
#endif`,Xv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$v=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zv=`#ifdef USE_MORPHTARGETS
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
#endif`,Jv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Qv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,eM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,iM=`#ifdef USE_NORMALMAP
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
#endif`,sM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,oM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,aM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,uM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_M=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vM=`float getShadowMask() {
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
}`,MM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,SM=`#ifdef USE_SKINNING
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
#endif`,yM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bM=`#ifdef USE_SKINNING
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
#endif`,EM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,TM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,AM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,RM=`#ifdef USE_TRANSMISSION
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
#endif`,CM=`#ifdef USE_TRANSMISSION
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
#endif`,PM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,DM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,IM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,LM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const UM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,NM=`uniform sampler2D t2D;
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
}`,FM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,OM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,BM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,HM=`#include <common>
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
}`,VM=`#if DEPTH_PACKING == 3200
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
}`,GM=`#define DISTANCE
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
}`,kM=`#define DISTANCE
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
}`,WM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,XM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,YM=`uniform float scale;
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
}`,qM=`uniform vec3 diffuse;
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
}`,KM=`#include <common>
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
}`,$M=`uniform vec3 diffuse;
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
}`,ZM=`#define LAMBERT
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
}`,JM=`#define LAMBERT
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
}`,jM=`#define MATCAP
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
}`,QM=`#define MATCAP
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
}`,eS=`#define NORMAL
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
}`,tS=`#define NORMAL
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
}`,nS=`#define PHONG
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
}`,iS=`#define PHONG
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
}`,sS=`#define STANDARD
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
}`,rS=`#define STANDARD
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
}`,oS=`#define TOON
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
}`,aS=`#define TOON
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
}`,lS=`uniform float size;
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
}`,cS=`uniform vec3 diffuse;
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
}`,uS=`#include <common>
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
}`,hS=`uniform vec3 color;
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
}`,fS=`uniform float rotation;
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
}`,dS=`uniform vec3 diffuse;
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
}`,Qe={alphahash_fragment:Ux,alphahash_pars_fragment:Nx,alphamap_fragment:Fx,alphamap_pars_fragment:Ox,alphatest_fragment:Bx,alphatest_pars_fragment:zx,aomap_fragment:Hx,aomap_pars_fragment:Vx,batching_pars_vertex:Gx,batching_vertex:kx,begin_vertex:Wx,beginnormal_vertex:Xx,bsdfs:Yx,iridescence_fragment:qx,bumpmap_pars_fragment:Kx,clipping_planes_fragment:$x,clipping_planes_pars_fragment:Zx,clipping_planes_pars_vertex:Jx,clipping_planes_vertex:jx,color_fragment:Qx,color_pars_fragment:ev,color_pars_vertex:tv,color_vertex:nv,common:iv,cube_uv_reflection_fragment:sv,defaultnormal_vertex:rv,displacementmap_pars_vertex:ov,displacementmap_vertex:av,emissivemap_fragment:lv,emissivemap_pars_fragment:cv,colorspace_fragment:uv,colorspace_pars_fragment:hv,envmap_fragment:fv,envmap_common_pars_fragment:dv,envmap_pars_fragment:pv,envmap_pars_vertex:mv,envmap_physical_pars_fragment:wv,envmap_vertex:gv,fog_vertex:_v,fog_pars_vertex:xv,fog_fragment:vv,fog_pars_fragment:Mv,gradientmap_pars_fragment:Sv,lightmap_pars_fragment:yv,lights_lambert_fragment:bv,lights_lambert_pars_fragment:Ev,lights_pars_begin:Tv,lights_toon_fragment:Av,lights_toon_pars_fragment:Rv,lights_phong_fragment:Cv,lights_phong_pars_fragment:Pv,lights_physical_fragment:Dv,lights_physical_pars_fragment:Iv,lights_fragment_begin:Lv,lights_fragment_maps:Uv,lights_fragment_end:Nv,lightprobes_pars_fragment:Fv,logdepthbuf_fragment:Ov,logdepthbuf_pars_fragment:Bv,logdepthbuf_pars_vertex:zv,logdepthbuf_vertex:Hv,map_fragment:Vv,map_pars_fragment:Gv,map_particle_fragment:kv,map_particle_pars_fragment:Wv,metalnessmap_fragment:Xv,metalnessmap_pars_fragment:Yv,morphinstance_vertex:qv,morphcolor_vertex:Kv,morphnormal_vertex:$v,morphtarget_pars_vertex:Zv,morphtarget_vertex:Jv,normal_fragment_begin:jv,normal_fragment_maps:Qv,normal_pars_fragment:eM,normal_pars_vertex:tM,normal_vertex:nM,normalmap_pars_fragment:iM,clearcoat_normal_fragment_begin:sM,clearcoat_normal_fragment_maps:rM,clearcoat_pars_fragment:oM,iridescence_pars_fragment:aM,opaque_fragment:lM,packing:cM,premultiplied_alpha_fragment:uM,project_vertex:hM,dithering_fragment:fM,dithering_pars_fragment:dM,roughnessmap_fragment:pM,roughnessmap_pars_fragment:mM,shadowmap_pars_fragment:gM,shadowmap_pars_vertex:_M,shadowmap_vertex:xM,shadowmask_pars_fragment:vM,skinbase_vertex:MM,skinning_pars_vertex:SM,skinning_vertex:yM,skinnormal_vertex:bM,specularmap_fragment:EM,specularmap_pars_fragment:TM,tonemapping_fragment:wM,tonemapping_pars_fragment:AM,transmission_fragment:RM,transmission_pars_fragment:CM,uv_pars_fragment:PM,uv_pars_vertex:DM,uv_vertex:IM,worldpos_vertex:LM,background_vert:UM,background_frag:NM,backgroundCube_vert:FM,backgroundCube_frag:OM,cube_vert:BM,cube_frag:zM,depth_vert:HM,depth_frag:VM,distance_vert:GM,distance_frag:kM,equirect_vert:WM,equirect_frag:XM,linedashed_vert:YM,linedashed_frag:qM,meshbasic_vert:KM,meshbasic_frag:$M,meshlambert_vert:ZM,meshlambert_frag:JM,meshmatcap_vert:jM,meshmatcap_frag:QM,meshnormal_vert:eS,meshnormal_frag:tS,meshphong_vert:nS,meshphong_frag:iS,meshphysical_vert:sS,meshphysical_frag:rS,meshtoon_vert:oS,meshtoon_frag:aS,points_vert:lS,points_frag:cS,shadow_vert:uS,shadow_frag:hS,sprite_vert:fS,sprite_frag:dS},Ee={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new Re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new O},probesMax:{value:new O},probesResolution:{value:new O}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new Re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Zn={basic:{uniforms:Qt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:Qt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new Ye(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:Qt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:Qt([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:Qt([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:Qt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:Qt([Ee.points,Ee.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:Qt([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:Qt([Ee.common,Ee.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:Qt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:Qt([Ee.sprite,Ee.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:Qt([Ee.common,Ee.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:Qt([Ee.lights,Ee.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Zn.physical={uniforms:Qt([Zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new Re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new Re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new Re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const Bo={r:0,b:0,g:0},pS=new dt,Jp=new Ke;Jp.set(-1,0,0,0,1,0,0,0,1);function mS(n,e,t,i,s,r){const o=new Ye(0);let a=s===!0?0:1,l,c,u=null,h=0,f=null;function d(y){let A=y.isScene===!0?y.background:null;if(A&&A.isTexture){const M=y.backgroundBlurriness>0;A=e.get(A,M)}return A}function _(y){let A=!1;const M=d(y);M===null?m(o,a):M&&M.isColor&&(m(M,1),A=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(y,A){const M=d(A);M&&(M.isCubeTexture||M.mapping===Na)?(c===void 0&&(c=new _e(new Ge(1,1,1),new Yt({name:"BackgroundCubeMaterial",uniforms:cr(Zn.backgroundCube.uniforms),vertexShader:Zn.backgroundCube.vertexShader,fragmentShader:Zn.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(pS.makeRotationFromEuler(A.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Jp),c.material.toneMapped=it.getTransfer(M.colorSpace)!==at,(u!==M||h!==M.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,h=M.version,f=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new _e(new Ot(2,2),new Yt({name:"BackgroundMaterial",uniforms:cr(Zn.background.uniforms),vertexShader:Zn.background.vertexShader,fragmentShader:Zn.background.fragmentShader,side:Ki,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=it.getTransfer(M.colorSpace)!==at,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||h!==M.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=M,h=M.version,f=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,A){y.getRGB(Bo,Xp(n)),t.buffers.color.setClear(Bo.r,Bo.g,Bo.b,A,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,A=1){o.set(y),a=A,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,m(o,a)},render:_,addToRenderList:x,dispose:p}}function gS(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(D,U,G,$,z){let Y=!1;const H=h(D,$,G,U);r!==H&&(r=H,c(r.object)),Y=d(D,$,G,z),Y&&_(D,$,G,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,M(D,U,G,$),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return n.createVertexArray()}function c(D){return n.bindVertexArray(D)}function u(D){return n.deleteVertexArray(D)}function h(D,U,G,$){const z=$.wireframe===!0;let Y=i[U.id];Y===void 0&&(Y={},i[U.id]=Y);const H=D.isInstancedMesh===!0?D.id:0;let Z=Y[H];Z===void 0&&(Z={},Y[H]=Z);let le=Z[G.id];le===void 0&&(le={},Z[G.id]=le);let ne=le[z];return ne===void 0&&(ne=f(l()),le[z]=ne),ne}function f(D){const U=[],G=[],$=[];for(let z=0;z<t;z++)U[z]=0,G[z]=0,$[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:G,attributeDivisors:$,object:D,attributes:{},index:null}}function d(D,U,G,$){const z=r.attributes,Y=U.attributes;let H=0;const Z=G.getAttributes();for(const le in Z)if(Z[le].location>=0){const oe=z[le];let pe=Y[le];if(pe===void 0&&(le==="instanceMatrix"&&D.instanceMatrix&&(pe=D.instanceMatrix),le==="instanceColor"&&D.instanceColor&&(pe=D.instanceColor)),oe===void 0||oe.attribute!==pe||pe&&oe.data!==pe.data)return!0;H++}return r.attributesNum!==H||r.index!==$}function _(D,U,G,$){const z={},Y=U.attributes;let H=0;const Z=G.getAttributes();for(const le in Z)if(Z[le].location>=0){let oe=Y[le];oe===void 0&&(le==="instanceMatrix"&&D.instanceMatrix&&(oe=D.instanceMatrix),le==="instanceColor"&&D.instanceColor&&(oe=D.instanceColor));const pe={};pe.attribute=oe,oe&&oe.data&&(pe.data=oe.data),z[le]=pe,H++}r.attributes=z,r.attributesNum=H,r.index=$}function x(){const D=r.newAttributes;for(let U=0,G=D.length;U<G;U++)D[U]=0}function m(D){p(D,0)}function p(D,U){const G=r.newAttributes,$=r.enabledAttributes,z=r.attributeDivisors;G[D]=1,$[D]===0&&(n.enableVertexAttribArray(D),$[D]=1),z[D]!==U&&(n.vertexAttribDivisor(D,U),z[D]=U)}function y(){const D=r.newAttributes,U=r.enabledAttributes;for(let G=0,$=U.length;G<$;G++)U[G]!==D[G]&&(n.disableVertexAttribArray(G),U[G]=0)}function A(D,U,G,$,z,Y,H){H===!0?n.vertexAttribIPointer(D,U,G,z,Y):n.vertexAttribPointer(D,U,G,$,z,Y)}function M(D,U,G,$){x();const z=$.attributes,Y=G.getAttributes(),H=U.defaultAttributeValues;for(const Z in Y){const le=Y[Z];if(le.location>=0){let ne=z[Z];if(ne===void 0&&(Z==="instanceMatrix"&&D.instanceMatrix&&(ne=D.instanceMatrix),Z==="instanceColor"&&D.instanceColor&&(ne=D.instanceColor)),ne!==void 0){const oe=ne.normalized,pe=ne.itemSize,Ze=e.get(ne);if(Ze===void 0)continue;const bt=Ze.buffer,rt=Ze.type,ee=Ze.bytesPerElement,xe=rt===n.INT||rt===n.UNSIGNED_INT||ne.gpuType===Cu;if(ne.isInterleavedBufferAttribute){const fe=ne.data,Xe=fe.stride,qe=ne.offset;if(fe.isInstancedInterleavedBuffer){for(let Ve=0;Ve<le.locationSize;Ve++)p(le.location+Ve,fe.meshPerAttribute);D.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let Ve=0;Ve<le.locationSize;Ve++)m(le.location+Ve);n.bindBuffer(n.ARRAY_BUFFER,bt);for(let Ve=0;Ve<le.locationSize;Ve++)A(le.location+Ve,pe/le.locationSize,rt,oe,Xe*ee,(qe+pe/le.locationSize*Ve)*ee,xe)}else{if(ne.isInstancedBufferAttribute){for(let fe=0;fe<le.locationSize;fe++)p(le.location+fe,ne.meshPerAttribute);D.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let fe=0;fe<le.locationSize;fe++)m(le.location+fe);n.bindBuffer(n.ARRAY_BUFFER,bt);for(let fe=0;fe<le.locationSize;fe++)A(le.location+fe,pe/le.locationSize,rt,oe,pe*ee,pe/le.locationSize*fe*ee,xe)}}else if(H!==void 0){const oe=H[Z];if(oe!==void 0)switch(oe.length){case 2:n.vertexAttrib2fv(le.location,oe);break;case 3:n.vertexAttrib3fv(le.location,oe);break;case 4:n.vertexAttrib4fv(le.location,oe);break;default:n.vertexAttrib1fv(le.location,oe)}}}}y()}function T(){w();for(const D in i){const U=i[D];for(const G in U){const $=U[G];for(const z in $){const Y=$[z];for(const H in Y)u(Y[H].object),delete Y[H];delete $[z]}}delete i[D]}}function E(D){if(i[D.id]===void 0)return;const U=i[D.id];for(const G in U){const $=U[G];for(const z in $){const Y=$[z];for(const H in Y)u(Y[H].object),delete Y[H];delete $[z]}}delete i[D.id]}function C(D){for(const U in i){const G=i[U];for(const $ in G){const z=G[$];if(z[D.id]===void 0)continue;const Y=z[D.id];for(const H in Y)u(Y[H].object),delete Y[H];delete z[D.id]}}}function v(D){for(const U in i){const G=i[U],$=D.isInstancedMesh===!0?D.id:0,z=G[$];if(z!==void 0){for(const Y in z){const H=z[Y];for(const Z in H)u(H[Z].object),delete H[Z];delete z[Y]}delete G[$],Object.keys(G).length===0&&delete i[U]}}}function w(){L(),o=!0,r!==s&&(r=s,c(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:w,resetDefaultState:L,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function _S(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function o(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let f=0;for(let d=0;d<u;d++)f+=c[d];t.update(f,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function xS(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==Ln&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const v=C===gn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==pn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==In&&!v)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(We("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&We("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:A,maxFragmentUniforms:M,maxSamples:T,samples:E}}function vS(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new Gi,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||s;return s=f,i=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const _=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!s||_===null||_.length===0||r&&!m)r?u(null):c();else{const y=r?0:i,A=y*4;let M=p.clippingState||null;l.value=M,M=u(_,f,A,d);for(let T=0;T!==A;++T)M[T]=t[T];p.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,d,_){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=l.value,_!==!0||m===null){const p=d+x*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let A=0,M=d;A!==x;++A,M+=4)o.copy(h[A]).applyMatrix4(y,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}const Yi=4,bf=[.125,.215,.35,.446,.526,.582],as=20,MS=256,wr=new ro,Ef=new Ye;let Cl=null,Pl=0,Dl=0,Il=!1;const SS=new O;class Xc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:a=SS}=r;Cl=this._renderer.getRenderTarget(),Pl=this._renderer.getActiveCubeFace(),Dl=this._renderer.getActiveMipmapLevel(),Il=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Af(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Cl,Pl,Dl),this._renderer.xr.enabled=Il,e.scissorTest=!1,Vs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ds||e.mapping===ar?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Cl=this._renderer.getRenderTarget(),Pl=this._renderer.getActiveCubeFace(),Dl=this._renderer.getActiveMipmapLevel(),Il=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Xt,minFilter:Xt,generateMipmaps:!1,type:gn,format:Ln,colorSpace:va,depthBuffer:!1},s=Tf(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tf(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=yS(r)),this._blurMaterial=ES(r,e,t),this._ggxMaterial=bS(r,e,t)}return s}_compileMaterial(e){const t=new _e(new Bt,e);this._renderer.compile(t,wr)}_sceneToCubeUV(e,t,i,s,r){const l=new yn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Ef),h.toneMapping=ni,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new _e(new Ge,new oi({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let p=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,p=!0):(m.color.copy(Ef),p=!0);for(let A=0;A<6;A++){const M=A%3;M===0?(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[A],r.y,r.z)):M===1?(l.up.set(0,0,c[A]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[A],r.z)):(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[A]));const T=this._cubeSize;Vs(s,M*T,A>2?T:0,T,T),h.setRenderTarget(s),p&&h.render(x,l),h.render(e,l)}h.toneMapping=d,h.autoClear=f,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ds||e.mapping===ar;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Af()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wf());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Vs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,wr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),f=0+c*1.25,d=h*f,{_lodMax:_}=this,x=this._sizeLods[i],m=3*x*(i>_-Yi?i-_+Yi:0),p=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=_-t,Vs(r,m,p,3*x,2*x),s.setRenderTarget(r),s.render(a,wr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=_-i,Vs(e,m,p,3*x,2*x),s.setRenderTarget(e),s.render(a,wr)}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&st("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[s];h.material=c;const f=c.uniforms,d=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*as-1),x=r/_,m=isFinite(r)?1+Math.floor(u*x):as;m>as&&We(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${as}`);const p=[];let y=0;for(let C=0;C<as;++C){const v=C/x,w=Math.exp(-v*v/2);p.push(w),C===0?y+=w:C<m&&(y+=2*w)}for(let C=0;C<p.length;C++)p[C]=p[C]/y;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:A}=this;f.dTheta.value=_,f.mipInt.value=A-i;const M=this._sizeLods[s],T=3*M*(s>A-Yi?s-A+Yi:0),E=4*(this._cubeSize-M);Vs(t,T,E,3*M,2*M),l.setRenderTarget(t),l.render(h,wr)}}function yS(n){const e=[],t=[],i=[];let s=n;const r=n-Yi+1+bf.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Yi?l=bf[o-n+Yi-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,_=6,x=3,m=2,p=1,y=new Float32Array(x*_*d),A=new Float32Array(m*_*d),M=new Float32Array(p*_*d);for(let E=0;E<d;E++){const C=E%3*2/3-1,v=E>2?0:-1,w=[C,v,0,C+2/3,v,0,C+2/3,v+1,0,C,v,0,C+2/3,v+1,0,C,v+1,0];y.set(w,x*_*E),A.set(f,m*_*E);const L=[E,E,E,E,E,E];M.set(L,p*_*E)}const T=new Bt;T.setAttribute("position",new _n(y,x)),T.setAttribute("uv",new _n(A,m)),T.setAttribute("faceIndex",new _n(M,p)),i.push(new _e(T,null)),s>Yi&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Tf(n,e,t){const i=new ln(n,e,t);return i.texture.mapping=Na,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Vs(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function bS(n,e,t){return new Yt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:MS,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ha(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function ES(n,e,t){const i=new Float32Array(as),s=new O(0,1,0);return new Yt({name:"SphericalGaussianBlur",defines:{n:as,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ha(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function wf(){return new Yt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ha(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Af(){return new Yt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ha(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Ha(){return`

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
	`}class jp extends ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new kp(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ge(5,5,5),r=new Yt({name:"CubemapFromEquirect",uniforms:cr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:an,blending:ti});r.uniforms.tEquirect.value=t;const o=new _e(s,r),a=t.minFilter;return t.minFilter===ls&&(t.minFilter=Xt),new Tx(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}function TS(n){let e=new WeakMap,t=new WeakMap,i=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===ia||d===nl)if(e.has(f)){const _=e.get(f).texture;return a(_,f.mapping)}else{const _=f.image;if(_&&_.height>0){const x=new jp(_.height);return x.fromEquirectangularTexture(n,f),e.set(f,x),f.addEventListener("dispose",c),a(x.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const d=f.mapping,_=d===ia||d===nl,x=d===ds||d===ar;if(_||x){let m=t.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return i===null&&(i=new Xc(n)),m=_?i.fromEquirectangular(f,m):i.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{const y=f.image;return _&&y&&y.height>0||x&&y&&l(y)?(i===null&&(i=new Xc(n)),m=_?i.fromEquirectangular(f):i.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function a(f,d){return d===ia?f.mapping=ds:d===nl&&(f.mapping=ar),f}function l(f){let d=0;const _=6;for(let x=0;x<_;x++)f[x]!==void 0&&d++;return d===_}function c(f){const d=f.target;d.removeEventListener("dispose",c);const _=e.get(d);_!==void 0&&(e.delete(d),_.dispose())}function u(f){const d=f.target;d.removeEventListener("dispose",u);const _=t.get(d);_!==void 0&&(t.delete(d),_.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function wS(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&nr("WebGLRenderer: "+i+" extension not supported."),s}}}function AS(n,e,t,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)e.update(f[d],n.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,_=h.attributes.position;let x=0;if(_===void 0)return;if(d!==null){const y=d.array;x=d.version;for(let A=0,M=y.length;A<M;A+=3){const T=y[A+0],E=y[A+1],C=y[A+2];f.push(T,E,E,C,C,T)}}else{const y=_.array;x=_.version;for(let A=0,M=y.length/3-1;A<M;A+=3){const T=A+0,E=A+1,C=A+2;f.push(T,E,E,C,C,T)}}const m=new(_.count>=65535?Bp:Op)(f,1);m.version=x;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function RS(n,e,t){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,f){n.drawElements(i,f,r,h*o),t.update(f,i,1)}function c(h,f,d){d!==0&&(n.drawElementsInstanced(i,f,r,h*o,d),t.update(f,i,d))}function u(h,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,h,0,d);let x=0;for(let m=0;m<d;m++)x+=f[m];t.update(x,i,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function CS(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:st("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function PS(n,e,t){const i=new WeakMap,s=new Et;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let L=function(){v.dispose(),i.delete(a),a.removeEventListener("dispose",L)};var d=L;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],A=a.morphAttributes.color||[];let M=0;_===!0&&(M=1),x===!0&&(M=2),m===!0&&(M=3);let T=a.attributes.position.count*M,E=1;T>e.maxTextureSize&&(E=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const C=new Float32Array(T*E*4*h),v=new Np(C,T,E,h);v.type=In,v.needsUpdate=!0;const w=M*4;for(let D=0;D<h;D++){const U=p[D],G=y[D],$=A[D],z=T*E*4*D;for(let Y=0;Y<U.count;Y++){const H=Y*w;_===!0&&(s.fromBufferAttribute(U,Y),C[z+H+0]=s.x,C[z+H+1]=s.y,C[z+H+2]=s.z,C[z+H+3]=0),x===!0&&(s.fromBufferAttribute(G,Y),C[z+H+4]=s.x,C[z+H+5]=s.y,C[z+H+6]=s.z,C[z+H+7]=0),m===!0&&(s.fromBufferAttribute($,Y),C[z+H+8]=s.x,C[z+H+9]=s.y,C[z+H+10]=s.z,C[z+H+11]=$.itemSize===4?s.w:1)}}f={count:h,texture:v,size:new Re(T,E)},i.set(a,f),a.addEventListener("dispose",L)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const x=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function DS(n,e,t,i,s){let r=new WeakMap;function o(c){const u=s.render.frame,h=c.geometry,f=e.get(c,h);if(r.get(f)!==u&&(e.update(f),r.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return f}function a(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}const IS={[bu]:"LINEAR_TONE_MAPPING",[Eu]:"REINHARD_TONE_MAPPING",[Tu]:"CINEON_TONE_MAPPING",[Ua]:"ACES_FILMIC_TONE_MAPPING",[Au]:"AGX_TONE_MAPPING",[Ru]:"NEUTRAL_TONE_MAPPING",[wu]:"CUSTOM_TONE_MAPPING"};function LS(n,e,t,i,s,r){const o=new ln(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new lr(e,t):void 0}),a=new ln(e,t,{type:gn,depthBuffer:!1,stencilBuffer:!1}),l=new Bt;l.setAttribute("position",new yt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new yt([0,2,0,0,2,0],2));const c=new Yp({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new _e(l,c),h=new ro(-1,1,1,-1,0,1);let f=null,d=null,_=!1,x,m=null,p=[],y=!1;this.setSize=function(A,M){o.setSize(A,M),a.setSize(A,M);for(let T=0;T<p.length;T++){const E=p[T];E.setSize&&E.setSize(A,M)}},this.setEffects=function(A){p=A,y=p.length>0&&p[0].isRenderPass===!0;const M=o.width,T=o.height;for(let E=0;E<p.length;E++){const C=p[E];C.setSize&&C.setSize(M,T)}},this.begin=function(A,M){if(_||A.toneMapping===ni&&p.length===0)return!1;if(m=M,M!==null){const T=M.width,E=M.height;(o.width!==T||o.height!==E)&&this.setSize(T,E)}return y===!1&&A.setRenderTarget(o),x=A.toneMapping,A.toneMapping=ni,!0},this.hasRenderPass=function(){return y},this.end=function(A,M){A.toneMapping=x,_=!0;let T=o,E=a;for(let C=0;C<p.length;C++){const v=p[C];if(v.enabled!==!1&&(v.render(A,E,T,M),v.needsSwap!==!1)){const w=T;T=E,E=w}}if(f!==A.outputColorSpace||d!==A.toneMapping){f=A.outputColorSpace,d=A.toneMapping,c.defines={},it.getTransfer(f)===at&&(c.defines.SRGB_TRANSFER="");const C=IS[d];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,A.setRenderTarget(m),A.render(u,h),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}const Qp=new Kt,Yc=new lr(1,1),em=new Np,tm=new K_,nm=new kp,Rf=[],Cf=[],Pf=new Float32Array(16),Df=new Float32Array(9),If=new Float32Array(4);function dr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Rf[s];if(r===void 0&&(r=new Float32Array(s),Rf[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Ut(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Nt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Va(n,e){let t=Cf[e];t===void 0&&(t=new Int32Array(e),Cf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function US(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function NS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2fv(this.addr,e),Nt(t,e)}}function FS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;n.uniform3fv(this.addr,e),Nt(t,e)}}function OS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4fv(this.addr,e),Nt(t,e)}}function BS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;If.set(i),n.uniformMatrix2fv(this.addr,!1,If),Nt(t,i)}}function zS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;Df.set(i),n.uniformMatrix3fv(this.addr,!1,Df),Nt(t,i)}}function HS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;Pf.set(i),n.uniformMatrix4fv(this.addr,!1,Pf),Nt(t,i)}}function VS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function GS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2iv(this.addr,e),Nt(t,e)}}function kS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3iv(this.addr,e),Nt(t,e)}}function WS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4iv(this.addr,e),Nt(t,e)}}function XS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function YS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2uiv(this.addr,e),Nt(t,e)}}function qS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3uiv(this.addr,e),Nt(t,e)}}function KS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4uiv(this.addr,e),Nt(t,e)}}function $S(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Yc.compareFunction=t.isReversedDepthBuffer()?Ou:Fu,r=Yc):r=Qp,t.setTexture2D(e||r,s)}function ZS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||tm,s)}function JS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||nm,s)}function jS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||em,s)}function QS(n){switch(n){case 5126:return US;case 35664:return NS;case 35665:return FS;case 35666:return OS;case 35674:return BS;case 35675:return zS;case 35676:return HS;case 5124:case 35670:return VS;case 35667:case 35671:return GS;case 35668:case 35672:return kS;case 35669:case 35673:return WS;case 5125:return XS;case 36294:return YS;case 36295:return qS;case 36296:return KS;case 35678:case 36198:case 36298:case 36306:case 35682:return $S;case 35679:case 36299:case 36307:return ZS;case 35680:case 36300:case 36308:case 36293:return JS;case 36289:case 36303:case 36311:case 36292:return jS}}function ey(n,e){n.uniform1fv(this.addr,e)}function ty(n,e){const t=dr(e,this.size,2);n.uniform2fv(this.addr,t)}function ny(n,e){const t=dr(e,this.size,3);n.uniform3fv(this.addr,t)}function iy(n,e){const t=dr(e,this.size,4);n.uniform4fv(this.addr,t)}function sy(n,e){const t=dr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function ry(n,e){const t=dr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function oy(n,e){const t=dr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function ay(n,e){n.uniform1iv(this.addr,e)}function ly(n,e){n.uniform2iv(this.addr,e)}function cy(n,e){n.uniform3iv(this.addr,e)}function uy(n,e){n.uniform4iv(this.addr,e)}function hy(n,e){n.uniform1uiv(this.addr,e)}function fy(n,e){n.uniform2uiv(this.addr,e)}function dy(n,e){n.uniform3uiv(this.addr,e)}function py(n,e){n.uniform4uiv(this.addr,e)}function my(n,e,t){const i=this.cache,s=e.length,r=Va(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Yc:o=Qp;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function gy(n,e,t){const i=this.cache,s=e.length,r=Va(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||tm,r[o])}function _y(n,e,t){const i=this.cache,s=e.length,r=Va(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||nm,r[o])}function xy(n,e,t){const i=this.cache,s=e.length,r=Va(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||em,r[o])}function vy(n){switch(n){case 5126:return ey;case 35664:return ty;case 35665:return ny;case 35666:return iy;case 35674:return sy;case 35675:return ry;case 35676:return oy;case 5124:case 35670:return ay;case 35667:case 35671:return ly;case 35668:case 35672:return cy;case 35669:case 35673:return uy;case 5125:return hy;case 36294:return fy;case 36295:return dy;case 36296:return py;case 35678:case 36198:case 36298:case 36306:case 35682:return my;case 35679:case 36299:case 36307:return gy;case 35680:case 36300:case 36308:case 36293:return _y;case 36289:case 36303:case 36311:case 36292:return xy}}class My{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=QS(t.type)}}class Sy{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=vy(t.type)}}class yy{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const Ll=/(\w+)(\])?(\[|\.)?/g;function Lf(n,e){n.seq.push(e),n.map[e.id]=e}function by(n,e,t){const i=n.name,s=i.length;for(Ll.lastIndex=0;;){const r=Ll.exec(i),o=Ll.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Lf(t,c===void 0?new My(a,n,e):new Sy(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new yy(a),Lf(t,h)),t=h}}}class la{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);by(a,l,this)}const s=[],r=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Uf(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Ey=37297;let Ty=0;function wy(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Nf=new Ke;function Ay(n){it._getMatrix(Nf,it.workingColorSpace,n);const e=`mat3( ${Nf.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(n)){case Ma:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return We("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ff(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+wy(n.getShaderSource(e),a)}else return r}function Ry(n,e){const t=Ay(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Cy={[bu]:"Linear",[Eu]:"Reinhard",[Tu]:"Cineon",[Ua]:"ACESFilmic",[Au]:"AgX",[Ru]:"Neutral",[wu]:"Custom"};function Py(n,e){const t=Cy[e];return t===void 0?(We("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const zo=new O;function Dy(){it.getLuminanceCoefficients(zo);const n=zo.x.toFixed(4),e=zo.y.toFixed(4),t=zo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Iy(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lr).join(`
`)}function Ly(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Uy(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Lr(n){return n!==""}function Of(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bf(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ny=/^[ \t]*#include +<([\w\d./]+)>/gm;function qc(n){return n.replace(Ny,Oy)}const Fy=new Map;function Oy(n,e){let t=Qe[e];if(t===void 0){const i=Fy.get(e);if(i!==void 0)t=Qe[i],We('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return qc(t)}const By=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zf(n){return n.replace(By,zy)}function zy(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Hf(n){let e=`precision ${n.precision} float;
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
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Hy={[na]:"SHADOWMAP_TYPE_PCF",[Ir]:"SHADOWMAP_TYPE_VSM"};function Vy(n){return Hy[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Gy={[ds]:"ENVMAP_TYPE_CUBE",[ar]:"ENVMAP_TYPE_CUBE",[Na]:"ENVMAP_TYPE_CUBE_UV"};function ky(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Gy[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Wy={[ar]:"ENVMAP_MODE_REFRACTION"};function Xy(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Wy[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Yy={[Tp]:"ENVMAP_BLENDING_MULTIPLY",[f_]:"ENVMAP_BLENDING_MIX",[d_]:"ENVMAP_BLENDING_ADD"};function qy(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Yy[n.combine]||"ENVMAP_BLENDING_NONE"}function Ky(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function $y(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Vy(t),c=ky(t),u=Xy(t),h=qy(t),f=Ky(t),d=Iy(t),_=Ly(r),x=s.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Lr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Lr).join(`
`),p.length>0&&(p+=`
`)):(m=[Hf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lr).join(`
`),p=[Hf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ni?"#define TONE_MAPPING":"",t.toneMapping!==ni?Qe.tonemapping_pars_fragment:"",t.toneMapping!==ni?Py("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,Ry("linearToOutputTexel",t.outputColorSpace),Dy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lr).join(`
`)),o=qc(o),o=Of(o,t),o=Bf(o,t),a=qc(a),a=Of(a,t),a=Bf(a,t),o=zf(o),a=zf(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Gh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Gh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const A=y+m+o,M=y+p+a,T=Uf(s,s.VERTEX_SHADER,A),E=Uf(s,s.FRAGMENT_SHADER,M);s.attachShader(x,T),s.attachShader(x,E),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function C(D){if(n.debug.checkShaderErrors){const U=s.getProgramInfoLog(x)||"",G=s.getShaderInfoLog(T)||"",$=s.getShaderInfoLog(E)||"",z=U.trim(),Y=G.trim(),H=$.trim();let Z=!0,le=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,T,E);else{const ne=Ff(s,T,"vertex"),oe=Ff(s,E,"fragment");st("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+z+`
`+ne+`
`+oe)}else z!==""?We("WebGLProgram: Program Info Log:",z):(Y===""||H==="")&&(le=!1);le&&(D.diagnostics={runnable:Z,programLog:z,vertexShader:{log:Y,prefix:m},fragmentShader:{log:H,prefix:p}})}s.deleteShader(T),s.deleteShader(E),v=new la(s,x),w=Uy(s,x)}let v;this.getUniforms=function(){return v===void 0&&C(this),v};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(x,Ey)),L},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ty++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=E,this}let Zy=0;class Jy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new jy(e),t.set(e,i)),i}}class jy{constructor(e){this.id=Zy++,this.code=e,this.usedTimes=0}}function Qy(n){return n===ps||n===_a||n===xa}function eb(n,e,t,i,s,r){const o=new Hu,a=new Jy,l=new Set,c=[],u=new Map,h=i.logarithmicDepthBuffer;let f=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,w,L,D,U,G){const $=D.fog,z=U.geometry,Y=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?D.environment:null,H=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,Z=e.get(v.envMap||Y,H),le=Z&&Z.mapping===Na?Z.image.height:null,ne=d[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),f!==v.precision&&We("WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const oe=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,pe=oe!==void 0?oe.length:0;let Ze=0;z.morphAttributes.position!==void 0&&(Ze=1),z.morphAttributes.normal!==void 0&&(Ze=2),z.morphAttributes.color!==void 0&&(Ze=3);let bt,rt,ee,xe;if(ne){const Ne=Zn[ne];bt=Ne.vertexShader,rt=Ne.fragmentShader}else{bt=v.vertexShader,rt=v.fragmentShader;const Ne=a.getVertexShaderStage(v),Tt=a.getFragmentShaderStage(v);a.update(v,Ne,Tt),ee=Ne.id,xe=Tt.id}const fe=n.getRenderTarget(),Xe=n.state.buffers.depth.getReversed(),qe=U.isInstancedMesh===!0,Ve=U.isBatchedMesh===!0,P=!!v.map,I=!!v.matcap,X=!!Z,Q=!!v.aoMap,J=!!v.lightMap,se=!!v.bumpMap&&v.wireframe===!1,de=!!v.normalMap,ue=!!v.displacementMap,ce=!!v.emissiveMap,te=!!v.metalnessMap,Ce=!!v.roughnessMap,R=v.anisotropy>0,Pe=v.clearcoat>0,be=v.dispersion>0,b=v.iridescence>0,g=v.sheen>0,N=v.transmission>0,V=R&&!!v.anisotropyMap,K=Pe&&!!v.clearcoatMap,he=Pe&&!!v.clearcoatNormalMap,ge=Pe&&!!v.clearcoatRoughnessMap,j=b&&!!v.iridescenceMap,ie=b&&!!v.iridescenceThicknessMap,me=g&&!!v.sheenColorMap,De=g&&!!v.sheenRoughnessMap,Se=!!v.specularMap,ve=!!v.specularColorMap,He=!!v.specularIntensityMap,ke=N&&!!v.transmissionMap,Je=N&&!!v.thicknessMap,F=!!v.gradientMap,Me=!!v.alphaMap,re=v.alphaTest>0,ye=!!v.alphaHash,Ae=!!v.extensions;let ae=ni;v.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(ae=n.toneMapping);const Oe={shaderID:ne,shaderType:v.type,shaderName:v.name,vertexShader:bt,fragmentShader:rt,defines:v.defines,customVertexShaderID:ee,customFragmentShaderID:xe,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:Ve,batchingColor:Ve&&U._colorsTexture!==null,instancing:qe,instancingColor:qe&&U.instanceColor!==null,instancingMorph:qe&&U.morphTexture!==null,outputColorSpace:fe===null?n.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:it.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:P,matcap:I,envMap:X,envMapMode:X&&Z.mapping,envMapCubeUVHeight:le,aoMap:Q,lightMap:J,bumpMap:se,normalMap:de,displacementMap:ue,emissiveMap:ce,normalMapObjectSpace:de&&v.normalMapType===g_,normalMapTangentSpace:de&&v.normalMapType===Vc,packedNormalMap:de&&v.normalMapType===Vc&&Qy(v.normalMap.format),metalnessMap:te,roughnessMap:Ce,anisotropy:R,anisotropyMap:V,clearcoat:Pe,clearcoatMap:K,clearcoatNormalMap:he,clearcoatRoughnessMap:ge,dispersion:be,iridescence:b,iridescenceMap:j,iridescenceThicknessMap:ie,sheen:g,sheenColorMap:me,sheenRoughnessMap:De,specularMap:Se,specularColorMap:ve,specularIntensityMap:He,transmission:N,transmissionMap:ke,thicknessMap:Je,gradientMap:F,opaque:v.transparent===!1&&v.blending===tr&&v.alphaToCoverage===!1,alphaMap:Me,alphaTest:re,alphaHash:ye,combine:v.combine,mapUv:P&&_(v.map.channel),aoMapUv:Q&&_(v.aoMap.channel),lightMapUv:J&&_(v.lightMap.channel),bumpMapUv:se&&_(v.bumpMap.channel),normalMapUv:de&&_(v.normalMap.channel),displacementMapUv:ue&&_(v.displacementMap.channel),emissiveMapUv:ce&&_(v.emissiveMap.channel),metalnessMapUv:te&&_(v.metalnessMap.channel),roughnessMapUv:Ce&&_(v.roughnessMap.channel),anisotropyMapUv:V&&_(v.anisotropyMap.channel),clearcoatMapUv:K&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:he&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:me&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:De&&_(v.sheenRoughnessMap.channel),specularMapUv:Se&&_(v.specularMap.channel),specularColorMapUv:ve&&_(v.specularColorMap.channel),specularIntensityMapUv:He&&_(v.specularIntensityMap.channel),transmissionMapUv:ke&&_(v.transmissionMap.channel),thicknessMapUv:Je&&_(v.thicknessMap.channel),alphaMapUv:Me&&_(v.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(de||R),vertexNormals:!!z.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!z.attributes.uv&&(P||Me),fog:!!$,useFog:v.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||z.attributes.normal===void 0&&de===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Xe,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:Ze,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:ae,decodeVideoTexture:P&&v.map.isVideoTexture===!0&&it.getTransfer(v.map.colorSpace)===at,decodeVideoTextureEmissive:ce&&v.emissiveMap.isVideoTexture===!0&&it.getTransfer(v.emissiveMap.colorSpace)===at,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===nn,flipSided:v.side===an,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ae&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ae&&v.extensions.multiDraw===!0||Ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Oe.vertexUv1s=l.has(1),Oe.vertexUv2s=l.has(2),Oe.vertexUv3s=l.has(3),l.clear(),Oe}function m(v){const w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(const L in v.defines)w.push(L),w.push(v.defines[L]);return v.isRawShaderMaterial===!1&&(p(w,v),y(w,v),w.push(n.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function p(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function y(v,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),w.packedNormalMap&&o.enable(22),w.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),w.numLightProbeGrids>0&&o.enable(22),w.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function A(v){const w=d[v.type];let L;if(w){const D=Zn[w];L=Qr.clone(D.uniforms)}else L=v.uniforms;return L}function M(v,w){let L=u.get(w);return L!==void 0?++L.usedTimes:(L=new $y(n,w,v,s),c.push(L),u.set(w,L)),L}function T(v){if(--v.usedTimes===0){const w=c.indexOf(v);c[w]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function E(v){a.remove(v)}function C(){a.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:A,acquireProgram:M,releaseProgram:T,releaseShaderCache:E,programs:c,dispose:C}}function tb(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function nb(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Vf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Gf(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,_,x,m,p){let y=n[e];return y===void 0?(y={id:f.id,object:f,geometry:d,material:_,materialVariant:o(f),groupOrder:x,renderOrder:f.renderOrder,z:m,group:p},n[e]=y):(y.id=f.id,y.object=f,y.geometry=d,y.material=_,y.materialVariant=o(f),y.groupOrder=x,y.renderOrder=f.renderOrder,y.z=m,y.group=p),e++,y}function l(f,d,_,x,m,p){const y=a(f,d,_,x,m,p);_.transmission>0?i.push(y):_.transparent===!0?s.push(y):t.push(y)}function c(f,d,_,x,m,p){const y=a(f,d,_,x,m,p);_.transmission>0?i.unshift(y):_.transparent===!0?s.unshift(y):t.unshift(y)}function u(f,d,_){t.length>1&&t.sort(f||nb),i.length>1&&i.sort(d||Vf),s.length>1&&s.sort(d||Vf),_&&(t.reverse(),i.reverse(),s.reverse())}function h(){for(let f=e,d=n.length;f<d;f++){const _=n[f];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:h,sort:u}}function ib(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new Gf,n.set(i,[o])):s>=r.length?(o=new Gf,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function sb(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Ye};break;case"SpotLight":t={position:new O,direction:new O,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new O,halfWidth:new O,halfHeight:new O};break}return n[e.id]=t,t}}}function rb(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let ob=0;function ab(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function lb(n){const e=new sb,t=rb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const s=new O,r=new dt,o=new dt;function a(c){let u=0,h=0,f=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let d=0,_=0,x=0,m=0,p=0,y=0,A=0,M=0,T=0,E=0,C=0;c.sort(ab);for(let w=0,L=c.length;w<L;w++){const D=c[w],U=D.color,G=D.intensity,$=D.distance;let z=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===ps?z=D.shadow.map.texture:z=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=U.r*G,h+=U.g*G,f+=U.b*G;else if(D.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(D.sh.coefficients[Y],G);C++}else if(D.isDirectionalLight){const Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const H=D.shadow,Z=t.get(D);Z.shadowIntensity=H.intensity,Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,i.directionalShadow[d]=Z,i.directionalShadowMap[d]=z,i.directionalShadowMatrix[d]=D.shadow.matrix,y++}i.directional[d]=Y,d++}else if(D.isSpotLight){const Y=e.get(D);Y.position.setFromMatrixPosition(D.matrixWorld),Y.color.copy(U).multiplyScalar(G),Y.distance=$,Y.coneCos=Math.cos(D.angle),Y.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Y.decay=D.decay,i.spot[x]=Y;const H=D.shadow;if(D.map&&(i.spotLightMap[T]=D.map,T++,H.updateMatrices(D),D.castShadow&&E++),i.spotLightMatrix[x]=H.matrix,D.castShadow){const Z=t.get(D);Z.shadowIntensity=H.intensity,Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,i.spotShadow[x]=Z,i.spotShadowMap[x]=z,M++}x++}else if(D.isRectAreaLight){const Y=e.get(D);Y.color.copy(U).multiplyScalar(G),Y.halfWidth.set(D.width*.5,0,0),Y.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=Y,m++}else if(D.isPointLight){const Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),Y.distance=D.distance,Y.decay=D.decay,D.castShadow){const H=D.shadow,Z=t.get(D);Z.shadowIntensity=H.intensity,Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,Z.shadowCameraNear=H.camera.near,Z.shadowCameraFar=H.camera.far,i.pointShadow[_]=Z,i.pointShadowMap[_]=z,i.pointShadowMatrix[_]=D.shadow.matrix,A++}i.point[_]=Y,_++}else if(D.isHemisphereLight){const Y=e.get(D);Y.skyColor.copy(D.color).multiplyScalar(G),Y.groundColor.copy(D.groundColor).multiplyScalar(G),i.hemi[p]=Y,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ee.LTC_FLOAT_1,i.rectAreaLTC2=Ee.LTC_FLOAT_2):(i.rectAreaLTC1=Ee.LTC_HALF_1,i.rectAreaLTC2=Ee.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const v=i.hash;(v.directionalLength!==d||v.pointLength!==_||v.spotLength!==x||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==y||v.numPointShadows!==A||v.numSpotShadows!==M||v.numSpotMaps!==T||v.numLightProbes!==C)&&(i.directional.length=d,i.spot.length=x,i.rectArea.length=m,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=M+T-E,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=C,v.directionalLength=d,v.pointLength=_,v.spotLength=x,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=y,v.numPointShadows=A,v.numSpotShadows=M,v.numSpotMaps=T,v.numLightProbes=C,i.version=ob++)}function l(c,u){let h=0,f=0,d=0,_=0,x=0;const m=u.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const A=c[p];if(A.isDirectionalLight){const M=i.directional[h];M.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),h++}else if(A.isSpotLight){const M=i.spot[d];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(A.isRectAreaLight){const M=i.rectArea[_];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(A.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(A.width*.5,0,0),M.halfHeight.set(0,A.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),_++}else if(A.isPointLight){const M=i.point[f];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(m),f++}else if(A.isHemisphereLight){const M=i.hemi[x];M.direction.setFromMatrixPosition(A.matrixWorld),M.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function kf(n){const e=new lb(n),t=[],i=[],s=[];function r(f){h.camera=f,t.length=0,i.length=0,s.length=0}function o(f){t.push(f)}function a(f){i.push(f)}function l(f){s.push(f)}function c(){e.setup(t)}function u(f){e.setupView(t,f)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function cb(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new kf(n),e.set(s,[a])):r>=o.length?(a=new kf(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const ub=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hb=`uniform sampler2D shadow_pass;
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
}`,fb=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],db=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],Wf=new dt,Ar=new O,Ul=new O;function pb(n,e,t){let i=new Gu;const s=new Re,r=new Re,o=new Et,a=new Mx,l=new Sx,c={},u=t.maxTextureSize,h={[Ki]:an,[an]:Ki,[nn]:nn},f=new Yt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Re},radius:{value:4}},vertexShader:ub,fragmentShader:hb}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const _=new Bt;_.setAttribute("position",new _n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new _e(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=na;let p=this.type;this.render=function(E,C,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===q0&&(We("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=na);const w=n.getRenderTarget(),L=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),U=n.state;U.setBlending(ti),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const G=p!==this.type;G&&C.traverse(function($){$.material&&(Array.isArray($.material)?$.material.forEach(z=>z.needsUpdate=!0):$.material.needsUpdate=!0)});for(let $=0,z=E.length;$<z;$++){const Y=E[$],H=Y.shadow;if(H===void 0){We("WebGLShadowMap:",Y,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const Z=H.getFrameExtents();s.multiply(Z),r.copy(H.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Z.x),s.x=r.x*Z.x,H.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Z.y),s.y=r.y*Z.y,H.mapSize.y=r.y));const le=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=le,H.map===null||G===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Ir){if(Y.isPointLight){We("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new ln(s.x,s.y,{format:ps,type:gn,minFilter:Xt,magFilter:Xt,generateMipmaps:!1}),H.map.texture.name=Y.name+".shadowMap",H.map.depthTexture=new lr(s.x,s.y,In),H.map.depthTexture.name=Y.name+".shadowMapDepth",H.map.depthTexture.format=wi,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=zt,H.map.depthTexture.magFilter=zt}else Y.isPointLight?(H.map=new jp(s.x),H.map.depthTexture=new gx(s.x,ri)):(H.map=new ln(s.x,s.y),H.map.depthTexture=new lr(s.x,s.y,ri)),H.map.depthTexture.name=Y.name+".shadowMap",H.map.depthTexture.format=wi,this.type===na?(H.map.depthTexture.compareFunction=le?Ou:Fu,H.map.depthTexture.minFilter=Xt,H.map.depthTexture.magFilter=Xt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=zt,H.map.depthTexture.magFilter=zt);H.camera.updateProjectionMatrix()}const ne=H.map.isWebGLCubeRenderTarget?6:1;for(let oe=0;oe<ne;oe++){if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,oe),n.clear();else{oe===0&&(n.setRenderTarget(H.map),n.clear());const pe=H.getViewport(oe);o.set(r.x*pe.x,r.y*pe.y,r.x*pe.z,r.y*pe.w),U.viewport(o)}if(Y.isPointLight){const pe=H.camera,Ze=H.matrix,bt=Y.distance||pe.far;bt!==pe.far&&(pe.far=bt,pe.updateProjectionMatrix()),Ar.setFromMatrixPosition(Y.matrixWorld),pe.position.copy(Ar),Ul.copy(pe.position),Ul.add(fb[oe]),pe.up.copy(db[oe]),pe.lookAt(Ul),pe.updateMatrixWorld(),Ze.makeTranslation(-Ar.x,-Ar.y,-Ar.z),Wf.multiplyMatrices(pe.projectionMatrix,pe.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Wf,pe.coordinateSystem,pe.reversedDepth)}else H.updateMatrices(Y);i=H.getFrustum(),M(C,v,H.camera,Y,this.type)}H.isPointLightShadow!==!0&&this.type===Ir&&y(H,v),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(w,L,D)};function y(E,C){const v=e.update(x);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ln(s.x,s.y,{format:ps,type:gn})),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(C,null,v,f,x,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(C,null,v,d,x,null)}function A(E,C,v,w){let L=null;const D=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(D!==void 0)L=D;else if(L=v.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const U=L.uuid,G=C.uuid;let $=c[U];$===void 0&&($={},c[U]=$);let z=$[G];z===void 0&&(z=L.clone(),$[G]=z,C.addEventListener("dispose",T)),L=z}if(L.visible=C.visible,L.wireframe=C.wireframe,w===Ir?L.side=C.shadowSide!==null?C.shadowSide:C.side:L.side=C.shadowSide!==null?C.shadowSide:h[C.side],L.alphaMap=C.alphaMap,L.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,L.map=C.map,L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.displacementMap=C.displacementMap,L.displacementScale=C.displacementScale,L.displacementBias=C.displacementBias,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,v.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const U=n.properties.get(L);U.light=v}return L}function M(E,C,v,w,L){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&L===Ir)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);const G=e.update(E),$=E.material;if(Array.isArray($)){const z=G.groups;for(let Y=0,H=z.length;Y<H;Y++){const Z=z[Y],le=$[Z.materialIndex];if(le&&le.visible){const ne=A(E,le,w,L);E.onBeforeShadow(n,E,C,v,G,ne,Z),n.renderBufferDirect(v,null,G,ne,E,Z),E.onAfterShadow(n,E,C,v,G,ne,Z)}}}else if($.visible){const z=A(E,$,w,L);E.onBeforeShadow(n,E,C,v,G,z,null),n.renderBufferDirect(v,null,G,z,E,null),E.onAfterShadow(n,E,C,v,G,z,null)}}const U=E.children;for(let G=0,$=U.length;G<$;G++)M(U[G],C,v,w,L)}function T(E){E.target.removeEventListener("dispose",T);for(const v in c){const w=c[v],L=E.target.uuid;L in w&&(w[L].dispose(),delete w[L])}}}function mb(n,e){function t(){let F=!1;const Me=new Et;let re=null;const ye=new Et(0,0,0,0);return{setMask:function(Ae){re!==Ae&&!F&&(n.colorMask(Ae,Ae,Ae,Ae),re=Ae)},setLocked:function(Ae){F=Ae},setClear:function(Ae,ae,Oe,Ne,Tt){Tt===!0&&(Ae*=Ne,ae*=Ne,Oe*=Ne),Me.set(Ae,ae,Oe,Ne),ye.equals(Me)===!1&&(n.clearColor(Ae,ae,Oe,Ne),ye.copy(Me))},reset:function(){F=!1,re=null,ye.set(-1,0,0,0)}}}function i(){let F=!1,Me=!1,re=null,ye=null,Ae=null;return{setReversed:function(ae){if(Me!==ae){const Oe=e.get("EXT_clip_control");ae?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),Me=ae;const Ne=Ae;Ae=null,this.setClear(Ne)}},getReversed:function(){return Me},setTest:function(ae){ae?fe(n.DEPTH_TEST):Xe(n.DEPTH_TEST)},setMask:function(ae){re!==ae&&!F&&(n.depthMask(ae),re=ae)},setFunc:function(ae){if(Me&&(ae=w_[ae]),ye!==ae){switch(ae){case nc:n.depthFunc(n.NEVER);break;case ic:n.depthFunc(n.ALWAYS);break;case sc:n.depthFunc(n.LESS);break;case or:n.depthFunc(n.LEQUAL);break;case rc:n.depthFunc(n.EQUAL);break;case oc:n.depthFunc(n.GEQUAL);break;case ac:n.depthFunc(n.GREATER);break;case lc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ye=ae}},setLocked:function(ae){F=ae},setClear:function(ae){Ae!==ae&&(Ae=ae,Me&&(ae=1-ae),n.clearDepth(ae))},reset:function(){F=!1,re=null,ye=null,Ae=null,Me=!1}}}function s(){let F=!1,Me=null,re=null,ye=null,Ae=null,ae=null,Oe=null,Ne=null,Tt=null;return{setTest:function(xt){F||(xt?fe(n.STENCIL_TEST):Xe(n.STENCIL_TEST))},setMask:function(xt){Me!==xt&&!F&&(n.stencilMask(xt),Me=xt)},setFunc:function(xt,zn,Hn){(re!==xt||ye!==zn||Ae!==Hn)&&(n.stencilFunc(xt,zn,Hn),re=xt,ye=zn,Ae=Hn)},setOp:function(xt,zn,Hn){(ae!==xt||Oe!==zn||Ne!==Hn)&&(n.stencilOp(xt,zn,Hn),ae=xt,Oe=zn,Ne=Hn)},setLocked:function(xt){F=xt},setClear:function(xt){Tt!==xt&&(n.clearStencil(xt),Tt=xt)},reset:function(){F=!1,Me=null,re=null,ye=null,Ae=null,ae=null,Oe=null,Ne=null,Tt=null}}}const r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},h={},f={},d=new WeakMap,_=[],x=null,m=!1,p=null,y=null,A=null,M=null,T=null,E=null,C=null,v=new Ye(0,0,0),w=0,L=!1,D=null,U=null,G=null,$=null,z=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,Z=0;const le=n.getParameter(n.VERSION);le.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(le)[1]),H=Z>=1):le.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(le)[1]),H=Z>=2);let ne=null,oe={};const pe=n.getParameter(n.SCISSOR_BOX),Ze=n.getParameter(n.VIEWPORT),bt=new Et().fromArray(pe),rt=new Et().fromArray(Ze);function ee(F,Me,re,ye){const Ae=new Uint8Array(4),ae=n.createTexture();n.bindTexture(F,ae),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Oe=0;Oe<re;Oe++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(Me,0,n.RGBA,1,1,ye,0,n.RGBA,n.UNSIGNED_BYTE,Ae):n.texImage2D(Me+Oe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ae);return ae}const xe={};xe[n.TEXTURE_2D]=ee(n.TEXTURE_2D,n.TEXTURE_2D,1),xe[n.TEXTURE_CUBE_MAP]=ee(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),xe[n.TEXTURE_2D_ARRAY]=ee(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),xe[n.TEXTURE_3D]=ee(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),fe(n.DEPTH_TEST),o.setFunc(or),se(!1),de(Bh),fe(n.CULL_FACE),Q(ti);function fe(F){u[F]!==!0&&(n.enable(F),u[F]=!0)}function Xe(F){u[F]!==!1&&(n.disable(F),u[F]=!1)}function qe(F,Me){return f[F]!==Me?(n.bindFramebuffer(F,Me),f[F]=Me,F===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=Me),F===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=Me),!0):!1}function Ve(F,Me){let re=_,ye=!1;if(F){re=d.get(Me),re===void 0&&(re=[],d.set(Me,re));const Ae=F.textures;if(re.length!==Ae.length||re[0]!==n.COLOR_ATTACHMENT0){for(let ae=0,Oe=Ae.length;ae<Oe;ae++)re[ae]=n.COLOR_ATTACHMENT0+ae;re.length=Ae.length,ye=!0}}else re[0]!==n.BACK&&(re[0]=n.BACK,ye=!0);ye&&n.drawBuffers(re)}function P(F){return x!==F?(n.useProgram(F),x=F,!0):!1}const I={[os]:n.FUNC_ADD,[$0]:n.FUNC_SUBTRACT,[Z0]:n.FUNC_REVERSE_SUBTRACT};I[J0]=n.MIN,I[j0]=n.MAX;const X={[Q0]:n.ZERO,[e_]:n.ONE,[t_]:n.SRC_COLOR,[ec]:n.SRC_ALPHA,[a_]:n.SRC_ALPHA_SATURATE,[r_]:n.DST_COLOR,[i_]:n.DST_ALPHA,[n_]:n.ONE_MINUS_SRC_COLOR,[tc]:n.ONE_MINUS_SRC_ALPHA,[o_]:n.ONE_MINUS_DST_COLOR,[s_]:n.ONE_MINUS_DST_ALPHA,[l_]:n.CONSTANT_COLOR,[c_]:n.ONE_MINUS_CONSTANT_COLOR,[u_]:n.CONSTANT_ALPHA,[h_]:n.ONE_MINUS_CONSTANT_ALPHA};function Q(F,Me,re,ye,Ae,ae,Oe,Ne,Tt,xt){if(F===ti){m===!0&&(Xe(n.BLEND),m=!1);return}if(m===!1&&(fe(n.BLEND),m=!0),F!==K0){if(F!==p||xt!==L){if((y!==os||T!==os)&&(n.blendEquation(n.FUNC_ADD),y=os,T=os),xt)switch(F){case tr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ga:n.blendFunc(n.ONE,n.ONE);break;case zh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Hh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:st("WebGLState: Invalid blending: ",F);break}else switch(F){case tr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ga:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case zh:st("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Hh:st("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:st("WebGLState: Invalid blending: ",F);break}A=null,M=null,E=null,C=null,v.set(0,0,0),w=0,p=F,L=xt}return}Ae=Ae||Me,ae=ae||re,Oe=Oe||ye,(Me!==y||Ae!==T)&&(n.blendEquationSeparate(I[Me],I[Ae]),y=Me,T=Ae),(re!==A||ye!==M||ae!==E||Oe!==C)&&(n.blendFuncSeparate(X[re],X[ye],X[ae],X[Oe]),A=re,M=ye,E=ae,C=Oe),(Ne.equals(v)===!1||Tt!==w)&&(n.blendColor(Ne.r,Ne.g,Ne.b,Tt),v.copy(Ne),w=Tt),p=F,L=!1}function J(F,Me){F.side===nn?Xe(n.CULL_FACE):fe(n.CULL_FACE);let re=F.side===an;Me&&(re=!re),se(re),F.blending===tr&&F.transparent===!1?Q(ti):Q(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);const ye=F.stencilWrite;a.setTest(ye),ye&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),ce(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?fe(n.SAMPLE_ALPHA_TO_COVERAGE):Xe(n.SAMPLE_ALPHA_TO_COVERAGE)}function se(F){D!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),D=F)}function de(F){F!==X0?(fe(n.CULL_FACE),F!==U&&(F===Bh?n.cullFace(n.BACK):F===Y0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Xe(n.CULL_FACE),U=F}function ue(F){F!==G&&(H&&n.lineWidth(F),G=F)}function ce(F,Me,re){F?(fe(n.POLYGON_OFFSET_FILL),($!==Me||z!==re)&&($=Me,z=re,o.getReversed()&&(Me=-Me),n.polygonOffset(Me,re))):Xe(n.POLYGON_OFFSET_FILL)}function te(F){F?fe(n.SCISSOR_TEST):Xe(n.SCISSOR_TEST)}function Ce(F){F===void 0&&(F=n.TEXTURE0+Y-1),ne!==F&&(n.activeTexture(F),ne=F)}function R(F,Me,re){re===void 0&&(ne===null?re=n.TEXTURE0+Y-1:re=ne);let ye=oe[re];ye===void 0&&(ye={type:void 0,texture:void 0},oe[re]=ye),(ye.type!==F||ye.texture!==Me)&&(ne!==re&&(n.activeTexture(re),ne=re),n.bindTexture(F,Me||xe[F]),ye.type=F,ye.texture=Me)}function Pe(){const F=oe[ne];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function be(){try{n.compressedTexImage2D(...arguments)}catch(F){st("WebGLState:",F)}}function b(){try{n.compressedTexImage3D(...arguments)}catch(F){st("WebGLState:",F)}}function g(){try{n.texSubImage2D(...arguments)}catch(F){st("WebGLState:",F)}}function N(){try{n.texSubImage3D(...arguments)}catch(F){st("WebGLState:",F)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(F){st("WebGLState:",F)}}function K(){try{n.compressedTexSubImage3D(...arguments)}catch(F){st("WebGLState:",F)}}function he(){try{n.texStorage2D(...arguments)}catch(F){st("WebGLState:",F)}}function ge(){try{n.texStorage3D(...arguments)}catch(F){st("WebGLState:",F)}}function j(){try{n.texImage2D(...arguments)}catch(F){st("WebGLState:",F)}}function ie(){try{n.texImage3D(...arguments)}catch(F){st("WebGLState:",F)}}function me(F){return h[F]!==void 0?h[F]:n.getParameter(F)}function De(F,Me){h[F]!==Me&&(n.pixelStorei(F,Me),h[F]=Me)}function Se(F){bt.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),bt.copy(F))}function ve(F){rt.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),rt.copy(F))}function He(F,Me){let re=c.get(Me);re===void 0&&(re=new WeakMap,c.set(Me,re));let ye=re.get(F);ye===void 0&&(ye=n.getUniformBlockIndex(Me,F.name),re.set(F,ye))}function ke(F,Me){const ye=c.get(Me).get(F);l.get(Me)!==ye&&(n.uniformBlockBinding(Me,ye,F.__bindingPointIndex),l.set(Me,ye))}function Je(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},ne=null,oe={},f={},d=new WeakMap,_=[],x=null,m=!1,p=null,y=null,A=null,M=null,T=null,E=null,C=null,v=new Ye(0,0,0),w=0,L=!1,D=null,U=null,G=null,$=null,z=null,bt.set(0,0,n.canvas.width,n.canvas.height),rt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:fe,disable:Xe,bindFramebuffer:qe,drawBuffers:Ve,useProgram:P,setBlending:Q,setMaterial:J,setFlipSided:se,setCullFace:de,setLineWidth:ue,setPolygonOffset:ce,setScissorTest:te,activeTexture:Ce,bindTexture:R,unbindTexture:Pe,compressedTexImage2D:be,compressedTexImage3D:b,texImage2D:j,texImage3D:ie,pixelStorei:De,getParameter:me,updateUBOMapping:He,uniformBlockBinding:ke,texStorage2D:he,texStorage3D:ge,texSubImage2D:g,texSubImage3D:N,compressedTexSubImage2D:V,compressedTexSubImage3D:K,scissor:Se,viewport:ve,reset:Je}}function gb(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Re,u=new WeakMap,h=new Set;let f;const d=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(b,g){return _?new OffscreenCanvas(b,g):Sa("canvas")}function m(b,g,N){let V=1;const K=be(b);if((K.width>N||K.height>N)&&(V=N/Math.max(K.width,K.height)),V<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const he=Math.floor(V*K.width),ge=Math.floor(V*K.height);f===void 0&&(f=x(he,ge));const j=g?x(he,ge):f;return j.width=he,j.height=ge,j.getContext("2d").drawImage(b,0,0,he,ge),We("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+he+"x"+ge+")."),j}else return"data"in b&&We("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),b;return b}function p(b){return b.generateMipmaps}function y(b){n.generateMipmap(b)}function A(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(b,g,N,V,K,he=!1){if(b!==null){if(n[b]!==void 0)return n[b];We("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ge;V&&(ge=e.get("EXT_texture_norm16"),ge||We("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=g;if(g===n.RED&&(N===n.FLOAT&&(j=n.R32F),N===n.HALF_FLOAT&&(j=n.R16F),N===n.UNSIGNED_BYTE&&(j=n.R8),N===n.UNSIGNED_SHORT&&ge&&(j=ge.R16_EXT),N===n.SHORT&&ge&&(j=ge.R16_SNORM_EXT)),g===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(j=n.R8UI),N===n.UNSIGNED_SHORT&&(j=n.R16UI),N===n.UNSIGNED_INT&&(j=n.R32UI),N===n.BYTE&&(j=n.R8I),N===n.SHORT&&(j=n.R16I),N===n.INT&&(j=n.R32I)),g===n.RG&&(N===n.FLOAT&&(j=n.RG32F),N===n.HALF_FLOAT&&(j=n.RG16F),N===n.UNSIGNED_BYTE&&(j=n.RG8),N===n.UNSIGNED_SHORT&&ge&&(j=ge.RG16_EXT),N===n.SHORT&&ge&&(j=ge.RG16_SNORM_EXT)),g===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(j=n.RG8UI),N===n.UNSIGNED_SHORT&&(j=n.RG16UI),N===n.UNSIGNED_INT&&(j=n.RG32UI),N===n.BYTE&&(j=n.RG8I),N===n.SHORT&&(j=n.RG16I),N===n.INT&&(j=n.RG32I)),g===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(j=n.RGB8UI),N===n.UNSIGNED_SHORT&&(j=n.RGB16UI),N===n.UNSIGNED_INT&&(j=n.RGB32UI),N===n.BYTE&&(j=n.RGB8I),N===n.SHORT&&(j=n.RGB16I),N===n.INT&&(j=n.RGB32I)),g===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),N===n.UNSIGNED_INT&&(j=n.RGBA32UI),N===n.BYTE&&(j=n.RGBA8I),N===n.SHORT&&(j=n.RGBA16I),N===n.INT&&(j=n.RGBA32I)),g===n.RGB&&(N===n.UNSIGNED_SHORT&&ge&&(j=ge.RGB16_EXT),N===n.SHORT&&ge&&(j=ge.RGB16_SNORM_EXT),N===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),N===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),g===n.RGBA){const ie=he?Ma:it.getTransfer(K);N===n.FLOAT&&(j=n.RGBA32F),N===n.HALF_FLOAT&&(j=n.RGBA16F),N===n.UNSIGNED_BYTE&&(j=ie===at?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT&&ge&&(j=ge.RGBA16_EXT),N===n.SHORT&&ge&&(j=ge.RGBA16_SNORM_EXT),N===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function T(b,g){let N;return b?g===null||g===ri||g===Zr?N=n.DEPTH24_STENCIL8:g===In?N=n.DEPTH32F_STENCIL8:g===$r&&(N=n.DEPTH24_STENCIL8,We("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===ri||g===Zr?N=n.DEPTH_COMPONENT24:g===In?N=n.DEPTH_COMPONENT32F:g===$r&&(N=n.DEPTH_COMPONENT16),N}function E(b,g){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==zt&&b.minFilter!==Xt?Math.log2(Math.max(g.width,g.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?g.mipmaps.length:1}function C(b){const g=b.target;g.removeEventListener("dispose",C),w(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&h.delete(g)}function v(b){const g=b.target;g.removeEventListener("dispose",v),D(g)}function w(b){const g=i.get(b);if(g.__webglInit===void 0)return;const N=b.source,V=d.get(N);if(V){const K=V[g.__cacheKey];K.usedTimes--,K.usedTimes===0&&L(b),Object.keys(V).length===0&&d.delete(N)}i.remove(b)}function L(b){const g=i.get(b);n.deleteTexture(g.__webglTexture);const N=b.source,V=d.get(N);delete V[g.__cacheKey],o.memory.textures--}function D(b){const g=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(g.__webglFramebuffer[V]))for(let K=0;K<g.__webglFramebuffer[V].length;K++)n.deleteFramebuffer(g.__webglFramebuffer[V][K]);else n.deleteFramebuffer(g.__webglFramebuffer[V]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[V])}else{if(Array.isArray(g.__webglFramebuffer))for(let V=0;V<g.__webglFramebuffer.length;V++)n.deleteFramebuffer(g.__webglFramebuffer[V]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let V=0;V<g.__webglColorRenderbuffer.length;V++)g.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[V]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const N=b.textures;for(let V=0,K=N.length;V<K;V++){const he=i.get(N[V]);he.__webglTexture&&(n.deleteTexture(he.__webglTexture),o.memory.textures--),i.remove(N[V])}i.remove(b)}let U=0;function G(){U=0}function $(){return U}function z(b){U=b}function Y(){const b=U;return b>=s.maxTextures&&We("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),U+=1,b}function H(b){const g=[];return g.push(b.wrapS),g.push(b.wrapT),g.push(b.wrapR||0),g.push(b.magFilter),g.push(b.minFilter),g.push(b.anisotropy),g.push(b.internalFormat),g.push(b.format),g.push(b.type),g.push(b.generateMipmaps),g.push(b.premultiplyAlpha),g.push(b.flipY),g.push(b.unpackAlignment),g.push(b.colorSpace),g.join()}function Z(b,g){const N=i.get(b);if(b.isVideoTexture&&R(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&N.__version!==b.version){const V=b.image;if(V===null)We("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)We("WebGLRenderer: Texture marked for update but image is incomplete");else{Xe(N,b,g);return}}else b.isExternalTexture&&(N.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+g)}function le(b,g){const N=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&N.__version!==b.version){Xe(N,b,g);return}else b.isExternalTexture&&(N.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+g)}function ne(b,g){const N=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&N.__version!==b.version){Xe(N,b,g);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+g)}function oe(b,g){const N=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&N.__version!==b.version){qe(N,b,g);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+g)}const pe={[cc]:n.REPEAT,[Mi]:n.CLAMP_TO_EDGE,[uc]:n.MIRRORED_REPEAT},Ze={[zt]:n.NEAREST,[p_]:n.NEAREST_MIPMAP_NEAREST,[ho]:n.NEAREST_MIPMAP_LINEAR,[Xt]:n.LINEAR,[il]:n.LINEAR_MIPMAP_NEAREST,[ls]:n.LINEAR_MIPMAP_LINEAR},bt={[__]:n.NEVER,[y_]:n.ALWAYS,[x_]:n.LESS,[Fu]:n.LEQUAL,[v_]:n.EQUAL,[Ou]:n.GEQUAL,[M_]:n.GREATER,[S_]:n.NOTEQUAL};function rt(b,g){if(g.type===In&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===Xt||g.magFilter===il||g.magFilter===ho||g.magFilter===ls||g.minFilter===Xt||g.minFilter===il||g.minFilter===ho||g.minFilter===ls)&&We("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,pe[g.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,pe[g.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,pe[g.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,Ze[g.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,Ze[g.minFilter]),g.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,bt[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===zt||g.minFilter!==ho&&g.minFilter!==ls||g.type===In&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function ee(b,g){let N=!1;b.__webglInit===void 0&&(b.__webglInit=!0,g.addEventListener("dispose",C));const V=g.source;let K=d.get(V);K===void 0&&(K={},d.set(V,K));const he=H(g);if(he!==b.__cacheKey){K[he]===void 0&&(K[he]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,N=!0),K[he].usedTimes++;const ge=K[b.__cacheKey];ge!==void 0&&(K[b.__cacheKey].usedTimes--,ge.usedTimes===0&&L(g)),b.__cacheKey=he,b.__webglTexture=K[he].texture}return N}function xe(b,g,N){return Math.floor(Math.floor(b/N)/g)}function fe(b,g,N,V){const he=b.updateRanges;if(he.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,g.width,g.height,N,V,g.data);else{he.sort((De,Se)=>De.start-Se.start);let ge=0;for(let De=1;De<he.length;De++){const Se=he[ge],ve=he[De],He=Se.start+Se.count,ke=xe(ve.start,g.width,4),Je=xe(Se.start,g.width,4);ve.start<=He+1&&ke===Je&&xe(ve.start+ve.count-1,g.width,4)===ke?Se.count=Math.max(Se.count,ve.start+ve.count-Se.start):(++ge,he[ge]=ve)}he.length=ge+1;const j=t.getParameter(n.UNPACK_ROW_LENGTH),ie=t.getParameter(n.UNPACK_SKIP_PIXELS),me=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,g.width);for(let De=0,Se=he.length;De<Se;De++){const ve=he[De],He=Math.floor(ve.start/4),ke=Math.ceil(ve.count/4),Je=He%g.width,F=Math.floor(He/g.width),Me=ke,re=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Je),t.pixelStorei(n.UNPACK_SKIP_ROWS,F),t.texSubImage2D(n.TEXTURE_2D,0,Je,F,Me,re,N,V,g.data)}b.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,j),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(n.UNPACK_SKIP_ROWS,me)}}function Xe(b,g,N){let V=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(V=n.TEXTURE_3D);const K=ee(b,g),he=g.source;t.bindTexture(V,b.__webglTexture,n.TEXTURE0+N);const ge=i.get(he);if(he.version!==ge.__version||K===!0){if(t.activeTexture(n.TEXTURE0+N),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){const re=it.getPrimaries(it.workingColorSpace),ye=g.colorSpace===Wi?null:it.getPrimaries(g.colorSpace),Ae=g.colorSpace===Wi||re===ye?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae)}t.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment);let ie=m(g.image,!1,s.maxTextureSize);ie=Pe(g,ie);const me=r.convert(g.format,g.colorSpace),De=r.convert(g.type);let Se=M(g.internalFormat,me,De,g.normalized,g.colorSpace,g.isVideoTexture);rt(V,g);let ve;const He=g.mipmaps,ke=g.isVideoTexture!==!0,Je=ge.__version===void 0||K===!0,F=he.dataReady,Me=E(g,ie);if(g.isDepthTexture)Se=T(g.format===cs,g.type),Je&&(ke?t.texStorage2D(n.TEXTURE_2D,1,Se,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,Se,ie.width,ie.height,0,me,De,null));else if(g.isDataTexture)if(He.length>0){ke&&Je&&t.texStorage2D(n.TEXTURE_2D,Me,Se,He[0].width,He[0].height);for(let re=0,ye=He.length;re<ye;re++)ve=He[re],ke?F&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,ve.width,ve.height,me,De,ve.data):t.texImage2D(n.TEXTURE_2D,re,Se,ve.width,ve.height,0,me,De,ve.data);g.generateMipmaps=!1}else ke?(Je&&t.texStorage2D(n.TEXTURE_2D,Me,Se,ie.width,ie.height),F&&fe(g,ie,me,De)):t.texImage2D(n.TEXTURE_2D,0,Se,ie.width,ie.height,0,me,De,ie.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){ke&&Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Me,Se,He[0].width,He[0].height,ie.depth);for(let re=0,ye=He.length;re<ye;re++)if(ve=He[re],g.format!==Ln)if(me!==null)if(ke){if(F)if(g.layerUpdates.size>0){const Ae=yf(ve.width,ve.height,g.format,g.type);for(const ae of g.layerUpdates){const Oe=ve.data.subarray(ae*Ae/ve.data.BYTES_PER_ELEMENT,(ae+1)*Ae/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,ae,ve.width,ve.height,1,me,Oe)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,ve.width,ve.height,ie.depth,me,ve.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,Se,ve.width,ve.height,ie.depth,0,ve.data,0,0);else We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?F&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,ve.width,ve.height,ie.depth,me,De,ve.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,Se,ve.width,ve.height,ie.depth,0,me,De,ve.data)}else{ke&&Je&&t.texStorage2D(n.TEXTURE_2D,Me,Se,He[0].width,He[0].height);for(let re=0,ye=He.length;re<ye;re++)ve=He[re],g.format!==Ln?me!==null?ke?F&&t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,ve.width,ve.height,me,ve.data):t.compressedTexImage2D(n.TEXTURE_2D,re,Se,ve.width,ve.height,0,ve.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?F&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,ve.width,ve.height,me,De,ve.data):t.texImage2D(n.TEXTURE_2D,re,Se,ve.width,ve.height,0,me,De,ve.data)}else if(g.isDataArrayTexture)if(ke){if(Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Me,Se,ie.width,ie.height,ie.depth),F)if(g.layerUpdates.size>0){const re=yf(ie.width,ie.height,g.format,g.type);for(const ye of g.layerUpdates){const Ae=ie.data.subarray(ye*re/ie.data.BYTES_PER_ELEMENT,(ye+1)*re/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ye,ie.width,ie.height,1,me,De,Ae)}g.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,me,De,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Se,ie.width,ie.height,ie.depth,0,me,De,ie.data);else if(g.isData3DTexture)ke?(Je&&t.texStorage3D(n.TEXTURE_3D,Me,Se,ie.width,ie.height,ie.depth),F&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,me,De,ie.data)):t.texImage3D(n.TEXTURE_3D,0,Se,ie.width,ie.height,ie.depth,0,me,De,ie.data);else if(g.isFramebufferTexture){if(Je)if(ke)t.texStorage2D(n.TEXTURE_2D,Me,Se,ie.width,ie.height);else{let re=ie.width,ye=ie.height;for(let Ae=0;Ae<Me;Ae++)t.texImage2D(n.TEXTURE_2D,Ae,Se,re,ye,0,me,De,null),re>>=1,ye>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in n){const re=n.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),ie.parentNode!==re){re.appendChild(ie),h.add(g),re.onpaint=ye=>{const Ae=ye.changedElements;for(const ae of h)Ae.includes(ae.image)&&(ae.needsUpdate=!0)},re.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ie);else{const Ae=n.RGBA,ae=n.RGBA,Oe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ae,ae,Oe,ie)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(He.length>0){if(ke&&Je){const re=be(He[0]);t.texStorage2D(n.TEXTURE_2D,Me,Se,re.width,re.height)}for(let re=0,ye=He.length;re<ye;re++)ve=He[re],ke?F&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,me,De,ve):t.texImage2D(n.TEXTURE_2D,re,Se,me,De,ve);g.generateMipmaps=!1}else if(ke){if(Je){const re=be(ie);t.texStorage2D(n.TEXTURE_2D,Me,Se,re.width,re.height)}F&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,me,De,ie)}else t.texImage2D(n.TEXTURE_2D,0,Se,me,De,ie);p(g)&&y(V),ge.__version=he.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function qe(b,g,N){if(g.image.length!==6)return;const V=ee(b,g),K=g.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+N);const he=i.get(K);if(K.version!==he.__version||V===!0){t.activeTexture(n.TEXTURE0+N);const ge=it.getPrimaries(it.workingColorSpace),j=g.colorSpace===Wi?null:it.getPrimaries(g.colorSpace),ie=g.colorSpace===Wi||ge===j?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);const me=g.isCompressedTexture||g.image[0].isCompressedTexture,De=g.image[0]&&g.image[0].isDataTexture,Se=[];for(let ae=0;ae<6;ae++)!me&&!De?Se[ae]=m(g.image[ae],!0,s.maxCubemapSize):Se[ae]=De?g.image[ae].image:g.image[ae],Se[ae]=Pe(g,Se[ae]);const ve=Se[0],He=r.convert(g.format,g.colorSpace),ke=r.convert(g.type),Je=M(g.internalFormat,He,ke,g.normalized,g.colorSpace),F=g.isVideoTexture!==!0,Me=he.__version===void 0||V===!0,re=K.dataReady;let ye=E(g,ve);rt(n.TEXTURE_CUBE_MAP,g);let Ae;if(me){F&&Me&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,Je,ve.width,ve.height);for(let ae=0;ae<6;ae++){Ae=Se[ae].mipmaps;for(let Oe=0;Oe<Ae.length;Oe++){const Ne=Ae[Oe];g.format!==Ln?He!==null?F?re&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe,0,0,Ne.width,Ne.height,He,Ne.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe,Je,Ne.width,Ne.height,0,Ne.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe,0,0,Ne.width,Ne.height,He,ke,Ne.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe,Je,Ne.width,Ne.height,0,He,ke,Ne.data)}}}else{if(Ae=g.mipmaps,F&&Me){Ae.length>0&&ye++;const ae=be(Se[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,Je,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(De){F?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Se[ae].width,Se[ae].height,He,ke,Se[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Je,Se[ae].width,Se[ae].height,0,He,ke,Se[ae].data);for(let Oe=0;Oe<Ae.length;Oe++){const Tt=Ae[Oe].image[ae].image;F?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe+1,0,0,Tt.width,Tt.height,He,ke,Tt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe+1,Je,Tt.width,Tt.height,0,He,ke,Tt.data)}}else{F?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,He,ke,Se[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Je,He,ke,Se[ae]);for(let Oe=0;Oe<Ae.length;Oe++){const Ne=Ae[Oe];F?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe+1,0,0,He,ke,Ne.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe+1,Je,He,ke,Ne.image[ae])}}}p(g)&&y(n.TEXTURE_CUBE_MAP),he.__version=K.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function Ve(b,g,N,V,K,he){const ge=r.convert(N.format,N.colorSpace),j=r.convert(N.type),ie=M(N.internalFormat,ge,j,N.normalized,N.colorSpace),me=i.get(g),De=i.get(N);if(De.__renderTarget=g,!me.__hasExternalTextures){const Se=Math.max(1,g.width>>he),ve=Math.max(1,g.height>>he);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?t.texImage3D(K,he,ie,Se,ve,g.depth,0,ge,j,null):t.texImage2D(K,he,ie,Se,ve,0,ge,j,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),Ce(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,K,De.__webglTexture,0,te(g)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,K,De.__webglTexture,he),t.bindFramebuffer(n.FRAMEBUFFER,null)}function P(b,g,N){if(n.bindRenderbuffer(n.RENDERBUFFER,b),g.depthBuffer){const V=g.depthTexture,K=V&&V.isDepthTexture?V.type:null,he=T(g.stencilBuffer,K),ge=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ce(g)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,te(g),he,g.width,g.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,te(g),he,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,he,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ge,n.RENDERBUFFER,b)}else{const V=g.textures;for(let K=0;K<V.length;K++){const he=V[K],ge=r.convert(he.format,he.colorSpace),j=r.convert(he.type),ie=M(he.internalFormat,ge,j,he.normalized,he.colorSpace);Ce(g)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,te(g),ie,g.width,g.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,te(g),ie,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,ie,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function I(b,g,N){const V=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=i.get(g.depthTexture);if(K.__renderTarget=g,(!K.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),V){if(K.__webglInit===void 0&&(K.__webglInit=!0,g.depthTexture.addEventListener("dispose",C)),K.__webglTexture===void 0){K.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),rt(n.TEXTURE_CUBE_MAP,g.depthTexture);const me=r.convert(g.depthTexture.format),De=r.convert(g.depthTexture.type);let Se;g.depthTexture.format===wi?Se=n.DEPTH_COMPONENT24:g.depthTexture.format===cs&&(Se=n.DEPTH24_STENCIL8);for(let ve=0;ve<6;ve++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,Se,g.width,g.height,0,me,De,null)}}else Z(g.depthTexture,0);const he=K.__webglTexture,ge=te(g),j=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+N:n.TEXTURE_2D,ie=g.depthTexture.format===cs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(g.depthTexture.format===wi)Ce(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ie,j,he,0,ge):n.framebufferTexture2D(n.FRAMEBUFFER,ie,j,he,0);else if(g.depthTexture.format===cs)Ce(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ie,j,he,0,ge):n.framebufferTexture2D(n.FRAMEBUFFER,ie,j,he,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function X(b){const g=i.get(b),N=b.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==b.depthTexture){const V=b.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),V){const K=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,V.removeEventListener("dispose",K)};V.addEventListener("dispose",K),g.__depthDisposeCallback=K}g.__boundDepthTexture=V}if(b.depthTexture&&!g.__autoAllocateDepthBuffer)if(N)for(let V=0;V<6;V++)I(g.__webglFramebuffer[V],b,V);else{const V=b.texture.mipmaps;V&&V.length>0?I(g.__webglFramebuffer[0],b,0):I(g.__webglFramebuffer,b,0)}else if(N){g.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[V]),g.__webglDepthbuffer[V]===void 0)g.__webglDepthbuffer[V]=n.createRenderbuffer(),P(g.__webglDepthbuffer[V],b,!1);else{const K=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=g.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,he),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,he)}}else{const V=b.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),P(g.__webglDepthbuffer,b,!1);else{const K=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,he),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,he)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Q(b,g,N){const V=i.get(b);g!==void 0&&Ve(V.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&X(b)}function J(b){const g=b.texture,N=i.get(b),V=i.get(g);b.addEventListener("dispose",v);const K=b.textures,he=b.isWebGLCubeRenderTarget===!0,ge=K.length>1;if(ge||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=g.version,o.memory.textures++),he){N.__webglFramebuffer=[];for(let j=0;j<6;j++)if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer[j]=[];for(let ie=0;ie<g.mipmaps.length;ie++)N.__webglFramebuffer[j][ie]=n.createFramebuffer()}else N.__webglFramebuffer[j]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer=[];for(let j=0;j<g.mipmaps.length;j++)N.__webglFramebuffer[j]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(ge)for(let j=0,ie=K.length;j<ie;j++){const me=i.get(K[j]);me.__webglTexture===void 0&&(me.__webglTexture=n.createTexture(),o.memory.textures++)}if(b.samples>0&&Ce(b)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let j=0;j<K.length;j++){const ie=K[j];N.__webglColorRenderbuffer[j]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[j]);const me=r.convert(ie.format,ie.colorSpace),De=r.convert(ie.type),Se=M(ie.internalFormat,me,De,ie.normalized,ie.colorSpace,b.isXRRenderTarget===!0),ve=te(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,ve,Se,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,N.__webglColorRenderbuffer[j])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),P(N.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(he){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),rt(n.TEXTURE_CUBE_MAP,g);for(let j=0;j<6;j++)if(g.mipmaps&&g.mipmaps.length>0)for(let ie=0;ie<g.mipmaps.length;ie++)Ve(N.__webglFramebuffer[j][ie],b,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ie);else Ve(N.__webglFramebuffer[j],b,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);p(g)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){for(let j=0,ie=K.length;j<ie;j++){const me=K[j],De=i.get(me);let Se=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Se=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Se,De.__webglTexture),rt(Se,me),Ve(N.__webglFramebuffer,b,me,n.COLOR_ATTACHMENT0+j,Se,0),p(me)&&y(Se)}t.unbindTexture()}else{let j=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(j=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(j,V.__webglTexture),rt(j,g),g.mipmaps&&g.mipmaps.length>0)for(let ie=0;ie<g.mipmaps.length;ie++)Ve(N.__webglFramebuffer[ie],b,g,n.COLOR_ATTACHMENT0,j,ie);else Ve(N.__webglFramebuffer,b,g,n.COLOR_ATTACHMENT0,j,0);p(g)&&y(j),t.unbindTexture()}b.depthBuffer&&X(b)}function se(b){const g=b.textures;for(let N=0,V=g.length;N<V;N++){const K=g[N];if(p(K)){const he=A(b),ge=i.get(K).__webglTexture;t.bindTexture(he,ge),y(he),t.unbindTexture()}}}const de=[],ue=[];function ce(b){if(b.samples>0){if(Ce(b)===!1){const g=b.textures,N=b.width,V=b.height;let K=n.COLOR_BUFFER_BIT;const he=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=i.get(b),j=g.length>1;if(j)for(let me=0;me<g.length;me++)t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);const ie=b.texture.mipmaps;ie&&ie.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let me=0;me<g.length;me++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),j){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ge.__webglColorRenderbuffer[me]);const De=i.get(g[me]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,De,0)}n.blitFramebuffer(0,0,N,V,0,0,N,V,K,n.NEAREST),l===!0&&(de.length=0,ue.length=0,de.push(n.COLOR_ATTACHMENT0+me),b.depthBuffer&&b.resolveDepthBuffer===!1&&(de.push(he),ue.push(he),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ue)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,de))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),j)for(let me=0;me<g.length;me++){t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,ge.__webglColorRenderbuffer[me]);const De=i.get(g[me]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.TEXTURE_2D,De,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const g=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function te(b){return Math.min(s.maxSamples,b.samples)}function Ce(b){const g=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function R(b){const g=o.render.frame;u.get(b)!==g&&(u.set(b,g),b.update())}function Pe(b,g){const N=b.colorSpace,V=b.format,K=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||N!==va&&N!==Wi&&(it.getTransfer(N)===at?(V!==Ln||K!==pn)&&We("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):st("WebGLTextures: Unsupported texture color space:",N)),g}function be(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=G,this.getTextureUnits=$,this.setTextureUnits=z,this.setTexture2D=Z,this.setTexture2DArray=le,this.setTexture3D=ne,this.setTextureCube=oe,this.rebindTextures=Q,this.setupRenderTarget=J,this.updateRenderTargetMipmap=se,this.updateMultisampleRenderTarget=ce,this.setupDepthRenderbuffer=X,this.setupFrameBufferTexture=Ve,this.useMultisampledRTT=Ce,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function _b(n,e){function t(i,s=Wi){let r;const o=it.getTransfer(s);if(i===pn)return n.UNSIGNED_BYTE;if(i===Pu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Du)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Cp)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Pp)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ap)return n.BYTE;if(i===Rp)return n.SHORT;if(i===$r)return n.UNSIGNED_SHORT;if(i===Cu)return n.INT;if(i===ri)return n.UNSIGNED_INT;if(i===In)return n.FLOAT;if(i===gn)return n.HALF_FLOAT;if(i===Dp)return n.ALPHA;if(i===Ip)return n.RGB;if(i===Ln)return n.RGBA;if(i===wi)return n.DEPTH_COMPONENT;if(i===cs)return n.DEPTH_STENCIL;if(i===Iu)return n.RED;if(i===Lu)return n.RED_INTEGER;if(i===ps)return n.RG;if(i===Uu)return n.RG_INTEGER;if(i===Nu)return n.RGBA_INTEGER;if(i===sa||i===ra||i===oa||i===aa)if(o===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===sa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===sa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ra)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===oa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===aa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===hc||i===fc||i===dc||i===pc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===hc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===fc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===dc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===pc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===mc||i===gc||i===_c||i===xc||i===vc||i===_a||i===Mc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===mc||i===gc)return o===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===_c)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===xc)return r.COMPRESSED_R11_EAC;if(i===vc)return r.COMPRESSED_SIGNED_R11_EAC;if(i===_a)return r.COMPRESSED_RG11_EAC;if(i===Mc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Sc||i===yc||i===bc||i===Ec||i===Tc||i===wc||i===Ac||i===Rc||i===Cc||i===Pc||i===Dc||i===Ic||i===Lc||i===Uc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Sc)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===yc)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===bc)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ec)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Tc)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===wc)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ac)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Rc)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Cc)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Pc)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Dc)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ic)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Lc)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Uc)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Nc||i===Fc||i===Oc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Nc)return o===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Fc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Oc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Bc||i===zc||i===xa||i===Hc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Bc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===zc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Hc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Zr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const xb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,vb=`
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

}`;class Mb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Wp(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Yt({vertexShader:xb,fragmentShader:vb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _e(new Ot(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Sb extends Ji{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,_=null;const x=typeof XRWebGLBinding<"u",m=new Mb,p={},y=t.getContextAttributes();let A=null,M=null;const T=[],E=[],C=new Re;let v=null;const w=new yn;w.viewport=new Et;const L=new yn;L.viewport=new Et;const D=[w,L],U=new wx;let G=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let xe=T[ee];return xe===void 0&&(xe=new cl,T[ee]=xe),xe.getTargetRaySpace()},this.getControllerGrip=function(ee){let xe=T[ee];return xe===void 0&&(xe=new cl,T[ee]=xe),xe.getGripSpace()},this.getHand=function(ee){let xe=T[ee];return xe===void 0&&(xe=new cl,T[ee]=xe),xe.getHandSpace()};function z(ee){const xe=E.indexOf(ee.inputSource);if(xe===-1)return;const fe=T[xe];fe!==void 0&&(fe.update(ee.inputSource,ee.frame,c||o),fe.dispatchEvent({type:ee.type,data:ee.inputSource}))}function Y(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",H);for(let ee=0;ee<T.length;ee++){const xe=E[ee];xe!==null&&(E[ee]=null,T[ee].disconnect(xe))}G=null,$=null,m.reset();for(const ee in p)delete p[ee];e.setRenderTarget(A),d=null,f=null,h=null,s=null,M=null,rt.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,i.isPresenting===!0&&We("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){a=ee,i.isPresenting===!0&&We("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ee){c=ee},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(ee){if(s=ee,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",H),y.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,Xe=null,qe=null;y.depth&&(qe=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=y.stencil?cs:wi,Xe=y.stencil?Zr:ri);const Ve={colorFormat:t.RGBA8,depthFormat:qe,scaleFactor:r};h=this.getBinding(),f=h.createProjectionLayer(Ve),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new ln(f.textureWidth,f.textureHeight,{format:Ln,type:pn,depthTexture:new lr(f.textureWidth,f.textureHeight,Xe,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const fe={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,fe),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new ln(d.framebufferWidth,d.framebufferHeight,{format:Ln,type:pn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),rt.setContext(s),rt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function H(ee){for(let xe=0;xe<ee.removed.length;xe++){const fe=ee.removed[xe],Xe=E.indexOf(fe);Xe>=0&&(E[Xe]=null,T[Xe].disconnect(fe))}for(let xe=0;xe<ee.added.length;xe++){const fe=ee.added[xe];let Xe=E.indexOf(fe);if(Xe===-1){for(let Ve=0;Ve<T.length;Ve++)if(Ve>=E.length){E.push(fe),Xe=Ve;break}else if(E[Ve]===null){E[Ve]=fe,Xe=Ve;break}if(Xe===-1)break}const qe=T[Xe];qe&&qe.connect(fe)}}const Z=new O,le=new O;function ne(ee,xe,fe){Z.setFromMatrixPosition(xe.matrixWorld),le.setFromMatrixPosition(fe.matrixWorld);const Xe=Z.distanceTo(le),qe=xe.projectionMatrix.elements,Ve=fe.projectionMatrix.elements,P=qe[14]/(qe[10]-1),I=qe[14]/(qe[10]+1),X=(qe[9]+1)/qe[5],Q=(qe[9]-1)/qe[5],J=(qe[8]-1)/qe[0],se=(Ve[8]+1)/Ve[0],de=P*J,ue=P*se,ce=Xe/(-J+se),te=ce*-J;if(xe.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(te),ee.translateZ(ce),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),qe[10]===-1)ee.projectionMatrix.copy(xe.projectionMatrix),ee.projectionMatrixInverse.copy(xe.projectionMatrixInverse);else{const Ce=P+ce,R=I+ce,Pe=de-te,be=ue+(Xe-te),b=X*I/R*Ce,g=Q*I/R*Ce;ee.projectionMatrix.makePerspective(Pe,be,b,g,Ce,R),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function oe(ee,xe){xe===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(xe.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(s===null)return;let xe=ee.near,fe=ee.far;m.texture!==null&&(m.depthNear>0&&(xe=m.depthNear),m.depthFar>0&&(fe=m.depthFar)),U.near=L.near=w.near=xe,U.far=L.far=w.far=fe,(G!==U.near||$!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),G=U.near,$=U.far),U.layers.mask=ee.layers.mask|6,w.layers.mask=U.layers.mask&-5,L.layers.mask=U.layers.mask&-3;const Xe=ee.parent,qe=U.cameras;oe(U,Xe);for(let Ve=0;Ve<qe.length;Ve++)oe(qe[Ve],Xe);qe.length===2?ne(U,w,L):U.projectionMatrix.copy(w.projectionMatrix),pe(ee,U,Xe)};function pe(ee,xe,fe){fe===null?ee.matrix.copy(xe.matrixWorld):(ee.matrix.copy(fe.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(xe.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(xe.projectionMatrix),ee.projectionMatrixInverse.copy(xe.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=jr*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(ee){l=ee,f!==null&&(f.fixedFoveation=ee),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=ee)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(ee){return p[ee]};let Ze=null;function bt(ee,xe){if(u=xe.getViewerPose(c||o),_=xe,u!==null){const fe=u.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let Xe=!1;fe.length!==U.cameras.length&&(U.cameras.length=0,Xe=!0);for(let I=0;I<fe.length;I++){const X=fe[I];let Q=null;if(d!==null)Q=d.getViewport(X);else{const se=h.getViewSubImage(f,X);Q=se.viewport,I===0&&(e.setRenderTargetTextures(M,se.colorTexture,se.depthStencilTexture),e.setRenderTarget(M))}let J=D[I];J===void 0&&(J=new yn,J.layers.enable(I),J.viewport=new Et,D[I]=J),J.matrix.fromArray(X.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(X.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(Q.x,Q.y,Q.width,Q.height),I===0&&(U.matrix.copy(J.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Xe===!0&&U.cameras.push(J)}const qe=s.enabledFeatures;if(qe&&qe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){h=i.getBinding();const I=h.getDepthInformation(fe[0]);I&&I.isValid&&I.texture&&m.init(I,s.renderState)}if(qe&&qe.includes("camera-access")&&x){e.state.unbindTexture(),h=i.getBinding();for(let I=0;I<fe.length;I++){const X=fe[I].camera;if(X){let Q=p[X];Q||(Q=new Wp,p[X]=Q);const J=h.getCameraImage(X);Q.sourceTexture=J}}}}for(let fe=0;fe<T.length;fe++){const Xe=E[fe],qe=T[fe];Xe!==null&&qe!==void 0&&qe.update(Xe,xe,c||o)}Ze&&Ze(ee,xe),xe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:xe}),_=null}const rt=new Zp;rt.setAnimationLoop(bt),this.setAnimationLoop=function(ee){Ze=ee},this.dispose=function(){}}}const yb=new dt,im=new Ke;im.set(-1,0,0,0,1,0,0,0,1);function bb(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Xp(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,A,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),_(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,A):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===an&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===an&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),A=y.envMap,M=y.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(yb.makeRotationFromEuler(M)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(im),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,A){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=A*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===an&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Eb(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,T){const E=T.program;i.uniformBlockBinding(M,E)}function c(M,T){let E=s[M.id];E===void 0&&(m(M),E=u(M),s[M.id]=E,M.addEventListener("dispose",y));const C=T.program;i.updateUBOMapping(M,C);const v=e.render.frame;r[M.id]!==v&&(f(M),r[M.id]=v)}function u(M){const T=h();M.__bindingPointIndex=T;const E=n.createBuffer(),C=M.__size,v=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,C,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,E),E}function h(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return st("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const T=s[M.id],E=M.uniforms,C=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let v=0,w=E.length;v<w;v++){const L=E[v];if(Array.isArray(L))for(let D=0,U=L.length;D<U;D++)d(L[D],v,D,C);else d(L,v,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(M,T,E,C){if(x(M,T,E,C)===!0){const v=M.__offset,w=M.value;if(Array.isArray(w)){let L=0;for(let D=0;D<w.length;D++){const U=w[D],G=p(U);_(U,M.__data,L),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(L+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(w,M.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,M.__data)}}function _(M,T,E){typeof M=="number"||typeof M=="boolean"?T[0]=M:M.isMatrix3?(T[0]=M.elements[0],T[1]=M.elements[1],T[2]=M.elements[2],T[3]=0,T[4]=M.elements[3],T[5]=M.elements[4],T[6]=M.elements[5],T[7]=0,T[8]=M.elements[6],T[9]=M.elements[7],T[10]=M.elements[8],T[11]=0):ArrayBuffer.isView(M)?T.set(new M.constructor(M.buffer,M.byteOffset,T.length)):M.toArray(T,E)}function x(M,T,E,C){const v=M.value,w=T+"_"+E;if(C[w]===void 0)return typeof v=="number"||typeof v=="boolean"?C[w]=v:ArrayBuffer.isView(v)?C[w]=v.slice():C[w]=v.clone(),!0;{const L=C[w];if(typeof v=="number"||typeof v=="boolean"){if(L!==v)return C[w]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(L.equals(v)===!1)return L.copy(v),!0}}return!1}function m(M){const T=M.uniforms;let E=0;const C=16;for(let w=0,L=T.length;w<L;w++){const D=Array.isArray(T[w])?T[w]:[T[w]];for(let U=0,G=D.length;U<G;U++){const $=D[U],z=Array.isArray($.value)?$.value:[$.value];for(let Y=0,H=z.length;Y<H;Y++){const Z=z[Y],le=p(Z),ne=E%C,oe=ne%le.boundary,pe=ne+oe;E+=oe,pe!==0&&C-pe<le.storage&&(E+=C-pe),$.__data=new Float32Array(le.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=E,E+=le.storage}}}const v=E%C;return v>0&&(E+=C-v),M.__size=E,M.__cache={},this}function p(M){const T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?We("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(T.boundary=16,T.storage=M.byteLength):We("WebGLRenderer: Unsupported uniform value type.",M),T}function y(M){const T=M.target;T.removeEventListener("dispose",y);const E=o.indexOf(T.__bindingPointIndex);o.splice(E,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function A(){for(const M in s)n.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:A}}const Tb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Wn=null;function wb(){return Wn===null&&(Wn=new Vp(Tb,16,16,ps,gn),Wn.name="DFG_LUT",Wn.minFilter=Xt,Wn.magFilter=Xt,Wn.wrapS=Mi,Wn.wrapT=Mi,Wn.generateMipmaps=!1,Wn.needsUpdate=!0),Wn}class Ab{constructor(e={}){const{canvas:t=E_(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:d=pn}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=o;const x=d,m=new Set([Nu,Uu,Lu]),p=new Set([pn,ri,$r,Zr,Pu,Du]),y=new Uint32Array(4),A=new Int32Array(4),M=new O;let T=null,E=null;const C=[],v=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ni,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let D=!1,U=null,G=null,$=null,z=null;this._outputColorSpace=It;let Y=0,H=0,Z=null,le=-1,ne=null;const oe=new Et,pe=new Et;let Ze=null;const bt=new Ye(0);let rt=0,ee=t.width,xe=t.height,fe=1,Xe=null,qe=null;const Ve=new Et(0,0,ee,xe),P=new Et(0,0,ee,xe);let I=!1;const X=new Gu;let Q=!1,J=!1;const se=new dt,de=new O,ue=new Et,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let te=!1;function Ce(){return Z===null?fe:1}let R=i;function Pe(S,B){return t.getContext(S,B)}try{const S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${yu}`),t.addEventListener("webglcontextlost",Tt,!1),t.addEventListener("webglcontextrestored",xt,!1),t.addEventListener("webglcontextcreationerror",zn,!1),R===null){const B="webgl2";if(R=Pe(B,S),R===null)throw Pe(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw st("WebGLRenderer: "+S.message),S}let be,b,g,N,V,K,he,ge,j,ie,me,De,Se,ve,He,ke,Je,F,Me,re,ye,Ae,ae;function Oe(){be=new wS(R),be.init(),ye=new _b(R,be),b=new xS(R,be,e,ye),g=new mb(R,be),b.reversedDepthBuffer&&f&&g.buffers.depth.setReversed(!0),G=R.createFramebuffer(),$=R.createFramebuffer(),z=R.createFramebuffer(),N=new CS(R),V=new tb,K=new gb(R,be,g,V,b,ye,N),he=new TS(L),ge=new Lx(R),Ae=new gS(R,ge),j=new AS(R,ge,N,Ae),ie=new DS(R,j,ge,Ae,N),F=new PS(R,b,K),He=new vS(V),me=new eb(L,he,be,b,Ae,He),De=new bb(L,V),Se=new ib,ve=new cb(be),Je=new mS(L,he,g,ie,_,l),ke=new pb(L,ie,b),ae=new Eb(R,N,b,g),Me=new _S(R,be,N),re=new RS(R,be,N),N.programs=me.programs,L.capabilities=b,L.extensions=be,L.properties=V,L.renderLists=Se,L.shadowMap=ke,L.state=g,L.info=N}Oe(),x!==pn&&(w=new LS(x,t.width,t.height,a,s,r));const Ne=new Sb(L,R);this.xr=Ne,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const S=be.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=be.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return fe},this.setPixelRatio=function(S){S!==void 0&&(fe=S,this.setSize(ee,xe,!1))},this.getSize=function(S){return S.set(ee,xe)},this.setSize=function(S,B,q=!0){if(Ne.isPresenting){We("WebGLRenderer: Can't change size while VR device is presenting.");return}ee=S,xe=B,t.width=Math.floor(S*fe),t.height=Math.floor(B*fe),q===!0&&(t.style.width=S+"px",t.style.height=B+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,S,B)},this.getDrawingBufferSize=function(S){return S.set(ee*fe,xe*fe).floor()},this.setDrawingBufferSize=function(S,B,q){ee=S,xe=B,fe=q,t.width=Math.floor(S*q),t.height=Math.floor(B*q),this.setViewport(0,0,S,B)},this.setEffects=function(S){if(x===pn){st("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let B=0;B<S.length;B++)if(S[B].isOutputPass===!0){We("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(oe)},this.getViewport=function(S){return S.copy(Ve)},this.setViewport=function(S,B,q,k){S.isVector4?Ve.set(S.x,S.y,S.z,S.w):Ve.set(S,B,q,k),g.viewport(oe.copy(Ve).multiplyScalar(fe).round())},this.getScissor=function(S){return S.copy(P)},this.setScissor=function(S,B,q,k){S.isVector4?P.set(S.x,S.y,S.z,S.w):P.set(S,B,q,k),g.scissor(pe.copy(P).multiplyScalar(fe).round())},this.getScissorTest=function(){return I},this.setScissorTest=function(S){g.setScissorTest(I=S)},this.setOpaqueSort=function(S){Xe=S},this.setTransparentSort=function(S){qe=S},this.getClearColor=function(S){return S.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor(...arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha(...arguments)},this.clear=function(S=!0,B=!0,q=!0){let k=0;if(S){let W=!1;if(Z!==null){const we=Z.texture.format;W=m.has(we)}if(W){const we=Z.texture.type,Le=p.has(we),Te=Je.getClearColor(),Fe=Je.getClearAlpha(),Be=Te.r,je=Te.g,tt=Te.b;Le?(y[0]=Be,y[1]=je,y[2]=tt,y[3]=Fe,R.clearBufferuiv(R.COLOR,0,y)):(A[0]=Be,A[1]=je,A[2]=tt,A[3]=Fe,R.clearBufferiv(R.COLOR,0,A))}else k|=R.COLOR_BUFFER_BIT}B&&(k|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(k|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&R.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),U=S},this.dispose=function(){t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",xt,!1),t.removeEventListener("webglcontextcreationerror",zn,!1),Je.dispose(),Se.dispose(),ve.dispose(),V.dispose(),he.dispose(),ie.dispose(),Ae.dispose(),ae.dispose(),me.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",eh),Ne.removeEventListener("sessionend",th),ji.stop()};function Tt(S){S.preventDefault(),ya("WebGLRenderer: Context Lost."),D=!0}function xt(){ya("WebGLRenderer: Context Restored."),D=!1;const S=N.autoReset,B=ke.enabled,q=ke.autoUpdate,k=ke.needsUpdate,W=ke.type;Oe(),N.autoReset=S,ke.enabled=B,ke.autoUpdate=q,ke.needsUpdate=k,ke.type=W}function zn(S){st("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Hn(S){const B=S.target;B.removeEventListener("dispose",Hn),hm(B)}function hm(S){fm(S),V.remove(S)}function fm(S){const B=V.get(S).programs;B!==void 0&&(B.forEach(function(q){me.releaseProgram(q)}),S.isShaderMaterial&&me.releaseShaderCache(S))}this.renderBufferDirect=function(S,B,q,k,W,we){B===null&&(B=ce);const Le=W.isMesh&&W.matrixWorld.determinantAffine()<0,Te=mm(S,B,q,k,W);g.setMaterial(k,Le);let Fe=q.index,Be=1;if(k.wireframe===!0){if(Fe=j.getWireframeAttribute(q),Fe===void 0)return;Be=2}const je=q.drawRange,tt=q.attributes.position;let ze=je.start*Be,ht=(je.start+je.count)*Be;we!==null&&(ze=Math.max(ze,we.start*Be),ht=Math.min(ht,(we.start+we.count)*Be)),Fe!==null?(ze=Math.max(ze,0),ht=Math.min(ht,Fe.count)):tt!=null&&(ze=Math.max(ze,0),ht=Math.min(ht,tt.count));const At=ht-ze;if(At<0||At===1/0)return;Ae.setup(W,k,Te,q,Fe);let wt,mt=Me;if(Fe!==null&&(wt=ge.get(Fe),mt=re,mt.setIndex(wt)),W.isMesh)k.wireframe===!0?(g.setLineWidth(k.wireframeLinewidth*Ce()),mt.setMode(R.LINES)):mt.setMode(R.TRIANGLES);else if(W.isLine){let Ht=k.linewidth;Ht===void 0&&(Ht=1),g.setLineWidth(Ht*Ce()),W.isLineSegments?mt.setMode(R.LINES):W.isLineLoop?mt.setMode(R.LINE_LOOP):mt.setMode(R.LINE_STRIP)}else W.isPoints?mt.setMode(R.POINTS):W.isSprite&&mt.setMode(R.TRIANGLES);if(W.isBatchedMesh)if(be.get("WEBGL_multi_draw"))mt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Ht=W._multiDrawStarts,Ie=W._multiDrawCounts,cn=W._multiDrawCount,ot=Fe?ge.get(Fe).bytesPerElement:1,vn=V.get(k).currentProgram.getUniforms();for(let Vn=0;Vn<cn;Vn++)vn.setValue(R,"_gl_DrawID",Vn),mt.render(Ht[Vn]/ot,Ie[Vn])}else if(W.isInstancedMesh)mt.renderInstances(ze,At,W.count);else if(q.isInstancedBufferGeometry){const Ht=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ie=Math.min(q.instanceCount,Ht);mt.renderInstances(ze,At,Ie)}else mt.render(ze,At)};function Qu(S,B,q){S.transparent===!0&&S.side===nn&&S.forceSinglePass===!1?(S.side=an,S.needsUpdate=!0,ao(S,B,q),S.side=Ki,S.needsUpdate=!0,ao(S,B,q),S.side=nn):ao(S,B,q)}this.compile=function(S,B,q=null){q===null&&(q=S),E=ve.get(q),E.init(B),v.push(E),q.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),S!==q&&S.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),E.setupLights();const k=new Set;return S.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const we=W.material;if(we)if(Array.isArray(we))for(let Le=0;Le<we.length;Le++){const Te=we[Le];Qu(Te,q,W),k.add(Te)}else Qu(we,q,W),k.add(we)}),E=v.pop(),k},this.compileAsync=function(S,B,q=null){const k=this.compile(S,B,q);return new Promise(W=>{function we(){if(k.forEach(function(Le){V.get(Le).currentProgram.isReady()&&k.delete(Le)}),k.size===0){W(S);return}setTimeout(we,10)}be.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let ka=null;function dm(S){ka&&ka(S)}function eh(){ji.stop()}function th(){ji.start()}const ji=new Zp;ji.setAnimationLoop(dm),typeof self<"u"&&ji.setContext(self),this.setAnimationLoop=function(S){ka=S,Ne.setAnimationLoop(S),S===null?ji.stop():ji.start()},Ne.addEventListener("sessionstart",eh),Ne.addEventListener("sessionend",th),this.render=function(S,B){if(B!==void 0&&B.isCamera!==!0){st("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;U!==null&&U.renderStart(S,B);const q=Ne.enabled===!0&&Ne.isPresenting===!0,k=w!==null&&(Z===null||q)&&w.begin(L,Z);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(B),B=Ne.getCamera()),S.isScene===!0&&S.onBeforeRender(L,S,B,Z),E=ve.get(S,v.length),E.init(B),E.state.textureUnits=K.getTextureUnits(),v.push(E),se.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),X.setFromProjectionMatrix(se,Qn,B.reversedDepth),J=this.localClippingEnabled,Q=He.init(this.clippingPlanes,J),T=Se.get(S,C.length),T.init(),C.push(T),Ne.enabled===!0&&Ne.isPresenting===!0){const Le=L.xr.getDepthSensingMesh();Le!==null&&Wa(Le,B,-1/0,L.sortObjects)}Wa(S,B,0,L.sortObjects),T.finish(),L.sortObjects===!0&&T.sort(Xe,qe,B.reversedDepth),te=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,te&&Je.addToRenderList(T,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Q===!0&&He.beginShadows();const W=E.state.shadowsArray;if(ke.render(W,S,B),Q===!0&&He.endShadows(),(k&&w.hasRenderPass())===!1){const Le=T.opaque,Te=T.transmissive;if(E.setupLights(),B.isArrayCamera){const Fe=B.cameras;if(Te.length>0)for(let Be=0,je=Fe.length;Be<je;Be++){const tt=Fe[Be];ih(Le,Te,S,tt)}te&&Je.render(S);for(let Be=0,je=Fe.length;Be<je;Be++){const tt=Fe[Be];nh(T,S,tt,tt.viewport)}}else Te.length>0&&ih(Le,Te,S,B),te&&Je.render(S),nh(T,S,B)}Z!==null&&H===0&&(K.updateMultisampleRenderTarget(Z),K.updateRenderTargetMipmap(Z)),k&&w.end(L),S.isScene===!0&&S.onAfterRender(L,S,B),Ae.resetDefaultState(),le=-1,ne=null,v.pop(),v.length>0?(E=v[v.length-1],K.setTextureUnits(E.state.textureUnits),Q===!0&&He.setGlobalState(L.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?T=C[C.length-1]:T=null,U!==null&&U.renderEnd()};function Wa(S,B,q,k){if(S.visible===!1)return;if(S.layers.test(B.layers)){if(S.isGroup)q=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(B);else if(S.isLightProbeGrid)E.pushLightProbeGrid(S);else if(S.isLight)E.pushLight(S),S.castShadow&&E.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||X.intersectsSprite(S)){k&&ue.setFromMatrixPosition(S.matrixWorld).applyMatrix4(se);const Le=ie.update(S),Te=S.material;Te.visible&&T.push(S,Le,Te,q,ue.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||X.intersectsObject(S))){const Le=ie.update(S),Te=S.material;if(k&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),ue.copy(S.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),ue.copy(Le.boundingSphere.center)),ue.applyMatrix4(S.matrixWorld).applyMatrix4(se)),Array.isArray(Te)){const Fe=Le.groups;for(let Be=0,je=Fe.length;Be<je;Be++){const tt=Fe[Be],ze=Te[tt.materialIndex];ze&&ze.visible&&T.push(S,Le,ze,q,ue.z,tt)}}else Te.visible&&T.push(S,Le,Te,q,ue.z,null)}}const we=S.children;for(let Le=0,Te=we.length;Le<Te;Le++)Wa(we[Le],B,q,k)}function nh(S,B,q,k){const{opaque:W,transmissive:we,transparent:Le}=S;E.setupLightsView(q),Q===!0&&He.setGlobalState(L.clippingPlanes,q),k&&g.viewport(oe.copy(k)),W.length>0&&oo(W,B,q),we.length>0&&oo(we,B,q),Le.length>0&&oo(Le,B,q),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function ih(S,B,q,k){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[k.id]===void 0){const ze=be.has("EXT_color_buffer_half_float")||be.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[k.id]=new ln(1,1,{generateMipmaps:!0,type:ze?gn:pn,minFilter:ls,samples:Math.max(4,b.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace})}const we=E.state.transmissionRenderTarget[k.id],Le=k.viewport||oe;we.setSize(Le.z*L.transmissionResolutionScale,Le.w*L.transmissionResolutionScale);const Te=L.getRenderTarget(),Fe=L.getActiveCubeFace(),Be=L.getActiveMipmapLevel();L.setRenderTarget(we),L.getClearColor(bt),rt=L.getClearAlpha(),rt<1&&L.setClearColor(16777215,.5),L.clear(),te&&Je.render(q);const je=L.toneMapping;L.toneMapping=ni;const tt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),E.setupLightsView(k),Q===!0&&He.setGlobalState(L.clippingPlanes,k),oo(S,q,k),K.updateMultisampleRenderTarget(we),K.updateRenderTargetMipmap(we),be.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let ht=0,At=B.length;ht<At;ht++){const wt=B[ht],{object:mt,geometry:Ht,material:Ie,group:cn}=wt;if(Ie.side===nn&&mt.layers.test(k.layers)){const ot=Ie.side;Ie.side=an,Ie.needsUpdate=!0,sh(mt,q,k,Ht,Ie,cn),Ie.side=ot,Ie.needsUpdate=!0,ze=!0}}ze===!0&&(K.updateMultisampleRenderTarget(we),K.updateRenderTargetMipmap(we))}L.setRenderTarget(Te,Fe,Be),L.setClearColor(bt,rt),tt!==void 0&&(k.viewport=tt),L.toneMapping=je}function oo(S,B,q){const k=B.isScene===!0?B.overrideMaterial:null;for(let W=0,we=S.length;W<we;W++){const Le=S[W],{object:Te,geometry:Fe,group:Be}=Le;let je=Le.material;je.allowOverride===!0&&k!==null&&(je=k),Te.layers.test(q.layers)&&sh(Te,B,q,Fe,je,Be)}}function sh(S,B,q,k,W,we){S.onBeforeRender(L,B,q,k,W,we),S.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),W.onBeforeRender(L,B,q,k,S,we),W.transparent===!0&&W.side===nn&&W.forceSinglePass===!1?(W.side=an,W.needsUpdate=!0,L.renderBufferDirect(q,B,k,W,S,we),W.side=Ki,W.needsUpdate=!0,L.renderBufferDirect(q,B,k,W,S,we),W.side=nn):L.renderBufferDirect(q,B,k,W,S,we),S.onAfterRender(L,B,q,k,W,we)}function ao(S,B,q){B.isScene!==!0&&(B=ce);const k=V.get(S),W=E.state.lights,we=E.state.shadowsArray,Le=W.state.version,Te=me.getParameters(S,W.state,we,B,q,E.state.lightProbeGridArray),Fe=me.getProgramCacheKey(Te);let Be=k.programs;k.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?B.environment:null,k.fog=B.fog;const je=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;k.envMap=he.get(S.envMap||k.environment,je),k.envMapRotation=k.environment!==null&&S.envMap===null?B.environmentRotation:S.envMapRotation,Be===void 0&&(S.addEventListener("dispose",Hn),Be=new Map,k.programs=Be);let tt=Be.get(Fe);if(tt!==void 0){if(k.currentProgram===tt&&k.lightsStateVersion===Le)return oh(S,Te),tt}else Te.uniforms=me.getUniforms(S),U!==null&&S.isNodeMaterial&&U.build(S,q,Te),S.onBeforeCompile(Te,L),tt=me.acquireProgram(Te,Fe),Be.set(Fe,tt),k.uniforms=Te.uniforms;const ze=k.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(ze.clippingPlanes=He.uniform),oh(S,Te),k.needsLights=_m(S),k.lightsStateVersion=Le,k.needsLights&&(ze.ambientLightColor.value=W.state.ambient,ze.lightProbe.value=W.state.probe,ze.directionalLights.value=W.state.directional,ze.directionalLightShadows.value=W.state.directionalShadow,ze.spotLights.value=W.state.spot,ze.spotLightShadows.value=W.state.spotShadow,ze.rectAreaLights.value=W.state.rectArea,ze.ltc_1.value=W.state.rectAreaLTC1,ze.ltc_2.value=W.state.rectAreaLTC2,ze.pointLights.value=W.state.point,ze.pointLightShadows.value=W.state.pointShadow,ze.hemisphereLights.value=W.state.hemi,ze.directionalShadowMatrix.value=W.state.directionalShadowMatrix,ze.spotLightMatrix.value=W.state.spotLightMatrix,ze.spotLightMap.value=W.state.spotLightMap,ze.pointShadowMatrix.value=W.state.pointShadowMatrix),k.lightProbeGrid=E.state.lightProbeGridArray.length>0,k.currentProgram=tt,k.uniformsList=null,tt}function rh(S){if(S.uniformsList===null){const B=S.currentProgram.getUniforms();S.uniformsList=la.seqWithValue(B.seq,S.uniforms)}return S.uniformsList}function oh(S,B){const q=V.get(S);q.outputColorSpace=B.outputColorSpace,q.batching=B.batching,q.batchingColor=B.batchingColor,q.instancing=B.instancing,q.instancingColor=B.instancingColor,q.instancingMorph=B.instancingMorph,q.skinning=B.skinning,q.morphTargets=B.morphTargets,q.morphNormals=B.morphNormals,q.morphColors=B.morphColors,q.morphTargetsCount=B.morphTargetsCount,q.numClippingPlanes=B.numClippingPlanes,q.numIntersection=B.numClipIntersection,q.vertexAlphas=B.vertexAlphas,q.vertexTangents=B.vertexTangents,q.toneMapping=B.toneMapping}function pm(S,B){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;M.setFromMatrixPosition(B.matrixWorld);for(let q=0,k=S.length;q<k;q++){const W=S[q];if(W.texture!==null&&W.boundingBox.containsPoint(M))return W}return null}function mm(S,B,q,k,W){B.isScene!==!0&&(B=ce),K.resetTextureUnits();const we=B.fog,Le=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?B.environment:null,Te=Z===null?L.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:it.workingColorSpace,Fe=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Be=he.get(k.envMap||Le,Fe),je=k.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,tt=!!q.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),ze=!!q.morphAttributes.position,ht=!!q.morphAttributes.normal,At=!!q.morphAttributes.color;let wt=ni;k.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(wt=L.toneMapping);const mt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Ht=mt!==void 0?mt.length:0,Ie=V.get(k),cn=E.state.lights;if(Q===!0&&(J===!0||S!==ne)){const vt=S===ne&&k.id===le;He.setState(k,S,vt)}let ot=!1;k.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==cn.state.version||Ie.outputColorSpace!==Te||W.isBatchedMesh&&Ie.batching===!1||!W.isBatchedMesh&&Ie.batching===!0||W.isBatchedMesh&&Ie.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Ie.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Ie.instancing===!1||!W.isInstancedMesh&&Ie.instancing===!0||W.isSkinnedMesh&&Ie.skinning===!1||!W.isSkinnedMesh&&Ie.skinning===!0||W.isInstancedMesh&&Ie.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ie.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ie.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ie.instancingMorph===!1&&W.morphTexture!==null||Ie.envMap!==Be||k.fog===!0&&Ie.fog!==we||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==He.numPlanes||Ie.numIntersection!==He.numIntersection)||Ie.vertexAlphas!==je||Ie.vertexTangents!==tt||Ie.morphTargets!==ze||Ie.morphNormals!==ht||Ie.morphColors!==At||Ie.toneMapping!==wt||Ie.morphTargetsCount!==Ht||!!Ie.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(ot=!0):(ot=!0,Ie.__version=k.version);let vn=Ie.currentProgram;ot===!0&&(vn=ao(k,B,W),U&&k.isNodeMaterial&&U.onUpdateProgram(k,vn,Ie));let Vn=!1,Pi=!1,Ms=!1;const gt=vn.getUniforms(),Rt=Ie.uniforms;if(g.useProgram(vn.program)&&(Vn=!0,Pi=!0,Ms=!0),k.id!==le&&(le=k.id,Pi=!0),Ie.needsLights){const vt=pm(E.state.lightProbeGridArray,W);Ie.lightProbeGrid!==vt&&(Ie.lightProbeGrid=vt,Pi=!0)}if(Vn||ne!==S){g.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),gt.setValue(R,"projectionMatrix",S.projectionMatrix),gt.setValue(R,"viewMatrix",S.matrixWorldInverse);const Ii=gt.map.cameraPosition;Ii!==void 0&&Ii.setValue(R,de.setFromMatrixPosition(S.matrixWorld)),b.logarithmicDepthBuffer&&gt.setValue(R,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&gt.setValue(R,"isOrthographic",S.isOrthographicCamera===!0),ne!==S&&(ne=S,Pi=!0,Ms=!0)}if(Ie.needsLights&&(cn.state.directionalShadowMap.length>0&&gt.setValue(R,"directionalShadowMap",cn.state.directionalShadowMap,K),cn.state.spotShadowMap.length>0&&gt.setValue(R,"spotShadowMap",cn.state.spotShadowMap,K),cn.state.pointShadowMap.length>0&&gt.setValue(R,"pointShadowMap",cn.state.pointShadowMap,K)),W.isSkinnedMesh){gt.setOptional(R,W,"bindMatrix"),gt.setOptional(R,W,"bindMatrixInverse");const vt=W.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),gt.setValue(R,"boneTexture",vt.boneTexture,K))}W.isBatchedMesh&&(gt.setOptional(R,W,"batchingTexture"),gt.setValue(R,"batchingTexture",W._matricesTexture,K),gt.setOptional(R,W,"batchingIdTexture"),gt.setValue(R,"batchingIdTexture",W._indirectTexture,K),gt.setOptional(R,W,"batchingColorTexture"),W._colorsTexture!==null&&gt.setValue(R,"batchingColorTexture",W._colorsTexture,K));const Di=q.morphAttributes;if((Di.position!==void 0||Di.normal!==void 0||Di.color!==void 0)&&F.update(W,q,vn),(Pi||Ie.receiveShadow!==W.receiveShadow)&&(Ie.receiveShadow=W.receiveShadow,gt.setValue(R,"receiveShadow",W.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&B.environment!==null&&(Rt.envMapIntensity.value=B.environmentIntensity),Rt.dfgLUT!==void 0&&(Rt.dfgLUT.value=wb()),Pi){if(gt.setValue(R,"toneMappingExposure",L.toneMappingExposure),Ie.needsLights&&gm(Rt,Ms),we&&k.fog===!0&&De.refreshFogUniforms(Rt,we),De.refreshMaterialUniforms(Rt,k,fe,xe,E.state.transmissionRenderTarget[S.id]),Ie.needsLights&&Ie.lightProbeGrid){const vt=Ie.lightProbeGrid;Rt.probesSH.value=vt.texture,Rt.probesMin.value.copy(vt.boundingBox.min),Rt.probesMax.value.copy(vt.boundingBox.max),Rt.probesResolution.value.copy(vt.resolution)}la.upload(R,rh(Ie),Rt,K)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(la.upload(R,rh(Ie),Rt,K),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&gt.setValue(R,"center",W.center),gt.setValue(R,"modelViewMatrix",W.modelViewMatrix),gt.setValue(R,"normalMatrix",W.normalMatrix),gt.setValue(R,"modelMatrix",W.matrixWorld),k.uniformsGroups!==void 0){const vt=k.uniformsGroups;for(let Ii=0,Ss=vt.length;Ii<Ss;Ii++){const ah=vt[Ii];ae.update(ah,vn),ae.bind(ah,vn)}}return vn}function gm(S,B){S.ambientLightColor.needsUpdate=B,S.lightProbe.needsUpdate=B,S.directionalLights.needsUpdate=B,S.directionalLightShadows.needsUpdate=B,S.pointLights.needsUpdate=B,S.pointLightShadows.needsUpdate=B,S.spotLights.needsUpdate=B,S.spotLightShadows.needsUpdate=B,S.rectAreaLights.needsUpdate=B,S.hemisphereLights.needsUpdate=B}function _m(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return Z},this.setRenderTargetTextures=function(S,B,q){const k=V.get(S);k.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),V.get(S.texture).__webglTexture=B,V.get(S.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:q,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,B){const q=V.get(S);q.__webglFramebuffer=B,q.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(S,B=0,q=0){Z=S,Y=B,H=q;let k=null,W=!1,we=!1;if(S){const Te=V.get(S);if(Te.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(R.FRAMEBUFFER,Te.__webglFramebuffer),oe.copy(S.viewport),pe.copy(S.scissor),Ze=S.scissorTest,g.viewport(oe),g.scissor(pe),g.setScissorTest(Ze),le=-1;return}else if(Te.__webglFramebuffer===void 0)K.setupRenderTarget(S);else if(Te.__hasExternalTextures)K.rebindTextures(S,V.get(S.texture).__webglTexture,V.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const je=S.depthTexture;if(Te.__boundDepthTexture!==je){if(je!==null&&V.has(je)&&(S.width!==je.image.width||S.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(S)}}const Fe=S.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(we=!0);const Be=V.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Be[B])?k=Be[B][q]:k=Be[B],W=!0):S.samples>0&&K.useMultisampledRTT(S)===!1?k=V.get(S).__webglMultisampledFramebuffer:Array.isArray(Be)?k=Be[q]:k=Be,oe.copy(S.viewport),pe.copy(S.scissor),Ze=S.scissorTest}else oe.copy(Ve).multiplyScalar(fe).floor(),pe.copy(P).multiplyScalar(fe).floor(),Ze=I;if(q!==0&&(k=G),g.bindFramebuffer(R.FRAMEBUFFER,k)&&g.drawBuffers(S,k),g.viewport(oe),g.scissor(pe),g.setScissorTest(Ze),W){const Te=V.get(S.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+B,Te.__webglTexture,q)}else if(we){const Te=B;for(let Fe=0;Fe<S.textures.length;Fe++){const Be=V.get(S.textures[Fe]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Fe,Be.__webglTexture,q,Te)}}else if(S!==null&&q!==0){const Te=V.get(S.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Te.__webglTexture,q)}le=-1},this.readRenderTargetPixels=function(S,B,q,k,W,we,Le,Te=0){if(!(S&&S.isWebGLRenderTarget)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Le!==void 0&&(Fe=Fe[Le]),Fe){g.bindFramebuffer(R.FRAMEBUFFER,Fe);try{const Be=S.textures[Te],je=Be.format,tt=Be.type;if(S.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+Te),!b.textureFormatReadable(je)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!b.textureTypeReadable(tt)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=S.width-k&&q>=0&&q<=S.height-W&&R.readPixels(B,q,k,W,ye.convert(je),ye.convert(tt),we)}finally{const Be=Z!==null?V.get(Z).__webglFramebuffer:null;g.bindFramebuffer(R.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(S,B,q,k,W,we,Le,Te=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Le!==void 0&&(Fe=Fe[Le]),Fe)if(B>=0&&B<=S.width-k&&q>=0&&q<=S.height-W){g.bindFramebuffer(R.FRAMEBUFFER,Fe);const Be=S.textures[Te],je=Be.format,tt=Be.type;if(S.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+Te),!b.textureFormatReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!b.textureTypeReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ze=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,ze),R.bufferData(R.PIXEL_PACK_BUFFER,we.byteLength,R.STREAM_READ),R.readPixels(B,q,k,W,ye.convert(je),ye.convert(tt),0);const ht=Z!==null?V.get(Z).__webglFramebuffer:null;g.bindFramebuffer(R.FRAMEBUFFER,ht);const At=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await T_(R,At,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,ze),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,we),R.deleteBuffer(ze),R.deleteSync(At),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,B=null,q=0){const k=Math.pow(2,-q),W=Math.floor(S.image.width*k),we=Math.floor(S.image.height*k),Le=B!==null?B.x:0,Te=B!==null?B.y:0;K.setTexture2D(S,0),R.copyTexSubImage2D(R.TEXTURE_2D,q,0,0,Le,Te,W,we),g.unbindTexture()},this.copyTextureToTexture=function(S,B,q=null,k=null,W=0,we=0){let Le,Te,Fe,Be,je,tt,ze,ht,At;const wt=S.isCompressedTexture?S.mipmaps[we]:S.image;if(q!==null)Le=q.max.x-q.min.x,Te=q.max.y-q.min.y,Fe=q.isBox3?q.max.z-q.min.z:1,Be=q.min.x,je=q.min.y,tt=q.isBox3?q.min.z:0;else{const Rt=Math.pow(2,-W);Le=Math.floor(wt.width*Rt),Te=Math.floor(wt.height*Rt),S.isDataArrayTexture?Fe=wt.depth:S.isData3DTexture?Fe=Math.floor(wt.depth*Rt):Fe=1,Be=0,je=0,tt=0}k!==null?(ze=k.x,ht=k.y,At=k.z):(ze=0,ht=0,At=0);const mt=ye.convert(B.format),Ht=ye.convert(B.type);let Ie;B.isData3DTexture?(K.setTexture3D(B,0),Ie=R.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(K.setTexture2DArray(B,0),Ie=R.TEXTURE_2D_ARRAY):(K.setTexture2D(B,0),Ie=R.TEXTURE_2D),g.activeTexture(R.TEXTURE0),g.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,B.flipY),g.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),g.pixelStorei(R.UNPACK_ALIGNMENT,B.unpackAlignment);const cn=g.getParameter(R.UNPACK_ROW_LENGTH),ot=g.getParameter(R.UNPACK_IMAGE_HEIGHT),vn=g.getParameter(R.UNPACK_SKIP_PIXELS),Vn=g.getParameter(R.UNPACK_SKIP_ROWS),Pi=g.getParameter(R.UNPACK_SKIP_IMAGES);g.pixelStorei(R.UNPACK_ROW_LENGTH,wt.width),g.pixelStorei(R.UNPACK_IMAGE_HEIGHT,wt.height),g.pixelStorei(R.UNPACK_SKIP_PIXELS,Be),g.pixelStorei(R.UNPACK_SKIP_ROWS,je),g.pixelStorei(R.UNPACK_SKIP_IMAGES,tt);const Ms=S.isDataArrayTexture||S.isData3DTexture,gt=B.isDataArrayTexture||B.isData3DTexture;if(S.isDepthTexture){const Rt=V.get(S),Di=V.get(B),vt=V.get(Rt.__renderTarget),Ii=V.get(Di.__renderTarget);g.bindFramebuffer(R.READ_FRAMEBUFFER,vt.__webglFramebuffer),g.bindFramebuffer(R.DRAW_FRAMEBUFFER,Ii.__webglFramebuffer);for(let Ss=0;Ss<Fe;Ss++)Ms&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,V.get(S).__webglTexture,W,tt+Ss),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,V.get(B).__webglTexture,we,At+Ss)),R.blitFramebuffer(Be,je,Le,Te,ze,ht,Le,Te,R.DEPTH_BUFFER_BIT,R.NEAREST);g.bindFramebuffer(R.READ_FRAMEBUFFER,null),g.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(W!==0||S.isRenderTargetTexture||V.has(S)){const Rt=V.get(S),Di=V.get(B);g.bindFramebuffer(R.READ_FRAMEBUFFER,$),g.bindFramebuffer(R.DRAW_FRAMEBUFFER,z);for(let vt=0;vt<Fe;vt++)Ms?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Rt.__webglTexture,W,tt+vt):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Rt.__webglTexture,W),gt?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Di.__webglTexture,we,At+vt):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Di.__webglTexture,we),W!==0?R.blitFramebuffer(Be,je,Le,Te,ze,ht,Le,Te,R.COLOR_BUFFER_BIT,R.NEAREST):gt?R.copyTexSubImage3D(Ie,we,ze,ht,At+vt,Be,je,Le,Te):R.copyTexSubImage2D(Ie,we,ze,ht,Be,je,Le,Te);g.bindFramebuffer(R.READ_FRAMEBUFFER,null),g.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else gt?S.isDataTexture||S.isData3DTexture?R.texSubImage3D(Ie,we,ze,ht,At,Le,Te,Fe,mt,Ht,wt.data):B.isCompressedArrayTexture?R.compressedTexSubImage3D(Ie,we,ze,ht,At,Le,Te,Fe,mt,wt.data):R.texSubImage3D(Ie,we,ze,ht,At,Le,Te,Fe,mt,Ht,wt):S.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,we,ze,ht,Le,Te,mt,Ht,wt.data):S.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,we,ze,ht,wt.width,wt.height,mt,wt.data):R.texSubImage2D(R.TEXTURE_2D,we,ze,ht,Le,Te,mt,Ht,wt);g.pixelStorei(R.UNPACK_ROW_LENGTH,cn),g.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ot),g.pixelStorei(R.UNPACK_SKIP_PIXELS,vn),g.pixelStorei(R.UNPACK_SKIP_ROWS,Vn),g.pixelStorei(R.UNPACK_SKIP_IMAGES,Pi),we===0&&B.generateMipmaps&&R.generateMipmap(Ie),g.unbindTexture()},this.initRenderTarget=function(S){V.get(S).__webglFramebuffer===void 0&&K.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?K.setTextureCube(S,0):S.isData3DTexture?K.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?K.setTexture2DArray(S,0):K.setTexture2D(S,0),g.unbindTexture()},this.resetState=function(){Y=0,H=0,Z=null,g.reset(),Ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}}const Xf={type:"change"},Xu={type:"start"},sm={type:"end"},Ho=new Fa,Yf=new Gi,Rb=Math.cos(70*Up.DEG2RAD),Dt=new O,sn=2*Math.PI,ft={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Nl=1e-6;class Cb extends Dx{constructor(e,t=null){super(e,t),this.state=ft.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:er.ROTATE,MIDDLE:er.DOLLY,RIGHT:er.PAN},this.touches={ONE:Xi.ROTATE,TWO:Xi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new $i,this._lastTargetPosition=new O,this._quat=new $i().setFromUnitVectors(e.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Mf,this._sphericalDelta=new Mf,this._scale=1,this._panOffset=new O,this._rotateStart=new Re,this._rotateEnd=new Re,this._rotateDelta=new Re,this._panStart=new Re,this._panEnd=new Re,this._panDelta=new Re,this._dollyStart=new Re,this._dollyEnd=new Re,this._dollyDelta=new Re,this._dollyDirection=new O,this._mouse=new Re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Db.bind(this),this._onPointerDown=Pb.bind(this),this._onPointerUp=Ib.bind(this),this._onContextMenu=zb.bind(this),this._onMouseWheel=Nb.bind(this),this._onKeyDown=Fb.bind(this),this._onTouchStart=Ob.bind(this),this._onTouchMove=Bb.bind(this),this._onMouseDown=Lb.bind(this),this._onMouseMove=Ub.bind(this),this._interceptControlDown=Hb.bind(this),this._interceptControlUp=Vb.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Xf),this.update(),this.state=ft.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Dt.copy(t).sub(this.target),Dt.applyQuaternion(this._quat),this._spherical.setFromVector3(Dt),this.autoRotate&&this.state===ft.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=sn:i>Math.PI&&(i-=sn),s<-Math.PI?s+=sn:s>Math.PI&&(s-=sn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Dt.setFromSpherical(this._spherical),Dt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Dt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Dt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new O(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new O(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Dt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ho.origin.copy(this.object.position),Ho.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ho.direction))<Rb?this.object.lookAt(this.target):(Yf.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ho.intersectPlane(Yf,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Nl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Nl||this._lastTargetPosition.distanceToSquared(this.target)>Nl?(this.dispatchEvent(Xf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?sn/60*this.autoRotateSpeed*e:sn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Dt.setFromMatrixColumn(t,0),Dt.multiplyScalar(-e),this._panOffset.add(Dt)}_panUp(e,t){this.screenSpacePanning===!0?Dt.setFromMatrixColumn(t,1):(Dt.setFromMatrixColumn(t,0),Dt.crossVectors(this.object.up,Dt)),Dt.multiplyScalar(e),this._panOffset.add(Dt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Dt.copy(s).sub(this.target);let r=Dt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Re,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Pb(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Db(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Ib(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(sm),this.state=ft.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Lb(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case er.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ft.DOLLY;break;case er.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ft.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ft.ROTATE}break;case er.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ft.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ft.PAN}break;default:this.state=ft.NONE}this.state!==ft.NONE&&this.dispatchEvent(Xu)}function Ub(n){switch(this.state){case ft.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ft.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ft.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Nb(n){this.enabled===!1||this.enableZoom===!1||this.state!==ft.NONE||(n.preventDefault(),this.dispatchEvent(Xu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(sm))}function Fb(n){this.enabled!==!1&&this._handleKeyDown(n)}function Ob(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Xi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ft.TOUCH_ROTATE;break;case Xi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ft.TOUCH_PAN;break;default:this.state=ft.NONE}break;case 2:switch(this.touches.TWO){case Xi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ft.TOUCH_DOLLY_PAN;break;case Xi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ft.TOUCH_DOLLY_ROTATE;break;default:this.state=ft.NONE}break;default:this.state=ft.NONE}this.state!==ft.NONE&&this.dispatchEvent(Xu)}function Bb(n){switch(this._trackPointer(n),this.state){case ft.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ft.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ft.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ft.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ft.NONE}}function zb(n){this.enabled!==!1&&n.preventDefault()}function Hb(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Vb(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ca={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class pr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Gb=new ro(-1,1,1,-1,0,1);class kb extends Bt{constructor(){super(),this.setAttribute("position",new yt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new yt([0,2,0,0,2,0],2))}}const Wb=new kb;class Yu{constructor(e){this._mesh=new _e(Wb,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Gb)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Xb extends pr{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Yt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Qr.clone(e.uniforms),this.material=new Yt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Yu(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class qf extends pr{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Yb extends pr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class qb{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Re);this._width=i.width,this._height=i.height,t=new ln(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:gn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Xb(ca),this.copyPass.material.blending=ti,this.timer=new Ax}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}qf!==void 0&&(o instanceof qf?i=!0:o instanceof Yb&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Kb extends pr{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ye}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const $b={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ye(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class ur extends pr{constructor(e,t=1,i,s){super(),this.strength=t,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new Re(e.x,e.y):new Re(256,256),this.clearColor=new Ye(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new ln(r,o,{type:gn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const h=new ln(r,o,{type:gn});h.texture.name="UnrealBloomPass.h"+u,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const f=new ln(r,o,{type:gn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=$b;this.highPassUniforms=Qr.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Yt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Re(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new O(1,1,1),new O(1,1,1),new O(1,1,1),new O(1,1,1),new O(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Qr.clone(ca.uniforms),this.blendMaterial=new Yt({uniforms:this.copyUniforms,vertexShader:ca.vertexShader,fragmentShader:ca.fragmentShader,premultipliedAlpha:!0,blending:ga,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ye,this._oldClearAlpha=1,this._basic=new oi,this._fsQuad=new Yu(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Re(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=ur.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ur.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[],i=e/3;for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(i*i))/i);return new Yt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Re(.5,.5)},direction:{value:new Re(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Yt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}ur.BlurDirectionX=new Re(1,0);ur.BlurDirectionY=new Re(0,1);const Vo={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

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

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Zb extends pr{constructor(){super(),this.isOutputPass=!0,this.uniforms=Qr.clone(Vo.uniforms),this.material=new Yp({name:Vo.name,uniforms:this.uniforms,vertexShader:Vo.vertexShader,fragmentShader:Vo.fragmentShader}),this._fsQuad=new Yu(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},it.getTransfer(this._outputColorSpace)===at&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===bu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Eu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Tu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ua?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Au?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ru?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===wu&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const eo=461330,Jb=658709,xn=16723285,ai=58879,Ci=16757575,Ga=12173516,Fn=15918020,Go=26,ko=Math.PI/4,jb=5;function Qb(n){const e=document.createElement("canvas");e.width=64,e.height=256;const t=e.getContext("2d"),i=t.createLinearGradient(0,0,0,256);i.addColorStop(0,"#03050b"),i.addColorStop(.32,"#070b16"),i.addColorStop(.46,"#141a2e"),i.addColorStop(.5,"#3a2740"),i.addColorStop(.54,"#2a1a22"),i.addColorStop(1,"#05070d"),t.fillStyle=i,t.fillRect(0,0,64,256);const s=new Ri(e);s.mapping=ia,s.colorSpace=It;const r=new Xc(n),o=r.fromEquirectangular(s).texture;return r.dispose(),{env:o,background:s}}function eE(){return window.innerWidth<900||matchMedia("(pointer: coarse)").matches?"low":"high"}function tE(n,e={}){const t=e.quality??eE(),i=t==="low",s=matchMedia("(prefers-reduced-motion: reduce)").matches,r=new Ab({canvas:n,antialias:!i});r.setPixelRatio(Math.min(devicePixelRatio,i?1.25:2)),r.toneMapping=Ua,r.toneMappingExposure=.95;const o=new nx;o.fog=new Vu(eo,90,260);const a=Qb(r);o.background=a.background,o.environment=a.env,o.environmentIntensity=.55;const l=new ro(-1,1,1,-1,.1,2e3),c=22*Math.PI/180,u=160;l.position.set(u*Math.cos(c)*Math.sin(ko),u*Math.sin(c),u*Math.cos(c)*Math.cos(ko));const h=new Cb(l,n);h.target.set(0,3.4,-1.5),h.enablePan=!0,h.screenSpacePanning=!1,h.touches.ONE=Xi.PAN,h.touches.TWO=Xi.DOLLY_ROTATE,h.enableDamping=!0,h.dampingFactor=.08,h.minPolarAngle=Math.PI*.26,h.maxPolarAngle=Math.PI*.46,h.minAzimuthAngle=ko-Math.PI/5,h.maxAzimuthAngle=ko+Math.PI/5,h.minZoom=.7,h.maxZoom=2.6,h.update();const f=i?.5:1,d=new qb(r);d.addPass(new Kb(o,l));const _=e.bloom===!1?null:new ur(new Re(1,1),.45,.45,.58);_&&d.addPass(_),d.addPass(new Zb);function x(){const{clientWidth:ne,clientHeight:oe}=n;if(!ne||!oe)return;const pe=ne/oe;l.left=-Go*pe/2,l.right=Go*pe/2,l.top=Go/2,l.bottom=-Go/2,l.updateProjectionMatrix(),r.setSize(ne,oe,!1),d.setSize(ne,oe),_==null||_.resolution.set(ne*f,oe*f),$()}const m=new ResizeObserver(x);m.observe(n);const p=[],y=new Cx,A=new Re,M={hover:()=>{},select:()=>{}};let T=null,E=null;function C(ne){var pe;const oe=n.getBoundingClientRect();return A.x=(ne.clientX-oe.left)/oe.width*2-1,A.y=-((ne.clientY-oe.top)/oe.height)*2+1,y.setFromCamera(A,l),((pe=y.intersectObjects(p,!1)[0])==null?void 0:pe.object)??null}function v(ne){const oe=C(ne);oe!==T&&(T=oe,n.style.cursor=oe?"pointer":"grab",M.hover((oe==null?void 0:oe.userData.project)??null),$())}const w=ne=>{E={x:ne.clientX,y:ne.clientY}};function L(ne){if(!E)return;const oe=Math.hypot(ne.clientX-E.x,ne.clientY-E.y);if(E=null,oe>jb)return;const pe=C(ne);pe&&M.select(pe.userData.project)}n.addEventListener("pointermove",v),n.addEventListener("pointerdown",w),n.addEventListener("pointerup",L);const D=[],U=new Px;let G=!0;const $=()=>{G=!0},z=24,Y=3.4,H=-1.5;function Z(){const ne=h.target,oe=Up.clamp(ne.x,-z,z)-ne.x,pe=Y-ne.y,Ze=H-ne.z;!oe&&!pe&&!Ze||(ne.set(ne.x+oe,ne.y+pe,ne.z+Ze),l.position.set(l.position.x+oe,l.position.y+pe,l.position.z+Ze))}function le(){const ne=h.update();if(Z(),s){if(!ne&&!G)return}else{const oe=U.getDelta();for(const pe of D)pe(oe,U.elapsedTime)}G=!1,d.render()}return x(),{scene:o,camera:l,controls:h,renderer:r,reduceMotion:s,quality:t,invalidate:$,onFrame:ne=>D.push(ne),addPickable(ne,oe){ne.userData.project=oe,p.push(ne)},onHover:ne=>{M.hover=ne},onSelect:ne=>{M.select=ne},start:()=>r.setAnimationLoop(le),stop:()=>r.setAnimationLoop(null),dispose(){r.setAnimationLoop(null),m.disconnect(),n.removeEventListener("pointermove",v),n.removeEventListener("pointerdown",w),n.removeEventListener("pointerup",L),h.dispose(),o.traverse(ne=>{var oe;(oe=ne.geometry)==null||oe.dispose();for(const pe of[ne.material].flat().filter(Boolean)){for(const Ze of Object.values(pe))Ze!=null&&Ze.isTexture&&Ze.dispose();pe.dispose()}}),d.dispose(),r.dispose()}}}function nE(n){n.add(new Ex(3818854,1.6));const e=new Rl(12767984,2.2);e.position.set(-60,70,40),n.add(e);const t=new Rl(10466265,1.5);t.position.set(110,50,110),n.add(t);const i=new Rl(16747082,.6);i.position.set(40,-20,50),n.add(i)}let Kf=20260729;const dn=()=>(Kf=(Kf*1664525+1013904223)%4294967296)/4294967296,$f=[xn,ai,Ci,Fn];function iE(n,e){const t=document.createElement("canvas");t.width=n,t.height=e;const i=t.getContext("2d");i.fillStyle="#0c1120",i.fillRect(0,0,n,e);const s=26;for(let r=0;r<s;r++){const o=dn()*n,a=8+dn()*34,c="#"+$f[Math.floor(dn()*$f.length)].toString(16).padStart(6,"0"),u=dn()*e*.4,h=u+e*(.35+dn()*.55),f=.3+dn()*.4,d=i.createLinearGradient(0,u,0,h);d.addColorStop(0,c),d.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=d,i.globalAlpha=f,i.filter=`blur(${a*.35}px)`,i.fillRect(o-a/2,u,a,h-u)}return i.filter="none",i.globalAlpha=1,Object.assign(new Ri(t),{colorSpace:It})}function sE({length:n=90,width:e=26}={}){const t=new _t,i=-8,s=18,r=(i+s)/2,o=new _e(new Ot(400,400),new Ue({color:527123,roughness:.95,metalness:0}));o.rotation.x=-Math.PI/2,o.position.y=-.04,t.add(o);const a=iE(256,512),l=new _e(new Ot(n,e),new Ue({color:Jb,roughness:.35,metalness:.4,emissive:16777215,emissiveMap:a,emissiveIntensity:.32}));l.rotation.x=-Math.PI/2,l.position.set(0,0,r),t.add(l);const c=r-1.5,u=new _e(new Ot(n,1.4),new Ue({color:eo,roughness:.15,metalness:.6,emissive:eo,emissiveIntensity:.4}));u.rotation.x=-Math.PI/2,u.position.set(0,-.03,c),t.add(u);const h=new _e(new Ge(n,.15,.4),new Ue({color:2763827,roughness:.8,metalness:.1,emissive:2763827,emissiveIntensity:.5}));h.position.set(0,.075,-1.5),t.add(h);const f=new Ue({color:1778488,roughness:.22,metalness:.5,emissive:2306386,emissiveIntensity:.85});for(let _=0;_<18;_++){const x=.8+dn()*1.3,m=x*(.5+dn()*.4),p=new _e(new Oa(1,16),f);p.scale.set(x,m,1),p.rotation.x=-Math.PI/2,p.rotation.z=dn()*Math.PI,p.position.set((dn()-.5)*96,.01,-.8+dn()*8),t.add(p)}const d=new Ue({color:1842724,roughness:.6,metalness:.5,emissive:1842724,emissiveIntensity:.4});for(let _=0;_<4;_++){const x=new _e(new Bn(.5,.5,.04,20),d);x.position.set((dn()-.5)*(n-6),.02,i+1+dn()*(s-i-2)),t.add(x)}return t}const rE=11/48.6,oE=8/40.8;let Zf=20260729;const Ea=()=>(Zf=(Zf*1664525+1013904223)%4294967296)/4294967296;function aE(n,e,{lit:t=.3,pxCol:i=24,pxRow:s=14}={}){const r=n*i,o=e*s,a=()=>{const x=document.createElement("canvas");return x.width=r,x.height=o,[x,x.getContext("2d")]},[l,c]=a(),[u,h]=a();c.fillStyle="#20242c",c.fillRect(0,0,r,o),h.fillStyle="#000",h.fillRect(0,0,r,o);const f=[1,0,0,1,1,0,0,1],d=x=>f[x%8]===1&&f[Math.floor(x/8)%8]===1;for(let x=0;x<n;x++){const m=x*i;if(d(x)){c.fillStyle="#b9c0cc",c.fillRect(m,0,i,o),c.fillStyle="rgba(0,0,0,0.18)",c.fillRect(m+i-3,0,3,o);continue}for(let p=0;p<e;p++){const y=p*s;if(Ea()>t)continue;const A=Ea(),M=A>.82?"#a8cfe8":A>.25?"#e8c88a":"#f2e3c4";c.fillStyle=M,c.fillRect(m+3,y+2,i-6,s-5),h.fillStyle=M,h.fillRect(m+3,y+2,i-6,s-5)}}c.fillStyle="rgba(0,0,0,0.55)";for(let x=0;x<e;x++)c.fillRect(0,x*s,r,2);const _=x=>Object.assign(new Ri(x),{colorSpace:It,anisotropy:8});return{map:_(l),emissiveMap:_(u)}}function lE(){const t=document.createElement("canvas");t.width=512,t.height=1024;const i=t.getContext("2d"),s=document.createElement("canvas");s.width=512,s.height=1024;const r=s.getContext("2d");i.fillStyle="#161c28",i.fillRect(0,0,512,1024),r.fillStyle="#000",r.fillRect(0,0,512,1024);for(let a=0;a<1024;a+=26)for(let l=0;l<512;l+=26){if(Ea()>.34)continue;const c=Ea()>.5?"#cfe6f5":"#e8d4a8";i.fillStyle=c,i.fillRect(l+4,a+4,18,18),r.fillStyle=c,r.fillRect(l+4,a+4,18,18)}for(const a of[1,-1])for(let l=-1024;l<1536;l+=46)for(const[c,u,h]of[[i,"#dfe6f0",5],[r,"#41505f",5]])c.strokeStyle=u,c.lineWidth=h,c.beginPath(),c.moveTo(l,0),c.lineTo(l+a*1024,1024),c.stroke();const o=a=>Object.assign(new Ri(a),{colorSpace:It,anisotropy:8});return{map:o(t),emissiveMap:o(s)}}function Wo(n,e,t,i={}){const{map:s,emissiveMap:r}=aE(Math.max(4,Math.round(n*5/3.6)),Math.max(4,Math.round(e*5/4)),i);return new _e(new Ge(n,e,t),new Ue({map:s,emissiveMap:r,emissive:16777215,emissiveIntensity:.5,roughness:.72,metalness:.05}))}function Rr(n,e,t,i){return n.position.set(e,t+n.geometry.parameters.height/2,i),n}function cE(){const n=new _t,e=1/5,t=33*e,i=169*e,s=243*e;n.add(Rr(Wo(26,t,22,{lit:.62}),0,0,0)),n.add(Rr(Wo(15,i-t,15),0,t,0));for(const[r,o]of[[1,1],[1,-1],[-1,1],[-1,-1]])n.add(Rr(Wo(2.6,i-t+1,2.6,{lit:.22}),r*6.3,t,o*6.3));for(const r of[-1,1]){n.add(Rr(Wo(5.25,s-i,12),r*4.9,i,0)),n.add(Rr(new _e(new Ge(3.9,1.6,9),new Ue({color:6976134,roughness:.9})),r*4.9,s,0));const o=new _e(new Bn(.12,.2,6,6),new Ue({color:8029076,roughness:.8}));o.position.set(r*4.9,s+1.6+3,0),n.add(o);const a=new _e(new za(.34,10,10),new oi({color:16722731}));a.position.set(r*4.9,s+1.6+6.2,0),n.add(a)}return n}function uE(){const n=new _t,e=204/5,t=6.6,i=[[.52,0],[.74,.08],[.92,.22],[1,.42],[.97,.6],[.86,.78],[.62,.93],[.3,1]].map(([l,c])=>new Re(l*t,c*e)),{map:s,emissiveMap:r}=lE(),o=new _e(new Ba(i,28),new Ue({map:s,emissiveMap:r,emissive:16777215,emissiveIntensity:.42,roughness:.4,metalness:.2}));o.scale.z=.68,n.add(o);const a=new _e(new Ge(13,2.4,10),new Ue({color:2764602,roughness:.9}));return a.position.y=1.2,n.add(a),n}function hE(){const n=new _t,e=cE();e.scale.setScalar(rE),e.position.set(2,0,-21),n.add(e);const t=uE();return t.scale.setScalar(oE),t.position.set(-13,0,-17),n.add(t),n}let Jf=20260729;const fn=()=>(Jf=(Jf*1664525+1013904223)%4294967296)/4294967296,Fl=n=>"#"+n.toString(16).padStart(6,"0");function fE(){const o=()=>{const d=document.createElement("canvas");return d.width=120,d.height=240,[d,d.getContext("2d")]},[a,l]=o(),[c,u]=o();l.fillStyle=Fl(eo),l.fillRect(0,0,120,240),u.fillStyle="#000",u.fillRect(0,0,120,240);const h=[Fn,Ci,ai];for(let d=0;d<12;d++){const _=d*10;if(d%3===0){l.fillStyle=Fl(Ga),l.fillRect(_,0,10,240);continue}for(let x=0;x<30;x++){const m=x*8;if(fn()>.3)continue;const p=Fl(h[Math.floor(fn()*h.length)]);l.fillStyle=p,l.fillRect(_+2,m+1,6,5),u.fillStyle=p,u.fillRect(_+2,m+1,6,5)}}l.fillStyle="rgba(0,0,0,0.5)";for(let d=0;d<30;d++)l.fillRect(0,d*8,120,1);const f=d=>Object.assign(new Ri(d),{colorSpace:It});return{map:f(a),emissiveMap:f(c)}}const jf=[xn,ai,Ci];function dE({count:n=108}={}){const e=new _t,t=new Ge(1,1,1);t.translate(0,.5,0);const{map:i,emissiveMap:s}=fE(),r=new Ue({map:i,emissiveMap:s,emissive:16777215,emissiveIntensity:.2,roughness:.85,metalness:.05}),o=new hx(t,r,n),a=new Lt,l=[],c=1,u=x=>Math.max(-86-x,x-49),h=x=>x+49,f=9,d=Array.from({length:f},()=>[]);for(let x=0;x<n;x++)d[x%f].push(x);for(let x=0;x<f;x++){const m=d[x],p=x/(f-1)*c,y=m.length;m.forEach((A,M)=>{const T=Math.min(c,Math.max(0,p+(fn()-.5)*.08)),E=-25-25*T,C=u(E),v=h(E),w=C+M/y*(v-C),L=C+(M+1)/y*(v-C),D=w+fn()*(L-w),U=1-.25*T,G=(3.2+fn()*4.8)*U,$=(3.2+fn()*4.8)*U,z=7+(1-T)*8*(.4+.6*fn()),Y=(fn()-.5)*.16;a.position.set(D,0,E),a.rotation.set(0,Y,0),a.scale.set(G,z,$),a.updateMatrix(),o.setMatrixAt(A,a.matrix),T<.4&&l.push({x:D,z:E+$/2,h:z,w:G,ry:Y})})}o.instanceMatrix.needsUpdate=!0,e.add(o);const _=Math.min(12,l.length);for(let x=0;x<_;x++){const m=l[Math.floor(fn()*l.length)],p=jf[x%jf.length],y=new _e(new Ot(.5+fn()*.5,.25+fn()*.25),new Ue({color:p,emissive:p,emissiveIntensity:.5,roughness:.6}));y.position.set(m.x+(fn()-.5)*m.w*.6,m.h*(.15+fn()*.3),m.z+.03),y.rotation.y=m.ry,e.add(y)}return e}function pE(n){let e=n;return()=>(e=(e*1664525+1013904223)%4294967296)/4294967296}const Cr=420,Ol=26,mE=16,Qf=6,Kc=-55,gE=55,Xo=3.2,Yo=1.5,Bl=1.3,_E=.15,xE=4,$c=-22,Zc=9,ed=3,vE=8,zl=9,ME=.15;function SE(){const n=document.createElement("canvas");n.width=16,n.height=16;const e=n.getContext("2d"),t=e.createLinearGradient(0,0,0,16);return t.addColorStop(0,"rgba(255,255,255,0)"),t.addColorStop(.5,"rgba(255,255,255,0.9)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(6,0,4,16),new Ri(n)}function yE(){const n=document.createElement("canvas");n.width=64,n.height=64;const e=n.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,0.6)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new Ri(n)}function bE(n){const e=new Float32Array(Cr*3),t=new Float32Array(Cr),i=new Float32Array(Cr);for(let u=0;u<Cr;u++)e[u*3]=-45+n()*90,e[u*3+2]=-30+n()*42,t[u]=7+n()*5,i[u]=n()*Ol;const s=new Bt;s.setAttribute("position",new _n(e,3));const r=SE(),o=new Ye(ai).lerp(new Ye(16777215),.7),a=new Gp({map:r,color:o,size:8,sizeAttenuation:!1,transparent:!0,opacity:.28,depthWrite:!1,blending:ga}),l=new mx(s,a);function c(u){const h=s.attributes.position.array;for(let f=0;f<Cr;f++)h[f*3+1]=Ol-(u*t[f]+i[f])%Ol;s.attributes.position.needsUpdate=!0}return{points:l,update:c}}function EE(n,e){const t=Math.min(3,n.length);if(t===0)return{update(){},reset(){}};const i=Math.max(1,Math.floor(n.length/t)),s=[];for(let c=0;c<t;c++)s.push(n[c*i%n.length]);const r=s.map(c=>c.emissiveIntensity),o=s.map(()=>e()*100);function a(c){for(let u=0;u<s.length;u++){const d=Math.sin(c*.6+o[u])+Math.sin(c*1.37+o[u]*2.3)*.6<-1.05?Math.sin(c*47+o[u])>0?1:ME:1;s[u].emissiveIntensity=r[u]*d}}function l(){for(let c=0;c<s.length;c++)s[c].emissiveIntensity=r[c]}return{update:a,reset:l}}function TE(){const n=new _t,e=new Ye(eo).lerp(new Ye(9082032),.35),t=new Ue({color:e,roughness:.85,metalness:.3,emissive:e,emissiveIntensity:.4}),i=new _e(new Ge(110,.6,3),t);i.position.set(0,Zc-.3,$c),n.add(i);const s=Zc-.6;for(let r=-45;r<=45;r+=22.5){const o=new _e(new Ge(1.2,s,1.2),t);o.position.set(r,s/2,$c),n.add(o)}return n}function wE(){const n=new _t,e=new Ue({color:1777190,roughness:.6,metalness:.4}),t=new Ue({color:1708550,emissive:Fn,emissiveIntensity:.7,roughness:1}),i=new Ue({color:1705480,emissive:xn,emissiveIntensity:.6,roughness:1});for(let r=0;r<xE;r++){const o=-6.625+Xo/2+r*(Xo+_E),a=new _e(new Ge(Xo,Yo,Bl),e);a.position.set(o,0,0),n.add(a);const l=new _e(new Ot(Xo*.82,Yo*.4),t);l.position.set(o,.1,Bl/2+.01),n.add(l)}const s=new _e(new Ge(.12,.12,Bl*.5),i);return s.position.set(-13.25/2-.02,-Yo*.25,0),n.add(s),n.position.set(Kc,Zc+Yo/2,$c),n}function AE(n,e){const t=e%mE;if(t>=Qf){n.visible=!1;return}n.visible=!0,n.position.x=Kc+(gE-Kc)*(t/Qf)}function RE(n){const e=yE(),t=new Ye(Ci).lerp(new Ye(9476523),.75),i=new _t,s=[],r=[],o=[];for(let l=0;l<ed;l++){const c=new zp({map:e,color:t,transparent:!0,opacity:0,depthWrite:!1}),u=new lx(c),h=1.6+n()*.8;u.scale.set(h,h,1),r.push({x:-18+n()*36,y:5.5+n()*1.5,z:-3+n()*3}),o.push(n()*zl),s.push(u),i.add(u)}function a(l){for(let c=0;c<ed;c++){const u=(l+o[c])%zl/zl,h=r[c];s[c].position.set(h.x,h.y+u*vE,h.z);const f=u<.2?u/.2:u>.75?(1-u)/.25:1;s[c].material.opacity=.3*f}}return{group:i,update:a}}function CE({reduceMotion:n=!1,flickerMaterials:e=[]}={}){const t=new _t,i=pE(31337);t.add(TE());function s(u){u.reset(),t.traverse(h=>{var f;(f=h.geometry)==null||f.dispose();for(const d of[h.material].flat().filter(Boolean)){for(const _ of Object.values(d))_!=null&&_.isTexture&&_.dispose();d.dispose()}})}if(n){const u={update(){},reset(){}};return{group:t,update(){},dispose:()=>s(u)}}const r=bE(i);t.add(r.points);const o=wE();t.add(o);const a=RE(i);t.add(a.group);const l=EE(e,i);function c(u,h){r.update(h),AE(o,h),a.update(h),l.update(h)}return{group:t,update:c,dispose:()=>s(l)}}const ms="'Shippori Mincho', serif",PE=4,DE=1/3.5,IE=n=>typeof n=="number"?"#"+n.toString(16).padStart(6,"0"):n;function LE(n){let e=0;for(let t=0;t<n.length;t++)e=e*31+n.charCodeAt(t)>>>0;return e||1}function td(n,e,t,i){let s=i;for(n.font=`bold ${s}px ${ms}`;s>6&&n.measureText(e).width>t;)s-=2,n.font=`bold ${s}px ${ms}`;return s}function nd(n,e,t,i){let s=i;for(n.font=`bold ${s}px ${ms}`;s>6&&(s*e.length*1.05>i||e.some(r=>n.measureText(r).width>t));)s-=2,n.font=`bold ${s}px ${ms}`;return s}function qu(n,e,t,i,s,r){const o=t*.12;if(r==="vertical"){const u=Array.from(i),h=s?Array.from(s):[],f=h.length>0,d=(f?e*.55:e*.7)-o,_=t-o*2,x=nd(n,u,d,_),m=x*1.05;let p=t/2-m*u.length/2+m/2;const y=f?e*.66:e/2,A=u.map(M=>{const T={text:M,x:y,y:p,size:x};return p+=m,T});if(f){const M=nd(n,h,d*.6,_*.8),T=M*1.05;let E=t/2-T*h.length/2+T/2;for(const C of h)A.push({text:C,x:e*.28,y:E,size:M}),E+=T}return A}const a=e-o*2,l=td(n,i,a,s?t*.55:t*.7),c=[{text:i,x:e/2,y:s?t*.4:t/2,size:l}];if(s){const u=td(n,s,a,t*.22);c.push({text:s,x:e/2,y:t*.74,size:u})}return c}function id(n,{text:e,x:t,y:i,size:s},r){n.font=`bold ${s}px ${ms}`,n.textAlign="center",n.textBaseline="middle",n.lineJoin="round",n.fillStyle=r,n.shadowColor=r,n.shadowBlur=s*.75,n.fillText(e,t,i),n.fillText(e,t,i),n.shadowBlur=s*.3,n.fillText(e,t,i),n.shadowBlur=s*.1,n.shadowColor="#fff",n.strokeStyle="#fff",n.lineWidth=s*.07,n.strokeText(e,t,i),n.shadowBlur=0,n.shadowColor="transparent"}function rm(n,e,t,i,s,r,o,a){n.fillStyle="#0a0a0d",n.fillRect(0,0,t,i),e.fillStyle="#000",e.fillRect(0,0,t,i);const l=i*.08;for(const u of[n,e])u.strokeStyle=a,u.lineWidth=Math.max(2,i*.015),u.strokeRect(l,l,t-l*2,i-l*2);const c=qu(n,t,i,s,r,o);for(const u of c)id(n,u,a),id(e,u,a)}function UE(n,e,t,i,s,r,o,a){n.fillStyle=a,n.fillRect(0,0,t,i),e.fillStyle=a,e.fillRect(0,0,t,i);const l=qu(n,t,i,s,r,o);for(const c of[n,e]){c.fillStyle="#000",c.textAlign="center",c.textBaseline="middle";for(const u of l)c.font=`bold ${u.size}px ${ms}`,c.fillText(u.text,u.x,u.y)}}function NE(n){const e=parseInt(n.slice(1),16),t=e>>16&255,i=e>>8&255,s=e&255,r=(t+i+s)/3,o=a=>Math.round(a*.3+r*.3+30);return`rgb(${o(t)},${o(i)},${o(s)})`}function FE(n,e,t,i,s,r,o,a){e.fillStyle="#000",e.fillRect(0,0,t,i),n.fillStyle=NE(a),n.fillRect(0,0,t,i);let l=LE(s);const c=()=>(l=(l*1664525+1013904223)%4294967296)/4294967296;n.strokeStyle="rgba(0,0,0,0.15)";for(let h=0;h<40;h++){n.lineWidth=c()*1.5;const f=c()*t,d=c()*i;n.beginPath(),n.moveTo(f,d),n.lineTo(f+(c()-.5)*30,d+(c()-.5)*30),n.stroke()}n.fillStyle="rgba(255,255,255,0.06)";for(let h=0;h<300;h++)n.fillRect(c()*t,c()*i,1,1);const u=qu(n,t,i,s,r,o);n.textAlign="center",n.textBaseline="middle",n.fillStyle="#e8ded0",n.strokeStyle="rgba(0,0,0,0.4)";for(const h of u)n.font=`bold ${h.size}px ${ms}`,n.lineWidth=h.size*.06,n.strokeText(h.text,h.x,h.y),n.fillText(h.text,h.x,h.y)}const OE={neon:rm,lightbox:UE,painted:FE};function gs(n){const{text:e,sub:t="",style:i="neon",orientation:s="horizontal",color:r="#FF2D55",px:o=256}=n,a=IE(r),l=s==="vertical"?DE:PE,c=o,u=Math.round(c*l),h=document.createElement("canvas");h.width=u,h.height=c;const f=document.createElement("canvas");f.width=u,f.height=c;const d=h.getContext("2d"),_=f.getContext("2d");(OE[i]??rm)(d,_,u,c,e,t,s,a);const x=m=>Object.assign(new Ri(m),{colorSpace:It,anisotropy:8});return{map:x(h),emissiveMap:x(f),aspect:u/c}}const BE=1577999,zE=7041664,HE=13289402,fs=new Ue({color:BE,roughness:.9});new Ue({color:zE,roughness:.5,metalness:.2});const om=new Ue({color:HE,roughness:.6});new Ue({color:Ga,roughness:.85});const sd=[[.22,0],[.75,.08],[1,.3],[1.05,.55],[.95,.78],[.6,.94],[.22,1]];function VE({color:n=Ci,size:e=.28}={}){const t=e/2,i=e*1.5,s=new _t,r=sd.map(([u,h])=>new Re(u*t,h*i)),o=new _e(new Ba(r,10),new Ue({color:n,emissive:n,emissiveIntensity:1.4,roughness:.6,side:nn}));s.add(o);for(const[u,h]of sd.slice(1,-1)){const f=new _e(new ku(u*t,t*.035,5,10),fs);f.rotation.x=Math.PI/2,f.position.y=h*i,s.add(f)}const a=i*.08,l=new _e(new Bn(t*.15,t*.2,a,8),fs);l.position.y=a/2,s.add(l);const c=new _e(new Bn(t*.28,t*.22,a,8),fs);return c.position.y=i+a/2,s.add(c),s}function am({color:n=xn,width:e=1.2}={}){const i=new _t,s=new _e(new Bn(.015,.015,e*1.05,6),fs);s.rotation.z=Math.PI/2,s.position.y=.5,i.add(s);const r=3,o=.025,a=(e-o*(r-1))/r,l=new Ue({color:n,roughness:.85,side:nn});for(let c=0;c<r;c++){const u=new _e(new Ge(a,.5,.02),l);u.position.set(-e/2+a/2+c*(a+o),.5/2,0),i.add(u)}return i}function lm({color:n=ai}={}){const s=new _t,r=new _e(new Ge(1.1,1.9,.75),om);r.position.y=1.9/2,s.add(r);const o=new _e(new Ge(1.1*.86,1.9*.68,.02),new Ue({color:n,emissive:n,emissiveIntensity:1.3,roughness:.4}));o.position.set(0,1.9*.56,.75/2+.011),s.add(o);const a=new _e(new Ge(1.1*.94,1.9*.09,.02),new Ue({color:xn,emissive:xn,emissiveIntensity:1.1}));a.position.set(0,1.9*.92,.75/2+.011),s.add(a);const l=new _e(new Ge(1.1*.86,1.9*.12,.03),fs);return l.position.set(0,1.9*.16,.75/2+.015),s.add(l),s}function GE(){const i=new _t,s=new _e(new Ge(.8,.6,.3),om);s.position.y=.6/2,i.add(s);const r=5;for(let a=0;a<r;a++){const l=new _e(new Ge(.7040000000000001,.02,.02),fs);l.position.set(0,.6*.18+a*(.6*.5/r),.3/2+.005),i.add(l)}const o=new _e(new Bn(.6*.28,.6*.28,.03,8),fs);return o.rotation.x=Math.PI/2,o.position.set(0,.6*.72,.3/2+.01),i.add(o),i}const qo=4,Gs=5,kE=6.2,WE=4.4,Cn=-1.5,Ko=["#FF2D55","#FFB347","#00E5FF","#FF6FA8","#7CE7C4"],rd=["居酒屋","焼鳥","ラーメン","バー","喫茶","小料理","酒場","おでん","寿司"];function Jc(n,e,t){return new _e(new Ot(n,e),t)}const Hl=new Ue({color:658450,roughness:.9});function od(n,e,t,i,s){const r=new _t;r.add(Jc(n,e,t));const o=new _e(new Ge(n+.1,e+.1,.05),Hl);o.position.z=-.03,r.add(o);const a=new _e(new Ge(.045,e,.03),Hl);a.position.z=.015,r.add(a);const l=new _e(new Ge(n,.045,.03),Hl);return l.position.z=.015,r.add(l),r.position.set(i,s,Cn+.02),r}function XE(n,e,t){const i=new _t,s=Ko[e%Ko.length],r=kE+e%3*.35,o=.06+e%4*.012,a=new _e(new Ge(qo-.12,r,Gs),new Ue({color:new Ye(o,o*.95,o*1.15),roughness:.9}));a.position.set(0,r/2,Cn-Gs/2),i.add(a);const l=new _e(new Ge(qo,.18,Gs+.7),new Ue({color:1316639,roughness:.95}));l.position.set(0,r+.09,Cn-Gs/2+.35),i.add(l);const c=new _e(new Ge(1.7,2.1,.5),new Ue({color:1708550,emissive:Fn,emissiveIntensity:.5,roughness:1}));c.position.set(-.55,1.05,Cn-.24),i.add(c);const u=am({color:s,width:1.6});u.position.set(-.55,1.58,Cn+.04),i.add(u);const h=new Ue({color:1840136,emissive:Fn,emissiveIntensity:.75,roughness:1,metalness:0});i.add(od(1.15,.95,h,1.05,1.35));const f=e%3===1?new Ue({color:856087,roughness:.4,metalness:.15}):h;i.add(od(1.3,.9,f,-.4,r-1.5));const d=gs({text:n.title,style:"neon",orientation:"horizontal",color:s,px:256}),_=new Ue({map:d.map,emissiveMap:d.emissiveMap,emissive:16777215,emissiveIntensity:1,roughness:.5}),x=3.1,m=Jc(x,x/d.aspect,_);m.position.set(-.25,2.95,Cn+.09),i.add(m);const p=gs({text:rd[e%rd.length],style:e%2?"neon":"lightbox",orientation:"vertical",color:Ko[(e+2)%Ko.length],px:256}),y=new Ue({map:p.map,emissiveMap:p.emissiveMap,emissive:16777215,emissiveIntensity:.85,roughness:.5,side:nn}),A=1.8,M=Jc(A*p.aspect,A,y);M.position.set(qo/2-.3,r-1.05,Cn+.6),M.rotation.y=-Math.PI/2,i.add(M);const T=VE({color:e%3===0?Ci:xn,size:.4});T.position.set(-1.65,1.85,Cn+.42),i.add(T);const E=[];T.traverse(U=>{U.material&&(U.material=U.material.clone(),U.material.emissive&&E.push(U.material))});const C=E.map(U=>U.emissiveIntensity),v=GE();v.position.set(1.35,r-2.4,Cn+.02),i.add(v);let w=null;e%t===0&&(w=new $p(new Ye(s),3.2,11,2),w.position.set(0,1.9,Cn+2.2),i.add(w));const L=new _e(new Ge(qo,r+1.2,Gs+1.4),new oi({transparent:!0,opacity:0,depthWrite:!1}));L.position.set(0,(r+1.2)/2,Cn-Gs/2+.5),i.add(L);function D(U){_.emissiveIntensity=U?2:1,y.emissiveIntensity=U?1.5:.85,c.material.emissiveIntensity=U?1.1:.5,h.emissiveIntensity=U?.95:.55,E.forEach((G,$)=>{G.emissiveIntensity=C[$]*(U?1.9:1)}),w&&(w.intensity=U?8:3.2)}return{group:i,hit:L,setHover:D,project:n,vertMat:y}}function YE(n,{lightEvery:e=1}={}){const t=new _t,i=n.map((s,r)=>{const o=XE(s,r,e);return o.group.position.x=(r-(n.length-1)/2)*WE,t.add(o.group),o});return{group:t,stalls:i}}const ks=12.5,Yn=7,Ws=1536,to=768,zi=48,Vl=76,cm=130,hr=68,$o="'DM Mono', ui-monospace, monospace";function qE(n){const e=()=>{const c=document.createElement("canvas");return c.width=Ws,c.height=to,[c,c.getContext("2d")]},[t,i]=e(),[s,r]=e();for(const c of[i,r])c.fillStyle="#04050a",c.fillRect(0,0,Ws,to),c.textBaseline="middle";const o=(c,u)=>{c.fillStyle="#ffcf8a",c.font=`500 36px ${$o}`,c.fillText("行先  DESTINATION",zi,Vl),c.textAlign="right",c.fillText("YEAR   STATUS",Ws-zi,Vl),c.textAlign="left",c.fillStyle="#8a6a34",c.fillRect(zi,Vl+32,Ws-zi*2,3)};o(i),o(r);const a=c=>"#"+c.toString(16).padStart(6,"0");n.forEach((c,u)=>{const h=cm+u*hr+hr/2,f=c.status==="live",d=f?a(Ci):"#9a8663",_=f?a(ai):"#7d7361";for(const x of[i,r])x.font=`500 38px ${$o}`,x.fillStyle=a(Fn),x.fillText(String(u+1).padStart(2,"0"),zi,h),x.font=`500 44px ${$o}`,x.fillStyle=d,x.fillText(c.title,zi+110,h),x.textAlign="right",x.font=`400 32px ${$o}`,x.fillStyle="#8e8a7e",x.fillText(c.year??"",Ws-zi-230,h),x.fillStyle=_,x.fillText(f?"ON TIME":"DELAYED",Ws-zi,h),x.textAlign="left"});const l=c=>Object.assign(new Ri(c),{colorSpace:It,anisotropy:8});return{map:l(t),emissiveMap:l(s)}}function KE(n){const e=cm+n*hr+hr/2;return Yn/2-e/to*Yn}function $E(n){const e=new _t,t=2.6,{map:i,emissiveMap:s}=qE(n),r=new Ue({map:i,emissiveMap:s,emissive:16777215,emissiveIntensity:1,roughness:.55}),o=new _e(new Ot(ks,Yn),r);o.position.set(0,t+Yn/2,.07),e.add(o);const a=new Ue({color:1316639,roughness:.85}),l=new _e(new Ge(ks+.5,Yn+.5,.3),a);l.position.set(0,t+Yn/2,-.08),e.add(l);const c=new _e(new Ge(ks+.7,.16,.8),a);c.position.set(0,t+Yn+.32,.22),e.add(c);for(const d of[-1,1]){const _=new _e(new Ge(.3,t,.3),a);_.position.set(d*(ks/2-.6),t/2,0),e.add(_)}const u=new _e(new Ot(ks-.4,hr/to*Yn),new oi({color:Ci,transparent:!0,opacity:.16}));u.visible=!1,u.position.z=.1,e.add(u);const h=new oi({transparent:!0,opacity:0,depthWrite:!1}),f=n.map((d,_)=>{const x=t+Yn/2+KE(_),m=new _e(new Ge(ks-.4,hr/to*Yn,.5),h);return m.position.set(0,x,.2),e.add(m),{hit:m,project:d,setHover(p){u.visible=p,p&&(u.position.y=x),r.emissiveIntensity=p?1.35:1}}});return{group:e,rows:f}}const jc=n=>"#"+n.toString(16).padStart(6,"0"),ad=[ai,xn,Ci],ld=1.1,Gl=1.9,Zo=.75,cd=.08;function ZE(){const n=new _t,e=new _e(new Bn(.24,.27,.6,10),new Ue({color:2895670,roughness:.6,metalness:.15}));e.position.y=.3,n.add(e);const t=new _e(new Bn(.26,.26,.05,10),new Ue({color:ai,emissive:ai,emissiveIntensity:.25,roughness:.5}));return t.position.y=.62,n.add(t),n}function JE(){const n=new _e(new Oa(1,16),new Ue({color:1778488,roughness:.25,metalness:.5,emissive:Fn,emissiveIntensity:.3}));return n.scale.set(1.4,1,1),n.rotation.x=-Math.PI/2,n.position.y=.015,n}function jE(){const n=new _t,e=ad.length,t=e*ld+(e-1)*cd,i=.1,s=new _e(new Ge(t+.3,i,Zo+.3),new Ue({color:Ga,roughness:.9}));s.position.set(0,i/2,0),n.add(s);const r=[];ad.forEach((x,m)=>{const p=lm({color:x});p.traverse(y=>{y.material&&(y.material=y.material.clone(),y.material.emissive&&r.push(y.material))}),p.position.set((m-(e-1)/2)*(ld+cd),i,0),n.add(p)});const o=r.map(x=>x.emissiveIntensity),a=gs({text:"Résumé",sub:"PDF",style:"lightbox",orientation:"horizontal",color:jc(Fn),px:256}),l=new Ue({map:a.map,emissiveMap:a.emissiveMap,emissive:16777215,emissiveIntensity:.9,roughness:.5}),c=1,u=new _e(new Ot(c,c/a.aspect),l);u.position.set(0,i+Gl+.2,Zo/2-.02),n.add(u);const h=ZE();h.position.set(t/2+.55,0,.1),n.add(h);const f=JE();f.position.set(0,0,Zo/2+.9),n.add(f);const d=new _e(new Ge(t+1.6,i+Gl+.7,Zo+1.4),new oi({transparent:!0,opacity:0,depthWrite:!1}));d.position.set(.3,(i+Gl+.7)/2,.1),n.add(d);function _(x){r.forEach((m,p)=>{m.emissiveIntensity=o[p]*(x?1.9:1)}),l.emissiveIntensity=x?1.8:.9}return{group:n,hit:d,setHover:_}}const Pr=4,Ur=4,Hi=5.5,pi=Ur/2;function ud(n,e,t,i,s,r){const o=new _t;o.add(new _e(new Ot(n,e),t));const a=new _e(new Ge(n+.08,e+.08,.04),new Ue({color:1316639,roughness:.9}));return a.position.z=-.025,o.add(a),o.position.set(i,s,r),o}function QE(){const n=new _t,e=new _e(new Ge(Pr,Hi,Ur),new Ue({color:Ga,roughness:.85}));e.position.y=Hi/2,n.add(e);const t=new Ue({color:1316639,roughness:.95}),i=new _e(new Ge(Pr+.3,.2,Ur+.3),t);i.position.y=Hi+.1,n.add(i);const s=new _e(new Ge(Pr+.06,.12,Ur+.06),t);s.position.y=Hi/2,n.add(s);const r=1.3,o=2.3,a=new Ue({color:1708550,emissive:Fn,emissiveIntensity:.55,roughness:1}),l=new _e(new Ge(r,o,.4),a);l.position.set(0,o/2,pi-.18),n.add(l);const c=new Ue({color:1840136,emissive:Fn,emissiveIntensity:.8,roughness:1});n.add(ud(1.1,1,c,1.1,1.1,pi+.02));const u=new _e(new Ge(.9,.12,.3),new Ue({color:2760725,roughness:.85}));u.position.set(1.1,.75,pi-.32),n.add(u),n.add(ud(.9,.8,new Ue({color:856087,roughness:.4}),-.6,Hi-1.3,pi+.02));const h=new Ue({color:2829099,roughness:.6,metalness:.2}),f=new _e(new Bn(.03,.03,.32,6),h);f.rotation.z=Math.PI/2,f.position.set(0,o+.55,pi+.1),n.add(f);const d=new Ue({color:xn,emissive:xn,emissiveIntensity:1.6,roughness:.4}),_=new _e(new za(.22,12,10),d);_.position.set(0,o+.55,pi+.28),n.add(_);const x=gs({text:"交番",style:"lightbox",orientation:"vertical",color:jc(xn),px:256}),m=new Ue({map:x.map,emissiveMap:x.emissiveMap,emissive:16777215,emissiveIntensity:.85,roughness:.5,side:nn}),p=1.4,y=new _e(new Ot(p*x.aspect,p),m);y.position.set(Pr/2-.2,Hi-1,pi+.5),y.rotation.y=-Math.PI/2,n.add(y);const A=gs({text:"Contact",style:"lightbox",orientation:"horizontal",color:jc(Fn),px:256}),M=new Ue({map:A.map,emissiveMap:A.emissiveMap,emissive:16777215,emissiveIntensity:.8,roughness:.5}),T=.7,E=new _e(new Ot(T,T/A.aspect),M);E.position.set(-1.1,1.75,pi+.02),n.add(E);const C=new _e(new Ge(.7,.55,.04),new Ue({color:3877404,roughness:.9}));C.position.set(-1.1,.85,pi+.04),n.add(C);const v=new Ue({color:15920608,roughness:.9});for(const[D,U,G]of[[-.12,.09,.12],[.1,-.03,-.1],[-.02,-.13,.05]]){const $=new _e(new Ot(.2,.26),v);$.position.set(C.position.x+D,C.position.y+U,C.position.z+.03),$.rotation.z=G,n.add($)}const w=new _e(new Ge(Pr+1.2,Hi+1.2,Ur+1.4),new oi({transparent:!0,opacity:0,depthWrite:!1}));w.position.set(0,(Hi+1.2)/2,.2),n.add(w);function L(D){a.emissiveIntensity=D?1:.55,c.emissiveIntensity=D?1.3:.8,d.emissiveIntensity=D?2.3:1.6,m.emissiveIntensity=D?1.4:.85,M.emissiveIntensity=D?1.3:.8}return{group:n,hit:w,setHover:L}}const Xs=7,Ys=5.5,Sn=0,mi=3.9,$s=.9,Qc=.2,hd=mi+$s+Qc,fd=-1.4,dd=1.5,eT=-2.9,um=1053465,tT=2369326,nT=9075292,qs=14676735,iT="#00E5FF",pd=new Ue({color:um,roughness:.9}),sT=new Ue({color:nT,roughness:.8});function eu(n,e,t){return new _e(new Ot(n,e),t)}function rT(n,e,t,i,s){const r=new _t;r.add(eu(n,e,t));const o=new _e(new Ge(n+.08,e+.08,.05),pd);o.position.z=-.04,r.add(o);for(const a of[-n/6,n/6]){const l=new _e(new Ge(.05,e,.03),pd);l.position.set(a,0,.02),r.add(l)}return r.position.set(i,s,Sn+.02),r}function oT(){const n=new _t,e=new _e(new Ge(Xs,mi,Ys),new Ue({color:tT,roughness:.85}));e.position.set(0,mi/2,Sn-Ys/2),n.add(e);const t=new _e(new Ge(Xs,$s,.45),new Ue({color:xn,roughness:.6}));t.position.set(0,mi+$s/2,Sn-.05),n.add(t);const i=new Ue({color:qs,emissive:qs,emissiveIntensity:1.4,roughness:.5}),s=new _e(new Ge(Xs*.92,.06,.05),i);s.position.set(0,mi+.06,Sn+.18),n.add(s);const r=new _e(new Ge(Xs+.3,Qc,Ys+.3),new Ue({color:um,roughness:.95}));r.position.set(0,mi+$s+Qc/2,Sn-Ys/2+.15),n.add(r);const o=new Ue({color:qs,emissive:qs,emissiveIntensity:1.05,roughness:1,transparent:!0,opacity:.42,side:nn}),a=4,l=mi-.25;n.add(rT(a,l,o,1.4,l/2+.1));const c=.3,u=.015,h=[[-.1,.6,1.6],[.9,.7,1.9],[1.9,.6,1.3],[2.9,.7,1.8]];for(const[G,$,z]of h){const Y=new _e(new Ge($,z,c),sT);Y.position.set(G,z/2,u-c/2),n.add(Y)}const f=new Ue({color:1317154,emissive:qs,emissiveIntensity:1,roughness:1}),d=new _e(new Ge(dd,2.3,.5),f);d.position.set(fd,1.15,Sn-.25),n.add(d);const _=am({color:xn,width:dd*.92});_.position.set(fd,1.8,Sn+.05),n.add(_);const x=lm({color:ai});x.position.set(eT,0,Sn+.35),n.add(x);const m=[];x.traverse(G=>{var $;(($=G.material)==null?void 0:$.emissiveIntensity)>0&&m.push(G.material)});const p=m.map(G=>G.emissiveIntensity),y=gs({text:"Profile",style:"lightbox",orientation:"horizontal",color:iT,px:256}),A=new Ue({map:y.map,emissiveMap:y.emissiveMap,emissive:16777215,emissiveIntensity:.8,roughness:.5}),M=$s*.72,T=eu(M*y.aspect,M,A);T.position.set(0,mi+$s/2,Sn+.2),n.add(T);const E=gs({text:"コンビニ",style:"neon",orientation:"vertical",color:"#FFB347",px:256}),C=new Ue({map:E.map,emissiveMap:E.emissiveMap,emissive:16777215,emissiveIntensity:.85,roughness:.5,side:nn}),v=1.5,w=eu(v*E.aspect,v,C);w.position.set(Xs/2-.25,mi-.95,Sn+.6),w.rotation.y=-Math.PI/2,n.add(w);const L=new $p(new Ye(qs),5,11,2);L.position.set(1.4,1.2,Sn+2.6),n.add(L);const D=new _e(new Ge(Xs+1.2,hd+1.2,Ys+1.6),new oi({transparent:!0,opacity:0,depthWrite:!1}));D.position.set(0,(hd+1.2)/2,Sn-Ys/2+.5),n.add(D);function U(G){o.emissiveIntensity=G?1.65:1.05,i.emissiveIntensity=G?2.1:1.4,A.emissiveIntensity=G?1.4:.8,C.emissiveIntensity=G?1.5:.85,f.emissiveIntensity=G?1.5:1,L.intensity=G?9:5.5,m.forEach(($,z)=>{$.emissiveIntensity=p[z]*(G?1.6:1)})}return{group:n,hit:D,setHover:U}}const aT={class:"min-h-screen bg-[#070A12] text-[#E8E3D8] font-body px-5 py-10 sm:px-10 sm:py-16"},lT={class:"max-w-2xl mx-auto"},cT={class:"flex flex-col gap-4"},uT=["href"],hT={class:"font-display text-lg text-[#E8E3D8] group-hover:text-[#FFB347] group-hover:underline underline-offset-4"},fT={class:"mt-1 text-sm text-[#E8E3D8]/70"},dT={class:"mt-1 text-sm text-[#E8E3D8]/45"},pT={class:"mt-2 font-mono text-xs text-[#E8E3D8]/45"},mT={key:1,class:"opacity-70"},gT={class:"font-display text-lg text-[#E8E3D8]"},_T={class:"mt-1 text-sm text-[#E8E3D8]/70"},xT={class:"mt-1 text-sm text-[#E8E3D8]/45"},vT={class:"mt-2 font-mono text-xs text-[#E8E3D8]/45"},md={__name:"ProjectList",props:{projects:{type:Array,required:!0}},setup(n){function e(t){return t==="live"?"live":t==="WIP"?"in progress":t==="coming-soon"?"planned":t}return(t,i)=>(Pn(),vi("div",aT,[kt("div",lT,[i[2]||(i[2]=r0('<header class="mb-10"><h1 class="font-display text-3xl sm:text-4xl text-[#FFB347]">Paulo Gonzales</h1><p class="mt-3 text-[#E8E3D8]/90"> Project catalog — software built by Paulo Gonzales, software engineer. </p><p class="mt-5 flex flex-wrap gap-x-6 gap-y-2"><a href="./projects/profile/" class="text-[#FFB347] underline decoration-[#FFB347]/40 underline-offset-4 hover:decoration-[#FFB347] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]">Profile</a><a href="./assets/Paulo_Gonzales_Resume_SoftwareEngineer.pdf" download="Paulo_Gonzales_Resume_SoftwareEngineer.pdf" class="text-[#FFB347] underline decoration-[#FFB347]/40 underline-offset-4 hover:decoration-[#FFB347] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]">Resume (PDF)</a></p></header>',1)),kt("section",null,[i[1]||(i[1]=kt("h2",{class:"font-display text-xl text-[#FFB347] mb-4"},"Projects",-1)),kt("ul",cT,[(Pn(!0),vi(Kn,null,Cg(n.projects,s=>(Pn(),vi("li",{key:s.id,class:"border border-[#E8E3D8]/15 rounded-md p-4"},[s.status!=="coming-soon"?(Pn(),vi("a",{key:0,href:s.url,class:"block group rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]"},[kt("h3",hT,Jt(s.title),1),kt("p",fT,Jt(s.tagline),1),kt("p",dT,Jt(s.description),1),kt("p",pT,Jt(s.category)+" · "+Jt(s.year)+" · "+Jt(s.tools.join(", "))+" · "+Jt(e(s.status)),1)],8,uT)):(Pn(),vi("div",mT,[kt("h3",gT,[Sp(Jt(s.title)+" ",1),i[0]||(i[0]=kt("span",{class:"ml-2 align-middle text-[0.65rem] uppercase tracking-wide text-[#FF2D55]"},"Planned",-1))]),kt("p",_T,Jt(s.tagline),1),kt("p",xT,Jt(s.description),1),kt("p",vT,Jt(s.category)+" · "+Jt(s.year)+" · "+Jt(s.tools.join(", "))+" · "+Jt(e(s.status)),1)]))]))),128))])])])]))}},MT={class:"relative h-full w-full bg-[#070a12]"},ST={key:1,class:"h-full w-full overflow-y-auto"},yT={key:2,class:"pointer-events-none absolute inset-x-0 bottom-7 flex justify-center","aria-hidden":"true","data-hint":""},bT={__name:"ShinjukuScene",props:{projects:{type:Array,required:!0}},emits:["select","hover"],setup(n,{emit:e}){const t=n,i=e,s=Jo(null),r=Jo(!1),o=Jo(!0);let a=null,l=null,c=null;return Jd(()=>{try{l=tE(s.value)}catch(M){console.error("WebGL unavailable, falling back to the project list.",M),r.value=!0;return}nE(l.scene);const u=l.quality==="low";l.scene.add(sE({length:170,width:26})),l.scene.add(dE({count:u?54:108})),l.scene.add(hE());const{group:h,stalls:f}=YE(t.projects,{lightEvery:u?2:1});l.scene.add(h),c=CE({reduceMotion:l.reduceMotion,flickerMaterials:f.map(M=>M.vertMat)}),l.scene.add(c.group),l.onFrame((M,T)=>c.update(M,T));const d=(M,T)=>l.addPickable(M,T);for(const M of f)d(M.hit,{kind:"project",project:M.project,hover:M.setHover});const _=$E(t.projects);_.group.position.set(-19.5,0,2),l.scene.add(_.group);for(const M of _.rows)d(M.hit,{kind:"project",project:M.project,hover:M.setHover});const x=jE();x.group.position.set(-6,0,5),l.scene.add(x.group),d(x.hit,{kind:"link",url:"./assets/Paulo_Gonzales_Resume_SoftwareEngineer.pdf",download:"Paulo_Gonzales_Resume_SoftwareEngineer.pdf",hover:x.setHover});const m=QE();m.group.position.set(8,0,11),l.scene.add(m.group),d(m.hit,{kind:"link",url:"https://github.com/paulog11",hover:m.setHover});const p=oT();p.group.position.set(22,0,-3),l.scene.add(p.group),d(p.hit,{kind:"link",url:"./projects/profile/",hover:p.setHover});let y=null;l.onHover(M=>{var T,E;M!==y&&((T=y==null?void 0:y.hover)==null||T.call(y,!1),(E=M==null?void 0:M.hover)==null||E.call(M,!0),y=M,i("hover",(M==null?void 0:M.project)??null))}),l.onSelect(M=>i("select",M));const A=()=>{o.value=!1};s.value.addEventListener("pointerdown",A,{once:!0}),a=setTimeout(A,9e3),l.start()}),jd(()=>{clearTimeout(a),c==null||c.dispose(),l==null||l.dispose()}),(u,h)=>(Pn(),vi("div",MT,[r.value?(Pn(),vi("div",ST,[Tn(md,{projects:n.projects},null,8,["projects"])])):(Pn(),vi("canvas",{key:0,ref_key:"canvasEl",ref:s,class:"block h-full w-full cursor-grab touch-none","aria-label":"Interactive 3D map of a Shinjuku street. Each stall is one project."},[Tn(md,{projects:n.projects},null,8,["projects"])],512)),!r.value&&o.value?(Pn(),vi("div",yT,[...h[0]||(h[0]=[kt("span",{class:"motion-safe:animate-pulse rounded-full border border-[#FFB347]/25 bg-black/45 px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#FFB347]/75"}," drag to walk the alley ",-1)])])):o0("",!0)]))}},ET={__name:"App",setup(n){const e=Jo([{id:"algo-lab",indexNumber:9,title:"Algorithm Lab",tagline:"things in motion, on a canvas",description:"Flocking boids, n-body gravity, the three-body problem, and other simulations rendered with vanilla canvas.",category:"simulations",year:"2026",tools:["canvas","vanilla js"],status:"live",url:"./projects/algo-lab/dist/index.html",github:""},{id:"flip7",indexNumber:8,title:"Flip 7",tagline:"a card game of risky math",description:"A multiplayer port of the press-your-luck card game. Draw cards, dodge duplicates, race to the target score.",category:"games",year:"2026",tools:["vue","vite","tailwind"],status:"live",url:"./projects/ported-games/flip7/dist/index.html",github:""},{id:"machi-koro",indexNumber:7,title:"Machi Koro",tagline:"build a city by rolling dice",description:"A web port of the dice-driven city-building board game. Roll, collect, buy, and outbuild your opponent.",category:"games",year:"2025",tools:["vue","vite","tailwind"],status:"live",url:"./projects/ported-games/machi-koro/dist/index.html",github:""},{id:"venue-search",indexNumber:6,title:"Venue Search",tagline:"rentable rooms in tokyo",description:"A better search for event spaces in Tokyo.",category:"maps",year:"2025",tools:["vue","leaflet"],status:"WIP",url:"./projects/venue-search/dist/index.html",github:""},{id:"reading-buddy",indexNumber:5,title:"Reading Buddy",tagline:"a companion for the long book",description:"Track your reading with progressive character reveals and chapter-by-chapter companion guides.",category:"reading",year:"2025",tools:["vue","vite"],status:"live",url:"./projects/reading-buddy/dist/index.html",github:""},{id:"japan-map",indexNumber:4,title:"Japan History Map",tagline:"centuries on a single canvas",description:"Significant events in Japanese history and the Tokyo train system, laid out on an interactive Leaflet map.",category:"maps",year:"2025",tools:["leaflet","vue"],status:"live",url:"./projects/japan-map/dist/index.html",github:""},{id:"right-word-japanese",indexNumber:3,title:"The Right Word",tagline:"a phrasebook for awkward moments",description:"Quick help when speaking Japanese — find the right word for the situation. Includes keigo for the careful moments.",category:"language",year:"2025",tools:["vue","vite"],status:"WIP",url:"./projects/right-word/dist/index.html",github:""},{id:"japanese-dashboard",indexNumber:2,title:"Japanese Learning",tagline:"a dashboard of small tools",description:"A collection of small, useful utilities for Japanese learning, all in one place.",category:"language",year:"2025",tools:["vue","vite"],status:"live",url:"./projects/japandash/dist/index.html",github:""},{id:"bible-hymn-kids",indexNumber:1,title:"Bible Hymn Learning",tagline:"hymns and scripture for young learners",description:"Interactive hymn and scripture learning experience designed for kids.",category:"reading",year:"2024",tools:["html","css","js"],status:"WIP",url:"./projects/bible-hymn/hymn-app.html",github:""}]);function t(i){if(!i)return;if(i.kind==="link"){if(i.download){const r=document.createElement("a");r.href=i.url,r.download=i.download,document.body.appendChild(r),r.click(),r.remove()}else window.open(i.url,"_blank","noopener");return}const s=i.project;!s||s.status==="coming-soon"||!s.url||window.open(s.url,"_blank","noopener")}return(i,s)=>(Pn(),xp(bT,{projects:e.value,onSelect:t},null,8,["projects"]))}};G0(ET).mount("#app");
