<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Models\Absen;
use App\Models\JadwalMengajar;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Semester;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;

class RekapAbsensiController extends Controller
{
    public function index(Request $request)
    {
        $guruId =  1;
        $message = null;
        $totalPertemuan = null;
        $absen = null;
        $getKelasQuery = JadwalMengajar::query()->where('guru_id', $guruId);
        $getMapelQuery = JadwalMengajar::query()->where('guru_id', $guruId);
        $rekap = [];
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
        if (!$kelas) {
            $message = ['type' => 'error', 'message' => 'anda belum terdaftar mengajar di kelas manapun'];
        }
        if (!$mapel) {
            $message = ['type' => 'error', 'message' => 'anda belum terdaftar mengajar pada mata pelajaran manapun'];
        }
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
            $absenQuery = Absen::query()->join('siswas', 'absens.siswa_id', '=', 'siswas.id');
            $absen = $absenQuery
                ->where('absens.jadwal_mengajar_id', $getJadwalId->id)
                ->orderBy('absens.pertemuan_ke', 'asc')
                ->orderBy('siswas.nama_lengkap', 'asc')
                ->select(['absens.*', 'siswas.nama_lengkap', 'siswas.nis', 'siswas.image'])

                ->get();


            foreach ($absen as $key => $item) {

                $siswaId = $item->siswa_id;
                $pertemuanKe = $item->pertemuan_ke;
                if (!isset($rekap[$siswaId])) {
                    $rekap[$siswaId] = [
                        'siswa_id' => $item->siswa_id,
                        'nama' => $item->nama_lengkap,
                        'nis' => $item->nis,
                        'absens' => [],
                    ];
                }
                if ($item->status_kehadiran == 'hadir') {
                    $rekap[$siswaId]['absens'][$pertemuanKe - 1] = 'h';
                } else if ($item->status_kehadiran == 'sakit') {
                    $rekap[$siswaId]['absens'][$pertemuanKe - 1] = 's';
                } else if ($item->status_kehadiran == 'izin') {
                    $rekap[$siswaId]['absens'][$pertemuanKe - 1] = 'i';
                } else if ($item->status_kehadiran == 'alpha') {
                    $rekap[$siswaId]['absens'][$pertemuanKe - 1] = 'a';
                }
                // Set status kehadiran berdasarkan pertemuan_ke
            }

            // Pastikan array absens terurut dengan benar
            foreach ($rekap as &$siswa) {
                ksort($siswa['absens']);
            }
        }

        return inertia('Guru/RekapAbsensi/Index', compact('kelas', 'mapel', 'rekap', 'getJadwalId'));
    }
}
