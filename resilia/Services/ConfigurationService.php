<?php

namespace Resilia\Services;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ConfigurationService extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        error_reporting(E_ALL & ~E_DEPRECATED & ~E_STRICT & ~E_NOTICE);

        $request = $this->app->request;

        $oConf = DB::table("sys.conf")->first();
        $arSets = json_decode($oConf->core, true);

        $arSets["bones"]["bhfe_sets"]["root_type"] = $arSets["bones"]["root_dflt"];
        $arSets["bones"]["_cAppCKData"] = $request->cookie('bhack');
        config(['app.conf.core' => $arSets["bones"]]);
        config(['app.root_type' => $arSets["bones"]["bhfe_sets"]["root_type"]]);

        $arSets = json_decode($oConf->api, true);

        config(['app.conf.api' => $arSets["api"]]);
        config(['app.language' => $arSets["api"]["lng"]]);

        config(['app.sid' => $request->cookie('bhsck')]);


    }
}
