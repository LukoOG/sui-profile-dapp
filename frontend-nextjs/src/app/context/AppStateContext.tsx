"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { fetchProfileObject } from "@/app/lib/sui/utils"; // you’ll create this
import { SuiParsedData } from "@mysten/sui/client";

type AppView = "landing" | "form" | "display";
export type AppStatus =
  | 'checking-wallet'
  | 'disconnected'
  | 'loading-profile'
  | 'ready-with-profile'
  | 'ready-no-profile';

interface AppState {
  view: AppView;
  setView: (v: AppView) => void;
  status: AppStatus;
  profile: SuiParsedData | null | undefined;
  setProfile: (p: SuiParsedData | null) => void;
  isEditing: boolean;
  setEditing: (b: boolean) => void;
  isLoadingProfile: boolean;
  refetchProfile: () => Promise<void>;
  address: string | null;
  isWalletConnected: boolean;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
    const account = useCurrentAccount();
    const address = account?.address || null;
    const [view, setView] = useState<AppView>("landing");
    const [profile, setProfile] = useState<SuiParsedData | null | undefined>(null);
    const [isEditing, setEditing] = useState(false);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    const [status, setStatus] = useState<AppStatus>("checking-wallet");
    
    const isWalletConnected = !!address;

    const refetchProfile = useCallback( async () => {
        if (!address) return;
        setIsLoadingProfile(true)
        setStatus("loading-profile");
        try{
            const profileObject = await fetchProfileObject(address)
            setProfile(profileObject)
            if(profileObject){
                setView("display");
                setStatus("ready-with-profile");
            } else {
                setView("form")
                setStatus("ready-no-profile")
            }
        } catch(err){
            console.error("failed to fetch profile", err)
            setProfile(null)
            setStatus("ready-no-profile");
        } finally{
            setIsLoadingProfile(false)
        }
    }, [address])

    //   useEffect(() => {
    //     if (account) {
    //         refetchProfile();
    //         setView("display");
    //     } else {
    //         setView("landing");
    //         setProfile(null);
    //     }
    // }, [account]);

      useEffect(() => {
        if (account === null) {
            setStatus("disconnected");
            setView("landing");
            setProfile(null);
        } else {
            refetchProfile();
        }
    }, [account, refetchProfile]);

    
  return (
    <AppStateContext.Provider
      value={{
        view,
        setView,
        status,
        profile,
        setProfile,
        isEditing,
        setEditing,
        isLoadingProfile,
        refetchProfile,
        address,
        isWalletConnected,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
};