import { z, ZodAny } from "zod";
import { useAccountSettings } from "../api/use-account-settings";

interface CreateSettingsFormProps{
    onCancel?: () => void;
    themeOptions: { id: string };
}

export const CreateSettingsForm = ({ 
    onCancel, themeOptions 
}: CreateSettingsFormProps) => {
    const { mutate, isPending } = useAccountSettings();

    const onSubmit = (values: z.infer<ZodAny>) => {
            mutate(
                { json: { ...values, workspaceId } },
                {
                    onSuccess: () => {
                        form.reset();
                        onCancel?.();
                    },
                }
            );
        };
};