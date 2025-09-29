<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of announcements (public)
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Announcement::query();

            // Filter by active status
            if ($request->has('active') && $request->active === 'true') {
                $query->active();
            }

            // Filter by featured status
            if ($request->has('featured') && $request->featured === 'true') {
                $query->featured();
            }

            // Filter by category
            if ($request->has('category')) {
                $query->category($request->category);
            }

            // Filter by priority
            if ($request->has('priority')) {
                $query->priority($request->priority);
            }

            $announcements = $query->orderBy('priority', 'desc')
                                 ->orderBy('start_date', 'desc')
                                 ->get();

            return response()->json([
                'success' => true,
                'data' => $announcements
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching announcements',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created announcement
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'category' => 'required|string|in:general,worship,ministry,youth,outreach,financial,health,education,social,urgent',
                'priority' => 'required|string|in:low,normal,high,urgent',
                'start_date' => 'required|date',
                'end_date' => 'nullable|date|after:start_date',
                'is_active' => 'boolean',
                'is_featured' => 'boolean',
                'target_audience' => 'string|in:all,members,visitors,youth,adults,children',
                'contact_info' => 'nullable|string',
                'action_required' => 'boolean',
                'action_deadline' => 'nullable|date',
                'image_url' => 'nullable|url',
                'event_time' => 'nullable|string',
                'event_location' => 'nullable|string'
            ]);

            $announcement = Announcement::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Announcement created successfully',
                'data' => $announcement
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating announcement',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified announcement
     */
    public function show(string $id): JsonResponse
    {
        try {
            $announcement = Announcement::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $announcement
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Announcement not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified announcement
     */
    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $announcement = Announcement::findOrFail($id);

            $validated = $request->validate([
                'title' => 'string|max:255',
                'content' => 'string',
                'category' => 'string|in:general,worship,ministry,youth,outreach,financial,health,education,social,urgent',
                'priority' => 'string|in:low,normal,high,urgent',
                'start_date' => 'date',
                'end_date' => 'nullable|date|after:start_date',
                'is_active' => 'boolean',
                'is_featured' => 'boolean',
                'target_audience' => 'string|in:all,members,visitors,youth,adults,children',
                'contact_info' => 'nullable|string',
                'action_required' => 'boolean',
                'action_deadline' => 'nullable|date',
                'image_url' => 'nullable|url',
                'event_time' => 'nullable|string',
                'event_location' => 'nullable|string'
            ]);

            $announcement->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Announcement updated successfully',
                'data' => $announcement
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating announcement',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified announcement
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $announcement = Announcement::findOrFail($id);
            $announcement->delete();

            return response()->json([
                'success' => true,
                'message' => 'Announcement deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting announcement',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
