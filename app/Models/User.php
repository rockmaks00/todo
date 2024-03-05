<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public function creator() {
        return $this->hasMany(Task::class, 'creator', 'id');
    }

    public function responsible() {
        return $this->hasMany(Task::class, 'responsible', 'id');
    }

    public function leader() {
        return $this->belongsTo(User::class, 'leader', 'id');
    }

    public function subordinates() {
        return $this->hasMany(User::class, 'leader', 'id');
    }

    protected $fillable = [
        'name',
        'surname',
        'patronymic',
        'email',
        'password',
        'leader',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];
}
