"use client"

import PageLoader from "@/components/page-loader";

const LoadingPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <PageLoader isLoaded/>
        </div>
    );
}

export default LoadingPage;
