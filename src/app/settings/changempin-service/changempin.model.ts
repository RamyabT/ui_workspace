import { IHttpErrorPayload } from '@fpx/core';
  
export interface ChangempinMaintanence {
  changempin?: Changempin[],
  totalRowCount?:number
  data?: Changempin[],
  
}
export interface Changempin  {
         newMpin:string, 
         inventoryNumber:string, 
         currentMpin:string, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         authOn:string, 
         modifiedBy:string, 
         confirmMpin:string, 
         userName:string, 
         createdOn:string, 
  }
  
  
 export interface ChangempinResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
