<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sermon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class SermonController extends Controller
{
    /**
     * Display a listing of sermons.
     */
    public function index(): JsonResponse
    {
        $sermons = Sermon::where('status', 'published')
            ->with('uploader')
            ->orderBy('sermon_date', 'desc')
            ->paginate(12);

        return response()->json([
            'success' => true,
            'data' => $sermons,
            'message' => 'Sermons retrieved successfully'
        ]);
    }

    /**
     * Store a newly created sermon.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'speaker' => 'required|string|max:255',
            'sermon_date' => 'required|date',
            'scripture_reference' => 'nullable|string',
            'sermon_text' => 'nullable|string',
            'audio_file' => 'nullable|file|mimes:mp3,wav,ogg|max:500000', // 500MB
            'video_file' => 'nullable|file|mimes:mp4,avi,mov|max:1000000', // 1GB
            'pdf_file' => 'nullable|file|mimes:pdf|max:50000', // 50MB
            'thumbnail' => 'nullable|image|max:10000', // 10MB
            'series' => 'required|in:sabbath_service,vespers,week_of_prayer,revival,youth,special_event',
            'status' => 'required|in:draft,published,archived',
            'tags' => 'nullable|array',
        ]);

        // Handle file uploads
        if ($request->hasFile('audio_file')) {
            $validated['audio_file'] = $request->file('audio_file')->store('sermons/audio', 'public');
        }

        if ($request->hasFile('video_file')) {
            $validated['video_file'] = $request->file('video_file')->store('sermons/video', 'public');
        }

        if ($request->hasFile('pdf_file')) {
            $validated['pdf_file'] = $request->file('pdf_file')->store('sermons/pdf', 'public');
        }

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('sermons/thumbnails', 'public');
        }

        $validated['uploaded_by'] = auth()->id();
        $sermon = Sermon::create($validated);

        return response()->json([
            'success' => true,
            'data' => $sermon,
            'message' => 'Sermon created successfully'
        ], 201);
    }

    /**
     * Display the specified sermon.
     */
    public function show(Sermon $sermon): JsonResponse
    {
        $sermon->increment('view_count');
        
        return response()->json([
            'success' => true,
            'data' => $sermon->load('uploader'),
            'message' => 'Sermon retrieved successfully'
        ]);
    }

    /**
     * Update the specified sermon.
     */
    public function update(Request $request, Sermon $sermon): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'speaker' => 'sometimes|string|max:255',
            'sermon_date' => 'sometimes|date',
            'scripture_reference' => 'nullable|string',
            'sermon_text' => 'nullable|string',
            'series' => 'sometimes|in:sabbath_service,vespers,week_of_prayer,revival,youth,special_event',
            'status' => 'sometimes|in:draft,published,archived',
            'tags' => 'nullable|array',
        ]);

        // Handle file uploads if provided
        if ($request->hasFile('audio_file')) {
            if ($sermon->audio_file) {
                Storage::disk('public')->delete($sermon->audio_file);
            }
            $validated['audio_file'] = $request->file('audio_file')->store('sermons/audio', 'public');
        }

        if ($request->hasFile('video_file')) {
            if ($sermon->video_file) {
                Storage::disk('public')->delete($sermon->video_file);
            }
            $validated['video_file'] = $request->file('video_file')->store('sermons/video', 'public');
        }

        if ($request->hasFile('pdf_file')) {
            if ($sermon->pdf_file) {
                Storage::disk('public')->delete($sermon->pdf_file);
            }
            $validated['pdf_file'] = $request->file('pdf_file')->store('sermons/pdf', 'public');
        }

        if ($request->hasFile('thumbnail')) {
            if ($sermon->thumbnail) {
                Storage::disk('public')->delete($sermon->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('sermons/thumbnails', 'public');
        }

        $sermon->update($validated);

        return response()->json([
            'success' => true,
            'data' => $sermon,
            'message' => 'Sermon updated successfully'
        ]);
    }

    /**
     * Remove the specified sermon.
     */
    public function destroy(Sermon $sermon): JsonResponse
    {
        // Delete associated files
        if ($sermon->audio_file) {
            Storage::disk('public')->delete($sermon->audio_file);
        }
        if ($sermon->video_file) {
            Storage::disk('public')->delete($sermon->video_file);
        }
        if ($sermon->pdf_file) {
            Storage::disk('public')->delete($sermon->pdf_file);
        }
        if ($sermon->thumbnail) {
            Storage::disk('public')->delete($sermon->thumbnail);
        }

        $sermon->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sermon deleted successfully'
        ]);
    }

    /**
     * Download sermon file.
     */
    public function download(Sermon $sermon, string $type): JsonResponse
    {
        $filePath = null;
        
        switch ($type) {
            case 'audio':
                $filePath = $sermon->audio_file;
                break;
            case 'video':
                $filePath = $sermon->video_file;
                break;
            case 'pdf':
                $filePath = $sermon->pdf_file;
                break;
            default:
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid file type'
                ], 400);
        }

        if (!$filePath || !Storage::disk('public')->exists($filePath)) {
            return response()->json([
                'success' => false,
                'message' => 'File not found'
            ], 404);
        }

        $sermon->increment('download_count');

        return response()->json([
            'success' => true,
            'data' => [
                'download_url' => Storage::disk('public')->url($filePath),
                'filename' => basename($filePath)
            ],
            'message' => 'Download link generated successfully'
        ]);
    }
}
