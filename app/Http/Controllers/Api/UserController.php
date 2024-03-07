<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * Возвращает подчиненных
     *
     * @param integer|null $taskId если указать номер задачи, то добавляет ответственного за неё
     * @param Request $request
     * @return Response
     */
    public function getSubordinates(Request $request): Response
    {
        /** @var User */
        $user = $request->user();

        $subordinates = $user->subordinates()->get();
        $subordinates[] = $user;

        return response($subordinates);
    }

    public function getSelf(Request $request): Response
    {
        $user = $request->user();
        return response($user);
    }
}
