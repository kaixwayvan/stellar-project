import { Address } from "@stellar/stellar-sdk";
import * as BaonLock from "../baonlock/dist/index";
import {
  isConnected,
  getAddress,
  setAllowed,
  signTransaction,
} from "@stellar/freighter-api";

export const client = new BaonLock.Client({
  ...BaonLock.networks.testnet,
  rpcUrl: "https://soroban-testnet.stellar.org:443",
  signTransaction,
});

export async function connectWallet() {
  if (!(await isConnected())) throw new Error("Freighter not installed!");
  if (await setAllowed()) {
    const result = await getAddress();
    return result.address;
  }
  throw new Error("Connection denied.");
}

export async function checkStudentStatus(userAddr) {
  try {
    const result = await client.get({ student: userAddr });
    console.log("Contract Data:", result);
    return result;
  } catch (err) {
    console.error("Contract Error:", err);
    return null;
  }
}

export async function depositBaon(parent, student, total, dailyAmount) {
  const tx = await client.deposit(
    { parent, student, total: BigInt(total), daily: BigInt(dailyAmount) },
    { publicKey: parent }
  );
  return await tx.signAndSend();
}

export async function claimBaon(student) {
  try {
    const tx = await client.claim({ student }, { publicKey: student });
    return await tx.signAndSend();
  } catch (err) {
    console.error("Contract Execution Failed:", err);
    if (err.message.includes("Unreachable")) {
        throw new Error("Contract Logic Error: Ensure you have an active deposit and remaining balance.");
    }
    throw err;
  }
}

export async function getBalance(address) {
  try {
    // 1. Fetch data from the live Stellar Testnet Horizon API
    const response = await fetch(
      `https://horizon-testnet.stellar.org/accounts/${address}`,
    );

    // 2. Check if the request failed
    if (!response.ok) throw new Error("Account not found on testnet");

    const data = await response.json();

    // 3. Find the native balance (XLM)
    const nativeBalance = data.balances.find((b) => b.asset_type === "native");

    console.log("Fetched Balance Data:", nativeBalance);

    return nativeBalance ? nativeBalance.balance : "0.00";
  } catch (error) {
    console.error("Balance fetch error:", error);
    return "0.00";
  }
}