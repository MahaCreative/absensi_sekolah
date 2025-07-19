<?php

namespace App\Http\Requests;

use App\Models\JadwalMengajar;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StoreJadwalMengajarRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tahun_ajaran_id' => ['required', 'exists:tahun_ajarans,id'],
            'semester_id' => ['required', 'exists:semesters,id'],
            'kelas_id' => ['required', 'exists:kelas,id'],
            'mapel_id' => ['required', 'exists:mapels,id'],
            'guru_id' => ['required', 'exists:gurus,id'],
            'hari' => ['required', 'string'],
            'jam_masuk' => ['required', 'date_format:H:i'],
            'jam_selesai' => ['required', 'date_format:H:i'],
            'jam_ke' => [
                'required',
                'integer',
                function ($attribute, $value, $fail) {
                    $exists = \App\Models\JadwalMengajar::where('guru_id', $this->guru_id)
                        ->where('tahun_ajaran_id', $this->tahun_ajaran_id)
                        ->where('semester_id', $this->semester_id)
                        ->where('hari', $this->hari)
                        ->where('jam_ke', $value)
                        ->exists();

                    if ($exists) {
                        $fail('Guru sudah mengajar di jam ini pada hari tersebut.');
                    }
                }
            ],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function ($validator) {
            $bentrok = JadwalMengajar::where('tahun_ajaran_id', $this->tahun_ajaran_id)
                ->where('semester_id', $this->semester_id)
                ->where('kelas_id', $this->kelas_id)
                ->where('hari', $this->hari)
                ->where(function ($query) {
                    $query->where(function ($q) {
                        $q->where('jam_masuk', '<=', $this->jam_masuk)
                            ->where('jam_selesai', '>', $this->jam_masuk);
                    })->orWhere(function ($q) {
                        $q->where('jam_masuk', '<', $this->jam_selesai)
                            ->where('jam_selesai', '>=', $this->jam_selesai);
                    })->orWhere(function ($q) {
                        $q->where('jam_masuk', '>=', $this->jam_masuk)
                            ->where('jam_selesai', '<=', $this->jam_selesai);
                    });
                })
                ->exists();

            if ($bentrok) {
                $validator->errors()->add('jam_masuk', 'Jadwal bentrok dengan jam pelajaran lain.');
            }
        });
    }
}
