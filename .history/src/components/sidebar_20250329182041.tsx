import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Projects } from "@/components/projects";
import { Navigation } from "@/components/navigation";
import { DottedSeparator } from "@/components/ui/dotted-separator";
import { WorkspaceSwitcher } from "@/components/workspace-switcher";
import { ThemeWrapper } from "@/features/settings/components/theme-wrapper";

export const Sidebar = () => {
    return (
            <ThemeWrapper>
        <aside className="h-full p-4 w-full" color="secondary">
                {/* Logo */}
                <Link href="/" aria-label="Go to Home">
                    <Image src="/logo.svg" alt="Company Logo" width={164} height={48} priority />
                </Link>

                <DottedSeparator className="my-4" />
                <WorkspaceSwitcher />
                <DottedSeparator className="my-4" />
                <Navigation />
                <DottedSeparator className="my-4" />
                <Projects />
        </aside>
            </ThemeWrapper>
    );
};