import  React, {
	FormEvent,
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
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { ImageUpload } from "./imageUpload";
import { User, Edit3, Trash2, Loader2, Save } from 'lucide-react';
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Transaction } from "@mysten/sui/transactions";
import { buildPTB } from "../lib/sui/utils";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { suiClient, walrusClient } from "../lib/sui/config";

// TODO: remove null checkcase. i.e make sure address is always string when passed.
interface ProfileFormProps{
    profile: any;
	address: string;
};

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
  avatarUrl: z.string().url("Must be a valid URL").nullable(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, address }) => {
    const [existingProfile, setExistingProfile] = useState(false)
    const [isLoading, setIsLoading] = useState(false); //submision loading, not global loading state
    const [isDeleting, setIsDeleting] = useState(false);
    const { showToast } = useToast();
	const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction()

	// async function uploadImageToWalrus(file: File, address: string) {
    // try{
    //     const bytesFile = await file.bytes()
        
        // const { blobId } = await walrusClient.writeBlob({
        //     blob: bytesFile,
        //     deletable: false,
        //     epochs: 2,
        //     signer
        // })
		
        // const url = `https://storage.testnet.walrus.space/v1/blob/${blobId}`;
        // return url;
// 		const encoded = await walrusClient.encodeBlob(bytesFile);
		                            
// 		const registerBlobTransaction = walrusClient.registerBlobTransaction({
// 			blobId: encoded.blobId,
// 			rootHash: encoded.rootHash,
// 			size: bytesFile.length,
// 			deletable: true,
// 			epochs: 3,
// 			owner: address,
// 		});
// 		registerBlobTransaction.setSender(address);
		
// 		const { digest } = await signAndExecuteTransaction({ transaction: registerBlobTransaction });

// 		const { objectChanges, effects } = await suiClient.waitForTransaction({
// 			digest,
// 			options: { showObjectChanges: true, showEffects: true },
// 		});

// 		if (effects?.status.status !== 'success') {
// 			throw new Error('Failed to register blob');
// 		}

// 		const blobType = await walrusClient.getBlobType();

// 		const blobObject = objectChanges?.find(
// 			(change) => change.type === 'created' && change.objectType === blobType,
// 		);
		
// 		if (!blobObject || blobObject.type !== 'created') {
// 			throw new Error('Blob object not found');
// 		}
		
// 		const confirmations = await walrusClient.writeEncodedBlobToNodes({
// 			blobId: encoded.blobId,
// 			metadata: encoded.metadata,
// 			sliversByNode: encoded.sliversByNode,
// 			deletable: true,
// 			objectId: blobObject.objectId,
// 		});
		
// 		const certifyBlobTransaction = walrusClient.certifyBlobTransaction({
// 			blobId: encoded.blobId,
// 			blobObjectId: blobObject.objectId,
// 			confirmations,
// 			deletable: true,
// 		});
// 		certifyBlobTransaction.setSender(address);
		
// 		const { digest: certifyDigest } = await signAndExecuteTransaction({
// 			transaction: certifyBlobTransaction,
// 		});
		
// 		const { effects: certifyEffects } = await suiClient.waitForTransaction({
// 			digest: certifyDigest,
// 			options: { showEffects: true },
// 		});

// 		if (certifyEffects?.status.status !== 'success') {
// 			throw new Error('Failed to certify blob');
// 		}
		
// 		return encoded.blobId;
//     } catch(error){
//         console.error(error)
//     }
// }

    
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: profile?.name || null,
            bio: profile?.bio || '',
            avatarUrl: profile?.avatarUrl || '',
        },
    });

    const avatarUrl = watch('avatarUrl');
    const name = watch('name');
    
    useEffect(() => {
        if(profile){
            showToast("Profile detected", {type:"success", duration:3000})
            setExistingProfile(true)
        } else if (!profile){
            showToast("No Profile detected", {type:"info", duration:3000})
        }
    }, [])

    const handleFormSubmit = async (e:any) => {
        console.log(e)
		const tx = new Transaction()
		const createProfileArgs = [
			tx.pure.string(e.name),
			tx.pure.string(e.bio),
			tx.pure.string(e.avatarUrl)
		]

		const createProfileTx = await buildPTB(tx, createProfileArgs, "create_profile")
		const { digest } = await signAndExecuteTransaction({
			transaction: createProfileTx,
		})

		
		console.log(digest)
	}
	
    return (
        <div className="div-container w-[calc(5/12*100%)]">
            <Card className="shadow-xl bg-gray-800 backdrop-blur-sm border-gray-700">
                <CardHeader className="pb-6 text-center">
                    <CardTitle className="flex items-center justify-center gap-3 text-2xl font-bold text-white">
                        {existingProfile ? <Edit3 className="w-6 h-6" /> : <User className="w-6 h-6" />}
                        {existingProfile ? 'Update Profile' : 'Create Profile'}   
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* avatar preview */}
                    <div className="flex justify-center">
						<Avatar className="w-28 h-28 border-4 border-cyan-500/20 shadow-lg">
							<AvatarImage src={avatarUrl} alt={name} />
							<AvatarFallback className="bg-cyan-500/10 text-cyan-400 text-3xl font-semibold">
							{name ? name.charAt(0).toUpperCase() : 'U'}
							</AvatarFallback>
						</Avatar>
					</div>
					<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
						<div className="space-y-1">
							<Label htmlFor="name" className="text-white font-semibold text-base">
								Name *
							</Label>
							<Input
								id="name"
								type="text"
								placeholder="Enter your name"
								{...register("name")}
								className="border-slate-600 bg-slate-800 text-white focus:border-cyan-500 focus:ring-cyan-500 text-base py-3 placeholder:text-slate-400"
								required
							/>
							{errors.name && <p className="text-red-500">{errors.name.message}</p>}
						</div>
						<div className="space-y-1">
							<Label htmlFor="bio" className="text-white font-semibold text-base">
								Bio
							</Label>
							<Textarea
								id="bio"
								placeholder="Tell us about yourself..."
								{...register("bio")}
								className="border-slate-600 bg-slate-800 text-white focus:border-cyan-500 focus:ring-cyan-500 min-h-[120px] text-base py-3 placeholder:text-slate-400"
								rows={4}
							/>
							{errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
						</div>
						<ImageUpload
							onChange={(url) => setValue('avatarUrl', url, { shouldValidate: true })}
							className="space-y-1"
							address={address}
						/>
						{errors.avatarUrl && <p className="text-red-500">{errors.avatarUrl.message}</p>}

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