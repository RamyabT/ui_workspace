import { FaceTecIDScanResult, FaceTecSessionResult } from "facetec-core-sdk/FaceTecSDK.js/FaceTecPublicApi";

// Define types for the Sample App functions that are shared with the processors.
// This allows for TS typing and VSCode autocompletion

// Function called when the processors are done
export interface OnComplete {
  (sessionResult: FaceTecSessionResult| null, idScanResult: FaceTecIDScanResult | null, latestNetworkResponseStatus: number):void
}

// Function to return the enrollment identifier
export interface GetLatestEnrollmentIdentifier {
  (): string;
}

// Function to clear the enrollment identifier
export interface ClearLatestEnrollmentIdentifier{
  (): void;
}

export interface SetLatestEnrollmentIdentifier{
  (externalDatabaseRefID: string): void;
}

export interface SetDocumentDataResult{
  (documentData:any):void;
}

// All sample app functions that are shared with the processors
export interface FaceTechSKControllerReference {
  onComplete: OnComplete,
  setLatestEnrollmentIdentifier: SetLatestEnrollmentIdentifier,
  getLatestEnrollmentIdentifier: GetLatestEnrollmentIdentifier,
  clearLatestEnrollmentIdentifier: ClearLatestEnrollmentIdentifier,
  setDocumentDataResult: SetDocumentDataResult
}
