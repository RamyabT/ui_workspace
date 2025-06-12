import { IHttpErrorPayload } from "@fpx/core";
export interface PhotoIdMatchMaintanence {
  personalinfo: PhotoIdMatch[];
}
export interface PhotoIdMatch {
  errorDescription: string,
  errorMessage: string,
  errorCode: string,
  authOn: string,
  createdOn: string,
  authBy: string,
  modifiedOn: string,
  createdBy: string,
  appRef: string,
  scanData: string,
  selfie: string,
  frontImage: string,
  backImage: string
}


export interface PhotoIdMatchResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}




