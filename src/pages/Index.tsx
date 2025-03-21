
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from '@/components/layout/Dashboard';
import MetricsCards from '@/components/dashboard/MetricsCards';
import TransactionTable from '@/components/dashboard/TransactionTable';
import FraudGraph from '@/components/dashboard/FraudGraph';
import AnalyticsSection from '@/components/dashboard/AnalyticsSection';
import { getFormattedTransactions, getTransactionStats } from '@/data/subpaisaTransactions';
import { 
  calculateFraudMetrics,
  generateFraudByCategory,
  generateTimeSeriesData,
  Transaction
} from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { useNotificationsStore } from '@/store/notificationsStore';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { analyzeFraudRisk } from '@/utils/fraudDetection';
import SuspiciousTransactionDialog from '@/components/fraud/SuspiciousTransactionDialog';

// Verify API key is properly initialized
console.log("Gemini API Key available:", !!import.meta.env.VITE_GEMINI_API_KEY);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [metrics, setMetrics] = useState(null);
  const [channelData, setChannelData] = useState([]);
  const [paymentModeData, setPaymentModeData] = useState([]);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [stats, setStats] = useState(null);
  const addNotification = useNotificationsStore(state => state.addNotification);
  const [unreviewedNotifications, setUnreviewedNotifications] = useState([]);
  const [showSuspiciousDialog, setShowSuspiciousDialog] = useState(false);
  const [suspiciousTransaction, setSuspiciousTransaction] = useState<Transaction | null>(null);
  const [fraudDetails, setFraudDetails] = useState<{
    fraudReason: string;
    fraudScore: number;
    popupMessage?: string;
  } | null>(null);
  const [isGeneratingAlert, setIsGeneratingAlert] = useState(false);
  
  // Get unreviewed notifications once on component mount
  useEffect(() => {
    const unreviewedNotifs = useNotificationsStore.getState().getUnreviewedNotifications();
    setUnreviewedNotifications(unreviewedNotifs);
  }, []);

  useEffect(() => {
    // Add console logs to track loading process
    console.log("Index component mounting");
    const timer = setTimeout(() => {
      try {
        console.log("Loading data in Index");
        const subpaisaTransactions = getFormattedTransactions();
        console.log("Transactions loaded:", subpaisaTransactions.length);
        setTransactions(subpaisaTransactions);
        
        const calculatedMetrics = calculateFraudMetrics(subpaisaTransactions);
        console.log("Metrics calculated:", calculatedMetrics);
        setMetrics(calculatedMetrics);
        
        setChannelData(generateFraudByCategory(subpaisaTransactions, 'channel'));
        setPaymentModeData(generateFraudByCategory(subpaisaTransactions, 'paymentMode'));
        
        const timeSeries = generateTimeSeriesData(subpaisaTransactions, 30);
        console.log("Time series data:", timeSeries.length);
        setTimeSeriesData(timeSeries);
        
        setStats(getTransactionStats());
        setIsLoading(false);
        
        toast.success("Dashboard data loaded successfully", {
          description: "Showing SubPaisa transaction analytics"
        });
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast.error("Failed to load dashboard data", {
          description: "Please refresh the page and try again"
        });
        setIsLoading(false);
      }
    }, 1500);

    return () => {
      console.log("Index component unmounting");
      clearTimeout(timer);
    };
  }, []);

  const addDemoAlert = async () => {
    if (isGeneratingAlert) return;
    
    setIsGeneratingAlert(true);
    
    try {
      const fraudulentTransactions = transactions.filter(t => {
        const alreadyNotified = unreviewedNotifications.some(
          n => n.transactionId === t.id
        );
        return t.is_fraud_predicted && !alreadyNotified;
      });
      
      // Create a high-value transaction that will be flagged as suspicious
      const highValueTransaction = {
        ...transactions[Math.floor(Math.random() * transactions.length)],
        id: `tx-${Date.now()}`,
        amount: 150000 + Math.floor(Math.random() * 50000), // Random high value (₹1,50,000 to ₹2,00,000)
        timestamp: new Date().toISOString()
      };
      
      toast.info("Analyzing transaction...", {
        description: "Please wait while we verify the transaction"
      });
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Analyze the transaction using our backend-compatible detection
      const result = await analyzeFraudRisk(highValueTransaction);
      
      // Update the list of unreviewed notifications
      setUnreviewedNotifications(useNotificationsStore.getState().getUnreviewedNotifications());
      
      if (result.needsConfirmation) {
        setSuspiciousTransaction(highValueTransaction);
        setFraudDetails({
          fraudReason: result.reasons[0] || "Suspicious transaction",
          fraudScore: result.score,
          popupMessage: result.popupMessage
        });
        setShowSuspiciousDialog(true);
        return;
      }
      
      if (result.isFraudulent) {
        toast.warning("New fraud alert", {
          description: "A transaction has been flagged for review",
          action: {
            label: "View",
            onClick: () => document.getElementById("notifications-button")?.click()
          }
        });
      } else {
        toast.success("Transaction verified", {
          description: "No suspicious activity detected"
        });
      }
    } catch (error) {
      console.error("Error generating demo alert:", error);
      toast.error("Failed to generate alert", {
        description: "Please try again"
      });
    } finally {
      setIsGeneratingAlert(false);
    }
  };

  const handleSuspiciousTransactionAction = () => {
    // Update notifications after handling the suspicious transaction
    setUnreviewedNotifications(useNotificationsStore.getState().getUnreviewedNotifications());
    
    // Clear suspicious transaction state
    setSuspiciousTransaction(null);
    setFraudDetails(null);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  // Add console.log to verify we're reaching the render part when data is loaded
  console.log("Rendering Index dashboard with data");

  return (
    <Dashboard 
      title="SubPaisa Fraud Detection" 
      subtitle="Monitor and analyze transaction data in real-time"
    >
      <motion.div
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        <div className="flex justify-end mb-4">
          <Button 
            variant={isGeneratingAlert ? "outline" : "default"}
            onClick={addDemoAlert}
            className={`flex items-center space-x-2 transition-all duration-300 ${isGeneratingAlert ? 'bg-muted' : 'bg-primary hover:bg-primary/90'}`}
            disabled={isGeneratingAlert}
          >
            {isGeneratingAlert ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                <span>Generating Alert...</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 mr-2 text-white" />
                <span>Demo Fraud Alert</span>
              </>
            )}
          </Button>
        </div>
        
        <AnimatePresence>
          {metrics && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <MetricsCards metrics={metrics} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FraudGraph data={timeSeriesData} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnalyticsSection 
              channelData={channelData}
              paymentModeData={paymentModeData}
              paymentGatewayData={[{ category: "SubPaisa", predictedCount: transactions.length, reportedCount: transactions.filter(t => t.is_fraud_reported).length }]}
            />
          </motion.div>
        </div>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
          <TransactionTable transactions={transactions.slice(0, 10)} />
        </motion.div>
        
        {/* Suspicious Transaction Dialog */}
        <SuspiciousTransactionDialog
          open={showSuspiciousDialog}
          onOpenChange={setShowSuspiciousDialog}
          transaction={suspiciousTransaction}
          fraudDetails={fraudDetails}
          onConfirm={handleSuspiciousTransactionAction}
        />
      </motion.div>
    </Dashboard>
  );
};

export default Index;
