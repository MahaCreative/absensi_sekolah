import React from "react";

export default function CostumOption({
    children,
    className,
    errors,
    ...props
}) {
    return (
        <>
            <select
                {...props}
                className={`${className} disabled:bg-red-100 text-red-500 rounded-md border border-red-200 outline-red-200 focus:border-red-400 focus:outline-red-400 focus:ring-0`}
            >
                {children}
            </select>
            {errors && (
                <p className="py-1.5 text-red-500 italic text-sm">*{errors}</p>
            )}
        </>
    );
}
