<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Login');
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'nis' => ['required', 'numeric', 'min_digits:6'],
            'password' => ['required', 'alpha_dash', 'min:6'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->route('dashboard');
        }

        return back()->withErrors([
            'nis' => 'NIP tidak terdeteksi atau password salah.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return redirect()->route('home');
    }
}
