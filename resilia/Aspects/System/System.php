<?php

namespace Resilia\Aspects\System;

use Illuminate\Support\Facades\DB;
use Resilia\Tools\Tools;
use Illuminate\Support\Facades\Log;

class System
{
    public static function loadModule($arParms=array()) {
        $cMID = $arParms['_mid'];
        $arModules = config('app.modules') ?? [];
        $arConf = config('app.conf.api');

        if(!$arModules[$cMID]) {
            if( self::setModuleRecord($cMID)) {
                $arModules = config('app.modules');
            }
        }
        
        if(!$arModules[$cMID] || !$arModules[$cMID]["markup"]) {
            if($arModules[$cMID] && !$arModules[$cMID]["markup"]) {
                self::setError('ERROR_MDL_EMPTY_MRKP', null, "MID:$cMID");
            }
            
            if($arConf["404on_mdl_nt_fnd"]) {
                Log::debug("-Unexistent module: $cMID");
                header ("HTTP/1.0 404 Not Found");
                exit;
            } else {
                return false;
            }
        }

        return $arModules[$cMID]["markup_parsed"];
        
        echo $arModules[$cMID]["markup_parsed"];
        
        exit;
    }

    public static function loadModuleDescription($arParms=array()) {
        $cMID = $arParms['_mid'];
        $arModules = config('app.modules') ?? [];
        
        if(!$arModules[$cMID]) {
            self::setModuleRecord($cMID);
            $arModules = config('app.modules');
        }
        
        $arMP = json_decode($arModules[$cMID]["parameters_parsed"], true);
        $arMAs = is_array($arMP["modatt"]) ? $arMP["modatt"] : array();
        
        return array(array(
            'mod_name'=> isset($arMAs["name"]) ? $arMAs["name"] : self::getPhrase("DFLT_MODULE_NAME", "FEALE_"),
            'mod_des'=> isset($arMAs["description"]) ? $arMAs["description"] : self::getPhrase("DFLT_MODULE_DESCR", "FEALE_")
            ));
    }

    private static function parseModule($cMID) {
        $arModules = config('app.modules') ?? [];

        $arModules[$cMID]["markup_parsed"] = self::trimMarkup(self::parseMarkup($arModules[$cMID]["markup"]));

        $arModules[$cMID]["parameters_parsed"] = self::parseMarkup($arModules[$cMID]["parameters"]);

        config(['app.modules' => $arModules]);
    }
    public static  function trimMarkup($cMU) {
        /* A typical characteristic of inline (e .g. inline-block) elements is that they respect the whitespace in the markup.
        This explains why a gap of space is generated between such elements.
        The visual issue can be solved trimming unnecessary spaces and \r from the markup or setting a parent element to 'display: flex';
        This function wont work propwrly with JS code if the lines doesn't end with delimiters
        */
        return preg_replace("/\s+/", ' ', preg_replace("/^\s+|\R+|\s+$/m", '', $cMU));
    }

    public static function setModuleRecord($cMID) {
        $arConf = config('app.conf.api');

        $arR = json_decode( 
            DB::table("sys.module")
                ->where("mid", $cMID)
                ->get()
                ->toJson(),
            true);
        
        if(!count($arR)) {
            self::setError('MODULEREC_NOT_FOUND', null, $cMID);
            
            return false;
        }

        if($arConf["module_storage_type"]) {
            $cFile = $arConf["module_dir"] . $cMID . $arConf["module_extension"];

            if(!file_exists($cFile)) {
                self::setError('MODULEFILE_NOT_FOUND', null, $cMID);
    
                return false;
            }
    
            $arR[0]["markup"] = file_get_contents($cFile);
        }

        $arModules = config('app.modules') ?? [];        
        $arModules[$cMID] = $arR[0];
        config(['app.modules' => $arModules]);
        
        self::parseModule($cMID);
        
        return true;
    }

    private static function getPhrase($cEID,$cENS='',$bFullNS=true, $bParsing=true, $oP=null) {
        $cENS = $cENS ? strtoupper($cENS) : "SN_";
        $arPhrases = config('app.phrases') ?? [];
        $cLanguage = config('app.language');

        if(!$arPhrases[$cENS][$cEID]) {
            $arR = json_decode(
                DB::table('sys.phrase')
                    ->join('sys.language', 'phrase.lang_id', '=', 'language.idr')
                    ->select('phrase.*')
                    ->where('phrase.namespace', $cENS)
                    ->where('language.ISO6391', $cLanguage)
                    ->get()->toJson()
                , true);
                
            if(!$arR) {
                if($bFullNS) {
                    Log::debug("-Namesapce not found: [$cENS] [$cEID] [$cLanguage]-");
                } else {
                    Log::debug("-Phrase not found: [$cENS] [$cEID] [$cLanguage]-");
                }

                return false;
            } else {
                foreach($arR as $k=>$v) {
                    $arPhrases[$v["namespace"]][$v["phrase"]]["text"] = $bParsing ? self::parseMarkup($v["text"], $oP) : $v["text"];
                    $arPhrases[$v["namespace"]][$v["phrase"]]["value"] = $bParsing ? self::parseMarkup($v["value"]) : $v["value"];
                }

                config(['app.phrases' => $arPhrases]);

                if(!$arPhrases[$cENS][$cEID]) {
                    Log::debug("-Phrase not found: [$cENS] [$cEID] [$cLanguage]-");

                    return false;
                }
            }
        }

        return $arPhrases[$cENS][$cEID]["text"];
    }
    public static function setError($cEID, $cENS='', $cLog='', $nECode=500) {
        $cENS = $cENS ? $cENS : "SN_";
        $cPhrase = self::getPhrase($cEID, $cENS);
        $arErrors = config('app.error_messages') ?? [];
        $arConf = config('app.conf.api');
        $cLanguage = config('app.language');

        if($cPhrase) {
            $arErrors[] = array("msg"=>$cPhrase,"type" => $arConf["error_dflt_type"], "lvl" => $arConf["error_dflt_lvl"]);
            Log::error("-Error message set: ". $cPhrase ." $cLog -");
        } else {
            Log::error("-Error message not found: [$cENS] [$cEID] [$cLanguage] $cLog-");
            $arErrors[] = array("msg"=>$cEID,"type" => $arConf["error_dflt_type"], "lvl" => $arConf["error_dflt_lvl"]);
        }

        config(['app.error_messages' => $arErrors]);

        self::set_response_code($nECode);
    }

    public static function setFENot($cEID,$cENS="SN_",$cType="info",$cLevel="notifier") {
        if(is_null($cENS)) { //Omit search
            $cMsg = $cEID;
        } else {
            $cMsg = self::getPhrase($cEID,$cENS);

            if(!$cMsg) {
                Log::debug("-FE Notification message not found: [$cENS] [$cEID]-");
                $cMsg = $cEID;
            }
        }
        
        $arFENotification = config('app.fe.notifications') ?? [];

        $arFENotification[] = array("msg"=>$cMsg, "type"=>$cType, "lvl"=>$cLevel);
        Log::debug("-FE Notification set: $cMsg|$cType|$cLevel -");

        config(['app.fe.notifications' => $arFENotification]);
    }

    public static function getErrorCount() {
        $arErrors = config('app.error_messages') ?? [];

        return count($arErrors);
    }

    public static  function getFEAR() {
        
        return self::getTotalNotifications();
    }

    protected static function getTotalNotifications($cArName="_FEA_NTFR") {
        $arErrors = config('app.error_messages') ?? [];
        $arFEN = config('app.fe.notifications') ?? [];
        $arFEA = array();
        
        if(count($arErrors)) {
            $arFEA += $arErrors;
        }

        if(count($arFEN)) {
            $arFEA += $arFEN;
        }
        
        return count($arFEA) ? array($cArName => $arFEA) : array();
    }

    public static function parseMarkup($cMarkup, $oP=null) {
        //quick check
        if( strpos($cMarkup, "{") === false ||
            strpos($cMarkup, "}") === false ) 
            {
            return $cMarkup;
        }

        $arCConf = config('app.conf.core');
        $arAConf = config('app.conf.api');
    /*
    \{(?>\{(?<c>)|[^{}]+|\}(?<-c>))*(?(c)(?!))\}
    */
        $cMarkup = preg_replace_callback(
            '/\{dcode:([\S\s]*?)dcode\}/',
            function($matches) {
                $cOutput = self::executeDirectCode($matches[1]);
                return $cOutput ?? "{dcode:null}";
            },
            $cMarkup
        );

        $cMarkup = preg_replace_callback(
            '/\{(femle|feale):([^}]+)\}/',
            function($matches) {
                $cPhrase = self::getPhrase($matches[2],"{$matches[1]}_");
                return $cPhrase !== false ? $cPhrase : $matches[0];
            },
            $cMarkup
        );

        $cMarkup = preg_replace_callback(
            '/\{(obj):([^}]+)\}/',
            function($matches) use ($oP) {
                return $oP[$matches[2]] ?? $matches[0];
            },
            $cMarkup
        );

        $cMarkup = preg_replace_callback(
            '/\{(core_sets):([^}]+)\}/',
            function($matches) use ($arCConf) {
                $mxCV = Tools::array_path_get($arCConf, $matches[2]);

                if(isset($mxCV)) {
                    if(is_array(($mxCV))) {
                        array_walk_recursive($mxCV, 'self::parseRefMarkup');
                        
                        return json_encode($mxCV, JSON_PRESERVE_ZERO_FRACTION|JSON_NUMERIC_CHECK);
                    }

                    return self::parseMarkup($mxCV);
                }

                return  '';
            },
            $cMarkup
        );

        $cMarkup = preg_replace_callback(
            '/\{(api_sets):([^}]+)\}/',
            function($matches) use ($arAConf) {
                $mxCV = Tools::array_path_get($arAConf, $matches[2]);

                if(isset($mxCV)) {
                    if(is_array(($mxCV))) {
                        array_walk_recursive($mxCV, 'self::parseRefMarkup');
                        
                        return json_encode($mxCV, JSON_PRESERVE_ZERO_FRACTION|JSON_NUMERIC_CHECK);
                    }

                    return self::parseMarkup($mxCV);
                }

                return  '';
            },
            $cMarkup
        );
        
        $cMarkup = preg_replace_callback(
            '/\{(mmodule):([^}]+)\}/',
            function($matches) {
                $cModule = self::loadModule(array(
                            "_mid"=>$matches[2]
                        ),true);
                return $cModule ?: $matches[0];
            },
            $cMarkup
        );

        $cMarkup = preg_replace_callback(
            '/\{(svgi):([^}]+)\}/',
            function($matches) {
                return self::svgIcon($matches[2]) ?? $matches[0];
            },
            $cMarkup
        );

        return $cMarkup;
    }

    protected function parseRefMarkup(&$cMarkup) {
        $cMarkup = self::parseMarkup($cMarkup);
    }

    private static function svgIcon($cPath) {
        $cSVGIconDir = "assets/img/icons/svg/";
        $cFile = $cSVGIconDir.$cPath.".svg";

        if(!file_exists($cFile)) {
            Log::debug("-Unexistent icon file: $cFile");

            return null;
        }

        return file_get_contents($cFile);
    }

    private static function set_response_code($nResCode) {
        config(['app.api.response_code' => $nResCode]);
    }

    private static function executeDirectCode($cCode,$arVars=null) {
        if(is_array($arVars)&&count($arVars)) {
            foreach($arVars as $k=>$i) {
                $$k=$i;
            }
        }
        
        if($cCode) {
            ob_start();
            try {
                $mxRet=eval($cCode);
                $cOutput = ob_get_contents();
            } catch (\Error $e) {
                self::setError('DIRECT_CODEEXEC_ERROR',null,$cCode);
            }

            ob_end_clean();

            if($cOutput) {
                return $cOutput;
            }
        }

        return false;
    }
    
    public static function getFEDisplayConstants() {
        self::getPhrase("nokey","FEM_",true, false);
        self::getPhrase("nokey","FEC_",true, false);

        $arMT = $arMV = $arC =array();

        $arPhrases = config('app.phrases') ?? [];

        foreach($arPhrases["FEM_"] as $k=>$v) {
            $arMT[$k]= $v["text"] ;
            $arMV[$k]= $v["value"];
        }

        foreach($arPhrases["FEC_"] as $k=>$v) {
            if($v["text"][0]=='[') {
                $arC[$k]=json_decode($v["text"]);
                continue;
            }

            $arC[$k] = $v["text"];
        }

        return array(
            "constants"=>"var oRMConstants=". self::parseMarkup(json_encode($arMT, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) .",
                oRTConstants=". self::parseMarkup(json_encode($arMV, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) .",
                oDisplConstants=". self::parseMarkup(json_encode($arC, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
            );
    }

    public static function setCookie($cCont, $cName=null, $nExpire=null, $cPath=null, $cDom=null) {
        $arConf = config('app.conf.api');

        $cCont = $cCont;
        $cName = $cName ?: $arConf["sck_name"];
        $nExpire = $nExpire ?: time() + $arConf["sck_time"];
        $cPath = $cPath ?: $arConf["sck_path"];
        $cDom = $cDom ?: $arConf["sck_dom"];

        setcookie(
            $cName, $cCont, $nExpire, $cPath, $cDom
        );

        Log::debug("-Cookie set: $cName: $cCont /: $nExpire|$cPath|$cDom-");
    }
}