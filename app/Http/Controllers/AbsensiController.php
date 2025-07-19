<?php

namespace App\Http\Controllers;

use App\Models\Absen;
use App\Models\JadwalMengajar;
use App\Models\Siswa;
use Illuminate\Http\Request;

class AbsensiController extends Controller
{
    public function store(Request $request)
    {

        $cekSIswa = Siswa::where('nis', $request->nis)->first();
        $jadwal = JadwalMengajar::find($request->jadwal_mengajar_id);
        $cekAbsen = Absen::where('jadwal_mengajar_id', $request->jadwal_mengajar_id)->first();
        if ($cekAbsen) {
            return response()->json(['type' => 'error', 'message' => 'anda telah melakukan absen sebelumnya'], 422);
        }
        $screnshoot = $request->screenshot->store('absensi');
        $absensi = Absen::create([
            "siswa_id" => $cekSIswa->id,
            "jadwal_mengajar_id" => $jadwal->id,
            "guru_id" => $jadwal->guru_id,
            "kelas" => $request->kelas,
            "gambar" => $screnshoot,
            "jam_absen" => now()->format('H:i:s'),
            "tanggal_absen" => now(),
            "status_terlambat" => $request->status,
            "lat" => $request->lat,
            "long" => $request->lng,
        ]);
        return response()->json(['type' => 'success', 'message' => "Anda telah melakukan absen pada Mapel $request->mapel dengan status keterlambatan : $request->status"]);
    }
}
