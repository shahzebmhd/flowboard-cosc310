"use client";

import { useAccountSettingsModal } from "../auth/hooks/use-account-settings-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { AccountSettingsForm } from "./components/account-settings-form";

export const AccountSettingsModal = () => {
    const { isOpen, setIsOpen, close } = useAccountSettingsModal();
    
    console.log("This shit ain't working");

    return (
            <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
                <AccountSettingsForm onCancel={close}/>
            </ResponsiveModal>
    );
}; 