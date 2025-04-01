"use client";

import { useAccountSettingsModal } from "../hooks/use-account-settings-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { AccountSettingsForm } from "./account-settings-form";
import { useAccountSettings } from "../api/use-account-settings";

export const AccountSettingsModal = () => {
    const { isOpen, setIsOpen, close } = useAccountSettingsModal();
    
    return (
        <div>
            <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
                <AccountSettingsForm onCancel={close}/>
            </ResponsiveModal>
        </div>
    );
};