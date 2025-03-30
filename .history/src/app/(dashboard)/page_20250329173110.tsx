import {redirect} from "next/navigation";

import {getCurrent} from "@/features/auth/queries";
import { getWorkspaces } from "@/features/workspaces/queries";
import { DATABASE_ID, SETTINGS_ID } from "@/config";

export const Themes = {
    light: {
        background: '#FFFFFF',
        text: '#000000',
        primary: '#3b82f6',
        secondary: '#f3f4f6',
    },
    dark: {
        background: '#2E3738',
        text: "#FFFFFF",
        primary: '#770B98',
        secondary: '#374243',
    },
};

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
        <ThemeWrapper themes={Themes}>
            <div>
                Home page
                <h1>Server Component</h1>
                <pre>{JSON.stringify({DATABASE_ID, SETTINGS_ID}, null, 2)}</pre>
            </div>
        </ThemeWrapper>
    );
}