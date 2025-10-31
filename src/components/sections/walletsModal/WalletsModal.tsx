import { WalletInformation } from "@btc-vision/walletconnect";
import WalletOptionItem from "../../walletOptionItem/WalletOptionItem";
import './walletsModal.css';

const WalletsModal = ({ showModal, onClose, wallets, handleSelect }:
    { showModal: boolean, onClose: () => void, wallets: WalletInformation[], handleSelect: (name: string) => void }) => {

    if (!showModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h1>Wallets</h1>
                    <button className="modal-header-close" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-content">
                    <span className="modal-content-title">Select a wallet to connect</span>
                    {wallets.map((wallet) => {
                        if (!wallet.isInstalled) return null;

                        return (
                            <WalletOptionItem key={wallet.name} name={wallet.name} icon={wallet.icon} handleSelect={handleSelect} />
                        )}
                    )}
                </div>
                <div className="modal-footer">
                    <button className="modal-footer-cancel" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}


export default WalletsModal;