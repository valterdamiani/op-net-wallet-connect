import { useTranslation } from 'react-i18next';
import LabelValue from '../LabelValue';
import WalletSection from './WalletSection';
import { ConnectionState } from '../../types/connection';
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
  address: string | null;
  isConnected: boolean;
  connectionState: ConnectionState;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const HeroSection = ({
  tokenMetadata,
  connectedData,
  address,
  isConnected,
  connectionState,
  connectWallet,
  disconnectWallet,
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
          disconnectWallet={disconnectWallet}
          handleConnectWallet={connectWallet}
        />

          {tokenMetadata && (
            <div className="bg-slate-800/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-slate-700 mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 text-center">{t('main.tokenInfo.title')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <LabelValue label={t('main.tokenInfo.name')} value={tokenMetadata.name} centered={true} />
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <LabelValue label={t('main.tokenInfo.symbol')} value={tokenMetadata.symbol} centered={true} />
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <LabelValue label={t('main.tokenInfo.decimals')} value={tokenMetadata.decimals} centered={true} />
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <LabelValue label={t('main.tokenInfo.maxSupply')} value={tokenMetadata.maxSupply} centered={true} />
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <LabelValue label={t('main.tokenInfo.totalSupply')} value={tokenMetadata.totalSupply} centered={true} />
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg sm:col-span-2 lg:col-span-1">
                  <LabelValue
                    label={t('main.tokenInfo.address')}
                    value={address ? address.toString() : t('main.wallet.notConnected')}
                    showCopyButton={true}
                    centered={!isConnected ? true : false}
                    isConnected={isConnected}
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
