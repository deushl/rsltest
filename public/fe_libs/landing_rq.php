<?php
require("bh/bh_rq.php");

$arAppReqConfig=array (
          'paths' => 
              array (
              'app_fe' => 'landing_fe.js?noext'
              ),
          'shim' => 
              array (
                'app_fe' =>  array('bh_fw'),
                )
        );
        
$arAppReq=array("app_fe");
        
        
echo BH_RequireOutput($arAppReqConfig,$arAppReq,true); //bCBuster true to avoid cache
?>
