(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8629],{81049:function(e,i,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/offerings/add",function(){return n(38472)}])},56174:function(e,i){"use strict";i.Z={src:"/_next/static/media/addSocialIcon.b4ebc877.svg",height:20,width:20,blurWidth:0,blurHeight:0}},84377:function(e,i){"use strict";i.Z={src:"/_next/static/media/alert.e17bc569.svg",height:40,width:40,blurWidth:0,blurHeight:0}},46578:function(e,i){"use strict";i.Z={src:"/_next/static/media/backIcon.f546b7ae.png",height:80,width:80,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAASFBMVEX0+f30+Pzz+Pz0+f3z+f30+Pzz+P30+f30+P30+f3z+Pzz+Pz4/f/3/f/3/P/2+//1+v70+f3z+f3z+Pzc4eXY3eHY3OHGy88ysp4wAAAADHRSTlMvLy/X19fX2Nj9/f4/iThMAAAAPUlEQVR42j3JRw6AMBADQFMT1jRjyv9/ipJDbiMNMIi8EpAVXkMjFDpfLwZ9fPduNtR6Ss0Kb6GEPovU1P137QNZVKQzxQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8}},81972:function(e,i){"use strict";i.Z={src:"/_next/static/media/deleteSocialIcon.5f911e96.svg",height:24,width:24,blurWidth:0,blurHeight:0}},15667:function(e,i){"use strict";i.Z={src:"/_next/static/media/modalCross.04236861.svg",height:24,width:24,blurWidth:0,blurHeight:0}},40554:function(e,i){"use strict";i.Z={src:"/_next/static/media/questionicon.34c60048.svg",height:16,width:16,blurWidth:0,blurHeight:0}},41095:function(e,i,n){"use strict";var t=n(85893);n(67294);let s=e=>{let{value:i,onClick:n,options:s,label:a,offeringsScreen:l,multiSelect:o=!1}=e;return console.log("OPTIONS ARE",s),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"label",children:a}),(0,t.jsx)("div",{className:"onboardingcontainer__box__badgecontainer",children:s&&s.length>0&&s.map((e,s)=>(0,t.jsx)("div",{className:o?(null==e?void 0:e.isSelected)===!0?"badge badge__active":"badge":(null==e?void 0:e.available)===!1?"badge badge__inactive":(null==e?void 0:e.name)!=i?"badge":"badge badge__active",onClick:()=>o?n(e,s):((null==e?void 0:e.available)===void 0||(null==e?void 0:e.available)===!0)&&n(null==e?void 0:e.name),children:l&&l?"".concat(null==e?void 0:e.text):"".concat(null==e?void 0:e.name)}))})]})};i.Z=s},55280:function(e,i,n){"use strict";var t=n(85893);n(67294);var s=n(25675),a=n.n(s);let l=e=>{let{onClick:i,className:n="buttoncontainer__button",disabled:s,icon:l,children:o,...r}=e,c=e=>{e.stopPropagation(),i&&i()};return(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("button",{onClick:c,className:n,disabled:s,children:[l&&(0,t.jsx)("div",{className:"buttoncontainer__icon",children:(0,t.jsx)(a(),{src:l,style:{width:"100%",height:"100%"}})}),o]})})};i.Z=l},75171:function(e,i,n){"use strict";n.d(i,{Z:function(){return r}});var t=n(85893);n(67294);var s={src:"/_next/static/media/yesicon.cc88b38c.png",height:60,width:60,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAoElEQVR42jWPuw0CMRBE3c4uIlhXgIREOwREFEADRKTnDigAWVcDBZARIeI7EJi3+CONdj0z+wv+bFC1pCN42SAzyHGQZRNFMTxi0gJZiN+a643/wqtzTFIMAXh1AVvyA4arGwo4Q969kri3JOvW6R2chDghrMCOfNNGuHlyw8XqiGMXET4tjv8Loi+JqS/axCeQfomATJeJLnM9WTSEEH5aAmeVtJ11UgAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8},a=n(60416),l=n(92794);n(9473);let o=e=>{let{type:i="text",value:n,dropDownValue:o,label:r,isDropDown:c=!1,dropDownOptions:d,dropDownValueSelect:u,textInputLabel:h,placeholder:g,icon:v,disabled:f,className:m,inputType:x="input",isQuestion:p=!0,splitInput:b,onChange:_,textArea:A,handleBlur:j,userName:N,maxLength:w,setError:E,error:y,errorMessage:S,...Z}=e;RegExp("^[0-9]+$");let k=(0,t.jsx)("div",{style:{position:"absolute",top:"50%",right:"5px",transform:"translate(0%, -35%)"},children:(0,t.jsx)("img",{width:20,height:20,src:s.src})});return(0,t.jsxs)(t.Fragment,{children:[""!==r&&(0,t.jsx)("div",{className:"label ".concat(m),children:r}),!b&&(0,t.jsx)("div",{className:A?p?"inputcontainer inputcontainer__textareaquestion":"inputcontainer inputcontainer__textarea":"inputcontainer",children:(0,t.jsx)(x,{type:i,className:"inputcontainer__input",disabled:f,...Z,placeholder:g,value:n,maxLength:w&&w,onChange:e=>_(e.target.value)})}),b&&!c&&(0,t.jsx)("div",{style:{width:"100%"},children:(0,t.jsx)(a.Z,{disabled:f,type:i,icon:v?k:null,label:{basic:!0,content:h},labelPosition:"left",style:{width:"100%",marginBottom:"24px"},value:n,onChange:e=>_(e.target.value),placeholder:g,onBlur:j})}),b&&c&&(0,t.jsx)("div",{className:"inputcontainer__dropdowncontainer",children:(0,t.jsx)(a.Z,{disabled:f,type:i,value:n,label:(0,t.jsx)(l.Z,{value:o,options:d,onChange:(e,i)=>{let{value:n}=i;return u(n)}}),className:"inputcontainer__dropdowncontainer__input",labelPosition:"left",placeholder:g,onChange:e=>_(e.target.value)})})]})};var r=o},67790:function(e,i,n){"use strict";n.d(i,{l:function(){return t}});let t=[{id:1,name:"15",text:"15 mins",isSelected:!1},{id:2,name:"30",text:"30 mins",isSelected:!1},{id:3,name:"45",text:"45 mins",isSelected:!1},{id:4,name:"60",text:"60 mins",isSelected:!1}]},38472:function(e,i,n){"use strict";n.r(i);var t=n(85893),s=n(67294),a=n(46578),l=n(48688),o=n(75171),r=n(55280),c=n(41095),d=n(11163),u=n(9473),h=n(16459),g=n(86501),v=n(10967),f=n(56174),m=n(81972),x=n(84377),p=n(15667),b=n(40554),_=n(67790),A=n(51511),j=n(79795);let N={padding:"12px 16px",background:"#333333",opacity:.9,border:"1px solid #606060",boxShadow:"0px 6px 12px rgba(0, 0, 0, 0.2)",borderRadius:"8px",fontFamily:"Nunito Sans",fontStyle:"normal",fontWeight:"600",fontSize:"12px",lineHeight:"150%"},w=()=>{var e,i,n,w;let E=(0,d.useRouter)(),y=(0,u.I0)(),S=(0,u.v9)(e=>e),[Z,k]=(0,s.useState)(!1),[I,R]=(0,s.useState)(!1),[C,P]=(0,s.useState)(!1),[D,q]=(0,s.useState)(""),F=(0,u.v9)(e=>{var i;return null==e?void 0:null===(i=e.onboardingReducer)||void 0===i?void 0:i.user}),z=(0,u.v9)(e=>null==e?void 0:e.offeringReducer),O=()=>{null==E||E.back()},[L,T]=(0,s.useState)([{id:0,question:"Your Linkedin URL?"}]),[G,M]=(0,s.useState)(""),[H,U]=(0,s.useState)(0),[W,B]=(0,s.useState)(""),[J,Q]=(0,s.useState)(""),V=()=>{g.ZP.success("Offering Added Successfully"),E.push("/offerings")},X=()=>{let e={description:J,duration:W,price:""===H?0:parseInt(H),title:G};if(""!==H&&0!==H&&H<=10)g.ZP.error("Please enter a price more than 10");else{if(L.length>1){let i=L.filter(e=>""!==e.question);i.length>1&&(e={...e,questions:i.slice(1)})}console.log("FINAL PAYLOAD IS",e),y(h.IB({payload:e,callBack:V}))}},Y=()=>{T([...L,{question:""}])},K=e=>{let i=[...L];i.splice(e,1),T(i)},$=(e,i)=>{let n=[...L];n[i].question=e,T(n)};return(0,s.useEffect)(()=>{z.hasOwnProperty("services")||E.push("/onboarding/screens/success")},[z]),(0,s.useEffect)(()=>{(null==window?void 0:window.innerWidth)<768?R(!1):R(!0)},[]),(0,s.useEffect)(()=>{T([{id:0,question:"Your Linkedin URL?"}])},[F]),(0,t.jsxs)(t.Fragment,{children:[!I&&(0,t.jsx)(l.Z,{logo:a.Z,heading:"Add Offering",handleBack:O}),(0,t.jsx)(v.Z,{tabSelected:"offerings",IsDesktopView:I,children:(0,t.jsxs)("div",{className:"offerings",children:[(0,t.jsxs)("div",{className:"offerings__box",children:[(0,t.jsx)(o.Z,{label:"Offering Name",icon:"",disabled:!1,value:G,placeholder:"1:1 Interview",onChange:e=>{M(e)},className:"offeringEdit_name"}),(0,t.jsx)(o.Z,{label:"Description",icon:"",disabled:!1,placeholder:"Add Description",value:J,onChange:e=>{Q(e)},className:"offeringEdit_desc",textArea:!0,isQuestion:!1,inputType:"textarea"}),(0,t.jsx)("div",{className:"offeringEdit_callDuration",children:(0,t.jsx)(c.Z,{label:"Call Duration",value:W,onClick:e=>{B(parseInt(e.split(" ")[0]))},options:_.l,offeringsScreen:!0})}),!(null==S?void 0:null===(e=S.onboardingReducer)||void 0===e?void 0:null===(i=e.user)||void 0===i?void 0:i.bankDetails)&&(0,t.jsxs)("div",{className:"offeringEdit__price",children:[(0,t.jsx)("h1",{children:"Price"}),(0,t.jsxs)("div",{className:"offeringEdit__price__pricebox",children:[(0,t.jsx)("div",{className:"freenudge",children:"Free"}),(0,t.jsx)("div",{className:"freenudgedetails",children:"Add your bank details from the home page to launch a paid offering. Don't forget to save the changes made on this page"})]})]}),(null==S?void 0:null===(n=S.onboardingReducer)||void 0===n?void 0:null===(w=n.user)||void 0===w?void 0:w.bankDetails)&&(0,t.jsx)(o.Z,{label:"Price",textInputLabel:"₹",placeholder:"0",value:H,onChange:e=>{U(e)},className:"offeringEdit_price",splitInput:!0}),(null==F?void 0:F.commissionPercentage)!==0&&(null==F?void 0:F.bankDetails)&&(0,t.jsx)("div",{className:"offerings_priceDisclaimer",children:"We charge a small ".concat(null==F?void 0:F.commissionPercentage,"% commission fees + ").concat(null==F?void 0:F.razorpayCommissionPercentage,"% Payment Gateway\n              charges on every paid transaction")}),(0,t.jsxs)("div",{className:"questionsbox",children:[(0,t.jsx)("div",{className:"questionsbox__headline",children:"Something you wanna ask your mentee"}),(0,t.jsx)("div",{className:"questionsbox__info",children:"Enter the questions you want to ask during the time of the booking to have more meaningful conversations."}),(0,t.jsx)("div",{className:"questioninputcontainer",children:L&&L.length>0&&L.map((e,i)=>(0,t.jsxs)("div",{className:"questioninputcontainer__inputbox",children:[(0,t.jsx)("div",{className:"questioninput",children:(0,t.jsx)(o.Z,{value:null==e?void 0:e.question,icon:"",disabled:0===i,placeholder:0===i?"Your LinkedIn link ?":"Eg. How can I help you?",onChange:e=>$(e,i),inputType:0!==i?"textarea":"input",textArea:0!==i,isQuestion:0!==i})}),0===i?(0,t.jsx)("div",{style:{width:"16px",height:"16px",cursor:"pointer"},children:(0,t.jsx)(A.Z,{trigger:(0,t.jsx)("img",{src:b.Z.src,alt:"Info circle",style:{width:"100%",height:"100%"}}),style:N,content:"We will collect LinkedIn Profile URL of your mentees, you can visit their profile to get a brief overview of their background.",inverted:!0,position:"top right"})}):(0,t.jsx)("div",{className:"questionicon",onClick:()=>{P(!0),q(i)},children:(0,t.jsx)("img",{src:m.Z.src,alt:"Delete icon",style:{width:"100%",height:"100%"}})})]}))})]}),L&&L.length<6&&(0,t.jsxs)("div",{className:"addquestion",onClick:()=>Y(),children:[(0,t.jsx)("div",{className:"addquestion__icon",children:(0,t.jsx)("img",{src:f.Z.src,style:{width:"100%",height:"100%"}})}),(0,t.jsx)("div",{className:"addquestion__text",children:"Add Question"})]})]}),(0,t.jsx)("div",{className:"buttoncontainer buttoncontainer__offeringspage",children:(0,t.jsx)(r.Z,{onClick:()=>{X()},className:"buttoncontainer__button buttoncontainer__button__offeringspage",disabled:Z,children:"Done"})})]})}),C&&(0,t.jsx)(j.Z,{open:open,style:{zIndex:"999 !important"},children:(0,t.jsx)(j.Z.Content,{children:(0,t.jsxs)("div",{className:"modalcontent",children:[(0,t.jsx)("div",{className:"modalcontent__crossicon",onClick:()=>{P(!1),q("")},children:(0,t.jsx)("img",{src:p.Z.src,alt:"Cross"})}),(0,t.jsx)("div",{className:"modalcontent__alerticon",children:(0,t.jsx)("img",{src:x.Z.src,alt:"Alert Icon"})}),(0,t.jsx)("div",{className:"modalcontent__heading",children:"Are you sure you want to delete this question ?"}),(0,t.jsx)("div",{className:"modalcontent__text",children:"This question will be deleted and can not be restored later."}),(0,t.jsx)("div",{className:"modalcontent__delete",onClick:()=>{K(D),P(!1)},children:"Yes, Delete"}),(0,t.jsx)("div",{className:"modalcontent__cancel",onClick:()=>{P(!1),q("")},children:"No, Cancel"})]})})})]})};i.default=w},16459:function(e,i,n){"use strict";n.d(i,{AZ:function(){return a},GG:function(){return l},IB:function(){return o},PM:function(){return r},si:function(){return s}});var t=n(1969);let s=e=>({type:t.GET_OFFERINGS,payload:e}),a=e=>({type:t.EDIT_OFFERINGS,payload:e}),l=e=>({type:t.DELETE_OFFERING,payload:e}),o=e=>({type:t.ADD_OFFERING,payload:e}),r=e=>({type:t.SELECT_OFFERING,payload:e})}},function(e){e.O(0,[5675,5122,9149,6559,2794,1664,416,9795,1511,7969,9774,2888,179],function(){return e(e.s=81049)}),_N_E=e.O()}]);