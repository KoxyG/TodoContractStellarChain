import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CAV35T7NG4UKXF5KOVXUYXY7D6UMWV5KSLJK3QEK34LUERQZWL6F2BCK",
    }
};
export const Errors = {};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAABFRhc2sAAAADAAAAAAAAAAljb21wbGV0ZWQAAAAAAAABAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAQAAAAAAAAAAV0aXRsZQAAAAAAABE=",
            "AAAAAAAAAAAAAAAIYWRkX3RvZG8AAAACAAAAAAAAAAV0aXRsZQAAAAAAABEAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAABAAAABA==",
            "AAAAAAAAAAAAAAANY29tcGxldGVfdGFzawAAAAAAAAEAAAAAAAAABWluZGV4AAAAAAAABAAAAAEAAAAB",
            "AAAAAAAAAAAAAAAJZ2V0X3Rhc2tzAAAAAAAAAAAAAAEAAAPqAAAH0AAAAARUYXNr",
            "AAAAAAAAAAAAAAAIZ2V0X3Rhc2sAAAABAAAAAAAAAAVpbmRleAAAAAAAAAQAAAABAAAD6AAAB9AAAAAEVGFzaw=="]), options);
        this.options = options;
    }
    fromJSON = {
        add_todo: (this.txFromJSON),
        complete_task: (this.txFromJSON),
        get_tasks: (this.txFromJSON),
        get_task: (this.txFromJSON)
    };
}
