"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useAccountSettings } from "@/features/settings/api/use-account-settings";
import Link from "next/link";

export const AccountSettingsClient = () => {
    const { data, isPending } = useAccountSettings();

    if (isPending) return <PageLoader/>

    if (!data) return <PageError message="Settings not found"/>

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    Account Settings
                </div>
                <p className="text-lg font-semibold">{data.name}</p>
            </div>
            <div>
                <Button variant="secondary" size="sm" asChild>
                    <Link href={`(dashboard)/settings`}>
                        
                    </Link>
                </Button>
            </div>
        </div>
    )
}