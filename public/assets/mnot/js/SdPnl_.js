!function(e){function n(n,a,s){for(r.removeAllSlides(),n=isNoE(n)?0:n,a=isNoE(a)?isNoE(h[n])?m:h[n].idr:a,f=n,m=a,n>0&&(o='<div class="psbOption" lvl="'+(n-1)+'" childs ="1">',o+='<span class="psbLabel"><span class="'+p.icon_r+'"></span> '+p.label_r+"</span>",r.appendSlide(o)),isNoE(h[n])&&(h[n]={idr:a,idrs:[]}),isNoE(h[n].idrs[a])&&(h[n].idrs[a]={}),!isNoE(h[n].idrs[a].items)||isNoE(p.init)||isNoE(p.iitems)||(h[n].idrs[a].items=p.iitems),i=0;i<h[n].idrs[a].items.length;i++){var o="",l={ik:0,_i:"",_t:"--",_c:0,_in:!1,_inm:"",scroll:"",html:""};e.extend(l,h[n].idrs[a].items[i]),0==l.ik&&(l.ik=i),o+='<div class="swiper-slide"><div context="*" atype="x" id="psbOption'+l.ik+'" class="psbOption" onselect="'+s+'" icon="'+l._i+'" idr="'+l.ik+'" text="'+l._t+'" ini="'+l._in+'" inim="'+l._inm+'" childs ="'+l._c+'" lvl="'+(n+1)+'" array="'+i+'" scroll="'+l.scroll+'">',o+='<span class="psbLabel"><span class="'+l._i+'"></span> '+l._t+"</span>",l._c>0&&(o+='<span class="psbMorelbl"><span class="icon-angle-right"></span> </span>'),o+=l.html+"</div></div>",r.appendSlide(o)}e.fitBHSidePanel(),t()}function t(){clearInterval(w);var i=e(".psbOption").length,n=0;w=setInterval(function(){n==i&&(clearInterval(w),e(".psbMorelbl").addClass("animated fadeIn")),"left"==p.position?e(".psbOption").eq(n).parent().hasClass("swiper-slide")?e(".psbOption").eq(n).parent().addClass("animated fadeInLeft fast"):e(".psbOption").eq(n).parent().parent().addClass("animated fadeInLeft fast"):e(".psbOption").eq(n).parent().hasClass("swiper-slide")?e(".psbOption").eq(n).parent().addClass("animated fadeInRight fast"):e(".psbOption").eq(n).parent().parent().addClass("animated fadeInRight fast"),n+=1},55),r.slideTo(0,10)}function a(){e("#psbSubIcon").hide(),e(".psbAv").fadeIn(250),e(".psbMainIcon").fadeIn(250),e(".psbUserName").text(p.label)}function s(){if(v!=e("#BHSidePanel .swiper-wrapper").position().top&&(v=e("#BHSidePanel .swiper-wrapper").position().top,0>v?e("#BHSidePanel .bh-sdpanel-header").addClass("shadow"):e("#BHSidePanel .bh-sdpanel-header").removeClass("shadow")),g!=e("#BHSidePanel .swiper-wrapper").css("height")){g=e("#BHSidePanel .swiper-wrapper").height();var i=parseInt(e("#BHSidePanel .bh-sdpanel-body").height());g>i&&g- -1*v-i>0?e("#BHSidePanel .bh-sdpanel-footer").addClass("shadow"):e("#BHSidePanel .bh-sdpanel-footer").removeClass("shadow")}}function o(){var i=e(window).height()-120;e(".bh-sdpanel-body").css("height",i+"px")}!function(e){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))}(navigator.userAgent||navigator.vendor||window.opera),e.easing.jswing=e.easing.swing,e.extend(e.easing,{def:"easeOutQuad",swing:function(i,n,t,a,s){return e.easing[e.easing.def](i,n,t,a,s)},easeInQuad:function(e,i,n,t,a){return t*(i/=a)*i+n},easeOutQuad:function(e,i,n,t,a){return-t*(i/=a)*(i-2)+n},easeInOutQuad:function(e,i,n,t,a){return(i/=a/2)<1?t/2*i*i+n:-t/2*(--i*(i-2)-1)+n},easeInCubic:function(e,i,n,t,a){return t*(i/=a)*i*i+n},easeOutCubic:function(e,i,n,t,a){return t*((i=i/a-1)*i*i+1)+n},easeInOutCubic:function(e,i,n,t,a){return(i/=a/2)<1?t/2*i*i*i+n:t/2*((i-=2)*i*i+2)+n},easeInQuart:function(e,i,n,t,a){return t*(i/=a)*i*i*i+n},easeOutQuart:function(e,i,n,t,a){return-t*((i=i/a-1)*i*i*i-1)+n},easeInOutQuart:function(e,i,n,t,a){return(i/=a/2)<1?t/2*i*i*i*i+n:-t/2*((i-=2)*i*i*i-2)+n},easeInQuint:function(e,i,n,t,a){return t*(i/=a)*i*i*i*i+n},easeOutQuint:function(e,i,n,t,a){return t*((i=i/a-1)*i*i*i*i+1)+n},easeInOutQuint:function(e,i,n,t,a){return(i/=a/2)<1?t/2*i*i*i*i*i+n:t/2*((i-=2)*i*i*i*i+2)+n},easeInSine:function(e,i,n,t,a){return-t*Math.cos(i/a*(Math.PI/2))+t+n},easeOutSine:function(e,i,n,t,a){return t*Math.sin(i/a*(Math.PI/2))+n},easeInOutSine:function(e,i,n,t,a){return-t/2*(Math.cos(Math.PI*i/a)-1)+n},easeInExpo:function(e,i,n,t,a){return 0==i?n:t*Math.pow(2,10*(i/a-1))+n},easeOutExpo:function(e,i,n,t,a){return i==a?n+t:t*(-Math.pow(2,-10*i/a)+1)+n},easeInOutExpo:function(e,i,n,t,a){return 0==i?n:i==a?n+t:(i/=a/2)<1?t/2*Math.pow(2,10*(i-1))+n:t/2*(-Math.pow(2,-10*--i)+2)+n},easeInCirc:function(e,i,n,t,a){return-t*(Math.sqrt(1-(i/=a)*i)-1)+n},easeOutCirc:function(e,i,n,t,a){return t*Math.sqrt(1-(i=i/a-1)*i)+n},easeInOutCirc:function(e,i,n,t,a){return(i/=a/2)<1?-t/2*(Math.sqrt(1-i*i)-1)+n:t/2*(Math.sqrt(1-(i-=2)*i)+1)+n},easeInElastic:function(e,i,n,t,a){var s=1.70158,o=0,r=t;if(0==i)return n;if(1==(i/=a))return n+t;if(o||(o=.3*a),r<Math.abs(t)){r=t;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(t/r);return-(r*Math.pow(2,10*(i-=1))*Math.sin((i*a-s)*(2*Math.PI)/o))+n},easeOutElastic:function(e,i,n,t,a){var s=1.70158,o=0,r=t;if(0==i)return n;if(1==(i/=a))return n+t;if(o||(o=.3*a),r<Math.abs(t)){r=t;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(t/r);return r*Math.pow(2,-10*i)*Math.sin((i*a-s)*(2*Math.PI)/o)+t+n},easeInOutElastic:function(e,i,n,t,a){var s=1.70158,o=0,r=t;if(0==i)return n;if(2==(i/=a/2))return n+t;if(o||(o=a*(.3*1.5)),r<Math.abs(t)){r=t;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(t/r);return 1>i?-.5*(r*Math.pow(2,10*(i-=1))*Math.sin((i*a-s)*(2*Math.PI)/o))+n:r*Math.pow(2,-10*(i-=1))*Math.sin((i*a-s)*(2*Math.PI)/o)*.5+t+n},easeInBack:function(e,i,n,t,a,s){return void 0==s&&(s=1.70158),t*(i/=a)*i*((s+1)*i-s)+n},easeOutBack:function(e,i,n,t,a,s){return void 0==s&&(s=1.70158),t*((i=i/a-1)*i*((s+1)*i+s)+1)+n},easeInOutBack:function(e,i,n,t,a,s){return void 0==s&&(s=1.70158),(i/=a/2)<1?t/2*(i*i*(((s*=1.525)+1)*i-s))+n:t/2*((i-=2)*i*(((s*=1.525)+1)*i+s)+2)+n},easeInBounce:function(i,n,t,a,s){return a-e.easing.easeOutBounce(i,s-n,0,a,s)+t},easeOutBounce:function(e,i,n,t,a){return(i/=a)<1/2.75?t*(7.5625*i*i)+n:2/2.75>i?t*(7.5625*(i-=1.5/2.75)*i+.75)+n:2.5/2.75>i?t*(7.5625*(i-=2.25/2.75)*i+.9375)+n:t*(7.5625*(i-=2.625/2.75)*i+.984375)+n},easeInOutBounce:function(i,n,t,a,s){return s/2>n?.5*e.easing.easeInBounce(i,2*n,0,a,s)+t:.5*e.easing.easeOutBounce(i,2*n-s,0,a,s)+.5*a+t}}),e.fn.animatescroll=function(i){var n=e.extend({},e.fn.animatescroll.defaults,i);if("html,body"==n.element){var t=this.offset().top;e(n.element).stop().animate({scrollTop:t-n.padding},n.scrollSpeed,n.easing)}else e(n.element).stop().animate({scrollTop:this.offset().top-this.parent().offset().top+this.parent().scrollTop()-n.padding},n.scrollSpeed,n.easing)},e.fn.animatescroll.defaults={easing:"swing",scrollSpeed:800,padding:0,element:"html,body"};var r,l,d=!1,c=!1,p=void 0,u=void 0,h=new Array,f=0,m=0,b=0,v=0,g=0;e.CloseBHSidePanel=function(i){f=0,m=0,d=!1,0==i?(e("#BHSidePanel").remove(),1==b&&"left"==p.position?e("body").css("left","0px"):e("body").css("right","0px")):("left"==p.position?e("#BHSidePanel").animate({left:"-220px"},200,function(){e(this).remove()}):e("#BHSidePanel").animate({right:"-220px"},200,function(){e(this).remove()}),e("#BHSidePanel").attr("MouseOver","1"),1==b&&e("body").animate({left:"0px"},200))},e.fitBHSidePanel=function(){o(),setTimeout(function(){r.onResize(),s()},300)},e.BHSidePanel=function(i,t){if(i=e.extend({lvl:0,position:"left",avatar:void 0,icon_m:"",icon_c:"",label:"BH SideBar",closeoutside:!0,icon_r:"icon-arrow-left",label_r:"Return",movebody:!0,top:0,update:!1,init:!1,items:[],iitems:[],onwire:void 0,onselect:"",startup:null,toolb:""},i),p=i,u=t,0==f&&(h=[]),(isNoE(h[f])||0==f)&&(h[f]={idr:m,idrs:[]}),h[f].idrs[m]={},h[f].idrs[m].items=p.items,delete p.items,c&&i.update)return n(f,m,i.onselect),void(isNoE(i.onwire)||i.onwire("#BHSidePanel"));c=!1,d&&e.CloseBHSidePanel(0);var a=i.position.toLowerCase();if(a="left"==a?"psbLeft":"psbRight",!d){d=!0;var o="";o+='<div id="BHSidePanel" class="psbContainer '+a+' psbThemeBlack" mouseover="1" style="'+(i.top>0?"top:"+i.top+"px;":"")+'">',o+='<span class="psbClose '+i.icon_c+'"></span><div align="center" class="bh-sdpanel-header">',o+=void 0!=i.avatar?'<img src="'+i.avatar+'" class="psbAv">':'<span class="psbMainIcon '+i.icon_m+'"></span>',o+='<span id="psbSubIcon" class=""></span><span class="psbUserName">'+i.label+"</span>",o+='<span class="bhsbToolbar">'+i.toolb+"</span>",o+='</div><div class="bh-sdpanel-body"><div class="swiper-container bh-sdpanel-cont"><div class="swiper-wrapper"></div></div></div><div align="center" class="bh-sdpanel-footer"></div></div>',e("body").append(o),r=new Swiper(".swiper-container",{direction:"vertical",loop:!1,freeMode:!0,preventClicks:!0,preventClicksPropagation:!0,spaceBetween:30,slidesPerView:"auto",autoHeight:!0,mousewheelControl:!0}),r.on("onTouchMove",function(){s()}),r.on("onTransitionEnd",function(){s()})}var v=e("#BHSidePanel");isNoE(i.onwire)||(console.log("kdf"),i.onwire("#BHSidePanel")),c=!0,"left"==i.position?(i.movebody&&(b=1,e("body").animate({left:"200px"},300,"linear")),v.animate({left:"0px"},300,"linear")):(i.movebody&&(b=1,e("body").animate({right:"200px"},300,"linear")),v.animate({right:"0px"},300,"linear")),clearTimeout(l),l=setTimeout(function(){e("#BHSidePanel").attr("mouseover","0")},300),n(f,m,i.onselect),"function"==typeof i.startup&&i.startup("#BHSidePanel"),i.init&&e("#BHSidePanel [id^='dye-'] ").each(function(){var i=(this.id+","+e("#"+this.id).attr("tgs")).split(",");MC.rRouter.Faction(i[1],i[0])})};var w;e(document).on("mouseenter","#BHSidePanel",function(){e(this).attr("mouseover","1")}),e(document).on("mouseover","#BHSidePanel",function(){e(this).attr("mouseover","1")}),e(document).on("mouseleave","#BHSidePanel",function(){e(this).attr("mouseover","0")}),e(document).on("click",function(){if(void 0!=p&&p.closeoutside){var i=e("#BHSidePanel").attr("mouseover");1!=i&&(e.CloseBHSidePanel(1),e("#BHSidePanel").length>0&&!isNoE(u)&&MC.Fis_function(u)&&u(void 0,"Closing"))}}),document.addEventListener("touchstart",function(i){if(p.closeoutside){var n=i.touches[0];"left"==p.position?n.pageX>210&&(e.CloseBHSidePanel(1),e("#BHSidePanel").length>0&&!isNoE(u)&&MC.Fis_function(u)&&u(void 0,"Closing")):n.pageX<108&&(e.CloseBHSidePanel(1),e("#BHSidePanel").length>0&&!isNoE(u)&&MC.Fis_function(u)&&u(void 0,"Closing"))}},!0),e(document).on("click",".psbOption",function(){var i=e(this).attr("icon"),t=e(this).attr("id"),s=e(this).attr("idr"),r=e(this).attr("text"),l=e(this).attr("childs"),d=parseInt(e(this).attr("lvl")),c=e(this).attr("ini"),p=e(this).attr("inim"),h=e(this).attr("onselect"),f=e(this).attr("scroll");isNoE(f)||0==d||e("#"+f).animatescroll(),l>0?(e("#psbSubIcon").removeClass().addClass(i),e(".psbUserName").text(r),e(".psbAv").hide(),e(".psbMainIcon").hide(),e("#psbSubIcon").fadeIn(250),n(d,s),a(),o(),"1"==c&&e("#BHSidePanel [id^='dye-'] ").each(function(){e(this).attr("idr",s),MC.rRouter.Faction(p,this.id)})):(!isNoE(u)&&MC.Fis_function(u)&&u(OptionSelected,"Selected"),isNoE(h)||MC.rRouter.Faction(h,t))}),e(document).on("click",".psbClose",function(){e.CloseBHSidePanel(1),!isNoE(u)&&MC.Fis_function(u)&&u(void 0,"Closing")})}(jQuery);