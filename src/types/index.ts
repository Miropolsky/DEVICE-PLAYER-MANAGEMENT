export interface Place {
  balances: number;
  currency: string;
  device_id: number;
  place: number;
}

export interface Device {
  created_at: string;
  id: number;
  name: string;
  places: Place[];
  updated_at: string;
}

export interface Player {
  id: number;
  name: string;
  balance: number;
  deviceId: number;
  place: number;
  currency: string;
  lastActivity?: string;
}

export interface BalanceOperation {
  playerId: number;
  amount: number;
  operation: 'deposit' | 'withdraw';
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface UpdateBalanceResponse {
  balances: number;
  currency: string;
  device_id: number;
  place: number;
}

