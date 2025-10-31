import { useState, useEffect, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import AboutSection from '../components/sections/AboutSection';
import TransactionModal from '../components/TransactionModal';
import { OP20Service, ConnectedData } from '../services/op20Service';
import { useWalletConnect } from '@btc-vision/walletconnect';
import { ConnectionState, Address, TransactionStatus, TransactionModalState } from '../types/types';
import WalletsModal from '../components/sections/walletsModal/WalletsModal';

const MainPage = () => {
  const { t } = useTranslation();
  const { address, walletAddress, disconnect, publicKey, connectToWallet, openConnectModal, allWallets, connecting } = useWalletConnect();

  const [tokenMetadata, setTokenMetadata] = useState<{
    name: string;
    symbol: string;
    decimals: number;
    maxSupply: string;
    totalSupply: string;
  } | null>(null);
  const [connectedData, setConnectedData] = useState<ConnectedData | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.DISCONNECTED);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transactionModal, setTransactionModal] = useState<TransactionModalState>({
    isOpen: false,
    transactionHash: '',
    status: TransactionStatus.PENDING
  });
  const [showModal, setShowModal] = useState(false);
  const [useCustomConnectModal, setUseCustomConnectModal] = useState(false);
  const op20Service = useMemo(() => new OP20Service(), []);

  const isConnected = !!address;

  const closeTransactionModal = () => {
    setTransactionModal({
      isOpen: false,
      transactionHash: '',
      status: TransactionStatus.PENDING,
      errorMessage: undefined
    });
  };

  const nativeConnectModal = async () => {
    try {
      await openConnectModal();
    } catch (error) {
      toast.error(t('main.notifications.failedToOpenModal', { error: error }));
    }
  }

  const connectModal = async (wallet: string) => {
    try {
      setShowModal(false);
      await connectToWallet(wallet);
    } catch (error) {
      setShowModal(false);
      toast.error(t('main.notifications.failedToOpenModal', { error: error }));
    }
  }

  const handleConnectWallet = async () => {
    if (useCustomConnectModal) {
      setShowModal(true);

      return;
    }

    await nativeConnectModal();

    return;
  };

  const handleDisconnectWallet = async () => {
    try {
      setConnectionState(ConnectionState.DISCONNECTED);
      await disconnect();
    } catch (error) {
      toast.error(t('main.notifications.failedToDisconnect', { error: error }));
    }
  };

  const handleTransfer = async (inputAddress: string, amountString: string, address: Address) => {
    setIsTransferring(true);

    if (!walletAddress || !address) {
      toast.error(t('main.notifications.failedToTransfer', { error: 'Wallet address or input address is not available' }));
      setIsTransferring(false);
      return;
    }

    try {
      const transaction = await op20Service.safeTransferTokens(walletAddress, inputAddress, amountString, address);
      const transactionHash = transaction?.transactionId || t('main.notifications.unknownTransactionHash');

      setTransactionModal({
        isOpen: true,
        transactionHash: transactionHash,
        status: TransactionStatus.SUCCESS
      });

      toast.success(t('main.notifications.tokensTransferred', { hash: transactionHash.substring(0, 10) }));
      setIsTransferring(false);
    } catch (error) {

      const errorMessage = error instanceof Error ? error.message : String(error);
      setTransactionModal({
        isOpen: true,
        transactionHash: t('main.notifications.noTransactionHash'),
        status: TransactionStatus.FAILED,
        errorMessage: errorMessage
      });

      toast.error(t('main.notifications.failedToTransfer', { error: error }));
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
    const loadTokenMetadata = async () => {
      try {
        const metadata = await op20Service.getTokenMetadata();
        setTokenMetadata(metadata);
      } catch (error) {
        toast.error(t('main.notifications.failedToLoadMetadata', { error: error }));
      }
    };

    void loadTokenMetadata();
  }, [op20Service, t]);

  useEffect(() => {
    const loadConnectedData = async () => {
      if (isConnected && address) {
        try {
          if (!publicKey) {
            throw new Error(t('main.notifications.publicKeyNotAvailable'));
          }
          const data = await op20Service.getConnectedData(publicKey);
          setConnectedData(data);
        } catch (error) {
          toast.error(t('main.notifications.failedToLoadConnectedData', { error: error }));
        }
      } else {
        setConnectedData(null);
      }
    };

    void loadConnectedData();
  }, [isConnected, address, publicKey, op20Service, t]);

  useEffect(() => {
    if (connecting && !isConnected) {
      setConnectionState(ConnectionState.CONNECTING);
    } else if (!connecting && isConnected) {
      setConnectionState(ConnectionState.CONNECTED);
    } else {
      setConnectionState(ConnectionState.DISCONNECTED);
    }
  }, [connecting, isConnected])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      <Header />

      <main className="flex-1">
        <HeroSection
          tokenMetadata={tokenMetadata}
          connectedData={connectedData}
          isConnected={isConnected}
          connectionState={connectionState}
          connectWallet={() => handleConnectWallet()}
          address={address}
          disconnectWallet={handleDisconnectWallet}
          onTransfer={handleTransfer}
          isTransferring={isTransferring}
          useCustomConnectModal={useCustomConnectModal}
          setUseCustomConnectModal={setUseCustomConnectModal}
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

      <WalletsModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        wallets={allWallets}
        handleSelect={(wallet) => connectModal(wallet)} />

      <TransactionModal
        isOpen={transactionModal.isOpen}
        onClose={closeTransactionModal}
        transactionHash={transactionModal.transactionHash}
        status={transactionModal.status}
        errorMessage={transactionModal.errorMessage}
      />
    </div>
  );
};

export default MainPage;
