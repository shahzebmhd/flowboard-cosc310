"use client";

import { useAccountSettingsModal } from "../hooks/use-account-settings-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { AccountSettingsForm } from "./account-settings-form";
import { ResponseType, useAccountSettings } from "../api/use-account-settings";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export const AccountSettingsModal = () => {
    const { isOpen, setIsOpen, close } = useAccountSettingsModal();
    const { data } = useAccountSettings();
    
    return (
        <div>
            <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
                <AccountSettingsForm onCancel={close}/>
            </ResponsiveModal>
        </div>
    );
};