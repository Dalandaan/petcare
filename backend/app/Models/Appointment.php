<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    protected $fillable = [
        'pet_id',
        'owner_id',
        'service_id',
        'date',
        'status',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function pet(): BelongsTo
    {
        return $this->belongsTo(Pet::class);
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(Owner::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}