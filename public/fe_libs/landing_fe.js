    $().ready(function() {
        Viewer.bDefaultMessagesOnActionDone=false;

        MC.Fset_mod_actions("login",{login:{r:"login", v:"c"}, recover:{r:"FChangeStep", v:""}, recover_pw:{r:"pw_recover", v:"c"}});
        
        ////////////////////////////////////////////////////////////////////////
        
        MC.Module.on("action_done","login",function(cMID,cTBID) {
            //var cCH=History.getHash();
            window.location.href = "/mapp/";
        },"login");

        MC.Module.on("display,re-display", "*", function(cMCID,cTBID) {
            $(`${cMCID} .focusondisplay`).first().focus();
        });
        
        ////////////////////////////////////////////////////////////////////////
        
        MC.Fstart_viewer();
        MC.FMCache_state(false);
    });