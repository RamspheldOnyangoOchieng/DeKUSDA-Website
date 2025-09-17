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

        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@dekusda.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );

        // Assign admin role to user
        $admin->assignRole('admin');
    }
}
