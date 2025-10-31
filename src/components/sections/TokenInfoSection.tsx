import { useTranslation } from 'react-i18next';
import LabelValue from '../LabelValue';
import { ConnectedData } from '../../services/op20Service';

interface TokenInfoSectionProps {
  tokenMetadata: {
    name: string;
    symbol: string;
    decimals: number;
    maxSupply: string;
    totalSupply: string;
  };
  connectedData: ConnectedData | null;
  isConnected: boolean;
}

const TokenInfoSection = ({
  tokenMetadata,
  connectedData,
  isConnected,
}: TokenInfoSectionProps) => {
  const { t } = useTranslation();

  return (
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
            value={connectedData?.tokenAddress ? connectedData?.tokenAddress : t('main.wallet.notConnected')}
            showCopyButton={true}
            centered={!isConnected ? true : false}
            isConnected={isConnected}
          />
        </div>
      </div>
    </div>
  );
};

export default TokenInfoSection;
