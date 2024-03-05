<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => $this->faker->firstName(),
            'surname' => $this->faker->lastName,
            'patronymic' => $this->faker->firstName(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'),
            'leader' => 1,
        ];
    }

    public function admin()
    {
        return [
            'id' => 1,
            'name' => 'Админ',
            'surname' => 'Админов',
            'patronymic' => 'Админович',
            'email' => 'admin@mail.ru',
            'password' => Hash::make('password'),
            'leader' => null,
        ];
    }
}
