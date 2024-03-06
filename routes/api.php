<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(UserController::class)
    ->prefix('users')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get('/', 'get');
        Route::get('/self', 'getSelf');
    });

Route::controller(TaskController::class)
    ->prefix('tasks')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get('/', 'get');
        Route::get('/{id}', 'getTask');
        Route::post('/', 'create');
        Route::put('/', 'update');
    });

Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', 'logout');
    });
});
