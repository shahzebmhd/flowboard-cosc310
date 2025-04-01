"use client";

import { useAccountSettingsModal } from "../hooks/use-account-settings-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { SettingsForm } from "./settings-form";
import { ResponseType, useSettings } from "../api/use-account-settings";
import { useEffect } from "react";

export const AccountSettingsModal = () => {
    const { isOpen, setIsOpen, close } = useAccountSettingsModal();
    useEffect(() => {
        console.log("Modal visibility status:", isOpen);  // Log isOpen value here
    }, [isOpen]);
    const { data } = useSettings();
    console.log("Settings path has been read.");
    
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <SettingsForm onCancel={close} initialValues={data as ResponseType}/>
        </ResponsiveModal>
    );
};