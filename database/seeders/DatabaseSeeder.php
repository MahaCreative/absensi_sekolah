<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

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

        $this->call([
            KelasSeeder::class,
            SemesterSeeder::class,
            TahunAjaranSeeder::class,
        ]);
        Mapel::factory()->count(10)->create();
        User::factory(10)->hasAdmin()->create();
        User::factory(10)->hasGuru()->create();
        Siswa::factory(30)->create();
    }
}
