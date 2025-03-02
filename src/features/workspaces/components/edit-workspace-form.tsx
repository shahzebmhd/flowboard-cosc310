"use client";
import {useRef} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateWorkspaceSchema} from "@/features/workspaces/schemas";
import {useForm, FormProvider, Controller} from "react-hook-form"; // Import Controller
import {z} from "zod";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeparator} from "@/components/ui/dotted-separator";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Image from "next/image"
import {ArrowLeftIcon, ImageIcon} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../types";
import { useUpdateWorkspace } from "../api/use-update-workspace";

interface EditWorkspaceFormProps {
    onCancel?: () => void;
    initialValues: Workspace,
}

export const EditWorkspaceForm = ({onCancel, initialValues}: EditWorkspaceFormProps) => {
    const router = useRouter();
    const {mutate, isPending} = useUpdateWorkspace();
    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
        resolver: zodResolver(updateWorkspaceSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? "",
        },
    });

    const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : "",
        }
        mutate({ 
            form: finalValues,
            param: {workspaceId: initialValues.$id }
        }, {
            onSuccess: ({ data }) => {
                form.reset();
                router.push(`/workspaces/${data.$id}`);
                //todo redirect to new workspace
            }
        });
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="grid grid-cols-3 items-center p-7">
                <Button 
                    size="sm" 
                    variant="secondary" 
                    onClick={onCancel || (() => router.push(`/workspaces/${initialValues.$id}`))}
                    className="flex items-center gap-2 justify-self-start"
                >
                    <ArrowLeftIcon className="size-4" />
                    Back
                </Button>
                <CardTitle className="text-xl font-bold text-center col-span-1">
                    {initialValues.name}
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                {/* Wrap the form in FormProvider */}
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Workspace Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter workspace name"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Controller
                                name="image"
                                control={form.control}
                                render={({field}) => (
                                    <div className={"flex flex-col gap-y-2"}>
                                        <Input
                                            ref={inputRef}
                                            type="file"
                                            disabled={isPending}
                                            onChange={(e) => {
                                                const file = e.target.files ? e.target.files[0] : null;
                                                field.onChange(file);
                                            }}
                                        />
                                        <div className={"flex items-center gap-x-5"}>
                                            {field.value ? (
                                                <div className={"size-[72px] relative rounded-md overflow-hidden"}>
                                                    <Image alt="Workspace logo"
                                                           fill
                                                           className="object-cover"
                                                           src={field.value instanceof File ?
                                                               URL.createObjectURL(field.value) : field.value}
                                                    />
                                                </div>
                                            ) : (
                                                <Avatar className={"size-[72px]"}>
                                                    <AvatarFallback>
                                                        <ImageIcon className={"size-[36px] text-neutral-400"}/>
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className={"flex flex-col"}>
                                                <p className={"text-sm"}>Workspace Icon</p>
                                                <p className={"text-sm text-muted-foreground"}>
                                                    JPG, PNG, SVG or JPEG, max 1mb
                                                </p>
                                                {field.value ? (
                                                <Button
                                                    type="button"
                                                    disabled={isPending}
                                                    variant="destructive" 
                                                    size="xs"
                                                    className="w-fit mt-2"
                                                    onClick={() => {
                                                        field.onChange(null);
                                                        if (inputRef.current) {
                                                            inputRef.current.value = "";
                                                        }
                                                    }}
                                                >
                                                    Remove Image
                                                </Button>
                                            ) : (
                                                // TODO: BUG - Upload button not working
                                                <Button type={'button'} disabled={isPending} variant={"tertiary"}
                                                        size={"xs"} className={"w-fit mt-2"}
                                                        onClick={() => inputRef.current?.click()}>
                                                    Upload Image
                                                </Button>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>

                        <DottedSeparator className="py-7"/>
                        <div className={"flex items-center justify-between"}>
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
                            <Button 
                                type="submit" 
                                size="lg" 
                                variant="primary" 
                                disabled={isPending}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
};
