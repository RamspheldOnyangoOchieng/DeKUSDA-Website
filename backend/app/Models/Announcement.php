<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content', 
        'category',
        'priority',
        'start_date',
        'end_date',
        'is_active',
        'is_featured',
        'target_audience',
        'contact_info',
        'action_required',
        'action_deadline',
        'image_url',
        'event_time',
        'event_location'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean', 
        'action_required' => 'boolean',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'action_deadline' => 'datetime'
    ];

    // Scope for active announcements
    public function scopeActive($query)
    {
        return $query->where('is_active', true)
                    ->where('start_date', '<=', now())
                    ->where(function($q) {
                        $q->whereNull('end_date')
                          ->orWhere('end_date', '>=', now());
                    });
    }

    // Scope for featured announcements
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // Scope for specific category
    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // Scope for priority
    public function scopePriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }
}
