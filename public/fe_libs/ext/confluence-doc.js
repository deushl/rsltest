let Fconfluence_doc = function (cMID,cCID) {
    $(cMID+cCID+" .confld").each(function() {
        if(!Viewer.FisAutoWire($(this))) {
            return null;
        }

        let cPH = $(this).attr("placeholder"),
            bNoEmptySel = $(this).attr('data-bhempty-sel')=="false",
            cFields = $(this).attr('data-bh-confld-fields'),
            nMaxRes = parseInt($(this).attr('data-bh-confld-max')),
            nDelay = parseInt($(this).attr('data-bh-confld-delay')),

            formatRepo = function(oDoc) {console.log(oDoc);
                if (oDoc.loading) {
                    return oDoc.text;
                }

                let arSpc = oDoc.content._expandable.space.split('/'),
                    cSpc = arSpc.pop(),
                
                    $oContainer = $(
                    "<div class='select2-result-doc'>" +
                    "<div class='select2-result-doc__data'>" +
                        "<div class='select2-result-doc__space'>" + cSpc + "</div>" +
                        "<div class='select2-result-doc__title'>" + cSpc + "</div>" +
                    "</div>" +
                    "</div>"
                );
                
                return $oContainer;
            },
            formatRepoSelection = function(oDoc) {
                if (oDoc.title) {
                    let arSpc = oDoc.content._expandable.space.split('/'),
                        cSpc = arSpc.pop(),
                        arURL = oDoc.content._links.webui.split('/'),
                        cURL = arURL.pop().join('/'),
                        $oContainer = $(
                        "<div class='select2-result-doc'>" +
                        "<div class='select2-result-doc__data'>" +
                            "<div class='select2-result-doc__space'>" + cSpc + "</div>" +
                            "<div class='select2-result-doc__title'><a rel='external' target='_blank' href='" + _BH_FESets.integrations.confluence.site_url + "/wiki/" + cURL +"'>" + oDoc.title + "</a></div>" +
                        "</div>" +
                        "</div>"
                    );
                    
                    return $oContainer;
                }
                
                return oDoc.text;
            },

            oOp = {
                placeholder: cPH,
                width: 'style',
                allowClear: !bNoEmptySel&&cPH,
                minimumInputLength: 3,
                multiple: true,

                templateResult: formatRepo,
                templateSelection: formatRepoSelection,

                ajax: {
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', "Bearer " + _BH_FESets.integrations.confluence.api_token);
                    },

                    url: _BH_FESets.integrations.confluence.base_url + "search",

                    dataType: 'json',
                    
                    delay: nDelay == NaN ? 300 : nDelay,
                    cache: true,

                    data: function (params) {
                        let nMx = isNoE(nMaxRes) || isNaN(nMaxRes) ? 10 : nMaxRes;
                        return {
                            cql: "title~" + '"' + params.term + '*"',
                            //fields: "summary,issuetype" + (isNoE(cFields) ? "" : ',' + cFields),
                            limit: nMx,
                            start: params.page ? params.page * nMx : 0
                        }
                    },

                    processResults: function (data, params) {console.log(data);console.log(params);
                        params.page = params.page || 1;
                    
                        return {
                            results: data.results,
                            pagination: {
                            more: (params.page * data.limit) < data.totalSize
                            }
                        }
                    }
                }
            }
            
        $(this).select2(oOp);
        
    });
}

Viewer.FsetWireUp("confld", Fconfluence_doc);