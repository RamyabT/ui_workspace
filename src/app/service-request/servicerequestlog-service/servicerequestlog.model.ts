import { IHttpErrorPayload } from '@fpx/core';
  
export interface ServicerequestlogMaintanence {
  servicerequestlog?: Servicerequestlog[],
  totalRowCount?:number
  data?: Servicerequestlog[],
  
}
export interface Servicerequestlog  {
        status: string;
         sourceReference:string, 
	     serviceRequestType:any, 
         entityCode:string, 
         initOn:string, 
         requestType:string, 
         serviceCode:string, 
         initBy:string, 
         message:string, 
         uptdOn:string, 
	     serviceSubCategory:any, 
         flowInstanceId:string, 
	     serviceCategory:any, 
         inventoryNumber:string, 
         applnCode:string, 
         serviceStatus:string, 
         isResolved:string, 
         remarks:string, 
         subject:string
  }
  
  
 export interface ServicerequestlogResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
