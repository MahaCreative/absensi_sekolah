<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalMengajar extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function tahun_ajaran()
    {
        return $this->belongsTo(TahunAjaran::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }
    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }
    public function mapel()
    {
        return $this->belongsTo(Mapel::class);
    }
    public function guru()
    {
        return $this->belongsTo(Guru::class);
    }
}
