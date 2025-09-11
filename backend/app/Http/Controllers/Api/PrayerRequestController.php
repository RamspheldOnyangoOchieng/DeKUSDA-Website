<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PrayerRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PrayerRequestController extends Controller
{
    /**
     * Display a listing of prayer requests (admin only).
     */
    public function index(): JsonResponse
    {
        $prayerRequests = PrayerRequest::with('approver')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $prayerRequests,
            'message' => 'Prayer requests retrieved successfully'
        ]);
    }

    /**
     * Display public prayer requests.
     */
    public function public(): JsonResponse
    {
        $publicPrayers = PrayerRequest::where('status', 'approved')
            ->where('is_public', true)
            ->orderBy('date_submitted', 'desc')
            ->limit(10)
            ->get(['id', 'requester_name', 'prayer_request', 'category', 'date_submitted', 'prayer_count']);

        return response()->json([
            'success' => true,
            'data' => $publicPrayers,
            'message' => 'Public prayer requests retrieved successfully'
        ]);
    }

    /**
     * Store a newly created prayer request.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'requester_name' => 'required|string|max:255',
            'requester_email' => 'nullable|email|max:255',
            'requester_phone' => 'nullable|string|max:20',
            'prayer_request' => 'required|string',
            'category' => 'required|in:healing,guidance,thanksgiving,family,financial,spiritual,other',
            'is_public' => 'boolean',
            'is_urgent' => 'boolean',
        ]);

        $validated['date_submitted'] = now();
        $validated['status'] = 'pending';

        $prayerRequest = PrayerRequest::create($validated);

        return response()->json([
            'success' => true,
            'data' => $prayerRequest,
            'message' => 'Prayer request submitted successfully'
        ], 201);
    }

    /**
     * Display the specified prayer request.
     */
    public function show(PrayerRequest $prayerRequest): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $prayerRequest->load('approver'),
            'message' => 'Prayer request retrieved successfully'
        ]);
    }

    /**
     * Update the specified prayer request (admin only).
     */
    public function update(Request $request, PrayerRequest $prayerRequest): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'sometimes|in:pending,approved,praying,answered,archived',
            'answer_testimony' => 'nullable|string',
            'date_answered' => 'nullable|date',
            'prayer_count' => 'sometimes|integer|min:0',
        ]);

        if (isset($validated['status']) && $validated['status'] === 'approved') {
            $validated['approved_by'] = auth()->id();
        }

        $prayerRequest->update($validated);

        return response()->json([
            'success' => true,
            'data' => $prayerRequest,
            'message' => 'Prayer request updated successfully'
        ]);
    }

    /**
     * Remove the specified prayer request.
     */
    public function destroy(PrayerRequest $prayerRequest): JsonResponse
    {
        $prayerRequest->delete();

        return response()->json([
            'success' => true,
            'message' => 'Prayer request deleted successfully'
        ]);
    }

    /**
     * Increment prayer count.
     */
    public function pray(PrayerRequest $prayerRequest): JsonResponse
    {
        $prayerRequest->increment('prayer_count');

        return response()->json([
            'success' => true,
            'data' => ['prayer_count' => $prayerRequest->prayer_count],
            'message' => 'Prayer count updated'
        ]);
    }
}
