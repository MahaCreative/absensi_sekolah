<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\JadwalMengajar;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Siswa;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $role = 'admin';
        if ($role == 'admin') {
            $count = [
                'siswaCount' => Siswa::count(),
                'guruCount' => Guru::count(),
                'kelasCount' => Kelas::count(),
                'jadwalCount' => JadwalMengajar::count(),
                'mapelCount' => Mapel::count(),
            ];
        }
        return inertia('Dashboard/Index', compact('count'));
    }
}
