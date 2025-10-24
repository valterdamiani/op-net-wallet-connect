import { useTranslation } from 'react-i18next';
import WalletSection from './WalletSection';
import TokenInfoSection from './TokenInfoSection';
import { ConnectionState } from '../../types/connection';
import { TransactionType, TransactionStatus } from '../../types/transaction';
import { ConnectedData } from '../../services/op20Service';

interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  timestamp: Date;
  amount?: string;
  recipient?: string;
  spender?: string;
}

interface HeroSectionProps {
  tokenMetadata: {
    name: string;
    symbol: string;
    decimals: number;
    maxSupply: string;
    totalSupply: string;
  } | null;
  connectedData: ConnectedData | null;
  transactions: Transaction[];
  address: string | null;
  isConnected: boolean;
  connectionState: ConnectionState;
  connectWallet: () => void;
  disconnectWallet: () => void;
  onTransfer: (recipient: string, amount: string) => Promise<void>;
  isTransferring: boolean;
}

const HeroSection = ({
  tokenMetadata,
  connectedData,
  transactions,
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
    <section className="py-8 sm:py-16 text-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {t('main.title')}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 leading-relaxed">
            {t('main.subtitle')}
          </p>

        <WalletSection 
          isConnected={isConnected} 
          connectionState={connectionState}
          address={address}
          connectedData={connectedData}
          transactions={transactions}
          disconnectWallet={disconnectWallet}
          handleConnectWallet={connectWallet}
          onTransfer={onTransfer}
          isTransferring={isTransferring}
        />

          {tokenMetadata && (
            <TokenInfoSection
              tokenMetadata={tokenMetadata}
              address={address}
              isConnected={isConnected}
            />
          )}

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
