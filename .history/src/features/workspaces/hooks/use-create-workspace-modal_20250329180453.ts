// src/features/workspaces/hooks/use-create-workspace-modal.ts
"use client";

import { useQueryState, parseAsBoolean } from "nuqs";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export const useCreateWorkspaceModal = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    
    const [isOpen, setIsOpen] = useQueryState(
        "create-workspace",
        parseAsBoolean
        .withDefault(false)
        .withOptions({
            history: "replace",
            clearOnDefault: true,
            startTransition: (callback) => {
                startTransition(() => {
                    callback();
                    // Force a router refresh after state update
                    router.refresh();
                });
            },
        })
    );
    
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(null);
    
    return {
        isOpen,
        isPending,
        open,
        close,
        toggle: () => setIsOpen(prev => !prev),
    };
};