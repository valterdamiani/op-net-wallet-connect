import { getContract, IOP20Contract, OP_20_ABI, JSONRpcProvider } from "opnet";
import { networks } from "@btc-vision/bitcoin";
import { Address } from "@btc-vision/transaction";

const url = "https://regtest.opnet.org";
const network = networks.regtest;
const timeout = 10000; // 10 seconds

const provider = new JSONRpcProvider(url, network, timeout);

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
            import.meta.env.VITE_OP20_TOKEN_ADDRESS,
            OP_20_ABI,
            this.provider,
            networks.regtest
        );
    }

    async getConectedData(): Promise<ConnectedData> {
        const op20Contract = await this.getOp20Contract();
        const address = Address.fromString(import.meta.env.VITE_OP20_TOKEN_ADDRESS);
        const publicKeyInfo = await provider.getPublicKeyInfo(address);

        const userBalance = await op20Contract.balanceOf(publicKeyInfo);
        const allowance = await op20Contract.allowance(address, address);
        const chainId = await this.provider.getChainId();
        const network = await this.provider.getNetwork();

        const networkName = network.messagePrefix + ' ( Chain ID: ' + chainId.toString() + ')';

        return {
            userBalance: userBalance.properties.balance.toString(),
            allowance: allowance.properties.remaining.toString(),
            networkName: networkName,
        };
    }

    async getTokenMetadata(): Promise<TokenMetadata> {
        const op20Contract = await this.getOp20Contract();

        const metadata = await op20Contract.metadata();
        const maxSupply = await op20Contract.maximumSupply();
        
        try {
            return {
                name: metadata.properties.name,
                symbol: metadata.properties.symbol,
                decimals: metadata.properties.decimals,
                totalSupply: metadata.properties.totalSupply.toString(),
                maxSupply: maxSupply.properties.maximumSupply.toString(),
            };
        } catch (error) {
            throw new Error(`Failed to fetch token metadata: ${error}`);
        }
    }

    async transferTokens(recipient: string, amount: string): Promise<string> {
        const op20Contract = await this.getOp20Contract();

        console.log('recipient', op20Contract);
        const recipientAddress = Address.fromString(recipient);
        
        try {
            const tx = await op20Contract.transfer(recipientAddress, BigInt(amount), new Uint8Array());
            return tx.toString();
        } catch (error) {
            throw new Error(`Failed to transfer tokens: ${error}`);
        }
    }
}

export default provider;
