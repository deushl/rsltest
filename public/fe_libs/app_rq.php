<?php
require("bh/bh_rq.php");

$arAppReqConfig=array (
            'paths' => 
                array (
                'app_fe' => 'app_fe.js?noext'
                ),
            'shim' => 
                array (
                'app_fe' =>  array('bh_fw'),
                ),
            'waitSeconds' => 30
        );
        
$arAppReq=array(/*"bh_maps",*/"app_fe");
        
        
echo BH_RequireOutput($arAppReqConfig,$arAppReq,true); //bCBuster true to avoid cache
?>
