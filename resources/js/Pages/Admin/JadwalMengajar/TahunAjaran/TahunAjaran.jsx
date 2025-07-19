import CostumInput from "@/Components/CostumInput";
import Table from "@/Components/Table";
import { router, useForm, usePage } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import moment from "moment";
import React, { useState } from "react";

export default function TahunAjaran() {
    const { tahun_ajaran, auth } = usePage().props;
    const role = auth.user.role;
    const { data, setData, post, reset, errors } = useForm({
        tahun: moment(new Date()).format("Y"),
    });
    const submitHandler = () => {
        post(route("admin.store-tahun-ajaran"));
    };
    const deleteHandler = (id) => {
        router.delete(route("admin.delete-tahun-ajaran", id));
    };
    return (
        <div className="w-full">
            <div className="py-3 flex items-start gap-3">
                {role == "admin" && (
                    <>
                        <div>
                            <CostumInput
                                placeHolder="Tahun Ajaran"
                                type="number"
                                value={data.tahun}
                                errors={errors.tahun}
                                onChange={(e) =>
                                    setData({ ...data, tahun: e.target.value })
                                }
                            />
                        </div>
                        <button
                            onClick={() => submitHandler()}
                            className="flex gap-x-3 py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            <Add />
                            <p>Tambah Tahun Ajaran</p>
                        </button>
                    </>
                )}
            </div>
            <div className="max-h-[145px] overflow-auto">
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th scope="col" className="px-4 py-3">
                                #
                            </Table.Th>
                            <Table.Th scope="col" className="px-4 py-3">
                                Tahun Ajaran
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
                        {tahun_ajaran.length > 0 ? (
                            tahun_ajaran.map((item, key) => (
                                <tr
                                    key={key}
                                    className="border-b border-red-500/50 odd:bg-red-50"
                                >
                                    <td className="py-3 px-4">{key + 1}</td>
                                    <td className="py-3 px-4 capitalize">
                                        {item.tahun_ajaran}
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
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    scope="col"
                                    colSpan={9}
                                    className="text-center"
                                >
                                    Belum ada data yang berhasil ditambahkan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
