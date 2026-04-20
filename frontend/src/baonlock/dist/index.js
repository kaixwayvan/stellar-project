import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";
if (typeof window !== "undefined") {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CDRUGSEITRGD3QE5AQOTVJB3PLYK2MQCULKV7O6MAI23C6SWSGQKFZCA",
    }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAAAAAAADZ2V0AAAAAAEAAAAAAAAAB3N0dWRlbnQAAAAAEwAAAAEAAAfQAAAACUFsbG93YW5jZQAAAA==",
            "AAAAAAAAAAAAAAAFY2xhaW0AAAAAAAABAAAAAAAAAAdzdHVkZW50AAAAABMAAAAA",
            "AAAAAAAAAAAAAAAHZGVwb3NpdAAAAAAEAAAAAAAAAAZwYXJlbnQAAAAAABMAAAAAAAAAB3N0dWRlbnQAAAAAEwAAAAAAAAAFdG90YWwAAAAAAAALAAAAAAAAAAVkYWlseQAAAAAAAAsAAAAA",
            "AAAAAQAAAAAAAAAAAAAACUFsbG93YW5jZQAAAAAAAAUAAAAAAAAABWRhaWx5AAAAAAAACwAAAAAAAAAGcGFyZW50AAAAAAATAAAAAAAAAAlyZW1haW5pbmcAAAAAAAALAAAAAAAAAAdzdHVkZW50AAAAABMAAAAAAAAABXRvdGFsAAAAAAAACw=="]), options);
        this.options = options;
    }
    fromJSON = {
        get: (this.txFromJSON),
        claim: (this.txFromJSON),
        deposit: (this.txFromJSON)
    };
}
