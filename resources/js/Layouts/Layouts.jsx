import DropdownLink from "@/Components/DropdownLink";
import MenuAdmin from "@/Components/MenuAdmin";
import MenuLink from "@/Components/MenuLink";
import { Head, Link } from "@inertiajs/react";
import {
    AdminPanelSettings,
    Close,
    Dashboard,
    Group,
    Menu,
} from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

export default function Layouts({ children, title }) {
    const [openSidebar, setSidebar] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const sidebarRef = useRef(null);

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
        <div className="relative ">
            <Head title={title} />
            {/* sidebar */}
            <div
                ref={sidebarRef}
                className={`${
                    openSidebar ? "w-[90%] md:w-[40%] lg:w-[25%]" : "w-0"
                } absolute top-0  h-screen bg-gradient-to-br z-[50] from-red-600 via-red-700 to-red-900 overflow-hidden transition-all duration-300 ease-in-out`}
            >
                <div
                    className={`${
                        openSidebar ? "flex" : "hidden"
                    }  flex-row justify-between items-center py-2 px-4 border-b border-white`}
                >
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
                <div className={`${openSidebar ? "" : "hidden"}`}>
                    <MenuLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                        title={"Dashboard"}
                        logo={<Dashboard color="inherit" fontSize="inherit" />}
                    />
                    <MenuAdmin />
                </div>
            </div>

            <div className="flex justify-between items-center border-b border-red-500 ">
                <p className="text-red-600 font-bold tracking-tighter text-2xl px-4">
                    {title}
                </p>
                <div className="flex flex-row gap-x-3 items-center px-4">
                    {/* profile user */}
                    <div
                        onClick={() => setOpenProfile(!openProfile)}
                        className={`flex gap-4 py-2 px-3 hover:cursor-pointer border-x border-red-700/50 items-center  ${
                            openProfile
                                ? "bg-red-500 text-white"
                                : "hover:bg-red-500  hover:text-white text-red-500"
                        }`}
                    >
                        <img
                            src={"/storage/Image/default_profile.webp"}
                            className="w-10 h-10 rounded-full "
                            alt=""
                        />
                        <div>
                            <p className="capitalize font-semibold">
                                Nama pengguna
                            </p>
                            <p className="capitalize tracking-tighter text-sm font-light">
                                role pengguna
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${
                            openProfile ? "opacity-100 h-20" : "opacity-0  h-0"
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
                        
                    </div>
                    {/* end profile user */}
                    <button
                        onClick={() => setSidebar(!openSidebar)}
                        className="py-2 px-2 rounded-md text-4xl hover:bg-red-500 hover:text-white duration-300 ease-in-out transition-all text-xl tracking-tighter leading-3 text-red-500"
                    >
                        <Menu color="inherit" fontSize="inherit" />
                    </button>
                </div>
            </div>
            {children}
        </div>
    );
}
