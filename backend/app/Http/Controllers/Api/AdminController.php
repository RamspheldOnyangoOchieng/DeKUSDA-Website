<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChurchMember;
use App\Models\Event;
use App\Models\PrayerRequest;
use App\Models\Sermon;
use App\Models\Ministry;
use App\Models\Announcement;
use App\Models\Donation;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Get dashboard statistics
     */
    public function dashboard()
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
                'recent_activities' => $this->getRecentActivities()
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load dashboard statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get recent activities
     */
    private function getRecentActivities()
    {
        $activities = [];

        // Recent members
        $recentMembers = ChurchMember::latest()->take(2)->get();
        foreach ($recentMembers as $member) {
            $activities[] = [
                'type' => 'member',
                'action' => 'New member registered',
                'name' => $member->first_name . ' ' . $member->last_name,
                'time' => $member->created_at->diffForHumans()
            ];
        }

        // Recent sermons
        $recentSermons = Sermon::latest()->take(2)->get();
        foreach ($recentSermons as $sermon) {
            $activities[] = [
                'type' => 'sermon',
                'action' => 'New sermon uploaded',
                'name' => $sermon->title,
                'time' => $sermon->created_at->diffForHumans()
            ];
        }

        // Recent prayer requests
        $recentPrayers = PrayerRequest::latest()->take(2)->get();
        foreach ($recentPrayers as $prayer) {
            $activities[] = [
                'type' => 'prayer',
                'action' => 'Prayer request submitted',
                'name' => $prayer->requester_name ?: 'Anonymous',
                'time' => $prayer->created_at->diffForHumans()
            ];
        }

        // Recent events
        $recentEvents = Event::latest()->take(2)->get();
        foreach ($recentEvents as $event) {
            $activities[] = [
                'type' => 'event',
                'action' => 'Event created',
                'name' => $event->title,
                'time' => $event->created_at->diffForHumans()
            ];
        }

        // Sort by creation time and return top 10
        return collect($activities)->sortByDesc('time')->take(10)->values()->toArray();
    }

    /**
     * Get system settings
     */
    public function getSettings()
    {
        try {
            // Mock settings - in a real app, you'd have a settings table
            $settings = [
                'church_name' => 'Dedan Kimathi University SDA Church',
                'church_address' => 'Dedan Kimathi University of Technology, Nyeri',
                'church_phone' => '+254 700 000 000',
                'church_email' => 'info@dekusda.org',
                'max_file_size' => '50MB',
                'allowed_file_types' => 'jpg,jpeg,png,gif,mp3,mp4,pdf,doc,docx',
                'auto_approve_prayers' => false,
                'maintenance_mode' => false
            ];

            return response()->json([
                'success' => true,
                'data' => $settings
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load settings',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update system settings
     */
    public function updateSettings(Request $request)
    {
        try {
            // In a real app, you'd validate and save these to a settings table
            // For now, we'll just return success
            
            return response()->json([
                'success' => true,
                'message' => 'Settings updated successfully',
                'data' => $request->all()
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
     * Get monthly statistics
     */
    public function monthlyStats()
    {
        try {
            $currentMonth = now()->month;
            $currentYear = now()->year;

            $stats = [
                'new_members_this_month' => ChurchMember::whereMonth('created_at', $currentMonth)
                                                       ->whereYear('created_at', $currentYear)
                                                       ->count(),
                'events_this_month' => Event::whereMonth('event_date', $currentMonth)
                                          ->whereYear('event_date', $currentYear)
                                          ->count(),
                'sermons_this_month' => Sermon::whereMonth('created_at', $currentMonth)
                                            ->whereYear('created_at', $currentYear)
                                            ->count(),
                'prayers_this_month' => PrayerRequest::whereMonth('created_at', $currentMonth)
                                                   ->whereYear('created_at', $currentYear)
                                                   ->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load monthly statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
