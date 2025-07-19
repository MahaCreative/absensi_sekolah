import Layouts from "@/Layouts/Layouts";
import React, { useCallback, useEffect, useState } from "react";
import Semester from "./Semester/Semester";
import TahunAjaran from "./TahunAjaran/TahunAjaran";
import { Add, Filter, Search, Sort } from "@mui/icons-material";
import Table from "@/Components/Table";
import Modals from "@/Components/CostumModal";
import Form from "./Form";
import moment from "moment";
import CostumOption from "@/Components/CostumOption";
import { router, usePage } from "@inertiajs/react";
import { debounce, pickBy } from "lodash";
export default function Index(props) {
    const mapel = props.mapel;
    const kelas = props.kelas;
    const { auth, semester, tahun_ajaran, guru } = usePage().props;
    const role = auth.user.role;
    const { data: jadwalMengajar } = props.jadwalMengajar;
    const [params, setParams] = useState({
        page: "",
        q: "",
        search: "",
        tahun_ajaran_id: "",
        semester_id: "",
        kelas_id: "",
        mapel_id: "",
        guru_id: "",
        hari: "",
    });
    const [modalForm, setModalForm] = useState(false);
    const [modalFilter, setModalFilter] = useState(false);
    const [model, setModel] = useState();
    const onClose = () => {
        setModalForm(false);
        setModel();
    };
    const editHandler = (item) => {
        setModalForm(true);
        setModel(item);
    };
    const reload = useCallback(
        debounce((query) => {
            router.get(
                route("admin.kelola-jadwal-mengajar"),
                pickBy({ ...query }),
                {
                    preserveScroll: true,
                    preserveState: true,
                }
            );
        }, 500), // ⬅️ delay 500ms
        []
    );
    useEffect(() => {
        reload(params);
    }, [params]);
    const deleteHandler = (id) => {
        router.delete(route("admin.delete-jadwal-mengajar", { id: id }));
    };
    console.log(role);

    return (
        <div className="py-3 px-8">
            <Modals
                title={"Filter data"}
                open={modalFilter}
                onClose={() => setModalFilter(false)}
            >
                <p className="my-3 py-1.5 px-3 text-sm tracking-tighter bg-gray-200">
                    Silahkan mengatur data yang ingin ditampilkan
                </p>
                <div>
                    <div className="flex gap-4 items-start">
                        <div className="w-full">
                            <p className="text-sm text-red-500 font-medium capitalize">
                                Tahun Ajaran
                            </p>
                            <CostumOption
                                className="w-full"
                                name={"tahun_ajaran_id"}
                                value={params.tahun_ajaran_id}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <option value="">pilih tahun ajaran</option>
                                {tahun_ajaran.map((item, key) => (
                                    <option value={item.id} key={key}>
                                        {item.tahun_ajaran}
                                    </option>
                                ))}
                            </CostumOption>
                        </div>
                        <div className="w-full">
                            <p className="text-sm text-red-500 font-medium capitalize">
                                Semester
                            </p>
                            <CostumOption
                                className="w-full"
                                name={"semester_id"}
                                value={params.semester_id}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <option value="">pilih semester</option>
                                {semester.map((item, key) => (
                                    <option value={item.id} key={key}>
                                        {item.semester}
                                    </option>
                                ))}
                            </CostumOption>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="w-full">
                            <p className="text-sm text-red-500 font-medium capitalize">
                                Mata Pelajaran
                            </p>
                            <CostumOption
                                className="w-full"
                                name={"mapel_id"}
                                value={params.mapel_id}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <option value="">pilih mata pelajaran</option>
                                {mapel.map((item, key) => (
                                    <option value={item.id} key={key}>
                                        {item.nama_mapel}
                                    </option>
                                ))}
                            </CostumOption>
                        </div>
                        {role == "admin" && (
                            <div className="w-full">
                                <p className="text-sm text-red-500 font-medium capitalize">
                                    Nama Guru Pengajar
                                </p>
                                <CostumOption
                                    className="w-full"
                                    name={"guru_id"}
                                    value={params.guru_id}
                                    onChange={(e) =>
                                        setParams({
                                            ...params,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">pilih Guru</option>
                                    {guru.map((item, key) => (
                                        <option value={item.id} key={key}>
                                            {item.nama_lengkap}
                                        </option>
                                    ))}
                                </CostumOption>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <div className="w-full">
                            <p className="text-sm text-red-500 font-medium capitalize">
                                Hari Pelajaran
                            </p>
                            <CostumOption
                                className="w-full"
                                name={"hari"}
                                value={params.hari}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <option value="">pilih hari</option>
                                <option value="senin">senin</option>
                                <option value="selasa">selasa</option>
                                <option value="rabu">rabu</option>
                                <option value="kamis">kamis</option>
                                <option value="jumat">jumat</option>
                                <option value="sabtu">sabtu</option>
                            </CostumOption>
                        </div>
                        <div className="w-full">
                            <p className="text-sm text-red-500 font-medium capitalize">
                                Kelas
                            </p>
                            <CostumOption
                                className="w-full"
                                name={"kelas_id"}
                                value={kelas.kelas_id}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <option value="">pilih kelas</option>
                                {kelas.map((item, key) => (
                                    <option value={item.id} key={key}>
                                        {item.nama_kelas}
                                    </option>
                                ))}
                            </CostumOption>
                        </div>
                    </div>
                </div>
            </Modals>
            <Modals
                title={model ? "Edit Data" : "Tambah Data"}
                open={modalForm}
                onClose={onClose}
            >
                <Form model={model} onClose={onClose} />
            </Modals>
            <div className="flex flex-row items-start gap-x-3">
                <div className="my-3 py-2 px-4 bg-white rounded-md drop-shadow-md w-full">
                    <Semester />
                </div>
                <div className="my-3 py-2 px-4 bg-white rounded-md drop-shadow-md w-full">
                    <TahunAjaran />
                </div>
            </div>
            <p className="py-2 px-4 rounded-md bg-gray-200 drop-shadow-md text-sm my-3 w-1/2">
                Silahkan membuat jadwal mengajar
            </p>
            <div className="my-3 py-2 px-4 bg-white rounded-md drop-shadow-md">
                <div className="flex justify-between items-center py-3 px-3 w-full">
                    {role == "admin" && (
                        <button
                            onClick={() => setModalForm(true)}
                            className="flex gap-x-3 py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            <Add />
                            <p>Tambah Jadwal Mengajar</p>
                        </button>
                    )}
                    <div className="flex gap-3 items-center">
                        <input
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            name="search"
                            placeholder="Search Mapel"
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
                            <option value="">show</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="semua">Semua</option>
                        </select>
                        <button
                            onClick={() => setModalFilter(true)}
                            className="flex gap-x-3 py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            <Sort />
                        </button>
                    </div>
                </div>
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
                                Semester
                            </Table.Th>
                            <Table.Th scope="col" className="px-4 py-3">
                                Kelas
                            </Table.Th>
                            <Table.Th scope="col" className="px-4 py-3">
                                Mapel
                            </Table.Th>
                            <Table.Th scope="col" className="px-4 py-3">
                                Guru
                            </Table.Th>
                            <Table.Th scope="col" className="px-4 py-3">
                                Hari
                            </Table.Th>
                            <Table.Th scope="col" className="px-4 py-3">
                                Jam
                            </Table.Th>

                            {role == "admin" && (
                                <Table.Th scope="col" className="px-4 py-3">
                                    Aksi
                                </Table.Th>
                            )}
                        </tr>
                    </Table.Thead>
                    <tbody>
                        {jadwalMengajar.length > 0 ? (
                            jadwalMengajar.map((item, key) => (
                                <tr
                                    key={key}
                                    className="border-b border-red-500/50 odd:bg-red-50"
                                >
                                    <td className="py-3 px-4">{key + 1}</td>

                                    <td className="py-3 px-4 capitalize">
                                        {item.tahun_ajaran.tahun_ajaran}
                                    </td>
                                    <td className="py-3 px-4 capitalize">
                                        {item.semester.semester}
                                    </td>
                                    <td className="py-3 px-4 capitalize">
                                        {item.kelas.nama_kelas}
                                    </td>
                                    <td className="py-3 px-4 capitalize">
                                        {item.mapel.nama_mapel}
                                    </td>
                                    <td className="py-3 px-4 capitalize">
                                        {item.guru.nama_lengkap}
                                    </td>

                                    <td className="py-3 px-4 capitalize">
                                        {item.hari}
                                    </td>
                                    <td className="py-3 px-4 capitalize">
                                        {item.jam_masuk +
                                            " - " +
                                            item.jam_selesai}
                                    </td>
                                    {role == "admin" && (
                                        <td className="py-3 px-4 flex gap-2">
                                            <button
                                                onClick={() =>
                                                    editHandler(item)
                                                }
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

Index.layout = (page) => (
    <Layouts children={page} title={"Kelola Jadwal Mengajar"} />
);
