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
            <div className={`modal ${isOpen ? 'modal-open' : 'modal-closed'}`}>
                <h2>Account Settings</h2>
                <Button onClick={close}>Close</Button>
            </div>
            <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
                <AccountSettingsForm onCancel={close} initialValues={data as ResponseType}/>
            </ResponsiveModal>
        </div>
    );
};