import { useQueryState, parseAsBoolean } from "nuqs";
import { useEffect } from "react";

export const useCreateProjectModal = () => {
    const [isOpen, setIsOpen] = useQueryState (
        "create-project",
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
    );
    useEffect(() => {
        console.log("Modal visibility status:", isOpen);  // Log isOpen value here
    }, [isOpen]);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return {
        isOpen,
        open,
        close,
        setIsOpen,
    };
};