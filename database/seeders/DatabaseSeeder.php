<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Absen;
use App\Models\Admin;
use App\Models\Guru;
use App\Models\JadwalMengajar;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'admin',
            'nis' => '123456',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        Admin::create([
            "user_id" => $user->id,
            "nis" => $user->nis,
            "nama_lengkap" => $user->name,
            "alamat" => fake()->address(),
            "telephone" => fake()->phoneNumber(),
            "tanggal_lahir" => fake()->dateTimeBetween('-30 years', '-20 years'),
            "jenis_kelamin" => fake()->randomElement(['laki-laki', 'perempuan']),
            "image" => "Image/default_profile.webp",
        ]);

        Guru::factory(10)->hasUser()->create();

        $this->call([
            KelasSeeder::class,
            SemesterSeeder::class,
            TahunAjaranSeeder::class,
        ]);
        Mapel::factory()->count(10)->create();
        $kelasList = Kelas::all();

        foreach ($kelasList as $kelas) {
            // 1. Buat 30 jadwal per kelas
            $jadwalList = JadwalMengajar::factory()->count(5)->create([
                'kelas_id' => $kelas->id,
            ]);

            // 2. Buat siswa dalam kelas (27–32)
            $siswaList = Siswa::factory()->count(rand(2, 5))->create([
                'kelas_id' => $kelas->id,
            ]);

            // 3. Untuk setiap jadwal dan setiap pertemuan
            foreach ($jadwalList as $jadwal) {
                for ($pertemuan = 1; $pertemuan <= 30; $pertemuan++) {
                    foreach ($siswaList as $siswa) {
                        Absen::create([
                            'siswa_id' => $siswa->id,
                            'jadwal_mengajar_id' => $jadwal->id,
                            'guru_id' => $jadwal->guru_id,
                            'kelas' => $kelas->nama_kelas,
                            'gambar' => '/path/to/image.jpg', // sesuaikan jika ada gambar dinamis
                            'jam_absen' => now()->setTime(rand(7, 9), rand(0, 59)),
                            'tanggal_absen' => now()->subDays(30 - $pertemuan), // tanggal mundur
                            'status_terlambat' => fake()->randomElement(['ontime', 'terlambat']),
                            'status_kehadiran' => fake()->randomElement(['hadir', 'izin', 'sakit', 'alpha']),
                            'lat' => fake()->latitude(),
                            'long' => fake()->longitude(),
                            'pertemuan_ke' => $pertemuan,
                        ]);
                    }
                }
            }
        }
    }
}
