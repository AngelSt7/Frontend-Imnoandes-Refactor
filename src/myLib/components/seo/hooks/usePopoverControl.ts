import { useCallback, useState } from "react";

interface UsePopoverControl {
    applySelection: () => void
}

export const usePopoverControl = ({ applySelection } : UsePopoverControl ) => {

    const [open, setOpen] = useState(false);

    return {
        open,
        setOpen
    };
};