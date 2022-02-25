<?php
//Initial approach where the FW is only retrieven when  session is stablished.
//This approach is not useful when the concept of a landing page is present. also, it doesn't seem to offer an enahced security, since the idea is to have public tet accounts
//Maybe making an active session an option for the FW is a better approach. However, it will require some good justification.
/*
chdir('../../');
require 'be_libs/app_api.php';

try {
    $oAPI= new AppAPI();
} catch(Exception $e) {
    echo "NULL_API_OBJECT:$e";
}

if($_COOKIE['bhsck']&&$oAPI) {
    $arRealGET=BH_Tools::getRealGET($argv);
    $arRealGET['withheader']=1;
    $arRealGET['__autock']=1;
    $arRealGET["sid"]=$_COOKIE['bhsck'];
    $oAPI->BH_execute('bh_usr_vs', $arRealGET);
    
    if($oAPI->array[0]["_bExec"]&&$oAPI->array[1]) {
        //@TODO obfuscate
        echo file_get_contents("fe_libs/bh/bh_c.js");
        echo file_get_contents("fe_libs/bh/bh_v.js");
        echo file_get_contents("fe_libs/bh/bh_fe.js");

    }
}
*/

//@TODO obfuscate
echo file_get_contents("bh_c.jx");
echo file_get_contents("bh_v.jx");
echo file_get_contents("bh_fe.js");

?>
