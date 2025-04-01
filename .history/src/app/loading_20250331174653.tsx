"use client"

import PageLoader from "@/components/page-loader";
import { Loader } from "lucide-react";

const LoadingPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <PageLoader/>
        </div>
    );
}

export default LoadingPage;
