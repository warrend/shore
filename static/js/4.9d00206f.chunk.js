(this.webpackJsonpraft=this.webpackJsonpraft||[]).push([[4],{239:function(e,t,n){e.exports={wrapper:"LessonCard_wrapper__CTJ3h",complete:"LessonCard_complete__nVZgo",header:"LessonCard_header__2Okm0",number:"LessonCard_number__1vmC2"}},240:function(e,t,n){e.exports={wrapper:"Complete_wrapper__VCPBV"}},241:function(e,t,n){e.exports={content:"TrackScreen_content__3WZRi",nav:"TrackScreen_nav__1W9yy"}},251:function(e,t,n){"use strict";n.r(t);var c=n(6),a=n.n(c),r=n(11),s=n(15),i=n(0),o=n(3),d=n(239),l=n.n(d),u=n(69),b=n(240),j=n.n(b),v=n(1);var f=function(){return Object(v.jsx)("div",{className:j.a.wrapper,children:Object(v.jsx)(u.a,{icon:"check",readonly:!0})})},p=n(70);var O=function(e){var t=e.lesson,n=t.title,c=t.id,a=t.isCompleted,r=Object(o.g)(),s=Object(o.h)(),i=function(e){Object(p.a)((function(){return r.push("".concat(s.pathname,"/lessons/").concat(e))}))};return Object(v.jsxs)("div",{className:l.a.wrapper,onClick:function(){return i(c)},onKeyPress:function(){return i(c)},role:"button",tabIndex:0,children:[Object(v.jsxs)("div",{className:l.a.header,children:[Object(v.jsx)("div",{className:l.a.number,children:c}),n]}),a&&Object(v.jsx)(f,{})]})},_=n(2),m=n(96),x=n(241),h=n.n(x),g=n(98),k=n(12),w=n(13),N=n(72);t.default=function(){var e,t=Object(w.b)(),n=t.services.changeLoadingState,c=t.selectors.loading,d=Object(i.useState)(),l=Object(s.a)(d,2),b=l[0],j=l[1],f=Object(i.useState)(),x=Object(s.a)(f,2),C=x[0],y=x[1],S=Object(i.useState)(!1),L=Object(s.a)(S,2),B=L[0],I=L[1],T=Object(o.g)(),K=(Object(o.i)()||"").slug;return Object(i.useEffect)((function(){return function(){var e=Object(r.a)(a.a.mark((function e(){var t,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n(!0),!K){e.next=12;break}if(void 0===(t=k.a.getTrack(K)).lessons){e.next=11;break}return e.next=6,k.a.getNextLesson(K);case 6:c=e.sent,y(c),j(t),e.next=12;break;case 11:I(!0);case 12:n(!1);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()(),function(){}}),[]),Object(N.a)(c),Object(v.jsxs)("div",{className:h.a.wrapper,children:[Object(v.jsx)("div",{className:h.a.nav,children:Object(v.jsx)(u.a,{icon:_.a,onClick:function(){Object(p.a)((function(){return T.push(_.B)}))}})}),B?Object(v.jsx)("div",{children:"No track."}):Object(v.jsxs)("div",{className:h.a.content,children:[C?Object(v.jsxs)("div",{className:h.a.section,children:[Object(v.jsx)("h2",{children:"Next up"}),Object(v.jsx)("div",{children:Object(v.jsx)(g.a,{lesson:C.lesson,readTime:null===C||void 0===C?void 0:C.readTime,track:b})})]}):null,Object(v.jsxs)("div",{children:[Object(v.jsx)("div",{className:h.a.header,children:Object(v.jsxs)("h2",{children:[null===b||void 0===b?void 0:b.title," ",_.o]})}),b&&(null===b||void 0===b||null===(e=b.lessons)||void 0===e?void 0:e.map((function(e){return Object(v.jsx)(O,{lesson:e},e.id)})))]})]}),Object(v.jsx)(m.a,{children:Object(v.jsx)("div",{children:"Slider"})})]})}},69:function(e,t,n){"use strict";var c=n(14),a=(n(0),n(22)),r=n.n(a),s=n(78),i=n.n(s),o={menuIcon:n.p+"static/media/menu.bc8a5bc9.svg",arrowLeft:n.p+"static/media/arrow-left.7ed8615f.svg",coffee:n.p+"static/media/coffee.89d31d8c.svg",close:n.p+"static/media/close.9b3aff95.svg",check:n.p+"static/media/check.ba41cd42.svg",writing:n.p+"static/media/writing.36d2035a.svg",revising:n.p+"static/media/revising.3a538abe.svg",collecting:n.p+"static/media/collecting.7f2c68aa.svg",defaultIcon:n.p+"static/media/default-icon.89d31d8c.svg"},d=n(2),l=n(1);t.a=function(e){var t,n=e.onClick,a=e.icon,s=e.background,u=e.readonly,b=e.backgroundColor,j=e.randomize,v=r()((t={},Object(c.a)(t,i.a.wrapper,!0),Object(c.a)(t,i.a.background,s),Object(c.a)(t,i.a.readonly,u),t));return Object(l.jsx)("div",{className:v,onClick:n,role:"button",tabIndex:0,onKeyPress:n,style:{background:j?function(){var e=Math.floor(361*Math.random());return"hsl(".concat(e,", 50%, 95%)")}():b},children:Object(l.jsx)("img",{src:o[a]?o[a]:o[d.f],alt:"icon",className:i.a.custom})})}},70:function(e,t,n){"use strict";var c=n(2);t.a=function(e){var t=document.querySelector(c.k);null===t||void 0===t||t.classList.add(c.C),setTimeout((function(){e()}),c.D)}},72:function(e,t,n){"use strict";var c=n(0),a=n(2),r=n(1);t.a=function(e){return Object(c.useEffect)((function(){if(!e){var t=document.querySelector(a.k);null===t||void 0===t||t.classList.remove(a.C)}}),[]),Object(r.jsx)(r.Fragment,{})}},76:function(e,t,n){"use strict";var c=n(14),a=(n(0),n(22)),r=n.n(a),s=n(77),i=n.n(s),o=n(1);t.a=function(e){var t,n=e.name,a=e.onClick,s=e.secondary,d=e.warning,l=e.disabled,u=r()((t={},Object(c.a)(t,i.a.button,!0),Object(c.a)(t,i.a.alternate,s),Object(c.a)(t,i.a.warning,d),Object(c.a)(t,i.a.disabled,l),t));return Object(o.jsx)("button",{onClick:a,className:u,type:"button",disabled:l,children:n})}},77:function(e,t,n){e.exports={button:"Button_button__7BOOM",alternate:"Button_alternate__Hc_Lm",warning:"Button_warning__21l9b",disabled:"Button_disabled__2Lm8E"}},78:function(e,t,n){e.exports={wrapper:"Icon_wrapper__3ud2K",background:"Icon_background__nfzL-",readonly:"Icon_readonly__aqeaZ"}},96:function(e,t,n){"use strict";var c=n(14),a=(n(0),n(22)),r=n.n(a),s=n(13),i=n(97),o=n.n(i),d=n(76),l=n(1);t.a=function(e){var t,n=e.children,a=Object(s.b)(),i=a.selectors.sliderState,u=a.services.changeSliderState,b=r()((t={},Object(c.a)(t,o.a.wrapper,!0),Object(c.a)(t,o.a.closed,!i),t));return Object(l.jsxs)("div",{className:b,children:[Object(l.jsx)(d.a,{onClick:function(){return u(!1)},name:"close"}),n]})}},97:function(e,t,n){e.exports={wrapper:"Slider_wrapper__1Km2g",closed:"Slider_closed__1z77m"}},98:function(e,t,n){"use strict";n(0);var c=n(3),a=n(2),r=n(99),s=n.n(r),i=n(69),o=n(70),d=n(1);t.a=function(e){var t=e.lesson,n=e.readTime,r=e.track,l=t,u=l.title,b=l.id,j=Object(c.g)(),v=function(e){Object(o.a)((function(){return j.push("".concat(a.B,"/").concat(null===r||void 0===r?void 0:r.path,"/lessons/").concat(e))}))};return Object(d.jsxs)("div",{className:s.a.wrapper,onClick:function(){return v(b)},onKeyPress:function(){return v(b)},role:"button",tabIndex:0,children:[Object(d.jsx)(i.a,{icon:null===r||void 0===r?void 0:r.path,background:!0}),Object(d.jsxs)("div",{children:[Object(d.jsxs)("div",{className:s.a.lesson,children:[Object(d.jsx)("div",{className:s.a.track,children:null===r||void 0===r?void 0:r.title}),Object(d.jsxs)("div",{className:s.a.lesson_info,children:[a.n," ",b]})]}),Object(d.jsx)("div",{className:s.a.title,children:u}),Object(d.jsx)("div",{className:s.a.read,children:n})]})]})}},99:function(e,t,n){e.exports={wrapper:"NextCard_wrapper__3__yF",title:"NextCard_title__2Ve9f",lesson:"NextCard_lesson__cUB1O",track:"NextCard_track__-UwyK",read:"NextCard_read__3icJB"}}}]);
//# sourceMappingURL=4.9d00206f.chunk.js.map