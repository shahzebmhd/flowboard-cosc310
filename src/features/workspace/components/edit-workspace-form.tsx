"use client";

import {AnyZodTuple, z} from "zod";
import {useRef} from "react" ;
import Image from "next/image";
import {ImageIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolver/zod";

import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {DottedSeperator} from "@/components/dotted-separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

import {
    Form, 
    FormControl, 
    FormField, 
    FormItem
} from "@/components/ui/form";
import {Workspace} from "../types";
import { updateWorkspaceSchema } from "../schemas";
import { useCreateWorkSpace } from "../api/use-create-workspace";

interface EditWorkspaceFormProps {
    onCancel?: () => void;
    initialValues: any;
};

export const EditWordspaceForm = ({ onCancel, initialValues }: EditWorkspaceFormProps) => {
    const router = useRouter();
    const {mutate, isPending} = useCreateWorkspace();

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
            image: values.image instanceof File ? values.image : undefined,
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
};

return (
   
    <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex p-7">
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
        </CardContent>
    </card>
)

