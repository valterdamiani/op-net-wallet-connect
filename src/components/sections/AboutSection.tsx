import { useTranslation } from 'react-i18next';
import Section from '../Section';
import InfoRow from '../InfoRow';

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <Section title={t('about.title')} className="py-16" id="about">
      <p className="text-lg text-white/90 leading-relaxed mb-8 text-center">
        {t('about.description')}
      </p>
      <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-xl border border-slate-700 text-center">
        <InfoRow label={t('about.network')} value={t('about.networkValue')} />
        <InfoRow label={t('about.chainId')} value={t('about.chainIdValue')} />
        <InfoRow label={t('about.rpcUrl')} value={t('about.rpcUrlValue')} />
        <InfoRow label={t('about.tokenStandard')} value={t('about.tokenStandardValue')} isLast />
      </div>
    </Section>
  );
};

export default AboutSection;
