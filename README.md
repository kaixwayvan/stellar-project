# 🍱 BaonLock
**A secure, non-custodial allowance protocol that helps parents lock funds for students on the Stellar network.**

### 💡 Problem and Solution
**Problem:** Managing student allowances is difficult; funds intended for daily needs (like meals or school supplies) are often spent all at once, leading to financial instability for the student before the next allowance period.
**Solution:** BaonLock allows parents to deposit a lump sum into a smart contract that enforces a strict withdrawal schedule. Students can only withdraw their "Daily Baon," ensuring the allowance is paced correctly throughout the month.

### ⏳ Timeline
* **Concept & Architecture:** Initial design for allowance locking logic.
* **Smart Contract Development:** Built using Rust and the Soroban SDK.
* **Testing Phase:** Comprehensive 6-point test suite for logic verification.
* **MVP Deployment:** Integration with Freighter Wallet and Stellar Testnet.

### ✨ Stellar Features Used
* **Soroban Smart Contracts:** Core logic for automated fund disbursement.
* **Instance Storage:** Efficient storage of student allowance profiles.
* **Auth Framework:** Native Stellar authentication ensures only the Parent can deposit and only the designated Student can claim.
* **Testnet Integration:** Deployed and verified on the Stellar Testnet.

### 🔭 Vision and Purpose
The vision for BaonLock is to promote financial literacy and responsible spending for students. By utilizing the transparency and immutability of the Stellar blockchain, we create a trustless system where the "Bank of Mom and Dad" is secure, automated, and educational.

### 🛠 Prerequisites
* **Rust Toolchain:** `v1.75+`
* **Soroban CLI:** `v20.0.0+`
* **WASM Target:** `wasm32-unknown-unknown`
* **Wallet:** [Freighter Wallet Extension](https://www.freighter.app/)

### 🏗 How to Build
To compile the contract to a WASM file:
```bash
soroban contract build
```

## Smart Contract

Deployed on Stellar testnet:
```
CDRUGSEITRGD3QE5AQOTVJB3PLYK2MQCULKV7O6MAI23C6SWSGQKFZCA
```

Explorer: https://stellar.expert/explorer/testnet/contract/CDRUGSEITRGD3QE5AQOTVJB3PLYK2MQCULKV7O6MAI23C6SWSGQKFZCA

<img width="1918" height="1032" alt="Image" src="https://github.com/user-attachments/assets/04ccb874-c4bb-4519-b54d-7b8e454cf6ea" />
