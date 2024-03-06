<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function get(): Response
    {
        $users = User::select('id', 'name', 'surname')->get();
        return response($users);
    }

    public function getSelf(Request $request): Response
    {
        $user = $request->user();
        return response($user);
    }
}
