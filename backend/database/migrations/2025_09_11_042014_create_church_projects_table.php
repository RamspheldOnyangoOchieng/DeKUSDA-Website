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
        Schema::create('church_projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->decimal('target_amount', 10, 2)->nullable();
            $table->decimal('current_amount', 10, 2)->default(0);
            $table->integer('progress_percentage')->default(0);
            $table->string('category')->default('fundraising'); // fundraising, construction, ministry
            $table->date('target_date')->nullable();
            $table->string('image_url')->nullable();
            $table->text('updates')->nullable(); // Latest project updates
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false); // Show on homepage
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('church_projects');
    }
};
