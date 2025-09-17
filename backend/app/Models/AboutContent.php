<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AboutContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_type',
        'section_key',
        'title',
        'subtitle',
        'content',
        'image_url',
        'button_text',
        'button_link',
        'meta_data',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'meta_data' => 'array',
        'is_active' => 'boolean'
    ];

    /**
     * Get content for a specific page type
     */
    public static function getPageContent($pageType)
    {
        return self::where('page_type', $pageType)
                  ->where('is_active', true)
                  ->orderBy('sort_order')
                  ->get()
                  ->keyBy('section_key');
    }

    /**
     * Get a specific section content
     */
    public static function getSectionContent($pageType, $sectionKey)
    {
        return self::where('page_type', $pageType)
                  ->where('section_key', $sectionKey)
                  ->where('is_active', true)
                  ->first();
    }
}
