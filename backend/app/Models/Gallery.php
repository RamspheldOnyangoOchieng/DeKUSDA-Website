<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image_url',
        'category',
        'date_taken',
        'is_featured',
        'uploaded_by',
        'media_type'
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'date_taken' => 'datetime'
    ];

}
