import { IHttpErrorPayload } from '@fpx/core';
  
export interface StopchequerequestMaintanence {
  stopchequerequest?: Stopchequerequest[],
  totalRowCount?:number
  data?: Stopchequerequest[],
  
}
export interface Stopchequerequest  {
	     reason:any, 
         toChequeNumber:number, 
         termsFlag:string, 
         requestReference:string, 
         errorCode:string, 
         authOn:string, 
         chequeNumber:number, 
         createdOn:string, 
         fromChequeNumber:number, 
         payee?:string, 
         inventoryNumber:string, 
         modifiedOn:string, 
         requestDate:string, 
	     currency:any, 
         modifiedBy:string, 
         entityCode:string, 
         errorMessage:string, 
         chargesAmount?:number, 
         updtOn:string, 
         noOfCheques:string, 
	     accountNumber:any, 
         stopChequeType:string, 
         chequeAmount?:number, 
         authBy:string, 
         createdBy:string, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface StopchequerequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
