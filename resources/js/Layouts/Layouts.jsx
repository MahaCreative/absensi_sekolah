import DropdownLink from "@/Components/DropdownLink";
import MenuAdmin from "@/Components/MenuAdmin";
import MenuLink from "@/Components/MenuLink";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    AdminPanelSettings,
    Close,
    Dashboard,
    Group,
    Logout,
    Menu,
} from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

export default function Layouts({ children, title }) {
    const [openSidebar, setSidebar] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const sidebarRef = useRef(null);
    const { auth } = usePage().props;

    useEffect(() => {
        let handler = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setSidebar(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    return (
        <div className="flex  items-start max-h-screen overflow-y-auto">
            <Head title={title} />
            {/* sidebar */}
            <div
                ref={sidebarRef}
                className={`${
                    openSidebar ? "w-[90%] md:w-[50%] lg:w-[30%]" : "w-0"
                }  fixed h-screen  bg-gradient-to-br z-[999] from-red-600 via-red-700 to-red-900 overflow-hidden transition-all duration-300 ease-in-out `}
            >
                <div className="flex justify-between items-center px-8">
                    <h1 className="font-bold text-white tracking-tighter text-xl">
                        SDN SIMBUANG 2
                    </h1>
                    <button
                        onClick={() => setSidebar(false)}
                        className="py-2 px-2 rounded-md hover:bg-white hover:text-red-500 duration-300 ease-in-out transition-all text-xl tracking-tighter leading-3 text-white"
                    >
                        <Close color="inherit" fontSize="inherit" />
                    </button>
                </div>
                <div
                    className={`${
                        openSidebar ? "flex" : "hidden"
                    }  flex-row justify-between items-center  border-b border-white`}
                >
                    <div
                        onClick={() => setOpenProfile(!openProfile)}
                        className={` w-full flex gap-4 py-2 px-3  border-x bg-white items-center  ${
                            openProfile
                                ? "bg-red-500 text-white"
                                : " text-red-500"
                        }`}
                    >
                        <img
                            src={"/storage/" + auth.profile.image}
                            className="w-10 h-10 rounded-full "
                            alt=""
                        />
                        <div>
                            <p className="capitalize font-semibold">
                                {auth.profile.nama_lengkap}
                            </p>
                            <p className="capitalize tracking-tighter text-sm font-light">
                                {auth.user.role}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <MenuLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                        title={"Dashboard"}
                        logo={<Dashboard color="inherit" fontSize="inherit" />}
                    />
                    <MenuAdmin />
                </div>
            </div>

            <div className="w-full">
                <div className="flex justify-between items-center border-b border-red-500 ">
                    <div className="flex gap-x-3 px-4 py-4">
                        <button
                            onClick={() => setSidebar(!openSidebar)}
                            className="py-2 px-2 rounded-md text-4xl hover:bg-red-500 hover:text-white duration-300 ease-in-out transition-all text-xl tracking-tighter leading-3 text-red-500"
                        >
                            <Menu color="inherit" fontSize="inherit" />
                        </button>
                        <p className="text-red-600 font-bold tracking-tighter text-2xl px-4">
                            {title}
                        </p>
                    </div>
                    <div className="flex flex-row gap-x-3 items-center px-4">
                        {/* profile user */}
                        <Link
                            href={route("logout")}
                            className="flex gap-x-2 items-center hover:cursor-pointer hover:bg-red-500 hover:text-white hover:py-2 hover:px-3 rounded-md"
                        >
                            <span className="text-sm">
                                <Logout color="inherit" fontSize="inherit" />
                            </span>
                            <span>Logout</span>
                        </Link>
                        {/* <div
                            className={`${
                                openProfile
                                    ? "opacity-100 h-20"
                                    : "opacity-0  h-0"
                            } transition-all duration-300 ease-in-out absolute top-20 w-[200px] overflow-y-hidden right-10  bg-white drop-shadow-md border border-red-500/50 rounded-md`}
                        >
                            <Link
                                as="div"
                                className="tracking-tighter border-b border-red-500/50 py-2 px-4 rounded-b-md hover:cursor-pointer hover:bg-red-500 hover:text-white"
                            >
                                Logout
                            </Link>
                            <Link
                                as="div"
                                className="tracking-tighter py-2 px-4 rounded-b-md hover:cursor-pointer hover:bg-red-500 hover:text-white"
                            >
                                Profile Saya
                            </Link>
                        </div> */}
                        {/* end profile user */}
                    </div>
                </div>
                <div className="min-h-[600px] overflow-y-auto relative ">
                    <div className="bg-red-600 h-[550px]">
                        <div className="px-8 py-3 ">
                            <h1 className="text-white text-4xl tracking-tighter font-semibold">
                                Management {title}
                            </h1>
                            <p className="text-white tracking-tighter text-xl font-light">
                                Selamat datang pada sistem informasi absensi
                                siswa SD Negeri Simbuang 2
                            </p>
                        </div>
                        <div className="absolute top-20 w-full">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
