import { Link } from "@inertiajs/react";
import React from "react";

export default function MenuLink({ logo, active, title, ...props }) {
    return (
        <>
            <Link
                {...props}
                as="button"
                className={`${
                    active
                        ? "bg-white text-red-500"
                        : " text-white hover:text-red-500 hover:bg-white"
                } py-1 flex flex-row gap-3 items-center leading-3  w-full px-4`}
            >
                <p className="text-2xl font-bold ">{logo}</p>
                <p>{title}</p>
            </Link>
        </>
    );
}
