import { IHttpErrorPayload } from '@fpx/core';
  
export interface PcPinRequestMaintanence {
  pcPinRequest?: PcPinRequest[],
  totalRowCount?:number
  data?: PcPinRequest[],
  
}
export interface PcPinRequest  {
         confirmPin:number, 
         autoCompleteFlag:any, 
         termsFlag:any, 
         requestReference:any, 
         customerCode:any, 
         reenteredPin:number, 
         updatedOn:any, 
	     cardReference:any, 
         inventoryNumber:any, 
         pin:number, 
         previousPin:number, 
         remarks:any, 
         status:any, 
  }
  
  
 export interface PcPinRequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
