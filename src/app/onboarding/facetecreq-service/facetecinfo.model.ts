import { IHttpErrorPayload } from "@fpx/core";
export interface FaceTecInfoMaintanence {
    facetechreq: FaceTecInfo[];
}
export interface FaceTecInfo {
    documentData: string;
    externalDatabaseRefID: string;
    photoScanFront: string;
    photoScanBack: string;
    result: string;
    selife: string;
    appRef: string;
    isSkipped: any;
    documentType: any;
}


export interface FaceTecInfoResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}




