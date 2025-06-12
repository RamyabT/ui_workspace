import { IHttpErrorPayload } from '@fpx/core';
  
export interface EtransfercustomerlogMaintanence {
  etransfercustomerlog?: Etransfercustomerlog[],
  totalRowCount?:number
  data?: Etransfercustomerlog[],
  
}
export interface Etransfercustomerlog  {
         entityCode:string, 
         errorDesc:string, 
         serviceCode:string, 
         customerCode:string, 
         errorCode:string, 
         contactType:string, 
         authOn:string, 
         notificationType:string, 
         customerCreationDate:string, 
         createdOn:string, 
         inventoryNumber:string, 
         firstName:string, 
         operationMode:string, 
         modifiedOn:string, 
         authBy:string, 
         rejectedBy:string, 
         phoneNumber:string, 
         createdBy:string, 
         tenantId:string, 
         modifiedBy:string, 
         rejectedOn:string, 
         email:string, 
  }
  
  
 export interface EtransfercustomerlogResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
