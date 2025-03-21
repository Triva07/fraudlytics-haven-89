
import React, { useState } from 'react';
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
import { ShieldAlert, AlertCircle, CheckCircle, PhoneCall, XCircle } from 'lucide-react';
import { Transaction } from '@/utils/mockData';
import { confirmTransaction } from '@/utils/api';
import { toast } from 'sonner';
import { useNotificationsStore } from '@/store/notificationsStore';
import { motion } from 'framer-motion';

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
  const [loading, setLoading] = useState(false);
  const [callingUser, setCallingUser] = useState(false);
  const addNotification = useNotificationsStore(state => state.addNotification);
  
  const handleMarkAsFraud = async () => {
    if (transaction) {
      setLoading(true);
      
      try {
        // Add a small delay to simulate processing
        await new Promise(resolve => setTimeout(resolve, 700));
        
        addNotification({
          transactionId: transaction.id,
          timestamp: new Date().toISOString(),
          title: "Transaction Marked as Fraud",
          description: `Transaction ${transaction.id.substring(0, 8)}... has been marked as fraud.`,
          severity: 'high',
          transaction: {
            ...transaction,
            is_fraud_reported: true,
            is_fraud_predicted: true,
            fraud_score: fraudDetails?.fraudScore || 0.9
          },
        });
        
        toast.success("Transaction marked as fraud", {
          description: "The transaction has been flagged in the system"
        });
        
        onOpenChange(false);
        onConfirm();
      } catch (error) {
        console.error("Error marking as fraud:", error);
        toast.error("Failed to mark as fraud");
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleSimulateCall = () => {
    setCallingUser(true);
    
    // Simulate a call for 2 seconds then show result
    setTimeout(() => {
      setCallingUser(false);
      toast.success("User contacted successfully", {
        description: "The user confirmed this is a legitimate transaction"
      });
      handleConfirmTransaction();
    }, 2000);
  };
  
  const handleConfirmTransaction = async () => {
    if (transaction) {
      setLoading(true);
      
      try {
        // Add a small delay to simulate processing
        await new Promise(resolve => setTimeout(resolve, 700));
        await confirmTransaction(transaction.id);
        
        toast.success("Transaction confirmed as legitimate", {
          description: "The transaction has been verified and will be processed"
        });
        
        onOpenChange(false);
        onConfirm();
      } catch (error) {
        console.error("Error confirming transaction:", error);
        toast.error("Failed to confirm transaction");
      } finally {
        setLoading(false);
      }
    }
  };
  
  if (!transaction || !fraudDetails) return null;
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
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
                    <motion.div 
                      className="font-medium flex items-center"
                      initial={{ width: 0 }}
                      animate={{ width: 'auto' }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                        <motion.div 
                          className={`h-full rounded-full ${
                            fraudDetails.fraudScore > 0.8 ? "bg-fraud" :
                            fraudDetails.fraudScore > 0.6 ? "bg-amber-500" : "bg-amber-300"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${fraudDetails.fraudScore * 100}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                      <span>{Math.round(fraudDetails.fraudScore * 100)}%</span>
                    </motion.div>
                  </div>
                </div>
                
                <p className="text-sm">
                  Please confirm whether this transaction should be processed or marked as fraudulent.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 mt-4">
            <AlertDialogCancel disabled={loading || callingUser}>Cancel</AlertDialogCancel>
            
            <AlertDialogAction 
              onClick={handleSimulateCall}
              disabled={loading || callingUser}
              className="bg-primary hover:bg-primary/90 text-white flex items-center">
              {callingUser ? (
                <>
                  <span className="animate-pulse mr-2">●</span>
                  <span>Calling user...</span>
                </>
              ) : (
                <>
                  <PhoneCall className="h-4 w-4 mr-2" />
                  <span>Call User</span>
                </>
              )}
            </AlertDialogAction>
            
            <AlertDialogAction 
              onClick={handleMarkAsFraud}
              disabled={loading || callingUser}
              className="bg-fraud-dark hover:bg-fraud text-white flex items-center">
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Mark as Fraud
                </>
              )}
            </AlertDialogAction>
            
            <AlertDialogAction 
              onClick={handleConfirmTransaction}
              disabled={loading || callingUser}
              className="bg-safe-dark hover:bg-safe text-white flex items-center">
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm as Legitimate
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuspiciousTransactionDialog;
