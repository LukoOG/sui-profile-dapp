import  React  from "react"

// TODO: remove null checkcase. i.e make sure address is always string when passed.
interface ProfileFormProps{
    address: string | null,
};


const ProfileForm: React.FC<ProfileFormProps> = ({address}) => {
    const formatAddress = (address: string | null): string => {
        if (address == null) return '';
        return `${address.slice(0, 6)}....${address.slice(-4)}`
    }
    return (
        <div className='div-container'>
            <form>
                <p>form</p>
                <p>connected address: {formatAddress(address)}</p>
            </form>
        </div>
    )
}

export default ProfileForm