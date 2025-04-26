import { Link } from "@inertiajs/react";
import { ArrowForwardIos } from "@mui/icons-material";
import React, { useRef, useState } from "react";

function DropdownLink({ logo, title, active, children, ...props }) {
    const [open, setOpen] = useState(false);
    const openRef = useRef(null);
    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                {...props}
                className={`${
                    open
                        ? "bg-white text-red-500"
                        : " text-white hover:text-red-500 hover:bg-white"
                } py-1  leading-3  w-full px-4 capitalize`}
            >
                <div className="flex flex-row gap-3 justify-between items-center">
                    <div className="flex gap-x-3 items-center">
                        <p className="text-2xl font-bold ">{logo}</p>
                        <p>{title}</p>
                    </div>
                    <p
                        className={`${
                            open ? "rotate-90" : ""
                        } transition-all duration-300 ease-in-out`}
                    >
                        <ArrowForwardIos color="inherit" fontSize="inherit" />
                    </p>
                </div>
                <div
                    className={`${
                        open ? "h-full py-2" : "h-0"
                    } transition-all duration-300 ease-in-out overflow-hidden`}
                >
                    {children}
                </div>
            </button>
        </>
    );
}

function Item({ logo, title, active, ...props }) {
    return (
        <Link
            {...props}
            as="div"
            className={`${
                active
                    ? "bg-red-500 text-white"
                    : "text-red-500 hover:bg-red-500 hover:text-white "
            } py-1 flex flex-row gap-3 items-center leading-3  w-full px-4 my-1`}
        >
            <p className="text-2xl font-bold ">{logo}</p>
            <p>{title}</p>
        </Link>
    );
}

DropdownLink.Item = Item;
export default DropdownLink;
