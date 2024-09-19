import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
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
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CAV35T7NG4UKXF5KOVXUYXY7D6UMWV5KSLJK3QEK34LUERQZWL6F2BCK",
  }
} as const


export interface Task {
  completed: boolean;
  description: string;
  title: string;
}

export const Errors = {

}

export interface Client {
  /**
   * Construct and simulate a add_todo transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  add_todo: ({title, description}: {title: string, description: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a complete_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  complete_task: ({index}: {index: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a get_tasks transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_tasks: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Array<Task>>>

  /**
   * Construct and simulate a get_task transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_task: ({index}: {index: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Option<Task>>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAABFRhc2sAAAADAAAAAAAAAAljb21wbGV0ZWQAAAAAAAABAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAQAAAAAAAAAAV0aXRsZQAAAAAAABE=",
        "AAAAAAAAAAAAAAAIYWRkX3RvZG8AAAACAAAAAAAAAAV0aXRsZQAAAAAAABEAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAABAAAABA==",
        "AAAAAAAAAAAAAAANY29tcGxldGVfdGFzawAAAAAAAAEAAAAAAAAABWluZGV4AAAAAAAABAAAAAEAAAAB",
        "AAAAAAAAAAAAAAAJZ2V0X3Rhc2tzAAAAAAAAAAAAAAEAAAPqAAAH0AAAAARUYXNr",
        "AAAAAAAAAAAAAAAIZ2V0X3Rhc2sAAAABAAAAAAAAAAVpbmRleAAAAAAAAAQAAAABAAAD6AAAB9AAAAAEVGFzaw==" ]),
      options
    )
  }
  public readonly fromJSON = {
    add_todo: this.txFromJSON<u32>,
        complete_task: this.txFromJSON<boolean>,
        get_tasks: this.txFromJSON<Array<Task>>,
        get_task: this.txFromJSON<Option<Task>>
  }
}