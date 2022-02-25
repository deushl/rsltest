<?php
function BH_RequireOutput($arAppRequire,$arAppReq,$bCBuster=false) {
    $arBHReq=array("breakpoints", "cookies_loader", "bh_fw");
    if($bCBuster) {
        $cCBuster="_cb=" . microtime(true);
    }
    
    $arConfig=array (
          'urlArgs' => $cCBuster,
          'paths' => 
              array (
              //requirejs-plugins
                'async' => '../assets/plugins/requirejs-plugins/src/async',
                'font' => '../assets/plugins/requirejs-plugins/src/font',
                'goog' => '../assets/plugins/requirejs-plugins/src/goog',
                'image' => '../assets/plugins/requirejs-plugins/src/image',
                'json' => '../assets/plugins/requirejs-plugins/src/json',
                'noext' => '../assets/plugins/requirejs-plugins/src/noext',
                'mdown' => '../assets/plugins/requirejs-plugins/src/mdown',
                'propertyParser' => '../assets/plugins/requirejs-plugins/src/propertyParser',
                'markdownConverter' => 'lib/Markdown.Converter',
                
                //'jquery' => '../assets/plugins/jq321.jx?noext',
                'jquery' => 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery',
                'jqueryui' => '../assets/plugins/jquery-ui/jquery-ui-1.12.1.custom/jquery-ui.min',
                //'bootstrap' => '../assets/plugins/btstrp3/js/bootstrap.min',
                'breakpoints' => '../assets/plugins/breakpoints/breakpoints',
                //'cookie' => '../assets/plugins/js.cookie',
                //'cookies' => 'https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min',
                'cookies' => '../assets/plugins/dt/cdn/js.cookie.min',
                'cookies_loader' => 'libs/cookies-loader',
                'toolt' => '../assets/plugins/tipped/dist/js/tipped.min',
                'toolt_loader' => 'libs/Tipped-loader',

                //'tippy_load' => 'https://unpkg.com/tippy.js@6?noext',
                'tippy_load' => '../assets/plugins/tippy/tippy-bundle.umd.min',
                'tippy' => 'libs/tippy-loader',
                //'@popperjs/core' => 'https://unpkg.com/@popperjs/core@2?noext',
                '@popperjs/core' => '../assets/plugins/tippy/popper.min',

                'jbox' => 'https://cdn.jsdelivr.net/gh/StephanWagner/jBox@v1.2.0/dist/jBox.all.min',
                
                'gmaps_api' => 'libs/googlemapsapi',
                'gmaps' => '../assets/plugins/gmap3.min',
                
                //'moment' => '../assets/plugins/moment/moment.min',
                'moment' => '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.25.1/moment.min',
                'moment-loader' => 'libs/moment-loader',
                'datejs' => '../assets/plugins/bootstrap-daterangepicker/date',
                //'drange' => '../assets/plugins/daterangepicker/daterangepicker.jx?noext',
                
                'jq_validator' => '../assets/plugins/validation-1.19.2/dist/jquery.validate.min',
                'formval' => '../assets/plugins/validation-1.19.2/dist/additional-methods.min',
                //'formval' => '../assets/plugins/jquery-validation/localization/messages_es',
                
                //'datatables.net' => 'https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min',
                'datatables.net' => '../assets/plugins/dt/cdn/jquery.dataTables.min',
                //'d_tbl_resp' => 'https://cdn.datatables.net/responsive/2.2.2/js/dataTables.responsive.min',
                'd_tbl_resp' => '../assets/plugins/dt/cdn/dataTables.responsive.min',
                //'datatables.net-buttons' => 'https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min',
                'datatables.net-buttons' => '../assets/plugins/dt/cdn/dataTables.buttons.min',
                //'d_tbl_buttons_h5' => 'https://cdn.datatables.net/buttons/1.5.2/js/buttons.html5.min',
                'd_tbl_buttons_h5' => '../assets/plugins/dt/cdn/buttons.html5.min',
                //'d_tbl_colVis' => 'https://cdn.datatables.net/buttons/1.5.2/js/buttons.colVis.min',
                'd_tbl_colVis' => '../assets/plugins/dt/cdn/buttons.colVis.min',
                'd_tbl_buttons_flash' => 'https://cdn.datatables.net/buttons/1.5.2/js/buttons.flash.min',
                'd_tbl_colReorder' => 'https://cdn.datatables.net/colreorder/1.5.0/js/dataTables.colReorder.min',
                //'d_tbl_print' => 'https://cdn.datatables.net/buttons/1.5.2/js/buttons.print.min',
                'd_tbl_print' => '../assets/plugins/dt/cdn/buttons.print.min',
                'd_tbl_rowGroup' => '//cdn.datatables.net/rowgroup/1.0.3/js/dataTables.rowGroup.min',
                'd_tbl_rowReorder' => '//cdn.datatables.net/rowreorder/1.2.4/js/dataTables.rowReorder.min',
                'd_tbl_date_srt' => '//cdn.datatables.net/plug-ins/1.10.20/sorting/datetime-moment',
                //'d_tbl_date_rndr' => '//cdn.datatables.net/plug-ins/1.10.15/dataRender/datetime',
                //'d_tbl' => '../assets/plugins/DT110/media/js/dataTables.bootstrap.min',
                'd_tbl_lng' => 'libs/DT-lng',
                'd_tbl' => 'bh/dtbl_ext',
                //'jszip' => 'https://cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min',
                'jszip' => '../assets/plugins/dt/cdn/jszip.min',
                'jszip-loader' => 'libs/jszip-loader',
                'pdfmake' => '//cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min',
                //'pdfmake' => '../assets/plugins/dt/cdn/pdfmake.min',
                'pdfmake_fonts' => 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts',
                //'pdfmake_fonts' => '../assets/plugins/dt/cdn/vfs_fonts',
                
                'plots' => '../assets/plugins/flot/jquery.flot',
                'flot_res' => '../assets/plugins/flot/jquery.flot.resize',
                
                'bh3ma' => '../assets/plugins/3ma/3ma',
                'tv4' => '../assets/plugins/3ma/tv4.min',
                'tv4-loader' => 'libs/tv4-loader',
                
                'uniform' => '../assets/plugins/uniform/jquery.uniform.min',
                'blockui' => '../assets/plugins/jquery.blockui',
                'touch_punch' => '../assets/plugins/jquery-ui-touch-punch/jquery.ui.touch-punch.min',
                'clends' => '../assets/plugins/fullcalendar/fullcalendar/fullcalendar.min',
                'nestable' => '../assets/plugins/jquery-nestable/jquery.nestable',
                'jcrop' => '../assets/plugins/Jcrop/js/jquery.Jcrop.min',
                'fileupload' => '../assets/plugins/bootstrap-fileupload/bootstrap-fileupload',
                'jform' => '../assets/plugins/form/jquery.form',
                //'swb' => '../assets/plugins/bootstrap-switch-master/dist/js/bootstrap-switch.min',
                'swb' => '../assets/plugins/lcswitch/lc_switch.min',
                'tinysort' => '../assets/plugins/jquery.tinysort.min',
                'scrollc' => '../assets/plugins/ncscroll/dist/jquery.nicescroll.min',
                'iscroller' => '../assets/plugins/iscroll/build/iscroll',
                'iscrollerjs' => 'libs/iscroller-loader',
                'tinyscroll' => '../assets/plugins/tinyscrollbar/lib/jquery.tinyscrollbar.min',
                //'feather' => 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min',
                'flatpickr' => '../assets/plugins/flatpickr/flatpickr.min',
                
                'carsl-owl' => '../assets/plugins/owl/owl-carousel/owl.carousel.min',
                'carsl-owl2' => '../assets/plugins/owl2/dist/owl.carousel.min',
                'carsl-slick' => 
                array (
                  0 => 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min',
                  1 => 'https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min',
                  2 => '../assets/plugins/slickjs/slick/slick.min',
                ),
                
                'bs_datepicker' => '../assets/plugins/bootstrap-datepicker-fork/js/bootstrap-datepicker',
                'datep' => '../assets/plugins/bootstrap-datepicker-fork/js/locales/bootstrap-datepicker.es',
                
                'tpick' => '../assets/plugins/bootstrap-timepicker/js/bootstrap-timepicker',
                'sel2' => '../assets/plugins/select2/410/js/select2.full.min',
                //'sel2' => 'https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min',
                
                'history' => '../assets/plugins/bckjs/jquery.history',
                //'inmsk' => '../assets/plugins/jquery-inputmask/jquery.inputmask.bundle.min',
                'inmsk' => '../assets/plugins/RobinHerbotsInputmask/dist/jquery.inputmask.min',
                'anum' => '../assets/plugins/anmr/autoNumeric.jx?noext',
                'tspins' => '../assets/plugins/bootstrap-touchspin-master/bootstrap-touchspin/bootstrap.touchspin',
                'kb_shortcuts' => '../assets/plugins/keys/kb_shortcuts.jx?noext',
                'uuidjs' => '../assets/plugins/uuid/uuid.jx?noext',
                'uuid' => 'libs/uuid-loader',
                'dzone' => '../assets/plugins/dropzone-5.7.0/dist/min/dropzone.min',
                'fpond' => 'https://unpkg.com/filepond/dist/filepond.min',
                'fpond-loader' => 'libs/Fpond-loader',
                'fpond-jq' => 'https://unpkg.com/jquery-filepond/filepond.jquery',
                
                'oclm_load' => '../assets/plugins/OCL/openchemlib-minimal',
                'oclm' => 'libs/oclm-loader',

                'htmled1' => '../assets/plugins/trumbowyg/dist/trumbowyg.min',
                'htmled2' => 'https://cdn.jsdelivr.net/npm/suneditor@latest/dist/suneditor.min',
                
                'd3_load' => '../assets/plugins/d3/d3.min',
                'd3' => 'libs/d3-loader',

                'chartjs' => '../assets/plugins/chartjs/Chart.min',

                'jirat' => 'ext/jira-ticket',
                'confld' => 'ext/confluence-doc',

                'fpond_imgsize' => 'https://unpkg.com/filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size',
                'fpond_exif' => 'https://unpkg.com/filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation',
                'fpond_imgpreview' => 'https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview',
                'fpond_imgedit' => 'https://unpkg.com/filepond-plugin-image-edit/dist/filepond-plugin-image-edit',
                'fpond-fsize-loader' => 'libs/Fpond-fsize-loader',
                'fpond-iexif-loader' => 'libs/Fpond-iexif-loader',
                'fpond-iprev-loader' => 'libs/Fpond-iprev-loader',
                'fpond-iedit-loader' => 'libs/Fpond-iedit-loader',

                'nuslider_load' => '../assets/plugins/noUiSlider-14.6.2/distribute/nouislider.min',
                'nuslider' => 'libs/nuslider-loader',

                'bprim' => '../assets/plugins/BasicPrimitives5/primitives.min',
                'bprim_jq' => '../assets/plugins/BasicPrimitives5/primitives.jquery.min',

                'swiper' => '../assets/plugins/swiper/dist/js/swiper.jquery',
                //'materialize' => '../assets/plugins/md/mtlz/js/materialize',
                'materialize' => 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min',
                
                'bh_not' => '../assets/mnot/js/MNot.js?noext',
                'bh_spanel' => '../assets/mnot/js/SdPnl.js?noext',
                'bh_common' => 'bh/common.js?noext',
                'bh_fe_msg' => 'bh/bh_fe_msg.php?noext',
                'bh_lng_ext' => 'bh/bh_lng_ext',
                'bh_maps' => 'bh/bh_mandr.jx?noext',
                'bh_fw' => 'bh/bh_fw.php?noext',
              ),
          'shim' => 
              array (
                'bootstrap' => 
                array (
                  0 => 'jquery',
                ),
                'sel2' => 
                array (
                  0 => 'jquery',
                ),
                'breakpoints' => 
                array (
                  0 => 'jquery',
                ),
                'formval' => 
                array (
                  'deps' => 
                  array (
                    0 => 'jquery',
                    1 => 'jq_validator'
                    //2 => 'jq_validator_extra',
                  ),
                ),
                'pdfmake_fonts' => 
                array (
                  'deps' => 
                  array (
                    0 => 'pdfmake'
                  ),
                ),
                'd_tbl' => 
                array (
                  'deps' => 
                  array (
                    0 => 'jquery',
                    1 => 'datatables.net',
                    2 => 'd_tbl_resp',
                    3 => 'd_tbl_date_srt',
                    4 => 'd_tbl_buttons_h5',
                    5 => 'd_tbl_lng'
                  ),
                ),
                'd_tbl_buttons_h5' => 
                array (
                  'deps' => 
                  array (
                    0 => 'pdfmake_fonts',
                    1 => 'jszip-loader',
                    2 => 'datatables.net-buttons',
                    3 => 'd_tbl_print',
                    4 => 'd_tbl_colVis',
                  ),
                  'exports' => '',
                ),
                'plots' => 
                    array (
                      0 => 'jquery',
                      1 => 'flot_res',
                    ),
                'uniform' => 
                    array (
                      0 => 'jquery',
                    ),
                'blockui' => 
                    array (
                      0 => 'jquery',
                    ),
                'clends' => 
                    array (
                      0 => 'jquery',
                    ),
                'jcrop' => 
                    array (
                      0 => 'jquery',
                    ),
                'jform' => 
                    array (
                      0 => 'jquery',
                    ),
                'swb' => 
                    array (
                      0 => 'jquery',
                    ),
                'tinysort' => 
                    array (
                      0 => 'jquery',
                    ),
                'scrollc' => 
                    array (
                      0 => 'jquery',
                    ),
                'datep' => 
                    array (
                      'deps' => 
                      array (
                        0 => 'bootstrap',
                        1 => 'bs_datepicker',
                      ),
                    ),
                'tpick' => 
                    array (
                      0 => 'bootstrap',
                    ),
                'drange' => 
                    array (
                      0 => 'jquery',
                      1 => 'moment-loader',
                      2 => 'datejs',
                    ),
                'bprim_jq' => 
                    array (
                      0 => 'bprim',
                      1 => 'jqueryui'
                    ),
                'history' => 
                    array (
                      0 => 'jquery',
                    ),
                'inmsk' => 
                    array (
                      0 => 'jquery',
                    ),
                'anum' => 
                    array (
                      0 => 'jquery',
                    ),
                'tspins' => 
                    array (
                      0 => 'jquery',
                    ),
                'dzone' => 
                    array (
                      0 => 'jquery',
                    ),
                'fpond' => 
                    array (
                      0 => 'fpond',
                      1 => 'fpond-jq',
                      2 => 'fpond_imgpreview'
                    ),
                'tippy' => 
                  array (
                    'deps' => 
                    array (
                      0 => '@popperjs/core',
                      1 => 'tippy_load',
                    ),
                  ),
                'jirat' => 
                  array (
                    'deps' => 
                    array (
                      0 => 'sel2'
                    ),
                  ),
                'confld' => 
                  array (
                    'deps' => 
                    array (
                      0 => 'sel2'
                    ),
                  ),
                'oclm' => 
                  array (
                    'deps' => 
                    array (
                      0 => 'oclm_load',
                    ),
                  ),
                'nuslider' => 
                  array (
                    'deps' => 
                    array (
                      0 => 'nuslider_load',
                    ),
                  ),
                'materialize' => 
                    array (
                      0 => 'jquery',
                    ),
                'bh3ma' => 
                    array (
                      0 => 'jquery',
                      1 => 'tv4-loader',
                    ),
                'swiper' => 
                    array (
                      'deps' => 
                      array (
                        0 => 'jquery',
                      ),
                      'exports' => '',
                    ),
                'gmaps' => 
                    array (
                      'deps' => 
                      array (
                        0 => 'gmaps_api',
                      ),
                      'exports' => 'GMaps',
                ),
                'bh_maps' => 
                    array (
                      'deps' => 
                      array (
                        0 => 'gmaps',
                        1 => 'bh_fw',
                      ),
                    ),
                'bh_lng_ext' => 
                    array (
                      0 => 'bh_lng',
                    ),
                'bh_common' => 
                    array (
                      0 => 'jquery',
                      1 => 'datejs',
                      2 => 'scrollc',
                      3 => 'kb_shortcuts',
                      4 => 'moment-loader'
                    ),
                'bh_not' => 
                    array (
                      0 => 'jquery',
                    ),
                'bh_spanel' => 
                    array (
                      'deps' => 
                      array (
                        0 => 'jquery',
                        1 => 'swiper',
                      ),
                    ),
                'bh_fw' => 
                    array (
                      
                      'bh_common',
                      'materialize',
                      'jszip',
                      'bh_not',
                      'bh_spanel',
                      'bh_fe_msg',
                      //'bh_lng_ext',
                    ),
                ),
        );
        
    $arConfig = json_encode(array_replace_recursive($arConfig, $arAppRequire));
    $arBHReq=array_merge($arBHReq,$arAppReq);
    
    return "requirejs.config(".$arConfig . ');
            require('.json_encode($arBHReq).',
                function() {
                  
                }
            );';
}

/*
//require queue example
var requireQueue = function(arMods, fCB) {
  function load(arQ, arR) {
    if(arQ.length) {
      require([arQ.shift()], function(result) {
        arR.push(result);
        load(arQ, arR);
      });
    } else {
      fCB.apply(null, arR);
    }
  }

  load(arMods, []);
}

requireQueue([
  'app',
  'apps/home/initialize',
  'apps/entities/initialize',
  'apps/cti/initialize'
], function(App) {
  App.start();
});*/
?>
