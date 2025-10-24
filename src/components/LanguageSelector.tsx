import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GlobeIcon from '../assets/globe-icon.svg';
import ChevronDownIcon from '../assets/chevron-down-icon.svg';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const languages = [
    { code: 'en', name: t('language.english'), codeDisplay: 'EN' },
    { code: 'fr', name: t('language.french'), codeDisplay: 'FR' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-slate-800/80 backdrop-blur-sm border text-slate-300 rounded-md px-2 py-1 text-sm font-normal hover:bg-slate-700/40 transition-all duration-300 cursor-pointer w-20 flex items-center justify-center ${
          isOpen ? 'border-cyan-400/60' : 'border-slate-600/50'
        }`}
        aria-label={t('language.select')}
      >
        <span className="flex items-center gap-1.5">
          <img 
            src={GlobeIcon} 
            alt="Globe" 
            className="w-4 h-4" 
          />
          {currentLanguage.codeDisplay}
          <img 
            src={ChevronDownIcon} 
            alt="Chevron" 
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 w-20 mt-1 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-md shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full px-2 py-1.5 text-sm font-normal text-left hover:bg-slate-700/40 transition-colors duration-300 flex items-center gap-1.5 first:rounded-t-md last:rounded-b-md ${
                lang.code === i18n.language ? 'bg-slate-700/20 text-cyan-400/80' : 'text-slate-300/80'
              }`}
            >
              <img 
                src={GlobeIcon} 
                alt="Globe" 
                className="w-4 h-4" 
              />
              {lang.codeDisplay}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
