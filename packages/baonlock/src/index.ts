import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
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
} as const


export interface Allowance {
  daily: i128;
  parent: string;
  remaining: i128;
  student: string;
  total: i128;
}

export interface Client {
  /**
   * Construct and simulate a get transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get: ({student}: {student: string}, options?: MethodOptions) => Promise<AssembledTransaction<Allowance>>

  /**
   * Construct and simulate a claim transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  claim: ({student}: {student: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a deposit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  deposit: ({parent, student, total, daily}: {parent: string, student: string, total: i128, daily: i128}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAAAAAAAAAAADZ2V0AAAAAAEAAAAAAAAAB3N0dWRlbnQAAAAAEwAAAAEAAAfQAAAACUFsbG93YW5jZQAAAA==",
        "AAAAAAAAAAAAAAAFY2xhaW0AAAAAAAABAAAAAAAAAAdzdHVkZW50AAAAABMAAAAA",
        "AAAAAAAAAAAAAAAHZGVwb3NpdAAAAAAEAAAAAAAAAAZwYXJlbnQAAAAAABMAAAAAAAAAB3N0dWRlbnQAAAAAEwAAAAAAAAAFdG90YWwAAAAAAAALAAAAAAAAAAVkYWlseQAAAAAAAAsAAAAA",
        "AAAAAQAAAAAAAAAAAAAACUFsbG93YW5jZQAAAAAAAAUAAAAAAAAABWRhaWx5AAAAAAAACwAAAAAAAAAGcGFyZW50AAAAAAATAAAAAAAAAAlyZW1haW5pbmcAAAAAAAALAAAAAAAAAAdzdHVkZW50AAAAABMAAAAAAAAABXRvdGFsAAAAAAAACw==" ]),
      options
    )
  }
  public readonly fromJSON = {
    get: this.txFromJSON<Allowance>,
        claim: this.txFromJSON<null>,
        deposit: this.txFromJSON<null>
  }
}