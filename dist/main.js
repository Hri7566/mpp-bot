(()=>{"use strict";var __webpack_modules__={147:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{m:()=>Command});var _Database__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(404),_Group__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(279),_Prefix__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(250),_Registry__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(198),__awaiter=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((r=r.apply(e,t||[])).next())}))},__generator=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},Command=function(){function Command(e,t,n,r,o,i,a,s){this.id=e,this.accessors=t,this.usage=n,this.description=r,this.minimumArguments=o,this.func=i,this.permissionLevel=a,this.hidden=s||!1,_Registry__WEBPACK_IMPORTED_MODULE_3__.B.set("command."+this.id,this)}return Command.handle=function(e){var t=this;e.args=e.a.split(" "),_Prefix__WEBPACK_IMPORTED_MODULE_2__.o.forEach((function(t){e.args[0].substring(0,t.accessor.length)==t.accessor&&(e.prefix=t)})),e.prefix&&(e.cmd=e.args[0].toLowerCase().substring(e.prefix.accessor.length),e.argcat=e.a.substr(e.args[0].length).trim(),Command.forEach((function(n){return __awaiter(t,void 0,void 0,(function(){var t,r,o,i,a;return __generator(this,(function(s){switch(s.label){case 0:t=0,r=n.accessors,s.label=1;case 1:return t<r.length?r[t]!==e.cmd.toLowerCase()?[3,7]:[4,_Database__WEBPACK_IMPORTED_MODULE_0__.v.findUser(e.p)]:[3,8];case 2:if(o=s.sent(),e.user=o,o.permission==_Group__WEBPACK_IMPORTED_MODULE_1__.Z.BANNED)return[2];if(o.permission<n.permissionLevel)return Bot.sendChat("You don't have permission to use this command."),[2];if(e.args.length-1<n.minimumArguments)return Bot.sendChat("Not enough arguments. Usage: "+this.getUsage(n.usage,e.prefix.accessor)),[2];s.label=3;case 3:return s.trys.push([3,5,,6]),[4,n.func(e,Bot.client)];case 4:return"string"==typeof(i=s.sent())&&Bot.sendChat(i),[3,6];case 5:return a=s.sent(),Bot.sendChat("An error has occurred. Please try again later."),console.error(a),[3,6];case 6:return[3,8];case 7:return t++,[3,1];case 8:return[2]}}))}))})))},Command.getUsage=function(e,t){return e.split("{PREFIX}").join(t)},Command.registerDefaultCommands=function(){var _this=this;new Command("help",["help","cmds","h"],"{PREFIX}help (command)","List all commands or display usage info.",0,(function(e,t){var n;if(e.args[1])return Command.forEach((function(t){for(var r=0,o=t.accessors;r<o.length;r++){var i=o[r];e.argcat.toLowerCase()==i.toLowerCase()&&(n=t.description+" Usage: "+Command.getUsage(t.usage,e.prefix.accessor))}})),n||"Couldn't find command '"+e.argcat+"'.";var r="Commands: ";return Command.forEach((function(t){!t.hidden&&e.user.permission>=t.permissionLevel&&(r+=""+e.prefix.accessor+t.accessors[0]+" | ")})),r=r.substring(0,r.length-2).trim()}),_Group__WEBPACK_IMPORTED_MODULE_1__.Z.USER,!1),new Command("about",["about","a"],"{PREFIX}about","Display info about the bot.",0,(function(e,t){return"This bot was written by Hri7566 using TypeScript and Webpack. Source might be available soon."}),_Group__WEBPACK_IMPORTED_MODULE_1__.Z.USER,!1),new Command("js",["js","eval"],"{PREFIX}js [eval]","Run JavaScript from inside the bot.",1,(function(msg,cl){try{var out=eval(msg.argcat);Bot.sendChat("✔️ "+out)}catch(e){Bot.sendChat("❌ "+e)}}),_Group__WEBPACK_IMPORTED_MODULE_1__.Z.ADMIN,!1),new Command("rank",["rank","r"],"{PREFIX}rank (user)","Check a rank.",0,(function(e,t){return __awaiter(_this,void 0,void 0,(function(){var t;return __generator(this,(function(n){switch(n.label){case 0:return e.args[1]?[3,1]:[2,"Your rank: "+(0,_Group__WEBPACK_IMPORTED_MODULE_1__.w)(e.user.permission)+" ["+e.user.permission+"]"];case 1:return[4,_Database__WEBPACK_IMPORTED_MODULE_0__.v.findUser(Bot.getPartFuzzy(e.argcat))];case 2:return(t=n.sent())?[2,t.name+"'s rank: "+(0,_Group__WEBPACK_IMPORTED_MODULE_1__.w)(t.permission)+" ["+t.permission+"]"]:[2,"Could not find user '"+e.argcat+"'."]}}))}))}),_Group__WEBPACK_IMPORTED_MODULE_1__.Z.USER,!1),new Command("setrank",["setrank","sr"],"{PREFIX}setrank [user_id] [rank_id]","Set a user's rank.",2,(function(e,t){return __awaiter(_this,void 0,void 0,(function(){var t,n,r,o;return __generator(this,(function(i){switch(i.label){case 0:t=e.args[e.args.length-1],n=Bot.getPartFuzzy(e.argcat.substr(0,e.argcat.length-t.length).trim());try{r=parseInt(t)}catch(e){return[2,"Second argument must be an integer from -1 to 3"]}return r>e.user.permission?[2,"You cannot set a rank that high."]:[4,_Database__WEBPACK_IMPORTED_MODULE_0__.v.setRank(n,r)];case 1:return i.sent(),[4,_Database__WEBPACK_IMPORTED_MODULE_0__.v.findUser(n)];case 2:return[2,(o=i.sent()).name+"'s rank is now "+(0,_Group__WEBPACK_IMPORTED_MODULE_1__.w)(o.permission)+" ["+o.permission+"]."]}}))}))}),_Group__WEBPACK_IMPORTED_MODULE_1__.Z.MOD,!1)},Command.forEach=function(e){_Registry__WEBPACK_IMPORTED_MODULE_3__.B.forEach((function(t,n){n.startsWith("command")&&e(t)}))},Command}()},404:(e,t,n)=>{let r,o;n.d(t,{v:()=>D});const i=new WeakMap,a=new WeakMap,s=new WeakMap,c=new WeakMap,u=new WeakMap;let _={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return a.get(e);if("objectStoreNames"===t)return e.objectStoreNames||s.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return f(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function l(e){return"function"==typeof e?(t=e)!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(o||(o=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(h(this),e),f(i.get(this))}:function(...e){return f(t.apply(h(this),e))}:function(e,...n){const r=t.call(h(this),e,...n);return s.set(r,e.sort?e.sort():[e]),f(r)}:(e instanceof IDBTransaction&&function(e){if(a.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",i),e.removeEventListener("abort",i)},o=()=>{t(),r()},i=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",o),e.addEventListener("error",i),e.addEventListener("abort",i)}));a.set(e,t)}(e),n=e,(r||(r=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>n instanceof e))?new Proxy(e,_):e);var t,n}function f(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",o),e.removeEventListener("error",i)},o=()=>{t(f(e.result)),r()},i=()=>{n(e.error),r()};e.addEventListener("success",o),e.addEventListener("error",i)}));return t.then((t=>{t instanceof IDBCursor&&i.set(t,e)})).catch((()=>{})),u.set(t,e),t}(e);if(c.has(e))return c.get(e);const t=l(e);return t!==e&&(c.set(e,t),u.set(t,e)),t}const h=e=>u.get(e);function p(e,t,{blocked:n,upgrade:r,blocking:o,terminated:i}={}){const a=indexedDB.open(e,t),s=f(a);return r&&a.addEventListener("upgradeneeded",(e=>{r(f(a.result),e.oldVersion,e.newVersion,f(a.transaction))})),n&&a.addEventListener("blocked",(()=>n())),s.then((e=>{i&&e.addEventListener("close",(()=>i())),o&&e.addEventListener("versionchange",(()=>o()))})).catch((()=>{})),s}const d=["get","getKey","getAll","getAllKeys","count"],b=["put","add","delete","clear"],m=new Map;function v(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(m.get(t))return m.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=b.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!o&&!d.includes(n))return;const i=async function(e,...t){const i=this.transaction(e,o?"readwrite":"readonly");let a=i.store;return r&&(a=a.index(t.shift())),(await Promise.all([a[n](...t),o&&i.done]))[0]};return m.set(t,i),i}var w;w=_,_={...w,get:(e,t,n)=>v(e,t)||w.get(e,t,n),has:(e,t)=>!!v(e,t)||w.has(e,t)};var g=n(279),y=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((r=r.apply(e,t||[])).next())}))},E=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},D=function(){function e(){}return e.start=function(){return y(this,void 0,void 0,(function(){var e;return E(this,(function(t){switch(t.label){case 0:return e=this,[4,p("mpp",2,{upgrade:function(e){var t=e.createObjectStore("users",{keyPath:"_id"});t.createIndex("name","name",{unique:!1}),t.createIndex("permission","permission",{unique:!1})}})];case 1:return e.db=t.sent(),[2]}}))}))},e.getUser=function(e){return y(this,void 0,void 0,(function(){return E(this,(function(t){switch(t.label){case 0:return[4,this.db.get("users",e)];case 1:return[2,t.sent()]}}))}))},e.setUser=function(e){return y(this,void 0,void 0,(function(){return E(this,(function(t){switch(t.label){case 0:return[4,this.db.put("users",e)];case 1:return[2,t.sent()]}}))}))},e.findUser=function(e){return y(this,void 0,void 0,(function(){var t,n;return E(this,(function(r){switch(r.label){case 0:return[4,this.getUser(e._id)];case 1:return(t=r.sent())?[2,t]:(n={_id:e._id,name:e.name,color:e.color,permission:g.Z.USER,flags:new Map},[4,this.setUser(n)]);case 2:return r.sent(),[2,n]}}))}))},e.setRank=function(e,t){return y(this,void 0,void 0,(function(){var n;return E(this,(function(r){switch(r.label){case 0:return[4,this.findUser(e)];case 1:return(n=r.sent()).permission=t,this.setUser(n),[2]}}))}))},e}()},279:(e,t,n)=>{var r;n.d(t,{Z:()=>r,w:()=>o}),function(e){e[e.USER=0]="USER",e[e.MOD=1]="MOD",e[e.ADMIN=2]="ADMIN",e[e.OWNER=3]="OWNER",e[e.BANNED=-1]="BANNED"}(r||(r={}));var o=function(e){switch(e){case 0:return"User";case 1:return"Moderator";case 2:return"Administrator";case 3:return"Owner";case-1:return"Banned"}}},250:(e,t,n)=>{n.d(t,{o:()=>o});var r=n(198),o=function(){function e(e){this.accessor=e.split(" ").join(""),r.B.set("prefix."+this.accessor,this)}return e.forEach=function(e){r.B.forEach((function(t,n){n.startsWith("prefix")&&e(t)}))},e.registerDefaultPrefixes=function(){new e("?")},e}()},198:(e,t,n)=>{n.d(t,{B:()=>r});var r=new Map}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](n,n.exports,__webpack_require__),n.exports}__webpack_require__.d=(e,t)=>{for(var n in t)__webpack_require__.o(t,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var __webpack_exports__={};(()=>{var e,t=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((r=r.apply(e,t||[])).next())}))},n=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},r=function(){function e(){}return e.on=function(e,t){this._events.hasOwnProperty(e)||(this._events[e]=[]),this._events[e].push(t)},e.off=function(e,t){if(this._events.hasOwnProperty(e)){var n=this._events[e].indexOf(t);n<0||this._events[e].splice(n,1)}},e.emit=function(e){for(var r=[],o=1;o<arguments.length;o++)r[o-1]=arguments[o];return t(this,void 0,void 0,(function(){var t,o;return n(this,(function(n){switch(n.label){case 0:if(!this._events.hasOwnProperty(e))return[2];if((t=this._events[e].slice(0)).length<1)return[2];o=0,n.label=1;case 1:return o<t.length?[4,t[o].apply(this,r)]:[3,4];case 2:n.sent(),n.label=3;case 3:return o++,[3,1];case 4:return[2]}}))}))},e._events={},e}(),o=__webpack_require__(250),i=__webpack_require__(404),a=__webpack_require__(147),s=__webpack_require__(279),c=(e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(t,n)},function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),u=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((r=r.apply(e,t||[])).next())}))},_=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},l=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return c(t,e),t.start=function(e){this.client=e,i.v.start(),this.bind(),this.bindClientListeners(),this.emit("ready")},t.bind=function(){var e=this;this.on("sendChat",(function(t){return u(e,void 0,void 0,(function(){return _(this,(function(e){return this.client.sendArray([{m:"a",message:"͏"+t}]),[2]}))}))})),this.on("ready",(function(){a.m.registerDefaultCommands(),o.o.registerDefaultPrefixes()}))},t.bindClientListeners=function(){var e=this;this.client.on("a",(function(t){return u(e,void 0,void 0,(function(){return _(this,(function(e){return a.m.handle(t),[2]}))}))})),this.client.on("ch",(function(t){return u(e,void 0,void 0,(function(){return _(this,(function(e){return i.v.setRank(this.client.getOwnParticipant(),s.Z.OWNER),[2]}))}))}))},t.sendChat=function(e){this.emit("sendChat",e)},t.getPartFuzzy=function(e){for(var t=0,n=Object.keys(this.client.ppl);t<n.length;t++){var r=n[t],o=this.client.ppl[r];if(o._id.includes(e.toLowerCase())||o.name.toLowerCase().includes(e.toLowerCase()))return o}},t[Symbol.toPrimitive]=function(){return 69},t.db=i.v,t.command=a.m,t}(r);l.start(MPP.client),globalThis.Bot=l})()})();