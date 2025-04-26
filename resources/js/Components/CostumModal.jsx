import { Dialog } from "@headlessui/react";
import { Close } from "@mui/icons-material";
import React from "react";

export default function CostumModal({
    children,
    minWidth = "min-w-[300px]",
    title,
    open,
    onClose,
}) {
    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-950/50 backdrop-blur-sm">
                    <div
                        className={`${minWidth} ${
                            open
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-30"
                        } transition-all duration-300 ease-linear relative bg-white py-2 px-4 rounded-md drop-shadow-md`}
                    >
                        <div className="flex gapx-3 items-center justify-between border-b border-red-700 border-spacing-2 py-2">
                            <p className="capitalize font-medium text-red-600">
                                {title}
                            </p>
                            <button
                                onClick={onClose}
                                className="border border-red-600 py-1.5 px-2 rounded-md drop-shadow-md hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
                            >
                                <Close color="inherit" fontSize="inherit" />
                            </button>
                        </div>
                        <div>{children}</div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
