"use client"


import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const LoadingPage = () => {
    const [ isLoaded, setIsLoaded ] = useState(false);
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
    );
}

export default LoadingPage;
