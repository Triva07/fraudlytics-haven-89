import { SubpaisaTransaction } from "@/models/Transaction";
import { Transaction } from "@/utils/mockData";

// The raw transaction data
export const rawTransactionData: SubpaisaTransaction[] = [
  {
    transaction_amount: 3606,
    transaction_date: "01-11-2024 00:00",
    transaction_channel: "w",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 10,
    payment_gateway_bank_anonymous: 0,
    payer_browser_anonymous: 2993,
    payer_email_anonymous: "ed340a2dbe10dda41f6f3d13062d039cb879008fc2106f711587f46c61794bab",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "",
    transaction_id_anonymous: "ANON_0",
    payee_id_anonymous: "ANON_0"
  },
  {
    transaction_amount: 599,
    transaction_date: "01-11-2024 00:00",
    transaction_channel: "mobile",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 10,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 3563,
    payer_email_anonymous: "6cf63ef7f4782059aa490765be32afeb1b9e87cd093bca7bf7c420e9bc6fcf21",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX180.0",
    transaction_id_anonymous: "ANON_1",
    payee_id_anonymous: "ANON_1"
  },
  {
    transaction_amount: 30,
    transaction_date: "01-11-2024 00:00",
    transaction_channel: "w",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 10,
    payment_gateway_bank_anonymous: 0,
    payer_browser_anonymous: 2454,
    payer_email_anonymous: "ed340a2dbe10dda41f6f3d13062d039cb879008fc2106f711587f46c61794bab",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "",
    transaction_id_anonymous: "ANON_2",
    payee_id_anonymous: "ANON_0"
  },
  {
    transaction_amount: 99,
    transaction_date: "01-11-2024 00:00",
    transaction_channel: "mobile",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 11,
    payment_gateway_bank_anonymous: 0,
    payer_browser_anonymous: 1023,
    payer_email_anonymous: "33946b46bf9e7d45468661551a1d810e3051b9a9fb935a6db53e2e64634ae5c8",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX653.0",
    transaction_id_anonymous: "ANON_3",
    payee_id_anonymous: "ANON_2"
  },
  {
    transaction_amount: 299,
    transaction_date: "01-11-2024 00:01",
    transaction_channel: "mobile",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 11,
    payment_gateway_bank_anonymous: 0,
    payer_browser_anonymous: 3683,
    payer_email_anonymous: "8aa13ceb67f69868b3ab8cf2d75b7336413e64237ba858ef717a50408c905de1",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX353.0",
    transaction_id_anonymous: "ANON_4",
    payee_id_anonymous: "ANON_1"
  },
  {
    transaction_amount: 3510,
    transaction_date: "01-11-2024 00:01",
    transaction_channel: "w",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 0,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 12,
    payer_email_anonymous: "ed340a2dbe10dda41f6f3d13062d039cb879008fc2106f711587f46c61794bab",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "",
    transaction_id_anonymous: "ANON_5",
    payee_id_anonymous: "ANON_0"
  },
  {
    transaction_amount: 10,
    transaction_date: "01-11-2024 00:03",
    transaction_channel: "w",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 0,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 12,
    payer_email_anonymous: "ed340a2dbe10dda41f6f3d13062d039cb879008fc2106f711587f46c61794bab",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "",
    transaction_id_anonymous: "ANON_6",
    payee_id_anonymous: "ANON_0"
  },
  {
    transaction_amount: 299,
    transaction_date: "01-11-2024 00:03",
    transaction_channel: "mobile",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 11,
    payment_gateway_bank_anonymous: 0,
    payer_browser_anonymous: 3755,
    payer_email_anonymous: "e57de59fbff612f9a935aeb812132f97b6f0438ef911b3b7da73fb8bbf776d5d",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX842.0",
    transaction_id_anonymous: "ANON_7",
    payee_id_anonymous: "ANON_1"
  },
  {
    transaction_amount: 205.9,
    transaction_date: "01-11-2024 00:03",
    transaction_channel: "W",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 0,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 12,
    payer_email_anonymous: "edc2be45b2c014a534ff17f364472a3681ea42eaabdd32bb967ba9b6c6c92330",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX152.0",
    transaction_id_anonymous: "ANON_8",
    payee_id_anonymous: "ANON_3"
  },
  {
    transaction_amount: 710,
    transaction_date: "01-11-2024 00:03",
    transaction_channel: "w",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 0,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 12,
    payer_email_anonymous: "ed340a2dbe10dda41f6f3d13062d039cb879008fc2106f711587f46c61794bab",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "",
    transaction_id_anonymous: "ANON_9",
    payee_id_anonymous: "ANON_0"
  },
  {
    transaction_amount: 28554,
    transaction_date: "01-11-2024 00:04",
    transaction_channel: "w",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 10,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 2600,
    payer_email_anonymous: "ed5bbb7b0ef9a4c5c7afa00b81b19a81f59c370efa3f75759b7bd4f30188e2b3",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX011.0",
    transaction_id_anonymous: "ANON_10",
    payee_id_anonymous: "ANON_4"
  },
  {
    transaction_amount: 10,
    transaction_date: "01-11-2024 00:04",
    transaction_channel: "w",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 0,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 12,
    payer_email_anonymous: "ed340a2dbe10dda41f6f3d13062d039cb879008fc2106f711587f46c61794bab",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "",
    transaction_id_anonymous: "ANON_11",
    payee_id_anonymous: "ANON_0"
  },
  {
    transaction_amount: 710,
    transaction_date: "01-11-2024 00:05",
    transaction_channel: "w",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 0,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 12,
    payer_email_anonymous: "ed340a2dbe10dda41f6f3d13062d039cb879008fc2106f711587f46c61794bab",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "",
    transaction_id_anonymous: "ANON_12",
    payee_id_anonymous: "ANON_0"
  },
  {
    transaction_amount: 299,
    transaction_date: "01-11-2024 00:05",
    transaction_channel: "mobile",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 11,
    payment_gateway_bank_anonymous: 0,
    payer_browser_anonymous: 3817,
    payer_email_anonymous: "e0d99bb125c29ddf1fd481b45c7ac5c75143747331bc73a9bfc44216049a4479",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX349.0",
    transaction_id_anonymous: "ANON_13",
    payee_id_anonymous: "ANON_1"
  },
  {
    transaction_amount: 299,
    transaction_date: "01-11-2024 00:05",
    transaction_channel: "mobile",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 11,
    payment_gateway_bank_anonymous: 0,
    payer_browser_anonymous: 1847,
    payer_email_anonymous: "23360d12a434595f879b682eb23fbad0b104887e5603f1a53b9276eaed5e5418",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX218.0",
    transaction_id_anonymous: "ANON_14",
    payee_id_anonymous: "ANON_1"
  },
  {
    transaction_amount: 299,
    transaction_date: "01-11-2024 00:06",
    transaction_channel: "mobile",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 11,
    payment_gateway_bank_anonymous: 0,
    payer_browser_anonymous: 1947,
    payer_email_anonymous: "82f0f235008f31e36f1e941d36f3932f231e285a0c36bb94b0690163ccb3b256",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX040.0",
    transaction_id_anonymous: "ANON_15",
    payee_id_anonymous: "ANON_1"
  },
  {
    transaction_amount: 205.9,
    transaction_date: "01-11-2024 00:06",
    transaction_channel: "W",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 0,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 12,
    payer_email_anonymous: "1f4d3965e1442f786d21bd3a35e0cd6d539b70b9dbd08b75c35794f703dda93c",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX004.0",
    transaction_id_anonymous: "ANON_16",
    payee_id_anonymous: "ANON_3"
  },
  {
    transaction_amount: 30,
    transaction_date: "01-11-2024 00:07",
    transaction_channel: "w",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 0,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 12,
    payer_email_anonymous: "ed340a2dbe10dda41f6f3d13062d039cb879008fc2106f711587f46c61794bab",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "",
    transaction_id_anonymous: "ANON_17",
    payee_id_anonymous: "ANON_0"
  },
  {
    transaction_amount: 599,
    transaction_date: "01-11-2024 00:07",
    transaction_channel: "mobile",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 11,
    payment_gateway_bank_anonymous: 0,
    payer_browser_anonymous: 940,
    payer_email_anonymous: "f9700b67e54e80c6e1a4e945b7d95c482f6bb60893c50fec6f348bf31068daed",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX660.0",
    transaction_id_anonymous: "ANON_18",
    payee_id_anonymous: "ANON_1"
  },
  {
    transaction_amount: 999,
    transaction_date: "01-11-2024 00:08",
    transaction_channel: "mobile",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 10,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 2003,
    payer_email_anonymous: "f0a31f033049eed0a0182abc6e4b9d32fe4c94d3b4cb56581e34a6e4b00dfa0b",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX505.0",
    transaction_id_anonymous: "ANON_19",
    payee_id_anonymous: "ANON_1"
  },
  {
    transaction_amount: 40,
    transaction_date: "01-11-2024 00:08",
    transaction_channel: "w",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 0,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 12,
    payer_email_anonymous: "ed340a2dbe10dda41f6f3d13062d039cb879008fc2106f711587f46c61794bab",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "",
    transaction_id_anonymous: "ANON_20",
    payee_id_anonymous: "ANON_0"
  },
  {
    transaction_amount: 10,
    transaction_date: "01-11-2024 00:08",
    transaction_channel: "w",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 0,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 12,
    payer_email_anonymous: "ed340a2dbe10dda41f6f3d13062d039cb879008fc2106f711587f46c61794bab",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "",
    transaction_id_anonymous: "ANON_21",
    payee_id_anonymous: "ANON_0"
  },
  {
    transaction_amount: 100,
    transaction_date: "01-11-2024 00:08",
    transaction_channel: "w",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 0,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 12,
    payer_email_anonymous: "ed340a2dbe10dda41f6f3d13062d039cb879008fc2106f711587f46c61794bab",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "",
    transaction_id_anonymous: "ANON_22",
    payee_id_anonymous: "ANON_0"
  },
  {
    transaction_amount: 299,
    transaction_date: "01-11-2024 00:09",
    transaction_channel: "mobile",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 11,
    payment_gateway_bank_anonymous: 0,
    payer_browser_anonymous: 1014,
    payer_email_anonymous: "b34cc2ffe31d644727905b552f23e349cefed80ccdd6eae436f89e37dd5e99aa",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX626.0",
    transaction_id_anonymous: "ANON_23",
    payee_id_anonymous: "ANON_1"
  },
  {
    transaction_amount: 25104,
    transaction_date: "01-11-2024 00:09",
    transaction_channel: "w",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 10,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 2600,
    payer_email_anonymous: "ed5bbb7b0ef9a4c5c7afa00b81b19a81f59c370efa3f75759b7bd4f30188e2b3",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX011.0",
    transaction_id_anonymous: "ANON_24",
    payee_id_anonymous: "ANON_5"
  },
  {
    transaction_amount: 299,
    transaction_date: "01-11-2024 00:09",
    transaction_channel: "mobile",
    is_fraud: 0,
    transaction_payment_mode_anonymous: 10,
    payment_gateway_bank_anonymous: 6,
    payer_browser_anonymous: 3644,
    payer_email_anonymous: "151e274f9c4a2fa8b9428cc19a71b5fdef514dafd9553d892686444eea5e15fd",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX856.0",
    transaction_id_anonymous: "ANON_25",
    payee_id_anonymous: "ANON_1"
  },
  {
    transaction_amount: 8999,
    transaction_date: "01-11-2024 12:22",
    transaction_channel: "mobile",
    is_fraud: 1,
    transaction_payment_mode_anonymous: 10,
    payment_gateway_bank_anonymous: 0,
    payer_browser_anonymous: 2104,
    payer_email_anonymous: "ac5f89e2ef35b7c5b4a5e14891fa297ca95aae40dd593a8d3589b864cd566d42",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX721.0",
    transaction_id_anonymous: "ANON_F1",
    payee_id_anonymous: "ANON_F1"
  },
  {
    transaction_amount: 12500,
    transaction_date: "01-11-2024 03:17",
    transaction_channel: "w",
    is_fraud: 1,
    transaction_payment_mode_anonymous: 11,
    payment_gateway_bank_anonymous: 5,
    payer_browser_anonymous: 1432,
    payer_email_anonymous: "f731c9eada96cf8e8f608af5d4b41ab847196b4c751ec386bcac317ca0356f98",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX118.0",
    transaction_id_anonymous: "ANON_F2",
    payee_id_anonymous: "ANON_F2"
  },
  {
    transaction_amount: 7530,
    transaction_date: "01-11-2024 22:45",
    transaction_channel: "mobile",
    is_fraud: 1,
    transaction_payment_mode_anonymous: 2,
    payment_gateway_bank_anonymous: 14,
    payer_browser_anonymous: 3872,
    payer_email_anonymous: "b3a9f44efd9f7f35ee79d90d9a5b8979c7b8de2eabff83eec12aa4e9032fde11",
    payee_ip_anonymous: "773220d255be3b46b7bacc6ef9bc3174aeb7fa962080961bdf119860b2f1b71b",
    payer_mobile_anonymous: "XXXXX909.0",
    transaction_id_anonymous: "ANON_F3",
    payee_id_anonymous: "ANON_F3"
  }
];

// Function to convert the raw data to the format expected by the Transaction component
export const getFormattedTransactions = (): Transaction[] => {
  return rawTransactionData.map((transaction, index) => {
    // Ensure status is one of the allowed values
    const status: "completed" | "pending" | "failed" | "flagged" = 
      transaction.is_fraud ? 'flagged' : 'completed';
    
    // Map channel to allowed values
    const channel: 'mobile' | 'web' | 'atm' | 'in-store' | 'api' = 
      transaction.transaction_channel.toLowerCase() === 'mobile' 
        ? 'mobile' 
        : 'web';
    
    // Create a valid paymentMode
    const paymentMode: 'credit_card' | 'debit_card' | 'bank_transfer' | 'upi' | 'wallet' = 
      transaction.transaction_payment_mode_anonymous === 10 ? 'credit_card' :
      transaction.transaction_payment_mode_anonymous === 11 ? 'debit_card' :
      transaction.transaction_payment_mode_anonymous === 0 ? 'bank_transfer' :
      transaction.transaction_payment_mode_anonymous === 2 ? 'upi' : 'wallet';
    
    // Create a valid paymentGateway
    const paymentGateway: 'stripe' | 'paypal' | 'braintree' | 'razorpay' | 'internal' = 
      transaction.payment_gateway_bank_anonymous === 6 ? 'razorpay' :
      transaction.payment_gateway_bank_anonymous === 0 ? 'stripe' :
      transaction.payment_gateway_bank_anonymous === 5 ? 'paypal' :
      transaction.payment_gateway_bank_anonymous === 14 ? 'braintree' : 'internal';
    
    return {
      id: transaction.transaction_id_anonymous,
      amount: transaction.transaction_amount,
      currency: "INR",
      timestamp: new Date(transaction.transaction_date).toISOString(),
      status: status,
      payer: {
        id: `payer-${index}`,
        name: `Payer ${index} (${transaction.payer_email_anonymous.substring(0, 8)}...)`,
        bank: `Bank ${transaction.payment_gateway_bank_anonymous}`
      },
      payee: {
        id: transaction.payee_id_anonymous,
        name: `Payee ${transaction.payee_id_anonymous}`,
        bank: `Bank ${transaction.payment_gateway_bank_anonymous}`
      },
      channel: channel,
      paymentMode: paymentMode,
      paymentGateway: paymentGateway,
      is_fraud_predicted: Boolean(transaction.is_fraud),
      is_fraud_reported: Boolean(transaction.is_fraud),
      fraud_score: transaction.is_fraud ? 0.85 : 0.15,
      fraud_reason: transaction.is_fraud ? "Unusual transaction pattern" : null,
      fraud_source: transaction.is_fraud ? "model" : null
    };
  });
};

// Get transaction stats
export const getTransactionStats = () => {
  const totalTransactions = rawTransactionData.length;
  const fraudulentTransactions = rawTransactionData.filter(t => t.is_fraud === 1).length;
  
  return {
    totalTransactions,
    fraudulentTransactions,
    fraudPercentage: (fraudulentTransactions / totalTransactions) * 100,
    totalAmount: rawTransactionData.reduce((sum, t) => sum + t.transaction_amount, 0),
    webTransactions: rawTransactionData.filter(t => t.transaction_channel.toLowerCase() === 'w').length,
    mobileTransactions: rawTransactionData.filter(t => t.transaction_channel.toLowerCase() === 'mobile').length
  };
};
