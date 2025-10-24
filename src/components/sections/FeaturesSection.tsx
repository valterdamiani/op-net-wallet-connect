import { useTranslation } from 'react-i18next';
import Section from '../Section';
import Card from '../Card';

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <Section title={t('features.title')} className="py-16 bg-slate-800/30 backdrop-blur-md" id="features">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          icon="🔗"
          title={t('features.walletConnect.title')}
          description={t('features.walletConnect.description')}
        />
        <Card
          icon="📊"
          title={t('features.tokenMetadata.title')}
          description={t('features.tokenMetadata.description')}
        />
        <Card
          icon="💰"
          title={t('features.balanceAllowance.title')}
          description={t('features.balanceAllowance.description')}
        />
        <Card
          icon="⚡"
          title={t('features.transactions.title')}
          description={t('features.transactions.description')}
        />
        <Card
          icon="🌐"
          title={t('features.opnetTestnet.title')}
          description={t('features.opnetTestnet.description')}
        />
        <Card
          icon="🛡️"
          title={t('features.secure.title')}
          description={t('features.secure.description')}
        />
      </div>
    </Section>
  );
};

export default FeaturesSection;
