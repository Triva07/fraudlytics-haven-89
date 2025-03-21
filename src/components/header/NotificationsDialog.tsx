
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, AlertTriangle, Clock, Info, ShieldAlert } from 'lucide-react';
import Badge from '@/components/ui-custom/Badge';
import { cn } from '@/lib/utils';
import { useNotificationsStore, FraudNotification } from '@/store/notificationsStore';
import FraudReviewDialog from '@/components/fraud/FraudReviewDialog';
import { formatDistanceToNow } from 'date-fns';

interface NotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type NotificationType = 'success' | 'warning' | 'info' | 'pending' | 'fraud';

interface GeneralNotification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: NotificationType;
}

const NotificationsDialog: React.FC<NotificationsDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { notifications, markAsRead } = useNotificationsStore();
  const [selectedFraudNotification, setSelectedFraudNotification] = useState<FraudNotification | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  
  const [generalNotifications, setGeneralNotifications] = React.useState<GeneralNotification[]>([
    {
      id: 1,
      title: 'New fraud pattern detected',
      description: 'Our system detected a new fraud pattern in recent transactions.',
      time: '10 minutes ago',
      read: false,
      type: 'warning'
    },
    {
      id: 2,
      title: 'Rule update successful',
      description: 'Rule "High Amount Transaction" was updated successfully.',
      time: '1 hour ago',
      read: false,
      type: 'success'
    },
    {
      id: 3,
      title: 'Weekly fraud report',
      description: 'Your weekly fraud report is now available.',
      time: '3 hours ago',
      read: true,
      type: 'info'
    },
    {
      id: 4,
      title: 'System maintenance',
      description: 'Scheduled maintenance in 2 days.',
      time: '1 day ago',
      read: true,
      type: 'pending'
    },
  ]);

  const markGeneralAsRead = (id: number) => {
    setGeneralNotifications(generalNotifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleFraudNotificationClick = (notification: FraudNotification) => {
    markAsRead(notification.id);
    setSelectedFraudNotification(notification);
    setReviewDialogOpen(true);
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-safe-dark" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'fraud':
        return <ShieldAlert className="h-5 w-5 text-fraud-dark" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-600" />;
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  // Format the timestamp using date-fns
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error);
      return timestamp;
    }
  };

  // Combine both types of notifications
  const allNotifications = [
    ...notifications.map(n => ({
      id: n.id,
      title: n.title,
      description: n.description,
      time: formatTimestamp(n.timestamp),
      read: n.read,
      type: 'fraud' as NotificationType,
      fraudData: n
    })),
    ...generalNotifications.map(n => ({
      id: String(n.id),
      title: n.title,
      description: n.description,
      time: n.time,
      read: n.read,
      type: n.type,
      fraudData: null
    }))
  ].sort((a, b) => {
    if (a.read === b.read) return 0;
    return a.read ? 1 : -1;
  });

  const unreadCount = allNotifications.filter(n => !n.read).length;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="danger" size="sm">
                  {unreadCount}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
            {allNotifications.length > 0 ? (
              allNotifications.map(notification => (
                <div 
                  key={notification.id}
                  className={cn(
                    "flex items-start space-x-4 p-4 rounded-lg border cursor-pointer",
                    notification.read ? "bg-background" : "bg-muted/30",
                    notification.type === 'fraud' && !notification.read && "border-fraud/50"
                  )}
                  onClick={() => {
                    if (notification.fraudData) {
                      handleFraudNotificationClick(notification.fraudData);
                    } else {
                      markGeneralAsRead(Number(notification.id));
                    }
                  }}
                >
                  <div className="mt-0.5">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={cn(
                        "font-medium",
                        !notification.read && "font-semibold"
                      )}>
                        {notification.title}
                      </h4>
                      {notification.type === 'fraud' && (
                        <Badge 
                          variant="danger" 
                          size="sm"
                        >
                          {notification.fraudData?.reviewed ? 'Reviewed' : 'Needs Review'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">
                      {notification.time}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No notifications
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <FraudReviewDialog 
        notification={selectedFraudNotification}
        open={reviewDialogOpen}
        onOpenChange={setReviewDialogOpen}
      />
    </>
  );
};

export default NotificationsDialog;
