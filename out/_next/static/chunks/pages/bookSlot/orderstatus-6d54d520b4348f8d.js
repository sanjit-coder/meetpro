(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7649],{68403:function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/bookSlot/orderstatus",function(){return o(9366)}])},17222:function(e,t,o){"use strict";var s=o(85893);o(67294);let n=e=>{let{children:t}=e;return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{className:"backdrop",children:t})})};t.Z=n},31436:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return b}});var s=o(85893),n=o(67294),l={src:"/_next/static/media/paymentfailed.fc285b0f.svg",height:96,width:96,blurWidth:0,blurHeight:0},a=o(25675),r=o.n(a),i=o(55280),d=o(17222),c=o(40849),u=o(11163),_=o(9473),x=o(22101),v=o(65186);let h=()=>{let e=(0,u.useRouter)(),t=(0,_.I0)(),[o,a]=(0,n.useState)(!1),[h,b]=(0,n.useState)({});(0,n.useEffect)(()=>{b(JSON.parse(sessionStorage.getItem("orderRetryPayload")))},[e]),(0,n.useEffect)(()=>{let e=JSON.parse(sessionStorage.getItem("pageData"));(0,v.L)("Open_PostPayment_Fail_".concat(null==e?void 0:e.creatorId))},[]);let m=()=>{let e=JSON.parse(sessionStorage.getItem("pageData"));(0,v.L)("Click_Retry_Fail_".concat(null==e?void 0:e.creatorId)),a(!0),t((0,x.LV)({orderPayload:h}))};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"bookSlotResultContainer",children:(0,s.jsxs)("div",{className:"bookSlotResultContainer__box bookSlotResultContainer__box__failedpayment",children:[(0,s.jsx)("div",{className:"bookSlotResultContainer__box__logo bookSlotResultContainer__box__logo__failure",children:(0,s.jsx)(r(),{src:l,alt:"Success Icon",style:{width:"100%",height:"100%"}})}),(0,s.jsxs)("div",{className:"bookSlotResultContainer__box__text",children:[(0,s.jsx)("div",{className:"bookSlotResultContainer__box__text__heading",children:"Payment failed!"}),(0,s.jsxs)("div",{className:"bookSlotResultContainer__box__text__secondary",children:["Your payment for this session could not be completed. Please retry again.",(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),"If you have any query contact us on: support@meetpro.club"]})]})]})}),(0,s.jsx)("div",{className:"buttoncontainer buttoncontainer__bookSlot",children:(0,s.jsx)(i.Z,{onClick:m,children:"Retry Payment"})}),o&&(0,s.jsx)(d.Z,{children:(0,s.jsx)(c.Z,{active:!0,size:"large"})})]})};var b=h},9366:function(e,t,o){"use strict";o.r(t);var s=o(85893),n=o(67294),l=o(9473),a=o(31436),r=o(14533),i=o(15424),d=o(11163),c=o(22101),u=o(17222),_=o(40849);let x=()=>{var e;let t=(0,d.useRouter)(),o=(0,l.I0)();(0,l.v9)(e=>{var t;return null==e?void 0:null===(t=e.orderReducer)||void 0===t?void 0:t.orderPayload});let[x,v]=(0,n.useState)(""),[h,b]=(0,n.useState)(!0),m=(0,l.v9)(e=>{var t;return null==e?void 0:null===(t=e.orderReducer)||void 0===t?void 0:t.statusModal}),f=(0,l.v9)(e=>{var t;return null==e?void 0:null===(t=e.orderReducer)||void 0===t?void 0:t.bookingQuestions}),[S,g]=(0,n.useState)(f);return console.log("questionsxx ashu",f),(0,n.useEffect)(()=>{if(null==t?void 0:t.isReady){v(null==sessionStorage?void 0:sessionStorage.getItem("selectedText"));var e=t.query.orderId,s=t.query.paymentStatus;if(e){let t=()=>{},s=Date.now();o((0,c.wM)({orderId:e,pollingStartTime:s,callBack:t}))}else"failed"==s&&o((0,c.tY)({modal:"failedModal",status:!0,orderId:""}))}},[t]),(0,n.useEffect)(()=>{if((null==m?void 0:m.modal)=="successModal"){let e=JSON.parse(window.sessionStorage.getItem("orderRetryPayload"));o(c._U({sellerId:null==e?void 0:e.sellerId,serviceId:null==e?void 0:e.serviceId}))}},[m]),(0,n.useEffect)(()=>{null!==f&&g(f)},[f]),(0,s.jsx)("div",{className:"checkoutPage-container",children:(null==m?void 0:m.modal)=="successModal"&&(null==S?void 0:S.length)?(0,s.jsx)(r.default,{creatorName:null==t?void 0:null===(e=t.query)||void 0===e?void 0:e.name,successText:x,orderId:null==m?void 0:m.orderId,creatorQuestions:S,bookingId:null==m?void 0:m.bookingId}):(null==m?void 0:m.modal)=="failedModal"?(0,s.jsx)(a.default,{}):(null==m?void 0:m.modal)=="pendingModal"?(0,s.jsx)(i.default,{orderId:null==m?void 0:m.orderId}):(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(u.Z,{children:(0,s.jsx)(_.Z,{active:!0,size:"large"})})})})};t.default=x},15424:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return v}});var s=o(85893),n=o(67294),l={src:"/_next/static/media/pendingIcon.60bacb20.png",height:300,width:300,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA1ElEQVR42jWPSwsBYRiFj8tkXLIwVlZMw5KNhq3ciigWFhNyGVZuzUJY8A+USPFL5GfM71GfM1Nz6tTT2/ue831QT0ICpR5ESzuLHb0l9+Aps/9lObDptVK9D5T60yCb6lFYAEUIcDCNF5bXIGDKEhYAxs6Sm6R/RRhAKQR0oul6OZLSTXIv2XzNWGdBuwgr2XxPZcAAFdO6OTmAMbGof3icYQyj5gDmsh+GD2jE84sbZxOn3nuH5SwptccoUbkOySva5gc0eGJSn3Ubekduu4cnIf0BoTtO2kkm0OkAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},a=o(25675),r=o.n(a),i=o(17222),d=o(40849),c=o(9473),u=o(11163),_=o(65186);let x=e=>{let{orderId:t}=e;(0,u.useRouter)(),(0,c.I0)();let[o,a]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{let e=JSON.parse(sessionStorage.getItem("pageData"));(0,_.L)("Open_PostPayment_Progress_".concat(null==e?void 0:e.creatorId))},[]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"bookSlotResultContainer",children:(0,s.jsxs)("div",{className:"bookSlotResultContainer__box bookSlotResultContainer__box__failedpayment",children:[(0,s.jsx)("div",{className:"bookSlotResultContainer__box__logo bookSlotResultContainer__box__logo__failure",children:(0,s.jsx)(r(),{src:l,alt:"Success Icon",style:{width:"100%",height:"100%"}})}),(0,s.jsxs)("div",{className:"bookSlotResultContainer__box__text",children:[(0,s.jsx)("div",{className:"bookSlotResultContainer__box__text__heading",children:"We are trying to process your payment"}),(0,s.jsxs)("div",{className:"bookSlotResultContainer__box__text__secondaryheading",children:[(0,s.jsx)("br",{}),"Order Id: ",t]}),(0,s.jsxs)("div",{className:"bookSlotResultContainer__box__text__secondary",children:[(0,s.jsx)("div",{className:"bookSlotResultContainer__box__text__secondary__textBlock",children:"1.If the payment is successful, we will share the link to join the channel via sms and email within 2 hours."}),(0,s.jsx)("br",{}),(0,s.jsx)("div",{className:"bookSlotResultContainer__box__text__secondary__textBlock",children:"2.In case the payment fails, the amount will be refunded to the source with 2-3 business days."}),(0,s.jsx)("br",{}),(0,s.jsx)("div",{className:"bookSlotResultContainer__box__text__secondary__textBlock",children:"3.In case you don't get the channel invite link within 2 hours contact us on : support@meetpro.club"})]})]})]})}),o&&(0,s.jsx)(i.Z,{children:(0,s.jsx)(d.Z,{active:!0,size:"large"})})]})};var v=x},22101:function(e,t,o){"use strict";o.d(t,{LV:function(){return n},_U:function(){return a},tY:function(){return r},wM:function(){return l}});var s=o(48787);let n=e=>({type:s.CREATE_ORDER,payload:e}),l=e=>({type:s.CHECK_PAYMENT_STATUS,payload:e}),a=e=>({type:s.GET_BOOKING_QUESTIONS,payload:e}),r=e=>({type:s.SET_MODAL_STATUS,payload:e})},40849:function(e,t,o){"use strict";var s=o(87462),n=o(86010),l=o(67294),a=o(98459),r=o(28935),i=o(12519),d=o(92248);function c(e){var t=e.active,o=e.children,u=e.className,_=e.content,x=e.disabled,v=e.indeterminate,h=e.inline,b=e.inverted,m=e.size,f=(0,n.Z)("ui",m,(0,a.lG)(t,"active"),(0,a.lG)(x,"disabled"),(0,a.lG)(v,"indeterminate"),(0,a.lG)(b,"inverted"),(0,a.lG)(o||_,"text"),(0,a.sU)(h,"inline"),"loader",u),S=(0,r.Z)(c,e),g=(0,i.Z)(c,e);return l.createElement(g,(0,s.Z)({},S,{className:f}),d.kK(o)?_:o)}c.handledProps=["active","as","children","className","content","disabled","indeterminate","inline","inverted","size"],c.propTypes={},t.Z=c}},function(e){e.O(0,[5675,5122,9149,6559,2794,416,4533,9774,2888,179],function(){return e(e.s=68403)}),_N_E=e.O()}]);