
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNotificationsStore } from "@/store/notificationsStore";
import { detectFraud as apiDetectFraud } from "./api";
import { Transaction } from "./mockData";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyA7WL5Pisv7OhJ8XReH1d-erUTFwjoeh48");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Fraud detection thresholds
export interface FraudDetectionOptions {
  amountThreshold?: number;
  highRiskCountries?: string[];
  unusualHours?: { start: number; end: number };
  ipMismatch?: boolean;
  velocityCheck?: boolean;
}

// Default options
const defaultOptions: FraudDetectionOptions = {
  amountThreshold: 10000,
  highRiskCountries: ["RU", "NG", "UA", "KP"],
  unusualHours: { start: 23, end: 5 },
  ipMismatch: true,
  velocityCheck: true,
};

/**
 * Simple rule-based fraud detection
 */
export const detectFraud = (transaction: any, options: FraudDetectionOptions = defaultOptions): { 
  isFraudulent: boolean; 
  reasons: string[];
  score: number;
} => {
  const reasons: string[] = [];
  let score = 0;

  // Check for high amount
  if (options.amountThreshold && transaction.amount > options.amountThreshold) {
    reasons.push(`High amount (${transaction.amount})`);
    score += 0.3;
  }

  // Check for high-risk country
  if (options.highRiskCountries && options.highRiskCountries.includes(transaction.country)) {
    reasons.push(`High-risk country (${transaction.country})`);
    score += 0.4;
  }

  // Check for unusual hours
  if (options.unusualHours) {
    const hour = new Date(transaction.timestamp).getHours();
    if (hour >= options.unusualHours.start || hour <= options.unusualHours.end) {
      reasons.push(`Unusual hours (${hour}:00)`);
      score += 0.2;
    }
  }

  // Check for IP mismatch (using mock data here)
  if (options.ipMismatch && transaction.ipCountry !== transaction.country) {
    reasons.push(`IP country mismatch (IP: ${transaction.ipCountry}, Billing: ${transaction.country})`);
    score += 0.5;
  }

  // Check for velocity (multiple transactions in short time)
  if (options.velocityCheck && transaction.recentTransactions > 5) {
    reasons.push(`High velocity (${transaction.recentTransactions} transactions recently)`);
    score += 0.4;
  }

  return {
    isFraudulent: score >= 0.5,
    reasons,
    score: parseFloat(score.toFixed(2)),
  };
};

/**
 * Advanced fraud detection using Gemini AI
 */
export const detectFraudWithAI = async (transaction: any): Promise<{
  isFraudulent: boolean;
  reasons: string[];
  score: number;
  aiAnalysis: string;
}> => {
  try {
    // First perform rule-based detection
    const ruleBasedResult = detectFraud(transaction);
    
    // Prepare transaction data for AI analysis
    const transactionData = JSON.stringify(transaction, null, 2);
    
    // Construct the prompt for Gemini
    const prompt = `Analyze this SubPaisa transaction for potential fraud:
    ${transactionData}
    
    Consider these risk factors:
    1. Transaction amount (high amounts are riskier)
    2. Country of origin (some countries have higher fraud rates)
    3. Time of transaction (unusual hours may indicate fraud)
    4. User history and behavior patterns
    5. IP location vs billing address location
    
    Format your response as JSON with these fields:
    - isFraudulent: boolean indicating if you think this is fraudulent
    - confidenceScore: number between 0 and 1
    - reasoning: string explaining your analysis
    `;

    // Make request to Gemini using the SDK
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    let aiResult;
    
    try {
      // Extract JSON from the response text
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      // Fallback to rule-based result
      return {
        ...ruleBasedResult,
        aiAnalysis: "AI analysis failed, using rule-based detection.",
      };
    }
    
    // Combine AI and rule-based results
    const combinedScore = (ruleBasedResult.score + (aiResult.confidenceScore || 0)) / 2;
    const isFraudulent = combinedScore > 0.5 || aiResult.isFraudulent;
    
    // Create a notification if fraud is detected
    if (isFraudulent) {
      const { addNotification } = useNotificationsStore.getState();
      addNotification({
        transactionId: transaction.id,
        timestamp: new Date().toISOString(),
        title: "Fraud Alert: Suspicious Transaction Detected",
        description: `Transaction ${transaction.id.substring(0, 8)}... flagged with ${Math.round(combinedScore * 100)}% confidence. ${ruleBasedResult.reasons[0] || ""}`,
        severity: combinedScore > 0.8 ? 'high' : combinedScore > 0.6 ? 'medium' : 'low',
        transaction: transaction,
      });
    }
    
    return {
      isFraudulent,
      reasons: [...ruleBasedResult.reasons],
      score: parseFloat(combinedScore.toFixed(2)),
      aiAnalysis: aiResult.reasoning || "No detailed analysis provided.",
    };
  } catch (error) {
    console.error("Error in AI fraud detection:", error);
    toast.error("AI Detection Failed: Falling back to rule-based detection.");
    
    // Fallback to rule-based detection
    const fallbackResult = detectFraud(transaction);
    return {
      ...fallbackResult,
      aiAnalysis: "AI analysis failed, using rule-based detection.",
    };
  }
};

// Analysis helper function to evaluate transaction
export const analyzeFraudRisk = async (transaction: Transaction): Promise<{
  isFraudulent: boolean;
  isSuspicious: boolean;
  reasons: string[];
  score: number;
  status: string;
  popupMessage?: string;
  needsConfirmation: boolean;
}> => {
  try {
    // First try to use the backend API
    const apiResult = await apiDetectFraud(transaction);
    
    // Process the API response
    const needsConfirmation = apiResult.status === "Suspicious";
    const isFraudulent = apiResult.is_fraud_predicted || apiResult.status === "Fraud";
    
    if (isFraudulent || needsConfirmation) {
      const { addNotification } = useNotificationsStore.getState();
      
      // Only add notification for fraud cases, not for suspicious ones that need confirmation
      if (isFraudulent) {
        addNotification({
          transactionId: transaction.id,
          timestamp: new Date().toISOString(),
          title: "Fraud Alert: Suspicious Transaction",
          description: `Transaction ${transaction.id.substring(0, 8)}... flagged. Reason: ${apiResult.fraud_reason}`,
          severity: apiResult.fraud_score > 0.8 ? 'high' : apiResult.fraud_score > 0.6 ? 'medium' : 'low',
          transaction: {
            ...transaction,
            is_fraud_predicted: true,
            fraud_score: apiResult.fraud_score
          },
        });
      }
    }
    
    return {
      isFraudulent: isFraudulent,
      isSuspicious: needsConfirmation,
      reasons: [apiResult.fraud_reason],
      score: apiResult.fraud_score,
      status: apiResult.status,
      popupMessage: apiResult.popup_message,
      needsConfirmation: needsConfirmation
    };
  } catch (error) {
    console.error('Error in API fraud detection, falling back to local:', error);
    
    // Enhanced local fallback detection
    // Always create either a suspicious transaction or fraud alert for demo purposes
    const score = transaction.amount > 100000 ? 0.6 : Math.random() > 0.5 ? 0.75 : 0.85;
    const isFraudulent = score > 0.7;
    const isSuspicious = transaction.amount > 100000 || (!isFraudulent && score > 0.5);
    
    // Generate dynamic reasons based on the transaction
    const reasons = [];
    if (transaction.amount > 10000) reasons.push(`High amount (₹${transaction.amount.toLocaleString('en-IN')})`);
    if (new Date(transaction.timestamp).getHours() >= 22 || new Date(transaction.timestamp).getHours() <= 5) {
      reasons.push(`Unusual transaction time (${new Date(transaction.timestamp).toLocaleTimeString()})`);
    }
    if (reasons.length === 0) reasons.push("Unusual transaction pattern detected");
    
    if (isFraudulent || isSuspicious) {
      const { addNotification } = useNotificationsStore.getState();
      
      // Only add notification for fraud cases that aren't suspicious
      if (isFraudulent && !isSuspicious) {
        addNotification({
          transactionId: transaction.id,
          timestamp: new Date().toISOString(),
          title: "Fraud Alert: Suspicious Transaction",
          description: `Transaction ${transaction.id.substring(0, 8)}... flagged. Reasons: ${reasons.join(", ")}`,
          severity: score > 0.8 ? 'high' : score > 0.6 ? 'medium' : 'low',
          transaction: {
            ...transaction,
            is_fraud_predicted: true,
            fraud_score: score
          },
        });
      }
    }
    
    return {
      isFraudulent,
      isSuspicious,
      reasons,
      score,
      status: isSuspicious ? "Suspicious" : (isFraudulent ? "Fraud" : "Complete"),
      popupMessage: isSuspicious ? "Please verify this high-value transaction before processing." : undefined,
      needsConfirmation: isSuspicious
    };
  }
};

// Test function for the Gemini API
export const testGeminiAPI = async (): Promise<boolean> => {
  try {
    // Use the SDK to make a simple test request
    const result = await model.generateContent("Respond with 'Gemini API is working correctly' if you receive this message.");
    const response = await result.response;
    const text = response.text();
    
    console.log("Gemini API test response:", text);
    return text.includes("working correctly");
  } catch (error) {
    console.error("Gemini API test failed:", error);
    return false;
  }
};
