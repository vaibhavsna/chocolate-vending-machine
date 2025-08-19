export interface Chocolate {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface InventoryResponse {
  success: boolean;
  data: {
    chocolates: Chocolate[];
    userBalance: number;
  };
}

export interface PurchaseRequest {
  chocolateId: number;
  amountPaid: number;
}

export interface PurchaseResponse {
  success: boolean;
  data?: {
    success: boolean;
    message: string;
    chocolate?: Chocolate;
    amountPaid?: number;
    changeReturned?: number;
    remainingBalance?: number;
  };
  message?: string;
}

export interface RestockRequest {
  chocolateId: number;
}

export interface RestockResponse {
  success: boolean;
  data?: {
    success: boolean;
    message: string;
    chocolate?: Chocolate;
  };
  message?: string;
}

export interface BalanceResponse {
  success: boolean;
  data: {
    balance: number;
  };
}

export interface ResetResponse {
  success: boolean;
  data?: {
    success: boolean;
    message: string;
  };
  message?: string;
}
