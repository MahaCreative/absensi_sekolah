import CostumInput from "@/Components/CostumInput";
import CostumOption from "@/Components/CostumOption";
import useSweetAlertNotification from "@/Hook/useSweetAlertNotification";
import { useForm, usePage } from "@inertiajs/react";
import { Cancel, Save } from "@mui/icons-material";
import React, { useEffect } from "react";

export default function Form({ model, onClose }) {
    const showAlert = useSweetAlertNotification();
    const { guru } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        guru_id: "",
        nama_kelas: "",
    });
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            guru_id: model ? model.guru_id : "",
            nama_kelas: model ? model.nama_kelas : "",
        });
    }, [model]);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-kelas"), {
            onSuccess: () => {
                onClose();
                reset("guru_id", "nama_kelas");
                showAlert(
                    "success",
                    "Berhasil",
                    "Berhasil menyimpan 1 data kelas baru kedatabase"
                );
            },
            onError: (err) => {
                showAlert(
                    "error",
                    "Gagal",
                    "gagal menyimpan data kelas kedatabase, silahkan periksa kembali isian anda"
                );
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-kelas"), {
            onSuccess: () => {
                onClose();
                reset("guru_id", "nama_kelas");
                showAlert(
                    "success",
                    "Berhasil",
                    "Berhasil mengupdate 1 data kelas baru kedatabase"
                );
            },
            onError: (err) => {
                showAlert(
                    "error",
                    "Gagal",
                    "gagal mengupdate data kelas kedatabase, silahkan periksa kembali isian anda"
                );
            },
        });
    };
    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="py-3 px-4 flex flex-col gap-3"
        >
            <div>
                <p className="text-red-500 font-bold">Wali Kelas</p>
                <CostumOption
                    className={"w-full"}
                    name="guru_id"
                    value={data.guru_id}
                    errors={errors.guru_id}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                >
                    <option value="">Pilih Wali Kelas</option>
                    {guru.map((item, key) => (
                        <option value={item.id} key={key}>
                            {item.nama_lengkap}
                        </option>
                    ))}
                </CostumOption>
            </div>
            <div>
                <p className="text-red-500 font-bold">Nama Kelas</p>
                <CostumInput
                    className={"w-full"}
                    name="nama_kelas"
                    value={data.nama_kelas}
                    errors={errors.nama_kelas}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
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
