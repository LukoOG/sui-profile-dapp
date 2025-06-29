module profile::profile;

use std::string::{Self, String};

// Structs
public struct Profile has key, store {
    id: UID,
    owner: address,
    name: String,
    bio: String,
    profile_pic: String,
}

// Constants; 
const ENotProfileOwner: u64 = 0;

public entry fun create_profile(name:String, bio:String, url:String, ctx: &mut TxContext){
    let owner = ctx.sender();
    let profile = Profile {
        id: object::new(ctx),
        owner,
        name,
        bio,
        profile_pic: url,
    };

    transfer::public_transfer(profile, owner)
}

public entry fun update_profile(profile: &mut Profile, new_name: String, new_bio:String, new_url:String, ctx: &mut TxContext){
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);
    profile.name = new_name;
    profile.bio = new_bio;
    profile.profile_pic = new_url;
}

public entry fun delete_profile(profile:Profile){
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);
    let Profile {
        id, ..
    } = profile;

    id.delete();
}

#[test]
// fun test_profile(){
//     let mut ctx = tx_context::dummy();
//     let name = string::utf8(b"alice");
//     let bio = string::utf8(b"blockchain dev");
//     let url = string::utf8(b"https://example.com/pic.png");

//     create_profile(name, bio, url, &mut ctx);
// }