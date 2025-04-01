import { useState } from "react";
import { CreateSettingsForm } from "./settings-form";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";

export const UserButton = () => {
    const [ isSettingsOpen, setIsSettingsOpen ] = useState(false);

    const openSettings = () => setIsSettingsOpen(true);
    const closeSettings = () => setIsSettingsOpen(false);

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuItem onClick={openSettings}>
                <Settings /> Settings
            </DropdownMenuItem>
            {isSettingsOpen && <CreateSettingsForm onCancel={closeSettings} />}
        </DropdownMenu>
    );
};