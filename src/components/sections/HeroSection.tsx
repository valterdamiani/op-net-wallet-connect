import { useTranslation } from 'react-i18next';
import WalletSection from './WalletSection';
import TokenInfoSection from './TokenInfoSection';
import { ConnectionState, Address } from '../../types/types';
import { ConnectedData } from '../../services/op20Service';

interface HeroSectionProps {
  tokenMetadata: {
    name: string;
    symbol: string;
    decimals: number;
    maxSupply: string;
    totalSupply: string;
  } | null;
  connectedData: ConnectedData | null;
  address: Address;
  isConnected: boolean;
  connectionState: ConnectionState;
  connectWallet: () => void;
  disconnectWallet: () => void;
  onTransfer: (recipient: string, amount: string, address: Address) => Promise<void>;
  isTransferring: boolean;
}

const HeroSection = ({
  tokenMetadata,
  connectedData,
  address,
  isConnected,
  connectionState,
  connectWallet,
  disconnectWallet,
  onTransfer,
  isTransferring,
}: HeroSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="py-8 sm:py-16 text-center" data-testid="hero-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="hero-title">
            {t('main.title')}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 leading-relaxed" data-testid="hero-subtitle">
            {t('main.subtitle')}
          </p>

        <div data-testid="wallet-section">
          <WalletSection 
            isConnected={isConnected} 
            connectionState={connectionState}
            address={address}
            connectedData={connectedData}
            disconnectWallet={disconnectWallet}
            handleConnectWallet={connectWallet}
            onTransfer={onTransfer}
            isTransferring={isTransferring}
          />
        </div>

          {tokenMetadata && (
            <div data-testid="token-info-section">
              <TokenInfoSection
                tokenMetadata={tokenMetadata}
                connectedData={connectedData}
                isConnected={isConnected}
              />
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
