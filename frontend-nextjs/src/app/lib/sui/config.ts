import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { WalrusClient } from "@mysten/walrus";

type Network = "devnet" | "testnet" | "mainnet"
export const network: Network = "devnet"

export const suiClient = new SuiClient({
    url: getFullnodeUrl(network)
})
export const  walrusClient = new WalrusClient({
    suiClient,
    network:'testnet',
    storageNodeClientOptions: {
        fetch: (url, options) => {
            console.log('fetching', url);
            return fetch(url, options);
        },
        timeout: 30_000,
	},
})

export const packageAddress = `${process.env.PACKAGE_ID}::${process.env.PACKAGE_NAME}`