<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChurchProject;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ChurchProjectController extends Controller
{
    /**
     * Get all active projects
     */
    public function index(): JsonResponse
    {
        try {
            $projects = ChurchProject::active()->ordered()->get();
            
            return response()->json([
                'status' => 'success',
                'data' => $projects
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch projects',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get featured projects for homepage
     */
    public function featured(): JsonResponse
    {
        try {
            $projects = ChurchProject::active()->featured()->ordered()->take(6)->get();
            
            return response()->json([
                'status' => 'success',
                'data' => $projects
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch featured projects',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create new project (Admin only)
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'target_amount' => 'nullable|numeric|min:0',
                'current_amount' => 'nullable|numeric|min:0',
                'category' => 'required|string|max:100',
                'target_date' => 'nullable|date',
                'image_url' => 'nullable|string|max:500',
                'updates' => 'nullable|string',
                'is_active' => 'boolean',
                'is_featured' => 'boolean',
                'sort_order' => 'integer'
            ]);

            $project = ChurchProject::create($validated);
            $project->calculateProgress();

            return response()->json([
                'status' => 'success',
                'message' => 'Project created successfully',
                'data' => $project
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create project',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update project (Admin only)
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $project = ChurchProject::findOrFail($id);
            
            $validated = $request->validate([
                'title' => 'string|max:255',
                'description' => 'string',
                'target_amount' => 'nullable|numeric|min:0',
                'current_amount' => 'nullable|numeric|min:0',
                'category' => 'string|max:100',
                'target_date' => 'nullable|date',
                'image_url' => 'nullable|string|max:500',
                'updates' => 'nullable|string',
                'is_active' => 'boolean',
                'is_featured' => 'boolean',
                'sort_order' => 'integer'
            ]);

            $project->update($validated);
            $project->calculateProgress();

            return response()->json([
                'status' => 'success',
                'message' => 'Project updated successfully',
                'data' => $project
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update project',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete project (Admin only)
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $project = ChurchProject::findOrFail($id);
            $project->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Project deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete project',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
