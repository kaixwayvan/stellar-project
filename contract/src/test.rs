#![cfg(test)]
use soroban_sdk::{Env, Address};
use soroban_sdk::testutils::Address as _;
use crate::{BaonLockContract, BaonLockContractClient};

#[test]
fn test_deposit_and_claim() {
    let env = Env::default();
    env.mock_all_auths();
    
    let id = env.register_contract(None, BaonLockContract);
    let c = BaonLockContractClient::new(&env, &id);

    let parent = Address::generate(&env);
    let student = Address::generate(&env);

    // 1. Test Deposit
    c.deposit(&parent, &student, &1000, &200);
    let state = c.get(&student);
    assert_eq!(state.total, 1000);
    assert_eq!(state.remaining, 1000);

    // 2. Test First Claim
    c.claim(&student);
    assert_eq!(c.get(&student).remaining, 800);

    // 3. Test Second Claim
    c.claim(&student);
    assert_eq!(c.get(&student).remaining, 600);
}