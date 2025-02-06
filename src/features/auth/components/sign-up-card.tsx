"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { DottedSeparator } from "@/components/ui/dotted-separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { registerSchema } from "@/features/auth/schemas";
import { useRegister } from "../api/use-register";

export const SignUpCard = () => {
    const { mutate } = useRegister();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        mutate({ json: values });
    };

    return (
        <Card>
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                    By signing up, you agree to our{" "}
                    <Link href="/privacy">
                        <span className="text-blue-700">Privacy Policy</span>
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms">
                        <span className="text-blue-700">Terms of Service</span>
                    </Link>
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Enter email address"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Enter password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" variant="primary" size="lg" className="w-full">
                            Sign Up
                        </Button>
                    </form>
                </Form>
            </CardContent>

            <DottedSeparator />

            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button variant="secondary" size="lg" className="w-full">
                    <FcGoogle className="mr-2" />
                    Sign Up with Google
                </Button>
                <Button variant="secondary" size="lg" className="w-full">
                    <FaGithub className="mr-2" />
                    Sign Up with Github
                </Button>
            </CardContent>

            <div>
                <DottedSeparator />
            </div>

            <CardContent className="p-7 flex items-center justify-center">
                <p>
                    Already have an account?
                    <Link href="/sign-in">
                        <span className="text-blue-700">Sign In</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
};

