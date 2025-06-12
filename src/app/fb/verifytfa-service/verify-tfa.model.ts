import { IHttpErrorPayload } from "@fpx/core";

export interface VerifyTFAReq {
    verifyTfa?: VerifyTFAData;
}

export interface VerifyTFAData {
    reqRef: string;
    inventoryNumber: string;
    serviceCode: string;
    otp: string;
}

export interface VerifyTFAResponse {
    inventoryNo?: string;
    httpStatus?: number;
    error?: IHttpErrorPayload;
}