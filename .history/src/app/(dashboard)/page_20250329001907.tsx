import {redirect} from "next/navigation";

import {getCurrent} from "@/features/auth/queries";
import { getWorkspaces } from "@/features/workspaces/queries";
import { DATABASE_ID, SETTINGS_ID } from "@/config";

export default async function Home() {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    const workspaces = await getWorkspaces();
    if (workspaces.total === 0) {
        redirect ("/workspaces/create")
    } else {
        redirect(`/workspaces/${workspaces.documents[0].$id}`);
    }


    return (
        <div >
            Home page
            <h1>Server Component</h1>
            <pre>{JSON.stringify({DATABASE_ID, SETTINGS_ID}, null, 2)}</pre>
        </div>
    );
}