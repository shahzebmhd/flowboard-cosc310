"use client";

import { useAccountSettingsModal } from "../hooks/use-account-settings-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { AccountSettingsForm } from "./account-settings-form";

export const AccountSettingsModal = () => {
    const { isOpen, setIsOpen, close, open } = useAccountSettingsModal();
    
    return (
        <div>
            <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
                <AccountSettingsForm onCancel={close}/>
            </ResponsiveModal>
        </div>
    );
};console.log("This shit ain't working");