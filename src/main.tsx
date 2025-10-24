import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WalletConnectProvider } from '@btc-vision/walletconnect'
import './index.css'
import './i18n'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletConnectProvider>
      <App />
    </WalletConnectProvider>
  </StrictMode>,
)
