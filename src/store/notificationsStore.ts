
import { create } from 'zustand';
import { toast } from '@/hooks/use-toast';
import { Transaction } from '@/utils/mockData';

export interface FraudNotification {
  id: string;
  transactionId: string;
  timestamp: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  read: boolean;
  reviewed: boolean;
  reviewedBy?: string;
  reviewNotes?: string;
  transaction: Transaction;
}

interface NotificationsState {
  notifications: FraudNotification[];
  unreadCount: number;
  addNotification: (notification: {
    transactionId: string;
    timestamp: string;
    title: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
    transaction: Transaction;
  }) => void;
  markAsRead: (id: string) => void;
  markAsReviewed: (id: string, reviewedBy: string, reviewNotes?: string) => void;
  getUnreadCount: () => number;
  getUnreviewedNotifications: () => FraudNotification[];
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  
  addNotification: (notification) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newNotification: FraudNotification = {
      ...notification,
      id,
      read: false,
      reviewed: false,
    };
    
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
    
    // Show toast notification
    toast({
      title: notification.title,
      description: notification.description,
      variant: "destructive",
    });
    
    // Try to use browser notifications if available and permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.description,
        icon: '/favicon.ico'
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  },
  
  markAsRead: (id) => {
    set((state) => {
      const notificationIndex = state.notifications.findIndex(n => n.id === id);
      if (notificationIndex === -1) return state;
      
      const wasUnread = !state.notifications[notificationIndex].read;
      
      const updatedNotifications = [...state.notifications];
      updatedNotifications[notificationIndex] = {
        ...updatedNotifications[notificationIndex],
        read: true
      };
      
      return {
        notifications: updatedNotifications,
        unreadCount: wasUnread ? state.unreadCount - 1 : state.unreadCount
      };
    });
  },
  
  markAsReviewed: (id, reviewedBy, reviewNotes) => {
    set((state) => {
      const notificationIndex = state.notifications.findIndex(n => n.id === id);
      if (notificationIndex === -1) return state;
      
      const updatedNotifications = [...state.notifications];
      updatedNotifications[notificationIndex] = {
        ...updatedNotifications[notificationIndex],
        read: true,
        reviewed: true,
        reviewedBy,
        reviewNotes
      };
      
      // Show toast when alert is reviewed
      toast({
        title: "Fraud alert reviewed",
        description: `The alert has been ${reviewNotes?.includes('Confirmed') ? 'confirmed' : 'dismissed'} as fraud.`,
        variant: reviewNotes?.includes('Confirmed') ? "destructive" : "default",
      });
      
      return {
        notifications: updatedNotifications,
        unreadCount: state.notifications[notificationIndex].read ? state.unreadCount : state.unreadCount - 1
      };
    });
  },
  
  getUnreadCount: () => get().unreadCount,
  
  getUnreviewedNotifications: () => {
    return get().notifications.filter(notification => !notification.reviewed);
  }
}));
