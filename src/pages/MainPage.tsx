import { useState, useEffect, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import AboutSection from '../components/sections/AboutSection';
import { OP20Service, ConnectedData } from '../services/op20Service';
import { TransactionType, TransactionStatus } from '../types/transaction';

interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  timestamp: Date;
  amount?: string;
  recipient?: string;
  spender?: string;
}
import { useWalletConnect } from '@btc-vision/walletconnect';
import { ConnectionState } from '../types/connection';

const MainPage = () => {
  const { t } = useTranslation();
  const [tokenMetadata, setTokenMetadata] = useState<{
    name: string;
    symbol: string;
    decimals: number;
    maxSupply: string;
    totalSupply: string;
  } | null>(null);
  const [connectedData, setConnectedData] = useState<ConnectedData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.DISCONNECTED);
  const [isTransferring, setIsTransferring] = useState(false);
  const { address, openConnectModal, disconnect } = useWalletConnect();
  const op20Service = useMemo(() => new OP20Service(), []);

  const isConnected = !!address;

  const handleConnectWallet = () => {
    try {
      setConnectionState(ConnectionState.CONNECTING);
      openConnectModal();
    } catch (error) {
      console.error('Error opening connect modal:', error);
      setConnectionState(ConnectionState.DISCONNECTED);
      toast.error(t('main.notifications.failedToOpenModal'));
    }
  };

  const handleDisconnectWallet = () => {
    try {
      setConnectionState(ConnectionState.DISCONNECTED);
      disconnect();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast.error(t('main.notifications.failedToDisconnect'));
    }
  };

  const handleTransfer = async (recipient: string, amount: string) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsTransferring(true);
    try {
      const txHash = await op20Service.transferTokens(recipient, amount);
      
      const newTransaction: Transaction = {
        id: txHash,
        type: TransactionType.TRANSFER,
        status: TransactionStatus.SUCCESS,
        timestamp: new Date(),
        amount: amount,
        recipient: recipient,
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      
      const data = await op20Service.getConectedData();
      setConnectedData(data);
      
      toast.success(t('main.notifications.tokensTransferred', { hash: txHash.substring(0, 10) + '...' }));
    } catch (error) {
      console.error('Transfer failed:', error);
      toast.error(t('main.notifications.failedToTransfer'));
    } finally {
      setIsTransferring(false);
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (address) {
      setConnectionState(ConnectionState.CONNECTED);
    } else {
      setConnectionState(ConnectionState.DISCONNECTED);
    }
  }, [address]);

  useEffect(() => {
    const loadTokenMetadata = async () => {
      try {
        const metadata = await op20Service.getTokenMetadata();
        setTokenMetadata(metadata);
        console.log('Token metadata loaded successfully', metadata);
      } catch (error) {
        console.error('Error loading token metadata:', error);
        toast.error(t('main.notifications.failedToLoadMetadata'));
      }
    };

    void loadTokenMetadata();
  }, [op20Service, t]);

  useEffect(() => {
    const loadConnectedData = async () => {
      if (isConnected && address) {
        try {
          const data = await op20Service.getConectedData();
          setConnectedData(data);
          console.log('Connected data loaded successfully', data);
        } catch (error) {
          console.error('Error loading connected data:', error);
          toast.error('Failed to load connected data');
        }
      } else {
        setConnectedData(null);
      }
    };

    void loadConnectedData();
  }, [isConnected, address, op20Service]);

  useEffect(() => {
    if (isConnected) {
      const sampleTransactions: Transaction[] = [
        {
          id: '0x1234567890abcdef1234567890abcdef12345678',
          type: TransactionType.TRANSFER,
          status: TransactionStatus.SUCCESS,
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          amount: '100.5',
          recipient: '0xabcdef1234567890abcdef1234567890abcdef12'
        },
        {
          id: '0xabcdef1234567890abcdef1234567890abcdef12',
          type: TransactionType.APPROVE,
          status: TransactionStatus.PENDING,
          timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          amount: '50.0',
          spender: '0x9876543210fedcba9876543210fedcba98765432'
        },
        {
          id: '0x9876543210fedcba9876543210fedcba9876543210',
          type: TransactionType.TRANSFER,
          status: TransactionStatus.FAILED,
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
          amount: '25.75',
          recipient: '0x5555555555555555555555555555555555555555'
        }
      ];
      setTransactions(sampleTransactions);
    } else {
      setTransactions([]);
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      <Header />

      <main className="flex-1">
        <HeroSection
          tokenMetadata={tokenMetadata}
          connectedData={connectedData}
          transactions={transactions}
          isConnected={isConnected}
          connectionState={connectionState}
          connectWallet={handleConnectWallet}
          address={address ? address.toString() : null}
          disconnectWallet={handleDisconnectWallet}
          onTransfer={handleTransfer}
          isTransferring={isTransferring}
        />
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
