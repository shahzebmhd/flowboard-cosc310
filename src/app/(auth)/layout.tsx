"use client"; 
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
interface AuthLayoutProps {
    children: React.ReactNode
};



const AuthLayout = ({children}: AuthLayoutProps) => {
    const pathname = usePathname();
    const isSignIn = pathname === "/sign-in";
    
    return (
        <main className="bg-neutral-100 min-h-screen">
        <div className="mx-auto max-w-screen-2xl p-4">
            <nav className="flex justify-between items-center">
                 <Image src="/logo.svg" height={50} width={50} alt="logo" />
                
                    <Button asChild variant="secondary">
                        <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                        { isSignIn ? "Sign up" : "Login"}
                        </Link>
                    </Button>
               
            </nav>
            <div className="flex flex-col items-center justify-center pt-4 md:pt">

            </div>
            {children}
        </div>
        </main>
    );
}

export default AuthLayout;