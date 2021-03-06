<?php

namespace Resilia\Tools;


class Tools
{
    public static function getProtocol() {
        return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ? "https" : "http";
    }

    public static function in_object($cKey=false,$mxVal, $objH, $bStrict=false){
        if(is_null($mxVal)){
            trigger_error("in_object expects parameter 1 must not null", E_USER_WARNING);
            return false;
        }
        if(!is_object($objH)){
            $objH = (object)$objH;
        }
        if($cKey) {
            if(isset($objH[$cKey])) {
                if($bStrict) {
                   if($objH[$cKey]===$mxVal){
                       return true;
                    }
                } else {
                    if($objH[$cKey]==$mxVal){
                       return true;
                    }
                }
            }
            foreach($objH as $key=>$value){
                if(is_object($value)||is_array($value)) {
                    if(self::in_object($cKey,$mxVal, $value, $bStrict)) {
                        return true;
                    }
                }
            }
        } else {
            foreach($objH as $key=>$value){
                if(!is_object($value)&&!is_array($value)) {
                    if($bStrict) {
                       if($value===$mxVal){
                           return true;
                        }
                    } else {
                        if($value==$mxVal){
                           return true;
                        }
                    }
                }else{
                    if(self::in_object($cKey,$mxVal, $value, $bStrict)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    public static function array_path_get($arA, $cPath, $mxDefault = null)  {
        if (! is_array($arA)) {
            return $mxDefault;
        }
        if (is_null($cPath)) {
            return $arA;
        }
        if (array_key_exists($cPath, $arA)) {
            return $arA[$cPath];
        }
        if (strpos($cPath, '.') === false) {
            return $mxDefault;
        }
        foreach (explode('.', $cPath) as $cSegment) {
            if (is_array($arA) && array_key_exists($cSegment, $arA)) {
                $arA = $arA[$cSegment];
            } else {
                return $mxDefault;
            }
        }
        return $arA;
    }

    public static function UUID_v3($namespace, $name) {
        if(!self::UUID_valid($namespace)) return false;
        // Get hexadecimal components of namespace
        $nhex = str_replace(array('-','{','}'), '', $namespace);
        // Binary Value
        $nstr = '';
        // Convert Namespace UUID to bits
        for($i = 0; $i < strlen($nhex); $i+=2) {
            $nstr .= chr(hexdec($nhex[$i].$nhex[$i+1]));
        }
        // Calculate hash value
        $hash = md5($nstr . $name);

        return sprintf('%08s-%04s-%04x-%04x-%12s',
            // 32 bits for "time_low"
            substr($hash, 0, 8),
            // 16 bits for "time_mid"
            substr($hash, 8, 4),
            // 16 bits for "time_hi_and_version",
            // four most significant bits holds version number 3
            (hexdec(substr($hash, 12, 4)) & 0x0fff) | 0x3000,
            // 16 bits, 8 bits for "clk_seq_hi_res",
            // 8 bits for "clk_seq_low",
            // two most significant bits holds zero and one for variant DCE1.1
            (hexdec(substr($hash, 16, 4)) & 0x3fff) | 0x8000,
            // 48 bits for "node"
            substr($hash, 20, 12)
            );
    }

    public static function UUID_v4() {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            // 32 bits for "time_low"
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            // 16 bits for "time_mid"
            mt_rand(0, 0xffff),
            // 16 bits for "time_hi_and_version",
            // four most significant bits holds version number 4
            mt_rand(0, 0x0fff) | 0x4000,
            // 16 bits, 8 bits for "clk_seq_hi_res",
            // 8 bits for "clk_seq_low",
            // two most significant bits holds zero and one for variant DCE1.1
            mt_rand(0, 0x3fff) | 0x8000,
            // 48 bits for "node"
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
            );
    }

    public static function UUID_v5($namespace, $name) {
        if(!self::UUID_valid($namespace)) return false;
        // Get hexadecimal components of namespace
        $nhex = str_replace(array('-','{','}'), '', $namespace);
        // Binary Value
        $nstr = '';
        // Convert Namespace UUID to bits
        for($i = 0; $i < strlen($nhex); $i+=2) {
            $nstr .= chr(hexdec($nhex[$i].$nhex[$i+1]));
        }
        // Calculate hash value
        $hash = sha1($nstr . $name);
        return sprintf('%08s-%04s-%04x-%04x-%12s',
            // 32 bits for "time_low"
            substr($hash, 0, 8),
            // 16 bits for "time_mid"
            substr($hash, 8, 4),
            // 16 bits for "time_hi_and_version",
            // four most significant bits holds version number 5
            (hexdec(substr($hash, 12, 4)) & 0x0fff) | 0x5000,
            // 16 bits, 8 bits for "clk_seq_hi_res",
            // 8 bits for "clk_seq_low",
            // two most significant bits holds zero and one for variant DCE1.1
            (hexdec(substr($hash, 16, 4)) & 0x3fff) | 0x8000,
            // 48 bits for "node"
            substr($hash, 20, 12)
            );
    }

    public static function UUID_valid($uuid) {
        return preg_match('/^\{?[0-9a-f]{8}\-?[0-9a-f]{4}\-?[0-9a-f]{4}\-?'.'[0-9a-f]{4}\-?[0-9a-f]{12}\}?$/i', $uuid) === 1;
    }

}