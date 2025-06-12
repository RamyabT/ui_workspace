import { IHttpErrorPayload } from '@fpx/core';
  
export interface AddressdetailMaintanence {
  addressdetail?: Addressdetail[],
  totalRowCount?:number
  data?: Addressdetail[],
  
}
export interface Addressdetail  {
         inventoryNumber:string, 
         buildingName:string, 
	     country:any, 
         zipCode:string, 
         street:string, 
         mobileNumber:string, 
         cityText:string, 
         email:string, 
         buildingId:string, 
	     states:any, 
  }
  
  
 export interface AddressdetailResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
