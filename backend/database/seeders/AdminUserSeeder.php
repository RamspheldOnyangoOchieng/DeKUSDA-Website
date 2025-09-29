<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a default admin user if none exists
        if (User::count() === 0) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@dekusda.com',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]);
            
            $this->command->info('Default admin user created successfully!');
        } else {
            $this->command->info('Users already exist, skipping admin user creation.');
        }
    }
}
