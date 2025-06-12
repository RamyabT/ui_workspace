import { IHttpErrorPayload } from '@fpx/core';
  
export interface StopchequerevrequestMaintanence {
  stopchequerevrequest?: Stopchequerevrequest[],
  totalRowCount?:number
  data?: Stopchequerevrequest[],
  
}
export interface Stopchequerevrequest  {
	     reason:any, 
         toChequeNumber?:number, 
         termsFlag?:string, 
         requestReference:string, 
         errorCode:string, 
         authOn:string, 
         chequeNumber?:number, 
         createdOn:string, 
         fromChequeNumber?:number, 
         inventoryNumber?:string, 
         payeeName?:string, 
         modifiedOn:string, 
         relatedReference:string, 
         revocationType?:string, 
         requestDate?:string, 
         modifiedBy:string, 
	     currency?:any, 
         entityCode?:string, 
         errorMessage:string, 
         chargesAmount?:number, 
         noOfCheques:string, 
	     accountNumber:any, 
         chequeAmount?:number, 
         authBy:string, 
         createdBy:string, 
         remarks:string, 
         stopDate:string, 
  }
  
  
 export interface StopchequerevrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
