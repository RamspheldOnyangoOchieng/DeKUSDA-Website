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
        Schema::create('sermons', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('speaker');
            $table->date('sermon_date');
            $table->text('scripture_reference')->nullable();
            $table->text('sermon_text')->nullable();
            $table->string('audio_file')->nullable();
            $table->string('video_file')->nullable();
            $table->string('pdf_file')->nullable();
            $table->string('thumbnail')->nullable();
            $table->enum('series', ['sabbath_service', 'vespers', 'week_of_prayer', 'revival', 'youth', 'special_event'])->default('sabbath_service');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->integer('view_count')->default(0);
            $table->integer('download_count')->default(0);
            $table->json('tags')->nullable();
            $table->foreignId('uploaded_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sermons');
    }
};
