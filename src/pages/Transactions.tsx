
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Dashboard from '@/components/layout/Dashboard';
import TransactionTable from '@/components/dashboard/TransactionTable';
import { generateTransactions } from '@/utils/mockData';

const Transactions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState(generateTransactions(50));

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setTransactions(generateTransactions(100));
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5
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
          <p className="text-muted-foreground">Loading transactions...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <Dashboard 
      title="Transaction Management" 
      subtitle="View and manage all payment transactions"
    >
      <motion.div
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        <TransactionTable transactions={transactions} />
      </motion.div>
    </Dashboard>
  );
};

export default Transactions;
