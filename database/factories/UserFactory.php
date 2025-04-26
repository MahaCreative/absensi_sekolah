<?php

namespace Database\Factories;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'nis' => fake()->numerify('123###'),
            'password' => bcrypt('password'),
            'role' => 'siswa',
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function siswa()
    {
        return $this->state([
            'role' => 'siswa',
        ]);
    }

    public function guru()
    {
        return $this->state([
            'role' => 'guru',
        ]);
    }

    public function admin()
    {

        return $this->state([
            'role' => 'admin',
        ]);
    }
}
