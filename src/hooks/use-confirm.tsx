import {useState} from 'react';
import {Button,type ButtonProps} from '@/components/ui/button';
import {ResponsiveModal} from '@/components/responsive-modal';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,  
} from "@/components/ui/card";
import React from "react";

export const useConfirm = (p0: string, p1: string, p2: string) => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

    const confirm = (): Promise<boolean> => {
      return new Promise((resolve) => {
        setPromise({ resolve });
      });
    };


    const handleClose = () => {
      setPromise(null);
    };

    // Handle user confirmation (resolve with true)
    const handleConfirm = () => {
      promise?.resolve(true);
      handleClose();
    };

    // Handle user cancellation (resolve with false)
    const handleCancel = () => {
      promise?.resolve(false);
      handleClose();
    };

    // Confirmation modal dialog component
    const ConfirmationDialog = () => (
      <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
        <Card className="w-full h-full border-none shadow-none">
          <CardContent className="p-8">
            <CardHeader className="p-0">
              <CardTitle>Confirm</CardTitle>
              <CardDescription>Are you sure?</CardDescription>
            </CardHeader>
            <div className="pt-4 w-full flex flex-col gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
              <Button variant="primary" onClick={handleConfirm} className="w-full lg:w-auto">
                Confirm
              </Button>
              <Button variant="outline" className="w-full lg:w-auto" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </ResponsiveModal>
    );

    // Return the dialog component and the confirm function
    return [ConfirmationDialog, confirm];
  }; 
