import { toast } from "sonner";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { v4 as uuidv4 } from "uuid";

import {
  InferResponseType,
  InferRequestType,
} from "hono";
// @ts-ignore
type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$patch"], 200>;
// @ts-ignore
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$patch"]>;

// Directly add a notification to localStorage
const addNotificationToStorage = (message: string, taskId?: string) => {
  try {
    const notificationId = uuidv4();
    const newNotification = {
      id: notificationId,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      taskId
    };
    
    console.log('Directly adding notification to localStorage:', newNotification);
    
    const storedNotifications = localStorage.getItem("notifications");
    const notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
    const updatedNotifications = [newNotification, ...notifications];
    
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    console.log('Updated localStorage with new notification');
    
    // Force a refresh to ensure UI updates
    window.dispatchEvent(new Event('storage'));
    
    return true;
  } catch (error) {
    console.error('Failed to add notification to localStorage:', error);
    return false;
  }
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, { json: RequestType["json"], param: RequestType["param"] }>({
    mutationFn: async ({ json, param }) => {
      // @ts-ignore
      const response = await client.api.tasks[":taskId"]["$patch"]({ json, param });
      
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      
      return await response.json();
    },
    onSuccess: (data) => {
      toast.success("Task updated");
      
      // Handle task assignment notification
      if (data.assigneeId) {
        console.log('Task assigned event triggered:', {
          taskId: data.$id,
          taskName: data.name,
          assigneeId: data.assigneeId
        });
        
        // 1. Create a direct notification in localStorage
        addNotificationToStorage(`You are the assignee for task: ${data.name}`, data.$id);
        
        // 2. Also try the event approach as a fallback
        const event = new CustomEvent('taskAssigned', { 
          detail: { 
            taskId: data.$id,
            taskName: data.name,
            assigneeId: data.assigneeId
          } 
        });
        window.dispatchEvent(event);
      }
      
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", data.$id] });
    },
    onError: () => {
      toast.error("Failed to update task");
    },
  });
};
