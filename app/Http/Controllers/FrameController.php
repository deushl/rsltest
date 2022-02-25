<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;

use Illuminate\Http\Request;
use Resilia\Tools\Tools;
use Resilia\Aspects\System\System;
use Resilia\Aspects\System\User;

class FrameController extends Controller
{
    public function display($root, $mod='', $ck='', $pk='') {
        $arConf = config('app.conf.core');

        if($root) {
            $arConf["bhfe_sets"]["root_type"] = $root;
        } else {
            $arConf["bhfe_sets"]["root_type"] = $arConf["root_dflt"];
        }

        $arConf["bhfe_sets"]["cur_mod"] = $arConf["module_dflt"][$root];
            
        config(['app.conf.core' => $arConf]);

        if($root =="mapp") {
            if($arConf["check_session"]) {
                if(config('app.sid')) {
                    $arR = User::validateSession();

                    if(!$arR || !count($arR)) {
                        header("Location: ".Tools::getProtocol()."://{$_SERVER['HTTP_HOST']}/lapp/");
                        exit();
                    }

                    self::printHTTPHeaders();
                    echo self::processMainFrame();
                } else {
                    header("Location: " . Tools::getProtocol()."://{$_SERVER['HTTP_HOST']}/lapp/");
                    exit();
                }
            } else {
                self::printHTTPHeaders();
                self::processMainFrame();
            }   
        } else {
            if(config('app.sid')) {
                $arR = User::validateSession();

                if($arR && count($arR)) {
                    header("Location: ".Tools::getProtocol()."://{$_SERVER['HTTP_HOST']}/mapp/");
                    exit();
                }
            }

            self::printHTTPHeaders();
            echo self::processLandingFrame();
        }
    }

    private static function processLandingFrame() {
        $arConf = config('app.conf.core');

        $cLanding = System::loadModule(
            array(
                    "_mid" => $arConf["tmpl"]["lapp"]
                )
            );
        
        return $cLanding;
    }

    private static function processMainFrame() {
        $arConf = config('app.conf.core');

        $cMain = System::loadModule(
            array(
                    "_mid" => $arConf["tmpl"]["mapp"]
                )
            );
        
        return $cMain;
    }

    public static function processNavigation($cListType="ul", $cNavClass="bh-nav-menu" , $cElClass="bh-nav-menu-item", $cSubMenuClass="sub-menu") {
        $arConf = config('app.conf.core');

        switch($cListType) {
            case "ul":
                $cElType="li";
                break;
            case "div":
                $cElType="div";
                break;
            case "ol":
                $cElType="li";
                break;
            default:
                $cListType="ul";
                $cElType="li";
        }
        
        array_walk($arConf["navc"], 'self::makeNavEl', array($cListType, $cElType, $cElClass, $cSubMenuClass));

        $cOut = "<$cListType class='$cNavClass'>".implode('', $arConf["navc"]) . "</$cListType>";

        return System::trimMarkup($cOut);
    }

    private static function printHTTPHeaders() {
        header("Expires: Mon, 26 Jul 1990 05:00:00 GMT");
        header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
        header("Cache-Control: no-store, no-cache, must-revalidate");
        header("Cache-Control: post-check=0, pre-check=0", false);
        header("Pragma: no-cache");
    }

    private static function makeNavEl(&$mxEl, $cKey, $arUserData) {
        $cListType = $arUserData[0];
        $cElType = $arUserData[1];
        $cElClass = $arUserData[2];
        $cSubMenuClass = $arUserData[3];
        $cSubStatus = $cAType='';

        if(isset($mxEl["sub"])) {
            $arSubN = $mxEl["sub"];
            array_walk($arSubN, 'self::makeNavEl', array($cListType,$cElType));
            $mxEl["sub"] = "<$cListType class='$cSubMenuClass'>" . implode('',$arSubN)."</$cListType>";
            $cElClass.= "has-sub";
            $cSubStatus = '<span class="arrow"></span>';
        }
        
        $cAType  =$mxEl["atype"] ?: 'm';
        $cIcon = $mxEl["iconmu"] ?: '';

        $mxEl ="<$cElType an='{$mxEl["an"]}' atype='$cAType' data-bh-act-context='*' data-bh-b-mchained='f' id='nav-item-{$mxEl["an"]}'  class='{$mxEl["class"]} $cElClass' >
                    <a href='/{$mxEl["an"]}'>
                        $cIcon
                        <span class='title'>{$mxEl["text"]}</span>
                        $cSubStatus
                    </a>
                    {$mxEl["sub"]}
                </$cElType>";
    }

    public static function getFEConstants() {
        $arR = System::getFEDisplayConstants();
        return html_entity_decode($arR["constants"], null,'UTF-8');
    }
}
