import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

const WorkspaceIdPage = async () => {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");
    return (
        <div className="w-full h-full">
            
            <iframe 
                src="/index.html" 
                width="100%" 
                height="100%" 
                style={{ border: "none", minHeight: "calc(100vh - 64px)" }} // 64px 是 Navbar 可能占用的高度
            />
        </div>
    );
};

export default WorkspaceIdPage;