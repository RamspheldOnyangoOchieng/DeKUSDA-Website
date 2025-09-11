<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sermon extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'speaker',
        'sermon_date',
        'scripture_reference',
        'sermon_text',
        'audio_file',
        'video_file',
        'pdf_file',
        'thumbnail',
        'series',
        'status',
        'view_count',
        'download_count',
        'tags',
        'uploaded_by',
    ];

    protected $casts = [
        'sermon_date' => 'date',
        'tags' => 'json',
        'view_count' => 'integer',
        'download_count' => 'integer',
    ];

    /**
     * Get the user who uploaded the sermon.
     */
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /**
     * Get the full URL for the audio file.
     */
    public function getAudioUrlAttribute(): ?string
    {
        return $this->audio_file ? asset('storage/' . $this->audio_file) : null;
    }

    /**
     * Get the full URL for the video file.
     */
    public function getVideoUrlAttribute(): ?string
    {
        return $this->video_file ? asset('storage/' . $this->video_file) : null;
    }

    /**
     * Get the full URL for the PDF file.
     */
    public function getPdfUrlAttribute(): ?string
    {
        return $this->pdf_file ? asset('storage/' . $this->pdf_file) : null;
    }

    /**
     * Get the full URL for the thumbnail.
     */
    public function getThumbnailUrlAttribute(): ?string
    {
        return $this->thumbnail ? asset('storage/' . $this->thumbnail) : null;
    }
}
