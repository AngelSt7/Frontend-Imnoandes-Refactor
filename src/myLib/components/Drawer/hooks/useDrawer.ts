import { useEffect } from "react";

interface UseDrawerProps {
    onChangeDrawer: () => void
    statusDrawer: boolean
}
export const useDrawer = ({ onChangeDrawer, statusDrawer }: UseDrawerProps) => {
    const handleOverlayClick = () => {
        onChangeDrawer();
    };

    const handleDrawerContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (statusDrawer) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [statusDrawer]);

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.25, ease: "easeIn" },
        },
    } as const;

    const drawerVariants = {
        hidden: { x: "100%" },
        visible: {
            x: 0,
            transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        },
        exit: {
            x: "100%",
            transition: { duration: 0.3, ease: [0.55, 0.06, 0.68, 0.19] },
        },
    } as const;

    return {
        handleOverlayClick,
        handleDrawerContentClick,
        overlayVariants,
        drawerVariants
    }
}