module profile::profile;

use std::string;
use sui::event;
use sui::url::Url;

// Structs
public struct Profile has key, store {
    id: UID,
    owner: address,
    name: string::String,
    description: string::String, //profile bio
    url: Url, //profile picture url
}

// Constants; 
const ENotProfileOwner: u64 = 0;

public entry fun create_profile(name: string::String, description: string::String, url: string::String, ctx: &mut TxContext){
    let owner = ctx.sender();
    let profile = Profile {
        id: object::new(ctx),
        owner,
        name,
        description,
        url: sui::url::
    };

    transfer::public_transfer(profile, owner)
}

public entry fun update_profile(profile: &mut Profile, new_name: string::String, new_description:string::String, new_url: string::String, ctx: &mut TxContext){
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);
    profile.name = new_name;
    profile.description = new_description;
    profile.url = new_url;
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