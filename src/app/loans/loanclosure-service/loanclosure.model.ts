import { IHttpErrorPayload } from '@fpx/core';
  
export interface LoanclosureMaintanence {
  loanclosure?: Loanclosure[],
  totalRowCount?:number
  data?: Loanclosure[],
  
}
export interface Loanclosure  {
	     debitAccount:any, 
         termsFlag:string, 
         customerCode:string, 
         authOn:string, 
         settlementMode:string, 
         fileUpload:string, 
	     branch:any, 
         createdOn:string, 
         inventoryNumber?:string, 
         authBy:string, 
         modifiedOn:string, 
	     loanAccountNumber:any, 
         createdBy:string, 
         closureDate:string, 
         modifiedBy:string, 
         remarks?:string, 
  }
  
  
 export interface LoanclosureResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
