<?php

namespace App\Http\Controllers;

use App\Models\Absen;
use App\Models\JadwalMengajar;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Semester;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManagemenPresensiController extends Controller
{
    public function index(Request $request)
    {
        $guruId =  1;
        $message = null;
        $totalPertemuan = null;
        $absen = null;
        $getKelasQuery = JadwalMengajar::query()->where('guru_id', $guruId);
        $getMapelQuery = JadwalMengajar::query()->where('guru_id', $guruId);

        // Filter semester
        if ($request->semester) {
            $semesterId = $request->semester == 'aktif'
                ? Semester::where('status', 'aktif')->first()?->id
                : $request->semester;
        } else {
            $semesterId = Semester::where('status', 'aktif')->first()?->id;
        }

        // Filter tahun ajaran
        if ($request->tahun_ajaran) {
            $tahunAjaranId = $request->tahun_ajaran == 'aktif'
                ? TahunAjaran::where('status', 'aktif')->first()?->id
                : $request->tahun_ajaran;

            if ($tahunAjaranId) {
                $getKelasQuery->where('tahun_ajaran_id', $tahunAjaranId);
                $getMapelQuery->where('tahun_ajaran_id', $tahunAjaranId);
            }
        } else {
            $tahunAjaranId = TahunAjaran::where('status', 'aktif')->first()?->id;
        }

        $getKelasQuery->where('semester_id', $semesterId);
        $getMapelQuery->where('semester_id', $semesterId);
        // Ambil ID kelas dan mapel dari jadwal
        $kelasIds = $getKelasQuery->pluck('kelas_id')->unique();
        $mapelIds = $getMapelQuery->pluck('mapel_id')->unique();

        // Ambil data kelas dan mapel
        $kelas = Kelas::whereIn('id', $kelasIds)->get();
        $mapel = Mapel::whereIn('id', $mapelIds)->get();

        $queryJadwal = JadwalMengajar::where('semester_id', $semesterId);
        if ($request->kelas) {
            $queryJadwal->where('kelas_id', $request->kelas);
        }
        if ($request->mapel) {
            $queryJadwal->where('mapel_id', $request->mapel);
        }

        $getJadwalId = $queryJadwal
            ->where('semester_id', $semesterId)
            ->where('tahun_ajaran_id', $tahunAjaranId)
            ->where('guru_id', $guruId)
            ->first();

        if ($getJadwalId == null) {
            $message = ['type' => 'error', 'message' => 'tidak ada data absensi yang ditemukan '];
        } else {

            $totalPertemuan = Absen::where('jadwal_mengajar_id', $getJadwalId->id)->get()->pluck('pertemuan_ke')->unique()->values()
                ->map(fn($val) => (int)$val)->all();

            $queryAbsen =  Absen::join('siswas', 'absens.siswa_id', '=', 'siswas.id');

            $numberPertemuan = $request->pertemuan ? $request->pertemuan : end($totalPertemuan); // ambil pertemuan terakhir dari data absen
            $absenQuery = Absen::query()->join('siswas', 'absens.siswa_id', '=', 'siswas.id');

            if ($request->search) {
                $absenQuery->where('siswas.nama_lengkap', 'like', '%' . $request->search . '%');
            }

            $absen = $absenQuery->where('pertemuan_ke', '=', $numberPertemuan)
                ->where('absens.jadwal_mengajar_id', $getJadwalId->id)
                ->orderBy('siswas.nama_lengkap', 'asc')
                ->select(['absens.*', 'siswas.nama_lengkap', 'siswas.nis', 'siswas.image']) // penting: agar model Absen tetap dikenali
                ->take(5)
                ->get();
        }




        return Inertia::render('Guru/ManagemenPresensi/Index', compact('kelas', 'mapel', 'message', 'totalPertemuan', 'absen', 'getJadwalId'));
    }

    public function updateKehadiran(Request $request)
    {
        $absen = Absen::with('siswa')->find($request->id);
        $absen->update(['status_kehadiran' => $request->status_kehadiran]);
        return response()->json(['type' => 'success', 'message' => 'Statis kehadiran siswa ' . $absen->siswa->nama_lengkap . ' telah berhasil di perbaharui']);
    }
    public function updateTerlambat(Request $request)
    {
        $absen = Absen::with('siswa')->find($request->id);
        $absen->update(['status_terlambat' => $request->status_terlambat]);
        return response()->json(['type' => 'success', 'message' => "Status terlambat siswa " . $absen->siswa->nama_lengkap . " telah berhasil di perbaharui"]);
    }

    public function proses(Request $request)
    {

        $jmlPertemuan = $request->pertemuan;

        $getSiswa = Siswa::where('kelas_id', $request->kelas_id)->get()->pluck('id');
        $getKelas = Kelas::find($request->kelas_id);
        $getJadwal = JadwalMengajar::find($request->id);

        foreach ($getSiswa as $item) {
            $cekAbsen = Absen::where('siswa_id', $item)
                ->whereNot('siswa_id', 40)
                ->where('jadwal_mengajar_id', $getJadwal->id)
                ->where('pertemuan_ke', $request->pertemuan)->first();

            if (!$cekAbsen) {
                Absen::create([
                    "siswa_id" => $item,
                    "jadwal_mengajar_id" => $getJadwal->id,
                    "guru_id" => $getJadwal->guru_id,
                    "kelas" => $getKelas->nama_kelas,
                    "jam_absen" => now()->format('H:i:s'),
                    "tanggal_absen" => now()->format('Y-m-d'),
                    "status_terlambat" => 'ontime',
                    "status_kehadiran" => 'alpha',
                    "pertemuan_ke" => $request->pertemuan,
                    "absen_by" => 'sistem',
                ]);
            }
        }
    }
}
