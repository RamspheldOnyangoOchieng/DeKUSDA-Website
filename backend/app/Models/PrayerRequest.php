<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PrayerRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'requester_name',
        'requester_email',
        'requester_phone',
        'prayer_request',
        'category',
        'status',
        'is_public',
        'is_urgent',
        'date_submitted',
        'date_answered',
        'answer_testimony',
        'prayer_count',
        'approved_by',
    ];

    protected $casts = [
        'is_public' => 'boolean',
        'is_urgent' => 'boolean',
        'date_submitted' => 'datetime',
        'date_answered' => 'datetime',
        'prayer_count' => 'integer',
    ];

    /**
     * Get the user who approved the prayer request.
     */
    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
