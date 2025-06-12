import { IHttpErrorPayload } from '@fpx/core';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
  
export interface CcbillpaymentrequestMaintanence {
  ccbillpaymentrequest?: Ccbillpaymentrequest[],
  totalRowCount?:number
  data?: Ccbillpaymentrequest[],
  
}
export interface Ccbillpaymentrequest  {
         autoPay:string, 
         dueDate:string, 
         requestReference:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber:string, 
         modifiedOn:string, 
         terms:string, 
         paymentOption:string, 
         currency:string, 
         modifiedBy:string, 
         avlBalance:string, 
         amount:number, 
         autoCompleteFlag:string, 
	     debitAccountNumber:Casaaccount, 
         errorMessage:string, 
         updtOn:string, 
         charges:number, 
	     cardRefNumber:any, 
         authBy:string, 
         createdBy:string, 
         paymentDate:string, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface CcbillpaymentrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
