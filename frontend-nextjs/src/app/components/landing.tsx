import { Ultra } from "next/font/google"
import Image from "next/image"
import  React  from "react"
import { LandingCard } from "./ui/card"

const LandingPage: React.FC = () => {
    return (
        <div className='div-container w-full'>
            <section className="absolute bottom-1/2 right-1/2 translate-x-[50%] translate-y-[50%] ">
                <section className="flex flex-1 basis-1 gap-1 flex-col items-center space-around">
                    <div className="logo">
                        <div className="">
                            <Image className="w-24 h-24" src={"/sui-logo.svg"} alt={"Profile svg"} height={100} width={100} />
                        </div>
                    </div>
                    <div className="landing-hero text-center">
                        <div className="">
                            <h2 className="text-3xl mb-4 text-slate-200 font-bold">Welcome to Sui Profile Manager</h2>
                            <p className="w-sm text-wrap">Create and Manage your onchain identity with ease. Connect your wallet to get started</p>
                        </div>
                    </div>
                    <div className="details">
                        <div className="min-w-[56px] mt-4">
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-start text-slate-300 max-w-2xl">
                                <LandingCard className="my-0.5 font-light"><span>Decentralized Storage</span></LandingCard>
                                <LandingCard className="my-0.5 font-light"><span>Secure Wallet integration</span></LandingCard>
                                <LandingCard className="my-0.5 font-light"><span>On Chain verification</span></LandingCard>
                            </ul>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default LandingPage