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
        Schema::create('prayer_requests', function (Blueprint $table) {
            $table->id();
            $table->string('requester_name');
            $table->string('requester_email')->nullable();
            $table->string('requester_phone')->nullable();
            $table->text('prayer_request');
            $table->enum('category', ['healing', 'guidance', 'thanksgiving', 'family', 'financial', 'spiritual', 'other'])->default('other');
            $table->enum('status', ['pending', 'approved', 'praying', 'answered', 'archived'])->default('pending');
            $table->boolean('is_public')->default(false);
            $table->boolean('is_urgent')->default(false);
            $table->datetime('date_submitted');
            $table->datetime('date_answered')->nullable();
            $table->text('answer_testimony')->nullable();
            $table->integer('prayer_count')->default(0);
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prayer_requests');
    }
};
