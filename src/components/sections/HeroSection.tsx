import { useTranslation } from 'react-i18next';
import LabelValue from '../LabelValue';
import type { TokenMetadata } from '../../services/op20Service';
import { OP20Service } from '../../services/op20Service';

interface HeroSectionProps {
  tokenMetadata: TokenMetadata | null;
  op20Service: OP20Service;
}

const HeroSection = ({ tokenMetadata, op20Service }: HeroSectionProps) => {
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

          {tokenMetadata && (
            <div className="bg-slate-800/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-slate-700 mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">{t('main.tokenInfo.title')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <LabelValue label={t('main.tokenInfo.name')} value={tokenMetadata.name} />
                <LabelValue label={t('main.tokenInfo.symbol')} value={tokenMetadata.symbol} />
                <LabelValue label={t('main.tokenInfo.decimals')} value={tokenMetadata.decimals} />
                <LabelValue label={t('main.tokenInfo.maxSupply')} value={tokenMetadata.maxSupply} />
                <LabelValue label={t('main.tokenInfo.totalSupply')} value={tokenMetadata.totalSupply} />
                <LabelValue label={t('main.tokenInfo.address')} value={op20Service.getTokenAddress()} valueSize="xs" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
