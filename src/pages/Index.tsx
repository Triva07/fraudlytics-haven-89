
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import { ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

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

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const subpaisaTransactions = getFormattedTransactions();
      
      // Make sure all transactions are from SubPaisa payment gateway
      const updatedTransactions = subpaisaTransactions.map(t => ({
        ...t,
        paymentGateway: 'subpaisa' as 'subpaisa'
      }));
      
      setTransactions(updatedTransactions);
      
      // Calculate metrics for consistency between dashboard and analytics
      const calculatedMetrics = calculateFraudMetrics(updatedTransactions);
      setMetrics(calculatedMetrics);
      
      setChannelData(generateFraudByCategory(updatedTransactions, 'channel'));
      setPaymentModeData(generateFraudByCategory(updatedTransactions, 'paymentMode'));
      
      // Generate time series data
      const timeSeries = generateTimeSeriesData(updatedTransactions, 30);
      setTimeSeriesData(timeSeries);
      
      setStats(getTransactionStats());
      setIsLoading(false);
      
      // Show success toast
      toast.success("Dashboard data loaded successfully", {
        description: "Showing SubPaisa transaction analytics"
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const addDemoAlert = () => {
    // Get a random transaction that's marked as fraudulent
    const fraudulentTransactions = transactions.filter(t => t.is_fraud_predicted);
    if (fraudulentTransactions.length === 0) return;
    
    const randomTransaction = fraudulentTransactions[Math.floor(Math.random() * fraudulentTransactions.length)];
    
    addNotification({
      id: `fraud-${Date.now()}`,
      transactionId: randomTransaction.id,
      timestamp: new Date().toISOString(),
      title: "New Fraud Alert: Suspicious Transaction",
      description: `Transaction ${randomTransaction.id.substring(0, 8)}... has been flagged as potentially fraudulent with ${Math.round(randomTransaction.fraud_score * 100)}% confidence score.`,
      severity: randomTransaction.fraud_score > 0.8 ? 'high' : randomTransaction.fraud_score > 0.6 ? 'medium' : 'low',
      transaction: randomTransaction,
      read: false,
      reviewed: false
    });
    
    // Show notification toast
    toast.warning("New fraud alert", {
      description: "A transaction has been flagged for review",
      action: {
        label: "View",
        onClick: () => document.getElementById("notifications-button")?.click()
      }
    });
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
            variant="outline" 
            onClick={addDemoAlert}
            className="flex items-center space-x-2"
          >
            <ShieldAlert className="w-4 h-4 text-fraud-dark" />
            <span>Demo Fraud Alert</span>
          </Button>
        </div>
        
        {metrics && <MetricsCards metrics={metrics} />}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FraudGraph data={timeSeriesData} />
          <AnalyticsSection 
            channelData={channelData}
            paymentModeData={paymentModeData}
            paymentGatewayData={[{ name: "SubPaisa", value: transactions.length }]}
          />
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
          <TransactionTable transactions={transactions.slice(0, 10)} />
        </div>
      </motion.div>
    </Dashboard>
  );
};

export default Index;
