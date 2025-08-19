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
        Schema::create('mon_airs', function (Blueprint $table) {
            $table->id();
            $table->string('flow_rate_utama');
            $table->string('flow_rate_cabang_1');
            $table->string('flow_rate_cabang_2');
            $table->string('status_cabang_1');
            $table->string('status_cabang_2');
            $table->string('selisih');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mon_airs');
    }
};
