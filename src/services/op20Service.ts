import { getContract, IOP20Contract, OP_20_ABI, JSONRpcProvider } from "opnet";
import { networks } from "@btc-vision/bitcoin";

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

    async getTokenMetadata(): Promise<TokenMetadata> {
        const op20Contract = await this.getOp20Contract();

        const name = await op20Contract.name();
        const symbol = await op20Contract.symbol();
        const decimals = await op20Contract.decimals();
        const maxSupply = await op20Contract.maximumSupply();
        const totalSupply = await op20Contract.totalSupply();

        try {
            return {
                name: name.properties.name,
                symbol: symbol.properties.symbol,
                decimals: decimals.properties.decimals,
                maxSupply: maxSupply.properties.maximumSupply.toString(),
                totalSupply: totalSupply.properties.totalSupply.toString(),
            };
        } catch (error) {
            throw new Error(`Failed to fetch token metadata: ${error}`);
        }
    }
}

export default provider;
