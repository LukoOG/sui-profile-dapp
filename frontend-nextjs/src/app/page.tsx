"use client";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useState, useEffect } from "react";
import { useProfile } from "@/app/hooks/useProfile"
//components
import LoadingSpinner from "@/app/components/loadingSpinner"
import ProfileDisplay from "./components/profileDisplay";
import ProfileForm from "./components/profileForm";
import LandingPage from "./components/landing";
export default function Home() {
  const account = useCurrentAccount()

  const address = account?.address || null
  const {profile, loading} = useProfile(address)

  const isConnected = !!account;
  let isLoading = loading || (isConnected && loading);
  const hasProfile = !!profile;

  let spinnerText: string;
  spinnerText = isConnected ? "Loading Profile..." : "Connecting wallet..."

  useEffect(()=>{
    // console.log(loading, isLoading)
  }, [loading])

  console.log(account)

  return (
    <section className="mx-auto w-[90%] h-[calc(85vh-60px)]">
      { isLoading ? (
        <LoadingSpinner text={spinnerText} />
      ):
      !isConnected ? (
        <LandingPage/>
      ) : (
        hasProfile ? (
          <ProfileDisplay profile={profile} />
        ) : (
          <ProfileForm address={address} />
        )
        
      )}
    </section>
  )
}
