"use client";

import { useSettingsModal } from "../hooks/use-settings-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { SettingsFormWrapper } from "./settings-form-wrapper";

export const SettingsModal = () => {
    const { isOpen, setIsOpen, close } = useSettingsModal();
    
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <SettingsFormWrapper onCancel={close} />
        </ResponsiveModal>
    );
};