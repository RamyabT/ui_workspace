import { IHttpErrorPayload } from '@fpx/core';
  
export interface DcflashrequestMaintanence {
  dcflashrequest?: Dcflashrequest[],
  totalRowCount?:number
  data?: Dcflashrequest[],
  
}
export interface Dcflashrequest  {
         validThru:string, 
         cvv:string, 
         autoCompleteFlag:string, 
         cardHolderName:string, 
         errorMessage:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
         createdOn:string, 
         debitCardNumber:string, 
	     cardRefNumber:any, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         modifiedBy:string, 
         validFrom: string
  }
  
  
 export interface DcflashrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
