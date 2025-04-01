import { z, ZodAny } from "zod";
import { useSettings } from "../api/use-settings";
import { settingsSchema } from "../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/ui/dotted-separator";
import { useUpdateSettings } from "../api/use-update-settings";
import { Loader } from "lucide-react";

interface CreateSettingsFormProps {
    onCancel?: () => void;
}

export const CreateSettingsForm = ({ 
    onCancel,
}: CreateSettingsFormProps ) => {
    const { data: currentSettings, isLoading } = useSettings();
    const { mutate: updateSettings, } = useUpdateSettings();
    
    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        // @ts-ignore
        defaultValues: currentSettings || {
            theme: 'light',
            autoSave: true,
            customColors: {
                background: '#FFFFFF',
                text: '#000000',
            },
        },
    });
    
    const onSubmit = (values: z.infer<typeof settingsSchema>) => {
        updateSettings(values);
    };
    
    if (isLoading) {
        return (
            <div>
                <Loader className="size-4 animate-spin text-muted-foreground"/>
                Loading settings...
            </div>
        );
    };
    
    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">Settings</CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
        </Card>
    );
};