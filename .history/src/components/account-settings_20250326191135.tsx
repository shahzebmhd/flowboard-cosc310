"use client";

import { useAccountSettings } from "@/features/auth/api/use-account-settings";
import { useAccountSettingsModal } from "@/features/auth/hooks/use-account-settings-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

export const AccountSettings = () => {
    const { open } = useAccountSettingsModal();
    const pathname = usePathname();
    const workspaceId = useWorkspaceId();
    const { data } = useAccountSettings();

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500">Account Settings</p>
                <RiAddCircleFill 
                    onClick={open}
                    className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
                />
            </div>
            {/*@ts-expect-error*/}
            {data?.documents.map((settings) => {
                const href = `/workspaces/${workspaceId}/account-settings`;
                const isActive = pathname === href;
                return (
                    <Link href={href} key={settings}>
                        <div
                            className={cn(
                                "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                            )}
                        />
                    </Link>
                );
            })}
        </div>
    );
};