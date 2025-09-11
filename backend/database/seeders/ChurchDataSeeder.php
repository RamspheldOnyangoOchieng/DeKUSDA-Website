<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Event;
use App\Models\PrayerRequest;
use App\Models\Sermon;
use App\Models\Ministry;
use App\Models\Announcement;
use App\Models\ChurchMember;

class ChurchDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::firstOrCreate([
            'email' => 'admin@dekusda.org'
        ], [
            'name' => 'DeKUSDA Admin',
            'password' => bcrypt('admin123'),
            'email_verified_at' => now(),
        ]);

        // Create sample events
        Event::create([
            'title' => 'Sabbath Worship Service',
            'description' => 'Join us for our weekly Sabbath worship service featuring inspiring music, prayer, and biblical teachings.',
            'start_datetime' => now()->addDays(7)->setTime(9, 0),
            'end_datetime' => now()->addDays(7)->setTime(12, 0),
            'location' => 'DeKUSDA Church Main Sanctuary',
            'event_type' => 'worship',
            'status' => 'published',
            'created_by' => $admin->id,
        ]);

        Event::create([
            'title' => 'Youth Fellowship',
            'description' => 'Monthly youth fellowship with games, discussions, and spiritual growth activities.',
            'start_datetime' => now()->addDays(14)->setTime(15, 0),
            'end_datetime' => now()->addDays(14)->setTime(18, 0),
            'location' => 'Youth Hall',
            'event_type' => 'youth',
            'status' => 'published',
            'created_by' => $admin->id,
        ]);

        // Create sample prayer requests
        PrayerRequest::create([
            'requester_name' => 'John Doe',
            'requester_email' => 'john@example.com',
            'prayer_request' => 'Please pray for my upcoming exams and for wisdom in my studies.',
            'category' => 'guidance',
            'status' => 'approved',
            'is_public' => true,
            'date_submitted' => now()->subDays(2),
            'approved_by' => $admin->id,
            'prayer_count' => 15,
        ]);

        PrayerRequest::create([
            'requester_name' => 'Sarah Smith',
            'prayer_request' => 'Requesting prayers for my grandmother who is in the hospital.',
            'category' => 'healing',
            'status' => 'approved',
            'is_public' => true,
            'date_submitted' => now()->subDays(5),
            'approved_by' => $admin->id,
            'prayer_count' => 23,
        ]);

        // Create sample sermons
        Sermon::create([
            'title' => 'Walking in Faith',
            'description' => 'A powerful message about trusting God in uncertain times.',
            'speaker' => 'Pastor Franklin Ochieng',
            'sermon_date' => now()->subDays(7),
            'scripture_reference' => 'Hebrews 11:1-6',
            'sermon_text' => 'Faith is the substance of things hoped for, the evidence of things not seen...',
            'series' => 'sabbath_service',
            'status' => 'published',
            'uploaded_by' => $admin->id,
            'view_count' => 45,
        ]);

        // Create sample ministries
        Ministry::create([
            'name' => 'DeKUSDA Choir',
            'description' => 'Our church choir ministry that leads worship through beautiful music and song.',
            'mission_statement' => 'To glorify God through music and enhance the worship experience.',
            'leader_name' => 'Music Director',
            'meeting_schedule' => 'Every Wednesday 6:00 PM',
            'meeting_location' => 'Church Sanctuary',
            'category' => 'music',
            'status' => 'active',
            'member_count' => 25,
            'created_by' => $admin->id,
        ]);

        Ministry::create([
            'name' => 'Youth Ministry',
            'description' => 'Dedicated to nurturing the spiritual growth of young people in our church.',
            'mission_statement' => 'Empowering youth to become strong Christian leaders.',
            'leader_name' => 'Youth Leader',
            'meeting_schedule' => 'Every Saturday 3:00 PM',
            'meeting_location' => 'Youth Hall',
            'category' => 'youth',
            'status' => 'active',
            'member_count' => 40,
            'created_by' => $admin->id,
        ]);

        // Create sample announcements
        Announcement::create([
            'title' => 'Communication Sabbath This Week',
            'content' => 'This Sabbath will be a special Communication Sabbath. Join us for worship and fellowship at the Food Science Workshop at 7:50 AM.',
            'type' => 'general',
            'priority' => 'high',
            'status' => 'published',
            'publish_date' => now(),
            'show_on_homepage' => true,
            'created_by' => $admin->id,
        ]);

        // Create sample church member
        ChurchMember::create([
            'first_name' => 'John',
            'last_name' => 'Kamau',
            'email' => 'john.kamau@example.com',
            'phone' => '+254700123456',
            'membership_status' => 'active',
            'member_type' => 'regular',
            'user_id' => $admin->id,
        ]);
    }
}
