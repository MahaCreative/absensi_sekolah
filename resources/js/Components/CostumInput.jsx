import React from "react";

export default function CostumInput({ className, errors, ...props }) {
    return (
        <>
            <input
                {...props}
                className={`${className} disabled:bg-red-100 text-red-500 rounded-md border border-red-200 outline-red-200 focus:border-red-400 focus:outline-red-400 focus:ring-0`}
            />
            {errors && (
                <p className="py-1.5 text-red-500 italic text-sm">*{errors}</p>
            )}
        </>
    );
}
