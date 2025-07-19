import CostumInput from "@/Components/CostumInput";
import CostumOption from "@/Components/CostumOption";
import { useForm, usePage } from "@inertiajs/react";
import { Cancel, Save } from "@mui/icons-material";
import React, { useEffect } from "react";

export default function Form({ model, onClose }) {
    const { semester, tahun_ajaran, mapel, guru, kelas } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        nama_mapel: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-mapel"), {
            onSuccess: () => {
                reset("nama_mapel");
                onClose();
                showAlert(
                    "success",
                    "Berhasil",
                    "Berhasil menyimpan data mata pelajaran kedatabase"
                );
            },
            onError: (err) => {
                showAlert(
                    "error",
                    "Gagal",
                    "Gagal menyimpan data matapelajaran baru, silahkan periksa kembali isian anda"
                );
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-mapel"), {
            onSuccess: () => {
                reset("nama_mapel");
                onClose();
                showAlert(
                    "success",
                    "Berhasil",
                    "Berhasil memperbaharui data matapelajaran baru"
                );
            },
            onError: (err) => {
                showAlert(
                    "error",
                    "Gagal",
                    "Gagal menperbaharui data matapelajaran, silahkan periksa kembali isian anda"
                );
            },
        });
    };
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            nama_mapel: model ? model.nama_mapel : "",
        });
    }, [model]);
    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="py-4 flex flex-col gap-3"
        >
            <div className="w-full">
                <p className="text-sm text-red-500 font-medium capitalize">
                    Nama Mata Pelajaran
                </p>
                <CostumInput
                    className="w-full"
                    name={"nama_mapel"}
                    value={data.nama_mapel}
                    errors={errors.nama_mapel}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
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
