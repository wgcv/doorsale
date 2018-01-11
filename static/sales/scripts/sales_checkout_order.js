(function(){var e,t=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t
return-1};(e=jQuery).fn.validateCreditCard=function(n,a){var r,i,l,c,o,u,s,h,f,d,p,m
for(l=[{name:"amex",pattern:/^3[47]/,valid_length:[15]},{name:"diners_club_carte_blanche",pattern:/^30[0-5]/,valid_length:[14]},{name:"diners_club_international",pattern:/^36/,valid_length:[14]},{name:"jcb",pattern:/^35(2[89]|[3-8][0-9])/,valid_length:[16]},{name:"laser",pattern:/^(6304|670[69]|6771)/,valid_length:[16,17,18,19]},{name:"visa_electron",pattern:/^(4026|417500|4508|4844|491(3|7))/,valid_length:[16]},{name:"visa",pattern:/^4/,valid_length:[16]},{name:"mastercard",pattern:/^5[1-5]/,valid_length:[16]},{name:"maestro",pattern:/^(5018|5020|5038|6304|6759|676[1-3])/,valid_length:[12,13,14,15,16,17,18,19]},{name:"discover",pattern:/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,valid_length:[16]}],null==a&&(a={}),null==a.accept&&(a.accept=function(){var e,t,n
for(n=[],e=0,t=l.length;e<t;e++)r=l[e],n.push(r.name)
return n}()),d=0,p=(m=a.accept).length;d<p;d++)if(i=m[d],t.call(function(){var e,t,n
for(n=[],e=0,t=l.length;e<t;e++)r=l[e],n.push(r.name)
return n}(),i)<0)throw"Credit card type '"+i+"' is not supported"
return c=function(e){var n,c,o
for(n=0,c=(o=function(){var e,n,i,c
for(c=[],e=0,n=l.length;e<n;e++)i=(r=l[e]).name,t.call(a.accept,i)>=0&&c.push(r)
return c}()).length;n<c;n++)if(i=o[n],e.match(i.pattern))return i
return null},u=function(e){var t,n,a,r,i,l
for(a=0,n=r=0,i=(l=e.split("").reverse()).length;r<i;n=++r)t=+(t=l[n]),a+=n%2?(t*=2)<10?t:t-9:t
return a%10==0},o=function(e,n){var a
return a=e.length,t.call(n.valid_length,a)>=0},f=function(e){var t,a
return a=!1,t=!1,null!=(i=c(e))&&(a=u(e),t=o(e,i)),n({card_type:i,luhn_valid:a,length_valid:t})},h=function(){var t
return t=s(e(this).val()),f(t)},s=function(e){return e.replace(/[ -]/g,"")},this.bind("input",function(){return e(this).unbind("keyup"),h.call(this)}),this.bind("keyup",function(){return h.call(this)}),0!==this.length&&h.call(this),this}}).call(this),function(e){var t,n,a=((n=document.createElement("input")).setAttribute("onpaste",""),("function"==typeof n.onpaste?"paste":"input")+".mask"),r=navigator.userAgent,i=/iphone/i.test(r),l=/android/i.test(r)
e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n
if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&((n=this.createTextRange()).collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(n,r){var c,o,u,s,h
return!n&&this.length>0?e(this[0]).data(e.mask.dataName)():(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),c=e.mask.definitions,o=[],u=h=n.length,s=null,e.each(n.split(""),function(e,t){"?"==t?(h--,u=e):c[t]?(o.push(new RegExp(c[t])),null===s&&(s=o.length-1)):o.push(null)}),this.trigger("unmask").each(function(){var f=e(this),d=e.map(n.split(""),function(e,t){if("?"!=e)return c[e]?r.placeholder:e}),p=f.val()
function m(e){for(;++e<h&&!o[e];);return e}function v(e,t){var n,a
if(!(e<0)){for(n=e,a=m(t);n<h;n++)if(o[n]){if(!(a<h&&o[n].test(d[a])))break
d[n]=d[a],d[a]=r.placeholder,a=m(a)}b(),f.caret(Math.max(s,e))}}function g(e,t){var n
for(n=e;n<t&&n<h;n++)o[n]&&(d[n]=r.placeholder)}function b(){f.val(d.join(""))}function k(e){var t,n,a=f.val(),i=-1
for(t=0,pos=0;t<h;t++)if(o[t]){for(d[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),o[t].test(n)){d[t]=n,i=t
break}if(pos>a.length)break}else d[t]===a.charAt(pos)&&t!==u&&(pos++,i=t)
return e?b():i+1<u?(f.val(""),g(0,h)):(b(),f.val(f.val().substring(0,i+1))),u?t:s}f.data(e.mask.dataName,function(){return e.map(d,function(e,t){return o[t]&&e!=r.placeholder?e:null}).join("")}),f.attr("readonly")||f.one("unmask",function(){f.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){var e
clearTimeout(t),p=f.val(),e=k(),t=setTimeout(function(){b(),e==n.length?f.caret(0,e):f.caret(e)},10)}).bind("blur.mask",function(){k(),f.val()!=p&&f.change()}).bind("keydown.mask",function(e){var t,n,a,r=e.which
8===r||46===r||i&&127===r?(n=(t=f.caret()).begin,(a=t.end)-n==0&&(n=46!==r?function(e){for(;--e>=0&&!o[e];);return e}(n):a=m(n-1),a=46===r?m(a):a),g(n,a),v(n,a-1),e.preventDefault()):27==r&&(f.val(p),f.caret(0,k()),e.preventDefault())}).bind("keypress.mask",function(t){var n,a,i,c=t.which,u=f.caret()
t.ctrlKey||t.altKey||t.metaKey||c<32||c&&(u.end-u.begin!=0&&(g(u.begin,u.end),v(u.begin,u.end-1)),(n=m(u.begin-1))<h&&(a=String.fromCharCode(c),o[n].test(a)&&(function(e){var t,n,a,i
for(t=e,n=r.placeholder;t<h;t++)if(o[t]){if(a=m(t),i=d[t],d[t]=n,!(a<h&&o[a].test(i)))break
n=i}}(n),d[n]=a,b(),i=m(n),l?setTimeout(e.proxy(e.fn.caret,f,i),0):f.caret(i),r.completed&&i>=h&&r.completed.call(f))),t.preventDefault())}).bind(a,function(){setTimeout(function(){var e=k(!0)
f.caret(e),r.completed&&e==f.val().length&&r.completed.call(f)},0)}),k()}))}})}(jQuery)
