import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900/50 py-8 text-center">
      <div className="max-w-6xl mx-auto px-8">
        <p className="text-slate-400">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
