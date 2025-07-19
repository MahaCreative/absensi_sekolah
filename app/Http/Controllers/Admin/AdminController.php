<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Admin::query();
        if ($request->q == 'semua') {
            $q = Admin::count();
        } else {
            $q = $request->q ? $request->q : 10;
        }

        if ($request->q == 'all') {
            $q = Admin::count();
        }
        if ($request->search) {
            $query->where('nis', 'like', '%' . $request->search . '%')
                ->orWhere('nama_lengkap', 'like', '%' . $request->search . '%')
            ;
        }
        $admin = $query->latest()->paginate($q);
        return inertia('Admin/Admin/Index', compact('admin'));
    }

    public function store(Request $request)
    {
        $request->validate([
            "name" => 'required|string',
            "nis" => 'required|numeric|min_digits:6|max_digits:12|unique:admins,nis',
            "password" => 'required|string|alpha_dash|min:6',
            "alamat" => 'required|string',
            "telephone" => 'required|numeric|min_digits:10|max_digits:13|unique:admins,telephone',
            "tanggal_lahir" => 'required|string|date:before:now',
            "jenis_kelamin" => 'required|string|in:laki-laki,perempuan',
            "image" => 'required|image|mimes:jpeg,jpg,png,webp',
        ]);
        $image = $request->file('image')->store('profile/admin');
        $user = User::create([
            "name" => $request->name,
            "nis" => $request->nis,
            "password" => bcrypt($request->password),
            'role' => 'admin',
        ]);
        $admin = Admin::create([
            'user_id' => $user->id,
            "nama_lengkap" => $request->name,
            "nis" => $request->nis,
            "alamat" => $request->alamat,
            "telephone" => $request->telephone,
            "tanggal_lahir" => $request->tanggal_lahir,
            "jenis_kelamin" => $request->jenis_kelamin,
            "image" => $image,
        ]);
    }

    public function update(Request $request)
    {
        $admin = Admin::find($request->id);
        $user = User::find($admin->user_id);
        $request->validate([
            "name" => 'required',
            "nis" => 'required|numeric|min_digits:6|max_digits:12|unique:admins,nis,' . $admin->id,
            "alamat" => 'required|string',
            "telephone" => 'required|numeric|min_digits:10|max_digits:13|unique:admins,telephone,' . $admin->id,
            "tanggal_lahir" => 'required|string|date:before:now',
            "jenis_kelamin" => 'required|string|in:laki-laki,perempuan',
        ]);
        $image = $admin->image;

        if ($request->hasFile('image')) {
            $request->validate([
                "image" => 'required|image|mimes:jpeg,jpg,png,webp',
            ]);
            $image = $request->file('image')->store('profile/admin');
        }
        if ($request->password) {
            $request->validate(["password" => 'required|string|alpha_dash|min:6']);
            $user->update(['name' => $request->name, 'password' => bcrypt($request->password)]);
        } else {
            $user->update(['name' => $request->name]);
        }
        $admin->update([
            "nama_lengkap" => $request->name,
            "nis" => $request->nis,
            "alamat" => $request->alamat,
            "telephone" => $request->telephone,
            "tanggal_lahir" => $request->tanggal_lahir,
            "jenis_kelamin" => $request->jenis_kelamin,
            "image" => $image,
        ]);
    }

    public function delete(Request $request)
    {

        $admin = Admin::find($request->id);
        $user = User::find($admin->user_id);
        $admin->delete();
        $user->delete();
    }
}
