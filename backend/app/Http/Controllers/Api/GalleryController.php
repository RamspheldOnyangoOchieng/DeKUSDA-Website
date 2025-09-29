<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Gallery::query();
        
        // Filter by category if provided
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        $items = $query->orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $items,
            'message' => 'Gallery items retrieved successfully'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|in:Services,Events,Outreach,Youth,Other',
            'date_taken' => 'required|date',
            'is_featured' => 'boolean',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,mp4,webm|max:20480' // 20MB max
        ]);

        try {
            // Handle file upload
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $isVideo = in_array(strtolower($extension), ['mp4', 'webm']);
            
            // Generate unique filename
            $filename = Str::uuid() . '.' . $extension;
            
            // Store in appropriate directory
            $path = $file->storeAs(
                $isVideo ? 'gallery/videos' : 'gallery/images',
                $filename,
                'public'
            );

            // Create gallery item
            $item = Gallery::create([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'category' => $validated['category'],
                'date_taken' => $validated['date_taken'],
                'is_featured' => $validated['is_featured'] ?? false,
                'image_url' => Storage::url($path),
                'media_type' => $isVideo ? 'video' : 'image',
                'uploaded_by' => Auth::id()
            ]);

            return response()->json([
                'success' => true,
                'data' => $item,
                'message' => 'Gallery item created successfully'
            ], 201);

        } catch (\Exception $e) {
            // Delete uploaded file if it exists
            if (isset($path) && Storage::exists($path)) {
                Storage::delete($path);
            }

            return response()->json([
                'success' => false,
                'message' => 'Failed to create gallery item: ' . $e->getMessage()
            ], 500);
        }
    }
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        try {
            $path = $request->file('image')->store('gallery', 'public');
            return response()->json([
                'success' => true,
                'data' => [
                    'url' => asset('storage/' . $path)
                ],
                'message' => 'Image uploaded successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload image'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $item = Gallery::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $item,
            'message' => 'Gallery item retrieved successfully'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string',
            'date_taken' => 'required|date',
            'is_featured' => 'boolean'
        ]);

        $item = Gallery::findOrFail($id);
        $item->update($validated);

        return response()->json([
            'success' => true,
            'data' => $item,
            'message' => 'Gallery item updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $item = Gallery::findOrFail($id);
        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Gallery item deleted successfully'
        ]);
    }
}
