"use client";

import { MenuIcon } from "lucide-react";


import { Button } from "./ui/button";
import { Sheet, SheetTrigger } from "./ui/sheet";

export const MobileSidebar = () => {
    return (
        <Sheet modal={false}>
            <SheetTrigger asChild>
                <Button variant="secondary" className="lg:hidden">
                    <MenuIcon />
                </Button>
            </SheetTrigger>
        </Sheet>
    );
};