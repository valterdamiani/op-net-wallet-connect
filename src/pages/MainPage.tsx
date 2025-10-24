import { useState, useEffect, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import AboutSection from '../components/sections/AboutSection';
import { OP20Service } from '../services/op20Service';
import { useWalletConnect } from '@btc-vision/walletconnect';
import { ConnectionState } from '../types/connection';

const MainPage = () => {
  const [tokenMetadata, setTokenMetadata] = useState<{
    name: string;
    symbol: string;
    decimals: number;
    maxSupply: string;
    totalSupply: string;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.DISCONNECTED);
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
      toast.error('Failed to open wallet connection modal');
    }
  };

  const handleDisconnectWallet = () => {
    try {
      setConnectionState(ConnectionState.DISCONNECTED);
      disconnect();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast.error('Failed to disconnect wallet');
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
        toast.error('Failed to load token metadata');
      }
    };

    void loadTokenMetadata();
  }, [op20Service]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      <Header />

      <main className="flex-1">
        <HeroSection
          tokenMetadata={tokenMetadata}
          isConnected={isConnected}
          connectionState={connectionState}
          connectWallet={handleConnectWallet}
          address={address ? address.toString() : null}
          disconnectWallet={handleDisconnectWallet}
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
