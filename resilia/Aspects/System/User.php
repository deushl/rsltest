<?php

namespace Resilia\Aspects\System;

use Illuminate\Support\Facades\DB;
use Resilia\Tools\Tools;
use Resilia\Aspects\System\System;
use Illuminate\Support\Facades\Log;

class User
{
    public static function handshake($cUName, $cUPW) {
        $nUID = self::userExist($cUName);

        if(!$nUID) {
            System::setError("USR_UNKNOWN");
        } else {
            self::setCurrentUserData($nUID);

            if(!self::validateCredentialas($cUName, $cUPW)) {
                System::setError("PW_WRONG");
            } else {
                if(!self::isUserActive()) {
                    System::setError("USR_INACTIVE");
                } else {
                    if(!self::setSession($nUID)) {
                        System::setError("SID_NOT_CREATED");
                    }
                }
            }
        }
        
        if(System::getErrorCount()) {
            return null;
        }
        
        return array(array('sid' => config('app.sid')));
    }

    
    public static function validateSession($arParms=array()){
        $cSID = config('app.sid') ?? '';

        if(!self::isSessionValid($cSID)) {
            System::setError("INVALID_SESS");
        } else {
            if(!self::isUserActive()) {
                System::setError("USR_INACTIVE");
            } 
            elseif(!self::updateSession($cSID, 'comm'  ,$arParms)) {
                System::setError("SID_NOT_UPDATED");
            }
            
        }
        
        if(System::getErrorCount()) {
            return false;
        }
        
        return array(array('sid'=>$cSID));
    }

    public static function endSession($arParms=array()){
        $cD=date("Y-m-d H:i:s");
        $cSID = config('app.sid') ?? '';

        if($cSID) {
            $cInvalidSID = self::invalidSessionFormat($cSID);

            DB::table('sys.session_log')
            ->insert([
                'sid' => $cSID,
                'command' => '',
                'ip' => $_SERVER["REMOTE_ADDR"]
            ]);

            DB::table('sys.session')
                ->where("sid", $cSID)
                ->update([
                    'last_up' => $cD,
                    'sid' => $cInvalidSID
                ]);
            
            System::setCookie($cInvalidSID);

            Log::debug("-SID ended : {$cSID}-");
            
            return array(array(true));
        }
        
        return null;
    }
    public static function renewSession($cPW){  
        $cSID = config('app.sid') ?? '';

        if(! $cSID) {
            return null;
        }

        $arR = json_decode(
            DB::table('sys.session')
                ->join('sys.user', 'user.idr', '=', 'session.uid')
                ->select("user.username")
                ->where("sid", $cSID)
                ->orWhere('sid', self::invalidSessionFormat($cSID))
                ->get()
                ->toJson()
            , true);

        if($arR && count($arR)) {
            return self::handshake($arR[0]["username"], $cPW);
        }

        return null;
    }
    protected static function isSessionValid($cSID) {
        if(!$cSID ) {
            return false;
        }

        if(substr($cSID, 0, 6) == "000000") {
            return false;
        }

        $cD=date("Y-m-d H:i:s");
        $arConf = config('app.conf.api');
        
        return true;
        

    }
    protected static function updateSession($cUUID, $cComm, $arParms) {
        $cD=date("Y-m-d H:i:s");
        
        DB::table('sys.session')
            ->where("sid", $cUUID)
            ->update([
                'last_up' => $cD
            ]);
        
        $cPO = json_encode($arParms);

        DB::table('sys.session_log')
        ->insert([
            'sid' => $cUUID,
            'command' => $cComm,
            'po' => $cPO,
            'ip' => $_SERVER["REMOTE_ADDR"]
        ]);

        return true;
    }

    protected static function setSession($cUID){
        $cD = date("Y-m-d H:i:s");
        $cSID = Tools::UUID_v4();

        DB::table('sys.session')
            ->upsert([
                'uid' => $cUID,
                'sid' => $cSID,
                'last_up' => $cD
            ],
            ['uid', 'sid'],
            ['last_up']);

        DB::table('sys.session_log')
        ->insert([
            'sid' => $cSID,
            'command' => 'usr_hs',
            'ip' => $_SERVER["REMOTE_ADDR"]
        ]);
        
        config(['app.sid' => $cSID]);

        Log::debug("-SID set for : $cUID | $cSID-");

        return true;
    }
    
    public static function userExist($cUName){
        $arR = json_decode(
            DB::table("sys.user")
                ->select("idr")
                ->where("username" , $cUName)
                ->get()
                ->toJson(),
            true);

        if(!count($arR)) {
            Log::error("-Unexistent user : $cUName -");
            return false;
        }
        
        return $arR[0]["idr"];
    }
    
    protected static function isUserActive($cUID=null){
        if(!$cUID) {
            return self::getCurrentUserProperty("active");
        }
        
        $arR = json_decode(
            DB::table("sys.user")
                ->select("active")
                ->where("idr" , $cUID)
                ->get()
                ->toJson(),
            true);

        if(!count($arR)) {
            Log::error("-Unexistent user ID: $cUID -");
            return false;
        }
        
        return $arR[0]["active"];
    }
    
    protected static function validateCredentialas($cUName, $cUPW){
        $arR = json_decode(
            DB::table("sys.user")
                ->select("password")
                ->where("username" , $cUName)
                ->get()
                ->toJson(),
            true);

        if(!count($arR) || !self::validateHash($cUPW, $arR[0]["password"])) {
            Log::error("-Incorrect pw for : $cUName -");
            return null;
        }

        return true;
    }
    
    public static function setCurrentUserData($nIdr=null) {
        $cSID = config('app.sid') ?? '';

        if($nIdr) {
            $arUserData = self::getSessionData(null,$nIdr);
        } else {
            $arUserData = self::getSessionData($cSID);
        }

        config(['app.user.data' => $arUserData]);
    }
    
    public static function getCurrentUserProperty($cProperty) {
        $arUserData = config('app.user.data') ?? [];

        if(!count($arUserData)) {
            self::setCurrentUserData();
            $arUserData = config('app.user.data');
        }

        if(!$arUserData[$cProperty]) {
            Log::debug("Unrecoverable user property: $cProperty");
        }
        
        return $arUserData[$cProperty];
    }
    
    public static function getUserProperty($nID, $cProperty) {
        $arR = self::getSessionData(null, $nID);

        if($arR) {
            return $arR[$cProperty];
        }
        
        Log::debug("Unrecoverable user property: $nID | $cProperty");

        return null;
    }
    
    public static function getSessionData($cSID, $nID=null) {
        if($nID) {
            $arR = json_decode(
                DB::table("sys.user")
                    ->select("user.*")
                    ->where("idr", $nID)
                    ->get()
                    ->toJson(),
                true
            );
        } elseif($cSID) {
            $arR = json_decode(
                DB::table("sys.user")
                    ->join('sys.session', 'user.idr', '=', 'session.uid')
                    ->select("user.*")
                    ->where("sid", $cSID)
                    ->get()
                    ->toJson(),
                true);
        }

        if(!$arR || !count($arR)) {
            Log::debug("Unrecoverable session data");

            return null;
        }

        return $arR[0];
    }
    
    protected static function hashPW($cPW) {
        return password_hash($cPW, PASSWORD_BCRYPT);
    }

    protected static function validateHash($cWord, $cHash) {
        return password_verify($cWord, $cHash);
    }

    protected static function invalidSessionFormat($cSessionID) {
        return substr_replace($cSessionID, "000000", 0, 6);
    }

    public static function getAvatar() {
        $arConf = config('app.conf.core');

        $cImg = $arConf["avt"]["dir"].'/'. $arConf["avt"]["default"];

        return $cImg;
    }
}