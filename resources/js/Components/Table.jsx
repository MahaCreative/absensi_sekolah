import React from "react";

function Table({ children, fixed = false, ...props }) {
    return (
        <table
            class={`w-full text-sm text-left text-red-500 dark:text-red-400 rounded-md ${
                fixed && "table-fixed"
            }`}
        >
            {children}
        </table>
    );
}
function Thead({ children }) {
    return (
        <thead class="text-xs text-red-50 uppercase bg-red-500 w-full">
            {children}
        </thead>
    );
}
function Th({ children, className, padding = "px-4 py-3", ...props }) {
    return (
        <th {...props} scope="col" className={`${className} ${padding}`}>
            {children}
        </th>
    );
}
Table.Thead = Thead;
Table.Th = Th;
export default Table;
