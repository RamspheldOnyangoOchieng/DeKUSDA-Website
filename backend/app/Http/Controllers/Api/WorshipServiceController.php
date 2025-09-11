<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WorshipService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class WorshipServiceController extends Controller
{
    /**
     * Get all active worship services
     */
    public function index(): JsonResponse
    {
        try {
            $services = WorshipService::active()->ordered()->get();
            
            return response()->json([
                'status' => 'success',
                'data' => $services
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch worship services',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create new worship service (Admin only)
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'time' => 'required|string|max:100',
                'location' => 'required|string|max:255',
                'description' => 'required|string',
                'leader' => 'nullable|string|max:255',
                'attendees' => 'nullable|string|max:255',
                'type' => 'required|string|max:50',
                'highlights' => 'nullable|array',
                'is_active' => 'boolean',
                'sort_order' => 'integer'
            ]);

            $service = WorshipService::create($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Worship service created successfully',
                'data' => $service
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create worship service',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update worship service (Admin only)
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $service = WorshipService::findOrFail($id);
            
            $validated = $request->validate([
                'name' => 'string|max:255',
                'time' => 'string|max:100',
                'location' => 'string|max:255',
                'description' => 'string',
                'leader' => 'nullable|string|max:255',
                'attendees' => 'nullable|string|max:255',
                'type' => 'string|max:50',
                'highlights' => 'nullable|array',
                'is_active' => 'boolean',
                'sort_order' => 'integer'
            ]);

            $service->update($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Worship service updated successfully',
                'data' => $service
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update worship service',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete worship service (Admin only)
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $service = WorshipService::findOrFail($id);
            $service->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Worship service deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete worship service',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
