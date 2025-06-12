import { IHttpErrorPayload } from '@fpx/core';

export interface RetailcustomerenrollmentMaintanence {
  retailcustomerenrollment?: Retailcustomerenrollment[],
  totalRowCount?:number
  data?: Retailcustomerenrollment[],
  
}
export interface Retailcustomerenrollment  {
  accountDetails: any,
  operationMode?: string;
  termsFlag: string;
}
  
 export interface RetailcustomerenrollmentResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
