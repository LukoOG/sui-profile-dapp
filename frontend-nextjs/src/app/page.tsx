"use client";
//components
import LoadingSpinner from "@/app/components/loadingSpinner"
import ProfileDisplay from "./components/profileDisplay";
import ProfileForm from "./components/profileForm";
import LandingPage from "./components/landing";
import { Button } from '@/app/components/ui/button';
import { useWalletStatus } from "./hooks/useWalletStatus";
import { Edit3 } from 'lucide-react';

export default function Home() {

  const {
    account,
    status,
    isLoading,
    isWalletConnected,
    hasProfile,
    profile,
    setProfile
  } = useWalletStatus()
  
   const handleEdit = () => {
    // setIsEditing(true);
    console.log('clicked editing')
  };


  return (
    <section className="mx-auto w-[90%] relative min-h-[calc(80vh-16px)] max-h-fit">
      { isLoading ? (
        <LoadingSpinner text={ status === "checking-wallet" ? "Connecting Wallet" : "Loading Profile" } />
      ):
      !isWalletConnected ? (
        <LandingPage/>
      ) : (
        hasProfile && account ? (
			<ProfileDisplay profile={profile} setProfile={setProfile} onEdit={handleEdit} />
        ) : (
          <ProfileForm address={account!.address} profile={profile} />
        )
        
      )}
    </section>
  )
}
