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
                'tahun_ajaran' => '2024',
                'status' => 'nonaktif',
            ],
            [
                'tahun_ajaran' => '2025',
                'status' => 'aktif',
            ],

        ]);
    }
}
