"use client";
import { DottedSeparator } from "@/components/ui/dotted-separator";
import {Input } from "@/components/ui/input";

import {
    Card,
    CardContent, 
    CardHeader,
    CardTitle
} from "@/components/ui/card";

export const SignInCard = () => {
    return (
        <Card>
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className ="text-2xl">
                    Welcome Back
                </CardTitle>
            </CardHeader>
            <div className="px-7">
            <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <form className="space-y-4">
                <Input
                    required
                    type="email"
                    value={""}
                    onChange={()=>{}}
                    placeholder="Enter email address"
                    disabled={false}
                />
                </form>
            </CardContent>
        </Card>
    );
};
