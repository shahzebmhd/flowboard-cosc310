import { Loader } from "lucide-react";
import Image from "next/image";

export const PageLoader = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <Image src="/Flowboard Logo Light.svg" alt="Logo" className="block dark:hidden" width={56} height={56} priority />
            <Image src="/Flowboard Logo Dark.svg" alt="Logo" className="hidden dark:block" width={56} height={56} priority />
            <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
    );
};