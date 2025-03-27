import { useQueryState, parseAsBoolean } from "nuqs";
import { useEffect } from "react";

export const useSettingsModal = () => {
    const [isOpen, setIsOpen] = useQueryState(
        "create-workspace",
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