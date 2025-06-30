import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

type Network = "devnet" | "testnet" | "mainnet"
export const network: Network = "devnet"

export const suiClient = new SuiClient({
    url: getFullnodeUrl(network)
})