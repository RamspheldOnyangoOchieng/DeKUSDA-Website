<?php

namespace App\Http\Controllers;

use App\Models\Ministry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class MinistryController extends Controller
{
    /**
     * Display a listing of the ministries.
     */
    public function index()
    {
        $ministries = Ministry::with('creator')->orderBy('created_at', 'desc')->paginate(10);
        return response()->json(['status' => 'success', 'data' => $ministries]);
    }

    /**
     * Store a newly created ministry.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'mission_statement' => 'nullable|string',
            'leader_name' => 'nullable|string|max:255',
            'leader_email' => 'nullable|email|max:255',
            'leader_phone' => 'nullable|string|max:20',
            'meeting_schedule' => 'nullable|string|max:255',
            'meeting_location' => 'nullable|string|max:255',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category' => 'required|string|max:255',
            'status' => 'nullable|in:active,inactive',
            'member_count' => 'nullable|integer',
            'requirements' => 'nullable|string',
            'contact_info' => 'nullable|string',
            'social_links' => 'nullable|json',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();
        
        // Handle file upload
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('ministries', 'public');
            $data['featured_image'] = $path;
        }

        $data['created_by'] = auth()->id();
        $ministry = Ministry::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Ministry created successfully',
            'data' => $ministry
        ], 201);
    }

    /**
     * Display the specified ministry.
     */
    public function show(Ministry $ministry)
    {
        return response()->json([
            'status' => 'success',
            'data' => $ministry->load('creator')
        ]);
    }

    /**
     * Update the specified ministry.
     */
    public function update(Request $request, Ministry $ministry)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'mission_statement' => 'nullable|string',
            'leader_name' => 'nullable|string|max:255',
            'leader_email' => 'nullable|email|max:255',
            'leader_phone' => 'nullable|string|max:20',
            'meeting_schedule' => 'nullable|string|max:255',
            'meeting_location' => 'nullable|string|max:255',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category' => 'sometimes|required|string|max:255',
            'status' => 'nullable|in:active,inactive',
            'member_count' => 'nullable|integer',
            'requirements' => 'nullable|string',
            'contact_info' => 'nullable|string',
            'social_links' => 'nullable|json',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();

        // Handle file upload
        if ($request->hasFile('featured_image')) {
            // Delete old image if exists
            if ($ministry->featured_image) {
                Storage::disk('public')->delete($ministry->featured_image);
            }
            $path = $request->file('featured_image')->store('ministries', 'public');
            $data['featured_image'] = $path;
        }

        $ministry->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Ministry updated successfully',
            'data' => $ministry
        ]);
    }

    /**
     * Remove the specified ministry.
     */
    public function destroy(Ministry $ministry)
    {
        // Delete associated image if exists
        if ($ministry->featured_image) {
            Storage::disk('public')->delete($ministry->featured_image);
        }

        $ministry->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Ministry deleted successfully'
        ]);
    }

    /**
     * Get ministries by category
     */
    public function getByCategory($category)
    {
        $ministries = Ministry::where('category', $category)
            ->where('status', 'active')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $ministries
        ]);
    }
}
