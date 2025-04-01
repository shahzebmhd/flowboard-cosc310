"use client"


import PageLoader from "@/components/page-loader";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const LoadingPage = () => {
    const [ isLoaded, setIsLoaded ] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 3000);
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <>
            <main className={isLoaded ? 'opacity-100' : 'opacity-0'}>
                <PageLoader isLoaded={isLoaded} />
            </main>
        </>
    );
}

export default LoadingPage;
