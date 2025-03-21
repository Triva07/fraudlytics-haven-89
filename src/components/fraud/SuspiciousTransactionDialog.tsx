
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShieldAlert, AlertCircle, CheckCircle } from 'lucide-react';
import { Transaction } from '@/utils/mockData';
import { confirmTransaction } from '@/utils/api';
import { toast } from 'sonner';
import { useNotificationsStore } from '@/store/notificationsStore';

interface SuspiciousTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  fraudDetails: {
    fraudReason: string;
    fraudScore: number;
    popupMessage?: string;
  } | null;
  onConfirm: () => void;
}

const SuspiciousTransactionDialog: React.FC<SuspiciousTransactionDialogProps> = ({
  open,
  onOpenChange,
  transaction,
  fraudDetails,
  onConfirm
}) => {
  const addNotification = useNotificationsStore(state => state.addNotification);
  
  const handleMarkAsFraud = () => {
    if (transaction) {
      addNotification({
        transactionId: transaction.id,
        timestamp: new Date().toISOString(),
        title: "Transaction Marked as Fraud",
        description: `Transaction ${transaction.id.substring(0, 8)}... has been manually marked as fraud.`,
        severity: 'high',
        transaction: {
          ...transaction,
          is_fraud_reported: true,
          is_fraud_predicted: true,
          fraud_score: fraudDetails?.fraudScore || 0.9
        },
      });
      
      toast.success("Transaction marked as fraud", {
        description: "The transaction has been flagged and added to fraud alerts"
      });
      
      onOpenChange(false);
      onConfirm();
    }
  };
  
  const handleConfirmTransaction = async () => {
    if (transaction) {
      try {
        await confirmTransaction(transaction.id);
        
        toast.success("Transaction confirmed as legitimate", {
          description: "The transaction has been verified and will be processed"
        });
        
        onOpenChange(false);
        onConfirm();
      } catch (error) {
        console.error("Error confirming transaction:", error);
      }
    }
  };
  
  if (!transaction || !fraudDetails) return null;
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center mb-2">
            <ShieldAlert className="h-6 w-6 text-amber-500 mr-2" />
            <AlertDialogTitle>Suspicious Transaction Detected</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            <div className="space-y-4">
              <div className="border rounded-md p-4 bg-amber-50 dark:bg-amber-950/30">
                <p className="text-sm font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-amber-600" />
                  {fraudDetails.popupMessage || "This transaction requires verification before processing."}
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Transaction Details:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Amount:</div>
                  <div className="font-medium">₹{transaction.amount.toLocaleString('en-IN')}</div>
                  
                  <div className="text-muted-foreground">Payment Method:</div>
                  <div className="font-medium">{transaction.paymentMode}</div>
                  
                  <div className="text-muted-foreground">Transaction ID:</div>
                  <div className="font-medium">{transaction.id.substring(0, 12)}...</div>
                  
                  <div className="text-muted-foreground">Reason:</div>
                  <div className="font-medium">{fraudDetails.fraudReason}</div>
                  
                  <div className="text-muted-foreground">Risk Score:</div>
                  <div className="font-medium">{Math.round(fraudDetails.fraudScore * 100)}%</div>
                </div>
              </div>
              
              <p className="text-sm">
                Please confirm whether this transaction should be processed or marked as fraudulent.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleMarkAsFraud}
            className="bg-fraud-dark hover:bg-fraud text-white">
            Mark as Fraud
          </AlertDialogAction>
          <AlertDialogAction 
            onClick={handleConfirmTransaction}
            className="bg-safe-dark hover:bg-safe text-white flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirm as Legitimate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuspiciousTransactionDialog;
