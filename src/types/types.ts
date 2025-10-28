import { Address as AddressType } from "@btc-vision/transaction";

export enum ConnectionState {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected'
}

export type Address = AddressType | null;