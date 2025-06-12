import { IHttpErrorPayload } from '@fpx/core';
  
export interface PcChangeLimitMaintanence {
  pcChangeLimit?: PcChangeLimit[],
  totalRowCount?:number
  data?: PcChangeLimit[],
  
}
export interface PcChangeLimit  {
         intlContactlessPurchaseLimit:string, 
         intlPosMinLimit:string, 
         errorCode:string, 
         authOn:string, 
         inventoryNumber:string, 
         atmMinLimit:string, 
         contactlessMaxLimit:string, 
         intlOnlinePurchaseFlag:string, 
         intlAtmLimit:string, 
         intlOnlinePurchaseLimit:string, 
         onlinePurchaseFlag:string, 
         posMinLimit:string, 
         autoCompleteFlag:string, 
         updtOn:string, 
	     pplimitcountries:any, 
	     cardRefNumber:any, 
         charges:number, 
         authBy:string, 
         intlPosPayFlag:string, 
         status:string, 
         contactlessPurchaseLimit:string, 
         intlOnlineMaxLimit:string, 
         atmLimit:string, 
         termsFlag:string, 
         intlPosMaxLimit:string, 
         customerCode:string, 
         contactlessMinLimit:string, 
         onlineMaxLimit:string, 
         createdOn:string, 
         modifiedOn:string, 
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
         intlContactlessMaxLimit:string, 
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
  
  
 export interface PcChangeLimitResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
