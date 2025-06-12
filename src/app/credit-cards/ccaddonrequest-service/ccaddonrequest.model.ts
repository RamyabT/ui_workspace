import { IHttpErrorPayload } from '@fpx/core';
import { Cobaddressinfo } from 'src/app/debit-card/cobaddressinfo-service/cobaddressinfo.model';
//  import {  Cobaddressinfo } from '../../accounts/cobaddressinfo-service/cobaddressinfo.model';

export interface CcaddonrequestMaintanence {
  ccaddonrequest?: Ccaddonrequest[],
  totalRowCount?:number
  data?: Ccaddonrequest[],
  
}
export interface Ccaddonrequest  {
         requestReference:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber?:string, 
         modifiedOn:string, 
         terms:string, 
         currency:string, 
         modifiedBy:string, 
         authPersonName:string, 
         replaceReason:string, 
         entityCode:string, 
         autoCompleteFlag:string, 
         addressType:string, 
         errorMessage:string, 
         chargesAmount:number, 
         updtOn:string, 
	     AddressInfo:Cobaddressinfo, 
	     cardRefNumber:any, 
         authBy:string, 
         createdBy:string, 
         authPersonId:string, 
         deliveryOption:string, 
         remarks?:string, 
	     dlvryBranch:any, 
         status:string, 
         charges:any,
         contactNumber: any,
         addressInformation: any
  }
  
  
 export interface CcaddonrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
