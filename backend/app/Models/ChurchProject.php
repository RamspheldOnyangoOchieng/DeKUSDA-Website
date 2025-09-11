<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ChurchProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'target_amount',
        'current_amount',
        'progress_percentage',
        'category',
        'target_date',
        'image_url',
        'updates',
        'is_active',
        'is_featured',
        'sort_order'
    ];

    protected $casts = [
        'target_amount' => 'decimal:2',
        'current_amount' => 'decimal:2',
        'target_date' => 'date',
        'is_active' => 'boolean',
        'is_featured' => 'boolean'
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc');
    }

    // Calculate progress percentage automatically
    public function calculateProgress()
    {
        if ($this->target_amount > 0) {
            $this->progress_percentage = round(($this->current_amount / $this->target_amount) * 100);
            $this->save();
        }
    }
}
