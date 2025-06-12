import { IHttpErrorPayload } from '@fpx/core';
  
export interface CanceldebitcardMaintanence {
  canceldebitcard?: Canceldebitcard[],
  totalRowCount?:number
  data?: Canceldebitcard[],
  
}
export interface Canceldebitcard  {
	     reason:any, 
         entityCode:string, 
         autoCompleteFlag:string, 
         requestReference:string, 
         errorMessage:string, 
         customerCode:string, 
         errorCode:string, 
         updtOn:string, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber:string, 
	     cardRefNumber:any, 
         authBy:string, 
         modifiedOn:string, 
         terms:string, 
         createdBy:string, 
         modifiedBy:string, 
         remarks:string, 
         status:string, 
         currency:any,
         charges:any
  }
  
  
 export interface CanceldebitcardResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
