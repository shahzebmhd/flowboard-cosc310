import { useState } from "react";
import { CreateSettingsForm } from "./settings-form";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { useSettingsModal } from "../hooks/use-settings-modal";
import { ResponsiveModal } from "@/components/responsive-modal";

export const SettingsModal = () => {
    const { isOpen, setIsOpen, close } = useSettingsModal();
    
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <settingsFormWrapper onCancel={close} />
        </ResponsiveModal>
    );
};