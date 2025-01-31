import{G as g}from"./graph-kaVM_UWn.js";import{b9 as Ie,ba as Me,bb as Se,bc as Fe,aR as je,bd as Ve,aV as le,aU as he,be as Ae,aQ as $,as as Be,aX as Ge,au as Ye,bf as q}from"./index-sp7gWx1Q.js";import{b as De,p as ve,q as pe,g as X,e as ee,l as j,o as $e,s as qe,c as We,u as Xe,d as f,i as m,f as _,v as x,r as M}from"./_baseUniq-1Da95Zr8.js";import{f as O,b as we,a as ze,c as Ue,d as He,t as V,m as w,e as P,h as be,g as z,l as T,i as Je}from"./_basePickBy-5-b9AxPB.js";function Qe(e){return Ie(Me(e,void 0,O),e+"")}var Ze=1,Ke=4;function en(e){return De(e,Ze|Ke)}var ne=function(){return Se.Date.now()};function nn(e,n){return e==null?e:Fe(e,ve(n),je)}function rn(e,n){return e&&pe(e,ve(n))}function tn(e,n){return e>n}function S(e,n){var r={};return n=X(n),pe(e,function(t,a,i){Ve(r,a,n(t,a,i))}),r}function y(e){return e&&e.length?we(e,le,tn):void 0}function U(e,n){return e&&e.length?we(e,X(n),ze):void 0}function an(e,n){var r=e.length;for(e.sort(n);r--;)e[r]=e[r].value;return e}function on(e,n){if(e!==n){var r=e!==void 0,t=e===null,a=e===e,i=ee(e),o=n!==void 0,u=n===null,d=n===n,s=ee(n);if(!u&&!s&&!i&&e>n||i&&o&&d&&!u&&!s||t&&o&&d||!r&&d||!a)return 1;if(!t&&!i&&!s&&e<n||s&&r&&a&&!t&&!i||u&&r&&a||!o&&a||!d)return-1}return 0}function un(e,n,r){for(var t=-1,a=e.criteria,i=n.criteria,o=a.length,u=r.length;++t<o;){var d=on(a[t],i[t]);if(d){if(t>=u)return d;var s=r[t];return d*(s=="desc"?-1:1)}}return e.index-n.index}function dn(e,n,r){n.length?n=j(n,function(i){return he(i)?function(o){return $e(o,i.length===1?i[0]:i)}:i}):n=[le];var t=-1;n=j(n,Ae(X));var a=Ue(e,function(i,o,u){var d=j(n,function(s){return s(i)});return{criteria:d,index:++t,value:i}});return an(a,function(i,o){return un(i,o,r)})}function sn(e,n){return He(e,n,function(r,t){return qe(e,t)})}var I=Qe(function(e,n){return e==null?{}:sn(e,n)}),fn=Math.ceil,cn=Math.max;function ln(e,n,r,t){for(var a=-1,i=cn(fn((n-e)/(r||1)),0),o=Array(i);i--;)o[t?i:++a]=e,e+=r;return o}function hn(e){return function(n,r,t){return t&&typeof t!="number"&&$(n,r,t)&&(r=t=void 0),n=V(n),r===void 0?(r=n,n=0):r=V(r),t=t===void 0?n<r?1:-1:V(t),ln(n,r,t,e)}}var E=hn(),R=Be(function(e,n){if(e==null)return[];var r=n.length;return r>1&&$(e,n[0],n[1])?n=[]:r>2&&$(n[0],n[1],n[2])&&(n=[n[0]]),dn(e,We(n,1),[])}),vn=0;function H(e){var n=++vn;return Xe(e)+n}function pn(e,n,r){for(var t=-1,a=e.length,i=n.length,o={};++t<a;){var u=t<i?n[t]:void 0;r(o,e[t],u)}return o}function wn(e,n){return pn(e||[],n||[],Ge)}class bn{constructor(){var n={};n._next=n._prev=n,this._sentinel=n}dequeue(){var n=this._sentinel,r=n._prev;if(r!==n)return re(r),r}enqueue(n){var r=this._sentinel;n._prev&&n._next&&re(n),n._next=r._next,r._next._prev=n,r._next=n,n._prev=r}toString(){for(var n=[],r=this._sentinel,t=r._prev;t!==r;)n.push(JSON.stringify(t,mn)),t=t._prev;return"["+n.join(", ")+"]"}}function re(e){e._prev._next=e._next,e._next._prev=e._prev,delete e._next,delete e._prev}function mn(e,n){if(e!=="_next"&&e!=="_prev")return n}var gn=Ye(1);function yn(e,n){if(e.nodeCount()<=1)return[];var r=xn(e,n||gn),t=kn(r.graph,r.buckets,r.zeroIdx);return O(w(t,function(a){return e.outEdges(a.v,a.w)}))}function kn(e,n,r){for(var t=[],a=n[n.length-1],i=n[0],o;e.nodeCount();){for(;o=i.dequeue();)A(e,n,r,o);for(;o=a.dequeue();)A(e,n,r,o);if(e.nodeCount()){for(var u=n.length-2;u>0;--u)if(o=n[u].dequeue(),o){t=t.concat(A(e,n,r,o,!0));break}}}return t}function A(e,n,r,t,a){var i=a?[]:void 0;return f(e.inEdges(t.v),function(o){var u=e.edge(o),d=e.node(o.v);a&&i.push({v:o.v,w:o.w}),d.out-=u,W(n,r,d)}),f(e.outEdges(t.v),function(o){var u=e.edge(o),d=o.w,s=e.node(d);s.in-=u,W(n,r,s)}),e.removeNode(t.v),i}function xn(e,n){var r=new g,t=0,a=0;f(e.nodes(),function(u){r.setNode(u,{v:u,in:0,out:0})}),f(e.edges(),function(u){var d=r.edge(u.v,u.w)||0,s=n(u),c=d+s;r.setEdge(u.v,u.w,c),a=Math.max(a,r.node(u.v).out+=s),t=Math.max(t,r.node(u.w).in+=s)});var i=E(a+t+3).map(function(){return new bn}),o=t+1;return f(r.nodes(),function(u){W(i,o,r.node(u))}),{graph:r,buckets:i,zeroIdx:o}}function W(e,n,r){r.out?r.in?e[r.out-r.in+n].enqueue(r):e[e.length-1].enqueue(r):e[0].enqueue(r)}function En(e){var n=e.graph().acyclicer==="greedy"?yn(e,r(e)):On(e);f(n,function(t){var a=e.edge(t);e.removeEdge(t),a.forwardName=t.name,a.reversed=!0,e.setEdge(t.w,t.v,a,H("rev"))});function r(t){return function(a){return t.edge(a).weight}}}function On(e){var n=[],r={},t={};function a(i){Object.prototype.hasOwnProperty.call(t,i)||(t[i]=!0,r[i]=!0,f(e.outEdges(i),function(o){Object.prototype.hasOwnProperty.call(r,o.w)?n.push(o):a(o.w)}),delete r[i])}return f(e.nodes(),a),n}function Ln(e){f(e.edges(),function(n){var r=e.edge(n);if(r.reversed){e.removeEdge(n);var t=r.forwardName;delete r.reversed,delete r.forwardName,e.setEdge(n.w,n.v,r,t)}})}function L(e,n,r,t){var a;do a=H(t);while(e.hasNode(a));return r.dummy=n,e.setNode(a,r),a}function Nn(e){var n=new g().setGraph(e.graph());return f(e.nodes(),function(r){n.setNode(r,e.node(r))}),f(e.edges(),function(r){var t=n.edge(r.v,r.w)||{weight:0,minlen:1},a=e.edge(r);n.setEdge(r.v,r.w,{weight:t.weight+a.weight,minlen:Math.max(t.minlen,a.minlen)})}),n}function me(e){var n=new g({multigraph:e.isMultigraph()}).setGraph(e.graph());return f(e.nodes(),function(r){e.children(r).length||n.setNode(r,e.node(r))}),f(e.edges(),function(r){n.setEdge(r,e.edge(r))}),n}function te(e,n){var r=e.x,t=e.y,a=n.x-r,i=n.y-t,o=e.width/2,u=e.height/2;if(!a&&!i)throw new Error("Not possible to find intersection inside of the rectangle");var d,s;return Math.abs(i)*o>Math.abs(a)*u?(i<0&&(u=-u),d=u*a/i,s=u):(a<0&&(o=-o),d=o,s=o*i/a),{x:r+d,y:t+s}}function F(e){var n=w(E(ge(e)+1),function(){return[]});return f(e.nodes(),function(r){var t=e.node(r),a=t.rank;m(a)||(n[a][t.order]=r)}),n}function Pn(e){var n=P(w(e.nodes(),function(r){return e.node(r).rank}));f(e.nodes(),function(r){var t=e.node(r);be(t,"rank")&&(t.rank-=n)})}function Cn(e){var n=P(w(e.nodes(),function(i){return e.node(i).rank})),r=[];f(e.nodes(),function(i){var o=e.node(i).rank-n;r[o]||(r[o]=[]),r[o].push(i)});var t=0,a=e.graph().nodeRankFactor;f(r,function(i,o){m(i)&&o%a!==0?--t:t&&f(i,function(u){e.node(u).rank+=t})})}function ae(e,n,r,t){var a={width:0,height:0};return arguments.length>=4&&(a.rank=r,a.order=t),L(e,"border",a,n)}function ge(e){return y(w(e.nodes(),function(n){var r=e.node(n).rank;if(!m(r))return r}))}function _n(e,n){var r={lhs:[],rhs:[]};return f(e,function(t){n(t)?r.lhs.push(t):r.rhs.push(t)}),r}function Rn(e,n){var r=ne();try{return n()}finally{console.log(e+" time: "+(ne()-r)+"ms")}}function Tn(e,n){return n()}function In(e){function n(r){var t=e.children(r),a=e.node(r);if(t.length&&f(t,n),Object.prototype.hasOwnProperty.call(a,"minRank")){a.borderLeft=[],a.borderRight=[];for(var i=a.minRank,o=a.maxRank+1;i<o;++i)ie(e,"borderLeft","_bl",r,a,i),ie(e,"borderRight","_br",r,a,i)}}f(e.children(),n)}function ie(e,n,r,t,a,i){var o={width:0,height:0,rank:i,borderType:n},u=a[n][i-1],d=L(e,"border",o,r);a[n][i]=d,e.setParent(d,t),u&&e.setEdge(u,d,{weight:1})}function Mn(e){var n=e.graph().rankdir.toLowerCase();(n==="lr"||n==="rl")&&ye(e)}function Sn(e){var n=e.graph().rankdir.toLowerCase();(n==="bt"||n==="rl")&&Fn(e),(n==="lr"||n==="rl")&&(jn(e),ye(e))}function ye(e){f(e.nodes(),function(n){oe(e.node(n))}),f(e.edges(),function(n){oe(e.edge(n))})}function oe(e){var n=e.width;e.width=e.height,e.height=n}function Fn(e){f(e.nodes(),function(n){B(e.node(n))}),f(e.edges(),function(n){var r=e.edge(n);f(r.points,B),Object.prototype.hasOwnProperty.call(r,"y")&&B(r)})}function B(e){e.y=-e.y}function jn(e){f(e.nodes(),function(n){G(e.node(n))}),f(e.edges(),function(n){var r=e.edge(n);f(r.points,G),Object.prototype.hasOwnProperty.call(r,"x")&&G(r)})}function G(e){var n=e.x;e.x=e.y,e.y=n}function Vn(e){e.graph().dummyChains=[],f(e.edges(),function(n){An(e,n)})}function An(e,n){var r=n.v,t=e.node(r).rank,a=n.w,i=e.node(a).rank,o=n.name,u=e.edge(n),d=u.labelRank;if(i!==t+1){e.removeEdge(n);var s=void 0,c,l;for(l=0,++t;t<i;++l,++t)u.points=[],s={width:0,height:0,edgeLabel:u,edgeObj:n,rank:t},c=L(e,"edge",s,"_d"),t===d&&(s.width=u.width,s.height=u.height,s.dummy="edge-label",s.labelpos=u.labelpos),e.setEdge(r,c,{weight:u.weight},o),l===0&&e.graph().dummyChains.push(c),r=c;e.setEdge(r,a,{weight:u.weight},o)}}function Bn(e){f(e.graph().dummyChains,function(n){var r=e.node(n),t=r.edgeLabel,a;for(e.setEdge(r.edgeObj,t);r.dummy;)a=e.successors(n)[0],e.removeNode(n),t.points.push({x:r.x,y:r.y}),r.dummy==="edge-label"&&(t.x=r.x,t.y=r.y,t.width=r.width,t.height=r.height),n=a,r=e.node(n)})}function J(e){var n={};function r(t){var a=e.node(t);if(Object.prototype.hasOwnProperty.call(n,t))return a.rank;n[t]=!0;var i=P(w(e.outEdges(t),function(o){return r(o.w)-e.edge(o).minlen}));return(i===Number.POSITIVE_INFINITY||i===void 0||i===null)&&(i=0),a.rank=i}f(e.sources(),r)}function C(e,n){return e.node(n.w).rank-e.node(n.v).rank-e.edge(n).minlen}function ke(e){var n=new g({directed:!1}),r=e.nodes()[0],t=e.nodeCount();n.setNode(r,{});for(var a,i;Gn(n,e)<t;)a=Yn(n,e),i=n.hasNode(a.v)?C(e,a):-C(e,a),Dn(n,e,i);return n}function Gn(e,n){function r(t){f(n.nodeEdges(t),function(a){var i=a.v,o=t===i?a.w:i;!e.hasNode(o)&&!C(n,a)&&(e.setNode(o,{}),e.setEdge(t,o,{}),r(o))})}return f(e.nodes(),r),e.nodeCount()}function Yn(e,n){return U(n.edges(),function(r){if(e.hasNode(r.v)!==e.hasNode(r.w))return C(n,r)})}function Dn(e,n,r){f(e.nodes(),function(t){n.node(t).rank+=r})}function $n(){}$n.prototype=new Error;function xe(e,n,r){he(n)||(n=[n]);var t=(e.isDirected()?e.successors:e.neighbors).bind(e),a=[],i={};return f(n,function(o){if(!e.hasNode(o))throw new Error("Graph does not have node: "+o);Ee(e,o,r==="post",i,t,a)}),a}function Ee(e,n,r,t,a,i){Object.prototype.hasOwnProperty.call(t,n)||(t[n]=!0,r||i.push(n),f(a(n),function(o){Ee(e,o,r,t,a,i)}),r&&i.push(n))}function qn(e,n){return xe(e,n,"post")}function Wn(e,n){return xe(e,n,"pre")}k.initLowLimValues=Z;k.initCutValues=Q;k.calcCutValue=Oe;k.leaveEdge=Ne;k.enterEdge=Pe;k.exchangeEdges=Ce;function k(e){e=Nn(e),J(e);var n=ke(e);Z(n),Q(n,e);for(var r,t;r=Ne(n);)t=Pe(n,e,r),Ce(n,e,r,t)}function Q(e,n){var r=qn(e,e.nodes());r=r.slice(0,r.length-1),f(r,function(t){Xn(e,n,t)})}function Xn(e,n,r){var t=e.node(r),a=t.parent;e.edge(r,a).cutvalue=Oe(e,n,r)}function Oe(e,n,r){var t=e.node(r),a=t.parent,i=!0,o=n.edge(r,a),u=0;return o||(i=!1,o=n.edge(a,r)),u=o.weight,f(n.nodeEdges(r),function(d){var s=d.v===r,c=s?d.w:d.v;if(c!==a){var l=s===i,h=n.edge(d).weight;if(u+=l?h:-h,Un(e,r,c)){var v=e.edge(r,c).cutvalue;u+=l?-v:v}}}),u}function Z(e,n){arguments.length<2&&(n=e.nodes()[0]),Le(e,{},1,n)}function Le(e,n,r,t,a){var i=r,o=e.node(t);return n[t]=!0,f(e.neighbors(t),function(u){Object.prototype.hasOwnProperty.call(n,u)||(r=Le(e,n,r,u,t))}),o.low=i,o.lim=r++,a?o.parent=a:delete o.parent,r}function Ne(e){return z(e.edges(),function(n){return e.edge(n).cutvalue<0})}function Pe(e,n,r){var t=r.v,a=r.w;n.hasEdge(t,a)||(t=r.w,a=r.v);var i=e.node(t),o=e.node(a),u=i,d=!1;i.lim>o.lim&&(u=o,d=!0);var s=_(n.edges(),function(c){return d===ue(e,e.node(c.v),u)&&d!==ue(e,e.node(c.w),u)});return U(s,function(c){return C(n,c)})}function Ce(e,n,r,t){var a=r.v,i=r.w;e.removeEdge(a,i),e.setEdge(t.v,t.w,{}),Z(e),Q(e,n),zn(e,n)}function zn(e,n){var r=z(e.nodes(),function(a){return!n.node(a).parent}),t=Wn(e,r);t=t.slice(1),f(t,function(a){var i=e.node(a).parent,o=n.edge(a,i),u=!1;o||(o=n.edge(i,a),u=!0),n.node(a).rank=n.node(i).rank+(u?o.minlen:-o.minlen)})}function Un(e,n,r){return e.hasEdge(n,r)}function ue(e,n,r){return r.low<=n.lim&&n.lim<=r.lim}function Hn(e){switch(e.graph().ranker){case"network-simplex":de(e);break;case"tight-tree":Qn(e);break;case"longest-path":Jn(e);break;default:de(e)}}var Jn=J;function Qn(e){J(e),ke(e)}function de(e){k(e)}function Zn(e){var n=L(e,"root",{},"_root"),r=Kn(e),t=y(x(r))-1,a=2*t+1;e.graph().nestingRoot=n,f(e.edges(),function(o){e.edge(o).minlen*=a});var i=er(e)+1;f(e.children(),function(o){_e(e,n,a,i,t,r,o)}),e.graph().nodeRankFactor=a}function _e(e,n,r,t,a,i,o){var u=e.children(o);if(!u.length){o!==n&&e.setEdge(n,o,{weight:0,minlen:r});return}var d=ae(e,"_bt"),s=ae(e,"_bb"),c=e.node(o);e.setParent(d,o),c.borderTop=d,e.setParent(s,o),c.borderBottom=s,f(u,function(l){_e(e,n,r,t,a,i,l);var h=e.node(l),v=h.borderTop?h.borderTop:l,p=h.borderBottom?h.borderBottom:l,b=h.borderTop?t:2*t,N=v!==p?1:a-i[o]+1;e.setEdge(d,v,{weight:b,minlen:N,nestingEdge:!0}),e.setEdge(p,s,{weight:b,minlen:N,nestingEdge:!0})}),e.parent(o)||e.setEdge(n,d,{weight:0,minlen:a+i[o]})}function Kn(e){var n={};function r(t,a){var i=e.children(t);i&&i.length&&f(i,function(o){r(o,a+1)}),n[t]=a}return f(e.children(),function(t){r(t,1)}),n}function er(e){return M(e.edges(),function(n,r){return n+e.edge(r).weight},0)}function nr(e){var n=e.graph();e.removeNode(n.nestingRoot),delete n.nestingRoot,f(e.edges(),function(r){var t=e.edge(r);t.nestingEdge&&e.removeEdge(r)})}function rr(e,n,r){var t={},a;f(r,function(i){for(var o=e.parent(i),u,d;o;){if(u=e.parent(o),u?(d=t[u],t[u]=o):(d=a,a=o),d&&d!==o){n.setEdge(d,o);return}o=u}})}function tr(e,n,r){var t=ar(e),a=new g({compound:!0}).setGraph({root:t}).setDefaultNodeLabel(function(i){return e.node(i)});return f(e.nodes(),function(i){var o=e.node(i),u=e.parent(i);(o.rank===n||o.minRank<=n&&n<=o.maxRank)&&(a.setNode(i),a.setParent(i,u||t),f(e[r](i),function(d){var s=d.v===i?d.w:d.v,c=a.edge(s,i),l=m(c)?0:c.weight;a.setEdge(s,i,{weight:e.edge(d).weight+l})}),Object.prototype.hasOwnProperty.call(o,"minRank")&&a.setNode(i,{borderLeft:o.borderLeft[n],borderRight:o.borderRight[n]}))}),a}function ar(e){for(var n;e.hasNode(n=H("_root")););return n}function ir(e,n){for(var r=0,t=1;t<n.length;++t)r+=or(e,n[t-1],n[t]);return r}function or(e,n,r){for(var t=wn(r,w(r,function(s,c){return c})),a=O(w(n,function(s){return R(w(e.outEdges(s),function(c){return{pos:t[c.w],weight:e.edge(c).weight}}),"pos")})),i=1;i<r.length;)i<<=1;var o=2*i-1;i-=1;var u=w(new Array(o),function(){return 0}),d=0;return f(a.forEach(function(s){var c=s.pos+i;u[c]+=s.weight;for(var l=0;c>0;)c%2&&(l+=u[c+1]),c=c-1>>1,u[c]+=s.weight;d+=s.weight*l})),d}function ur(e){var n={},r=_(e.nodes(),function(u){return!e.children(u).length}),t=y(w(r,function(u){return e.node(u).rank})),a=w(E(t+1),function(){return[]});function i(u){if(!be(n,u)){n[u]=!0;var d=e.node(u);a[d.rank].push(u),f(e.successors(u),i)}}var o=R(r,function(u){return e.node(u).rank});return f(o,i),a}function dr(e,n){return w(n,function(r){var t=e.inEdges(r);if(t.length){var a=M(t,function(i,o){var u=e.edge(o),d=e.node(o.v);return{sum:i.sum+u.weight*d.order,weight:i.weight+u.weight}},{sum:0,weight:0});return{v:r,barycenter:a.sum/a.weight,weight:a.weight}}else return{v:r}})}function sr(e,n){var r={};f(e,function(a,i){var o=r[a.v]={indegree:0,in:[],out:[],vs:[a.v],i};m(a.barycenter)||(o.barycenter=a.barycenter,o.weight=a.weight)}),f(n.edges(),function(a){var i=r[a.v],o=r[a.w];!m(i)&&!m(o)&&(o.indegree++,i.out.push(r[a.w]))});var t=_(r,function(a){return!a.indegree});return fr(t)}function fr(e){var n=[];function r(i){return function(o){o.merged||(m(o.barycenter)||m(i.barycenter)||o.barycenter>=i.barycenter)&&cr(i,o)}}function t(i){return function(o){o.in.push(i),--o.indegree===0&&e.push(o)}}for(;e.length;){var a=e.pop();n.push(a),f(a.in.reverse(),r(a)),f(a.out,t(a))}return w(_(n,function(i){return!i.merged}),function(i){return I(i,["vs","i","barycenter","weight"])})}function cr(e,n){var r=0,t=0;e.weight&&(r+=e.barycenter*e.weight,t+=e.weight),n.weight&&(r+=n.barycenter*n.weight,t+=n.weight),e.vs=n.vs.concat(e.vs),e.barycenter=r/t,e.weight=t,e.i=Math.min(n.i,e.i),n.merged=!0}function lr(e,n){var r=_n(e,function(c){return Object.prototype.hasOwnProperty.call(c,"barycenter")}),t=r.lhs,a=R(r.rhs,function(c){return-c.i}),i=[],o=0,u=0,d=0;t.sort(hr(!!n)),d=se(i,a,d),f(t,function(c){d+=c.vs.length,i.push(c.vs),o+=c.barycenter*c.weight,u+=c.weight,d=se(i,a,d)});var s={vs:O(i)};return u&&(s.barycenter=o/u,s.weight=u),s}function se(e,n,r){for(var t;n.length&&(t=T(n)).i<=r;)n.pop(),e.push(t.vs),r++;return r}function hr(e){return function(n,r){return n.barycenter<r.barycenter?-1:n.barycenter>r.barycenter?1:e?r.i-n.i:n.i-r.i}}function Re(e,n,r,t){var a=e.children(n),i=e.node(n),o=i?i.borderLeft:void 0,u=i?i.borderRight:void 0,d={};o&&(a=_(a,function(p){return p!==o&&p!==u}));var s=dr(e,a);f(s,function(p){if(e.children(p.v).length){var b=Re(e,p.v,r,t);d[p.v]=b,Object.prototype.hasOwnProperty.call(b,"barycenter")&&pr(p,b)}});var c=sr(s,r);vr(c,d);var l=lr(c,t);if(o&&(l.vs=O([o,l.vs,u]),e.predecessors(o).length)){var h=e.node(e.predecessors(o)[0]),v=e.node(e.predecessors(u)[0]);Object.prototype.hasOwnProperty.call(l,"barycenter")||(l.barycenter=0,l.weight=0),l.barycenter=(l.barycenter*l.weight+h.order+v.order)/(l.weight+2),l.weight+=2}return l}function vr(e,n){f(e,function(r){r.vs=O(r.vs.map(function(t){return n[t]?n[t].vs:t}))})}function pr(e,n){m(e.barycenter)?(e.barycenter=n.barycenter,e.weight=n.weight):(e.barycenter=(e.barycenter*e.weight+n.barycenter*n.weight)/(e.weight+n.weight),e.weight+=n.weight)}function wr(e){var n=ge(e),r=fe(e,E(1,n+1),"inEdges"),t=fe(e,E(n-1,-1,-1),"outEdges"),a=ur(e);ce(e,a);for(var i=Number.POSITIVE_INFINITY,o,u=0,d=0;d<4;++u,++d){br(u%2?r:t,u%4>=2),a=F(e);var s=ir(e,a);s<i&&(d=0,o=en(a),i=s)}ce(e,o)}function fe(e,n,r){return w(n,function(t){return tr(e,t,r)})}function br(e,n){var r=new g;f(e,function(t){var a=t.graph().root,i=Re(t,a,r,n);f(i.vs,function(o,u){t.node(o).order=u}),rr(t,r,i.vs)})}function ce(e,n){f(n,function(r){f(r,function(t,a){e.node(t).order=a})})}function mr(e){var n=yr(e);f(e.graph().dummyChains,function(r){for(var t=e.node(r),a=t.edgeObj,i=gr(e,n,a.v,a.w),o=i.path,u=i.lca,d=0,s=o[d],c=!0;r!==a.w;){if(t=e.node(r),c){for(;(s=o[d])!==u&&e.node(s).maxRank<t.rank;)d++;s===u&&(c=!1)}if(!c){for(;d<o.length-1&&e.node(s=o[d+1]).minRank<=t.rank;)d++;s=o[d]}e.setParent(r,s),r=e.successors(r)[0]}})}function gr(e,n,r,t){var a=[],i=[],o=Math.min(n[r].low,n[t].low),u=Math.max(n[r].lim,n[t].lim),d,s;d=r;do d=e.parent(d),a.push(d);while(d&&(n[d].low>o||u>n[d].lim));for(s=d,d=t;(d=e.parent(d))!==s;)i.push(d);return{path:a.concat(i.reverse()),lca:s}}function yr(e){var n={},r=0;function t(a){var i=r;f(e.children(a),t),n[a]={low:i,lim:r++}}return f(e.children(),t),n}function kr(e,n){var r={};function t(a,i){var o=0,u=0,d=a.length,s=T(i);return f(i,function(c,l){var h=Er(e,c),v=h?e.node(h).order:d;(h||c===s)&&(f(i.slice(u,l+1),function(p){f(e.predecessors(p),function(b){var N=e.node(b),K=N.order;(K<o||v<K)&&!(N.dummy&&e.node(p).dummy)&&Te(r,b,p)})}),u=l+1,o=v)}),i}return M(n,t),r}function xr(e,n){var r={};function t(i,o,u,d,s){var c;f(E(o,u),function(l){c=i[l],e.node(c).dummy&&f(e.predecessors(c),function(h){var v=e.node(h);v.dummy&&(v.order<d||v.order>s)&&Te(r,h,c)})})}function a(i,o){var u=-1,d,s=0;return f(o,function(c,l){if(e.node(c).dummy==="border"){var h=e.predecessors(c);h.length&&(d=e.node(h[0]).order,t(o,s,l,u,d),s=l,u=d)}t(o,s,o.length,d,i.length)}),o}return M(n,a),r}function Er(e,n){if(e.node(n).dummy)return z(e.predecessors(n),function(r){return e.node(r).dummy})}function Te(e,n,r){if(n>r){var t=n;n=r,r=t}var a=e[n];a||(e[n]=a={}),a[r]=!0}function Or(e,n,r){if(n>r){var t=n;n=r,r=t}return!!e[n]&&Object.prototype.hasOwnProperty.call(e[n],r)}function Lr(e,n,r,t){var a={},i={},o={};return f(n,function(u){f(u,function(d,s){a[d]=d,i[d]=d,o[d]=s})}),f(n,function(u){var d=-1;f(u,function(s){var c=t(s);if(c.length){c=R(c,function(b){return o[b]});for(var l=(c.length-1)/2,h=Math.floor(l),v=Math.ceil(l);h<=v;++h){var p=c[h];i[s]===s&&d<o[p]&&!Or(r,s,p)&&(i[p]=s,i[s]=a[s]=a[p],d=o[p])}}})}),{root:a,align:i}}function Nr(e,n,r,t,a){var i={},o=Pr(e,n,r,a),u=a?"borderLeft":"borderRight";function d(l,h){for(var v=o.nodes(),p=v.pop(),b={};p;)b[p]?l(p):(b[p]=!0,v.push(p),v=v.concat(h(p))),p=v.pop()}function s(l){i[l]=o.inEdges(l).reduce(function(h,v){return Math.max(h,i[v.v]+o.edge(v))},0)}function c(l){var h=o.outEdges(l).reduce(function(p,b){return Math.min(p,i[b.w]-o.edge(b))},Number.POSITIVE_INFINITY),v=e.node(l);h!==Number.POSITIVE_INFINITY&&v.borderType!==u&&(i[l]=Math.max(i[l],h))}return d(s,o.predecessors.bind(o)),d(c,o.successors.bind(o)),f(t,function(l){i[l]=i[r[l]]}),i}function Pr(e,n,r,t){var a=new g,i=e.graph(),o=Ir(i.nodesep,i.edgesep,t);return f(n,function(u){var d;f(u,function(s){var c=r[s];if(a.setNode(c),d){var l=r[d],h=a.edge(l,c);a.setEdge(l,c,Math.max(o(e,s,d),h||0))}d=s})}),a}function Cr(e,n){return U(x(n),function(r){var t=Number.NEGATIVE_INFINITY,a=Number.POSITIVE_INFINITY;return nn(r,function(i,o){var u=Mr(e,o)/2;t=Math.max(i+u,t),a=Math.min(i-u,a)}),t-a})}function _r(e,n){var r=x(n),t=P(r),a=y(r);f(["u","d"],function(i){f(["l","r"],function(o){var u=i+o,d=e[u],s;if(d!==n){var c=x(d);s=o==="l"?t-P(c):a-y(c),s&&(e[u]=S(d,function(l){return l+s}))}})})}function Rr(e,n){return S(e.ul,function(r,t){if(n)return e[n.toLowerCase()][t];var a=R(w(e,t));return(a[1]+a[2])/2})}function Tr(e){var n=F(e),r=q(kr(e,n),xr(e,n)),t={},a;f(["u","d"],function(o){a=o==="u"?n:x(n).reverse(),f(["l","r"],function(u){u==="r"&&(a=w(a,function(l){return x(l).reverse()}));var d=(o==="u"?e.predecessors:e.successors).bind(e),s=Lr(e,a,r,d),c=Nr(e,a,s.root,s.align,u==="r");u==="r"&&(c=S(c,function(l){return-l})),t[o+u]=c})});var i=Cr(e,t);return _r(t,i),Rr(t,e.graph().align)}function Ir(e,n,r){return function(t,a,i){var o=t.node(a),u=t.node(i),d=0,s;if(d+=o.width/2,Object.prototype.hasOwnProperty.call(o,"labelpos"))switch(o.labelpos.toLowerCase()){case"l":s=-o.width/2;break;case"r":s=o.width/2;break}if(s&&(d+=r?s:-s),s=0,d+=(o.dummy?n:e)/2,d+=(u.dummy?n:e)/2,d+=u.width/2,Object.prototype.hasOwnProperty.call(u,"labelpos"))switch(u.labelpos.toLowerCase()){case"l":s=u.width/2;break;case"r":s=-u.width/2;break}return s&&(d+=r?s:-s),s=0,d}}function Mr(e,n){return e.node(n).width}function Sr(e){e=me(e),Fr(e),rn(Tr(e),function(n,r){e.node(r).x=n})}function Fr(e){var n=F(e),r=e.graph().ranksep,t=0;f(n,function(a){var i=y(w(a,function(o){return e.node(o).height}));f(a,function(o){e.node(o).y=t+i/2}),t+=i+r})}function st(e,n){var r=n&&n.debugTiming?Rn:Tn;r("layout",()=>{var t=r("  buildLayoutGraph",()=>Xr(e));r("  runLayout",()=>jr(t,r)),r("  updateInputGraph",()=>Vr(e,t))})}function jr(e,n){n("    makeSpaceForEdgeLabels",()=>zr(e)),n("    removeSelfEdges",()=>rt(e)),n("    acyclic",()=>En(e)),n("    nestingGraph.run",()=>Zn(e)),n("    rank",()=>Hn(me(e))),n("    injectEdgeLabelProxies",()=>Ur(e)),n("    removeEmptyRanks",()=>Cn(e)),n("    nestingGraph.cleanup",()=>nr(e)),n("    normalizeRanks",()=>Pn(e)),n("    assignRankMinMax",()=>Hr(e)),n("    removeEdgeLabelProxies",()=>Jr(e)),n("    normalize.run",()=>Vn(e)),n("    parentDummyChains",()=>mr(e)),n("    addBorderSegments",()=>In(e)),n("    order",()=>wr(e)),n("    insertSelfEdges",()=>tt(e)),n("    adjustCoordinateSystem",()=>Mn(e)),n("    position",()=>Sr(e)),n("    positionSelfEdges",()=>at(e)),n("    removeBorderNodes",()=>nt(e)),n("    normalize.undo",()=>Bn(e)),n("    fixupEdgeLabelCoords",()=>Kr(e)),n("    undoCoordinateSystem",()=>Sn(e)),n("    translateGraph",()=>Qr(e)),n("    assignNodeIntersects",()=>Zr(e)),n("    reversePoints",()=>et(e)),n("    acyclic.undo",()=>Ln(e))}function Vr(e,n){f(e.nodes(),function(r){var t=e.node(r),a=n.node(r);t&&(t.x=a.x,t.y=a.y,n.children(r).length&&(t.width=a.width,t.height=a.height))}),f(e.edges(),function(r){var t=e.edge(r),a=n.edge(r);t.points=a.points,Object.prototype.hasOwnProperty.call(a,"x")&&(t.x=a.x,t.y=a.y)}),e.graph().width=n.graph().width,e.graph().height=n.graph().height}var Ar=["nodesep","edgesep","ranksep","marginx","marginy"],Br={ranksep:50,edgesep:20,nodesep:50,rankdir:"tb"},Gr=["acyclicer","ranker","rankdir","align"],Yr=["width","height"],Dr={width:0,height:0},$r=["minlen","weight","width","height","labeloffset"],qr={minlen:1,weight:1,width:0,height:0,labeloffset:10,labelpos:"r"},Wr=["labelpos"];function Xr(e){var n=new g({multigraph:!0,compound:!0}),r=D(e.graph());return n.setGraph(q({},Br,Y(r,Ar),I(r,Gr))),f(e.nodes(),function(t){var a=D(e.node(t));n.setNode(t,Je(Y(a,Yr),Dr)),n.setParent(t,e.parent(t))}),f(e.edges(),function(t){var a=D(e.edge(t));n.setEdge(t,q({},qr,Y(a,$r),I(a,Wr)))}),n}function zr(e){var n=e.graph();n.ranksep/=2,f(e.edges(),function(r){var t=e.edge(r);t.minlen*=2,t.labelpos.toLowerCase()!=="c"&&(n.rankdir==="TB"||n.rankdir==="BT"?t.width+=t.labeloffset:t.height+=t.labeloffset)})}function Ur(e){f(e.edges(),function(n){var r=e.edge(n);if(r.width&&r.height){var t=e.node(n.v),a=e.node(n.w),i={rank:(a.rank-t.rank)/2+t.rank,e:n};L(e,"edge-proxy",i,"_ep")}})}function Hr(e){var n=0;f(e.nodes(),function(r){var t=e.node(r);t.borderTop&&(t.minRank=e.node(t.borderTop).rank,t.maxRank=e.node(t.borderBottom).rank,n=y(n,t.maxRank))}),e.graph().maxRank=n}function Jr(e){f(e.nodes(),function(n){var r=e.node(n);r.dummy==="edge-proxy"&&(e.edge(r.e).labelRank=r.rank,e.removeNode(n))})}function Qr(e){var n=Number.POSITIVE_INFINITY,r=0,t=Number.POSITIVE_INFINITY,a=0,i=e.graph(),o=i.marginx||0,u=i.marginy||0;function d(s){var c=s.x,l=s.y,h=s.width,v=s.height;n=Math.min(n,c-h/2),r=Math.max(r,c+h/2),t=Math.min(t,l-v/2),a=Math.max(a,l+v/2)}f(e.nodes(),function(s){d(e.node(s))}),f(e.edges(),function(s){var c=e.edge(s);Object.prototype.hasOwnProperty.call(c,"x")&&d(c)}),n-=o,t-=u,f(e.nodes(),function(s){var c=e.node(s);c.x-=n,c.y-=t}),f(e.edges(),function(s){var c=e.edge(s);f(c.points,function(l){l.x-=n,l.y-=t}),Object.prototype.hasOwnProperty.call(c,"x")&&(c.x-=n),Object.prototype.hasOwnProperty.call(c,"y")&&(c.y-=t)}),i.width=r-n+o,i.height=a-t+u}function Zr(e){f(e.edges(),function(n){var r=e.edge(n),t=e.node(n.v),a=e.node(n.w),i,o;r.points?(i=r.points[0],o=r.points[r.points.length-1]):(r.points=[],i=a,o=t),r.points.unshift(te(t,i)),r.points.push(te(a,o))})}function Kr(e){f(e.edges(),function(n){var r=e.edge(n);if(Object.prototype.hasOwnProperty.call(r,"x"))switch((r.labelpos==="l"||r.labelpos==="r")&&(r.width-=r.labeloffset),r.labelpos){case"l":r.x-=r.width/2+r.labeloffset;break;case"r":r.x+=r.width/2+r.labeloffset;break}})}function et(e){f(e.edges(),function(n){var r=e.edge(n);r.reversed&&r.points.reverse()})}function nt(e){f(e.nodes(),function(n){if(e.children(n).length){var r=e.node(n),t=e.node(r.borderTop),a=e.node(r.borderBottom),i=e.node(T(r.borderLeft)),o=e.node(T(r.borderRight));r.width=Math.abs(o.x-i.x),r.height=Math.abs(a.y-t.y),r.x=i.x+r.width/2,r.y=t.y+r.height/2}}),f(e.nodes(),function(n){e.node(n).dummy==="border"&&e.removeNode(n)})}function rt(e){f(e.edges(),function(n){if(n.v===n.w){var r=e.node(n.v);r.selfEdges||(r.selfEdges=[]),r.selfEdges.push({e:n,label:e.edge(n)}),e.removeEdge(n)}})}function tt(e){var n=F(e);f(n,function(r){var t=0;f(r,function(a,i){var o=e.node(a);o.order=i+t,f(o.selfEdges,function(u){L(e,"selfedge",{width:u.label.width,height:u.label.height,rank:o.rank,order:i+ ++t,e:u.e,label:u.label},"_se")}),delete o.selfEdges})})}function at(e){f(e.nodes(),function(n){var r=e.node(n);if(r.dummy==="selfedge"){var t=e.node(r.e.v),a=t.x+t.width/2,i=t.y,o=r.x-a,u=t.height/2;e.setEdge(r.e,r.label),e.removeNode(n),r.label.points=[{x:a+2*o/3,y:i-u},{x:a+5*o/6,y:i-u},{x:a+o,y:i},{x:a+5*o/6,y:i+u},{x:a+2*o/3,y:i+u}],r.label.x=r.x,r.label.y=r.y}})}function Y(e,n){return S(I(e,n),Number)}function D(e){var n={};return f(e,function(r,t){n[t.toLowerCase()]=r}),n}export{st as l};
