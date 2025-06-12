import { IHttpErrorPayload } from "@fpx/core";
export interface FaceTecInfoMaintanence {
  obapplicantliveness: FaceTecInfo[];
}
export interface FaceTecInfo {
    documentData: string;
    externalDatabaseRefID: string;
    photoScanFront: string;
    photoScanBack: string;
    result: string;
    selife: string;
    appRef: string;
}


export interface FaceTecInfoResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}




