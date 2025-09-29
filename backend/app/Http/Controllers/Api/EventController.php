<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $events = Event::where('status', 'published')
            ->where('start_datetime', '>=', now())
            ->orderBy('start_datetime', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $events,
            'message' => 'Events retrieved successfully'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'start_datetime' => 'required|date',
                'end_datetime' => 'required|date|after:start_datetime',
                'location' => 'nullable|string|max:255',
                'event_type' => 'required|in:worship,bible_study,youth,choir,fellowship,community,conference,other',
                'status' => 'required|in:draft,published,cancelled',
                'featured_image' => 'nullable|string',
                'additional_info' => 'nullable|string',
                'is_recurring' => 'boolean',
                'recurrence_pattern' => 'nullable|string',
                'max_attendees' => 'nullable|integer|min:1',
                'entry_fee' => 'nullable|numeric|min:0',
            ]);

            // Set created_by to first user if no auth, otherwise use authenticated user
            if (auth()->check()) {
                $validated['created_by'] = auth()->id();
            } else {
                // Get the first user as default
                $firstUser = \App\Models\User::first();
                $validated['created_by'] = $firstUser ? $firstUser->id : 1;
            }
            
            $event = Event::create($validated);

            return response()->json([
                'success' => true,
                'data' => $event,
                'message' => 'Event created successfully'
            ], 201);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error creating event: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create event: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $event,
            'message' => 'Event retrieved successfully'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'start_datetime' => 'sometimes|date',
            'end_datetime' => 'sometimes|date|after:start_datetime',
            'location' => 'nullable|string|max:255',
            'event_type' => 'sometimes|in:worship,bible_study,youth,choir,fellowship,community,conference,other',
            'status' => 'sometimes|in:draft,published,cancelled',
            'featured_image' => 'nullable|string',
            'additional_info' => 'nullable|string',
            'is_recurring' => 'boolean',
            'recurrence_pattern' => 'nullable|string',
            'max_attendees' => 'nullable|integer|min:1',
            'entry_fee' => 'nullable|numeric|min:0',
        ]);

        $event->update($validated);

        return response()->json([
            'success' => true,
            'data' => $event,
            'message' => 'Event updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event): JsonResponse
    {
        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Event deleted successfully'
        ]);
    }
}
