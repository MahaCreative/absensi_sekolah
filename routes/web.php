<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\GuruController;
use App\Http\Controllers\Admin\OrtuController;
use App\Http\Controllers\Admin\SiswaController;
use App\Http\Controllers\Admin\TahunAjaranController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');


// route untuk Admin

Route::get('/admin/kelola-data-admin', [AdminController::class, 'index'])->name('admin.kelola-admin');
Route::post('/admin/store-data-admin', [AdminController::class, 'store'])->name('admin.store-admin');
Route::post('/admin/update-data-admin', [AdminController::class, 'update'])->name('admin.update-admin');
Route::delete('/admin/delete-data-admin', [AdminController::class, 'delete'])->name('admin.delete-admin');

Route::get('/admin/kelola-data-guru', [GuruController::class, 'index'])->name('admin.kelola-guru');
Route::post('/admin/store-data-guru', [GuruController::class, 'store'])->name('admin.store-guru');
Route::post('/admin/update-data-guru', [GuruController::class, 'update'])->name('admin.update-guru');
Route::delete('/admin/delete-data-guru', [GuruController::class, 'delete'])->name('admin.delete-guru');

Route::get('/admin/kelola-data-siswa', [SiswaController::class, 'index'])->name('admin.kelola-siswa');
Route::post('/admin/store-data-siswa', [SiswaController::class, 'store'])->name('admin.store-siswa');
Route::post('/admin/update-data-siswa', [SiswaController::class, 'update'])->name('admin.update-siswa');
Route::delete('/admin/delete-data-siswa', [SiswaController::class, 'delete'])->name('admin.delete-siswa');
Route::get('/admin/get-foto-siswa/{id}', [SiswaController::class, 'get_foto'])->name('admin.get-foto-siswa');

Route::get('admin/kelola-tahun-ajaran', [TahunAjaranController::class, 'index'])->name('admin.kelola-tahun-ajaran');
Route::post('admin/store-tahun-ajaran', [TahunAjaranController::class, 'store'])->name('admin.store-tahun-ajaran');
Route::post('admin/update-tahun-ajaran', [TahunAjaranController::class, 'update'])->name('admin.update-tahun-ajaran');
Route::delete('admin/delete-tahun-ajaran', [TahunAjaranController::class, 'delete'])->name('admin.delete-tahun-ajaran');
