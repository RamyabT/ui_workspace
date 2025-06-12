import { IHttpErrorPayload } from '@fpx/core';
  
export interface NotifygoingoverseasMaintanence {
  notifygoingoverseas?: Notifygoingoverseas[],
  totalRowCount?:number
  data?: Notifygoingoverseas[],
  
}
export interface Notifygoingoverseas  {
	     country:any, 
         temporarilyBlockCard:string, 
         serviceCode:string, 
         termsFlag:string, 
         customerCode:string, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber:string, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         arivalDate:string, 
         tenantId:string, 
         contactNumber:string, 
         modifiedBy:string, 
         depatureDate:string, 
         remarks:string, 
  }
  
  
 export interface NotifygoingoverseasResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
