import {
    AdminPanelSettings,
    Face,
    Face2,
    Face3TwoTone,
    Group,
} from "@mui/icons-material";
import React from "react";
import DropdownLink from "./DropdownLink";
import MenuLink from "./MenuLink";

export default function MenuAdmin() {
    return (
        <>
            <MenuLink
                href={route("admin.kelola-admin")}
                active={route().current("admin.kelola-admin")}
                title={"Kelola Admin"}
                logo={<AdminPanelSettings color="inherit" fontSize="inherit" />}
            />
            <MenuLink
                href={route("admin.kelola-guru")}
                active={route().current("admin.kelola-guru")}
                title={"Kelola Guru"}
                logo={<Face3TwoTone color="inherit" fontSize="inherit" />}
            />

            <MenuLink
                href={route("admin.kelola-siswa")}
                active={route().current("admin.kelola-siswa")}
                title={"Kelola Siswa"}
                logo={<Face color="inherit" fontSize="inherit" />}
            />
            <MenuLink
                href={route("admin.kelola-tahun-ajaran")}
                active={route().current("admin.kelola-tahun-ajaran")}
                title={"Kelola Jadwal Mengajar"}
                logo={<Face color="inherit" fontSize="inherit" />}
            />
        </>
    );
}
