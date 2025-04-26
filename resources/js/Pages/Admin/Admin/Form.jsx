import CostumInput from "@/Components/CostumInput";
import CostumOption from "@/Components/CostumOption";
import CostumTextArea from "@/Components/CostumTextArea";
import { useForm } from "@inertiajs/react";
import { Cancel, Save } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

export default function Form({ model, onClose }) {
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        nis: "",
        password: "",
        alamat: "",
        telephone: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        image: "",
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
        post(route("admin.store-admin"));
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-admin"));
    };
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            name: model ? model.nama_lengkap : "",
            nis: model ? model.nis : "",
            alamat: model ? model.alamat : "",
            telephone: model ? model.telephone : "",
            tanggal_lahir: model ? model.tanggal_lahir : "",
            jenis_kelamin: model ? model.jenis_kelamin : "",
            image: model ? model.image : "",
        });
        setPreviewImage(model ? "/storage/" + model.image : null);
    }, [model]);
    return (
        <form onSubmit={model ? updateHandler : submitHandler} className="">
            <div className="flex flex-row gap-3 items-start gap-x-3 py-3 w-full">
                <div className="w-full md:w-1/2">
                    <div className="flex gap-x-3 items-center">
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
                                name={"name"}
                                value={data.name}
                                errors={errors.name}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-red-500 font-medium capitalize">
                            Password
                        </p>
                        <CostumInput
                            type="password"
                            className="w-full"
                            name={"password"}
                            value={data.password}
                            errors={errors.password}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <p className=" font-medium capitalize text-xs text-gray-500">
                            *Kosongkan password jika tidak ingin mengganti
                            password
                        </p>
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

                    <div className="flex gap-x-3 items-center">
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
                    </div>
                </div>
                <div
                    onClick={handleImage}
                    className="w-full md:w-1/2 relative hover:cursor-pointer min-h-[300px] max-h-[400px]"
                >
                    <img
                        src={
                            previewImage
                                ? previewImage
                                : "/storage/Image/default_profile.webp"
                        }
                        alt=""
                        className="border border-gray-300 rounded-md drop-shadow-sm w-full max-h-[300px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center items-center py-2">
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
