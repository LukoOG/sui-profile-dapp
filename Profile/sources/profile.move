module profile::profile;

use std::string;
// use sui::event;
use sui::url::Url;
// use sui::vec_map::{Self, VecMap};
use std::ascii;

// Structs
public struct Profile has key {
    id: UID,
    owner: address,
    name: string::String,
    description: string::String, //profile bio. Change fieldname back to bio if description isn't NFT standard
    url: Url, //profile picture url
    // socials: VecMap<u8, Url>,
    socials: std::option::Option<vector<Url>>,
}

// Constants; 
const ENotProfileOwner: u64 = 0;


// TODO: write a function to convert generic strings to ascii strings


//Functions
public fun construct_socials (s: vector<ascii::String> ): option::Option<vector<Url>> {
    if (vector::is_empty(&s)){
        option::none()
    } else {
        let x = vector::length(&s);
        let mut i = 0;
        let mut urls = vector::empty();
        while (i < x){
            let ascii_str = *vector::borrow(&s, i);
            let url = sui::url::new_unsafe(ascii_str);
            vector::push_back(&mut urls, url);
            i = i + 1;
        };
        option::some(urls)
    }
}

public entry fun create_profile
(
    name: string::String, 
    description: string::String, 
    url: ascii::String,
    socials: vector<ascii::String>,
    ctx: &mut TxContext
    )
    {
    //reconstruct social media links
    let owner = ctx.sender();
    let socials = construct_socials(socials);
    let profile = Profile {
        id: object::new(ctx),
        owner,
        name,
        description,
        url: sui::url::new_unsafe(url),
        socials
    };

    transfer::transfer(profile, owner)
}

public entry fun update_profile(profile: &mut Profile, new_name: string::String, new_description:string::String, new_url: ascii::String, ctx: &mut TxContext){
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);
    profile.name = new_name;
    profile.description = new_description;
    profile.url = sui::url::new_unsafe(new_url);
}

public entry fun delete_profile(profile: Profile, ctx: &mut TxContext){
    assert!(profile.owner == ctx.sender(), ENotProfileOwner);
    let Profile {
        id, ..
    } = profile;

    id.delete();
}

// #[test]
// fun test_profile(){
//     let mut ctx = tx_context::dummy();
//     let name = string::utf8(b"alice");
//     let bio = string::utf8(b"blockchain dev");
//     let url = string::utf8(b"https://example.com/pic.png");

//     create_profile(name, bio, url, &mut ctx);
// }