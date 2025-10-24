import { useState, useEffect, useMemo, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { WalletService } from '../services/walletService';
import type { WalletInfo, TransactionResult } from '../services/walletService';
import { OP20Service } from '../services/op20Service';
import type { TokenMetadata, TokenBalance } from '../services/op20Service';
import useEnvironmentValidation from '../hooks/useEnvironmentValidation';
import EnvironmentError from '../components/EnvironmentError';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/sections/HeroSection';
import WalletSection from '../components/sections/WalletSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import AboutSection from '../components/sections/AboutSection';
import { useLoading } from '../hooks/useLoading';

const MainPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata | null>(null);
  const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
  const [transactionResult, setTransactionResult] = useState<TransactionResult | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const metadataLoadedRef = useRef(false);

  const { t } = useTranslation();
  const { isValid, missingVariables } = useEnvironmentValidation();
  const { loading: walletLoading, startLoading: startWalletLoading, stopLoading: stopWalletLoading } = useLoading();
  const { loading: transactionLoading, startLoading: startTransactionLoading, stopLoading: stopTransactionLoading } = useLoading();

  const walletService = useMemo(() => new WalletService(), []);
  const op20Service = useMemo(() => new OP20Service(), []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    console.log('useEffect running, metadataLoadedRef.current:', metadataLoadedRef.current);
    if (metadataLoadedRef.current) return;
    metadataLoadedRef.current = true;

    const loadTokenMetadata = async () => {
      console.log('Loading token metadata...');
      try {
        const metadata = await op20Service.getTokenMetadata();
        setTokenMetadata(metadata);
        console.log('Token metadata loaded successfully');
      } catch (error) {
        console.error('Error loading token metadata:', error);
        toast.error(t('main.notifications.failedToLoadMetadata'));
      }
    };

    loadTokenMetadata();
  }, [op20Service, t]);

  const connectWallet = async () => {
    try {
      startWalletLoading();

      const walletInfo = await walletService.connect();
      setWalletInfo(walletInfo);
      setIsConnected(true);

      await loadUserTokenData(walletInfo.address);
      toast.success(t('main.notifications.walletConnected'));
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error(t('main.notifications.failedToConnect'));
    } finally {
      stopWalletLoading();
    }
  };

  const disconnectWallet = async () => {
    try {
      await walletService.disconnect();
      setIsConnected(false);
      setWalletInfo(null);
      setTokenBalance(null);
      setTransactionResult(null);
      toast.success(t('main.notifications.walletDisconnected'));
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast.error(t('main.notifications.failedToDisconnect'));
    }
  };

  const loadUserTokenData = async (address: string) => {
    try {
      const balance = await op20Service.getTokenBalance(address);
      setTokenBalance(balance);
      toast.success(t('main.notifications.tokenBalanceLoaded'));
    } catch (error) {
      console.error('Error loading token data:', error);
      toast.error(t('main.notifications.failedToLoadBalance'));
    }
  };

  const handleApprove = async () => {
    if (!walletInfo) return;

    try {
      startTransactionLoading();

      const amount = '1000000000000000000'; // 1 token (18 decimals)
      const txHash = await op20Service.approveTokens(walletInfo.address, amount);

      setTransactionResult({
        hash: txHash,
        status: 'pending',
      });

      toast.success(t('main.notifications.tokensApproved', { hash: txHash.slice(0, 10) }));

      await loadUserTokenData(walletInfo.address);
    } catch (error) {
      console.error('Error approving tokens:', error);
      toast.error(t('main.notifications.failedToApprove'));
    } finally {
      stopTransactionLoading();
    }
  };

  const handleTransfer = async () => {
    if (!walletInfo) return;

    try {
      startTransactionLoading();

      const toAddress = '0x742d35Cc6634C0532925a3b8D0C0C2C0C0C0C0C0'; // Example recipient
      const amount = '100000000000000000';
      const txHash = await op20Service.transferTokens(walletInfo.address, toAddress, amount);

      setTransactionResult({
        hash: txHash,
        status: 'pending',
      });

      toast.success(t('main.notifications.tokensTransferred', { hash: txHash.slice(0, 10) }));

      await loadUserTokenData(walletInfo.address);
    } catch (error) {
      console.error('Error transferring tokens:', error);
      toast.error(t('main.notifications.failedToTransfer'));
    } finally {
      stopTransactionLoading();
    }
  };

  if (!isValid) {
    return <EnvironmentError missingVariables={missingVariables} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      <Header />

      <main className="flex-1">
        <HeroSection 
          tokenMetadata={tokenMetadata} 
          op20Service={op20Service} 
        />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <WalletSection
              isConnected={isConnected}
              walletInfo={walletInfo}
              tokenBalance={tokenBalance}
              tokenMetadata={tokenMetadata}
              transactionResult={transactionResult}
              connectWallet={connectWallet}
              disconnectWallet={disconnectWallet}
              handleApprove={handleApprove}
              handleTransfer={handleTransfer}
              walletLoading={walletLoading}
              transactionLoading={transactionLoading}
            />
          </div>
        </div>

        <FeaturesSection />
        <AboutSection />
      </main>

      <Footer />
      <ToastContainer
        position={isMobile ? "top-center" : "bottom-right"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="bg-slate-800 border border-slate-600 text-white"
        className={isMobile ? "!top-4 !left-1/2 !transform !-translate-x-1/2 !w-[calc(100%-2rem)] !max-w-sm" : "!bottom-4 !right-1"}
      />
    </div>
  );
};

export default MainPage;
