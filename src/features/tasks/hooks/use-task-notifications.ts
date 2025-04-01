"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
  taskId?: string;
}

// Make sure we have access to localStorage
const isClient = typeof window !== 'undefined';

export const useTaskNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loaded, setLoaded] = useState(false);
  
  // Load notifications on component mount
  useEffect(() => {
    if (!isClient) return;
    
    try {
      const storedNotifications = localStorage.getItem("notifications");
      console.log('Trying to load notifications from localStorage:', storedNotifications);
      
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications);
        console.log('Successfully parsed notifications:', parsedNotifications);
        setNotifications(parsedNotifications);
      } else {
        console.log('No stored notifications found');
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
      localStorage.removeItem("notifications");
    } finally {
      setLoaded(true);
    }
  }, []);

  // Save notifications when they change
  useEffect(() => {
    if (!isClient || !loaded) return;
    
    console.log('Saving notifications to localStorage:', notifications);
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications, loaded]);

  const addNotification = (message: string, taskId?: string) => {
    console.log('Adding new notification:', { message, taskId });
    
    const newNotification: Notification = {
      id: uuidv4(),
      message,
      timestamp: new Date().toISOString(),
      read: false,
      taskId
    };
    
    // Directly try to immediately save to localStorage
    if (isClient) {
      try {
        const current = localStorage.getItem("notifications");
        const currentNotifications = current ? JSON.parse(current) : [];
        const updatedNotifications = [newNotification, ...currentNotifications];
        localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
      } catch (error) {
        console.error("Error saving notification directly to localStorage:", error);
      }
    }
    
    // Update state
    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      console.log('Updated notifications state:', updated);
      return updated;
    });
    
    return newNotification;
  };

  const markAsRead = (id: string) => {
    console.log('Marking notification as read:', id);
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    console.log('Marking all notifications as read');
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    console.log('Removing notification:', id);
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    console.log('Clearing all notifications');
    setNotifications([]);
    if (isClient) {
      localStorage.removeItem("notifications");
    }
  };
  
  const getUnreadCount = () => {
    const count = notifications.filter(n => !n.read).length;
    return count;
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    getUnreadCount
  };
}; 