"use client";

import { useRouter } from "next/navigation";
import {useEffect } from "react";
import{useLogout} from "@/features/auth/api/use-logout";
import{ useCurrent } from "@/features/auth/api/use-current";
import { LogOut } from "lucide-react";

export default function Home() {
    const router =useRouter();
    const { data, isLoading }= useCurrent(); 
    const { mutate } = useLogout();

    useEffect(() => {
        if (!data && !isLoading )  {
        router.push("/sign-in");
        }
    }, [data]);


    return (
        <div >
            only visible to authorized users.   
            <button onClick={() => mutate()}>
                Logout
                </button>  
        </div>
    );
};

