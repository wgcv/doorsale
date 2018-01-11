/*!
 * jQuery.ScrollTo
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @projectDescription Easy element scrolling using jQuery.
 * @author Ariel Flesler
 * @version 1.4.11
 */
!function(o){"function"==typeof define&&define.amd?define(["jquery"],o):o(jQuery)}(function(o){var t=o.scrollTo=function(t,i,n){return o(window).scrollTo(t,i,n)}
function i(t){return o.isFunction(t)||"object"==typeof t?t:{top:t,left:t}}return t.defaults={axis:"xy",duration:parseFloat(o.fn.jquery)>=1.3?0:1,limit:!0},t.window=function(t){return o(window)._scrollable()},o.fn._scrollable=function(){return this.map(function(){var t,i=this,n=!i.nodeName||-1!=o.inArray(i.nodeName.toLowerCase(),["iframe","#document","html","body"])
return n?(t=(i.contentWindow||i).document||i.ownerDocument||i,/webkit/i.test(navigator.userAgent)||"BackCompat"==t.compatMode?t.body:t.documentElement):i})},o.fn.scrollTo=function(n,e,s){return"object"==typeof e&&(s=e,e=0),"function"==typeof s&&(s={onAfter:s}),"max"==n&&(n=9e9),s=o.extend({},t.defaults,s),e=e||s.duration,s.queue=s.queue&&s.axis.length>1,s.queue&&(e/=2),s.offset=i(s.offset),s.over=i(s.over),this._scrollable().each(function(){var h,d,a,r,p,m,l
if(null!=n){switch(d=o(h=this),a=n,p={},m=d.is("html,body"),typeof a){case"number":case"string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(a)){a=i(a)
break}if(!(a=o(a,this)).length)return
case"object":(a.is||a.style)&&(r=(a=o(a)).offset())}l=o.isFunction(s.offset)&&s.offset(h,a)||s.offset,o.each(s.axis.split(""),function(o,i){var n,e="x"==i?"Left":"Top",f=e.toLowerCase(),z="scroll"+e,c=h[z],g=t.max(h,i)
r?(p[z]=r[f]+(m?0:c-d.offset()[f]),s.margin&&(p[z]-=parseInt(a.css("margin"+e))||0,p[z]-=parseInt(a.css("border"+e+"Width"))||0),p[z]+=l[f]||0,s.over[f]&&(p[z]+=a["x"==i?"width":"height"]()*s.over[f])):(n=a[f],p[z]=n.slice&&"%"==n.slice(-1)?parseFloat(n)/100*g:n),s.limit&&/^\d+$/.test(p[z])&&(p[z]=p[z]<=0?0:Math.min(p[z],g)),!o&&s.queue&&(c!=p[z]&&w(s.onAfterFirst),delete p[z])}),w(s.onAfter)}function w(o){d.animate(p,e,s.easing,o&&function(){o.call(this,a,s)})}}).end()},t.max=function(t,i){var n,e,s,h="x"==i?"Width":"Height",d="scroll"+h
return o(t).is("html,body")?(n="client"+h,e=t.ownerDocument.documentElement,s=t.ownerDocument.body,Math.max(e[d],s[d])-Math.min(e[n],s[n])):t[d]-o(t)[h.toLowerCase()]()},t}),function(o){var t=".serialScroll",i=o.serialScroll=function(t){return o(window).serialScroll(t)}
i.defaults={duration:1e3,axis:"x",event:"click",start:0,step:1,lock:!0,cycle:!0,constant:!0},o.fn.serialScroll=function(n){return this.each(function(){var e,s=o.extend({},i.defaults,n),h=s.event,d=s.step,a=s.lazy,r=s.target?this:document,p=o(s.target||this,r),m=p[0],l=s.items,w=s.start,f=s.interval,z=s.navigation
function c(o){o.data+=w,g(o,this)}function g(o,t){isNaN(t)&&(t=o.data)
var i,n=o.type,h=s.exclude?b().slice(0,-s.exclude):b(),a=h.length-1,r=h[t],m=s.duration
if(n&&o.preventDefault(),f&&(W(),e=setTimeout(u,s.interval)),!r){if(w!==(i=t<0?0:a))t=i
else{if(!s.cycle)return
t=a-i}r=h[t]}!r||s.lock&&p._scrollable().is(":animated")||n&&s.onBefore&&!1===s.onBefore(o,r,p,b(),t)||(s.stop&&p._scrollable().stop(!0),s.constant&&(m=Math.abs(m/d*(w-t))),p.scrollTo(r,m,s),T("notify",t))}function u(){T("next")}function W(){clearTimeout(e)}function b(){return o(l,m)}function T(o){p.trigger(o+t,[].slice.call(arguments,1))}function y(o){if(!isNaN(o))return o
for(var t,i=b();-1===(t=i.index(o))&&o!==m;)o=o.parentNode
return t}m&&(a||(l=b()),(s.force||f)&&g({},w),o(s.prev||[],r).bind(h,-d,c),o(s.next||[],r).bind(h,d,c),m.ssbound||p.bind("prev"+t,-d,c).bind("next"+t,d,c).bind("goto"+t,g),f&&p.bind("start"+t,function(o){f||(W(),f=!0,u())}).bind("stop"+t,function(){W(),f=!1}),p.bind("notify"+t,function(o,t){var i=y(t)
i>-1&&(w=i)}),m.ssbound=!0,s.jump&&(a?p:b()).bind(h,function(o){g(o,y(o.target))}),z&&(z=o(z,r).bind(h,function(o){o.data=Math.round(b().length/z.length)*z.index(this),g(o,this)})))})}}(jQuery),"function"!=typeof Object.create&&(Object.create=function(o){function t(){}return t.prototype=o,new t}),function(o,t,i,n){var e={init:function(t,i){var n=this
n.elem=i,n.$elem=o(i),n.imageSrc=n.$elem.data("zoom-image")?n.$elem.data("zoom-image"):n.$elem.attr("src"),n.options=o.extend({},o.fn.elevateZoom.options,t),n.options.tint&&(n.options.lensColour="none",n.options.lensOpacity="1"),"inner"==n.options.zoomType&&(n.options.showLens=!1),n.$elem.parent().removeAttr("title").removeAttr("alt"),n.zoomImage=n.imageSrc,n.refresh(1),o("#"+n.options.gallery+" a").click(function(t){return t.preventDefault(),o(this).data("zoom-image")?n.zoomImagePre=o(this).data("zoom-image"):n.zoomImagePre=o(this).data("image"),n.swaptheimage(o(this).data("image"),n.zoomImagePre),!1})},refresh:function(o){var t=this
setTimeout(function(){t.fetch(t.imageSrc)},o||t.options.refresh)},fetch:function(o){var t=this,i=new Image
i.onload=function(){t.largeWidth=i.width,t.largeHeight=i.height,t.startZoom(),t.currentImage=t.imageSrc,t.options.onZoomedImageLoaded()},i.src=o},startZoom:function(){var t=this
t.nzWidth=t.$elem.width(),t.nzHeight=t.$elem.height(),t.nzOffset=t.$elem.offset(),t.widthRatio=t.largeWidth/t.nzWidth,t.heightRatio=t.largeHeight/t.nzHeight,"window"==t.options.zoomType&&(t.zoomWindowStyle="overflow: hidden;background-position: 0px 0px;background-color:white;text-align:center;width: "+String(t.options.zoomWindowWidth)+"px;height: "+String(t.options.zoomWindowHeight)+"px;float: left;display: none;z-index:100px;border: "+String(t.options.borderSize)+"px solid "+t.options.borderColour+";background-repeat: no-repeat;position: absolute;"),"inner"==t.options.zoomType&&(t.zoomWindowStyle="overflow: hidden;background-position: 0px 0px;width: "+String(t.nzWidth)+"px;height: "+String(t.nzHeight)+"px;float: left;display: none;cursor:"+t.options.cursor+";px solid "+t.options.borderColour+";background-repeat: no-repeat;position: absolute;"),"window"==t.options.zoomType&&(t.nzHeight<t.options.zoomWindowWidth/t.widthRatio?lensHeight=t.nzHeight:lensHeight=String(t.options.zoomWindowHeight/t.heightRatio),t.largeWidth<t.options.zoomWindowWidth?lensWidth=t.nzHWidth:lensWidth=t.options.zoomWindowWidth/t.widthRatio,t.lensStyle="background-position: 0px 0px;width: "+String(t.options.zoomWindowWidth/t.widthRatio)+"px;height: "+String(t.options.zoomWindowHeight/t.heightRatio)+"px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:"+t.options.lensOpacity+";filter: alpha(opacity = "+100*t.options.lensOpacity+"); zoom:1;width:"+lensWidth+"px;height:"+lensHeight+"px;background-color:"+t.options.lensColour+";cursor:"+t.options.cursor+";border: "+t.options.lensBorder+"px solid black;background-repeat: no-repeat;position: absolute;"),t.tintStyle="display: block;position: absolute;background-color: "+t.options.tintColour+";filter:alpha(opacity=0);opacity: 0;width: "+t.nzWidth+"px;height: "+t.nzHeight+"px;",t.lensRound="","lens"==t.options.zoomType&&(t.lensStyle="background-position: 0px 0px;float: left;display: none;border: "+String(t.options.borderSize)+"px solid "+t.options.borderColour+";width:"+String(t.options.lensSize)+"px;height:"+String(t.options.lensSize)+"px;background-repeat: no-repeat;position: absolute;"),"round"==t.options.lensShape&&(t.lensRound="border-top-left-radius: "+String(t.options.lensSize/2+t.options.borderSize)+"px;border-top-right-radius: "+String(t.options.lensSize/2+t.options.borderSize)+"px;border-bottom-left-radius: "+String(t.options.lensSize/2+t.options.borderSize)+"px;border-bottom-right-radius: "+String(t.options.lensSize/2+t.options.borderSize)+"px;"),t.zoomContainer=o('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:'+t.nzOffset.left+"px;top:"+t.nzOffset.top+"px;height:"+t.nzHeight+"px;width:"+t.nzWidth+'px;"></div>'),o("body").append(t.zoomContainer),t.options.containLensZoom&&"lens"==t.options.zoomType&&t.zoomContainer.css("overflow","hidden"),"inner"!=t.options.zoomType&&(t.zoomLens=o("<div class='zoomLens' style='"+t.lensStyle+t.lensRound+"'>&nbsp;</div>").appendTo(t.zoomContainer).click(function(){t.$elem.trigger("click")})),t.options.tint&&(t.tintContainer=o("<div/>").addClass("tintContainer"),t.zoomTint=o("<div class='zoomTint' style='"+t.tintStyle+"'></div>"),t.zoomLens.wrap(t.tintContainer),t.zoomTintcss=t.zoomLens.after(t.zoomTint),t.zoomTintImage=o('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: '+t.nzWidth+"px; height: "+t.nzHeight+'px;" src="'+t.imageSrc+'">').appendTo(t.zoomLens).click(function(){t.$elem.trigger("click")})),isNaN(t.options.zoomWindowPosition)?t.zoomWindow=o("<div style='z-index:999;left:"+t.windowOffsetLeft+"px;top:"+t.windowOffsetTop+"px;"+t.zoomWindowStyle+"' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function(){t.$elem.trigger("click")}):t.zoomWindow=o("<div style='z-index:999;left:"+t.windowOffsetLeft+"px;top:"+t.windowOffsetTop+"px;"+t.zoomWindowStyle+"' class='zoomWindow'>&nbsp;</div>").appendTo(t.zoomContainer).click(function(){t.$elem.trigger("click")}),t.zoomWindowContainer=o("<div/>").addClass("zoomWindowContainer").css("width",t.options.zoomWindowWidth),t.zoomWindow.wrap(t.zoomWindowContainer),t.options.tint,"lens"==t.options.zoomType&&t.zoomLens.css({backgroundImage:"url('"+t.imageSrc+"')"}),"window"==t.options.zoomType&&t.zoomWindow.css({backgroundImage:"url('"+t.imageSrc+"')"}),"inner"==t.options.zoomType&&t.zoomWindow.css({backgroundImage:"url('"+t.imageSrc+"')"}),t.$elem.bind("touchmove",function(o){o.preventDefault()
var i=o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]
t.setPosition(i)}),t.zoomContainer.bind("touchmove",function(o){"inner"==t.options.zoomType&&(t.options.zoomWindowFadeIn?t.zoomWindow.stop(!0,!0).fadeIn(t.options.zoomWindowFadeIn):t.zoomWindow.show()),o.preventDefault()
var i=o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]
t.setPosition(i)}),t.zoomContainer.bind("touchend",function(o){t.zoomWindow.hide(),t.options.showLens&&t.zoomLens.hide(),t.options.tint&&t.zoomTint.hide()}),t.$elem.bind("touchend",function(o){t.zoomWindow.hide(),t.options.showLens&&t.zoomLens.hide(),t.options.tint&&t.zoomTint.hide()}),t.options.showLens&&(t.zoomLens.bind("touchmove",function(o){o.preventDefault()
var i=o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]
t.setPosition(i)}),t.zoomLens.bind("touchend",function(o){t.zoomWindow.hide(),t.options.showLens&&t.zoomLens.hide(),t.options.tint&&t.zoomTint.hide()})),t.$elem.bind("mousemove",function(o){t.lastX===o.clientX&&t.lastY===o.clientY||t.setPosition(o),t.lastX=o.clientX,t.lastY=o.clientY}),t.zoomContainer.bind("mousemove",function(o){t.lastX===o.clientX&&t.lastY===o.clientY||t.setPosition(o),t.lastX=o.clientX,t.lastY=o.clientY}),"inner"!=t.options.zoomType&&t.zoomLens.bind("mousemove",function(o){t.lastX===o.clientX&&t.lastY===o.clientY||t.setPosition(o),t.lastX=o.clientX,t.lastY=o.clientY}),t.options.tint&&t.zoomTint.bind("mousemove",function(o){t.lastX===o.clientX&&t.lastY===o.clientY||t.setPosition(o),t.lastX=o.clientX,t.lastY=o.clientY}),"inner"==t.options.zoomType&&t.zoomWindow.bind("mousemove",function(o){t.lastX===o.clientX&&t.lastY===o.clientY||t.setPosition(o),t.lastX=o.clientX,t.lastY=o.clientY}),t.zoomContainer.mouseenter(function(){"inner"==t.options.zoomType&&(t.options.zoomWindowFadeIn?t.zoomWindow.stop(!0,!0).fadeIn(t.options.zoomWindowFadeIn):t.zoomWindow.show()),"window"==t.options.zoomType&&(t.options.zoomWindowFadeIn?t.zoomWindow.stop(!0,!0).fadeIn(t.options.zoomWindowFadeIn):t.zoomWindow.show()),t.options.showLens&&(t.options.lensFadeIn?t.zoomLens.stop(!0,!0).fadeIn(t.options.lensFadeIn):t.zoomLens.show()),t.options.tint&&(t.options.zoomTintFadeIn?t.zoomTint.stop(!0,!0).fadeIn(t.options.zoomTintFadeIn):t.zoomTint.show())}).mouseleave(function(){t.zoomWindow.hide(),t.options.showLens&&t.zoomLens.hide(),t.options.tint&&t.zoomTint.hide()}),t.$elem.mouseenter(function(){"inner"==t.options.zoomType&&(t.options.zoomWindowFadeIn?t.zoomWindow.stop(!0,!0).fadeIn(t.options.zoomWindowFadeIn):t.zoomWindow.show()),"window"==t.options.zoomType&&(t.options.zoomWindowFadeIn?t.zoomWindow.stop(!0,!0).fadeIn(t.options.zoomWindowFadeIn):t.zoomWindow.show()),t.options.showLens&&(t.options.lensFadeIn?t.zoomLens.stop(!0,!0).fadeIn(t.options.lensFadeIn):t.zoomLens.show()),t.options.tint&&(t.options.zoomTintFadeIn?t.zoomTint.stop(!0,!0).fadeIn(t.options.zoomTintFadeIn):t.zoomTint.show())}).mouseleave(function(){t.zoomWindow.hide(),t.options.showLens&&t.zoomLens.hide(),t.options.tint&&t.zoomTint.hide()}),"inner"!=t.options.zoomType&&t.zoomLens.mouseenter(function(){"inner"==t.options.zoomType&&(t.options.zoomWindowFadeIn?t.zoomWindow.stop(!0,!0).fadeIn(t.options.zoomWindowFadeIn):t.zoomWindow.show()),"window"==t.options.zoomType&&t.zoomWindow.show(),t.options.showLens&&t.zoomLens.show(),t.options.tint&&t.zoomTint.show()}).mouseleave(function(){t.options.zoomWindowFadeOut?t.zoomWindow.stop(!0,!0).fadeOut(t.options.zoomWindowFadeOut):t.zoomWindow.hide(),"inner"!=t.options.zoomType&&t.zoomLens.hide(),t.options.tint&&t.zoomTint.hide()}),t.options.tint&&t.zoomTint.mouseenter(function(){"inner"==t.options.zoomType&&t.zoomWindow.show(),"window"==t.options.zoomType&&t.zoomWindow.show(),t.options.showLens&&t.zoomLens.show(),t.zoomTint.show()}).mouseleave(function(){t.zoomWindow.hide(),"inner"!=t.options.zoomType&&t.zoomLens.hide(),t.zoomTint.hide()}),"inner"==t.options.zoomType&&t.zoomWindow.mouseenter(function(){"inner"==t.options.zoomType&&t.zoomWindow.show(),"window"==t.options.zoomType&&t.zoomWindow.show(),t.options.showLens&&t.zoomLens.show()}).mouseleave(function(){t.options.zoomWindowFadeOut?t.zoomWindow.stop(!0,!0).fadeOut(t.options.zoomWindowFadeOut):t.zoomWindow.hide(),"inner"!=t.options.zoomType&&t.zoomLens.hide()})},setPosition:function(o){if(this.nzHeight=this.$elem.height(),this.nzWidth=this.$elem.width(),this.nzOffset=this.$elem.offset(),this.options.tint&&(this.zoomTint.css({top:0}),this.zoomTint.css({left:0})),this.options.responsive&&(this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?lensHeight=this.nzHeight:lensHeight=String(this.options.zoomWindowHeight/this.heightRatio),this.largeWidth<this.options.zoomWindowWidth?lensWidth=this.nzHWidth:lensWidth=this.options.zoomWindowWidth/this.widthRatio,this.widthRatio=this.largeWidth/this.nzWidth,this.heightRatio=this.largeHeight/this.nzHeight,this.zoomLens.css({width:String(this.options.zoomWindowWidth/this.widthRatio)+"px",height:String(this.options.zoomWindowHeight/this.heightRatio)+"px"})),this.zoomContainer.css({top:this.nzOffset.top}),this.zoomContainer.css({left:this.nzOffset.left}),this.mouseLeft=parseInt(o.pageX-this.nzOffset.left),this.mouseTop=parseInt(o.pageY-this.nzOffset.top),"window"==this.options.zoomType&&(this.Etoppos=this.mouseTop<this.zoomLens.height()/2,this.Eboppos=this.mouseTop>this.nzHeight-this.zoomLens.height()/2-2*this.options.lensBorder,this.Eloppos=this.mouseLeft<0+this.zoomLens.width()/2,this.Eroppos=this.mouseLeft>this.nzWidth-this.zoomLens.width()/2-2*this.options.lensBorder),"inner"==this.options.zoomType&&(this.Etoppos=this.mouseTop<this.nzHeight/2/this.heightRatio,this.Eboppos=this.mouseTop>this.nzHeight-this.nzHeight/2/this.heightRatio,this.Eloppos=this.mouseLeft<0+this.nzWidth/2/this.widthRatio,this.Eroppos=this.mouseLeft>this.nzWidth-this.nzWidth/2/this.widthRatio-2*this.options.lensBorder),this.mouseLeft<0||this.mouseTop<=0||this.mouseLeft>this.nzWidth||this.mouseTop>this.nzHeight)return this.zoomWindow.hide(),this.options.showLens&&this.zoomLens.hide(),void(this.options.tint&&this.zoomTint.hide())
"window"==this.options.zoomType&&this.zoomWindow.show(),this.options.tint&&this.zoomTint.show(),this.options.showLens&&(this.zoomLens.show(),this.lensLeftPos=String(this.mouseLeft-this.zoomLens.width()/2),this.lensTopPos=String(this.mouseTop-this.zoomLens.height()/2)),this.Etoppos&&(this.lensTopPos=0),this.Eloppos&&(this.windowLeftPos=0,this.lensLeftPos=0,this.tintpos=0),"window"==this.options.zoomType&&(this.Eboppos&&(this.lensTopPos=Math.max(this.nzHeight-this.zoomLens.height()-2*this.options.lensBorder,0)),this.Eroppos&&(this.lensLeftPos=this.nzWidth-this.zoomLens.width()-2*this.options.lensBorder)),"inner"==this.options.zoomType&&(this.Eboppos&&(this.lensTopPos=Math.max(this.nzHeight-2*this.options.lensBorder,0)),this.Eroppos&&(this.lensLeftPos=this.nzWidth-this.nzWidth-2*this.options.lensBorder)),"lens"==this.options.zoomType&&(this.windowLeftPos=String(-1*((o.pageX-this.nzOffset.left)*this.widthRatio-this.zoomLens.width()/2)),this.windowTopPos=String(-1*((o.pageY-this.nzOffset.top)*this.heightRatio-this.zoomLens.height()/2)),this.zoomLens.css({backgroundPosition:this.windowLeftPos+"px "+this.windowTopPos+"px"}),this.setWindowPostition(o)),this.options.tint&&this.setTintPosition(o),"window"==this.options.zoomType&&this.setWindowPostition(o),"inner"==this.options.zoomType&&this.setWindowPostition(o),this.options.showLens&&this.zoomLens.css({left:this.lensLeftPos+"px",top:this.lensTopPos+"px"})},setLensPostition:function(o){},setWindowPostition:function(t){var i,n,e,s=this
if(isNaN(s.options.zoomWindowPosition))s.externalContainer=o("#"+s.options.zoomWindowPosition),s.externalContainerWidth=s.externalContainer.width(),s.externalContainerHeight=s.externalContainer.height(),s.externalContainerOffset=s.externalContainer.offset(),s.windowOffsetTop=s.externalContainerOffset.top,s.windowOffsetLeft=s.externalContainerOffset.left
else switch(s.options.zoomWindowPosition){case 1:s.windowOffsetTop=s.options.zoomWindowOffety,s.windowOffsetLeft=+s.nzWidth
break
case 2:s.options.zoomWindowHeight>s.nzHeight&&(s.windowOffsetTop=-1*(s.options.zoomWindowHeight/2-s.nzHeight/2),s.windowOffsetLeft=s.nzWidth)
break
case 3:s.windowOffsetTop=s.nzHeight-s.zoomWindow.height()-2*s.options.borderSize,s.windowOffsetLeft=s.nzWidth
break
case 4:s.windowOffsetTop=s.nzHeight,s.windowOffsetLeft=s.nzWidth
break
case 5:s.windowOffsetTop=s.nzHeight,s.windowOffsetLeft=s.nzWidth-s.zoomWindow.width()-2*s.options.borderSize
break
case 6:s.options.zoomWindowHeight>s.nzHeight&&(s.windowOffsetTop=s.nzHeight,s.windowOffsetLeft=-1*(s.options.zoomWindowWidth/2-s.nzWidth/2+2*s.options.borderSize))
break
case 7:s.windowOffsetTop=s.nzHeight,s.windowOffsetLeft=0
break
case 8:s.windowOffsetTop=s.nzHeight,s.windowOffsetLeft=-1*(s.zoomWindow.width()+2*s.options.borderSize)
break
case 9:s.windowOffsetTop=s.nzHeight-s.zoomWindow.height()-2*s.options.borderSize,s.windowOffsetLeft=-1*(s.zoomWindow.width()+2*s.options.borderSize)
break
case 10:s.options.zoomWindowHeight>s.nzHeight&&(s.windowOffsetTop=-1*(s.options.zoomWindowHeight/2-s.nzHeight/2),s.windowOffsetLeft=-1*(s.zoomWindow.width()+2*s.options.borderSize))
break
case 11:s.windowOffsetTop=s.options.zoomWindowOffety,s.windowOffsetLeft=-1*(s.zoomWindow.width()+2*s.options.borderSize)
break
case 12:s.windowOffsetTop=-1*(s.zoomWindow.height()+2*s.options.borderSize),s.windowOffsetLeft=-1*(s.zoomWindow.width()+2*s.options.borderSize)
break
case 13:s.windowOffsetTop=-1*(s.zoomWindow.height()+2*s.options.borderSize),s.windowOffsetLeft=0
break
case 14:s.options.zoomWindowHeight>s.nzHeight&&(s.windowOffsetTop=-1*(s.zoomWindow.height()+2*s.options.borderSize),s.windowOffsetLeft=-1*(s.options.zoomWindowWidth/2-s.nzWidth/2+2*s.options.borderSize))
break
case 15:s.windowOffsetTop=-1*(s.zoomWindow.height()+2*s.options.borderSize),s.windowOffsetLeft=s.nzWidth-s.zoomWindow.width()-2*s.options.borderSize
break
case 16:s.windowOffsetTop=-1*(s.zoomWindow.height()+2*s.options.borderSize),s.windowOffsetLeft=s.nzWidth
break
default:s.windowOffsetTop=s.options.zoomWindowOffety,s.windowOffsetLeft=s.nzWidth}if(s.windowOffsetTop=s.windowOffsetTop+s.options.zoomWindowOffety,s.windowOffsetLeft=s.windowOffsetLeft+s.options.zoomWindowOffetx,s.zoomWindow.css({top:s.windowOffsetTop}),s.zoomWindow.css({left:s.windowOffsetLeft}),"inner"==s.options.zoomType&&(s.zoomWindow.css({top:0}),s.zoomWindow.css({left:0})),s.windowLeftPos=String(-1*((t.pageX-s.nzOffset.left)*s.widthRatio-s.zoomWindow.width()/2)),s.windowTopPos=String(-1*((t.pageY-s.nzOffset.top)*s.heightRatio-s.zoomWindow.height()/2)),s.Etoppos&&(s.windowTopPos=0),s.Eloppos&&(s.windowLeftPos=0),s.Eboppos&&(s.windowTopPos=-1*(s.largeHeight-s.zoomWindow.height())),s.Eroppos&&(s.windowLeftPos=-1*(s.largeWidth-s.zoomWindow.width())),"window"==s.options.zoomType)if(s.widthRatio<=1&&(s.windowLeftPos=0),s.heightRatio<=1&&(s.windowTopPos=0),s.largeHeight<s.options.zoomWindowHeight&&(s.windowTopPos=0),s.largeWidth<s.options.zoomWindowWidth&&(s.windowLeftPos=0),s.options.easing)if(o.easing.zoomsmoothmove=function(o,t,i,n,e){return t==e?i+n:n*(1-Math.pow(2,-10*t/e))+i},i=o('<div style="background-position: 3px 5px">'),o.support.bgPos="3px 5px"===i.css("backgroundPosition"),o.support.bgPosXY="3px"===i.css("backgroundPositionX"),i=null,o.support.bgPos&&!o.support.bgPosXY){function h(o){return{top:"0px",bottom:"100%",left:"0px",right:"100%"}[o]||o}n="background-position",e=o.camelCase,o.each(["x","y"],function(t,i){var s=e(n+"-"+i)
o.cssHooks[s]={get:function(i){return h(o.css(i,n).split(/\s+/,2)[t])},set:function(i,e){var s=o.css(i,n).split(/\s+/,2)
s[t]=h(e),o.style(i,n,s.join(" "))}},o.fx.step[s]=function(t){o.style(t.elem,t.prop,t.now)}}),s.zoomWindow.stop().animate({backgroundPositionY:s.windowTopPos,backgroundPositionX:s.windowLeftPos},{queue:!1,duration:s.options.easingDuration,easing:"zoomsmoothmove"})}else s.zoomWindow.animate({"background-position-x":s.windowLeftPos,"background-position-y":s.windowTopPos},{queue:!1,duration:s.options.easingDuration,easing:"zoomsmoothmove"})
else s.zoomWindow.css({backgroundPosition:s.windowLeftPos+"px "+s.windowTopPos+"px"})
"inner"==s.options.zoomType&&s.zoomWindow.css({backgroundPosition:s.windowLeftPos+"px "+s.windowTopPos+"px"})},setTintPosition:function(o){this.nzOffset=this.$elem.offset(),this.tintpos=String(-1*(o.pageX-this.nzOffset.left-this.zoomLens.width()/2)),this.tintposy=String(-1*(o.pageY-this.nzOffset.top-this.zoomLens.height()/2)),this.Etoppos&&(this.tintposy=0),this.Eloppos&&(this.tintpos=0),this.Eboppos&&(this.tintposy=-1*(this.nzHeight-this.zoomLens.height()-2*this.options.lensBorder)),this.Eroppos&&(this.tintpos=-1*(this.nzWidth-this.zoomLens.width()-2*this.options.lensBorder)),this.options.tint&&(this.zoomTint.css({opacity:this.options.tintOpacity}).animate().fadeIn("slow"),this.zoomTintImage.css({left:this.tintpos-this.options.lensBorder+"px"}),this.zoomTintImage.css({top:this.tintposy-this.options.lensBorder+"px"}))},swaptheimage:function(o,t){var i=this,n=new Image
n.onload=function(){i.largeWidth=n.width,i.largeHeight=n.height,i.zoomImage=t,i.swapAction(o,t)},n.src=t},swapAction:function(o,t){var i=this,n=new Image
n.onload=function(){i.nzHeight=n.height,i.nzWidth=n.width,i.doneCallback()},n.src=o,i.zoomWindow.css({backgroundImage:"url('"+t+"')"}),i.currentImage=t,i.$elem.attr("src",o)},doneCallback:function(){this.options.tint&&(this.zoomTintImage.attr("src",largeimage),this.zoomTintImage.attr("height",this.$elem.height()),this.zoomTintImage.css({height:this.$elem.height()}),this.zoomTint.css({height:this.$elem.height()})),this.nzOffset=this.$elem.offset(),this.nzWidth=this.$elem.width(),this.nzHeight=this.$elem.height(),this.widthRatio=this.largeWidth/this.nzWidth,this.heightRatio=this.largeHeight/this.nzHeight,this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?lensHeight=this.nzHeight:lensHeight=String(this.options.zoomWindowHeight/this.heightRatio),this.largeWidth<this.options.zoomWindowWidth?lensWidth=this.nzHWidth:lensWidth=this.options.zoomWindowWidth/this.widthRatio,this.zoomLens.css("width",lensWidth),this.zoomLens.css("height",lensHeight)},getCurrentImage:function(){return this.zoomImage},getGalleryList:function(){var t=this
return t.gallerylist=[],t.options.gallery?o("#"+t.options.gallery+" a").each(function(){var i=""
o(this).data("zoom-image")?i=o(this).data("zoom-image"):o(this).data("image")&&(i=o(this).data("image")),i==t.zoomImage?t.gallerylist.unshift({href:""+i,title:o(this).find("img").attr("title")}):t.gallerylist.push({href:""+i,title:o(this).find("img").attr("title")})}):t.gallerylist.push({href:""+t.zoomImage,title:o(this).find("img").attr("title")}),t.gallerylist}}
o.fn.elevateZoom=function(t){return this.each(function(){var i=Object.create(e)
i.init(t,this),o.data(this,"elevateZoom",i)})},o.fn.elevateZoom.options={easing:!1,easingType:"zoomdefault",easingDuration:2e3,lensSize:200,zoomWindowWidth:400,zoomWindowHeight:400,zoomWindowOffetx:0,zoomWindowOffety:0,zoomWindowPosition:1,lensFadeIn:!1,lensFadeOut:!1,debug:!1,zoomWindowFadeIn:!1,zoomWindowFadeOut:!1,zoomWindowAlwaysShow:!1,zoomTintFadeIn:!1,zoomTintFadeOut:!1,borderSize:4,showLens:!0,borderColour:"#888",lensBorder:1,lensShape:"square",zoomType:"window",containLensZoom:!1,lensColour:"white",lensOpacity:.4,lenszoom:!1,tint:!1,tintColour:"#333",tintOpacity:.4,gallery:!1,cursor:"default",responsive:!1,onComplete:o.noop,onZoomedImageLoaded:function(){}}}(jQuery,window,document),jQuery.easing.easeOutQuart=function(o,t,i,n,e){return-n*((t=t/e-1)*t*t*t-1)+i},$("#pics-slideshow").serialScroll({items:"li",prev:"#product-show a.prev",next:"#product-show a.next",offset:-30,start:1,duration:1200,force:!0,stop:!0,lock:!1,cycle:!1,easing:"easeOutQuart",jump:!1}),$("#pics-slideshow img").click(function(){var o=$(this).attr("src"),t=$("#preview-zoom")
t.attr("src",o),$(".zoomContainer").remove(),t.removeData("elevateZoom"),t.data("zoom-image",o),t.elevateZoom()}),$("#preview-zoom").elevateZoom()
