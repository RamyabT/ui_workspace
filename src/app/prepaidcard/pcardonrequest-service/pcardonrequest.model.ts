import { IHttpErrorPayload } from '@fpx/core';
import { Cobaddressinfo } from 'src/app/foundation/cobaddressinfo-service/cobaddressinfo.model';
 // import {  Cobaddressinfo } from '../../admin/cobaddressinfo-service/cobaddressinfo.model';

export interface PcardonrequestMaintanence {
  pcardonrequest?: Pcardonrequest[],
  totalRowCount?:number
  data?: Pcardonrequest[],
  
}
export interface Pcardonrequest  {
  //inventoryNumber: unknown;
	     replaceReason:any, 
         autoCompleteFlag:string, 
         termsFlag:string, 
         Fee:number, 
         requestReference:string, 
         errorMessage:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
	      cobaddressinfo:Cobaddressinfo, 
	      PrepaidCard:any, 
	      branches:any, 
         createdOn:string, 
         inventoryNumber:string,
         charges:number, 
         modifiedOn:string, 
         authBy:string, 
         createdBy:string, 
	     currency:any, 
         modifiedBy:string, 
         deliveryOption:string, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface PcardonrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
