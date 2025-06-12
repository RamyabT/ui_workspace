import { IHttpErrorPayload } from '@fpx/core';
  
export interface MembershipMaintanence {
  membership?: Membership[],
  totalRowCount?:number
  data?: Membership[],
  
}
export interface Membership  {
         customerCode:string, 
         accountCurrency:string, 
         accountNumber:string, 
	       productName:any, 
         availableBalance:number, 
         accountNickname: string,
         id?: string;
         productDesc: any;
         ownership: string;
         institutionNumber: string;
         relationshipNumber: string;
         transitNumber: string;
         bICCode: string
  }
  
  
 export interface MembershipResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
