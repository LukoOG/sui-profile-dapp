import  React, {
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
} from "@/app/components/ui/card"
import { User, Edit3, Trash2, Loader2, Save } from 'lucide-react';

// TODO: remove null checkcase. i.e make sure address is always string when passed.
interface ProfileFormProps{
    address: string | null,
};


const ProfileForm: React.FC = () => {
    const [existingProfile, setExistingProfile] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { showToast } = useToast();

    return (
        <Card className="w-full shadow-xl bg-slate-900/80 backdrop-blur-sm border-slate-700">
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
            <form  className="space-y-6">
                <div className="space-y-6"></div>
                <div className="space-y-6"></div>
                <div className="space-y-6"></div>
            </form>

            </CardContent>
        </Card>
    )
}

export default ProfileForm