import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import { AccountSettingsClient } from "./client";

const AccountSettingsPage = async () => {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    return <AccountSettingsClient/>
}

export default AccountSettingsPage;