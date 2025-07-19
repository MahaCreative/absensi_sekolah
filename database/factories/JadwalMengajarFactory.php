<?php

namespace Database\Factories;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Semester;
use App\Models\TahunAjaran;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JadwalMengajar>
 */
class JadwalMengajarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            "tahun_ajaran_id" => fake()->randomElement(TahunAjaran::get()->pluck('id')),
            "semester_id" => fake()->randomElement(Semester::get()->pluck('id')),
            'kelas_id' => null,
            "mapel_id" => fake()->randomElement(Mapel::get()->pluck('id')),
            "guru_id" => fake()->randomElement(Guru::get()->pluck('id')),
            "hari" => fake()->randomElement(['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu']),
            "jam_masuk" => fake()->time(),
            "jam_selesai" => fake()->time(),
            "jam_ke" => rand(1, 6),
        ];
    }
}
