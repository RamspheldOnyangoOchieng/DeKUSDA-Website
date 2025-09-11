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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->datetime('start_datetime');
            $table->datetime('end_datetime');
            $table->string('location')->nullable();
            $table->enum('event_type', ['worship', 'bible_study', 'youth', 'choir', 'fellowship', 'community', 'conference', 'other'])->default('other');
            $table->enum('status', ['draft', 'published', 'cancelled'])->default('draft');
            $table->string('featured_image')->nullable();
            $table->text('additional_info')->nullable();
            $table->boolean('is_recurring')->default(false);
            $table->string('recurrence_pattern')->nullable(); // daily, weekly, monthly, yearly
            $table->integer('max_attendees')->nullable();
            $table->decimal('entry_fee', 10, 2)->default(0.00);
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
