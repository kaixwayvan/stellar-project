import * as BaonLock from 'baonlock';

// Initialize the contract client
export const client = new BaonLock.Client({
  ...BaonLock.networks.testnet,
  rpcUrl: 'https://soroban-testnet.stellar.org:443',
});

export async function connectWallet() {
  setAddress("GBFAKEADDRESS123456789");
  // 1. Check if the extension is even installed
  if (typeof window.freighterApi === 'undefined') {
    throw new Error("Freighter not found. Please install the extension!");
  }

  // 2. Request permission to see the user's address
  // This is the most modern and reliable method name
  const isAllowed = await window.freighterApi.setAllowed();
  
  if (isAllowed) {
    // 3. Get the address
    const { address } = await window.freighterApi.getUserInfo();
    return address;
  } else {
    throw new Error("User denied access to the wallet.");
  }
}

export async function depositBaon(studentAddr, amount, unlockTime) {
  const sender = await connectWallet();
  
  const tx = await client.deposit({
    parent: sender,
    student: studentAddr,
    amount: BigInt(amount),
    unlock_time: BigInt(unlockTime)
  });

  // Use the window provider to sign as well
  const { result } = await tx.signAndSend();
  return result;
}