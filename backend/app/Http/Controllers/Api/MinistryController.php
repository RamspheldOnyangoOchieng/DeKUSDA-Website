<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Ministry;

class MinistryController extends Controller
{
    /**
     * Display a listing of the resource (public).
     */
    public function index(): JsonResponse
    {
      $ministries = Ministry::where('status', 'active')
        ->orderBy('name')
        ->get();

      return response()->json([
        'success' => true,
        'data' => $ministries,
        'message' => 'Ministries retrieved successfully'
      ]);
    }

    /**
     * Store a newly created resource in storage (admin).
     */
    public function store(Request $request): JsonResponse
    {
      $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'mission_statement' => 'nullable|string',
        'leader_name' => 'nullable|string|max:255',
        'leader_email' => 'nullable|email|max:255',
        'leader_phone' => 'nullable|string|max:50',
        'meeting_schedule' => 'nullable|string',
        'meeting_location' => 'nullable|string|max:255',
        'featured_image' => 'nullable|string',
        'category' => 'nullable|string|max:100',
        'status' => 'required|in:active,inactive,planning',
        'member_count' => 'nullable|integer|min:0',
        'requirements' => 'nullable|string',
        'contact_info' => 'nullable|string',
        'social_links' => 'nullable|array'
      ]);

      $validated['created_by'] = auth()->id();
      $ministry = Ministry::create($validated);

      return response()->json([
        'success' => true,
        'data' => $ministry,
        'message' => 'Ministry created successfully'
      ], 201);
    }

    /**
     * Display the specified resource (public).
     */
    public function show(Ministry $ministry): JsonResponse
    {
      return response()->json([
        'success' => true,
        'data' => $ministry,
        'message' => 'Ministry retrieved successfully'
      ]);
    }

    /**
     * Update the specified resource in storage (admin).
     */
    public function update(Request $request, Ministry $ministry): JsonResponse
    {
      $validated = $request->validate([
        'name' => 'sometimes|string|max:255',
        'description' => 'sometimes|string',
        'mission_statement' => 'nullable|string',
        'leader_name' => 'nullable|string|max:255',
        'leader_email' => 'nullable|email|max:255',
        'leader_phone' => 'nullable|string|max:50',
        'meeting_schedule' => 'nullable|string',
        'meeting_location' => 'nullable|string|max:255',
        'featured_image' => 'nullable|string',
        'category' => 'nullable|string|max:100',
        'status' => 'sometimes|in:active,inactive,planning',
        'member_count' => 'nullable|integer|min:0',
        'requirements' => 'nullable|string',
        'contact_info' => 'nullable|string',
        'social_links' => 'nullable|array'
      ]);

      $ministry->update($validated);

      return response()->json([
        'success' => true,
        'data' => $ministry,
        'message' => 'Ministry updated successfully'
      ]);
    }

    /**
     * Remove the specified resource from storage (admin).
     */
    public function destroy(Ministry $ministry): JsonResponse
    {
      $ministry->delete();

      return response()->json([
        'success' => true,
        'message' => 'Ministry deleted successfully'
      ]);
    }
}
