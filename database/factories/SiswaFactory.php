<?php

namespace Database\Factories;

use App\Models\Kelas;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Siswa>
 */
class SiswaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'kelas_id' => null,
            'nis' => fake()->unique()->numerify('803###'),
            "nama_lengkap" => fake()->name(),
            "alamat" => fake()->address(),
            "telephone" => fake()->phoneNumber(),
            "tanggal_lahir" => fake()->dateTimeBetween('-15 years', '-6 years'),
            "jenis_kelamin" => fake()->randomElement(['laki-laki', 'perempuan']),
            "image" => 'Image/default_profile.webp',
            "nama_orang_tua" => fake()->name(),
            "no_hp_orang_tua" => fake()->phoneNumber(),
        ];
    }
}
