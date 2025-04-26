<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id" => User::factory(),
            "nis" => fn(array $attr) => User::find($attr['user_id'])->nis,
            "nama_lengkap" => fn(array $attr) => User::find($attr['user_id'])->name,
            "alamat" => fake()->address(),
            "telephone" => fake()->phoneNumber(),
            "tanggal_lahir" => fake()->dateTimeBetween('-30 years', '-20 years'),
            "jenis_kelamin" => fake()->randomElement(['laki-laki', 'perempuan']),
            "image" => "Image/default_profile.webp",
        ];
    }
}
