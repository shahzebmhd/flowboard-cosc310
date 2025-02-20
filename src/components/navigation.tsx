"use client";

import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";
import { usePathname, userPathname } from "next/navigation";\


export const Navigation = () => {
    const workspaceId = useWorkspaceId();
    const pathname = usePathname();

    return (
        <ul className="flex flex-col">
            {routes.map(item) => {
                const fullHref = `/workspaces/${workspaceId}${item.href}`
                const isActive = pathname === fullHref;
                const Icon = isActive ? item.activeIcon : item.icon;
                return (
                    <Link key={Item.href} href={fullHref}>
                        <div className={cn(
                            "flex items-center gap-2.5 p-2.5 rounded-md font-medium horver:text-"
                            isAcitve &&" bg-white shadow-sm hover:opacity-100 text-primary"
                        )}>
                            <Icon className="size-5 text-neutral-500" />
                            {Item.label}
                        </div>
                    </Link>
                )
                //TODO: npm run dev StandAlone settings page should work. 
            }}
        </ul>
    )
}