<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminSeeder extends Seeder
{
    public function run()
    {
        // Create admin role if it doesn't exist
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $staffRole = Role::firstOrCreate(['name' => 'staff_admin']);
        $leaderRole = Role::firstOrCreate(['name' => 'leader']);
        
        // Create permissions
        $permissions = [
            'manage_ministries',
            'manage_users',
            'manage_content',
            'manage_events',
            'manage_announcements'
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Give all permissions to admin role
        $adminRole->syncPermissions(Permission::all());
        $staffRole->syncPermissions(Permission::all());
        $leaderRole->syncPermissions(['manage_content', 'manage_events']);

        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@dekusda.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole('admin');

        // Create alternative admin user
        $admin2 = User::firstOrCreate(
            ['email' => 'admin@dekusda.org'],
            [
                'name' => 'System Administrator',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );
        $admin2->assignRole('admin');

        // Create department leaders
        $leaders = [
            [
                'name' => 'Communication Director',
                'email' => 'communication@dekusda.org',
                'password' => 'comm_dir_2024',
                'role' => 'admin'
            ],
            [
                'name' => 'Web Coordinator',
                'email' => 'web@dekusda.org', 
                'password' => 'web_coord_2024',
                'role' => 'staff_admin'
            ],
            [
                'name' => 'Pastor Franklin Ochieng',
                'email' => 'pastor@dekusda.org',
                'password' => 'pastor_2024',
                'role' => 'staff_admin'
            ],
            [
                'name' => 'Youth Ministry Leader',
                'email' => 'youth@dekusda.org',
                'password' => 'youth_leader_2024',
                'role' => 'leader'
            ],
            [
                'name' => 'Choir Director',
                'email' => 'choir@dekusda.org',
                'password' => 'choir_dir_2024',
                'role' => 'leader'
            ],
            [
                'name' => 'Health Ministry Leader',
                'email' => 'health@dekusda.org',
                'password' => 'health_2024',
                'role' => 'leader'
            ],
            [
                'name' => 'Education Ministry Leader',
                'email' => 'education@dekusda.org',
                'password' => 'education_2024',
                'role' => 'leader'
            ],
            [
                'name' => 'Finance Committee Chair',
                'email' => 'finance@dekusda.org',
                'password' => 'finance_2024',
                'role' => 'staff_admin'
            ],
            [
                'name' => 'Prayer Ministry Leader',
                'email' => 'prayer@dekusda.org',
                'password' => 'prayer_2024',
                'role' => 'leader'
            ]
        ];

        foreach ($leaders as $leaderData) {
            $leader = User::firstOrCreate(
                ['email' => $leaderData['email']],
                [
                    'name' => $leaderData['name'],
                    'password' => Hash::make($leaderData['password']),
                    'email_verified_at' => now(),
                ]
            );
            $leader->assignRole($leaderData['role']);
        }
    }
}
