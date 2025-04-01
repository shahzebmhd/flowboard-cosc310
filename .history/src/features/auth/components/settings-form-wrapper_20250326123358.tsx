import { Card, CardContent } from "@/components/ui/card";
import { useSettings } from "../hooks/use-settings";
import { Loader } from "lucide-react";
import { SettingsForm } from "./settings-form";

interface SettingsFormWrapperProps {
    onCancel: () => void;
}

export const SettingsFormWrapper = ({ onCancel }: SettingsFormWrapperProps) => {
    const { data: settings, isLoading, isError } = useSettings();

    if( isLoading ) {
        return (
            <Card className="w-full h-[714px] border-none shadow-none">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground"/>
                </CardContent>
            </Card>
        );
    }

    return (
        <SettingsForm
    )
}