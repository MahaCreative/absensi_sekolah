import Layouts from "@/Layouts/Layouts";
import { Class, Face2, Group } from "@mui/icons-material";
import React from "react";

export default function Index(props) {
    const count = props.count;

    return (
        <div className="flex flex-row gap-x-3 justify-between items-start py-8 px-8">
            <div className="w-[600px] h-[240px] bg-white drop-shadow-md py-3 px-4 flex flex-col justify-center items-center rounded-xl ">
                <img
                    src="loading.gif"
                    alt=""
                    className="rounded-full w-24 h-24 object-cover bg-blue-400 my-3"
                />
                <h1>SD NEGERI SIMBUANG 2</h1>
                <p className="tracking-tighter font-light text-center leading-3 my-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque, tempore?
                </p>
            </div>
            <div className="w-full bg-white drop-shadow-md py-3 px-4 flex flex-col justify-center items-center rounded-xl ">
                <div className="grid grid-cols-2 gap-x-3 w-full gap-3">
                    <div className="w-full py-5 px-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-md drop-shadow-sm flex items-center justify-between">
                        <p className="text-5xl text-white leading-3 tracking-tighter">
                            <Group color="inherit" fontSize="inherit" />
                        </p>
                        <div className="text-right">
                            <p className="text-4xl font-extrabold text-white tracking-tighter">
                                {count.siswaCount}
                            </p>
                            <p className="text-sm text-white tracking-tighter font-mono">
                                Jumlah Siswa
                            </p>
                        </div>
                    </div>
                    <div className="w-full py-5 px-4 bg-gradient-to-br from-pink-600 to-pink-800 rounded-md drop-shadow-sm flex items-center justify-between">
                        <p className="text-5xl text-white leading-3 tracking-tighter">
                            <Face2 color="inherit" fontSize="inherit" />
                        </p>
                        <div className="text-right">
                            <p className="text-4xl font-extrabold text-white tracking-tighter">
                                {count.guruCount}
                            </p>
                            <p className="text-sm text-white tracking-tighter font-mono">
                                Jumlah Guru
                            </p>
                        </div>
                    </div>
                    <div className="w-full py-5 px-4 bg-gradient-to-br from-green-600 to-green-800 rounded-md drop-shadow-sm flex items-center justify-between">
                        <p className="text-5xl text-white leading-3 tracking-tighter">
                            <Class color="inherit" fontSize="inherit" />
                        </p>
                        <div className="text-right">
                            <p className="text-4xl font-extrabold text-white tracking-tighter">
                                {count.kelasCount}
                            </p>
                            <p className="text-sm text-white tracking-tighter font-mono">
                                Jumlah Kelas
                            </p>
                        </div>
                    </div>
                    <div className="w-full py-5 px-4 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-md drop-shadow-sm flex items-center justify-between">
                        <p className="text-5xl text-white leading-3 tracking-tighter">
                            <Class color="inherit" fontSize="inherit" />
                        </p>
                        <div className="text-right">
                            <p className="text-4xl font-extrabold text-white tracking-tighter">
                                {count.mapelCount}
                            </p>
                            <p className="text-sm text-white tracking-tighter font-mono">
                                Jumlah Mapel
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <Layouts children={page} title={"Dashboard"} />;
