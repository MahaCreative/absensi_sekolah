<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mapel;
use Illuminate\Http\Request;

class MapelController extends Controller
{
    public function index(Request $request)
    {
        $query = Mapel::query();

        $mapel = $query->latest()->paginate();
        return inertia('Admin/Mapel/Index', compact('mapel'));
    }

    public function store(Request $request)
    {

        $request->validate([
            'nama_mapel' => 'required|string|min:3|max:50|unique:mapels,nama_mapel'
        ]);
        $kd_mapel = '00' . Mapel::count() + 1;
        $mapel = Mapel::create([
            'kd_mapel' => $kd_mapel,
            'nama_mapel' => $request->nama_mapel,
        ]);
    }

    public function update(Request $request)
    {
        $mapel = Mapel::find($request->id);

        $request->validate([
            'nama_mapel' => 'required|string|min:3|max:50|unique:mapels,nama_mapel,' . $mapel->id,
        ]);
        $mapel->update(['nama_mapel' => $request->nama_mapel]);
    }

    public function delete(Request $request)
    {
        $mapel = Mapel::find($request->id)->delete();
    }
}
