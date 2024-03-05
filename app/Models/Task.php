<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'header',
        'description',
        'deadline',
        'priority',
        'status',
        'creator',
        'responsible'
    ];

    public function creator() {
        return $this->belongsTo(User::class, 'creator', 'id');
    }

    public function responsible() {
        return $this->belongsTo(User::class, 'responsible', 'id');
    }
}
