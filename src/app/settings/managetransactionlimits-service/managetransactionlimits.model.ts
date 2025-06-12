import { IHttpErrorPayload } from '@fpx/core';
  
export interface ManagetransactionlimitsMaintanence {
  managetransactionlimits?: Managetransactionlimits[],
  totalRowCount?:number
  data?: Managetransactionlimits[],
  
}
export interface Managetransactionlimits  {
         entityCode:string, 
         autoCompleteFlag:string, 
         errorDesc:string, 
         termsFlag:string, 
         requestReference:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
         overallAmount:number, 
         createdOn:string, 
         inventoryNumber:string, 
         modifiedOn:string, 
         authBy:string, 
         internationalTransfer:string, 
         createdBy:string, 
         currency:string, 
         modifiedBy:string, 
         instaPay:string, 
         domesticTransfer:string, 
         uptOn:string, 
         withinBankTransfer:string, 
         remarks:string, 
         oatTransfer:string, 
         status:string, 
  }
  
  
 export interface ManagetransactionlimitsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
