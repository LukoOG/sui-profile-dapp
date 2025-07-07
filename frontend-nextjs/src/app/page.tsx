"use client";
//components
import LoadingSpinner from "@/app/components/loadingSpinner"
import ProfileDisplay from "./components/profileDisplay";
import ProfileForm from "./components/profileForm";
import LandingPage from "./components/landing";
import { useAppState, AppStatus } from "./context/AppStateContext";

const getSpinnerText = (status: AppStatus) => {
  switch (status) {
    case "checking-wallet":
      return "Connecting Wallet...";
    case "loading-profile":
      return "Loading Profile...";
    default:
      return "Loading...";
  }
};

export default function Home() {
  // const {
  //   account,
  //   status,
  //   isLoading,
  //   isWalletConnected,
  //   hasProfile,
  //   profile,
  //   setProfile
  // } = useWalletStatus()
  

  const {
    status,
    profile,
    view,
    setEditing,
  } = useAppState();

  const handleEdit = () => {
    setEditing(true);
  };

  if (status === "checking-wallet" || status === "loading-profile") {
    return (
	 <section className="mx-auto w-[90%] relative h-[calc(80vh-16px)] flex flex-row items-center justify-center">
	   <LoadingSpinner className="" text={getSpinnerText(status)} />
    </section>
	)
  }

  if (status === "disconnected") {
	 return (
	 <section className="mx-auto w-[90%] min-h-[calc(80vh-16px)] max-h-fit">
	   <LandingPage />
    </section>
	)
  }

  return (
    <section className="mx-auto w-[90%] relative min-h-[calc(80vh-16px)] max-h-fit">
      {view === "form" && <ProfileForm />}
      {view === "display" && profile && (
        <ProfileDisplay onEdit={handleEdit} />
      )}
    </section>
  )
}
