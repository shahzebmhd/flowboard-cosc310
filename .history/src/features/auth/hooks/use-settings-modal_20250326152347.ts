import { useQueryState, parseAsBoolean } from "nuqs";
import { useEffect } from "react";

export const useSettingsModal = () => {
    const [isOpen, setIsOpen] = useQueryState(
        "https://github.com/markalex04/flowboard-cosc310/blob/6d570855b6a70ce3d18a216a61280ad30d95f884/src/features/auth/server/route.tsx",
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
    );

    useEffect(() => {
        console.log("Settings Modal isOpen:", isOpen); // Log the state whenever it changes
    }, [isOpen]);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return {
        isOpen, 
        open, 
        close, 
        setIsOpen
    };
};