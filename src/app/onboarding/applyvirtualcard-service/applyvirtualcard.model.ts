import { IHttpErrorPayload } from '@fpx/core';
  
export interface ApplyvirtualcardMaintanence {
  applyvirtualcard?: Applyvirtualcard[],
  totalRowCount?:number
  data?: Applyvirtualcard[],
  
}
export interface Applyvirtualcard  {
         inventoryNumber:string, 
         charges:number, 
	     cardholdername:any, 
         tenantId:string, 
         cardspendlimit:number, 
         applicantId:string, 
         addtowallet:string, 
	     creditcardexpiryyear:any, 
	     creditcardexpirymonth:any, 
  }
  
  
 export interface ApplyvirtualcardResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
