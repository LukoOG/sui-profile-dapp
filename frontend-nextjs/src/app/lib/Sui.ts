import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

type Network = "devnet" | "testnet" | "mainnet"
export const network: Network = "devnet"

export const suiClient = new SuiClient({
    url: getFullnodeUrl(network)
})

export const packageAddress = `${process.env.PACKAGE_ID}::${process.env.PACKAGE_NAME}`