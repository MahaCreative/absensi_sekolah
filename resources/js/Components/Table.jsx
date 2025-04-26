import React from "react";

function Table({ children, ...props }) {
    return (
        <table class="w-full text-sm text-left text-red-500 dark:text-red-400 rounded-md">
            {children}
        </table>
    );
}
function Thead({ children }) {
    return (
        <thead class="text-xs text-red-50 uppercase bg-red-500 ">
            {children}
        </thead>
    );
}
function Th({ children }) {
    return (
        <th scope="col" class="px-4 py-3">
            {children}
        </th>
    );
}
Table.Thead = Thead;
Table.Th = Th;
export default Table;
