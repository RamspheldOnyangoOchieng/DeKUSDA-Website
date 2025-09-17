<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AboutController extends Controller
{
    /**
     * Get all content for a specific about page
     */
    public function getPageContent($pageType)
    {
        try {
            $content = AboutContent::getPageContent($pageType);
            
            return response()->json([
                'status' => 'success',
                'data' => $content
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch page content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get specific section content
     */
    public function getSectionContent($pageType, $sectionKey)
    {
        try {
            $content = AboutContent::getSectionContent($pageType, $sectionKey);
            
            if (!$content) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Content not found'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'data' => $content
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch section content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update or create content (Admin only)
     */
    public function updateContent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'page_type' => 'required|in:about_dekusda,about_sda,elder_message,pastor_message,leadership',
            'section_key' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'image_url' => 'nullable|url',
            'button_text' => 'nullable|string|max:255',
            'button_link' => 'nullable|string|max:255',
            'meta_data' => 'nullable|array',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $content = AboutContent::updateOrCreate(
                [
                    'page_type' => $request->page_type,
                    'section_key' => $request->section_key
                ],
                $request->only([
                    'title', 'subtitle', 'content', 'image_url', 
                    'button_text', 'button_link', 'meta_data', 
                    'sort_order', 'is_active'
                ])
            );

            return response()->json([
                'status' => 'success',
                'data' => $content,
                'message' => 'Content updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete content (Admin only)
     */
    public function deleteContent($id)
    {
        try {
            $content = AboutContent::find($id);
            
            if (!$content) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Content not found'
                ], 404);
            }

            $content->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Content deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete content',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
