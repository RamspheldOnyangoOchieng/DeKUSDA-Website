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
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->string('donor_name');
            $table->string('donor_email')->nullable();
            $table->string('donor_phone')->nullable();
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->enum('donation_type', ['tithe', 'offering', 'special_offering', 'building_fund', 'missions', 'youth', 'disaster_relief', 'other'])->default('offering');
            $table->enum('payment_method', ['cash', 'check', 'bank_transfer', 'mobile_money', 'paypal', 'stripe', 'other'])->default('cash');
            $table->string('transaction_reference')->nullable();
            $table->enum('status', ['pending', 'completed', 'failed', 'refunded'])->default('pending');
            $table->date('donation_date');
            $table->text('purpose')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_anonymous')->default(false);
            $table->boolean('is_recurring')->default(false);
            $table->string('recurring_frequency')->nullable(); // weekly, monthly, yearly
            $table->string('receipt_number')->unique()->nullable();
            $table->foreignId('recorded_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('church_member_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
