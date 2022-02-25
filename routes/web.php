<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FrameController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', '/mapp');

Route::get('/{root}/{mod?}/{ck?}/{pk?}', [FrameController::class, 'display'])->where('root', '(lapp|mapp)');

Route::get('/fe/constants', [FrameController::class, 'getFEConstants']);
