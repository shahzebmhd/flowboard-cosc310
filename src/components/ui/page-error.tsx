import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

interface PageErrorProps {
  message?: string;
  onRetry?: () => void;
}

export const PageError = ({
  message = "Something went wrong",
  onRetry,
}: PageErrorProps) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-y-4">
      <div className="flex items-center gap-x-2 text-destructive">
        <AlertTriangle className="size-5" />
        <p className="font-medium">{message}</p>
      </div>
      
      {onRetry && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
        >
          Try again
        </Button>
      )}
    </div>
  );
}; 