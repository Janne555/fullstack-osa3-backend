(window.webpackJsonppuhelinluettelo=window.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,t,n){e.exports=n(40)},39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(13),o=n.n(c),u=n(14),i=n(2),l=n(4),f=n(3),m=n.n(f),s="/api/persons";function b(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(),o=Object(i.a)(c,2),u=o[0],f=o[1],b=Object(r.useState)(),d=Object(i.a)(b,2),O=d[0],h=d[1],p=Object(r.useState)(),g=Object(i.a)(p,2),v=g[0],j=g[1],E=Object(r.useState)(),w=Object(i.a)(E,2),y=w[0],C=w[1];return Object(r.useEffect)((function(){var e=!1;return m.a.get(s).then((function(e){return e.data})).then((function(t){e||a(t)})).catch((function(t){e||(t instanceof Error?f({message:t.message,error:!0}):f({message:"unable to fetch contacts",error:!0}))})),function(){e=!0}}),[]),Object(r.useEffect)((function(){var e,t=!1;return O&&(e=O,m.a.put("".concat(s,"/").concat(e.id),e).then((function(e){return e.data}))).then((function(e){t||(a((function(t){return[].concat(Object(l.a)(t.filter((function(t){return t.id!==e.id}))),[e])})),h(void 0),f({message:"Updated contact ".concat(e.name),error:!1}))})).catch((function(e){t||(e instanceof Error?f({message:e.message,error:!0}):f({message:"unable to put contact",error:!0}))})),function(){t=!0}}),[O]),Object(r.useEffect)((function(){var e,t=!1;return v&&(e=v,m.a.post(s,e).then((function(e){return e.data}))).then((function(e){t||(a((function(t){return[].concat(Object(l.a)(t),[e])})),j(void 0),f({message:"Created contact ".concat(e.name),error:!1}))})).catch((function(e){t||(e instanceof Error?f({message:e.message,error:!0}):f({message:"unable to store new contact",error:!0}))})),function(){t=!0}}),[v]),Object(r.useEffect)((function(){var e,t=!1;return y&&(e=y,m.a.delete("".concat(s,"/").concat(e.id)).then((function(e){return e.data}))).then((function(){t||(a((function(e){return e.filter((function(e){return e.id!==y.id}))})),C(void 0),f({message:"Deleted contact ".concat(y.name),error:!1}))})).catch((function(e){t||f({message:"unable to delete contact ".concat(y.name),error:!0})})),function(){t=!0}}),[y]),Object(r.useEffect)((function(){var e=!1;return u&&setTimeout((function(){return!e&&f(void 0)}),5e3),function(){e=!0}}),[u]),[n,u,h,j,C]}function d(e){var t=e.message,n=e.error;return a.a.createElement("div",{className:"message ".concat(n?"error":"")},a.a.createElement("p",null,t))}var O=function(e){var t=e.newName,n=e.newNumber,r=e.onNameChange,c=e.onNumberChange,o=e.onSubmit;return a.a.createElement("form",{onSubmit:o},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:t,onChange:r})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:n,onChange:c})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},h=function(e){var t=e.filter,n=e.contacts,r=e.onDelete;return a.a.createElement("ul",null,n.filter((function(e){return e.name.toLowerCase().includes(t)})).map((function(e){var t=e.name,n=e.number,c=e.id;return a.a.createElement("li",{key:c},t,", ",n,", ",a.a.createElement("button",{onClick:function(){return r({name:t,number:n,id:c})}},"delete"))})))};function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var g=function(e){var t=e.onChange;return a.a.createElement(a.a.Fragment,null,"filter shown with ",a.a.createElement("input",{onChange:t}))},v=function(){var e=b(),t=Object(i.a)(e,5),n=t[0],c=t[1],o=t[2],l=t[3],f=t[4],m=Object(r.useState)(""),s=Object(i.a)(m,2),v=s[0],j=s[1],E=Object(r.useState)(""),w=Object(i.a)(E,2),y=w[0],C=w[1],S=Object(r.useState)(""),N=Object(i.a)(S,2),D=N[0],P=N[1];return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),c&&a.a.createElement(d,c),a.a.createElement(g,{onChange:function(e){P(e.target.value)}}),a.a.createElement("h2",null,"Add new"),a.a.createElement(O,{newName:v,newNumber:y,onNameChange:function(e){j(e.target.value)},onNumberChange:function(e){C(e.target.value)},onSubmit:function(e){if(e.preventDefault(),n.every((function(e){return e.name!==v})))l({name:v,number:y,id:0}),j(""),C("");else if(window.confirm("".concat(v," is already in the phonebook, replace old phone number with new one"))){var t=n.find((function(e){return e.name===v}));t&&o(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(n,!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t,{number:y}))}}}),a.a.createElement("h2",null,"Numbers"),n&&a.a.createElement(h,{contacts:n,filter:D.toLowerCase(),onDelete:function(e){window.confirm("Delete ".concat(e.name))&&f(e)}}))};n(39);o.a.render(a.a.createElement(v,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.81e0b386.chunk.js.map