import { useQueryState, parseAsBoolean } from "nuqs";
import { useEffect } from "react";

export const useAccountSettingsModal = () => {
    const [isOpen, setIsOpen] = useQueryState(
        "?account-settings",
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