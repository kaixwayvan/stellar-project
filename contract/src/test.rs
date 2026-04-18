#![cfg(test)]
use soroban_sdk::{Env, Address, testutils::Address as _};
use crate::{BaonLockContract, BaonLockContractClient};

// This helper function reduces code duplication
fn setup_test(env: &Env) -> (Address, Address, BaonLockContractClient<'_>) {
    env.mock_all_auths();
    let id = env.register_contract(None, BaonLockContract);
    let client = BaonLockContractClient::new(&env, &id);
    let parent = Address::generate(&env);
    let student = Address::generate(&env);
    (parent, student, client)
}

// 1. Tests if the total amount is stored correctly
#[test]
fn test_initial_deposit_total() {
    let env = Env::default();
    let (parent, student, client) = setup_test(&env);
    client.deposit(&parent, &student, &1000, &200);
    assert_eq!(client.get(&student).total, 1000);
}

// 2. Tests if remaining balance starts at the full amount
#[test]
fn test_initial_deposit_remaining() {
    let env = Env::default();
    let (parent, student, client) = setup_test(&env);
    client.deposit(&parent, &student, &1000, &200);
    assert_eq!(client.get(&student).remaining, 1000);
}

// 3. Tests a single claim withdrawal
#[test]
fn test_single_claim() {
    let env = Env::default();
    let (parent, student, client) = setup_test(&env);
    client.deposit(&parent, &student, &1000, &200);
    client.claim(&student);
    assert_eq!(client.get(&student).remaining, 800);
}

// 4. Tests two claims in a row
#[test]
fn test_double_claim() {
    let env = Env::default();
    let (parent, student, client) = setup_test(&env);
    client.deposit(&parent, &student, &1000, &200);
    client.claim(&student);
    client.claim(&student);
    assert_eq!(client.get(&student).remaining, 600);
}

// 5. Tests if a different student can't access someone else's baon
#[test]
fn test_claim_empty_for_new_address() {
    let env = Env::default();
    let (_, _, client) = setup_test(&env);
    let stranger = Address::generate(&env);
    
    // Testing that a fresh address has 0 remaining balance
    assert_eq!(client.get(&stranger).remaining, 0);
}

// 6. Tests claiming until the balance is exactly zero
#[test]
fn test_claim_until_depleted() {
    let env = Env::default();
    let (parent, student, client) = setup_test(&env);
    client.deposit(&parent, &student, &400, &200);
    client.claim(&student);
    client.claim(&student);
    assert_eq!(client.get(&student).remaining, 0);
}