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
        Schema::create('absens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswas')->onDelete('cascade');
            $table->foreignId('jadwal_mengajar_id')->constrained('jadwal_mengajars')->onDelete('cascade');
            $table->foreignId('guru_id')->nullable();
            $table->string('kelas');
            $table->string('gambar')->nullable();
            $table->time('jam_absen');
            $table->date('tanggal_absen');
            $table->string('status_terlambat');
            $table->string('status_kehadiran');
            $table->string('lat')->nullable();
            $table->string('long')->nullable();
            $table->string('pertemuan_ke');
            $table->string('absen_by')->default('siswa');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absens');
    }
};
