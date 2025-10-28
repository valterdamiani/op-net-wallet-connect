/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPNET_RPC_URL: string
  readonly VITE_MOTO_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
