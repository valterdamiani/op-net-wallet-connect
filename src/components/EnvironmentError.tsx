
import { useTranslation } from 'react-i18next';

interface EnvironmentErrorProps {
  missingVariables: string[];
}

const EnvironmentError = ({ missingVariables }: EnvironmentErrorProps) => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      <div className="max-w-2xl mx-auto px-8 py-12">
        <div className="bg-red-900/20 border border-red-500/50 rounded-2xl p-8 backdrop-blur-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-red-400" data-testid="configuration-error-title">{t('environment.configurationError')}</h1>
              <p className="text-red-200">{t('environment.missingVariables')}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-slate-300 mb-4">
              {t('environment.requiredVariables')}
            </p>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
              <ul className="space-y-2">
                {missingVariables.map((variable, index) => (
                  <li key={index} className="text-red-300 font-mono text-sm">
                    {variable}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('environment.howToFix')}</h3>
              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>{t('environment.copyEnvExample')}</li>
                <li>{t('environment.fillValues')}</li>
                <li>{t('environment.restartServer')}</li>
              </ol>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">{t('environment.quickSetup')}</h4>
              <div className="bg-slate-800 rounded p-3 font-mono text-sm">
                <div className="text-slate-400">{t('environment.copyExampleFile')}</div>
                <div className="text-cyan-400">cp env.example .env</div>
                <div className="text-slate-400 mt-2">{t('environment.editWithValues')}</div>
                <div className="text-cyan-400">{t('environment.restartServerComment')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentError;
