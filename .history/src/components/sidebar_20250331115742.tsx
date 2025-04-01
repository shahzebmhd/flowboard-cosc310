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
            <div className="flex flex-row items-center gap-x-2">
                <Link href="/" aria-label="Go to Home">
                    <Image src="/Flowboard Logo Light.svg" alt="Company Logo" width={30} height={30} className="block dark:hidden" priority />
                    <Image src="/Flowboard Logo Dark.svg" alt="Company Logo" width={30} height={30} className="hidden dark:block" priority />
                </Link>
                <span className="font-bold text-4xl text-[var(--text-hover)] dark:text-[var(--text-logo)]">Flowboard</span>
            </div>

            <DottedSeparator className="my-4" />
            <WorkspaceSwitcher />
            <DottedSeparator className="my-4" />
            <Navigation />
            <DottedSeparator className="my-4" />
            <Projects />
        </aside>
    );
};