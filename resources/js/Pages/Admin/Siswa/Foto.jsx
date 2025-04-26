import { router, useForm } from "@inertiajs/react";
import { Add, Cancel, Delete, Save } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function Foto({ id }) {
    const { data, setData, post, reset, errors } = useForm({ foto: [] });
    const [fotoPreview, setFotoPreview] = useState([]);
    const [fotoSiswa, setFotoSiswa] = useState([]);
    const fotoRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const handleImage = (e) => {
        const files = Array.from(e.target.files);
        const photoUrls = files.map((file) =>
            setFotoPreview((prev) => [...prev, URL.createObjectURL(file)])
        );
        setData((prev) => ({ ...prev, foto: [...prev.foto, ...files] }));
    };
    const handleRemoveImage = (index) => {
        setFotoPreview((prev) => prev.filter((_, i) => i !== index));
        setData((prev) => ({
            ...prev,
            foto: prev.foto.filter((_, i) => i !== index),
        }));
    };
    const getFoto = async () => {
        setLoading(true);
        try {
            const response = await axios.get(route("admin.get-foto-siswa", id));
            setFotoSiswa(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setFotoSiswa([]);
        }
    };
    const saveHandler = (e) => {
        post(route("admin.store-foto-siswa", id), {
            onSuccess: () => {
                getFoto();
                setFotoPreview([]);
                reset();
            },
        });
    };
    const cancelHandler = (e) => {
        setFotoPreview([]);
        reset();
    };
    const deleteFoto = (id) => {
        router.delete(route("admin.delete-foto-siswa", id), {
            onSuccess: () => {
                getFoto();
            },
        });
    };
    useEffect(() => {
        getFoto();
    }, []);

    return (
        <div>
            <p className="text-xs font-light py-2 px-3 rounded-md drop-shadow-sm bg-gray-200 my-3">
                silahkan menambahkan foto agar siswa bisa dapat melakukan
                absensi wajah, tambahkan foto minimal sebanyak 30 foto agar
                akurasi semakin meningkat
            </p>
            <button
                onClick={() => fotoRef?.current.click()}
                className="capitalize flex gap-x-3 py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
            >
                <Add />
                <p>Tambah Foto</p>
            </button>
            <input
                multiple
                ref={fotoRef}
                type="file"
                hidden
                onChange={handleImage}
            />
            {fotoPreview.length > 0 && (
                <div className="py-3">
                    <p className="font-semibold  text-red-500 tracking-tighter text-sm">
                        Preview Upload
                    </p>
                    <p className="font-bold text-sm tracking-tighter">
                        *Pastikan foto yang di upload adalah foto siswa yang
                        terkait
                    </p>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-start my-2">
                {fotoPreview.map((item, key) => (
                    <div key={key} className="relative drop-shadow-md">
                        <img
                            src={item}
                            alt=""
                            className="w-[300px] h-[100px] object-cover object-center"
                        />
                        <button
                            onClick={() => handleRemoveImage(key)}
                            className="bg-red-500 hover:bg-red-700 p-1 rounded-md text-white inline absolute top-2 right-2 leading-3"
                        >
                            <Delete color="inherit" fontSize="inherit" />
                        </button>
                        {errors["foto." + key] && (
                            <p className="absolute text-xs bg-red-500 p-1 rounded-md text-white bottom-1 left-1">
                                {errors["foto." + key]}
                            </p>
                        )}
                    </div>
                ))}
            </div>
            {fotoPreview.length > 0 && (
                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => saveHandler()}
                        className="capitalize flex gap-x-3 py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        <Save />
                        <p>Save</p>
                    </button>
                    <button
                        onClick={() => cancelHandler()}
                        className="capitalize flex gap-x-3 py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white"
                    >
                        <Cancel />
                        <p>Cancell</p>
                    </button>
                </div>
            )}
            {loading ? (
                <div>loading</div>
            ) : fotoSiswa.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-start">
                    {fotoSiswa.map((item, key) => (
                        <div key={key}>
                            <div key={key} className="relative drop-shadow-md">
                                <img
                                    src={"/storage/" + item.foto}
                                    alt=""
                                    className="w-[300px] h-[100px] object-cover object-center"
                                />
                                <button
                                    onClick={() => deleteFoto(item.id)}
                                    className="bg-red-500 hover:bg-red-700 p-1 rounded-md text-white inline absolute top-2 right-2 leading-3"
                                >
                                    <Delete
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p className="text-xs font-light py-2 px-3 rounded-md drop-shadow-sm bg-red-200 my-3">
                        belum ada foto yang ditambahkan, silahkan menambahkan
                        foto sebanyak-banyaknya
                    </p>
                </div>
            )}
        </div>
    );
}
