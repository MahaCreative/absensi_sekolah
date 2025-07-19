<?php

use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\Admin\AbsenController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\GuruController;
use App\Http\Controllers\Admin\JadwalMengajarController;
use App\Http\Controllers\Admin\KelasController;
use App\Http\Controllers\Admin\MapelController;
use App\Http\Controllers\Admin\OrtuController;
use App\Http\Controllers\Admin\SemesterController;
use App\Http\Controllers\Admin\SiswaController;
use App\Http\Controllers\Admin\TahunAjaranController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Guru\RekapAbsensiController;
use App\Http\Controllers\ManagemenPresensiController;
use App\Http\Controllers\ProfileController;
use App\Models\JadwalMengajar;
use App\Models\Semester;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
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


Route::middleware(['guest'])->group(function () {
    Route::get('login', [AuthController::class, 'index'])->name('login');
    Route::post('login', [AuthController::class, 'store']);
});

// route untuk Admin
Route::middleware(['auth'])->group(function () {
    Route::get('logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/admin/kelola-data-admin', [AdminController::class, 'index'])->name('admin.kelola-admin');
    Route::post('/admin/store-data-admin', [AdminController::class, 'store'])->name('admin.store-admin');
    Route::post('/admin/update-data-admin', [AdminController::class, 'update'])->name('admin.update-admin');
    Route::delete('/admin/delete-data-admin', [AdminController::class, 'delete'])->name('admin.delete-admin');

    Route::get('/admin/kelola-data-guru', [GuruController::class, 'index'])->name('admin.kelola-guru');
    Route::get('/admin/report-data-guru', [GuruController::class, 'report'])->name('admin.report-guru');
    Route::post('/admin/store-data-guru', [GuruController::class, 'store'])->name('admin.store-guru');
    Route::post('/admin/update-data-guru', [GuruController::class, 'update'])->name('admin.update-guru');
    Route::delete('/admin/delete-data-guru', [GuruController::class, 'delete'])->name('admin.delete-guru');

    Route::get('/admin/kelola-data-siswa', [SiswaController::class, 'index'])->name('admin.kelola-siswa');
    Route::get('/admin/report-data-siswa', [SiswaController::class, 'report'])->name('admin.report-siswa');
    Route::post('/admin/store-data-siswa', [SiswaController::class, 'store'])->name('admin.store-siswa');
    Route::post('/admin/update-data-siswa', [SiswaController::class, 'update'])->name('admin.update-siswa');
    Route::delete('/admin/delete-data-siswa', [SiswaController::class, 'delete'])->name('admin.delete-siswa');
    Route::get('/admin/get-foto-siswa/{id}', [SiswaController::class, 'get_foto'])->name('admin.get-foto-siswa');
    Route::post('/admin/store-foto-siswa/{id}', [SiswaController::class, 'store_foto'])->name('admin.store-foto-siswa');
    Route::delete('/admin/delete-foto-siswa/{id}', [SiswaController::class, 'delete_foto'])->name('admin.delete-foto-siswa');

    Route::get('admin/kelola-kelas', [KelasController::class, 'index'])->name('admin.kelola-kelas');
    Route::post('admin/store-kelas', [KelasController::class, 'store'])->name('admin.store-kelas');
    Route::post('admin/update-kelas', [KelasController::class, 'update'])->name('admin.update-kelas');
    Route::delete('admin/delete-kelas', [KelasController::class, 'delete'])->name('admin.delete-kelas');

    Route::get('admin/kelola-jadwal-mengajar', [JadwalMengajarController::class, 'index'])->name('admin.kelola-jadwal-mengajar');
    Route::post('admin/store-jadwal-mengajar', [JadwalMengajarController::class, 'store'])->name('admin.store-jadwal-mengajar');
    Route::post('admin/update-jadwal-mengajar', [JadwalMengajarController::class, 'update'])->name('admin.update-jadwal-mengajar');
    Route::delete('admin/delete-jadwal-mengajar', [JadwalMengajarController::class, 'delete'])->name('admin.delete-jadwal-mengajar');

    Route::post('admin/update-semester', [SemesterController::class, 'update'])->name('admin.update-semester');

    Route::post('admin/store-tahun-ajaran', [TahunAjaranController::class, 'store'])->name('admin.store-tahun-ajaran');
    Route::delete('admin/delete-tahun-ajaran/{id}', [TahunAjaranController::class, 'delete'])->name('admin.delete-tahun-ajaran');

    Route::get('admin/kelola-data-mapel', [MapelController::class, 'index'])->name('admin.kelola-mapel');
    Route::post('admin/store-data-mapel', [MapelController::class, 'store'])->name('admin.store-mapel');
    Route::post('admin/update-data-mapel', [MapelController::class, 'update'])->name('admin.update-mapel');
    Route::delete('admin/delete-data-mapel', [MapelController::class, 'delete'])->name('admin.delete-mapel');
});
Route::get('', [AbsenController::class, 'index'])->name('home');


Route::get('get-data-mapel', function (Request $request) {
    $nis = $request->nis;
    $semester = Semester::where('status', 'aktif')->first();
    $tahunAjaran = TahunAjaran::where('status', 'aktif')->first();
    $cekSiswa = Siswa::with('foto')->where('nis', '=', $nis)->first();
    // dd($cekSiswa);
    if ($cekSiswa == null) {
        return response()->json(['type' => 'error', 'message' => 'NIS tidak terdaftar silahkan masukkan ulang NIS untuk Absen'], 422);
    }
    $waktuSekarang = Carbon::now();

    $cekJadwal = JadwalMengajar::with('mapel', 'guru', 'kelas')
        ->where('semester_id', '=', $semester->id)
        ->where('tahun_ajaran_id', '=', $tahunAjaran->id)
        ->where('kelas_id', $cekSiswa->kelas_id)
        ->whereTime('jam_masuk', '<=', $waktuSekarang->format('H:i:s'))
        ->whereTime('jam_selesai', '>=', $waktuSekarang->format('H:i:s'))

        ->first();
    // dd($cekJadwal);
    $data = [];
    if ($cekJadwal) {
        $jamMasuk = Carbon::create($cekJadwal->jam_masuk);
        $selisihKeterlambatan = $waktuSekarang->diffInMinutes($jamMasuk);

        $data = [
            'nama_siswa' => $cekSiswa->nama_lengkap,
            'kelas' => $cekJadwal->kelas->nama_kelas,
            'guru' => $cekJadwal->guru->nama_lengkap,
            'jam_masuk' => $cekJadwal->jam_masuk,
            'jam_selesai' => $cekJadwal->jam_selesai,
            'mapel' => $cekJadwal->mapel->nama_mapel,
            'status' => $selisihKeterlambatan < 10 ? 'ontime' : 'terlambat',
            'foto' => $cekSiswa->foto,
            'jadwal_mengajar_id' => $cekJadwal->id
        ];
    } else {
        return response()->json(['type' => 'error', 'message' => 'Anda tidak memiliki jam pelajaran saat ini, silahkan absens saat jam pelajaran akan dimulai'], 422);
    }

    return response()->json($data);
})->name('get-absensi-mapel');

Route::post('store-absens-siswa', [AbsensiController::class, 'store'])->name('siswa.store-absensi');

//guru
Route::get('guru/management-presensi', [ManagemenPresensiController::class, 'index'])->name('guru.management-presensi');
Route::post('guru/update-kehadiran-management-presensi', [ManagemenPresensiController::class, 'updateKehadiran'])->name('guru.update-kehadiran-management-presensi');
Route::post('guru/update-terlambat-management-presensi', [ManagemenPresensiController::class, 'updateTerlambat'])->name('guru.update-terlambat-management-presensi');
Route::post('guru/proses-management-presensi', [ManagemenPresensiController::class, 'proses'])->name('guru.proses-management-presensi');

Route::get('guru/rekap-absensi', [RekapAbsensiController::class, 'index'])->name('guru.rekap-absensi');
