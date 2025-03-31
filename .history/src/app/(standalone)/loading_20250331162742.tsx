"use client"


import { Loader } from "lucide-react";
import Image from "next/image";


const LoadingPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Image src="/Flowboard Logo Light.svg" alt="Logo" className="hidden dark:block" fill priority />
            <Image src="/Flowboard Logo Dark.svg" alt="Logo" className="block dark:hidden" fill priority />
            <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
    );
}

export default LoadingPage;
