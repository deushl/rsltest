    $().ready(function() {
        Viewer.bDefaultMessagesOnActionDone=true;

        MC.Fset_mod_p("products",{init:true});

        MC.Fset_actions({products:{r:"products", v:"r"},
            swclick:{r:"FSWClick", v:"r"}
        });

        MC.Fset_mod_actions("products",{
            get:{r:"products", v:"r"},
            refresh:{r:"notifications", v:"r"}
            }
        );

        ////////////////////////////////////////////////////////////////////////

        MC.UpdateTblSoftIns = function(oTbl, oData, nOffset=1) {
            $.each(oData, function(ni, vi) {
                $(".bh-drows-add", oTbl).trigger("click");

                if(vi.def) {
                    $.extend(vi, vi.def);
                }
                
                $.each(vi, function(k,v) {
                    if(k=="idr") {
                        $("tbody tr:last-of-type", oTbl).attr("idr", v);
                        $("tbody tr:last-of-type button", oTbl).attr("idr", v);
                    } else {
                        let oControl = $("tbody tr:nth-last-of-type(" + nOffset + ") [name='" + k + "']", oTbl);

                        if(oControl.hasClass("chips")) {
                            let oChip = M.Chips.getInstance(oControl);

                            v.forEach(item => oChip.addChip({
                                    tag: item
                                })
                            );
                            
                        } else {
                            oControl.val(v);

                            if(oControl.is("select")) {
                                oControl.trigger("change");
                            }
                        }
                        
                    }
                });
            });
        }
        
        ////////////////////////////////////////////////////////////////////////

        MC.Module.on("display,re-display",
            "*",
            function(cMCID,cTBID) {
                $(`${cMCID} .focusondisplay`).first().focus();
            }
        );

        MC.Module.on("action",
            "potrack_line_c",
            function(cMCID, cTBID) {
                let oD = MC.FMDE_get_p('C','ws_data'),
                    cFID = $(cMCID + " form").attr("id");

                if(oD[cFID]['mxData'] && oD[cFID]['mxData'][1] && oD[cFID]['mxData'][1]['line_num']) {
                    MC.FMDE_action_values('C', {line_num: oD[cFID]['mxData'][1]['line_num']});
                }
                
            },
        "save");


        MC.Router.on("ajax_done", "my_module", function(cMCID,cTBID) {
            return {evgoon:false};
        },"get_relrecs");

        MC.Module.on("data_reloaded", "my_module", function(cMCID,cTBID) {
            MC.FMDE_module_return({new_att: $arIDs} );
        },"get");

        MC.Module.on("action","my_module",function(cMCID, cTBID) {
            let oMV = MC.FMDE_action_values();

            MC.FMDE_module_values('C', oMV);
        }, "add");

        MC.Module.on("action","my_module",function(cMCID,cTBID) {
            MC.FMDE_action_values('C',{fid:MC.FMDE_get_p('C','prnt_kv')});
        },"save");

        MC.Module.on("iaction","my_module,my_module2",function(cMCID, cTBID) {
            MC.FMDE_action_values('C',{__condval: 44});
        }, "contacts,providers");

        MC.Module.on("action_done","my_module",function(cMCID, cTBID) {
            console.log('done');
        }, "submit");

        MC.Module.on("show","my_module,my_module2",function(cMCID, cTBID) {
            console.log('on show');
        });
        
        MC.Module.on("display","my_module,my_module2",function(cMCID, cTBID) {
            console.log('on display');
        });
        
        MC.Module.on("loaded","my_module,my_module2",function(cMCID, cTBID) {
            console.log('on loaded');
        });

        ////////////////////////////////////////////////////////////////////////

        MC.FMCron_add(
            "products",
            300000,
            function(cMCID) {
                $(cMCID + "  [an='refresh']").click();
                
            }
        );
        
        MC.Fstart_viewer();
        MC.FMCache_state(false);
    });