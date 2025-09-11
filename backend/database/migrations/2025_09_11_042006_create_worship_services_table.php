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
        Schema::create('worship_services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('time');
            $table->string('location');
            $table->text('description');
            $table->string('leader')->nullable();
            $table->string('attendees')->nullable();
            $table->string('type'); // worship, study, prayer, program
            $table->json('highlights')->nullable(); // Array of highlight points
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('worship_services');
    }
};
