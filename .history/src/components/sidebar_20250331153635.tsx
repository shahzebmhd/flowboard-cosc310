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
            {/* <div className="flex flex-row items-center gap-x-2"> */}
                <Link href="/" aria-label="Go to Home">
                    <Image src="/Flowboard Logo Light Banner.svg" alt="Company Logo"  className="block dark:hidden object-cover" priority fill/>
                    <Image src="/Flowboard Logo Dark Banner.svg" alt="Company Logo"  className="hidden dark:block object-cover" priority fill/>
                </Link>
                {/* <span className="font-medium text-4xl text-[var(--text-hover)] dark:text-[var(--text-logo)]">Flowboard</span> */}
            {/* </div> */}

            <DottedSeparator className="my-4" />
            <WorkspaceSwitcher />
            <DottedSeparator className="my-4" />
            <Navigation />
            <DottedSeparator className="my-4" />
            <Projects />
        </aside>
    );
};