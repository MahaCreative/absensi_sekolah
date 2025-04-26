import CostumInput from "@/Components/CostumInput";
import CostumOption from "@/Components/CostumOption";
import CostumTextArea from "@/Components/CostumTextArea";
import Table from "@/Components/Table";
import { useForm, usePage } from "@inertiajs/react";
import { Cancel, Save } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

export default function Form({ model, onClose }) {
    const { kelas } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        kelas_id: "",
        nis: "",
        nama_lengkap: "",
        alamat: "",
        telephone: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        image: "",
        nama_orang_tua: "",
        no_hp_orang_tua: "",
    });
    const [previewImage, setPreviewImage] = useState(null);
    const imageREf = useRef(null);

    const handleImage = () => {
        imageREf.current.click();
    };

    const chaneImage = (e) => {
        let fileImage = e.target.files[0];
        setPreviewImage(URL.createObjectURL(fileImage));
        setData((prev) => ({ ...prev, image: fileImage }));
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-siswa"), {
            onSuccess: () => {
                onClose();
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-siswa"), {
            onSuccess: () => {
                onClose();
            },
        });
    };
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            kelas_id: model ? model.kelas_id : "",
            nis: model ? model.nis : "",
            nama_lengkap: model ? model.nama_lengkap : "",
            alamat: model ? model.alamat : "",
            telephone: model ? model.telephone : "",
            tanggal_lahir: model ? model.tanggal_lahir : "",
            jenis_kelamin: model ? model.jenis_kelamin : "",
            image: model ? model.image : "",
            nama_orang_tua: model ? model.nama_orang_tua : "",
            no_hp_orang_tua: model ? model.no_hp_orang_tua : "",
        });
        setPreviewImage(model ? "/storage/" + model.image : null);
    }, [model]);

    return (
        <form onSubmit={model ? updateHandler : submitHandler} className="">
            <div className="flex flex-row gap-3 items-start gap-x-3 py-3 w-full">
                <div className="w-full md:w-1/2">
                    <div className="flex gap-x-3 items-start">
                        <div className="w-full">
                            <p className="text-sm text-red-500 font-medium capitalize">
                                NIS
                            </p>
                            <CostumInput
                                className="w-full"
                                name={"nis"}
                                value={data.nis}
                                errors={errors.nis}
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
                                Nama Lengkap
                            </p>
                            <CostumInput
                                className="w-full"
                                name={"nama_lengkap"}
                                value={data.nama_lengkap}
                                errors={errors.nama_lengkap}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <p className="text-red-500 font-medium capitalize">
                        Alamat
                    </p>
                    <CostumTextArea
                        className="w-full"
                        name={"alamat"}
                        value={data.alamat}
                        errors={errors.alamat}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />

                    <div className="flex gap-x-3 items-start">
                        <div className="w-full">
                            <p className="text-sm text-red-500 font-medium capitalize">
                                Nomor Telephone
                            </p>
                            <CostumInput
                                className="w-full"
                                name={"telephone"}
                                value={data.telephone}
                                errors={errors.telephone}
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
                                Tanggal Lahir
                            </p>
                            <CostumInput
                                className="w-full"
                                type="date"
                                name={"tanggal_lahir"}
                                value={data.tanggal_lahir}
                                errors={errors.tanggal_lahir}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <p className="text-sm text-red-500 font-medium capitalize">
                            Jenis Kelamin
                        </p>
                        <CostumOption
                            className="w-full"
                            name={"jenis_kelamin"}
                            value={data.jenis_kelamin}
                            errors={errors.jenis_kelamin}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <option value="">pilih jenis kelamin</option>
                            <option value="laki-laki">Laki-Laki</option>
                            <option value="perempuan">Perempuan</option>
                        </CostumOption>
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
                            <option value="">pilih kelas siswa</option>
                            {kelas.map((item, key) => (
                                <option value={item.id} key={key}>
                                    {item.nama_kelas}
                                </option>
                            ))}
                        </CostumOption>
                    </div>
                    <p className="font-bold text-sm py-3">Data Orang Tua</p>
                    <div className="flex gap-x-3 items-start">
                        <div className="w-full">
                            <p className="text-sm text-red-500 font-medium capitalize">
                                Nama Wali
                            </p>
                            <CostumInput
                                className="w-full"
                                name={"nama_orang_tua"}
                                value={data.nama_orang_tua}
                                errors={errors.nama_orang_tua}
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
                                Nomor Telephon Wali
                            </p>
                            <CostumInput
                                className="w-full"
                                name={"no_hp_orang_tua"}
                                value={data.no_hp_orang_tua}
                                errors={errors.no_hp_orang_tua}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 relative hover:cursor-pointer min-h-[300px] max-h-[400px]">
                    <img
                        src={
                            previewImage
                                ? previewImage
                                : "/storage/Image/default_profile.webp"
                        }
                        alt=""
                        className="border border-gray-300 rounded-md drop-shadow-sm w-full min-h-[200px] max-h-[300px] object-cover"
                    />
                    <div
                        onClick={handleImage}
                        className="absolute top-20 left-0 w-full flex flex-col justify-center items-center py-2"
                    >
                        <div className="text-white py-2 px-3 bg-blue-500 inline rounded-md my-2">
                            <p>Change Image</p>
                        </div>
                        {errors.image && (
                            <div className="text-white py-2 px-3 bg-red-500 inline rounded-md my-2">
                                <p>{errors.image}</p>
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        ref={imageREf}
                        onChange={chaneImage}
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
