import { useQueryState, parseAsBoolean } from "nuqs";

export const useSettingsModal = () => {
    const [isOpen, setIsOpen] = useQueryState(
        "/settings",
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
    );

    console.log("This does jack shit rn");

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return {
        isOpen, 
        open, 
        close, 
        setIsOpen
    };
};