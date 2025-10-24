/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPNET_RPC_URL: string
  readonly VITE_OPNET_CHAIN_ID: string
  readonly VITE_OPNET_CHAIN_NAME: string
  readonly VITE_OPNET_CURRENCY_NAME: string
  readonly VITE_OPNET_CURRENCY_SYMBOL: string
  readonly VITE_OPNET_CURRENCY_DECIMALS: string
  readonly VITE_OP20_TOKEN_ADDRESS: string
  readonly VITE_OP20_SPENDER_ADDRESS: string
  readonly VITE_WALLETCONNECT_PROJECT_ID: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_APP_URL: string
  readonly VITE_APP_ICON: string
  readonly VITE_METHOD_HASH_NAME: string
  readonly VITE_METHOD_HASH_SYMBOL: string
  readonly VITE_METHOD_HASH_DECIMALS: string
  readonly VITE_METHOD_HASH_MAX_SUPPLY: string
  readonly VITE_METHOD_HASH_TOTAL_SUPPLY: string
  readonly VITE_METHOD_HASH_BALANCE_OF: string
  readonly VITE_METHOD_HASH_ALLOWANCE: string
  readonly VITE_METHOD_HASH_APPROVE: string
  readonly VITE_METHOD_HASH_TRANSFER: string
  readonly VITE_METHOD_HASH_DEFAULT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
