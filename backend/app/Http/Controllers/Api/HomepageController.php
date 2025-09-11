<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HomepageContent;
use App\Models\HomepageSlide;
use App\Models\WorshipService;
use App\Models\ChurchProject;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HomepageController extends Controller
{
    /**
     * Get all homepage data in one request
     */
    public function index(): JsonResponse
    {
        try {
            $data = [
                'slides' => HomepageSlide::active()->ordered()->get(),
                'contents' => HomepageContent::active()->ordered()->get()->keyBy('section_key'),
                'worship_services' => WorshipService::active()->ordered()->get(),
                'featured_projects' => ChurchProject::active()->featured()->ordered()->take(6)->get(),
                'about_content' => HomepageContent::bySection('about_us')->active()->first(),
                'welcome_message' => HomepageContent::bySection('welcome_message')->active()->first(),
                'prayer_verse' => HomepageContent::bySection('prayer_verse')->active()->first(),
            ];

            return response()->json([
                'status' => 'success',
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch homepage data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get slides for carousel
     */
    public function getSlides(): JsonResponse
    {
        try {
            $slides = HomepageSlide::active()->ordered()->get();
            
            return response()->json([
                'status' => 'success',
                'data' => $slides
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch slides',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get content by section
     */
    public function getContentBySection(string $sectionKey): JsonResponse
    {
        try {
            $content = HomepageContent::bySection($sectionKey)->active()->first();
            
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
                'message' => 'Failed to fetch content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update content by section (Admin only)
     */
    public function updateContentBySection(Request $request, string $sectionKey): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'nullable|string|max:255',
                'content' => 'nullable|string',
                'subtitle' => 'nullable|string',
                'button_text' => 'nullable|string|max:100',
                'button_link' => 'nullable|string|max:255',
                'image_url' => 'nullable|string|max:500',
                'metadata' => 'nullable|array',
                'is_active' => 'boolean',
                'sort_order' => 'integer'
            ]);

            $content = HomepageContent::updateOrCreate(
                ['section_key' => $sectionKey],
                $validated
            );

            return response()->json([
                'status' => 'success',
                'message' => 'Content updated successfully',
                'data' => $content
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
     * Create or update slide (Admin only)
     */
    public function createSlide(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'image_url' => 'required|string|max:500',
                'cta_link' => 'nullable|string|max:255',
                'cta_text' => 'nullable|string|max:100',
                'is_active' => 'boolean',
                'sort_order' => 'integer'
            ]);

            $slide = HomepageSlide::create($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Slide created successfully',
                'data' => $slide
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create slide',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update slide (Admin only)
     */
    public function updateSlide(Request $request, int $id): JsonResponse
    {
        try {
            $slide = HomepageSlide::findOrFail($id);
            
            $validated = $request->validate([
                'title' => 'string|max:255',
                'description' => 'nullable|string',
                'image_url' => 'string|max:500',
                'cta_link' => 'nullable|string|max:255',
                'cta_text' => 'nullable|string|max:100',
                'is_active' => 'boolean',
                'sort_order' => 'integer'
            ]);

            $slide->update($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Slide updated successfully',
                'data' => $slide
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update slide',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete slide (Admin only)
     */
    public function deleteSlide(int $id): JsonResponse
    {
        try {
            $slide = HomepageSlide::findOrFail($id);
            $slide->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Slide deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete slide',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
