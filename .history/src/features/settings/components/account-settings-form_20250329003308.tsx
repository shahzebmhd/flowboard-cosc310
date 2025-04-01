"use client";

import { z } from "zod";
import { useAccountSettings } from "../api/use-account-settings";
import { settingsSchema } from "../../auth/schemas";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/ui/dotted-separator";
import { useUpdateAccountSettings } from "../api/use-update-account-settings";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAccountSettingsModal } from "@/features/settings/hooks/use-account-settings-modal";

const Checkbox = CheckboxPrimitive.Root;

interface AccountSettingsFormProps {
    onCancel?: () => void;
}

export const AccountSettingsForm = ({ 
    onCancel,
}: AccountSettingsFormProps ) => {
    const { data: currentSettings, isPending } = useAccountSettings();
    const { mutate, } = useUpdateAccountSettings();
    const router = useRouter();
    const workspaceId = useWorkspaceId();

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
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
        const finalValues = {
            ...values,
            workspaceId,
        }
        mutate({ form: finalValues }, {
            onSuccess: ({data}) => {
                form.reset();
            },
        });
    };
    
    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">Account Settings</CardTitle>
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
                                        <Checkbox
                                                checked={field.value || false} // Ensure it's a boolean
                                                onCheckedChange={(checked) => {
                                                    field.onChange(checked); // Handle the checkbox change
                                                }}
                                                className="h-4 w-4 rounded-sm border border-primary"
                                            >
                                                <CheckboxPrimitive.Indicator>
                                                    {/* Custom indicator icon */}
                                                    <span className="w-4 h-4 bg-primary text-white"></span>
                                                </CheckboxPrimitive.Indicator>
                                            </Checkbox>
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
                            <Button 
                                type = "button"
                                size = "lg"
                                variant = "primary"
                                disabled = {isPending}
                                className = {cn(!onCancel && "invisible")}
                            >
                                Save

                            </Button>
                            <Button
                                type="button"
                                size="lg"
                                variant="secondary"
                                onClick={onCancel}
                                disabled={isPending}
                                className={cn(!onCancel && "invisible")}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
};