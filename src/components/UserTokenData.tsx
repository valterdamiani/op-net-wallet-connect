import { useTranslation } from 'react-i18next';
import LabelValue from './LabelValue';
import { ConnectedData } from '../services/op20Service';
import { Address } from '../types/types';

interface UserTokenDataProps {
  address: Address;
  connectedData: ConnectedData;
  isConnected: boolean;
}

const UserTokenData = ({ address, connectedData, isConnected }: UserTokenDataProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-700/50 p-4 rounded-lg mb-4" data-testid="user-token-data">
      <h4 className="text-lg font-semibold text-white mb-4">{t('main.wallet.yourTokenData')}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-600/50 p-3 rounded-lg">
          <LabelValue
            label={t('main.wallet.account')}
            value={address ? address.toString() : t('main.wallet.notConnected')}
            showCopyButton={true}
            isConnected={isConnected}
            centered={true}
          />
        </div>
        <div className="bg-slate-600/50 p-3 rounded-lg">
          <LabelValue
            label={t('main.wallet.network')}
            value={connectedData.networkName}
            centered={true}
          />
        </div>
        <div className="bg-slate-600/50 p-3 rounded-lg">
          <LabelValue
            label={t('main.wallet.balance')}
            value={connectedData.userBalance}
            centered={true}
          />
        </div>
        <div className="bg-slate-600/50 p-3 rounded-lg">
          <LabelValue
            label={t('main.wallet.allowance')}
            value={connectedData.allowance}
            centered={true}
          />
        </div>
      </div>
    </div>
  );
};

export default UserTokenData;
