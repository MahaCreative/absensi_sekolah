import moment from "moment";
import React from "react";

export default function Report(props) {
    const guru = props.guru;
    return (
        <div className="w-full overflow-x-auto px-16 py-6">
            <div className="flex justify-between items-center border-b-2 border-black py-2">
                <div>
                    <img
                        src="/storage/Image/default_profile.webp"
                        alt=""
                        className="w-16"
                    />
                </div>
                <div className="w-full  my-4 ">
                    <p className="font-bold text-2xl text-center ">
                        SD NEGERI SIMBUANG 2
                    </p>
                    <p className="text-xs font-light italic text-center">
                        Jl. Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Exercitationem qui laboriosam, ab commodi quo
                        dolorum?
                    </p>
                </div>
                <div>
                    <img
                        src="/storage/Image/default_profile.webp"
                        alt=""
                        className="w-16"
                    />
                </div>
            </div>
            <p className="font-bold text-xl mt-3">Laporan : Data Guru</p>
            <p className="font-light mb-2">
                Print : {moment(new Date()).format("llll")}
            </p>
            <table className="w-full">
                <thead className="bg-blue-50">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            #
                        </th>
                        <th scope="col" className="px-4 py-3">
                            NIP
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Nama Lengkap
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Telephone
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Tanggal Lahir
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Jenis Kelamin
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Created At
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {guru.length > 0 ? (
                        guru.map((item, key) => (
                            <tr key={key} className="border-b ">
                                <td className="py-3 px-4 text-center">
                                    {key + 1}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <div className="flex gap-2 items-center">
                                        <p>{item.nis}</p>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-center capitalize">
                                    {item.nama_lengkap}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    {item.telephone}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    {moment(item.tanggal_lahir).format(
                                        "D-MMMM-Y"
                                    )}
                                </td>
                                <td className="py-3 px-4 text-center capitalize">
                                    {item.jenis_kelamin}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    {moment(item.created_at).format("D-MMMM-Y")}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td scope="col" colSpan={9} className="text-center">
                                Belum ada data yang berhasil ditambahkan
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
