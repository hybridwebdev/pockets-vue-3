(self["webpackChunktest"]=self["webpackChunktest"]||[]).push([[926],{7087:function(e){var t=function(){var e=[],t=[],r=[],n=[],o=null,a=function(e,t){return t.split(".").reduce((function(e,t){return e?e[t]:void 0}),e||self)},i=function(l,s,d,c){var u=d||null,p=c||[{target:l,property:""}];e.push(p),l instanceof Array&&(l.hasOwnProperty("__length")?l.__length=l.length:Object.defineProperty(l,"__length",{enumerable:!1,value:l.length,writable:!0}));var h=[],f=function(e,t,r){for(var n="",o=null,a=0;a<p.length;a++)o instanceof Array&&!isNaN(p[a].property)&&(p[a].property=o.indexOf(p[a].target)),n=n+"."+p[a].property,o=p[a].target;return n=n+"."+t,n=n.substring(2),!0===r&&(n="/"+n.replace(/\./g,"/")),n},v=function(e){if(!0!==u.paused){var t="number"===typeof s;if(t||!0===s)setTimeout((function(){if(e===h.length){var t=h.slice(0);h=[];for(var r=0;r<u.observers.length;r++)u.observers[r](t)}}),t&&s>0?s:10);else{var r=h.slice(0);h=[];for(var n=0;n<u.observers.length;n++)u.observers[n](r)}}},g={get:function(e,t){if("__getTarget"===t)return e;if("__isProxy"===t)return!0;if("__getParent"===t)return function(t){if("undefined"===typeof t)t=1;var r=f(e,"__getParent").split(".");return r.splice(-(t+1),t+1),a(u.parentProxy,r.join("."))};if("__getPath"===t){var o=f(e,"__getParent");return o.slice(0,-12)}var l=e[t];if(e instanceof Date&&l instanceof Function&&null!==l)return l.bind(e);if(l instanceof Object&&null!==l&&e.hasOwnProperty(t)){if(!0===l.__isProxy&&(l=l.__getTarget),l.__targetPosition>-1&&null!==r[l.__targetPosition])for(var d=n[l.__targetPosition],c=0,h=d.length;c<h;c++)if(u===d[c].observable)return d[c].proxy;var v=p.slice(0);return v.push({target:l,property:t}),i(l,s,u,v)}return l},deleteProperty:function(e,t){var a=!0;o===y&&(a=!1,o=null);var i=Object.assign({},e);if(h.push({type:"delete",target:e,property:t,newValue:null,previousValue:i[t],currentPath:f(e,t),jsonPointer:f(e,t,!0),proxy:y}),!0===a){u.changesPaused||delete e[t];for(var l=0,s=r.length;l<s;l++)if(e===r[l])break;var d=n[l]||[],c=d.length;while(c--)d[c].proxy!==y&&(o=d[c].proxy,delete d[c].proxy[t])}return v(h.length),!0},set:function(e,t,a,i){a&&a.__isProxy&&(a=a.__getTarget);var l=!0;o===y&&(l=!1,o=null);var s=e[t];if(s!==a||!1===l||"length"===t&&e instanceof Array&&e.__length!==a){var d=!0,c=typeof s,p="update";if("undefined"===c&&(p="add"),h.push({type:p,target:e,property:t,newValue:a,previousValue:i[t],currentPath:f(e,t),jsonPointer:f(e,t,!0),proxy:y}),"length"===t&&e instanceof Array&&e.__length!==a&&(h[h.length-1].previousValue=e.__length,e.__length=a),!0===l){u.changesPaused||(e[t]=a),d=!1;var g=e.__targetPosition,b=n[g].length;while(b--)if(u===n[g][b].observable&&null!==r[n[g][b].observable.parentTarget.__targetPosition]){d=!0;break}if(d){for(var m=n[g],_=0,x=m.length;_<x;_++)m[_].proxy!==y&&(o=m[_].proxy,m[_].proxy[t]=a);setTimeout((function(){if("object"===c&&null!==s){for(var t=Object.keys(e),o=0,a=t.length;o<a;o++)if(e[t[o]]===s)return;var i=!1;if(function e(t){for(var r=Object.keys(t),n=0,o=r.length;n<o;n++){var a=r[n],l=t[a];if(l instanceof Object&&null!==l&&e(l),l===s)return void(i=!0)}}(e),!0===i)return;(function e(t){for(var o=Object.keys(t),a=0,i=o.length;a<i;a++){var l=t[o[a]];l instanceof Object&&null!==l&&e(l)}var s=-1;for(a=0,i=r.length;a<i;a++)if(t===r[a]){s=a;break}if(s>-1){var d=n[s],c=d.length;while(c--)if(u===d[c].observable){d.splice(c,1);break}0==d.length&&(r[s]=null)}})(s)}}),1e4)}}d&&v(h.length)}return!0}},b=l.__targetPosition;b>-1||Object.defineProperty(l,"__targetPosition",{value:r.length,writable:!1,enumerable:!1,configurable:!1});var y=new Proxy(l,g);null===u&&(u={parentTarget:l,domDelay:s,parentProxy:y,observers:[],paused:!1,path:p,changesPaused:!1},t.push(u));var m={target:l,proxy:y,observable:u};return b>-1?(null===r[b]&&(r[b]=l),n[b].push(m)):(r.push(l),n.push([m])),y};return{create:function(e,t,r){if(!0===e.__isProxy)e=e.__getTarget;var n=i(e,t);return"function"===typeof r&&this.observe(n,r),function e(t){for(var r=t.__getTarget,n=Object.keys(r),o=0,a=n.length;o<a;o++){var i=n[o];r[i]instanceof Object&&null!==r[i]&&e(t[i])}}(n),n},observe:function(e,r){var n=t.length;while(n--)if(t[n].parentProxy===e){t[n].observers.push(r);break}},pause:function(e){var r=t.length,n=!1;while(r--)if(t[r].parentProxy===e){t[r].paused=!0,n=!0;break}if(0==n)throw new Error("ObseravableSlim could not pause observable -- matching proxy not found.")},resume:function(e){var r=t.length,n=!1;while(r--)if(t[r].parentProxy===e){t[r].paused=!1,n=!0;break}if(0==n)throw new Error("ObseravableSlim could not resume observable -- matching proxy not found.")},pauseChanges:function(e){var r=t.length,n=!1;while(r--)if(t[r].parentProxy===e){t[r].changesPaused=!0,n=!0;break}if(0==n)throw new Error("ObseravableSlim could not pause changes on observable -- matching proxy not found.")},resumeChanges:function(e){var r=t.length,n=!1;while(r--)if(t[r].parentProxy===e){t[r].changesPaused=!1,n=!0;break}if(0==n)throw new Error("ObseravableSlim could not resume changes on observable -- matching proxy not found.")},remove:function(e){var o=null,a=!1,i=t.length;while(i--)if(t[i].parentProxy===e){o=t[i],a=!0;break}var l=n.length;while(l--){var s=n[l].length;while(s--)n[l][s].observable===o&&(n[l].splice(s,1),0===n[l].length&&(r[l]=null))}!0===a&&t.splice(i,1)}}}();try{e.exports=t}catch(r){}},4752:function(e,t,r){"use strict";r.d(t,{j:function(){return a}});var n=r(3806),o=r(821);let a=(0,o.reactive)({show:!0,mode:"edit",nodes:{list:[],fields:[]},active:!1,selectedNodes:[],save:()=>n.F.event.emit("pockets/node-tree/save"),modeLocked:(0,o.computed)((()=>{if(a.selectedNodes.length>0)return!0}))})},3744:function(e,t){"use strict";t.Z=(e,t)=>{const r=e.__vccOpts||e;for(const[n,o]of t)r[n]=o;return r}},926:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return A}});var n=r(821);function o(e,t,r,o,a,i){const l=(0,n.resolveDirective)("tooltip");return(0,n.withDirectives)(((0,n.openBlock)(),(0,n.createBlock)((0,n.resolveDynamicComponent)(e.treeNode.el),(0,n.mergeProps)(e.treeNode.props,{class:["pockets-node-tree-node",e.classes],onClick:(0,n.withModifiers)(e.clickHandler,["stop"]),onMouseenter:t[0]||(t[0]=t=>e.hoverHandler(!0)),onMouseleave:t[1]||(t[1]=t=>e.hoverHandler(!1))}),{default:(0,n.withCtx)((()=>[((0,n.openBlock)(!0),(0,n.createElementBlock)(n.Fragment,null,(0,n.renderList)(e.treeNode.nodes,((e,t)=>((0,n.openBlock)(),(0,n.createBlock)((0,n.resolveDynamicComponent)("tree-walker"),{"tree-node":e,key:e.__targetPosition},null,8,["tree-node"])))),128))])),_:1},16,["onClick","class"])),[[l,e.toolTip]])}var a=r(4752);let i=Symbol("pockets-node-tree-api"),l=()=>{const e=(0,n.inject)(i);if(!e)throw new Error("Could not resolve Injection");return e},s=e=>{let t=(0,n.computed)((()=>{if(h.selected&&"move"==a.j.mode)return!0})),r=l().getNodeApi(e.treeNode),o=(0,n.computed)((()=>a.j.selectedNodes.filter((e=>e.paths.full==r.paths.full)).length>0)),i=(0,n.computed)((()=>a.j.selectedNodes.filter((e=>r.paths.full.length!=e.paths.full.length&&r.paths.full.includes(e.paths.full))).length>0)),s=(0,n.computed)((()=>{if(a.j?.active)return a.j?.active?.paths.full==r.paths.full||void 0})),d=(0,n.computed)((()=>{let{active:e,hovered:t,selected:r}=h;return{hovered:t,active:e,"editor-show":a.j.show,selected:r&&a.j.show}})),c=(0,n.computed)((()=>({content:r.branch.map((e=>e.schema.title)).join(" > "),shown:a.j?.show&&h.hovered,triggers:[],placement:"auto-start",popperClass:"pockets-node-tree-node-tooltip",delay:1}))),u=e=>{h.childOfselected||h.selected||(h.hovered=e)},p=()=>{if(a.j.show&&!h.childOfselected)return a.j.active=r},h=(0,n.reactive)({hovered:!1,disabled:t,selected:o,childOfselected:i,active:s,classes:d,hoverHandler:u,toolTip:c,disableInteractions:i,clickHandler:p});return h},d={treeNode:{el:String,data:Object,nodes:{type:Array},props:Object,schema:String}};var c={name:"tree-walker",setup:s,props:d},u=r(3744);const p=(0,u.Z)(c,[["render",o]]);var h=p,f=(r(7658),r(3806));let v=e=>{let t=(t,r=0)=>!!e.node.nodes&&(e.node.nodes.splice(r,0,t),e.node.nodes[r]),r=t=>!(!e.parent||!e.parent.add.inside)&&e.parent.add.inside(t,e.paths.index+1),n=t=>!(!e.parent||!e.parent.add.inside)&&e.parent.add.inside(t,e.paths.index),o={inside:t,before:n,after:r};return e.parent||Object.assign(o,{before:!1,after:!1}),e.hasNodes||(o.inside=!1),o},g=e=>{let t=t=>(e.node.nodes&&e.node.nodes.splice(t,1),!1),r=()=>!(!e.parent||!e.parent.remove.child)&&(e.parent.remove.child(e.paths.index),!1),n={self:r,child:t};return e.parent||(n.self=!1),e.node.nodes||(n.child=!1),n},b=e=>{let t=()=>!(!e.parent||!e.parent.clone.child)&&e.parent.clone.child(e.paths.index),r=t=>{if(!e.add.inside)return!1;let r=e.getChild(t);if(r.node){let n=t+1;if(e.add.inside(f.F.utils.object.clone(r.node),n),e.node.nodes)return e.node.nodes[n]}return!1},n={self:t,child:r};return e.hasNodes||(n.child=!1),e.parent||(n.self=!1),n},y=e=>{let t={child(t,r){f.F.utils.object.set(e.node.nodes,t,r)},self:t=>{e.parent&&e.parent.replace.child&&e.parent.replace.child(e.paths.index,t)}};return e.parent||(t.self=!1),e.hasNodes||(t.child=!1),t},m=e=>{let t=t=>!(!e.parent||!e.parent.move.child)&&e.parent.move.child(e.paths.index,t),r=(t,r)=>{if(!e.parent||!e.parent.node.nodes)return!1;let n=e.parent.node.nodes[t];return e.parent.node.nodes.splice(t,1),e.parent.node.nodes.splice(r,0,n),!1},n={self:t,child:r,left(){return!!e.move.child&&e.move.child(e.paths.index,e.paths.index-1)},right(){return!!e.move.child&&e.move.child(e.paths.index,e.paths.index+1)}};return 0==e.paths.index&&(n.left=!1),e.parent&&e.parent.node.nodes&&e.paths.index!=e.parent.node.nodes.length-1||(n.right=!1),n},_=e=>e.editor.nodes.list.find((t=>t.node.schema==e.node.schema))??!1,x=e=>e.schema&&e.node&&e.editor.nodes.fields?e.editor.nodes.fields.filter((t=>{if(e.schema)return e.schema.fields.includes(t.ID)})):[],w=(e,t)=>async r=>{let n=t.getChild(r);if(n.node)try{let o=await f.F.crud("node-tree/node").init(n.node).read(e);return n.replace.self(o),t.getChild(r)}catch(o){}},P=e=>{let t=w(["initialize:<="],e),r={self:async()=>{if(e.parent&&e.parent.initialize.child)return e.parent.initialize.child(e.paths.index)},child:async e=>t(e)};return e.hasNodes||(r.child=!1),e.parent||(r.self=!1),r},k=e=>{let t=w(["hydrate:<="],e),r={self:async()=>{if(e.parent&&e.parent.hydrate.child)return e.parent.hydrate.child(e.paths.index)},child:async e=>t(e),active:async()=>{if(!e.hydrate.self)return;let t=await e.hydrate.self();t&&(e.editor.active=t)}};return e.hasNodes||(r.child=!1),e.parent||(r.self=!1),r},j=e=>{let t=r=>{let o=(0,n.computed)((()=>{let t=[e.source.metaKey,e.source.type,e.source.ID].join("."),n=r.__getPath,o=parseInt(n.split(".").slice(-1)[0]);return{full:[t,n].join("."),path:n,index:o}})),i=e=>{let r=e.__getParent(2);return!!r&&t(r)},l=(0,n.computed)((()=>i(r))),s=(0,n.computed)((()=>Array.isArray(u.node?.nodes))),d=e=>{if(u.node.nodes)return t(u.node.nodes[e])},c=(0,n.computed)((()=>{let e=[];return u.paths.path.split(".nodes.").reduce(((e,r,n)=>(e.push(t(u.node.__getParent(2*n))),e)),e).reverse()})),u=(0,n.reactive)({branch:c,paths:o,getNodeApi:t,getChild:d,node:r,hasNodes:s,parent:l,editor:a.j,editFields:(0,n.computed)((()=>x(u))),schema:(0,n.computed)((()=>_(u))),add:(0,n.computed)((()=>v(u))),remove:(0,n.computed)((()=>g(u))),clone:(0,n.computed)((()=>b(u))),replace:(0,n.computed)((()=>y(u))),move:(0,n.computed)((()=>m(u))),initialize:(0,n.computed)((()=>P(u))),hydrate:(0,n.computed)((()=>k(u)))});return u},r=async()=>await f.F.crud("node-tree/root").init(e.source).update(e.root);return{saveTree:r,getNodeApi:t}};var O=r(7087),N=r.n(O),C=(0,n.defineComponent)({__name:"index",props:{root:{type:Object,required:!0},source:{type:Object}},setup(e){const t=e;let r=N().create(t,!1,(e=>{console.log(e)})),o=j(r);return(0,n.provide)(i,o),(0,n.onMounted)((()=>$pockets.event.on("pockets/node-tree/save",o.saveTree))),(e,t)=>((0,n.openBlock)(),(0,n.createBlock)((0,n.unref)(h),{"tree-node":(0,n.unref)(r).root},null,8,["tree-node"]))}});const T=C;var A=T}}]);
//# sourceMappingURL=926.2fc74960.js.map