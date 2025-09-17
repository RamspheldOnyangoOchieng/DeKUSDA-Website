<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AboutContent;

class AboutContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // About Dekusda Content
        $aboutDekusdaContent = [
            [
                'page_type' => 'about_dekusda',
                'section_key' => 'welcome',
                'title' => 'WELCOME TO DEDAN KIMATHI UNIVERSITY(DeKUSDA)',
                'content' => ''
            ],
            [
                'page_type' => 'about_dekusda',
                'section_key' => 'about_us',
                'title' => 'ABOUT US!',
                'content' => 'SDA Church Dedan Kimathi University is a vibrant Seventh-day Adventist congregation based in Kimathi. We are passionate about faith, fellowship, and community service.'
            ],
            [
                'page_type' => 'about_dekusda',
                'section_key' => 'mission',
                'title' => 'Mission',
                'content' => 'To make disciples of all people by proclaiming the everlasting gospel in the context of the three angel messages of <b>Revelation 14:6–12</b>, leading them to accept Jesus as their personal Savior, unite with the remnant church, nurturing them to serve Him as Lord, and preparing them for His soon return.'
            ],
            [
                'page_type' => 'about_dekusda',
                'section_key' => 'vision',
                'title' => 'Our Vision',
                'content' => 'Empowering Seventh-day Adventist students, professionals, the church, and healing the nation.'
            ],
            [
                'page_type' => 'about_dekusda',
                'section_key' => 'purpose',
                'title' => 'Our Purpose',
                'content' => '<ol type="A"><li>To assist students studying in Dedan Kimathi University of Technology (DEKUT) to resolve problems that negatively impact their Christian principles and lifestyles.</li><li>To promote a culture of continued learning in the Adventist church and community at large, embracing the principle of Christian education.</li><li>To create mechanisms for integrating and inducting students into the world of work.</li><li>To mobilize Adventist professionals for professional input to Adventist students in DEKUT, the church, and the community.</li></ol>'
            ],
            [
                'page_type' => 'about_dekusda',
                'section_key' => 'activities',
                'title' => 'Our Activities',
                'content' => '<div class="activities-container"><div class="activity-card"><h3>Bible Study</h3><p>Join us for deep, interactive study of the Bible every Wednesday from 6pm.</p></div><div class="activity-card"><h3>HARMONIZATION</h3><p>Join us every Thursday for a powerful harmonization session as we prepare for Sabbath!</p></div><div class="activity-card"><h3>Missions</h3><p>We serve the community — helping the needy, sharing hope and love. We also have missions every year. Want to know about our upcoming mission?</p></div></div>'
            ],
            [
                'page_type' => 'about_dekusda',
                'section_key' => 'worship',
                'title' => 'Worship with Us',
                'content' => 'Join us every <strong>Saturday (Sabbath)</strong> in KIMATHI UNIVERSITY around Student\'s Mess. Services begin at <strong>7:50 AM</strong>.'
            ],
            [
                'page_type' => 'about_dekusda',
                'section_key' => 'location',
                'title' => 'Where to Find Us',
                'content' => 'Dekusda church is located in DEDAN KIMATHI UNIVERSITY OF TECHNOLOGY in Nyeri County.'
            ],
            [
                'page_type' => 'about_dekusda',
                'section_key' => 'contact',
                'title' => 'Contact Us',
                'content' => '<p>Email: <a href="mailto:dekutsda@students.dkut.ac.ke">dekutsda@students.dkut.ac.ke</a></p><div class="social-icons"><a href="" target="_blank" rel="noopener noreferrer">Follow us on Instagram</a><br><a href="" target="_blank" rel="noopener noreferrer">Subscribe to our YouTube channel</a></div>'
            ]
        ];

        // Insert all content
        foreach ($aboutDekusdaContent as $content) {
            AboutContent::create($content);
        }

        // About SDA Content
        $aboutSdaContent = [
            [
                'page_type' => 'about_sda',
                'section_key' => 'title',
                'title' => 'ABOUT SEVENTH DAY ADVENTIST CHURCH (SDA)',
                'content' => ''
            ],
            [
                'page_type' => 'about_sda',
                'section_key' => 'motto',
                'title' => '"Come now, let us reason together" - Isaiah 1:18',
                'content' => 'A faith that welcomes intellectual inquiry'
            ],
            [
                'page_type' => 'about_sda',
                'section_key' => 'history_title',
                'title' => 'SMALL HISTORY ABOUT SDA',
                'content' => 'The Seventh-day Adventist Church emerged from the Great Awakening movements of the 19th century, when young Bible students began questioning mainstream interpretations of Scripture.'
            ],
            [
                'page_type' => 'about_sda',
                'section_key' => 'qa_title',
                'title' => 'FREQUENT Q&A',
                'content' => ''
            ],
            [
                'page_type' => 'about_sda',
                'section_key' => 'global_impact_title',
                'title' => 'Adventist Global Impact',
                'content' => ''
            ],
            [
                'page_type' => 'about_sda',
                'section_key' => 'global_impact_content',
                'title' => '',
                'content' => '<div class="impact-grid"><div class="impact-card"><h3>Education</h3><p><strong>118</strong> universities worldwide</p><p>Education in <strong>150+</strong> languages</p></div><div class="impact-card"><h3>Healthcare</h3><p><strong>175</strong> hospitals</p><p>Loma Linda ranked top hospital in CA</p></div><div class="impact-card"><h3>Humanitarian</h3><p>ADRA in <strong>118</strong> countries</p><p><strong>10M+</strong> served annually</p></div></div>'
            ],
            [
                'page_type' => 'about_sda',
                'section_key' => 'mission_title',
                'title' => 'Mission & Church Structure',
                'content' => 'The mission of the SDA Church is to proclaim the everlasting gospel of Jesus Christ to all people, teaching biblical principles and promoting a healthy, balanced lifestyle.'
            ],
            [
                'page_type' => 'about_sda',
                'section_key' => 'mission_content',
                'title' => '',
                'content' => '<ul><li>Global organizational structure</li><li>Emphasis on youth and community programs</li><li>Active missionary work worldwide</li></ul>'
            ]
        ];

        // Insert AboutSDA content
        foreach ($aboutSdaContent as $content) {
            AboutContent::create($content);
        }

        // Elder Message Content
        $elderMessageContent = [
            [
                'page_type' => 'elder_message',
                'section_key' => 'title',
                'title' => 'First Elder',
                'content' => ''
            ],
            [
                'page_type' => 'elder_message',
                'section_key' => 'heading',
                'title' => 'Word From the First Elder',
                'content' => ''
            ],
            [
                'page_type' => 'elder_message',
                'section_key' => 'elder_name',
                'title' => 'Brian Okari, First Elder',
                'content' => ''
            ],
            [
                'page_type' => 'elder_message',
                'section_key' => 'quote',
                'title' => '"How good! How pleasant! it is for brethren to commune together in love."',
                'content' => ''
            ],
            [
                'page_type' => 'elder_message',
                'section_key' => 'message',
                'title' => '',
                'content' => '<p>Welcome to DeKUSDA, the Seventh-day Adventist Church at Dedan Kimathi University of Technology. I warmly welcome you to this sacred space — a home far away from home, where faith meets intellect, and divine purpose shapes destinies.</p><p>In a world that is constantly changing, filled with empty pursuits, and ever-widening voids; in such a world that needs light, hope, and direction, DeKUSDA Church stands as a beacon of hope and spiritual anchorage. Within the dynamic and often challenging university environment, our church strives — in the most diverse and intentional ways — to meet the deepest spiritual, emotional, and moral needs of students and members.</p><p>Guided by our vision: "To empower the Seventh-day Adventist students, professionals and the Church, to heal the nation", we are committed to fostering a mission-focused culture through public campus ministries, personal ministry, and evangelistic outreach.</p><p><span class="italic text-gray-600">"Iron sharpeneth iron; so a man sharpeneth the countenance of his friend." — Proverbs 27:17</span><br />We place a strong emphasis on mentorship among members — where the spiritually mature walk alongside the young in faith — and on the upbringing of leaders who are rooted in Christ and equipped to serve.</p><p>A church that fails to engage in mission and evangelism risks losing its heart and identity. Thus, as a church, we are unequivocally committed to the Great Commission Christ entrusted to us in <span class="font-semibold text-blue-700"> Matthew 28:18–20</span>, where He declares, <span class="italic text-gray-600"> "All authority in heaven and on earth has been given to Me. Go ye therefore and make disciples…"</span></p><p>As a church, we move forward not by our own strength, but with unwavering confidence in the One who called us. Christ\'s words echo time and again and anchor our ministry: <span class="italic text-gray-600"> "Lo, I am with you alway, even unto the end of the world"</span> (Matthew 28:20). Through every season, every challenge, and every opportunity, God has been faithful — and we trust fully in His continued leading.</p><p class="font-semibold text-blue-800">Welcome on board!</p>'
            ]
        ];

        // Insert Elder Message content
        foreach ($elderMessageContent as $content) {
            AboutContent::create($content);
        }

        // Pastor Message Content
        $pastorMessageContent = [
            [
                'page_type' => 'pastor_message',
                'section_key' => 'title',
                'title' => 'Chaplain',
                'content' => ''
            ],
            [
                'page_type' => 'pastor_message',
                'section_key' => 'heading',
                'title' => 'Message from the Chaplain',
                'content' => ''
            ],
            [
                'page_type' => 'pastor_message',
                'section_key' => 'pastor_name',
                'title' => 'Pastor Frank Maina',
                'content' => ''
            ],
            [
                'page_type' => 'pastor_message',
                'section_key' => 'quote',
                'title' => '"The fear of the Lord is the beginning of wisdom."',
                'content' => ''
            ],
            [
                'page_type' => 'pastor_message',
                'section_key' => 'message',
                'title' => '',
                'content' => '<p>Hello there.</p><p>Welcome to <span class="font-semibold text-blue-600">Dedan Kimathi University Seventh-Day Adventist Church</span>. We\'re here to support Adventist students in finding space for spiritual exploration and nourishment — reminding you that, <span class="italic"> "The fear of the Lord is the beginning of wisdom."</span></p><p>Here, we are nurturing <span class="font-semibold">spirit</span>, <span class="font-semibold">soul</span>, and <span class="font-semibold">service</span>. Our Chaplaincy department offers pastoral care, spiritual programs, and opportunities for service — embracing diversity and fostering well-being.</p><p>May the good Lord bless you for visiting this site.</p><div class="text-right mt-6"><p class="text-xl font-medium text-gray-800">Pastor Frank Maina,</p><p class="text-gray-700">Chaplain</p></div>'
            ]
        ];

        // Insert Pastor Message content
        foreach ($pastorMessageContent as $content) {
            AboutContent::create($content);
        }
    }
}
