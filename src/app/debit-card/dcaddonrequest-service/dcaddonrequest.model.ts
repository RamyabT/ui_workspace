import { IHttpErrorPayload } from '@fpx/core';
import { Cobaddressinfo } from 'src/app/foundation/cobaddressinfo-service/cobaddressinfo.model';
  //import {  Cobaddressinfo } from '../../admin/cobaddressinfo-service/cobaddressinfo.model';

export interface DcaddonrequestMaintanence {
  dcaddonrequest?: Dcaddonrequest[],
  totalRowCount?:number
  data?: Dcaddonrequest[],
  
}
export interface Dcaddonrequest  {
	     reason:any, 
         fee:number, 
         requestReference:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
         createdOn:string, 
         mode:string, 
         inventoryNumber?:string, 
         modifiedOn:string, 
         terms:string, 
	     currency:any, 
         modifiedBy:string, 
         authPersonName:string, 
	     addressInfo:Cobaddressinfo, 
         entityCode:string, 
         autoCompleteFlag:string, 
         deliveryoption:string, 
         addressType:string, 
         errorMessage:string, 
         updtOn:string, 
         authBy:string, 
	     cardRefNumber:any, 
         createdBy:string, 
         authPersonId:string, 
         remarks?:string, 
	     dlvryBranch:any, 
         status:string, 
         charges:any,
         contactNumber:any,
         addressInformation: any

        
  }
  
  
 export interface DcaddonrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
