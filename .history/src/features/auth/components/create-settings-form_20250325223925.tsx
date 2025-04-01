import { z, ZodAny } from "zod";
import { useAccountSettings } from "../api/use-account-settings";
import { settingsSchema } from "../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/ui/dotted-separator";
import { useUpdateSettings } from "../api/use-update-settings";

interface CreateSettingsFormProps {
    onCancel?: () => void;
}

export const CreateSettingsForm = ({ 
    onCancel,
}: CreateSettingsFormProps ) => {
    const { mutate: currentSettings, isPending } = useAccountSettings();
    const { mutate: updateSettings, } = useUpdateSettings();

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        // @ts-ignore
        defaultValues: currentSettings || {
            theme: 'light',
            autoSave: true,
            customColours: {
                background: '#FFFFFF',
                text: '#000000',
            },
        },
    });

    const onSubmit = (values: typeof currentSettings) => {
        // @ts-ignore
        updateSettings(values);
    };

    if (isLoading) {
        return <div>Loading settings...</div>
    }

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