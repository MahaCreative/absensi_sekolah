<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJadwalMengajarRequest;
use App\Models\JadwalMengajar;
use App\Models\Kelas;
use App\Models\Mapel;
use Illuminate\Http\Request;

class JadwalMengajarController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $role = $request->user()->role;

        if ($request->q == 'semua') {
            $q = JadwalMengajar::count();
        } else {
            $q = $request->q ? $request->q : 10;
        }
        $query = JadwalMengajar::query()->with([
            'tahun_ajaran',
            "semester",
            "kelas",
            "mapel",
            "guru"
        ]);

        if ($role == 'admin') {
            $kelas = Kelas::get();
            $mapel = Mapel::get();
        } else {
            $guruId = 1;
            $getKelasQuery = JadwalMengajar::query()->where('guru_id', $guruId);
            $getMapelQuery = JadwalMengajar::query()->where('guru_id', $guruId);
            if ($request->tahun_ajaran_id) {
                $getKelasQuery->where('tahun_ajaran_id', $request->tahun_ajaran_id);
                $getMapelQuery->where('tahun_ajaran_id', $request->tahun_ajaran_id);
            }
            if ($request->semester_id) {
                $getKelasQuery->where('semester_id', $request->semester_id);
                $getMapelQuery->where('semester_id', $request->semester_id);
            }
            $kelasIds = $getKelasQuery->get()->pluck('kelas_id');
            $mapelIds = $getMapelQuery->get()->pluck('mapel_id');
            $kelas = Kelas::whereIn('id', $kelasIds)->get();
            $mapel = Mapel::whereIn('id', $mapelIds)->get();
            $query->where('guru_id', $guruId);
        }

        if ($request->search) {
            $query->whereHas('mapel', function ($q) use ($request) {
                $q->where('nama_mapel', 'like', '%' . $request->search . '%');
            });
        }
        if ($request->tahun_ajaran_id) {
            $query->where('tahun_ajaran_id', '=', $request->tahun_ajaran_id);
        }
        if ($request->semester_id) {
            $query->where('semester_id', '=', $request->semester_id);
        }
        if ($request->kelas_id) {
            $query->where('kelas_id', '=', $request->kelas_id);
        }
        if ($request->mapel_id) {
            $query->where('mapel_id', '=', $request->mapel_id);
        }
        if ($request->guru_id) {
            $query->where('guru_id', '=', $request->guru_id);
        }
        if ($request->hari) {
            $query->where('hari', '=', $request->hari);
        }
        $jadwalMengajar = $query->paginate($q);

        return inertia('Admin/JadwalMengajar/Index', compact('jadwalMengajar', 'kelas', 'mapel'));
    }
    public function report(Request $request)
    {
        $query = JadwalMengajar::query()->with([
            'tahun_ajaran',
            "semester",
            "kelas",
            "mapel",
            "guru"
        ]);
        if ($request->search) {
            $query->whereHas('mapel', function ($q) use ($request) {
                $q->where('nama_mapel', 'like', '%' . $request->search . '%');
            });
        }
        if ($request->tahun_ajaran_id) {
            $query->where('tahun_ajaran_id', '=', $request->tahun_ajaran_id);
        }
        if ($request->semester_id) {
            $query->where('semester_id', '=', $request->semester_id);
        }
        if ($request->kelas_id) {
            $query->where('kelas_id', '=', $request->kelas_id);
        }
        if ($request->mapel_id) {
            $query->where('mapel_id', '=', $request->mapel_id);
        }
        if ($request->guru_id) {
            $query->where('guru_id', '=', $request->guru_id);
        }
        if ($request->hari) {
            $query->where('hari', '=', $request->hari);
        }
        $jadwalMengajar = $query->get();

        return inertia('Admin/JadwalMengajar/Report', compact('jadwalMengajar'));
    }
    public function store(StoreJadwalMengajarRequest  $request)
    {

        $request->validate([
            'tahun_ajaran_id' => 'required',
            'semester_id' => 'required',
            'kelas_id' => 'required',
            'mapel_id' => 'required',
            'guru_id' => 'required',
            'hari' => 'required',
            'jam_masuk' => 'required',
            'jam_selesai' => 'required',
            'jam_ke' => 'required',
        ]);
        JadwalMengajar::create($request->validated());
    }

    public function update(StoreJadwalMengajarRequest $request)
    {
        $jadwalMengajar = JadwalMengajar::find($request->id);
        $jadwalMengajar->update($request->only([
            'tahun_ajaran_id',
            'semester_id',
            'kelas_id',
            'mapel_id',
            'guru_id',
            'hari',
            'jam_masuk',
            'jam_selesai',
            'jam_ke',
        ]));
    }

    public function delete(Request $request)
    {
        $jadwalMengajar = JadwalMengajar::find($request->id)->delete();
    }
}
