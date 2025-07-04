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


const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID
const MODULE_NAME = process.env.NEXT_PUBLIC_MODULE_NAME
export const packageAddress = `${PACKAGE_ID}::${MODULE_NAME}`