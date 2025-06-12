import { IHttpErrorPayload } from '@fpx/core';
  
export interface UserdeviceMaintanence {
  userdevice?: Userdevice[],
  totalRowCount?:number
  data?: Userdevice[],
  
}
export interface Userdevice  {
         deviceType:string, 
         authOn:string, 
         isAuthenticated:string, 
         userId:string, 
         deviceId:string, 
         deviceName:string, 
         createdOn:string, 
         deviceInfo:string, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         modifiedBy:string, 
	     userdevicehist:any, 
  }
  
  
 export interface UserdeviceResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
