<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Resilia\Aspects\System\System;

class ApiCommons
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if($request->input("_bhmid")) {
            $arExPar = $this->getModuleParameters($request->input());

            if(is_array($arExPar) && count($arExPar)) {
                $request->merge($arExPar);
            }
        }

        $oResponse = $next($request);

        $arR = $oResponse->getOriginalContent();

        $arFEA = System::getFEAR();
        
        if(is_array($arR)) {
            $arHeader = [
                '_nRec'=> count($arR), 
                '_nRows'=> $arR[0]["_rows"] ? count($arR[0]["_rows"]) : '',
                '_bExec'=>true
            ];

            array_unshift($arR, $arHeader);
        } else {
            if(!$arR || count($arFEA)) {
                $arHeader = array('_nRec'=>0, '_bExec'=>false) + $arFEA;
                $arR = array($arHeader + $arFEA);
            } else {
                $arR = null;
            }
        }
        
        if($arR) {
            $oResponse->setContent(json_encode($arR, JSON_PRESERVE_ZERO_FRACTION));
        } else {
            $oResponse->setContent(null);
        }
        
        return $oResponse;
    }

    private function getModuleParameters($arP) {
        $cMID = $arP['_bhmid'];
        $arModules = config('app.modules') ?? [];


        if(!$arModules[$cMID]) {
            System::setModuleRecord($cMID);
            $arModules = config('app.modules');
        }
        
        $arMP = json_decode($arModules[$cMID]["parameters_parsed"], true);
        $arFEPs = is_array($arMP["modp"]) ? $arMP["modp"] : array();

        if(is_array($arMP["dyep"][$arP["_bhdepid"]]) && count($arMP["dyep"][$arP["_bhdepid"]])) {
            $arFEPs = $arMP["dyep"][$arP["_bhdepid"]] + $arFEPs;
        }
        
        //Log::debug("-Recovered module parameters:".print_r($arFEPs,true));
        return $arFEPs;
    }
}
