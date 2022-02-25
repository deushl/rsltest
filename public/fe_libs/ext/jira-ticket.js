let Fjira_ticket = function (cMID,cCID) {
    $(cMID+cCID+" .jirat").each(function() {
        if(!Viewer.FisAutoWire($(this))) {
            return null;
        }

        let cPH = $(this).attr("placeholder"),
            bNoEmptySel = $(this).attr('data-bhempty-sel')=="false",
            cFields = $(this).attr('data-bh-jirat-fields'),
            nMaxRes = parseInt($(this).attr('data-bh-jirat-max')),
            nDelay = parseInt($(this).attr('data-bh-jirat-delay')),

            oOp = {
                placeholder: cPH,
                width: 'style',
                allowClear: !bNoEmptySel&&cPH,
                minimumInputLength: 3,
                multiple: true,

                templateResult: MC.jirat_format_issue,
                templateSelection: MC.jirat_format_issue_selection,

                ajax: {
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', "Basic " + _BH_FESets.integrations.jira.api_token);
                    },

                    url: _BH_FESets.integrations.jira.base_url + "search",

                    dataType: 'json',
                    
                    delay: nDelay == NaN ? 300 : nDelay,
                    cache: true,

                    data: function (params) {
                        let nMx = isNoE(nMaxRes) || isNaN(nMaxRes) ? 10 : nMaxRes;
                        return {
                            jql: "summary~" + '"' + params.term + '*"',
                            fields: "summary,issuetype" + (isNoE(cFields) ? "" : ',' + cFields),
                            maxResults: nMx,
                            startAt: params.page ? params.page * nMx : 0
                        }
                    },

                    processResults: function (data, params) {console.log(data);console.log(params);
                        params.page = params.page || 1;

                        data.issues.forEach(function (i) {
                            i.term = params.term;
                        });
                    
                        return {
                            results: data.issues,
                            pagination: {
                            more: (params.page * data.maxResults) < data.total
                            }
                        }
                    }
                }
            }
            
        $(this).select2(oOp);
        
    });
}

MC["jirat_format_issue_selection"] = function(oIssue, p) {console.log(oIssue);console.log(p);
    if ((oIssue.fields && oIssue.fields.summary) || oIssue.id) {
        let cIURL, cKey, cSummary;

        if ((oIssue.fields && oIssue.fields.summary)) {
            cIURL = oIssue.fields.issuetype.iconUrl; 
            cKey = oIssue.key;
            cSummary = oIssue.fields.summary;
        } else {
            let oM = MC.FMDE_get_p('C', "__jira_ticket_" + oIssue.id);

            cIURL = oM.fields.issuetype.iconUrl; 
            cKey = oM.key;
            cSummary = oM.fields.summary;
        }

        
        let $oContainer = $(
            `<div class='select2-result-issue'>
                <div class='select2-result-issue__icon'><img src='${cIURL}' /></div>
                <div class='select2-result-issue__data'>
                    <div class='select2-result-issue__key'><a rel='external' target='_blank' href='${_BH_FESets.integrations.jira.site_url}/browse/${cKey}'>${cKey}</a></div>
                    <div class='select2-result-issue__summary'>${cSummary}</div>
                </div>
                </div>`
        );

        return $oContainer;
    }
    
    return oIssue.text;
}

MC["jirat_format_issue"] = function(oIssue) {console.log(oIssue);
    if (oIssue.loading) {
        return oIssue.text;
    }
    
    let reR =  new RegExp(oIssue.term, 'gi'),
        $oContainer = $(
        "<div class='select2-result-issue'>" +
        "<div class='select2-result-issue__icon'><img src='" + oIssue.fields.issuetype.iconUrl + "' /></div>" +
        "<div class='select2-result-issue__data'>" +
            "<div class='select2-result-issue__key'>" + oIssue.key + "</div>" +
            "<div class='select2-result-issue__summary'>" + oIssue.fields.summary.replace(reR, "<b>$&</b>") + "</div>" +
        "</div>" +
        "</div>"
    );
    
    return $oContainer;
}

MC["jirat_update_sel"] = function (oSel, cID) {
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + _BH_FESets.integrations.jira.api_token);
        },

        url: _BH_FESets.integrations.jira.base_url + "issue/" + cID,

        type: 'GET'
    }).then(function (oIssue) {//console.log(oIssue);
        let oThis = {},
            oOption = new Option(oIssue.id, oIssue.id, true, true);

            oOption = $(oOption);

            oOption.html(oIssue.fields.issuetype.iconUrl + '|' + oIssue.key +'|' + oIssue.fields.summary); //console.log(oOption.outerHTML());

        oThis["__jira_ticket_" + oIssue.id] = oIssue;
        MC.FMDE_set_p('C', oThis);
        oSel.append(oOption.outerHTML());

        oSel.trigger({
            type: 'select2:select',
            params: {
                data: oIssue
            }
        });
        
    });
}

Viewer.FsetWireUp("jirat", Fjira_ticket);