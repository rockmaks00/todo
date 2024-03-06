<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\LoginRequest;
use App\Http\Requests\Api\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request): Response
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'amogus'
            ]);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function register(RegisterRequest $request): Response
    {
        $data = $request->validated();
        
        /** @var User $user */
        $user = User::create([
            'name' => $data->name,
            'surname' => $data->surname,
            'patronymic' => $data->patronymic,
            'email' => $data->email,
            'password' => Hash::make($data->password),
            'leader' => empty($data->leader) ? null : $data->leader
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(): Response
    {
        /** @var User $user */
        $user = Auth::user();
        $user->currentAccessToken()->delete;
        return response(status: 204);
    }
}
