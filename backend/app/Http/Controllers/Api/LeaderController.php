<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Leader;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LeaderController extends Controller
{
    /**
     * Display a listing of leaders.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Leader::active()->ordered();

        // Filter by category if provided
        if ($request->has('category') && $request->category !== 'all') {
            $query->category($request->category);
        }

        $leaders = $query->get();

        return response()->json([
            'success' => true,
            'data' => $leaders,
            'message' => 'Leaders retrieved successfully'
        ]);
    }

    /**
     * Store a newly created leader.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'title' => 'required|string|max:255',
                'category' => 'required|in:pastoral,elders,ministry,deacons',
                'phone' => 'nullable|string|max:50',
                'email' => 'nullable|email|max:255',
                'linkedin' => 'nullable|string|max:255',
                'facebook' => 'nullable|string|max:255',
                'education' => 'nullable|string',
                'years_of_service' => 'nullable|string|max:255',
                'specialties' => 'nullable|array',
                'quote' => 'nullable|string',
                'bio' => 'nullable|string',
                'achievements' => 'nullable|array',
                'languages' => 'nullable|array',
                'image' => 'nullable|string',
                'order' => 'nullable|integer|min:0',
                'status' => 'required|in:active,inactive'
            ]);

            // If no order provided, set as last
            if (!isset($validated['order'])) {
                $validated['order'] = Leader::max('order') + 1;
            }

            $leader = Leader::create($validated);

            return response()->json([
                'success' => true,
                'data' => $leader,
                'message' => 'Leader created successfully'
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error creating leader: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create leader: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified leader.
     */
    public function show(Leader $leader): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $leader,
            'message' => 'Leader retrieved successfully'
        ]);
    }

    /**
     * Update the specified leader.
     */
    public function update(Request $request, Leader $leader): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'title' => 'required|string|max:255',
                'category' => 'required|in:pastoral,elders,ministry,deacons',
                'phone' => 'nullable|string|max:50',
                'email' => 'nullable|email|max:255',
                'linkedin' => 'nullable|string|max:255',
                'facebook' => 'nullable|string|max:255',
                'education' => 'nullable|string',
                'years_of_service' => 'nullable|string|max:255',
                'specialties' => 'nullable|array',
                'quote' => 'nullable|string',
                'bio' => 'nullable|string',
                'achievements' => 'nullable|array',
                'languages' => 'nullable|array',
                'image' => 'nullable|string',
                'order' => 'nullable|integer|min:0',
                'status' => 'required|in:active,inactive'
            ]);

            $leader->update($validated);

            return response()->json([
                'success' => true,
                'data' => $leader->fresh(),
                'message' => 'Leader updated successfully'
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error updating leader: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update leader: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified leader.
     */
    public function destroy(Leader $leader): JsonResponse
    {
        try {
            $leader->delete();

            return response()->json([
                'success' => true,
                'message' => 'Leader deleted successfully'
            ]);

        } catch (\Exception $e) {
            \Log::error('Error deleting leader: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete leader: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reorder leaders.
     */
    public function reorder(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'leaders' => 'required|array',
                'leaders.*.id' => 'required|exists:leaders,id',
                'leaders.*.order' => 'required|integer|min:0'
            ]);

            foreach ($validated['leaders'] as $leaderData) {
                Leader::where('id', $leaderData['id'])
                    ->update(['order' => $leaderData['order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Leaders reordered successfully'
            ]);

        } catch (\Exception $e) {
            \Log::error('Error reordering leaders: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to reorder leaders: ' . $e->getMessage()
            ], 500);
        }
    }
}