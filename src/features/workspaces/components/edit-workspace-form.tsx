"use client";
// EXTRAS ANTONIO COPIED FROM CREATE WORKSPACE FORM
// import {AnyZodTuple, z} from "zod";
// import Image from "next/image";
// import {cn} from "@/lib/utils";
// import {Input} from "@/components/ui/input";
// import {Avatar, AvatarFallback} from "@/components/ui/avatar";
// import {Workspace} from "../types";

import {Button} from "@/components/ui/button";
import {DottedSeperator} from "@/components/dotted-separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowLeftIcon, ImageIcon } from "lucide-react";
import {
    Form, 
    FormControl, 
    FormField, 
    FormItem
} from "@/components/ui/form";
import {useRef} from "react" ;
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolver/zod";
import { updateWorkspaceSchema } from "../schemas";


interface EditWorkspaceFormProps {
    onCancel?: () => void;
    initialValues: any;
};

export const EditWordspaceForm = ({ onCancel, initialValues }: EditWorkspaceFormProps) => {
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
            image: values.image instanceof File ? values.image : "", //TODO: appwrite has it as empty string, Antonio deletes all workspaces 6:58:00
        };

        mutate({
            form: finalValues,
            param: {workspaceId: initialValues.$id}
        },{ 
            onSuccess: ({data}) => {
                form.reset();
                router.push('/workspaces/$(data.$id)');
            }
        })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image",file);
        }
    };
    return (
        //  TODO:  DEPENDENT CODE.. couldnt really get from my section of video
            <Card className="w-full h-full border-none shadow-none">
                <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
                    <Button size="sm" variant="secondary" onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValues.$id}`) }>
                    <ArrowLeftIcon className="size-4 mr-2"/>
                        Back
                        
                    </Button>
                    <CardTitle className="text-xl font-bold">
                        {initialValues.name}
                    </CardTitle>
                </CardHeader>
                <div className="px-7">
                    <DottedSeperator/>
                </div>
                <CardContent className="p-7">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}></form>
                    </Form>
                    {/* TODO: Previous tickets shall have the completed code for this section */}
                    {/* 7:01:29 Enters here copied button code from create-workspace-form 
                    
                    {field.value ? (
                                        <Button
                                        type = "button"
                                        disabled={isPending}
                                        variant="descrutive"
                                        size="xs"
                                        className="w-fit mt-2"
                                        onClick={() => {
                                            field.onChange(null);
                                            if (inputRef.current) {
                                                inputRef.current.value = "";
                                            }
                                        }}
                                        >
                                        RemoveImage
                                        </Button>

                                        )
                                        : 
                                        (
                                            <Button
                                        type = "button"
                                        disabled={isPending}
                                        variant="tertiary"
                                        size="xs"
                                        className="w-fit mt-2"
                                        onClick={() => inputRef.current?.click()}
                                        >
                                        UploadImage
                                        </Button>
                                        )
                                        }
                    
                    */}
                </CardContent>
            </Card>
        )
};


