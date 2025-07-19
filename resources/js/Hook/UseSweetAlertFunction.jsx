import { useCallback } from "react";
import Swal from "sweetalert2";

const useSweetAlertFunction = () => {
    const showFunctionAlert = useCallback(
        (
            title,
            type,
            text,
            confirmButton,
            confirmCallback,
            canecllCallback
        ) => {
            Swal.fire({
                title: title,
                text: text,
                icon: type,
                showCancelButton: true,
                confirmButtonText: confirmButton,
                cancelButtonText: "Batal",
                customClass: {
                    container: "swal2-container",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    confirmCallback(); // Callback untuk eksekusi tindakan
                } else {
                    canecllCallback();
                }
            });
        },
        []
    );

    return showFunctionAlert;
};

export default useSweetAlertFunction;
