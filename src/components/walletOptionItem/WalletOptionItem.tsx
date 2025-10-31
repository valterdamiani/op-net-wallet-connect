import './walletOptionItem.css';

interface WalletOptionItemProps {
    name: string;
    icon: string;
    handleSelect: (name: string) => void;
}

const WalletOptionItem = ({ name, icon, handleSelect }: WalletOptionItemProps) => {
    return (
        <div className="wallet-option-item" onClick={() => handleSelect(name)}>
            <img className="wallet-option-item-icon" src={icon} alt={name} />
            <span className="wallet-option-item-name">{name}</span>
        </div>
    )
}

export default WalletOptionItem;