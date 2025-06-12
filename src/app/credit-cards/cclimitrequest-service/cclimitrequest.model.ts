import { IHttpErrorPayload } from '@fpx/core';
  
export interface CclimitrequestMaintanence {
  cclimitrequest?: Cclimitrequest[],
  totalRowCount?:number
  data?: Cclimitrequest[],
  
}
export interface Cclimitrequest  {
         intlContactlessPurchaseLimit:string, 
         intlPosMinLimit:string, 
         errorCode:string, 
         authOn:string, 
         contactMaxLimit:string, 
         inventoryNumber:string, 
         atmMinLimit:string, 
         terms:string, 
         intlOnlinePurchaseFlag:string, 
         intlAtmLimit:string, 
         intlOnlinePurchaseLimit:string, 
         onlinePurchaseFlag:string, 
         posMinLimit:string, 
         autoCompleteFlag:string, 
         updtOn:string, 
	     cardRefNumber:any, 
         authBy:string, 
         intlPosPayFlag:string, 
         creditCardNumber:string, 
         status:string, 
         contactlessPurchaseLimit:string, 
         intlOnlineMaxLimit:string, 
         atmLimit:string, 
         requestReference:string, 
         intlPosMaxLimit:string, 
         customerCode:string, 
         contactlessMinLimit:string, 
         onlineMaxLimit:string, 
         createdOn:string, 
         modifiedOn:string, 
         intlConcatlessMaxLimit:string, 
         intlPosPayLimit:string, 
	     currency:any, 
         modifiedBy:string, 
         onlinePurchaseLimit:string, 
         intlContactlessPurchaseFlag:string, 
         atmMaxLimit:string, 
         intlAtmMaxLimit:string, 
         entityCode:string, 
         errorMessage:string, 
         posMaxLimit:string, 
         intlAtmFlag:string, 
         intlAtmMinLimit:string, 
         createdBy:string, 
         overallCardLimit:number, 
         atmFlag:string, 
         posPayFlag:string, 
         intlContactlessMinLimit:string, 
         contactlessPurchaseFlag:string, 
         posPayLimit:string, 
         onlineMinLimit:string, 
         remarks:string, 
         intlOnlineMinLimit:string, 
  }
  
  
 export interface CclimitrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
