"use client";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CreateProjectModal } from "@/features/projects/components/create-project-modal";
import { CreateTaskModal } from "@/features/tasks/components/create-task-modal";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { AccountSettingsModal } from "@/features/settings/components/account-settings-modal";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    
    return ( 
        <div className="min-h-screen bg-primary text-primary">
            <NuqsAdapter>
                <CreateWorkspaceModal />
                <CreateProjectModal />
                <CreateTaskModal />
                <AccountSettingsModal />
                <div className="flex w-full h-full">
                    <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
                        <Sidebar />
                    </div>
                    <div className="lg:pl-[264px] w-full">
                        <div className="mx-auto max-w-screen-2xl h-full">
                            <Navbar />
                            <main className="h-full py-8 px-6 flex flex-col">
                                {children}
                            </main>
                        </div>
                    </div>
                    </div>
            </NuqsAdapter>
        </div>
    );
};

export default DashboardLayout;