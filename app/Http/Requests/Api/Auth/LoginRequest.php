<?php

namespace App\Http\Requests\Api\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function authenticate()
    {
        $data = $this->only('email', 'password');

        if (!Auth::attempt($data, $this->boolean('remember'))) {
            if (Auth::validate($data)) {
                throw ValidationException::withMessages([
                    'email' => __('Неверный формат данных.'),
                ]);
            } else {
                if (User::where('email', $data['email'])->first()) {
                    throw ValidationException::withMessages([
                        'password' => __('Неверный пароль.'),
                    ]);
                } else {
                    throw ValidationException::withMessages([
                        'email' => __('Пользователя с таким именем не существует.'),
                    ]);
                }
            }
        }
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email|max:40',
            'password' => 'required',
            'remember' => 'sometimes|boolean',
        ];
    }
}
