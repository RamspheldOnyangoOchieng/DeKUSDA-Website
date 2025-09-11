<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HomepageContent;
use App\Models\HomepageSlide;
use App\Models\WorshipService;
use App\Models\ChurchProject;

class HomepageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Homepage Content Sections
        $contents = [
            [
                'section_key' => 'about_us',
                'title' => 'Who We Are – A Christ-Centered Family at DeKUT',
                'subtitle' => 'Welcome to DEKUSDA Church',
                'content' => 'DEKUSDA (Dedan Kimathi University Seventh-Day Adventist Church) is a vibrant, student-led church located in the heart of Dedan Kimathi University. We are more than just a place of worship—we are a family rooted in Christ, driven by mission, and empowered by love.',
                'button_text' => 'Learn More About Our Church',
                'button_link' => '/Aboutdekusda',
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'section_key' => 'welcome_message',
                'title' => 'Welcome to Our Community',
                'content' => 'Everyone is welcome at DEKUSDA: students, staff, alumni, and the surrounding community. Join us as we journey together toward eternity, walking in truth, love, and the light of the everlasting Gospel.',
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'section_key' => 'prayer_verse',
                'title' => 'Prayer Request',
                'content' => '"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." - Philippians 4:6',
                'subtitle' => 'Share Your Prayer Request',
                'is_active' => true,
                'sort_order' => 3
            ]
        ];

        foreach ($contents as $content) {
            HomepageContent::create($content);
        }

        // Homepage Slides
        $slides = [
            [
                'title' => 'DEKUSDA Family',
                'description' => 'Welcome to our vibrant church community',
                'image_url' => '/assets/Dekusdamain.jpg',
                'cta_link' => '/Aboutdekusda',
                'cta_text' => 'Learn More',
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'title' => 'Collettes Ministry',
                'description' => 'Join our music ministry',
                'image_url' => '/assets/Collettes.jpg',
                'cta_link' => '/Music/ChurchChoir',
                'cta_text' => 'Join Us',
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'title' => 'Bereans Bible Study',
                'description' => 'Dive deep into God\'s Word',
                'image_url' => '/assets/Bereans.jpg',
                'cta_link' => '/Ministries/PersonalMinistries',
                'cta_text' => 'Study With Us',
                'is_active' => true,
                'sort_order' => 3
            ]
        ];

        foreach ($slides as $slide) {
            HomepageSlide::create($slide);
        }

        // Church Projects
        $projects = [
            [
                'title' => 'Sanctuary Renovation Project',
                'description' => 'Modernizing our worship space with improved acoustics, lighting, and seating to enhance the worship experience for our growing congregation.',
                'target_amount' => 150000.00,
                'current_amount' => 97500.00,
                'progress_percentage' => 65,
                'category' => 'construction',
                'target_date' => '2025-12-31',
                'updates' => 'Phase 1 completed: New sound system installed',
                'is_active' => true,
                'is_featured' => true,
                'sort_order' => 1
            ],
            [
                'title' => 'Student Scholarship Program',
                'description' => 'Supporting deserving students with financial assistance for their education while they serve in church ministries.',
                'target_amount' => 50000.00,
                'current_amount' => 28000.00,
                'progress_percentage' => 56,
                'category' => 'education',
                'target_date' => '2025-08-31',
                'updates' => '28 students currently supported',
                'is_active' => true,
                'is_featured' => true,
                'sort_order' => 2
            ]
        ];

        foreach ($projects as $project) {
            ChurchProject::create($project);
        }
    }
}
