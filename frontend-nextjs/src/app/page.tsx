"use client";
import { useCurrentAccount } from "@mysten/dapp-kit"

export default function Home() {
  const account = useCurrentAccount()
  return (
    <>
    <header>
      
    </header>
      <section>
        { account && 
          (
            <p>Connected address: {account.address}</p>
          )
        }
      </section>
    </>
  )
}
