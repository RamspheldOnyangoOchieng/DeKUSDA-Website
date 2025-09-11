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
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('type', ['photo', 'video', 'mixed'])->default('photo');
            $table->enum('category', ['events', 'worship', 'youth', 'choir', 'fellowship', 'community', 'historical', 'leadership'])->default('events');
            $table->string('file_path');
            $table->string('file_name');
            $table->string('file_type'); // image/jpeg, video/mp4, etc.
            $table->integer('file_size'); // in bytes
            $table->string('thumbnail_path')->nullable();
            $table->date('event_date')->nullable();
            $table->string('photographer_credit')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->boolean('is_featured')->default(false);
            $table->integer('view_count')->default(0);
            $table->integer('download_count')->default(0);
            $table->json('tags')->nullable();
            $table->text('alt_text')->nullable(); // for accessibility
            $table->foreignId('uploaded_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galleries');
    }
};
