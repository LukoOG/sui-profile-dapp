"use client";
import { ConnectButton } from "@mysten/dapp-kit"
import { Waves } from "lucide-react";
import Image from "next/image";

export default function Navbar(){
    return(
        <nav className="flex flex-row justify-between p-4 header-nav">
            <div className="mx-1 flex lex-row items-center justify-start p-3 w-[18rem]">
                <div className="mr-2">
                    {/* <Image src={"/file.svg"} width={35} height={35} alt={"Sui Logo"} /> */}
                    <Waves className="w-9 h-9 text-white" />
                </div>

                <div className="space-x-3 ml-2">
                    <h2 className="text-lg font-semibold text-amber-100 ">SUI Profile</h2>
                    <span className="text-sm contrast-more:(#99a1af) font-[400]">Onchain identity management</span>
                </div>
            </div>

            <div className="mx-1">
                <div className="flex items-center justify-start p-0.5 align-middle">
                    <ConnectButton/>
                </div>
            </div>
        </nav>
    )
}