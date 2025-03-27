"use client";

import { useSettingsModal } from "../hooks/use-settings-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { SettingsForm } from "./settings-form";
import { ResponseType, useSettings } from "../api/use-settings";

export const SettingsModal = () => {
    const { isOpen, setIsOpen, close } = useSettingsModal();
    const { data, isPending } = useSettings();
    console.log("Settings path has been read.");

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <SettingsForm onCancel={close} initialValues={data as ResponseType}/>
        </ResponsiveModal>
    );
};