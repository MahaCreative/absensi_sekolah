<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TahunAjaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tahun_ajarans')->insert([
            [
                'semester_id' => '1',
                'kode_ajar' => 'ta-001',
                'tahun_ajaran' => '2024',
                'status' => 'non aktif',
            ],
            [
                'semester_id' => '2',
                'kode_ajar' => 'ta-002',
                'tahun_ajaran' => '2024',
                'status' => 'non aktif',
            ],

        ]);
    }
}
