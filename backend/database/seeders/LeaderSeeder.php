<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Leader;

class LeaderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $leaders = [
            [
                'name' => 'Pastor Frank Ampofo',
                'title' => 'Senior Pastor',
                'category' => 'pastoral',
                'phone' => '+254 700 123 456',
                'email' => 'pastor.frank@dekusda.org',
                'linkedin' => 'frank-ampofo',
                'facebook' => 'pastor.frank.ampofo',
                'education' => 'Master of Divinity, University of Eastern Africa',
                'years_of_service' => '15 years in ministry',
                'specialties' => ['Biblical Preaching', 'Pastoral Care', 'Church Administration', 'Evangelism'],
                'quote' => 'My passion is to see every member of our university church family grow in their relationship with Christ and discover their unique purpose in God\'s kingdom.',
                'bio' => 'Pastor Frank Ampofo has been faithfully serving the DeKUSDA church family for over 8 years. With a heart for evangelism and discipleship, he has led numerous outreach programs and has seen tremendous growth in our congregation. Before joining DeKUSDA, Pastor Frank served in various pastoral roles across Kenya and has a deep passion for youth ministry and university student outreach.',
                'achievements' => ['Led 12 evangelistic campaigns', 'Established 3 new church plants', 'Authored \'Walking in Faith\' devotional series'],
                'languages' => ['English', 'Kiswahili', 'French'],
                'image' => '/src/assets/pastor-frank.png',
                'order' => 1,
                'status' => 'active'
            ],
            [
                'name' => 'Elder Patricia Wilson',
                'title' => 'Church Elder & Sabbath School Superintendent',
                'category' => 'elders',
                'phone' => '+254 700 987 654',
                'email' => 'patricia.wilson@dekusda.org',
                'education' => 'Bachelor of Education, Kenyatta University',
                'years_of_service' => '22 years in church leadership',
                'specialties' => ['Bible Study', 'Christian Education', 'Women\'s Ministry', 'Prayer Ministry'],
                'quote' => 'God\'s word is our foundation. Through dedicated study and prayer, we can face any challenge with faith and hope.',
                'bio' => 'Elder Patricia Wilson has been a cornerstone of our church for over two decades. Her dedication to Christian education and deep knowledge of Scripture has blessed countless members through her Sabbath School leadership. She coordinates our church\'s educational programs and has been instrumental in our spiritual growth initiatives.',
                'achievements' => ['Developed church-wide Bible study curriculum', 'Led 15 years of Sabbath School growth', 'Coordinated multiple women\'s retreats'],
                'languages' => ['English', 'Twi'],
                'image' => '/src/assets/elder.jpg',
                'order' => 2,
                'status' => 'active'
            ],
            [
                'name' => 'James Mitchell',
                'title' => 'Church Elder & Prayer Ministry Leader',
                'category' => 'elders',
                'phone' => '+254 700 567 890',
                'email' => 'james.mitchell@dekusda.org',
                'education' => 'Business Administration, University of Nairobi',
                'years_of_service' => '18 years in church leadership',
                'specialties' => ['Prayer Ministry', 'Church Finance', 'Facility Management', 'Community Outreach'],
                'quote' => 'Prayer is the breath of the soul. Through constant communion with God, we find strength for every challenge.',
                'bio' => 'Elder James Mitchell brings both spiritual wisdom and practical business acumen to our church leadership. He has overseen several major facility improvements and established our prayer ministry program that has become a beacon of hope for our community.',
                'achievements' => ['Established church prayer ministry', 'Led facility renovation projects', 'Coordinated community outreach programs'],
                'languages' => ['English', 'Twi'],
                'image' => '/src/assets/elder.jpg',
                'order' => 3,
                'status' => 'active'
            ],
            [
                'name' => 'Sarah Osei',
                'title' => 'Youth Ministry Director',
                'category' => 'ministry',
                'phone' => '+233 24 345 6789',
                'email' => 'sarah.osei@dekusda.org',
                'education' => 'Psychology & Counseling, University of Cape Coast',
                'years_of_service' => '8 years in youth ministry',
                'specialties' => ['Youth Development', 'Counseling', 'Event Planning', 'Mentorship Programs'],
                'quote' => 'Every young person has incredible potential. Our job is to help them discover their gifts and use them for God\'s glory.',
                'bio' => 'Sarah Osei leads our vibrant youth ministry with passion and dedication. Her background in psychology helps her connect with young people and guide them through the challenges of university life while strengthening their faith.',
                'achievements' => ['Increased youth participation by 150%', 'Organized annual youth camps', 'Developed peer mentorship program'],
                'languages' => ['English', 'Twi', 'Ewe'],
                'image' => '/src/assets/youth-director.jpg',
                'order' => 4,
                'status' => 'active'
            ],
            [
                'name' => 'Emmanuel Asante',
                'title' => 'Music Ministry Director',
                'category' => 'ministry',
                'phone' => '+233 24 456 7890',
                'email' => 'emmanuel.asante@dekusda.org',
                'education' => 'Music Education, University of Education, Winneba',
                'years_of_service' => '12 years in music ministry',
                'specialties' => ['Choir Direction', 'Music Education', 'Worship Leading', 'Musical Arrangement'],
                'quote' => 'Music is the language of the soul. Through song and praise, we connect with God in a profound and beautiful way.',
                'bio' => 'Emmanuel Asante has elevated our worship experience through his exceptional musical leadership. Under his direction, our church now has three thriving choirs and a contemporary worship team that leads our congregation in heartfelt praise.',
                'achievements' => ['Established three church choirs', 'Produced worship albums', 'Trained over 50 musicians'],
                'languages' => ['English', 'Twi'],
                'image' => '/src/assets/music-director.jpg',
                'order' => 5,
                'status' => 'active'
            ],
            [
                'name' => 'Rebecca Mensah',
                'title' => 'Children\'s Ministry Coordinator',
                'category' => 'ministry',
                'phone' => '+233 24 234 5678',
                'email' => 'rebecca.mensah@dekusda.org',
                'education' => 'Early Childhood Education, Presbyterian College',
                'years_of_service' => '10 years in children\'s ministry',
                'specialties' => ['Child Development', 'Biblical Storytelling', 'Creative Arts', 'Parent Education'],
                'quote' => 'Children are a gift from God. Nurturing their faith from an early age builds a foundation that will last a lifetime.',
                'bio' => 'Rebecca Mensah brings joy and creativity to our children\'s ministry. Her educational background and natural gift with children creates an environment where young ones can learn about God\'s love through engaging activities and stories.',
                'achievements' => ['Developed children\'s curriculum', 'Organized annual children\'s programs', 'Trained children\'s ministry volunteers'],
                'languages' => ['English', 'Twi'],
                'image' => '/src/assets/children-coordinator.jpg',
                'order' => 6,
                'status' => 'active'
            ],
            [
                'name' => 'David Amoah',
                'title' => 'Deacon & Community Outreach Leader',
                'category' => 'deacons',
                'phone' => '+233 24 678 9012',
                'email' => 'david.amoah@dekusda.org',
                'education' => 'Social Work, University of Ghana',
                'years_of_service' => '14 years of service',
                'specialties' => ['Community Service', 'Social Programs', 'Disaster Relief', 'Homeless Ministry'],
                'quote' => 'Faith without works is dead. We show Christ\'s love by serving those in need in our community.',
                'bio' => 'Deacon David Amoah leads our community outreach efforts with compassion and dedication. His social work background helps him identify and address the needs of our surrounding community.',
                'achievements' => ['Organized weekly food distributions', 'Coordinated disaster relief efforts', 'Established homeless shelter program'],
                'languages' => ['English', 'Twi', 'Ga'],
                'image' => '/src/assets/deacon.jpg',
                'order' => 7,
                'status' => 'active'
            ],
            [
                'name' => 'Grace Owusu',
                'title' => 'Deaconess & Women\'s Ministry Leader',
                'category' => 'deacons',
                'phone' => '+233 24 789 0123',
                'email' => 'grace.owusu@dekusda.org',
                'education' => 'Nursing, Kwame Nkrumah University',
                'years_of_service' => '16 years of service',
                'specialties' => ['Health Ministry', 'Women\'s Programs', 'Pastoral Care', 'Medical Missions'],
                'quote' => 'Women have a unique role in building strong families and communities. Together, we can make a lasting difference.',
                'bio' => 'Deaconess Grace Owusu combines her nursing expertise with her ministry calling to serve our church and community. She leads our health ministry and coordinates care for members in need.',
                'achievements' => ['Established church health clinic', 'Led medical mission trips', 'Coordinated women\'s empowerment programs'],
                'languages' => ['English', 'Twi'],
                'image' => '/src/assets/deaconess.jpg',
                'order' => 8,
                'status' => 'active'
            ]
        ];

        foreach ($leaders as $leader) {
            Leader::create($leader);
        }
    }
}