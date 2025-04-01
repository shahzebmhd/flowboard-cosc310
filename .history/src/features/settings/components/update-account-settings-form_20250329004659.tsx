"use client";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/ui/dotted-separator";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { settingsSchema } from "@/features/auth/schemas";
import { useUpdateAccountSettings } from "../api/use-update-account-settings";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface UpdateAccountSettingsProps {
    onCancel?: () => void;
    initialValues: z.infer<typeof settingsSchema>
}

export const UpdateAccountSettingsForm =({ onCancel, initialValues }: UpdateAccountSettingsProps) => {
    const router = useRouter();
    const { mutate, isPending } = useUpdateAccountSettings();
    const workspaceId = useWorkspaceId();

    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            ...initialValues,
        },
    });

    return (
        <div className="flex flex-col gap-y-4">
            <Card className="ww-full h-full border-none shadow-none">
                <CardHeader className="grid grid-cols-3 items-center p-7">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={onCancel || (() => router.push(`/workspaces/${workspaceId}/account-settings`))}
                        className="flex items-center gap-2 justify-self-start"
                    >

                    </Button>
                </CardHeader>
            </Card>
        </div>
    );
}