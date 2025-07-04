import { packageAddress, suiClient } from "@/app/lib/sui/config";
import { useEffect,  useState } from "react";

const PROFILE_TYPE = `${packageAddress}::Profile`

export const useProfile = (address: string | null) => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!address){
            setProfile(null)
            return
        }

        const fetchProfile = async () => {
            setLoading(true); 
            try{
                const object = await suiClient.getOwnedObjects({ owner: address, options:{
                    showType: true
                } })

                const profileObj = object.data.find((object)=>object.data?.type === PROFILE_TYPE)

                if(profileObj && profileObj.data){
                    const profile = await suiClient.getObject({
                        id: profileObj.data.objectId,
                        options: { showContent: true }
                    })

                    setProfile(profile)
                } else {
                    setProfile(null)
                }
            } catch(e){
                console.error('Error fetching profile:', e);
                setProfile(null);
            } finally{
                setLoading(false)
            }
        }

        fetchProfile()
    }, [address])

    return { profile, loading }
}