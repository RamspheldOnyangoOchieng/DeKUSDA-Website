<?php

namespace App\Http\Controllers;

use App\Models\Sermon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SermonController extends Controller
{
    public function index()
    {
        $sermons = Sermon::orderBy('sermon_date', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $sermons->toArray() // Ensure we always return an array
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'speaker' => 'required|string|max:255',
            'sermon_date' => 'required|date',
            'scripture_reference' => 'nullable|string|max:255',
            'sermon_text' => 'nullable|string',
            'series' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
            'tags' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }

        $sermon = Sermon::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Sermon created successfully',
            'data' => $sermon
        ], 201);
    }

    public function show($id)
    {
        $sermon = Sermon::find($id);
        
        if (!$sermon) {
            return response()->json([
                'success' => false,
                'message' => 'Sermon not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $sermon
        ]);
    }

    public function update(Request $request, $id)
    {
        $sermon = Sermon::find($id);

        if (!$sermon) {
            return response()->json([
                'success' => false,
                'message' => 'Sermon not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'description' => 'string',
            'speaker' => 'string|max:255',
            'sermon_date' => 'date',
            'scripture_reference' => 'nullable|string|max:255',
            'sermon_text' => 'nullable|string',
            'series' => 'nullable|string|max:255',
            'status' => 'in:draft,published',
            'tags' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }

        $sermon->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Sermon updated successfully',
            'data' => $sermon
        ]);
    }

    public function destroy($id)
    {
        $sermon = Sermon::find($id);

        if (!$sermon) {
            return response()->json([
                'success' => false,
                'message' => 'Sermon not found'
            ], 404);
        }

        // Delete associated files
        if ($sermon->audio_file) {
            Storage::delete($sermon->audio_file);
        }
        if ($sermon->video_file) {
            Storage::delete($sermon->video_file);
        }
        if ($sermon->pdf_file) {
            Storage::delete($sermon->pdf_file);
        }
        if ($sermon->thumbnail) {
            Storage::delete($sermon->thumbnail);
        }

        $sermon->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sermon deleted successfully'
        ]);
    }

    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|max:500000', // 500MB max
            'type' => 'required|in:audio,video,pdf,thumbnail'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }

        $file = $request->file('file');
        $path = $file->store('sermons/' . $request->type);

        return response()->json([
            'success' => true,
            'message' => 'File uploaded successfully',
            'data' => [
                'path' => $path
            ]
        ]);
    }
}
