import { IHttpErrorPayload } from '@fpx/core';
  
export interface BankcontactsMaintanence {
  bankcontacts?: Bankcontacts[],
  totalRowCount?:number
  data?: Bankcontacts[],
  
}
export interface Bankcontacts  {
         address:string, 
         applCode:string, 
         tollFreeNumber:string, 
         mobileNumber:string, 
         facebookId:string, 
         emailId:string, 
         authOn:string, 
         linkedinId:string, 
         createdOn:string, 
         twitterId:string, 
         effDate:string, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         modifiedBy:string, 
  }
  
  
 export interface BankcontactsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
