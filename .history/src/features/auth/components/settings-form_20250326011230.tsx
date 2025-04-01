import { z, ZodAny } from "zod";
import { useSettings } from "../api/use-settings";
import { settingsSchema } from "../schemas";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/ui/dotted-separator";
import { useUpdateSettings } from "../api/use-update-settings";
import { Loader } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@radix-ui/react-checkbox";

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
            
            <CardContent className="p-7">
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField
                                control={form.control}
                                name="theme"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Placeholder</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Select theme" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="autoSave"
                                render= {({ field }) => (
                                    <FormItem>
                                        <FormLabel>Auto Save</FormLabel>
                                        <FormControl>
                                            <Checkbox/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="customColors.background"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Background Color</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="color" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="customColors.text"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Text Color</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="color" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
};