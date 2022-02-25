

/*
 * jQuery pageSlide
 * Version 2.0
 * http://srobbin.com/jquery-pageslide/
 *
 * jQuery Javascript plugin which slides a webpage over to reveal an additional interaction pane.
 *
 * Copyright (c) 2011 Scott Robbin (srobbin.com)
 * Dual licensed under the MIT and GPL licenses.
*/

;(function($){
    // Convenience vars for accessing elements
    var $body, $pageslide;

    $(function(){
        $body = $('body'), $pageslide = $('#pageslide');

        // If the pageslide element doesn't MetroExist, create it
        if( $pageslide.length == 0 ) {
             $pageslide = $('<div />').attr( 'id', 'pageslide' )
                                      .css( 'display', 'none' )
                                      .appendTo( $('body') );
        }

        /* Events */
            
        // Don't let clicks to the pageslide close the window
        $pageslide.click(function(e) {
            e.stopPropagation();
        });
    
        // Close the pageslide if the document is clicked or the users presses the ESC key, unless the pageslide is modal
        $(document).bind('click keyup', function(e) {
            // If this is a keyup event, let's see if it's an ESC key
            if( e.type == "keyup" && e.keyCode != 27) return;
            
            // Make sure it's visible, and we're not modal      
            if( $pageslide.is( ':visible' ) && !$pageslide.data( 'modal' ) ) {          
                $.pageslide.close();
            }
        });
    });
    
    var _sliding = false,   // Mutex to assist closing only once
        _lastCaller;        // Used to keep track of last element to trigger pageslide

    /*
     * Private methods 
     */
    function _load( url, useIframe ) {
        // Are we loading an element from the page or a URL?
        if ( url.indexOf("#") === 0 ) {                
            // Load a page element                
            $(url).clone(true).appendTo( $pageslide.empty() ).show();
        } else {
            // Load a URL. Into an iframe?
            if( useIframe ) {
                var iframe = $("<iframe />").attr({
                                                src: url,
                                                frameborder: 0,
                                                hspace: 0
                                            })
                                            .css({
                                                width: "100%",
                                                height: "100%"
                                            });
                
                $pageslide.html( iframe );
            } else {
                $pageslide.load( url );
            }
            
            $pageslide.data( 'localEl', false );
            
        }
    }
    
    // Function that controls opening of the pageslide
    function _start( direction, speed ) {
        var slideWidth = $pageslide.outerWidth( true ),
            bodyAnimateIn = {},
            slideAnimateIn = {};
        
        // If the slide is open or opening, just ignore the call
        if( $pageslide.is(':visible') || _sliding ) return;         
        _sliding = true;
                                                                    
        switch( direction ) {
            case 'left':
                $pageslide.css({ left: 'auto', right: '-' + slideWidth + 'px' });
                bodyAnimateIn['margin-left'] = '-=' + slideWidth;
                slideAnimateIn['right'] = '+=' + slideWidth;
                break;
            default:
                $pageslide.css({ left: '-' + slideWidth + 'px', right: 'auto' });
                bodyAnimateIn['margin-left'] = '+=' + slideWidth;
                slideAnimateIn['left'] = '+=' + slideWidth;
                break;
        }
                    
        // Animate the slide, and attach this slide's settings to the element
        $body.animate(bodyAnimateIn, speed);
        $pageslide.show()
                  .animate(slideAnimateIn, speed, function() {
                      _sliding = false;
                  });
    }
      
    /*
     * Declaration 
     */
    $.fn.pageslide = function(options) {
        var $elements = this;
        
        // On click
        $elements.click( function(e) {
            var $self = $(this),
                settings = $.extend({ href: $self.attr('href') }, options);
            
            // Prevent the default behavior and stop propagation
            e.preventDefault();
            e.stopPropagation();
            
            if ( $pageslide.is(':visible') && $self[0] == _lastCaller ) {
                // If we clicked the same element twice, toggle closed
                $.pageslide.close();
            } else {                 
                // Open
                $.pageslide( settings );

                // Record the last element to trigger pageslide
                _lastCaller = $self[0];
            }       
        });                   
    };

    /*
     * Default settings 
     */
    $.fn.pageslide.defaults = {
        speed:      200,        // Accepts standard jQuery effects speeds (i.e. fast, normal or milliseconds)
        direction:  'right',    // Accepts 'left' or 'right'
        modal:      false,      // If set to true, you must explicitly close pageslide using $.pageslide.close();
        iframe:     true,       // By default, linked pages are loaded into an iframe. Set this to false if you don't want an iframe.
        href:       null        // Override the source of the content. Optional in most cases, but required when opening pageslide programmatically.
    };

    /*
     * Public methods 
     */

    // Open the pageslide
    $.pageslide = function( options ) {     
        // Extend the settings with those the user has provided
        var settings = $.extend({}, $.fn.pageslide.defaults, options);

        // Are we trying to open in different direction?
        if( $pageslide.is(':visible') && $pageslide.data( 'direction' ) != settings.direction) {
            $.pageslide.close(function(){
                _load( settings.href, settings.iframe );
                _start( settings.direction, settings.speed );
            });
        } else {                
            _load( settings.href, settings.iframe );
            if( $pageslide.is(':hidden') ) {
                _start( settings.direction, settings.speed );
            }
        }
        
        $pageslide.data( settings );
    }

    // Close the pageslide
    $.pageslide.close = function( callback ) {
        var $pageslide = $('#pageslide'),
            slideWidth = $pageslide.outerWidth( true ),
            speed = $pageslide.data( 'speed' ),
            bodyAnimateIn = {},
            slideAnimateIn = {}
                        
        // If the slide isn't open, just ignore the call
        if( $pageslide.is(':hidden') || _sliding ) return;          
        _sliding = true;
        
        switch( $pageslide.data( 'direction' ) ) {
            case 'left':
                bodyAnimateIn['margin-left'] = '+=' + slideWidth;
                slideAnimateIn['right'] = '-=' + slideWidth;
                break;
            default:
                bodyAnimateIn['margin-left'] = '-=' + slideWidth;
                slideAnimateIn['left'] = '-=' + slideWidth;
                break;
        }
        
        $pageslide.animate(slideAnimateIn, speed);
        $body.animate(bodyAnimateIn, speed, function() {
            $pageslide.hide();
            _sliding = false;
            if( typeof callback != 'undefined' ) callback();
        });
    }
})(jQuery);


$(document).ready(function() {  
        // Plugins placing
        $("body").append("<div id='divSmallBoxes'></div>");
        $("body").append("<div id='divMiniIcons'></div><div id='divbigBoxes'></div>");
        $(".OpenSideBar").pageslide({ direction: "left" });
    });


// Messagebox
var __bMsgCont = false,MetroMSGboxCount = 0,PrevTop =  0,arMB=new Array(),__cMsgContPrfx="alMod";

(function ($) {
    $.MetroMessageBox = function (settings,callback,fStartUp) {
        var Content, mxEToWire, cMBCID="MsgBoxBack", cContID;
        settings = $.extend({
            title: "",
            content: "",
            id:"null",
            NormalButton: undefined,
            ActiveButton: undefined,
            buttons: undefined,
            bicon_html: undefined,
            btn_classes: undefined,
            input: undefined,
            placeholder: "",
            options: undefined
        }, settings);

        // <div class="divMessageBox animated fadeIn fast">
        //     <div class="MessageBoxContainer">
        //         <div class="MessageBoxMiddle">
        //             <h2>Hola Mundo</h2>
        //             <p class="pText">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        //             tempor incididunt ut labore et dolore magna aliqua. </p>
        //             <input type='text' id='' placeholder='Hola Mundo'/><br/><br/>
        //             <div class="MessageBoxButtonSection">
        //                 <button>Aceptar</button>
        //                 <button>Cancelar</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        //Messagebox Sound

        // SmallBox Sound
        //@TODO Genera una llamada extra a index, innecesaria. Tal vez se pueda arreglar.
        /*if(isIE8orlower()==0) {
            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', 'assets/mnot/sound/messagebox.mp3');
            $.get();
            audioElement.addEventListener("load", function() {
            audioElement.play();
            }, true);
            audioElement.pause();
            audioElement.play();
        }*/

        MetroMSGboxCount++;
        arMB.push(settings.id);
        cContID=__cMsgContPrfx+settings.id;

        if(!__bMsgCont) {
            __bMsgCont = true;
            $("body").append("<div class='divMessageBox animated fadeIn fast' id='"+cMBCID+"'></div>");

            if(isIE8orlower() == 1) {
                $("#"+cMBCID).addClass("MessageIE");
            }
        }

        Content = '<div class="alertCell" id="'+cContID +'">';  //alertCell para centrar verticalmente sin importar el contenido
        Content += '<div class="MessageBoxContainer animated fadeIn fast">';
        Content += "<div class='MessageBoxMiddle'>";
        Content += "<span class='MsgTitle'>"+ settings.title +"</span class='MsgTitle'>";
        Content += "<p class='pText'>" + settings.content + "</p>";

        if(!isNoE(settings.buttons)) {
            settings.buttons = settings.buttons.split(',');
            
            if(settings.buttons.length) {
                settings.buttons.reverse();
                if(!isNoE(settings.btn_classes)) {
                    settings.btn_classes = settings.btn_classes.split(',').reverse();
                }
                if(isNoE(settings.NormalButton)) {
                    settings.NormalButton = "#232323";   
                }
                if(isNoE(settings.ActiveButton)) {
                    settings.ActiveButton = "#ed145b";   
                }
                if(!isNoE(settings.bicon_html)) {
                    settings.bicon_html = settings.bicon_html.split(',').reverse();
                }
                var cBtnsDef='',cBIcon='',cStyle='';
                for(var i=0; i<settings.buttons.length; i++) {
                    settings.buttons[i]=$.trim(settings.buttons[i]);
                    
                    cStyle=settings.btn_classes&&!isNoE(settings.btn_classes[i]) ? ' class="botTempo '+ settings.btn_classes[i]+'"' : ' class="botTempo" style="background-color:'+ settings.NormalButton+';"';
                    
                    cBIcon=settings.bicon_html&&!isNoE(settings.bicon_html[i]) ? settings.bicon_html[i] : '';
                
                    cBtnsDef += "<button id='bot"+i+"-"+cContID+"'"+cStyle+">" + cBIcon + settings.buttons[i] + "</button>";
                }
                Content += "<div class='MessageBoxButtonSection'>"+cBtnsDef+"</div>";
            }
        }

        Content += "</div>"; //MessageBoxMiddle
        Content += "</div>"; //MessageBoxContainer
        Content += "</div>"; //alertCell

        if(MetroMSGboxCount>1) {
            $(".alertCell").hide();
            //$(".MessageBoxContainer").css("z-index", 99999);
        }

        $("#"+cMBCID).dequeue().append(Content);
        
        if(typeof fStartUp=="function") {
            fStartUp(cContID);
        }
        
        mxEToWire=$("#"+cMBCID+" [id='"+cContID+"']" +" ["+Viewer.oFEAttr.WireUpLoad+"]").presence();
        if(mxEToWire) {
            Module.Fload_dep("#"+cMBCID+" [id='"+cContID+"']",  function() {
                var cEls=mxEToWire.attr(Viewer.oFEAttr.WireUpLoad);
                if(!isNoE(cEls)) {
                    var arElToWire=cEls.split(',');
                    $.each(arElToWire, function(i, v) {
                        Viewer.FgetWireUp(v)("#"+cMBCID," [id='"+cContID+"']");
                    });
                }
            });
        }
        
        $("#"+cMBCID).show().removeClass("fadeOut").addClass("fadeIn");
        var oMB=$("#"+cMBCID+" [id='"+cContID+"']");
        
        if(!$(".bh-focusonshow",oMB).presence()&&!isNoE(settings.buttons)&&settings.buttons.length&&!isNoE(settings.default_btn)) {
            
            $("#bot"+settings.buttons.indexOf($.trim(settings.default_btn))+"-"+cContID,oMB).focus();
        } else {
            $(".bh-focusonshow",oMB).focus();
        }

        /*$('.botTempo').hover(function() {
            var ThisID = $(this).attr('id');
            $("#"+ThisID).css("background-color", settings.ActiveButton);
        },function(){
            var ThisID = $(this).attr('id');
            $("#"+ThisID).css("background-color", settings.NormalButton);
        });*/
        
        // Callback and button Pressed
        $(".botTempo",oMB).click(function() {
            var cBID = $(this).attr('id');
            if(typeof callback == "function") {
                var cBP = $.trim($(this).text()),
                mxF=$("form",oMB).presence(),
                oP={};
                
                if(mxF) {
                    $(this).attr("source",mxF.attr("id"))
                    var cFV=Gatherer.Fgather("",'std',this.id,'#'+cContID);
                    oP=deparam(cFV);
                }
                
                callback(cBP,oP,cContID);
            }

            $.MetroMessageBoxUnload(cBID.substr(cBID.indexOf("-")+1).replace(__cMsgContPrfx,""));
        });
    }

})(jQuery);

(function ($) {
    $.MetroMessageBoxUnload = function (cID,bUnique) {
        var cMBCID="MsgBoxBack";
        if(MetroMSGboxCount>0) {
            bUnique=isNoE(bUnique);
            
            if(!isNoE(cID)) {
                if(cID=='*') {
                    MetroMSGboxCount=0;
                    $("#"+cMBCID+" .alertCell").remove();
                } else {
                    var iI=arMB.indexOf(cID);
                    if(iI>-1) {
                        if(bUnique) {
                            MetroMSGboxCount--;
                            $("#"+cMBCID+" [id='"+__cMsgContPrfx+cID+"']").filter(":first").remove();
                            arMB.splice(iI,1);
                        } else {
                            $("#"+cMBCID+" [id='"+__cMsgContPrfx+cID+"']").remove();
                            for(var i=arMB.length-1;i>=0; i--) {
                                if(arMB[i]==cID) {
                                    arMB.splice(i,1);
                                    MetroMSGboxCount--;
                                }
                            }
                        }
                    }
                }
            } else {
                if(bUnique) {
                    MetroMSGboxCount--;
                    $("#"+cMBCID+" [id='"+__cMsgContPrfx+arMB[arMB.length-1]+"']").filter(":first").remove();
                    arMB.pop();
                } else {
                    $("#"+cMBCID+" [id='"+__cMsgContPrfx+arMB[arMB.length-1]+"']").remove();
                    cID=arMB[arMB.length-1];
                    for(var i=arMB.length-1;i>=0; i--) {
                        if(arMB[i]==cID) {
                            arMB.splice(i,1);
                            MetroMSGboxCount--;
                        }
                    }
                }
            }
            if(MetroMSGboxCount==0) {
                $("#"+cMBCID).removeClass("fadeIn").addClass("fadeOut").delay(300).queue(function() {
                    $(this).hide();$(this).dequeue();
                });
            } else {
                $("#"+cMBCID+" [id='"+__cMsgContPrfx+arMB[arMB.length-1]+"']").show();
                $("#"+cMBCID+" [id='"+__cMsgContPrfx+arMB[arMB.length-1]+"'] .bh-focusonshow").focus();
            }
        }
    }
})(jQuery);

// BigBox
var BigBoxes = 0;

(function ($) {
    $.bigBox = function (settings,callback) {
        var boxBig, content;
        settings = $.extend({
            title: "",
            content: "",
            img: undefined,
            number: undefined,
            color: undefined,
            timeout: undefined
        }, settings);

        // bigbox Sound
        /*if(isIE8orlower() == 0) {
            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', 'static/sound/bigbox.mp3');
            $.get();
            audioElement.addEventListener("load", function() {
            audioElement.play();
            }, true);

            audioElement.pause();
            audioElement.play();
        }*/

        // <div class="bigBox animated fadeInUp">
        // <span>Hola Mundo</span>
        // <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        // tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        // quis nostrud exercitation ullamco. </p>
        // <div class="bigboxicon">
        //     <img src="static/img/cloud.png">
        // </div>
        // <div class="bigboxnumber">
        //     3
        // </div>
        // </div>
        BigBoxes = BigBoxes + 1;
        
        boxBig =  "<div id='bigBox"+BigBoxes+"' class='bigBox animated fadeIn fast'><div id='bigBoxColor"+ BigBoxes+"'><img class='botClose' id='botClose"+ BigBoxes +"' src='static/img/close.png'>";
        boxBig +=  "<span>"+ settings.title +"</span>";
        boxBig +=  "<p>"+settings.content +"</p>";
        boxBig +=  "<div class='bigboxicon'>";

        if(settings.img == undefined)
        {
            settings.img = "static/img/cloud.png";
        }
        boxBig +=  "<img src='"+ settings.img +"'>";
        boxBig +=  "</div>";

        boxBig +=  "<div class='bigboxnumber'>";
        if(settings.number != undefined)
        {
            boxBig +=  settings.number;
        }
        boxBig +=  "</div></div>";
        boxBig +=  "</div>";


        // stacking method
        $("#divbigBoxes").append(boxBig);
       

        if(settings.color == undefined)
        {
            settings.color = "#004d60";
        }
        $("#bigBox"+BigBoxes).css("background-color", settings.color );


        $("#divMiniIcons").append("<div id='miniIcon"+BigBoxes+"' class='cajita animated fadeIn' style='background-color: "+settings.color+";'><img src='"+ settings.img +"'/></div>");


        //Click Mini Icon
         $("#miniIcon"+BigBoxes).bind('click', function() 
         {
            var FrontBox = $(this).attr('id');
            var FrontBigBox = FrontBox.replace("miniIcon","bigBox");
            var FronBigBoxColor = FrontBox.replace("miniIcon","bigBoxColor");

            $(".cajita").each(function( index ) 
            {   
                var BackBox = $(this).attr('id');
                var BigBoxID = BackBox.replace("miniIcon","bigBox");
                
                $("#"+BigBoxID).css("z-index", 9998);
            });

            $("#"+FrontBigBox).css("z-index", 9999);
            $("#"+FronBigBoxColor).removeClass("animated fadeIn").delay(1).queue(function()
            {
                $(this).show();
                $(this).addClass("animated fadeIn");
                $(this).clearQueue();

            });
                
            
         });

         //Close Cross
         $("#botClose"+BigBoxes).bind('click', function() 
         {
            if (typeof callback == "function") 
            {   
                if(callback) callback();
            }

            var FrontBox = $(this).attr('id');
            var FrontBigBox = FrontBox.replace("botClose","bigBox");
            var miniIcon = FrontBox.replace("botClose","miniIcon");

            $("#"+FrontBigBox).removeClass("fadeIn fast");
            $("#"+FrontBigBox).addClass("fadeOut fast").delay(300).queue(function()
            {
                $(this).clearQueue();
                $(this).remove();
            });

            $("#"+miniIcon).removeClass("fadeIn fast");
            $("#"+miniIcon).addClass("fadeOut fast").delay(300).queue(function()
            {
                $(this).clearQueue();
                $(this).remove();
            });

            
         });

         if(settings.timeout != undefined)
        {
            var TimedID = BigBoxes;
            setTimeout(function() 
            {
                              
                $("#bigBox"+TimedID).removeClass("fadeIn fast");
                $("#bigBox"+TimedID).addClass("fadeOut fast").delay(300).queue(function()
                {
                    $(this).clearQueue();
                    $(this).remove();
                });

                $("#miniIcon"+TimedID).removeClass("fadeIn fast");
                $("#miniIcon"+TimedID).addClass("fadeOut fast").delay(300).queue(function()
                {
                    $(this).clearQueue();
                    $(this).remove();
                });

            }, settings.timeout); 
        }

    }
})(jQuery);

// .BigBox


// Small Notification
var nSmallAlertIdx = 0;
var nDisplayedIdx = 0;
var SmallBoxesAnchos = 0;

(function ($) {
    $.smallBox = function (settings,callback) 
    {
        var BoxSmall, content;
        settings = $.extend({
            title: "",
            content: "",
            img: undefined,
            icon: undefined,
            color: undefined,
            timeout: undefined
        }, settings);

        // SmallBox Sound
        /*if(isIE8orlower() == 0)
        {
            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', 'static/sound/smallbox.mp3');
            $.get();
            audioElement.addEventListener("load", function() {
            audioElement.play();
            }, true);
            audioElement.pause();
            audioElement.play();
        }*/

        nSmallAlertIdx++;
        nDisplayedIdx++;
        BoxSmall = "";
        
        // <div class="SmallBox animated fadeInRight fast">
        //     <div class="foto">
        //         <img src="static/img/pic1.png"> 
        //     </div>

        //     <div class="textoFoto">
        //         <span>Hola Mundo</span>
        //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. lorem</span>
        //     </div>
        //     <div class='miniIcono'>
        //           <img class='miniPic' src='static/img/talk.png'>
        //     </div>
        // </div>
        var IconSection ="";
        var CurrentIDSmallbox = "smallbox"+nSmallAlertIdx;

        IconSection = "<div class='mini-icon'><div class='pic'></div></div>";

        BoxSmall = "<div nidx='"+nDisplayedIdx+"' id='"+ CurrentIDSmallbox +"' class='SmallBox animated fadeInRight fast " + settings.type +"'>";

        if(settings.img == undefined)
        {
            BoxSmall += "<div class='textoFull'><span>"+ settings.title +"</span><p>"+ settings.content +"</p></div>"+ IconSection +"</div>";   
        }
        else
        {
            BoxSmall += "<div class='foto'><img src='"+ settings.img +"'></div><div class='textoFoto'><span>"+ settings.title +"</span><p>"+ settings.content +"</p></div>"+ IconSection +"</div>";
        }

        if(nSmallAlertIdx == 1)
        {
            $("#divSmallBoxes").append(BoxSmall);
            SmallBoxesAnchos = $("#smallbox"+nSmallAlertIdx).height() + 40;
        }
        else
        {
            var MetroExist = $(".SmallBox").length;
            if(MetroExist==0)
            {
                $("#divSmallBoxes").append(BoxSmall);
                SmallBoxesAnchos = $("#smallbox"+nSmallAlertIdx).height() + 40;
            }
            else
            {
                $("#divSmallBoxes").append(BoxSmall);
                $("#smallbox"+nSmallAlertIdx).css("top", SmallBoxesAnchos );
                SmallBoxesAnchos = SmallBoxesAnchos + $("#smallbox"+ nSmallAlertIdx).height() + 20;
                
                $(".SmallBox").each(function( index ) 
                {
                    if(index == 0)
                    {
                        $(this).css("top", 20 );
                        heightPrev = $(this).height() + 40;
                        SmallBoxesAnchos = $(this).height() + 40;
                    }
                    else
                    {
                        $(this).css("top", heightPrev );
                        heightPrev = heightPrev + $(this).height() + 20;
                        SmallBoxesAnchos = SmallBoxesAnchos + $(this).height() + 20;
                    }
                });
            }
        }

//@TODO prevenir que la eliminaciÃ³n usceda durante una animaciÃ³n de recorrido
        if(settings.timeout != undefined) {
            var jqObj=$("#"+CurrentIDSmallbox);
            setTimeout(function() {
                jqObj.unbind('click');
                var ThisHeight = $(this).height() + 20;
                var ID = CurrentIDSmallbox;
                var ThisTop = $("#"+CurrentIDSmallbox).css('top');
                if($('#'+jqObj.attr('id')).presence()) {
                    SmallBoxesAnchos = SmallBoxesAnchos - ThisHeight;
                    jqObj.removeClass("fadeIn").addClass("fadeOutRight").delay(200).queue(function() {
                        var nPrevHeight=$(this).height();
                        for(var i=Number($(this).attr('nidx'))+1;i<=nDisplayedIdx;i++){
                            var jqCurNot=$('[id^="smallbox"][nidx="'+i+'"]' );
                            jqCurNot.animate({top:Number(jqCurNot.css('top').replace('px',''))-nPrevHeight-20},300);
                            jqCurNot.attr('nidx',jqCurNot.attr('nidx')-1);
                            nPrevHeight=jqCurNot.height();
                        }
                        
                        $(this).remove();
                        nDisplayedIdx--;
                        
                    });
                }
                var Primero = 1;
                var heightPrev = 0;
                /*$(".SmallBox").each(function( index ) {   
                    if(index == 0)
                    {
                        $(this).css("top", 20 );
                        heightPrev = $(this).height() + 40;
                        SmallBoxesAnchos = $(this).height() + 40;
                    }
                    else
                    {
                        $(this).css("top", heightPrev );
                        heightPrev = heightPrev + $(this).height() + 20;
                        SmallBoxesAnchos = SmallBoxesAnchos + $(this).height() + 20;
                    }

                });*/
            }, settings.timeout); 
        }
        
        // Click Closing
         $("#smallbox"+nSmallAlertIdx).bind('click', function() 
         {
            if (typeof callback == "function") 
            {   
                if(callback) callback();
            }

            var ThisHeight = $(this).height() + 20;
            var ID = $(this).attr('id');
            var ThisTop = $(this).css('top');

            SmallBoxesAnchos = SmallBoxesAnchos - ThisHeight;
            $(this).removeClass("fadeIn").addClass("fadeOutRight").delay(200).queue(function() {
                var nPrevHeight=$(this).height();
                for(var i=Number($(this).attr('nidx'))+1;i<=nDisplayedIdx;i++){
                    var jqCurNot=$('[id^="smallbox"][nidx="'+i+'"]' );
                    jqCurNot.animate({top:Number(jqCurNot.css('top').replace('px',''))-nPrevHeight-20},300);
                    jqCurNot.attr('nidx',jqCurNot.attr('nidx')-1);
                    nPrevHeight=jqCurNot.height();
                }
                $(this).remove();
                nDisplayedIdx--;
            });

            var Primero = 1;
            var heightPrev = 0;

            /*$(".SmallBox").each(function( index ) {   
                if(index == 0) {
                    $(this).css("top", 20 );
                    heightPrev = $(this).height() + 40;
                    SmallBoxesAnchos = $(this).height() + 40;
                }
                else
                {
                    $(this).css("top", heightPrev );
                    heightPrev = heightPrev + $(this).height() + 20;
                    SmallBoxesAnchos = SmallBoxesAnchos + $(this).height() + 20;
                }

            });*/
            
         });
            
        
    }
})(jQuery);



// .Small Notification



// Closing function for iPad and other tablets
function CloseSide()
{
    $.pageslide.close();
}


// Sounds


function getInternetExplorerVersion() {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}
function checkVersion() {
    var msg = "You're not using Windows Internet Explorer.";
    var ver = getInternetExplorerVersion();
    if (ver > -1) {
        if (ver >= 8.0)
            msg = "You're using a recent copy of Windows Internet Explorer."
        else
            msg = "You should upgrade your copy of Windows Internet Explorer.";
    }
    alert(msg);
}

function isIE8orlower() {
    var msg = "0";
    var ver = getInternetExplorerVersion();
    if (ver > -1) {
        if (ver >= 9.0)
            msg = 0
        else
            msg = 1;
    }
    return msg;
    // alert(msg);
}