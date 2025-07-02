import  React, {
    useEffect,
    useState,
}  from "react"
import { useToast } from "./ui/use-toast"
import {
    Card,
    CardDescription,
    CardHeader,
    CardContent,
    CardTitle,
    CardFooter,
} from "@/app/components/ui/card";
import { ImageUpload } from "./imageUpload";
import { User, Edit3, Trash2, Loader2, Save } from 'lucide-react';
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

// TODO: remove null checkcase. i.e make sure address is always string when passed.
interface ProfileFormProps{
    profile: any;
    loading: boolean;
};


const ProfileForm: React.FC<ProfileFormProps> = ({ profile, loading }) => {
    const [existingProfile, setExistingProfile] = useState(false)
    const [isLoading, setIsLoading] = useState(false); //submision loading, not global loading state
    const [isDeleting, setIsDeleting] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        if(profile){
            showToast("Profile detected", {type:"success", duration:3000})
            setExistingProfile(true)
        } else if (!profile){
            showToast("No Profile detected", {type:"info", duration:3000})
        }
    }, [])

    return (
        <div className="div-container">
            <Card className="w-[calc(7/12*100%)] absolute top-[8rem] left-1/2 translate-x-[-50%] shadow-xl bg-gray-800 backdrop-blur-sm border-gray-700">
                <CardHeader className="pb-6 text-center">
                    <CardTitle className="flex items-center justify-center gap-3 text-2xl font-bold text-white">
                        {existingProfile ? <Edit3 className="w-6 h-6" /> : <User className="w-6 h-6" />}
                        {existingProfile ? 'Update Profile' : 'Create Profile'}   
                    </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="">
                    {/* avatar preview */}
                </div>
                <form  className="space-y-3">
                    <div className="space-y-1">
                        <Label htmlFor="name" className="text-white font-semibold text-base">
                            Name *
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            // value={profile.name}
                            // onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                            className="border-slate-600 bg-slate-800 text-white focus:border-cyan-500 focus:ring-cyan-500 text-base py-3 placeholder:text-slate-400"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="bio" className="text-white font-semibold text-base">
                            Bio
                        </Label>
                        <Textarea
                            id="bio"
                            placeholder="Tell us about yourself..."
                            // value={profile.bio}
                            // onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                            className="border-slate-600 bg-slate-800 text-white focus:border-cyan-500 focus:ring-cyan-500 min-h-[120px] text-base py-3 placeholder:text-slate-400"
                            rows={4}
                        />
                    </div>
                    <ImageUpload
                        // value={profile.avatarUrl}
                        // onChange={(url) => setProfile(prev => ({ ...prev, avatarUrl: url }))}
                        className="space-y-1"
                    />

                    <div className="">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 text-base h-auto"
                            >
                            {isLoading ? (
                                <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                {existingProfile ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                <>
                                <Save className="w-5 h-5 mr-2" />
                                {existingProfile ? 'Update Profile' : 'Create Profile'}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileForm