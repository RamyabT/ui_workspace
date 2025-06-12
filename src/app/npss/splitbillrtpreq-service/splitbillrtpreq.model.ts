import { IHttpErrorPayload } from '@fpx/core';
  
export interface SplitbillrtpreqMaintanence {
  splitbillrtpreq?: Splitbillrtpreq[],
  totalRowCount?:number
  data?: Splitbillrtpreq[],
  
}
export interface Splitbillrtpreq  {
         errorDesc:string, 
         mobileNumber:string, 
         errorMessage:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber:string, 
         totalAmount:number, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         iban:string, 
         currency:string, 
         modifiedBy:string, 
	     splitbillrtprecepients:any, 
         remarks:string, 
  }
  
  
 export interface SplitbillrtpreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
