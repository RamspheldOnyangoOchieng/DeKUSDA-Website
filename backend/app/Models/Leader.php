<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Leader extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'title',
        'image',
        'category',
        'phone',
        'email',
        'linkedin',
        'facebook',
        'education',
        'years_of_service',
        'specialties',
        'quote',
        'bio',
        'achievements',
        'languages',
        'order',
        'status'
    ];

    protected $casts = [
        'specialties' => 'array',
        'achievements' => 'array',
        'languages' => 'array',
        'order' => 'integer'
    ];

    // Define category constants
    const CATEGORIES = [
        'pastoral' => 'Pastoral Staff',
        'elders' => 'Church Elders',
        'ministry' => 'Ministry Directors',
        'deacons' => 'Deacons & Deaconesses'
    ];

    // Scope for active leaders
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    // Scope for category
    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // Order by position
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc')->orderBy('created_at', 'asc');
    }
}