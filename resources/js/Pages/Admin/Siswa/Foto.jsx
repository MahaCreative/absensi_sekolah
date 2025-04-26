import { router } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Foto({ id }) {
    const [foto, setFoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const getFoto = async () => {
        try {
            const response = await axios.get(route("admin.get-foto-siswa", id));
        } catch (err) {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
        }
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
            {loading ? <div></div> : <div></div>}
        </div>
    );
}
