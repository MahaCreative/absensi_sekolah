import CostumInput from "@/Components/CostumInput";
import CostumOption from "@/Components/CostumOption";
import useSweetAlertNotification from "@/Hook/useSweetAlertNotification";
import { useForm, usePage } from "@inertiajs/react";
import { Cancel, Save } from "@mui/icons-material";
import React, { useEffect } from "react";

export default function Form({ model, onClose }) {
    const showAlert = useSweetAlertNotification();

    const { semester, tahun_ajaran, mapel, guru, kelas } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        tahun_ajaran_id: "",
        semester_id: "",
        kelas_id: "",
        mapel_id: "",
        guru_id: "",
        hari: "",
        jam_masuk: "",
        jam_selesai: "",
        jam_ke: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-jadwal-mengajar"), {
            onSuccess: () => {
                reset(
                    "mapel_id",
                    "guru_id",
                    "jam_mulai",
                    "jam_selesai",
                    "jam_ke"
                );
                onClose();
                showAlert(
                    "success",
                    "Berhasil",
                    "Berhasil menyimpan 1 data jadwal mengajar baru kedatabase"
                );
            },
            onError: () => {
                showAlert(
                    "error",
                    "Gagal",
                    "Gagal menyimpan 1 data kelas baru kedatabase"
                );
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-jadwal-mengajar"), {
            onSuccess: () => {
                reset(
                    "mapel_id",
                    "guru_id",
                    "jam_mulai",
                    "jam_selesai",
                    "jam_ke"
                );
                onClose();
                showAlert(
                    "success",
                    "Berhasil",
                    "Berhasil memperbaharui data jadwal mengajar kedatabase"
                );
            },
            onError: () => {
                showAlert(
                    "error",
                    "Gagal",
                    "Gagal memperbaharui data jadwal mengajar kedatabase"
                );
            },
        });
    };
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            tahun_ajaran_id: model ? model.tahun_ajaran_id : "",
            semester_id: model ? model.semester_id : "",
            kelas_id: model ? model.kelas_id : "",
            mapel_id: model ? model.mapel_id : "",
            guru_id: model ? model.guru_id : "",
            hari: model ? model.hari : "",
            jam_masuk: model ? model.jam_masuk : "",
            jam_selesai: model ? model.jam_selesai : "",
            jam_ke: model ? model.jam_ke : "",
        });
    }, [model]);
    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="py-4 flex flex-col gap-3"
        >
            <div className="flex gap-4 items-start">
                <div className="w-full">
                    <p className="text-sm text-red-500 font-medium capitalize">
                        Tahun Ajaran
                    </p>
                    <CostumOption
                        className="w-full"
                        name={"tahun_ajaran_id"}
                        value={data.tahun_ajaran_id}
                        errors={errors.tahun_ajaran_id}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <option value="">pilih tahun ajaran</option>
                        {tahun_ajaran.map((item, key) => (
                            <option value={item.id} key={key}>
                                {item.tahun_ajaran}
                            </option>
                        ))}
                    </CostumOption>
                </div>
                <div className="w-full">
                    <p className="text-sm text-red-500 font-medium capitalize">
                        Semester
                    </p>
                    <CostumOption
                        className="w-full"
                        name={"semester_id"}
                        value={data.semester_id}
                        errors={errors.semester_id}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <option value="">pilih semester</option>
                        {semester.map((item, key) => (
                            <option value={item.id} key={key}>
                                {item.semester}
                            </option>
                        ))}
                    </CostumOption>
                </div>
            </div>
            <div className="w-full">
                <p className="text-sm text-red-500 font-medium capitalize">
                    Kelas
                </p>
                <CostumOption
                    className="w-full"
                    name={"kelas_id"}
                    value={data.kelas_id}
                    errors={errors.kelas_id}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                >
                    <option value="">pilih kelas</option>
                    {kelas.map((item, key) => (
                        <option value={item.id} key={key}>
                            {item.nama_kelas}
                        </option>
                    ))}
                </CostumOption>
            </div>
            <div className="flex gap-4 items-start">
                <div className="w-full">
                    <p className="text-sm text-red-500 font-medium capitalize">
                        Mata Pelajaran
                    </p>
                    <CostumOption
                        className="w-full"
                        name={"mapel_id"}
                        value={data.mapel_id}
                        errors={errors.mapel_id}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <option value="">pilih tahun ajaran</option>
                        {mapel.map((item, key) => (
                            <option value={item.id} key={key}>
                                {item.nama_mapel}
                            </option>
                        ))}
                    </CostumOption>
                </div>
                <div className="w-full">
                    <p className="text-sm text-red-500 font-medium capitalize">
                        Nama Guru Pengajar
                    </p>
                    <CostumOption
                        className="w-full"
                        name={"guru_id"}
                        value={data.guru_id}
                        errors={errors.guru_id}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <option value="">pilih semester</option>
                        {guru.map((item, key) => (
                            <option value={item.id} key={key}>
                                {item.nama_lengkap}
                            </option>
                        ))}
                    </CostumOption>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="w-full">
                    <p className="text-sm text-red-500 font-medium capitalize">
                        Hari Pelajaran
                    </p>
                    <CostumOption
                        className="w-full"
                        name={"hari"}
                        value={data.hari}
                        errors={errors.hari}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <option value="">pilih tahun ajaran</option>
                        <option value="senin">senin</option>
                        <option value="selasa">selasa</option>
                        <option value="rabu">rabu</option>
                        <option value="kamis">kamis</option>
                        <option value="jumat">jumat</option>
                        <option value="sabtu">sabtu</option>
                    </CostumOption>
                </div>
                <div className="w-full">
                    <p className="text-sm text-red-500 font-medium capitalize">
                        Jam Masuk
                    </p>
                    <CostumInput
                        className="w-full"
                        type="time"
                        name={"jam_masuk"}
                        value={data.jam_masuk}
                        errors={errors.jam_masuk}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="w-full">
                    <p className="text-sm text-red-500 font-medium capitalize">
                        Jam Selesai
                    </p>
                    <CostumInput
                        className="w-full"
                        type="time"
                        name={"jam_selesai"}
                        value={data.jam_selesai}
                        errors={errors.jam_selesai}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="w-full">
                    <p className="text-sm text-red-500 font-medium capitalize">
                        Jam Ke
                    </p>
                    <CostumInput
                        className="w-full"
                        type="number"
                        name={"jam_ke"}
                        value={data.jam_ke}
                        errors={errors.jam_ke}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
            <div className="flex flex-row gap-x-3 items-center w-full">
                <button className=" w-full text-center justify-center py-2 px-3 rounded-md drop-shadow-md hover:bg-blue-600 bg-blue-500 text-white flex gap-x-3 items-center">
                    <p>
                        <Save color="inherit" fontSize="inherit" />
                    </p>
                    <p>Simpan</p>
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className=" w-full text-center justify-center py-2 px-3 rounded-md drop-shadow-md hover:bg-red-600 bg-red-500 text-white flex gap-x-3 items-center"
                >
                    <p>
                        <Cancel color="inherit" fontSize="inherit" />
                    </p>
                    <p>Cancell</p>
                </button>
            </div>
        </form>
    );
}
