// Lygos Pay Integration Service
// Documentation: https://docs.lygosapp.com

export interface LygosPaymentRequest {
  amount: number;
  currency: 'XAF'; // FCFA
  phoneNumber: string;
  operator: 'MTN_MOMO_CMR' | 'ORANGE_MONEY_CMR' | 'MTN_MOMO_CI' | 'ORANGE_MONEY_CI' | 'WAVE_SN';
  orderId: string;
  description: string;
  successUrl: string;
  failureUrl: string;
}

export interface LygosPaymentResponse {
  id: string;
  status: 'pending' | 'success' | 'failed';
  amount: number;
  currency: string;
  link?: string;
  message?: string;
}

export interface LygosGatewayRequest {
  title: string;
  amount: number;
  description: string;
  successUrl: string;
  failureUrl: string;
}

// Plans pricing in FCFA
export const PLANS_PRICING = {
  free: {
    monthly: 0,
    yearly: 0,
  },
  pro: {
    monthly: 9900, // ~15€
    yearly: 99000, // ~150€ (-17%)
  },
  business: {
    monthly: 29900, // ~45€
    yearly: 299000, // ~450€ (-17%)
  },
} as const;

// Format FCFA amount
export const formatFCFA = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
};

// Create a payment gateway link (for card payments)
export const createPaymentGateway = async (
  request: LygosGatewayRequest
): Promise<LygosPaymentResponse> => {
  // This would be called from an edge function with the API key
  // For now, we mock the response
  console.log('Creating Lygos payment gateway:', request);
  
  return {
    id: `lgw_${Date.now()}`,
    status: 'pending',
    amount: request.amount,
    currency: 'XAF',
    link: `https://pay.lygosapp.com/gateway/${Date.now()}`,
  };
};

// Initiate mobile money payment
export const initiateMobilePayment = async (
  request: LygosPaymentRequest
): Promise<LygosPaymentResponse> => {
  // This would be called from an edge function with the API key
  // For now, we mock the response
  console.log('Initiating Lygos mobile payment:', request);
  
  return {
    id: `lmo_${Date.now()}`,
    status: 'pending',
    amount: request.amount,
    currency: 'XAF',
    message: 'Un SMS vous sera envoyé pour confirmer le paiement.',
  };
};

// Verify payment status
export const verifyPayment = async (paymentId: string): Promise<LygosPaymentResponse> => {
  // This would verify the payment status via API
  console.log('Verifying Lygos payment:', paymentId);
  
  return {
    id: paymentId,
    status: 'success',
    amount: 0,
    currency: 'XAF',
  };
};

// Available mobile money operators
export const MOBILE_OPERATORS = [
  { id: 'MTN_MOMO_CMR', name: 'MTN Mobile Money', country: 'Cameroun', flag: '🇨🇲' },
  { id: 'ORANGE_MONEY_CMR', name: 'Orange Money', country: 'Cameroun', flag: '🇨🇲' },
  { id: 'MTN_MOMO_CI', name: 'MTN Mobile Money', country: "Côte d'Ivoire", flag: '🇨🇮' },
  { id: 'ORANGE_MONEY_CI', name: 'Orange Money', country: "Côte d'Ivoire", flag: '🇨🇮' },
  { id: 'WAVE_SN', name: 'Wave', country: 'Sénégal', flag: '🇸🇳' },
] as const;

export type MobileOperator = typeof MOBILE_OPERATORS[number]['id'];
