<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Semester;
use Illuminate\Http\Request;

class SemesterController extends Controller
{
    public function update(Request $request)
    {
        $get = Semester::find($request->id);
        $aktif = Semester::where('status', 'aktif')->first()->update(['status' => 'nonaktif']);
        $get->update(['status' => 'aktif']);
    }
}
