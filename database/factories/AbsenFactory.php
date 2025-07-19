<?php

namespace Database\Factories;

use App\Models\Absen;
use App\Models\JadwalMengajar;
use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Absen>
 */
class AbsenFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jadwal = JadwalMengajar::factory()->create();

        $kelasId = $jadwal->kelas_id;

        $siswaList = Siswa::where('kelas_id', $kelasId)->get(); // pastikan ada 30 siswa

        foreach ($siswaList as $siswa) {
            Absen::create([
                'siswa_id' => $siswa->id,
                'jadwal_mengajar_id' => $jadwal->id,
                'guru_id' => $jadwal->guru_id,
                'kelas' => $siswa->kelas->nama_kelas, // relasi siswa->kelas
                'gambar' => '/contoh/gambar.jpg',
                'jam_absen' => now()->format('H:i:s'),
                'tanggal_absen' => now()->format('Y-m-d'),
                'status_terlambat' => fake()->randomElement(['ontime', 'terlambat']),
                'status_kehadiran' => fake()->randomElement(['hadir', 'izin', 'sakit', 'alpha']),
                'lat' => fake()->latitude(),
                'long' => fake()->longitude(),
            ]);
        }
    }
}
