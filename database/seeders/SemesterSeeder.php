<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SemesterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('semesters')->insert([
            [
                'kd_semester' => 'sms-01',
                'semester' => 'ganjil',
                'status' => 'aktif'
            ],
            [
                'kd_semester' => 'sms-01',
                'semester' => 'genap',
                'status' => 'nonaktif'
            ],
        ]);
    }
}
