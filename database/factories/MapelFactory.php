<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\mapel>
 */
class MapelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $mapel = [
            'Matematika',
            'Bahasa Indonesia',
            'Ilmu Pengetahuan Alam',
            'Ilmu Pengetahuan Sosial',
            'Pendidikan Pancasila dan Kewarganegaraan',
            'Seni Budaya dan Prakarya',
            'Pendidikan Jasmani, Olahraga, dan Kesehatan',
            'Bahasa Inggris',
            'Muatan Lokal',
            'Agama Islam'
        ];

        // Ambil nama mapel secara acak
        $nama_mapel = $this->faker->unique()->randomElement($mapel);

        return [
            'kd_mapel' => strtoupper('MP-' . $this->faker->unique()->bothify('##??')),
            'nama_mapel' => $nama_mapel,
        ];
    }
}
