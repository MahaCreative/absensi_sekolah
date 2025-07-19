<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Semester;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $profile = [];
        if ($request->user()) {
            if ($request->user()->role == 'admin') {
                $profile = Admin::where('user_id', $request->user()->id)->first();
            } else  if ($request->user()->role == 'guru') {

                $profile = Guru::where('user_id', $request->user()->id)->first();
            }
        }
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'profile' => $profile

            ],
            'semester' => Semester::latest()->get(),
            'tahun_ajaran' => TahunAjaran::latest()->get(),
            'mapel' => Mapel::latest()->get(),
            'guru' => Guru::latest()->get(),
            'kelas' => Kelas::get(),
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
