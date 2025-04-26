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
                'kd_kelas' => 'k001',
                'nama_kelas' => '1A',
            ],
            [
                'kd_kelas' => 'k002',
                'nama_kelas' => '2A',
            ],
            [
                'kd_kelas' => 'k003',
                'nama_kelas' => '3A',
            ],
            [
                'kd_kelas' => 'k004',
                'nama_kelas' => '4A',
            ],
            [
                'kd_kelas' => 'k005',
                'nama_kelas' => '5A',
            ],
            [
                'kd_kelas' => 'k006',
                'nama_kelas' => '6A',
            ],
            [
                'kd_kelas' => 'k001',
                'nama_kelas' => '1B',
            ],
            [
                'kd_kelas' => 'k002',
                'nama_kelas' => '2B',
            ],
            [
                'kd_kelas' => 'k003',
                'nama_kelas' => '3B',
            ],
            [
                'kd_kelas' => 'k004',
                'nama_kelas' => '4B',
            ],
            [
                'kd_kelas' => 'k005',
                'nama_kelas' => '5B',
            ],
            [
                'kd_kelas' => 'k006',
                'nama_kelas' => '6B',
            ],
        ]);
    }
}
