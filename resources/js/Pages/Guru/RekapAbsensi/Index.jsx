import CostumOption from "@/Components/CostumOption";
import Table from "@/Components/Table";
import useSweetAlertNotification from "@/Hook/useSweetAlertNotification";
import Layouts from "@/Layouts/Layouts";
import { router } from "@inertiajs/react";
import { debounce, pickBy } from "lodash";
import React, { useCallback, useEffect, useState } from "react";

export default function Index(props) {
    const showAlert = useSweetAlertNotification();
    const mapel = props.mapel;
    const kelas = props.kelas;
    const semester = props.semester;
    const tahun_ajaran = props.tahun_ajaran;
    const message = props.message;
    const rekap = props.rekap;
    const getJadwalId = props.getJadwalId;
    const [dataRekap, setDataRekap] = useState([]);
    const [params, setParams] = useState({
        search: "",
        semester: "aktif",
        tahun_ajaran: "aktif",
        kelas: kelas.length > 0 ? kelas[0].id : "",
        mapel: mapel.length > 0 ? mapel[0].id : "",
    });

    const selectedMapel = mapel.find((item) => item.id == params.mapel);
    const selectedKelas = kelas.find((item) => item.id == params.kelas);
    const chunkSize = 30;
    const [jumlahTabel, setJumlahTabel] = useState(0);

    useEffect(() => {
        const dataBerurut = Object.keys(rekap).map((key, index) => ({
            id: index,
            ...rekap[key],
        }));
        setDataRekap(dataBerurut);
        if (dataRekap.length > 0) {
            const jumlahTabel = Math.ceil(
                dataRekap[0].absens.length / chunkSize
            );
            setJumlahTabel(jumlahTabel);
        }
    }, [rekap]);
    // search
    const reload = useCallback(
        debounce((query) => {
            router.get(route("guru.rekap-absensi"), pickBy({ ...query }), {
                preserveScroll: true,
                preserveState: true,
            });
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
    console.log(jumlahTabel);

    // end search
    return (
        <div className="py-6 px-8">
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
                    <option value="" selected disabled>
                        Pilih Tahun Ajaran
                    </option>
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
                        <option value="" disabled selected>
                            Pilih Kelas
                        </option>

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
                        <option value="" selected disabled>
                            Pilih Mapel
                        </option>
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
                        <p className="w-[150px]">Kelas</p>
                        <p>:</p>
                    </div>
                    <p>
                        {selectedKelas && (
                            <p className="uppercase">
                                {selectedKelas.nama_kelas}
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
            </div>
            {dataRekap.length > 0 && (
                <>
                    {Array.from({ length: jumlahTabel }, (_, index) => (
                        <div
                            key={index}
                            className="my-3 py-2 px-4 bg-white rounded-md drop-shadow-md overflow-x-auto w-full"
                        >
                            <Table fixed={true}>
                                <Table.Thead>
                                    <tr>
                                        <Table.Th
                                            padding="p-1 "
                                            rowspan={2}
                                            className={
                                                "border border-red-100 text-center w-[40px]"
                                            }
                                        >
                                            No
                                        </Table.Th>
                                        <Table.Th
                                            rowspan={2}
                                            className={
                                                "border border-red-100 text-center w-[200px]"
                                            }
                                        >
                                            Nama
                                        </Table.Th>
                                        <Table.Th
                                            colspan={chunkSize}
                                            className={
                                                "border border-red-100 text-center"
                                            }
                                        >
                                            Pertemuan
                                        </Table.Th>
                                        <Table.Th
                                            colspan={4}
                                            className={
                                                "text-center border border-red-100"
                                            }
                                        >
                                            Total
                                        </Table.Th>
                                    </tr>
                                    <tr>
                                        {Array.from(
                                            { length: chunkSize },
                                            (_, i) => (
                                                <Table.Th
                                                    padding="p-0"
                                                    key={i}
                                                    className={
                                                        "border border-red-100 w-[100px] text-center"
                                                    }
                                                >
                                                    {index * chunkSize + i + 1}
                                                </Table.Th>
                                            )
                                        )}
                                        <Table.Th
                                            padding="p-0"
                                            className={
                                                "border border-red-100 text-center"
                                            }
                                        >
                                            H
                                        </Table.Th>
                                        <Table.Th
                                            padding="p-0"
                                            className={
                                                "border border-red-100 text-center"
                                            }
                                        >
                                            S
                                        </Table.Th>
                                        <Table.Th
                                            padding="p-0"
                                            className={
                                                "border border-red-100 text-center"
                                            }
                                        >
                                            I
                                        </Table.Th>
                                        <Table.Th
                                            padding="p-0"
                                            className={
                                                "border border-red-100 text-center"
                                            }
                                        >
                                            A
                                        </Table.Th>
                                    </tr>
                                </Table.Thead>
                                <tbody>
                                    {dataRekap.map((item, key) => (
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td className="w-[200px] border border-red-100">
                                                {item.nama}
                                            </td>
                                            {item.absens
                                                .slice(
                                                    index * chunkSize,
                                                    (index + 1) * chunkSize
                                                )
                                                .map((data, i) => (
                                                    <td
                                                        className={`text-center border border-red-100 capitalize
                                                            ${
                                                                data == "h"
                                                                    ? "text-green-500"
                                                                    : data ==
                                                                      "s"
                                                                    ? "text-orange-500"
                                                                    : data ==
                                                                      "i"
                                                                    ? "text-blue-500"
                                                                    : "text-red-500"
                                                            }
                                                            `}
                                                        key={i}
                                                    >
                                                        {data}
                                                    </td>
                                                ))}
                                            <td className="text-center border border-red-100">
                                                {
                                                    item.absens.filter(
                                                        (data) => data === "h"
                                                    ).length
                                                }
                                            </td>
                                            <td className="text-center border border-red-100">
                                                {
                                                    item.absens.filter(
                                                        (data) => data === "s"
                                                    ).length
                                                }
                                            </td>
                                            <td className="text-center border border-red-100">
                                                {
                                                    item.absens.filter(
                                                        (data) => data === "i"
                                                    ).length
                                                }
                                            </td>
                                            <td className="text-center border border-red-100">
                                                {
                                                    item.absens.filter(
                                                        (data) => data === "a"
                                                    ).length
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

Index.layout = (page) => <Layouts children={page} title={"Rekap Absensi"} />;
