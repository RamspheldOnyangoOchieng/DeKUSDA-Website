<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('announcements', function (Blueprint $table) {
            // Add new fields for homepage functionality
            $table->string('category')->nullable()->after('content');
            $table->datetime('start_date')->nullable()->after('priority');
            $table->datetime('end_date')->nullable()->after('start_date');
            $table->boolean('is_active')->default(true)->after('end_date');
            $table->boolean('is_featured')->default(false)->after('is_active');
            $table->string('contact_info')->nullable()->after('target_audience');
            $table->boolean('action_required')->default(false)->after('contact_info');
            $table->datetime('action_deadline')->nullable()->after('action_required');
            $table->string('image_url')->nullable()->after('action_deadline');
            $table->string('event_time')->nullable()->after('image_url');
            $table->string('event_location')->nullable()->after('event_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('announcements', function (Blueprint $table) {
            $table->dropColumn([
                'category',
                'start_date', 
                'end_date',
                'is_active',
                'is_featured',
                'contact_info',
                'action_required',
                'action_deadline',
                'image_url',
                'event_time',
                'event_location'
            ]);
        });
    }
};
