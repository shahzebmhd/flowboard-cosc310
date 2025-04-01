import { z, ZodAny } from "zod";
import { useAccountSettings } from "../api/use-account-settings";
import { settingsSchema } from "../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";

interface CreateSettingsFormProps {
    onCancel?: () => void;
}

export const CreateSettingsForm = ({ 
    onCancel,
}: CreateSettingsFormProps ) => {
    const { mutate, isPending } = useAccountSettings();

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            theme: 'light',
            autoSave: true,
            customColours: {
                background: '#FFFFFF',
                text: '#000000',
            },
        },
    });

    const onSubmit = (values: z.infer<typeof settingsSchema>) => {
        mutate(
            values,
            {
                onSuccess: () => {
                    form.reset();
                    onCancel?.();
                }
            }
        );
    };

    return (
        <Card className="">

        </Card>
    );
};