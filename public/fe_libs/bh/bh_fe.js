    $().ready(function() {

        MC.Fset_mod_p("users",{init:true});
        MC.Fset_mod_p("user_c",{init:true});
        MC.Fset_mod_p("user_u",{init:true});
        MC.Fset_mod_p("chpw",{init:true});
        MC.Fset_mod_p("profile",{init:true}); 
        
        MC.Fset_actions({
            tasks_prev:{r:"gtp", v:"r"},
            bm_prev:{r:"bmp", v:"r"},
            tasks:{r:"Fside_tasks", v:"r"},
            bh_module_back:{r:"_BH_MBack", v:"r"},
            "bh-ulock":{r:"logout", v:"r"},
            "bh-ugb":{r:"logout", v:"r"},
            "bh-urs":{r:"logrenew", v:"c"},
            "bh-stack-notifications":{r:"_BH_Not", v:"r"},
            "bh-uprofile":{r:"profile", v:"r"}
        });
        
        
        MC.Fset_mod_actions("cnf_p",{edit_avt:{r:"edit_avt", v:"r"}, get_avt:{r:"get_avt", v:"r"} });
        MC.Fset_mod_actions("edit_avt",{edit:{r:"set_avt", v:"r"} });
        
        MC.Fset_mod_actions("users",{add:{r:"user_c", v:"r"}, edit:{r:"user_u", v:"r"}, get:{r:"bhdbr_es", v:"r"}, det:{r:"user_r", v:"r"} });
        MC.Fset_mod_actions("user_c",{add:{r:"bh_usr_c", v:"r"}, catalog:{r:"bhdbcat_r", v:"r"}, grants_n:{r:"bh_dngrants_r", v:"r"}, toggle_grants:{r:"FToggleGrants", v:"r"} });
        MC.Fset_mod_actions("user_r",{add:{r:"usr_c", v:"r"} });
        MC.Fset_mod_actions("user_u",{get:{r:"bhdbr_r", v:"r"}, save:{r:"bh_usr_u", v:"r"}, resetpw:{r:"user_pwr", v:"r"}, catalog:{r:"bhdbcat_r", v:"r"}, toggle_grants:{r:"FToggleGrants", v:"r"} });
        
        MC.Fset_mod_actions("profile",{get:{r:"bh_cusr_r", v:"r"}, reset:{r:"chpw", v:"r"}, edit:{r:"bh_cusr_u", v:"r"} });
        MC.Fset_mod_actions("chpw",{get:{r:"bh_cusr_r", v:"r"} ,update:{r:"bh_cusrp_u", v:"r"} });
        
        MC.FDLinking_state(true,{exposed:true});
        //MC.Fstart_viewer();
        MC.FMCache_state(true);
        
        //////////////////////////////////////////////////////////////////////////
        MC["FChangeStep"]=function(cCID,cTBID) {
            let cS=$(cCID+' #'+cTBID).attr("source"),
                cT=$(cCID+' #'+cTBID).attr("target");

            $(`${cCID} #${cS}`).slideUp();
            $(`${cCID} #${cT}`).slideDown();

            $(`${cCID} #${cT} .focusondisplay`).first().focus();
        }
        
        MC["Fcheckall"]=function(cCID,cEID) {
            var oT=$(cCID+' #'+$(cCID+' #'+cEID).attr('target')+" table").dataTable(),bSt=$(cCID+" #"+cEID).bootstrapSwitch('state');
            $(".sw-button", oT.$('tr', { "filter": "applied" } )).each(function() {
                $(this).bootstrapSwitch('state',bSt,true);
            } );
            MC.Fclc_bill_pay(cCID,cEID);
        };
        
        MC["FToggleGrants"]=function(cMCID,cTBID) {
            var oGrp=$(cMCID+' [name="group_id"]').select2('data');
            if(oGrp.id==1000) {
                $(cMCID+" #grnts-div").slideDown(_BH_FESets.slide_speed);
            } else {
                $(cMCID+" #grnts-div").slideUp(_BH_FESets.slide_speed);
            }
        }

        MC["_BH_MBack"]=function(cMCID,cTBID) {
            MC.Fload_module_p();
        }

        MC["_BH_Not"]=function(cMCID,cTBID) {
            MsgToUsr.notifications.show();
        }

        //---------------------------------------------------------------------------------------------------        
        
        
        //------------------------------------------------------------------------------------------
        MC.Router.on("ajax_done","user_u",function() {
            MsgToUsr.Fresult_msg("33", "");
        },"edit");
        MC.Router.on("ajax_done","user_u",function() {
            MsgToUsr.Fresult_msg("33", "");
        },"reset");
        MC.Router.on("ajax_done","user_c",function() {
            MsgToUsr.Fresult_msg("33", "");
        },"add");
        
        /*MC.Module.on("action","user_u,user_c",function(cMCID,cTBID) {
            var cS=$(cMCID+' #'+cTBID).attr("source"),cFld=$(cMCID+' #'+cS+' .bh3ma').attr("data-bh3ma-source-field"),
            o3ma=MC.FMDE_get_p('C','o3ma-'+cFld),oP={};
            if(!isNoE(o3ma)) {
                if($(cMCID+' #'+cS+' .bh3ma').is(":visible")) {
                    oP[cFld]=isNoE(o3ma.data[0]) ? JSON.stringify(o3ma.data, null, null) : JSON.stringify(o3ma.data[0], null, null);
                } else {
                    oP[cFld]=' ';
                }
                
                MC.FMDE_action_values('C',oP);
            }
        },"add,edit");
        
        
        MC.Module.on("wired","user_u",function(cMCID) {
            var oGrp=$(cMCID+' [name="group_id"]').select2('data');
            if(oGrp.id==1000) {
                $(cMCID+" #grnts-div").show();
            }
        });*/
        //------------------------------------------------------------------------------------------
        MC.BHA.on("action_done","*",function(cMCID,cTBID) {
            MsgToUsr.Falert_modal_hide(MsgToUsr.CISModalID,false);
            MsgToUsr.Falert_modal_hide(MsgToUsr.ClockModalID,false);
        },"bh-urs");
        MC.BHA.on("action_done","*",function(cMCID,cTBID) {
            MsgToUsr.Flock_screen();
        },"bh-ulock");
        MC.BHA.on("action_done","*",function(cMCID,cTBID) {
            window.location.href = "/";
        },"bh-ugb");
        //------------------------------------------------------------------------------------------
    });