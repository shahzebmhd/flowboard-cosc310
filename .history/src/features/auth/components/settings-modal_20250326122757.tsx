import { useSettingsModal } from "../hooks/use-settings-modal";
import { ResponsiveModal } from "@/components/responsive-modal";

export const SettingsModal = () => {
    const { isOpen, setIsOpen, close } = useSettingsModal();
    
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <SettingsFormWrapper onCancel={close} />
        </ResponsiveModal>
    );
};