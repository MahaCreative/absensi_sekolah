import CostumInput from "@/Components/CostumInput";
import useSweetAlertNotification from "@/Hook/useSweetAlertNotification";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function Login() {
    const showAlert = useSweetAlertNotification();
    const { data, setData, post, reset, errors } = useForm({
        nis: "",
        password: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onSuccess: () => {
                showAlert(
                    "success",
                    "Login sukses",
                    "Selamat anda berhasil login."
                );
            },
            onError: (err) => {
                showAlert(
                    "error",
                    "Login Gagal",
                    "Login gagal, silahkan periksa kembali isian anda"
                );
            },
        });
    };
    return (
        <div className="w-full h-[1100px] lg:h-[685px] flex gap-x-3 items-start bg-red-500 bg-[url('/storage/Image/bg.jpg')] bg-right-bottom bg-cover md:bg-cover overflow-y-auto">
            <div className="w-full h-[920px] lg:h-[685px] absolute top-0 left-0 bg-black/30">
                <div className=" w-full h-full flex flex-col md:flex-row items-center justify-start md:justify-center py-16 z-10 gap-6">
                    <div className="w-full flex justify-center items-center">
                        <img src="/loading.gif" alt="" className="w-[40%]" />
                    </div>
                    <div className="w-full h-screen flex flex-col justify-center items-center px-8">
                        <div className="w-full">
                            <h1 className="text-white text-2xl md:text-4xl tracking-tighter font-extrabold">
                                Selamat Datang Di
                            </h1>
                            <p className="text-xl text-white tracking-tighter">
                                Sistem Informasi Absensi Berbasis Face
                                Recognition
                            </p>
                            <h1 className="text-white text-5xl md:text-7xl tracking-tighter font-extrabold">
                                SDN Simbuang 2
                            </h1>
                        </div>
                        <div className="bg-white/80 py-2 px-3 rounded-md drop-shadow-md my-2 w-full relative">
                            <p className="py-2 px-3 rounded-md bg-gray-200 drop-shadow-sm tracking-tighter ">
                                Silahkan memasukkan NIS dan Password untuk login
                                kedalam sistem{" "}
                            </p>
                            <form action="" onSubmit={submitHandler}>
                                <div className="my-1">
                                    <p>NIS</p>
                                    <CostumInput
                                        className={"w-full"}
                                        name="nis"
                                        value={data.nis}
                                        errors={errors.nis}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                nis: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="my-1">
                                    <p>Password</p>
                                    <CostumInput
                                        className={"w-full"}
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        errors={errors.password}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex gap-x-3 items-center my-2">
                                    <button className="bg-green-500 text-white py-2 px-3 rounded-md">
                                        Login Sekarang
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
