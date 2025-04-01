"use client";

import { useEffect, useState } from "react";
import { useTaskNotifications } from "@/features/tasks/hooks/use-task-notifications";
import { useCurrent } from "@/features/auth/api/use-current";
import { v4 as uuidv4 } from "uuid";

interface TaskAssignedEvent {
  detail: {
    taskId: string;
    taskName: string;
    assigneeId: string;
  }
}

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

export const NotificationListener = () => {
  const { addNotification } = useTaskNotifications();
  const { data: user } = useCurrent();
  const [notifiedTasks, setNotifiedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    console.log('NotificationListener mounted, current user:', user);

    const handleTaskAssigned = (event: CustomEvent<TaskAssignedEvent["detail"]>) => {
      const { taskId, taskName, assigneeId } = event.detail;
      
      console.log('Task assigned event received:', {
        taskId,
        taskName,
        assigneeId,
        currentUser: user?.$id,
        isMatch: user && user.$id === assigneeId
      });
      
      // Only create notification if the current user is the assignee
      if (user && user.$id === assigneeId) {
        console.log('Adding notification for user');
        const message = `You are the assignee for task: ${taskName}`;
        
        // Try both methods to ensure the notification is added
        addNotification(message, taskId);
        addNotificationToStorage(message, taskId);
        
        // Track this task as notified
        setNotifiedTasks(prev => new Set([...prev, taskId]));
      }
    };

    // Listen for task assigned events
    window.addEventListener('taskAssigned', handleTaskAssigned as EventListener);
    
    // Cleanup event listener on unmount
    return () => {
      console.log('NotificationListener unmounting');
      window.removeEventListener('taskAssigned', handleTaskAssigned as EventListener);
    };
  }, [addNotification, user]);

  // This component doesn't render anything
  return null;
}; 