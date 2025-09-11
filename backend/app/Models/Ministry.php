<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ministry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'mission_statement',
        'leader_name',
        'leader_email',
        'leader_phone',
        'meeting_schedule',
        'meeting_location',
        'featured_image',
        'category',
        'status',
        'member_count',
        'requirements',
        'contact_info',
        'social_links',
        'created_by',
    ];

    protected $casts = [
        'social_links' => 'json',
        'member_count' => 'integer',
    ];

    /**
     * Get the user who created the ministry.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
