import {
    AdminPanelSettings,
    Attachment,
    ClassOutlined,
    Face,
    Face2,
    Face3TwoTone,
    Group,
    ListAlt,
    Report,
    Timelapse,
} from "@mui/icons-material";
import React from "react";
import DropdownLink from "./DropdownLink";
import MenuLink from "./MenuLink";
import { usePage } from "@inertiajs/react";

export default function MenuAdmin() {
    const { auth } = usePage().props;
    const role = auth.user.role;

    return (
        <>
            <p className="border-b border-white p-1 text-white my-3 px-4">
                Menu Master Data
            </p>
            {role == "admin" && (
                <>
                    <MenuLink
                        href={route("admin.kelola-admin")}
                        active={route().current("admin.kelola-admin")}
                        title={"Kelola Admin"}
                        logo={
                            <AdminPanelSettings
                                color="inherit"
                                fontSize="inherit"
                            />
                        }
                    />
                    <MenuLink
                        href={route("admin.kelola-guru")}
                        active={route().current("admin.kelola-guru")}
                        title={"Kelola Guru"}
                        logo={
                            <Face3TwoTone color="inherit" fontSize="inherit" />
                        }
                    />

                    <MenuLink
                        href={route("admin.kelola-kelas")}
                        active={route().current("admin.kelola-kelas")}
                        title={"Kelola Data Kelas"}
                        logo={
                            <ClassOutlined color="inherit" fontSize="inherit" />
                        }
                    />
                    <MenuLink
                        href={route("admin.kelola-mapel")}
                        active={route().current("admin.kelola-mapel")}
                        title={"Kelola Mata Pelajaran"}
                        logo={<ListAlt color="inherit" fontSize="inherit" />}
                    />
                </>
            )}
            <MenuLink
                href={route("admin.kelola-jadwal-mengajar")}
                active={route().current("admin.kelola-jadwal-mengajar")}
                title={"Kelola Jadwal Mengajar"}
                logo={<Timelapse color="inherit" fontSize="inherit" />}
            />
            <MenuLink
                href={route("admin.kelola-siswa")}
                active={route().current("admin.kelola-siswa")}
                title={"Kelola Siswa"}
                logo={<Face color="inherit" fontSize="inherit" />}
            />

            {role == "guru" && (
                <>
                    <MenuLink
                        href={route("guru.management-presensi")}
                        active={route().current("guru.management-presensi")}
                        title={"Managemen Presensi"}
                        logo={<Attachment color="inherit" fontSize="inherit" />}
                    />
                    <MenuLink
                        href={route("guru.rekap-absensi")}
                        active={route().current("guru.rekap-absensi")}
                        title={"Rekap Absensi"}
                        logo={<Report color="inherit" fontSize="inherit" />}
                    />
                </>
            )}
        </>
    );
}
