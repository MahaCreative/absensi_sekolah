<?php

namespace App\Http\Controllers\Numpang;

use App\Http\Controllers\Controller;
use App\Models\MonAir;
use Illuminate\Http\Request;

class MonAIrController extends Controller
{
    public function index(Request $request)
    {
        $monAir = MonAir::latest()->first();
        return response()->json($monAir);
    }

    public function store(Request $request)
    {
        $monAIr = MonAir::create([
            "flow_rate_utama" => $request->flow_rate_utama,
            "flow_rate_cabang_1" => $request->flow_rate_cabang_1,
            "flow_rate_cabang_2" => $request->flow_rate_cabang_2,
            "status_cabang_1" => $request->status_cabang_1,
            "status_cabang_2" => $request->status_cabang_2,
            "selisih" => $request->selisih
        ]);
    }
}
