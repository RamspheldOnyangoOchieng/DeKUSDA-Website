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
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->enum('type', ['general', 'urgent', 'event', 'service', 'ministry', 'community'])->default('general');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->enum('status', ['draft', 'published', 'expired', 'archived'])->default('draft');
            $table->datetime('publish_date')->nullable();
            $table->datetime('expiry_date')->nullable();
            $table->string('featured_image')->nullable();
            $table->string('target_audience')->nullable(); // all, members, youth, leaders, etc.
            $table->boolean('show_on_homepage')->default(false);
            $table->boolean('send_email_notification')->default(false);
            $table->boolean('send_push_notification')->default(false);
            $table->integer('view_count')->default(0);
            $table->json('attachments')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
