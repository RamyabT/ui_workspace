import { IHttpErrorPayload } from '@fpx/core';
  
export interface TranhistoryMaintanence {
  tranhistory?: Tranhistory[],
  totalRowCount?:number
  data?: Tranhistory[],
  
}
export interface Tranhistory  {
  initiationDate: string,
  debitAccountNumber: string,
  transactionReference: string,
  beneficiaryName: string,
  toDate: string,
  valueDate: string,
  uETR: string,
  paymentAmount: any,
  flowInstanceId: string,
  paymentType: any,
  beneficiaryAccountNumber: string,
  fromDate: string,

  transactionPeriod: any,
  paymentId?: string,

  paymentCurrency: string,
  status: string,
  serviceCode: string,
  serviceCodeDescription: string,
  scheduleType:any
  scheduleTypeDescription:any
  }
  
  
 export interface TranhistoryResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
