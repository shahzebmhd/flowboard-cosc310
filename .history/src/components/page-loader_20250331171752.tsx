"use client"

import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const PageLoader = ({ isLoaded }: { isLoaded: boolean }) => {
    const [isMounted, setIsMounted] = useState(!isLoaded);
    const [shouldAnimateOut, setShouldAnimateOut] = useState(false);
    
    useEffect(() => {
        if (isLoaded) {
            setShouldAnimateOut(true);
            const timer = setTimeout(() => setIsMounted(false), 500); // Match this with your transition duration
            return () => clearTimeout(timer);
        }
    }, [isLoaded]);
    
    if (!isMounted) return null;
    
    return (
        <div className={`fixed top-0 left-0 h-screen w-full flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out ${shouldAnimateOut ? 'opacity-0' : 'opacity-100'}`}>
            <Image src="/Flowboard Logo Light.svg" alt="Logo" className="block dark:hidden" width={56} height={56} priority />
            <Image src="/Flowboard Logo Dark.svg" alt="Logo" className="hidden dark:block" width={56} height={56} priority />
            <Loader className="size-6 animate-spin text-muted-foreground mt-4" />
            </div>
        );
    }

export default PageLoader;