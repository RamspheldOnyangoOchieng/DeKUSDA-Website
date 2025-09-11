<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WorshipService extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'time',
        'location',
        'description',
        'leader',
        'attendees',
        'type',
        'highlights',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'highlights' => 'array',
        'is_active' => 'boolean'
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc');
    }
}
