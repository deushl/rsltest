var responsiveEmbed = function() {
    return {
            oHead:document.head||document.getElementsByTagName('head')[0],
            cCSS:[
                '.responsive-embed-wrapper {',
                  'position:relative; width:100%; max-width:100%;',
                '}',
                '.responsive-embed {',
                  'position:absolute; top:0px; left:0px; width:100%; height:100%;',
                '}'
            ].join(''),
            oSettings : {
                objects: ['iframe'],
                urls: ['www.youtube.com']
            },
            
            F_setCSS: function() {
                var oD=document.createElement('div');
                oD.innerHTML='<style>'+responsiveEmbed.cCSS+'</style>';
                responsiveEmbed.oHead.appendChild(oD.childNodes[0]);
            },
            F_embed_ratio: function(nH,nW) {
                return ((parseInt(nH,10)/parseInt(nW,10))*100)+'%';
            },
            F_search: function(cSearch) {
                return new RegExp('^(https?:)?\/\/(?:'+responsiveEmbed.oSettings.urls.join('|')+').*$','i').test(cSearch);
            },
            F_responsive: function(oItem) {
                if(!!oItem.getAttribute('data-diy-responsive-embed')||!responsiveEmbed.F_search(oItem.src)&&!responsiveEmbed.F_search(oItem.data)) {
                    return;
                }
                
                var oWrapper=document.createElement('div');
                oWrapper.className += 'responsive-embed-wrapper';
                oWrapper.style.paddingTop=responsiveEmbed.F_embed_ratio(oItem.height, oItem.width);
                oItem.className+=(oItem.className ? ' ' : '')+'responsive-embed';
                oItem.setAttribute('data-diy-responsive-embed', 'embed-set');
                oItem.parentNode.insertBefore(oWrapper, oItem);
                oWrapper.appendChild(oItem);
            },
            
            F_start: function(oExtra) {
                for(var k in oExtra) {
                    responsiveEmbed.oSettings[k]=oExtra[k];
                }
                
                var arEls=document.querySelectorAll(responsiveEmbed.oSettings.objects.join());
                nEl=arEls.length;
                
                if(nEl>0){
                    responsiveEmbed.F_setCSS();
                    while(nEl--) {
                        responsiveEmbed.F_responsive(arEls[nEl]);
                    }
                }
            }
    }
                
}();

/*
F_start(object_settings)

object_settings: object [objects,urls]:
objects: array e. g. ["iframe","object"]
urls: array e. g. ["www.youtube.com","www.youtube-nocookie.com","player.vimeo.com"]
*/
responsiveEmbed.F_start({urls:["www.youtube.com","www.youtube-nocookie.com","player.vimeo.com"]});