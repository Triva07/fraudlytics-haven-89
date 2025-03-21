
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FraudNotification, useNotificationsStore } from '@/store/notificationsStore';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import Badge from '@/components/ui-custom/Badge';
import { motion } from 'framer-motion';

interface FraudReviewDialogProps {
  notification: FraudNotification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FraudReviewDialog: React.FC<FraudReviewDialogProps> = ({
  notification,
  open,
  onOpenChange,
}) => {
  const [reviewNotes, setReviewNotes] = useState("");
  const { markAsReviewed } = useNotificationsStore();

  if (!notification) return null;

  const handleReview = (isFraud: boolean) => {
    const notes = `${isFraud ? 'Confirmed' : 'Dismissed'} as fraud. ${reviewNotes}`;
    markAsReviewed(notification.id, "Engineer", notes);
    onOpenChange(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-fraud-dark" />
            <span>Fraud Review</span>
            <Badge 
              variant={notification.severity === 'high' ? 'danger' : 
                      notification.severity === 'medium' ? 'warning' : 'default'} 
              size="sm"
            >
              {notification.severity}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Review and confirm if this transaction is fraudulent
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <div className="rounded-md border p-4 bg-background/50">
            <h4 className="font-medium mb-2">Transaction Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Transaction ID:</div>
              <div className="font-mono">{notification.transaction.id.substring(0, 12)}...</div>
              
              <div className="text-muted-foreground">Amount:</div>
              <div className="font-medium">₹{notification.transaction.amount.toLocaleString()}</div>
              
              <div className="text-muted-foreground">Date:</div>
              <div>{formatDate(notification.transaction.timestamp)}</div>
              
              <div className="text-muted-foreground">Payer:</div>
              <div>{notification.transaction.payer.name}</div>
              
              <div className="text-muted-foreground">Payee:</div>
              <div>{notification.transaction.payee.name}</div>
              
              <div className="text-muted-foreground">Fraud Score:</div>
              <div className="flex items-center">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                  <div 
                    className={`h-full rounded-full ${
                      notification.transaction.fraud_score > 0.8 ? "bg-fraud" :
                      notification.transaction.fraud_score > 0.6 ? "bg-amber-500" : "bg-amber-300"
                    }`}
                    style={{ width: `${notification.transaction.fraud_score * 100}%` }}
                  />
                </div>
                <span>{Math.round(notification.transaction.fraud_score * 100)}%</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-md border p-4">
            <h4 className="font-medium mb-2">Review Notes</h4>
            <Textarea
              placeholder="Add your notes about this transaction..."
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>
        </div>
        
        <DialogFooter className="flex space-x-2 justify-end">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive"
            onClick={() => handleReview(true)}
            className="bg-fraud hover:bg-fraud-dark"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Confirm Fraud
          </Button>
          <Button 
            variant="default"
            onClick={() => handleReview(false)}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Dismiss
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FraudReviewDialog;
