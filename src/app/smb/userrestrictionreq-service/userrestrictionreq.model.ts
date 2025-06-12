import { IHttpErrorPayload } from '@fpx/core';
  
export interface UserrestrictionreqMaintanence {
  userrestrictionreq?: Userrestrictionreq[],
  totalRowCount?:number
  data?: Userrestrictionreq[],
  
}
export interface Userrestrictionreq  {
  hiddenField: any;
         lastName:string, 
         gender:string, 
         mobileNumber:string, 
         customerCode:string, 
         authOn:string, 
         createdOn:string, 
         enabled:string, 
         inventoryNumber:string, 
	     userdcrestriction:any, 
	     userccrestriction:any, 
         emailAddress:string, 
         operationMode:string, 
         modifiedOn:string, 
	     userdeprestriction:any, 
	     usercasarestriction:any, 
         modifiedBy:string, 
         entityCode:string, 
         address:string, 
         segmentCode:string, 
         userName:string, 
         userId:string, 
         customerName:string, 
         firstName:string, 
         authBy:string, 
	     nationality:any, 
         createdBy:string, 
         dob:string, 
         tenantId:string, 
	     userpcrestriction:any, 
         middleName:string, 
	     userloanrestriction:any, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface UserrestrictionreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
