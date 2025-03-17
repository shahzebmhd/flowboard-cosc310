import { Loader2 } from "lucide-react";

interface PageLoaderProps {
  size?: "sm" | "md" | "lg";
}

export const PageLoader = ({ size = "md" }: PageLoaderProps) => {
  const sizeClasses = {
    sm: "size-4",
    md: "size-8",
    lg: "size-12",
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
    </div>
  );
}; 