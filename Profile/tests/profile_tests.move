
#[test_only]
module profile::profile_tests;
// uncomment this line to import the module
use profile::profile::{construct_socials};
use std::ascii;
use sui::url;
const ENotImplemented: u64 = 0;

#[test]
fun test_profile() {
    // pass
}

#[test, expected_failure(abort_code = ::profile::profile_tests::ENotImplemented)]
fun test_profile_fail() {
    abort ENotImplemented
}

#[test]
fun test_construct_socials_empty() {
        let socials = vector::empty<ascii::String>();
        let result = construct_socials(socials);
        assert!(option::is_none(&result), 0);
}

#[test]
fun test_construct_socials_non_empty() {
        let mut socials = vector::empty<ascii::String>();
        vector::push_back(&mut socials, ascii::string(b"https://twitter.com/yourprofile"));
        vector::push_back(&mut socials, ascii::string(b"https://github.com/yourprofile"));
        let mut result: Option<vector<url::Url>> = construct_socials(socials);
        assert!(option::is_some(&result), 1);

        let urls = option::extract(&mut result);
        assert!(vector::length(&urls) == 2, 2);

        let url0: &url::Url = vector::borrow(&urls, 0);
        let url1: &url::Url = vector::borrow(&urls, 1);

        // Optionally, check the string representation if your Url type supports it
        assert!(sui::url::inner_url(url0) == ascii::string(b"https://twitter.com/yourprofile"), 3);
        assert!(sui::url::inner_url(url1) == ascii::string(b"https://github.com/yourprofile"), 4);
}

