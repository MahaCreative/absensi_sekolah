import CostumOption from "@/Components/CostumOption";
import Table from "@/Components/Table";
import useSweetAlertNotification from "@/Hook/useSweetAlertNotification";
import Layouts from "@/Layouts/Layouts";
import { router, usePage } from "@inertiajs/react";
import { data } from "autoprefixer";
import { debounce, pickBy } from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import Modals from "@/Components/CostumModal";
import Maps from "@/Components/Maps";
import useSweetAlertFunction from "@/Hook/UseSweetAlertFunction";
import axios from "axios";
export default function Index(props) {
    const showAlert = useSweetAlertNotification();
    const showAlertFunction = useSweetAlertFunction();
    const mapel = props.mapel;
    const kelas = props.kelas;
    const message = props.message;
    const totalPertemuan = props.totalPertemuan;
    const getJadwalId = props.getJadwalId;
    const absen = props.absen;
    const { semester, tahun_ajaran } = usePage().props;
    console.log(mapel);
    const [params, setParams] = useState({
        search: "",
        semester: "aktif",
        tahun_ajaran: "aktif",
        kelas: "",
        mapel: mapel.length > 0 ? mapel[0].id : "",
        pertemuan: totalPertemuan
            ? totalPertemuan[totalPertemuan.length - 1]
            : 1,
    });
    const [model, setModel] = useState(null);
    const [modalEdit, setModalEdit] = useState(false);

    const selectedMapel = mapel.find((item) => item.id == params.mapel);

    const reload = useCallback(
        debounce((query) => {
            router.get(
                route("guru.management-presensi"),
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
    useEffect(() => {
        if (message) {
            console.log(message);

            showAlert(message.type, message.type, message.message);
        }
    }, [message]);

    const closeModalEdit = () => {
        setModel(null);
        setModalEdit(false);
    };
    const editHandler = (id, status_kehadiran) => {
        showAlertFunction(
            "Edit Data?",
            "warning",
            "anda yakin ingin memperbaharui kehadiran siswa ini?",
            "Ya, Yakin!",
            async () => {
                try {
                    const response = await axios.post(
                        route("guru.update-kehadiran-management-presensi", {
                            id: id,
                            status_kehadiran: status_kehadiran,
                        })
                    );
                    showAlert(
                        response.data.type,
                        response.data.type,
                        response.data.message
                    );
                } catch (err) {
                    showAlert(
                        err.response.data.type,
                        err.response.data.type,
                        err.response.data.message
                    );
                }
            }
        );
    };
    const editStatusTerlambat = (id, status_terlambat) => {
        showAlertFunction(
            "Edit Data?",
            "warning",
            "anda yakin ingin memperbaharui kehadiran siswa ini?",
            "Ya, Yakin!",
            async () => {
                try {
                    const response = await axios.post(
                        route("guru.update-terlambat-management-presensi", {
                            id: id,
                            status_terlambat: status_terlambat,
                        })
                    );
                    showAlert(
                        response.data.type,
                        response.data.type,
                        response.data.message
                    );
                } catch (err) {
                    showAlert(
                        err.response.data.type,
                        err.response.data.type,
                        err.response.data.message
                    );
                }
            }
        );
    };
    const prosesAbsensi = () => {
        showAlertFunction(
            "Proses Absensi",
            "warning",
            "Proses Presensi dilakukan saat jam pelajaran telah selesai, agar sistem secara otomatis mengisi absen siswa yang belum absen.",
            "Pelajaran Selesai",
            () => {
                router.post(
                    route("guru.proses-management-presensi"),
                    {
                        pertemuan: params.pertemuan,
                        ...getJadwalId,
                    },
                    {
                        onSuccess: () => {
                            showAlert(
                                "success",
                                "Sukses",
                                "Proses absensi berhasil dibuat, seluruh siswa yang belum melakukan absen telah di Alpha kan"
                            );
                        },
                        onError: (err) => {
                            showAlert(
                                "error",
                                "Gagal",
                                "Proses absensi gagal dilakukan"
                            );
                        },
                    }
                );
            }
        );
    };
    const lihatAbsen = (value) => {
        setModel(value);
        setModalEdit(true);
    };

    return (
        <div className="py-6 px-8">
            <Modals
                open={modalEdit}
                onClose={closeModalEdit}
                title={"Data Absens " + model?.nama_lengkap}
            >
                <div className="flex flex-row gap-x-3 items-start my-3 py-3">
                    <img
                        src={"/storage/" + model?.image}
                        alt={model?.nama_lengkap}
                        className="w-36 h-3w-36 rounded-md p-2 drop-shadow bg-white"
                    />
                    <div className="rounded-md p-2 drop-shadow bg-white">
                        <h1 className="text-red-600 font-bold">
                            Profile Siswa
                        </h1>
                        <div className="flex gap-x-3 items-center">
                            <p className="w-[150px]">Nama Lengkap </p>
                            <p>:</p>
                            <p>{model?.nama_lengkap}</p>
                        </div>
                        <div className="flex gap-x-3 items-center">
                            <p className="w-[150px]">NIS </p>
                            <p>:</p>
                            <p>{model?.nis}</p>
                        </div>
                        <div className="flex gap-x-3 items-center">
                            <p className="w-[150px]">Kelas </p>
                            <p>:</p>
                            <p>{model?.kelas}</p>
                        </div>
                        <div className="flex gap-x-3 items-center">
                            <p className="w-[150px]">Tanggal, Jam Absen </p>
                            <p>:</p>
                            <p>
                                {model?.tanggal_absen + "," + model?.jam_absen}
                            </p>
                        </div>
                        <div className="flex gap-x-3 items-center capitalize">
                            <p className="w-[150px]">Status Kehadiran</p>
                            <p>:</p>
                            <p>{model?.status_kehadiran}</p>
                        </div>
                        <div className="flex gap-x-3 items-center capitalize">
                            <p className="w-[150px]">Status Terlambat</p>
                            <p>:</p>
                            <p>{model?.status_terlambat}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-x-3 items-start my-3 py-3 drop-shadow-sm bg-white rounded-md">
                    <h1 className="font-bold text-red-600">
                        Foto dan Lokasi Absen {model?.id}
                    </h1>
                    <div className="flex items-start gap-x-3 w-full">
                        <img
                            src={"/storage/" + model?.gambar}
                            alt=""
                            className="w-[200px] h-[250px]"
                        />
                        <div className="w-full">
                            <Maps />
                        </div>
                    </div>
                </div>
            </Modals>
            <div className="bg-gray-800 p-2 rounded-md text-white text-sm tracking-tighter my-3">
                <ol>
                    <li>1. Pilih Semester</li>
                </ol>
            </div>
            <div className="bg-white py-3 px-4 rounded-md flex gap-3">
                <CostumOption
                    value={params.semester}
                    onChange={(e) =>
                        setParams({ ...params, semester: e.target.value })
                    }
                >
                    <option value="">Pilih Semester</option>
                    <option value="aktif">Semester Aktif</option>
                    {semester.map((item, key) => (
                        <option key={key} value={item.id}>
                            {item.semester}
                        </option>
                    ))}
                </CostumOption>
                <CostumOption
                    value={params.tahun_ajaran}
                    onChange={(e) =>
                        setParams({ ...params, tahun_ajaran: e.target.value })
                    }
                >
                    <option value="">Pilih Tahun Ajaran</option>
                    <option value="aktif">Tahun Ajaran Aktif</option>
                    {tahun_ajaran.map((item, key) => (
                        <option key={key} value={item.id}>
                            {item.tahun_ajaran}
                        </option>
                    ))}
                </CostumOption>

                {kelas && (
                    <CostumOption
                        value={params.kelas}
                        onChange={(e) =>
                            setParams({ ...params, kelas: e.target.value })
                        }
                    >
                        <option value="">Pilih Kelas</option>

                        {kelas.map((item, key) => (
                            <option key={key} value={item.id}>
                                {item.nama_kelas}
                            </option>
                        ))}
                    </CostumOption>
                )}

                {mapel && (
                    <CostumOption
                        value={params.mapel}
                        onChange={(e) =>
                            setParams({ ...params, mapel: e.target.value })
                        }
                    >
                        <option value="">Pilih Mapel</option>
                        {mapel.map((item, key) => (
                            <option key={key} value={item.id}>
                                {item.nama_mapel}
                            </option>
                        ))}
                    </CostumOption>
                )}
            </div>
            <div className="bg-white py-3 px-4 rounded-md  my-4 w-1/2 drop-shadow-md">
                <div className="flex py-1.5 flex-row gap-x-4 border-b border-red-600 items-center w-full">
                    <div className="flex gap-x-3">
                        <p className="w-[150px]">Kode Mapel</p>
                        <p>:</p>
                    </div>
                    <p>
                        {selectedMapel && (
                            <p className="uppercase">
                                {selectedMapel.kd_mapel}
                            </p>
                        )}
                    </p>
                </div>
                <div className="flex py-1.5 flex-row gap-x-4 border-b border-red-600 items-center w-full">
                    <div className="flex gap-x-3">
                        <p className="w-[150px]">Nama Mapel</p>
                        <p>:</p>
                    </div>
                    <p>
                        {selectedMapel && (
                            <p className="uppercase">
                                {selectedMapel.nama_mapel}
                            </p>
                        )}
                    </p>
                </div>
                <div className="flex py-1.5 flex-row gap-x-4 border-b border-red-600 items-center w-full">
                    <div className="flex gap-x-3">
                        <p className="w-[150px]">Hari, Masuk - Selesai</p>
                        <p>:</p>
                    </div>
                    <p>
                        {getJadwalId ? (
                            <p className="uppercase">
                                {getJadwalId.hari +
                                    ", " +
                                    getJadwalId.jam_masuk +
                                    " - " +
                                    getJadwalId.jam_selesai}
                            </p>
                        ) : (
                            <p className="uppercase text-xs text-red-500">
                                Jadwal Untuk Mapel dan Kelas Ini belum dibuat
                            </p>
                        )}
                    </p>
                </div>
                <div className="flex py-1.5 flex-row gap-x-4 border-b border-red-600 items-center w-full">
                    <div className="flex gap-x-3">
                        <p className="w-[150px]">Pilih Pertemuan</p>
                        <p>:</p>
                    </div>
                    <p>
                        <CostumOption
                            name="pertemuan"
                            value={params.pertemuan}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    pertemuan: e.target.value,
                                })
                            }
                        >
                            <option value="" disabled>
                                Pilih Pertemuan
                            </option>
                            {totalPertemuan &&
                                totalPertemuan.map((item, key) => (
                                    <option key={key} value={item}>
                                        Pertemuan {item}
                                    </option>
                                ))}
                        </CostumOption>
                    </p>
                </div>
            </div>

            <div className="my-3 py-2 px-4 bg-white rounded-md drop-shadow-md overflow-x-auto w-full">
                <div className="flex justify-between items-center py-3 px-3 w-full">
                    <input
                        onChange={(e) =>
                            setParams({
                                ...params,
                                [e.target.name]: e.target.value,
                            })
                        }
                        name="search"
                        placeholder="Cari Siswa"
                        className="disabled:bg-red-100 text-red-500 rounded-md border border-red-200 outline-red-200 focus:border-red-400 focus:outline-red-400 focus:ring-0"
                    />
                    <button
                        onClick={prosesAbsensi}
                        className="bg-blue-500 py-2 px-3 rounded-md text-white tracking-tighter"
                    >
                        Proses Managemen Absensi
                    </button>
                </div>
                <Table>
                    <Table.Thead>
                        <Table.Th className={""}>#</Table.Th>
                        <Table.Th className={""}>NIS</Table.Th>
                        <Table.Th className={""}>Nama Siswa</Table.Th>
                        <Table.Th className={""}>Tanggal Absen</Table.Th>
                        <Table.Th className={""}>Jam Absen</Table.Th>
                        <Table.Th className={""}>Status</Table.Th>
                        <Table.Th className={""}>Foto</Table.Th>
                        <Table.Th className={""}>Aksi</Table.Th>
                    </Table.Thead>
                    <tbody>
                        {absen ? (
                            absen.map((item, key) => (
                                <tr
                                    key={key}
                                    className="border-b border-red-500 odd:bg-red-100"
                                >
                                    <td>{key + 1}</td>
                                    <td>{item.nis}</td>
                                    <td className="capitalize  px-3">
                                        {item.nama_lengkap}
                                    </td>
                                    <td className="capitalize  px-3">
                                        {moment(item.created_at).format(
                                            "D-M-Y"
                                        )}
                                    </td>
                                    <td className="capitalize  px-3">
                                        {item.jam_absen}
                                    </td>
                                    <td className="capitalize  px-3">
                                        {item.status_kehadiran +
                                            ` ( ${item.status_terlambat} )`}
                                    </td>
                                    <td className="capitalize p-1 px-3 w-[270px]">
                                        <button
                                            onClick={() => lihatAbsen(item)}
                                            className="w-full bg-blue-500 py-1 px-2 rounded-md tracking-tight text-xs text-white"
                                        >
                                            Lihat Absen
                                        </button>
                                        <div className="flex gap-3 w-full mt-1">
                                            <div className="w-full">
                                                <CostumOption
                                                    onChange={(e) =>
                                                        editHandler(
                                                            item.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className={"w-full"}
                                                >
                                                    <option
                                                        value={
                                                            item.status_kehadiran
                                                        }
                                                    >
                                                        {item.status_kehadiran}
                                                    </option>
                                                    {item.status_kehadiran !==
                                                        "hadir" && (
                                                        <option value={"hadir"}>
                                                            Hadir
                                                        </option>
                                                    )}
                                                    {item.status_kehadiran !==
                                                        "alpha" && (
                                                        <option value={"alpha"}>
                                                            alpha
                                                        </option>
                                                    )}
                                                    {item.status_kehadiran !==
                                                        "izin" && (
                                                        <option value={"izin"}>
                                                            izin
                                                        </option>
                                                    )}
                                                    {item.status_kehadiran !==
                                                        "sakit" && (
                                                        <option value={"sakit"}>
                                                            sakit
                                                        </option>
                                                    )}
                                                </CostumOption>
                                            </div>
                                            <div className="w-full">
                                                <CostumOption
                                                    onChange={(e) =>
                                                        editStatusTerlambat(
                                                            item.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className={"w-full"}
                                                >
                                                    <option value={""}>
                                                        Pilih Status Terlambat
                                                    </option>
                                                    <option
                                                        value={
                                                            item.status_terlambat
                                                        }
                                                    >
                                                        {item.status_terlambat}
                                                    </option>
                                                    {item.status_terlambat !==
                                                        "ontime" && (
                                                        <option
                                                            value={"ontime"}
                                                        >
                                                            ontime
                                                        </option>
                                                    )}

                                                    {item.status_terlambat !==
                                                        "terlambat" && (
                                                        <option
                                                            value={"terlambat"}
                                                        >
                                                            terlambat
                                                        </option>
                                                    )}
                                                </CostumOption>
                                            </div>
                                        </div>
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

Index.layout = (page) => (
    <Layouts children={page} title={"Management Presensi"} />
);
