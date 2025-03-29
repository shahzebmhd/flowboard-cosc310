import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { AccountSettingsForm } from "@/features/settings/components/account-settings-form";

const AccountSettingsPage = async () => {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    return (
        <div className="w-full lg:max-w-xl">
            <AccountSettingsForm />
        </div>
    );
};

export default AccountSettingsPage;