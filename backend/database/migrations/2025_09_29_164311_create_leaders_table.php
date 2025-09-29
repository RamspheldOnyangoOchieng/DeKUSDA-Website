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
        Schema::create('leaders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title');
            $table->string('image')->nullable();
            $table->enum('category', ['pastoral', 'elders', 'ministry', 'deacons']);
            $table->string('phone', 50)->nullable();
            $table->string('email')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('facebook')->nullable();
            $table->text('education')->nullable();
            $table->string('years_of_service')->nullable();
            $table->json('specialties')->nullable();
            $table->text('quote')->nullable();
            $table->text('bio')->nullable();
            $table->json('achievements')->nullable();
            $table->json('languages')->nullable();
            $table->integer('order')->default(0);
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            
            $table->index(['category', 'status']);
            $table->index('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leaders');
    }
};
