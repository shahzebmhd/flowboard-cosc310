import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Projects } from "@/components/projects";
import { Navigation } from "@/components/navigation";
import { DottedSeparator } from "@/components/ui/dotted-separator";
import { WorkspaceSwitcher } from "@/components/workspace-switcher";

export const Sidebar = () => {
    return (
        <aside className="h-full p-4 w-full bg-secondary">
            {/* Logo */}
            <Link href="/" aria-label="Go to Home">
                <Image src="/Flowboard Logo Light Banner.svg" alt="Company Logo" fill priority/>
                {/* <Image src="/Flowboard Logo Dark Banner.svg" alt="Company Logo" width={232} height={56} className="hidden dark:block" priority/> */}
            </Link>
            <DottedSeparator className="my-4" />
            <WorkspaceSwitcher />
            <DottedSeparator className="my-4" />
            <Navigation />
            <DottedSeparator className="my-4" />
            <Projects />
        </aside>
    );
};