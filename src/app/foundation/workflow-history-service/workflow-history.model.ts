import { IHttpErrorPayload } from "@fpx/core";

export interface workflowHistoryReq {
    verifyTfa?: workflowHistoryData;
}

export interface workflowHistoryData {
    reqRef: string;
    serviceCode: string;
    otp: string;
}

export interface workflowHistoryResponse {
    inventoryNo?: string;
    httpStatus?: number;
    error?: IHttpErrorPayload;
}