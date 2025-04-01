"use client";

import { useAccountSettingsModal } from "../hooks/use-account-settings-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { SettingsForm } from "./settings-form";
import { ResponseType, useSettings } from "../api/use-settings";

export const SettingsModal = () => {
    const { isOpen, setIsOpen, close } = useAccountSettingsModal();
    const { data } = useSettings();
    console.log("Settings path has been read.");

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <SettingsForm onCancel={close} initialValues={data as ResponseType}/>
        </ResponsiveModal>
    );
};