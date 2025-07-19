<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;

class TahunAjaranController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['tahun' => 'required|numeric|min_digits:4|max_digits:4|unique:tahun_ajarans,tahun_ajaran']);

        $tahunAktif = TahunAjaran::where('status', '=', 'aktif')->first();
        if ($tahunAktif) {
            $tahunAktif->update(['status' => 'non aktif']);
        };
        $tahun = TahunAjaran::create(['tahun_ajaran' => $request->tahun, 'status' => 'aktif']);
    }

    public function delete(Request $request, $id)
    {
        $latestTahun = TahunAjaran::latest()->first()->update(['status' => 'aktif']);
        $tahun = TahunAjaran::find($id)->delete();
    }
}
