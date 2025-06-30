import { suiClient } from "@/app/lib/Sui";
import { useEffect,  useState } from "react";


const PROFILE_TYPE = ``

export const useProfile = (address: string | null) => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!address){
            setProfile(null)
            return
        }

        const fetchProfile = async () => {
            setLoading(true);
            try{
                const objects = await suiClient.getOwnedObjects({
                    owner:address
                })

                const profileObj = objects.data.find((object)=>object.data?.type === PROFILE_TYPE)

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