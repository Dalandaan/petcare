<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'duration',
        'status',
    ];

    protected $casts = [
        'price' => 'float',
        'duration' => 'integer',
    ];
}