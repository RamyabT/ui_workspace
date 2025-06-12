import { IHttpErrorPayload } from '@fpx/core';
  
export interface DclimitrequestMaintanence {
  dclimitrequest?: Dclimitrequest[],
  totalRowCount?:number
  data?: Dclimitrequest[],
  
}
export interface Dclimitrequest  {
         intlContactlessPurchaseLimit:string, 
         intlPosMinLimit:number, 
         errorCode:string, 
         authOn:string, 
         contactMaxLimit:number, 
         inventoryNumber:string, 
         atmMinLimit:number, 
         terms:string, 
         intlOnlinePurchaseFlag:string, 
         intlAtmLimit:string, 
         intlOnlinePurchaseLimit:string, 
         onlinePurchaseFlag:string, 
         posMinLimit:number, 
         autoCompleteFlag:string, 
         updtOn:string, 
	     cardRefNumber:any, 
         authBy:string, 
         intlPosPayFlag:string, 
         status:string, 
         contactlessPurchaseLimit:string, 
         intlOnlineMaxLimit:number, 
         atmLimit:string, 
         requestReference:string, 
         intlPosMaxLimit:number, 
         customerCode:string, 
         contactlessMinLimit:number, 
         onlineMaxLimit:number, 
         createdOn:string, 
         modifiedOn:string, 
         intlConcatlessMaxLimit:number, 
         intlPosPayLimit:string, 
	     currency:any, 
         modifiedBy:string, 
         onlinePurchaseLimit:string, 
         intlContactlessPurchaseFlag:string, 
         atmMaxLimit:number, 
         intlAtmMaxLimit:number, 
         entityCode:string, 
         errorMessage:string, 
         posMaxLimit:number, 
         intlAtmFlag:string, 
         intlAtmMinLimit:number, 
         createdBy:string, 
         overallCardLimit:number, 
         atmFlag:string, 
         currencyCode:any,
         posPayFlag:string, 
         contactlessPurchaseFlag:string, 
         intlContactlessMinLimit:number, 
         remarks:string, 
         posPayLimit:string, 
         onlineMinLimit:number, 
         intlOnlineMinLimit:number, 
         charges:any
  }
  
  
 export interface DclimitrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
