#![allow(unexpected_cfgs)]
#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Env, Address};

#[contracttype]
pub struct Allowance {
    pub parent: Address,
    pub student: Address,
    pub total: i128,
    pub daily: i128,
    pub remaining: i128,
}

#[contract]
pub struct BaonLockContract;

#[contractimpl]
impl BaonLockContract {

    // Parent deposits allowance
    pub fn deposit(env: Env, parent: Address, student: Address, total: i128, daily: i128) {
        parent.require_auth();

        let data = Allowance {
            parent,
            student: student.clone(),
            total,
            daily,
            remaining: total,
        };

        env.storage().instance().set(&student, &data);
    }


    // Student claims daily allowance
    pub fn claim(env: Env, student: Address) {
        student.require_auth();

        // Use get(&student).expect(...) to give a clear error message instead of an abort
        let mut data: Allowance = env.storage().instance().get(&student)
            .expect("No allowance found for this student");

        assert!(data.remaining >= data.daily, "Insufficient funds for claim");

        data.remaining -= data.daily;
        env.storage().instance().set(&student, &data);
    }

    pub fn get(env: Env, student: Address) -> Allowance {
        // Use unwrap_or to return a "Zeroed" allowance if the student doesn't exist
        env.storage().instance().get(&student).unwrap_or(Allowance {
            parent: student.clone(), // Placeholder
            student: student.clone(),
            total: 0,
            daily: 0,
            remaining: 0,
        })
    }
}

#[cfg(test)]
mod test;