import Table from "@/Components/Table";
import { router, usePage } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import React from "react";

export default function Semester() {
    const { semester, auth } = usePage().props;
    const role = auth.user.role;
    const updateStatus = (id) => {
        router.post(route("admin.update-semester", { id: id }));
    };
    return (
        <div className="w-full">
            <div className="py-3"></div>
            <Table>
                <Table.Thead>
                    <tr>
                        <Table.Th scope="col" className="px-4 py-3">
                            #
                        </Table.Th>
                        <Table.Th scope="col" className="px-4 py-3">
                            Semester
                        </Table.Th>
                        <Table.Th scope="col" className="px-4 py-3">
                            Status
                        </Table.Th>
                        {role == "admin" && (
                            <Table.Th scope="col" className="px-4 py-3">
                                Aksi
                            </Table.Th>
                        )}
                    </tr>
                </Table.Thead>
                <tbody>
                    {semester.length > 0 ? (
                        semester.map((item, key) => (
                            <tr
                                key={key}
                                className="border-b border-red-500/50 odd:bg-red-50"
                            >
                                <td className="py-3 px-4">{key + 1}</td>

                                <td className="py-3 px-4 capitalize">
                                    {item.semester}
                                </td>
                                <td className={` py-3 px-4 capitalize`}>
                                    <p
                                        className={`${
                                            item.status == "aktif" &&
                                            "bg-green-500 text-white"
                                        } inline py-2 px-3 rounded-md`}
                                    >
                                        {item.status}
                                    </p>
                                </td>

                                {role == "admin" && (
                                    <td className="py-3 px-4 flex gap-2">
                                        <button
                                            onClick={() =>
                                                deleteHandler(item.id)
                                            }
                                            className="py-1 px-2 rounded-md drop-shadow-shadow bg-red-500 hover:bg-red-500 tracking-tighter text-white"
                                        >
                                            Delete
                                        </button>
                                        {item.status == "nonaktif" && (
                                            <button
                                                onClick={() =>
                                                    updateStatus(item.id)
                                                }
                                                className="py-1 px-2 rounded-md drop-shadow-shadow bg-green-500 hover:bg-green-500 tracking-tighter text-white"
                                            >
                                                Aktif
                                            </button>
                                        )}
                                    </td>
                                )}
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
            </Table>
        </div>
    );
}
