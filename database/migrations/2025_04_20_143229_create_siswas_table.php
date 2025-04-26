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
        Schema::create('siswas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_id')->constrained('kelas')->onDelete('cascade');
            $table->string('nis')->unique();
            $table->string('nama_lengkap');
            $table->string('alamat');
            $table->string('telephone');
            $table->date('tanggal_lahir');
            $table->string('jenis_kelamin');
            $table->string('image');
            $table->string('nama_orang_tua');
            $table->string('no_hp_orang_tua');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswas');
    }
};
