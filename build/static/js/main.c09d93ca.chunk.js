(window.webpackJsonppuhelinluettelo=window.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,t,n){e.exports=n(40)},39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(13),o=n.n(c),u=n(14),i=n(2),l=n(4),s=n(3),f=n.n(s),m="/api/persons";function b(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(),o=Object(i.a)(c,2),u=o[0],s=o[1],b=Object(r.useState)(),d=Object(i.a)(b,2),p=d[0],O=d[1],h=Object(r.useState)(),v=Object(i.a)(h,2),g=v[0],j=v[1],E=Object(r.useState)(),w=Object(i.a)(E,2),y=w[0],C=w[1];return Object(r.useEffect)((function(){var e=!1;return f.a.get(m).then((function(e){return e.data})).then((function(t){e||a(t)})).catch((function(t){e||(t instanceof Error?s({message:t.message,error:!0}):s({message:"unable to fetch contacts",error:!0}))})),function(){e=!0}}),[]),Object(r.useEffect)((function(){var e,t=!1;return p&&(e=p,f.a.put("".concat(m,"/").concat(e.id),e).then((function(e){return e.data}))).then((function(e){t||(a((function(t){return[].concat(Object(l.a)(t.filter((function(t){return t.id!==e.id}))),[e])})),O(void 0),s({message:"Updated contact ".concat(e.name),error:!1}))})).catch((function(e){t||(e.response&&e.response.data?s({message:e.response.data.error,error:!0}):s({message:"unable to put contact",error:!0}))})),function(){t=!0}}),[p]),Object(r.useEffect)((function(){var e,t=!1;return g&&(e=g,f.a.post(m,e).then((function(e){return e.data}))).then((function(e){t||(a((function(t){return[].concat(Object(l.a)(t),[e])})),j(void 0),s({message:"Created contact ".concat(e.name),error:!1}))})).catch((function(e){console.error(e),t||(e.response&&e.response.data?s({message:e.response.data.error,error:!0}):s({message:"unable to store new contact",error:!0}))})),function(){t=!0}}),[g]),Object(r.useEffect)((function(){var e,t=!1;return y&&(e=y,f.a.delete("".concat(m,"/").concat(e.id)).then((function(e){return e.data}))).then((function(){t||(a((function(e){return e.filter((function(e){return e.id!==y.id}))})),C(void 0),s({message:"Deleted contact ".concat(y.name),error:!1}))})).catch((function(e){t||s({message:"unable to delete contact ".concat(y.name),error:!0})})),function(){t=!0}}),[y]),Object(r.useEffect)((function(){var e=!1;return u&&setTimeout((function(){return!e&&s(void 0)}),5e3),function(){e=!0}}),[u]),[n,u,O,j,C]}function d(e){var t=e.message,n=e.error;return a.a.createElement("div",{className:"message ".concat(n?"error":"")},a.a.createElement("p",null,t))}var p=function(e){var t=e.newName,n=e.newNumber,r=e.onNameChange,c=e.onNumberChange,o=e.onSubmit;return a.a.createElement("form",{onSubmit:o},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:t,onChange:r})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:n,onChange:c})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},O=function(e){var t=e.filter,n=e.contacts,r=e.onDelete;return a.a.createElement("ul",null,n.filter((function(e){return e.name.toLowerCase().includes(t)})).map((function(e){var t=e.name,n=e.number,c=e.id;return a.a.createElement("li",{key:c},t,", ",n,", ",a.a.createElement("button",{onClick:function(){return r({name:t,number:n,id:c})}},"delete"))})))};function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var v=function(e){var t=e.onChange;return a.a.createElement(a.a.Fragment,null,"filter shown with ",a.a.createElement("input",{onChange:t}))},g=function(){var e=b(),t=Object(i.a)(e,5),n=t[0],c=t[1],o=t[2],l=t[3],s=t[4],f=Object(r.useState)(""),m=Object(i.a)(f,2),g=m[0],j=m[1],E=Object(r.useState)(""),w=Object(i.a)(E,2),y=w[0],C=w[1],S=Object(r.useState)(""),N=Object(i.a)(S,2),D=N[0],P=N[1];return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),c&&a.a.createElement(d,c),a.a.createElement(v,{onChange:function(e){P(e.target.value)}}),a.a.createElement("h2",null,"Add new"),a.a.createElement(p,{newName:g,newNumber:y,onNameChange:function(e){j(e.target.value)},onNumberChange:function(e){C(e.target.value)},onSubmit:function(e){if(e.preventDefault(),n.every((function(e){return e.name!==g})))l({name:g,number:y,id:""}),j(""),C("");else if(window.confirm("".concat(g," is already in the phonebook, replace old phone number with new one"))){var t=n.find((function(e){return e.name===g}));t&&o(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(n,!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t,{number:y}))}}}),a.a.createElement("h2",null,"Numbers"),n&&a.a.createElement(O,{contacts:n,filter:D.toLowerCase(),onDelete:function(e){window.confirm("Delete ".concat(e.name))&&s(e)}}))};n(39);o.a.render(a.a.createElement(g,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.c09d93ca.chunk.js.map