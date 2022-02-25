<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['api.commons'])->group(function () {
    Route::post('/login', [ApiController::class, 'login']);
    Route::get('/logout', [ApiController::class, 'logout']);
    Route::post('/logrenew', [ApiController::class, 'logrenew']);

    Route::get('/module/description', [ApiController::class, 'loadModuleDescription']);
    Route::get('/module/{bhmid}', [ApiController::class, 'loadModule']);
    Route::get('/catalog', [ApiController::class, 'getCatalog']);

    Route::get('/products', [ApiController::class, 'getProducts']);
    Route::get('/notifications', [ApiController::class, 'getNotifications']);

});