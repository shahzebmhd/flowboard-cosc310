import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { v4 as uuidv4 } from "uuid";

 // TODO : Find a fix for client error
 // @ts-ignore
type ResponseType = InferResponseType<typeof client.api.tasks["$post"], 200>;
// @ts-ignore
type RequestType = InferRequestType<typeof client.api.tasks["$post"]>;

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

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            console.log('Creating task with data:', json);
            // @ts-ignore
            const response = await client.api.tasks["$post"]({ json });

            if (!response.ok) {
                throw new Error("Failed to create task");
            }
            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Task created");
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            
            console.log('Task created successfully:', data);
            
            // Trigger notification event for task assignment if there's an assignee
            if (data.assigneeId) {
                console.log('Task created with assignee, triggering notification:', {
                    taskId: data.$id,
                    taskName: data.name,
                    assigneeId: data.assigneeId
                });
                
                // 1. Directly add notification to localStorage
                addNotificationToStorage(`You are the assignee for task: ${data.name}`, data.$id);
                
                // 2. Also try the event approach as fallback
                const event = new CustomEvent('taskAssigned', { 
                    detail: { 
                        taskId: data.$id,
                        taskName: data.name,
                        assigneeId: data.assigneeId
                    } 
                });
                window.dispatchEvent(event);
            }
        },
        onError: (error) => {
            console.error('Failed to create task:', error);
            toast.error("Failed to create task");
        },
    });

    return mutation;
};
