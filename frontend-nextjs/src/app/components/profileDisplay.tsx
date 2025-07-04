import  React  from "react";
import { SuiObjectResponse } from "@mysten/sui/client";
import { ProfileObjectFields } from "../hooks/useProfile";
import {Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/Badge";
import { Shield, User, Link, Edit3 } from "lucide-react";

interface ProfileDisplayProps{
    profile: SuiObjectResponse;
    address: string;
    setProfile: (profile: SuiObjectResponse) => void,
	onEdit: ()=>void;
}

// interface ProfileObjectResponse extends SuiObjectResponse{
//     data:{
//         content:{
//             fields: ProfileObjectFields
//         }
//     }
// }

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profile, address, setProfile, onEdit }) => {
    const formatAddress = (address: string): string => {
        return `${address.slice(0, 6)}....${address.slice(-4)}`
    }

//   if(!profile.data || profile.data.type !== PROFILE_MOVE_TYPE) setProfile(null)

  const { fields } = profile!.data.content

  console.log(fields)
  
    return (
        <div className="div-container w-[calc(5/12*100%)]">
            <Card>
                <CardContent>
                    <div className="">
                        {/* Avatar */}
                        <div className="relative">
                            <Avatar className="w-36 h-36 border-4 border-cyan-500/20 shadow-lg">
                                <AvatarImage src={fields.url} alt={fields.name} />
                                <AvatarFallback className="bg-cyan-500/10 text-cyan-400 text-5xl font-semibold">
                                    {fields.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-slate-900 rounded-full flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="text-center space-y-4 w-full">
                            <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{fields.name}</h1>
                            <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-3 py-1">
                                <User className="w-3 h-3 mr-1" />
                                Verified Profile
                            </Badge>
                            </div>

                            {fields.description && (
                            <div className="px-4">
                                <p className="text-slate-200 leading-relaxed text-base">
                                {fields.description}
                                </p>
                            </div>
                            )}
                        </div>

                        {/* On-Chain Information */}
                        <div className="w-full space-y-4 pt-6 border-t border-slate-700">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide text-center">
                            On-Chain Details
                            </h3>
                            
                            <div className="space-y-3">
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-slate-200 flex items-center gap-2">
                                <Link className="w-4 h-4" />
                                Network
                                </span>
                                <span className="font-medium text-cyan-400">Sui Mainnet</span>
                            </div>
                            
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-slate-200">Status</span>
                                <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="font-medium text-green-400">Active</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-slate-200">Profile Type</span>
                                <span className="font-medium text-white">Personal</span>
                            </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
				<CardFooter>
				  <Button
					onClick={onEdit}
					className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 text-base"
				  >
					<Edit3 className="w-5 h-5 mr-2" />
					Edit Profile
					  </Button>
				</CardFooter>
            </Card>
        </div>
    )
}

export default ProfileDisplay