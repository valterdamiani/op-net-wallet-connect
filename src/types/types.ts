import { Address as AddressType } from "@btc-vision/transaction";

export enum ConnectionState {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected'
}

export enum TransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed'
}

export interface TransactionModalState {
  isOpen: boolean;
  transactionHash: string;
  status: TransactionStatus;
  errorMessage?: string;
}

export type Address = AddressType | null;