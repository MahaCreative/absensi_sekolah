<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FotoSiswa;
use App\Models\Guru;
use App\Models\JadwalMengajar;
use App\Models\Kelas;
use App\Models\Semester;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    public function index(Request $request)
    {
        $query = Siswa::query()->with('kelas');
        $semester = Semester::where('status', 'aktif')->first();
        $TahunAjaran = TahunAjaran::where('status', 'aktif')->first();

        $role = $request->user()->role;
        $jadwal_mengajar_ids = [];
        $queryKelas = Kelas::query();
        $guru = [];
        if ($role == 'guru') {
            $guru = Guru::where('user_id', $request->user()->id)->first();
            $jadwal_mengajar = JadwalMengajar::where('guru_id', $guru->id)->get()->pluck('kelas_id');
            $queryKelas->whereIn('id', $jadwal_mengajar);
            $jadwal_mengajar_ids = $jadwal_mengajar;
            $query->whereIn('kelas_id', $jadwal_mengajar_ids);
        }


        if ($request->q == 'semua') {
            $q = Siswa::count();
        } else {
            $q = $request->q ? $request->q : 10;
        }

        if ($request->q == 'all') {
            $q = Siswa::count();
        }
        if ($request->search) {
            $query->where('nis', 'like', '%' . $request->search . '%')
                ->orWhere('nama_lengkap', 'like', '%' . $request->search . '%')
            ;
        }
        if ($request->kelas == 'all') {
            $query->whereIn('kelas_id', $jadwal_mengajar_ids);
        } else if ($request->kelas == 'wali') {
            $wali = Kelas::where('guru_id', $guru->id)->first();

            $query->where('kelas_id', $wali->id);
        } else if ($request->kelas) {
            $query->where('kelas_id', $request->kelas);
        }
        $siswa = $query->latest()->paginate($q);
        $kelas = $queryKelas->get();

        return inertia('Admin/Siswa/Index', compact('siswa', 'kelas'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            "nama_lengkap" => 'required|string',
            "nis" => 'required|numeric|min_digits:6|max_digits:12|unique:siswas,nis',

            "alamat" => 'required|string',
            "telephone" => 'nullable|numeric|min_digits:10|max_digits:13|unique:siswas,telephone',
            "tanggal_lahir" => 'required|string|date:before:now',
            "jenis_kelamin" => 'required|string|in:laki-laki,perempuan',
            "image" => 'required|image|mimes:jpeg,jpg,png,webp',
            'kelas_id' => 'required|numeric',
            'nama_orang_tua' => 'required|string',
            'no_hp_orang_tua' => 'required|numeric|min_digits:10|max_digits:13',
        ]);
        $attr['image'] = $request->file('image')->store('siswa');
        $siswa = Siswa::create($attr);
    }

    public function update(Request $request)
    {
        $siswa = Siswa::find($request->id);
        $attr = $request->validate([
            "nama_lengkap" => 'required',
            "nis" => 'required|numeric|min_digits:6|max_digits:12|unique:siswas,nis,' . $siswa->id,
            "alamat" => 'required|string',
            "telephone" => 'nullable|numeric|min_digits:10|max_digits:13|unique:siswas,telephone,' . $siswa->id,
            "tanggal_lahir" => 'required|string|date:before:now',
            "jenis_kelamin" => 'required|string|in:laki-laki,perempuan',
            'kelas_id' => 'required|numeric',
            'nama_orang_tua' => 'required|string',
            'no_hp_orang_tua' => 'required|numeric|min_digits:10|max_digits:13',
        ]);
        $attr['image'] = $siswa->image;

        if ($request->hasFile('image')) {
            $request->validate([
                "image" => 'required|image|mimes:jpeg,jpg,png,webp',
            ]);
            $attr['image'] = $request->file('image')->store('profile/siswa');
        }
        $siswa->update($attr);
    }
    public function delete(Request $request)
    {
        $siswa = Siswa::find($request->id);
        $siswa->delete();
    }

    public function get_foto(Request $request, $id)
    {
        $foto = FotoSiswa::where('siswa_id', $id)->get();
        return response()->json($foto);
    }

    public function store_foto(Request $request, $id)
    {
        $request->validate([
            "foto.*" => 'required|image|mimes:jpeg,jpg,png,webp',
        ]);
        $siswa = Siswa::find($id);
        foreach ($request->file('foto') as $index => $foto) {
            $fotoSiswa = FotoSiswa::create([
                'siswa_id' => $id,
                'foto' => $foto->storeAs('profile/siswa/' . $siswa->nama_lengkap . "/" . $siswa->nama_lengkap . "_" . $index . ".jpg"),
            ]);
        }
    }

    public function delete_foto(Request $request, $id)
    {
        $fotoSiswa = FotoSiswa::find($id);
        $fotoSiswa->delete();
    }
    public function report(Request $request)
    {
        $query = Siswa::query()->with('kelas');
        $q = $request->q ? $request->q : 10;

        if ($request->q == 'all') {
            $q = Siswa::count();
        }
        if ($request->search) {
            $query->where('nis', 'like', '%' . $request->search . '%')
                ->orWhere('nama_lengkap', 'like', '%' . $request->search . '%')
            ;
        }
        if ($request->kelas) {
            $query->where('kelas_id', $request->kelas);
        }
        $siswa = $query->latest()->get();

        return inertia('Admin/Siswa/Report', compact('siswa'));
    }
}
