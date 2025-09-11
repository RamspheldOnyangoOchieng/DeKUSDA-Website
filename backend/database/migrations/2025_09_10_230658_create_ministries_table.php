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
        Schema::create('ministries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->text('mission_statement')->nullable();
            $table->string('leader_name')->nullable();
            $table->string('leader_email')->nullable();
            $table->string('leader_phone')->nullable();
            $table->string('meeting_schedule')->nullable();
            $table->string('meeting_location')->nullable();
            $table->string('featured_image')->nullable();
            $table->enum('category', ['worship', 'youth', 'children', 'music', 'outreach', 'education', 'fellowship', 'service'])->default('fellowship');
            $table->enum('status', ['active', 'inactive', 'planning'])->default('active');
            $table->integer('member_count')->default(0);
            $table->text('requirements')->nullable();
            $table->text('contact_info')->nullable();
            $table->json('social_links')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ministries');
    }
};
