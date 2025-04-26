import Table from "@/Components/Table";
import Layouts from "@/Layouts/Layouts";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import "moment/locale/id";
import { debounce, pickBy } from "lodash";
import { router } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import Modals from "@/Components/CostumModal";
import Form from "./Form";
moment.locale("id");
export default function Index(props) {
    const { data: admin } = props.admin;
    const [params, setParams] = useState({ page: "", q: "", search: "" });
    const [modalForm, setModalForm] = useState(false);
    const [model, setModel] = useState();
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.kelola-admin"), pickBy({ ...query }), {
                preserveScroll: true,
                preserveState: true,
            });
        }, 500), // ⬅️ delay 500ms
        []
    );
    const onClose = () => {
        setModalForm(false);
    };
    const editHandler = (item) => {
        setModel(item);
        setModalForm(true);
    };
    const deleteHandler = (id) => {
        router.delete(route("admin.delete-admin", { id: id }));
    };
    useEffect(() => {
        reload(params);
    }, [params]);
    return (
        <div className="p-9">
            <Modals
                title={model ? "Edit Data" : "Tambah Data"}
                open={modalForm}
                onClose={onClose}
            >
                <Form model={model} onClose={onClose} />
            </Modals>
            <div className="overflow-x-auto w-full">
                <div className="flex justify-between items-center py-3 px-3 w-full">
                    <button
                        onClick={() => setModalForm(true)}
                        className="flex gap-x-3 py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        <Add />
                        <p>Tambah Admin</p>
                    </button>
                    <div className="flex gap-3 items-center">
                        <input
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            name="search"
                            placeholder="Search...."
                            className="disabled:bg-red-100 text-red-500 rounded-md border border-red-200 outline-red-200 focus:border-red-400 focus:outline-red-400 focus:ring-0"
                        />
                        <select
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            name="q"
                            id=""
                            className="disabled:bg-red-100 text-red-500 rounded-md border border-red-200 outline-red-200 focus:border-red-400 focus:outline-red-400 focus:ring-0"
                        >
                            <option value="1">10</option>
                            <option value="2">20</option>
                            <option value="3">30</option>
                            <option value="4">40</option>
                            <option value="all">Semua</option>
                        </select>
                    </div>
                </div>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th scope="col" className="px-4 py-3">
                                #
                            </Table.Th>
                            <Table.Th scope="col" className="px-4 py-3">
                                NIP
                            </Table.Th>
                            <Table.Th scope="col" className="px-4 py-3">
                                Nama Lengkap
                            </Table.Th>
                            <Table.Th scope="col" className="px-4 py-3">
                                Telephone
                            </Table.Th>
                            <Table.Th scope="col" className="px-4 py-3">
                                Tanggal Lahir
                            </Table.Th>
                            <Table.Th scope="col" className="px-4 py-3">
                                Jenis Kelamin
                            </Table.Th>
                            <Table.Th scope="col" className="px-4 py-3">
                                Created At
                            </Table.Th>
                            <Table.Th scope="col" className="px-4 py-3">
                                Aksi
                            </Table.Th>
                        </tr>
                    </Table.Thead>
                    <tbody>
                        {admin.length > 0 ? (
                            admin.map((item, key) => (
                                <tr
                                    key={key}
                                    className="border-b border-red-500/50 odd:bg-red-50"
                                >
                                    <td className="py-3 px-4">{key + 1}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex gap-2 items-center">
                                            <img
                                                src={"/storage/" + item.image}
                                                alt={item.nama_lengkap}
                                                className="w-10 h-10 object-cover object-center bg-red-500 rounded-full p-1"
                                            />
                                            <p>{item.nis}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 capitalize">
                                        {item.nama_lengkap}
                                    </td>
                                    <td className="py-3 px-4">
                                        {item.telephone}
                                    </td>
                                    <td className="py-3 px-4">
                                        {moment(item.tanggal_lahir).format(
                                            "D-MMMM-Y"
                                        )}
                                    </td>
                                    <td className="py-3 px-4 capitalize">
                                        {item.jenis_kelamin}
                                    </td>
                                    <td className="py-3 px-4">
                                        {moment(item.created_at).format(
                                            "D-MMMM-Y"
                                        )}
                                    </td>
                                    <td className="py-3 px-4 flex gap-2">
                                        <button
                                            onClick={() => editHandler(item)}
                                            className="py-1 px-2 rounded-md drop-shadow-shadow bg-orange-500 hover:bg-orange-500 tracking-tighter text-white"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteHandler(item.id)
                                            }
                                            className="py-1 px-2 rounded-md drop-shadow-shadow bg-red-500 hover:bg-red-500 tracking-tighter text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
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

Index.layout = (page) => <Layouts children={page} title={"Data Admin"} />;
