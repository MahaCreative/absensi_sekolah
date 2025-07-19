<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('kelas')->insert([
            [
                'guru_id' => 1,
                'kd_kelas' => 'k001',
                'nama_kelas' => '1A',
            ],
            [
                'guru_id' => 2,
                'kd_kelas' => 'k002',
                'nama_kelas' => '2A',
            ],
            [
                'guru_id' => 3,
                'kd_kelas' => 'k003',
                'nama_kelas' => '3A',
            ],

        ]);
    }
}
