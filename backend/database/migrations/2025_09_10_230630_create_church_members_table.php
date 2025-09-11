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
        Schema::create('church_members', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique()->nullable();
            $table->string('phone')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->text('address')->nullable();
            $table->date('baptism_date')->nullable();
            $table->enum('membership_status', ['active', 'inactive', 'transferred', 'deceased'])->default('active');
            $table->enum('member_type', ['regular', 'youth', 'elder', 'deacon', 'deaconess', 'pastor'])->default('regular');
            $table->string('occupation')->nullable();
            $table->text('emergency_contact')->nullable();
            $table->string('profile_photo')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('church_members');
    }
};
