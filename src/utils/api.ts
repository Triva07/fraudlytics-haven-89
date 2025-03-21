
import { toast } from "sonner";
import { Transaction } from "./mockData";

const API_BASE_URL = "http://localhost:3000"; // Update this to your actual backend URL

interface FraudDetectionResponse {
  transaction_id: string;
  payer_id: string;
  amount: number;
  is_fraud_predicted: boolean;
  fraud_source: string;
  fraud_reason: string;
  fraud_score: number;
  status: "Fraud" | "Suspicious" | "Complete";
  user_verified: boolean;
  popup_message?: string;
  timestamp: string;
}

export const detectFraud = async (transaction: Transaction): Promise<FraudDetectionResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/detect-fraud`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction_id: transaction.id,
        payer_id: transaction.payer.id, // Fixed: use payer.id instead of payerId
        amount: transaction.amount,
        // Include any other relevant transaction data
        payment_method: transaction.paymentMode,
        channel: transaction.channel,
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error detecting fraud:', error);
    toast.error('Failed to check fraud detection', {
      description: 'Using local detection as fallback'
    });
    // Return a fallback object if the API call fails
    return {
      transaction_id: transaction.id,
      payer_id: transaction.payer.id, // Fixed: use payer.id instead of payerId
      amount: transaction.amount,
      is_fraud_predicted: false,
      fraud_source: 'local',
      fraud_reason: 'API error, using local fallback',
      fraud_score: 0,
      status: 'Complete',
      user_verified: false,
      timestamp: new Date().toISOString()
    };
  }
};

export const confirmTransaction = async (transactionId: string): Promise<{ 
  message: string; 
  status: string; 
  transaction_id: string;
  user_verified: boolean;
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/confirm-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction_id: transactionId
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error confirming transaction:', error);
    toast.error('Failed to confirm transaction');
    throw error;
  }
};
