<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::group(['prefix' => 'auth'], function () {
    Route::post('/register', [AuthController::class, 'register']);
});


Route::group(['prefix' => 'user'], function () {
    Route::get('/', [UserController::class, 'getList']);
});
