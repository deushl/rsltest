//@TODO cambiar la arquitectura para hacer un panel mÃ¡s genÃ©rico. Hacerla similar al controlador principal, con carga de mÃ³dulos y uso del viewer, pero de forma compacta y con menos caracterÃ­sticas, reusando lo mÃ¡s posible los mÃ©todos del controlador principal. 

(function ($) 
{
       /**
     * jQuery.browser.mobile (http://detectmobilebrowser.com/)
     *
     * jQuery.browser.mobile will be true if the browser is a mobile device
     *
     **/
    (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

    
    // Animate scroll
    $.easing.jswing=$.easing.swing;$.extend($.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return $.easing[$.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-$.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return $.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return $.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});$.fn.animatescroll=function(a){var b=$.extend({},$.fn.animatescroll.defaults,a);if(b.element=="html,body"){var c=this.offset().top;$(b.element).stop().animate({scrollTop:c-b.padding},b.scrollSpeed,b.easing)}else{$(b.element).stop().animate({scrollTop:this.offset().top-this.parent().offset().top+this.parent().scrollTop()-b.padding},b.scrollSpeed,b.easing)}};$.fn.animatescroll.defaults={easing:"swing",scrollSpeed:800,padding:0,element:"html,body"};


    var 
    _bIs = false,
    _bOp = false,

    glbSwiper,
    glbSettings = undefined,
    glbCallback = undefined,
    arLvls=new Array(),
    TempTimer,
    nCLvl=0,nCidr=0,
    isPushed=0,
    nContY=0,
    nContH=0;

    $.CloseBHSidePanel = function(Animate){
        nCLvl=0,nCidr=0,_bIs = false;
        if(Animate == 0){
            $("#BHSidePanel").remove();
            $(".bh-focus-background").remove();

            if(isPushed == 1 && glbSettings.position=="left"){
                $("body").css("left","0px");
            }else{
                $("body").css("right","0px");
            }
        }else{
            $(".bh-focus-background").removeClass("fadeIn").addClass("fadeOut").delay(400).queue(function() {
                $(this).remove()
            });

            if(glbSettings.position == "left"){
                $("#BHSidePanel").animate({
                    left: "-220px"
                },200,function(){
                    $(this).remove();
                });
            }else{
                $("#BHSidePanel").animate({
                    right: "-220px"
                },200,function(){
                    $(this).remove();
                });                
            }

            $("#BHSidePanel").attr("MouseOver","1");
            
            if(isPushed == 1){
                $("body").animate({
                    left: "0px"
                },200);
            }
        }
    }
    
    $.fitBHSidePanel = function(){
        fitContainer();
        //glbSwiper.update(true);
        setTimeout(function() {
            glbSwiper.onResize();
            setShadows();
        }, 300);//due to animation from navigation sub-menus. @TODO it should be optional
    }

    $.BHSidePanel = function (oO,callback) //@TODO multinivel ineficiente. Reconstruir
    {
        oO = $.extend({
            lvl:0,
            position: "left",
            avatar: undefined,
            icon_m: "",
            icon_c: "",
            label: "BH SideBar",
            closeoutside: true,
            icon_r: "icon-arrow-left",
            label_r: "Return",
            movebody:true,
            top:0,
            update:false,
            init:false,
            items: [],
            iitems: [],
            onwire:undefined,
            onselect:'',
            startup : null,
            toolb:''
        }, oO);

        glbSettings = oO;

        glbCallback = callback;
        
        if(nCLvl==0) {
            arLvls=[];
        }
        if(isNoE(arLvls[nCLvl])||nCLvl==0) {
            arLvls[nCLvl]={idr:nCidr,idrs:[]};
        }
        arLvls[nCLvl].idrs[nCidr]={};
        arLvls[nCLvl].idrs[nCidr]["items"]=glbSettings.items;
        delete glbSettings.items;

        if(_bOp&&oO.update) {
            Loadlvl1(nCLvl,nCidr,oO.onselect);
            if(!isNoE(oO.onwire)) {
                oO.onwire("#BHSidePanel");
            }
            return;
        }
        
        _bOp = false;
        
        if(_bIs){
            $.CloseBHSidePanel(0);
        }

        var Pos = oO.position.toLowerCase();
        if(Pos == "left")
            Pos = "psbLeft";
        else
            Pos = "psbRight";

        if(!_bIs){
            _bIs = true;
            var BHContent = "";

                BHContent +=  '<div id="BHSidePanel" class="psbContainer '+ Pos +' psbThemeBlack" mouseover="1" style="'+(oO.top>0 ? "top:"+oO.top+"px;" : '')+'">';
                BHContent +=   '<span class="psbClose '+oO.icon_c+'"></span><div align="center" class="bh-sdpanel-header">';

                if(oO.avatar != undefined)
                    BHContent +=          '<img src="'+ oO.avatar +'" class="psbAv">';
                else
                    BHContent +=          '<span class="psbMainIcon">'+ oO.icon_m +'</span>';

                BHContent +=          '<span id="psbSubIcon" class=""></span><span class="psbUserName">'+ oO.label +'</span>';
                BHContent +=          '<span class="bhsbToolbar">'+ oO.toolb +'</span>';
                BHContent +=      '</div><div class="bh-sdpanel-body"><div class="swiper-container bh-sdpanel-cont"><div class="swiper-wrapper"></div></div></div><div align="center" class="bh-sdpanel-footer"></div></div>';

            $("body").append(BHContent).append('<div class="bh-focus-background animated fast fadeIn"></div>');

            glbSwiper = new Swiper('.swiper-container',{
                direction: 'vertical',
                loop: false,
                freeMode: true,
                preventClicks:true,
                preventClicksPropagation:true,
                spaceBetween: 10,
                slidesPerView: 'auto',
                autoHeight:true,
                mousewheelControl: true,
                
            
            });
            
            glbSwiper.on('onTouchMove', function () {
                setShadows();
            });
            
            glbSwiper.on('onTransitionEnd', function () {
                setShadows();
                
            });

        }

        var BHSidePanel = $("#BHSidePanel");
        
        if(!isNoE(oO.onwire)) {
            oO.onwire("#BHSidePanel");
        }

        _bOp = true;

        if(oO.position=="left"){
            if(oO.movebody){
                isPushed = 1;
                $("body").animate({
                    left: "200px"
                },300, 'linear');
            }

            BHSidePanel.animate({
                    left: "0px",
                },300, 'linear');
        }else{
            if(oO.movebody){
                isPushed = 1;
                $("body").animate({
                    right: "200px"
                },300, 'linear');
            }

            BHSidePanel.animate({
                    right: "0px",
                },300, 'linear');
        }

        clearTimeout(TempTimer);
        TempTimer = setTimeout(function() {
            $("#BHSidePanel").attr("mouseover","0");
        }, 300);

        // Load lvl1
        Loadlvl1(nCLvl,nCidr,oO.onselect);
        
        if(typeof oO.startup=="function") {
            oO.startup("#BHSidePanel");
        }

        if(oO.init){
            $("#BHSidePanel [id^='dye-'] ").each(function (idx) {
                var arTgs=(this.id+','+$('#'+this.id).attr('tgs')).split(',');
                MC.rRouter.Faction(arTgs[1],arTgs[0]);
            });
        }
    }


// ================== Creates the first lvl of items
        

        function Loadlvl1(nLvl,idr,cOSel) {
            glbSwiper.removeAllSlides();
            nLvl=isNoE(nLvl) ? 0 : nLvl;
            idr=isNoE(idr) ? (isNoE(arLvls[nLvl]) ? nCidr : arLvls[nLvl].idr) : idr;
            nCLvl=nLvl;
            nCidr=idr;
            
            if(nLvl>0) {
                cHtml='<div class="psbOption" lvl="'+(nLvl-1)+'" childs ="1">';
                cHtml+='<span class="psbLabel"><span class="'+ glbSettings.icon_r +'"></span> '+ glbSettings.label_r +'</span>';
                glbSwiper.appendSlide(cHtml);
            }
            
            if(isNoE(arLvls[nLvl])) {
                arLvls[nLvl]={idr:idr,idrs:[]};
            }
            
            if(isNoE(arLvls[nLvl].idrs[idr])) {
                arLvls[nLvl].idrs[idr]={};
            }

            if(isNoE(arLvls[nLvl].idrs[idr].items)&&!isNoE(glbSettings.init)&&!isNoE(glbSettings.iitems)) {
                arLvls[nLvl].idrs[idr].items=glbSettings.iitems;
            }
            
            for(i=0; i< arLvls[nLvl].idrs[idr].items.length; i++){
                var cHtml ="",
                oOp={
                    ik:undefined,
                    _i:"",
                    _t:"--",
                    _c:0,
                    _in:false,
                    _inm:'',
                    scroll:"",
                    html:""
                };
                
                $.extend(oOp, arLvls[nLvl].idrs[idr].items[i]);
                
                if(oOp.ik==undefined) oOp.ik=i;

                cHtml+='<div class="swiper-slide"><div context="*" atype="x" id="psbOption'+oOp.ik+'" class="psbOption" onselect="'+cOSel+'" icon="'+ oOp._i +'" idr="'+ oOp.ik+'" text="'+ oOp._t +'" ini="'+ oOp._in +'" inim="'+ oOp._inm +'" childs ="'+ oOp._c +'" lvl="'+(nLvl+1)+'" array="'+ i +'" scroll="'+ oOp.scroll +'">';

                if(oOp.html == "") {
                    cHtml+='<span class="psbLabel"><span class="'+ oOp._i +'"></span> '+ oOp._t +'</span>';
                }

                if(oOp._c>0){
                    cHtml+='<span class="psbMorelbl"><span class="icon-angle-right"></span> </span>';
                }
                
                cHtml+=oOp.html+'</div></div>';

                glbSwiper.appendSlide(cHtml);
            }
            
            $.fitBHSidePanel();
            showEl();
        }

        // ==================  Control the Animation
        var Timer;
        function showEl(){

            clearInterval(Timer);

            var Cuantos = $(".psbOption").length;
            var Actual  = 0;

            Timer = setInterval(function(){

                if(Actual == Cuantos){
                    clearInterval(Timer);
                    $(".psbMorelbl").addClass("animated fadeIn");
                }

                if(glbSettings.position == "left"){

                    if($(".psbOption").eq(Actual).parent().hasClass("swiper-slide"))
                        $(".psbOption").eq(Actual).parent().addClass("animated fadeInLeft fast");
                    else
                        $(".psbOption").eq(Actual).parent().parent().addClass("animated fadeInLeft fast");

                }else{
                    if($(".psbOption").eq(Actual).parent().hasClass("swiper-slide"))
                        $(".psbOption").eq(Actual).parent().addClass("animated fadeInRight fast");
                    else
                        $(".psbOption").eq(Actual).parent().parent().addClass("animated fadeInRight fast");
                }

                
                
                Actual +=1;
            },55);

            glbSwiper.slideTo(0,10);

        }

        // Reload avatar
        function reloadImg(){
            $("#psbSubIcon").hide();
            
            $(".psbAv").fadeIn(250);
            $(".psbMainIcon").fadeIn(250);

            $(".psbUserName").text(glbSettings.label);
        }
        
        function setShadows() {
            if(nContY!=$("#BHSidePanel .swiper-wrapper").position().top) {
                nContY=$("#BHSidePanel .swiper-wrapper").position().top;
                
                if(nContY<0) {
                    $("#BHSidePanel .bh-sdpanel-header").addClass("shadow")
                } else {
                    $("#BHSidePanel .bh-sdpanel-header").removeClass("shadow")
                }
            }
            
            if(nContH!=$("#BHSidePanel .swiper-wrapper").css("height")) {
                nContH=$("#BHSidePanel .swiper-wrapper").height();
                var nBH=parseInt($("#BHSidePanel .bh-sdpanel-body").height());
                
                if(nContH>nBH&&(nContH-(nContY*-1)-nBH)>0) {
                    $("#BHSidePanel .bh-sdpanel-footer").addClass("shadow")
                } else {
                    $("#BHSidePanel .bh-sdpanel-footer").removeClass("shadow")
                }
            }
        }

        // Adapt the submenu options
        function fitContainer(){
            var nAdjust = $(window).height() - 120;
            $(".bh-sdpanel-body").css("height", nAdjust+"px");
            
        }

        $(document).on("mouseenter","#BHSidePanel",function(){
            $(this).attr("mouseover","1");
        });

        $(document).on("mouseover","#BHSidePanel",function(){
            $(this).attr("mouseover","1");
        });

        $(document).on("mouseleave","#BHSidePanel",function(){
            $(this).attr("mouseover","0");
        });

        // Click or touch outside to close
        $(document).on("click",function(){
            if(glbSettings == undefined)
                return;
            if(glbSettings.closeoutside){
                var MouseOver = $("#BHSidePanel").attr("mouseover");
                if(MouseOver != 1){
                    $.CloseBHSidePanel(1);
                    if($("#BHSidePanel").length>0&&!isNoE(glbCallback)&&MC.Fis_function(glbCallback)) {   
                        glbCallback(undefined,"Closing");
                    }
                }
            }
        });

        document.addEventListener('touchstart', function(e) {
            if(glbSettings == undefined)
                return;
            if(glbSettings.closeoutside){
                // e.preventDefault();
                var touch = e.touches[0];
                if(glbSettings.position=="left"){
                    if(touch.pageX>210){
                        $.CloseBHSidePanel(1);
                        if($("#BHSidePanel").length>0&&!isNoE(glbCallback)&&MC.Fis_function(glbCallback)) {   
                            glbCallback(undefined,"Closing");
                        }
                    }
                }else{
                    if(touch.pageX<108){
                        $.CloseBHSidePanel(1);
                        if($("#BHSidePanel").length>0&&!isNoE(glbCallback)&&MC.Fis_function(glbCallback)) {   
                            glbCallback(undefined,"Closing");
                        }
                    }
                }
            }
        }, true);

        // Click on a menuoption that contains childs
        $(document).on("click",".psbOption",function(){
            var icon          = $(this).attr("icon"),
            id       = $(this).attr("id"),
            idr         = $(this).attr("idr"),
            text        = $(this).attr("text"),
            childs      = $(this).attr("childs"),
            lvl         = parseInt($(this).attr("lvl")),
            ini         = $(this).attr("ini"),
            inim         = $(this).attr("inim"), //ini method
            onsel         = $(this).attr("onselect"),
            startup     = null,
            scroll      = $(this).attr("scroll");
            // $('#lblTitle').animatescroll();

            if(!isNoE(scroll)&&lvl!=0){
                $('#' + scroll).animatescroll();
            }
            if(childs>0) {
                $("#psbSubIcon").removeClass().addClass(icon);
                $(".psbUserName").text(text);

                $(".psbAv").hide();
                $(".psbMainIcon").hide();
                $("#psbSubIcon").fadeIn(250);
                
                Loadlvl1(lvl,idr);
                reloadImg();
                fitContainer();
                
                if(ini=='1') {
                    $("#BHSidePanel [id^='dye-'] ").each(function (idx) {
                        $(this).attr("idr",idr);
                        MC.rRouter.Faction(inim,this.id);
                    });
                }
            } else {
                //return selectted
                if(!isNoE(glbCallback)&&MC.Fis_function(glbCallback)) {
                    glbCallback(OptionSelected,"Selected");
                }
                if(!isNoE(onsel)){
                    MC.rRouter.Faction(onsel,id);
                }
            }
        });
        

            // Close menu on Cross click
            $(document).on("click",".psbClose",function(){

                $.CloseBHSidePanel(1);
                if(!isNoE(glbCallback)&&MC.Fis_function(glbCallback)) {   
                    glbCallback(undefined,"Closing");
                }

            });

})(jQuery);


