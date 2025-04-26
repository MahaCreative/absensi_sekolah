<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FotoSiswa;
use App\Models\Siswa;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    public function index(Request $request)
    {
        $query = Siswa::query();
        $q = $request->q ? $request->q : 10;

        if ($request->q == 'all') {
            $q = Siswa::count();
        }
        if ($request->search) {
            $query->where('nis', 'like', '%' . $request->search . '%')
                ->orWhere('nama_lengkap', 'like', '%' . $request->search . '%')
            ;
        }
        $siswa = $query->latest()->paginate($q);

        return inertia('Admin/Siswa/Index', compact('siswa'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            "nama_lengkap" => 'required|string',
            "nis" => 'required|numeric|min_digits:6|max_digits:12|unique:siswas,nis',

            "alamat" => 'required|string',
            "telephone" => 'required|numeric|min_digits:10|max_digits:13|unique:siswas,telephone',
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
            "telephone" => 'required|numeric|min_digits:10|max_digits:13|unique:siswas,telephone,' . $siswa->id,
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
}
