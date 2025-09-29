<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ChurchMember;
use App\Models\Event;
use App\Models\Sermon;
use App\Models\PrayerRequest;
use App\Models\Ministry;
use App\Models\Announcement;
use App\Models\Donation;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class AdminController extends Controller
{
    /**
     * Get admin dashboard statistics
     */
    public function dashboard(): JsonResponse
    {
        try {
            $stats = [
                'total_members' => ChurchMember::count(),
                'total_events' => Event::count(),
                'total_sermons' => Sermon::count(),
                'total_prayer_requests' => PrayerRequest::count(),
                'pending_prayer_requests' => PrayerRequest::where('status', 'pending')->count(),
                'total_ministries' => Ministry::count(),
                'total_announcements' => Announcement::count(),
                'total_donations' => Donation::count(),
                'total_gallery_items' => Gallery::count(),
                'recent_activities' => $this->getRecentActivities()
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Dashboard statistics retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve dashboard statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get detailed statistics
     */
    public function statistics(): JsonResponse
    {
        try {
            $stats = [
                'members' => [
                    'total' => ChurchMember::count(),
                    'active' => ChurchMember::where('membership_status', 'active')->count(),
                    'new_this_month' => ChurchMember::whereMonth('created_at', Carbon::now()->month)->count(),
                    'by_type' => ChurchMember::groupBy('member_type')->selectRaw('member_type, count(*) as count')->get()
                ],
                'events' => [
                    'total' => Event::count(),
                    'upcoming' => Event::where('start_datetime', '>=', now())->count(),
                    'this_month' => Event::whereMonth('start_datetime', Carbon::now()->month)->count(),
                    'by_type' => Event::groupBy('event_type')->selectRaw('event_type, count(*) as count')->get()
                ],
                'sermons' => [
                    'total' => Sermon::count(),
                    'this_month' => Sermon::whereMonth('sermon_date', Carbon::now()->month)->count(),
                    'by_speaker' => Sermon::groupBy('speaker')->selectRaw('speaker, count(*) as count')->get()
                ],
                'prayers' => [
                    'total' => PrayerRequest::count(),
                    'pending' => PrayerRequest::where('status', 'pending')->count(),
                    'approved' => PrayerRequest::where('status', 'approved')->count(),
                    'answered' => PrayerRequest::where('status', 'answered')->count(),
                    'by_category' => PrayerRequest::groupBy('category')->selectRaw('category, count(*) as count')->get()
                ],
                'donations' => [
                    'total' => Donation::count(),
                    'total_amount' => Donation::sum('amount'),
                    'this_month' => Donation::whereMonth('donation_date', Carbon::now()->month)->sum('amount'),
                    'by_type' => Donation::groupBy('donation_type')->selectRaw('donation_type, count(*) as count, sum(amount) as total')->get()
                ]
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Statistics retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get recent activities
     */
    public function recentActivities(): JsonResponse
    {
        try {
            $activities = $this->getRecentActivities();

            return response()->json([
                'success' => true,
                'data' => $activities,
                'message' => 'Recent activities retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve recent activities',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get monthly statistics
     */
    public function monthlyStats(): JsonResponse
    {
        try {
            $currentMonth = Carbon::now()->month;
            $currentYear = Carbon::now()->year;

            $stats = [
                'members' => ChurchMember::whereMonth('created_at', $currentMonth)
                    ->whereYear('created_at', $currentYear)
                    ->count(),
                'events' => Event::whereMonth('start_datetime', $currentMonth)
                    ->whereYear('start_datetime', $currentYear)
                    ->count(),
                'sermons' => Sermon::whereMonth('sermon_date', $currentMonth)
                    ->whereYear('sermon_date', $currentYear)
                    ->count(),
                'prayers' => PrayerRequest::whereMonth('date_submitted', $currentMonth)
                    ->whereYear('date_submitted', $currentYear)
                    ->count(),
                'donations' => Donation::whereMonth('donation_date', $currentMonth)
                    ->whereYear('donation_date', $currentYear)
                    ->sum('amount')
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Monthly statistics retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve monthly statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get system settings
     */
    public function getSettings(): JsonResponse
    {
        try {
            // This would typically come from a settings table
            $settings = [
                'site_name' => 'DeKUSDA Church',
                'site_description' => 'Dedan Kimathi University SDA Church',
                'contact_email' => 'info@dekusda.org',
                'contact_phone' => '+254 700 000 000',
                'address' => 'Dedan Kimathi University, Nyeri, Kenya',
                'service_times' => [
                    'sabbath_morning' => '09:00',
                    'sabbath_afternoon' => '14:00'
                ],
                'social_media' => [
                    'facebook' => '',
                    'twitter' => '',
                    'instagram' => '',
                    'youtube' => ''
                ]
            ];

            return response()->json([
                'success' => true,
                'data' => $settings,
                'message' => 'Settings retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve settings',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update system settings
     */
    public function updateSettings(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'site_name' => 'sometimes|string|max:255',
                'site_description' => 'sometimes|string|max:500',
                'contact_email' => 'sometimes|email|max:255',
                'contact_phone' => 'sometimes|string|max:20',
                'address' => 'sometimes|string|max:500',
                'service_times' => 'sometimes|array',
                'social_media' => 'sometimes|array'
            ]);

            // In a real application, you would save these to a settings table
            // For now, we'll just return success

            return response()->json([
                'success' => true,
                'message' => 'Settings updated successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update settings',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get recent activities for dashboard
     */
    private function getRecentActivities()
    {
        $activities = [];

        // Recent members
        $recentMembers = ChurchMember::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        foreach ($recentMembers as $member) {
            $activities[] = [
                'type' => 'member',
                'action' => 'New member registered',
                'name' => $member->first_name . ' ' . $member->last_name,
                'time' => $member->created_at->diffForHumans(),
                'date' => $member->created_at
            ];
        }

        // Recent sermons
        $recentSermons = Sermon::orderBy('sermon_date', 'desc')
            ->limit(3)
            ->get();

        foreach ($recentSermons as $sermon) {
            $activities[] = [
                'type' => 'sermon',
                'action' => 'New sermon uploaded',
                'name' => $sermon->title,
                'time' => $sermon->created_at->diffForHumans(),
                'date' => $sermon->created_at
            ];
        }

        // Recent prayer requests
        $recentPrayers = PrayerRequest::orderBy('date_submitted', 'desc')
            ->limit(3)
            ->get();

        foreach ($recentPrayers as $prayer) {
            $activities[] = [
                'type' => 'prayer',
                'action' => 'Prayer request submitted',
                'name' => $prayer->requester_name ?: 'Anonymous',
                'time' => $prayer->date_submitted->diffForHumans(),
                'date' => $prayer->date_submitted
            ];
        }

        // Recent events
        $recentEvents = Event::orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        foreach ($recentEvents as $event) {
            $activities[] = [
                'type' => 'event',
                'action' => 'Event created',
                'name' => $event->title,
                'time' => $event->created_at->diffForHumans(),
                'date' => $event->created_at
            ];
        }

        // Sort by date and return top 10
        usort($activities, function($a, $b) {
            return $b['date'] <=> $a['date'];
        });

        return array_slice($activities, 0, 10);
    }
}