<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Announcement;
use Carbon\Carbon;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample announcements
        Announcement::create([
            'title' => 'Communication Sabbath',
            'content' => 'Join us for a special time of worship and fellowship — see you there!',
            'category' => 'worship',
            'priority' => 'high',
            'start_date' => Carbon::now(),
            'end_date' => Carbon::now()->addDays(7),
            'is_active' => true,
            'is_featured' => true,
            'target_audience' => 'all',
            'contact_info' => '',
            'action_required' => false,
            'action_deadline' => null,
            'image_url' => '',
            'event_time' => '7:50 AM',
            'event_location' => 'Food Science Workshop',
            'type' => 'general',
            'status' => 'published',
            'show_on_homepage' => true,
            'created_by' => 1  // Assuming admin user exists with ID 1
        ]);

        Announcement::create([
            'title' => 'Youth Fellowship Meeting',
            'content' => 'All youth members are invited to join our weekly fellowship meeting. We will discuss upcoming events and activities.',
            'category' => 'youth',
            'priority' => 'medium',
            'start_date' => Carbon::now()->addDays(1),
            'end_date' => Carbon::now()->addDays(8),
            'is_active' => true,
            'is_featured' => false,
            'target_audience' => 'youth',
            'contact_info' => 'Contact Youth Leader at youth@dekusda.org',
            'action_required' => true,
            'action_deadline' => Carbon::now()->addDays(7),
            'image_url' => '',
            'event_time' => '4:00 PM',
            'event_location' => 'Youth Hall',
            'type' => 'event',
            'status' => 'published',
            'show_on_homepage' => false,
            'created_by' => 1
        ]);

        Announcement::create([
            'title' => 'Health Ministry Workshop',
            'content' => 'Learn about healthy living principles from a Seventh-day Adventist perspective. Topics include nutrition, exercise, and mental wellness.',
            'category' => 'health',
            'priority' => 'medium',
            'start_date' => Carbon::now()->addDays(2),
            'end_date' => Carbon::now()->addDays(9),
            'is_active' => true,
            'is_featured' => false,
            'target_audience' => 'all',
            'contact_info' => 'Register with Health Ministry Team',
            'action_required' => true,
            'action_deadline' => Carbon::now()->addDays(6),
            'image_url' => '',
            'event_time' => '9:00 AM',
            'event_location' => 'Main Sanctuary',
            'type' => 'ministry',
            'status' => 'published',
            'show_on_homepage' => false,
            'created_by' => 1
        ]);
    }
}
