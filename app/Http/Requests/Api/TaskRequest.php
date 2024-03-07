<?php

namespace App\Http\Requests\Api;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

abstract class TaskRequest extends FormRequest
{
    public function validated($key = null, $default = null)
    {
        $data = parent::validated();

        /** @var User */
        $user = Auth::user();
        $responsible = $user->subordinates()->find($data['responsible']);

        if (empty($responsible) && $data['responsible'] != $user->id) {
            throw ValidationException::withMessages([
                'responsible' => __('Неверный формат данных.'),
            ]);
        }

        return $data;
    }
}
