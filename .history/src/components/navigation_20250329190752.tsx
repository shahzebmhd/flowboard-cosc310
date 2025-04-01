"use client";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from "react-icons/go";

const routes = [
    {
        label: "Home",
        href: "", // Changed to avoid URL issues
        icon: GoHome,
        activeIcon: GoHomeFill,
    },    
    {
        label: "My Tasks",
        href: "/tasks",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        activeIcon: SettingsIcon,
    },
    {
        label: "Members",
        href: "/members",
        icon: UsersIcon,
        activeIcon: UsersIcon,
    },
];

export const Navigation = () => {
    const workspaceId = useWorkspaceId();
    const pathname = usePathname();

    //  Prevent rendering until `workspaceId` is available
    if (!workspaceId) {
        return <p>Loading workspace...</p>;
    }

    return (
        <ul className="flex flex-col">
            {routes.map((item) => {
                const fullHref = `/workspaces/${workspaceId}${item.href}`;
                const isActive = pathname.startsWith(fullHref);

                const Icon = isActive ? item.activeIcon : item.icon;

                return (
                    <li key={item.href}>
                        <Link href={fullHref} aria-current={isActive ? "page" : undefined}>
                            <div className={cn(
                                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-neutral-700",
                                isActive && "bg-secondary shadow-sm hover:opacity-100 text"
                            )}>
                                <Icon className="size-5 text-neutral-500" />
                                {item.label}
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};