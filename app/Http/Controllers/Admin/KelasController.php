<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use Illuminate\Http\Request;

class KelasController extends Controller
{

    public function index(Request $request)
    {
        $query = Kelas::query()->with('guru');

        $kelas = $query
            ->withCount(['siswa as laki_count' => function ($q) {
                $q->where('jenis_kelamin', 'laki-laki');
            }, 'siswa as perempuan_count' => function ($q) {
                $q->where('jenis_kelamin', 'perempuan');
            }])
            ->latest()->paginate();

        return inertia('Admin/Kelas/Index', compact('kelas'));
    }

    public function store(Request $request)
    {
        $attr = $request->validate([
            'guru_id' => 'required|numeric',
            'nama_kelas' => 'string|min:2|max:3|unique:kelas,nama_kelas'
        ]);
        $cek = Kelas::where('guru_id', $request->guru_id)->first();
        if ($cek) {
            return redirect()->back();
        }
        $attr['kd_kelas'] = 'k00' . Kelas::count() + 1;

        $kelas = Kelas::create($attr);
    }

    public function update(Request $request)
    {
        $kelas = Kelas::find($request->id);
        $attr = $request->validate([
            'guru_id' => 'required|numeric',
            'nama_kelas' => 'string|min:1|max:5|unique:kelas,nama_kelas,' . $kelas->id
        ]);
        $kelas->update($attr);
    }

    public function delete(Request $request)
    {
        Kelas::find($request->id)->delete();
    }
}
