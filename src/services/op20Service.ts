import { getContract, IOP20Contract, OP_20_ABI, JSONRpcProvider, TransactionParameters, BitcoinUtils } from "opnet";
import { networks } from "@btc-vision/bitcoin";
import { Address, AddressVerificator } from "@btc-vision/transaction";

const network = networks.regtest;
const timeout = 10000; // 10 seconds

const provider = new JSONRpcProvider(import.meta.env.VITE_OPNET_RPC_URL, network, timeout);

export interface TokenMetadata {
    name: string;
    symbol: string;
    decimals: number;
    maxSupply: string;
    totalSupply: string;
}

export interface ConnectedData {
    userBalance: string;
    allowance: string;
    networkName: string;
}

export class OP20Service {
    private provider: JSONRpcProvider;

    constructor() {
        this.provider = provider;
    }

    async getOp20Contract(): Promise<IOP20Contract> {
        return await getContract<IOP20Contract>(
            import.meta.env.VITE_MOTO_TOKEN,
            OP_20_ABI,
            this.provider,
            networks.regtest
        );
    }

    async getConectedData(publicKey: string): Promise<ConnectedData> {
        if (!publicKey) {
            throw new Error('Public key is required to get connected data');
        }
        const address = Address.fromString(publicKey);

        const publicKeyInfo = await provider.getPublicKeyInfo(address);
        const chainId = await this.provider.getChainId();
        const network = await this.provider.getNetwork();

        const op20Contract = await this.getOp20Contract();
        const userBalance = await op20Contract.balanceOf(publicKeyInfo);
        const allowance = await op20Contract.allowance(address, address);

        const networkName = network.messagePrefix + ' ( Chain ID: ' + chainId.toString() + ')';

        return {
            userBalance: userBalance.properties.balance.toString(),
            allowance: allowance.properties.remaining.toString(),
            networkName: networkName,
        };
    }

    async getTokenMetadata(): Promise<TokenMetadata> {
        const op20Contract = await this.getOp20Contract();

        const maxSupply = await op20Contract.maximumSupply();
        const metadata = await op20Contract.metadata();
        const { name, symbol, decimals, totalSupply } = metadata.properties;

        try {
            return {
                name: name,
                symbol: symbol,
                decimals: decimals,
                totalSupply: totalSupply.toString(),
                maxSupply: maxSupply.properties.maximumSupply.toString(),
            };
        } catch (error) {
            throw new Error(`Failed to fetch token metadata: ${error}`);
        }
    }

    async safeTransferTokens(walletAddress: string, inputAddress: string, amountString: string, address: Address) {
        const motoContractAddress: Address = Address.fromString(import.meta.env.VITE_MOTO_TOKEN);
        const walletAddressPublicKeyInfo = await provider.getPublicKeyInfo(walletAddress);

        const motoContract: IOP20Contract = getContract<IOP20Contract>(
            motoContractAddress,
            OP_20_ABI,
            provider,
            network,
            walletAddressPublicKeyInfo,
        );

        const tokenMetadata = await motoContract.metadata();
        const decimals: number = tokenMetadata.properties.decimals;
        const amount: bigint = BitcoinUtils.expandToDecimals(amountString, decimals);

        if (inputAddress) {
            let receiverAddress: Address;

            if (AddressVerificator.isValidPublicKey(inputAddress, network!)) {
                receiverAddress = Address.fromString(inputAddress);
            } else {
                const inputAddressType = AddressVerificator.detectAddressType(inputAddress, network!);
                if (inputAddressType === null) {
                    throw new Error('Invalid address provided');
                }
                receiverAddress = await provider!.getPublicKeyInfo(inputAddress);
            }

            const tokenTransfer = await motoContract.safeTransfer(receiverAddress, amount, new Uint8Array());

            if (tokenTransfer.revert) {
                throw new Error(`Transfer simulation failed: ${tokenTransfer.revert}`);
            }

            const params: TransactionParameters = {
                refundTo: walletAddress,
                maximumAllowedSatToSpend: 1000n,
                feeRate: 0, // zero makes it automatic
                network: network,
                from: address,
            };

            return await tokenTransfer.sendTransaction(params);
        }
    }
}

export default provider;
