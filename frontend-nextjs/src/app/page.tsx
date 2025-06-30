"use client";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/app/components/loadingSpinner"

export default function Home() {
  const account = useCurrentAccount()

  // initial app state
  const [appState, setAppState] = useState<appStateType>('loading')

  type appStateType = "connected" | "unconnected" | "updating" | "loading"

  const getAppState = () => {
    if (!account){
      setAppState("unconnected")
    }
  }
  // spinner text
  const getSpinnerText = (state: appStateType) => {
    switch(state){
      case 'loading':
        return "Loading"
      case 'unconnected':
        return "Connecting"
      case 'connected':
        return ''
      case "updating":
        return ''
    }
  }

  const formatAddress = (address: string): string => {
    return address.slice(0, 6)
  }
  
  //component lifecycle
  useEffect(() => {
    if(account){
      setAppState("connected")
    } else if (!account){
      setAppState("unconnected")
    }
  }, [account])


  return (
    <section className="mx-auto w-[90%] h-[calc(85vh-60px)]">
      { appState == "loading" ? (
        <LoadingSpinner text={getSpinnerText(appState)} />
      ):(
        <p>Connected address: {account?.address ? formatAddress(account?.address) : "Connect a wallet"}</p>
      )}
    </section>
  )
}
