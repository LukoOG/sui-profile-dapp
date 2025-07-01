import  React  from "react"

interface ProfileDisplayProps{
    profile: string,
};

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profile }) => {
    const formatAddress = (address: string): string => {
    return `${address.slice(0, 6)}....${address.slice(-4)}`
  }
  
    return (
        <div className='div-container'>
            <section>
                <p>display: {profile}</p>
                <p> {profile}</p>
            </section>
        </div>
    )
}

export default ProfileDisplay