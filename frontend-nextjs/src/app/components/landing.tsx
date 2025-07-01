import { Ultra } from "next/font/google"
import Image from "next/image"
import  React  from "react"

const LandingPage: React.FC = () => {
    return (
        <div className='div-container'>
            <section className="absolute bottom-1/2 right-1/2 translate-x-[50%] translate-y-[50%] ">
                <section className="flex flex-1 basis-1 gap-1 flex-col items-center space-around text-center">
                    <div className="logo">
                        <div className="">
                            {/* <Image src={"/file.svg"} alt={"Sui logo"} height={100} width={100} /> */}
                        </div>
                    </div>
                    <div className="landing-hero">
                        <div className="">
                            <h2 className="text-3xl mb-4 text-[#1a1006de] font-bold">Welcome to Sui Profile Manager</h2>
                            <p>Create and Manage your onchain identity with ease. Connect</p>
                            <p>your wallet to get started</p>
                        </div>
                    </div>
                    <div className="details">
                        <div className="min-w-[56px] border-2 border-amber-300 rounded-lg">
                            <ul className="text-xl list-disc pl-5 p-8">
                                <li className="p-2 ml-1 my-0.5 text-sm font-light">Decentralized Storage</li>
                                <li className="p-2 ml-1 my-0.5 text-sm font-light">Secure Wallet integration</li>
                                <li className="p-2 ml-1 my-0.5 text-sm font-light">On Chain verification</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default LandingPage