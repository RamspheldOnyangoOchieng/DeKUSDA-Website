<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChurchMember;
use App\Models\Event;
use App\Models\Sermon;
use App\Models\PrayerRequest;
use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MemberController extends Controller
{
    /**
     * Get member dashboard data
     */
    public function dashboard()
    {
        try {
            $user = Auth::user();
            $member = $user->churchMember;

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member profile not found'
                ], 404);
            }

            $data = [
                'member_info' => [
                    'name' => $member->first_name . ' ' . $member->last_name,
                    'email' => $user->email,
                    'phone' => $member->phone,
                    'ministry' => $member->ministry,
                    'join_date' => $member->created_at->format('M Y'),
                    'status' => $member->status
                ],
                'quick_stats' => [
                    'upcoming_events' => Event::where('event_date', '>=', now())
                                           ->orderBy('event_date')
                                           ->take(3)
                                           ->get(),
                    'recent_sermons' => Sermon::latest()
                                            ->take(3)
                                            ->get(['id', 'title', 'pastor', 'date', 'audio_file']),
                    'my_prayer_requests' => PrayerRequest::where('requester_name', $member->first_name . ' ' . $member->last_name)
                                                        ->orWhere('requester_email', $user->email)
                                                        ->latest()
                                                        ->take(3)
                                                        ->get(),
                    'my_donations' => Donation::where('church_member_id', $member->id)
                                            ->latest()
                                            ->take(3)
                                            ->get()
                ]
            ];

            return response()->json([
                'success' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load dashboard',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get member profile
     */
    public function profile()
    {
        try {
            $user = Auth::user();
            $member = $user->churchMember;

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member profile not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => $user,
                    'member' => $member
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update member profile
     */
    public function updateProfile(Request $request)
    {
        try {
            $user = Auth::user();
            $member = $user->churchMember;

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member profile not found'
                ], 404);
            }

            $validated = $request->validate([
                'first_name' => 'sometimes|string|max:255',
                'last_name' => 'sometimes|string|max:255',
                'phone' => 'sometimes|string|max:20',
                'address' => 'sometimes|string',
                'occupation' => 'sometimes|string|max:255',
                'emergency_contact_name' => 'sometimes|string|max:255',
                'emergency_contact_phone' => 'sometimes|string|max:20',
            ]);

            $member->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => $member
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get member's prayer requests
     */
    public function myPrayerRequests()
    {
        try {
            $user = Auth::user();
            $member = $user->churchMember;

            $prayers = PrayerRequest::where(function($query) use ($user, $member) {
                $query->where('requester_email', $user->email);
                if ($member) {
                    $query->orWhere('requester_name', $member->first_name . ' ' . $member->last_name);
                }
            })
            ->latest()
            ->paginate(10);

            return response()->json([
                'success' => true,
                'data' => $prayers
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load prayer requests',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get member's donations
     */
    public function myDonations()
    {
        try {
            $user = Auth::user();
            $member = $user->churchMember;

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member profile not found'
                ], 404);
            }

            $donations = Donation::where('church_member_id', $member->id)
                               ->latest()
                               ->paginate(10);

            return response()->json([
                'success' => true,
                'data' => $donations
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load donations',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get member's event registrations
     */
    public function myEvents()
    {
        try {
            $user = Auth::user();
            $member = $user->churchMember;

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member profile not found'
                ], 404);
            }

            // In a real app, you'd have an event_registrations table
            // For now, return upcoming events the member might be interested in
            $events = Event::where('event_date', '>=', now())
                          ->latest()
                          ->paginate(10);

            return response()->json([
                'success' => true,
                'data' => $events
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load events',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
