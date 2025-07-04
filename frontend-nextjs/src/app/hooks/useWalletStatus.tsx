import { useCurrentAccount, useAutoConnectWallet } from "@mysten/dapp-kit";
import { useProfile } from "@/app/hooks/useProfile"
import { useState, useEffect } from "react";

export const useWalletStatus = () => {
    const account = useCurrentAccount()
    const address = account?.address || null
    
    const { profile, loading: profileLoading, setProfile } = useProfile(address)

    const [walletChecked, setWalletChecked] = useState(false);

    useEffect(() => {
        if (account !== undefined && !walletChecked) {
            setWalletChecked(true);
        }
    }, [account, walletChecked]);

    const isCheckingWallet = !walletChecked;
    const isWalletConnected = walletChecked && !!account;
    const isLoadingProfile = isWalletConnected && profileLoading;
    const hasProfile = !!profile;
    let isLoading = isCheckingWallet || isLoadingProfile


    //future sake
    const status = isCheckingWallet
    ? 'checking-wallet'
    : !isWalletConnected
    ? 'disconnected'
    : isLoadingProfile
    ? 'loading-profile'
    : hasProfile
    ? 'ready-with-profile'
    : 'ready-no-profile';    

    return {
        account,
        profile,
        isCheckingWallet,
        isWalletConnected,
        isLoading,
        hasProfile,
        status,
        setProfile
    }
}