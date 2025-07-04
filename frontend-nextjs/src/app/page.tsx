"use client";
//components
import LoadingSpinner from "@/app/components/loadingSpinner"
import ProfileDisplay from "./components/profileDisplay";
import ProfileForm from "./components/profileForm";
import LandingPage from "./components/landing";
import { useWalletStatus } from "./hooks/useWalletStatus";
export default function Home() {

  const {
    account,
    status,
    isLoading,
    isWalletConnected,
    hasProfile,
    profile
  } = useWalletStatus()



  return (
    <section className="mx-auto w-[90%] relative h-[calc(100vh+15vh)] max-h-fit">
      { isLoading ? (
        <LoadingSpinner className="text-slate-50" text={ status === "checking-wallet" ? "Connecting Wallet" : "Loading Profile" } />
      ):
      !isWalletConnected ? (
        <LandingPage/>
      ) : (
        hasProfile && account ? (
          <ProfileDisplay profile={profile} />
        ) : (
          <ProfileForm address={account?.address} profile={profile} />
        )
        
      )}
    </section>
  )
}
