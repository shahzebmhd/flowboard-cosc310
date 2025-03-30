"use client";

import { useQueryState, parseAsBoolean } from "nuqs";

export const useCreateWorkspaceModal = () => {
    const [isOpen, setIsOpen] = useQueryState (
        "create-workspace",
        parseAsBoolean
        .withDefault(false)
        .withOptions({
            history: "replace",
            clearOnDefault: true,
            startTransition: true,
        })
    );
    
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    
    return {
        isOpen,
        open,
        close,
        toggle: () => setIsOpen(prev => !prev),
    };
};