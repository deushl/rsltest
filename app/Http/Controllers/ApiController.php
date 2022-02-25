<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Resilia\Tools\Tools;
use Resilia\Aspects\System\System;
use Resilia\Aspects\System\User;

class ApiController extends Controller
{
    public function loadModule($bhmid, Request $oRequest) {
        $arConf = config('app.conf.core');

        $cModule = System::loadModule(
            array(
                "_mid"=> $bhmid
                )
            );
        
        if($cModule) {
            echo $cModule;

            return true;
        } else {
            return false;
        }
    }

    public function loadModuleDescription(Request $oRequest) {
        $arR = System::loadModuleDescription(
            array(
                "_mid"=> $oRequest->input('_bhmid')
                )
            );

        return $arR;
    }

    public function login(Request $oRequest) {
        $arConf = config('app.conf.api');

        $arR = User::handshake($oRequest->input("_ur"), $oRequest->input("_cs"));

        if(!$arR || !count($arR)) {
            return null;
        } else {
            System::setCookie($arR[0]["sid"]);

            return $arR;
        }
    }

    public function logout() {
        $arR = User::endSession();

        return $arR;
    }

    public function logrenew(Request $oRequest) {
        $arR = User::renewSession($oRequest->input("_cs"));

        return $arR;
    }

    public function getProducts() {
        $arR = json_decode(
            DB::table("public.products")
                ->join('public.cat_event_type', 'cat_event_type.idr', '=', 'products.event')
                ->selectRaw("cat_event_type.name as event, products.name, products.comments, products.idr, 1 as isbtn")
                ->get()
                ->toJson(),
            true);

        return $arR;
    }
    
    public function getNotifications() {
        $arR = json_decode(
            DB::table("public.notifications")
                ->selectRaw("*")
                ->where("viewed", "=", false)
                ->get()
                ->toJson(),
            true);

        foreach($arR as $k => $i) {
            System::setFENot($i['content'], null, $i['type'], $i['level']);
        }
        
        return null;
    }

    public function getCatalog(Request $oRequest) {
        $arConf = config('app.conf.api');
        $arParms = $oRequest->input();

        if(!$arParms["__srccat"]) {
            System::setError('DB_NO_TABLE', '', "getCatalog");
            return null;
        }

        $arR = json_decode(
            DB::table("{$arParms["__srccat"]}")
                ->selectRaw("idr as d, name as t")
                ->where("active", '1')
                ->orderBy("idr")
                ->get()
                ->toJson(),
            true
        );

        return $arR;
    }




}
